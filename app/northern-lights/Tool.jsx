'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePlace, PlaceSearch } from '../components/usePlace.jsx';
import { track } from '../components/track.js';
import { compass } from '../distance-calculator/dist.js';
import { bearing } from '../earthquakes-near-me/quakes.js';
import { loadOvation, loadKp, chanceNear, auroraColor, kpWord, darkness } from './aurora.js';

const PointsMap = dynamic(() => import('../components/PointsMap.jsx'), {
  ssr: false,
  loading: () => <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading map" />,
});

const zoneOf = (lat, lon) => import('@photostructure/tz-lookup').then((m) => (m.default || m)(lat, lon));

function verdict(here, near, dark) {
  if (here >= 30 && dark) return ['Good chance tonight', 'Aurora is likely overhead right now. Get away from street lights and look up and north (south in the southern hemisphere).', '#16a34a'];
  if (near >= 20 && dark) return ['Possible, low on the horizon', 'Aurora is forecast within view. Find a dark spot with a clear view towards the pole and give your eyes 15 minutes to adjust; a phone camera often sees it first.', '#ca8a04'];
  if ((here >= 30 || near >= 20) && !dark) return ['Active, but not dark yet', 'The aurora is active near you, but the sky is too bright. Check again after dark; activity changes within the hour.', '#ca8a04'];
  if (near >= 5) return ['Unlikely right now', 'Only faint aurora is forecast within view. Only a camera on a long exposure might pick it up from a very dark spot.', '#64748b'];
  return ['Very unlikely right now', 'No aurora is forecast within view of this place at the moment.', '#64748b'];
}

