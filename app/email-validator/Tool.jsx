'use client';

import { useState } from 'react';
import { Card, QueryForm, Status, Examples, Badge } from '../components/toolUi.jsx';
import { dns } from '../components/net.js';

// Well-known throwaway inbox services (a short list of the most used ones).
const DISPOSABLE = new Set(['mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'sharklasers.com', '10minutemail.com', '10minutemail.net', 'temp-mail.org', 'tempmail.com', 'tempmail.net', 'yopmail.com', 'yopmail.net', 'getnada.com', 'nada.email', 'trashmail.com', 'trashmail.de', 'dispostable.com', 'maildrop.cc', 'mintemail.com', 'throwawaymail.com', 'fakeinbox.com', 'mailnesia.com', 'mohmal.com', 'emailondeck.com', 'tempail.com', 'moakt.com', 'spamgourmet.com', 'mytemp.email', 'tempmailo.com', 'burnermail.io', 'inboxkitten.com', 'mailcatch.com', 'mail.tm', 'tmpmail.org', 'emailfake.com', 'temp-mail.io', 'luxusmail.org', 'getairmail.com', 'discard.email', 'spambox.us', 'anonaddy.me']);
const ROLES = new Set(['admin', 'administrator', 'info', 'contact', 'support', 'sales', 'help', 'office', 'billing', 'webmaster', 'postmaster', 'hostmaster', 'abuse', 'noreply', 'no-reply', 'marketing', 'team', 'hello', 'jobs', 'careers', 'hr']);
const FREE = new Set(['gmail.com', 'googlemail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'live.com', 'msn.com', 'icloud.com', 'me.com', 'aol.com', 'proton.me', 'protonmail.com', 'gmx.com', 'gmx.de', 'mail.com', 'yandex.com', 'zoho.com', 'web.de', 'yahoo.co.uk', 'hotmail.co.uk']);
// Common typing slips of big providers.
const TYPOS = { 'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gamil.com': 'gmail.com', 'gmail.co': 'gmail.com', 'gmail.con': 'gmail.com', 'gnail.com': 'gmail.com', 'hotmial.com': 'hotmail.com', 'hotmal.com': 'hotmail.com', 'hotmail.co': 'hotmail.com', 'yahooo.com': 'yahoo.com', 'yaho.com': 'yahoo.com', 'yahoo.co': 'yahoo.com', 'outlok.com': 'outlook.com', 'outloo.com': 'outlook.com', 'iclod.com': 'icloud.com', 'icloud.co': 'icloud.com' };

// Syntax check for everyday addresses (RFC 5321/5322 dot-atom form).
export function syntax(email) {
  if (email.length > 254) return 'The address is longer than the 254-character limit.';
  const at = email.lastIndexOf('@');
  if (at < 1) return 'An email address needs a name, then @, then a domain.';
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (local.length > 64) return 'The part before @ is longer than 64 characters.';
  if (!/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/.test(local)) return 'The part before @ has a character that is not allowed, or a dot at the start, end or twice in a row.';
  if (!/^([A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/.test(domain)) return 'The domain part does not look like a valid domain name.';
  return null;
}

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
