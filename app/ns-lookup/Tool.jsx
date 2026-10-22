'use client';

import { useState } from 'react';
import { Card, QueryForm, Status, ResultTable, Examples, Rows } from '../components/toolUi.jsx';
import { dns, toDomain } from '../components/net.js';

// DNS host from the name server names.
const HOSTS = [
  [/\.ns\.cloudflare\.com$/, 'Cloudflare'],
  [/awsdns-/, 'Amazon Route 53'],
  [/domaincontrol\.com$/, 'GoDaddy'],
  [/googledomains\.com$|ns-cloud-[a-z0-9]+\.googledomains\.com$/, 'Google Cloud DNS'],
  [/azure-dns\./, 'Microsoft Azure DNS'],
  [/registrar-servers\.com$/, 'Namecheap'],
  [/nsone\.net$/, 'NS1'],
  [/dnsimple\.com$/, 'DNSimple'],
  [/digitalocean\.com$/, 'DigitalOcean'],
  [/vercel-dns\.com$/, 'Vercel'],
  [/netlify\.com$/, 'Netlify'],
  [/hostinger\.com$/, 'Hostinger'],
  [/bluehost\.com$/, 'Bluehost'],
  [/dnsmadeeasy\.com$/, 'DNS Made Easy'],
  [/ultradns\./, 'UltraDNS'],
  [/akam\.net$/, 'Akamai'],
  [/wixdns\.net$/, 'Wix'],
  [/squarespacedns\.com$/, 'Squarespace'],
  [/hetzner\.(com|de)$/, 'Hetzner'],
  [/ovh\.net$/, 'OVHcloud'],
];
const host = (names) => {
  for (const [re, name] of HOSTS) if (names.some((h) => re.test(h))) return name;
  return null;
};

export default function Tool() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState(null);
  const [res, setRes] = useState(null);

  const run = async (input) => {
    setQ(input);
    const d = toDomain(input);
    if (!d) { setRes(null); setStatus({ type: 'err', msg: 'Enter a domain such as example.com.' }); return; }
    setStatus({ type: 'loading', msg: `Finding the name servers for ${d}…` });
    setRes(null);
    try {
      const [ns, soa] = await Promise.all([dns(d, 'NS'), dns(d, 'SOA')]);
      if (ns.status === 3) throw new Error(`${d} does not exist in DNS.`);
      const names = ns.answers.filter((a) => a.type === 'NS').map((a) => a.data.replace(/\.$/, '')).sort();
      if (!names.length) {
        const parent = soa.answers.find((a) => a.type === 'SOA')?.name?.replace(/\.$/, '');
        throw new Error(parent && parent !== d ? `${d} has no NS records of its own: it is part of the ${parent} zone. Look up ${parent} instead.` : `${d} has no NS records.`);
      }
      const servers = await Promise.all(names.map(async (n) => {
        const [a4, a6] = await Promise.all([dns(n, 'A').catch(() => null), dns(n, 'AAAA').catch(() => null)]);
        return { n, v4: a4?.answers.filter((x) => x.type === 'A').map((x) => x.data) || [], v6: a6?.answers.filter((x) => x.type === 'AAAA').map((x) => x.data) || [] };
      }));
      const s = soa.answers.find((a) => a.type === 'SOA')?.data.split(/\s+/) || [];
      setRes({ d, servers, soa: s });
      setStatus(null);
    } catch (err) {
      setStatus({ type: 'err', msg: err.message });
    }
  };

  return (
    <Card title="Find a domain’s name servers">
      <QueryForm value={q} onChange={setQ} onSubmit={run} placeholder="example.com" label="Domain name" busy={status?.type === 'loading'} button="Look up" />
      <Examples items={['getmylocations.com', 'amazon.com', 'wikipedia.org']} onPick={run} />
      <Status status={status} />
      {res && (
        <>
          <Rows rows={[
            ['DNS hosted by', host(res.servers.map((x) => x.n)) || 'Own or unrecognised DNS host'],
            ['Name servers', res.servers.length],
            ['Primary server (SOA)', res.soa[0] && <span className="font-mono">{res.soa[0].replace(/\.$/, '')}</span>],
            ['Zone serial', res.soa[2] && <span className="font-mono">{res.soa[2]}</span>],
            ['Admin contact (SOA)', res.soa[1] && <span className="font-mono">{res.soa[1].replace(/\.$/, '').replace('.', '@')}</span>],
          ]} />
          <ResultTable head={['Name server', 'IPv4', 'IPv6']} mono={[0, 1, 2]} rows={res.servers.map((x) => [x.n, x.v4.join(', ') || '—', x.v6.join(', ') || '—'])} />
          {res.servers.length < 2 && <p className="text-xs text-amber-600 mt-2">Only one name server: if it goes down, the whole domain stops resolving. Two or more are recommended.</p>}
        </>
      )}
    </Card>
  );
}
