'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePlace, PlaceSearch } from '../components/usePlace.jsx';
import { track } from '../components/track.js';
import { haversine, compass } from '../distance-calculator/dist.js';
import { bearing } from '../earthquakes-near-me/quakes.js';
import { stationsNear, uvNear, stationAqi, usBand, uvBand, WHO, PARAMS } from './air.js';

const PointsMap = dynamic(() => import('../components/PointsMap.jsx'), {
  ssr: false,
  loading: () => <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading map" />,
});

const ago = (iso) => {
  const m = Math.round((Date.now() - Date.parse(iso)) / 60000);
  return m < 60 ? `${Math.max(1, m)} min ago` : m < 48 * 60 ? `${Math.round(m / 60)} h ago` : `${Math.round(m / 1440)} days ago`;
};

export default function Tool() {
  const [center, setCenter] = useState(null);
  const [stations, setStations] = useState(null);
  const [uv, setUv] = useState([]);
  const [fitKey, setFitKey] = useState(0);
  const [focus, setFocus] = useState(null);

  const load = async (lat, lon, where) => {
    setCenter({ lat, lon, where });
    setFocus(null);
    place.setStatus({ type: 'loading', msg: 'Finding monitoring stations…' });
    try {
      const [s, u] = await Promise.all([stationsNear(lat, lon), uvNear(lat, lon).catch(() => [])]);
      setStations(s === null ? 'off' : s.map((x) => ({ ...x, km: haversine(lat, lon, x.lat, x.lon) / 1000, dir: bearing(lat, lon, x.lat, x.lon), aqi: stationAqi(x.readings) })));
      setUv(u);
      place.setStatus({ type: 'ok', msg: '' });
      setFitKey((k) => k + 1);
      track('tool_run');
    } catch (err) {
      setStations(null);
      place.setStatus({ type: 'err', msg: err.message });
    }
  };
  const place = usePlace(load);

  const list = Array.isArray(stations) ? stations : [];
  const main = list.find((s) => s.aqi) || null;
  const b = main && usBand(main.aqi.value);
  const uvNow = uv[0]?.uv;
  const uvPeak = uv.slice(0, 24).reduce((m, x) => Math.max(m, x.uv), 0);
  const points = useMemo(() => list.map((s) => ({ key: String(s.id), lat: s.lat, lon: s.lon, color: s.aqi ? usBand(s.aqi.value)[2] : '#64748b', r: 9, tip: `${s.name}${s.aqi ? `: AQI ${s.aqi.value}` : ''}` })), [list]);
  const where = center?.where || 'this point';


  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-bold mb-4">Air quality and UV near a place</h2>
      <PlaceSearch place={place} button="Air quality near me" placeholder="Search a city, town or address" />

      {stations && place.status.type === 'ok' && (
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <div className="rounded-xl p-4 ring-1 ring-line bg-tint/5">
            <p className="text-xs uppercase tracking-wide text-fg-subtle">Air quality (US AQI)</p>
            {main ? (
              <>
                <p className="mt-1 flex items-baseline gap-2"><span className="font-display text-3xl font-bold text-fg">{main.aqi.value}</span><span className="font-semibold" style={{ color: b[2] }}>{b[1]}</span></p>
                <div className="h-1.5 mt-2 rounded-full" style={{ background: b[2] }} />
                <p className="text-xs text-fg-muted mt-2">{b[3]}</p>
                <p className="text-xs text-fg-subtle mt-1">From {PARAMS[main.aqi.param][0]} at {main.name}, {main.km.toFixed(1)} km {compass(main.dir)}, measured {ago(main.readings[main.aqi.param].at)}.</p>
              </>
            ) : (
              <p className="text-sm text-fg-muted mt-1">
                {stations === 'off'
                  ? 'Station readings are temporarily unavailable. The UV index still works.'
                  : `No monitoring station with recent particle readings within 25 km of ${where}.`}
              </p>
            )}
          </div>
          <div className="rounded-xl p-4 ring-1 ring-line bg-tint/5">
            <p className="text-xs uppercase tracking-wide text-fg-subtle">UV index</p>
            {uvNow != null ? (
              <>
                <p className="mt-1 flex items-baseline gap-2"><span className="font-display text-3xl font-bold text-fg">{uvNow.toFixed(1)}</span><span className="font-semibold" style={{ color: uvBand(uvNow)[2] }}>{uvBand(uvNow)[1]}</span></p>
                <div className="h-1.5 mt-2 rounded-full" style={{ background: uvBand(uvNow)[2] }} />
                <p className="text-xs text-fg-muted mt-2">{uvBand(uvNow)[3]}</p>
                <p className="text-xs text-fg-subtle mt-1">Highest in the next 24 hours: {uvPeak.toFixed(1)} ({uvBand(uvPeak)[1].toLowerCase()}). Clear-sky forecast; clouds lower it.</p>
              </>
            ) : <p className="text-sm text-fg-muted mt-1">No UV forecast available.</p>}
          </div>
        </div>
      )}

      <PointsMap center={center} points={points} fitKey={fitKey} focus={focus} onPick={(lat, lon) => load(lat, lon, '')} label="Map of air quality monitoring stations" attribution="Air quality: OpenAQ" />
      <p className="mt-2 text-xs text-fg-subtle">Each dot is a monitoring station, coloured by its air quality index.</p>

      {list.length > 0 && (
        <ol className="mt-5 space-y-3">
          {list.map((s) => (
            <li key={s.id} className="rounded-xl ring-1 ring-line p-4 bg-tint/5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold text-fg">{s.name}{s.locality && s.locality !== s.name ? <span className="font-normal text-fg-muted">, {s.locality}</span> : ''}</h3>
                <span className="text-sm font-mono text-fg">{s.km.toFixed(1)} km {compass(s.dir)}</span>
              </div>
              {s.aqi && <p className="text-sm mt-1"><span className="font-semibold" style={{ color: usBand(s.aqi.value)[2] }}>AQI {s.aqi.value} · {usBand(s.aqi.value)[1]}</span></p>}
              <dl className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                {Object.entries(s.readings).filter(([p]) => PARAMS[p]).map(([p, r]) => {
                  const over = WHO[p] && /µg|ug/i.test(r.units) && r.value > WHO[p];
                  return (
                    <div key={p} className="rounded-lg ring-1 ring-line px-3 py-1.5" title={PARAMS[p][1]}>
                      <dt className="text-xs text-fg-subtle">{PARAMS[p][0]}</dt>
                      <dd className="font-mono text-fg">{Math.round(r.value * 10) / 10} <span className="text-xs text-fg-subtle font-sans">{r.units}</span>{over && <span className="block text-xs font-sans text-amber-700 dark:text-amber-400">Above WHO guideline ({WHO[p]})</span>}</dd>
                    </div>
                  );
                })}
              </dl>
              <div className="mt-2 flex flex-wrap gap-x-4 text-xs text-fg-subtle">
                <span>Updated {ago(Object.values(s.readings)[0].at)}{s.provider ? ` · data from ${s.provider}` : ''}</span>
                <button type="button" onClick={() => setFocus({ lat: s.lat, lon: s.lon })} className="text-accent hover:underline">Show on map</button>
              </div>
            </li>
          ))}
        </ol>
      )}

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Readings from official and research monitoring stations, collected by <a href="https://openaq.org/" target="_blank" rel="noopener" className="hover:underline">OpenAQ</a>, within 25 km and from the last three days. The AQI uses the US EPA scale on the latest hourly particle reading, so it can differ from an official 24-hour figure. UV forecast from <a href="https://api.met.no/" target="_blank" rel="noopener" className="hover:underline">MET Norway</a> (CC BY 4.0). Your position is rounded to about 1 km before it is sent.
      </p>
    </section>
  );
}
