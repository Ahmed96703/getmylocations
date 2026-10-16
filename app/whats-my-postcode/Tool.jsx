'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import CopyButton from '../components/CopyButton.jsx';
import { reverseLookup, searchAddress, formatMeters } from '../address-finder/geocode.js';
import { ONS_COUNTRY, isUkPostcode, postcodeParts, nearestUkPostcode, lookupUkPostcode } from './postcode.js';

const Map = dynamic(() => import('../maps/Map.jsx'), {
  ssr: false,
  loading: () => <div className="w-full aspect-[16/10] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading map" />,
});

const UK_CENTRE = [54.0, -2.5];
// Rough box around Great Britain and Northern Ireland: inside it, ask
// postcodes.io in parallel with Nominatim instead of waiting for the country.
const nearUk = (lat, lon) => lat > 49.8 && lat < 61 && lon > -8.7 && lon < 2;

// "10 Downing Street, Westminster, London" from Nominatim's address parts.
function addressLine(a = {}, fallback = '') {
  const street = [a.house_number, a.road || a.pedestrian || a.footway].filter(Boolean).join(' ');
  const parts = [a.house_name, street, a.suburb || a.neighbourhood || a.quarter, a.city || a.town || a.village || a.hamlet]
    .filter((v, i, arr) => v && arr.indexOf(v) === i);
  return parts.length ? parts.join(', ') : fallback.split(',').slice(0, 3).join(',');
}

