'use client';

import { useEffect, useMemo, useState } from 'react';
import { track } from '../components/track.js';

const API = 'https://date.nager.at/api/v3';
const UK = { 'GB-ENG': 'England', 'GB-WLS': 'Wales', 'GB-SCT': 'Scotland', 'GB-NIR': 'Northern Ireland' };
const DAY = 86400000;

// One retry: the first request sometimes drops on a flaky connection.
const load = (url) => fetch(url).catch(() => new Promise((r) => setTimeout(r, 1000)).then(() => fetch(url)));
const get = async (path) => {
  const res = await load(`${API}${path}`);
  if (res.status === 204) return [];
  if (!res.ok) throw new Error('The holiday data did not load. Try again in a minute.');
  return res.json();
};
const utc = (d) => Date.parse(`${d}T00:00:00Z`);
const show = (d, opts = { weekday: 'short', day: 'numeric', month: 'short' }) => new Date(utc(d)).toLocaleDateString(undefined, { ...opts, timeZone: 'UTC' });
const today = () => new Date().toLocaleDateString('en-CA');
const region = (c) => UK[c] || c.split('-').slice(1).join('-');

export default function Tool() {
  const [countries, setCountries] = useState([]);
  const [cc, setCc] = useState('');
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [hols, setHols] = useState(null);
  const [longs, setLongs] = useState([]);
  const [after, setAfter] = useState([]);
  const [err, setErr] = useState('');
  const [national, setNational] = useState(false);

  useEffect(() => {
    get('/AvailableCountries').then((list) => {
      setCountries(list.sort((a, b) => a.name.localeCompare(b.name)));
      const r = (navigator.language || '').split('-')[1]?.toUpperCase();
      setCc(list.some((c) => c.countryCode === r) ? r : 'US');
    }).catch((e) => setErr(e.message));
  }, []);

  useEffect(() => {
    if (!cc) return;
    let live = true;
    setHols(null);
    setErr('');
    // Next year's list too, for the "next holiday" box late in the year.
    Promise.all([get(`/PublicHolidays/${year}/${cc}`), get(`/LongWeekend/${year}/${cc}`).catch(() => []), get(`/PublicHolidays/${year + 1}/${cc}`).catch(() => [])])
      .then(([h, l, n]) => { if (live) { setHols(h); setLongs(l); setAfter(n); } })
      .catch((e) => live && setErr(e.message));
    return () => { live = false; };
  }, [cc, year]);

  const now = today();
  const list = useMemo(() => (hols || []).filter((h) => !national || h.global), [hols, national]);
  const next = list.find((h) => h.date >= now) || after.find((h) => h.date >= now && (!national || h.global));
  const days = next ? Math.round((utc(next.date) - utc(now)) / DAY) : null;
  const country = countries.find((c) => c.countryCode === cc)?.name || cc;
  const y0 = new Date().getFullYear();

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-bold mb-4">Public holidays by country</h2>
      <div className="grid sm:grid-cols-[2fr_1fr] gap-2">
        <label className="block text-sm"><span className="block text-xs font-medium text-fg-subtle mb-1">Country</span>
          <select className="field w-full" value={cc} onChange={(e) => { setCc(e.target.value); track('tool_run'); }}>
            {countries.map((c) => <option key={c.countryCode} value={c.countryCode}>{c.name}</option>)}
          </select>
        </label>
        <label className="block text-sm"><span className="block text-xs font-medium text-fg-subtle mb-1">Year</span>
          <select className="field w-full" value={year} onChange={(e) => setYear(Number(e.target.value))}>
            {[y0 - 1, y0, y0 + 1, y0 + 2].map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </label>
      </div>
      {err && <p role="alert" className="mt-3 bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{err}</p>}

      {next && year === y0 && (
        <div className="mt-4 rounded-xl p-4 ring-1 ring-line bg-tint/5">
          <p className="text-xs uppercase tracking-wide text-fg-subtle">Next public holiday in {country}</p>
          <p className="font-display text-2xl font-bold text-fg mt-1">{next.name}</p>
          <p className="text-sm text-fg-muted mt-1">
            {show(next.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}: {days === 0 ? 'today' : days === 1 ? 'tomorrow' : `in ${days} days`}
            {next.localName !== next.name ? ` · ${next.localName}` : ''}
            {!next.global && next.counties ? ` · ${next.counties.map(region).join(', ')} only` : ''}
          </p>
        </div>
      )}

      {hols && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-5 mb-2">
            <h3 className="text-base font-bold">{country} public holidays {year}</h3>
            {hols.some((h) => !h.global) && (
              <label className="inline-flex items-center gap-1.5 text-xs text-fg-subtle"><input type="checkbox" checked={national} onChange={(e) => setNational(e.target.checked)} /> Nationwide holidays only</label>
            )}
          </div>
          {list.length ? (
            <div className="overflow-x-auto rounded-xl ring-1 ring-line">
              <table className="w-full text-sm">
                <thead className="bg-tint/5 text-left text-xs text-fg-subtle"><tr><th className="px-3 py-2 font-medium">Date</th><th className="px-3 py-2 font-medium">Holiday</th><th className="px-3 py-2 font-medium">Where</th></tr></thead>
                <tbody>
                  {list.map((h) => (
                    <tr key={`${h.date}${h.name}${h.counties}`} className={`border-t border-line ${h.date < now ? 'text-fg-subtle' : ''} ${h === next ? 'bg-accent/5' : ''}`}>
                      <td className="px-3 py-2 whitespace-nowrap font-mono">{show(h.date)}</td>
                      <td className="px-3 py-2">{h.name}{h.localName !== h.name && <span className="block text-xs text-fg-subtle">{h.localName}</span>}{h.types?.some((t) => t !== 'Public') && <span className="block text-xs text-fg-subtle">{h.types.filter((t) => t !== 'Public').join(', ')}</span>}</td>
                      <td className="px-3 py-2 text-xs">{h.global ? 'Nationwide' : h.counties ? h.counties.map(region).join(', ') : 'Some regions'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="text-sm text-fg-subtle">No holidays listed for {country} in {year}.</p>}
        </>
      )}

      {longs.length > 0 && (
        <>
          <h3 className="text-base font-bold mt-6 mb-2">Long weekends in {year}</h3>
          <ul className="grid sm:grid-cols-2 gap-2">
            {longs.map((l) => (
              <li key={l.startDate} className={`rounded-xl ring-1 ring-line px-3 py-2 text-sm ${l.endDate < now ? 'opacity-60' : ''}`}>
                <span className="font-semibold text-fg">{l.dayCount} days off</span>: {show(l.startDate)} – {show(l.endDate)}
                {l.needBridgeDay && <span className="block text-xs text-fg-subtle">Take {l.bridgeDays?.length > 1 ? `${l.bridgeDays.length} days` : 'one day'} off{l.bridgeDays?.length ? ` (${l.bridgeDays.map((d) => show(d.slice(0, 10), { weekday: 'short', day: 'numeric', month: 'short' })).join(', ')})` : ''}</span>}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-fg-subtle">Based on nationwide holidays and a Monday to Friday working week.</p>
        </>
      )}

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Holiday data from <a href="https://date.nager.at/" target="_blank" rel="noopener" className="hover:underline">Nager.Date</a>, an open-source holiday database. Governments sometimes add or move holidays at short notice; for work or travel that depends on a date, check the official announcement.
      </p>
    </section>
  );
}
