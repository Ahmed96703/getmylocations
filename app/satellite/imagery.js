// Which photo is on screen? Esri's World Imagery service publishes metadata
// layers (ids 5-18, one per source resolution) describing every image in the
// mosaic: capture date, resolution, accuracy, provider, and the zoom levels at
// which it is drawn. One identify request at the map centre returns them all;
// the one drawn at the current zoom is the one the visitor is looking at.

const SERVICE = 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer';

// Picks the image drawn at `zoom` from identify results. Where several cover
// that zoom, the finest resolution wins, since it is drawn on top.
export function pickImage(results, zoom) {
  const shown = results
    .map((r) => r.attributes)
    .filter((a) => Number(a.MinMapLevel) <= zoom && zoom <= Number(a.MaxMapLevel))
    .sort((a, b) => Number(a.SRC_RES) - Number(b.SRC_RES));
  const a = shown[0];
  if (!a) return null;
  const d = String(a.SRC_DATE ?? '');
  const date = /^\d{8}$/.test(d) ? new Date(Date.UTC(+d.slice(0, 4), +d.slice(4, 6) - 1, +d.slice(6, 8))) : null;
  return {
    date,
    resolution: Number(a.SRC_RES), // meters per pixel in the source image
    accuracy: a.SRC_ACC != null && a.SRC_ACC !== 'Null' ? Number(a.SRC_ACC) : null, // meters
    product: a.NICE_NAME || null,
    provider: a.NICE_DESC || null,
  };
}

export async function imageryAt(lat, lon, zoom, signal) {
  const d = 0.001;
  const params = new URLSearchParams({
    geometry: `${lon},${lat}`,
    geometryType: 'esriGeometryPoint',
    sr: '4326',
    layers: 'all:5,6,7,8,9,10,11,12,13,14,15,16,17,18',
    tolerance: '0',
    mapExtent: `${lon - d},${lat - d},${lon + d},${lat + d}`,
    imageDisplay: '100,100,96',
    returnGeometry: 'false',
    f: 'json',
  });
  const res = await fetch(`${SERVICE}/identify?${params}`, { signal });
  if (!res.ok) throw new Error(`imagery metadata ${res.status}`);
  const data = await res.json();
  return pickImage(data.results || [], Math.round(zoom));
}

// "1 year, 6 months" style age, relative to `now`.
export function ageText(date, now = new Date()) {
  let months = (now.getUTCFullYear() - date.getUTCFullYear()) * 12 + (now.getUTCMonth() - date.getUTCMonth());
  if (now.getUTCDate() < date.getUTCDate()) months -= 1;
  if (months < 1) return 'less than a month';
  const y = Math.floor(months / 12), m = months % 12;
  const part = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
  return [y && part(y, 'year'), m && part(m, 'month')].filter(Boolean).join(', ');
}
