'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePlace, PlaceSearch } from '../components/usePlace.jsx';
import { track } from '../components/track.js';
import { compass } from '../distance-calculator/dist.js';
import { todayIn, localNoon } from '../sunrise-sunset/sun.js';
import { illumination, phaseName, moonAge, moonTimes, nextPhases, moonAltitude } from './moon.js';

const DAY = 86400000;
const zoneOf = (lat, lon) => import('@photostructure/tz-lookup').then((m) => (m.default || m)(lat, lon));
const shiftDate = (date, days) => new Date(Date.parse(`${date}T12:00:00Z`) + days * DAY).toISOString().slice(0, 10);

// The moon as seen from the Northern Hemisphere (lit on the right while
// waxing); `south` mirrors it.
export function MoonIcon({ fraction, waxing, south, size = 120 }) {
  const r = 50;
  const rx = r * Math.abs(1 - 2 * fraction);
  const d = `M0 ${-r}A${r} ${r} 0 0 1 0 ${r}A${rx} ${r} 0 0 ${fraction < 0.5 ? 0 : 1} 0 ${-r}Z`;
  const flip = (waxing ? 1 : -1) * (south ? -1 : 1);
  return (
    <svg viewBox="-55 -55 110 110" width={size} height={size} aria-hidden="true">
      <circle r={r} fill="#1e293b" stroke="#475569" strokeWidth="1" />
      <path d={d} fill="#f8fafc" transform={`scale(${flip} 1)`} />
    </svg>
  );
}

