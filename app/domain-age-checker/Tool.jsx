'use client';

import { useState } from 'react';
import { Card, QueryForm, Status, Rows, Examples } from '../components/toolUi.jsx';
import { rdap, toDomain, allEntities, entityName, rdapEvent, fmtDate } from '../components/net.js';

// Age as "12 years, 3 months, 4 days".
export function age(from, to = new Date()) {
  const a = new Date(from);
  if (Number.isNaN(a.getTime())) return '';
  let y = to.getUTCFullYear() - a.getUTCFullYear();
  let m = to.getUTCMonth() - a.getUTCMonth();
  let d = to.getUTCDate() - a.getUTCDate();
  if (d < 0) { m -= 1; d += new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), 0)).getUTCDate(); }
  if (m < 0) { y -= 1; m += 12; }
  const part = (n, w) => (n ? `${n} ${w}${n === 1 ? '' : 's'}` : '');
  return [part(y, 'year'), part(m, 'month'), part(d, 'day')].filter(Boolean).join(', ') || 'less than a day';
}

// RDAP is keyed by the registered domain, so strip subdomains for common TLDs.
const TWO_PART = /\.(co|com|net|org|gov|ac|edu)\.[a-z]{2}$/;
const registered = (d) => d.split('.').slice(TWO_PART.test(d) ? -3 : -2).join('.');

export default function Tool() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState(null);
  const [res, setRes] = useState(null);

  const run = async (input) => {
    setQ(input);
    const host = toDomain(input);
    if (!host) { setRes(null); setStatus({ type: 'err', msg: 'Enter a domain such as example.com.' }); return; }
    const d = registered(host);
    setStatus({ type: 'loading', msg: `Asking the registry about ${d}…` });
    setRes(null);
    try {
      const obj = await rdap('domain', d);
      const reg = rdapEvent(obj, 'registration');
      const registrar = allEntities(obj).find((e) => e.roles?.includes('registrar'));
      setRes({
        d,
        reg,
        exp: rdapEvent(obj, 'expiration'),
        changed: rdapEvent(obj, 'last changed'),
        registrar: registrar ? entityName(registrar) : '',
        status: (obj.status || []).join(', '),
        ns: (obj.nameservers || []).map((n) => n.ldhName?.toLowerCase()).filter(Boolean),
      });
      setStatus(null);
    } catch (err) {
      setStatus({ type: 'err', msg: /HTTP 404|No registration/.test(err.message)
        ? `No registry record for ${d}. It may be unregistered, or its registry (some country-code domains) does not publish RDAP data.`
        : err.message });
    }
  };

  return (
    <Card title="Check how old a domain is">
      <QueryForm value={q} onChange={setQ} onSubmit={run} placeholder="example.com" label="Domain name" busy={status?.type === 'loading'} button="Check age" />
      <Examples items={['google.com', 'wikipedia.org', 'getmylocations.com']} onPick={run} />
      <Status status={status} />
      {res && (
        <>
          <div className="mt-4 rounded-xl p-4 border bg-accent/10 border-accent/40">
            <p className="text-sm text-fg-muted font-mono">{res.d}</p>
            <p className="text-2xl font-bold text-fg mt-1">{res.reg ? age(res.reg) : 'Registration date not published'}</p>
            {res.reg && <p className="text-sm text-fg-muted mt-1">Registered on {fmtDate(res.reg)}</p>}
          </div>
          <Rows rows={[
            ['Created', fmtDate(res.reg)],
            ['Expires', res.exp && `${fmtDate(res.exp)}${new Date(res.exp) > new Date() ? ` (in ${age(new Date(), new Date(res.exp))})` : ' (expired)'}`],
            ['Last updated', fmtDate(res.changed)],
            ['Registrar', res.registrar],
            ['Status', res.status],
            ['Name servers', res.ns.length > 0 && <span className="font-mono text-xs">{res.ns.join(', ')}</span>],
          ]} />
        </>
      )}
    </Card>
  );
}
