'use client';

import { useState } from 'react';
import { Card, QueryForm, Status, Rows, ResultTable, Examples, CopyButton } from '../components/toolUi.jsx';
import { fetchPage, toUrl } from '../components/net.js';

// Every <a href> on the page, resolved and classified.
export function readLinks(html, base) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const host = new URL(base).hostname.replace(/^www\./, '');
  const out = [];
  doc.querySelectorAll('a[href]').forEach((a) => {
    const raw = a.getAttribute('href').trim();
    if (!raw || raw.startsWith('#') || /^javascript:/i.test(raw)) return;
    let url;
    try { url = new URL(raw, base); } catch { return; }
    const scheme = url.protocol.replace(':', '');
    const rel = (a.getAttribute('rel') || '').toLowerCase().split(/\s+/).filter(Boolean);
    const text = (a.textContent || '').replace(/\s+/g, ' ').trim() || (a.querySelector('img')?.getAttribute('alt') ? `[image: ${a.querySelector('img').getAttribute('alt')}]` : '');
    out.push({
      url: url.toString(),
      text,
      kind: !['http', 'https'].includes(scheme) ? scheme : url.hostname.replace(/^www\./, '') === host ? 'internal' : 'external',
      nofollow: rel.includes('nofollow'),
      sponsored: rel.includes('sponsored'),
      ugc: rel.includes('ugc'),
      blank: a.getAttribute('target') === '_blank',
    });
  });
  return out;
}

const FILTERS = [
  ['all', 'All'], ['internal', 'Internal'], ['external', 'External'], ['nofollow', 'Nofollow'], ['other', 'Email, phone & other'],
];

export default function Tool() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState(null);
  const [res, setRes] = useState(null);
  const [filter, setFilter] = useState('all');

  const run = async (input) => {
    setQ(input);
    const url = toUrl(input);
    if (!url) { setRes(null); setStatus({ type: 'err', msg: 'Enter a web address such as example.com/page.' }); return; }
    setStatus({ type: 'loading', msg: `Reading ${url}…` });
    setRes(null);
    try {
      const p = await fetchPage(url);
      if (!p.body) throw new Error(`The page returned no HTML (status ${p.status}).`);
      setRes({ url: p.finalUrl, links: readLinks(p.body, p.finalUrl) });
      setFilter('all');
      setStatus(null);
    } catch (err) {
      setStatus({ type: 'err', msg: err.message });
    }
  };

  const links = res?.links || [];
  const count = (f) => links.filter((l) => (f === 'all' ? true : f === 'nofollow' ? l.nofollow : f === 'other' ? !['internal', 'external'].includes(l.kind) : l.kind === f)).length;
  const shown = links.filter((l) => (filter === 'all' ? true : filter === 'nofollow' ? l.nofollow : filter === 'other' ? !['internal', 'external'].includes(l.kind) : l.kind === filter));
  const unique = new Set(links.map((l) => l.url)).size;
  const empty = links.filter((l) => !l.text).length;
  const csv = ['URL,Anchor text,Type,Rel,New tab', ...shown.map((l) => [l.url, l.text, l.kind, [l.nofollow && 'nofollow', l.sponsored && 'sponsored', l.ugc && 'ugc'].filter(Boolean).join(' '), l.blank ? 'yes' : ''].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))].join('\n');

  return (
    <Card title="Analyze the links on a page">
      <QueryForm value={q} onChange={setQ} onSubmit={run} placeholder="example.com/page" label="Page address" busy={status?.type === 'loading'} button="Analyze" />
      <Examples items={['getmylocations.com', 'wikipedia.org', 'news.ycombinator.com']} onPick={run} />
      <Status status={status} />
      {res && (
        <>
          <Rows rows={[
            ['Total links', links.length],
            ['Unique addresses', unique],
            ['Internal', count('internal')],
            ['External', count('external')],
            ['Nofollow', count('nofollow')],
            ['Without anchor text', empty],
          ]} />
          <div className="flex flex-wrap items-center gap-1.5 mt-4">
            {FILTERS.map(([k, label]) => (
              <button key={k} type="button" onClick={() => setFilter(k)} className={`text-xs px-2.5 py-1.5 rounded-md border transition ${filter === k ? 'bg-accent/15 border-accent/50 text-accent' : 'bg-tint/5 border-line hover:bg-accent/10'}`}>
                {label} ({count(k)})
              </button>
            ))}
            <CopyButton text={csv} label="Copy as CSV" />
          </div>
          <ResultTable
            head={['Link', 'Anchor text', 'Type', 'Rel']}
            mono={[0]}
            rows={shown.slice(0, 1000).map((l) => [
              l.url,
              l.text || <span className="text-amber-600">(empty)</span>,
              l.kind,
              [l.nofollow && 'nofollow', l.sponsored && 'sponsored', l.ugc && 'ugc', l.blank && 'new tab'].filter(Boolean).join(', ') || '—',
            ])}
          />
          {shown.length > 1000 && <p className="text-xs text-fg-subtle mt-2">Showing the first 1,000.</p>}
        </>
      )}
    </Card>
  );
}
