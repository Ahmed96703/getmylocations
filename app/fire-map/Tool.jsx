'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { searchAddress } from '../address-finder/geocode.js';
import { compass } from '../distance-calculator/dist.js';
import { UNITS, toMeters, defaultUnit, circlePolygon } from '../radius-map/radius.js';
import { regionsFor, loadFires, firesNear, ageColor } from './fires.js';

const FireMap = dynamic(() => import('./FireMap.jsx'), {
  ssr: false,
  loading: () => <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading map" />,
});

const PRESETS = { km: [10, 25, 50, 100, 250, 500], mi: [10, 25, 50, 100, 250] };

// Where the map starts before the visitor picks a place.
const START = {
  au: { lat: -33.8688, lon: 151.2093, place: 'Sydney' },
  nz: { lat: -36.8485, lon: 174.7633, place: 'Auckland' },
  us: { lat: 34.0522, lon: -118.2437, place: 'Los Angeles' },
  ca: { lat: 49.2827, lon: -123.1207, place: 'Vancouver' },
};

const fmt = (n, p = 0) => n.toLocaleString('en-US', { maximumFractionDigits: p });

function ago(ms) {
  const h = ms / 3600000;
  if (h < 1) return `${Math.max(1, Math.round(ms / 60000))} min ago`;
  return `${fmt(h, h < 10 ? 1 : 0)} h ago`;
}

