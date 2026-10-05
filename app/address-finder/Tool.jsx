'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { searchAddress, reverseLookup, precisionOf, metersBetween, formatMeters } from './geocode.js';
import { parseCoordinate, ddToDms } from '../coordinates-converter/geo.js';

const AddressMap = dynamic(() => import('./AddressMap.jsx'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-tint/5 animate-pulse" aria-label="Loading map" />,
});

const dms = (lat, lon) => {
  const f = (v, pos, neg) => {
    const d = ddToDms(v);
    return `${d.d}°${String(d.m).padStart(2, '0')}′${d.s.toFixed(1)}″${v < 0 ? neg : pos}`;
  };
  return `${f(lat, 'N', 'S')} ${f(lon, 'E', 'W')}`;
};

function Status({ s }) {
  if (!s) return null;
  if (s.type === 'loading') {
    return (
      <div className="bg-accent/10 border border-accent/40 text-accent rounded-lg p-3 text-sm mt-3 flex items-center gap-2">
        <span className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        {s.msg}
      </div>
    );
  }
  if (s.type === 'err') return <div role="alert" className="bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm mt-3">{s.msg}</div>;
  return null;
}

function Precision({ result }) {
  const p = precisionOf(result);
  return (
    <div className="bg-tint/5 border border-line rounded-md p-2">
      <dt className="text-[10px] uppercase tracking-wider text-fg-subtle">Matched to</dt>
      <dd className="text-sm"><strong className="text-fg">{p.label}</strong> <span className="text-fg-subtle">· {p.accuracy}</span></dd>
    </div>
  );
}

