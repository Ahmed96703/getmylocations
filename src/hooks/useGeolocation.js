import { useEffect, useRef, useState } from 'react';

export function useGeolocation(enabled) {
  const [pos, setPos] = useState(null);
  const [meta, setMeta] = useState({ accuracy: null, ts: null });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(enabled);
  const watchRef = useRef(null);

  const start = () => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPos([p.coords.latitude, p.coords.longitude]);
        setMeta({ accuracy: p.coords.accuracy, ts: p.timestamp });
        setLoading(false);
      },
      (err) => {
        setError(err.code === 1 ? 'Permission denied. Please allow location access.' : err.message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
    watchRef.current = navigator.geolocation.watchPosition(
      (p) => {
        setPos([p.coords.latitude, p.coords.longitude]);
        setMeta({ accuracy: p.coords.accuracy, ts: p.timestamp });
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

  useEffect(() => {
    if (enabled) start();
    else stop();
    return stop;
  }, [enabled]);

  return { pos, meta, error, loading, retry: start };
}