export default function Tool() {
  const [center, setCenter] = useState({ ...START.au });
  const [unit, setUnit] = useState('km');
  const [radius, setRadius] = useState(100);
  const [fires, setFires] = useState([]);
  const [status, setStatus] = useState({ type: 'loading', msg: 'Loading NASA fire data…' });
  const [query, setQuery] = useState('');
  const [fitKey, setFitKey] = useState(0);
  const [focus, setFocus] = useState(null);
  const [now, setNow] = useState(() => Date.now());

  // Start near the visitor, in their own units.
  useEffect(() => {
    const lang = navigator.language || '';
    const country = (/-([A-Z]{2})\b/i.exec(lang) || [])[1]?.toLowerCase();
    const u = defaultUnit(lang);
    setUnit(u);
    if (u === 'mi') setRadius(50);
    if (START[country]) setCenter({ ...START[country] });
    setFitKey((k) => k + 1);
  }, []);

  const meters = toMeters(radius, unit);
  const regionKey = regionsFor(center.lat, center.lon, meters).join(',');

  // Load the fire files for the area around the center.
  useEffect(() => {
    let cancelled = false;
    setStatus({ type: 'loading', msg: 'Loading NASA fire data…' });
    loadFires(regionKey.split(','))
      .then((list) => {
        if (cancelled) return;
        // NASA's "24h" files run a few hours over; keep the claim exact.
        const t = Date.now();
        setFires(list.filter((f) => t - f.t <= 24 * 3600000));
        setNow(t);
        setStatus({ type: 'ok', msg: '' });
      })
      .catch((err) => { if (!cancelled) setStatus({ type: 'err', msg: err.message }); });
    return () => { cancelled = true; };
  }, [regionKey]);

  const near = useMemo(() => firesNear(fires, center.lat, center.lon, meters), [fires, center, meters]);
  // Show hotspots out to twice the radius on the map, for context.
  const shown = useMemo(() => firesNear(fires, center.lat, center.lon, meters * 2).slice(0, 4000), [fires, center, meters]);
  const circle = useMemo(() => circlePolygon(center.lat, center.lon, meters, 96), [center, meters]);
  const latest = useMemo(() => fires.reduce((m, f) => Math.max(m, f.t), 0), [fires]);

  const moveTo = (lat, lon, place, refit = true) => {
    setCenter({ lat, lon, place });
    setFocus(null);
    if (refit) setFitKey((k) => k + 1);
  };

  const useMyLocation = () => {
    if (!('geolocation' in navigator)) { setStatus({ type: 'err', msg: 'Your browser does not support location. Search for a town instead.' }); return; }
    setStatus({ type: 'loading', msg: 'Requesting your location…' });
    navigator.geolocation.getCurrentPosition(
      (p) => { setStatus({ type: 'ok', msg: '' }); moveTo(p.coords.latitude, p.coords.longitude, 'you'); },
      (e) => setStatus({ type: 'err', msg: e.code === 1
        ? 'Location permission was denied. Allow it from the lock icon in the address bar, or search for your town instead.'
        : 'Your device could not get a location fix. Search for your town or click the map instead.' }),
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 },
    );
  };

  const search = async (e) => {
    e.preventDefault();
    const text = query.trim();
    if (!text) return;
    setStatus({ type: 'loading', msg: 'Searching…' });
    try {
      const found = await searchAddress(text, () => setStatus({ type: 'loading', msg: 'Waiting for the address service…' }));
      if (!found?.length) { setStatus({ type: 'err', msg: `No place found for "${text}". Try adding the state or country.` }); return; }
      setStatus({ type: 'ok', msg: '' });
      moveTo(Number(found[0].lat), Number(found[0].lon), found[0].display_name.split(',').slice(0, 2).join(','));
    } catch (err) {
      setStatus({ type: 'err', msg: err.message?.includes('limiting') ? err.message : 'The search did not complete. Check your connection and try again.' });
    }
  };

  const changeUnit = (u) => {
    setUnit(u);
    setRadius(u === 'mi' ? 50 : 100);
    setFitKey((k) => k + 1);
  };

  const dist = (m) => (unit === 'mi' ? `${fmt(m / 1609.344, m < 16093 ? 1 : 0)} mi` : `${fmt(m / 1000, m < 10000 ? 1 : 0)} km`);
  const nearest = near[0];
  const busy = status.type === 'loading';

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">Fire hotspots near a place</h2>
        <button type="button" onClick={useMyLocation} disabled={busy} className="btn-primary">📍 Fires near me</button>
      </div>

      <form onSubmit={search} className="flex flex-wrap gap-2 mb-3">
        <input
          className="field flex-1 min-w-[200px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a town, address, or postcode"
          aria-label="Town, address, or postcode to check for fires"
        />
        <button type="submit" disabled={busy} className="btn-ghost">Check</button>
      </form>

      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <span className="text-xs text-fg-subtle mr-1">Within</span>
        {PRESETS[unit].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => { setRadius(v); setFitKey((k) => k + 1); }}
            className={`text-xs px-2.5 py-1.5 rounded-md border transition ${v === radius ? 'bg-accent/15 border-accent/50 text-accent' : 'bg-tint/5 border-line hover:bg-accent/10 hover:text-accent'}`}
          >
            {v} {UNITS[unit].short}
          </button>
        ))}
        <select className="field w-auto ml-1 text-xs py-1.5" value={unit} onChange={(e) => changeUnit(e.target.value)} aria-label="Distance unit">
          <option value="km">km</option>
          <option value="mi">miles</option>
        </select>
      </div>

      <div aria-live="polite">
        {busy && <p className="text-sm text-fg-subtle my-2">{status.msg}</p>}
        {status.type === 'err' && <p role="alert" className="my-2 bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{status.msg}</p>}

        {status.type === 'ok' && (
          <div className={`rounded-xl p-4 mb-3 border ${near.length ? 'bg-rose-500/10 border-rose-400/40' : 'bg-emerald-500/10 border-emerald-400/40'}`}>
            {near.length ? (
              <>
                <p className="font-semibold text-fg">
                  {fmt(near.length)} satellite hotspot{near.length === 1 ? '' : 's'} within {radius} {UNITS[unit].short} of {center.place || 'this point'} in the last 24 hours.
                </p>
                <p className="text-sm text-fg-muted mt-1">
                  Nearest: {dist(nearest.d)} {compass(nearest.dir)}, detected {ago(now - nearest.t)}.
                </p>
              </>
            ) : (
              <p className="font-semibold text-fg">
                No satellite hotspots within {radius} {UNITS[unit].short} of {center.place || 'this point'} in the last 24 hours.
              </p>
            )}
            <p className="text-xs text-fg-subtle mt-2">
              Satellite detections are not official warnings. Always follow your local fire service and emergency warnings.
            </p>
          </div>
        )}
      </div>

      <FireMap
        center={[center.lat, center.lon]}
        circle={circle}
        hotspots={shown}
        now={now}
        fitKey={fitKey}
        focus={focus}
        onPick={(lat, lon) => moveTo(lat, lon, '', false)}
      />
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-fg-subtle">
        <span>Detected:</span>
        {[['under 6 h ago', 2], ['6–12 h ago', 8], ['12–24 h ago', 18]].map(([label, h]) => (
          <span key={label} className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: ageColor(h) }} aria-hidden="true" />{label}
          </span>
        ))}
        <span>· Click the map to check another spot.</span>
      </div>

      {near.length > 0 && (
        <div className="mt-5">
          <h3 className="text-sm font-semibold mb-2">Nearest hotspots</h3>
          <div className="overflow-x-auto rounded-xl ring-1 ring-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tint/5 text-left text-fg-muted">
                  <th className="px-3 py-2 font-semibold">Distance</th>
                  <th className="px-3 py-2 font-semibold">Direction</th>
                  <th className="px-3 py-2 font-semibold">Detected</th>
                  <th className="px-3 py-2 font-semibold">Confidence</th>
                  <th className="px-3 py-2 font-semibold"><span className="sr-only">Show on map</span></th>
                </tr>
              </thead>
              <tbody className="text-fg-muted">
                {near.slice(0, 10).map((f) => (
                  <tr key={`${f.sat}${f.lat}${f.lon}${f.t}`} className="border-t border-line-subtle">
                    <td className="px-3 py-2 text-fg font-mono text-xs whitespace-nowrap">{dist(f.d)}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{compass(f.dir)}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{ago(now - f.t)} <span className="text-fg-subtle text-xs">({new Date(f.t).toLocaleString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' })})</span></td>
                    <td className="px-3 py-2 whitespace-nowrap">{f.high ? 'High' : 'Nominal'}</td>
                    <td className="px-3 py-2"><button type="button" onClick={() => setFocus(f)} className="text-xs text-accent hover:underline">Show</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Hotspots from NASA FIRMS (VIIRS on the Suomi NPP and NOAA-20 satellites), last 24 hours{latest ? `, newest detection ${ago(now - latest)}` : ''}. Each dot marks a pixel of about 375 m that was hotter than its surroundings when a satellite passed overhead; it can also be a planned burn, a gas flare, or hot industrial site.
      </p>
    </section>
  );
}
