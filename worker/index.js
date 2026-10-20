// Cloudflare Worker in front of the static site. Everything is served from
// ./out by the assets binding; only /api/* reaches this code (see
// run_worker_first in wrangler.jsonc).
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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const m = /^\/api\/fires\/([a-z0-9]+)\/([a-z]+)\.csv$/.exec(url.pathname);
    if (m && request.method === 'GET') return fires(m[1], m[2]);
    if (url.pathname.startsWith('/api/')) return new Response('Not found', { status: 404 });
    return env.ASSETS.fetch(request);
  },
};
