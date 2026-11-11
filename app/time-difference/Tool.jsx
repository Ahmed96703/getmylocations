'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePlace, PlaceSearch } from '../components/usePlace.jsx';
import { track } from '../components/track.js';
import { tzOffset } from '../sunrise-sunset/sun.js';

const zoneOf = (lat, lon) => import('@photostructure/tz-lookup').then((m) => (m.default || m)(lat, lon));
const HOUR = 3600000;

const offsetLabel = (min) => `UTC${min < 0 ? '−' : '+'}${Math.floor(Math.abs(min) / 60)}${Math.abs(min) % 60 ? `:${String(Math.abs(min) % 60).padStart(2, '0')}` : ''}`;
const zoneName = (tz) => tz.split('/').pop().replace(/_/g, ' ');
const clock = (ms, tz, h24) => new Date(ms).toLocaleTimeString(h24 ? 'en-GB' : 'en-US', { timeZone: tz, hour: 'numeric', minute: '2-digit', hour12: !h24 });
const dayOf = (ms, tz) => new Date(ms).toLocaleDateString('en-US', { timeZone: tz, weekday: 'short', day: 'numeric', month: 'short' });
const hourIn = (ms, tz) => Number(new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: 'numeric', hourCycle: 'h23' }).format(new Date(ms)));
const abbr = (ms, tz) => new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'short' }).formatToParts(new Date(ms)).find((p) => p.type === 'timeZoneName')?.value || '';

function diffText(min) {
  if (min === 0) return 'Same time';
  const h = Math.floor(Math.abs(min) / 60);
  const mm = Math.abs(min) % 60;
  return `${h ? `${h} hour${h === 1 ? '' : 's'}` : ''}${h && mm ? ' ' : ''}${mm ? `${mm} min` : ''} ${min > 0 ? 'ahead' : 'behind'}`;
}

// The next instant within a year when the zone's UTC offset changes (daylight
// saving starts or ends), found day by day then narrowed down to the minute.
function nextChange(tz, from) {
  const base = tzOffset(from, tz);
  for (let t = from + 24 * HOUR; t < from + 367 * 24 * HOUR; t += 24 * HOUR) {
    if (tzOffset(t, tz) !== base) {
      let lo = t - 24 * HOUR;
      let hi = t;
      while (hi - lo > 60000) { const mid = Math.floor((lo + hi) / 2); if (tzOffset(mid, tz) === base) lo = mid; else hi = mid; }
      return { at: hi, from: base, to: tzOffset(hi, tz) };
    }
  }
  return null;
}

function Side({ title, place, button, loc }) {
  return (
    <div className="rounded-xl ring-1 ring-line p-4 bg-tint/5">
      <p className="text-xs uppercase tracking-wide text-fg-subtle mb-2">{title}</p>
      <PlaceSearch place={place} button={button} placeholder="Search a city or country" />
      {loc && <p className="text-sm text-fg-muted">{loc.where}</p>}
    </div>
  );
}

