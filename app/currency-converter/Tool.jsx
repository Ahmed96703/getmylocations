'use client';

import { useEffect, useMemo, useState } from 'react';
import { track } from '../components/track.js';

// Currency for the visitor's region, to pick a sensible starting pair.
const EURO = 'AT BE BG CY DE EE ES FI FR GR HR IE IT LT LU LV MT NL PT SI SK'.split(' ');
const REGION = { US: 'USD', GB: 'GBP', CA: 'CAD', AU: 'AUD', NZ: 'NZD', IN: 'INR', PK: 'PKR', RU: 'RUB', JP: 'JPY', CN: 'CNY', CH: 'CHF', SE: 'SEK', NO: 'NOK', DK: 'DKK', PL: 'PLN', CZ: 'CZK', HU: 'HUF', TR: 'TRY', AE: 'AED', SA: 'SAR', ZA: 'ZAR', BR: 'BRL', MX: 'MXN', NG: 'NGN', UA: 'UAH', KZ: 'KZT', BD: 'BDT', PH: 'PHP', ID: 'IDR', MY: 'MYR', SG: 'SGD', KR: 'KRW', EG: 'EGP' };
const POPULAR = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'INR', 'CAD', 'AUD', 'CHF', 'RUB', 'AED', 'PKR', 'TRY', 'MXN'];
const AMOUNTS = [1, 5, 10, 20, 50, 100, 250, 500, 1000, 5000];

const num = (s) => {
  const v = Number(String(s).replace(/\s/g, '').replace(',', '.'));
  return Number.isFinite(v) && v >= 0 ? v : null;
};

export default function Tool() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  // Currency names from the browser's Intl data (set after load, since the
  // build server's names can differ and would break hydration).
  const [names, setNames] = useState(null);
  const name = (c) => names?.of(c) || c;

  useEffect(() => {
    try { setNames(new Intl.DisplayNames(['en'], { type: 'currency' })); } catch { /* codes only */ }
    const region = (navigator.language || '').split('-')[1]?.toUpperCase();
    const local = EURO.includes(region) ? 'EUR' : REGION[region];
    if (local && local !== 'USD') { setFrom(local); setTo('USD'); } else if (local === 'USD') { setFrom('USD'); setTo('EUR'); }
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((r) => r.json())
      .then((d) => { if (d.result !== 'success') throw new Error(); setData(d); })
      .catch(() => setErr('The exchange rates did not load. Check your connection and try again.'));
  }, []);

  const codes = useMemo(() => (data ? Object.keys(data.rates).sort() : POPULAR), [data]);
  const rate = data ? data.rates[to] / data.rates[from] : null;
  const a = num(amount);
  const fmt = (v, c) => {
    try { return v.toLocaleString(undefined, { style: 'currency', currency: c, maximumFractionDigits: v < 1 ? 6 : 2 }); } catch { return `${v.toFixed(2)} ${c}`; }
  };
  const fmtRate = (v) => v.toLocaleString(undefined, { maximumSignificantDigits: 6 });

  const pick = (setter) => (e) => { setter(e.target.value); track('tool_run'); };
  const options = (
    <>
      <optgroup label="Popular">{POPULAR.filter((c) => !data || data.rates[c]).map((c) => <option key={`p${c}`} value={c}>{c} – {name(c)}</option>)}</optgroup>
      <optgroup label="All currencies">{codes.map((c) => <option key={c} value={c}>{c} – {name(c)}</option>)}</optgroup>
    </>
  );

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-bold mb-4">Convert currency</h2>
      {err && <p role="alert" className="mb-3 bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{err}</p>}

      <div className="grid sm:grid-cols-[1fr_1fr_auto_1fr] gap-2 items-end">
        <label className="block text-sm"><span className="block text-xs font-medium text-fg-subtle mb-1">Amount</span>
          <input className="field w-full text-lg" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <label className="block text-sm"><span className="block text-xs font-medium text-fg-subtle mb-1">From</span>
          <select className="field w-full" value={from} onChange={pick(setFrom)}>{options}</select>
        </label>
        <button type="button" className="btn-ghost h-10" onClick={() => { setFrom(to); setTo(from); }} aria-label="Swap currencies" title="Swap">⇄</button>
        <label className="block text-sm"><span className="block text-xs font-medium text-fg-subtle mb-1">To</span>
          <select className="field w-full" value={to} onChange={pick(setTo)}>{options}</select>
        </label>
      </div>

      <div className="mt-4 rounded-xl p-4 ring-1 ring-line bg-tint/5" aria-live="polite">
        {rate && a != null ? (
          <>
            <p className="text-sm text-fg-muted">{fmt(a, from)} =</p>
            <p className="font-display text-3xl sm:text-4xl font-bold text-fg break-words">{fmt(a * rate, to)}</p>
            <p className="text-sm text-fg-muted mt-2">1 {from} = {fmtRate(rate)} {to} · 1 {to} = {fmtRate(1 / rate)} {from}</p>
          </>
        ) : <p className="text-sm text-fg-subtle">{data ? 'Enter an amount.' : 'Loading today\'s rates…'}</p>}
      </div>

      {rate && (
        <div className="grid sm:grid-cols-2 gap-3 mt-4">
          {[[from, to, rate], [to, from, 1 / rate]].map(([x, y, r]) => (
            <div key={x} className="overflow-hidden rounded-xl ring-1 ring-line">
              <table className="w-full text-sm">
                <thead className="bg-tint/5 text-xs text-fg-subtle"><tr><th className="px-3 py-1.5 text-left font-medium">{name(x)}</th><th className="px-3 py-1.5 text-right font-medium">{name(y)}</th></tr></thead>
                <tbody>{AMOUNTS.map((v) => <tr key={v} className="border-t border-line"><td className="px-3 py-1.5 font-mono">{fmt(v, x)}</td><td className="px-3 py-1.5 text-right font-mono">{fmt(v * r, y)}</td></tr>)}</tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        <a href="https://www.exchangerate-api.com" target="_blank" rel="noopener" className="hover:underline">Rates By Exchange Rate API</a>
        {data ? `, updated ${new Date(data.time_last_update_unix * 1000).toLocaleString(undefined, { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}` : ''}. These are mid-market reference rates, updated once a day; banks, cards and exchange offices add a margin or fee, so the rate you get will be lower.
      </p>
    </section>
  );
}
