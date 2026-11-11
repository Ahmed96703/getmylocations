'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePlace, PlaceSearch } from '../components/usePlace.jsx';
import { track } from '../components/track.js';
import { compass } from '../distance-calculator/dist.js';
import { CRAFT, loadOrbit, where, groundTrack, passes, epoch } from './iss.js';

const TrackMap = dynamic(() => import('./TrackMap.jsx'), {
  ssr: false,
  loading: () => <div className="w-full aspect-[4/3] sm:aspect-[16/9] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading map" />,
});

const zoneOf = (lat, lon) => import('@photostructure/tz-lookup').then((m) => (m.default || m)(lat, lon));
const fmtCoord = (v, pos, neg) => `${Math.abs(v).toFixed(2)}° ${v >= 0 ? pos : neg}`;

export default function Tool() {
  const [cat, setCat] = useState(25544);
  const [orbit, setOrbit] = useState(null);
  const [err, setErr] = useState('');
  const [now, setNow] = useState(() => new Date());
  const [follow, setFollow] = useState(true);
  const [me, setMe] = useState(null);
  const [all, setAll] = useState(false);
  const [metric, setMetric] = useState(true);
  const craft = CRAFT.find((c) => c.cat === cat);

  useEffect(() => {
    let live = true;
    setOrbit(null);
    setErr('');
    loadOrbit(cat).then((o) => live && setOrbit(o)).catch((e) => live && setErr(e.message));
    return () => { live = false; };
  }, [cat]);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const at = orbit ? where(orbit.satrec, now) : null;
  const slot = Math.floor(now.getTime() / 30000);
  const tracks = useMemo(() => {
    if (!orbit) return { past: [], next: [] };
    const t = new Date(slot * 30000);
    return { past: groundTrack(orbit.satrec, new Date(t.getTime() - 45 * 60000), 45), next: groundTrack(orbit.satrec, t, 95) };
  }, [orbit, slot]);

  const list = useMemo(() => (orbit && me ? passes(orbit.satrec, me.lat, me.lon, 10) : []), [orbit, me]);
  const seen = list.filter((p) => p.seen && p.seen.end > p.seen.start);

  const place = usePlace(async (lat, lon, label) => {
    place.setStatus({ type: 'loading', msg: 'Working out passes…' });
    try {
      const tz = await zoneOf(lat, lon);
      setMe({ lat, lon, where: label, tz });
      place.setStatus({ type: 'ok', msg: '' });
      track('tool_run');
    } catch {
      place.setStatus({ type: 'err', msg: 'The time zone data did not load. Check your connection and try again.' });
    }
  });

  const when = (ms, opts) => new Date(ms).toLocaleString(undefined, { timeZone: me?.tz, ...opts });
  const dist = (km) => (metric ? `${Math.round(km).toLocaleString()} km` : `${Math.round(km * 0.621371).toLocaleString()} miles`);
  const speed = (kmh) => (metric ? `${Math.round(kmh).toLocaleString()} km/h` : `${Math.round(kmh * 0.621371).toLocaleString()} mph`);
  const shown = all ? list : seen;

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">Where is the {craft.short} now?</h2>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Spacecraft">
          {CRAFT.map((c) => (
            <button key={c.cat} type="button" onClick={() => setCat(c.cat)} aria-pressed={cat === c.cat} className={cat === c.cat ? 'btn-primary !py-1.5 !px-3 text-sm' : 'btn-ghost !py-1.5 !px-3 text-sm'}>{c.short}</button>
          ))}
        </div>
      </div>

      {err && <p role="alert" className="mb-3 bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{err}</p>}

      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-sm">
        {[
          ['Over', at ? `${fmtCoord(at.lat, 'N', 'S')}, ${fmtCoord(at.lon, 'E', 'W')}` : '—'],
          ['Height', at ? dist(at.km) : '—'],
          ['Speed', at ? speed(at.kmh) : '—'],
          ['One orbit', orbit ? `${Math.round((2 * Math.PI) / orbit.satrec.no)} min` : '—'],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl ring-1 ring-line bg-tint/5 px-3 py-2">
            <dt className="text-xs text-fg-subtle">{k}</dt>
            <dd className="font-mono text-fg">{v}</dd>
          </div>
        ))}
      </dl>

      <TrackMap at={at} past={tracks.past} next={tracks.next} me={me} follow={follow} name={craft.short} onPick={(lat, lon) => { setMe(null); zoneOf(lat, lon).then((tz) => { setMe({ lat, lon, where: 'the point you picked', tz }); track('tool_run'); }); }} />
      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-fg-subtle">
        <label className="inline-flex items-center gap-1.5"><input type="checkbox" checked={follow} onChange={(e) => setFollow(e.target.checked)} /> Follow the {craft.short}</label>
        <label className="inline-flex items-center gap-1.5"><input type="checkbox" checked={!metric} onChange={(e) => setMetric(!e.target.checked)} /> Miles</label>
        <span>Blue: the next orbit · grey dashes: the last 45 minutes</span>
      </div>

      <h3 className="text-base font-bold mt-6 mb-2">When can I see the {craft.short} from my place?</h3>
      <PlaceSearch place={place} button="Passes over me" placeholder="Search a town or city" />

      {me && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-2 mb-2">
            <p className="text-sm text-fg-muted">
              {seen.length
                ? `${seen.length} visible pass${seen.length === 1 ? '' : 'es'} over ${me.where} in the next 10 days. Times are local (${me.tz.replace(/_/g, ' ')}).`
                : `No visible passes over ${me.where} in the next 10 days: it passes over in daylight, or while it is in the Earth's shadow. ${list.length} pass${list.length === 1 ? '' : 'es'} above 10° in all.`}
            </p>
            <label className="inline-flex items-center gap-1.5 text-xs text-fg-subtle"><input type="checkbox" checked={all} onChange={(e) => setAll(e.target.checked)} /> Show passes you cannot see too</label>
          </div>
          {shown.length > 0 && (
            <div className="overflow-x-auto rounded-xl ring-1 ring-line">
              <table className="w-full text-sm">
                <thead className="bg-tint/5 text-left text-xs text-fg-subtle">
                  <tr><th className="px-3 py-2 font-medium">Date</th><th className="px-3 py-2 font-medium">Appears</th><th className="px-3 py-2 font-medium">Highest</th><th className="px-3 py-2 font-medium">Disappears</th><th className="px-3 py-2 font-medium">Visible for</th></tr>
                </thead>
                <tbody>
                  {shown.map((p) => {
                    const s = p.seen && p.seen.end > p.seen.start ? p.seen : null;
                    const a = s ? [s.start, s.startAz, s.end, s.endAz, s.maxEl] : [p.start, p.startAz, p.end, p.endAz, p.max.el];
                    return (
                      <tr key={p.start} className="border-t border-line">
                        <td className="px-3 py-2 whitespace-nowrap">{when(a[0], { weekday: 'short', day: 'numeric', month: 'short' })}</td>
                        <td className="px-3 py-2 whitespace-nowrap font-mono">{when(a[0], { hour: '2-digit', minute: '2-digit' })} <span className="font-sans text-fg-subtle">{compass(a[1])}</span></td>
                        <td className="px-3 py-2 whitespace-nowrap">{Math.round(a[4])}°{a[4] >= 60 ? ' (nearly overhead)' : ''}</td>
                        <td className="px-3 py-2 whitespace-nowrap font-mono">{when(a[2], { hour: '2-digit', minute: '2-digit' })} <span className="font-sans text-fg-subtle">{compass(a[3])}</span></td>
                        <td className="px-3 py-2 whitespace-nowrap">{s ? `${Math.max(1, Math.round((a[2] - a[0]) / 60000))} min` : <span className="text-fg-subtle">{p.seen ? 'Too brief' : 'Not visible'}</span>}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-2 text-xs text-fg-subtle">Highest is the angle above the horizon: 90° is straight overhead, a fist at arm&rsquo;s length is about 10°. Passes are worked out from the latest orbit data; small orbit changes can shift times later in the list by a minute or two.</p>
        </>
      )}

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Orbit data from <a href="https://celestrak.org/" target="_blank" rel="noopener" className="hover:underline">CelesTrak</a>{orbit ? ` (orbit measured ${new Date(epoch(orbit.satrec)).toUTCString().slice(5, 22)} UTC)` : ''}, positions calculated in your browser with the SGP4 model (satellite.js). Your location stays on your device.
      </p>
    </section>
  );
}
