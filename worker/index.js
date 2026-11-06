// Cloudflare Worker in front of the static site. Everything is served from
// ./out by the assets binding; only /api/* reaches this code (see
// run_worker_first in wrangler.jsonc): the fire data relay below, and the
// small helpers for the network tools further down.
//
// /api/fires/<satellite>/<region>.csv relays NASA FIRMS active-fire files,
// which browsers cannot fetch directly because FIRMS sends no CORS headers.
// Only the files listed below can be requested, and each is cached at
// Cloudflare's edge for 30 minutes, so NASA sees at most a couple of
// requests per file per hour from each data center.

const FIRMS = 'https://firms.modaps.eosdis.nasa.gov/data/active_fire';
const SATELLITES = {
  snpp: 'suomi-npp-viirs-c2/csv/SUOMI_VIIRS_C2',
  noaa20: 'noaa-20-viirs-c2/csv/J1_VIIRS_C2',
};
const REGIONS = {
  anz: 'Australia_NewZealand',
  usa: 'USA_contiguous_and_Hawaii',
  canada: 'Canada',
  alaska: 'Alaska',
  europe: 'Europe',
  global: 'Global',
};
const CACHE_SECONDS = 1800;

async function fires(satellite, region) {
  const path = SATELLITES[satellite];
  const name = REGIONS[region];
  if (!path || !name) return new Response('Unknown fire file', { status: 404 });

  const upstream = await fetch(`${FIRMS}/${path}_${name}_24h.csv`, {
    cf: { cacheTtl: CACHE_SECONDS, cacheEverything: true },
  });
  if (!upstream.ok) {
    return new Response(`NASA FIRMS returned HTTP ${upstream.status}`, { status: 502 });
  }
  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Cache-Control': `public, max-age=${CACHE_SECONDS}`,
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'noindex',
    },
  });
}

const json = (data, status = 200, extra = {}) => new Response(JSON.stringify(data), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'X-Robots-Tag': 'noindex', ...extra },
});

// /api/ip: the visitor's own public IP address, and the approximate place
// Cloudflare's own geolocation gives for it (no third-party lookup).
function visitorIp(request) {
  const cf = request.cf || {};
  return json({
    ip: request.headers.get('CF-Connecting-IP') || '',
    country: cf.country || '',
    region: cf.region || '',
    city: cf.city || '',
    postalCode: cf.postalCode || '',
    latitude: cf.latitude ? Number(cf.latitude) : null,
    longitude: cf.longitude ? Number(cf.longitude) : null,
    timezone: cf.timezone || '',
    asn: cf.asn || null,
    org: cf.asOrganization || '',
  }, 200, { 'Cache-Control': 'no-store' });
}

// /api/page?url=…: fetches one public web page for the page-reading tools
// (View Page Source, Open Graph Checker, Link Analyzer, Website Server
// Checker). The result is JSON, never the page itself, so it cannot be used
// to browse through this site; it has no CORS header, so other sites cannot
// call it from a browser; bodies are capped at 1.5 MB; and results are cached
// for five minutes.
const PAGE_LIMIT = 1.5 * 1024 * 1024;
const UA = 'Mozilla/5.0 (compatible; GetMyLocationsBot/1.0; +https://getmylocations.com/about)';

