'use client';

import { useEffect, useState } from 'react';
import { Card, QueryForm, Status, Rows, ResultTable, Examples } from '../components/toolUi.jsx';
import { dns, txt, rdap, isIPv4, isIPv6, expandIPv6, myIp, allEntities, entityName, entityField, rdapEvent, fmtDate } from '../components/net.js';

// Team Cymru's IP-to-ASN service answers over DNS:
//   <reversed IP>.origin.asn.cymru.com  TXT  "ASN | prefix | CC | registry | date"
//   AS<n>.asn.cymru.com                 TXT  "ASN | CC | registry | date | name"
function cymruName(ip) {
  if (isIPv4(ip)) return `${ip.split('.').reverse().join('.')}.origin.asn.cymru.com`;
  return `${expandIPv6(ip).join('').split('').reverse().join('.')}.origin6.asn.cymru.com`;
}

const split = (s) => txt(s).split('|').map((x) => x.trim());

export default function Tool() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState(null);
  const [res, setRes] = useState(null);

  const lookup = async (input) => {
    const raw = input.trim();
    setStatus({ type: 'loading', msg: 'Looking up…' });
    setRes(null);
    try {
      let asn;
      let route = null;
      if (isIPv4(raw) || isIPv6(raw)) {
        const o = await dns(cymruName(raw), 'TXT');
        if (!o.answers.length) throw new Error('That address is not announced on the internet (it may be private or unused).');
        const [n, prefix, cc] = split(o.answers[0].data);
        asn = n.split(' ')[0];
        route = { ip: raw, prefix, cc };
      } else {
        const m = /^(?:as)?\s*(\d{1,10})$/i.exec(raw);
        if (!m) throw new Error('Enter an AS number such as AS15169 or 15169, or an IP address.');
        asn = m[1];
      }
      setQ(route ? raw : `AS${asn}`);
      const [name, reg, prefixes] = await Promise.all([
        dns(`AS${asn}.asn.cymru.com`, 'TXT').then((r) => (r.answers[0] ? split(r.answers[0].data) : null)).catch(() => null),
        rdap('autnum', asn).catch(() => null),
        fetch(`https://stat.ripe.net/data/announced-prefixes/data.json?resource=AS${asn}`).then((r) => r.json()).then((j) => j.data?.prefixes?.map((p) => p.prefix) || []).catch(() => null),
      ]);
      if (!name && !reg) throw new Error(`No record was found for AS${asn}.`);
      setRes({ asn, route, name, reg, prefixes });
      setStatus(null);
    } catch (err) {
      setStatus({ type: 'err', msg: err.message });
    }
  };

  useEffect(() => { myIp().then((m) => m.ip && lookup(m.ip)).catch(() => {}); }, []);

  const v4 = res?.prefixes?.filter((p) => !p.includes(':')) || [];
  const v6 = res?.prefixes?.filter((p) => p.includes(':')) || [];
  const ents = res?.reg ? allEntities(res.reg) : [];
  const abuse = ents.find((e) => e.roles?.includes('abuse'));

  return (
    <Card title="Look up an ASN">
      <QueryForm value={q} onChange={setQ} onSubmit={lookup} placeholder="AS15169, 13335 or an IP address" label="AS number or IP address" busy={status?.type === 'loading'} button="Look up" />
      <Examples items={['AS15169', 'AS13335', 'AS32934', '9.9.9.9']} onPick={lookup} />
      <Status status={status} />
      {res && (
        <>
          <Rows rows={[
            ['AS number', <span className="font-mono">AS{res.asn}</span>],
            ['Name', res.name?.[4] || res.reg?.name],
            ['Country', res.name?.[1] || res.reg?.country],
            ['Registry', res.name?.[2]?.toUpperCase()],
            ['Allocated', res.name?.[3] ? fmtDate(res.name[3]) : fmtDate(rdapEvent(res.reg, 'registration'))],
            ['Last changed', fmtDate(rdapEvent(res.reg, 'last changed'))],
            ['Your IP is in', res.route && <span className="font-mono">{res.route.prefix}</span>],
            ['Abuse contact', abuse && (entityField(abuse, 'email') || entityName(abuse))],
            ['Announced blocks', res.prefixes && `${v4.length.toLocaleString()} IPv4, ${v6.length.toLocaleString()} IPv6 (last two weeks)`],
          ]} />
          {res.prefixes?.length > 0 && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-semibold">Announced IP blocks ({res.prefixes.length.toLocaleString()})</summary>
              <ResultTable head={['Prefix', 'Type']} mono={[0]} rows={[...v4, ...v6].slice(0, 500).map((p) => [p, p.includes(':') ? 'IPv6' : 'IPv4'])} />
              {res.prefixes.length > 500 && <p className="text-xs text-fg-subtle mt-2">Showing the first 500.</p>}
            </details>
          )}
        </>
      )}
    </Card>
  );
}
