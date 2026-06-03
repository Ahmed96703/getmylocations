'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map.jsx'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[16/10] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading map" />
  ),
});

const LAYERS = [
  { id: 'standard', label: 'Standard' },
  { id: 'satellite', label: 'Satellite' },
  { id: 'dark', label: 'Dark' },
];

export default function Tool() {
  const [query, setQuery] = useState('');
  const [pos, setPos] = useState([20, 0]);
  const [zoom, setZoom] = useState(2);
  const [pin, setPin] = useState(null);
  const [layer, setLayer] = useState('standard');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const search = async (q) => {
    const trimmed = q?.trim();
    if (!trimmed) return;
    setBusy(true);
    setErr('');
    try {
      const coordMatch = trimmed.match(/^\s*(-?\d+(?:\.\d+)?)\s*[,\s]+\s*(-?\d+(?:\.\d+)?)\s*$/);
      if (coordMatch) {
        const lat = parseFloat(coordMatch[1]);
        const lon = parseFloat(coordMatch[2]);
        setPos([lat, lon]); setZoom(13);
        setPin({ lat, lon, label: `${lat}, ${lon}` });
        return;
      }
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(trimmed)}`;
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      const data = await res.json();
      if (!data?.length) { setErr(`No result for "${trimmed}".`); return; }
      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);
      setPos([lat, lon]); setZoom(13);
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
        setPos([lat, lon]); setZoom(15);
        setPin({ lat, lon, label: 'Your location' });
        setBusy(false);
      },
      (e) => { setErr(e.code === 1 ? 'Location permission denied.' : 'Could not get your location.'); setBusy(false); },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap gap-2 mb-3">
        <input
          className="field flex-1 min-w-[200px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && search(query)}
          placeholder="Search any place, address, or 'lat, lon'"
          aria-label="Search the map"
        />
        <button onClick={() => search(query)} disabled={busy} className="btn-primary">{busy ? 'Searching…' : 'Search'}</button>
        <button onClick={useMyLocation} disabled={busy} className="btn-ghost">📍 My location</button>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-[11px] uppercase tracking-wider text-fg-subtle mr-1">Map style:</span>
        {LAYERS.map((l) => (
          <button
            key={l.id}
            onClick={() => setLayer(l.id)}
            aria-pressed={layer === l.id}
            className={`text-xs px-3 py-1.5 rounded-md border transition ${
              layer === l.id
                ? 'bg-accent/15 border-electric-400/40 text-accent'
                : 'bg-tint/5 border-line hover:bg-accent/10 hover:text-accent'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {err && (
        <div className="mb-3 bg-red-500/10 border border-red-400/30 text-red-200 rounded-lg p-3 text-sm">{err}</div>
      )}

      <Map center={pos} zoom={zoom} pin={pin} layer={layer} onPin={(lat, lon) => setPin({ lat, lon, label: 'Pinned location' })} />

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
