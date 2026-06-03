'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('./MapPair.jsx'), { ssr: false });

const PRESETS = [
  { name: 'Eiffel Tower → Statue of Liberty', a: [48.858420, 2.294500], b: [40.689200, -74.044500] },
  { name: 'London → Paris', a: [51.501476, -0.140634], b: [48.858420, 2.294500] },
  { name: 'Karachi → Lahore', a: [24.860966, 67.001137], b: [31.582045, 74.329376] },
  { name: 'NYC → Sydney', a: [40.689200, -74.044500], b: [-33.856800, 151.215300] },
];

function haversineMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000, toRad = Math.PI / 180;
  const dLat = (lat2 - lat1) * toRad, dLon = (lon2 - lon1) * toRad;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * toRad) * Math.cos(lat2 * toRad) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function bearing(lat1, lon1, lat2, lon2) {
  const toRad = Math.PI / 180, toDeg = 180 / Math.PI;
  const y = Math.sin((lon2 - lon1) * toRad) * Math.cos(lat2 * toRad);
  const x = Math.cos(lat1 * toRad) * Math.sin(lat2 * toRad) - Math.sin(lat1 * toRad) * Math.cos(lat2 * toRad) * Math.cos((lon2 - lon1) * toRad);
  return (Math.atan2(y, x) * toDeg + 360) % 360;
}
function compass(deg) {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

export default function Tool() {
  const [lat1, setLat1] = useState('48.858420');
  const [lon1, setLon1] = useState('2.294500');
  const [lat2, setLat2] = useState('40.689200');
  const [lon2, setLon2] = useState('-74.044500');
  const [result, setResult] = useState(null);
  const [err, setErr] = useState('');

  const calc = () => {
    const a1 = parseFloat(lat1), o1 = parseFloat(lon1), a2 = parseFloat(lat2), o2 = parseFloat(lon2);
    if (![a1, o1, a2, o2].every(Number.isFinite)) { setErr('Enter valid decimal coordinates.'); return; }
    if (Math.abs(a1) > 90 || Math.abs(a2) > 90) { setErr('Latitude must be -90 to 90.'); return; }
    if (Math.abs(o1) > 180 || Math.abs(o2) > 180) { setErr('Longitude must be -180 to 180.'); return; }
    setErr('');
    const m = haversineMeters(a1, o1, a2, o2);
    const br = bearing(a1, o1, a2, o2);
    setResult({ km: m / 1000, mi: m / 1000 * 0.621371, nmi: m / 1000 * 0.539957, m, bearing: br, compass: compass(br), a: [a1, o1], b: [a2, o2] });
  };

  useEffect(() => { calc(); /* eslint-disable-next-line */ }, []);

  const swap = () => { setLat1(lat2); setLon1(lon2); setLat2(lat1); setLon2(lon1); setTimeout(calc, 0); };
  const useMyLocation = () => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition((p) => {
      setLat1(p.coords.latitude.toFixed(6));
      setLon1(p.coords.longitude.toFixed(6));
      setTimeout(calc, 0);
    });
  };

  const fmt = (n, p) => n.toLocaleString('en-US', { minimumFractionDigits: p, maximumFractionDigits: p });

  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-4">Calculate distance</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {PRESETS.map((p) => (
          <button key={p.name} onClick={() => { setLat1(String(p.a[0])); setLon1(String(p.a[1])); setLat2(String(p.b[0])); setLon2(String(p.b[1])); setTimeout(calc, 0); }} className="text-xs px-3 py-1.5 rounded-md bg-tint/5 hover:bg-accent/10 hover:text-accent border border-line transition">
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-tint/5 border border-line rounded-lg p-4">
          <div className="text-[11px] uppercase tracking-wider text-accent font-semibold mb-2">Point A</div>
          <input className="field mb-2" value={lat1} onChange={(e) => setLat1(e.target.value)} placeholder="Latitude" inputMode="decimal" />
          <input className="field mb-2" value={lon1} onChange={(e) => setLon1(e.target.value)} placeholder="Longitude" inputMode="decimal" />
          <button onClick={useMyLocation} className="text-xs btn-ghost w-full">📍 Use my location</button>
        </div>
        <div className="bg-tint/5 border border-line rounded-lg p-4">
          <div className="text-[11px] uppercase tracking-wider text-accent font-semibold mb-2">Point B</div>
          <input className="field mb-2" value={lat2} onChange={(e) => setLat2(e.target.value)} placeholder="Latitude" inputMode="decimal" />
          <input className="field" value={lon2} onChange={(e) => setLon2(e.target.value)} placeholder="Longitude" inputMode="decimal" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button onClick={calc} className="btn-primary">Calculate distance →</button>
        <button onClick={swap} className="btn-ghost">⇄ Swap A and B</button>
      </div>

      {err && <div className="bg-rose-500/10 border border-rose-400/30 text-rose-200 rounded-lg p-3 text-sm mt-3">{err}</div>}

      {result && !err && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            {[
              ['Kilometers', fmt(result.km, 3)],
              ['Miles', fmt(result.mi, 3)],
              ['Nautical miles', fmt(result.nmi, 3)],
              ['Meters', fmt(result.m, 1)],
            ].map(([k, v]) => (
              <div key={k} className="bg-accent/10 border border-accent/40 rounded-lg p-3 text-center">
                <div className="font-mono text-lg font-bold text-fg">{v}</div>
                <div className="text-[10px] uppercase tracking-wider text-fg-subtle mt-1 font-semibold">{k}</div>
              </div>
            ))}
          </div>
          <div className="bg-tint/5 border border-line rounded-lg p-3 mt-3 text-sm text-center">
            <span className="text-fg-subtle">Initial bearing: </span>
            <span className="font-mono">{fmt(result.bearing, 2)}° ({result.compass})</span>
          </div>
          <div className="h-[360px] rounded-2xl overflow-hidden ring-1 ring-line mt-4">
            <MapView a={result.a} b={result.b} />
          </div>
        </>
      )}
    </section>
  );
}
