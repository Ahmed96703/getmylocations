'use client';

import { useState } from 'react';
import { searchAddress } from '../address-finder/geocode.js';

// Shared "where?" state for the single-purpose map tools: your location, a
// typed search, or a map click. `onPlace(lat, lon, label)` runs for each.
export function usePlace(onPlace) {
  const [status, setStatus] = useState({ type: 'idle', msg: '' });
  const [query, setQuery] = useState('');

  const useMyLocation = () => {
    if (!('geolocation' in navigator)) { setStatus({ type: 'err', msg: 'Your browser does not support location. Search for a place instead.' }); return; }
    setStatus({ type: 'loading', msg: 'Requesting your location…' });
    navigator.geolocation.getCurrentPosition(
      (p) => { setStatus({ type: 'ok', msg: '' }); onPlace(p.coords.latitude, p.coords.longitude, 'your location'); },
      (e) => setStatus({ type: 'err', msg: e.code === 1
        ? 'Location permission was denied. Allow it from the lock icon in the address bar, or search for a place instead.'
        : 'Your device could not get a location fix. Search for a place, or click the map.' }),
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 },
    );
  };

  const search = async (e) => {
    e.preventDefault();
    const text = query.trim();
    if (!text) return;
    setStatus({ type: 'loading', msg: 'Searching…' });
    try {
      const found = await searchAddress(text, () => setStatus({ type: 'loading', msg: 'Waiting for the address service…' }));
      if (!found?.length) { setStatus({ type: 'err', msg: `No place found for "${text}". Try adding the town or country.` }); return; }
      setStatus({ type: 'ok', msg: '' });
      onPlace(Number(found[0].lat), Number(found[0].lon), found[0].display_name.split(',').slice(0, 2).join(','));
    } catch (err) {
      setStatus({ type: 'err', msg: err.message?.includes('limiting') ? err.message : 'The search did not complete. Check your connection and try again.' });
    }
  };

  return { status, setStatus, query, setQuery, useMyLocation, search };
}

// The search row used by every tool: button, text box, submit.
export function PlaceSearch({ place, button, placeholder = 'Search a town, address or postcode' }) {
  const busy = place.status.type === 'loading';
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-3">
        <button type="button" onClick={place.useMyLocation} disabled={busy} className="btn-primary">📍 {button}</button>
        <form onSubmit={place.search} className="flex flex-1 flex-wrap gap-2 min-w-[240px]">
          <input className="field flex-1 min-w-[180px]" value={place.query} onChange={(e) => place.setQuery(e.target.value)} placeholder={placeholder} aria-label={placeholder} />
          <button type="submit" disabled={busy} className="btn-ghost">Search</button>
        </form>
      </div>
      <div aria-live="polite">
        {busy && <p className="text-sm text-fg-subtle my-2">{place.status.msg}</p>}
        {place.status.type === 'err' && <p role="alert" className="my-2 bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{place.status.msg}</p>}
      </div>
    </>
  );
}
