// Flood warnings and river levels in England from the Environment Agency's
// real-time flood-monitoring API (Open Government Licence). No React, so it
// can be tested on its own. Wales, Scotland and Northern Ireland run their
// own services, which the page links to.

import { haversine } from '../distance-calculator/dist.js';

const API = 'https://environment.data.gov.uk/flood-monitoring';

// severityLevel 1-4 as the Environment Agency names them.
export const SEVERITY = {
  1: { label: 'Severe flood warning', color: '#7f1d1d', advice: 'Danger to life. Follow advice from the emergency services and be ready to leave.' },
  2: { label: 'Flood warning', color: '#dc2626', advice: 'Flooding is expected. Act now: move people, pets and valuables upstairs, turn off gas, water and electricity if safe.' },
  3: { label: 'Flood alert', color: '#f59e0b', advice: 'Flooding is possible. Be prepared: check your flood plan and keep an eye on updates.' },
  4: { label: 'Warning no longer in force', color: '#64748b', advice: 'The risk has passed, but water may still be around. Take care.' },
};

const get = async (path) => {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`The Environment Agency service returned an error (HTTP ${res.status}). Try again in a minute.`);
  return (await res.json()).items;
};

// England only, roughly: the API answers with nothing elsewhere.
export const inEngland = (lat, lon) => lat > 49.8 && lat < 55.85 && lon > -6.5 && lon < 1.8;

// Warnings and alerts whose area is within `km`, with each area's centre.
export async function warningsNear(lat, lon, km) {
  const items = await get(`/id/floods?lat=${lat.toFixed(3)}&long=${lon.toFixed(3)}&dist=${km}`);
  const areas = await Promise.all(items.slice(0, 40).map((w) => get(`/id/floodAreas/${encodeURIComponent(w.floodAreaID)}`).catch(() => null)));
  return items.slice(0, 40).map((w, i) => {
    const a = Array.isArray(areas[i]) ? areas[i][0] : areas[i];
    const alat = a?.lat;
    const alon = a?.long;
    return {
      id: w.floodAreaID,
      level: w.severityLevel,
      title: w.description,
      area: a?.label || w.eaAreaName || '',
      river: w.floodArea?.riverOrSea || '',
      county: w.floodArea?.county || '',
      message: (w.message || '').trim(),
      raised: w.timeRaised,
      changed: w.timeMessageChanged,
      tidal: w.isTidal,
      lat: alat,
      lon: alon,
      km: alat != null ? haversine(lat, lon, alat, alon) / 1000 : null,
      url: `https://check-for-flooding.service.gov.uk/target-area/${encodeURIComponent(w.floodAreaID)}`,
    };
  }).sort((a, b) => a.level - b.level || (a.km ?? 1e9) - (b.km ?? 1e9));
}

// The nearest river and sea level gauges with their latest reading and, where
// published, the station's normal range.
export async function gaugesNear(lat, lon, km = 10, max = 8) {
  const list = await get(`/id/stations?lat=${lat.toFixed(3)}&long=${lon.toFixed(3)}&dist=${km}&parameter=level`);
  const near = list
    .filter((s) => s.RLOIid && Number.isFinite(s.lat) && Number.isFinite(s.long)) // public gauges only
    .map((s) => ({ ref: s.notation || s.stationReference, rloi: [].concat(s.RLOIid)[0], name: s.label, river: s.riverName || '', town: s.town || '', lat: s.lat, lon: s.long, km: haversine(lat, lon, s.lat, s.long) / 1000 }))
    .sort((a, b) => a.km - b.km)
    .slice(0, max);
  const details = await Promise.all(near.map((s) => get(`/id/stations/${encodeURIComponent(s.ref)}`).catch(() => null)));
  return near.map((s, i) => {
    const d = details[i];
    const measures = [].concat(d?.measures || []);
    const m = measures.find((x) => x.parameter === 'level' && x.latestReading && typeof x.latestReading === 'object' && Number.isFinite(x.latestReading.value));
    const scale = typeof d?.stageScale === 'object' ? d.stageScale : null;
    const value = m?.latestReading.value;
    const high = scale?.typicalRangeHigh;
    const low = scale?.typicalRangeLow;
    let state = 'unknown';
    if (value != null && high != null && low != null) state = value > high ? 'high' : value < low ? 'low' : 'normal';
    return {
      ...s,
      value,
      unit: m?.unitName || 'm',
      qualifier: m?.qualifier || '',
      at: m?.latestReading.dateTime,
      high,
      low,
      record: scale?.maxOnRecord?.value,
      state,
      url: `https://check-for-flooding.service.gov.uk/station/${encodeURIComponent(s.rloi)}`,
    };
  });
}
