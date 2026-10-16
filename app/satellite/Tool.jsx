'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import CopyButton from '../components/CopyButton.jsx';
import { parseCoordinate } from '../coordinates-converter/geo.js';
import { imageryAt, ageText } from './imagery.js';

const Map = dynamic(() => import('./Map.jsx'), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading satellite map" />
  ),
});

const PRESETS = [
  { label: 'Statue of Liberty', lat: 40.68925, lon: -74.0445 },
  { label: 'Eiffel Tower', lat: 48.85837, lon: 2.29448 },
  { label: 'Badshahi Mosque', lat: 31.58795, lon: 74.30995 },
  { label: 'Pyramids of Giza', lat: 29.97917, lon: 31.13419 },
];
const DEFAULT = PRESETS[0];

const DATE_FMT = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const fmtRes = (m) => (m < 1 ? `${Math.round(m * 100)} cm` : `${m} m`);

// Shareable views live in the URL hash as #zoom/lat/lon, so a link opens the
// same spot without any server involvement.
function readHash() {
  const m = typeof window !== 'undefined' && window.location.hash.match(/^#(\d{1,2})\/(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
  if (!m) return null;
  const z = Number(m[1]), lat = Number(m[2]), lon = Number(m[3]);
  return Math.abs(lat) <= 90 && Math.abs(lon) <= 180 && z <= 19 ? { z, lat, lon } : null;
}

export default function Tool() {
  const [query, setQuery] = useState('');
  const [pos, setPos] = useState([DEFAULT.lat, DEFAULT.lon]);
  const [zoom, setZoom] = useState(17);
  const [pin, setPin] = useState({ lat: DEFAULT.lat, lon: DEFAULT.lon, label: DEFAULT.label });
  const [labels, setLabels] = useState(true);
  const [roads, setRoads] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [view, setView] = useState(null); // { lat, lon, zoom } of the map centre
  const [img, setImg] = useState({ state: 'idle' }); // idle | loading | ok | none | error
  const lookup = useRef(null);

  const goTo = (lat, lon, label, z = 17) => {
    setPos([lat, lon]);
    setZoom(z);
    setPin({ lat, lon, label });
  };

  useEffect(() => {
    const h = readHash();
    if (h) goTo(h.lat, h.lon, 'Shared location', h.z);
  }, []);

  // Look up the photo under the centre of the screen, 400 ms after the map
  // stops moving, cancelling any lookup still in flight.
  const onView = useCallback((lat, lon, z) => {
    setView({ lat, lon, zoom: z });
    window.history.replaceState(null, '', `#${z}/${lat.toFixed(5)}/${lon.toFixed(5)}`);
    clearTimeout(lookup.current?.timer);
    lookup.current?.ctrl?.abort();
    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      setImg({ state: 'loading' });
      try {
        const r = await imageryAt(lat, lon, z, ctrl.signal);
        setImg(r ? { state: 'ok', ...r } : { state: 'none' });
      } catch (e) {
        if (e.name !== 'AbortError') setImg({ state: 'error' });
      }
    }, 400);
    lookup.current = { timer, ctrl };
  }, []);

  // Coordinates in any format the converter reads (DD, DMS, UTM, Plus Code,
  // geohash, map links) jump straight there; anything else is a place search.
  const search = async (q) => {
    const text = q?.trim();
    if (!text) return;
    setBusy(true);
    setErr('');
    try {
      const c = parseCoordinate(text);
      if (c.lat !== undefined) { goTo(c.lat, c.lon, `${c.format}: ${text}`); return; }
      const place = c.shortPlusCode ? c.locality : text;
      if (!place) { setErr(c.error); return; }
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(place)}`, { headers: { Accept: 'application/json' } });
      const data = await res.json();
      if (!data?.length) { setErr(`No result for "${place}".`); return; }
      const lat = parseFloat(data[0].lat), lon = parseFloat(data[0].lon);
      if (c.shortPlusCode) {
        const r = parseCoordinate(c.shortPlusCode, { lat, lon });
        goTo(r.lat, r.lon, `Plus Code: ${text}`);
      } else {
        goTo(lat, lon, data[0].display_name);
      }
    } catch {
      setErr('Search failed. Check your connection and try again.');
    } finally {
      setBusy(false);
    }
  };

  const useMyLocation = () => {
    if (!('geolocation' in navigator)) { setErr('Your browser does not support geolocation.'); return; }
    setBusy(true);
    setErr('');
    navigator.geolocation.getCurrentPosition(
      (p) => { goTo(p.coords.latitude, p.coords.longitude, 'Your location', 18); setBusy(false); },
      (e) => { setErr(e.code === 1 ? 'Location permission denied.' : 'Could not get your location.'); setBusy(false); },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const toggle = (on, set, label) => (
    <button
      type="button"
      onClick={() => set(!on)}
      aria-pressed={on}
      className={`text-xs px-3 py-1.5 rounded-md border transition ${on ? 'bg-accent/15 border-accent/40 text-accent' : 'bg-tint/5 border-line hover:bg-accent/10 hover:text-accent'}`}
    >
      {label}
    </button>
  );

  const shareUrl = view && typeof window !== 'undefined'
    ? `${window.location.origin}/satellite#${view.zoom}/${view.lat.toFixed(5)}/${view.lon.toFixed(5)}`
    : '';
  const ll = pin ? `${pin.lat.toFixed(6)},${pin.lon.toFixed(6)}` : '';

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <form onSubmit={(e) => { e.preventDefault(); search(query); }} className="flex flex-wrap gap-2 mb-3">
        <input
          className="field flex-1 min-w-[200px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Address, place, or coordinates in any format"
          aria-label="Search the satellite map by address, place, or coordinates"
        />
        <button type="submit" disabled={busy} className="btn-primary">{busy ? 'Searching…' : 'Search'}</button>
        <button type="button" onClick={useMyLocation} disabled={busy} className="btn-ghost">📍 My location</button>
      </form>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-[11px] uppercase tracking-wider text-fg-subtle mr-1">Show:</span>
        {toggle(labels, setLabels, 'Place labels')}
        {toggle(roads, setRoads, 'Roads')}
        <span className="text-[11px] uppercase tracking-wider text-fg-subtle ml-2 mr-1">Try:</span>
        {PRESETS.map((p) => (
          <button key={p.label} type="button" onClick={() => goTo(p.lat, p.lon, p.label)} className="text-xs px-2.5 py-1.5 rounded-md border border-line bg-tint/5 hover:text-accent transition">
            {p.label}
          </button>
        ))}
      </div>

      {err && <p role="alert" className="mb-3 bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{err}</p>}

      <Map center={pos} zoom={zoom} pin={pin} labels={labels} roads={roads} onView={onView} onPin={(lat, lon) => setPin({ lat, lon, label: 'Pinned location' })} />

      <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
        <div className="glass-strong rounded-lg p-4 min-w-0" aria-live="polite">
          <div className="text-[11px] uppercase tracking-wider text-accent font-semibold">Imagery at the centre of the map</div>
          {img.state === 'loading' && <p className="mt-2 text-fg-subtle">Checking the capture date…</p>}
          {img.state === 'ok' && img.date && (
            <>
              <p className="mt-2 text-lg font-semibold text-fg">Captured {DATE_FMT.format(img.date)}</p>
              <p className="text-fg-muted">About {ageText(img.date)} old · {fmtRes(img.resolution)} per pixel{img.provider ? ` · ${img.provider}` : ''}{img.product ? ` ${img.product}` : ''}</p>
            </>
          )}
          {img.state === 'ok' && !img.date && (
            <p className="mt-2 text-fg-muted">
              At this zoom you are seeing a {fmtRes(img.resolution)}-per-pixel global mosaic{img.provider ? ` from ${img.provider}` : ''}, stitched from many dates. Zoom in to see when the detailed photo was taken.
            </p>
          )}
          {img.state === 'none' && <p className="mt-2 text-fg-muted">No detailed imagery is listed here at this zoom. Zoom out a level or two.</p>}
          {img.state === 'error' && <p className="mt-2 text-fg-muted">Esri&rsquo;s imagery information service did not answer. The map itself still works.</p>}
          {img.state === 'idle' && <p className="mt-2 text-fg-subtle">Move the map to check a date.</p>}
        </div>

        <div className="glass-strong rounded-lg p-4 min-w-0">
          <div className="text-[11px] uppercase tracking-wider text-accent font-semibold">Pinned point</div>
          {pin ? (
            <>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="font-mono text-fg">{pin.lat.toFixed(6)}, {pin.lon.toFixed(6)}</span>
                <CopyButton text={`${pin.lat.toFixed(6)}, ${pin.lon.toFixed(6)}`} className="text-xs text-accent hover:underline shrink-0" />
              </div>
              <p className="mt-1 text-xs text-fg-subtle truncate" title={pin.label}>{pin.label}</p>
              <p className="mt-2 text-xs flex flex-wrap gap-x-3 gap-y-1">
                <a href={`https://www.google.com/maps/@?api=1&map_action=map&center=${ll}&zoom=18&basemap=satellite`} target="_blank" rel="noopener" className="text-accent hover:underline">Compare in Google Maps</a>
                <a href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${ll}`} target="_blank" rel="noopener" className="text-accent hover:underline">Street View here</a>
                <Link href="/coordinates-converter" className="text-accent hover:underline">Convert these coordinates</Link>
              </p>
            </>
          ) : (
            <p className="mt-2 text-fg-subtle">Click the map to drop a pin.</p>
          )}
        </div>
      </div>

      {shareUrl && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-fg-subtle">
          <span>Link to this view:</span>
          <span className="font-mono text-fg-muted break-all">{shareUrl}</span>
          <CopyButton text={shareUrl} label="Copy link" className="text-accent hover:underline" />
        </div>
      )}
    </section>
  );
}
