'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { classifyIp, asDomain, kmBetween } from './ip.js';

const MapMarker = dynamic(() => import('./MapMarker.jsx'), { ssr: false });

// Public lookups go to ipapi.co; domain names are resolved with Cloudflare's
// public DNS-over-HTTPS resolver. Both are listed in the privacy policy.
const LOOKUP = (ip) => (ip ? `https://ipapi.co/${encodeURIComponent(ip)}/json/` : 'https://ipapi.co/json/');
const DOH = (name, type) => `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=${type}`;

async function resolveDomain(name) {
  for (const type of ['A', 'AAAA']) {
    const r = await fetch(DOH(name, type), { headers: { accept: 'application/dns-json' } });
    if (!r.ok) throw new Error('DNS lookup failed');
    const j = await r.json();
    const rec = (j.Answer || []).find((a) => a.type === (type === 'A' ? 1 : 28));
    if (rec) return rec.data;
  }
  return null;
}

function friendlyError(d, status) {
  if (status === 429 || d?.reason === 'RateLimited') {
    return 'The free lookup service is limiting requests from your network right now. Wait a minute and try again.';
  }
  if (d?.reason === 'Reserved IP Address') return 'That address is reserved and has no public location.';
  if (d?.reason === 'Invalid IP Address') return 'The lookup service did not recognise that IP address.';
  return d?.reason || d?.message || 'The lookup service returned an error.';
}

