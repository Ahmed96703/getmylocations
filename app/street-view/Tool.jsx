'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { parseCoordinate } from '../coordinates-converter/geo.js';
import { searchAddress } from '../address-finder/geocode.js';

const AddressMap = dynamic(() => import('../address-finder/AddressMap.jsx'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-tint/5 animate-pulse" aria-label="Loading map" />,
});

// With a Maps Embed API key (free, unlimited, restricted to this domain) the
// panorama is embedded on the page. Without one, the tool shows the spot on a
// map and opens the panorama in Google Maps through the official, key-free
// Maps URLs format. The old keyless `output=embed` URL never showed a
// panorama, so it is not used.
const EMBED_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY || '';

const PRESETS = [
  { name: 'Eiffel Tower, Paris', lat: 48.85826, lon: 2.294501 },
  { name: 'Times Square, New York', lat: 40.758, lon: -73.9855 },
  { name: 'Burj Khalifa, Dubai', lat: 25.197197, lon: 55.274376 },
  { name: 'Badshahi Mosque, Lahore', lat: 31.588126, lon: 74.309353 },
  { name: 'Sydney Opera House', lat: -33.856784, lon: 151.215297 },
  { name: 'Tokyo Tower', lat: 35.65858, lon: 139.745433 },
];

const HEADINGS = [['N', 0], ['E', 90], ['S', 180], ['W', 270]];

const panoUrl = (lat, lon, heading) =>
  `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lon}&heading=${heading}`;
const embedUrl = (lat, lon, heading) =>
  `https://www.google.com/maps/embed/v1/streetview?key=${EMBED_KEY}&location=${lat},${lon}&heading=${heading}&pitch=0&fov=90`;

export default function Tool() {
  const [query, setQuery] = useState(PRESETS[0].name);
  const [spot, setSpot] = useState({ lat: PRESETS[0].lat, lon: PRESETS[0].lon, label: PRESETS[0].name });
  const [heading, setHeading] = useState(0);
  const [status, setStatus] = useState(null);

  const show = (lat, lon, label) => {
    setSpot({ lat, lon, label });
    setStatus(null);
  };

  const load = async (raw) => {
    const q = raw.trim();
    if (!q) { setStatus({ type: 'err', msg: 'Enter an address, a landmark, or coordinates.' }); return; }
    const c = parseCoordinate(q);
    if (!c.error) { show(c.lat, c.lon, `${c.lat.toFixed(6)}, ${c.lon.toFixed(6)}`); return; }
    // Not coordinates: look the place up first so Street View gets an exact point.
    setStatus({ type: 'loading', msg: `Finding "${q}"…` });
    try {
      const arr = await searchAddress(q, () => setStatus({ type: 'loading', msg: 'Waiting a moment: the free geocoder allows one request per second…' }));
      if (!arr?.length) { setStatus({ type: 'err', msg: 'No place found. Add the city and country, or paste coordinates.' }); return; }
      show(+arr[0].lat, +arr[0].lon, arr[0].display_name);
    } catch (e) {
      setStatus({ type: 'err', msg: e.message });
    }
  };

  const myLocation = () => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition((p) => {
      const { latitude, longitude } = p.coords;
      setQuery(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
      show(latitude, longitude, 'Your location');
    });
  };

  const openUrl = panoUrl(spot.lat, spot.lon, heading);

  return (
    <section className="glass rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-3">Load a Street View</h2>

      <div className="flex flex-wrap gap-2">
        <input
          aria-label="Address, landmark, or coordinates"
          className="field flex-1 min-w-[200px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Address, landmark, or coordinates (any format)"
          onKeyDown={(e) => e.key === 'Enter' && load(query)}
        />
        <button type="button" onClick={() => load(query)} className="btn-primary">Find →</button>
        <button type="button" onClick={myLocation} className="btn-ghost">📍 My location</button>
      </div>

      <div className="flex flex-wrap gap-1 mt-3">
        {PRESETS.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => { setQuery(p.name); show(p.lat, p.lon, p.name); }}
            className="text-xs px-3 py-1.5 rounded-md bg-tint/5 hover:bg-accent/10 hover:text-accent border border-line transition"
          >
            {p.name}
          </button>
        ))}
      </div>

      {status?.type === 'loading' && (
        <div className="bg-accent/10 border border-accent/40 text-accent rounded-lg p-3 text-sm mt-3 flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          {status.msg}
        </div>
      )}
      {status?.type === 'err' && <div role="alert" className="bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm mt-3">{status.msg}</div>}

      <p className="text-xs text-fg-subtle mt-3">
        <strong className="text-fg">{spot.label}</strong> · {spot.lat.toFixed(6)}, {spot.lon.toFixed(6)}
      </p>

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className="text-xs text-fg-subtle">Face:</span>
        {HEADINGS.map(([k, h]) => (
          <button
            key={k}
            type="button"
            onClick={() => setHeading(h)}
            aria-pressed={heading === h}
            className={`text-xs w-9 py-1.5 rounded-md border transition ${heading === h ? 'border-accent bg-accent/10 text-fg' : 'border-line hover:bg-tint/5 text-fg-muted'}`}
          >
            {k}
          </button>
        ))}
      </div>

      {EMBED_KEY ? (
        <div className="relative w-full mt-3 rounded-2xl overflow-hidden border border-line" style={{ paddingBottom: '56.25%' }}>
          <iframe
            key={`${spot.lat},${spot.lon},${heading}`}
            src={embedUrl(spot.lat, spot.lon, heading)}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Google Street View near ${spot.label}`}
          />
        </div>
      ) : (
        <div className="mt-3">
          <div className="h-[340px] rounded-2xl overflow-hidden ring-1 ring-line">
            <AddressMap place={[spot.lat, spot.lon]} label={spot.label} />
          </div>
          <p className="text-sm text-fg-muted mt-3">
            The pin marks the spot. The Street View panorama opens in Google Maps, which jumps to the nearest
            panorama to this point and faces the direction you picked.
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-4">
        <a href={openUrl} target="_blank" rel="noopener" className="btn-primary">
          {EMBED_KEY ? 'Open full screen in Google Maps' : 'Open Street View here ↗'}
        </a>
      </div>
    </section>
  );
}
