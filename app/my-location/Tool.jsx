'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import CopyButton from '../components/CopyButton.jsx';
import { reverseLookup, precisionOf, metersBetween, formatMeters } from '../address-finder/geocode.js';

const MapView = dynamic(() => import('../components/MapView.jsx'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-tint/5 animate-pulse rounded-2xl" />,
});

export default function Tool() {
  const [pos, setPos] = useState(null);
  const [meta, setMeta] = useState({});
  const [place, setPlace] = useState(null); // reverse-geocoded result, or { error }
  const [status, setStatus] = useState({ type: 'idle', msg: '' });

  const find = () => {
    if (!('geolocation' in navigator)) {
      setStatus({ type: 'err', msg: 'Geolocation is not supported by your browser.' });
      return;
    }
    setStatus({ type: 'loading', msg: 'Requesting your location…' });
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const lat = p.coords.latitude, lon = p.coords.longitude;
        setPos([lat, lon]);
        setMeta({
          accuracy: p.coords.accuracy,
          altitude: p.coords.altitude,
        });
        setStatus({ type: 'ok', msg: `✓ Location found · accuracy ${Math.round(p.coords.accuracy)} m` });
        // One reverse lookup per button press, through the shared throttle
        // that keeps us inside Nominatim's one-request-per-second policy.
        setPlace(null);
        reverseLookup(lat, lon)
          .then((d) => setPlace(d && !d.error ? { result: d, query: [lat, lon] } : { error: true }))
          .catch(() => setPlace({ error: true }));
      },
      (err) => {
        const msgs = {
          1: 'Permission denied. Click the lock icon in your address bar → Site settings → Location → Allow.',
          2: 'Location unavailable. Move closer to a window or check GPS/Wi-Fi.',
          3: 'Request timed out. Try clicking the button again.',
        };
        setStatus({ type: 'err', msg: msgs[err.code] || 'Could not retrieve location.' });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  return (
    <section className="glass rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">Find my current location</h2>
        <button onClick={find} className="btn-primary">📍 Find my location</button>
      </div>

      {status.type === 'loading' && (
        <div role="status" className="bg-accent/10 border border-accent/40 text-accent rounded-lg p-3 text-sm flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          {status.msg}
        </div>
      )}
      {status.type === 'err' && (
        <div role="alert" className="bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{status.msg}</div>
      )}
      {status.type === 'ok' && pos && (
        <div role="status" className="bg-emerald-500/10 border border-emerald-400/30 text-emerald-600 rounded-lg p-3 text-sm">{status.msg}</div>
      )}

      {pos && (
        <>
          <div className="bg-accent/10 border border-accent/40 rounded-lg p-4 mt-4 text-center">
            <div className="text-xs text-fg-subtle uppercase tracking-wider">Your coordinates (latitude, longitude)</div>
            <div className="font-mono text-xl font-bold text-fg mt-1">
              {pos[0].toFixed(6)}, {pos[1].toFixed(6)}
            </div>
            <CopyButton text={`${pos[0].toFixed(6)}, ${pos[1].toFixed(6)}`} label="📋 Copy coordinates" className="text-xs text-accent hover:underline mt-1" />
          </div>

          <div className="bg-tint/5 border border-line rounded-lg p-4 mt-3">
            <div className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">Your current address (nearest match)</div>
            {!place && <p className="text-sm text-fg-muted mt-1">Looking up the nearest address…</p>}
            {place?.error && <p className="text-sm text-fg-muted mt-1">No address was found for this point. It may be in an unmapped area; your coordinates above are still exact.</p>}
            {place?.result && (() => {
              const a = place.result.address || {};
              const street = [a.house_number, a.road || a.pedestrian || a.footway].filter(Boolean).join(' ');
              const gap = metersBetween(place.query[0], place.query[1], +place.result.lat, +place.result.lon);
              const prec = precisionOf(place.result);
              return (
                <>
                  {street && <p className="font-semibold text-fg mt-1">{street}</p>}
                  <p className="text-sm text-fg-muted mt-1">{place.result.display_name}</p>
                  <p className="text-xs text-fg-subtle mt-2">
                    Matched to: {prec.label.toLowerCase()} · {formatMeters(gap)} from your coordinates
                    {gap > 100 || meta.accuracy > 100 ? '. Treat it as the general area, not your exact door.' : '.'}
                  </p>
                  <CopyButton text={place.result.display_name} label="📋 Copy address" className="text-xs text-accent hover:underline mt-1" />
                </>
              );
            })()}
          </div>

          <dl className="grid sm:grid-cols-3 gap-3 mt-4 text-sm">
            <div className="bg-tint/5 border border-line rounded-lg p-3">
              <dt className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">Accuracy</dt>
              <dd className="font-mono mt-1">{Math.round(meta.accuracy)} m</dd>
            </div>
            <div className="bg-tint/5 border border-line rounded-lg p-3">
              <dt className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">Altitude</dt>
              <dd className="font-mono mt-1">{meta.altitude != null ? `${Math.round(meta.altitude)} m` : '—'}</dd>
            </div>
            <div className="bg-tint/5 border border-line rounded-lg p-3">
              <dt className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">City, country</dt>
              <dd className="mt-1 text-sm">
                {place?.result
                  ? [place.result.address?.city || place.result.address?.town || place.result.address?.village || place.result.address?.county, place.result.address?.country].filter(Boolean).join(', ') || '—'
                  : '—'}
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-2 mt-4">
            <a href={`https://www.google.com/maps?q=${pos[0]},${pos[1]}`} target="_blank" rel="noopener" className="btn-ghost">Google Maps</a>
            <a href={`https://www.openstreetmap.org/?mlat=${pos[0]}&mlon=${pos[1]}#map=15/${pos[0]}/${pos[1]}`} target="_blank" rel="noopener" className="btn-ghost">OpenStreetMap</a>
          </div>

          <div className="h-[380px] rounded-2xl overflow-hidden ring-1 ring-line mt-4">
            <MapView pos={pos} />
          </div>
        </>
      )}

      {!pos && status.type === 'idle' && (
        <p className="text-sm text-fg-subtle mt-2">Click the button above to start.</p>
      )}
    </section>
  );
}
