// Moon phase, illumination, moonrise and moonset, worked out in the browser
// from lunar and solar position formulas: phase dates use Meeus's series and
// are good to about a minute; rise and set to a few minutes. No React,
// testable on its own.

const PI = Math.PI;
const rad = PI / 180;
const DAY = 86400000;
const J1970 = 2440588;
const J2000 = 2451545;
const E = rad * 23.4397;

const toDays = (ms) => ms / DAY - 0.5 + J1970 - J2000;
const rightAscension = (l, b) => Math.atan2(Math.sin(l) * Math.cos(E) - Math.tan(b) * Math.sin(E), Math.cos(l));
const declination = (l, b) => Math.asin(Math.sin(b) * Math.cos(E) + Math.cos(b) * Math.sin(E) * Math.sin(l));

function sunCoords(d) {
  const M = rad * (357.5291 + 0.98560028 * d);
  const C = rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
  const L = M + C + rad * 102.9372 + PI;
  return { dec: declination(L, 0), ra: rightAscension(L, 0) };
}

// Moon position with the largest periodic terms (evection, variation, annual
// equation), good to a few tenths of a degree.
function moonCoords(d) {
  const L = rad * (218.316 + 13.176396 * d); // mean longitude
  const M = rad * (134.963 + 13.064993 * d); // moon's mean anomaly
  const F = rad * (93.272 + 13.22935 * d); // argument of latitude
  const D = rad * (297.850 + 12.190749 * d); // mean elongation from the sun
  const Ms = rad * (357.529 + 0.98560028 * d); // sun's mean anomaly
  const l = L + rad * (6.289 * Math.sin(M) + 1.274 * Math.sin(2 * D - M) + 0.658 * Math.sin(2 * D)
    + 0.214 * Math.sin(2 * M) - 0.186 * Math.sin(Ms) - 0.114 * Math.sin(2 * F));
  const b = rad * (5.128 * Math.sin(F) + 0.281 * Math.sin(M + F) + 0.278 * Math.sin(M - F) + 0.173 * Math.sin(2 * D - F));
  const dist = 385001 - 20905 * Math.cos(M) - 3699 * Math.cos(2 * D - M) - 2956 * Math.cos(2 * D);
  return { ra: rightAscension(l, b), dec: declination(l, b), dist };
}

const siderealTime = (d, lw) => rad * (280.16 + 360.9856235 * d) - lw;

// Altitude (degrees, with refraction) and compass azimuth of the moon.
export function moonAltitude(ms, lat, lon) {
  const lw = rad * -lon;
  const phi = rad * lat;
  const d = toDays(ms);
  const c = moonCoords(d);
  const H = siderealTime(d, lw) - c.ra;
  const h = Math.asin(Math.sin(phi) * Math.sin(c.dec) + Math.cos(phi) * Math.cos(c.dec) * Math.cos(H)) / rad;
  const refraction = h > -1 ? 1.02 / Math.tan(rad * (h + 10.26 / (h + 5.1))) / 60 : 0;
  const az = Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(c.dec) * Math.cos(phi)) / rad;
  return { altitude: h + refraction, azimuth: (az + 180 + 360) % 360, dist: c.dist };
}

// Fraction lit (0-1), phase (0 new, 0.25 first quarter, 0.5 full, 0.75 last
// quarter) and whether it is waxing.
export function illumination(ms) {
  const d = toDays(ms);
  const s = sunCoords(d);
  const m = moonCoords(d);
  const sdist = 149598000;
  const phi = Math.acos(Math.sin(s.dec) * Math.sin(m.dec) + Math.cos(s.dec) * Math.cos(m.dec) * Math.cos(s.ra - m.ra));
  const inc = Math.atan2(sdist * Math.sin(phi), m.dist - sdist * Math.cos(phi));
  const angle = Math.atan2(Math.cos(s.dec) * Math.sin(s.ra - m.ra), Math.sin(s.dec) * Math.cos(m.dec) - Math.cos(s.dec) * Math.sin(m.dec) * Math.cos(s.ra - m.ra));
  const fraction = (1 + Math.cos(inc)) / 2;
  const phase = 0.5 + (0.5 * inc * (angle < 0 ? -1 : 1)) / PI;
  return { fraction, phase, waxing: phase < 0.5, dist: m.dist };
}

