'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePlace, PlaceSearch } from '../components/usePlace.jsx';
import { track } from '../components/track.js';
import { compass } from '../distance-calculator/dist.js';
import { bearing } from '../earthquakes-near-me/quakes.js';
import { warningsNear, gaugesNear, inEngland, SEVERITY } from './floods.js';

const PointsMap = dynamic(() => import('../components/PointsMap.jsx'), {
  ssr: false,
  loading: () => <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading map" />,
});

const RADII = [10, 25, 50];
const STATE = {
  high: ['Above normal range', 'text-rose-600 dark:text-rose-400', '#dc2626'],
  normal: ['Within normal range', 'text-emerald-600 dark:text-emerald-400', '#16a34a'],
  low: ['Below normal range', 'text-sky-600 dark:text-sky-400', '#0284c7'],
  unknown: ['No normal range published', 'text-fg-subtle', '#64748b'],
};
const when = (iso) => (iso ? new Date(iso).toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '');

export default function Tool() {
  const [center, setCenter] = useState(null);
  const [km, setKm] = useState(25);
  const [warnings, setWarnings] = useState(null);
  const [gauges, setGauges] = useState([]);
  const [fitKey, setFitKey] = useState(0);
  const [focus, setFocus] = useState(null);

  const load = async (lat, lon, where, r = km) => {
    setCenter({ lat, lon, where });
    setFocus(null);
    if (!inEngland(lat, lon)) {
      setWarnings(null);
      setGauges([]);
      place.setStatus({ type: 'err', msg: 'This service covers England. For Wales, Scotland and Northern Ireland, use the links below the map.' });
      return;
    }
    place.setStatus({ type: 'loading', msg: 'Checking Environment Agency warnings and river levels…' });
    try {
      const [w, g] = await Promise.all([warningsNear(lat, lon, r), gaugesNear(lat, lon).catch(() => [])]);
      setWarnings(w);
      setGauges(g);
      place.setStatus({ type: 'ok', msg: '' });
      setFitKey((k) => k + 1);
      track('tool_run');
    } catch (err) {
      setWarnings(null);
      place.setStatus({ type: 'err', msg: err.message });
    }
  };
  const place = usePlace((lat, lon, where) => load(lat, lon, where));

  const active = (warnings || []).filter((w) => w.level < 4);
  const counts = [1, 2, 3].map((l) => active.filter((w) => w.level === l).length);
  const points = useMemo(() => [
    ...(warnings || []).filter((w) => w.lat != null).map((w) => ({ key: `w${w.id}`, lat: w.lat, lon: w.lon, color: SEVERITY[w.level]?.color, r: 10, tip: `${SEVERITY[w.level]?.label}: ${w.title}` })),
    ...gauges.map((g) => ({ key: `g${g.ref}`, lat: g.lat, lon: g.lon, color: STATE[g.state][2], r: 5, tip: `${g.name}${g.river ? ` (${g.river})` : ''}: ${g.value != null ? `${g.value.toFixed(2)} ${g.unit}` : 'no reading'}, ${STATE[g.state][0].toLowerCase()}` })),
  ], [warnings, gauges]);

  const where = center?.where || 'this point';
  const worst = active[0];

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">Flood warnings and river levels near a place</h2>
        <label className="text-sm text-fg-muted inline-flex items-center gap-2">
          Within
          <select className="field w-auto py-1.5 text-sm" value={km} onChange={(e) => { const r = Number(e.target.value); setKm(r); if (center) load(center.lat, center.lon, center.where, r); }}>
            {RADII.map((r) => <option key={r} value={r}>{r} km ({Math.round(r / 1.609)} miles)</option>)}
          </select>
        </label>
      </div>

      <PlaceSearch place={place} button="Floods near me" placeholder="Search a postcode, town or street in England" />

      {warnings && place.status.type === 'ok' && (
        <div className="rounded-xl p-4 mb-3 border" style={{ borderColor: worst ? SEVERITY[worst.level].color : undefined, background: worst ? `${SEVERITY[worst.level].color}14` : undefined }}>
          {active.length ? (
            <>
              <p className="font-semibold text-fg">
                {[1, 2, 3].map((l, i) => counts[i] ? `${counts[i]} ${SEVERITY[l].label.toLowerCase()}${counts[i] > 1 ? 's' : ''}` : null).filter(Boolean).join(', ')} in force within {km} km of {where}.
              </p>
              <p className="text-sm text-fg-muted mt-1">{SEVERITY[worst.level].advice}</p>
            </>
          ) : (
            <p className="font-semibold text-fg">No flood warnings or alerts in force within {km} km of {where} right now.</p>
          )}
          <p className="text-xs text-fg-subtle mt-2">Updated every 15 minutes by the Environment Agency. If you are in danger, call 999.</p>
        </div>
      )}

      <PointsMap center={center} points={points} radius={warnings ? km * 1000 : null} fitKey={fitKey} focus={focus} onPick={(lat, lon) => load(lat, lon, '')} label="Map of flood warnings and river gauges" start={[52.8, -1.6]} startZoom={6} attribution="Environment Agency" />
      <ul className="mt-2 flex flex-wrap gap-3 text-xs text-fg-muted" aria-label="Map key">
        {[1, 2, 3].map((l) => <li key={l} className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-full" style={{ background: SEVERITY[l].color }} aria-hidden="true" />{SEVERITY[l].label}</li>)}
        <li className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-600" aria-hidden="true" />River gauge, normal</li>
        <li className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-600" aria-hidden="true" />River gauge, high</li>
      </ul>

      {(warnings || []).length > 0 && (
        <ol className="mt-5 space-y-3">
          {warnings.map((w) => (
            <li key={w.id} className="rounded-xl ring-1 ring-line p-4 bg-tint/5">
              <p className="text-xs font-bold uppercase tracking-wide" style={{ color: SEVERITY[w.level]?.color }}>{SEVERITY[w.level]?.label}</p>
              <h3 className="font-semibold text-fg mt-0.5">{w.title}</h3>
              <p className="text-sm text-fg-muted">
                {[w.river, w.county].filter(Boolean).join(' · ')}
                {w.km != null && center ? ` · area centre ${w.km.toFixed(1)} km ${compass(bearing(center.lat, center.lon, w.lat, w.lon))}` : ''}
              </p>
              {w.message && <p className="text-sm text-fg-muted mt-2 whitespace-pre-line line-clamp-6">{w.message}</p>}
              <div className="mt-2 flex flex-wrap gap-x-4 text-sm">
                <span className="text-fg-subtle">Updated {when(w.changed || w.raised)}</span>
                {w.lat != null && <button type="button" onClick={() => setFocus({ lat: w.lat, lon: w.lon })} className="text-accent hover:underline">Show on map</button>}
                <a href={w.url} target="_blank" rel="noopener" className="text-accent hover:underline">Full warning on GOV.UK</a>
              </div>
            </li>
          ))}
        </ol>
      )}

      {gauges.length > 0 && (
        <>
          <h3 className="text-sm font-semibold mt-6 mb-2">Nearest river and sea level gauges</h3>
          <div className="overflow-x-auto rounded-xl ring-1 ring-line" tabIndex={0} role="region" aria-label="River levels">
            <table className="w-full text-sm">
              <thead><tr className="bg-tint/5 text-left text-fg-muted">{['Gauge', 'Latest level', 'Normal range', 'Status', ''].map((h) => <th key={h} className="px-3 py-2 font-semibold">{h}</th>)}</tr></thead>
              <tbody>
                {gauges.map((g) => (
                  <tr key={g.ref} className="border-t border-line-subtle">
                    <td className="px-3 py-2"><span className="font-medium text-fg">{g.name}</span>{g.river && <span className="block text-xs text-fg-subtle">{g.river} · {g.km.toFixed(1)} km away</span>}</td>
                    <td className="px-3 py-2 font-mono whitespace-nowrap">{g.value != null ? `${g.value.toFixed(2)} m` : '—'}<span className="block text-xs text-fg-subtle font-sans">{when(g.at)}</span></td>
                    <td className="px-3 py-2 font-mono whitespace-nowrap">{g.low != null ? `${g.low.toFixed(2)}–${g.high.toFixed(2)} m` : '—'}</td>
                    <td className={`px-3 py-2 font-medium ${STATE[g.state][1]}`}>{STATE[g.state][0]}</td>
                    <td className="px-3 py-2"><a href={g.url} target="_blank" rel="noopener" className="text-accent hover:underline whitespace-nowrap">Graph</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-fg-subtle">Levels are in metres against each gauge&rsquo;s own reference, so compare a gauge with its own normal range, not with other gauges.</p>
        </>
      )}

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Flood warnings and river levels in England from the <a href="https://environment.data.gov.uk/flood-monitoring/doc/reference" target="_blank" rel="noopener" className="hover:underline">Environment Agency</a> real-time API (Open Government Licence). Elsewhere in the UK: <a href="https://naturalresources.wales/flooding" target="_blank" rel="noopener" className="hover:underline">Natural Resources Wales</a>, <a href="https://floodline.sepa.org.uk/" target="_blank" rel="noopener" className="hover:underline">SEPA Floodline (Scotland)</a>, <a href="https://www.nidirect.gov.uk/articles/flooding" target="_blank" rel="noopener" className="hover:underline">nidirect (Northern Ireland)</a>. Floodline: 0345 988 1188. Your position is rounded to about 100 m before it is sent.
      </p>
    </section>
  );
}
