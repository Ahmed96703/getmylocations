'use client';

import { useState } from 'react';
import { Card, QueryForm, Status, Rows, Examples } from '../components/toolUi.jsx';

// The IEEE MA-L (OUI) register, split by the first three hex digits into
// /data/oui/<XXX>.json files of { "<last three hex digits>": "Organization" },
// so a lookup downloads one small file.
const cache = {};
async function vendor(hex6) {
  const file = hex6.slice(0, 3);
  if (!(file in cache)) {
    const r = await fetch(`/data/oui/${file}.json`);
    cache[file] = r.ok ? await r.json() : {};
  }
  return cache[file][hex6.slice(3)] || null;
}

export function parseMac(input) {
  const hex = String(input).toUpperCase().replace(/[^0-9A-F]/g, '');
  return hex.length >= 6 && hex.length <= 12 && hex.length % 2 === 0 ? hex : null;
}

export default function Tool() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState(null);
  const [res, setRes] = useState(null);

  const run = async (input) => {
    setQ(input);
    const hex = parseMac(input);
    if (!hex) { setRes(null); setStatus({ type: 'err', msg: 'Enter a MAC address such as 3C:22:FB:12:34:56, or at least its first six digits.' }); return; }
    setStatus({ type: 'loading', msg: 'Looking up the manufacturer…' });
    const first = parseInt(hex.slice(0, 2), 16);
    const local = (first & 2) === 2;
    const multicast = (first & 1) === 1;
    try {
      const name = await vendor(hex.slice(0, 6));
      const pretty = hex.match(/.{2}/g).join(':');
      setRes({ hex, pretty, name, local, multicast });
      setStatus(null);
    } catch {
      setStatus({ type: 'err', msg: 'The manufacturer list could not be loaded. Check your connection and try again.' });
    }
  };

  return (
    <Card title="Find the maker of a MAC address">
      <QueryForm value={q} onChange={setQ} onSubmit={run} placeholder="3C:22:FB:12:34:56" label="MAC address" busy={status?.type === 'loading'} button="Look up" />
      <Examples items={['3C:22:FB:00:00:00', 'F4:F5:D8:00:00:00', '00-1A-11-00-00-00', 'DA:A1:19:00:00:00']} onPick={run} />
      <Status status={status} />
      {res && (
        <>
          <div className={`mt-4 rounded-xl p-4 border ${res.name ? 'bg-accent/10 border-accent/40' : 'bg-amber-500/10 border-amber-400/40'}`}>
            <p className="text-sm text-fg-muted font-mono">{res.pretty}</p>
            <p className="text-xl font-bold text-fg mt-1">
              {res.name || (res.local ? 'Private (randomized) address: no manufacturer' : 'Manufacturer not found in the IEEE register')}
            </p>
          </div>
          <Rows rows={[
            ['OUI (prefix)', <span className="font-mono">{res.pretty.slice(0, 8)}</span>],
            ['Address type', res.multicast ? 'Multicast (group) address' : 'Unicast (one device)'],
            ['Administered', res.local ? 'Locally (randomized or set by software)' : 'Universally (assigned by the maker)'],
            ['Formats', <span className="font-mono text-xs">{res.pretty} · {res.pretty.replace(/:/g, '-')} · {res.hex.toLowerCase().match(/.{4}/g)?.join('.')}</span>],
          ]} />
        </>
      )}
    </Card>
  );
}
