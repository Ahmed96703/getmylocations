'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import CopyButton from '../components/CopyButton.jsx';
import { searchAddress } from '../address-finder/geocode.js';
import { UNITS, PRESETS, MAX_METERS, toMeters, defaultUnit, circlePolygon, circleStats, encodeCircles, decodeCircles } from './radius.js';

const RadiusMap = dynamic(() => import('./RadiusMap.jsx'), {
  ssr: false,
  loading: () => <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading map" />,
});

const COLORS = ['#0ea5e9', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'];
const MAX_CIRCLES = 10;

// Starting circle before the visitor picks a place: a city they will know.
const START = {
  mi: { lat: 40.758, lon: -73.9855, value: 5, place: 'Times Square, New York' },
  gb: { lat: 51.50806, lon: -0.12806, value: 5, place: 'Trafalgar Square, London' },
  km: { lat: 48.85837, lon: 2.294481, value: 10, place: 'Eiffel Tower, Paris' },
};

const fmt = (n, p = 2) => n.toLocaleString('en-US', { maximumFractionDigits: p });
const coords = (c) => `${c.lat.toFixed(5)}, ${c.lon.toFixed(5)}`;
let nextId = 1;
const make = (c) => ({ id: nextId++, place: '', ...c });

// "Times Square, Manhattan, New York" from a Nominatim result.
const shortName = (r) => (r.display_name || '').split(',').slice(0, 3).join(',').trim();

export default function Tool() {
  const [circles, setCircles] = useState(() => [make({ ...START.mi, unit: 'mi' })]);
  const [activeId, setActiveId] = useState(circles[0].id);
  const [fitKey, setFitKey] = useState(0);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState({ type: 'idle', msg: '' });
  const [radiusText, setRadiusText] = useState('5');

  const active = circles.find((c) => c.id === activeId) || circles[0];

  // On first load: circles from a shared link, or a start circle in the
  // visitor's own units.
  useEffect(() => {
    const shared = decodeCircles(window.location.hash);
    if (shared.length) {
      const list = shared.map(make);
      setCircles(list);
      setActiveId(list[0].id);
      setRadiusText(String(list[0].value));
    } else {
      const lang = navigator.language || '';
      const unit = defaultUnit(lang);
      const start = unit === 'km' ? START.km : /-GB\b/i.test(lang) ? START.gb : START.mi;
      if (start !== START.mi) {
        const c = make({ ...start, unit });
        setCircles([c]);
        setActiveId(c.id);
        setRadiusText(String(c.value));
      }
    }
    setFitKey((k) => k + 1);
  }, []);

  // Keep the address bar in step, so copying it shares the same map.
  useEffect(() => {
    const url = `${window.location.pathname}${window.location.search}#${encodeCircles(circles)}`;
    window.history.replaceState(window.history.state, '', url);
  }, [circles]);

  const update = (patch, refit = true) => {
    setCircles((list) => list.map((c) => (c.id === active.id ? { ...c, ...patch } : c)));
    if (refit) setFitKey((k) => k + 1);
  };

  const setRadius = (value, unit = active.unit) => {
    setRadiusText(String(value));
    if (value === '') return;
    const n = Number(value);
    if (!(n > 0)) { setStatus({ type: 'err', msg: 'Enter a radius greater than zero.' }); return; }
    if (toMeters(n, unit) > MAX_METERS) {
      setStatus({ type: 'err', msg: `The largest radius is ${fmt(MAX_METERS / toMeters(1, unit), 0)} ${UNITS[unit].label}, a quarter of the way around the Earth.` });
      return;
    }
    setStatus({ type: 'idle', msg: '' });
    update({ value: n, unit });
  };

  // Switching units keeps the circle the same size on the ground.
  const changeUnit = (unit) => {
    const value = +(toMeters(active.value, active.unit) / toMeters(1, unit)).toPrecision(6);
    setRadiusText(String(value));
    update({ value, unit }, false);
  };

  const select = (c) => { setActiveId(c.id); setRadiusText(String(c.value)); };

  const addCircle = () => {
    if (circles.length >= MAX_CIRCLES) return;
    // A second ring around the same center, twice as wide; click the map
    // to move it somewhere else.
    let value = active.value * 2;
    if (toMeters(value, active.unit) > MAX_METERS) value = active.value;
    const c = make({ lat: active.lat, lon: active.lon, place: active.place, value, unit: active.unit });
    setCircles((list) => [...list, c]);
    select(c);
    setFitKey((k) => k + 1);
  };

  const removeCircle = (id) => {
    if (circles.length === 1) return;
    const rest = circles.filter((c) => c.id !== id);
    setCircles(rest);
    if (id === active.id) select(rest[0]);
  };

  const useMyLocation = () => {
    if (!('geolocation' in navigator)) { setStatus({ type: 'err', msg: 'Your browser does not support location. Search for a place instead.' }); return; }
    setStatus({ type: 'loading', msg: 'Requesting your location…' });
    navigator.geolocation.getCurrentPosition(
      (p) => { setStatus({ type: 'idle', msg: '' }); update({ lat: p.coords.latitude, lon: p.coords.longitude, place: 'Your location' }); },
      (e) => setStatus({ type: 'err', msg: e.code === 1
        ? 'Location permission was denied. Allow it from the lock icon in the address bar, or search for a place instead.'
        : 'Your device could not get a location fix. Search for a place or click the map instead.' }),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 },
    );
  };

  const search = async (e) => {
    e.preventDefault();
    const text = query.trim();
    if (!text) return;
    setStatus({ type: 'loading', msg: 'Searching…' });
    try {
      const found = await searchAddress(text, () => setStatus({ type: 'loading', msg: 'Waiting for the address service…' }));
      if (!found?.length) { setStatus({ type: 'err', msg: `No place found for "${text}". Try adding the city, state or country.` }); return; }
      setStatus({ type: 'idle', msg: '' });
      update({ lat: Number(found[0].lat), lon: Number(found[0].lon), place: shortName(found[0]) });
    } catch (err) {
      setStatus({ type: 'err', msg: err.message?.includes('limiting') ? err.message : 'The search did not complete. Check your connection and try again.' });
    }
  };

  const shapes = useMemo(() => circles.map((c, i) => ({
    id: c.id,
    color: COLORS[i % COLORS.length],
    points: circlePolygon(c.lat, c.lon, toMeters(c.value, c.unit)),
    center: [c.lat, c.lon],
    label: `${fmt(c.value, 3)} ${UNITS[c.unit].short}${c.place ? ` · ${c.place}` : ''}`,
    active: c.id === active.id,
  })), [circles, active.id]);

  const meters = toMeters(active.value, active.unit);
  const stats = circleStats(meters);
  const big = active.unit === 'mi' || active.unit === 'ft';
  const len = (m) => (big ? `${fmt(m / 1609.344)} mi` : `${fmt(m / 1000)} km`);
  const lenOther = (m) => (big ? `${fmt(m / 1000)} km` : `${fmt(m / 1609.344)} mi`);
  const shareUrl = `https://getmylocations.com/radius-map#${encodeCircles(circles)}`;

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">Draw a radius</h2>
        <button type="button" onClick={useMyLocation} disabled={status.type === 'loading'} className="btn-primary">📍 Use my location</button>
      </div>

      <form onSubmit={search} className="flex flex-wrap gap-2 mb-3">
        <input
          className="field flex-1 min-w-[200px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search an address, city, or ZIP code"
          aria-label="Center of the circle: address, city, or ZIP code"
        />
        <button type="submit" disabled={status.type === 'loading'} className="btn-ghost">Set center</button>
      </form>

      <div className="flex flex-wrap items-end gap-2 mb-2">
        <label className="flex flex-col text-xs text-fg-subtle">
          Radius
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            className="field w-32 mt-1 font-mono"
            value={radiusText}
            onChange={(e) => setRadius(e.target.value)}
          />
        </label>
        <label className="flex flex-col text-xs text-fg-subtle">
          Unit
          <select className="field mt-1 w-36" value={active.unit} onChange={(e) => changeUnit(e.target.value)}>
            {Object.entries(UNITS).map(([k, u]) => <option key={k} value={k}>{u.label}</option>)}
          </select>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS[active.unit].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setRadius(v)}
              className={`text-xs px-2.5 py-1.5 rounded-md border transition ${v === active.value ? 'bg-accent/15 border-accent/50 text-accent' : 'bg-tint/5 border-line hover:bg-accent/10 hover:text-accent'}`}
            >
              {fmt(v, 0)} {UNITS[active.unit].short}
            </button>
          ))}
        </div>
      </div>

      <div aria-live="polite">
        {status.type === 'loading' && <p className="text-sm text-fg-subtle my-2">{status.msg}</p>}
        {status.type === 'err' && <p role="alert" className="my-2 bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{status.msg}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-2 my-3">
        {circles.map((c, i) => (
          <span
            key={c.id}
            className={`inline-flex items-center rounded-full border text-xs ${c.id === active.id ? 'border-accent/60 bg-accent/10' : 'border-line bg-tint/5'}`}
          >
            <button type="button" onClick={() => select(c)} className="flex items-center gap-1.5 pl-3 pr-2 py-1.5" aria-pressed={c.id === active.id}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} aria-hidden="true" />
              {fmt(c.value, 3)} {UNITS[c.unit].short}{c.place ? ` · ${c.place.split(',')[0]}` : ''}
            </button>
            {circles.length > 1 && (
              <button type="button" onClick={() => removeCircle(c.id)} className="pr-3 pl-1 py-1.5 text-fg-subtle hover:text-rose-500" aria-label={`Remove the ${fmt(c.value, 3)} ${UNITS[c.unit].short} circle`}>×</button>
            )}
          </span>
        ))}
        {circles.length < MAX_CIRCLES && (
          <button type="button" onClick={addCircle} className="text-xs px-3 py-1.5 rounded-full border border-dashed border-line hover:border-accent/50 hover:text-accent transition">+ Add circle</button>
        )}
      </div>

      <RadiusMap shapes={shapes} fitKey={fitKey} onPick={(lat, lon) => update({ lat, lon, place: '' }, false)} />
      <p className="mt-2 text-xs text-fg-subtle">Click anywhere on the map to move the selected circle there. Select a circle above to change it.</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
        {[
          ['Radius', len(meters), lenOther(meters)],
          ['Diameter', len(stats.diameter), lenOther(stats.diameter)],
          ['Circumference', len(stats.circumference), lenOther(stats.circumference)],
          big
            ? ['Area', `${fmt(stats.area / 2589988.11)} sq mi`, `${fmt(stats.area / 4046.8564224, 0)} acres`]
            : ['Area', `${fmt(stats.area / 1e6)} km²`, `${fmt(stats.area / 1e4, 0)} hectares`],
        ].map(([k, v, sub]) => (
          <div key={k} className="bg-accent/10 border border-accent/40 rounded-lg p-3 text-center">
            <div className="font-mono text-base sm:text-lg font-bold text-fg break-words">{v}</div>
            <div className="text-xs text-fg-subtle font-mono">{sub}</div>
            <div className="text-[10px] uppercase tracking-wider text-fg-subtle mt-1 font-semibold">{k}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-sm">
        <span className="text-fg-subtle">Center: <span className="font-mono text-fg">{coords(active)}</span>{active.place ? <span className="text-fg-muted"> ({active.place})</span> : null}</span>
        <CopyButton text={coords(active)} label="Copy coordinates" className="text-xs text-accent hover:underline" />
        <CopyButton text={shareUrl} label="Copy link to this map" className="text-xs text-accent hover:underline" />
      </div>
      <p className="mt-3 text-xs text-fg-subtle leading-relaxed">
        Circles are measured in a straight line on the Earth&rsquo;s surface (the WGS 84 ellipsoid), not along roads. The link keeps every circle, so whoever opens it sees the same map.
      </p>
    </section>
  );
}