export default function Tool() {
  const [query, setQuery] = useState('');
  const [view, setView] = useState({ center: UK_CENTRE, zoom: 5 });
  const [pin, setPin] = useState(null);
  const [status, setStatus] = useState({ type: 'idle', msg: '' });
  const [res, setRes] = useState(null);

  const fail = (msg) => { setStatus({ type: 'err', msg }); setRes(null); };

  // The postcode for a point: the ONS directory in GB and NI, OpenStreetMap
  // elsewhere. `from` describes where the point came from, for the result text.
  async function lookupAt(lat, lon, from, accuracy = null) {
    setStatus({ type: 'loading', msg: 'Looking up the postcode…' });
    setPin({ lat, lon, label: from === 'gps' ? 'Your location' : 'Selected point' });
    setView({ center: [lat, lon], zoom: 17 });
    const [osm, uk] = await Promise.allSettled([
      reverseLookup(lat, lon, () => setStatus({ type: 'loading', msg: 'Waiting for the address service…' })),
      nearUk(lat, lon) ? nearestUkPostcode(lat, lon) : Promise.resolve(null),
    ]);
    const place = osm.status === 'fulfilled' && !osm.value?.error ? osm.value : null;
    const country = place?.address?.country_code;
    const address = place ? addressLine(place.address, place.display_name) : null;
    const ukHit = uk.status === 'fulfilled' ? uk.value : null;

    if (ukHit && (country === ONS_COUNTRY || (!place && nearUk(lat, lon)))) {
      setRes({ kind: 'uk', from, accuracy, address, ...ukHit });
    } else if (place) {
      setRes({ kind: 'osm', from, accuracy, address, postcode: place.address?.postcode || null, country: place.address?.country, countryCode: country, lat, lon, gbMiss: country === ONS_COUNTRY });
    } else {
      fail(osm.reason?.message || 'The postcode services did not answer. Check your connection and try again.');
      return;
    }
    setStatus({ type: 'ok', msg: '' });
  }

  const useMyLocation = () => {
    if (!('geolocation' in navigator)) { fail('Your browser does not support location. Type your address or postcode instead.'); return; }
    setStatus({ type: 'loading', msg: 'Requesting your location…' });
    navigator.geolocation.getCurrentPosition(
      (p) => lookupAt(p.coords.latitude, p.coords.longitude, 'gps', p.coords.accuracy),
      (e) => fail(e.code === 1
        ? 'Location permission was denied. Allow it from the lock icon in the address bar, or type your street address below instead.'
        : 'Your device could not get a location fix. Try again near a window, or type your address below.'),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  };

  // A typed UK postcode is looked up directly; anything else is treated as
  // an address or place, geocoded, and then looked up like a map click.
  const search = async (e) => {
    e.preventDefault();
    const text = query.trim();
    if (!text) return;
    setStatus({ type: 'loading', msg: 'Searching…' });
    try {
      if (isUkPostcode(text)) {
        const r = await lookupUkPostcode(text);
        if (r.found) {
          if (r.found.lat != null) { setPin({ lat: r.found.lat, lon: r.found.lon, label: r.found.postcode }); setView({ center: [r.found.lat, r.found.lon], zoom: 16 }); }
          setRes({ kind: 'uk', from: 'postcode', address: null, ...r.found });
          setStatus({ type: 'ok', msg: '' });
        } else if (r.terminated) {
          if (r.terminated.lat != null) { setPin({ lat: r.terminated.lat, lon: r.terminated.lon, label: r.terminated.postcode }); setView({ center: [r.terminated.lat, r.terminated.lon], zoom: 16 }); }
          fail(`${r.terminated.postcode} was a real postcode, but it was retired in ${r.terminated.year}${r.terminated.lat != null ? ' (its old location is on the map)' : ''}. Forms that check against the current Royal Mail list will reject it; click the map on the property to find the postcode in use now.`);
        } else {
          fail(`${r.missing} is not a current or retired UK postcode. Check for a mistyped letter or digit (0 and O, 1 and I are common), or search the street address instead.`);
        }
        return;
      }
      const found = await searchAddress(text, () => setStatus({ type: 'loading', msg: 'Waiting for the address service…' }));
      if (!found?.length) { fail(`No place found for "${text}". Try adding the town or country.`); return; }
      await lookupAt(Number(found[0].lat), Number(found[0].lon), 'search');
    } catch (err) {
      fail(err.message?.includes('limiting') ? err.message : 'The search did not complete. Check your connection and try again.');
    }
  };

  const parts = res?.kind === 'uk' ? postcodeParts(res.postcode) : null;
  const rows = res?.kind === 'uk'
    ? [
        ['Nearest address', res.address],
        ['Council', res.council],
        ['Ward', res.ward],
        ['Constituency', res.constituency],
        ['Region', [res.region, res.country].filter(Boolean).join(', ')],
      ]
    : res
      ? [['Nearest address', res.address], ['Country', res.country]]
      : [];

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">Find the postcode where you are</h2>
        <button type="button" onClick={useMyLocation} disabled={status.type === 'loading'} className="btn-primary">📍 Find my postcode</button>
      </div>

      <form onSubmit={search} className="flex flex-wrap gap-2 mb-3">
        <input
          className="field flex-1 min-w-[200px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Or type a street address, place, or UK postcode"
          aria-label="Street address, place, or UK postcode"
        />
        <button type="submit" disabled={status.type === 'loading'} className="btn-ghost">Look up</button>
      </form>

      <div aria-live="polite">
        {status.type === 'loading' && <p className="text-sm text-fg-subtle mb-3">{status.msg}</p>}
        {status.type === 'err' && <p role="alert" className="mb-3 bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{status.msg}</p>}

        {res && status.type === 'ok' && (
          <div className="glass-strong rounded-xl p-4 sm:p-5 mb-4">
            <div className="text-[11px] uppercase tracking-wider text-accent font-semibold">
              {res.from === 'gps' ? 'Your postcode' : res.from === 'postcode' ? 'Postcode details' : 'Postcode at this point'}
            </div>
            {res.postcode ? (
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <span className="font-display text-4xl font-extrabold tracking-tight text-fg">{res.postcode}</span>
                <CopyButton text={res.postcode} label="Copy postcode" className="btn-ghost text-xs" />
              </div>
            ) : (
              <p className="mt-2 text-fg">
                No postcode is recorded for this spot in OpenStreetMap.
                {res.countryCode === 'ie' && <> Ireland&rsquo;s Eircodes are not in open data; look the address up on the official <a href="https://finder.eircode.ie" target="_blank" rel="noopener" className="text-accent hover:underline">Eircode finder</a>.</>}
              </p>
            )}

            {parts && (
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {[['Area', parts.area], ['District', parts.district], ['Sector', parts.sector], ['Unit', parts.unit]].map(([k, v]) => (
                  <span key={k} className="rounded-md border border-line bg-tint/5 px-2 py-1"><span className="text-fg-subtle">{k}</span> <span className="font-mono text-fg">{v}</span></span>
                ))}
              </div>
            )}

            <dl className="mt-4 grid sm:grid-cols-[10rem_1fr] gap-x-4 gap-y-1.5 text-sm">
              {rows.filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-fg-subtle">{k}</dt>
                  <dd className="text-fg min-w-0 break-words">{v}</dd>
                </div>
              ))}
            </dl>
            {res.address && (
              <div className="mt-2"><CopyButton text={res.postcode ? `${res.address}, ${res.postcode}` : res.address} label={res.postcode ? 'Copy address and postcode' : 'Copy address'} className="text-xs text-accent hover:underline" /></div>
            )}

            <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
              {res.kind === 'uk'
                ? <>Postcode from the Office for National Statistics Postcode Directory (via postcodes.io).{res.distance != null && <> Its centre point is {formatMeters(res.distance)} from {res.from === 'gps' ? 'your position' : 'the selected point'}.</>} The nearest address is from OpenStreetMap and can be a neighbour&rsquo;s.</>
                : <>Postcode and address from OpenStreetMap, which is edited by volunteers; check anything important against the national postal service.{res.gbMiss && ' No current UK postcode centre lies within 2 km of this point.'}</>}
              {res.accuracy > 50 && <> Your device placed you within about {Math.round(res.accuracy)} m, so the postcode may belong to a nearby street. Click your building on the map to check.</>}
            </p>
          </div>
        )}
      </div>

      <Map
        center={view.center}
        zoom={view.zoom}
        pin={pin}
        layer="standard"
        onPin={(lat, lon) => lookupAt(lat, lon, 'map')}
      />
      <p className="mt-2 text-xs text-fg-subtle">Click anywhere on the map to get the postcode at that spot.</p>
    </section>
  );
}
