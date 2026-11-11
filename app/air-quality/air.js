// Air quality from the nearest monitoring stations (OpenAQ, through our
// Worker's /api/aq relay) and the UV index from MET Norway's forecast
// (/api/weather). No React, testable on its own.

export async function stationsNear(lat, lon) {
  const res = await fetch(`/api/aq?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}`);
  const body = await res.json().catch(() => null);
  if (res.status === 503 && body?.error === 'not-configured') return null;
  if (!res.ok) throw new Error(body?.error || 'The air quality service did not answer. Try again in a minute.');
  return body.stations;
}

// UV index (clear sky) for the coming hours from the weather relay.
export async function uvNear(lat, lon) {
  const res = await fetch(`/api/weather?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}`);
  if (!res.ok) return [];
  const { series } = await res.json();
  return series.slice(0, 48).map((s) => ({ time: s.time, uv: s.data.instant.details.ultraviolet_index_clear_sky })).filter((s) => s.uv != null);
}

// US EPA breakpoints (2024 revision) for PM2.5 and PM10 in µg/m³.
const BREAKS = {
  pm25: [[0, 9, 0, 50], [9.1, 35.4, 51, 100], [35.5, 55.4, 101, 150], [55.5, 125.4, 151, 200], [125.5, 225.4, 201, 300], [225.5, 325.4, 301, 500]],
  pm10: [[0, 54, 0, 50], [55, 154, 51, 100], [155, 254, 101, 150], [255, 354, 151, 200], [355, 424, 201, 300], [425, 604, 301, 500]],
};

// AQI for one pollutant, or null when it has no breakpoints or bad units.
export function aqiFor(param, value, units) {
  const table = BREAKS[param];
  if (!table || value == null || value < 0 || !/µg|ug/i.test(units || '')) return null;
  const c = param === 'pm25' ? Math.floor(value * 10) / 10 : Math.floor(value);
  for (const [cl, ch, il, ih] of table) {
    if (c <= ch) return Math.round(((ih - il) / (ch - cl)) * (Math.max(c, cl) - cl) + il);
  }
  return 500;
}

export function stationAqi(readings) {
  const parts = ['pm25', 'pm10'].map((p) => [p, aqiFor(p, readings[p]?.value, readings[p]?.units)]).filter(([, v]) => v != null);
  if (!parts.length) return null;
  const [param, value] = parts.reduce((a, b) => (b[1] > a[1] ? b : a));
  return { value, param };
}

// [upper bound, label, colour, advice]
const US = [
  [50, 'Good', '#16a34a', 'Air quality is good. Enjoy being outside.'],
  [100, 'Moderate', '#ca8a04', 'Acceptable. Unusually sensitive people should consider less prolonged effort outdoors.'],
  [150, 'Unhealthy for sensitive groups', '#ea580c', 'People with heart or lung disease, older adults and children should reduce long or heavy effort outdoors.'],
  [200, 'Unhealthy', '#dc2626', 'Everyone should reduce long or heavy effort outdoors; sensitive groups should avoid it.'],
  [300, 'Very unhealthy', '#9333ea', 'Everyone should avoid long or heavy effort outdoors.'],
  [Infinity, 'Hazardous', '#7f1d1d', 'Everyone should avoid all physical activity outdoors.'],
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
export const uvBand = (v) => band(UV, v);

// WHO 2021 air quality guideline levels (24-hour for particles and NO2,
// 8-hour for ozone), in µg/m³.
export const WHO = { pm25: 15, pm10: 45, no2: 25, o3: 100 };

export const PARAMS = {
  pm25: ['PM2.5', 'Fine particles from traffic, heating, industry and smoke'],
  pm10: ['PM10', 'Coarser dust and particles'],
  no2: ['NO₂', 'Nitrogen dioxide, mostly from road traffic'],
  o3: ['Ozone', 'Forms in sunshine; highest on summer afternoons'],
  so2: ['SO₂', 'Sulphur dioxide, from burning coal and oil'],
  co: ['CO', 'Carbon monoxide, from engines and burning'],
};
