'use client';

import { useState } from 'react';
import { Card, QueryForm, Status, ResultTable, Examples, Badge } from '../components/toolUi.jsx';
import { dns, txt, toDomain } from '../components/net.js';

const TAGS = {
  v: 'Version', p: 'Policy', sp: 'Subdomain policy', pct: 'Percentage of mail the policy applies to',
  rua: 'Aggregate reports sent to', ruf: 'Failure reports sent to', adkim: 'DKIM alignment', aspf: 'SPF alignment',
  fo: 'Failure reporting options', ri: 'Report interval (seconds)', np: 'Policy for non-existent subdomains',
};
const ALIGN = { r: 'relaxed', s: 'strict' };

export function parseTags(record) {
  return Object.fromEntries(record.split(';').map((p) => p.trim()).filter(Boolean).map((p) => {
    const i = p.indexOf('=');
    return [p.slice(0, i).trim().toLowerCase(), p.slice(i + 1).trim()];
  }));
}

async function txtRecords(name) {
  const r = await dns(name, 'TXT');
  return r.answers.filter((a) => a.type === 'TXT').map((a) => txt(a.data));
}

// Count SPF's DNS-querying mechanisms, following include: and redirect=.
// RFC 7208 allows at most 10; more makes SPF fail with "permerror".
async function spfLookups(domain, seen = new Set(), depth = 0) {
  if (seen.has(domain) || depth > 10) return 0;
  seen.add(domain);
  const rec = (await txtRecords(domain).catch(() => [])).find((t) => /^v=spf1(\s|$)/i.test(t));
  if (!rec) return 0;
  let n = 0;
  for (const term of rec.split(/\s+/).slice(1)) {
    const m = /^[+?~-]?(include:|redirect=|a(?=$|[:/])|mx(?=$|[:/])|ptr|exists:)(.*)$/i.exec(term);
    if (!m) continue;
    n += 1;
    const kind = m[1].toLowerCase();
    if (kind === 'include:' || kind === 'redirect=') n += await spfLookups(m[2], seen, depth + 1);
  }
  return n;
}

function verdict(d) {
  if (!d) return [false, 'No DMARC record: anyone can send mail that claims to be from this domain, and many providers treat its mail with suspicion.'];
  if (d.p === 'reject') return [true, 'Strongest policy: mail that fails checks is rejected.'];
  if (d.p === 'quarantine') return [true, 'Good: mail that fails checks goes to spam.'];
  return [null, 'Monitoring only (p=none): failing mail is still delivered. Fine while you read the reports, but move to quarantine or reject.'];
}

