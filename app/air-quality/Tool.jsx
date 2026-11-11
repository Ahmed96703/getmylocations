'use client';

import { useState } from 'react';
import { usePlace, PlaceSearch } from '../components/usePlace.jsx';
import { track } from '../components/track.js';
import { airAt, usBand, euBand, uvBand, POLLEN, pollenLevel, nextHours, dailyMax } from './air.js';

const POLLUTANTS = [
  ['pm2_5', 'PM2.5', 'Fine particles from traffic, heating, industry and smoke'],
  ['pm10', 'PM10', 'Coarser dust, pollen and particles'],
  ['nitrogen_dioxide', 'NO₂', 'Mostly from road traffic'],
  ['ozone', 'Ozone (O₃)', 'Forms in sunshine; highest on summer afternoons'],
  ['sulphur_dioxide', 'SO₂', 'From burning coal and oil, shipping and volcanoes'],
  ['carbon_monoxide', 'CO', 'From engines and burning'],
];

const hourLabel = (t) => t.slice(11, 13);
const dayLabel = (d) => new Date(`${d}T12:00:00Z`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });

function Gauge({ title, value, b, sub }) {
  return (
    <div className="rounded-xl p-4 ring-1 ring-line bg-tint/5">
      <p className="text-xs uppercase tracking-wide text-fg-subtle">{title}</p>
      {b ? (
        <>
          <p className="mt-1 flex items-baseline gap-2"><span className="font-display text-3xl font-bold text-fg">{value}</span><span className="font-semibold" style={{ color: b[2] }}>{b[1]}</span></p>
          <div className="h-1.5 mt-2 rounded-full" style={{ background: b[2] }} />
          <p className="text-xs text-fg-muted mt-2">{b[3]}</p>
        </>
      ) : <p className="mt-1 text-fg-muted">No data</p>}
      {sub && <p className="text-xs text-fg-subtle mt-1">{sub}</p>}
    </div>
  );
}

