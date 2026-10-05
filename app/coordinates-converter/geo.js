// Pure coordinate math for the converter: no React, so it can be tested on
// its own. All conversions assume the WGS 84 ellipsoid (what GPS and web
// maps use). UTM/MGRS formulas follow the standard transverse Mercator
// series (Snyder, "Map Projections — A Working Manual", USGS PP 1395).

const A = 6378137; // WGS 84 semi-major axis (m)
const E2 = 0.00669438; // WGS 84 first eccentricity squared
const EP2 = E2 / (1 - E2);
const K0 = 0.9996; // UTM scale factor
const BANDS = 'CDEFGHJKLMNPQRSTUVWX'; // 8° latitude bands, I and O skipped
const MGRS_COLS = ['ABCDEFGH', 'JKLMNPQR', 'STUVWXYZ'];
const MGRS_ROWS = 'ABCDEFGHJKLMNPQRSTUV';

const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;

// ---- validation ---------------------------------------------------------

export function validateLatLon(lat, lon) {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return 'Enter numbers for both latitude and longitude.';
  if (lat < -90 || lat > 90) return `Latitude must be between -90 and 90 (got ${lat}).`;
  if (lon < -180 || lon > 180) return `Longitude must be between -180 and 180 (got ${lon}).`;
  return null;
}

// ---- DD <-> DMS / DDM ----------------------------------------------------

export function ddToDms(dd) {
  const sign = dd < 0 ? -1 : 1;
  const abs = Math.abs(dd);
  let d = Math.floor(abs);
  let m = Math.floor((abs - d) * 60);
  let s = (abs - d - m / 60) * 3600;
  // Rounding to 3 decimals can produce 60.000 s; carry it.
  if (Math.round(s * 1000) / 1000 >= 60) { s = 0; m += 1; }
  if (m >= 60) { m = 0; d += 1; }
  return { d, m, s, sign };
}

export function ddToDdm(dd) {
  const sign = dd < 0 ? -1 : 1;
  const abs = Math.abs(dd);
  let d = Math.floor(abs);
  let m = (abs - d) * 60;
  if (Math.round(m * 10000) / 10000 >= 60) { m = 0; d += 1; }
  return { d, m, sign };
}

export function dmsToDd(d, m, s, hem) {
  const v = Math.abs(Number(d) || 0) + (Number(m) || 0) / 60 + (Number(s) || 0) / 3600;
  return hem === 'S' || hem === 'W' ? -v : v;
}

export function ddmToDd(d, m, hem) {
  const v = Math.abs(Number(d) || 0) + (Number(m) || 0) / 60;
  return hem === 'S' || hem === 'W' ? -v : v;
}

// ---- UTM ---------------------------------------------------------------

export function utmZone(lat, lon) {
  let zone = Math.floor((lon + 180) / 6) + 1;
  if (lon === 180) zone = 60;
  // Norway: zone 32V is widened to cover the whole south-west coast.
  if (lat >= 56 && lat < 64 && lon >= 3 && lon < 12) zone = 32;
  // Svalbard: zones 32X, 34X and 36X do not exist; 31X/33X/35X/37X are widened.
  if (lat >= 72 && lat <= 84) {
    if (lon >= 0 && lon < 9) zone = 31;
    else if (lon >= 9 && lon < 21) zone = 33;
    else if (lon >= 21 && lon < 33) zone = 35;
    else if (lon >= 33 && lon < 42) zone = 37;
  }
  return zone;
}

export function utmBand(lat) {
  return BANDS[Math.min(19, Math.floor((lat + 80) / 8))];
}

