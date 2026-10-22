'use client';

import { useMemo, useState } from 'react';
import { Card, QueryForm, Status, Examples, CopyButton } from '../components/toolUi.jsx';
import { fetchPage, toUrl } from '../components/net.js';

const MAX_LINES = 20000;

export default function Tool() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState(null);
  const [page, setPage] = useState(null);
  const [find, setFind] = useState('');
  const [wrap, setWrap] = useState(true);

  const run = async (input) => {
    setQ(input);
    const url = toUrl(input);
    if (!url) { setPage(null); setStatus({ type: 'err', msg: 'Enter a web address such as example.com/page.' }); return; }
    setStatus({ type: 'loading', msg: `Fetching ${url}…` });
    setPage(null);
    try {
      const p = await fetchPage(url);
      if (!p.body) throw new Error(`The page returned no HTML (status ${p.status}, ${p.headers['content-type'] || 'unknown type'}).`);
      setPage(p);
      setStatus(null);
    } catch (err) {
      setStatus({ type: 'err', msg: err.message });
    }
  };

  const lines = useMemo(() => (page ? page.body.split('\n').slice(0, MAX_LINES) : []), [page]);
  const term = find.trim().toLowerCase();
  const hits = term ? lines.reduce((n, l) => n + (l.toLowerCase().includes(term) ? 1 : 0), 0) : 0;

  return (
    <Card title="View the HTML source of a page">
      <QueryForm value={q} onChange={setQ} onSubmit={run} placeholder="example.com/page" label="Page address" busy={status?.type === 'loading'} button="View source" />
      <Examples items={['example.com', 'getmylocations.com', 'wikipedia.org']} onPick={run} />
      <Status status={status} />
      {page && (
        <>
          <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-fg-muted">
            <span>Status {page.status} · {(page.body.length / 1024).toFixed(1)} KB · {page.body.split('\n').length.toLocaleString()} lines{page.truncated ? ' · cut at 1.5 MB' : ''}</span>
            <input className="field w-48 text-xs py-1.5" value={find} onChange={(e) => setFind(e.target.value)} placeholder="Find in source" aria-label="Find in source" />
            {term && <span>{hits} line{hits === 1 ? '' : 's'} match</span>}
            <label className="flex items-center gap-1"><input type="checkbox" checked={wrap} onChange={(e) => setWrap(e.target.checked)} /> Wrap lines</label>
            <CopyButton text={page.body} label="Copy source" />
          </div>
          {page.finalUrl !== page.url && <p className="text-xs text-fg-subtle mt-2">Redirected to <span className="font-mono">{page.finalUrl}</span></p>}
          <div className="mt-3 max-h-[70vh] overflow-auto rounded-lg border border-line bg-tint/5 text-xs font-mono">
            <table className="w-full">
              <tbody>
                {lines.map((l, i) => {
                  const hit = term && l.toLowerCase().includes(term);
                  return (
                    <tr key={i} className={hit ? 'bg-amber-400/20' : ''}>
                      <td className="select-none text-right pr-3 pl-2 text-fg-subtle align-top w-12">{i + 1}</td>
                      <td className={`pr-3 ${wrap ? 'whitespace-pre-wrap break-all' : 'whitespace-pre'}`}>{l}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-fg-subtle mt-2">This is the HTML the server sends. Content added later by JavaScript is not included; use your browser’s developer tools to see that.</p>
        </>
      )}
    </Card>
  );
}
