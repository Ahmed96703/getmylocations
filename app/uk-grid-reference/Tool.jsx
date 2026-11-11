'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import CopyButton from '../components/CopyButton.jsx';
import { track } from '../components/track.js';
import { parseCoordinate, ddToDms } from '../coordinates-converter/geo.js';
import { toGrid, fromGrid, gridRef, parseGridRef, onGrid } from './osgb.js';

const PointsMap = dynamic(() => import('../components/PointsMap.jsx'), {
  ssr: false,
  loading: () => <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading map" />,
});

const dms = (dd, pos, neg) => {
  const { d, m, s } = ddToDms(dd);
  return `${d}° ${m}′ ${s.toFixed(2)}″ ${dd < 0 ? neg : pos}`;
};
const SIZE = { 1: '1 m', 10: '10 m', 100: '100 m', 1000: '1 km', 10000: '10 km', 100000: '100 km' };

// Resolve any input to a point: a grid reference or easting/northing first,
// then any latitude/longitude format the coordinates converter reads.
function resolve(text) {
  const g = parseGridRef(text);
  if (g) {
    const c = fromGrid(g.e + g.size / 2, g.n + g.size / 2);
    return { lat: c.lat, lon: c.lon, e: g.e, n: g.n, size: g.size, from: 'grid' };
  }
  const p = parseCoordinate(text);
  if (p.error || p.lat == null) {
    return { error: /^[a-z]{2}\s*\d/i.test(text.trim())
      ? 'That grid reference is not valid. It needs two letters and an even number of digits, such as TQ 300 803.'
      : p.error || 'Enter a grid reference (TQ 300 803), an easting and northing (530080, 180337), or a latitude and longitude (51.5074, -0.1278).' };
  }
  const g2 = toGrid(p.lat, p.lon);
  if (!onGrid(g2.e, g2.n)) return { error: 'That point is outside the British National Grid, which covers Great Britain, the Isle of Man and nearby islands. Northern Ireland uses the Irish Grid.' };
  return { lat: p.lat, lon: p.lon, e: g2.e, n: g2.n, size: 1, from: 'latlon' };
}

