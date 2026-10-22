'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Card, CopyButton } from '../components/toolUi.jsx';
import { randInt } from '../components/random.js';

export default function Tool() {
  const [words, setWords] = useState(null);
  const [count, setCount] = useState(10);
  const [min, setMin] = useState(3);
  const [max, setMax] = useState(9);
  const [first, setFirst] = useState('');
  const [caps, setCaps] = useState(false);
  const [out, setOut] = useState([]);

  useEffect(() => { fetch('/data/words.json').then((r) => r.json()).then(setWords).catch(() => setWords([])); }, []);

  const pool = useMemo(() => (words || []).filter((w) => w.length >= min && w.length <= max && (!first || w.startsWith(first))), [words, min, max, first]);

  const generate = useCallback(() => {
    if (!pool.length) { setOut([]); return; }
    // Without repeats while the pool allows it.
    const n = Math.min(count, pool.length);
    const picked = new Set();
    while (picked.size < n) picked.add(pool[randInt(pool.length)]);
    setOut([...picked].map((w) => (caps ? w[0].toUpperCase() + w.slice(1) : w)));
  }, [pool, count, caps]);

  useEffect(() => { generate(); }, [generate]);

  return (
    <Card title="Generate random words">
      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        <label className="flex items-center gap-3 sm:col-span-2">
          <span className="w-28">How many: <strong>{count}</strong></span>
          <input type="range" min="1" max="100" value={count} onChange={(e) => setCount(Number(e.target.value))} className="flex-1" aria-label="Number of words" />
        </label>
        <label className="flex items-center gap-2">Length
          <select className="field w-auto py-1" value={min} onChange={(e) => setMin(Number(e.target.value))} aria-label="Shortest word">{[3, 4, 5, 6, 7, 8, 9].map((n) => <option key={n}>{n}</option>)}</select>
          to
          <select className="field w-auto py-1" value={max} onChange={(e) => setMax(Number(e.target.value))} aria-label="Longest word">{[3, 4, 5, 6, 7, 8, 9].map((n) => <option key={n}>{n}</option>)}</select>
          letters
        </label>
        <label className="flex items-center gap-2">Starts with
          <select className="field w-auto py-1" value={first} onChange={(e) => setFirst(e.target.value)} aria-label="First letter">
            <option value="">any letter</option>
            {'abcdefghijklmnopqrstuvwxyz'.split('').map((c) => <option key={c} value={c}>{c.toUpperCase()}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={caps} onChange={(e) => setCaps(e.target.checked)} /> Capitalize</label>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <button type="button" className="btn-primary" onClick={generate} disabled={!words}>↻ New words</button>
        {out.length > 0 && <CopyButton text={out.join('\n')} label="Copy all" />}
        <span className="text-xs text-fg-subtle">{words ? `${pool.length.toLocaleString()} words match` : 'Loading word list…'}</span>
      </div>
      {words && !pool.length && <p className="text-sm text-fg-muted mt-3">No words match those settings. Widen the length or pick another letter.</p>}
      {out.length > 0 && (
        <ul className={`mt-4 grid gap-2 ${out.length === 1 ? '' : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'}`}>
          {out.map((w) => (
            <li key={w} className={`rounded-lg border border-line bg-tint/5 px-3 py-2 font-semibold text-fg ${out.length === 1 ? 'text-3xl text-center py-6' : ''}`}>{w}</li>
          ))}
        </ul>
      )}
    </Card>
  );
}
