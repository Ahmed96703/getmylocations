'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { searchAddress } from '../address-finder/geocode.js';
import CopyButton from '../components/CopyButton.jsx';
import { track } from '../components/track.js';
import { elevations, samplePath, profileStats } from './elevation.js';

const DrawMap = dynamic(() => import('../components/DrawMap.jsx'), {
  ssr: false,
  loading: () => <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading map" />,
});

const FT = 3.28084;
const m = (v, ft) => (ft ? `${Math.round(v * FT).toLocaleString()} ft` : `${Math.round(v).toLocaleString()} m`);
const km = (v, ft) => (ft ? `${(v / 1609.344).toFixed(2)} mi` : v < 1000 ? `${Math.round(v)} m` : `${(v / 1000).toFixed(2)} km`);

function Profile({ samples, ft }) {
  const W = 640;
  const H = 180;
  const hs = samples.map((s) => s.h);
  const min = Math.min(...hs);
  const max = Math.max(...hs);
  const pad = Math.max(5, (max - min) * 0.1);
  const lo = min - pad;
  const span = max + pad - lo;
  const x = (d) => (d / samples.at(-1).d) * W;
  const y = (h) => H - ((h - lo) / span) * H;
  const line = samples.map((s, i) => `${i ? 'L' : 'M'}${x(s.d).toFixed(1)},${y(s.h).toFixed(1)}`).join('');
  return (
    <figure className="mt-4">
      <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full h-auto" role="img" aria-label={`Elevation profile from ${m(samples[0].h, ft)} to ${m(samples.at(-1).h, ft)}, highest ${m(max, ft)}, lowest ${m(min, ft)}`}>
        <path d={`${line}L${W},${H}L0,${H}Z`} fill="rgb(37 99 235 / 0.15)" />
        <path d={line} fill="none" stroke="#2563eb" strokeWidth="2" />
        <text x="4" y="12" className="fill-current text-fg-subtle" fontSize="11">{m(max, ft)}</text>
        <text x="4" y={H - 4} className="fill-current text-fg-subtle" fontSize="11">{m(min, ft)}</text>
        <text x="0" y={H + 16} className="fill-current text-fg-subtle" fontSize="11">0</text>
        <text x={W} y={H + 16} textAnchor="end" className="fill-current text-fg-subtle" fontSize="11">{km(samples.at(-1).d, ft)}</text>
      </svg>
      <figcaption className="text-xs text-fg-subtle">Height along the line from the first point you clicked, sampled at 100 points.</figcaption>
    </figure>
  );
}

