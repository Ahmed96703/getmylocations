// Pure distance math for the Distance Calculator (no React, testable on its
// own). Distances are computed on the WGS 84 ellipsoid with Vincenty's
// formulae (T. Vincenty, Survey Review 23, 1975); the spherical haversine
// result is reported alongside so the difference is visible.

const A = 6378137; // WGS 84 semi-major axis (m)
const F = 1 / 298.257223563; // WGS 84 flattening
const B = (1 - F) * A;
const R_MEAN = 6371008.8; // IUGG mean Earth radius (m), used for haversine

const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;
const norm360 = (d) => ((d % 360) + 360) % 360;
const norm180 = (d) => ((((d + 180) % 360) + 360) % 360) - 180;

export function haversine(lat1, lon1, lat2, lon2) {
  const dLat = rad(lat2 - lat1);
  const dLon = rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R_MEAN * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function sphericalBearing(lat1, lon1, lat2, lon2) {
  const y = Math.sin(rad(lon2 - lon1)) * Math.cos(rad(lat2));
  const x = Math.cos(rad(lat1)) * Math.sin(rad(lat2)) - Math.sin(rad(lat1)) * Math.cos(rad(lat2)) * Math.cos(rad(lon2 - lon1));
  return norm360(deg(Math.atan2(y, x)));
}

// Vincenty inverse. Returns { meters, initial, final } or null when the
// iteration fails to converge (nearly antipodal points).
export function vincentyInverse(lat1, lon1, lat2, lon2) {
  const L = rad(lon2 - lon1);
  const U1 = Math.atan((1 - F) * Math.tan(rad(lat1)));
  const U2 = Math.atan((1 - F) * Math.tan(rad(lat2)));
  const sinU1 = Math.sin(U1), cosU1 = Math.cos(U1), sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);
  let lambda = L;
  let sinSigma, cosSigma, sigma, sinAlpha, cos2Alpha, cos2SigmaM;
  for (let i = 0; i < 200; i++) {
    const sinL = Math.sin(lambda), cosL = Math.cos(lambda);
    sinSigma = Math.sqrt((cosU2 * sinL) ** 2 + (cosU1 * sinU2 - sinU1 * cosU2 * cosL) ** 2);
    if (sinSigma === 0) return { meters: 0, initial: 0, final: 0 }; // same point
    cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosL;
    sigma = Math.atan2(sinSigma, cosSigma);
    sinAlpha = (cosU1 * cosU2 * sinL) / sinSigma;
    cos2Alpha = 1 - sinAlpha * sinAlpha;
    cos2SigmaM = cos2Alpha !== 0 ? cosSigma - (2 * sinU1 * sinU2) / cos2Alpha : 0; // equatorial line
    const C = (F / 16) * cos2Alpha * (4 + F * (4 - 3 * cos2Alpha));
    const prev = lambda;
    lambda = L + (1 - C) * F * sinAlpha
      * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    if (Math.abs(lambda - prev) < 1e-12) {
      const u2 = (cos2Alpha * (A * A - B * B)) / (B * B);
      const Aa = 1 + (u2 / 16384) * (4096 + u2 * (-768 + u2 * (320 - 175 * u2)));
      const Bb = (u2 / 1024) * (256 + u2 * (-128 + u2 * (74 - 47 * u2)));
      const dSigma = Bb * sinSigma * (cos2SigmaM + (Bb / 4) * (cosSigma * (-1 + 2 * cos2SigmaM ** 2)
        - (Bb / 6) * cos2SigmaM * (-3 + 4 * sinSigma ** 2) * (-3 + 4 * cos2SigmaM ** 2)));
      const sinLa = Math.sin(lambda), cosLa = Math.cos(lambda);
      return {
        meters: B * Aa * (sigma - dSigma),
        initial: norm360(deg(Math.atan2(cosU2 * sinLa, cosU1 * sinU2 - sinU1 * cosU2 * cosLa))),
        final: norm360(deg(Math.atan2(cosU1 * sinLa, -sinU1 * cosU2 + cosU1 * sinU2 * cosLa))),
      };
    }
  }
  return null;
}