export default function Tool() {
  const [text, setText] = useState('');
  const [res, setRes] = useState(null);
  const [fitKey, setFitKey] = useState(0);
  const [busy, setBusy] = useState(false);

  const show = (r) => {
    setRes(r);
    if (!r.error) { setFitKey((k) => k + 1); track('tool_run'); }
  };
  const submit = (e) => { e.preventDefault(); if (text.trim()) show(resolve(text)); };
  const at = (lat, lon) => {
    const r = resolve(`${lat.toFixed(6)}, ${lon.toFixed(6)}`);
    setText(r.error ? text : gridRef(r.e, r.n, 10));
    show(r);
  };
  const mine = () => {
    if (!('geolocation' in navigator)) { setRes({ error: 'Your browser does not support location. Type a grid reference or coordinates instead.' }); return; }
    setBusy(true);
    navigator.geolocation.getCurrentPosition(
      (p) => { setBusy(false); at(p.coords.latitude, p.coords.longitude); },
      (e) => { setBusy(false); setRes({ error: e.code === 1 ? 'Location permission was denied. Type a grid reference or coordinates instead.' : 'Your device could not get a location fix.' }); },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 },
    );
  };

  const ok = res && !res.error;
  const refs = ok && [10, 8, 6, 4].map((d) => [d, gridRef(res.e, res.n, d)]);
  const latlon = ok && `${res.lat.toFixed(6)}, ${res.lon.toFixed(6)}`;
  const row = 'flex flex-wrap items-baseline justify-between gap-2 py-2 border-b border-line-subtle';

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">Grid reference ⇄ latitude and longitude</h2>
        <button type="button" onClick={mine} disabled={busy} className="btn-primary">📍 {busy ? 'Locating…' : 'My grid reference'}</button>
      </div>

      <form onSubmit={submit} className="flex flex-wrap gap-2 mb-2">
        <input
          className="field flex-1 min-w-[220px] font-mono"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="TQ 30080 80337, 530080 180337 or 51.5074, -0.1278"
          aria-label="Grid reference, easting and northing, or latitude and longitude"
        />
        <button type="submit" className="btn-ghost">Convert</button>
      </form>
      <p className="text-xs text-fg-subtle mb-3">
        Examples:{' '}
        {['NN 166 712', 'SU 4 1', '530080, 180337', '53.4808, -2.2426'].map((x, i) => (
          <span key={x}>{i > 0 && ' · '}<button type="button" className="text-accent hover:underline font-mono" onClick={() => { setText(x); show(resolve(x)); }}>{x}</button></span>
        ))}
      </p>

      <div aria-live="polite">
        {res?.error && <p role="alert" className="my-2 bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{res.error}</p>}
      </div>

      {ok && (
        <div className="grid lg:grid-cols-2 gap-5 my-4">
          <div>
            <h3 className="text-sm font-semibold mb-1">OS grid reference</h3>
            {res.from === 'grid' && res.size > 1 && (
              <p className="text-xs text-fg-subtle mb-1">Your reference marks a {SIZE[res.size]} square; the latitude and longitude are for its centre.</p>
            )}
            <dl className="text-sm">
              {refs.filter(([d]) => res.from !== 'grid' || 10 ** (5 - d / 2) >= res.size).map(([d, r]) => (
                <div key={d} className={row}>
                  <dt className="text-fg-muted">{d}-figure ({SIZE[10 ** (5 - d / 2)]})</dt>
                  <dd className="flex items-center gap-3"><span className="font-mono font-semibold text-fg">{r}</span><CopyButton text={r} className="text-xs text-accent hover:underline" /></dd>
                </div>
              ))}
              <div className={row}>
                <dt className="text-fg-muted">Easting, northing</dt>
                <dd className="flex items-center gap-3"><span className="font-mono text-fg">{Math.floor(res.e)}, {Math.floor(res.n)}</span><CopyButton text={`${Math.floor(res.e)}, ${Math.floor(res.n)}`} className="text-xs text-accent hover:underline" /></dd>
              </div>
              <div className={row}>
                <dt className="text-fg-muted">100 km square</dt>
                <dd className="font-mono text-fg">{gridRef(res.e, res.n, 0)}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-1">Latitude and longitude (WGS84, as GPS)</h3>
            <dl className="text-sm">
              <div className={row}>
                <dt className="text-fg-muted">Decimal degrees</dt>
                <dd className="flex items-center gap-3"><span className="font-mono font-semibold text-fg">{latlon}</span><CopyButton text={latlon} className="text-xs text-accent hover:underline" /></dd>
              </div>
              <div className={row}>
                <dt className="text-fg-muted">Degrees, minutes, seconds</dt>
                <dd className="font-mono text-fg">{dms(res.lat, 'N', 'S')}, {dms(res.lon, 'E', 'W')}</dd>
              </div>
            </dl>
            <div className="mt-3 flex flex-wrap gap-x-4 text-sm">
              <a href={`https://www.google.com/maps/search/?api=1&query=${res.lat.toFixed(6)},${res.lon.toFixed(6)}`} target="_blank" rel="noopener" className="text-accent hover:underline">Open in Google Maps</a>
              <a href={`https://www.openstreetmap.org/?mlat=${res.lat.toFixed(6)}&mlon=${res.lon.toFixed(6)}#map=15/${res.lat.toFixed(5)}/${res.lon.toFixed(5)}`} target="_blank" rel="noopener" className="text-accent hover:underline">OpenStreetMap</a>
            </div>
          </div>
        </div>
      )}

      <PointsMap
        center={ok ? { lat: res.lat, lon: res.lon } : null}
        radius={ok && res.size > 1 ? Math.max(res.size * 0.7, 100) : null}
        fitKey={fitKey}
        onPick={at}
        label="Map: click to get the grid reference"
        centerTip="Converted point"
        start={[54.5, -3]}
        startZoom={5}
      />
      <p className="mt-2 text-xs text-fg-subtle">Click anywhere in Great Britain on the map to get its grid reference.</p>

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Converted on your device with the Ordnance Survey&rsquo;s National Grid projection and its standard 7-parameter shift between GPS (WGS84) and the grid&rsquo;s OSGB36 datum, accurate to about 5 metres, enough for walking, surveys by eye and planning; land surveys that need centimetres use the OS&rsquo;s OSTN15 model.
      </p>
    </section>
  );
}
