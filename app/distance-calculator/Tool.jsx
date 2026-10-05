'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { measure, compass } from './dist.js';
import { parseCoordinate } from '../coordinates-converter/geo.js';

const MapView = dynamic(() => import('./MapPair.jsx'), { ssr: false });

const PRESETS = [
  { name: 'Eiffel Tower → Statue of Liberty', a: '48.858420, 2.294500', b: '40.689200, -74.044500' },
  { name: 'London → Paris', a: '51.501476, -0.140634', b: '48.858420, 2.294500' },
  { name: 'Karachi → Lahore', a: '24.860966, 67.001137', b: '31.582045, 74.329376' },
  { name: 'NYC → Sydney', a: '40.689200, -74.044500', b: '-33.856800, 151.215300' },
  { name: 'Tokyo → Los Angeles', a: '35.676200, 139.650300', b: '34.052200, -118.243700' },
];

const fmt = (n, p) => n.toLocaleString('en-US', { minimumFractionDigits: p, maximumFractionDigits: p });

export default function Tool() {
  const [textA, setTextA] = useState(PRESETS[0].a);
  const [textB, setTextB] = useState(PRESETS[0].b);

  // The result is derived from the current inputs on every render, so a
  // preset, swap or "use my location" can never show the previous pair.
  const a = useMemo(() => parseCoordinate(textA), [textA]);
  const b = useMemo(() => parseCoordinate(textB), [textB]);
  const result = useMemo(
    () => (a.error || b.error ? null : measure(a.lat, a.lon, b.lat, b.lon)),
    [a, b],
  );

  const swap = () => { setTextA(textB); setTextB(textA); };
  const useMyLocation = () => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition((p) => {
      setTextA(`${p.coords.latitude.toFixed(6)}, ${p.coords.longitude.toFixed(6)}`);
    });
  };

  const point = (label, text, setText, parsed, extra) => (
    <div className="bg-tint/5 border border-line rounded-lg p-4">
      <label className="block text-[11px] uppercase tracking-wider text-accent font-semibold mb-2" htmlFor={`pt-${label}`}>
        Point {label}
      </label>
      <input
        id={`pt-${label}`}
        className="field font-mono"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`48.8584, 2.2945 · 48°51'30"N 2°17'40"E · 31U 448252 5411957`}
      />
      {parsed.error ? (
        <p role="alert" className="text-xs text-rose-500 mt-2">{parsed.error}</p>
      ) : (
        <p className="text-xs text-fg-subtle mt-2 font-mono">
          {parsed.lat.toFixed(6)}, {parsed.lon.toFixed(6)} <span className="font-sans">· read as {parsed.format}</span>
        </p>
      )}
      {extra}
    </div>
  );

  const km = result ? result.meters / 1000 : 0;

  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-4">Calculate distance</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {PRESETS.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => { setTextA(p.a); setTextB(p.b); }}
            className="text-xs px-3 py-1.5 rounded-md bg-tint/5 hover:bg-accent/10 hover:text-accent border border-line transition"
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {point('A', textA, setTextA, a, (
          <button type="button" onClick={useMyLocation} className="text-xs btn-ghost w-full mt-2">📍 Use my location</button>
        ))}
        {point('B', textB, setTextB, b)}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button type="button" onClick={swap} className="btn-ghost">⇄ Swap A and B</button>
      </div>

      {result && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            {[
              ['Kilometers', fmt(km, 3)],
              ['Miles', fmt(km * 0.621371192, 3)],
              ['Nautical miles', fmt(km / 1.852, 3)],
              ['Meters', fmt(result.meters, 1)],
            ].map(([k, v]) => (
              <div key={k} className="bg-accent/10 border border-accent/40 rounded-lg p-3 text-center">
                <div className="font-mono text-lg font-bold text-fg">{v}</div>
                <div className="text-[10px] uppercase tracking-wider text-fg-subtle mt-1 font-semibold">{k}</div>
              </div>
            ))}
          </div>

          <dl className="grid sm:grid-cols-2 gap-3 mt-3 text-sm">
            <div className="bg-tint/5 border border-line rounded-lg p-3">
              <dt className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">Initial bearing (at A)</dt>
              <dd className="font-mono mt-1">{result.meters < 1 ? '—' : `${fmt(result.initial, 2)}° (${compass(result.initial)})`}</dd>
            </div>
            <div className="bg-tint/5 border border-line rounded-lg p-3">
              <dt className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">Final bearing (arriving at B)</dt>
              <dd className="font-mono mt-1">{result.meters < 1 ? '—' : `${fmt(result.final, 2)}° (${compass(result.final)})`}</dd>
            </div>
            <div className="bg-tint/5 border border-line rounded-lg p-3">
              <dt className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">Midpoint</dt>
              <dd className="font-mono mt-1">{result.midpoint.lat.toFixed(6)}, {result.midpoint.lon.toFixed(6)}</dd>
            </div>
            <div className="bg-tint/5 border border-line rounded-lg p-3">
              <dt className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">Sphere (haversine) for comparison</dt>
              <dd className="font-mono mt-1">
                {fmt(result.sphereMeters / 1000, 3)} km
                <span className="text-fg-subtle"> ({result.sphereMeters >= result.meters ? '+' : '−'}{fmt(Math.abs(result.sphereMeters - result.meters) / 1000, 3)} km)</span>
              </dd>
            </div>
          </dl>
          <p className="text-xs text-fg-subtle mt-2">
            {result.method === 'ellipsoid'
              ? 'Distance and bearings are calculated on the WGS 84 ellipsoid (Vincenty’s formulae).'
              : 'These points are almost exactly opposite each other on the globe, where the ellipsoid calculation does not converge, so the spherical result is shown.'}
          </p>

          <div className="h-[360px] rounded-2xl overflow-hidden ring-1 ring-line mt-4">
            <MapView path={result.path} midpoint={[result.midpoint.lat, result.midpoint.lon]} />
          </div>
        </>
      )}
    </section>
  );
}
