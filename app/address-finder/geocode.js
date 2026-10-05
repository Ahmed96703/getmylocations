// Geocoding helpers for the Address Finder. Lookups go to OpenStreetMap's
// Nominatim service, whose usage policy allows at most one request per
// second (https://operations.osmfoundation.org/policies/nominatim/), so every
// call goes through a shared throttle. The precision helpers are pure and can
// be tested on their own.

import { kmBetween } from '../ip-location/ip.js';

const BASE = 'https://nominatim.openstreetmap.org';
const MIN_GAP_MS = 1100;
let lastRequest = 0;
let queue = Promise.resolve();

// Run `fn` no sooner than MIN_GAP_MS after the previous request.
// `onWait(ms)` is called when the caller has to wait.
function throttled(fn, onWait) {
  const run = queue.then(async () => {
    const wait = lastRequest + MIN_GAP_MS - Date.now();
    if (wait > 0) {
      onWait?.(wait);
      await new Promise((r) => setTimeout(r, wait));
    }
    lastRequest = Date.now();
    return fn();
  });
  queue = run.catch(() => {});
  return run;
}

async function getJson(url) {
  const r = await fetch(url, { headers: { Accept: 'application/json' } });
  if (r.status === 429 || r.status === 403) {
    throw new Error('The free OpenStreetMap geocoder is limiting requests from your network. Wait a minute and try again.');
  }
  if (!r.ok) throw new Error(`The geocoder returned an error (HTTP ${r.status}).`);
  return r.json();
}

const lang = () => (typeof navigator !== 'undefined' && navigator.language) || 'en';

export function searchAddress(query, onWait) {
  const url = `${BASE}/search?format=jsonv2&addressdetails=1&limit=5&accept-language=${encodeURIComponent(lang())}&q=${encodeURIComponent(query)}`;
  return throttled(() => getJson(url), onWait);
}

export function reverseLookup(lat, lon, onWait) {
  const url = `${BASE}/reverse?format=jsonv2&addressdetails=1&accept-language=${encodeURIComponent(lang())}&lat=${lat}&lon=${lon}`;
  return throttled(() => getJson(url), onWait);
}

// How precise a Nominatim result is, from the fields it already returns:
// addresstype names what was matched; place_rank (0–30) is the fallback.
const LEVELS = {
  building: { label: 'Building or point of interest', accuracy: 'within a few meters' },
  feature: { label: 'Named feature (park, lake, peak…)', accuracy: 'the middle of the feature, which can be large' },
  street: { label: 'Street', accuracy: 'somewhere along the street, often tens to hundreds of meters' },
  neighbourhood: { label: 'Neighbourhood or locality', accuracy: 'roughly a few hundred meters to a kilometer' },
  town: { label: 'Town or city', accuracy: 'the town or city center, often several kilometers off' },
  region: { label: 'Region, county or state', accuracy: 'tens of kilometers or more' },
  postcode: { label: 'Postcode area', accuracy: 'the middle of the postcode area' },
  country: { label: 'Country', accuracy: 'the middle of the country' },
};

const STREETS = new Set(['road', 'street', 'highway', 'path', 'footway', 'cycleway', 'pedestrian', 'square']);
const NEIGHBOURHOODS = new Set(['neighbourhood', 'suburb', 'quarter', 'hamlet', 'locality', 'isolated_dwelling', 'farm', 'city_block', 'allotments', 'croft', 'borough', 'city_district', 'district']);
const TOWNS = new Set(['city', 'town', 'village', 'municipality']);
const REGIONS = new Set(['county', 'state', 'region', 'province', 'state_district', 'island', 'archipelago']);

const AREA_CATEGORIES = new Set(['boundary', 'place']);

export function precisionOf(result) {
  const t = result?.addresstype;
  const rank = Number(result?.place_rank);
  const cat = result?.category;
  let key;
  if (result?.address?.house_number) key = 'building';
  // Roads come back with rank 30 from reverse lookups, so test them first.
  else if (STREETS.has(t) || cat === 'highway') key = 'street';
  else if (rank >= 30) key = 'building';
  else if (cat && !AREA_CATEGORIES.has(cat) && !TOWNS.has(t) && !REGIONS.has(t) && t !== 'country' && t !== 'postcode') key = 'feature';
  else if (t === 'postcode') key = 'postcode';
  else if (t === 'country') key = 'country';
  else if (NEIGHBOURHOODS.has(t)) key = 'neighbourhood';
  else if (TOWNS.has(t)) key = 'town';
  else if (REGIONS.has(t)) key = 'region';
  else if (rank >= 26) key = 'street';
  else if (rank >= 17) key = 'neighbourhood';
  else if (rank >= 12) key = 'town';
  else if (rank >= 5) key = 'region';
  else key = 'country';
  return { key, ...LEVELS[key] };
}

// Distance in meters between the point the user entered and the point of
// the object Nominatim returned for it.
export function metersBetween(lat1, lon1, lat2, lon2) {
  return kmBetween(lat1, lon1, lat2, lon2) * 1000;
}

export function formatMeters(m) {
  if (m < 1) return 'less than 1 m';
  if (m < 1000) return `${Math.round(m)} m`;
  return `${(m / 1000).toFixed(m < 10000 ? 1 : 0)} km`;
}
