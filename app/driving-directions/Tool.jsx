'use client';

import { useState, useEffect } from 'react';

const flag = (m) => (m === 'walking' ? 'w' : m === 'bicycling' ? 'b' : m === 'transit' ? 'r' : 'd');

export default function Tool() {
  const [from, setFrom] = useState('Lahore Airport');
  const [to, setTo] = useState('Badshahi Mosque, Lahore');
  const [mode, setMode] = useState('driving');
  const [src, setSrc] = useState('');
  const [mapsUrl, setMapsUrl] = useState('#');
  const [status, setStatus] = useState({ type: 'idle' });

  const go = () => {
    if (!from.trim() || !to.trim()) { setStatus({ type: 'err', msg: 'Enter both origin and destination.' }); return; }
    setStatus({ type: 'loading', msg: `Loading ${mode} route…` });
    const encF = encodeURIComponent(from), encT = encodeURIComponent(to);
    setSrc(`https://www.google.com/maps?saddr=${encF}&daddr=${encT}&dirflg=${flag(mode)}&output=embed`);
    setMapsUrl(`https://www.google.com/maps/dir/?api=1&origin=${encF}&destination=${encT}&travelmode=${mode}`);
    setTimeout(() => setStatus({ type: 'ok', msg: '✓ Route loaded. ETA and turn-by-turn steps visible in the map.' }), 800);
  };

  useEffect(() => { go(); /* eslint-disable-next-line */ }, []);
  useEffect(() => { go(); /* eslint-disable-next-line */ }, [mode]);

  const swap = () => { const a = from; setFrom(to); setTo(a); setTimeout(go, 0); };
  const myLocation = () => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition((p) => {
      setFrom(`${p.coords.latitude.toFixed(6)},${p.coords.longitude.toFixed(6)}`);
      setTimeout(go, 0);
    });
  };

  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-4">Plan a route</h2>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] uppercase tracking-wider text-electric-400 font-semibold">From (origin)</label>
          <input className="field mt-1" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Address, landmark, or coords" onKeyDown={(e) => e.key === 'Enter' && go()} />
          <button onClick={myLocation} className="btn-ghost text-xs mt-2">📍 Use my location</button>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-wider text-electric-400 font-semibold">To (destination)</label>
          <input className="field mt-1" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Address or landmark" onKeyDown={(e) => e.key === 'Enter' && go()} />
        </div>
      </div>

      <div className="mt-3 max-w-[260px]">
        <label className="text-[10px] uppercase tracking-wider text-electric-400 font-semibold">Travel mode</label>
        <select className="field mt-1" value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="driving">🚗 Driving</option>
          <option value="walking">🚶 Walking</option>
          <option value="bicycling">🚴 Bicycling</option>
          <option value="transit">🚆 Public transit</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button onClick={go} className="btn-primary">Get directions →</button>
        <button onClick={swap} className="btn-ghost">⇄ Swap</button>
        <a href={mapsUrl} target="_blank" rel="noopener" className="btn-ghost">Open in Google Maps</a>
      </div>

      {status.type === 'loading' && (
        <div className="bg-electric-500/10 border border-electric-400/30 text-electric-200 rounded-lg p-3 text-sm mt-3 flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border-2 border-electric-300 border-t-transparent animate-spin" />
          {status.msg}
        </div>
      )}
      {status.type === 'err' && <div className="bg-rose-500/10 border border-rose-400/30 text-rose-200 rounded-lg p-3 text-sm mt-3">{status.msg}</div>}
      {status.type === 'ok' && <div className="bg-emerald-500/10 border border-emerald-400/30 text-emerald-200 rounded-lg p-3 text-sm mt-3">{status.msg}</div>}

      <div className="relative w-full mt-4 rounded-2xl overflow-hidden border border-white/10 bg-ink-900" style={{ paddingBottom: '62%' }}>
        {src && <iframe src={src} className="absolute inset-0 w-full h-full" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Maps Directions" />}
      </div>
    </section>
  );
}
