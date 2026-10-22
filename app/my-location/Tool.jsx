'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import CopyButton from '../components/CopyButton.jsx';
import { reverseLookup, precisionOf, metersBetween, formatMeters } from '../address-finder/geocode.js';

const MapView = dynamic(() => import('../components/MapView.jsx'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-tint/5 animate-pulse rounded-2xl" />,
});

const countryName = (code) => {
  try { return code ? new Intl.DisplayNames(['en'], { type: 'region' }).of(code) : ''; } catch { return code; }
};

// One row of the device-vs-IP table.
function Row({ icon, label, device, ip }) {
  return (
    <tr className="border-t border-line-subtle">
      <th scope="row" className="px-3 py-2.5 text-left font-semibold text-fg whitespace-nowrap"><span aria-hidden="true" className="mr-2">{icon}</span>{label}</th>
      <td className="px-3 py-2.5 text-fg">{device || '—'}</td>
      <td className="px-3 py-2.5 text-fg-muted">{ip || '—'}</td>
    </tr>
  );
}

export default function Tool() {
  const [pos, setPos] = useState(null);
  const [meta, setMeta] = useState({});
  const [place, setPlace] = useState(null); // reverse-geocoded result, or { error }
  const [status, setStatus] = useState({ type: 'idle', msg: '' });
  const [ipLoc, setIpLoc] = useState(null); // approximate place from the visitor's IP, via our own Worker

  // Answer "where am I?" roughly before any permission prompt: Cloudflare's
  // estimate for the visitor's IP, served by this site's own /api/ip.
  useEffect(() => {
    fetch('/api/ip', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && (d.city || d.country) && setIpLoc(d))
      .catch(() => {});
  }, []);

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

          <dl className="grid grid-cols-2 gap-3 mt-4 text-sm">
            <div className="bg-tint/5 border border-line rounded-lg p-3">
              <dt className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">Accuracy</dt>
              <dd className="font-mono mt-1">{Math.round(meta.accuracy)} m</dd>
            </div>
            <div className="bg-tint/5 border border-line rounded-lg p-3">
              <dt className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">Altitude</dt>
              <dd className="font-mono mt-1">{meta.altitude != null ? `${Math.round(meta.altitude)} m` : '—'}</dd>
            </div>
          </dl>

          {(() => {
            const a = place?.result?.address || {};
            const city = a.city || a.town || a.village || a.municipality || a.county;
            const gap = ipLoc?.latitude != null ? metersBetween(pos[0], pos[1], ipLoc.latitude, ipLoc.longitude) : null;
            return (
              <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
                <table className="w-full text-sm">
                  <caption className="sr-only">Your location from your device compared with the location from your IP address</caption>
                  <thead>
                    <tr className="bg-tint/5 text-left">
                      <th className="px-3 py-2 font-semibold text-fg-muted"><span className="sr-only">Detail</span></th>
                      <th className="px-3 py-2 font-semibold text-fg">📍 Your device (GPS / Wi-Fi)</th>
                      <th className="px-3 py-2 font-semibold text-fg-muted">🌐 Your IP address</th>
                    </tr>
                  </thead>
                  <tbody>
                    <Row icon="🌍" label="Country" device={a.country} ip={countryName(ipLoc?.country)} />
                    <Row icon="🏛️" label="State / region" device={a.state || a.region || a.province} ip={ipLoc?.region} />
                    <Row icon="🏙️" label="City" device={city} ip={ipLoc?.city} />
                    <Row icon="📮" label="Postal code" device={a.postcode} ip={ipLoc?.postalCode} />
                    <Row icon="↕️" label="Latitude" device={<span className="font-mono">{pos[0].toFixed(6)}</span>} ip={ipLoc?.latitude != null && <span className="font-mono">{ipLoc.latitude.toFixed(4)}</span>} />
                    <Row icon="↔️" label="Longitude" device={<span className="font-mono">{pos[1].toFixed(6)}</span>} ip={ipLoc?.longitude != null && <span className="font-mono">{ipLoc.longitude.toFixed(4)}</span>} />
                  </tbody>
                </table>
                {gap != null && (
                  <p className="px-3 py-2 text-xs text-fg-subtle border-t border-line-subtle">
                    Your IP location is {formatMeters(gap)} from where your device says you are{gap > 25000 ? ': normal for IP addresses, which usually point to a provider’s hub.' : '.'}
                  </p>
                )}
              </div>
            );
          })()}

          <div className="flex flex-wrap gap-2 mt-4">
            <a href={`https://www.google.com/maps?q=${pos[0]},${pos[1]}`} target="_blank" rel="noopener" className="btn-ghost">Google Maps</a>
            <a href={`https://www.openstreetmap.org/?mlat=${pos[0]}&mlon=${pos[1]}#map=15/${pos[0]}/${pos[1]}`} target="_blank" rel="noopener" className="btn-ghost">OpenStreetMap</a>
          </div>

          <div className="h-[380px] rounded-2xl overflow-hidden ring-1 ring-line mt-4">
            <MapView pos={pos} />
          </div>
        </>
      )}

      {!pos && ipLoc && (
        <div className="mt-2 rounded-xl border border-line bg-tint/5 p-4">
          <p className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">Where am I? Approximate answer from your IP address</p>
          <p className="text-xl font-bold text-fg mt-1">{[ipLoc.city, ipLoc.region, countryName(ipLoc.country)].filter(Boolean).join(', ')}</p>
          <p className="text-sm text-fg-muted mt-1">
            {ipLoc.postalCode && <>Postal code {ipLoc.postalCode} · </>}
            {ipLoc.latitude != null && <>around {ipLoc.latitude.toFixed(2)}, {ipLoc.longitude.toFixed(2)} · </>}
            IP <span className="font-mono">{ipLoc.ip}</span>
          </p>
          <p className="text-xs text-fg-subtle mt-2">IP location is often a nearby city or your provider’s hub, not your street. Press “Find my location” for your exact position.</p>
        </div>
      )}
      {!pos && !ipLoc && status.type === 'idle' && (
        <p className="text-sm text-fg-subtle mt-2">Click the button above to start.</p>
      )}
    </section>
  );
}
