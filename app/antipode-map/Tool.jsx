'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePlace, PlaceSearch } from '../components/usePlace.jsx';
import CopyButton from '../components/CopyButton.jsx';
import { track } from '../components/track.js';
import { reverseLookup } from '../address-finder/geocode.js';
import { sunPosition } from '../sunrise-sunset/sun.js';

const PointsMap = dynamic(() => import('../components/PointsMap.jsx'), {
  ssr: false,
  loading: () => <div className="w-full aspect-[4/3] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading map" />,
});

const zoneOf = (lat, lon) => import('@photostructure/tz-lookup').then((m) => (m.default || m)(lat, lon));

// The point on the exact opposite side of the Earth.
export const antipode = (lat, lon) => ({ lat: -lat, lon: lon > 0 ? lon - 180 : lon + 180 });

const fmtLL = (p) => `${Math.abs(p.lat).toFixed(4)}° ${p.lat >= 0 ? 'N' : 'S'}, ${Math.abs(p.lon).toFixed(4)}° ${p.lon >= 0 ? 'E' : 'W'}`;

async function describe(p) {
  const [addr, tz] = await Promise.all([
    reverseLookup(p.lat.toFixed(4), p.lon.toFixed(4)).catch(() => null),
    zoneOf(p.lat, p.lon).catch(() => null),
  ]);
  const a = addr?.address;
  const name = a ? [a.city || a.town || a.village || a.hamlet || a.county || a.state_district, a.state, a.country].filter((v, i, arr) => v && arr.indexOf(v) === i).join(', ') : '';
  return { name, water: !addr || addr.error || !a?.country, tz };
}

function Card({ title, p, info }) {
  const sun = sunPosition(Date.now(), p.lat, p.lon);
  return (
    <div className="rounded-xl ring-1 ring-line p-4 bg-tint/5">
      <p className="text-xs uppercase tracking-wide text-fg-subtle">{title}</p>
      <p className="font-semibold text-fg mt-1">{info ? (info.water ? 'Open water (no land here)' : info.name || 'Land with no named place nearby') : 'Looking up…'}</p>
      <p className="font-mono text-sm text-fg-muted mt-1 flex flex-wrap items-center gap-x-3">{fmtLL(p)} <CopyButton text={`${p.lat.toFixed(6)}, ${p.lon.toFixed(6)}`} className="text-xs text-accent hover:underline font-sans" /></p>
      {info?.tz && (
        <p className="text-sm text-fg-muted mt-1">
          {new Date().toLocaleTimeString('en-US', { timeZone: info.tz, hour: 'numeric', minute: '2-digit' })} local time · {sun.altitude > 0 ? '☀️ daytime' : sun.altitude > -6 ? '🌆 twilight' : '🌙 night'}
        </p>
      )}
    </div>
  );
}

export default function Tool() {
  const [here, setHere] = useState(null);
  const [info, setInfo] = useState({});
  const [fitKey, setFitKey] = useState(0);

  const go = async (lat, lon, label) => {
    const p = { lat, lon, label };
    const q = antipode(lat, lon);
    setHere({ p, q });
    setInfo({});
    setFitKey((k) => k + 1);
    track('tool_run');
    const [a, b] = await Promise.all([describe(p), describe(q)]);
    setInfo({ a: label && label !== 'your location' ? { ...a, name: label, water: false } : a, b });
  };
  const place = usePlace((lat, lon, label) => go(lat, lon, label));

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-bold mb-4">What is on the other side of the Earth?</h2>
      <PlaceSearch place={place} button="Use my location" placeholder="Search a city, address or country" />
      <p className="text-xs text-fg-subtle mb-3">
        Try:{' '}
        {[['Madrid', 40.4168, -3.7038], ['Shanghai', 31.2304, 121.4737], ['Honolulu', 21.3069, -157.8583], ['London', 51.5074, -0.1278]].map(([n, la, lo], i) => (
          <span key={n}>{i > 0 && ' · '}<button type="button" className="text-accent hover:underline" onClick={() => go(la, lo, n)}>{n}</button></span>
        ))}
      </p>

      {here && (
        <div className="grid md:grid-cols-2 gap-3 mb-3">
          <Card title="Your point" p={here.p} info={info.a} />
          <Card title="Antipode (exact opposite)" p={here.q} info={info.b} />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <PointsMap center={here ? here.p : null} fitKey={fitKey} onPick={(lat, lon) => go(lat, lon, '')} label="Map of your point: click to choose another" centerTip="Your point" zoom={5} start={[30, 0]} startZoom={1} />
          <p className="text-xs text-fg-subtle mt-1">Click this map to pick any point.</p>
        </div>
        <div>
          <PointsMap center={here ? here.q : null} fitKey={fitKey} label="Map of the antipode" centerTip="Antipode" zoom={5} start={[-30, 180]} startZoom={1} />
          <p className="text-xs text-fg-subtle mt-1">The point straight through the centre of the Earth.</p>
        </div>
      </div>

      {here && (
        <p className="mt-4 text-sm text-fg-muted">
          The two points are 20,015 km apart by any route over the surface, the farthest any two places can be, and 12,742 km apart straight through the Earth. When it is midday at one, it is around midnight at the other, and their seasons are opposite.
        </p>
      )}

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Worked out on your device: the antipode has the opposite latitude and a longitude 180° away. Place names come from OpenStreetMap&rsquo;s Nominatim, which receives the two coordinates.
      </p>
    </section>
  );
}
