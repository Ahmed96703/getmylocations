'use client';

import { useState } from 'react';
import { Card, QueryForm, Status, ResultTable, Examples, Rows } from '../components/toolUi.jsx';
import { dns, toDomain } from '../components/net.js';

// Mail provider from the MX host names.
const PROVIDERS = [
  [/(^|\.)google\.com$|googlemail\.com$/, 'Google Workspace / Gmail'],
  [/mail\.protection\.outlook\.com$|outlook\.com$/, 'Microsoft 365 / Outlook'],
  [/zoho\.(com|eu|in)$/, 'Zoho Mail'],
  [/protonmail\.ch$|proton\.me$/, 'Proton Mail'],
  [/yahoodns\.net$/, 'Yahoo Mail'],
  [/icloud\.com$/, 'iCloud Mail'],
  [/messagingengine\.com$/, 'Fastmail'],
  [/secureserver\.net$/, 'GoDaddy Email'],
  [/mimecast\.com$/, 'Mimecast'],
  [/pphosted\.com$|ppe-hosted\.com$/, 'Proofpoint'],
  [/barracudanetworks\.com$/, 'Barracuda'],
  [/mx\.cloudflare\.net$/, 'Cloudflare Email Routing'],
  [/improvmx\.com$/, 'ImprovMX'],
  [/titan\.email$/, 'Titan Mail'],
  [/hostinger\.com$/, 'Hostinger Email'],
  [/yandex\.(net|ru)$/, 'Yandex Mail'],
];
export const provider = (hosts) => {
  for (const [re, name] of PROVIDERS) if (hosts.some((h) => re.test(h))) return name;
  return null;
};

export default function Tool() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState(null);
  const [res, setRes] = useState(null);

  const run = async (input) => {
    setQ(input);
    const d = toDomain(input);
    if (!d) { setRes(null); setStatus({ type: 'err', msg: 'Enter a domain such as example.com, or an email address.' }); return; }
    setStatus({ type: 'loading', msg: `Finding the mail servers for ${d}…` });
    setRes(null);
    try {
      const r = await dns(d, 'MX');
      if (r.status === 3) throw new Error(`${d} does not exist in DNS.`);
      const mx = r.answers.filter((a) => a.type === 'MX').map((a) => {
        const [pri, host] = a.data.split(/\s+/);
        return { pri: Number(pri), host: host.replace(/\.$/, ''), ttl: a.ttl };
      }).sort((a, b) => a.pri - b.pri);
      const withIps = await Promise.all(mx.map(async (m) => {
        if (m.host === '' || m.host === '.') return { ...m, ips: [] };
        const [a4, a6] = await Promise.all([dns(m.host, 'A').catch(() => null), dns(m.host, 'AAAA').catch(() => null)]);
        return { ...m, ips: [...(a4?.answers.filter((x) => x.type === 'A') || []), ...(a6?.answers.filter((x) => x.type === 'AAAA') || [])].map((x) => x.data) };
      }));
      setRes({ d, mx: withIps });
      setStatus(null);
    } catch (err) {
      setStatus({ type: 'err', msg: err.message });
    }
  };

  const nullMx = res?.mx.length === 1 && (res.mx[0].host === '' || res.mx[0].host === '.');

  return (
    <Card title="Find a domain’s mail servers">
      <QueryForm value={q} onChange={setQ} onSubmit={run} placeholder="example.com or name@example.com" label="Domain or email address" busy={status?.type === 'loading'} button="Look up" />
      <Examples items={['gmail.com', 'outlook.com', 'proton.me']} onPick={run} />
      <Status status={status} />
      {res && (
        res.mx.length === 0 ? (
          <div className="mt-4 rounded-xl p-4 border bg-amber-500/10 border-amber-400/40 text-sm">
            <p className="font-semibold text-fg">{res.d} has no MX records.</p>
            <p className="text-fg-muted mt-1">Senders will try the domain’s own A record as a fallback, which usually means mail to this domain is not set up.</p>
          </div>
        ) : nullMx ? (
          <div className="mt-4 rounded-xl p-4 border bg-amber-500/10 border-amber-400/40 text-sm">
            <p className="font-semibold text-fg">{res.d} does not accept email (null MX).</p>
            <p className="text-fg-muted mt-1">Its MX record is a single “.”, the standard way to say the domain never receives mail (RFC 7505).</p>
          </div>
        ) : (
          <>
            <Rows rows={[
              ['Mail provider', provider(res.mx.map((m) => m.host)) || 'Own or unrecognised mail server'],
              ['Mail servers', res.mx.length],
            ]} />
            <ResultTable
              head={['Priority', 'Mail server', 'IP addresses']}
              mono={[1, 2]}
              rows={res.mx.map((m) => [m.pri, m.host, m.ips.join(', ') || '—'])}
            />
            <p className="text-xs text-fg-subtle mt-2">Lower numbers are tried first; servers with the same number share the load.</p>
          </>
        )
      )}
    </Card>
  );
}
