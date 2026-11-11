'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePlace, PlaceSearch } from '../components/usePlace.jsx';
import { track } from '../components/track.js';
import { compass } from '../distance-calculator/dist.js';
import { quakesNear, magColor, magWord, ago, inNZ } from './quakes.js';

const PointsMap = dynamic(() => import('../components/PointsMap.jsx'), {
  ssr: false,
  loading: () => <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading map" />,
});

const RADII = [100, 300, 500, 1000];
const PERIODS = [[1, 'Past 24 hours'], [7, 'Past 7 days'], [30, 'Past 30 days']];
const MAGS = [[1, 'M1+ (all)'], [2.5, 'M2.5+'], [4, 'M4+'], [5, 'M5+']];

const fmtKm = (km, miles) => (miles ? `${Math.round(km / 1.609344).toLocaleString()} mi` : `${Math.round(km).toLocaleString()} km`);
const when = (t) => new Date(t).toLocaleString(undefined, { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

export default function Tool() {
  const [center, setCenter] = useState(null);
  const [opts, setOpts] = useState({ radiusKm: 500, days: 7, minMag: 2.5 });
  const [quakes, setQuakes] = useState(null);
  const [fitKey, setFitKey] = useState(0);
  const [focus, setFocus] = useState(null);
  const [miles, setMiles] = useState(false);

  const load = async (lat, lon, where, o = opts) => {
    setCenter({ lat, lon, where });
    setFocus(null);
    place.setStatus({ type: 'loading', msg: 'Loading earthquakes…' });
    try {
      setQuakes(await quakesNear(lat, lon, o));
      place.setStatus({ type: 'ok', msg: '' });
      setFitKey((k) => k + 1);
      track('tool_run');
    } catch (err) {
      setQuakes(null);
      place.setStatus({ type: 'err', msg: err.message });
    }
  };
  const place = usePlace((lat, lon, where) => load(lat, lon, where));

  const change = (k) => (e) => {
    const o = { ...opts, [k]: Number(e.target.value) };
    setOpts(o);
    if (center) load(center.lat, center.lon, center.where, o);
  };

  const stats = useMemo(() => {
    if (!quakes?.length) return null;
    const largest = quakes.reduce((a, b) => (b.mag > a.mag ? b : a));
    const nearest = quakes.reduce((a, b) => (b.km < a.km ? b : a));
    return { largest, nearest, latest: quakes[0] };
  }, [quakes]);

  const points = useMemo(() => (quakes || []).map((q) => ({
    key: q.id,
    lat: q.lat,
    lon: q.lon,
    color: magColor(q.mag),
    r: Math.max(4, Math.min(18, 2 + q.mag * 2.2)),
    tip: `M${q.mag.toFixed(1)} · ${q.place} · ${ago(q.time)}`,
  })), [quakes]);

  const where = center?.where || 'this point';
  const period = PERIODS.find(([d]) => d === opts.days)[1].toLowerCase();
  const sel = 'field w-auto py-1.5 text-sm';

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-bold mb-4">Recent earthquakes near a place</h2>

      <PlaceSearch place={place} button="Earthquakes near me" placeholder="Search a city, address or region" />

      <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-fg-muted">
        <label className="inline-flex items-center gap-2">Within
          <select className={sel} value={opts.radiusKm} onChange={change('radiusKm')}>
            {RADII.map((r) => <option key={r} value={r}>{fmtKm(r, miles)}</option>)}
          </select>
        </label>
        <select className={sel} value={opts.days} onChange={change('days')} aria-label="Time period">
          {PERIODS.map(([d, l]) => <option key={d} value={d}>{l}</option>)}
        </select>
        <select className={sel} value={opts.minMag} onChange={change('minMag')} aria-label="Smallest magnitude">
          {MAGS.map(([m, l]) => <option key={m} value={m}>{l}</option>)}
        </select>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={miles} onChange={(e) => setMiles(e.target.checked)} /> Miles
        </label>
      </div>

      {quakes && place.status.type === 'ok' && (
        <div className="rounded-xl p-4 mb-3 border bg-tint/5 border-line">
          <p className="font-semibold text-fg">
            {quakes.length
              ? `${quakes.length.toLocaleString()} earthquake${quakes.length === 1 ? '' : 's'} of magnitude ${opts.minMag}+ within ${fmtKm(opts.radiusKm, miles)} of ${where} in the ${period}.`
              : `No earthquakes of magnitude ${opts.minMag}+ within ${fmtKm(opts.radiusKm, miles)} of ${where} in the ${period}.`}
          </p>
          {stats && (
            <dl className="grid sm:grid-cols-3 gap-3 mt-3 text-sm">
              {[['Largest', stats.largest], ['Nearest', stats.nearest], ['Most recent', stats.latest]].map(([k, q]) => (
                <div key={k}>
                  <dt className="text-xs uppercase tracking-wide text-fg-subtle">{k}</dt>
                  <dd className="text-fg"><span className="font-mono font-semibold">M{q.mag.toFixed(1)}</span>, {fmtKm(q.km, miles)} {compass(q.dir)}, {ago(q.time)}</dd>
                </div>
              ))}
            </dl>
          )}
          {!quakes.length && <p className="text-sm text-fg-muted mt-1">Try a wider radius, a longer period or a smaller magnitude.</p>}
          {!inNZ(center.lat, center.lon) && opts.minMag < 4 && (
            <p className="text-xs text-fg-subtle mt-2">Outside the United States, the worldwide catalogue usually lists quakes from about magnitude 4 to 4.5 upwards; smaller ones are recorded by national agencies.</p>
          )}
        </div>
      )}

      <PointsMap center={center} points={points} radius={quakes ? opts.radiusKm * 1000 : null} fitKey={fitKey} focus={focus} onPick={(lat, lon) => load(lat, lon, '')} label="Map of recent earthquakes" centerTip="Your search point" attribution="Earthquakes: USGS, GeoNet" />
      <p className="mt-2 text-xs text-fg-subtle">Bigger, darker circles are stronger quakes. Click the map to search somewhere else.</p>

      <ul className="mt-3 flex flex-wrap gap-3 text-xs text-fg-muted" aria-label="Magnitude colours">
        {[[2, '2–3'], [3, '3–4'], [4, '4–5'], [5, '5–6'], [6, '6–7'], [7, '7+']].map(([m, l]) => (
          <li key={m} className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: magColor(m) }} aria-hidden="true" />M{l}</li>
        ))}
      </ul>

      {quakes?.length > 0 && (
        <ol className="mt-5 space-y-2">
          {quakes.slice(0, 25).map((q) => (
            <li key={q.id} className="rounded-xl ring-1 ring-line p-3 bg-tint/5 flex gap-3 items-start">
              <span className="shrink-0 w-14 text-center rounded-lg py-1.5 font-mono font-bold text-white" style={{ background: magColor(q.mag) }}>
                {q.mag.toFixed(1)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-fg">{q.place}</p>
                <p className="text-sm text-fg-muted">
                  {magWord(q.mag)} · {when(q.time)} ({ago(q.time)}) · {Math.round(q.depth)} km deep
                </p>
                <p className="text-sm text-fg-muted">
                  <span className="font-mono text-fg">{fmtKm(q.km, miles)} {compass(q.dir)}</span> of {where}
                  {q.felt ? ` · felt by ${q.felt.toLocaleString()} people who reported it` : ''}
                  {q.tsunami ? ' · in a tsunami-capable zone; check official warnings' : ''}
                </p>
                <div className="mt-1 flex flex-wrap gap-x-4 text-sm">
                  <button type="button" onClick={() => setFocus(q)} className="text-accent hover:underline">Show on map</button>
                  <a href={q.url} target="_blank" rel="noopener" className="text-accent hover:underline">Details on {q.source}</a>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
      {quakes?.length > 25 && <p className="mt-2 text-sm text-fg-subtle">Showing the 25 most recent of {quakes.length.toLocaleString()}; all are on the map.</p>}

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Earthquakes from the <a href="https://earthquake.usgs.gov/" target="_blank" rel="noopener" className="hover:underline">USGS</a> catalogue, updated within minutes, and in New Zealand also from <a href="https://www.geonet.org.nz/" target="_blank" rel="noopener" className="hover:underline">GeoNet</a>. Magnitudes of the newest quakes can be revised. Times are in your device&rsquo;s time zone. Your position is rounded to about 1 km before it is sent. This is not a warning service: in an emergency follow your local civil defence.
      </p>
    </section>
  );
}
