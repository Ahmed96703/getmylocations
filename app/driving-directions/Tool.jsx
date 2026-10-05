'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { parseCoordinate } from '../coordinates-converter/geo.js';
import { searchAddress } from '../address-finder/geocode.js';
import { measure } from '../distance-calculator/dist.js';

const MapPair = dynamic(() => import('../distance-calculator/MapPair.jsx'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-tint/5 animate-pulse" aria-label="Loading map" />,
});

// With a Maps Embed API key (free, unlimited, restricted to this domain) the
// real route is embedded on the page. Without one, the page shows both
// places and the straight-line distance, and hands the route to Google Maps
// through its official, key-free directions link. The old keyless
// `output=embed` URL only ever showed a plain map with no route.
const EMBED_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY || '';

const MODES = [
  ['driving', '🚗 Driving'],
  ['walking', '🚶 Walking'],
  ['bicycling', '🚴 Bicycling'],
  ['transit', '🚆 Public transit'],
];

// The default pair is resolved in advance so loading the page makes no
// geocoding requests.
const DEFAULT = {
  from: { text: 'Allama Iqbal International Airport, Lahore', lat: 31.519498, lon: 74.401024 },
  to: { text: 'Badshahi Mosque, Lahore', lat: 31.588126, lon: 74.309353 },
};

const dirUrl = (o, d, mode) =>
  `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(o)}&destination=${encodeURIComponent(d)}&travelmode=${mode}`;
const embedUrl = (o, d, mode) =>
  `https://www.google.com/maps/embed/v1/directions?key=${EMBED_KEY}&origin=${encodeURIComponent(o)}&destination=${encodeURIComponent(d)}&mode=${mode}`;

const fmtKm = (m) => {
  const km = m / 1000;
  const mi = km * 0.621371192;
  return km < 10 ? `${km.toFixed(2)} km (${mi.toFixed(2)} mi)` : `${Math.round(km).toLocaleString('en-US')} km (${Math.round(mi).toLocaleString('en-US')} mi)`;
};

