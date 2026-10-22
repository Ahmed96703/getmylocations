'use client';

import { useState } from 'react';
import { Card, QueryForm, Status, Examples, Badge, CopyButton } from '../components/toolUi.jsx';
import { toDomain, fmtDate } from '../components/net.js';

// Certificates from the Certificate Transparency logs via SSLMate's Cert
// Spotter API, which answers browsers directly (100 lookups an hour per
// visitor without a key). It returns each certificate's SHA-256 and its DER
// bytes, from which the SHA-1 fingerprint is computed here.
async function certificates(domain) {
  const r = await fetch(`https://api.certspotter.com/v1/issuances?domain=${encodeURIComponent(domain)}&expand=dns_names&expand=issuer&expand=cert_der`);
  if (r.status === 429) throw new Error('Too many certificate lookups from your network this hour. Try again later.');
  if (!r.ok) throw new Error(`The certificate search returned HTTP ${r.status}. Try again in a minute.`);
  const list = await r.json();
  const now = Date.now();
  return list
    .filter((c) => new Date(c.not_after).getTime() > now)
    .sort((a, b) => new Date(b.not_before) - new Date(a.not_before));
}

const colons = (h) => h.toUpperCase().match(/.{2}/g).join(':');

async function sha1(derB64) {
  const der = Uint8Array.from(atob(derB64), (c) => c.charCodeAt(0));
  const buf = await crypto.subtle.digest('SHA-1', der);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

const daysLeft = (iso) => Math.floor((new Date(iso) - Date.now()) / 86400000);

function Cert({ c }) {
  const [fp1, setFp1] = useState('');
  const left = daysLeft(c.not_after);
  const names = c.dns_names || [];
  const rows = [['SHA-256', colons(c.cert_sha256)], ...(fp1 ? [['SHA-1', colons(fp1)]] : []), ['Public key SHA-256', colons(c.pubkey_sha256)]];
  return (
    <div className="bg-tint/5 border border-line rounded-lg p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold text-fg font-mono text-sm break-all">{names[0] || '—'}</p>
        <span className="flex gap-1.5">
          {c.revoked && <Badge ok={false}>Revoked</Badge>}
          <Badge ok={left > 14 ? true : null}>{left} days left</Badge>
        </span>
      </div>
      <dl className="mt-2 grid sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-fg-muted">
        <div><dt className="inline font-semibold">Issuer: </dt><dd className="inline">{c.issuer?.friendly_name || c.issuer?.name || '—'}</dd></div>
        <div><dt className="inline font-semibold">Valid: </dt><dd className="inline">{fmtDate(c.not_before)} – {fmtDate(c.not_after)}</dd></div>
        <div className="sm:col-span-2"><dt className="inline font-semibold">Covers: </dt><dd className="inline font-mono break-all">{names.slice(0, 12).join(', ')}{names.length > 12 ? ` and ${names.length - 12} more` : ''}</dd></div>
      </dl>
      <div className="mt-3 space-y-1.5 text-xs">
        {rows.map(([k, v]) => (
          <div key={k} className="flex flex-wrap items-center gap-2">
            <span className="font-semibold w-36">{k}</span>
            <span className="font-mono break-all flex-1 min-w-0">{v}</span>
            <CopyButton text={v} />
          </div>
        ))}
      </div>
      {!fp1 && c.cert_der && (
        <button type="button" className="btn-ghost text-xs mt-2" onClick={async () => setFp1(await sha1(c.cert_der))}>Show SHA-1 fingerprint</button>
      )}
    </div>
  );
}

export default function Tool() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState(null);
  const [res, setRes] = useState(null);

  const run = async (input) => {
    setQ(input);
    const d = toDomain(input);
    if (!d) { setRes(null); setStatus({ type: 'err', msg: 'Enter a domain such as example.com.' }); return; }
    setStatus({ type: 'loading', msg: `Searching the Certificate Transparency logs for ${d}…` });
    setRes(null);
    try {
      setRes({ d, list: await certificates(d) });
      setStatus(null);
    } catch (err) {
      setStatus({ type: 'err', msg: err.message });
    }
  };

  return (
    <Card title="Check a domain’s SSL certificates">
      <QueryForm value={q} onChange={setQ} onSubmit={run} placeholder="example.com" label="Domain name" busy={status?.type === 'loading'} />
      <Examples items={['getmylocations.com', 'github.com', 'wikipedia.org']} onPick={run} />
      <Status status={status} />
      {res && (
        res.list.length === 0
          ? <p className="mt-4 text-sm text-fg-muted">No valid certificates were found for exactly {res.d}. The site may use a wildcard certificate for its parent domain: try the main domain.</p>
          : (
            <>
              <p className="mt-4 text-sm text-fg-muted">{res.list.length} valid certificate{res.list.length > 1 ? 's' : ''} for {res.d}, newest first. The newest is usually the one in use.</p>
              <div className="mt-3 space-y-3">{res.list.slice(0, 20).map((c) => <Cert key={c.id} c={c} />)}</div>
            </>
          )
      )}
    </Card>
  );
}
