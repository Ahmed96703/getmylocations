// Geohash (Gustavo Niemeyer, 2008; public domain). Each character holds 5
// bits; bits alternate longitude, latitude, starting with longitude, and each
// bit halves the current range. Precision 9 is a cell about 4.8 × 4.8 m.

const BASE32 = '0123456789bcdefghjkmnpqrstuvwxyz';

export const isValid = (hash) => typeof hash === 'string' && /^[0-9b-hjkmnp-z]{1,12}$/i.test(hash);

export function encode(lat, lon, precision = 9) {
  let latLo = -90, latHi = 90, lonLo = -180, lonHi = 180;
  let hash = '', bit = 0, ch = 0, evenBit = true;
  while (hash.length < precision) {
    if (evenBit) {
      const mid = (lonLo + lonHi) / 2;
      if (lon >= mid) { ch = ch * 2 + 1; lonLo = mid; } else { ch *= 2; lonHi = mid; }
    } else {
      const mid = (latLo + latHi) / 2;
      if (lat >= mid) { ch = ch * 2 + 1; latLo = mid; } else { ch *= 2; latHi = mid; }
    }
    evenBit = !evenBit;
    if (++bit === 5) {
      hash += BASE32[ch];
      bit = 0;
      ch = 0;
    }
  }
  return hash;
}

// Returns the cell a geohash describes, with its centre.
export function decode(hash) {
  if (!isValid(hash)) throw new Error('Not a geohash');
  let latLo = -90, latHi = 90, lonLo = -180, lonHi = 180;
  let evenBit = true;
  for (const c of hash.toLowerCase()) {
    const v = BASE32.indexOf(c);
    for (let n = 4; n >= 0; n--) {
      const b = (v >> n) & 1;
      if (evenBit) {
        const mid = (lonLo + lonHi) / 2;
        if (b) lonLo = mid; else lonHi = mid;
      } else {
        const mid = (latLo + latHi) / 2;
        if (b) latLo = mid; else latHi = mid;
      }
      evenBit = !evenBit;
    }
  }
  return { latLo, latHi, lonLo, lonHi, lat: (latLo + latHi) / 2, lon: (lonLo + lonHi) / 2, length: hash.length };
}

// Width and height in degrees of a cell at a given precision.
export function cellDegrees(precision) {
  const bits = precision * 5;
  const lonBits = Math.ceil(bits / 2), latBits = Math.floor(bits / 2);
  return { lat: 180 / 2 ** latBits, lon: 360 / 2 ** lonBits };
}
