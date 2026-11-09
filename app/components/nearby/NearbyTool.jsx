'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { searchAddress } from '../../address-finder/geocode.js';
import { compass } from '../../distance-calculator/dist.js';
import { track } from '../track.js';
import { loadNearby, nearest, address, hours, phone, directionsUrl, osmUrl } from './places.js';

const NearbyMap = dynamic(() => import('./NearbyMap.jsx'), {
  ssr: false,
  loading: () => <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading map" />,
});

const fmt = (n, p = 0) => n.toLocaleString('en-US', { maximumFractionDigits: p });
const dist = (m) => (m < 1000 ? `${fmt(Math.round(m / 10) * 10)} m` : `${fmt(m / 1000, 1)} km`);
const walk = (m) => `${Math.max(1, Math.round((m * 1.3) / 80))} min walk`; // 80 m/min, streets ~30% longer than a straight line

// Shared tool for "near me" pages. `categories` lists the kinds of place the
// Worker returns for `kind` ({ id, label, one, radius, color }); `filters` are
// optional checkboxes ({ id, label, test(tags) }); `badges(place)` returns
// short labels from the OpenStreetMap tags.
export default function NearbyTool({ kind, title, button, categories, filters = [], badges, empty }) {
  const [center, setCenter] = useState(null);
  const [places, setPlaces] = useState([]);
  const [cat, setCat] = useState(categories[0].id);
  const [on, setOn] = useState({});
  const [status, setStatus] = useState({ type: 'idle', msg: '' });
  const [query, setQuery] = useState('');
  const [fitKey, setFitKey] = useState(0);
  const [focus, setFocus] = useState(null);

  const current = categories.find((c) => c.id === cat);

  const lookup = async (lat, lon, place) => {
    setCenter({ lat, lon, place });
    setFocus(null);
    setStatus({ type: 'loading', msg: 'Finding places on OpenStreetMap…' });
    const slow = setTimeout(() => setStatus((s) => (s.type === 'loading'
      ? { type: 'loading', msg: 'Still searching. The first search in an area can take up to a minute; after that it is instant for everyone nearby.' }
      : s)), 6000);
    try {
      setPlaces(await loadNearby(kind, lat, lon));
      setStatus({ type: 'ok', msg: '' });
      setFitKey((k) => k + 1);
      track('nearby_search', { kind });
    } catch (err) {
      setPlaces([]);
      setStatus({ type: 'err', msg: err.message });
    } finally {
      clearTimeout(slow);
    }
  };

  const useMyLocation = () => {
    if (!('geolocation' in navigator)) { setStatus({ type: 'err', msg: 'Your browser does not support location. Search for a street or town instead.' }); return; }
    setStatus({ type: 'loading', msg: 'Requesting your location…' });
    navigator.geolocation.getCurrentPosition(
      (p) => lookup(p.coords.latitude, p.coords.longitude, 'you'),
      (e) => setStatus({ type: 'err', msg: e.code === 1
        ? 'Location permission was denied. Allow it from the lock icon in the address bar, or search for a street or town instead.'
        : 'Your device could not get a location fix. Search for a street or town, or click the map.' }),
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
      if (!found?.length) { setStatus({ type: 'err', msg: `No place found for "${text}". Try adding the town or country.` }); return; }
      lookup(Number(found[0].lat), Number(found[0].lon), found[0].display_name.split(',').slice(0, 2).join(','));
    } catch (err) {
      setStatus({ type: 'err', msg: err.message?.includes('limiting') ? err.message : 'The search did not complete. Check your connection and try again.' });
    }
  };

  const counts = useMemo(() => {
    if (!center) return {};
    return Object.fromEntries(categories.map((c) => [c.id, nearest(places, c.id, center.lat, center.lon, c.radius).length]));
  }, [places, center, categories]);

  const list = useMemo(() => {
    if (!center) return [];
    let all = nearest(places, cat, center.lat, center.lon, current.radius);
    for (const f of filters) if (on[f.id]) all = all.filter((p) => f.test(p.tags));
    return all;
  }, [places, center, cat, current, filters, on]);

  const shown = list.slice(0, 10);
  const busy = status.type === 'loading';
  const where = center?.place === 'you' ? 'you' : center?.place || 'this point';

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <button type="button" onClick={useMyLocation} disabled={busy} className="btn-primary">📍 {button}</button>
      </div>

      <form onSubmit={search} className="flex flex-wrap gap-2 mb-3">
        <input
          className="field flex-1 min-w-[200px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Or search a street, town, station or postcode"
          aria-label="Street, town, station or postcode to search near"
        />
        <button type="submit" disabled={busy} className="btn-ghost">Search</button>
      </form>

      {categories.length > 1 && (
        <div role="tablist" aria-label="Type of place" className="flex flex-wrap gap-1.5 mb-3">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={c.id === cat}
              onClick={() => { setCat(c.id); setFocus(null); setFitKey((k) => k + 1); }}
              className={`text-sm px-3 py-1.5 rounded-lg border transition inline-flex items-center gap-2 ${c.id === cat ? 'bg-accent/15 border-accent/50 text-accent' : 'bg-tint/5 border-line hover:bg-accent/10 hover:text-accent'}`}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} aria-hidden="true" />
              {c.label}{center && status.type === 'ok' ? ` (${counts[c.id] ?? 0})` : ''}
            </button>
          ))}
        </div>
      )}

      {filters.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-3 text-sm text-fg-muted">
          {filters.map((f) => (
            <label key={f.id} className="inline-flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={!!on[f.id]} onChange={(e) => setOn((o) => ({ ...o, [f.id]: e.target.checked }))} />
              {f.label}
            </label>
          ))}
        </div>
      )}

      <div aria-live="polite">
        {status.type === 'idle' && <p className="text-sm text-fg-subtle my-2">Press the button to use your location, search for a place, or click the map.</p>}
        {busy && <p className="text-sm text-fg-subtle my-2">{status.msg}</p>}
        {status.type === 'err' && <p role="alert" className="my-2 bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{status.msg}</p>}
        {status.type === 'ok' && (
          <p className="text-sm font-semibold text-fg my-2">
            {list.length
              ? `${fmt(list.length)} ${list.length === 1 ? current.one : current.label.toLowerCase()} within ${dist(current.radius)} of ${where}${list.length > 10 ? '; the 10 nearest are listed' : ''}.`
              : `No ${current.label.toLowerCase()} mapped within ${dist(current.radius)} of ${where}. ${empty || ''}`}
          </p>
        )}
      </div>

      <NearbyMap
        center={center}
        places={shown}
        color={current.color}
        label={current.one}
        fitKey={fitKey}
        focus={focus}
        onPick={(lat, lon) => lookup(lat, lon, '')}
      />
      <p className="mt-2 text-xs text-fg-subtle">Tap a dot to see its number in the list; the three nearest are larger. Click the map to search somewhere else.</p>

      {shown.length > 0 && (
        <ol className="mt-5 space-y-3">
          {shown.map((p, i) => {
            const h = hours(p.tags);
            const tel = phone(p.tags);
            const addr = address(p.tags);
            const tags = badges ? badges(p) : [];
            return (
              <li key={p.id} className="rounded-xl ring-1 ring-line p-4 bg-tint/5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-fg">
                    <span className="text-fg-subtle mr-1.5">{i + 1}.</span>
                    {p.tags.name || p.tags.brand || current.one}
                  </h3>
                  <span className="text-sm font-mono text-fg">{dist(p.d)} {compass(p.dir)}<span className="text-fg-subtle font-sans text-xs"> · {walk(p.d)}</span></span>
                </div>
                {addr && <p className="text-sm text-fg-muted mt-1">{addr}</p>}
                {h && <p className="text-sm text-fg-muted mt-1"><span className="text-fg-subtle">Hours as mapped:</span> {h}</p>}
                {tags.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {tags.map((t) => <li key={t} className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">{t}</li>)}
                  </ul>
                )}
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <a href={directionsUrl(p)} target="_blank" rel="noopener" className="text-accent hover:underline">Directions</a>
                  {tel && <a href={`tel:${tel.split(';')[0].replace(/[^\d+]/g, '')}`} className="text-accent hover:underline">Call {tel.split(';')[0]}</a>}
                  <button type="button" onClick={() => setFocus(p)} className="text-accent hover:underline">Show on map</button>
                  <a href={osmUrl(p)} target="_blank" rel="noopener" className="text-fg-subtle hover:underline">Details or fix on OpenStreetMap</a>
                </div>
              </li>
            );
          })}
        </ol>
      )}

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Places and opening hours from <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener" className="hover:underline">OpenStreetMap</a> contributors, refreshed weekly. Distances are straight-line; walking times assume streets about 30% longer. Your position is rounded to about {kind === 'health' ? '2 km' : '1 km'} before the lookup is sent, and distances are worked out in your browser.
      </p>
    </section>
  );
}
