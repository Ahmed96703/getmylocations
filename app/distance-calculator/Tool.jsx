'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { measure, compass } from './dist.js';
import { parseCoordinate } from '../coordinates-converter/geo.js';
import { searchAddress } from '../address-finder/geocode.js';

const MapView = dynamic(() => import('./MapPair.jsx'), { ssr: false });

// Presets come with their coordinates, so they never call the geocoder.
const place = (name, lat, lon) => ({ text: name, place: { query: name, lat, lon, name } });
const PRESETS = [
  { name: 'London → Paris', a: place('London, UK', 51.507351, -0.127758), b: place('Paris, France', 48.856614, 2.352222) },
  { name: 'New York → Los Angeles', a: place('New York, NY', 40.712776, -74.005974), b: place('Los Angeles, CA', 34.052235, -118.243683) },
  { name: 'Sydney → Melbourne', a: place('Sydney, Australia', -33.868820, 151.209296), b: place('Melbourne, Australia', -37.813629, 144.963058) },
  { name: 'Karachi → Lahore', a: place('Karachi, Pakistan', 24.860966, 67.001137), b: place('Lahore, Pakistan', 31.582045, 74.329376) },
  { name: 'Eiffel Tower → Statue of Liberty', a: { text: '48.858420, 2.294500' }, b: { text: '40.689200, -74.044500' } },
];

const fmt = (n, p) => n.toLocaleString('en-US', { minimumFractionDigits: p, maximumFractionDigits: p });

// A point is the typed text plus, once looked up, the place it was found as.
// Coordinates are read directly; anything else is a place name to search.
function resolve(pt) {
  if (pt.place && pt.place.query === pt.text) return { lat: pt.place.lat, lon: pt.place.lon, name: pt.place.name };
  const text = pt.text.trim();
  if (!text) return { error: 'Type a place or paste a coordinate.' };
  const parsed = parseCoordinate(text);
  // A letters-only word such as "Perth" is also a valid geohash; treat it as a place.
  const looksLikeName = /[a-z]/i.test(text) && (parsed.error || (parsed.format === 'Geohash' && !/\d/.test(text)));
  if (looksLikeName) return { pending: true };
  return parsed;
}

// "Chicago, Illinois, United States" reads better than the full OSM address.
const shortName = (r) => [r.name || r.display_name.split(',')[0], r.address?.state, r.address?.country]
  .filter((v, i, a) => v && a.indexOf(v) === i)
  .join(', ');

export default function Tool() {
  const [ptA, setPtA] = useState(PRESETS[0].a);
  const [ptB, setPtB] = useState(PRESETS[0].b);
  const [busy, setBusy] = useState('');
  const [errors, setErrors] = useState({});

  // The result is derived from the current inputs on every render, so a
  // preset, swap or "use my location" can never show the previous pair.
  const a = useMemo(() => resolve(ptA), [ptA]);
  const b = useMemo(() => resolve(ptB), [ptB]);
  const ready = (p) => !p.error && !p.pending;
  const result = useMemo(
    () => (ready(a) && ready(b) ? measure(a.lat, a.lon, b.lat, b.lon) : null),
    [a, b],
  );

  // Look up every point that is still a place name, A first (the geocoder allows one request a second).
  const findPlaces = async () => {
    for (const [label, pt, set] of [['A', ptA, setPtA], ['B', ptB, setPtB]]) {
      if (!resolve(pt).pending) continue;
      const query = pt.text.trim();
      setBusy(label);
      try {
        const found = await searchAddress(query);
        if (!found?.length) {
          setErrors((e) => ({ ...e, [label]: `No place found for "${query}". Add the state or country, or paste coordinates.` }));
        } else {
          const r = found[0];
          set({ text: pt.text, place: { query: pt.text, lat: Number(r.lat), lon: Number(r.lon), name: shortName(r) } });
          setErrors((e) => ({ ...e, [label]: '' }));
        }
      } catch (err) {
        setErrors((e) => ({ ...e, [label]: err.message?.includes('limiting') ? err.message : 'The place search did not complete. Check your connection and try again.' }));
      }
    }
    setBusy('');
  };

  const edit = (label, set) => (text) => {
    set({ text });
    setErrors((e) => ({ ...e, [label]: '' }));
  };

  const swap = () => { setPtA(ptB); setPtB(ptA); };
  const useMyLocation = () => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition((p) => {
      setPtA({ text: `${p.coords.latitude.toFixed(6)}, ${p.coords.longitude.toFixed(6)}` });
    });
  };

  const point = (label, pt, parsed, onText, extra) => (
    <div className="bg-tint/5 border border-line rounded-lg p-4">
      <label className="block text-[11px] uppercase tracking-wider text-accent font-semibold mb-2" htmlFor={`pt-${label}`}>
        Point {label}
      </label>
      <input
        id={`pt-${label}`}
        className="field"
        value={pt.text}
        onChange={(e) => onText(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); findPlaces(); } }}
        placeholder="City, address or coordinates"
        autoComplete="off"
      />
      {busy === label ? (
        <p className="text-xs text-fg-subtle mt-2">Searching…</p>
      ) : errors[label] ? (
        <p role="alert" className="text-xs text-rose-500 mt-2">{errors[label]}</p>
      ) : parsed.pending ? (
        <p className="text-xs text-fg-subtle mt-2">Press Enter or <strong>Calculate</strong> to find this place.</p>
      ) : parsed.error ? (
        <p role="alert" className="text-xs text-rose-500 mt-2">{parsed.error}</p>
      ) : (
        <p className="text-xs text-fg-subtle mt-2">
          {parsed.name && <span className="text-fg-muted">{parsed.name} · </span>}
          <span className="font-mono">{parsed.lat.toFixed(6)}, {parsed.lon.toFixed(6)}</span>
          {parsed.format && <span> · read as {parsed.format}</span>}
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
            onClick={() => { setPtA(p.a); setPtB(p.b); setErrors({}); }}
            className="text-xs px-3 py-1.5 rounded-md bg-tint/5 hover:bg-accent/10 hover:text-accent border border-line transition"
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {point('A', ptA, a, edit('A', setPtA), (
          <button type="button" onClick={useMyLocation} className="text-xs btn-ghost w-full mt-2">📍 Use my location</button>
        ))}
        {point('B', ptB, b, edit('B', setPtB))}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {(a.pending || b.pending) && (
          <button type="button" onClick={findPlaces} disabled={!!busy} className="btn-primary">Calculate</button>
        )}
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
            This is the straight-line (&ldquo;as the crow flies&rdquo;) distance. For the distance by road, use{' '}
            <Link href="/driving-directions" className="text-accent hover:underline">driving directions</Link>.{' '}
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
