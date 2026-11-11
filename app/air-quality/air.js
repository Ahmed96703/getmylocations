// Air quality, UV and pollen from Open-Meteo's free air-quality API (CAMS
// forecasts from the EU's Copernicus programme). Pollen is only modelled for
// Europe and comes back as null elsewhere. No React, testable on its own.

const API = 'https://air-quality-api.open-meteo.com/v1/air-quality';
const CURRENT = ['european_aqi', 'us_aqi', 'pm2_5', 'pm10', 'nitrogen_dioxide', 'ozone', 'sulphur_dioxide', 'carbon_monoxide', 'uv_index', 'alder_pollen', 'birch_pollen', 'grass_pollen', 'mugwort_pollen', 'olive_pollen', 'ragweed_pollen'];
const HOURLY = ['european_aqi', 'us_aqi', 'uv_index', 'pm2_5', 'grass_pollen', 'birch_pollen', 'ragweed_pollen'];

export async function airAt(lat, lon) {
  const url = `${API}?latitude=${lat.toFixed(2)}&longitude=${lon.toFixed(2)}&current=${CURRENT.join(',')}&hourly=${HOURLY.join(',')}&forecast_days=4&timezone=auto`;
  const res = await fetch(url);
  const body = await res.json().catch(() => null);
  if (!res.ok || body?.error) throw new Error(body?.reason ? `The air quality service could not answer: ${body.reason}` : 'The air quality service did not answer. Try again in a minute.');
  return body;
}

// [upper bound, label, colour, advice] bands.
const US = [
  [50, 'Good', '#16a34a', 'Air quality is good. Enjoy being outside.'],
  [100, 'Moderate', '#ca8a04', 'Acceptable. Unusually sensitive people should consider less prolonged effort outdoors.'],
  [150, 'Unhealthy for sensitive groups', '#ea580c', 'People with heart or lung disease, older adults and children should reduce long or heavy effort outdoors.'],
  [200, 'Unhealthy', '#dc2626', 'Everyone should reduce long or heavy effort outdoors; sensitive groups should avoid it.'],
  [300, 'Very unhealthy', '#9333ea', 'Everyone should avoid long or heavy effort outdoors.'],
  [Infinity, 'Hazardous', '#7f1d1d', 'Everyone should avoid all physical activity outdoors.'],
];
const EU = [
  [20, 'Good', '#16a34a', 'Air quality is good. Enjoy your usual outdoor activities.'],
  [40, 'Fair', '#65a30d', 'Enjoy your usual outdoor activities.'],
  [60, 'Moderate', '#ca8a04', 'Sensitive people should consider reducing intense activity outdoors if they have symptoms.'],
  [80, 'Poor', '#ea580c', 'Consider reducing intense activity outdoors, especially with symptoms such as sore eyes or a cough.'],
  [100, 'Very poor', '#dc2626', 'Reduce physical activity outdoors; sensitive people should avoid it.'],
  [Infinity, 'Extremely poor', '#7f1d1d', 'Avoid physical activity outdoors.'],
];
const UV = [
  [2.5, 'Low', '#16a34a', 'No protection needed for most people.'],
  [5.5, 'Moderate', '#ca8a04', 'Seek shade around midday; wear sunscreen, a hat and sunglasses.'],
  [7.5, 'High', '#ea580c', 'Protection needed: SPF 30+, a hat and sunglasses; shade between late morning and mid afternoon.'],
  [10.5, 'Very high', '#dc2626', 'Extra protection: avoid the midday sun, cover up and reapply sunscreen.'],
  [Infinity, 'Extreme', '#9333ea', 'Avoid being outside around midday; unprotected skin burns in minutes.'],
];

const band = (bands, v) => (v == null ? null : bands.find(([max]) => v <= max));
export const usBand = (v) => band(US, v);
export const euBand = (v) => band(EU, v);
export const uvBand = (v) => band(UV, v);

// Pollen in grains per cubic metre, banded with thresholds used for UK
// forecasts: trees (alder, birch, olive), grass, and weeds (mugwort, ragweed).
const POLLEN_BANDS = {
  tree: [40, 80, 200],
  grass: [30, 50, 150],
  weed: [10, 30, 50],
};
export const POLLEN = [
  ['grass_pollen', 'Grass', 'grass'],
  ['birch_pollen', 'Birch', 'tree'],
  ['alder_pollen', 'Alder', 'tree'],
  ['olive_pollen', 'Olive', 'tree'],
  ['ragweed_pollen', 'Ragweed', 'weed'],
  ['mugwort_pollen', 'Mugwort', 'weed'],
];
export function pollenLevel(v, kind) {
  if (v == null) return null;
  if (v < 1) return ['None', '#94a3b8'];
  const [m, h, vh] = POLLEN_BANDS[kind];
  if (v < m) return ['Low', '#16a34a'];
  if (v < h) return ['Moderate', '#ca8a04'];
  if (v < vh) return ['High', '#ea580c'];
  return ['Very high', '#dc2626'];
}

// The next `n` hours from the current hour.
export function nextHours(data, n = 24) {
  const start = Math.max(0, data.hourly.time.findIndex((t) => t.slice(0, 13) >= data.current.time.slice(0, 13)));
  return data.hourly.time.slice(start, start + n).map((t, i) => Object.fromEntries([['time', t], ...HOURLY.map((k) => [k, data.hourly[k][start + i]])]));
}

// Daily highs over the forecast for the outlook table.
export function dailyMax(data) {
  const days = {};
  data.hourly.time.forEach((t, i) => {
    const d = t.slice(0, 10);
    const o = (days[d] ||= { date: d });
    for (const k of HOURLY) {
      const v = data.hourly[k][i];
      if (v != null) o[k] = Math.max(o[k] ?? -Infinity, v);
    }
  });
  return Object.values(days);
}
