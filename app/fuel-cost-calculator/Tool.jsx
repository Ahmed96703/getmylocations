'use client';

import { useEffect, useMemo, useState } from 'react';
import { searchAddress } from '../address-finder/geocode.js';
import { track } from '../components/track.js';
import { duration } from '../sunrise-sunset/sun.js';
import { ECONOMY, EFFICIENCY, PRICE_UNIT, KM_PER_MILE, L_PER_US_GAL, L_PER_UK_GAL, tripCost, route } from './fuel.js';

const PRESETS = {
  us: { miles: true, econ: 'mpgUS', econV: '28', priceUnit: 'usgal', price: '3.20', cur: '$', eff: 'mikwh', effV: '3.5', kwh: '0.17' },
  uk: { miles: true, econ: 'mpgUK', econV: '45', priceUnit: 'l', price: '1.40', cur: '£', eff: 'mikwh', effV: '3.5', kwh: '0.25' },
  eu: { miles: false, econ: 'l100', econV: '6.5', priceUnit: 'l', price: '1.70', cur: '€', eff: 'kwh100', effV: '17', kwh: '0.30' },
};

const num = (s) => {
  const v = Number(String(s).replace(',', '.'));
  return Number.isFinite(v) && v > 0 ? v : null;
};

function Field({ label, children, hint }) {
  return (
    <label className="block text-sm">
      <span className="block text-xs font-medium text-fg-subtle mb-1">{label}</span>
      {children}
      {hint && <span className="block text-xs text-fg-subtle mt-1">{hint}</span>}
    </label>
  );
}

