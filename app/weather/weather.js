// Weather forecast from MET Norway's Locationforecast (CC BY 4.0), through
// our /api/weather relay. Hourly for about 2½ days, then 6-hourly to 9–10
// days. No React, testable on its own.

export async function loadForecast(lat, lon) {
  const res = await fetch(`/api/weather?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}`);
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new Error(body?.error || 'The forecast did not load. Try again in a minute.');
  return body;
}

const BASE = { clearsky: ['Clear', '☀️', '🌙'], fair: ['Mostly clear', '🌤️', '🌙'], partlycloudy: ['Partly cloudy', '⛅', '☁️'], cloudy: ['Cloudy', '☁️', '☁️'], fog: ['Fog', '🌫️', '🌫️'] };

// "lightrainshowersandthunder_day" -> { label, icon }.
export function describe(code) {
  if (!code) return { label: '', icon: '' };
  const [name, when] = code.split('_');
  const night = when === 'night';
  if (BASE[name]) return { label: BASE[name][0], icon: BASE[name][night ? 2 : 1] };
  const thunder = name.includes('thunder');
  const kind = name.includes('snow') ? 'snow' : name.includes('sleet') ? 'sleet' : 'rain';
  const showers = name.includes('showers');
  const level = /^lights?/.test(name) ? 'Light ' : name.startsWith('heavy') ? 'Heavy ' : '';
  const label = `${level}${level ? kind : kind[0].toUpperCase() + kind.slice(1)}${showers ? ' showers' : ''}${thunder ? ' and thunder' : ''}`;
  const icon = thunder ? '⛈️' : kind === 'snow' ? '🌨️' : kind === 'sleet' ? '🌨️' : showers && !night ? '🌦️' : '🌧️';
  return { label, icon };
}

// Feels-like temperature: wind chill when cold and windy, heat index when hot
// and humid (both the formulas national weather services use), else the air
// temperature.
export function feelsLike(t, windMs, rh) {
  const kmh = windMs * 3.6;
  if (t <= 10 && kmh > 4.8) return 13.12 + 0.6215 * t - 11.37 * kmh ** 0.16 + 0.3965 * t * kmh ** 0.16;
  if (t >= 27 && rh >= 40) {
    const f = t * 1.8 + 32;
    const hi = -42.379 + 2.04901523 * f + 10.14333127 * rh - 0.22475541 * f * rh - 6.83783e-3 * f * f - 5.481717e-2 * rh * rh + 1.22874e-3 * f * f * rh + 8.5282e-4 * f * rh * rh - 1.99e-6 * f * f * rh * rh;
    return (hi - 32) / 1.8;
  }
  return t;
}

// The series as plain rows. Each row's rain covers the time until the next row
// (1 h while the forecast is hourly, then 6 h).
export function rows(series) {
  return series.map((s, i) => {
    const d = s.data.instant.details;
    const next = series[i + 1];
    const step = next ? (Date.parse(next.time) - Date.parse(s.time)) / 3600000 : 6;
    const p = step <= 1 ? s.data.next_1_hours : s.data.next_6_hours;
    const sym = (s.data.next_1_hours || s.data.next_6_hours || s.data.next_12_hours)?.summary?.symbol_code;
    return {
      at: Date.parse(s.time),
      step,
      t: d.air_temperature,
      feels: feelsLike(d.air_temperature, d.wind_speed, d.relative_humidity),
      wind: d.wind_speed,
      gust: d.wind_speed_of_gust,
      dir: d.wind_from_direction,
      rh: d.relative_humidity,
      cloud: d.cloud_area_fraction,
      uv: d.ultraviolet_index_clear_sky,
      rain: p?.details?.precipitation_amount ?? null,
      chance: p?.details?.probability_of_precipitation ?? null,
      sym,
      tmax: s.data.next_6_hours?.details?.air_temperature_max,
      tmin: s.data.next_6_hours?.details?.air_temperature_min,
    };
  });
}

// Group rows into local days with high, low, total rain, wettest chance and
// the midday symbol.
export function daily(list, dateOf, hourOf) {
  const days = new Map();
  for (const r of list) {
    const key = dateOf(r.at);
    if (!days.has(key)) days.set(key, []);
    days.get(key).push(r);
  }
  return [...days.entries()].map(([date, rs]) => {
    const temps = rs.flatMap((r) => [r.t, r.tmax, r.tmin]).filter((v) => v != null);
    const mid = rs.reduce((b, r) => (Math.abs(hourOf(r.at) - 13) < Math.abs(hourOf(b.at) - 13) ? r : b));
    const chances = rs.map((r) => r.chance).filter((v) => v != null);
    return {
      date,
      hi: Math.max(...temps),
      lo: Math.min(...temps),
      rain: rs.reduce((s, r) => s + (r.rain || 0), 0),
      chance: chances.length ? Math.max(...chances) : null,
      wind: Math.max(...rs.map((r) => r.wind)),
      sym: mid.sym,
      hours: rs.reduce((s, r) => s + r.step, 0),
    };
  });
}

// "Will it rain today?": the first wet hour from now to the end of the local
// day (0.1 mm or more, or a 50% chance), and how much is expected.
export function rainToday(list, today, dateOf) {
  const rest = list.filter((r) => r.at + r.step * 3600000 > Date.now() && dateOf(r.at) === today);
  const wet = rest.filter((r) => (r.rain ?? 0) >= 0.1 || (r.chance ?? 0) >= 50);
  return { wet: wet.length > 0, first: wet[0] || null, total: rest.reduce((s, r) => s + (r.rain || 0), 0), hours: wet.length, maxChance: Math.max(0, ...rest.map((r) => r.chance ?? 0)), checked: rest.length };
}

export const windWord = (ms) => (ms < 0.5 ? 'Calm' : ms < 3.4 ? 'Light' : ms < 8 ? 'Moderate' : ms < 13.9 ? 'Strong' : ms < 20.8 ? 'Gale' : 'Storm');
