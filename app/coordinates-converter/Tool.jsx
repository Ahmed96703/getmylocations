'use client';

import { useState, useEffect, useRef } from 'react';

function ddToDms(dd) {
  if (!isFinite(dd)) return null;
  const sign = dd < 0 ? -1 : 1, abs = Math.abs(dd);
  const d = Math.floor(abs), mF = (abs - d) * 60, m = Math.floor(mF), s = (mF - m) * 60;
  return { sign, d, m, s };
}
function ddToDdm(dd) {
  if (!isFinite(dd)) return null;
  const sign = dd < 0 ? -1 : 1, abs = Math.abs(dd);
  const d = Math.floor(abs), m = (abs - d) * 60;
  return { sign, d, m };
}
function dmsToDd(d, m, s, hem) {
  const sign = hem === 'S' || hem === 'W' ? -1 : 1;
  return sign * ((parseFloat(d) || 0) + (parseFloat(m) || 0) / 60 + (parseFloat(s) || 0) / 3600);
}
function ddmToDd(d, m, hem) {
  const sign = hem === 'S' || hem === 'W' ? -1 : 1;
  return sign * ((parseFloat(d) || 0) + (parseFloat(m) || 0) / 60);
}
function latLonToUtm(lat, lon) {
  if (!isFinite(lat) || !isFinite(lon) || lat < -80 || lat > 84) return null;
  const a = 6378137, eccSq = 0.00669438, k0 = 0.9996;
  let zone = Math.floor((lon + 180) / 6) + 1;
  if (lat >= 56 && lat < 64 && lon >= 3 && lon < 12) zone = 32;
  const lambda0 = ((zone - 1) * 6 - 180 + 3) * Math.PI / 180;
  const phi = lat * Math.PI / 180, lambda = lon * Math.PI / 180;
  const N = a / Math.sqrt(1 - eccSq * Math.sin(phi) ** 2);
  const T = Math.tan(phi) ** 2;
  const C = (eccSq / (1 - eccSq)) * Math.cos(phi) ** 2;
  const A = Math.cos(phi) * (lambda - lambda0);
  const M = a * ((1 - eccSq/4 - 3*eccSq*eccSq/64 - 5*eccSq**3/256) * phi
    - (3*eccSq/8 + 3*eccSq*eccSq/32 + 45*eccSq**3/1024) * Math.sin(2*phi)
    + (15*eccSq*eccSq/256 + 45*eccSq**3/1024) * Math.sin(4*phi)
    - (35*eccSq**3/3072) * Math.sin(6*phi));
  const easting = k0 * N * (A + (1-T+C)*A**3/6 + (5-18*T+T*T+72*C-58*eccSq)*A**5/120) + 500000;
  let northing = k0 * (M + N * Math.tan(phi) * (A*A/2 + (5-T+9*C+4*C*C)*A**4/24 + (61-58*T+T*T+600*C-330*eccSq)*A**6/720));
  if (lat < 0) northing += 10000000;
  const bands = 'CDEFGHJKLMNPQRSTUVWX';
  const band = bands[Math.floor((lat + 80) / 8)] || 'X';
  return { zone, band, easting, northing };
}

const fmt = (n, p) => (Math.round(n * 10 ** p) / 10 ** p).toString();

