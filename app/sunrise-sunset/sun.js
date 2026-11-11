// Sunrise, sunset and twilight times, worked out in the browser from the
// standard low-precision solar position formulas (accurate to about a minute
// away from the polar regions). No React, so it can be tested on its own.

const PI = Math.PI;
const rad = PI / 180;
const DAY = 86400000;
const J1970 = 2440588;
const J2000 = 2451545;
const J0 = 0.0009;
const E = rad * 23.4397; // obliquity of the Earth's axis

const toJulian = (ms) => ms / DAY - 0.5 + J1970;
const fromJulian = (j) => (j + 0.5 - J1970) * DAY;
const toDays = (ms) => toJulian(ms) - J2000;

const anomaly = (d) => rad * (357.5291 + 0.98560028 * d);
const eclipticLon = (M) => M + rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M)) + rad * 102.9372 + PI;
const declination = (L) => Math.asin(Math.sin(E) * Math.sin(L));
const rightAscension = (L) => Math.atan2(Math.sin(L) * Math.cos(E), Math.cos(L));
const transit = (ds, M, L) => J2000 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L);

// Sun altitudes, in degrees, that mark each event. -0.833 allows for the
// sun's radius and for refraction near the horizon.
export const EVENTS = {
  sun: -0.833,
  golden: 6,
  civil: -6,
  nautical: -12,
  astro: -18,
};

// Times for the day around `ms` (pass local noon of the wanted date). Each
// event is [rise, set] in epoch ms, or null when the sun never crosses that
// altitude that day; `up` says which way (true: stays above, polar day).
export function sunTimes(ms, lat, lon) {
  const lw = rad * -lon;
  const phi = rad * lat;
  const d = toDays(ms);
  const n = Math.round(d - J0 - lw / (2 * PI));
  const ds = J0 + lw / (2 * PI) + n;
  const M = anomaly(ds);
  const L = eclipticLon(M);
  const dec = declination(L);
  const noon = transit(ds, M, L);

  const out = { noon: fromJulian(noon), nadir: fromJulian(noon - 0.5) };
  for (const [k, h] of Object.entries(EVENTS)) {
    const cosW = (Math.sin(rad * h) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec));
    if (cosW < -1 || cosW > 1) {
      out[k] = null;
      out[`${k}Up`] = cosW < -1;
      continue;
    }
    const w = Math.acos(cosW);
    const set = transit(J0 + (w + lw) / (2 * PI) + n, M, L);
    out[k] = [fromJulian(noon - (set - noon)), fromJulian(set)];
  }
  // Highest altitude of the sun at solar noon, in degrees.
  out.maxAltitude = 90 - Math.abs(lat - dec / rad);
  out.ra = rightAscension(L);
  return out;
}

// Length of daylight in ms (sunrise to sunset), with polar day and night.
export function dayLength(t) {
  if (t.sun) return t.sun[1] - t.sun[0];
  return t.sunUp ? DAY : 0;
}

// Sun position now: altitude and compass azimuth in degrees.
export function sunPosition(ms, lat, lon) {
  const lw = rad * -lon;
  const phi = rad * lat;
  const d = toDays(ms);
  const M = anomaly(d);
  const L = eclipticLon(M);
  const dec = declination(L);
  const ra = rightAscension(L);
  const H = rad * (280.16 + 360.9856235 * d) - lw - ra;
  const alt = Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H));
  const az = Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(dec) * Math.cos(phi));
  return { altitude: alt / rad, azimuth: (az / rad + 180 + 360) % 360 };
}

// Offset of a time zone from UTC at an instant, in minutes.
export function tzOffset(ms, timeZone) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
    timeZone, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
  }).formatToParts(new Date(ms)).map((p) => [p.type, p.value]));
  const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour % 24, parts.minute, parts.second);
  return Math.round((asUtc - Math.floor(ms / 1000) * 1000) / 60000);
}

// Today's date ("YYYY-MM-DD") in a time zone.
export const todayIn = (timeZone, ms = Date.now()) => new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(ms));

// Epoch ms of 12:00 local time on a "YYYY-MM-DD" date in a time zone.
export function localNoon(date, timeZone) {
  const [y, m, d] = date.split('-').map(Number);
  const guess = Date.UTC(y, m - 1, d, 12);
  return guess - tzOffset(guess, timeZone) * 60000;
}

export function duration(ms) {
  const m = Math.round(ms / 60000);
  return `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')} min`;
}
