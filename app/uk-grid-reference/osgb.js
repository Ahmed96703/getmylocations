// Ordnance Survey National Grid <-> latitude/longitude, following the
// formulas in the Ordnance Survey's "A guide to coordinate systems in Great
// Britain". GPS (WGS84) and the grid's own datum (OSGB36) differ by up to
// about 120 m, so a 7-parameter Helmert shift is applied between them; that
// shift is good to about 5 m, which is what the page states.

const rad = Math.PI / 180;

const AIRY = { a: 6377563.396, b: 6356256.909 };
const WGS84 = { a: 6378137, b: 6356752.314245 };

// National Grid projection (transverse Mercator on the Airy 1830 ellipsoid).
const F0 = 0.9996012717;
const LAT0 = 49 * rad;
const LON0 = -2 * rad;
const E0 = 400000;
const N0 = -100000;

// WGS84 -> OSGB36 (metres, ppm, arc-seconds).
const TO_OSGB = { tx: -446.448, ty: 125.157, tz: -542.06, s: 20.4894, rx: -0.1502, ry: -0.247, rz: -0.8421 };
const TO_WGS = Object.fromEntries(Object.entries(TO_OSGB).map(([k, v]) => [k, -v]));

function toCartesian(lat, lon, { a, b }) {
  const e2 = 1 - (b * b) / (a * a);
  const sinP = Math.sin(lat * rad);
  const cosP = Math.cos(lat * rad);
  const nu = a / Math.sqrt(1 - e2 * sinP * sinP);
  return [nu * cosP * Math.cos(lon * rad), nu * cosP * Math.sin(lon * rad), (1 - e2) * nu * sinP];
}

function fromCartesian([x, y, z], { a, b }) {
  const e2 = 1 - (b * b) / (a * a);
  const p = Math.sqrt(x * x + y * y);
  let lat = Math.atan2(z, p * (1 - e2));
  for (let i = 0; i < 10; i++) {
    const nu = a / Math.sqrt(1 - e2 * Math.sin(lat) ** 2);
    lat = Math.atan2(z + e2 * nu * Math.sin(lat), p);
  }
  return { lat: lat / rad, lon: Math.atan2(y, x) / rad };
}

function helmert([x, y, z], t) {
  const s = 1 + t.s / 1e6;
  const sec = rad / 3600;
  const [rx, ry, rz] = [t.rx * sec, t.ry * sec, t.rz * sec];
  return [
    t.tx + s * x - rz * y + ry * z,
    t.ty + rz * x + s * y - rx * z,
    t.tz - ry * x + rx * y + s * z,
  ];
}

export const wgs84ToOsgb36 = (lat, lon) => fromCartesian(helmert(toCartesian(lat, lon, WGS84), TO_OSGB), AIRY);
export const osgb36ToWgs84 = (lat, lon) => fromCartesian(helmert(toCartesian(lat, lon, AIRY), TO_WGS), WGS84);

function meridional(phi) {
  const { a, b } = AIRY;
  const n = (a - b) / (a + b);
  const n2 = n * n;
  const n3 = n2 * n;
  const d = phi - LAT0;
  const s = phi + LAT0;
  return b * F0 * (
    (1 + n + (5 / 4) * n2 + (5 / 4) * n3) * d
    - (3 * n + 3 * n2 + (21 / 8) * n3) * Math.sin(d) * Math.cos(s)
    + ((15 / 8) * n2 + (15 / 8) * n3) * Math.sin(2 * d) * Math.cos(2 * s)
    - (35 / 24) * n3 * Math.sin(3 * d) * Math.cos(3 * s)
  );
}

// OSGB36 lat/lon (degrees) -> easting and northing in metres.
export function project(lat, lon) {
  const { a, b } = AIRY;
  const e2 = 1 - (b * b) / (a * a);
  const phi = lat * rad;
  const sin = Math.sin(phi);
  const cos = Math.cos(phi);
  const tan = Math.tan(phi);
  const nu = (a * F0) / Math.sqrt(1 - e2 * sin * sin);
  const rho = (a * F0 * (1 - e2)) / (1 - e2 * sin * sin) ** 1.5;
  const eta2 = nu / rho - 1;
  const M = meridional(phi);
  const I = M + N0;
  const II = (nu / 2) * sin * cos;
  const III = (nu / 24) * sin * cos ** 3 * (5 - tan ** 2 + 9 * eta2);
  const IIIA = (nu / 720) * sin * cos ** 5 * (61 - 58 * tan ** 2 + tan ** 4);
  const IV = nu * cos;
  const V = (nu / 6) * cos ** 3 * (nu / rho - tan ** 2);
  const VI = (nu / 120) * cos ** 5 * (5 - 18 * tan ** 2 + tan ** 4 + 14 * eta2 - 58 * tan ** 2 * eta2);
  const dl = lon * rad - LON0;
  return {
    e: E0 + IV * dl + V * dl ** 3 + VI * dl ** 5,
    n: I + II * dl ** 2 + III * dl ** 4 + IIIA * dl ** 6,
  };
}