export function phaseName(phase) {
  if (phase < 0.02 || phase > 0.98) return 'New moon';
  if (phase < 0.23) return 'Waxing crescent';
  if (phase < 0.27) return 'First quarter';
  if (phase < 0.48) return 'Waxing gibbous';
  if (phase < 0.52) return 'Full moon';
  if (phase < 0.73) return 'Waning gibbous';
  if (phase < 0.77) return 'Last quarter';
  return 'Waning crescent';
}

// Moon age in days since the last new moon.
export const moonAge = (ms) => (ms - lastNewMoon(ms)) / DAY;

// Moonrise and moonset during the 24 hours from `start` (local midnight):
// the moon's altitude is checked every hour and the crossing found by
// quadratic interpolation. Either may be missing on a given day.
export function moonTimes(start, lat, lon) {
  const H0 = 0.133; // refraction, parallax and semi-diameter at the horizon
  const alt = (h) => moonAltitude(start + h * 3600000, lat, lon).altitude - H0;
  let rise = null;
  let set = null;
  let h0 = alt(0);
  let ye = 0;
  for (let i = 1; i <= 24; i += 2) {
    const h1 = alt(i);
    const h2 = alt(i + 1);
    const a = (h0 + h2) / 2 - h1;
    const b = (h2 - h0) / 2;
    const xe = -b / (2 * a);
    ye = (a * xe + b) * xe + h1;
    const disc = b * b - 4 * a * h1;
    let roots = 0;
    let x1 = 0;
    let x2 = 0;
    if (disc >= 0) {
      const dx = Math.sqrt(disc) / (Math.abs(a) * 2);
      x1 = xe - dx;
      x2 = xe + dx;
      if (Math.abs(x1) <= 1) roots++;
      if (Math.abs(x2) <= 1) roots++;
      if (x1 < -1) x1 = x2;
    }
    if (roots === 1) {
      if (h0 < 0) rise = i + x1;
      else set = i + x1;
    } else if (roots === 2) {
      rise = i + (ye < 0 ? x2 : x1);
      set = i + (ye < 0 ? x1 : x2);
    }
    if (rise != null && set != null) break;
    h0 = h2;
  }
  const at = (h) => (h == null ? null : start + h * 3600000);
  return { rise: at(rise), set: at(set), alwaysUp: rise == null && set == null && ye > 0, alwaysDown: rise == null && set == null && ye <= 0 };
}

