import { useEffect, useRef, useState } from 'react';

export function useGeolocation(enabled) {
  const [pos, setPos] = useState(null);
  const [meta, setMeta] = useState({ accuracy: null, ts: null });
  const [error, setError] = useState(null);
  const [permission, setPermission] = useState('prompt'); // 'granted' | 'denied' | 'prompt' | 'unsupported'
  const [loading, setLoading] = useState(enabled);
  const watchRef = useRef(null);
  const permRef = useRef(null);

  const start = () => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by your browser.');
      setPermission('unsupported');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPos([p.coords.latitude, p.coords.longitude]);
        setMeta({ accuracy: p.coords.accuracy, ts: p.timestamp });
        setPermission('granted');
        setLoading(false);
      },
      (err) => {
        if (err.code === 1) {
          setPermission('denied');
          setError('Location access was blocked. Please allow it from your browser site settings.');
        } else if (err.code === 2) {
          setError('Position unavailable. Please check your network or GPS signal.');
        } else if (err.code === 3) {
          setError('Location request timed out. Please try again.');
        } else {
          setError(err.message);
        }
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
    watchRef.current = navigator.geolocation.watchPosition(
      (p) => {
        setPos([p.coords.latitude, p.coords.longitude]);
        setMeta({ accuracy: p.coords.accuracy, ts: p.timestamp });
        setPermission('granted');
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 5000 }
    );
  };

  const stop = () => {
    if (watchRef.current != null) {
      navigator.geolocation.clearWatch(watchRef.current);
      watchRef.current = null;
    }
  };

  // Watch permission state — auto-retries the moment user unblocks in browser settings.
  useEffect(() => {
    if (!enabled || !navigator.permissions?.query) return;
    let active = true;
    navigator.permissions.query({ name: 'geolocation' }).then((status) => {
      if (!active) return;
      permRef.current = status;
      setPermission(status.state);
      const onChange = () => {
        setPermission(status.state);
        if (status.state === 'granted' || status.state === 'prompt') start();
      };
      status.addEventListener('change', onChange);
    }).catch(() => {});
    return () => { active = false; };
  }, [enabled]);

  useEffect(() => {
    if (enabled) start();
    else stop();
    return stop;
  }, [enabled]);

  return { pos, meta, error, loading, permission, retry: start };
}