export default function Tool() {
  const [latDD, setLatDD] = useState('48.858420');
  const [lonDD, setLonDD] = useState('2.294500');
  const [dms, setDms] = useState({ latD: '', latM: '', latS: '', latH: 'N', lonD: '', lonM: '', lonS: '', lonH: 'E' });
  const [ddm, setDdm] = useState({ latD: '', latM: '', latH: 'N', lonD: '', lonM: '', lonH: 'E' });
  const [utm, setUtm] = useState(null);
  const updatingRef = useRef(false);

  // Compute everything from DD
  useEffect(() => {
    if (updatingRef.current) return;
    const lat = parseFloat(latDD), lon = parseFloat(lonDD);
    if (!isFinite(lat) || !isFinite(lon)) return;
    updatingRef.current = true;
    const ldms = ddToDms(lat), ndms = ddToDms(lon);
    const lddm = ddToDdm(lat), nddm = ddToDdm(lon);
    setDms({
      latD: String(ldms.d), latM: String(ldms.m), latS: fmt(ldms.s, 3), latH: ldms.sign < 0 ? 'S' : 'N',
      lonD: String(ndms.d), lonM: String(ndms.m), lonS: fmt(ndms.s, 3), lonH: ndms.sign < 0 ? 'W' : 'E',
    });
    setDdm({
      latD: String(lddm.d), latM: fmt(lddm.m, 4), latH: lddm.sign < 0 ? 'S' : 'N',
      lonD: String(nddm.d), lonM: fmt(nddm.m, 4), lonH: nddm.sign < 0 ? 'W' : 'E',
    });
    setUtm(latLonToUtm(lat, lon));
    setTimeout(() => { updatingRef.current = false; }, 0);
  }, [latDD, lonDD]);

  const syncFromDms = () => {
    updatingRef.current = true;
    const lat = dmsToDd(dms.latD, dms.latM, dms.latS, dms.latH);
    const lon = dmsToDd(dms.lonD, dms.lonM, dms.lonS, dms.lonH);
    setLatDD(fmt(lat, 6)); setLonDD(fmt(lon, 6));
    setTimeout(() => { updatingRef.current = false; }, 0);
  };
  const syncFromDdm = () => {
    updatingRef.current = true;
    const lat = ddmToDd(ddm.latD, ddm.latM, ddm.latH);
    const lon = ddmToDd(ddm.lonD, ddm.lonM, ddm.lonH);
    setLatDD(fmt(lat, 6)); setLonDD(fmt(lon, 6));
    setTimeout(() => { updatingRef.current = false; }, 0);
  };

  const useMyLocation = () => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition((p) => {
      setLatDD(p.coords.latitude.toFixed(6));
      setLonDD(p.coords.longitude.toFixed(6));
    });
  };

  const copy = (text) => navigator.clipboard.writeText(text);

  return (
    <section className="glass rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">Convert coordinates</h2>
        <button onClick={useMyLocation} className="btn-ghost">📍 Use my location</button>
      </div>

      {/* DD */}
      <div className="bg-tint/5 border border-line rounded-lg p-4 mb-3">
        <div className="text-[11px] uppercase tracking-wider text-accent font-semibold mb-2">① Decimal Degrees (DD)</div>
        <div className="grid grid-cols-2 gap-2">
          <input className="field font-mono" value={latDD} onChange={(e) => setLatDD(e.target.value)} placeholder="Latitude" />
          <input className="field font-mono" value={lonDD} onChange={(e) => setLonDD(e.target.value)} placeholder="Longitude" />
        </div>
        <div className="bg-accent/10 border border-accent/40 rounded-md p-2 mt-2 flex justify-between items-center">
          <span className="font-mono text-sm text-fg">{latDD}, {lonDD}</span>
          <button onClick={() => copy(`${latDD}, ${lonDD}`)} className="text-xs text-accent hover:underline">Copy</button>
        </div>
      </div>

      {/* DMS */}
      <div className="bg-tint/5 border border-line rounded-lg p-4 mb-3">
        <div className="text-[11px] uppercase tracking-wider text-accent font-semibold mb-2">② DMS — Degrees Minutes Seconds</div>
        <div className="text-[10px] text-fg-subtle mb-1">Latitude</div>
        <div className="grid grid-cols-[1fr_1fr_1fr_70px] gap-1 mb-2">
          <input className="field font-mono text-center" value={dms.latD} onChange={(e) => setDms({ ...dms, latD: e.target.value })} onBlur={syncFromDms} placeholder="deg" />
          <input className="field font-mono text-center" value={dms.latM} onChange={(e) => setDms({ ...dms, latM: e.target.value })} onBlur={syncFromDms} placeholder="min" />
          <input className="field font-mono text-center" value={dms.latS} onChange={(e) => setDms({ ...dms, latS: e.target.value })} onBlur={syncFromDms} placeholder="sec" />
          <select className="field" value={dms.latH} onChange={(e) => { setDms({ ...dms, latH: e.target.value }); setTimeout(syncFromDms, 0); }}>
            <option>N</option><option>S</option>
          </select>
        </div>
        <div className="text-[10px] text-fg-subtle mb-1">Longitude</div>
        <div className="grid grid-cols-[1fr_1fr_1fr_70px] gap-1">
          <input className="field font-mono text-center" value={dms.lonD} onChange={(e) => setDms({ ...dms, lonD: e.target.value })} onBlur={syncFromDms} placeholder="deg" />
          <input className="field font-mono text-center" value={dms.lonM} onChange={(e) => setDms({ ...dms, lonM: e.target.value })} onBlur={syncFromDms} placeholder="min" />
          <input className="field font-mono text-center" value={dms.lonS} onChange={(e) => setDms({ ...dms, lonS: e.target.value })} onBlur={syncFromDms} placeholder="sec" />
          <select className="field" value={dms.lonH} onChange={(e) => { setDms({ ...dms, lonH: e.target.value }); setTimeout(syncFromDms, 0); }}>
            <option>E</option><option>W</option>
          </select>
        </div>
      </div>

      {/* DDM */}
      <div className="bg-tint/5 border border-line rounded-lg p-4 mb-3">
        <div className="text-[11px] uppercase tracking-wider text-accent font-semibold mb-2">③ DDM — Degrees Decimal Minutes</div>
        <div className="grid grid-cols-[1fr_2fr_70px] gap-1 mb-2">
          <input className="field font-mono text-center" value={ddm.latD} onChange={(e) => setDdm({ ...ddm, latD: e.target.value })} onBlur={syncFromDdm} placeholder="lat deg" />
          <input className="field font-mono text-center" value={ddm.latM} onChange={(e) => setDdm({ ...ddm, latM: e.target.value })} onBlur={syncFromDdm} placeholder="decimal min" />
          <select className="field" value={ddm.latH} onChange={(e) => { setDdm({ ...ddm, latH: e.target.value }); setTimeout(syncFromDdm, 0); }}>
            <option>N</option><option>S</option>
          </select>
        </div>
        <div className="grid grid-cols-[1fr_2fr_70px] gap-1">
          <input className="field font-mono text-center" value={ddm.lonD} onChange={(e) => setDdm({ ...ddm, lonD: e.target.value })} onBlur={syncFromDdm} placeholder="lon deg" />
          <input className="field font-mono text-center" value={ddm.lonM} onChange={(e) => setDdm({ ...ddm, lonM: e.target.value })} onBlur={syncFromDdm} placeholder="decimal min" />
          <select className="field" value={ddm.lonH} onChange={(e) => { setDdm({ ...ddm, lonH: e.target.value }); setTimeout(syncFromDdm, 0); }}>
            <option>E</option><option>W</option>
          </select>
        </div>
      </div>

      {/* UTM */}
      {utm && (
        <div className="bg-tint/5 border border-line rounded-lg p-4">
          <div className="text-[11px] uppercase tracking-wider text-accent font-semibold mb-3">④ UTM</div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-fg-subtle text-xs">Zone</span><div className="font-mono">{utm.zone}</div></div>
            <div><span className="text-fg-subtle text-xs">Band</span><div className="font-mono">{utm.band}</div></div>
            <div><span className="text-fg-subtle text-xs">Easting (m)</span><div className="font-mono">{utm.easting.toFixed(2)}</div></div>
            <div><span className="text-fg-subtle text-xs">Northing (m)</span><div className="font-mono">{utm.northing.toFixed(2)}</div></div>
          </div>
          <div className="bg-accent/10 border border-accent/40 rounded-md p-2 mt-3 flex justify-between items-center">
            <span className="font-mono text-sm text-fg">{utm.zone}{utm.band} {Math.round(utm.easting)} {Math.round(utm.northing)}</span>
            <button onClick={() => copy(`${utm.zone}${utm.band} ${Math.round(utm.easting)} ${Math.round(utm.northing)}`)} className="text-xs text-accent hover:underline">Copy</button>
          </div>
        </div>
      )}
    </section>
  );
}
