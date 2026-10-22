'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, ResultTable, Rows, Badge } from '../components/toolUi.jsx';

// Unfold headers (continuation lines start with whitespace) into [name, value] pairs.
export function parseHeaders(text) {
  const head = text.replace(/\r\n/g, '\n').split(/\n\n/)[0];
  const out = [];
  for (const line of head.split('\n')) {
    if (/^[ \t]/.test(line) && out.length) out[out.length - 1][1] += ` ${line.trim()}`;
    else {
      const i = line.indexOf(':');
      if (i > 0) out.push([line.slice(0, i).trim(), line.slice(i + 1).trim()]);
    }
  }
  return out;
}

const IP = /\[?((?:\d{1,3}\.){3}\d{1,3}|[0-9a-f]*:[0-9a-f:]+)\]?/i;
const PRIVATE = /^(10\.|127\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|::1|fe80:|fc|fd)/i;

// One Received header → { from, by, with, ip, date }.
function hop(value) {
  const date = value.includes(';') ? value.slice(value.lastIndexOf(';') + 1).trim() : '';
  const body = value.includes(';') ? value.slice(0, value.lastIndexOf(';')) : value;
  const from = /\bfrom\s+(.+?)(?=\s+by\s|\s+with\s|\s+id\s|\s+for\s|$)/i.exec(body)?.[1] || '';
  const by = /\bby\s+(\S+)/i.exec(body)?.[1] || '';
  const via = /\bwith\s+(\S+)/i.exec(body)?.[1] || '';
  const ip = IP.exec(from)?.[1] || '';
  const t = Date.parse(date.replace(/\s*\([^)]*\)\s*$/, ''));
  return { from, by, with: via, ip, date, t: Number.isNaN(t) ? null : t };
}

const fmtDelay = (ms) => (ms == null ? '' : ms < 1000 ? '<1 s' : ms < 60000 ? `${Math.round(ms / 1000)} s` : ms < 3600000 ? `${Math.round(ms / 60000)} min` : `${(ms / 3600000).toFixed(1)} h`);

// spf=pass, dkim=fail … from Authentication-Results.
function authResults(values) {
  const out = {};
  for (const v of values) {
    for (const m of v.matchAll(/\b(spf|dkim|dmarc|arc|compauth)=([a-z]+)/gi)) {
      const k = m[1].toLowerCase();
      if (!out[k]) out[k] = m[2].toLowerCase();
    }
  }
  return out;
}

const SAMPLE = `Received: from mail-sor-f41.google.com (mail-sor-f41.google.com. [209.85.220.41])
        by mx.example.com with SMTPS id a1sor123;
        Tue, 21 Oct 2026 09:14:07 -0700 (PDT)
Received: by 2002:a05:6512:3d0f:b0:57a:1:: with SMTP id d15;
        Tue, 21 Oct 2026 09:14:05 -0700 (PDT)
Authentication-Results: mx.example.com;
       dkim=pass header.i=@gmail.com header.s=20230601;
       spf=pass smtp.mailfrom=sender@gmail.com;
       dmarc=pass (p=NONE sp=QUARANTINE dis=NONE) header.from=gmail.com
From: Sender Name <sender@gmail.com>
To: you@example.com
Subject: Hello
Date: Tue, 21 Oct 2026 18:14:04 +0200
Message-ID: <CABcdEFg123@mail.gmail.com>
Return-Path: <sender@gmail.com>`;

export default function Tool() {
  const [text, setText] = useState('');
  const [res, setRes] = useState(null);

  const analyze = (t = text) => {
    const h = parseHeaders(t);
    if (!h.length) { setRes({ error: 'No headers found. Paste the full header block, starting with lines such as “Received:” or “From:”.' }); return; }
    const get = (n) => h.find(([k]) => k.toLowerCase() === n)?.[1] || '';
    const hops = h.filter(([k]) => k.toLowerCase() === 'received').map(([, v]) => hop(v)).reverse(); // oldest first
    hops.forEach((x, i) => { x.delay = i && x.t != null && hops[i - 1].t != null ? x.t - hops[i - 1].t : null; });
    const origin = hops.find((x) => x.ip && !PRIVATE.test(x.ip));
    const auth = authResults(h.filter(([k]) => /^(arc-)?authentication-results$/i.test(k)).map(([, v]) => v));
    const total = hops.length > 1 && hops[0].t != null && hops[hops.length - 1].t != null ? hops[hops.length - 1].t - hops[0].t : null;
    setRes({ get, hops, origin, auth, total, count: h.length });
  };

  return (
    <Card title="Analyze email headers">
      <textarea
        className="field font-mono text-xs h-48"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste the full email headers here (in Gmail: ⋮ › Show original; in Outlook: File › Properties › Internet headers)"
        aria-label="Email headers"
        spellCheck={false}
      />
      <div className="flex flex-wrap gap-2 mt-3">
        <button type="button" className="btn-primary" onClick={() => analyze()}>Analyze</button>
        <button type="button" className="btn-ghost" onClick={() => { setText(SAMPLE); analyze(SAMPLE); }}>Try an example</button>
      </div>
      <p className="text-xs text-fg-subtle mt-2">Everything is analyzed in your browser. The headers are not sent anywhere.</p>
      {res?.error && <p role="alert" className="mt-3 bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{res.error}</p>}
      {res && !res.error && (
        <>
          <div className="flex flex-wrap gap-2 mt-4">
            {['spf', 'dkim', 'dmarc'].map((k) => (
              <Badge key={k} ok={res.auth[k] === 'pass' ? true : res.auth[k] ? (['fail', 'softfail', 'permerror'].includes(res.auth[k]) ? false : null) : null}>
                {k.toUpperCase()}: {res.auth[k] || 'not reported'}
              </Badge>
            ))}
          </div>
          <Rows rows={[
            ['From', res.get('from')],
            ['Reply-To', res.get('reply-to')],
            ['Return-Path', res.get('return-path')],
            ['To', res.get('to')],
            ['Subject', res.get('subject')],
            ['Date', res.get('date')],
            ['Message-ID', res.get('message-id') && <span className="font-mono text-xs">{res.get('message-id')}</span>],
            ['Sent from IP', res.origin && <><span className="font-mono">{res.origin.ip}</span> · <Link href="/ip-location" className="text-accent hover:underline">locate</Link> · <Link href="/ip-blacklist-checker" className="text-accent hover:underline">blacklist check</Link></>],
            ['Mail program', res.get('x-mailer') || res.get('user-agent')],
            ['Total delivery time', res.total != null && fmtDelay(res.total)],
          ]} />
          {res.get('reply-to') && res.get('from') && !res.get('from').toLowerCase().includes((/@([^>\s]+)/.exec(res.get('reply-to'))?.[1] || '~').toLowerCase()) && (
            <p className="mt-3 text-sm"><Badge>Check</Badge> <span className="text-fg-muted">Replies go to a different domain than the sender’s. Common in phishing, but also used by newsletters and help desks.</span></p>
          )}
          {res.hops.length > 0 && (
            <>
              <h3 className="font-semibold mt-6">Delivery path ({res.hops.length} hops, oldest first)</h3>
              <ResultTable head={['#', 'From', 'By', 'Protocol', 'Delay']} mono={[1, 2]} rows={res.hops.map((x, i) => [i + 1, x.from || '—', x.by || '—', x.with || '—', fmtDelay(x.delay)])} />
            </>
          )}
        </>
      )}
    </Card>
  );
}