export default function Tool() {
  const [ov, setOv] = useState(null);
  const [kp, setKp] = useState([]);
  const [err, setErr] = useState('');
  const [here, setHere] = useState(null);
  const [fitKey, setFitKey] = useState(0);

  useEffect(() => {
    loadOvation().then(setOv).catch((e) => setErr(e.message));
    loadKp().then(setKp).catch(() => {});
  }, []);

  const load = async (lat, lon, where) => {
    place.setStatus({ type: 'loading', msg: 'Checking the forecast…' });
    try {
      const tz = await zoneOf(lat, lon);
      setHere({ lat, lon, where, tz });
      setFitKey((k) => k + 1);
      place.setStatus({ type: 'ok', msg: '' });
      track('tool_run');
    } catch {
      place.setStatus({ type: 'err', msg: 'The time zone data did not load. Check your connection and try again.' });
    }
  };
  const place = usePlace(load);

  const points = useMemo(() => (ov
    ? ov.points.filter(([lon, , v]) => v >= 10 || (v >= 4 && lon % 2 === 0)).map(([lon, lat, v]) => ({ key: `${lon},${lat}`, lat, lon: lon > 180 ? lon - 360 : lon, color: auroraColor(v), r: v >= 10 ? 4 : 3 }))
    : []), [ov]);

  const c = ov && here ? chanceNear(ov, here.lat, here.lon) : null;
  const dk = here ? darkness(here.lat, here.lon) : null;
  const v = c ? verdict(c.here, c.near.v, dk.dark) : null;
  const local = (ms, opts) => new Date(ms).toLocaleString(undefined, { timeZone: here?.tz, ...opts });

  const days = useMemo(() => {
    const out = new Map();
    for (const s of kp) {
      if (s.at + 3 * 3600000 < Date.now() - 86400000) continue;
      const key = new Date(s.at).toISOString().slice(0, 10);
      if (!out.has(key)) out.set(key, []);
      out.get(key).push(s);
    }
    return [...out.entries()].slice(-4);
  }, [kp]);

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-bold mb-4">Can I see the northern lights tonight?</h2>
      <PlaceSearch place={place} button="Aurora near me" placeholder="Search a town, city or place" />
      {err && <p role="alert" className="my-2 bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{err}</p>}

      {c && place.status.type === 'ok' && (
        <div className="rounded-xl p-4 ring-1 ring-line bg-tint/5 mb-3">
          <p className="text-xs uppercase tracking-wide text-fg-subtle">Right now at {here.where}</p>
          <p className="mt-1 font-display text-2xl font-bold" style={{ color: v[2] }}>{v[0]}</p>
          <p className="text-sm text-fg-muted mt-1">{v[1]}</p>
          <dl className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
            <div className="rounded-lg ring-1 ring-line px-3 py-2"><dt className="text-xs text-fg-subtle">Chance overhead</dt><dd className="font-mono text-fg">{c.here}%</dd></div>
            <div className="rounded-lg ring-1 ring-line px-3 py-2"><dt className="text-xs text-fg-subtle">Strongest within ~800 km</dt><dd className="font-mono text-fg">{c.near.v}%{c.near.km > 0 ? <span className="font-sans text-fg-subtle"> · {Math.round(c.near.km)} km {compass(bearing(here.lat, here.lon, c.near.lat, c.near.lon))}</span> : ''}</dd></div>
            <div className="rounded-lg ring-1 ring-line px-3 py-2"><dt className="text-xs text-fg-subtle">Sky</dt><dd className="text-fg">{dk.dark ? `Dark${dk.until ? ` until ${local(dk.until, { hour: '2-digit', minute: '2-digit' })}` : ' all day'}` : dk.from ? `Dark from ${local(dk.from, { hour: '2-digit', minute: '2-digit' })}` : 'No real darkness today'}</dd></div>
          </dl>
        </div>
      )}

      <PointsMap center={here} points={points} fitKey={fitKey} fitPoints={false} zoom={4} onPick={(lat, lon) => load(lat, lon, 'the point you picked')} label="Aurora forecast map" start={[62, -20]} startZoom={2} centerTip="Your place" attribution="Aurora: NOAA SWPC" />
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-fg-subtle">
        <span>Chance of aurora overhead:</span>
        {[[4, 'under 10%'], [10, '10–29%'], [30, '30–49%'], [50, '50–69%'], [70, '70%+']].map(([x, l]) => (
          <span key={l} className="inline-flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: auroraColor(x) }} />{l}</span>
        ))}
        {ov && <span>· Forecast for {new Date(ov.forecast).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })} (your time)</span>}
      </div>

      {days.length > 0 && (
        <>
          <h3 className="text-base font-bold mt-6 mb-2">Kp index forecast, next 3 days</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {days.map(([day, slots]) => {
              const max = Math.max(...slots.map((s) => s.kp));
              return (
                <div key={day} className="rounded-xl ring-1 ring-line bg-tint/5 p-3">
                  <p className="text-xs text-fg-subtle">{new Date(`${day}T12:00:00Z`).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' })} (UTC)</p>
                  <p className="font-display text-xl font-bold text-fg">Kp {max.toFixed(1)}</p>
                  <p className="text-xs" style={{ color: max >= 5 ? '#dc2626' : max >= 4 ? '#ca8a04' : undefined }}>{kpWord(max)}</p>
                  <div className="mt-2 flex items-end gap-0.5 h-10" aria-hidden="true">
                    {slots.map((s) => (
                      <div key={s.at} title={`${new Date(s.at).toISOString().slice(11, 16)} UTC: Kp ${s.kp} (${s.kind})`} className="flex-1 rounded-sm" style={{ height: `${Math.max(8, (s.kp / 9) * 100)}%`, background: s.kp >= 5 ? '#dc2626' : s.kp >= 4 ? '#eab308' : '#22c55e', opacity: s.kind === 'predicted' ? 0.6 : 1 }} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-fg-subtle">Each bar is a 3-hour slot; paler bars are predictions. Kp 5 and above is a geomagnetic storm, when the aurora reaches further from the poles.</p>
        </>
      )}

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Aurora forecast (OVATION model, 30 to 90 minutes ahead) and Kp index from the <a href="https://www.swpc.noaa.gov/" target="_blank" rel="noopener" className="hover:underline">NOAA Space Weather Prediction Center</a>. Cloud cover is not included: check the <a href="/weather" className="hover:underline">weather</a> too. Your location stays on your device.
      </p>
    </section>
  );
}
