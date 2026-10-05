'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  validateLatLon, ddToDms, ddToDdm, dmsToDd, ddmToDd,
  latLonToUtm, utmToLatLon, utmToMgrs, parseCoordinate,
} from './geo.js';

const MapView = dynamic(() => import('../components/MapView.jsx'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-tint/5 animate-pulse" aria-label="Loading map" />,
});

const fmt = (n, p) => (Math.round(n * 10 ** p) / 10 ** p).toString();

// Every format's input strings are derived from one validated position, so
// editing any format updates all the others (the old version kept separate
// copies that could drift out of sync).
function fieldsFrom(lat, lon) {
  const ldms = ddToDms(lat), ndms = ddToDms(lon);
  const lddm = ddToDdm(lat), nddm = ddToDdm(lon);
  const utm = latLonToUtm(lat, lon);
  return {
    dd: { lat: lat.toFixed(6), lon: lon.toFixed(6) },
    dms: {
      latD: String(ldms.d), latM: String(ldms.m), latS: fmt(ldms.s, 3), latH: lat < 0 ? 'S' : 'N',
      lonD: String(ndms.d), lonM: String(ndms.m), lonS: fmt(ndms.s, 3), lonH: lon < 0 ? 'W' : 'E',
    },
    ddm: {
      latD: String(lddm.d), latM: fmt(lddm.m, 4), latH: lat < 0 ? 'S' : 'N',
      lonD: String(nddm.d), lonM: fmt(nddm.m, 4), lonH: lon < 0 ? 'W' : 'E',
    },
    utm: utm
      ? { zone: String(utm.zone), band: utm.band, e: String(Math.round(utm.easting)), n: String(Math.round(utm.northing)) }
      : { zone: '', band: '', e: '', n: '' },
  };
}

const START = { lat: 48.85842, lon: 2.2945 }; // Eiffel Tower