export default function Tool() {
  const [from, setFrom] = useState(DEFAULT.from.text);
  const [to, setTo] = useState(DEFAULT.to.text);
  const [mode, setMode] = useState('driving');
  const [ends, setEnds] = useState({ a: DEFAULT.from, b: DEFAULT.to }); // resolved points
  const [status, setStatus] = useState(null);

  // A typed place becomes coordinates (any format accepted) or is looked up.
  const resolve = async (text) => {
    const c = parseCoordinate(text);
    if (!c.error) return { text, lat: c.lat, lon: c.lon, label: `${c.lat.toFixed(6)}, ${c.lon.toFixed(6)}`, isCoord: true };
    const arr = await searchAddress(text, () => setStatus({ type: 'loading', msg: 'Waiting a moment: the free place lookup allows one request per second…' }));
    if (!arr?.length) throw new Error(`Could not find "${text}". Add the city and country, or paste coordinates.`);
    return { text, lat: +arr[0].lat, lon: +arr[0].lon, label: arr[0].display_name };
  };

  const go = async (f = from, t = to) => {
    if (!f.trim() || !t.trim()) { setStatus({ type: 'err', msg: 'Enter both a starting point and a destination.' }); return; }
    setStatus({ type: 'loading', msg: 'Finding both places…' });
    try {
      const a = await resolve(f.trim());
      const b = await resolve(t.trim());
      setEnds({ a, b });
      setStatus(null);
    } catch (e) {
      setStatus({ type: 'err', msg: e.message });
    }
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setEnds((e) => ({ a: e.b, b: e.a }));
  };

  const myLocation = () => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition((p) => {
      const t = `${p.coords.latitude.toFixed(6)}, ${p.coords.longitude.toFixed(6)}`;
      setFrom(t);
      setEnds((e) => ({ ...e, a: { text: t, lat: p.coords.latitude, lon: p.coords.longitude, label: 'Your location', isCoord: true } }));
    });
  };

  const line = useMemo(() => measure(ends.a.lat, ends.a.lon, ends.b.lat, ends.b.lon), [ends]);
  // Typed coordinates go to Google as coordinates. Place names go as typed:
  // Google's own place search knows entrances and access roads better than
  // our preview lookup, which is only used for the pins and the distance.
  const forGoogle = (e) => (e.isCoord ? `${e.lat},${e.lon}` : e.text);
  const o = forGoogle(ends.a);
  const d = forGoogle(ends.b);

  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-4">Plan a route</h2>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="dir-from" className="text-[10px] uppercase tracking-wider text-accent font-semibold">From (origin)</label>
          <input id="dir-from" className="field mt-1" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Address, landmark, or coordinates" onKeyDown={(e) => e.key === 'Enter' && go()} />
          <button type="button" onClick={myLocation} className="btn-ghost text-xs mt-2">📍 Use my location</button>
        </div>
        <div>
          <label htmlFor="dir-to" className="text-[10px] uppercase tracking-wider text-accent font-semibold">To (destination)</label>
          <input id="dir-to" className="field mt-1" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Address, landmark, or coordinates" onKeyDown={(e) => e.key === 'Enter' && go()} />
        </div>
      </div>

      <div className="mt-3 max-w-[260px]">
        <label htmlFor="dir-mode" className="text-[10px] uppercase tracking-wider text-accent font-semibold">Travel mode</label>
        <select id="dir-mode" className="field mt-1" value={mode} onChange={(e) => setMode(e.target.value)}>
          {MODES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button type="button" onClick={() => go()} className="btn-primary">Get directions →</button>
        <button type="button" onClick={swap} className="btn-ghost">⇄ Swap</button>
      </div>

      {status?.type === 'loading' && (
        <div className="bg-accent/10 border border-accent/40 text-accent rounded-lg p-3 text-sm mt-3 flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          {status.msg}
        </div>
      )}
      {status?.type === 'err' && <div role="alert" className="bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm mt-3">{status.msg}</div>}

      <dl className="grid sm:grid-cols-2 gap-2 mt-4 text-sm">
        <div className="bg-tint/5 border border-line rounded-md p-2"><dt className="text-[10px] uppercase tracking-wider text-fg-subtle">From</dt><dd className="text-xs">{ends.a.label || ends.a.text}</dd></div>
        <div className="bg-tint/5 border border-line rounded-md p-2"><dt className="text-[10px] uppercase tracking-wider text-fg-subtle">To</dt><dd className="text-xs">{ends.b.label || ends.b.text}</dd></div>
        <div className="bg-tint/5 border border-line rounded-md p-2 sm:col-span-2">
          <dt className="text-[10px] uppercase tracking-wider text-fg-subtle">Straight-line distance</dt>
          <dd className="text-sm"><strong className="text-fg">{fmtKm(line.meters)}</strong> <span className="text-fg-subtle">· the road route is longer; across the US it averages about 1.4 times this</span></dd>
        </div>
      </dl>

      {EMBED_KEY ? (
        <div className="relative w-full mt-4 rounded-2xl overflow-hidden border border-line" style={{ paddingBottom: '62%' }}>
          <iframe
            key={`${o}|${d}|${mode}`}
            src={embedUrl(o, d, mode)}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps route"
          />
        </div>
      ) : (
        <>
          <div className="h-[340px] rounded-2xl overflow-hidden ring-1 ring-line mt-4">
            <MapPair path={line.path} dashed />
          </div>
          <p className="text-sm text-fg-muted mt-3">
            Preview: the dashed line joins the two places in a straight line; it is not the road route.
            The route, its distance, travel time with current traffic, and turn-by-turn steps open in Google Maps.
          </p>
        </>
      )}

      <div className="flex flex-wrap gap-2 mt-4">
        <a href={dirUrl(o, d, mode)} target="_blank" rel="noopener" className={EMBED_KEY ? 'btn-ghost' : 'btn-primary'}>
          {EMBED_KEY ? 'Open in Google Maps' : 'Open route in Google Maps ↗'}
        </a>
      </div>
    </section>
  );
}
