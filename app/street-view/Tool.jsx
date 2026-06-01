'use client';

import { useState, useEffect } from 'react';

const PRESETS = [
  'Eiffel Tower, Paris',
  'Times Square, New York',
  'Burj Khalifa, Dubai',
  'Badshahi Mosque, Lahore',
  'Sydney Opera House',
  'Tokyo Tower',
];

function isCoords(s) {
  const m = s.match(/^\s*(-?\d+(?:\.\d+)?)\s*[,\s]+\s*(-?\d+(?:\.\d+)?)\s*$/);
  return m ? { lat: parseFloat(m[1]), lon: parseFloat(m[2]) } : null;
}

export default function Tool() {
  const [query, setQuery] = useState('Eiffel Tower, Paris');
  const [src, setSrc] = useState('');
  const [mapsUrl, setMapsUrl] = useState('#');
  const [status, setStatus] = useState({ type: 'idle' });

  const load = (q) => {
    if (!q) return;
    setStatus({ type: 'loading', msg: `Loading Street View for "${q}"…` });
    const c = isCoords(q);
    if (c) {
      setSrc(`https://www.google.com/maps?q=&layer=c&cbll=${c.lat},${c.lon}&output=embed`);
      setMapsUrl(`https://www.google.com/maps?q=&layer=c&cbll=${c.lat},${c.lon}`);
    } else {
      const enc = encodeURIComponent(q);
      setSrc(`https://www.google.com/maps?q=${enc}&layer=c&output=embed`);
      setMapsUrl(`https://www.google.com/maps?q=${enc}`);
    }
    setTimeout(() => setStatus({ type: 'ok', msg: '✓ Street View loaded. If you see a map instead of a panorama, no Street View exists at this exact spot.' }), 800);
  };

  useEffect(() => { load(query); /* eslint-disable-next-line */ }, []);

  const myLocation = () => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition((p) => {
      const s = `${p.coords.latitude.toFixed(6)}, ${p.coords.longitude.toFixed(6)}`;
      setQuery(s); load(s);
    });
  };

  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-3">Load a Street View</h2>

      <div className="flex flex-wrap gap-2">
        <input className="field flex-1 min-w-[200px]" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Address, landmark, or 'lat, lon'" onKeyDown={(e) => e.key === 'Enter' && load(query)} />
        <button onClick={() => load(query)} className="btn-primary">View →</button>
        <button onClick={myLocation} className="btn-ghost">📍 My location</button>
      </div>

      <div className="flex flex-wrap gap-1 mt-3">
        {PRESETS.map((p) => (
          <button key={p} onClick={() => { setQuery(p); load(p); }} className="text-xs px-3 py-1.5 rounded-md bg-white/5 hover:bg-electric-500/10 hover:text-electric-400 border border-white/10 transition">{p}</button>
        ))}
      </div>

      {status.type === 'loading' && (
        <div className="bg-electric-500/10 border border-electric-400/30 text-electric-200 rounded-lg p-3 text-sm mt-3 flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border-2 border-electric-300 border-t-transparent animate-spin" />
          {status.msg}
        </div>
      )}
      {status.type === 'ok' && <div className="bg-emerald-500/10 border border-emerald-400/30 text-emerald-200 rounded-lg p-3 text-sm mt-3">{status.msg}</div>}

      <div className="relative w-full mt-4 rounded-2xl overflow-hidden border border-white/10 bg-ink-900" style={{ paddingBottom: '56.25%' }}>
        {src && <iframe src={src} className="absolute inset-0 w-full h-full" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Street View" />}
      </div>

      <div className="flex gap-2 mt-4">
        <a href={mapsUrl} target="_blank" rel="noopener" className="btn-ghost">Open in Google Maps</a>
      </div>
    </section>
  );
}
