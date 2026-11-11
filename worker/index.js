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

// /api/nearby?kind=health|toilets|ev&lat=..&lon=.. answers the Pharmacy Near Me
// and Public Toilets Near Me tools from OpenStreetMap, through the public
// Overpass API. The browser rounds the position to a grid cell before it
// asks (about 2 km for health, 1 km for toilets), so neither this Worker nor
// Overpass sees the exact location, and every visitor in the same cell shares
// one cached answer for a week. The query radius is the advertised radius plus
// the cell's half-diagonal, so the browser can measure from the exact point.
// The data comes from QLever's OpenStreetMap index (University of Freiburg),
// which answers in 10-25 s for an uncached cell; the public Overpass servers are the fallback, as
// in November 2026 they were mostly at capacity and timed out.

const OVERPASS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
];
const QLEVER = 'https://qlever.dev/api/osm-planet';
// [kind, OSM key, OSM value, query radius in meters]
const NEARBY = {
  health: {
    cell: 0.02,
    parts: [
      ['pharmacy', 'amenity', 'pharmacy', 4700],
      ['hospital', 'amenity', 'hospital', 16700],
      ['aed', 'emergency', 'defibrillator', 4700],
    ],
  },
  toilets: { cell: 0.01, parts: [['toilets', 'amenity', 'toilets', 2800]] },
  ev: { cell: 0.02, parts: [['charging_station', 'amenity', 'charging_station', 6700]] },
};
const KEEP = [
  'name', 'brand', 'operator', 'opening_hours', 'phone', 'contact:phone', 'website', 'contact:website',
  'addr:street', 'addr:housenumber', 'addr:city', 'addr:postcode', 'emergency', 'dispensing',
  'fee', 'charge', 'wheelchair', 'changing_table', 'unisex', 'access', 'indoor', 'level',
  'defibrillator:location', 'description',
  'network', 'capacity', 'socket:type2', 'socket:type2_combo', 'socket:chademo', 'socket:type1', 'socket:type1_combo',
  'socket:tesla_supercharger', 'socket:nacs', 'socket:type2:output', 'socket:type2_combo:output', 'socket:chademo:output',
  'parking:fee', 'authentication:app', 'authentication:contactless', 'authentication:membership_card',
];
const NEARBY_CACHE_SECONDS = 7 * 86400;
const NEARBY_VERSION = 2;

const snap = (v, cell) => (Math.round(v / cell) * cell).toFixed(4);

function kindOf(tags) {
  if (tags.emergency === 'defibrillator') return 'aed';
  return tags.amenity === 'toilets' ? 'toilets' : tags.amenity;
}

const OSM_UA = 'GetMyLocations/1.0 (+https://getmylocations.com/contact)';

// QLever: one query per kind of place, run in parallel, finds everything whose
// centroid is inside a box around the cell (most hospitals, and many toilets
// and pharmacies, are mapped as outlines, which QLever's spatial search
// skips). A second query then fetches the tags for those places by ID.
const QPREFIX = `PREFIX osmkey: <https://www.openstreetmap.org/wiki/Key:>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX geof: <http://www.opengis.net/def/function/geosparql/>
`;

