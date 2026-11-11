'use client';

import { useMemo, useState } from 'react';
import { usePlace, PlaceSearch } from '../components/usePlace.jsx';
import { track } from '../components/track.js';
import { compass } from '../distance-calculator/dist.js';
import { sunTimes, sunPosition, dayLength, duration, todayIn, localNoon, tzOffset } from './sun.js';

const DAY = 86400000;

// The time zone of a point, loaded on first use (the boundary data is ~70 KB).
const zoneOf = (lat, lon) => import('@photostructure/tz-lookup').then((m) => (m.default || m)(lat, lon));

const offsetLabel = (min) => `UTC${min < 0 ? '−' : '+'}${Math.floor(Math.abs(min) / 60)}${Math.abs(min) % 60 ? `:${String(Math.abs(min) % 60).padStart(2, '0')}` : ''}`;
const shiftDate = (date, days) => new Date(Date.parse(`${date}T12:00:00Z`) + days * DAY).toISOString().slice(0, 10);

export default function Tool() {
  const [loc, setLoc] = useState(null);
  const [date, setDate] = useState('');
  const [h24, setH24] = useState(false);

  const place = usePlace(async (lat, lon, where) => {
    place.setStatus({ type: 'loading', msg: 'Finding the time zone…' });
    try {
      const tz = await zoneOf(lat, lon);
      setLoc({ lat, lon, where, tz });
      setDate(todayIn(tz));
      place.setStatus({ type: 'ok', msg: '' });
      track('tool_run');
    } catch {
      place.setStatus({ type: 'err', msg: 'The time zone data did not load. Check your connection and try again.' });
    }
  });

  const time = (ms) => (ms == null ? '—' : new Date(ms).toLocaleTimeString(h24 ? 'en-GB' : 'en-US', { timeZone: loc.tz, hour: 'numeric', minute: '2-digit', hour12: !h24 }));

  const day = useMemo(() => {
    if (!loc || !date) return null;
    const noon = localNoon(date, loc.tz);
    const t = sunTimes(noon, loc.lat, loc.lon);
    const prev = sunTimes(localNoon(shiftDate(date, -1), loc.tz), loc.lat, loc.lon);
    return { t, len: dayLength(t), change: dayLength(t) - dayLength(prev), offset: tzOffset(noon, loc.tz) };
  }, [loc, date]);

  const month = useMemo(() => {
    if (!loc || !date) return [];
    const [y, m] = date.split('-').map(Number);
    const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
    return Array.from({ length: days }, (_, i) => {
      const d = `${y}-${String(m).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
      const t = sunTimes(localNoon(d, loc.tz), loc.lat, loc.lon);
      return { d, t, len: dayLength(t) };
    });
  }, [loc, date]);

  const isToday = loc && date === todayIn(loc.tz);
  const now = isToday ? sunPosition(Date.now(), loc.lat, loc.lon) : null;
  const t = day?.t;
  const polar = t && !t.sun ? (t.sunUp ? 'The sun does not set on this day (midnight sun).' : 'The sun does not rise on this day (polar night).') : '';
  const change = day && Math.round(day.change / 1000);
  const longDate = date && new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

  const twilight = t && [
    ['Astronomical dawn', t.astro?.[0], 'Sky fully dark until now; stars fade after'],
    ['Nautical dawn', t.nautical?.[0], 'Horizon becomes visible at sea'],
    ['Civil dawn (first light)', t.civil?.[0], 'Bright enough to see outdoors without lights'],
    ['Sunrise', t.sun?.[0], 'Top of the sun appears on the horizon'],
    ['Morning golden hour ends', t.golden?.[0], 'Soft, warm light for photos until now'],
    ['Solar noon', t.noon, `Sun at its highest, ${Math.max(t.maxAltitude, -90).toFixed(1)}° above the horizon`],
    ['Evening golden hour starts', t.golden?.[1], 'Warm, low light until sunset'],
    ['Sunset', t.sun?.[1], 'Sun fully below the horizon'],
    ['Civil dusk (last light)', t.civil?.[1], 'Street lights needed after this'],
    ['Nautical dusk', t.nautical?.[1], 'Horizon no longer visible at sea'],
    ['Astronomical dusk', t.astro?.[1], 'Sky fully dark for stargazing'],
  ];

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-bold mb-4">Sunrise and sunset times for any place</h2>

      <PlaceSearch place={place} button="Sunrise & sunset here" placeholder="Search a city, town or address" />

      {!loc && place.status.type !== 'loading' && (
        <p className="text-sm text-fg-subtle my-2">Use your location or search a place to see today&rsquo;s sunrise, sunset, twilight and golden hour in that place&rsquo;s own time zone.</p>
      )}

      {loc && day && (
        <>
          <div className="flex flex-wrap items-center gap-3 my-3 text-sm text-fg-muted">
            <button type="button" className="btn-ghost py-1.5" onClick={() => setDate(shiftDate(date, -1))} aria-label="Previous day">‹</button>
            <input type="date" className="field w-auto py-1.5 text-sm" value={date} onChange={(e) => e.target.value && setDate(e.target.value)} aria-label="Date" />
            <button type="button" className="btn-ghost py-1.5" onClick={() => setDate(shiftDate(date, 1))} aria-label="Next day">›</button>
            {!isToday && <button type="button" className="text-accent hover:underline" onClick={() => setDate(todayIn(loc.tz))}>Today</button>}
            <label className="inline-flex items-center gap-2 cursor-pointer ml-auto">
              <input type="checkbox" checked={h24} onChange={(e) => setH24(e.target.checked)} /> 24-hour clock
            </label>
          </div>

          <p className="text-sm text-fg-muted">
            <span className="font-semibold text-fg">{loc.where}</span> · {longDate} · times in {loc.tz.replace(/_/g, ' ')} ({offsetLabel(day.offset)})
          </p>

          {polar && <p className="mt-3 rounded-xl p-3 border bg-accent/10 border-accent/30 text-sm text-fg">{polar}</p>}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
            {[
              ['Sunrise', time(t.sun?.[0]), `First light ${time(t.civil?.[0])}`],
              ['Sunset', time(t.sun?.[1]), `Last light ${time(t.civil?.[1])}`],
              ['Daylight', duration(day.len), change ? `${Math.floor(Math.abs(change) / 60)} min ${Math.abs(change) % 60} s ${change > 0 ? 'longer' : 'shorter'} than the day before` : 'Same as the day before'],
              ['Solar noon', time(t.noon), `Sun ${t.maxAltitude.toFixed(0)}° high`],
            ].map(([k, v, s]) => (
              <div key={k} className="rounded-xl p-4 bg-tint/5 ring-1 ring-line">
                <p className="text-xs uppercase tracking-wide text-fg-subtle">{k}</p>
                <p className="font-display text-2xl font-bold text-fg mt-1">{v}</p>
                <p className="text-xs text-fg-muted mt-1">{s}</p>
              </div>
            ))}
          </div>

          {now && (
            <p className="mt-3 text-sm text-fg-muted">
              Right now the sun is <span className="font-semibold text-fg">{now.altitude > 0 ? `${now.altitude.toFixed(1)}° above` : `${Math.abs(now.altitude).toFixed(1)}° below`} the horizon</span>, toward the {compass(now.azimuth)} ({Math.round(now.azimuth)}°).
            </p>
          )}

          <h3 className="text-sm font-semibold mt-6 mb-2">Twilight, golden hour and solar noon</h3>
          <div className="overflow-x-auto rounded-xl ring-1 ring-line" tabIndex={0} role="region" aria-label="Sun times for the day">
            <table className="w-full text-sm">
              <tbody>
                {twilight.map(([k, v, s]) => (
                  <tr key={k} className={`border-t border-line-subtle first:border-0 ${k === 'Sunrise' || k === 'Sunset' ? 'bg-accent/5 font-semibold' : ''}`}>
                    <th scope="row" className="text-left px-3 py-2 font-medium text-fg">{k}</th>
                    <td className="px-3 py-2 font-mono text-fg whitespace-nowrap">{time(v)}</td>
                    <td className="px-3 py-2 text-fg-muted hidden sm:table-cell">{s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-fg-subtle">A dash means the sun does not reach that height on this date, as happens in summer far from the equator.</p>

          <h3 className="text-sm font-semibold mt-6 mb-2">Sunrise and sunset for {new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })}</h3>
          <div className="overflow-x-auto rounded-xl ring-1 ring-line max-h-96" tabIndex={0} role="region" aria-label="Sunrise and sunset for the month">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-surface">
                <tr className="text-left text-fg-muted">
                  {['Date', 'First light', 'Sunrise', 'Sunset', 'Last light', 'Daylight'].map((h) => <th key={h} className="px-3 py-2 font-semibold">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {month.map((r) => (
                  <tr key={r.d} className={`border-t border-line-subtle ${r.d === date ? 'bg-accent/10 font-semibold' : ''}`}>
                    <td className="px-3 py-1.5 whitespace-nowrap"><button type="button" className="hover:text-accent" onClick={() => setDate(r.d)}>{new Date(`${r.d}T12:00:00Z`).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' })}</button></td>
                    <td className="px-3 py-1.5 font-mono">{time(r.t.civil?.[0])}</td>
                    <td className="px-3 py-1.5 font-mono">{time(r.t.sun?.[0])}</td>
                    <td className="px-3 py-1.5 font-mono">{time(r.t.sun?.[1])}</td>
                    <td className="px-3 py-1.5 font-mono">{time(r.t.civil?.[1])}</td>
                    <td className="px-3 py-1.5 font-mono">{duration(r.len)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Worked out on your device from the position of the sun, for sea level and a flat horizon, so hills or tall buildings can hide the sun a few minutes longer. Times are usually within a minute of official almanacs, and are shown in the place&rsquo;s own time zone, including daylight saving. The time zone is found on your device as well; only a typed place search is sent to the address service.
      </p>
    </section>
  );
}