export default function Tool() {
  const [input, setInput] = useState('');
  const [data, setData] = useState(null);
  const [isOwn, setIsOwn] = useState(false);
  const [note, setNote] = useState(null); // { type: 'info' | 'err' | 'loading' | 'ok', msg }
  const [offset, setOffset] = useState(null); // { km, accuracy } or { err }

  const lookup = async (raw = '') => {
    const text = raw.trim();
    setOffset(null);
    let ip = '';
    let viaDomain = null;

    if (text) {
      const cls = classifyIp(text);
      if (cls && !cls.public) {
        // Answer locally: private and reserved addresses are never sent anywhere.
        setData(null);
        setNote({ type: 'info', msg: `${cls.ip} is ${cls.label} (${cls.ref}). It is not reachable from the public internet, so it has no location to look up. Leave the box empty to look up your public IP instead.` });
        return;
      }
      if (cls) {
        ip = cls.ip;
      } else {
        const domain = asDomain(text);
        if (!domain) {
          setData(null);
          setNote({ type: 'err', msg: 'Enter an IPv4 address (8.8.8.8), an IPv6 address (2001:4860:4860::8888), or a domain name (example.com).' });
          return;
        }
        setNote({ type: 'loading', msg: `Resolving ${domain}…` });
        try {
          ip = await resolveDomain(domain);
        } catch {
          setNote({ type: 'err', msg: `Could not resolve ${domain}. Check the spelling and your connection.` });
          return;
        }
        if (!ip) {
          setData(null);
          setNote({ type: 'err', msg: `${domain} has no A or AAAA record, so it does not point to any IP address.` });
          return;
        }
        viaDomain = domain;
      }
    }

    setNote({ type: 'loading', msg: ip ? `Looking up ${ip}…` : 'Looking up your public IP…' });
    try {
      const r = await fetch(LOOKUP(ip), { headers: { Accept: 'application/json' } });
      const d = await r.json().catch(() => null);
      if (!r.ok || !d || d.error) {
        setNote({ type: 'err', msg: friendlyError(d, r.status) });
        return;
      }
      setData(d);
      setIsOwn(!ip);
      setNote({
        type: 'ok',
        msg: viaDomain ? `✓ ${viaDomain} resolves to ${d.ip}` : `✓ Lookup complete for ${d.ip}`,
      });
    } catch (e) {
      setNote({ type: 'err', msg: `Could not reach the lookup service: ${e.message}` });
    }
  };

  // Compare the IP database's guess with the browser's GPS reading. The GPS
  // coordinate stays in this tab; only the distance is shown.
  const measureOffset = () => {
    if (!('geolocation' in navigator) || data?.latitude == null) return;
    setOffset({ loading: true });
    navigator.geolocation.getCurrentPosition(
      (p) => setOffset({
        km: kmBetween(p.coords.latitude, p.coords.longitude, data.latitude, data.longitude),
        accuracy: p.coords.accuracy,
      }),
      (err) => setOffset({ err: err.code === 1 ? 'Location permission was denied, so there is nothing to compare with.' : 'Could not get a GPS reading. Try again near a window.' }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 },
    );
  };

  const currency = data?.currency
    ? `${data.currency_name ? `${data.currency_name} ` : ''}(${data.currency})`
    : '—';

  return (
    <section className="glass rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">Lookup an IP address</h2>
        <button onClick={() => { setInput(''); lookup(''); }} className="btn-primary">Lookup my IP</button>
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          aria-label="IP address or domain name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="8.8.8.8, 2001:4860:4860::8888 or example.com"
          className="field flex-1 min-w-[200px]"
          onKeyDown={(e) => e.key === 'Enter' && lookup(input)}
        />
        <button onClick={() => lookup(input)} className="btn-primary">Lookup →</button>
      </div>

      {note?.type === 'loading' && (
        <div role="status" className="bg-accent/10 border border-accent/40 text-accent rounded-lg p-3 text-sm mt-3 flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          {note.msg}
        </div>
      )}
      {note?.type === 'info' && <div role="status" className="bg-accent/10 border border-accent/40 text-fg rounded-lg p-3 text-sm mt-3">{note.msg}</div>}
      {note?.type === 'err' && <div role="alert" className="bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm mt-3">{note.msg}</div>}
      {note?.type === 'ok' && <div role="status" className="bg-emerald-500/10 border border-emerald-400/30 text-emerald-600 rounded-lg p-3 text-sm mt-3">{note.msg}</div>}

      {data && note?.type === 'ok' && (
        <>
          <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 text-sm">
            {[
              ['IP address', data.ip || '—'],
              ['Version', data.version || (data.ip?.includes(':') ? 'IPv6' : 'IPv4')],
              ['City', data.city || '—'],
              ['Region', data.region || '—'],
              ['Country', `${data.country_name || '—'}${data.country_code ? ` (${data.country_code})` : ''}`],
              ['Postal code', data.postal || '—'],
              ['ISP / Org', data.org || '—'],
              ['ASN', data.asn || '—'],
              ['Timezone', data.timezone || '—'],
              ['UTC offset', data.utc_offset || '—'],
              ['Currency', currency],
              ['Coordinates', data.latitude != null && data.longitude != null ? `${data.latitude.toFixed(4)}, ${data.longitude.toFixed(4)}` : '—'],
            ].map(([k, v]) => (
              <div key={k} className="bg-tint/5 border border-line rounded-lg p-3">
                <dt className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">{k}</dt>
                <dd className="font-mono mt-1 text-xs break-all">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="text-xs text-fg-subtle mt-2">
            Location data from ipapi.co. It is a database estimate for the network, not a measurement of the device.
          </p>

          {isOwn && data.latitude != null && (
            <div className="bg-tint/5 border border-line rounded-lg p-4 mt-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm">
                  <strong className="text-fg">How far off is your IP location?</strong>
                  <span className="text-fg-muted"> Compare it with your device&rsquo;s GPS. The GPS reading stays in this tab.</span>
                </div>
                <button onClick={measureOffset} className="btn-ghost">📍 Measure the gap</button>
              </div>
              {offset?.loading && <p className="text-sm text-fg-muted mt-2">Reading your GPS position…</p>}
              {offset?.err && <p role="alert" className="text-sm text-rose-500 mt-2">{offset.err}</p>}
              {offset?.km != null && (
                <p className="text-sm text-fg mt-2">
                  Your IP places you <strong>{offset.km < 1 ? `${Math.round(offset.km * 1000)} m` : `${offset.km.toFixed(offset.km < 10 ? 1 : 0)} km`}</strong> from where your device says you are
                  {offset.accuracy > 1000 ? ' (your device reading is itself only accurate to ' + Math.round(offset.accuracy / 1000) + ' km, so treat this as rough).' : ` (device accuracy ±${Math.round(offset.accuracy)} m).`}
                </p>
              )}
            </div>
          )}

          {data.latitude != null && data.longitude != null && (
            <div className="h-[360px] rounded-2xl overflow-hidden ring-1 ring-line mt-4">
              <MapMarker lat={data.latitude} lon={data.longitude} label={`${data.ip || ''} · ${data.city || ''}, ${data.country_name || ''}`} />
            </div>
          )}
        </>
      )}
    </section>
  );
}
