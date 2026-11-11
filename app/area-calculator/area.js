// Area and perimeter of a shape drawn on the map, on a spherical Earth of
// mean radius. Good to a fraction of a percent for fields, plots and towns.
// No React, testable on its own.

import { haversine } from '../distance-calculator/dist.js';

const R = 6371008.8;
const rad = Math.PI / 180;

// Area in square metres of a ring of [lat, lon] points (open or closed).
export function polygonArea(pts) {
  if (pts.length < 3) return 0;
  let sum = 0;
  for (let i = 0; i < pts.length; i++) {
    const [lat1, lon1] = pts[i];
    const [lat2, lon2] = pts[(i + 1) % pts.length];
    let dLon = lon2 - lon1;
    if (dLon > 180) dLon -= 360;
    if (dLon < -180) dLon += 360;
    sum += dLon * rad * (2 + Math.sin(lat1 * rad) + Math.sin(lat2 * rad));
  }
  return Math.abs((sum * R * R) / 2);
}

// Length in metres along the points; `closed` adds the side back to the start.
export function pathLength(pts, closed = false) {
  let m = 0;
  for (let i = 1; i < pts.length; i++) m += haversine(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1]);
  if (closed && pts.length > 2) m += haversine(pts.at(-1)[0], pts.at(-1)[1], pts[0][0], pts[0][1]);
  return m;
}

// True when two sides cross, which makes the area meaningless.
export function selfIntersects(pts) {
  const n = pts.length;
  if (n < 4) return false;
  const cross = (a, b, c) => (b[1] - a[1]) * (c[0] - a[0]) - (b[0] - a[0]) * (c[1] - a[1]);
  const hit = (p1, p2, p3, p4) => {
    const d1 = cross(p3, p4, p1);
    const d2 = cross(p3, p4, p2);
    const d3 = cross(p1, p2, p3);
    const d4 = cross(p1, p2, p4);
    return ((d1 > 0) !== (d2 > 0)) && ((d3 > 0) !== (d4 > 0));
  };
  for (let i = 0; i < n; i++) {
    for (let j = i + 2; j < n; j++) {
      if (i === 0 && j === n - 1) continue; // neighbours through the closing side
      if (hit(pts[i], pts[(i + 1) % n], pts[j], pts[(j + 1) % n])) return true;
    }
  }
  return false;
}

export const AREA_UNITS = [
  ['m2', 'Square metres', 'm²', 1],
  ['ha', 'Hectares', 'ha', 10000],
  ['acre', 'Acres', 'acres', 4046.8564224],
  ['ft2', 'Square feet', 'sq ft', 0.09290304],
  ['yd2', 'Square yards', 'sq yd', 0.83612736],
  ['km2', 'Square kilometres', 'km²', 1e6],
  ['mi2', 'Square miles', 'sq mi', 2589988.110336],
];

export function fmtNum(v) {
  if (v === 0) return '0';
  const digits = v >= 1000 ? 0 : v >= 10 ? 1 : v >= 1 ? 2 : v >= 0.01 ? 4 : 6;
  return v.toLocaleString('en-US', { maximumFractionDigits: digits });
}