// UTM is only defined from 80°S to 84°N; the poles use UPS instead.
export function latLonToUtm(lat, lon) {
  if (validateLatLon(lat, lon) || lat < -80 || lat > 84) return null;
  const zone = utmZone(lat, lon);
  const lambda0 = rad((zone - 1) * 6 - 180 + 3);
  const phi = rad(lat);
  const N = A / Math.sqrt(1 - E2 * Math.sin(phi) ** 2);
  const T = Math.tan(phi) ** 2;
  const C = EP2 * Math.cos(phi) ** 2;
  const Aa = Math.cos(phi) * (rad(lon) - lambda0);
  const M = A * ((1 - E2 / 4 - (3 * E2 ** 2) / 64 - (5 * E2 ** 3) / 256) * phi
    - ((3 * E2) / 8 + (3 * E2 ** 2) / 32 + (45 * E2 ** 3) / 1024) * Math.sin(2 * phi)
    + ((15 * E2 ** 2) / 256 + (45 * E2 ** 3) / 1024) * Math.sin(4 * phi)
    - ((35 * E2 ** 3) / 3072) * Math.sin(6 * phi));
  const easting = K0 * N * (Aa + ((1 - T + C) * Aa ** 3) / 6
    + ((5 - 18 * T + T * T + 72 * C - 58 * EP2) * Aa ** 5) / 120) + 500000;
  let northing = K0 * (M + N * Math.tan(phi) * ((Aa * Aa) / 2
    + ((5 - T + 9 * C + 4 * C * C) * Aa ** 4) / 24
    + ((61 - 58 * T + T * T + 600 * C - 330 * EP2) * Aa ** 6) / 720));
  if (lat < 0) northing += 10000000; // false northing, southern hemisphere
  return { zone, band: utmBand(lat), easting, northing };
}

// Inverse: band letters N–X are the northern hemisphere, C–M southern.
export function utmToLatLon(zone, band, easting, northing) {
  const z = Number(zone);
  const b = String(band || '').toUpperCase();
  const e = Number(easting);
  const n = Number(northing);
  if (!Number.isInteger(z) || z < 1 || z > 60) return { error: 'UTM zone must be a whole number from 1 to 60.' };
  if (!BANDS.includes(b) || b.length !== 1) return { error: 'Latitude band must be a letter from C to X (not I or O).' };
  if (!Number.isFinite(e) || e < 100000 || e > 900000) return { error: 'Easting must be between 100,000 and 900,000 m.' };
  if (!Number.isFinite(n) || n < 0 || n > 10000000) return { error: 'Northing must be between 0 and 10,000,000 m.' };
  const north = b >= 'N';
  const x = e - 500000;
  const y = north ? n : n - 10000000;
  const e1 = (1 - Math.sqrt(1 - E2)) / (1 + Math.sqrt(1 - E2));
  const mu = y / K0 / (A * (1 - E2 / 4 - (3 * E2 ** 2) / 64 - (5 * E2 ** 3) / 256));
  const phi1 = mu + ((3 * e1) / 2 - (27 * e1 ** 3) / 32) * Math.sin(2 * mu)
    + ((21 * e1 ** 2) / 16 - (55 * e1 ** 4) / 32) * Math.sin(4 * mu)
    + ((151 * e1 ** 3) / 96) * Math.sin(6 * mu)
    + ((1097 * e1 ** 4) / 512) * Math.sin(8 * mu);
  const N1 = A / Math.sqrt(1 - E2 * Math.sin(phi1) ** 2);
  const T1 = Math.tan(phi1) ** 2;
  const C1 = EP2 * Math.cos(phi1) ** 2;
  const R1 = (A * (1 - E2)) / (1 - E2 * Math.sin(phi1) ** 2) ** 1.5;
  const D = x / (N1 * K0);
  const lat = phi1 - ((N1 * Math.tan(phi1)) / R1) * ((D * D) / 2
    - ((5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * EP2) * D ** 4) / 24
    + ((61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * EP2 - 3 * C1 * C1) * D ** 6) / 720);
  const lon = rad((z - 1) * 6 - 180 + 3) + (D - ((1 + 2 * T1 + C1) * D ** 3) / 6
    + ((5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * EP2 + 24 * T1 * T1) * D ** 5) / 120) / Math.cos(phi1);
  return { lat: deg(lat), lon: deg(lon) };
}

// ---- MGRS (1 m precision) --------------------------------------------

export function utmToMgrs({ zone, band, easting, northing }) {
  const col = MGRS_COLS[(zone - 1) % 3][Math.floor(easting / 100000) - 1];
  const row = MGRS_ROWS[(Math.floor(northing / 100000) + (zone % 2 === 0 ? 5 : 0)) % 20];
  const pad = (v) => String(Math.floor(v) % 100000).padStart(5, '0');
  return `${zone}${band} ${col}${row} ${pad(easting)} ${pad(northing)}`;
}