export default function Tool() {
  const [mode, setMode] = useState('point');
  const [pts, setPts] = useState([]);
  const [view, setView] = useState(null);
  const [point, setPoint] = useState(null);
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState({ type: 'idle', msg: '' });
  const [query, setQuery] = useState('');
  const [ft, setFt] = useState(false);

  const lookPoint = async (lat, lon, label, gps) => {
    setPts([[lat, lon]]);
    setStatus({ type: 'loading', msg: 'Looking up the ground height…' });
    try {
      const [h] = await elevations([[lat, lon]]);
      setPoint({ lat, lon, h, label, gps });
      setStatus({ type: 'ok', msg: '' });
      track('tool_run');
    } catch (err) {
      setStatus({ type: 'err', msg: err.message });
    }
  };

  const onAdd = (lat, lon) => {
    if (mode === 'point') { lookPoint(lat, lon, ''); return; }
    setPts((p) => [...p, [lat, lon]]);
    setProfile(null);
  };

  const runProfile = async () => {
    setStatus({ type: 'loading', msg: 'Measuring the profile…' });
    try {
      const samples = samplePath(pts);
      const hs = await elevations(samples.map((s) => [s.lat, s.lon]));
      const withH = samples.map((s, i) => ({ ...s, h: hs[i] }));
      setProfile({ samples: withH, stats: profileStats(withH) });
      setStatus({ type: 'ok', msg: '' });
      track('tool_run');
    } catch (err) {
      setStatus({ type: 'err', msg: err.message });
    }
  };

  const mine = () => {
    if (!('geolocation' in navigator)) { setStatus({ type: 'err', msg: 'Your browser does not support location. Search a place or click the map.' }); return; }
    setMode('point');
    setStatus({ type: 'loading', msg: 'Requesting your location…' });
    navigator.geolocation.getCurrentPosition(
      (p) => { setView({ lat: p.coords.latitude, lon: p.coords.longitude, zoom: 15 }); lookPoint(p.coords.latitude, p.coords.longitude, 'your location', p.coords.altitude); },
      (e) => setStatus({ type: 'err', msg: e.code === 1 ? 'Location permission was denied. Search a place or click the map instead.' : 'Your device could not get a location fix. Search a place or click the map.' }),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 },
    );
  };

  const search = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setStatus({ type: 'loading', msg: 'Searching…' });
    try {
      const found = await searchAddress(query.trim());
      if (!found?.length) { setStatus({ type: 'err', msg: `No place found for "${query.trim()}".` }); return; }
      const [lat, lon] = [Number(found[0].lat), Number(found[0].lon)];
      setView({ lat, lon, zoom: mode === 'point' ? 14 : 13 });
      if (mode === 'point') lookPoint(lat, lon, found[0].display_name.split(',').slice(0, 2).join(','));
      else setStatus({ type: 'idle', msg: '' });
    } catch (err) {
      setStatus({ type: 'err', msg: err.message?.includes('limiting') ? err.message : 'The search did not complete. Try again.' });
    }
  };

  const switchMode = (next) => { setMode(next); setPts([]); setPoint(null); setProfile(null); setStatus({ type: 'idle', msg: '' }); };
  const busy = status.type === 'loading';
  const st = profile?.stats;
  const marks = profile ? [
    { key: 'hi', lat: st.hi.lat, lon: st.hi.lon, color: '#dc2626', tip: `Highest: ${m(st.hi.h, ft)}` },
    { key: 'lo', lat: st.lo.lat, lon: st.lo.lon, color: '#0284c7', tip: `Lowest: ${m(st.lo.h, ft)}` },
  ] : [];

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">Elevation of any point, or along a route</h2>
        <button type="button" onClick={mine} disabled={busy} className="btn-primary">📍 My elevation</button>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <div role="radiogroup" aria-label="Mode" className="flex gap-1 text-sm">
          {[['point', 'One point'], ['profile', 'Elevation profile']].map(([id, l]) => (
            <button key={id} type="button" role="radio" aria-checked={mode === id} onClick={() => switchMode(id)} className={`px-3 py-1.5 rounded-lg border transition ${mode === id ? 'bg-accent/15 border-accent/50 text-accent' : 'bg-tint/5 border-line hover:bg-accent/10'}`}>{l}</button>
          ))}
        </div>
        <label className="inline-flex items-center gap-2 text-sm text-fg-muted ml-auto cursor-pointer"><input type="checkbox" checked={ft} onChange={(e) => setFt(e.target.checked)} /> Feet and miles</label>
      </div>

      <form onSubmit={search} className="flex flex-wrap gap-2 mb-3">
        <input className="field flex-1 min-w-[200px]" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a place, mountain, address or postcode" aria-label="Place to search" />
        <button type="submit" disabled={busy} className="btn-ghost">Search</button>
      </form>

      <div aria-live="polite">
        {busy && <p className="text-sm text-fg-subtle my-2">{status.msg}</p>}
        {status.type === 'err' && <p role="alert" className="my-2 bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{status.msg}</p>}
        {mode === 'profile' && !profile && !busy && (
          <p className="text-sm text-fg-subtle my-2">{pts.length < 2 ? 'Click the map to draw a route: a walk, a ride, a road or a ridge.' : `${pts.length} points drawn.`}</p>
        )}
      </div>

      {mode === 'profile' && (
        <div className="flex flex-wrap gap-2 mb-3 text-sm">
          <button type="button" className="btn-primary py-1.5" disabled={pts.length < 2 || busy} onClick={runProfile}>Show elevation profile</button>
          <button type="button" className="btn-ghost py-1.5" disabled={!pts.length} onClick={() => { setPts((p) => p.slice(0, -1)); setProfile(null); }}>Undo</button>
          <button type="button" className="btn-ghost py-1.5" disabled={!pts.length} onClick={() => { setPts([]); setProfile(null); }}>Clear</button>
        </div>
      )}

      {mode === 'point' && point && status.type === 'ok' && (
        <div className="rounded-xl p-4 mb-3 border bg-tint/5 border-line">
          <p className="text-xs uppercase tracking-wide text-fg-subtle">Elevation {point.label ? `of ${point.label}` : 'here'}</p>
          <p className="font-display text-4xl font-bold text-fg mt-1">{m(point.h, ft)} <span className="text-lg font-semibold text-fg-muted">{ft ? `(${Math.round(point.h)} m)` : `(${Math.round(point.h * FT).toLocaleString()} ft)`}</span></p>
          <p className="text-sm text-fg-muted mt-1">
            {point.h < 0 ? 'Below mean sea level.' : point.h === 0 ? 'At sea level, or on open water.' : 'Above mean sea level.'} At {point.lat.toFixed(5)}, {point.lon.toFixed(5)}.{' '}
            <CopyButton text={`${Math.round(point.h)} m (${Math.round(point.h * FT)} ft) at ${point.lat.toFixed(5)}, ${point.lon.toFixed(5)}`} className="text-accent hover:underline" />
          </p>
          {point.gps != null && (
            <p className="text-xs text-fg-subtle mt-2">Your device&rsquo;s GPS reported {m(point.gps, ft)}. GPS height is often 10 to 30 m off, and some phones give it above the ellipsoid rather than sea level, so the map figure is usually the better one.</p>
          )}
        </div>
      )}

      {profile && (
        <div className="rounded-xl p-4 mb-3 border bg-tint/5 border-line">
          <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-sm">
            {[
              ['Distance', km(st.length, ft)],
              ['Total climb', `↑ ${m(st.up, ft)}`],
              ['Total descent', `↓ ${m(st.down, ft)}`],
              ['Highest', m(st.hi.h, ft)],
              ['Lowest', m(st.lo.h, ft)],
              ['Steepest', `${st.steep.toFixed(0)}%`],
            ].map(([k, v]) => (
              <div key={k}><dt className="text-xs uppercase tracking-wide text-fg-subtle">{k}</dt><dd className="font-mono font-semibold text-fg">{v}</dd></div>
            ))}
          </dl>
          <Profile samples={profile.samples} ft={ft} />
        </div>
      )}

      <DrawMap points={pts} onAdd={onAdd} view={view} marks={marks} label="Map: click to get the elevation" start={[30, 0]} startZoom={2} />
      <p className="mt-2 text-xs text-fg-subtle">{mode === 'point' ? 'Click anywhere on the map to get its height above sea level.' : 'Click to add points along a route, then press "Show elevation profile".'}</p>

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Heights from the <a href="https://registry.opendata.aws/terrain-tiles/" target="_blank" rel="noopener" className="hover:underline">Terrain Tiles</a> open dataset on AWS (Mapzen), which combines SRTM, GMTED, ETOPO1, the US National Elevation Dataset and other sources (<a href="https://github.com/tilezen/joerd/blob/master/docs/attribution.md" target="_blank" rel="noopener" className="hover:underline">full attribution</a>), read on your device. Pixels are about 10 to 30 m across depending on the area, so sharp summits can read a little lower than their official height. The profile samples the straight lines between your points.
      </p>
    </section>
  );
}