export default function Tool() {
  const [now, setNow] = useState(() => Date.now());
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [h24, setH24] = useState(false);

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) setA({ tz, where: `Your device time zone (${zoneName(tz)})` });
    const id = setInterval(() => setNow(Date.now()), 15000);
    return () => clearInterval(id);
  }, []);

  const pick = (set, other) => async (lat, lon, where) => {
    try {
      const tz = await zoneOf(lat, lon);
      set({ tz, where: where === 'your location' ? `Your location (${zoneName(tz)})` : where });
      if (other) track('tool_run');
    } catch {
      /* the search box shows its own errors */
    }
  };
  const placeA = usePlace(pick(setA, b));
  const placeB = usePlace(pick(setB, a));

  const ready = a && b;
  const offA = a && tzOffset(now, a.tz);
  const offB = b && tzOffset(now, b.tz);
  const diff = ready ? offB - offA : 0;
  // The year-ahead search is slow, so it runs only when a place changes.
  const changes = useMemo(() => (a && b ? [a, b].filter((p, i) => i === 0 || p.tz !== a.tz).map((p) => [p, nextChange(p.tz, Date.now())]).filter(([, c]) => c) : []), [a, b]);
  const startHour = now - (now % HOUR);
  const work = (h) => h >= 9 && h < 17;
  const awake = (h) => h >= 7 && h < 23;

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">Time difference between two places</h2>
        <label className="inline-flex items-center gap-2 text-sm text-fg-muted cursor-pointer"><input type="checkbox" checked={h24} onChange={(e) => setH24(e.target.checked)} /> 24-hour clock</label>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <Side title="From" place={placeA} button="My location" loc={a} />
        <Side title="To" place={placeB} button="My location" loc={b} />
      </div>

      {a && !b && <p className="text-sm text-fg-subtle mt-3">Search the second place to compare, for example New York, Sydney, Dubai or Karachi.</p>}

      {ready && (
        <>
          <div className="grid sm:grid-cols-3 gap-3 mt-4 items-stretch">
            {[[a, offA], [b, offB]].map(([p, off], i) => (
              <div key={i} className={`rounded-xl p-4 ring-1 ring-line bg-tint/5 ${i === 1 ? 'sm:order-3' : ''}`}>
                <p className="text-xs text-fg-subtle truncate">{p.where}</p>
                <p className="font-display text-3xl font-bold text-fg mt-1">{clock(now, p.tz, h24)}</p>
                <p className="text-sm text-fg-muted">{dayOf(now, p.tz)} · {abbr(now, p.tz)} ({offsetLabel(off)})</p>
              </div>
            ))}
            <div className="rounded-xl p-4 border border-accent/40 bg-accent/10 flex flex-col justify-center text-center sm:order-2">
              <p className="text-xs uppercase tracking-wide text-fg-subtle">Difference</p>
              <p className="font-display text-xl font-bold text-fg mt-1">{diffText(diff)}</p>
              <p className="text-xs text-fg-muted mt-1">{diff === 0 ? 'Both places share the same clock time now.' : `${zoneName(b.tz)} is ${diffText(diff)} of ${zoneName(a.tz)}.`}</p>
            </div>
          </div>

          {changes.map(([p, c]) => (
            <p key={p.tz} className="text-xs text-fg-muted mt-2">
              Clocks in {zoneName(p.tz)} go {c.to > c.from ? 'forward' : 'back'} {Math.abs(c.to - c.from) / 60 === 1 ? '1 hour' : `${Math.abs(c.to - c.from)} min`} on {new Date(c.at).toLocaleDateString('en-US', { timeZone: p.tz, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}.
            </p>
          ))}

          <h3 className="text-sm font-semibold mt-6 mb-2">Best time to call or meet</h3>
          <div className="overflow-x-auto rounded-xl ring-1 ring-line max-h-96" tabIndex={0} role="region" aria-label="Hour by hour comparison">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-surface"><tr className="text-left text-fg-muted"><th className="px-3 py-2 font-semibold">{zoneName(a.tz)}</th><th className="px-3 py-2 font-semibold">{zoneName(b.tz)}</th><th className="px-3 py-2 font-semibold">Good for</th></tr></thead>
              <tbody>
                {Array.from({ length: 24 }, (_, i) => {
                  const t = startHour + i * HOUR;
                  const ha = hourIn(t, a.tz);
                  const hb = hourIn(t, b.tz);
                  const both = work(ha) && work(hb);
                  const ok = awake(ha) && awake(hb);
                  return (
                    <tr key={i} className={`border-t border-line-subtle ${both ? 'bg-emerald-500/10' : ok ? 'bg-amber-500/5' : ''}`}>
                      <td className="px-3 py-1.5 font-mono">{clock(t, a.tz, h24)}</td>
                      <td className="px-3 py-1.5 font-mono">{clock(t, b.tz, h24)}{dayOf(t, b.tz) !== dayOf(t, a.tz) && <span className="text-xs text-fg-subtle font-sans"> ({dayOf(t, b.tz)})</span>}</td>
                      <td className="px-3 py-1.5 text-xs">{both ? <span className="font-semibold text-emerald-700 dark:text-emerald-400">Work hours in both</span> : ok ? <span className="text-amber-700 dark:text-amber-400">Both awake</span> : <span className="text-fg-subtle">Night in one place</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-fg-subtle">Work hours are taken as 9:00 to 17:00 and awake as 7:00 to 23:00, local time, for the next 24 hours.</p>
        </>
      )}

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Time zones are found on your device from the place&rsquo;s position and shown with your browser&rsquo;s time zone rules, daylight saving included. Only a typed place search is sent to the address service.
      </p>
    </section>
  );
}
