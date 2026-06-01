'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('../components/MapView.jsx'), { ssr: false });

function ddToDms(v) {
  const sign = v < 0 ? -1 : 1;
  const abs = Math.abs(v);
  const d = Math.floor(abs);
  const mF = (abs - d) * 60;
  const m = Math.floor(mF);
  const s = (mF - m) * 60;
  return { sign, d, m, s };
}
function dmsStr(v, isLat) {
  const x = ddToDms(v);
  const hem = isLat ? (x.sign < 0 ? 'S' : 'N') : (x.sign < 0 ? 'W' : 'E');
  return `${x.d}° ${x.m}' ${x.s.toFixed(2)}" ${hem}`;
}

export default function Tool() {
  const [pos, setPos] = useState(null);
  const [coords, setCoords] = useState(null);
  const [status, setStatus] = useState({ type: 'idle', msg: '' });
  const [watching, setWatching] = useState(false);
  const watchRef = useRef(null);

  useEffect(() => () => { if (watchRef.current != null) navigator.geolocation.clearWatch(watchRef.current); }, []);

  const update = (p) => {
    setPos([p.coords.latitude, p.coords.longitude]);
    setCoords({
      lat: p.coords.latitude,
      lon: p.coords.longitude,
      acc: p.coords.accuracy,
      alt: p.coords.altitude,
      head: p.coords.heading,
      speed: p.coords.speed,
    });
  };

  const get = () => {
    if (!('geolocation' in navigator)) {
      setStatus({ type: 'err', msg: 'Geolocation not supported.' });
      return;
    }
    setStatus({ type: 'loading', msg: 'Requesting GPS…' });
    navigator.geolocation.getCurrentPosition(
      (p) => { update(p); setStatus({ type: 'ok', msg: `✓ Position acquired (±${Math.round(p.coords.accuracy)} m)` }); },
      (err) => setStatus({ type: 'err', msg: { 1: 'Permission denied.', 2: 'Position unavailable.', 3: 'Timed out.' }[err.code] || 'Could not get GPS.' }),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const toggleWatch = () => {
    if (watching) {
      navigator.geolocation.clearWatch(watchRef.current);
      watchRef.current = null;
      setWatching(false);
      setStatus({ type: 'ok', msg: 'Watching stopped.' });
    } else {
      if (!('geolocation' in navigator)) return;
      setStatus({ type: 'loading', msg: 'Starting live tracking…' });
      watchRef.current = navigator.geolocation.watchPosition(
        (p) => { update(p); setStatus({ type: 'ok', msg: `● Watching live · last update ${new Date().toLocaleTimeString()}` }); },
        (err) => setStatus({ type: 'err', msg: { 1: 'Permission denied.', 2: 'Position unavailable.', 3: 'Timed out.' }[err.code] || 'Watch failed.' }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
      );
      setWatching(true);
    }
  };

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    setStatus({ type: 'ok', msg: `✓ Copied: ${text}` });
  };

  return (
    <section className="glass rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">Get my GPS coordinates</h2>
        <div className="flex gap-2 flex-wrap">
          <button onClick={get} className="btn-primary">📍 Get coordinates</button>
          <button onClick={toggleWatch} className={watching ? 'btn-primary' : 'btn-ghost'} style={watching ? { background: '#dc2626', color: '#fff' } : {}}>
            {watching ? '■ Stop watching' : '▶ Watch live'}
          </button>
        </div>
      </div>

      {status.type === 'loading' && (
        <div className="bg-electric-500/10 border border-electric-400/30 text-electric-200 rounded-lg p-3 text-sm flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border-2 border-electric-300 border-t-transparent animate-spin" />
          {status.msg}
        </div>
      )}
      {status.type === 'err' && <div className="bg-rose-500/10 border border-rose-400/30 text-rose-200 rounded-lg p-3 text-sm">{status.msg}</div>}
      {status.type === 'ok' && <div className="bg-emerald-500/10 border border-emerald-400/30 text-emerald-200 rounded-lg p-3 text-sm">{status.msg}</div>}

      {coords && (
        <>
          <div className="bg-electric-500/10 border border-electric-400/30 rounded-lg p-4 mt-4 text-center">
            <div className="font-mono text-xl font-bold text-slate-100">{coords.lat.toFixed(6)}, {coords.lon.toFixed(6)}</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Decimal degrees · paste-ready</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-3 mt-2 text-center font-mono text-sm text-slate-300">
            {dmsStr(coords.lat, true)}, {dmsStr(coords.lon, false)}
          </div>

          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 text-sm">
            {[
              ['Latitude', coords.lat.toFixed(6)],
              ['Longitude', coords.lon.toFixed(6)],
              ['Accuracy', `${Math.round(coords.acc)} m`],
              ['Altitude', coords.alt != null && !isNaN(coords.alt) ? `${Math.round(coords.alt)} m` : '—'],
              ['Heading', coords.head != null && !isNaN(coords.head) ? `${Math.round(coords.head)}°` : '—'],
              ['Speed', coords.speed != null && !isNaN(coords.speed) ? `${coords.speed.toFixed(2)} m/s` : '—'],
            ].map(([k, v]) => (
              <div key={k} className="bg-white/5 border border-white/10 rounded-lg p-3">
                <dt className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{k}</dt>
                <dd className="font-mono mt-1">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap gap-2 mt-4">
            <button onClick={() => copy(`${coords.lat.toFixed(6)}, ${coords.lon.toFixed(6)}`)} className="btn-primary">📋 Copy DD</button>
            <button onClick={() => copy(`${dmsStr(coords.lat, true)}, ${dmsStr(coords.lon, false)}`)} className="btn-ghost">📋 Copy DMS</button>
            <a href={`https://www.google.com/maps?q=${coords.lat},${coords.lon}`} target="_blank" rel="noopener" className="btn-ghost">Google Maps</a>
          </div>

          {pos && (
            <div className="h-[360px] rounded-2xl overflow-hidden ring-1 ring-white/10 mt-4">
              <MapView pos={pos} />
            </div>
          )}
        </>
      )}
    </section>
  );
}
