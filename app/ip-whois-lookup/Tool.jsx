'use client';

import { useEffect, useState } from 'react';
import { Card, QueryForm, Status, Rows, ResultTable, Examples } from '../components/toolUi.jsx';
import { rdap, isIPv4, isIPv6, myIp, allEntities, entityName, entityField, rdapEvent, fmtDate } from '../components/net.js';

// Which regional registry answered, from the RDAP server's address.
const RIRS = { arin: 'ARIN (North America)', ripe: 'RIPE NCC (Europe, Middle East, Central Asia)', apnic: 'APNIC (Asia-Pacific)', lacnic: 'LACNIC (Latin America, Caribbean)', afrinic: 'AFRINIC (Africa)' };
function registry(obj) {
  const self = obj.links?.find((l) => l.rel === 'self')?.href || obj.port43 || '';
  const key = Object.keys(RIRS).find((k) => self.includes(k));
  return key ? RIRS[key] : self.replace(/^https?:\/\//, '').split('/')[0];
}

export default function Tool() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState(null);
  const [res, setRes] = useState(null);
  const [raw, setRaw] = useState(false);

  const lookup = async (ip) => {
    if (!isIPv4(ip) && !isIPv6(ip)) { setStatus({ type: 'err', msg: 'Enter an IPv4 address such as 8.8.8.8, or an IPv6 address such as 2001:4860:4860::8888.' }); return; }
    setQ(ip);
    setStatus({ type: 'loading', msg: 'Asking the regional internet registry…' });
    setRes(null);
    try {
      const obj = await rdap('ip', ip);
      setRes({ ip, obj });
      setStatus(null);
    } catch (err) {
      setStatus({ type: 'err', msg: err.message });
    }
  };

  // Start with the visitor's own address.
  useEffect(() => { myIp().then((m) => m.ip && lookup(m.ip)).catch(() => {}); }, []);

  const obj = res?.obj;
  const ents = obj ? allEntities(obj) : [];
  const cidrs = obj?.cidr0_cidrs?.map((c) => `${c.v4prefix || c.v6prefix}/${c.length}`).join(', ');
  const abuse = ents.find((e) => e.roles?.includes('abuse'));

  return (
    <Card title="Look up an IP address">
      <QueryForm value={q} onChange={setQ} onSubmit={lookup} placeholder="8.8.8.8 or 2001:4860:4860::8888" label="IP address" busy={status?.type === 'loading'} button="Look up" />
      <Examples items={['8.8.8.8', '1.1.1.1', '2a03:2880:f10c:83:face:b00c:0:25de']} onPick={lookup} />
      <Status status={status} />
      {obj && (
        <>
          <Rows rows={[
            ['IP address', <span className="font-mono">{res.ip}</span>],
            ['Network name', obj.name],
            ['Address range', obj.startAddress && <span className="font-mono">{obj.startAddress} – {obj.endAddress}</span>],
            ['CIDR', cidrs && <span className="font-mono">{cidrs}</span>],
            ['Country', obj.country],
            ['Allocation type', obj.type],
            ['Registry', registry(obj)],
            ['Handle', obj.handle && <span className="font-mono">{obj.handle}</span>],
            ['Registered', fmtDate(rdapEvent(obj, 'registration'))],
            ['Last changed', fmtDate(rdapEvent(obj, 'last changed'))],
            ['Abuse contact', abuse && (entityField(abuse, 'email') || entityName(abuse))],
          ]} />
          {ents.length > 0 && (
            <ResultTable
              head={['Contact', 'Role', 'Email', 'Address']}
              rows={ents.map((e) => [entityName(e), (e.roles || []).join(', '), entityField(e, 'email'), entityField(e, 'adr')])}
            />
          )}
          <button type="button" className="btn-ghost text-xs mt-4" onClick={() => setRaw((r) => !r)}>{raw ? 'Hide' : 'Show'} raw RDAP data</button>
          {raw && <pre className="mt-3 max-h-96 overflow-auto text-xs bg-tint/5 border border-line rounded-lg p-3">{JSON.stringify(obj, null, 2)}</pre>}
        </>
      )}
    </Card>
  );
}
