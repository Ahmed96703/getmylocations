'use client';

import { useState } from 'react';

// Small shared pieces for the tool boxes, so every tool looks the same as the
// location tools: a glass card, a search row, status lines and result rows.

export function Card({ title, children, right }) {
  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        {right}
      </div>
      {children}
    </section>
  );
}

// A one-line form: input plus a button. onSubmit receives the trimmed text.
export function QueryForm({ value, onChange, onSubmit, placeholder, label, button = 'Check', busy, mono = true, extra }) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(value.trim()); }}
      className="flex flex-wrap gap-2"
    >
      <input
        className={`field flex-1 min-w-[220px] ${mono ? 'font-mono' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
      />
      {extra}
      <button type="submit" disabled={busy} className="btn-primary">{busy ? 'Checking…' : button}</button>
    </form>
  );
}

export function Status({ status }) {
  if (!status) return null;
  if (status.type === 'loading') return <p className="text-sm text-fg-subtle mt-3" aria-live="polite">{status.msg}</p>;
  if (status.type === 'err') return <p role="alert" className="mt-3 bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{status.msg}</p>;
  return null;
}

// Label / value rows.
export function Rows({ rows }) {
  return (
    <dl className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
      {rows.filter(([, v]) => v !== undefined && v !== null && v !== '' && v !== false).map(([k, v]) => (
        <div key={k} className="bg-tint/5 border border-line rounded-lg p-3 min-w-0">
          <dt className="text-[10px] uppercase tracking-wider text-fg-subtle font-semibold">{k}</dt>
          <dd className="mt-1 break-words">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ResultTable({ head, rows, mono = [] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-tint/5 text-left text-fg-muted">
            {head.map((h) => <th key={h} className="px-3 py-2 font-semibold whitespace-nowrap">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-line-subtle align-top">
              {r.map((c, j) => (
                <td key={j} className={`px-3 py-2 ${mono.includes(j) ? 'font-mono text-xs break-all' : ''}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CopyButton({ text, label = 'Copy' }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="btn-ghost text-xs"
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1500); } catch { /* clipboard blocked */ }
      }}
    >
      {done ? 'Copied ✓' : label}
    </button>
  );
}

export function Examples({ items, onPick }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-3">
      <span className="text-xs text-fg-subtle mr-1">Try:</span>
      {items.map((x) => (
        <button
          key={x}
          type="button"
          onClick={() => onPick(x)}
          className="text-xs px-2.5 py-1 rounded-md bg-tint/5 hover:bg-accent/10 hover:text-accent border border-line transition font-mono"
        >
          {x}
        </button>
      ))}
    </div>
  );
}

export function Badge({ ok, children }) {
  const cls = ok === true
    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-400/40'
    : ok === false ? 'bg-rose-500/10 text-rose-500 border-rose-400/40' : 'bg-amber-500/10 text-amber-600 border-amber-400/40';
  return <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-md border ${cls}`}>{children}</span>;
}