async function page(target) {
  let url;
  try { url = new URL(target); } catch { return json({ error: 'That is not a valid web address.' }, 400); }
  if (!['http:', 'https:'].includes(url.protocol)) return json({ error: 'Only http:// and https:// addresses can be checked.' }, 400);

  const started = Date.now();
  const chain = [];
  let res;
  try {
    for (let hop = 0; hop < 10; hop += 1) {
      res = await fetch(url.toString(), {
        redirect: 'manual',
        headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml,*/*;q=0.8' },
        cf: { cacheTtl: 300 },
        signal: AbortSignal.timeout(10000),
      });
      const next = res.status >= 300 && res.status < 400 && res.headers.get('Location');
      if (!next) break;
      chain.push({ url: url.toString(), status: res.status });
      url = new URL(next, url);
    }
  } catch (err) {
    return json({ error: err.name === 'TimeoutError' ? 'The site did not answer within 10 seconds.' : 'The site could not be reached.' }, 502);
  }

  const headers = {};
  res.headers.forEach((v, k) => { headers[k] = v; });
  const type = res.headers.get('Content-Type') || '';
  let body = '';
  let truncated = false;
  if (/text\/|html|xml|json|javascript/i.test(type) || !type) {
    const reader = res.body.getReader();
    const chunks = [];
    let size = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > PAGE_LIMIT) { truncated = true; await reader.cancel(); break; }
      chunks.push(value);
    }
    const all = new Uint8Array(chunks.reduce((n, c) => n + c.length, 0));
    let at = 0;
    for (const c of chunks) { all.set(c, at); at += c.length; }
    body = new TextDecoder().decode(all);
  } else {
    await res.body?.cancel();
  }
  return json({
    url: target,
    finalUrl: url.toString(),
    status: res.status,
    statusText: res.statusText,
    redirects: chain,
    headers,
    body,
    truncated,
    ms: Date.now() - started,
  }, 200, { 'Cache-Control': 'private, max-age=300' });
}

// /api/nearby?kind=health|toilets&lat=..&lon=.. answers the Pharmacy Near Me
// and Public Toilets Near Me tools from OpenStreetMap, through the public
// Overpass API. The browser rounds the position to a grid cell before it
// asks (about 2 km for health, 1 km for toilets), so neither this Worker nor
// Overpass sees the exact location, and every visitor in the same cell shares
// one cached answer for a day. The query radius is the advertised radius plus
// the cell's half-diagonal, so the browser can measure from the exact point.
// Overpass mirrors are tried in turn because the main one is often at capacity.

const OVERPASS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
];
const NEARBY = {
  health: {
    cell: 0.02,
    parts: [
      ['pharmacy', 'nwr["amenity"="pharmacy"]', 4700],
      ['hospital', 'nwr["amenity"="hospital"]', 16700],
      ['aed', 'node["emergency"="defibrillator"]', 4700],
    ],
  },
  toilets: { cell: 0.01, parts: [['toilets', 'nwr["amenity"="toilets"]', 2800]] },
};
const KEEP = [
  'name', 'brand', 'operator', 'opening_hours', 'phone', 'contact:phone', 'website', 'contact:website',
  'addr:street', 'addr:housenumber', 'addr:city', 'addr:postcode', 'emergency', 'dispensing',
  'fee', 'charge', 'wheelchair', 'changing_table', 'unisex', 'access', 'indoor', 'level',
  'defibrillator:location', 'description',
];
const NEARBY_CACHE_SECONDS = 86400;

const snap = (v, cell) => (Math.round(v / cell) * cell).toFixed(4);

function kindOf(tags) {
  if (tags.emergency === 'defibrillator') return 'aed';
  return tags.amenity === 'toilets' ? 'toilets' : tags.amenity;
}

async function overpass(query) {
  let last = 'no server answered';
  for (const endpoint of OVERPASS) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'GetMyLocations/1.0 (+https://getmylocations.com/contact)',
        },
        body: new URLSearchParams({ data: query }),
        signal: AbortSignal.timeout(20000),
      });
      if (res.ok) return await res.json();
      last = `HTTP ${res.status}`;
    } catch (err) {
      last = err.name === 'TimeoutError' ? 'timed out' : 'network error';
    }
  }
  throw new Error(last);
}

async function nearby(url, ctx) {
  const cfg = NEARBY[url.searchParams.get('kind')];
  const lat = Number(url.searchParams.get('lat'));
  const lon = Number(url.searchParams.get('lon'));
  if (!cfg || !Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 85 || Math.abs(lon) > 180) {
    return json({ error: 'kind, lat and lon are required' }, 400);
  }
  const sLat = snap(lat, cfg.cell);
  const sLon = snap(lon, cfg.cell);
  const key = new Request(`https://getmylocations.com/api/nearby?kind=${url.searchParams.get('kind')}&lat=${sLat}&lon=${sLon}`);
  const cache = caches.default;
  const hit = await cache.match(key);
  if (hit) return hit;

  const parts = cfg.parts.map(([, sel, r]) => `${sel}(around:${r},${sLat},${sLon});`).join('');
  let data;
  try {
    data = await overpass(`[out:json][timeout:25];(${parts});out center tags qt 3000;`);
  } catch (err) {
    return json({ error: `OpenStreetMap is busy (${err.message}). Try again in a minute.` }, 503, { 'Cache-Control': 'no-store' });
  }
  const places = [];
  for (const el of data.elements || []) {
    const tags = el.tags || {};
    const plat = el.lat ?? el.center?.lat;
    const plon = el.lon ?? el.center?.lon;
    if (plat == null || plon == null) continue;
    if (tags.access === 'private' || tags.access === 'no') continue;
    const keep = {};
    for (const k of KEEP) if (tags[k]) keep[k] = String(tags[k]).slice(0, 200);
    places.push({ k: kindOf(tags), lat: plat, lon: plon, id: `${el.type[0]}${el.id}`, tags: keep });
  }
  const res = json({ lat: Number(sLat), lon: Number(sLon), at: new Date().toISOString(), places }, 200, {
    'Cache-Control': `public, max-age=${NEARBY_CACHE_SECONDS}`,
  });
  ctx.waitUntil(cache.put(key, res.clone()));
  return res;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === 'GET') {
      const m = /^\/api\/fires\/([a-z0-9]+)\/([a-z]+)\.csv$/.exec(url.pathname);
      if (m) return fires(m[1], m[2]);
      if (url.pathname === '/api/ip') return visitorIp(request);
      if (url.pathname === '/api/page') return page(url.searchParams.get('url') || '');
      if (url.pathname === '/api/nearby') return nearby(url, ctx);
    }
    if (url.pathname.startsWith('/api/')) return new Response('Not found', { status: 404 });
    return env.ASSETS.fetch(request);
  },
};
