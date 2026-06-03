'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const MapMarker = dynamic(() => import('../ip-location/MapMarker.jsx'), { ssr: false });

export default function Tool() {
  const [addr, setAddr] = useState('Eiffel Tower, Paris');
  const [addrResult, setAddrResult] = useState(null);
  const [addrStatus, setAddrStatus] = useState({ type: 'idle' });

  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [revResult, setRevResult] = useState(null);
  const [revStatus, setRevStatus] = useState({ type: 'idle' });

  const [mapPos, setMapPos] = useState(null);

  const forward = () => {
    if (!addr.trim()) { setAddrStatus({ type: 'err', msg: 'Enter an address.' }); return; }
    setAddrStatus({ type: 'loading', msg: 'Searching…' });
    fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&q=${encodeURIComponent(addr)}`, { headers: { Accept: 'application/json' } })
      .then((r) => r.json())
      .then((arr) => {
        if (!arr?.length) { setAddrStatus({ type: 'err', msg: 'No match found. Try adding city/country.' }); return; }
        const d = arr[0];
        const la = parseFloat(d.lat), lo = parseFloat(d.lon);
        setAddrResult({ lat: la, lon: lo, name: d.display_name, type: `${d.class || ''} / ${d.type || ''}` });
        setMapPos({ lat: la, lon: lo, label: d.display_name });
        setAddrStatus({ type: 'ok', msg: `✓ Found: ${la.toFixed(4)}, ${lo.toFixed(4)}` });
      })
      .catch((e) => setAddrStatus({ type: 'err', msg: `Lookup error: ${e.message}` }));
  };

  const reverse = (la, lo) => {
    setRevStatus({ type: 'loading', msg: 'Searching…' });
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&lat=${la}&lon=${lo}`, { headers: { Accept: 'application/json' } })
      .then((r) => r.json())
      .then((d) => {
        if (!d || d.error) { setRevStatus({ type: 'err', msg: 'No address found at those coordinates.' }); return; }
        const a = d.address || {};
        setRevResult({
          full: d.display_name,
          road: a.road || a.pedestrian || '—',
          city: a.city || a.town || a.village || a.county || '—',
          country: a.country || '—',
          postal: a.postcode || '—',
        });
        setMapPos({ lat: la, lon: lo, label: d.display_name });
        setRevStatus({ type: 'ok', msg: '✓ Address resolved.' });
      })
      .catch((e) => setRevStatus({ type: 'err', msg: `Lookup error: ${e.message}` }));
  };

  const reverseFromInputs = () => {
    const la = parseFloat(lat), lo = parseFloat(lon);
    if (!isFinite(la) || !isFinite(lo)) { setRevStatus({ type: 'err', msg: 'Enter valid decimal coordinates.' }); return; }
    reverse(la, lo);
  };

  const myLocation = () => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition((p) => {
      setLat(p.coords.latitude.toFixed(6));
      setLon(p.coords.longitude.toFixed(6));
      reverse(p.coords.latitude, p.coords.longitude);
    });
  };

  const StatusBox = ({ s }) => {
    if (s.type === 'loading') return <div className="bg-accent/10 border border-accent/40 text-accent rounded-lg p-3 text-sm mt-3 flex items-center gap-2"><span className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />{s.msg}</div>;
    if (s.type === 'err') return <div className="bg-rose-500/10 border border-rose-400/30 text-rose-200 rounded-lg p-3 text-sm mt-3">{s.msg}</div>;
    if (s.type === 'ok') return <div className="bg-emerald-500/10 border border-emerald-400/30 text-emerald-200 rounded-lg p-3 text-sm mt-3">{s.msg}</div>;
    return null;
  };

  return (
    <>
      <section className="glass rounded-2xl p-6 mb-4">
        <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
          <h2 className="text-lg font-bold">Address → Coordinates</h2>
          <span className="text-[10px] uppercase tracking-wider text-fg-subtle bg-tint/5 px-2 py-1 rounded">Forward geocoding</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <input className="field flex-1 min-w-[200px]" value={addr} onChange={(e) => setAddr(e.target.value)} placeholder="Address or landmark" onKeyDown={(e) => e.key === 'Enter' && forward()} />
          <button onClick={forward} className="btn-primary">Find →</button>
        </div>
        <StatusBox s={addrStatus} />
        {addrResult && (
          <dl className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
            <div className="bg-tint/5 border border-line rounded-md p-2"><dt className="text-[10px] uppercase tracking-wider text-fg-subtle">Lat</dt><dd className="font-mono">{addrResult.lat.toFixed(6)}</dd></div>
            <div className="bg-tint/5 border border-line rounded-md p-2"><dt className="text-[10px] uppercase tracking-wider text-fg-subtle">Lon</dt><dd className="font-mono">{addrResult.lon.toFixed(6)}</dd></div>
            <div className="bg-tint/5 border border-line rounded-md p-2 sm:col-span-2"><dt className="text-[10px] uppercase tracking-wider text-fg-subtle">Display name</dt><dd className="text-xs">{addrResult.name}</dd></div>
          </dl>
        )}
      </section>

      <section className="glass rounded-2xl p-6 mb-4">
        <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
          <h2 className="text-lg font-bold">Coordinates → Address</h2>
          <span className="text-[10px] uppercase tracking-wider text-fg-subtle bg-tint/5 px-2 py-1 rounded">Reverse geocoding</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <input className="field flex-1 min-w-[120px] font-mono" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Latitude" />
          <input className="field flex-1 min-w-[120px] font-mono" value={lon} onChange={(e) => setLon(e.target.value)} placeholder="Longitude" />
          <button onClick={reverseFromInputs} className="btn-primary">Find →</button>
        </div>
        <button onClick={myLocation} className="btn-ghost mt-2">📍 Use my current location</button>
        <StatusBox s={revStatus} />
        {revResult && (
          <dl className="grid sm:grid-cols-2 gap-2 mt-3 text-sm">
            <div className="bg-tint/5 border border-line rounded-md p-2 sm:col-span-2"><dt className="text-[10px] uppercase tracking-wider text-fg-subtle">Full address</dt><dd className="text-xs">{revResult.full}</dd></div>
            <div className="bg-tint/5 border border-line rounded-md p-2"><dt className="text-[10px] uppercase tracking-wider text-fg-subtle">Road</dt><dd className="text-sm">{revResult.road}</dd></div>
            <div className="bg-tint/5 border border-line rounded-md p-2"><dt className="text-[10px] uppercase tracking-wider text-fg-subtle">City</dt><dd className="text-sm">{revResult.city}</dd></div>
            <div className="bg-tint/5 border border-line rounded-md p-2"><dt className="text-[10px] uppercase tracking-wider text-fg-subtle">Country</dt><dd className="text-sm">{revResult.country}</dd></div>
            <div className="bg-tint/5 border border-line rounded-md p-2"><dt className="text-[10px] uppercase tracking-wider text-fg-subtle">Postal</dt><dd className="text-sm">{revResult.postal}</dd></div>
          </dl>
        )}
      </section>

      {mapPos && (
        <div className="h-[380px] rounded-2xl overflow-hidden ring-1 ring-line">
          <MapMarker lat={mapPos.lat} lon={mapPos.lon} label={mapPos.label} />
        </div>
      )}
    </>
  );
}
