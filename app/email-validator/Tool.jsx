'use client';

import { useState } from 'react';
import { Card, QueryForm, Status, Examples, Badge } from '../components/toolUi.jsx';
import { dns } from '../components/net.js';
import { DISPOSABLE, ROLES, FREE, TYPOS, syntax } from './rules.js';


export default function Tool() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState(null);
  const [res, setRes] = useState(null);

  const run = async (input) => {
    const email = input.trim();
    setQ(email);
    setRes(null);
    const bad = syntax(email);
    if (bad) { setStatus(null); setRes({ email, checks: [[false, 'Format', bad]], verdict: false }); return; }
    const domain = email.slice(email.lastIndexOf('@') + 1).toLowerCase();
    const local = email.slice(0, email.lastIndexOf('@')).toLowerCase();
    setStatus({ type: 'loading', msg: `Checking ${domain}…` });
    try {
      const mx = await dns(domain, 'MX');
      const checks = [[true, 'Format', 'Valid email address format.']];
      let verdict = true;
      if (TYPOS[domain]) { checks.push([false, 'Typo', `Did you mean ${local}@${TYPOS[domain]}?`]); verdict = false; }
      if (mx.status === 3) {
        checks.push([false, 'Domain', `${domain} does not exist, so it cannot receive email.`]);
        verdict = false;
      } else {
        const records = mx.answers.filter((a) => a.type === 'MX');
        const nullMx = records.length === 1 && /\s\.?$/.test(records[0].data) && records[0].data.trim().split(/\s+/)[1] === '.';
        if (nullMx) { checks.push([false, 'Mail servers', `${domain} states that it does not accept email (null MX).`]); verdict = false; }
        else if (records.length) checks.push([true, 'Mail servers', `${domain} has ${records.length} mail server${records.length > 1 ? 's' : ''} (MX): ${records.map((r) => r.data.split(/\s+/)[1].replace(/\.$/, '')).slice(0, 3).join(', ')}.`]);
        else {
          const a = await dns(domain, 'A');
          if (a.answers.some((x) => x.type === 'A')) checks.push([null, 'Mail servers', `${domain} has no MX record. Some senders will try its web server instead, but mail is unlikely to arrive.`]);
          else { checks.push([false, 'Mail servers', `${domain} has no mail servers, so it cannot receive email.`]); verdict = false; }
          if (verdict) verdict = null;
        }
      }
      if (DISPOSABLE.has(domain)) { checks.push([null, 'Disposable', `${domain} is a throwaway inbox service. The address may stop working soon.`]); if (verdict) verdict = null; }
      if (ROLES.has(local.split('+')[0])) checks.push([null, 'Role address', `“${local}@” is usually a shared team inbox rather than one person.`]);
      if (FREE.has(domain)) checks.push([true, 'Provider', 'Free personal email provider.']);
      setRes({ email, checks, verdict });
      setStatus(null);
    } catch (err) {
      setStatus({ type: 'err', msg: err.message });
    }
  };

  return (
    <Card title="Check an email address">
      <QueryForm value={q} onChange={setQ} onSubmit={run} placeholder="name@example.com" label="Email address" busy={status?.type === 'loading'} button="Validate" />
      <Examples items={['someone@gmail.com', 'info@gmial.com', 'test@mailinator.com', 'user@no-such-domain-xyz.com']} onPick={run} />
      <Status status={status} />
      {res && (
        <>
          <div className={`mt-4 rounded-xl p-4 border ${res.verdict === true ? 'bg-emerald-500/10 border-emerald-400/40' : res.verdict === false ? 'bg-rose-500/10 border-rose-400/40' : 'bg-amber-500/10 border-amber-400/40'}`}>
            <p className="font-mono text-sm text-fg-muted break-all">{res.email}</p>
            <p className="font-semibold text-fg mt-1">
              {res.verdict === true ? 'Looks valid: the domain can receive email.' : res.verdict === false ? 'Not deliverable as written.' : 'Valid format, but risky.'}
            </p>
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {res.checks.map(([ok, k, v]) => (
              <li key={k} className="flex gap-2 items-start"><Badge ok={ok}>{k}</Badge><span className="text-fg-muted">{v}</span></li>
            ))}
          </ul>
        </>
      )}
    </Card>
  );
}
