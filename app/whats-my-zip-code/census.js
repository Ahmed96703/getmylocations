// US geography for a point, from the Census Bureau's geocoder: ZIP Code
// Tabulation Area, county, city, congressional and state legislative
// districts, and school district. The geocoder sends no CORS headers, so the
// browser calls it the way it supports for web pages, JSONP: a <script> tag
// whose response calls back into this page. The FCC Area API (CORS-enabled)
// backs up county and state if the Census service does not answer.

const CENSUS = 'https://geocoding.geo.census.gov/geocoder/geographies/coordinates';
const LAYERS = [
  '2020 Census ZIP Code Tabulation Areas',
  'States',
  'Counties',
  'Incorporated Places',
  'County Subdivisions',
  '120th Congressional Districts',
  '2026 State Legislative Districts - Upper',
  '2026 State Legislative Districts - Lower',
  'Unified School Districts',
];

// Rough box around the 50 states and DC (Alaska's Aleutians cross 180°, so
// the west edge wraps), plus Puerto Rico. Only used to decide whether to ask
// the Census service at all.
export const inUs = (lat, lon) =>
  (lat > 18 && lat < 72 && (lon < -66 || lon > 172)) || (lat > 17.8 && lat < 18.6 && lon > -67.4 && lon < -65.2);

export const isZip = (text) => /^\d{5}(-\d{4})?$/.test(String(text).trim());

let seq = 0;
function jsonp(url, timeoutMs = 20000) {
  return new Promise((resolve, reject) => {
    const name = `__census_cb_${Date.now()}_${seq++}`;
    const script = document.createElement('script');
    const done = () => { delete window[name]; script.remove(); clearTimeout(timer); };
    const timer = setTimeout(() => { done(); reject(new Error('The Census service did not answer in time.')); }, timeoutMs);
    window[name] = (data) => { done(); resolve(data); };
    script.onerror = () => { done(); reject(new Error('The Census service could not be reached.')); };
    script.src = `${url}&callback=${name}`;
    document.head.appendChild(script);
  });
}

// Pure: turns the geocoder's geographies object into the fields we show.
export function summarise(g) {
  const first = (layer) => g[layer]?.[0] || null;
  const state = first('States');
  const st = state?.STUSAB || '';
  const cd = first('120th Congressional Districts');
  const at = (n) => (n === '00' || n === '98' ? 'at large' : String(Number(n)));
  const cdNum = cd?.CD120 ?? cd?.BASENAME;
  return {
    zcta: first('2020 Census ZIP Code Tabulation Areas')?.BASENAME || null,
    state: state?.NAME || null,
    stateCode: st || null,
    county: first('Counties')?.NAME || null,
    place: first('Incorporated Places')?.NAME || null,
    subdivision: first('County Subdivisions')?.NAME || null,
    congressional: cd ? (st && /^\d+$/.test(cdNum) && at(cdNum) !== 'at large' ? `${st}-${at(cdNum)} (${cd.NAME})` : cd.NAME) : null,
    stateSenate: first('2026 State Legislative Districts - Upper')?.NAME || null,
    stateHouse: first('2026 State Legislative Districts - Lower')?.NAME || null,
    school: first('Unified School Districts')?.NAME || null,
  };
}

export async function censusAt(lat, lon) {
  const q = new URLSearchParams({
    x: String(lon),
    y: String(lat),
    benchmark: 'Public_AR_Current',
    vintage: 'Current_Current',
    layers: LAYERS.join(','),
    format: 'jsonp',
  });
  const d = await jsonp(`${CENSUS}?${q}`);
  const g = d?.result?.geographies;
  if (!g) throw new Error('The Census service returned no geography for this point.');
  return summarise(g);
}

export async function fccAt(lat, lon) {
  const r = await fetch(`https://geo.fcc.gov/api/census/area?lat=${lat}&lon=${lon}&censusYear=2020&format=json`);
  if (!r.ok) throw new Error(`FCC ${r.status}`);
  const x = (await r.json()).results?.[0];
  return x ? { county: x.county_name, state: x.state_name, stateCode: x.state_code } : null;
}
