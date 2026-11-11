// Street-level crime from data.police.uk (no React, testable on its own).
// The API returns every crime recorded within one mile of a point for one
// month, with each crime moved to the nearest of a fixed set of anonymous
// map points ("On or near ..."), so exact addresses are never published.

const API = 'https://data.police.uk/api';

export const CATEGORIES = {
  'anti-social-behaviour': ['Anti-social behaviour', '#a855f7'],
  'violent-crime': ['Violence and sexual offences', '#dc2626'],
  'shoplifting': ['Shoplifting', '#f59e0b'],
  'other-theft': ['Other theft', '#eab308'],
  'theft-from-the-person': ['Theft from the person', '#f97316'],
  'burglary': ['Burglary', '#be123c'],
  'vehicle-crime': ['Vehicle crime', '#0ea5e9'],
  'criminal-damage-arson': ['Criminal damage and arson', '#78716c'],
  'public-order': ['Public order', '#6366f1'],
  'drugs': ['Drugs', '#16a34a'],
  'robbery': ['Robbery', '#9f1239'],
  'bicycle-theft': ['Bicycle theft', '#14b8a6'],
  'possession-of-weapons': ['Possession of weapons', '#111827'],
  'other-crime': ['Other crime', '#94a3b8'],
};
export const label = (c) => CATEGORIES[c]?.[0] || c.replace(/-/g, ' ');
export const color = (c) => CATEGORIES[c]?.[1] || '#94a3b8';

// Months with data, newest first, as "YYYY-MM".
export async function months() {
  const res = await fetch(`${API}/crimes-street-dates`);
  if (!res.ok) throw new Error('police.uk did not answer. Try again in a minute.');
  return (await res.json()).map((d) => d.date);
}

// Crimes within one mile of the point. The position is rounded to about
// 100 m before it is sent.
export async function crimesNear(lat, lon, month) {
  const url = `${API}/crimes-street/all-crime?lat=${lat.toFixed(3)}&lng=${lon.toFixed(3)}${month ? `&date=${month}` : ''}`;
  const res = await fetch(url);
  if (res.status === 503) throw new Error('This area has more than 10,000 crimes in the month, which is more than police.uk returns at once. Search a point a little further from the city center.');
  if (!res.ok) throw new Error(`police.uk is busy or returned an error (HTTP ${res.status}). Try again in a minute.`);
  return res.json();
}

// The police force covering a point, as { id, name }, or null where no
// force publishes to police.uk (Scotland, and outside the UK).
export async function forceAt(lat, lon) {
  try {
    const res = await fetch(`${API}/locate-neighbourhood?q=${lat.toFixed(3)},${lon.toFixed(3)}`);
    if (!res.ok) return null;
    const { force } = await res.json();
    if (!force) return null;
    const info = await fetch(`${API}/forces/${force}`).then((r) => (r.ok ? r.json() : null)).catch(() => null);
    return { id: force, name: info?.name || force.replace(/-/g, ' ') };
  } catch {
    return null;
  }
}

export function summarize(crimes) {
  const byCat = {};
  const byStreet = {};
  const points = {};
  for (const c of crimes) {
    byCat[c.category] = (byCat[c.category] || 0) + 1;
    const street = c.location?.street?.name || 'Unknown location';
    byStreet[street] = (byStreet[street] || 0) + 1;
    const key = `${c.location.latitude},${c.location.longitude}`;
    const p = (points[key] ||= { lat: Number(c.location.latitude), lon: Number(c.location.longitude), street, n: 0, cats: {} });
    p.n += 1;
    p.cats[c.category] = (p.cats[c.category] || 0) + 1;
  }
  const cats = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
  const streets = Object.entries(byStreet).sort((a, b) => b[1] - a[1]);
  const pts = Object.values(points).map((p) => ({ ...p, top: Object.entries(p.cats).sort((a, b) => b[1] - a[1])[0][0] }));
  return { total: crimes.length, cats, streets, points: pts };
}

export const monthName = (m) => new Date(`${m}-01T00:00:00Z`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });

// Rough box around England, Wales, Scotland and Northern Ireland.
export const inUK = (lat, lon) => lat > 49.8 && lat < 61 && lon > -8.7 && lon < 2;
