'use client';

import { useCallback, useEffect, useState } from 'react';
import { Card, CopyButton } from '../components/toolUi.jsx';
import { randInt } from '../components/random.js';

const SETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{};:,.?/~',
};
const SIMILAR = /[Il1O0o|`'"]/g;

function makePassword({ length, upper, lower, digits, symbols, noSimilar }) {
  const groups = Object.entries({ upper, lower, digits, symbols }).filter(([, on]) => on).map(([k]) => (noSimilar ? SETS[k].replace(SIMILAR, '') : SETS[k]));
  if (!groups.length) return { value: '', bits: 0 };
  const all = groups.join('');
  // One character from each chosen group, the rest from all of them, then shuffle.
  const chars = groups.map((g) => g[randInt(g.length)]);
  while (chars.length < length) chars.push(all[randInt(all.length)]);
  for (let i = chars.length - 1; i > 0; i -= 1) { const j = randInt(i + 1); [chars[i], chars[j]] = [chars[j], chars[i]]; }
  return { value: chars.slice(0, length).join(''), bits: length * Math.log2(all.length) };
}

function makePhrase(words, { count, sep, caps, number }) {
  const picked = Array.from({ length: count }, () => words[randInt(words.length)]).map((w) => (caps ? w[0].toUpperCase() + w.slice(1) : w));
  let bits = count * Math.log2(words.length);
  if (number) { picked.push(String(randInt(100))); bits += Math.log2(100); }
  return { value: picked.join(sep), bits };
}

// Rough offline cracking time at 100 billion guesses a second (a well-funded attacker against a fast hash).
function crackTime(bits) {
  const seconds = 2 ** bits / 2 / 1e11;
  const units = [['century', 3.15e9], ['year', 3.15e7], ['day', 86400], ['hour', 3600], ['minute', 60], ['second', 1]];
  if (seconds < 1) return 'instantly';
  for (const [u, s] of units) {
    if (seconds >= s) {
      const n = seconds / s;
      if (u === 'century' && n > 1.38e8) return 'longer than the age of the universe'; // 13.8 billion years
      return `about ${n >= 100 ? Math.round(n).toLocaleString() : n.toFixed(n < 10 ? 1 : 0)} ${u === 'century' ? (n >= 2 ? 'centuries' : 'century') : `${u}${n >= 2 ? 's' : ''}`}`;
    }
  }
  return 'instantly';
}

const strength = (bits) => (bits < 40 ? ['Weak', 'bg-rose-500', 25] : bits < 60 ? ['Fair', 'bg-amber-500', 50] : bits < 80 ? ['Strong', 'bg-emerald-500', 75] : ['Very strong', 'bg-emerald-600', 100]);

export default function Tool() {
  const [mode, setMode] = useState('password');
  const [opt, setOpt] = useState({ length: 16, upper: true, lower: true, digits: true, symbols: true, noSimilar: false });
  const [ph, setPh] = useState({ count: 5, sep: '-', caps: true, number: true });
  const [words, setWords] = useState(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (mode === 'phrase' && !words) fetch('/data/words.json').then((r) => r.json()).then(setWords).catch(() => setWords([]));
  }, [mode, words]);

  const generate = useCallback(() => {
    if (mode === 'phrase') { if (words?.length) setList(Array.from({ length: 5 }, () => makePhrase(words, ph))); return; }
    setList(Array.from({ length: 5 }, () => makePassword(opt)));
  }, [mode, words, ph, opt]);

  useEffect(() => { generate(); }, [generate]);

  const main = list[0];
  const [label, color, pct] = strength(main?.bits || 0);
  const toggle = (k) => setOpt((o) => ({ ...o, [k]: !o[k] }));

  return (
    <Card title="Generate a strong password">
      <div className="flex gap-1.5 mb-4">
        {[['password', 'Password'], ['phrase', 'Passphrase']].map(([k, l]) => (
          <button key={k} type="button" onClick={() => setMode(k)} className={`text-sm px-3 py-1.5 rounded-md border transition ${mode === k ? 'bg-accent/15 border-accent/50 text-accent' : 'bg-tint/5 border-line hover:bg-accent/10'}`}>{l}</button>
        ))}
      </div>

      {main && (
        <div className="rounded-xl p-4 border border-accent/40 bg-accent/10">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-lg sm:text-xl text-fg break-all flex-1 min-w-0">{main.value}</p>
            <CopyButton text={main.value} />
            <button type="button" className="btn-ghost text-xs" onClick={generate}>↻ New</button>
          </div>
          <div className="mt-3 h-2 rounded-full bg-tint/10 overflow-hidden"><div className={`h-full ${color}`} style={{ width: `${pct}%` }} /></div>
          <p className="text-xs text-fg-muted mt-1.5">{label} · {Math.round(main.bits)} bits of entropy · would take {crackTime(main.bits)} to guess offline</p>
        </div>
      )}

      {mode === 'password' ? (
        <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
          <label className="sm:col-span-2 flex items-center gap-3">
            <span className="w-20">Length: <strong>{opt.length}</strong></span>
            <input type="range" min="6" max="64" value={opt.length} onChange={(e) => setOpt((o) => ({ ...o, length: Number(e.target.value) }))} className="flex-1" aria-label="Password length" />
          </label>
          <div className="sm:col-span-2 flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-fg-muted mr-1">Quick length:</span>
            {[8, 12, 15, 16, 20, 32].map((n) => (
              <button key={n} type="button" onClick={() => setOpt((o) => ({ ...o, length: n }))} className={`text-xs px-2.5 py-1 rounded-md border transition ${opt.length === n ? 'bg-accent/15 border-accent/50 text-accent' : 'bg-tint/5 border-line hover:bg-accent/10'}`}>{n}</button>
            ))}
          </div>
          {[['upper', 'Uppercase (A–Z)'], ['lower', 'Lowercase (a–z)'], ['digits', 'Numbers (0–9)'], ['symbols', 'Symbols (!@#$…)'], ['noSimilar', 'Avoid look-alikes (l, 1, O, 0)']].map(([k, l]) => (
            <label key={k} className="flex items-center gap-2"><input type="checkbox" checked={opt[k]} onChange={() => toggle(k)} /> {l}</label>
          ))}
        </div>
      ) : (
        <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
          <label className="sm:col-span-2 flex items-center gap-3">
            <span className="w-20">Words: <strong>{ph.count}</strong></span>
            <input type="range" min="3" max="10" value={ph.count} onChange={(e) => setPh((p) => ({ ...p, count: Number(e.target.value) }))} className="flex-1" aria-label="Number of words" />
          </label>
          <label className="flex items-center gap-2">Separator
            <select className="field w-auto py-1" value={ph.sep} onChange={(e) => setPh((p) => ({ ...p, sep: e.target.value }))}>
              {[['-', 'Hyphen -'], [' ', 'Space'], ['.', 'Dot .'], ['_', 'Underscore _'], ['', 'None']].map(([v, l]) => <option key={l} value={v}>{l}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={ph.caps} onChange={() => setPh((p) => ({ ...p, caps: !p.caps }))} /> Capitalize words</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={ph.number} onChange={() => setPh((p) => ({ ...p, number: !p.number }))} /> Add a number</label>
          {!words && <p className="text-xs text-fg-subtle">Loading the word list…</p>}
        </div>
      )}

      {list.length > 1 && (
        <div className="mt-5">
          <p className="text-xs font-semibold text-fg-subtle mb-1.5">More options</p>
          <ul className="space-y-1.5">
            {list.slice(1).map((p) => (
              <li key={p.value} className="flex items-center gap-2 bg-tint/5 border border-line rounded-lg px-3 py-1.5">
                <span className="font-mono text-sm break-all flex-1 min-w-0">{p.value}</span>
                <CopyButton text={p.value} />
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="text-xs text-fg-subtle mt-4">Generated on your device with the browser’s secure random generator. Nothing is sent or saved.</p>
    </Card>
  );
}
