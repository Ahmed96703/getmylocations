'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePlace, PlaceSearch } from '../components/usePlace.jsx';
import { track } from '../components/track.js';
import { compass } from '../distance-calculator/dist.js';
import { bearing } from '../earthquakes-near-me/quakes.js';

const PointsMap = dynamic(() => import('../components/PointsMap.jsx'), {
  ssr: false,
  loading: () => <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading map" />,
});

// [below °C, label, colour, advice]
const FEEL = [
  [10, 'Very cold', '#1d4ed8', 'Cold water shock can make you gasp and lose control of your breathing in the first minute. Only for experienced cold-water swimmers; a wetsuit is essential for anyone else.'],
  [15, 'Cold', '#2563eb', 'Bracing. A wetsuit is a good idea for more than a quick dip, and get out before you start to shiver.'],
  [18, 'Cool', '#0891b2', 'Fine for a swim once you are in, though many people still wear a wetsuit for longer swims.'],
  [22, 'Pleasant', '#059669', 'Comfortable for most people for a proper swim.'],
  [26, 'Warm', '#ca8a04', 'Warm and easy to stay in for a long time.'],
  [Infinity, 'Very warm', '#ea580c', 'Bath-like, tropical water; it barely cools you down.'],
];
const feel = (c) => FEEL.find(([max]) => c < max);

async function seaTemp(lat, lon) {
  const res = await fetch(`/api/sst?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}`);
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new Error('The satellite data service is busy. Try again in a minute.');
  return body;
}

export default function Tool() {
  const [center, setCenter] = useState(null);
  const [data, setData] = useState(null);
  const [us, setUs] = useState(false);
  const [fitKey, setFitKey] = useState(0);

  const load = async (lat, lon, where) => {
    setCenter({ lat, lon, where });
    setData(null);
    place.setStatus({ type: 'loading', msg: 'Reading the satellite data (this can take up to 20 seconds)…' });
    try {
      const d = await seaTemp(lat, lon);
      setData(d);
      setFitKey((k) => k + 1);
      place.setStatus({ type: 'ok', msg: '' });
      track('tool_run');
    } catch (err) {
      place.setStatus({ type: 'err', msg: err.message });
    }
  };
  const place = usePlace(load);

  const deg = (c) => `${(us ? c * 1.8 + 32 : c).toFixed(1)} °${us ? 'F' : 'C'}`;
  const latest = data?.sea ? data.series.at(-1) : null;
  const f = latest && feel(latest[1]);
  const first = data?.sea ? data.series[0] : null;
  const change = latest && first ? latest[1] - first[1] : 0;
  const points = useMemo(() => (data?.sea ? [{ key: 'sea', lat: data.lat, lon: data.lon, color: feel(data.series.at(-1)[1])[2], r: 9, tip: `Sea temperature here: ${data.series.at(-1)[1]} °C` }] : []), [data]);

  const chart = useMemo(() => {
    if (!data?.sea || data.series.length < 2) return null;
    const v = data.series.map((s) => s[1]);
    const lo = Math.floor(Math.min(...v) - 0.5);
    const hi = Math.ceil(Math.max(...v) + 0.5);
    const x = (i) => 8 + (i / (v.length - 1)) * 284;
    const y = (t) => 8 + (1 - (t - lo) / (hi - lo)) * 84;
    return { path: v.map((t, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(t).toFixed(1)}`).join(' '), lo, hi, dots: v.map((t, i) => [x(i), y(t)]) };
  }, [data]);

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">Sea temperature at a beach or coast</h2>
        <label className="inline-flex items-center gap-1.5 text-sm text-fg-muted"><input type="checkbox" checked={us} onChange={(e) => setUs(e.target.checked)} /> °F</label>
      </div>
      <PlaceSearch place={place} button="Sea temperature near me" placeholder="Search a beach, resort or coastal town" />

      {data && place.status.type === 'ok' && (
        data.sea ? (
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div className="rounded-xl p-4 ring-1 ring-line bg-tint/5">
              <p className="text-xs uppercase tracking-wide text-fg-subtle">Sea temperature{center?.where ? ` near ${center.where}` : ''}</p>
              <p className="mt-1 flex items-baseline gap-2"><span className="font-display text-4xl font-bold text-fg">{deg(latest[1])}</span><span className="font-semibold" style={{ color: f[2] }}>{f[1]}</span></p>
              <p className="text-sm text-fg-muted mt-2">{f[3]}</p>
              <p className="text-xs text-fg-subtle mt-2">
                Measured {new Date(`${latest[0]}T12:00:00Z`).toLocaleDateString(undefined, { day: 'numeric', month: 'long', timeZone: 'UTC' })}, {data.km < 1 ? 'at this point' : `${data.km.toFixed(1)} km ${compass(bearing(center.lat, center.lon, data.lat, data.lon))} of your point, the nearest open water with data`}.
              </p>
            </div>
            <div className="rounded-xl p-4 ring-1 ring-line bg-tint/5">
              <p className="text-xs uppercase tracking-wide text-fg-subtle">Last 30 days</p>
              <p className="mt-1 text-sm text-fg">
                {Math.abs(change) < 0.3 ? 'Steady' : change > 0 ? `Warming: up ${(us ? change * 1.8 : change).toFixed(1)}°` : `Cooling: down ${(us ? -change * 1.8 : -change).toFixed(1)}°`} since {new Date(`${first[0]}T12:00:00Z`).toLocaleDateString(undefined, { day: 'numeric', month: 'short', timeZone: 'UTC' })}
              </p>
              {chart && (
                <svg viewBox="0 0 300 100" className="w-full h-24 mt-2" role="img" aria-label={`Sea temperature over the last 30 days, from ${deg(first[1])} to ${deg(latest[1])}`}>
                  <text x="2" y="12" className="fill-current text-fg-subtle" fontSize="9">{deg(chart.hi)}</text>
                  <text x="2" y="98" className="fill-current text-fg-subtle" fontSize="9">{deg(chart.lo)}</text>
                  <path d={chart.path} fill="none" stroke="#0891b2" strokeWidth="2" />
                  {chart.dots.map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="2.5" fill="#0891b2" />)}
                </svg>
              )}
            </div>
          </div>
        ) : (
          <p className="my-3 rounded-lg bg-amber-500/10 border border-amber-400/30 text-amber-700 dark:text-amber-300 p-3 text-sm">
            No sea within about 25 km of {center?.where || 'that point'}. Search for a coastal town or beach, or click the sea on the map. Lakes are not covered.
          </p>
        )
      )}

      <PointsMap center={center} points={points} fitKey={fitKey} zoom={9} onPick={(lat, lon) => load(lat, lon, '')} label="Map: click the sea to check its temperature" centerTip="Your point" attribution="SST: NASA JPL MUR via NOAA" />
      <p className="mt-2 text-xs text-fg-subtle">Click anywhere on the sea to check it.</p>

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Sea surface temperature from the NASA JPL MUR analysis (a daily blend of satellite and buoy measurements on a 1 km grid), served by <a href="https://coastwatch.pfeg.noaa.gov/erddap/" target="_blank" rel="noopener" className="hover:underline">NOAA CoastWatch</a>. It is the temperature just below the surface, free of daytime warming, so shallow bays can feel a degree or two warmer on a sunny afternoon. Data usually lags by a day.
      </p>
    </section>
  );
}
