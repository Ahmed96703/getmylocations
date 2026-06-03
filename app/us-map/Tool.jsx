'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map.jsx'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[16/10] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading map" />
  ),
});

const US_CENTER = [39.8283, -98.5795];

export default function Tool() {
  const [query, setQuery] = useState('');
  const [pos, setPos] = useState(US_CENTER);
  const [zoom, setZoom] = useState(4);
  const [pin, setPin] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const search = async (q) => {
    const trimmed = q?.trim();
    if (!trimmed) return;
    setBusy(true);
    setErr('');
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=us&q=${encodeURIComponent(trimmed)}`;
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      const data = await res.json();
      if (!data?.length) { setErr(`No US result for "${trimmed}".`); return; }
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      setPos([lat, lon]);
      setZoom(12);
      setPin({ lat, lon, label: data[0].display_name });
    } catch (e) {
      setErr('Search failed. Try again.');
    } finally {
      setBusy(false);
    }
  };

  const useMyLocation = () => {
    if (!('geolocation' in navigator)) { setErr('Your browser does not support geolocation.'); return; }
    setBusy(true);
    setErr('');
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const lat = p.coords.latitude;
        const lon = p.coords.longitude;
        setPos([lat, lon]);
        setZoom(13);
        setPin({ lat, lon, label: 'Your location' });
        setBusy(false);
      },
      (e) => {
        setErr(e.code === 1 ? 'Location permission denied.' : 'Could not get your location.');
        setBusy(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          className="field flex-1 min-w-[200px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && search(query)}
          placeholder="Search any US city, ZIP, or address"
          aria-label="Search the US map"
        />
        <button onClick={() => search(query)} disabled={busy} className="btn-primary">{busy ? 'Searching…' : 'Search'}</button>
        <button onClick={useMyLocation} disabled={busy} className="btn-ghost">📍 Use my location</button>
      </div>

      {err && (
        <div className="mb-3 bg-red-500/10 border border-red-400/30 text-red-200 rounded-lg p-3 text-sm">{err}</div>
      )}

      <Map center={pos} zoom={zoom} pin={pin} onPin={(lat, lon) => setPin({ lat, lon, label: 'Pinned location' })} />

      {pin && (
        <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
          <div className="glass-strong rounded-lg p-3">
            <div className="text-[11px] uppercase tracking-wider text-accent font-semibold">Latitude</div>
            <div className="font-mono mt-1">{pin.lat.toFixed(6)}</div>
          </div>
          <div className="glass-strong rounded-lg p-3">
            <div className="text-[11px] uppercase tracking-wider text-accent font-semibold">Longitude</div>
            <div className="font-mono mt-1">{pin.lon.toFixed(6)}</div>
          </div>
          <div className="glass-strong rounded-lg p-3 truncate" title={pin.label}>
            <div className="text-[11px] uppercase tracking-wider text-accent font-semibold">Place</div>
            <div className="mt-1 truncate text-fg-muted">{pin.label}</div>
          </div>
        </div>
      )}
    </section>
  );
}