// Vincenty direct: the point `meters` along the geodesic from (lat, lon)
// starting on `bearing`.
export function vincentyDirect(lat, lon, bearing, meters) {
  const alpha1 = rad(bearing);
  const sinA1 = Math.sin(alpha1), cosA1 = Math.cos(alpha1);
  const tanU1 = (1 - F) * Math.tan(rad(lat));
  const cosU1 = 1 / Math.sqrt(1 + tanU1 * tanU1), sinU1 = tanU1 * cosU1;
  const sigma1 = Math.atan2(tanU1, cosA1);
  const sinAlpha = cosU1 * sinA1;
  const cos2Alpha = 1 - sinAlpha * sinAlpha;
  const u2 = (cos2Alpha * (A * A - B * B)) / (B * B);
  const Aa = 1 + (u2 / 16384) * (4096 + u2 * (-768 + u2 * (320 - 175 * u2)));
  const Bb = (u2 / 1024) * (256 + u2 * (-128 + u2 * (74 - 47 * u2)));
  let sigma = meters / (B * Aa);
  let cos2SigmaM, sinSigma, cosSigma;
  for (let i = 0; i < 200; i++) {
    cos2SigmaM = Math.cos(2 * sigma1 + sigma);
    sinSigma = Math.sin(sigma);
    cosSigma = Math.cos(sigma);
    const dSigma = Bb * sinSigma * (cos2SigmaM + (Bb / 4) * (cosSigma * (-1 + 2 * cos2SigmaM ** 2)
      - (Bb / 6) * cos2SigmaM * (-3 + 4 * sinSigma ** 2) * (-3 + 4 * cos2SigmaM ** 2)));
    const prev = sigma;
    sigma = meters / (B * Aa) + dSigma;
    if (Math.abs(sigma - prev) < 1e-12) break;
  }
  cos2SigmaM = Math.cos(2 * sigma1 + sigma);
  sinSigma = Math.sin(sigma);
  cosSigma = Math.cos(sigma);
  const tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosA1;
  const lat2 = Math.atan2(sinU1 * cosSigma + cosU1 * sinSigma * cosA1, (1 - F) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp));
  const lambda = Math.atan2(sinSigma * sinA1, cosU1 * cosSigma - sinU1 * sinSigma * cosA1);
  const C = (F / 16) * cos2Alpha * (4 + F * (4 - 3 * cos2Alpha));
  const L = lambda - (1 - C) * F * sinAlpha
    * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM ** 2)));
  return { lat: deg(lat2), lon: norm180(lon + deg(L)) };
}

// Spherical interpolation, used only for drawing when Vincenty fails.
function sphericalPoint(lat1, lon1, lat2, lon2, t) {
  const p1 = rad(lat1), l1 = rad(lon1), p2 = rad(lat2), l2 = rad(lon2);
  const d = haversine(lat1, lon1, lat2, lon2) / R_MEAN;
  if (d === 0) return { lat: lat1, lon: lon1 };
  const a = Math.sin((1 - t) * d) / Math.sin(d), b = Math.sin(t * d) / Math.sin(d);
  const x = a * Math.cos(p1) * Math.cos(l1) + b * Math.cos(p2) * Math.cos(l2);
  const y = a * Math.cos(p1) * Math.sin(l1) + b * Math.cos(p2) * Math.sin(l2);
  const z = a * Math.sin(p1) + b * Math.sin(p2);
  return { lat: deg(Math.atan2(z, Math.hypot(x, y))), lon: deg(Math.atan2(y, x)) };
}

// Everything the calculator shows for one pair of points.
export function measure(lat1, lon1, lat2, lon2) {
  const sphere = haversine(lat1, lon1, lat2, lon2);
  const v = vincentyInverse(lat1, lon1, lat2, lon2);
  const meters = v ? v.meters : sphere;
  const initial = v ? v.initial : sphericalBearing(lat1, lon1, lat2, lon2);
  const final = v ? v.final : norm360(sphericalBearing(lat2, lon2, lat1, lon1) + 180);
  const at = (t) => (v ? vincentyDirect(lat1, lon1, initial, meters * t) : sphericalPoint(lat1, lon1, lat2, lon2, t));
  const midpoint = meters === 0 ? { lat: lat1, lon: lon1 } : at(0.5);
  // Path for the map. Longitudes are unwrapped so a route across the 180°
  // meridian is drawn the short way instead of across the whole map.
  const steps = Math.max(2, Math.min(128, Math.ceil(meters / 50000)));
  const path = [];
  let prevLon = lon1;
  for (let i = 0; i <= steps; i++) {
    const p = i === 0 ? { lat: lat1, lon: lon1 } : i === steps ? { lat: lat2, lon: lon2 } : at(i / steps);
    let lon = p.lon;
    while (lon - prevLon > 180) lon -= 360;
    while (lon - prevLon < -180) lon += 360;
    path.push([p.lat, lon]);
    prevLon = lon;
  }
  return { meters, sphereMeters: sphere, method: v ? 'ellipsoid' : 'sphere', initial, final, midpoint, path };
}

export function compass(bearing) {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(bearing / 22.5) % 16];
}