export default function Tool() {
  const [p, setP] = useState(PRESETS.eu);
  const [ev, setEv] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [dist, setDist] = useState('');
  const [routeInfo, setRouteInfo] = useState(null);
  const [round, setRound] = useState(false);
  const [people, setPeople] = useState('1');
  const [status, setStatus] = useState({ type: 'idle', msg: '' });

  useEffect(() => {
    const l = navigator.language || '';
    if (/^en-US/.test(l)) setP(PRESETS.us);
    else if (/^en-GB/.test(l)) setP(PRESETS.uk);
  }, []);
  const set = (k) => (e) => setP((o) => ({ ...o, [k]: e.target.value }));

  const findRoute = async (e) => {
    e.preventDefault();
    if (!from.trim() || !to.trim()) { setStatus({ type: 'err', msg: 'Enter where you start and where you are going.' }); return; }
    setStatus({ type: 'loading', msg: 'Finding the places…' });
    try {
      const wait = () => setStatus({ type: 'loading', msg: 'Waiting for the address service…' });
      const a = (await searchAddress(from.trim(), wait))?.[0];
      const b = (await searchAddress(to.trim(), wait))?.[0];
      if (!a || !b) { setStatus({ type: 'err', msg: `No place found for "${!a ? from : to}". Try adding the town or country.` }); return; }
      setStatus({ type: 'loading', msg: 'Working out the road distance…' });
      const r = await route({ lat: +a.lat, lon: +a.lon }, { lat: +b.lat, lon: +b.lon });
      const name = (x) => x.display_name.split(',').slice(0, 2).join(',');
      setRouteInfo({ ...r, from: name(a), to: name(b) });
      setDist(String(Math.round((p.miles ? r.km / KM_PER_MILE : r.km) * 10) / 10));
      setStatus({ type: 'ok', msg: '' });
      track('tool_run');
    } catch {
      setStatus({ type: 'err', msg: 'The search did not complete. Check your connection, or type the distance yourself.' });
    }
  };

  const result = useMemo(() => {
    const d = num(dist);
    const km = d && (p.miles ? d * KM_PER_MILE : d);
    const use = ev ? num(p.effV) && EFFICIENCY[p.eff].toK100(num(p.effV)) : num(p.econV) && ECONOMY[p.econ].toL100(num(p.econV));
    const price = ev ? num(p.kwh) : num(p.price) && PRICE_UNIT[p.priceUnit].perL(num(p.price));
    if (!km || !use || !price) return null;
    return { km, ...tripCost({ km, use, price, trips: round ? 2 : 1, people: Math.max(1, Math.round(num(people) || 1)) }) };
  }, [dist, p, ev, round, people]);

  const money = (v) => `${p.cur}${v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const fuelAmount = (l) => (ev ? `${l.toFixed(1)} kWh` : p.priceUnit === 'usgal' ? `${(l / L_PER_US_GAL).toFixed(1)} US gallons` : p.priceUnit === 'ukgal' ? `${(l / L_PER_UK_GAL).toFixed(1)} UK gallons` : `${l.toFixed(1)} litres`);
  const unit = p.miles ? 'miles' : 'km';

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">Trip fuel cost calculator</h2>
        <div className="flex gap-1.5" role="group" aria-label="Car type">
          <button type="button" onClick={() => setEv(false)} aria-pressed={!ev} className={!ev ? 'btn-primary !py-1 !px-3 text-sm' : 'btn-ghost !py-1 !px-3 text-sm'}>⛽ Petrol / diesel</button>
          <button type="button" onClick={() => setEv(true)} aria-pressed={ev} className={ev ? 'btn-primary !py-1 !px-3 text-sm' : 'btn-ghost !py-1 !px-3 text-sm'}>🔌 Electric</button>
        </div>
      </div>

      <form onSubmit={findRoute} className="grid sm:grid-cols-[1fr_1fr_auto] gap-2 items-end">
        <Field label="From"><input className="field w-full" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="e.g. London" /></Field>
        <Field label="To"><input className="field w-full" value={to} onChange={(e) => setTo(e.target.value)} placeholder="e.g. Edinburgh" /></Field>
        <button type="submit" className="btn-primary" disabled={status.type === 'loading'}>Get distance</button>
      </form>
      <div aria-live="polite">
        {status.type === 'loading' && <p className="text-sm text-fg-subtle my-2">{status.msg}</p>}
        {status.type === 'err' && <p role="alert" className="my-2 bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{status.msg}</p>}
        {routeInfo && status.type !== 'loading' && (
          <p className="text-sm text-fg-muted my-2">
            {routeInfo.road
              ? `By road from ${routeInfo.from} to ${routeInfo.to}: ${(p.miles ? routeInfo.km / KM_PER_MILE : routeInfo.km).toFixed(1)} ${unit}, about ${duration(routeInfo.s * 1000)} without stops.`
              : `The road route was not available, so this is the straight-line distance from ${routeInfo.from} to ${routeInfo.to}. The road distance will be longer: type it in if you know it.`}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        <Field label={`Distance (${unit})`}><input className="field w-full" inputMode="decimal" value={dist} onChange={(e) => setDist(e.target.value)} placeholder="0" /></Field>
        <Field label="Units">
          <select className="field w-full" value={p.miles ? 'mi' : 'km'} onChange={(e) => { const m = e.target.value === 'mi'; const d = num(dist); if (d && m !== p.miles) setDist(String(Math.round((m ? d / KM_PER_MILE : d * KM_PER_MILE) * 10) / 10)); setP((o) => ({ ...o, miles: m })); }}>
            <option value="km">Kilometres</option><option value="mi">Miles</option>
          </select>
        </Field>
        {ev ? (
          <>
            <Field label="Efficiency"><input className="field w-full" inputMode="decimal" value={p.effV} onChange={set('effV')} /></Field>
            <Field label="Unit"><select className="field w-full" value={p.eff} onChange={set('eff')}>{Object.entries(EFFICIENCY).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select></Field>
            <Field label="Electricity price per kWh"><input className="field w-full" inputMode="decimal" value={p.kwh} onChange={set('kwh')} /></Field>
          </>
        ) : (
          <>
            <Field label="Fuel economy"><input className="field w-full" inputMode="decimal" value={p.econV} onChange={set('econV')} /></Field>
            <Field label="Unit"><select className="field w-full" value={p.econ} onChange={set('econ')}>{Object.entries(ECONOMY).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select></Field>
            <Field label="Fuel price"><input className="field w-full" inputMode="decimal" value={p.price} onChange={set('price')} /></Field>
            <Field label="Price is"><select className="field w-full" value={p.priceUnit} onChange={set('priceUnit')}>{Object.entries(PRICE_UNIT).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select></Field>
          </>
        )}
        <Field label="Currency symbol"><input className="field w-full" value={p.cur} maxLength={4} onChange={set('cur')} /></Field>
        <Field label="People sharing"><input className="field w-full" inputMode="numeric" value={people} onChange={(e) => setPeople(e.target.value)} /></Field>
        <label className="flex items-center gap-2 text-sm text-fg-muted self-end pb-2"><input type="checkbox" checked={round} onChange={(e) => setRound(e.target.checked)} /> Return trip</label>
      </div>

      {result ? (
        <div className="mt-5 rounded-xl p-4 ring-1 ring-line bg-tint/5">
          <p className="text-xs uppercase tracking-wide text-fg-subtle">{ev ? 'Charging cost' : 'Fuel cost'}{round ? ' there and back' : ''}</p>
          <p className="font-display text-4xl font-bold text-fg mt-1">{money(result.cost)}</p>
          <dl className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
            <div><dt className="text-xs text-fg-subtle">{ev ? 'Energy used' : 'Fuel used'}</dt><dd className="text-fg">{fuelAmount(result.amount)}</dd></div>
            <div><dt className="text-xs text-fg-subtle">Total distance</dt><dd className="text-fg">{(p.miles ? (result.km * (round ? 2 : 1)) / KM_PER_MILE : result.km * (round ? 2 : 1)).toFixed(1)} {unit}</dd></div>
            <div><dt className="text-xs text-fg-subtle">Cost per {p.miles ? 'mile' : 'km'}</dt><dd className="text-fg">{money(p.miles ? result.perKm * KM_PER_MILE : result.perKm)}</dd></div>
            {Math.round(num(people) || 1) > 1 && <div><dt className="text-xs text-fg-subtle">Each of {Math.round(num(people))} people</dt><dd className="font-semibold text-fg">{money(result.each)}</dd></div>}
          </dl>
        </div>
      ) : (
        <p className="mt-5 text-sm text-fg-subtle">Enter a distance, or two places, to see the cost.</p>
      )}

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Road distances from the <a href="https://project-osrm.org/" target="_blank" rel="noopener" className="hover:underline">OSRM</a> route planner using <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener" className="hover:underline">OpenStreetMap</a> data; place search by Nominatim. Fuel prices are examples: type in what you pay. Real consumption is usually higher in towns, at motorway speeds and in cold weather.
      </p>
    </section>
  );
}
