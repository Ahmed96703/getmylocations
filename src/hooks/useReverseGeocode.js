import { useEffect, useRef, useState } from 'react';

const BDC = (lat, lon) =>
  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
const NOMINATIM = (lat, lon) =>
  `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=12&accept-language=en`;

async function fetchBDC(lat, lon, signal) {
  const r = await fetch(BDC(lat, lon), { signal });
  if (!r.ok) throw new Error('bdc');
  const j = await r.json();
  return {
    city: j.city || j.locality || j.localityInfo?.administrative?.[3]?.name || '—',
    region: j.principalSubdivision || '',
    country: j.countryName || '—',
    countryCode: (j.countryCode || '').toUpperCase(),
  };
}

async function fetchNominatim(lat, lon, signal) {
  const r = await fetch(NOMINATIM(lat, lon), { signal, headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error('nominatim');
  const j = await r.json();
  const a = j.address || {};
  return {
    city: a.city || a.town || a.village || a.municipality || a.county || '—',
    region: a.state || a.region || '',
    country: a.country || '—',
    countryCode: (a.country_code || '').toUpperCase(),
  };
}

export function useReverseGeocode(pos) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastKey = useRef('');
  const ctrl = useRef(null);

  useEffect(() => {
    if (!pos) return;
    const [lat, lon] = pos;
    const key = `${lat.toFixed(3)},${lon.toFixed(3)}`;
    if (key === lastKey.current) return;
    lastKey.current = key;

    ctrl.current?.abort();
    ctrl.current = new AbortController();
    const signal = ctrl.current.signal;

    const t = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        let out;
        try { out = await fetchBDC(lat, lon, signal); }
        catch { out = await fetchNominatim(lat, lon, signal); }
        if (!signal.aborted) setData(out);
      } catch (e) {
        if (e.name !== 'AbortError') {
          setError('Could not resolve address');
          setData(null);
        }
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    }, 350);

    return () => { clearTimeout(t); ctrl.current?.abort(); };
  }, [pos?.[0], pos?.[1]]);

  return { data, loading, error };
}
