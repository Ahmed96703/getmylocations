// Ground elevation from Open-Meteo's elevation API (Copernicus DEM, 90 m
// grid). Up to 100 points per request. No React, testable on its own.

import { haversine } from '../distance-calculator/dist.js';

const API = 'https://api.open-meteo.com/v1/elevation';

export async function elevations(points) {
  const out = [];
  for (let i = 0; i < points.length; i += 100) {
    const batch = points.slice(i, i + 100);
    const url = `${API}?latitude=${batch.map((p) => p[0].toFixed(5)).join(',')}&longitude=${batch.map((p) => p[1].toFixed(5)).join(',')}`;
    const res = await fetch(url);
    const body = await res.json().catch(() => null);
    if (!res.ok || !Array.isArray(body?.elevation)) throw new Error(body?.reason || 'The elevation service did not answer. Try again in a minute.');
    out.push(...body.elevation);
  }
  return out;
}

// Points every equal step along the drawn line (n in total), with the
// distance of each from the start in metres.
export function samplePath(pts, n = 100) {
  const legs = [];
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const d = haversine(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1]);
    legs.push(d);
    total += d;
  }
  if (!total) return [{ lat: pts[0][0], lon: pts[0][1], d: 0 }];
  const out = [];
  let leg = 0;
  let before = 0;
  for (let k = 0; k < n; k++) {
    const at = (total * k) / (n - 1);
    while (leg < legs.length - 1 && before + legs[leg] < at) before += legs[leg++];
    const t = legs[leg] ? Math.min(1, (at - before) / legs[leg]) : 0;
    const [a, b] = [pts[leg], pts[leg + 1]];
    out.push({ lat: a[0] + (b[0] - a[0]) * t, lon: a[1] + (b[1] - a[1]) * t, d: at });
  }
  return out;
}

// Climb, descent, highest and lowest points and the steepest stretch. The
// slope is measured over at least 100 m, since the 90 m model grid makes
// shorter steps noisy.
export function profileStats(samples) {
  let up = 0;
  let down = 0;
  let steep = 0;
  let hi = samples[0];
  let lo = samples[0];
  for (let i = 1; i < samples.length; i++) {
    const dh = samples[i].h - samples[i - 1].h;
    if (dh > 0) up += dh; else down -= dh;
    if (samples[i].h > hi.h) hi = samples[i];
    if (samples[i].h < lo.h) lo = samples[i];
  }
  const step = samples.length > 1 ? samples[1].d - samples[0].d : 0;
  const k = step ? Math.max(1, Math.ceil(100 / step)) : 1;
  for (let i = 0; i + k < samples.length; i++) {
    const dd = samples[i + k].d - samples[i].d;
    if (dd > 0) steep = Math.max(steep, Math.abs(samples[i + k].h - samples[i].h) / dd);
  }
  return { up, down, hi, lo, steep: steep * 100, length: samples.at(-1).d };
}