// ---- free-text parser --------------------------------------------------

function parsePart(str) {
  const hemMatch = str.match(/[NSEW]/i);
  const hem = hemMatch ? hemMatch[0].toUpperCase() : null;
  const nums = str.match(/-?\d+(?:\.\d+)?/g) || [];
  if (nums.length < 1 || nums.length > 3) return null;
  const [d, m = '0', s = '0'] = nums;
  if (Number(m) >= 60 || Number(s) >= 60) return { error: 'Minutes and seconds must be below 60.' };
  if (nums.length > 1 && (m.startsWith('-') || s.startsWith('-'))) return null;
  if (nums.length > 1 && Math.abs(Number(d)) % 1 !== 0) return { error: 'Degrees must be a whole number when minutes are given.' };
  let value = Math.abs(Number(d)) + Number(m) / 60 + Number(s) / 3600;
  if (d.startsWith('-') || hem === 'S' || hem === 'W') value = -value;
  return { value, hem, count: nums.length };
}

// Accepts DD, DMS, DDM (with or without symbols and hemisphere letters),
// UTM like "31U 448252 5411957", and Google Maps links (@lat,lon or q=lat,lon).
export function parseCoordinate(input) {
  const raw = String(input || '').trim();
  if (!raw) return { error: 'Paste a coordinate first.' };

  const url = raw.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/)
    || raw.match(/[?&](?:q|ll|query|destination)=(-?\d+(?:\.\d+)?)(?:,|%2C)\s*(-?\d+(?:\.\d+)?)/i);
  if (url) {
    const lat = Number(url[1]);
    const lon = Number(url[2]);
    const err = validateLatLon(lat, lon);
    return err ? { error: err } : { lat, lon, format: 'Map link' };
  }

  const utm = raw.match(/^(\d{1,2})\s*([C-HJ-NP-X])\s+(\d+(?:\.\d+)?)\s*(?:m?E)?\s+(\d+(?:\.\d+)?)\s*(?:m?N)?$/i);
  if (utm) {
    const r = utmToLatLon(utm[1], utm[2], utm[3], utm[4]);
    return r.error ? r : { ...r, format: 'UTM' };
  }

  const text = raw
    .replace(/[′’‘`´]/g, "'")
    .replace(/[″“”]|''/g, '"')
    .replace(/º/g, '°');

  let parts = null;
  const byComma = text.split(/\s*[,;]\s*/).filter(Boolean);
  if (byComma.length === 2) parts = byComma;
  if (!parts) {
    const hems = [...text.matchAll(/[NSEW]/gi)];
    if (hems.length === 2) {
      const leading = /^\s*[NSEW]/i.test(text);
      const cut = leading ? hems[1].index : hems[0].index + 1;
      parts = [text.slice(0, cut), text.slice(cut)];
    }
  }
  if (!parts) {
    const nums = text.match(/-?\d+(?:\.\d+)?/g) || [];
    if ([2, 4, 6].includes(nums.length)) {
      const half = nums.length / 2;
      parts = [nums.slice(0, half).join(' '), nums.slice(half).join(' ')];
    }
  }
  if (!parts) return { error: 'Could not tell where latitude ends and longitude begins. Separate them with a comma.' };

  let a = parsePart(parts[0]);
  let b = parsePart(parts[1]);
  if (!a || !b) return { error: 'That does not look like a coordinate. Try 48.8584, 2.2945 or 48°51\'30"N 2°17\'40"E.' };
  if (a.error) return a;
  if (b.error) return b;
  // Longitude written first (E/W then N/S): swap.
  if ((a.hem === 'E' || a.hem === 'W') && (b.hem === 'N' || b.hem === 'S')) [a, b] = [b, a];
  const err = validateLatLon(a.value, b.value);
  if (err) return { error: err };
  const format = a.count === 1 ? 'Decimal degrees' : a.count === 2 ? 'DDM' : 'DMS';
  return { lat: a.value, lon: b.value, format };
}
