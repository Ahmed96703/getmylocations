'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePlace, PlaceSearch } from '../components/usePlace.jsx';
import { track } from '../components/track.js';
import { months, crimesNear, forceAt, summarize, label, color, monthName, inUK } from './crime.js';

const PointsMap = dynamic(() => import('../components/PointsMap.jsx'), {
  ssr: false,
  loading: () => <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading map" />,
});

const MILE = 1609.344;
const fmt = (n) => n.toLocaleString('en-GB');

export default function Tool() {
  const [center, setCenter] = useState(null);
  const [list, setList] = useState([]);
  const [month, setMonth] = useState('');
  const [crimes, setCrimes] = useState(null);
  const [cat, setCat] = useState('');
  const [force, setForce] = useState(null);
  const [fitKey, setFitKey] = useState(0);

  useEffect(() => {
    months().then((m) => { setList(m.slice(0, 12)); setMonth(m[0]); }).catch(() => {});
  }, []);

  const load = async (lat, lon, where, m = month) => {
    setCenter({ lat, lon, where });
    setCat('');
    setFitKey((k) => k + 1);
    if (!inUK(lat, lon)) {
      setCrimes(null);
      place.setStatus({ type: 'err', msg: 'police.uk only covers the United Kingdom. Search a UK town or postcode.' });
      return;
    }
    place.setStatus({ type: 'loading', msg: 'Loading crimes from police.uk…' });
    try {
      const data = await crimesNear(lat, lon, m);
      setForce(data.length ? null : await forceAt(lat, lon));
      setCrimes(data);
      place.setStatus({ type: 'ok', msg: '' });
      track('tool_run');
    } catch (err) {
      setCrimes(null);
      place.setStatus({ type: 'err', msg: err.message });
    }
  };
  const place = usePlace((lat, lon, where) => load(lat, lon, where));

  const sum = useMemo(() => (crimes ? summarize(crimes) : null), [crimes]);
  const shown = useMemo(() => {
    if (!sum) return [];
    return sum.points
      .map((p) => {
        const n = cat ? p.cats[cat] || 0 : p.n;
        return n ? { key: `${p.lat},${p.lon}`, lat: p.lat, lon: p.lon, color: color(cat || p.top), r: Math.min(14, 4 + Math.sqrt(n) * 1.6), tip: `${p.street}: ${n} crime${n === 1 ? '' : 's'}${cat ? '' : `, mostly ${label(p.top).toLowerCase()}`}` } : null;
      })
      .filter(Boolean);
  }, [sum, cat]);

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">Crimes within 1 mile of a place</h2>
        <label className="text-sm text-fg-muted inline-flex items-center gap-2">
          Month
          <select className="field w-auto py-1.5 text-sm" value={month} onChange={(e) => { setMonth(e.target.value); if (center) load(center.lat, center.lon, center.where, e.target.value); }} aria-label="Month">
            {list.map((m) => <option key={m} value={m}>{monthName(m)}</option>)}
          </select>
        </label>
      </div>

      <PlaceSearch place={place} button="Crime near me" placeholder="Search a UK postcode, street or town" />

      {sum && place.status.type === 'ok' && (
        sum.total === 0 ? (
          <p className="rounded-xl p-4 mb-3 border bg-tint/5 border-line text-sm text-fg-muted">
            No crimes returned for {monthName(month)} within a mile of {center.where || 'this point'}.{' '}
            {force
              ? <>This area is covered by <strong className="text-fg">{force.name}</strong>, which has not published street-level crime for {monthName(month)} to police.uk. Try an earlier month; if every month is empty, the force is not currently sending its data, and its own website is the place to look.</>
              : <>No police force publishing to police.uk covers this point. Police Scotland does not publish street-level crime, so places in Scotland always show none; it publishes its own statistics by council area.</>}
          </p>
        ) : (
          <div className="rounded-xl p-4 mb-3 border bg-tint/5 border-line">
            <p className="font-semibold text-fg">
              {fmt(sum.total)} crimes reported within 1 mile of {center.where || 'this point'} in {monthName(month)}.
            </p>
            <p className="text-xs text-fg-subtle mt-1">Click a category to show only that on the map. Dots mark the anonymous points police.uk uses, not exact addresses.</p>
          </div>
        )
      )}

      <PointsMap center={center} points={shown} radius={center && sum?.total ? MILE : null} fitKey={fitKey} onPick={(lat, lon) => load(lat, lon, '')} label="Map of reported crimes" start={[54.5, -3]} startZoom={5} attribution="Crime data: police.uk" />
      <p className="mt-2 text-xs text-fg-subtle">Click the map to check another spot. Bigger dots mean more crimes at that point.</p>

      {sum?.total > 0 && (
        <div className="grid lg:grid-cols-2 gap-5 mt-5">
          <div>
            <h3 className="text-sm font-semibold mb-2">By type of crime</h3>
            <ul className="space-y-1">
              {sum.cats.map(([c, n]) => (
                <li key={c}>
                  <button type="button" onClick={() => setCat(cat === c ? '' : c)} aria-pressed={cat === c} className={`w-full text-left rounded-lg px-2 py-1.5 transition ${cat === c ? 'bg-accent/15' : 'hover:bg-accent/10'}`}>
                    <span className="flex justify-between text-sm"><span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: color(c) }} aria-hidden="true" />{label(c)}</span><span className="font-mono">{fmt(n)} <span className="text-fg-subtle">({Math.round((n / sum.total) * 100)}%)</span></span></span>
                    <span className="block h-1.5 mt-1 rounded bg-tint/10"><span className="block h-1.5 rounded" style={{ width: `${(n / sum.cats[0][1]) * 100}%`, background: color(c) }} /></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-2">Streets with the most reports</h3>
            <ol className="text-sm space-y-1 text-fg-muted">
              {sum.streets.slice(0, 10).map(([s, n]) => (
                <li key={s} className="flex justify-between gap-3 border-b border-line-subtle py-1"><span>{s}</span><span className="font-mono text-fg">{fmt(n)}</span></li>
              ))}
            </ol>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Data from <a href="https://data.police.uk/" target="_blank" rel="noopener" className="hover:underline">data.police.uk</a>, published by the Home Office under the Open Government Licence. Forces publish each month about two months later. Your position is rounded to about 100 m before it is sent.
      </p>
    </section>
  );
}