// Easting and northing -> OSGB36 lat/lon (degrees).
export function unproject(e, n) {
  const { a, b } = AIRY;
  const e2 = 1 - (b * b) / (a * a);
  let phi = LAT0;
  let M = 0;
  do {
    phi = (n - N0 - M) / (a * F0) + phi;
    M = meridional(phi);
  } while (Math.abs(n - N0 - M) >= 0.00001);
  const sin = Math.sin(phi);
  const cos = Math.cos(phi);
  const tan = Math.tan(phi);
  const sec = 1 / cos;
  const nu = (a * F0) / Math.sqrt(1 - e2 * sin * sin);
  const rho = (a * F0 * (1 - e2)) / (1 - e2 * sin * sin) ** 1.5;
  const eta2 = nu / rho - 1;
  const VII = tan / (2 * rho * nu);
  const VIII = (tan / (24 * rho * nu ** 3)) * (5 + 3 * tan ** 2 + eta2 - 9 * tan ** 2 * eta2);
  const IX = (tan / (720 * rho * nu ** 5)) * (61 + 90 * tan ** 2 + 45 * tan ** 4);
  const X = sec / nu;
  const XI = (sec / (6 * nu ** 3)) * (nu / rho + 2 * tan ** 2);
  const XII = (sec / (120 * nu ** 5)) * (5 + 28 * tan ** 2 + 24 * tan ** 4);
  const XIIA = (sec / (5040 * nu ** 7)) * (61 + 662 * tan ** 2 + 1320 * tan ** 4 + 720 * tan ** 6);
  const de = e - E0;
  return {
    lat: (phi - VII * de ** 2 + VIII * de ** 4 - IX * de ** 6) / rad,
    lon: (LON0 + X * de - XI * de ** 3 + XII * de ** 5 - XIIA * de ** 7) / rad,
  };
}

// GPS (WGS84) lat/lon -> National Grid easting/northing, and back.
export function toGrid(lat, lon) {
  const o = wgs84ToOsgb36(lat, lon);
  return project(o.lat, o.lon);
}
export function fromGrid(e, n) {
  const o = unproject(e, n);
  return osgb36ToWgs84(o.lat, o.lon);
}

// The grid covers Great Britain and its islands: 0-700 km east, 0-1300 km north.
export const onGrid = (e, n) => e >= 0 && e < 700000 && n >= 0 && n < 1300000;

// Easting/northing -> grid reference such as "TQ 30080 80337" (digits: 2-10).
export function gridRef(e, n, digits = 10) {
  if (!onGrid(e, n)) return null;
  const e100 = Math.floor(e / 100000);
  const n100 = Math.floor(n / 100000);
  let l1 = 19 - n100 - ((19 - n100) % 5) + Math.floor((e100 + 10) / 5);
  let l2 = (((19 - n100) * 5) % 25) + (e100 % 5);
  if (l1 > 7) l1++; // the grid skips the letter I
  if (l2 > 7) l2++;
  const letters = String.fromCharCode(l1 + 65) + String.fromCharCode(l2 + 65);
  const half = digits / 2;
  const cut = (v) => String(Math.floor((v % 100000) / 10 ** (5 - half))).padStart(half, '0');
  return digits ? `${letters} ${cut(e)} ${cut(n)}` : letters;
}

// Parse "TQ 300 803", "TQ3008080337", "SU 4 1" or plain "530080, 180337".
// Returns { e, n, size } where size is the side of the square in metres, or null.
export function parseGridRef(input) {
  const s = String(input).trim().toUpperCase().replace(/\s+/g, ' ');
  const plain = s.match(/^(\d{3,6}(?:\.\d+)?)\s*[, ]\s*(\d{3,7}(?:\.\d+)?)$/);
  if (plain) {
    const [e, n] = [Number(plain[1]), Number(plain[2])];
    return onGrid(e, n) ? { e, n, size: 1 } : null;
  }
  const m = s.match(/^([A-HJ-Z])([A-HJ-Z])\s*(\d+)\s*(\d*)$/);
  if (!m) return null;
  let digits = m[3] + m[4];
  if (m[4] && m[3].length !== m[4].length) return null;
  if (digits.length % 2 || digits.length > 10) return null;
  let l1 = m[1].charCodeAt(0) - 65;
  let l2 = m[2].charCodeAt(0) - 65;
  if (l1 > 7) l1--;
  if (l2 > 7) l2--;
  const e100 = ((l1 - 2) % 5) * 5 + (l2 % 5);
  const n100 = 19 - Math.floor(l1 / 5) * 5 - Math.floor(l2 / 5);
  if (e100 < 0 || e100 > 6 || n100 < 0 || n100 > 12) return null;
  const half = digits.length / 2;
  const size = 10 ** (5 - half);
  const e = e100 * 100000 + (half ? Number(digits.slice(0, half)) * size : 0);
  const n = n100 * 100000 + (half ? Number(digits.slice(half)) * size : 0);
  return { e, n, size };
}
