// Where a spacecraft is and when it passes over a place, from its current
// orbital elements (CelesTrak, through /api/tle) and the SGP4 orbit model in
// satellite.js. No React, testable on its own.

import { twoline2satrec, propagate, gstime, eciToGeodetic, eciToEcf, ecfToLookAngles, degreesLat, degreesLong, jday, sunPos, shadowFraction } from 'satellite.js';
import { sunPosition } from '../sunrise-sunset/sun.js';

export const CRAFT = [
  { cat: 25544, name: 'International Space Station', short: 'ISS' },
  { cat: 48274, name: 'Tiangong space station', short: 'Tiangong' },
  { cat: 20580, name: 'Hubble Space Telescope', short: 'Hubble' },
];

export async function loadOrbit(cat) {
  const res = await fetch(`/api/tle?cat=${cat}`);
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new Error(body?.error || 'The orbit data did not load. Try again in a minute.');
  return { ...body, satrec: twoline2satrec(body.line1, body.line2) };
}

const deg = (r) => (r * 180) / Math.PI;

// Position under the craft, height and speed at a moment.
export function where(satrec, date) {
  const pv = propagate(satrec, date);
  if (!pv?.position) return null;
  const g = eciToGeodetic(pv.position, gstime(date));
  const v = pv.velocity;
  return {
    lat: degreesLat(g.latitude),
    lon: degreesLong(g.longitude),
    km: g.height,
    kmh: Math.hypot(v.x, v.y, v.z) * 3600,
    eci: pv.position,
  };
}

// Ground track from `from` for `minutes`, split where it crosses the date line
// so the map does not draw a line across the world.
export function groundTrack(satrec, from, minutes, step = 30) {
  const parts = [[]];
  let prev = null;
  for (let s = 0; s <= minutes * 60; s += step) {
    const p = where(satrec, new Date(from.getTime() + s * 1000));
    if (!p) continue;
    if (prev != null && Math.abs(p.lon - prev) > 180) parts.push([]);
    parts.at(-1).push([p.lat, p.lon]);
    prev = p.lon;
  }
  return parts.filter((p) => p.length > 1);
}

// Direction and height of the craft in the sky from an observer, and whether
// it is lit by the sun.
export function look(satrec, date, obs) {
  const pv = propagate(satrec, date);
  if (!pv?.position) return null;
  const la = ecfToLookAngles(obs, eciToEcf(pv.position, gstime(date)));
  const j = jday(date);
  return { el: deg(la.elevation), az: (deg(la.azimuth) + 360) % 360, km: la.rangeSat, lit: shadowFraction(sunPos(j).rsun, pv.position) < 0.5 };
}

// Passes above 10° over the next `days`. A pass is visible to the eye when
// the craft is sunlit while the sky is dark (sun at least 6° below the
// horizon); for those the visible stretch is given separately.
export function passes(satrec, lat, lon, days = 10, from = new Date()) {
  const obs = { latitude: (lat * Math.PI) / 180, longitude: (lon * Math.PI) / 180, height: 0 };
  const out = [];
  let cur = null;
  const end = from.getTime() + days * 86400000;
  for (let t = from.getTime(); t < end; t += 20000) {
    const d = new Date(t);
    const l = look(satrec, d, obs);
    if (!l) continue;
    if (l.el >= 10) {
      const dark = sunPosition(t, lat, lon).altitude < -6;
      const seen = dark && l.lit;
      if (!cur) cur = { start: t, startAz: l.az, max: l, maxAt: t, seen: null };
      if (l.el > cur.max.el) { cur.max = l; cur.maxAt = t; }
      if (seen) {
        if (!cur.seen) cur.seen = { start: t, startAz: l.az, startEl: l.el, maxEl: l.el };
        cur.seen.end = t;
        cur.seen.endAz = l.az;
        cur.seen.endEl = l.el;
        cur.seen.maxEl = Math.max(cur.seen.maxEl, l.el);
      }
      cur.end = t;
      cur.endAz = l.az;
    } else if (cur) {
      out.push(cur);
      cur = null;
    }
  }
  if (cur) out.push(cur);
  return out;
}

// When the orbital elements were measured (their epoch).
export const epoch = (satrec) => Date.UTC(2000 + satrec.epochyr, 0, 1) + (satrec.epochdays - 1) * 86400000;
