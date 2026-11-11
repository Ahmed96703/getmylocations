// Ground elevation from the Terrain Tiles open dataset on AWS (Mapzen /
// Tilezen; free for any use with attribution), read in the browser: each
// 256 px "terrarium" PNG tile stores height as red * 256 + green + blue / 256
// - 32768 metres, with sea-floor depths below zero. No React; the tile
// decoding needs a browser canvas.

import { haversine } from '../distance-calculator/dist.js';

const TILE = (z, x, y) => `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${x}/${y}.png`;
const tiles = new Map();

function loadTile(z, x, y) {
  const key = `${z}/${x}/${y}`;
  if (!tiles.has(key)) {
    tiles.set(key, new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = 256;
        c.height = 256;
        const g = c.getContext('2d', { willReadFrequently: true });
        g.drawImage(img, 0, 0);
        resolve(g.getImageData(0, 0, 256, 256).data);
      };
      img.onerror = () => { tiles.delete(key); reject(new Error('The elevation data did not load. Check your connection and try again.')); };
      img.src = TILE(z, x, y);
    }));
  }
  return tiles.get(key);
}

// Position of a point in the tile grid at zoom z (Web Mercator).
export function tilePixel(lat, lon, z) {
  const n = 2 ** z;
  const x = ((lon + 180) / 360) * n;
  const r = (Math.max(-85.05, Math.min(85.05, lat)) * Math.PI) / 180;
  const y = ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n;
  return { tx: Math.floor(x) % n, ty: Math.floor(y), px: Math.floor((x % 1) * 256), py: Math.floor((y % 1) * 256) };
}

export const decode = (r, g, b) => r * 256 + g + b / 256 - 32768;

// Heights in metres for [lat, lon] points. Zoom 14 (about 10 m pixels at the
// equator) for a few points, 12 for long profiles to fetch fewer tiles.
export async function elevations(points) {
  const z = points.length > 10 ? 12 : 14;
  return Promise.all(points.map(async ([lat, lon]) => {
    const { tx, ty, px, py } = tilePixel(lat, lon, z);
    const data = await loadTile(z, tx, ty);
    const i = (py * 256 + px) * 4;
    return Math.round(decode(data[i], data[i + 1], data[i + 2]) * 10) / 10;
  }));
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
