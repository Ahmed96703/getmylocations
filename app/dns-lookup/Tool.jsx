'use client';

import { useState } from 'react';
import { Card, QueryForm, Status, ResultTable, Examples, Badge } from '../components/toolUi.jsx';
import { dns, toDomain, isIPv4, isIPv6, expandIPv6 } from '../components/net.js';

const TYPES = ['ALL', 'A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT', 'SOA', 'CAA', 'SRV', 'PTR'];
const ALL = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT', 'SOA', 'CAA'];

// 1.2.3.4 → 4.3.2.1.in-addr.arpa; IPv6 → nibbles.ip6.arpa
export function reverseName(ip) {
  if (isIPv4(ip)) return `${ip.split('.').reverse().join('.')}.in-addr.arpa`;
  return `${expandIPv6(ip).join('').split('').reverse().join('.')}.ip6.arpa`;
}

const fmtTtl = (s) => (s >= 86400 ? `${Math.round(s / 3600)} h` : s >= 3600 ? `${(s / 3600).toFixed(1).replace(/\.0$/, '')} h` : s >= 60 ? `${Math.round(s / 60)} min` : `${s} s`);

// A record type's answers, or an empty list.
async function ask(name, type, resolver) {
  const r = await dns(name, type, resolver);
  return { status: r.status, statusText: r.statusText, answers: r.answers.filter((a) => a.type === type || (type === 'A' && a.type === 'CNAME') || (type === 'AAAA' && a.type === 'CNAME')) };
}

export default function Tool({ initialType = 'ALL', fixedType = null, title = 'Look up DNS records' }) {
  const [q, setQ] = useState('');
  const [type, setType] = useState(fixedType || initialType);
  const [compare, setCompare] = useState(false);
  const [status, setStatus] = useState(null);
  const [res, setRes] = useState(null);

  const run = async (input, t = type) => {
    setQ(input);
    const raw = input.trim();
    const ip = isIPv4(raw) || isIPv6(raw);
    const kind = ip ? 'PTR' : t;
    const name = ip ? reverseName(raw) : toDomain(raw);
    if (!name) { setRes(null); setStatus({ type: 'err', msg: 'Enter a domain name such as example.com (or an IP address for a reverse lookup).' }); return; }
    if (kind === 'PTR' && !ip) { setRes(null); setStatus({ type: 'err', msg: 'A PTR (reverse) lookup needs an IP address, such as 8.8.8.8.' }); return; }
    setStatus({ type: 'loading', msg: `Looking up ${name}…` });
    setRes(null);
    try {
      const types = kind === 'ALL' ? ALL : [kind];
      const rows = [];
      let nx = false;
      for (const ty of types) {
        const [cf, gg] = await Promise.all([ask(name, ty, 'cloudflare'), compare ? ask(name, ty, 'google').catch(() => null) : null]);
        if (cf.status === 3) nx = true;
        rows.push({ type: ty, cf, gg });
      }
      setRes({ name, rows, nx, kind });
      setStatus(null);
    } catch (err) {
      setStatus({ type: 'err', msg: err.message });
    }
  };

  const same = (a, b) => JSON.stringify(a.answers.map((x) => x.data).sort()) === JSON.stringify(b.answers.map((x) => x.data).sort());

  return (
    <Card title={title}>
      <QueryForm
        value={q}
        onChange={setQ}
        onSubmit={(v) => run(v)}
        placeholder={fixedType === 'PTR' ? '8.8.8.8' : 'example.com'}
        label="Domain name"
        busy={status?.type === 'loading'}
        button="Look up"
        extra={!fixedType && (
          <select className="field w-auto font-mono" value={type} onChange={(e) => setType(e.target.value)} aria-label="Record type">
            {TYPES.map((t) => <option key={t} value={t}>{t === 'ALL' ? 'All common' : t}</option>)}
          </select>
        )}
      />
      <div className="flex flex-wrap items-center gap-4 mt-3">
        <Examples items={['google.com', 'github.com', '8.8.8.8']} onPick={(v) => run(v)} />
        <label className="text-xs text-fg-muted flex items-center gap-1.5 mt-3">
          <input type="checkbox" checked={compare} onChange={(e) => setCompare(e.target.checked)} />
          Compare Cloudflare and Google DNS (propagation check)
        </label>
      </div>
      <Status status={status} />
      {res && (
        <>
          {res.nx && <p className="mt-4 text-sm"><Badge ok={false}>NXDOMAIN</Badge> <span className="text-fg-muted">The domain does not exist in DNS.</span></p>}
          <ResultTable
            head={compare ? ['Type', 'Value', 'TTL', 'Google DNS'] : ['Type', 'Value', 'TTL']}
            mono={[1]}
            rows={res.rows.flatMap(({ type: ty, cf, gg }) => {
              const match = gg && <Badge ok={same(cf, gg)}>{same(cf, gg) ? 'Same' : 'Different'}</Badge>;
              if (!cf.answers.length) return [[ty, <span className="text-fg-subtle font-sans">No {ty} record</span>, '', ...(compare ? [match] : [])]];
              return cf.answers.map((a, i) => [
                a.type === ty ? ty : `${a.type} (for ${ty})`,
                a.data,
                fmtTtl(a.ttl),
                ...(compare ? [i === 0 ? match : ''] : []),
              ]);
            })}
          />
          {compare && <p className="text-xs text-fg-subtle mt-2">“Different” right after a change usually means one resolver still has the old answer cached; it clears when the TTL runs out.</p>}
        </>
      )}
    </Card>
  );
}