async function sparql(query, ms = 50000) {
  const res = await fetch(QLEVER, {
    method: 'POST',
    headers: { Accept: 'application/sparql-results+json', 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': OSM_UA },
    body: new URLSearchParams({ query: QPREFIX + query }),
    signal: AbortSignal.timeout(ms),
  });
  if (!res.ok) throw new Error(`QLever HTTP ${res.status}`);
  return (await res.json()).results?.bindings || [];
}

async function qleverPart([k, key, val, r], lat, lon) {
  const dLat = r / 111320;
  const dLon = r / (111320 * Math.max(0.05, Math.cos((lat * Math.PI) / 180)));
  let rows;
  try {
    rows = await sparql(`SELECT ?osm ?c WHERE {
  ?osm osmkey:${key} "${val}" . ?osm geo:hasGeometry/geo:asWKT ?wkt . BIND (geof:centroid(?wkt) AS ?c)
  FILTER (geof:latitude(?c) > ${lat - dLat} && geof:latitude(?c) < ${+lat + dLat} && geof:longitude(?c) > ${lon - dLon} && geof:longitude(?c) < ${+lon + dLon})
} LIMIT 3000`, 35000);
  } catch {
    // When the box query is too slow, the spatial index still finds the places
    // mapped as points, which is most pharmacies, toilets and defibrillators.
    rows = await sparql(`PREFIX spatialSearch: <https://qlever.cs.uni-freiburg.de/spatialSearch/>
SELECT ?osm (?wkt AS ?c) WHERE {
  BIND ("POINT(${lon} ${lat})"^^geo:wktLiteral AS ?center)
  SERVICE spatialSearch: {
    _:config spatialSearch:algorithm spatialSearch:s2 ; spatialSearch:left ?center ; spatialSearch:right ?wkt ;
             spatialSearch:maxDistance ${r} ; spatialSearch:payload ?osm .
    { ?osm osmkey:${key} "${val}" . ?osm geo:hasGeometry/geo:asWKT ?wkt }
  }
}`, 20000);
  }
  const out = [];
  for (const b of rows) {
    const m = /\/(node|way|relation)\/(\d+)$/.exec(b.osm.value);
    const pt = /POINT\(([-\d.]+) ([-\d.]+)\)/.exec(b.c?.value || '');
    if (m && pt) out.push({ k, lat: Number(pt[2]), lon: Number(pt[1]), id: `${m[1][0]}${m[2]}`, uri: b.osm.value, tags: {} });
  }
  return out;
}

async function qlever(parts, lat, lon) {
  const places = (await Promise.all(parts.map((part) => qleverPart(part, Number(lat), Number(lon))))).flat();
  const byUri = new Map(places.map((p) => [p.uri, p]));
  const uris = [...byUri.keys()];
  const keys = KEEP.map((t) => `osmkey:${t}`).join(' ');
  for (let i = 0; i < uris.length; i += 500) {
    const ids = uris.slice(i, i + 500).map((u) => `<${u}>`).join(' ');
    const rows = await sparql(`SELECT ?osm ?key ?val WHERE { VALUES ?osm { ${ids} } VALUES ?key { ${keys} } ?osm ?key ?val }`);
    for (const b of rows) {
      const p = byUri.get(b.osm.value);
      if (p) p.tags[b.key.value.slice(b.key.value.indexOf('/wiki/Key:') + 10)] = b.val.value;
    }
  }
  return places.map(({ uri, ...p }) => p);
}

async function overpass(parts, lat, lon) {
  const sel = parts.map(([, key, val, r]) => `${key === 'emergency' ? 'node' : 'nwr'}["${key}"="${val}"](around:${r},${lat},${lon});`).join('');
  const query = `[out:json][timeout:25];(${sel});out center tags qt 3000;`;
  let last = 'no server answered';
  for (const endpoint of OVERPASS) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': OSM_UA,
        },
        body: new URLSearchParams({ data: query }),
        signal: AbortSignal.timeout(10000),
      });
      if (res.ok) {
        const data = await res.json();
        return (data.elements || []).flatMap((el) => {
          const tags = el.tags || {};
          const plat = el.lat ?? el.center?.lat;
          const plon = el.lon ?? el.center?.lon;
          if (plat == null || plon == null) return [];
          return [{ k: kindOf(tags), lat: plat, lon: plon, id: `${el.type[0]}${el.id}`, tags }];
        });
      }
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
  // Bump NEARBY_VERSION when the query changes, so cached answers are replaced.
  const key = new Request(`https://getmylocations.com/api/nearby?v=${NEARBY_VERSION}&kind=${url.searchParams.get('kind')}&lat=${sLat}&lon=${sLon}`);
  const cache = caches.default;
  const hit = await cache.match(key);
  if (hit) return hit;

  let raw;
  let source = 'qlever';
  try {
    raw = await qlever(cfg.parts, sLat, sLon);
  } catch (qErr) {
    source = 'overpass';
    try {
      raw = await overpass(cfg.parts, sLat, sLon);
    } catch (err) {
      return json({ error: `The OpenStreetMap servers are busy (${qErr.message}; ${err.message}). Try again in a minute.` }, 503, { 'Cache-Control': 'no-store' });
    }
  }
  const places = [];
  for (const p of raw) {
    if (p.tags.access === 'private' || p.tags.access === 'no') continue;
    const keep = {};
    for (const k of KEEP) if (p.tags[k]) keep[k] = String(p.tags[k]).slice(0, 200);
    places.push({ ...p, tags: keep });
  }
  const res = json({ lat: Number(sLat), lon: Number(sLon), at: new Date().toISOString(), source, places }, 200, {
    'Cache-Control': `public, max-age=${NEARBY_CACHE_SECONDS}`,
  });
  ctx.waitUntil(cache.put(key, res.clone()));
  return res;
}

