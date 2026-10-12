import { useEffect, useRef, useState } from 'react';
import { reverseLookup } from '../address-finder/geocode.js';

// Street-level reverse lookup for the homepage. It reruns only after the fix
// moves about 100 m (three decimal places), and every call goes through the
// shared throttle that keeps us inside Nominatim's one-request-per-second
// usage policy.
export function useStreetAddress(pos) {
  const [state, setState] = useState(null); // { result, query } | { error: true } | null
  const key = pos ? `${pos[0].toFixed(3)},${pos[1].toFixed(3)}` : '';
  const latest = useRef(pos);
  latest.current = pos;

  useEffect(() => {
    if (!key) return undefined;
    let cancelled = false;
    const t = setTimeout(() => {
      // Look up the exact latest fix, not the rounded key.
      const [lat, lon] = latest.current;
      reverseLookup(lat, lon)
        .then((d) => { if (!cancelled) setState(d && !d.error ? { result: d, query: [lat, lon] } : { error: true }); })
        .catch(() => { if (!cancelled) setState({ error: true }); });
    }, 600);
    return () => { cancelled = true; clearTimeout(t); };
    // Keyed on the rounded position only, so small jitter does not refetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}
