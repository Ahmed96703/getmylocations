// Nearby places for the Pharmacy Near Me and Public Toilets Near Me tools
// (no React, testable on its own). Data: OpenStreetMap via our Worker's
// /api/nearby relay, which caches one answer per grid cell.

import { haversine } from '../../distance-calculator/dist.js';
import { bearing } from '../../fire-map/fires.js';

// Must match NEARBY[kind].cell in worker/index.js. The position is rounded to
// the cell before it leaves the browser.
const CELL = { health: 0.02, toilets: 0.01, ev: 0.02 };

const snap = (v, cell) => (Math.round(v / cell) * cell).toFixed(4);

export async function loadNearby(kind, lat, lon) {
  const cell = CELL[kind];
  const res = await fetch(`/api/nearby?kind=${kind}&lat=${snap(lat, cell)}&lon=${snap(lon, cell)}`);
  let body = null;
  try { body = await res.json(); } catch {}
  if (!res.ok) throw new Error(body?.error || 'The map data service did not answer. Try again in a minute.');
  return body.places || [];
}

// Places of one kind within `meters` of the exact point, nearest first.
export function nearest(places, kind, lat, lon, meters) {
  const out = [];
  for (const p of places) {
    if (p.k !== kind) continue;
    const d = haversine(lat, lon, p.lat, p.lon);
    if (d <= meters) out.push({ ...p, d, dir: bearing(lat, lon, p.lat, p.lon) });
  }
  return out.sort((a, b) => a.d - b.d);
}

export function address(tags) {
  const street = [tags['addr:housenumber'], tags['addr:street']].filter(Boolean).join(' ');
  return [street, tags['addr:postcode'], tags['addr:city']].filter(Boolean).join(', ');
}

// Opening hours are shown as mapped, except the common all-day value.
export function hours(tags) {
  const h = tags.opening_hours;
  if (!h) return '';
  if (h.trim() === '24/7') return 'Open 24 hours';
  return h.replace(/;\s*/g, '; ');
}

export const phone = (tags) => tags.phone || tags['contact:phone'] || '';

export function directionsUrl(p, mode = 'walking') {
  return `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lon}&travelmode=${mode}`;
}

export const osmUrl = (p) => {
  const type = { n: 'node', w: 'way', r: 'relation' }[p.id[0]];
  return `https://www.openstreetmap.org/${type}/${p.id.slice(1)}`;
};