export default function Tool() {
  const [q, setQ] = useState('');
  const [selector, setSelector] = useState('');
  const [status, setStatus] = useState(null);
  const [res, setRes] = useState(null);

  const run = async (input) => {
    setQ(input);
    const d = toDomain(input);
    if (!d) { setRes(null); setStatus({ type: 'err', msg: 'Enter a domain such as example.com, or an email address.' }); return; }
    setStatus({ type: 'loading', msg: `Checking DMARC and SPF for ${d}…` });
    setRes(null);
    try {
      const [dm, root] = await Promise.all([txtRecords(`_dmarc.${d}`), txtRecords(d)]);
      const dmarcRecs = dm.filter((t) => /^v=DMARC1/i.test(t));
      const spfRecs = root.filter((t) => /^v=spf1(\s|$)/i.test(t));
      const lookups = spfRecs.length === 1 ? await spfLookups(d) : null;
      let dkim = null;
      const sel = selector.trim();
      if (sel) {
        const k = await txtRecords(`${sel}._domainkey.${d}`).catch(() => []);
        dkim = { sel, rec: k.find((t) => /v=DKIM1|k=rsa|p=/i.test(t)) || null };
      }
      setRes({ d, dmarcRecs, dmarc: dmarcRecs[0] ? parseTags(dmarcRecs[0]) : null, spfRecs, lookups, dkim });
      setStatus(null);
    } catch (err) {
      setStatus({ type: 'err', msg: err.message });
    }
  };

  const [ok, msg] = res ? verdict(res.dmarc) : [];
  const spf = res?.spfRecs[0];
  const all = spf && /(?:^|\s)([+?~-]?)all(?:\s|$)/i.exec(spf);

  return (
    <Card title="Check DMARC, SPF and DKIM">
      <QueryForm
        value={q}
        onChange={setQ}
        onSubmit={run}
        placeholder="example.com"
        label="Domain or email address"
        busy={status?.type === 'loading'}
        extra={<input className="field w-36 font-mono" value={selector} onChange={(e) => setSelector(e.target.value)} placeholder="DKIM selector" aria-label="DKIM selector (optional)" />}
      />
      <Examples items={['google.com', 'paypal.com', 'github.com']} onPick={run} />
      <Status status={status} />
      {res && (
        <>
          <div className={`mt-4 rounded-xl p-4 border ${ok === true ? 'bg-emerald-500/10 border-emerald-400/40' : ok === false ? 'bg-rose-500/10 border-rose-400/40' : 'bg-amber-500/10 border-amber-400/40'}`}>
            <p className="font-semibold text-fg">DMARC: {res.dmarc ? `p=${res.dmarc.p || '(missing)'}` : 'not found'}</p>
            <p className="text-sm text-fg-muted mt-1">{msg}</p>
          </div>

          {res.dmarcRecs.length > 1 && <p className="mt-3 text-sm"><Badge ok={false}>Error</Badge> {res.dmarcRecs.length} DMARC records found; receivers ignore all of them. Keep exactly one.</p>}
          {res.dmarc && (
            <>
              <p className="mt-4 text-xs text-fg-subtle font-mono break-all">_dmarc.{res.d} → {res.dmarcRecs[0]}</p>
              <ResultTable
                head={['Tag', 'Value', 'Meaning']}
                mono={[0, 1]}
                rows={Object.entries(res.dmarc).map(([k, v]) => [k, v, TAGS[k] ? `${TAGS[k]}${(k === 'adkim' || k === 'aspf') && ALIGN[v] ? ` (${ALIGN[v]})` : ''}` : 'Unknown tag'])}
              />
            </>
          )}

          <h3 className="font-semibold mt-6">SPF</h3>
          {res.spfRecs.length === 0 && <p className="mt-2 text-sm"><Badge ok={false}>Missing</Badge> No SPF record: receivers cannot tell which servers may send for {res.d}.</p>}
          {res.spfRecs.length > 1 && <p className="mt-2 text-sm"><Badge ok={false}>Error</Badge> {res.spfRecs.length} SPF records: SPF fails. Merge them into one.</p>}
          {spf && res.spfRecs.length === 1 && (
            <>
              <p className="mt-2 text-xs text-fg-subtle font-mono break-all">{spf}</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                <li>
                  {all?.[1] === '-' && <><Badge ok>-all</Badge> Mail from unlisted servers fails (strict).</>}
                  {all?.[1] === '~' && <><Badge ok>~all</Badge> Mail from unlisted servers soft-fails. Common and fine with DMARC.</>}
                  {all?.[1] === '?' && <><Badge>?all</Badge> Neutral: SPF says nothing about unlisted servers.</>}
                  {(all && (all[1] === '+' || all[1] === '')) && <><Badge ok={false}>+all</Badge> Any server in the world passes SPF. Change this to ~all or -all.</>}
                  {!all && !/redirect=/i.test(spf) && <><Badge>No “all”</Badge> The record does not end with ~all or -all.</>}
                </li>
                <li>
                  <Badge ok={res.lookups <= 10 ? true : false}>{res.lookups} / 10 DNS lookups</Badge>{' '}
                  {res.lookups > 10 ? 'Too many: SPF fails (permerror). Remove or flatten some include: entries.' : 'Within the limit.'}
                </li>
              </ul>
            </>
          )}

          {res.dkim && (
            <>
              <h3 className="font-semibold mt-6">DKIM ({res.dkim.sel})</h3>
              {res.dkim.rec
                ? <p className="mt-2 text-sm"><Badge ok>Found</Badge> <span className="font-mono text-xs break-all text-fg-subtle">{res.dkim.rec.slice(0, 160)}{res.dkim.rec.length > 160 ? '…' : ''}</span></p>
                : <p className="mt-2 text-sm"><Badge ok={false}>Not found</Badge> No DKIM key at {res.dkim.sel}._domainkey.{res.d}. Check the selector in an email’s DKIM-Signature header (s=).</p>}
            </>
          )}
        </>
      )}
    </Card>
  );
}
