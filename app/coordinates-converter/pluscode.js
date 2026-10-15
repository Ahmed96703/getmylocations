// Open Location Code ("Plus Codes"), following Google's specification at
// github.com/google/open-location-code. Encoding uses integer arithmetic like
// the reference implementation; tests compare against the official library.

const ALPHABET = '23456789CFGHJMPQRVWX';
const SEP = '+';
const SEP_POS = 8;
const PAD = '0';
const PAIR_LEN = 10; // digits encoded as lat/lon pairs
const MAX_LEN = 15;
const GRID_ROWS = 5;
const GRID_COLS = 4;
const PAIR_PRECISION = 8000; // 20^3: units per degree at 10 digits
const FINAL_LAT_PRECISION = PAIR_PRECISION * GRID_ROWS ** (MAX_LEN - PAIR_LEN); // 25,000,000
const FINAL_LNG_PRECISION = PAIR_PRECISION * GRID_COLS ** (MAX_LEN - PAIR_LEN); // 8,192,000

export function isValid(code) {
  if (typeof code !== 'string') return false;
  const c = code.toUpperCase();
  const sep = c.indexOf(SEP);
  if (sep < 0 || sep !== c.lastIndexOf(SEP) || sep > SEP_POS || sep % 2 === 1) return false;
  const pad = c.indexOf(PAD);
  if (pad >= 0) {
    if (sep < SEP_POS || pad === 0) return false;
    const padRun = c.match(/0+/g);
    if (padRun.length > 1 || padRun[0].length % 2 === 1 || padRun[0].length > SEP_POS - 2) return false;
    if (c.charAt(c.length - 1) !== SEP) return false;
  }
  if (c.length - sep - 1 === 1) return false; // a single digit after "+" is not allowed
  return [...c.replace(SEP, '').replace(/0+/, '')].every((ch) => ALPHABET.includes(ch));
}

export const isShort = (code) => isValid(code) && code.indexOf(SEP) < SEP_POS;

export function isFull(code) {
  if (!isValid(code) || isShort(code)) return false;
  const c = code.toUpperCase();
  // The first two digits cannot encode a latitude or longitude out of range.
  if (ALPHABET.indexOf(c[0]) * 20 >= 180) return false;
  if (c.length > 1 && ALPHABET.indexOf(c[1]) * 20 >= 360) return false;
  return true;
}

// encode(48.858370, 2.294481) -> "8FW4V75V+9R". length 10 is about a 14 m
// square; 11 adds a grid digit for roughly 3 m.
export function encode(lat, lon, length = 10) {
  lat = Math.min(90, Math.max(-90, lat));
  lon = ((((lon + 180) % 360) + 360) % 360) - 180;
  let latVal = Math.floor(Math.round((lat + 90) * FINAL_LAT_PRECISION * 1e6) / 1e6);
  let lngVal = Math.floor(Math.round((lon + 180) * FINAL_LNG_PRECISION * 1e6) / 1e6);
  // 90° itself would fall outside the grid, so step it just inside.
  if (latVal >= 180 * FINAL_LAT_PRECISION) latVal = 180 * FINAL_LAT_PRECISION - 1;
  let code = '';
  if (length > PAIR_LEN) {
    for (let i = 0; i < MAX_LEN - PAIR_LEN; i++) {
      const latDigit = latVal % GRID_ROWS;
      const lngDigit = lngVal % GRID_COLS;
      code = ALPHABET[latDigit * GRID_COLS + lngDigit] + code;
      latVal = Math.floor(latVal / GRID_ROWS);
      lngVal = Math.floor(lngVal / GRID_COLS);
    }
  } else {
    latVal = Math.floor(latVal / GRID_ROWS ** (MAX_LEN - PAIR_LEN));
    lngVal = Math.floor(lngVal / GRID_COLS ** (MAX_LEN - PAIR_LEN));
  }
  for (let i = 0; i < PAIR_LEN / 2; i++) {
    code = ALPHABET[lngVal % 20] + code;
    code = ALPHABET[latVal % 20] + code;
    latVal = Math.floor(latVal / 20);
    lngVal = Math.floor(lngVal / 20);
  }
  code = code.slice(0, SEP_POS) + SEP + code.slice(SEP_POS);
  return code.slice(0, length + 1);
}

// Returns the cell a full code describes, with its centre.
export function decode(code) {
  if (!isFull(code)) throw new Error('Not a full Plus Code');
  const digits = code.toUpperCase().replace(SEP, '').replace(/0+/, '').slice(0, MAX_LEN);
  let latLo = -90 * FINAL_LAT_PRECISION;
  let lngLo = -180 * FINAL_LNG_PRECISION;
  // Size of one step at each position, in the finest grid units. The first
  // pair steps in 20° units, so start at 400° and divide by 20 per pair.
  let latUnit = FINAL_LAT_PRECISION * 400;
  let lngUnit = FINAL_LNG_PRECISION * 400;
  for (let i = 0; i < Math.min(digits.length, PAIR_LEN); i += 2) {
    latUnit /= 20;
    lngUnit /= 20;
    latLo += ALPHABET.indexOf(digits[i]) * latUnit;
    if (i + 1 < digits.length) lngLo += ALPHABET.indexOf(digits[i + 1]) * lngUnit;
  }
  for (let i = PAIR_LEN; i < digits.length; i++) {
    latUnit /= GRID_ROWS;
    lngUnit /= GRID_COLS;
    const v = ALPHABET.indexOf(digits[i]);
    latLo += Math.floor(v / GRID_COLS) * latUnit;
    lngLo += (v % GRID_COLS) * lngUnit;
  }
  const latHi = latLo + latUnit;
  const lngHi = lngLo + lngUnit;
  const out = {
    latLo: latLo / FINAL_LAT_PRECISION,
    lngLo: lngLo / FINAL_LNG_PRECISION,
    latHi: latHi / FINAL_LAT_PRECISION,
    lngHi: lngHi / FINAL_LNG_PRECISION,
    length: digits.length,
  };
  out.lat = Math.min(90, (out.latLo + out.latHi) / 2);
  out.lon = Math.min(180, (out.lngLo + out.lngHi) / 2);
  return out;
}

// A short code such as "V75V+9R" needs a nearby reference point to recover
// the missing leading digits (the specification's recoverNearest).
export function recoverNearest(shortCode, refLat, refLon) {
  const code = shortCode.toUpperCase();
  if (!isShort(code)) return isFull(code) ? code : null;
  refLat = Math.min(90, Math.max(-90, refLat));
  refLon = ((((refLon + 180) % 360) + 360) % 360) - 180;
  const padLen = SEP_POS - code.indexOf(SEP);
  const resolution = 20 ** (2 - padLen / 2);
  const half = resolution / 2;
  const area = decode(encode(refLat, refLon).slice(0, padLen) + code);
  let { lat, lon } = area;
  if (refLat + half < lat && lat - resolution >= -90) lat -= resolution;
  else if (refLat - half > lat && lat + resolution <= 90) lat += resolution;
  if (refLon + half < lon) lon -= resolution;
  else if (refLon - half > lon) lon += resolution;
  return encode(lat, lon, area.length);
}
