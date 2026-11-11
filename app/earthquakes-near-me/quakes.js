// Recent earthquakes around a point, from the USGS catalogue (worldwide) and,
// inside New Zealand, GeoNet, which also lists the small local quakes USGS
// leaves out. No React, so it can be tested on its own.

import { haversine } from '../distance-calculator/dist.js';

const USGS = 'https://earthquake.usgs.gov/fdsnws/event/1/query';
const GEONET = 'https://api.geonet.org.nz/quake?MMI=-1';
const DAY = 86400000;

const rad = (d) => (d * Math.PI) / 180;
export function bearing(lat1, lon1, lat2, lon2) {
  const y = Math.sin(rad(lon2 - lon1)) * Math.cos(rad(lat2));
  const x = Math.cos(rad(lat1)) * Math.sin(rad(lat2)) - Math.sin(rad(lat1)) * Math.cos(rad(lat2)) * Math.cos(rad(lon2 - lon1));
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

export const inNZ = (lat, lon) => lat > -48.5 && lat < -33.5 && lon > 165 && lon < 179.9;

async function usgs(lat, lon, radiusKm, days, minMag) {
  const start = new Date(Date.now() - days * DAY).toISOString().slice(0, 19);
  const url = `${USGS}?format=geojson&latitude=${lat.toFixed(2)}&longitude=${lon.toFixed(2)}&maxradiuskm=${radiusKm}&starttime=${start}&minmagnitude=${minMag}&orderby=time&limit=500`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`The USGS earthquake service returned an error (HTTP ${res.status}). Try again in a minute.`);
  const { features } = await res.json();
  return features
    .filter((f) => f.properties.type === 'earthquake' && f.properties.mag != null)
    .map((f) => ({
      id: f.id,
      lat: f.geometry.coordinates[1],
      lon: f.geometry.coordinates[0],
      depth: f.geometry.coordinates[2],
      mag: f.properties.mag,
      place: f.properties.place || 'Unnamed location',
      time: f.properties.time,
      url: f.properties.url,
      felt: f.properties.felt,
      tsunami: f.properties.tsunami === 1,
      source: 'USGS',
    }));
}

// GeoNet only serves its latest 100 quakes, so it fills in recent small ones;
// older or larger ones still come from USGS.
async function geonet() {
  try {
    const res = await fetch(GEONET, { headers: { Accept: 'application/vnd.geo+json;version=2' } });
    if (!res.ok) return [];
    const { features } = await res.json();
    return features.map((f) => ({
      id: f.properties.publicID,
      lat: f.geometry.coordinates[1],
      lon: f.geometry.coordinates[0],
      depth: f.properties.depth,
      mag: f.properties.magnitude,
      place: f.properties.locality || 'New Zealand',
      time: Date.parse(f.properties.time),
      url: `https://www.geonet.org.nz/earthquake/${f.properties.publicID}`,
      felt: null,
      tsunami: false,
      source: 'GeoNet',
    }));
  } catch {
    return [];
  }
}

// The same quake in both catalogues: within a minute and 100 km.
const same = (a, b) => Math.abs(a.time - b.time) < 60000 && haversine(a.lat, a.lon, b.lat, b.lon) < 100000;

export async function quakesNear(lat, lon, { radiusKm, days, minMag }) {
  const [main, nz] = await Promise.all([
    usgs(lat, lon, radiusKm, days, minMag),
    inNZ(lat, lon) ? geonet() : [],
  ]);
  const since = Date.now() - days * DAY;
  const local = nz.filter((q) => q.time >= since && q.mag >= minMag && !main.some((m) => same(m, q)));
  return [...main, ...local]
    .map((q) => ({ ...q, km: haversine(lat, lon, q.lat, q.lon) / 1000, dir: bearing(lat, lon, q.lat, q.lon) }))
    .filter((q) => q.km <= radiusKm)
    .sort((a, b) => b.time - a.time);
}

// Colour by magnitude, from barely felt (pale) to major (dark red).
export function magColor(m) {
  if (m >= 7) return '#7f1d1d';
  if (m >= 6) return '#b91c1c';
  if (m >= 5) return '#ea580c';
  if (m >= 4) return '#f59e0b';
  if (m >= 3) return '#eab308';
  if (m >= 2) return '#84cc16';
  return '#94a3b8';
}

// What a quake of this size usually feels like near the epicentre.
export function magWord(m) {
  if (m >= 7) return 'Major';
  if (m >= 6) return 'Strong';
  if (m >= 5) return 'Moderate';
  if (m >= 4) return 'Light';
  if (m >= 3) return 'Minor';
  return 'Micro';
}

export function ago(t, now = Date.now()) {
  const m = Math.round((now - t) / 60000);
  if (m < 60) return `${Math.max(1, m)} min ago`;
  const h = Math.round(m / 60);
  if (h < 48) return `${h} hour${h === 1 ? '' : 's'} ago`;
  return `${Math.round(h / 24)} days ago`;
}
