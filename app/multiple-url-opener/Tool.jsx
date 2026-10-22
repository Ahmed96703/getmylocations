'use client';

import { useMemo, useState } from 'react';
import { Card } from '../components/toolUi.jsx';
import { toUrl } from '../components/net.js';

// One address per line (or separated by spaces/commas); bare domains get https://.
export function parseUrls(text) {
  const seen = new Set();
  return text.split(/[\s,]+/).map((s) => toUrl(s)).filter((u) => u && !seen.has(u) && seen.add(u));
}

export default function Tool() {
  const [text, setText] = useState('');
  const [next, setNext] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const urls = useMemo(() => parseUrls(text), [text]);

  // One click may only open one tab unless the visitor allows pop-ups for the
  // site; with noopener the browser does not tell us which ones were blocked.
  const openAll = () => {
    urls.forEach((u) => window.open(u, '_blank', 'noopener'));
    setBlocked(urls.length > 1);
    setNext(urls.length);
  };

  const openNext = () => {
    if (next >= urls.length) return;
    window.open(urls[next], '_blank', 'noopener');
    setNext((n) => n + 1);
  };

  return (
    <Card title="Open a list of links">
      <textarea
        className="field font-mono text-xs h-44"
        value={text}
        onChange={(e) => { setText(e.target.value); setNext(0); setBlocked(false); }}
        placeholder={'example.com\nhttps://wikipedia.org\nhttps://github.com'}
        aria-label="Links, one per line"
        spellCheck={false}
      />
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <button type="button" className="btn-primary" disabled={!urls.length} onClick={openAll}>Open all {urls.length || ''}</button>
        <button type="button" className="btn-ghost" disabled={!urls.length || next >= urls.length} onClick={openNext}>
          {next >= urls.length && urls.length ? 'All opened' : `Open next${urls.length ? ` (${next + 1} of ${urls.length})` : ''}`}
        </button>
        <button type="button" className="btn-ghost" onClick={() => { setText(''); setNext(0); setBlocked(false); }}>Clear</button>
        <span className="text-xs text-fg-subtle">{urls.length} valid link{urls.length === 1 ? '' : 's'} (duplicates removed)</span>
      </div>
      {blocked && (
        <p className="mt-3 text-sm bg-amber-500/10 border border-amber-400/40 rounded-lg p-3 text-fg-muted">
          Only one tab opened? Your browser blocked the rest as pop-ups. Click the blocked pop-up icon at the end of the address bar, choose “Always allow pop-ups from getmylocations.com”, and press Open all again. Or use “Open next” to open them one at a time.
        </p>
      )}
      {urls.length > 0 && (
        <ol className="mt-4 space-y-1 text-xs font-mono list-decimal list-inside">
          {urls.map((u, i) => (
            <li key={u} className={i < next ? 'text-fg-subtle' : ''}>
              <a href={u} target="_blank" rel="noopener nofollow" className="text-accent hover:underline break-all">{u}</a>
            </li>
          ))}
        </ol>
      )}
    </Card>
  );
}
