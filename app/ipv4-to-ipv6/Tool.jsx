'use client';

import { useEffect, useState } from 'react';
import { Card, QueryForm, Status, ResultTable, CopyButton, Examples } from '../components/toolUi.jsx';
import { isIPv4, isIPv6, expandIPv6, myIp } from '../components/net.js';

const hex4 = (a, b) => ((a << 8) | b).toString(16).padStart(4, '0');

// Every standard IPv6 form of an IPv4 address.
export function forms(ip) {
  const o = ip.split('.').map(Number);
  const h1 = hex4(o[0], o[1]);
  const h2 = hex4(o[2], o[3]);
  const short = (h) => h.replace(/^0+(?=.)/, '');
  return [
    ['IPv4-mapped (dotted)', `::ffff:${ip}`, 'How dual-stack software shows an IPv4 connection on an IPv6 socket'],
    ['IPv4-mapped (hex)', `::ffff:${short(h1)}:${short(h2)}`, 'The same address written fully in hex'],
    ['IPv4-mapped (expanded)', `0000:0000:0000:0000:0000:ffff:${h1}:${h2}`, 'All eight groups written out'],
    ['NAT64 (64:ff9b::/96)', `64:ff9b::${short(h1)}:${short(h2)}`, 'Used by IPv6-only networks to reach IPv4 sites (RFC 6052)'],
    ['6to4 prefix', `2002:${h1}:${h2}::/48`, 'Old automatic tunnelling (RFC 3056), now deprecated'],
    ['IPv4-compatible', `::${ip}`, 'Obsolete form (RFC 4291); shown for reference only'],
  ];
}

// The IPv4 address inside a mapped, NAT64, compatible or 6to4 IPv6 address.
function back(ip6) {
  const g = expandIPv6(ip6);
  const v4 = (a, b) => [parseInt(a.slice(0, 2), 16), parseInt(a.slice(2), 16), parseInt(b.slice(0, 2), 16), parseInt(b.slice(2), 16)].join('.');
  const zeros = (n) => g.slice(0, n).every((x) => x === '0000');
  if (zeros(5) && g[5] === 'ffff') return ['IPv4-mapped', v4(g[6], g[7])];
  if (g[0] === '0064' && g[1] === 'ff9b' && g.slice(2, 6).every((x) => x === '0000')) return ['NAT64', v4(g[6], g[7])];
  if (g[0] === '2002') return ['6to4', v4(g[1], g[2])];
  if (zeros(6) && (g[6] !== '0000' || g[7] !== '0001')) return ['IPv4-compatible', v4(g[6], g[7])];
  return null;
}

export default function Tool() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState(null);
  const [out, setOut] = useState(null);

  const convert = (input) => {
    const s = input.trim();
    setQ(s);
    if (isIPv4(s)) { setOut({ kind: 'v4', ip: s, rows: forms(s) }); setStatus(null); return; }
    if (isIPv6(s)) {
      const b = back(s);
      if (b) { setOut({ kind: 'v6', ip: s, from: b[0], v4: b[1] }); setStatus(null); return; }
      setOut(null);
      setStatus({ type: 'err', msg: 'That is a native IPv6 address: it does not contain an IPv4 address, so there is nothing to convert back.' });
      return;
    }
    setOut(null);
    setStatus({ type: 'err', msg: 'Enter an IPv4 address such as 192.0.2.1, or an IPv6 address such as ::ffff:c000:201 to convert back.' });
  };

  useEffect(() => { myIp().then((m) => (isIPv4(m.ip) ? convert(m.ip) : convert('192.0.2.1'))).catch(() => convert('192.0.2.1')); }, []);

  return (
    <Card title="Convert an IPv4 address to IPv6">
      <QueryForm value={q} onChange={setQ} onSubmit={convert} placeholder="192.0.2.1 or ::ffff:c000:201" label="IPv4 or IPv6 address" button="Convert" />
      <Examples items={['8.8.8.8', '192.168.1.1', '::ffff:c0a8:101', '2002:c000:201::']} onPick={convert} />
      <Status status={status} />
      {out?.kind === 'v4' && (
        <ResultTable
          head={['Form', 'IPv6 address', '', 'Used for']}
          mono={[1]}
          rows={out.rows.map(([k, v, d]) => [k, v, <CopyButton text={v} />, <span className="text-xs text-fg-subtle">{d}</span>])}
        />
      )}
      {out?.kind === 'v6' && (
        <div className="mt-4 rounded-xl p-4 border bg-accent/10 border-accent/40">
          <p className="text-sm text-fg-muted">{out.from} address</p>
          <p className="font-mono text-2xl font-bold text-fg mt-1">{out.v4}</p>
        </div>
      )}
    </Card>
  );
}
