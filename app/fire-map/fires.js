// Satellite fire hotspots for the Fire Map (no React, testable on its own).
// Data: NASA FIRMS VIIRS active fires, last 24 hours, from the Suomi NPP and
// NOAA-20 satellites, relayed by our Worker at /api/fires/<sat>/<region>.csv.

import { haversine } from '../distance-calculator/dist.js';

// FIRMS regional files and the area each covers. A lookup loads every file
// whose box overlaps the search circle, or the global file when none do.
const REGIONS = [
  { id: 'anz', s: -56, n: -9, w: 108, e: 180 },
  { id: 'usa', s: 24, n: 50, w: -125, e: -66 },
  { id: 'usa', s: 18, n: 23, w: -161, e: -154 }, // Hawaii
  { id: 'alaska', s: 51, n: 72, w: -180, e: -129 },
  { id: 'canada', s: 41, n: 84, w: -141, e: -52 },
  { id: 'europe', s: 34, n: 72, w: -25, e: 45 },
];
const SATELLITES = ['snpp', 'noaa20'];

export function regionsFor(lat, lon, meters) {
  const dLat = meters / 111320;
  const dLon = meters / (111320 * Math.max(0.05, Math.cos((lat * Math.PI) / 180)));
  const box = { s: lat - dLat, n: lat + dLat, w: lon - dLon, e: lon + dLon };
  const ids = [...new Set(REGIONS
    .filter((r) => box.s < r.n && box.n > r.s && box.w < r.e && box.e > r.w)
    .map((r) => r.id))];
  return ids.length && ids.length <= 2 ? ids : ['global'];
}

// One CSV row per hotspot. Low-confidence VIIRS detections are dropped:
// they are mostly sun glint and hot surfaces rather than fires.
export function parseFirms(csv, sat) {
  const lines = csv.trim().split('\n');
  const head = lines.shift().split(',');
  const col = (name) => head.indexOf(name);
  const iLat = col('latitude'), iLon = col('longitude'), iDate = col('acq_date'), iTime = col('acq_time');
  const iConf = col('confidence'), iFrp = col('frp'), iDn = col('daynight');
  const out = [];
  for (const line of lines) {
    const f = line.split(',');
    const conf = (f[iConf] || '').toLowerCase();
    if (conf === 'l' || conf === 'low') continue;
    const hhmm = (f[iTime] || '').padStart(4, '0');
    const t = Date.parse(`${f[iDate]}T${hhmm.slice(0, 2)}:${hhmm.slice(2)}:00Z`);
    const lat = Number(f[iLat]), lon = Number(f[iLon]);
    if (!Number.isFinite(lat) || !Number.isFinite(lon) || !Number.isFinite(t)) continue;
    out.push({ lat, lon, t, high: conf === 'h' || conf === 'high', frp: Number(f[iFrp]) || 0, night: f[iDn] === 'N', sat });
  }
  return out;
}

const cache = new Map();

// Hotspots for the given regions, each file fetched at most once per page.
export async function loadFires(regions) {
  const jobs = regions.flatMap((r) => SATELLITES.map((sat) => {
    const key = `${sat}/${r}`;
    if (!cache.has(key)) {
      cache.set(key, fetch(`/api/fires/${key}.csv`)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.text();
        })
        .then((csv) => parseFirms(csv, sat))
        .catch((err) => { cache.delete(key); throw err; }));
    }
    return cache.get(key);
  }));
  const results = await Promise.allSettled(jobs);
  const ok = results.filter((r) => r.status === 'fulfilled').flatMap((r) => r.value);
  if (!ok.length && results.some((r) => r.status === 'rejected')) {
    throw new Error('The NASA fire data could not be loaded. Try again in a minute.');
  }
  return ok;
}

export function bearing(lat1, lon1, lat2, lon2) {
  const r = Math.PI / 180;
  const y = Math.sin((lon2 - lon1) * r) * Math.cos(lat2 * r);
  const x = Math.cos(lat1 * r) * Math.sin(lat2 * r) - Math.sin(lat1 * r) * Math.cos(lat2 * r) * Math.cos((lon2 - lon1) * r);
  return ((Math.atan2(y, x) / r) + 360) % 360;
}

// Hotspots within `meters` of the point, nearest first, with distance and
// direction from the point.
export function firesNear(fires, lat, lon, meters) {
  const out = [];
  for (const f of fires) {
    if (Math.abs(f.lat - lat) > meters / 100000 + 0.5) continue; // quick reject
    const d = haversine(lat, lon, f.lat, f.lon);
    if (d <= meters) out.push({ ...f, d, dir: bearing(lat, lon, f.lat, f.lon) });
  }
  return out.sort((a, b) => a.d - b.d);
}

export const ageColor = (hours) => (hours < 6 ? '#dc2626' : hours < 12 ? '#f97316' : '#eab308');
