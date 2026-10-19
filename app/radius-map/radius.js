// Pure radius-map math (no React, testable on its own). Circles are drawn as
// true geodesic circles: every vertex is the given distance from the centre
// on the WGS 84 ellipsoid (Vincenty direct), so a large circle is accurate
// even though it looks stretched on the Web Mercator map.

import { vincentyDirect } from '../distance-calculator/dist.js';

const R_MEAN = 6371008.8; // IUGG mean Earth radius (m)

export const UNITS = {
  mi: { label: 'miles', short: 'mi', meters: 1609.344 },
  km: { label: 'kilometers', short: 'km', meters: 1000 },
  m: { label: 'meters', short: 'm', meters: 1 },
  ft: { label: 'feet', short: 'ft', meters: 0.3048 },
};

export const PRESETS = {
  mi: [1, 3, 5, 10, 25, 50, 100],
  km: [1, 5, 10, 25, 50, 100, 200],
  m: [100, 250, 500, 1000, 2000],
  ft: [500, 1000, 2500, 5280],
};

// Longest radius the map accepts: a quarter of the way round the Earth.
export const MAX_METERS = 5_000_000;

export const toMeters = (value, unit) => value * (UNITS[unit] || UNITS.mi).meters;

// Miles where people measure road distance in miles (US, UK, Liberia,
// Myanmar), kilometers everywhere else.
export function defaultUnit(locale = '') {
  return /-(US|GB|LR|MM)\b/i.test(locale) ? 'mi' : 'km';
}

// Vertices of the geodesic circle. Longitudes are unwrapped around the
// centre so a circle over the 180° meridian is drawn as one shape.
export function circlePolygon(lat, lon, meters, steps = 128) {
  const pts = [];
  for (let i = 0; i < steps; i++) {
    const p = vincentyDirect(lat, lon, (360 * i) / steps, meters);
    let x = p.lon;
    while (x - lon > 180) x -= 360;
    while (x - lon < -180) x += 360;
    pts.push([p.lat, x]);
  }
  return pts;
}

// Area and circumference of a circle of geodesic radius `meters` on the
// mean-radius sphere (within about 0.5% of the ellipsoid figure).
export function circleStats(meters) {
  const t = meters / R_MEAN;
  return {
    diameter: 2 * meters,
    circumference: 2 * Math.PI * R_MEAN * Math.sin(t),
    area: 2 * Math.PI * R_MEAN * R_MEAN * (1 - Math.cos(t)),
  };
}

// Share links keep every circle in the URL hash, for example
// #c=40.75800,-73.98550,5,mi~51.50740,-0.12780,10,km
export function encodeCircles(circles) {
  return 'c=' + circles
    .map((c) => [c.lat.toFixed(5), c.lon.toFixed(5), +c.value.toFixed(3), c.unit].join(','))
    .join('~');
}

export function decodeCircles(hash) {
  const m = /(?:^|[#&])c=([^&]+)/.exec(hash || '');
  if (!m) return [];
  return m[1].split('~').slice(0, 10).map((part) => {
    const [la, lo, v, u] = decodeURIComponent(part).split(',');
    const lat = Number(la), lon = Number(lo), value = Number(v);
    const unit = UNITS[u] ? u : 'mi';
    const ok = Number.isFinite(lat) && Math.abs(lat) <= 90 && Number.isFinite(lon) && Math.abs(lon) <= 180
      && value > 0 && toMeters(value, unit) <= MAX_METERS;
    return ok ? { lat, lon, value, unit } : null;
  }).filter(Boolean);
}
