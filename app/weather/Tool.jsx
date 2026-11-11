'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePlace, PlaceSearch } from '../components/usePlace.jsx';
import { track } from '../components/track.js';
import { compass } from '../distance-calculator/dist.js';
import { loadForecast, rows, daily, rainToday, describe, windWord } from './weather.js';

const zoneOf = (lat, lon) => import('@photostructure/tz-lookup').then((m) => (m.default || m)(lat, lon));

export default function Tool() {
  const [fc, setFc] = useState(null);
  const [us, setUs] = useState(false);
  const [hours, setHours] = useState(24);

  useEffect(() => {
    if (/^en-US|^en-LR|^my/.test(navigator.language || '')) setUs(true);
  }, []);

  const place = usePlace(async (lat, lon, where) => {
    place.setStatus({ type: 'loading', msg: 'Getting the forecast…' });
    try {
      const [data, tz] = await Promise.all([loadForecast(lat, lon), zoneOf(lat, lon)]);
      setFc({ where, tz, list: rows(data.series), updated: data.updated });
      place.setStatus({ type: 'ok', msg: '' });
      track('tool_run');
    } catch (err) {
      setFc(null);
      place.setStatus({ type: 'err', msg: err.message });
    }
  });

  const fmt = useMemo(() => {
    if (!fc) return null;
    const tz = fc.tz;
    return {
      dateOf: (ms) => new Intl.DateTimeFormat('en-CA', { timeZone: tz }).format(new Date(ms)),
      hourOf: (ms) => Number(new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', hourCycle: 'h23' }).format(new Date(ms))),
      time: (ms) => new Date(ms).toLocaleTimeString(us ? 'en-US' : 'en-GB', { timeZone: tz, hour: 'numeric', minute: us ? undefined : '2-digit' }),
    };
  }, [fc, us]);

  const deg = (c) => (c == null ? '—' : `${Math.round(us ? c * 1.8 + 32 : c)}°`);
  const wind = (ms) => (us ? `${Math.round(ms * 2.23694)} mph` : `${Math.round(ms * 3.6)} km/h`);
  const rain = (mm) => (us ? `${(mm / 25.4).toFixed(2)} in` : `${mm < 10 ? mm.toFixed(1) : Math.round(mm)} mm`);

  const view = useMemo(() => {
    if (!fc || !fmt) return null;
    const now = Date.now();
    const list = fc.list.filter((r) => r.at + r.step * 3600000 > now && r.sym);
    const today = fmt.dateOf(now);
    const days = daily(list, fmt.dateOf, fmt.hourOf).filter((d, i) => i === 0 || d.hours >= 18);
    return { list, cur: list[0], today, days, rt: rainToday(list, today, fmt.dateOf), hourly: list.filter((r) => r.step === 1) };
  }, [fc, fmt]);

  const cur = view?.cur;
  const cd = cur && describe(cur.sym);
  const rt = view?.rt;

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">Weather forecast for any place</h2>
        <div className="flex gap-1.5" role="group" aria-label="Units">
          <button type="button" onClick={() => setUs(false)} aria-pressed={!us} className={!us ? 'btn-primary !py-1 !px-3 text-sm' : 'btn-ghost !py-1 !px-3 text-sm'}>°C, km/h</button>
          <button type="button" onClick={() => setUs(true)} aria-pressed={us} className={us ? 'btn-primary !py-1 !px-3 text-sm' : 'btn-ghost !py-1 !px-3 text-sm'}>°F, mph</button>
        </div>
      </div>
      <PlaceSearch place={place} button="Weather near me" placeholder="Search a city, town or postcode" />

      {cur && place.status.type === 'ok' && (
        <>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div className="rounded-xl p-4 ring-1 ring-line bg-tint/5">
              <p className="text-xs uppercase tracking-wide text-fg-subtle">Now in {fc.where}</p>
              <p className="mt-1 flex items-center gap-3">
                <span className="text-4xl" aria-hidden="true">{cd.icon}</span>
                <span className="font-display text-4xl font-bold text-fg">{deg(cur.t)}</span>
                <span className="text-fg-muted">{cd.label}</span>
              </p>
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <dt className="text-fg-subtle">Feels like</dt><dd className="text-fg">{deg(cur.feels)}</dd>
                <dt className="text-fg-subtle">Wind</dt><dd className="text-fg">{wind(cur.wind)} from the {compass(cur.dir)}{cur.gust ? `, gusts ${wind(cur.gust)}` : ''} <span className="text-fg-subtle">({windWord(cur.wind).toLowerCase()})</span></dd>
                <dt className="text-fg-subtle">Humidity</dt><dd className="text-fg">{Math.round(cur.rh)}%</dd>
                <dt className="text-fg-subtle">Cloud cover</dt><dd className="text-fg">{Math.round(cur.cloud)}%</dd>
                {cur.uv != null && <><dt className="text-fg-subtle">UV index</dt><dd className="text-fg">{cur.uv.toFixed(1)}</dd></>}
              </dl>
            </div>
            <div className="rounded-xl p-4 ring-1 ring-line bg-tint/5">
              <p className="text-xs uppercase tracking-wide text-fg-subtle">Will it rain today?</p>
              {rt.checked === 0 ? (
                <p className="mt-1 text-fg-muted text-sm">The day is nearly over; see tomorrow below.</p>
              ) : rt.wet ? (
                <>
                  <p className="mt-1 font-display text-2xl font-bold text-sky-600 dark:text-sky-400">Yes, {fmt.dateOf(rt.first.at) === view.today && rt.first.at <= Date.now() ? 'now' : `from about ${fmt.time(rt.first.at)}`}</p>
                  <p className="text-sm text-fg-muted mt-1">{describe(rt.first.sym).label || 'Rain'} expected, about {rain(rt.total)} in total for the rest of today{rt.maxChance ? ` (up to a ${Math.round(rt.maxChance)}% chance in an hour)` : ''}.</p>
                </>
              ) : (
                <>
                  <p className="mt-1 font-display text-2xl font-bold text-emerald-600 dark:text-emerald-400">No rain expected</p>
                  <p className="text-sm text-fg-muted mt-1">The forecast is dry for the rest of today{rt.total > 0 ? `, with only a trace (${rain(rt.total)})` : ''}.</p>
                </>
              )}
              {view.days[1] && (
                <p className="text-sm text-fg-muted mt-3 pt-3 border-t border-line">
                  <span className="font-semibold text-fg">Tomorrow:</span> {describe(view.days[1].sym).label.toLowerCase()}, {deg(view.days[1].hi)} / {deg(view.days[1].lo)}{view.days[1].rain >= 0.1 ? `, ${rain(view.days[1].rain)} of rain` : ', dry'}.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 mt-5 mb-2">
            <h3 className="text-base font-bold">Hour by hour</h3>
            <div className="flex gap-1.5 text-sm" role="group" aria-label="Hours shown">
              {[24, 48].map((h) => <button key={h} type="button" onClick={() => setHours(h)} aria-pressed={hours === h} className={hours === h ? 'btn-primary !py-1 !px-3' : 'btn-ghost !py-1 !px-3'}>{h} h</button>)}
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl ring-1 ring-line">
            <table className="text-sm min-w-full">
              <tbody>
                {[
                  ['Time', (r) => fmt.time(r.at)],
                  ['', (r) => <span title={describe(r.sym).label} className="text-xl">{describe(r.sym).icon}</span>],
                  ['Temp', (r) => <span className="font-semibold">{deg(r.t)}</span>],
                  ['Rain', (r) => (r.rain >= 0.1 ? <span className="text-sky-600 dark:text-sky-400">{rain(r.rain)}</span> : <span className="text-fg-subtle">–</span>)],
                  ['Wind', (r) => <span title={`From the ${compass(r.dir)}`}>{Math.round(us ? r.wind * 2.23694 : r.wind * 3.6)}</span>],
                ].map(([label, cell]) => (
                  <tr key={label || 'icon'} className="border-t border-line first:border-t-0">
                    <th scope="row" className="sticky left-0 bg-surface px-3 py-1.5 text-left text-xs font-medium text-fg-subtle whitespace-nowrap">{label === 'Wind' ? (us ? 'Wind mph' : 'Wind km/h') : label}</th>
                    {view.hourly.slice(0, hours).map((r) => <td key={r.at} className="px-2 py-1.5 text-center whitespace-nowrap">{cell(r)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-base font-bold mt-6 mb-2">{view.days.length}-day forecast</h3>
          <ol className="divide-y divide-line rounded-xl ring-1 ring-line">
            {view.days.map((d, i) => {
              const s = describe(d.sym);
              return (
                <li key={d.date} className="flex items-center gap-3 px-3 py-2 text-sm">
                  <span className="w-24 shrink-0 text-fg">{i === 0 ? 'Today' : new Date(`${d.date}T12:00:00Z`).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' })}</span>
                  <span className="text-xl w-8 text-center" aria-hidden="true">{s.icon}</span>
                  <span className="flex-1 text-fg-muted truncate">{s.label}</span>
                  <span className="w-20 text-right text-sky-600 dark:text-sky-400">{d.rain >= 0.1 ? rain(d.rain) : ''}</span>
                  <span className="w-20 text-right font-mono"><span className="font-semibold text-fg">{deg(d.hi)}</span> <span className="text-fg-subtle">{deg(d.lo)}</span></span>
                </li>
              );
            })}
          </ol>
          <p className="mt-2 text-xs text-fg-subtle">Times are local to {fc.where} ({fc.tz.replace(/_/g, ' ')}). Forecast updated {new Date(fc.updated).toLocaleString(undefined, { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}.</p>
        </>
      )}

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Forecast data from <a href="https://api.met.no/" target="_blank" rel="noopener" className="hover:underline">MET Norway</a> (the Norwegian Meteorological Institute), licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener" className="hover:underline">CC BY 4.0</a>, based on ECMWF and national models. Your position is rounded to about 1 km before it is sent.
      </p>
    </section>
  );
}
