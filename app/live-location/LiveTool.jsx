'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('../components/MapView.jsx'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-tint/5 animate-pulse rounded-2xl" />,
});

export default function LiveTool() {
  const [pos, setPos] = useState(null);
  const [meta, setMeta] = useState({});
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [status, setStatus] = useState({ type: 'idle', msg: '' });
  const [updates, setUpdates] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [watching, setWatching] = useState(false);
  const watchIdRef = useRef(null);
  // Throttle reverse-geocoding so we respect Nominatim's 1 req/sec policy.
  const lastGeocodeRef = useRef({ lat: null, lon: null, at: 0 });

  function maybeGeocode(lat, lon) {
    const last = lastGeocodeRef.current;
    const now = Date.now();
    const movedMeters =
      last.lat == null
        ? Infinity
        : Math.hypot(
            (lat - last.lat) * 111000,
            (lon - last.lon) * 111000 * Math.cos((lat * Math.PI) / 180),
          );
    if (now - last.at < 10000 && movedMeters < 100) return;
    lastGeocodeRef.current = { lat, lon, at: now };
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
      .then((r) => r.json())
      .then((d) => {
        const a = d?.address || {};
        setCity(a.city || a.town || a.village || a.county || '—');
        setCountry(a.country || '—');
      })
      .catch(() => {});
  }

  const start = () => {
    if (!('geolocation' in navigator)) {
      setStatus({ type: 'err', msg: 'Geolocation is not supported by your browser.' });
      return;
    }
    setStatus({ type: 'loading', msg: 'Starting live tracking…' });
    setUpdates(0);
    const id = navigator.geolocation.watchPosition(
      (p) => {
        const lat = p.coords.latitude;
        const lon = p.coords.longitude;
        setPos([lat, lon]);
        setMeta({
          accuracy: p.coords.accuracy,
          altitude: p.coords.altitude,
          speed: p.coords.speed,
          heading: p.coords.heading,
        });
        setUpdates((n) => n + 1);
        setLastUpdate(new Date());
        setWatching(true);
        setStatus({ type: 'ok', msg: `● Live · accuracy ${Math.round(p.coords.accuracy)} m` });
        maybeGeocode(lat, lon);
      },
      (err) => {
        const msgs = {
          1: 'Permission denied. Click the lock icon in your address bar → Site settings → Location → Allow.',
          2: 'Location unavailable. Move closer to a window or check GPS/Wi-Fi.',
          3: 'Request timed out. Try clicking the button again.',
        };
        setStatus({ type: 'err', msg: msgs[err.code] || 'Could not retrieve location.' });
        setWatching(false);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 },
    );
    watchIdRef.current = id;
  };

  const stop = () => {
    if (watchIdRef.current != null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setWatching(false);
    setStatus({ type: 'idle', msg: '' });
  };

  useEffect(
    () => () => {
      if (watchIdRef.current != null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    },
    [],
  );

  const copy = () => {
    if (!pos) return;
    navigator.clipboard.writeText(`${pos[0].toFixed(6)}, ${pos[1].toFixed(6)}`);
  };

  return (
    <section className="glass rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">Live location tracker</h2>
          {watching && (
            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          )}
        </div>
        {watching ? (
          <button onClick={stop} className="btn-ghost">⏸ Stop tracking</button>
        ) : (
          <button onClick={start} className="btn-primary">📍 Start live tracking</button>
        )}
      </div>

      {status.type === 'loading' && (
        <div className="bg-accent/10 border border-accent/40 text-accent rounded-lg p-3 text-sm flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          {status.msg}
        </div>
      )}
      {status.type === 'err' && (
        <div className="bg-rose-500/10 border border-rose-400/30 text-rose-200 rounded-lg p-3 text-sm">{status.msg}</div>
      )}
      {status.type === 'ok' && pos && (
        <div className="bg-emerald-500/10 border border-emerald-400/30 text-emerald-200 rounded-lg p-3 text-sm">{status.msg}</div>
      )}

      {pos && (
        <>
          <div className="bg-accent/10 border border-accent/40 rounded-lg p-4 mt-4 text-center">
            <div className="font-mono text-xl font-bold text-fg">
              {pos[0].toFixed(6)}, {pos[1].toFixed(6)}
            </div>
            <div className="text-xs text-fg-subtle mt-1 uppercase tracking-wider">
              Decimal degrees · updates as you move
            </div>
          </div>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-sm">
            <div className="bg-tint/5 border border-line rounded-lg p-3">
              <dt className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">Accuracy</dt>
              <dd className="font-mono mt-1">{Math.round(meta.accuracy)} m</dd>
            </div>
            <div className="bg-tint/5 border border-line rounded-lg p-3">
              <dt className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">Speed</dt>
              <dd className="font-mono mt-1">
                {meta.speed != null && !Number.isNaN(meta.speed) ? `${(meta.speed * 3.6).toFixed(1)} km/h` : '—'}
              </dd>
            </div>
            <div className="bg-tint/5 border border-line rounded-lg p-3">
              <dt className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">Updates</dt>
              <dd className="font-mono mt-1">{updates}</dd>
            </div>
            <div className="bg-tint/5 border border-line rounded-lg p-3">
              <dt className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">Last update</dt>
              <dd className="font-mono mt-1 text-xs">{lastUpdate ? lastUpdate.toLocaleTimeString() : '—'}</dd>
            </div>
          </dl>

          {(city || country) && (
            <div className="text-sm text-fg-muted mt-3">
              <strong className="text-fg">Location:</strong> {city}
              {country && country !== '—' ? `, ${country}` : ''}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            <button onClick={copy} className="btn-ghost">📋 Copy coordinates</button>
            <a
              href={`https://www.google.com/maps?q=${pos[0]},${pos[1]}`}
              target="_blank"
              rel="noopener"
              className="btn-ghost"
            >
              Google Maps
            </a>
            <a
              href={`https://www.openstreetmap.org/?mlat=${pos[0]}&mlon=${pos[1]}#map=15/${pos[0]}/${pos[1]}`}
              target="_blank"
              rel="noopener"
              className="btn-ghost"
            >
              OpenStreetMap
            </a>
          </div>

          <div className="h-[380px] rounded-2xl overflow-hidden ring-1 ring-line mt-4">
            <MapView pos={pos} />
          </div>
        </>
      )}

      {!pos && status.type === 'idle' && (
        <p className="text-sm text-fg-subtle mt-2">
          Tap <em>Start live tracking</em> to begin. Your position refreshes automatically as you move; tap{' '}
          <em>Stop</em> when you are done.
        </p>
      )}
    </section>
  );
}