export default function Tool() {
  const [data, setData] = useState(null);
  const [where, setWhere] = useState('');
  const [scale, setScale] = useState('us');

  const place = usePlace(async (lat, lon, label) => {
    place.setStatus({ type: 'loading', msg: 'Loading air quality…' });
    try {
      const d = await airAt(lat, lon);
      setData(d);
      setWhere(label || `${lat.toFixed(3)}, ${lon.toFixed(3)}`);
      setScale(d.timezone?.startsWith('America') ? 'us' : 'eu');
      place.setStatus({ type: 'ok', msg: '' });
      track('tool_run');
    } catch (err) {
      place.setStatus({ type: 'err', msg: err.message });
    }
  });

  const c = data?.current;
  const aqi = c && (scale === 'us' ? c.us_aqi : c.european_aqi);
  const aqiBand = c && (scale === 'us' ? usBand(aqi) : euBand(aqi));
  const hours = data ? nextHours(data) : [];
  const days = data ? dailyMax(data) : [];
  const hasPollen = c && POLLEN.some(([k]) => c[k] != null);
  const key = scale === 'us' ? 'us_aqi' : 'european_aqi';
  const bandOf = scale === 'us' ? usBand : euBand;
  const maxAqi = Math.max(scale === 'us' ? 150 : 80, ...hours.map((h) => h[key] ?? 0));

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-bold mb-4">Air quality, UV and pollen for a place</h2>
      <PlaceSearch place={place} button="Air quality near me" placeholder="Search a city, town or address" />

      {data && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 my-3">
            <p className="text-sm text-fg-muted"><span className="font-semibold text-fg">{where}</span> · now ({c.time.slice(11)} local time)</p>
            <div role="radiogroup" aria-label="Air quality scale" className="flex gap-1 text-sm">
              {[['us', 'US AQI'], ['eu', 'European AQI']].map(([id, l]) => (
                <button key={id} type="button" role="radio" aria-checked={scale === id} onClick={() => setScale(id)} className={`px-3 py-1.5 rounded-lg border transition ${scale === id ? 'bg-accent/15 border-accent/50 text-accent' : 'bg-tint/5 border-line hover:bg-accent/10'}`}>{l}</button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Gauge title={scale === 'us' ? 'Air quality (US AQI)' : 'Air quality (European AQI)'} value={aqi ?? '—'} b={aqiBand} />
            <Gauge title="UV index" value={c.uv_index != null ? c.uv_index.toFixed(1) : '—'} b={uvBand(c.uv_index)} sub={`Today's peak: ${days[0]?.uv_index != null ? days[0].uv_index.toFixed(1) : '—'}`} />
          </div>

          <h3 className="text-sm font-semibold mt-6 mb-2">Next 24 hours</h3>
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Hourly air quality and UV">
            <div className="flex gap-1 min-w-[640px] items-end h-28">
              {hours.map((h) => {
                const v = h[key];
                const b = bandOf(v);
                return (
                  <div key={h.time} className="flex-1 flex flex-col items-center justify-end h-full" title={`${h.time.slice(11)}: AQI ${v ?? '—'}, UV ${h.uv_index ?? '—'}`}>
                    <span className="text-[10px] text-fg-subtle">{v ?? ''}</span>
                    <div className="w-full rounded-t" style={{ height: `${v != null ? Math.max(4, (v / maxAqi) * 80) : 0}px`, background: b?.[2] }} />
                  </div>
                );
              })}
            </div>
            <div className="flex gap-1 min-w-[640px] text-[10px] text-fg-subtle mt-1">
              {hours.map((h) => <span key={h.time} className="flex-1 text-center">{hourLabel(h.time)}</span>)}
            </div>
            <div className="flex gap-1 min-w-[640px] text-[10px] mt-1">
              {hours.map((h) => { const b = uvBand(h.uv_index); return <span key={h.time} className="flex-1 text-center rounded py-0.5 text-white font-semibold" style={{ background: h.uv_index >= 0.5 ? b?.[2] : 'transparent', color: h.uv_index >= 0.5 ? '#fff' : 'transparent' }}>{h.uv_index != null ? Math.round(h.uv_index) : ''}</span>; })}
            </div>
          </div>
          <p className="text-xs text-fg-subtle mt-1">Bars: air quality by hour. Bottom row: UV index (shown from 1 upwards).</p>

          <h3 className="text-sm font-semibold mt-6 mb-2">Pollutants now (μg/m³)</h3>
          <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
            {POLLUTANTS.filter(([k]) => c[k] != null).map(([k, l, d]) => (
              <div key={k} className="rounded-lg ring-1 ring-line px-3 py-2">
                <dt className="flex justify-between"><span className="font-semibold text-fg">{l}</span><span className="font-mono">{Math.round(c[k])}</span></dt>
                <dd className="text-xs text-fg-subtle">{d}</dd>
              </div>
            ))}
          </dl>

          <h3 className="text-sm font-semibold mt-6 mb-2">Pollen count</h3>
          {hasPollen ? (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
              {POLLEN.map(([k, l, kind]) => {
                const lv = pollenLevel(c[k], kind);
                const peak = pollenLevel(days[0]?.[k], kind);
                return (
                  <li key={k} className="rounded-lg ring-1 ring-line px-3 py-2 flex justify-between items-center">
                    <span className="font-semibold text-fg">{l}</span>
                    <span className="text-right"><span className="font-semibold" style={{ color: lv?.[1] }}>{lv?.[0] ?? '—'}</span>{c[k] >= 1 && <span className="block text-xs text-fg-subtle">{Math.round(c[k])} grains/m³{peak ? `, peak today ${peak[0].toLowerCase()}` : ''}</span>}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-fg-muted">Pollen forecasts are only available for Europe, including the UK. Outside Europe, check your national weather service.</p>
          )}
          {hasPollen && POLLEN.every(([k]) => !(c[k] >= 1)) && <p className="text-xs text-fg-subtle mt-1">No pollen in the air now: outside the pollen season (roughly February to September in Europe) counts are usually zero.</p>}

          <h3 className="text-sm font-semibold mt-6 mb-2">Outlook (daily highs)</h3>
          <div className="overflow-x-auto rounded-xl ring-1 ring-line" tabIndex={0} role="region" aria-label="Daily outlook">
            <table className="w-full text-sm">
              <thead><tr className="bg-tint/5 text-left text-fg-muted">{['Day', scale === 'us' ? 'US AQI' : 'European AQI', 'UV index', hasPollen ? 'Grass pollen' : null].filter(Boolean).map((h) => <th key={h} className="px-3 py-2 font-semibold">{h}</th>)}</tr></thead>
              <tbody>
                {days.map((d) => {
                  const a = bandOf(d[key]);
                  const u = uvBand(d.uv_index);
                  const g = pollenLevel(d.grass_pollen, 'grass');
                  return (
                    <tr key={d.date} className="border-t border-line-subtle">
                      <td className="px-3 py-2">{dayLabel(d.date)}</td>
                      <td className="px-3 py-2"><span className="font-mono">{d[key] ?? '—'}</span> <span style={{ color: a?.[2] }}>{a?.[1]}</span></td>
                      <td className="px-3 py-2"><span className="font-mono">{d.uv_index != null ? d.uv_index.toFixed(1) : '—'}</span> <span style={{ color: u?.[2] }}>{u?.[1]}</span></td>
                      {hasPollen && <td className="px-3 py-2" style={{ color: g?.[1] }}>{g?.[0] ?? '—'}</td>}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Forecasts from <a href="https://open-meteo.com/en/docs/air-quality-api" target="_blank" rel="noopener" className="hover:underline">Open-Meteo</a>, based on the Copernicus Atmosphere Monitoring Service (CAMS), on a grid of about 11 km in Europe and 45 km elsewhere, so a busy road can be worse than shown. For official alerts follow your national service. Your position is rounded to about 1 km before it is sent.
      </p>
    </section>
  );
}
