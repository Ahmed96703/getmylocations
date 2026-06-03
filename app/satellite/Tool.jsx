'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map.jsx'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[16/10] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading satellite map" />
  ),
});

const PRESETS = [
  { label: 'Statue of Liberty', lat: 40.6892, lon: -74.0445 },
  { label: 'Eiffel Tower', lat: 48.8584, lon: 2.2945 },
  { label: 'Burj Khalifa', lat: 25.1972, lon: 55.2744 },
  { label: 'Pyramids of Giza', lat: 29.9792, lon: 31.1342 },
];

const DEFAULT = { lat: 40.6892, lon: -74.0445, label: 'Statue of Liberty' };

export default function Tool() {
  const [query, setQuery] = useState('');
  const [pos, setPos] = useState([DEFAULT.lat, DEFAULT.lon]);
  const [zoom, setZoom] = useState(17);
  const [pin, setPin] = useState({ lat: DEFAULT.lat, lon: DEFAULT.lon, label: DEFAULT.label });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const goTo = (lat, lon, label, z = 17) => {
    setPos([lat, lon]);
    setZoom(z);
    setPin({ lat, lon, label });
  };

  const search = async (q) => {
    const trimmed = q?.trim();
    if (!trimmed) return;
    setBusy(true);
    setErr('');
    try {
      const coordMatch = trimmed.match(/^\s*(-?\d+(?:\.\d+)?)\s*[,\s]+\s*(-?\d+(?:\.\d+)?)\s*$/);
      if (coordMatch) {
        goTo(parseFloat(coordMatch[1]), parseFloat(coordMatch[2]), `Coordinates ${coordMatch[1]}, ${coordMatch[2]}`);
        return;
      }
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(trimmed)}`;
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      const data = await res.json();
      if (!data?.length) { setErr(`No result for "${trimmed}".`); return; }
      goTo(parseFloat(data[0].lat), parseFloat(data[0].lon), data[0].display_name);
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
      (p) => { goTo(p.coords.latitude, p.coords.longitude, 'Your location', 18); setBusy(false); },
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
          placeholder="Search address, landmark, or 'lat, lon'"
          aria-label="Search the satellite map"
        />
        <button onClick={() => search(query)} disabled={busy} className="btn-primary">{busy ? 'Searching…' : 'View →'}</button>
        <button onClick={useMyLocation} disabled={busy} className="btn-ghost">📍 My location</button>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => goTo(p.lat, p.lon, p.label)}
            className="text-xs px-3 py-1.5 rounded-md bg-tint/5 hover:bg-accent/10 hover:text-accent border border-line transition"
          >
            {p.label}
          </button>
        ))}
      </div>

      {err && (
        <div className="mb-3 bg-red-500/10 border border-red-400/30 text-red-200 rounded-lg p-3 text-sm">{err}</div>
      )}

      <Map center={pos} zoom={zoom} pin={pin} onPin={(lat, lon) => setPin({ lat, lon, label: 'Pinned location' })} />

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
    </section>
  );
}