export default function Tool() {
  const [loc, setLoc] = useState(null);
  const [date, setDate] = useState('');
  const [h24, setH24] = useState(false);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    setLoc((l) => l || { tz, lat: null, lon: null, where: '' });
    setDate((d) => d || todayIn(tz));
  }, []);

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

  const isToday = loc && date === todayIn(loc.tz);
  const at = loc && date ? (isToday ? Date.now() : localNoon(date, loc.tz)) : null;
  const ill = at && illumination(at);
  const age = at && moonAge(at);
  const phases = useMemo(() => (at ? nextPhases(at, 8) : []), [at && Math.floor(at / 3600000)]); // eslint-disable-line react-hooks/exhaustive-deps
  const hasPlace = loc?.lat != null;
  const times = hasPlace && date ? moonTimes(localNoon(date, loc.tz) - 12 * 3600000, loc.lat, loc.lon) : null;
  const pos = hasPlace && isToday ? moonAltitude(Date.now(), loc.lat, loc.lon) : null;
  const south = hasPlace && loc.lat < 0;

  const time = (ms) => (ms == null ? '—' : new Date(ms).toLocaleTimeString(h24 ? 'en-GB' : 'en-US', { timeZone: loc.tz, hour: 'numeric', minute: '2-digit', hour12: !h24 }));
  const longDay = (ms) => new Date(ms).toLocaleString(h24 ? 'en-GB' : 'en-US', { timeZone: loc.tz, weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: !h24 });

  const month = useMemo(() => {
    if (!loc || !date) return [];
    const [y, m] = date.split('-').map(Number);
    const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
    const first = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
    const cells = Array.from({ length: first }, () => null);
    for (let i = 1; i <= days; i++) {
      const d = `${y}-${String(m).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      cells.push({ d, i, ...illumination(localNoon(d, loc.tz)) });
    }
    return cells;
  }, [loc, date]);

  if (!loc || !date) return <section className="glass rounded-2xl p-5 sm:p-6 min-h-[300px]" aria-busy="true" />;

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-bold mb-4">Moon phase, moonrise and moonset</h2>
      <PlaceSearch place={place} button="Moonrise & moonset here" placeholder="Search a city or town for moonrise times" />

      <div className="flex flex-wrap items-center gap-3 my-3 text-sm text-fg-muted">
        <button type="button" className="btn-ghost py-1.5" onClick={() => setDate(shiftDate(date, -1))} aria-label="Previous day">‹</button>
        <input type="date" className="field w-auto py-1.5 text-sm" value={date} onChange={(e) => e.target.value && setDate(e.target.value)} aria-label="Date" />
        <button type="button" className="btn-ghost py-1.5" onClick={() => setDate(shiftDate(date, 1))} aria-label="Next day">›</button>
        {!isToday && <button type="button" className="text-accent hover:underline" onClick={() => setDate(todayIn(loc.tz))}>Today</button>}
        <label className="inline-flex items-center gap-2 cursor-pointer ml-auto"><input type="checkbox" checked={h24} onChange={(e) => setH24(e.target.checked)} /> 24-hour clock</label>
      </div>

      <div className="grid md:grid-cols-[auto,1fr] gap-6 items-center rounded-xl p-5 ring-1 ring-line bg-tint/5">
        <div className="mx-auto"><MoonIcon fraction={ill.fraction} waxing={ill.waxing} south={south} size={150} /></div>
        <div>
          <p className="text-xs uppercase tracking-wide text-fg-subtle">{isToday ? 'Moon now' : new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</p>
          <p className="font-display text-3xl font-bold text-fg">{phaseName(ill.phase)}</p>
          <p className="text-fg-muted mt-1">{(ill.fraction * 100).toFixed(0)}% lit · {ill.waxing ? 'waxing (growing)' : 'waning (shrinking)'} · {age.toFixed(1)} days old · {Math.round(ill.dist).toLocaleString()} km away</p>
          {hasPlace ? (
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 text-sm">
              <div><dt className="text-xs uppercase tracking-wide text-fg-subtle">Moonrise</dt><dd className="font-mono text-lg text-fg">{times.alwaysUp ? 'Up all day' : times.alwaysDown ? 'Does not rise' : time(times.rise)}</dd></div>
              <div><dt className="text-xs uppercase tracking-wide text-fg-subtle">Moonset</dt><dd className="font-mono text-lg text-fg">{times.alwaysUp ? 'Does not set' : times.alwaysDown ? '—' : time(times.set)}</dd></div>
              {pos && <div><dt className="text-xs uppercase tracking-wide text-fg-subtle">Right now</dt><dd className="text-fg">{pos.altitude > 0 ? `${pos.altitude.toFixed(0)}° up, ${compass(pos.azimuth)}` : 'Below the horizon'}</dd></div>}
            </dl>
          ) : (
            <p className="text-sm text-fg-subtle mt-3">Search a place or use your location to add moonrise and moonset times there.</p>
          )}
          {hasPlace && <p className="text-xs text-fg-subtle mt-2">{loc.where} · times in {loc.tz.replace(/_/g, ' ')}. A dash means it does not happen on this date: the moon rises about 50 minutes later each day, so once a month a rise or set falls after midnight.</p>}
        </div>
      </div>

      <h3 className="text-sm font-semibold mt-6 mb-2">Next full moons and new moons</h3>
      <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
        {phases.map((p) => {
          const f = { 'New moon': 0, 'First quarter': 0.5, 'Full moon': 1, 'Last quarter': 0.5 }[p.name];
          return (
            <li key={p.at} className="rounded-lg ring-1 ring-line px-3 py-2 flex items-center gap-3">
              <MoonIcon fraction={f} waxing={p.name !== 'Last quarter'} south={south} size={32} />
              <span><span className="font-semibold text-fg block">{p.name}</span><span className="text-fg-muted">{longDay(p.at)}</span></span>
            </li>
          );
        })}
      </ol>

      <h3 className="text-sm font-semibold mt-6 mb-2">Moon calendar for {new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })}</h3>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d} className="text-fg-subtle font-semibold py-1">{d}</div>)}
        {month.map((c, i) => (c ? (
          <button key={c.d} type="button" onClick={() => setDate(c.d)} className={`rounded-lg py-1.5 flex flex-col items-center gap-0.5 transition ${c.d === date ? 'bg-accent/15 ring-1 ring-accent/50' : 'hover:bg-accent/10'}`} aria-label={`${c.d}: ${phaseName(c.phase)}, ${Math.round(c.fraction * 100)}% lit`}>
            <MoonIcon fraction={c.fraction} waxing={c.waxing} south={south} size={26} />
            <span className="text-fg">{c.i}</span>
          </button>
        ) : <div key={`e${i}`} />))}
      </div>

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Worked out on your device. Phase dates use the standard astronomical series and are good to about a minute; moonrise and moonset are for a flat horizon and good to a few minutes. Times are shown in {hasPlace ? 'the place’s' : 'your device’s'} time zone. {south ? 'The moon is drawn as seen from the Southern Hemisphere.' : 'The moon is drawn as seen from the Northern Hemisphere; south of the equator it appears the other way round.'}
      </p>
    </section>
  );
}
