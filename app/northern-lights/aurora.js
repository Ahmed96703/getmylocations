// Aurora nowcast and Kp forecast from NOAA's Space Weather Prediction Center
// (public domain, open to browsers). No React, testable on its own.

import { haversine } from '../distance-calculator/dist.js';
import { sunPosition } from '../sunrise-sunset/sun.js';

const SWPC = 'https://services.swpc.noaa.gov';

// The OVATION model's 30 to 90 minute forecast: the chance of aurora overhead
// on a 1° grid, as [lon 0–359, lat, percent].
export async function loadOvation() {
  const res = await fetch(`${SWPC}/json/ovation_aurora_latest.json`);
  if (!res.ok) throw new Error('The aurora forecast did not load. Try again in a minute.');
  const d = await res.json();
  const grid = new Map();
  for (const [lon, lat, v] of d.coordinates) grid.set(`${lon},${lat}`, v);
  return { observed: d['Observation Time'], forecast: d['Forecast Time'], points: d.coordinates, grid };
}

// Planetary K-index, 3-hour slots: observed, estimated and predicted.
export async function loadKp() {
  const res = await fetch(`${SWPC}/products/noaa-planetary-k-index-forecast.json`);
  if (!res.ok) throw new Error('The Kp forecast did not load.');
  const rows = await res.json();
  return rows.map((r) => ({ at: Date.parse(`${r.time_tag}Z`), kp: Number(r.kp), kind: r.observed, scale: r.noaa_scale }));
}

const at = (grid, lat, lon) => grid.get(`${((Math.round(lon) % 360) + 360) % 360},${Math.round(lat)}`) ?? 0;

// Chance overhead at a place, and the strongest aurora within `km` (aurora
// glows 100 km or more up, so it can be seen low on the horizon from several
// hundred kilometres away).
export function chanceNear(o, lat, lon, km = 800) {
  const here = at(o.grid, lat, lon);
  let best = { v: here, lat, lon, km: 0 };
  const dLat = Math.ceil(km / 111);
  for (let la = Math.max(-90, Math.round(lat) - dLat); la <= Math.min(90, Math.round(lat) + dLat); la++) {
    const dLon = Math.min(180, Math.ceil(km / (111 * Math.max(0.05, Math.cos((la * Math.PI) / 180)))));
    for (let lo = Math.round(lon) - dLon; lo <= Math.round(lon) + dLon; lo++) {
      const v = at(o.grid, la, lo);
      if (v <= best.v) continue;
      const d = haversine(lat, lon, la, lo) / 1000;
      if (d <= km) best = { v, lat: la, lon: lo, km: d };
    }
  }
  return { here, near: best };
}

export const auroraColor = (v) => (v >= 70 ? '#dc2626' : v >= 50 ? '#ea580c' : v >= 30 ? '#eab308' : v >= 10 ? '#22c55e' : '#86efac');

export function kpWord(kp) {
  if (kp >= 9) return 'Extreme storm (G5)';
  if (kp >= 8) return 'Severe storm (G4)';
  if (kp >= 7) return 'Strong storm (G3)';
  if (kp >= 6) return 'Moderate storm (G2)';
  if (kp >= 5) return 'Minor storm (G1)';
  if (kp >= 4) return 'Active';
  return 'Quiet';
}

// Is it dark enough (sun 12° or more below the horizon), and if not, when
// does it next get that dark in the coming day?
export function darkness(lat, lon, from = Date.now()) {
  const alt = (t) => sunPosition(t, lat, lon).altitude;
  if (alt(from) <= -12) {
    let t = from;
    while (t < from + 86400000 && alt(t) <= -12) t += 300000;
    return { dark: true, until: t < from + 86400000 ? t : null };
  }
  for (let t = from; t < from + 86400000; t += 300000) if (alt(t) <= -12) return { dark: false, from: t };
  return { dark: false, from: null };
}
