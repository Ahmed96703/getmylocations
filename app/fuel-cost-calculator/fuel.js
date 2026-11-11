// Trip fuel cost arithmetic and the road route between two places (OSRM demo
// server, OpenStreetMap data). No React, testable on its own.

import { haversine } from '../distance-calculator/dist.js';

export const KM_PER_MILE = 1.609344;
export const L_PER_US_GAL = 3.785411784;
export const L_PER_UK_GAL = 4.54609;

// Fuel economy units, each converted to litres per 100 km.
export const ECONOMY = {
  l100: { label: 'L/100 km', toL100: (v) => v },
  mpgUK: { label: 'mpg (UK)', toL100: (v) => (100 * L_PER_UK_GAL) / (v * KM_PER_MILE) },
  mpgUS: { label: 'mpg (US)', toL100: (v) => (100 * L_PER_US_GAL) / (v * KM_PER_MILE) },
  kml: { label: 'km/L', toL100: (v) => 100 / v },
};

// Electric: each converted to kWh per 100 km.
export const EFFICIENCY = {
  kwh100: { label: 'kWh/100 km', toK100: (v) => v },
  mikwh: { label: 'miles/kWh', toK100: (v) => 100 / (v * KM_PER_MILE) },
  whmi: { label: 'Wh/mile', toK100: (v) => (v / 1000) * (100 / KM_PER_MILE) },
};

export const PRICE_UNIT = {
  l: { label: 'per litre', perL: (v) => v },
  usgal: { label: 'per US gallon', perL: (v) => v / L_PER_US_GAL },
  ukgal: { label: 'per UK gallon', perL: (v) => v / L_PER_UK_GAL },
};

// Cost of `km` of driving. For fuel, `use` is L/100 km and `price` per litre;
// for electric, kWh/100 km and per kWh.
export function tripCost({ km, use, price, trips = 1, people = 1 }) {
  const amount = (km * trips * use) / 100;
  const cost = amount * price;
  return { amount, cost, each: cost / Math.max(1, people), perKm: (use * price) / 100 };
}

export async function route(a, b) {
  try {
    const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${a.lon},${a.lat};${b.lon},${b.lat}?overview=false`, { signal: AbortSignal.timeout(15000) });
    const d = await res.json();
    if (d.code === 'Ok' && d.routes?.[0]) return { km: d.routes[0].distance / 1000, s: d.routes[0].duration, road: true };
  } catch { /* fall through to the straight line */ }
  return { km: haversine(a.lat, a.lon, b.lat, b.lon) / 1000, s: null, road: false };
}
