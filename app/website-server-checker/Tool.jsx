'use client';

import { useState } from 'react';
import { Card, QueryForm, Status, Rows, ResultTable, Examples, Badge } from '../components/toolUi.jsx';
import { dns, fetchPage, toUrl } from '../components/net.js';

// Who hosts the site and where: the hostname's first A (or AAAA) record,
// then freeipapi.com (the same lookup IP Location uses) for the network
// owner and an estimated location. Behind a CDN this is the CDN's edge.
async function hosting(host) {
  let ip = null;
  for (const type of ['A', 'AAAA']) {
    const r = await dns(host, type).catch(() => null);
    ip = r?.answers.find((a) => a.type === type)?.data;
    if (ip) break;
  }
  if (!ip) return null;
  const d = await fetch(`https://freeipapi.com/api/json/${encodeURIComponent(ip)}`).then((r) => r.json()).catch(() => ({}));
  const place = [d.cityName, d.regionName, d.countryName].filter(Boolean).join(', ');
  return { ip, org: d.asnOrganization || null, asn: d.asn ? `AS${d.asn}` : null, place: place || null };
}

// What the response headers and HTML reveal about the stack.
export function detect(headers, body) {
  const h = (k) => headers[k] || '';
  const server = h('server');
  const found = [];
  const add = (cat, name) => { if (!found.some((f) => f[1] === name)) found.push([cat, name]); };

  if (h('cf-ray')) add('CDN / proxy', 'Cloudflare');
  if (h('x-vercel-id')) add('Hosting', 'Vercel');
  if (h('x-nf-request-id')) add('Hosting', 'Netlify');
  if (h('x-amz-cf-id')) add('CDN / proxy', 'Amazon CloudFront');
  if (/fastly/i.test(h('x-served-by')) || h('x-fastly-request-id')) add('CDN / proxy', 'Fastly');
  if (/akamai/i.test(server) || h('x-akamai-transformed')) add('CDN / proxy', 'Akamai');
  if (h('x-github-request-id')) add('Hosting', 'GitHub Pages');
  if (/varnish/i.test(h('via')) || h('x-varnish')) add('Cache', 'Varnish');
  if (h('x-shopify-stage') || /cdn\.shopify\.com/.test(body)) add('Platform', 'Shopify');
  if (h('x-wix-request-id') || /static\.wixstatic\.com/.test(body)) add('Platform', 'Wix');
  if (/squarespace/i.test(server) || /static1\.squarespace\.com/.test(body)) add('Platform', 'Squarespace');
  if (/wp-content|wp-includes/.test(body)) add('CMS', 'WordPress');
  if (/__NEXT_DATA__|\/_next\/static\//.test(body)) add('Framework', 'Next.js');
  if (/data-reactroot|react-dom/.test(body)) add('Framework', 'React');
  if (/ng-version=/.test(body)) add('Framework', 'Angular');
  if (/__NUXT__|\/_nuxt\//.test(body)) add('Framework', 'Nuxt');
  const gen = /<meta[^>]+name=["']generator["'][^>]+content=["']([^"']+)/i.exec(body)?.[1];
  if (gen) add('Generator', gen);
  const powered = h('x-powered-by');
  if (powered) add('Language / runtime', powered);
  if (h('x-aspnet-version') || h('x-aspnetmvc-version')) add('Language / runtime', 'ASP.NET');

  // Operating system hints: only what the server itself announces.
  let os = '';
  if (/microsoft-iis/i.test(server) || h('x-aspnet-version')) os = 'Windows Server (IIS)';
  const distro = /\((Ubuntu|Debian|CentOS|Red Hat|Fedora|Amazon Linux|AlmaLinux|Rocky|Unix|Win32|Win64|FreeBSD)[^)]*\)/i.exec(server)?.[1];
  if (distro) os = /win/i.test(distro) ? 'Windows' : distro === 'Unix' ? 'Unix-like (not specified)' : `Linux (${distro})`;
  return { server, os, found };
}

const SECURITY = [
  ['strict-transport-security', 'HSTS', 'Forces HTTPS on return visits'],
  ['content-security-policy', 'Content-Security-Policy', 'Limits which scripts and resources can load'],
  ['x-content-type-options', 'X-Content-Type-Options', 'Stops browsers guessing file types'],
  ['x-frame-options', 'X-Frame-Options', 'Stops other sites framing the page (clickjacking)'],
  ['referrer-policy', 'Referrer-Policy', 'Controls what address is sent to other sites'],
  ['permissions-policy', 'Permissions-Policy', 'Turns off features like camera or location the site does not use'],
];

export default function Tool() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState(null);
  const [res, setRes] = useState(null);
  const [host, setHost] = useState(null);

  const run = async (input) => {
    setQ(input);
    const url = toUrl(input);
    if (!url) { setRes(null); setStatus({ type: 'err', msg: 'Enter a website address such as example.com.' }); return; }
    setStatus({ type: 'loading', msg: `Contacting ${new URL(url).hostname}…` });
    setRes(null);
    setHost(null);
    try {
      const page = await fetchPage(url);
      setRes({ page, ...detect(page.headers, page.body || '') });
      setStatus(null);
      hosting(new URL(page.finalUrl || url).hostname).then((h) => setHost(h || { none: true })).catch(() => setHost({ none: true }));
    } catch (err) {
      setStatus({ type: 'err', msg: err.message });
    }
  };

  const p = res?.page;
  return (
    <Card title="Check a website’s server">
      <QueryForm value={q} onChange={setQ} onSubmit={run} placeholder="example.com" label="Website address" busy={status?.type === 'loading'} />
      <Examples items={['wikipedia.org', 'github.com', 'getmylocations.com']} onPick={run} />
      <Status status={status} />
      {res && (
        <>
          <Rows rows={[
            ['Server software', res.server || 'Not disclosed'],
            ['Operating system', res.os || 'Not disclosed by the server'],
            ['Status', `${p.status} ${p.statusText || ''}`],
            ['Response time', `${p.ms} ms`],
            ['Final address', p.finalUrl !== p.url && <span className="font-mono text-xs break-all">{p.finalUrl}</span>],
            ['Redirects', p.redirects.length > 0 && p.redirects.map((r) => `${r.status} ${r.url}`).join(' → ')],
          ]} />
          <h3 className="font-semibold mt-6">Hosting &amp; server location</h3>
          {!host ? <p className="text-sm text-fg-muted mt-2">Looking up the server’s IP and host…</p> : host.none ? <p className="text-sm text-fg-muted mt-2">The server’s IP address could not be resolved.</p> : (
            <Rows rows={[
              ['Server IP', <span className="font-mono">{host.ip}</span>],
              ['Hosted by', host.org && `${host.org}${host.asn ? ` (${host.asn})` : ''}`],
              ['Server location', host.place && `${host.place} (estimate)`],
            ]} />
          )}
          {res.found.length > 0 && <ResultTable head={['Detected', 'Technology']} rows={res.found} />}
          <h3 className="font-semibold mt-6">Security headers</h3>
          <ResultTable
            head={['Header', 'Status', 'Purpose']}
            rows={SECURITY.map(([k, name, why]) => [name, p.headers[k] ? <Badge ok>Present</Badge> : <Badge ok={false}>Missing</Badge>, <span className="text-xs text-fg-subtle">{why}</span>])}
          />
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-semibold">All response headers ({Object.keys(p.headers).length})</summary>
            <ResultTable head={['Header', 'Value']} mono={[0, 1]} rows={Object.entries(p.headers).sort()} />
          </details>
        </>
      )}
    </Card>
  );
}