function Coords({ lat, lon }) {
  const dd = `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
  const d = dms(lat, lon);
  return (
    <>
      {[['Decimal degrees', dd], ['DMS', d]].map(([k, v]) => (
        <div key={k} className="bg-tint/5 border border-line rounded-md p-2 flex justify-between items-center gap-2">
          <div>
            <dt className="text-[10px] uppercase tracking-wider text-fg-subtle">{k}</dt>
            <dd className="font-mono text-sm">{v}</dd>
          </div>
          <button type="button" onClick={() => navigator.clipboard.writeText(v)} className="text-xs text-accent hover:underline shrink-0">Copy</button>
        </div>
      ))}
    </>
  );
}

export default function Tool() {
  const [addr, setAddr] = useState('Eiffel Tower, Paris');
  const [matches, setMatches] = useState([]);
  const [picked, setPicked] = useState(0);
  const [fwdStatus, setFwdStatus] = useState(null);

  const [coordText, setCoordText] = useState('');
  const [rev, setRev] = useState(null); // { result, query: [lat, lon] }
  const [revStatus, setRevStatus] = useState(null);

  const [mapMode, setMapMode] = useState(null); // 'fwd' | 'rev'

  const waitNote = (set) => () => set({ type: 'loading', msg: 'Waiting a moment: the free geocoder allows one request per second…' });

  const forward = async () => {
    const q = addr.trim();
    if (!q) { setFwdStatus({ type: 'err', msg: 'Enter an address, place, or landmark.' }); return; }
    setFwdStatus({ type: 'loading', msg: 'Searching…' });
    try {
      const arr = await searchAddress(q, waitNote(setFwdStatus));
      if (!arr?.length) {
        setMatches([]);
        setFwdStatus({ type: 'err', msg: 'No match found. Add the city and country, or check the spelling.' });
        return;
      }
      setMatches(arr);
      setPicked(0);
      setMapMode('fwd');
      setFwdStatus(null);
    } catch (e) {
      setFwdStatus({ type: 'err', msg: e.message });
    }
  };

  const reverse = async (lat, lon) => {
    setRevStatus({ type: 'loading', msg: 'Looking up the nearest address…' });
    try {
      const d = await reverseLookup(lat, lon, waitNote(setRevStatus));
      if (!d || d.error) {
        setRev(null);
        setRevStatus({ type: 'err', msg: 'No address was found near that point. It may be at sea or in an unmapped area.' });
        return;
      }
      setRev({ result: d, query: [lat, lon] });
      setMapMode('rev');
      setRevStatus(null);
    } catch (e) {
      setRevStatus({ type: 'err', msg: e.message });
    }
  };

  const reverseFromInput = () => {
    const p = parseCoordinate(coordText);
    if (p.error) { setRevStatus({ type: 'err', msg: p.error }); return; }
    reverse(p.lat, p.lon);
  };

  const myLocation = () => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition((p) => {
      const { latitude, longitude } = p.coords;
      setCoordText(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
      reverse(latitude, longitude);
    });
  };

  const sel = matches[picked];
  const revResult = rev?.result;
  const revAddr = revResult?.address || {};
  const gap = rev ? metersBetween(rev.query[0], rev.query[1], +revResult.lat, +revResult.lon) : 0;

  const map = mapMode === 'fwd' && sel
    ? { place: [+sel.lat, +sel.lon], label: sel.display_name }
    : mapMode === 'rev' && rev
      ? { place: [+revResult.lat, +revResult.lon], label: revResult.display_name, query: gap >= 1 ? rev.query : null }
      : null;

  return (
    <>
      <section className="glass rounded-2xl p-6 mb-4">
        <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
          <h2 className="text-lg font-bold">Address → Coordinates</h2>
          <span className="text-[10px] uppercase tracking-wider text-fg-subtle bg-tint/5 px-2 py-1 rounded">Forward geocoding</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <input aria-label="Address, place, or landmark" className="field flex-1 min-w-[200px]" value={addr} onChange={(e) => setAddr(e.target.value)} placeholder="Address, place, or landmark" onKeyDown={(e) => e.key === 'Enter' && forward()} />
          <button type="button" onClick={forward} className="btn-primary">Find →</button>
        </div>
        <Status s={fwdStatus} />
        {matches.length > 1 && (
          <div className="mt-3">
            <p className="text-xs text-fg-subtle mb-1.5">{matches.length} places match. Pick the one you meant:</p>
            <ul className="space-y-1">
              {matches.map((m, i) => (
                <li key={m.place_id}>
                  <button
                    type="button"
                    onClick={() => { setPicked(i); setMapMode('fwd'); }}
                    className={`w-full text-left text-xs rounded-md px-2.5 py-1.5 border transition ${i === picked ? 'border-accent bg-accent/10 text-fg' : 'border-line hover:bg-tint/5 text-fg-muted'}`}
                  >
                    {m.display_name} <span className="text-fg-subtle">· {precisionOf(m).label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {sel && (
          <dl className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
            <Coords lat={+sel.lat} lon={+sel.lon} />
            <div className="sm:col-span-2"><Precision result={sel} /></div>
            <div className="bg-tint/5 border border-line rounded-md p-2 sm:col-span-2"><dt className="text-[10px] uppercase tracking-wider text-fg-subtle">Matched place</dt><dd className="text-xs">{sel.display_name}</dd></div>
          </dl>
        )}
      </section>

      <section className="glass rounded-2xl p-6 mb-4">
        <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
          <h2 className="text-lg font-bold">Coordinates → Address</h2>
          <span className="text-[10px] uppercase tracking-wider text-fg-subtle bg-tint/5 px-2 py-1 rounded">Reverse geocoding</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <input aria-label="Coordinates in any format" className="field flex-1 min-w-[200px] font-mono" value={coordText} onChange={(e) => setCoordText(e.target.value)} placeholder={`48.8584, 2.2945 · 48°51'30"N 2°17'40"E · UTM`} onKeyDown={(e) => e.key === 'Enter' && reverseFromInput()} />
          <button type="button" onClick={reverseFromInput} className="btn-primary">Find →</button>
        </div>
        <button type="button" onClick={myLocation} className="btn-ghost mt-2">📍 Use my current location</button>
        <Status s={revStatus} />
        {rev && (
          <dl className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
            <div className="bg-tint/5 border border-line rounded-md p-2 sm:col-span-2"><dt className="text-[10px] uppercase tracking-wider text-fg-subtle">Nearest address</dt><dd className="text-xs">{revResult.display_name}</dd></div>
            <div className="bg-tint/5 border border-line rounded-md p-2"><dt className="text-[10px] uppercase tracking-wider text-fg-subtle">Road</dt><dd className="text-sm">{revAddr.road || revAddr.pedestrian || '—'}{revAddr.house_number ? ` ${revAddr.house_number}` : ''}</dd></div>
            <div className="bg-tint/5 border border-line rounded-md p-2"><dt className="text-[10px] uppercase tracking-wider text-fg-subtle">City</dt><dd className="text-sm">{revAddr.city || revAddr.town || revAddr.village || revAddr.municipality || revAddr.county || '—'}</dd></div>
            <div className="bg-tint/5 border border-line rounded-md p-2"><dt className="text-[10px] uppercase tracking-wider text-fg-subtle">Country</dt><dd className="text-sm">{revAddr.country || '—'}</dd></div>
            <div className="bg-tint/5 border border-line rounded-md p-2"><dt className="text-[10px] uppercase tracking-wider text-fg-subtle">Postal code</dt><dd className="text-sm">{revAddr.postcode || '—'}</dd></div>
            <div className="sm:col-span-2"><Precision result={revResult} /></div>
            <div className="bg-tint/5 border border-line rounded-md p-2 sm:col-span-2">
              <dt className="text-[10px] uppercase tracking-wider text-fg-subtle">Distance from your point</dt>
              <dd className="text-sm">The matched object is <strong className="text-fg">{formatMeters(gap)}</strong> from the coordinates you entered{gap > 100 ? ', so treat the address as the general area rather than this exact spot.' : '.'}</dd>
            </div>
          </dl>
        )}
      </section>

      {map && (
        <div className="h-[380px] rounded-2xl overflow-hidden ring-1 ring-line">
          <AddressMap place={map.place} label={map.label} query={map.query} />
        </div>
      )}
      <p className="text-xs text-fg-subtle mt-2">
        Geocoding by OpenStreetMap&rsquo;s Nominatim service, limited to one request per second under its usage policy. Map data &copy; OpenStreetMap contributors.
      </p>
    </>
  );
}