export default function Tool() {
  const [pos, setPos] = useState(START);
  const [f, setF] = useState(() => fieldsFrom(START.lat, START.lon));
  const [error, setError] = useState(null); // { source, msg }
  const [paste, setPaste] = useState('');
  const [pasteNote, setPasteNote] = useState('');

  const utm = latLonToUtm(pos.lat, pos.lon);
  const mgrs = utm ? utmToMgrs(utm) : null;

  // Accept a new position from one format and rewrite every other format.
  function apply(lat, lon, source) {
    const err = validateLatLon(lat, lon);
    if (err) {
      setError({ source, msg: err });
      return false;
    }
    setError(null);
    setPos({ lat, lon });
    const next = fieldsFrom(lat, lon);
    // Leave the fields the user is typing in alone; rewrite all the others.
    setF((cur) => (source in next ? { ...next, [source]: cur[source] } : next));
    return true;
  }

  const onDd = (key, value) => {
    const dd = { ...f.dd, [key]: value };
    setF({ ...f, dd });
    const lat = Number(dd.lat), lon = Number(dd.lon);
    if (dd.lat.trim() === '' || dd.lon.trim() === '' || !Number.isFinite(lat) || !Number.isFinite(lon)) {
      setError({ source: 'dd', msg: 'Enter numbers for both latitude and longitude.' });
      return;
    }
    apply(lat, lon, 'dd');
  };

  const commitDms = (dms) => {
    if ([dms.latM, dms.latS, dms.lonM, dms.lonS].some((v) => Number(v) >= 60 || Number(v) < 0)) {
      setError({ source: 'dms', msg: 'Minutes and seconds must be from 0 up to (not including) 60.' });
      return;
    }
    apply(dmsToDd(dms.latD, dms.latM, dms.latS, dms.latH), dmsToDd(dms.lonD, dms.lonM, dms.lonS, dms.lonH), 'dms');
  };
  const commitDdm = (ddm) => {
    if ([ddm.latM, ddm.lonM].some((v) => Number(v) >= 60 || Number(v) < 0)) {
      setError({ source: 'ddm', msg: 'Minutes must be from 0 up to (not including) 60.' });
      return;
    }
    apply(ddmToDd(ddm.latD, ddm.latM, ddm.latH), ddmToDd(ddm.lonD, ddm.lonM, ddm.lonH), 'ddm');
  };
  const commitUtm = (u) => {
    const r = utmToLatLon(u.zone, u.band, u.e, u.n);
    if (r.error) {
      setError({ source: 'utm', msg: r.error });
      return;
    }
    apply(r.lat, r.lon, 'utm');
  };

  const setDms = (key, value, commit = false) => {
    const dms = { ...f.dms, [key]: value };
    setF({ ...f, dms });
    if (commit) commitDms(dms);
  };
  const setDdm = (key, value, commit = false) => {
    const ddm = { ...f.ddm, [key]: value };
    setF({ ...f, ddm });
    if (commit) commitDdm(ddm);
  };
  const setUtm = (key, value) => setF({ ...f, utm: { ...f.utm, [key]: value } });

  const onPaste = (e) => {
    e.preventDefault();
    const r = parseCoordinate(paste);
    if (r.error) {
      setPasteNote('');
      setError({ source: 'paste', msg: r.error });
      return;
    }
    if (apply(r.lat, r.lon, 'paste')) setPasteNote(`Read as ${r.format}.`);
  };

  const useMyLocation = () => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition((p) => apply(p.coords.latitude, p.coords.longitude, 'gps'));
  };

  const copy = (text) => navigator.clipboard.writeText(text);
  const errFor = (source) =>
    error && error.source === source ? (
      <p role="alert" className="text-xs text-rose-500 mt-2">{error.msg}</p>
    ) : null;

  const ddText = `${pos.lat.toFixed(6)}, ${pos.lon.toFixed(6)}`;
  const dmsText = `${f.dms.latD}°${f.dms.latM}'${f.dms.latS}"${f.dms.latH} ${f.dms.lonD}°${f.dms.lonM}'${f.dms.lonS}"${f.dms.lonH}`;
  const ddmText = `${f.ddm.latD}°${f.ddm.latM}'${f.ddm.latH} ${f.ddm.lonD}°${f.ddm.lonM}'${f.ddm.lonH}`;
  const utmText = utm ? `${utm.zone}${utm.band} ${Math.round(utm.easting)} ${Math.round(utm.northing)}` : '';

  const CopyRow = ({ text }) => (
    <div className="bg-accent/10 border border-accent/40 rounded-md p-2 mt-2 flex justify-between items-center gap-2">
      <span className="font-mono text-sm text-fg break-all">{text}</span>
      <button type="button" onClick={() => copy(text)} className="text-xs text-accent hover:underline shrink-0">Copy</button>
    </div>
  );

  return (
    <section className="glass rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">Convert coordinates</h2>
        <button type="button" onClick={useMyLocation} className="btn-ghost">📍 Use my location</button>
      </div>

      {/* Paste anything */}
      <form onSubmit={onPaste} className="bg-tint/5 border border-line rounded-lg p-4 mb-3">
        <label htmlFor="paste" className="block text-[11px] uppercase tracking-wider text-accent font-semibold mb-2">
          Paste any coordinate
        </label>
        <div className="flex gap-2">
          <input
            id="paste"
            className="field font-mono flex-1"
            value={paste}
            onChange={(e) => setPaste(e.target.value)}
            placeholder={`48°51'30.3"N 2°17'40.2"E · 31U 448252 5411957 · a Google Maps link`}
          />
          <button type="submit" className="btn-primary">Convert</button>
        </div>
        {pasteNote && !error && <p className="text-xs text-fg-subtle mt-2">{pasteNote}</p>}
        {errFor('paste')}
      </form>

      {/* DD */}
      <div className="bg-tint/5 border border-line rounded-lg p-4 mb-3">
        <div className="text-[11px] uppercase tracking-wider text-accent font-semibold mb-2">① Decimal Degrees (DD)</div>
        <div className="grid grid-cols-2 gap-2">
          <input aria-label="Latitude, decimal degrees" className="field font-mono" value={f.dd.lat} onChange={(e) => onDd('lat', e.target.value)} placeholder="Latitude" />
          <input aria-label="Longitude, decimal degrees" className="field font-mono" value={f.dd.lon} onChange={(e) => onDd('lon', e.target.value)} placeholder="Longitude" />
        </div>
        {errFor('dd')}
        <CopyRow text={ddText} />
      </div>

      {/* DMS */}
      <div className="bg-tint/5 border border-line rounded-lg p-4 mb-3">
        <div className="text-[11px] uppercase tracking-wider text-accent font-semibold mb-2">② DMS — Degrees Minutes Seconds</div>
        {['lat', 'lon'].map((axis) => (
          <div key={axis} className="grid grid-cols-[1fr_1fr_1.4fr_auto] gap-2 mb-2">
            <input aria-label={`${axis === 'lat' ? 'Latitude' : 'Longitude'} degrees`} className="field font-mono text-center" value={f.dms[`${axis}D`]} onChange={(e) => setDms(`${axis}D`, e.target.value)} onBlur={() => commitDms(f.dms)} placeholder="deg" />
            <input aria-label={`${axis === 'lat' ? 'Latitude' : 'Longitude'} minutes`} className="field font-mono text-center" value={f.dms[`${axis}M`]} onChange={(e) => setDms(`${axis}M`, e.target.value)} onBlur={() => commitDms(f.dms)} placeholder="min" />
            <input aria-label={`${axis === 'lat' ? 'Latitude' : 'Longitude'} seconds`} className="field font-mono text-center" value={f.dms[`${axis}S`]} onChange={(e) => setDms(`${axis}S`, e.target.value)} onBlur={() => commitDms(f.dms)} placeholder="sec" />
            <select aria-label={`${axis === 'lat' ? 'Latitude' : 'Longitude'} hemisphere`} className="field" value={f.dms[`${axis}H`]} onChange={(e) => setDms(`${axis}H`, e.target.value, true)}>
              {(axis === 'lat' ? ['N', 'S'] : ['E', 'W']).map((h) => <option key={h}>{h}</option>)}
            </select>
          </div>
        ))}
        {errFor('dms')}
        <CopyRow text={dmsText} />
      </div>

      {/* DDM */}
      <div className="bg-tint/5 border border-line rounded-lg p-4 mb-3">
        <div className="text-[11px] uppercase tracking-wider text-accent font-semibold mb-2">③ DDM — Degrees Decimal Minutes</div>
        {['lat', 'lon'].map((axis) => (
          <div key={axis} className="grid grid-cols-[1fr_2fr_auto] gap-2 mb-2">
            <input aria-label={`${axis === 'lat' ? 'Latitude' : 'Longitude'} degrees (DDM)`} className="field font-mono text-center" value={f.ddm[`${axis}D`]} onChange={(e) => setDdm(`${axis}D`, e.target.value)} onBlur={() => commitDdm(f.ddm)} placeholder="deg" />
            <input aria-label={`${axis === 'lat' ? 'Latitude' : 'Longitude'} decimal minutes`} className="field font-mono text-center" value={f.ddm[`${axis}M`]} onChange={(e) => setDdm(`${axis}M`, e.target.value)} onBlur={() => commitDdm(f.ddm)} placeholder="min" />
            <select aria-label={`${axis === 'lat' ? 'Latitude' : 'Longitude'} hemisphere (DDM)`} className="field" value={f.ddm[`${axis}H`]} onChange={(e) => setDdm(`${axis}H`, e.target.value, true)}>
              {(axis === 'lat' ? ['N', 'S'] : ['E', 'W']).map((h) => <option key={h}>{h}</option>)}
            </select>
          </div>
        ))}
        {errFor('ddm')}
        <CopyRow text={ddmText} />
      </div>

      {/* UTM (input and output) */}
      <form
        onSubmit={(e) => { e.preventDefault(); commitUtm(f.utm); }}
        className="bg-tint/5 border border-line rounded-lg p-4 mb-3"
      >
        <div className="text-[11px] uppercase tracking-wider text-accent font-semibold mb-2">④ UTM — Universal Transverse Mercator</div>
        <div className="grid grid-cols-2 sm:grid-cols-[0.7fr_0.6fr_1.2fr_1.4fr_auto] gap-2">
          <input aria-label="UTM zone" className="field font-mono text-center" value={f.utm.zone} onChange={(e) => setUtm('zone', e.target.value)} placeholder="zone" />
          <input aria-label="UTM latitude band" className="field font-mono text-center uppercase" value={f.utm.band} onChange={(e) => setUtm('band', e.target.value.toUpperCase())} placeholder="band" maxLength={1} />
          <input aria-label="UTM easting in meters" className="field font-mono text-center" value={f.utm.e} onChange={(e) => setUtm('e', e.target.value)} placeholder="easting (m)" />
          <input aria-label="UTM northing in meters" className="field font-mono text-center" value={f.utm.n} onChange={(e) => setUtm('n', e.target.value)} placeholder="northing (m)" />
          <button type="submit" className="btn-ghost col-span-2 sm:col-span-1">Convert UTM</button>
        </div>
        {errFor('utm')}
        {utm ? (
          <CopyRow text={utmText} />
        ) : (
          <p className="text-xs text-fg-subtle mt-2">UTM is only defined between 80°S and 84°N. Polar areas use the UPS grid instead.</p>
        )}
      </form>

      {/* MGRS (output) */}
      <div className="bg-tint/5 border border-line rounded-lg p-4 mb-3">
        <div className="text-[11px] uppercase tracking-wider text-accent font-semibold mb-1">⑤ MGRS — Military Grid Reference System</div>
        {mgrs ? <CopyRow text={mgrs} /> : <p className="text-xs text-fg-subtle mt-2">MGRS follows UTM, so it is not shown beyond 80°S or 84°N.</p>}
      </div>

      <div className="h-[260px] rounded-2xl overflow-hidden ring-1 ring-line">
        <MapView pos={[pos.lat, pos.lon]} />
      </div>
      <p className="text-xs text-fg-subtle mt-2">All formats use the WGS 84 datum, the same one GPS receivers and web maps use.</p>
    </section>
  );
}