// Small cached relays for the weather-style tools. Each answer is kept at
// Cloudflare's edge so the upstream services see few requests, and the
// browser rounds the position before it asks.
async function cachedJson(key, seconds, ctx, produce) {
  const cache = caches.default;
  const req = new Request(`https://getmylocations.com/__cache/${key}`);
  const hit = await cache.match(req);
  if (hit) return hit;
  let body;
  try {
    body = await produce();
  } catch (err) {
    return json({ error: err.message || 'The data service did not answer. Try again in a minute.' }, 502, { 'Cache-Control': 'no-store' });
  }
  const res = json(body, 200, { 'Cache-Control': `public, max-age=${seconds}` });
  ctx.waitUntil(cache.put(req, res.clone()));
  return res;
}

const coord = (url, places) => {
  const lat = Number(url.searchParams.get('lat'));
  const lon = Number(url.searchParams.get('lon'));
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;
  return [lat.toFixed(places), lon.toFixed(places)];
};

// /api/weather: MET Norway's Locationforecast (CC BY 4.0), which asks for an
// identifying User-Agent that browsers cannot send, and for caching.
function weather(url, ctx) {
  const c = coord(url, 2);
  if (!c) return json({ error: 'lat and lon are required' }, 400);
  return cachedJson(`weather/${c[0]},${c[1]}`, 1800, ctx, async () => {
    const res = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${c[0]}&lon=${c[1]}`, {
      headers: { 'User-Agent': OSM_UA, Accept: 'application/json' },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) throw new Error(`MET Norway returned HTTP ${res.status}`);
    const data = await res.json();
    return { updated: data.properties.meta.updated_at, units: data.properties.meta.units, series: data.properties.timeseries };
  });
}

// /api/sst: sea surface temperature from NOAA's MUR analysis (public domain)
// through the CoastWatch ERDDAP server, which sends no CORS headers. One
// query takes a box of about 50 km over the last month; the nearest sea cell
// with data is returned with its history.
function sst(url, ctx) {
  const c = coord(url, 2);
  if (!c) return json({ error: 'lat and lon are required' }, 400);
  const [lat, lon] = c.map(Number);
  const k = (v) => (Math.round(v * 20) / 20).toFixed(2);
  return cachedJson(`sst/${k(lat)},${k(lon)}`, 21600, ctx, async () => {
    const b = (v) => v.toFixed(2);
    const q = `analysed_sst[last-30:3:last][(${b(Math.max(-89.9, lat - 0.25))}):5:(${b(Math.min(89.9, lat + 0.25))})][(${b(Math.max(-179.99, lon - 0.25))}):5:(${b(Math.min(180, lon + 0.25))})]`;
    // CoastWatch often answers 503 for a moment under load, so try a few times.
    const target = `https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41.json?${encodeURIComponent(q).replace(/%3A/g, ':')}`;
    let res;
    for (let i = 0; i < 4; i++) {
      res = await fetch(target, { headers: { 'User-Agent': OSM_UA }, signal: AbortSignal.timeout(30000) });
      if (res.status !== 503) break;
      await new Promise((r) => setTimeout(r, 1500));
    }
    if (!res.ok) throw new Error(`NOAA ERDDAP returned HTTP ${res.status}`);
    const rows = (await res.json()).table.rows;
    const latest = rows.reduce((m, r) => (r[0] > m ? r[0] : m), '');
    let best = null;
    for (const r of rows) {
      if (r[0] !== latest || r[3] == null) continue;
      const d = (r[1] - lat) ** 2 + ((r[2] - lon) * Math.cos((lat * Math.PI) / 180)) ** 2;
      if (!best || d < best.d) best = { d, lat: r[1], lon: r[2] };
    }
    if (!best) return { sea: false };
    const series = rows.filter((r) => r[1] === best.lat && r[2] === best.lon && r[3] != null).map((r) => [r[0].slice(0, 10), Math.round(r[3] * 10) / 10]);
    return { sea: true, lat: best.lat, lon: best.lon, km: Math.round(Math.sqrt(best.d) * 111.2 * 10) / 10, series };
  });
}

// /api/tle: current orbital elements from CelesTrak for a few well-known
// spacecraft; CelesTrak asks users not to download more often than every two
// hours, so every visitor shares one cached copy.
const SATS = { 25544: 'ISS', 48274: 'Tiangong', 20580: 'Hubble' };
function tle(url, ctx) {
  const cat = url.searchParams.get('cat');
  if (!SATS[cat]) return json({ error: 'unknown satellite' }, 400);
  return cachedJson(`tle/${cat}`, 7200, ctx, async () => {
    const res = await fetch(`https://celestrak.org/NORAD/elements/gp.php?CATNR=${cat}&FORMAT=TLE`, { headers: { 'User-Agent': OSM_UA }, signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`CelesTrak returned HTTP ${res.status}`);
    const lines = (await res.text()).trim().split(/\r?\n/).map((l) => l.trim());
    if (lines.length < 3 || !lines[1].startsWith('1 ') || !lines[2].startsWith('2 ')) throw new Error('CelesTrak sent no orbit data');
    return { name: lines[0], line1: lines[1], line2: lines[2], fetched: new Date().toISOString() };
  });
}

