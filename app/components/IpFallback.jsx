'use client';

import { useState } from 'react';
import Link from 'next/link';

// Shown on the homepage when no GPS/Wi-Fi fix is available (permission denied,
// an error, or no answer yet). The IP lookup only runs when the visitor asks
// for it, because it sends their IP address to BigDataCloud. Called without
// coordinates, its free client endpoint estimates the location from the IP.
export default function IpFallback() {
  const [state, setState] = useState({ type: 'idle' });

  const lookup = async () => {
    setState({ type: 'loading' });
    try {
      const r = await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=en');
      const d = await r.json();
      if (!r.ok || !d.countryName) throw new Error('lookup failed');
      const city = d.city || d.locality;
      setState({ type: 'ok', place: [city, d.principalSubdivision, d.countryName].filter((v, i, a) => v && a.indexOf(v) === i).join(', ') });
    } catch {
      setState({ type: 'err' });
    }
  };

  return (
    <div className="rounded-xl bg-tint/5 border border-line px-4 py-3 mt-4 text-sm" aria-live="polite">
      <div className="text-[10px] uppercase tracking-[0.14em] text-fg-subtle font-semibold">Approximate area (no permission needed)</div>
      {state.type === 'ok' ? (
        <>
          <p className="mt-1 font-semibold text-fg">{state.place}</p>
          <p className="mt-1 text-xs text-fg-subtle">
            Estimated from your IP address, so it can be a city or more away and shows your
            VPN&rsquo;s location if you use one. Allow location for your exact spot.{' '}
            <Link href="/gps-vs-ip-accuracy" className="text-accent hover:underline">Why IP and GPS differ</Link>
          </p>
        </>
      ) : (
        <>
          <p className="mt-1 text-fg-muted">
            No exact fix yet. You can see your rough area from your IP address instead; this sends
            your IP to BigDataCloud.
          </p>
          <button type="button" onClick={lookup} disabled={state.type === 'loading'} className="btn-ghost mt-2 text-xs">
            {state.type === 'loading' ? 'Looking up…' : 'Show my approximate area'}
          </button>
          {state.type === 'err' && <p role="alert" className="mt-1 text-xs text-rose-500">The IP lookup did not answer. Try again in a moment.</p>}
        </>
      )}
    </div>
  );
}