// Time of a principal phase (Meeus, Astronomical Algorithms, ch. 49): k is a
// lunation number plus 0 (new), 0.25 (first quarter), 0.5 (full) or 0.75
// (last quarter). Accurate to about a minute; returns epoch ms (UTC).
function phaseTime(k) {
  const T = k / 1236.85;
  const s = (x) => Math.sin(rad * x);
  let jde = 2451550.09766 + 29.530588861 * k + 0.00015437 * T * T - 0.00000015 * T ** 3 + 0.00000000073 * T ** 4;
  const e = 1 - 0.002516 * T - 0.0000074 * T * T;
  const M = 2.5534 + 29.1053567 * k - 0.0000014 * T * T - 0.00000011 * T ** 3;
  const Mp = 201.5643 + 385.81693528 * k + 0.0107582 * T * T + 0.00001238 * T ** 3 - 0.000000058 * T ** 4;
  const F = 160.7108 + 390.67050284 * k - 0.0016118 * T * T - 0.00000227 * T ** 3 + 0.000000011 * T ** 4;
  const O = 124.7746 - 1.56375588 * k + 0.0020672 * T * T + 0.00000215 * T ** 3;
  const q = Math.round((k - Math.floor(k)) * 4) % 4;
  if (q === 0 || q === 2) {
    const c = q === 0
      ? [-0.4072, 0.17241, 0.01608, 0.01039, 0.00739, -0.00514, 0.00208]
      : [-0.40614, 0.17302, 0.01614, 0.01043, 0.00734, -0.00515, 0.00209];
    jde += c[0] * s(Mp) + c[1] * e * s(M) + c[2] * s(2 * Mp) + c[3] * s(2 * F) + c[4] * e * s(Mp - M)
      + c[5] * e * s(Mp + M) + c[6] * e * e * s(2 * M) - 0.00111 * s(Mp - 2 * F) - 0.00057 * s(Mp + 2 * F)
      + 0.00056 * e * s(2 * Mp + M) - 0.00042 * s(3 * Mp) + 0.00042 * e * s(M + 2 * F) + 0.00038 * e * s(M - 2 * F)
      - 0.00024 * e * s(2 * Mp - M) - 0.00017 * s(O) - 0.00007 * s(Mp + 2 * M) + 0.00004 * s(2 * Mp - 2 * F)
      + 0.00004 * s(3 * M) + 0.00003 * s(Mp + M - 2 * F) + 0.00003 * s(2 * Mp + 2 * F) - 0.00003 * s(Mp + M + 2 * F)
      + 0.00003 * s(Mp - M + 2 * F) - 0.00002 * s(Mp - M - 2 * F) - 0.00002 * s(3 * Mp + M) + 0.00002 * s(4 * Mp);
  } else {
    jde += -0.62801 * s(Mp) + 0.17172 * e * s(M) - 0.01183 * e * s(Mp + M) + 0.00862 * s(2 * Mp) + 0.00804 * s(2 * F)
      + 0.00454 * e * s(Mp - M) + 0.00204 * e * e * s(2 * M) - 0.0018 * s(Mp - 2 * F) - 0.0007 * s(Mp + 2 * F)
      - 0.0004 * s(3 * Mp) - 0.00034 * e * s(2 * Mp - M) + 0.00032 * e * s(M + 2 * F) + 0.00032 * e * s(M - 2 * F)
      - 0.00028 * e * e * s(Mp + 2 * M) + 0.00027 * e * s(2 * Mp + M) - 0.00017 * s(O) - 0.00005 * s(Mp - M - 2 * F)
      + 0.00004 * s(2 * Mp + 2 * F) - 0.00004 * s(Mp + M + 2 * F) + 0.00004 * s(Mp - 2 * M) + 0.00003 * s(Mp + M - 2 * F)
      + 0.00003 * s(3 * M) + 0.00002 * s(2 * Mp - 2 * F) + 0.00002 * s(Mp - M + 2 * F) - 0.00002 * s(3 * Mp + M);
    const c = (x) => Math.cos(rad * x);
    const w = 0.00306 - 0.00038 * e * c(M) + 0.00026 * c(Mp) - 0.00002 * c(Mp - M) + 0.00002 * c(Mp + M) + 0.00002 * c(2 * F);
    jde += q === 1 ? w : -w;
  }
  return (jde - 2440587.5) * DAY - 69000; // Terrestrial Time to UTC (about 69 s)
}

const NAMES = ['New moon', 'First quarter', 'Full moon', 'Last quarter'];

// The principal phases after `from`, in order.
export function nextPhases(from, count = 4) {
  const yearFrac = (from - Date.UTC(2000, 0, 6)) / DAY / 29.530588861;
  const out = [];
  for (let k = Math.floor(yearFrac) - 1; out.length < count; k += 0.25) {
    const at = phaseTime(k);
    if (at > from) out.push({ name: NAMES[Math.round((k - Math.floor(k)) * 4) % 4], at });
  }
  return out;
}

// The last new moon before `ms`, for the moon's age.
export function lastNewMoon(ms) {
  let k = Math.floor((ms - Date.UTC(2000, 0, 6)) / DAY / 29.530588861) + 1;
  while (phaseTime(k) > ms) k -= 1;
  return phaseTime(k);
}
