'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('../components/MapView.jsx'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-tint/5 animate-pulse rounded-2xl" />,
});

// A trail point is only added after moving at least this far, and only from
// a reading at least this accurate, so GPS jitter while standing still does
// not draw scribbles or inflate the distance. The page text quotes both.
const TRAIL_MIN_STEP_M = 10;
const TRAIL_MAX_ACCURACY_M = 50;

function metersBetween([lat1, lon1], [lat2, lon2]) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

const COMPASS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

function formatDistance(m) {
  return m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(2)} km`;
}

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
  const [trail, setTrail] = useState([]);
  const [distance, setDistance] = useState(0);
  const [keepAwake, setKeepAwake] = useState(false);
  const [wakeSupported, setWakeSupported] = useState(false);
  const wakeLockRef = useRef(null);
  const lastTrailPointRef = useRef(null);
  // Throttle reverse-geocoding: at most once per 10 s, and only after moving
  // 100 m. The page promises users this cap, and it keeps us well inside
  // Nominatim's 1 req/sec policy.
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
    if (now - last.at < 10000 || movedMeters < 100) return;
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
    setTrail([]);
    setDistance(0);
    lastTrailPointRef.current = null;
    const id = navigator.geolocation.watchPosition(
      (p) => {
        const lat = p.coords.latitude;
        const lon = p.coords.longitude;
        setPos([lat, lon]);
        if (p.coords.accuracy <= TRAIL_MAX_ACCURACY_M) {
          const last = lastTrailPointRef.current;
          const step = last ? metersBetween(last, [lat, lon]) : 0;
          if (!last || step >= TRAIL_MIN_STEP_M) {
            lastTrailPointRef.current = [lat, lon];
            setTrail((t) => [...t, [lat, lon]]);
            setDistance((d) => d + step);
          }
        }
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

  useEffect(() => {
    setWakeSupported(typeof navigator !== 'undefined' && 'wakeLock' in navigator);
  }, []);

  // Screen Wake Lock: hold it only while tracking with the toggle on. The
  // browser drops the lock whenever the tab is hidden, so re-request it when
  // the tab becomes visible again.
  useEffect(() => {
    if (!wakeSupported || !keepAwake || !watching) return undefined;
    let cancelled = false;
    const acquire = async () => {
      try {
        const lock = await navigator.wakeLock.request('screen');
        if (cancelled) lock.release();
        else wakeLockRef.current = lock;
      } catch {
        // Denied (e.g. battery saver); tracking still works without it.
      }
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible') acquire();
    };
    acquire();
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      cancelled = true;
      document.removeEventListener('visibilitychange', onVisible);
      wakeLockRef.current?.release().catch(() => {});
      wakeLockRef.current = null;
    };
  }, [wakeSupported, keepAwake, watching]);

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
        <div className="flex flex-wrap items-center gap-3">
          {wakeSupported && (
            <label className="inline-flex items-center gap-2 text-sm text-fg-muted cursor-pointer">
              <input
                type="checkbox"
                checked={keepAwake}
                onChange={(e) => setKeepAwake(e.target.checked)}
                className="accent-sky-500"
              />
              Keep screen on
            </label>
          )}
          {watching ? (
            <button onClick={stop} className="btn-ghost">⏸ Stop tracking</button>
          ) : (
            <button onClick={start} className="btn-primary">📍 Start live tracking</button>
          )}
        </div>
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

          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 text-sm">
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
              <dt className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">Heading</dt>
              <dd className="font-mono mt-1">
                {meta.heading != null && !Number.isNaN(meta.heading)
                  ? `${Math.round(meta.heading)}° ${COMPASS[Math.round(meta.heading / 45) % 8]}`
                  : '—'}
              </dd>
            </div>
            <div className="bg-tint/5 border border-line rounded-lg p-3">
              <dt className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">Altitude</dt>
              <dd className="font-mono mt-1">{meta.altitude != null ? `${Math.round(meta.altitude)} m` : '—'}</dd>
            </div>
            <div className="bg-tint/5 border border-line rounded-lg p-3">
              <dt className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">Distance</dt>
              <dd className="font-mono mt-1">{formatDistance(distance)}</dd>
            </div>
            <div className="bg-tint/5 border border-line rounded-lg p-3">
              <dt className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">Updates</dt>
              <dd className="font-mono mt-1">
                {updates}
                <span className="text-xs text-fg-subtle"> · {lastUpdate ? lastUpdate.toLocaleTimeString() : '—'}</span>
              </dd>
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
            <MapView pos={pos} trail={trail} />
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