// /api/aq: the nearest air quality monitoring stations from OpenAQ (needs the
// OPENAQ_KEY secret), with their latest reading of each pollutant.
function airQuality(url, env, ctx) {
  const c = coord(url, 2);
  if (!c) return json({ error: 'lat and lon are required' }, 400);
  if (!env.OPENAQ_KEY) return json({ error: 'not-configured' }, 503, { 'Cache-Control': 'no-store' });
  return cachedJson(`aq/${c[0]},${c[1]}`, 1800, ctx, async () => {
    const get = async (path) => {
      const res = await fetch(`https://api.openaq.org/v3${path}`, { headers: { 'X-API-Key': env.OPENAQ_KEY, 'User-Agent': OSM_UA }, signal: AbortSignal.timeout(15000) });
      if (!res.ok) throw new Error(`OpenAQ returned HTTP ${res.status}`);
      return (await res.json()).results || [];
    };
    const recent = Date.now() - 3 * 86400000;
    const locs = (await get(`/locations?coordinates=${c[0]},${c[1]}&radius=25000&limit=100`))
      .filter((l) => !l.isMobile && l.coordinates && Date.parse(l.datetimeLast?.utc || 0) > recent && l.sensors?.length);
    const near = locs
      .map((l) => ({ l, d: (l.coordinates.latitude - c[0]) ** 2 + ((l.coordinates.longitude - c[1]) * Math.cos((c[0] * Math.PI) / 180)) ** 2 }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 5);
    const stations = await Promise.all(near.map(async ({ l }) => {
      const latest = await get(`/locations/${l.id}/latest`).catch(() => []);
      const bySensor = new Map(latest.map((r) => [r.sensorsId, r]));
      const readings = {};
      for (const s of l.sensors) {
        const r = bySensor.get(s.id);
        if (!r || r.value == null || Date.parse(r.datetime?.utc || 0) < recent) continue;
        readings[s.parameter.name] = { value: r.value, units: s.parameter.units, at: r.datetime.utc };
      }
      return { id: l.id, name: l.name, locality: l.locality, provider: l.provider?.name, lat: l.coordinates.latitude, lon: l.coordinates.longitude, readings };
    }));
    return { stations: stations.filter((s) => Object.keys(s.readings).length) };
  });
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
      if (url.pathname === '/api/weather') return weather(url, ctx);
      if (url.pathname === '/api/sst') return sst(url, ctx);
      if (url.pathname === '/api/tle') return tle(url, ctx);
      if (url.pathname === '/api/aq') return airQuality(url, env, ctx);
    }
    if (url.pathname.startsWith('/api/')) return new Response('Not found', { status: 404 });
    return env.ASSETS.fetch(request);
  },
};
