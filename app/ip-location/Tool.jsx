'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const MapMarker = dynamic(() => import('./MapMarker.jsx'), { ssr: false });

export default function Tool() {
  const [ip, setIp] = useState('');
  const [data, setData] = useState(null);
  const [status, setStatus] = useState({ type: 'idle', msg: '' });

  const lookup = (target = '') => {
    setStatus({ type: 'loading', msg: target ? `Looking up ${target}…` : 'Looking up your IP…' });
    const url = target ? `https://ipapi.co/${encodeURIComponent(target)}/json/` : 'https://ipapi.co/json/';
    fetch(url, { headers: { Accept: 'application/json' } })
      .then((r) => r.json())
      .then((d) => {
        if (d.error) { setStatus({ type: 'err', msg: d.reason || 'Lookup error.' }); return; }
        setData(d);
        setStatus({ type: 'ok', msg: `✓ Lookup complete for ${d.ip}` });
      })
      .catch((e) => setStatus({ type: 'err', msg: `Could not look up: ${e.message}` }));
  };

  return (
    <section className="glass rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">Lookup an IP address</h2>
        <button onClick={() => lookup('')} className="btn-primary">Lookup my IP</button>
      </div>

      <div className="flex flex-wrap gap-2">
        <input value={ip} onChange={(e) => setIp(e.target.value)} placeholder="e.g. 8.8.8.8 or 2001:4860:4860::8888" className="field flex-1 min-w-[200px]" onKeyDown={(e) => e.key === 'Enter' && lookup(ip.trim())} />
        <button onClick={() => ip.trim() && lookup(ip.trim())} className="btn-primary">Lookup →</button>
      </div>

      {status.type === 'loading' && (
        <div className="bg-electric-500/10 border border-electric-400/30 text-electric-200 rounded-lg p-3 text-sm mt-3 flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border-2 border-electric-300 border-t-transparent animate-spin" />
          {status.msg}
        </div>
      )}
      {status.type === 'err' && <div className="bg-rose-500/10 border border-rose-400/30 text-rose-200 rounded-lg p-3 text-sm mt-3">{status.msg}</div>}
      {status.type === 'ok' && <div className="bg-emerald-500/10 border border-emerald-400/30 text-emerald-200 rounded-lg p-3 text-sm mt-3">{status.msg}</div>}

      {data && (
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
              ['Currency', `${data.currency_name || ''}${data.currency ? ` (${data.currency})` : ''}` || '—'],
              ['Coordinates', data.latitude != null && data.longitude != null ? `${data.latitude.toFixed(4)}, ${data.longitude.toFixed(4)}` : '—'],
            ].map(([k, v]) => (
              <div key={k} className="bg-white/5 border border-white/10 rounded-lg p-3">
                <dt className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{k}</dt>
                <dd className="font-mono mt-1 text-xs break-all">{v}</dd>
              </div>
            ))}
          </dl>

          {data.latitude != null && data.longitude != null && (
            <div className="h-[360px] rounded-2xl overflow-hidden ring-1 ring-white/10 mt-4">
              <MapMarker lat={data.latitude} lon={data.longitude} label={`${data.ip || ''} · ${data.city || ''}, ${data.country_name || ''}`} />
            </div>
          )}
        </>
      )}
    </section>
  );
}
