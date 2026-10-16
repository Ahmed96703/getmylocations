'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import CopyButton from '../components/CopyButton.jsx';
import { reverseLookup, searchAddress, searchPostcode, formatMeters } from '../address-finder/geocode.js';
import { inUs, isZip, censusAt, fccAt } from './census.js';

const Map = dynamic(() => import('../maps/Map.jsx'), {
  ssr: false,
  loading: () => <div className="w-full aspect-[16/10] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading map" />,
});

const US_CENTRE = [39.5, -98.35];
const US_CODES = new Set(['us', 'pr']);

// "350 5th Avenue, New York, NY" from Nominatim's address parts.
function usAddress(a = {}, fallback = '') {
  const street = [a.house_number, a.road].filter(Boolean).join(' ');
  const city = a.city || a.town || a.village || a.hamlet || a.suburb;
  const st = (a['ISO3166-2-lvl4'] || '').replace(/^US-/, '');
  const parts = [a.house_name, street, city, st].filter(Boolean);
  return parts.length ? parts.join(', ') : fallback.split(',').slice(0, 3).join(',');
}

export default function Tool() {
  const [query, setQuery] = useState('');
  const [view, setView] = useState({ center: US_CENTRE, zoom: 4 });
  const [pin, setPin] = useState(null);
  const [status, setStatus] = useState({ type: 'idle', msg: '' });
  const [res, setRes] = useState(null);

  const busy = status.type === 'loading';
  const fail = (msg) => { setStatus({ type: 'err', msg }); setRes(null); };
  const wait = () => setStatus({ type: 'loading', msg: 'Waiting for the address service…' });

  // Everything for one point: the mailing ZIP and address from OpenStreetMap,
  // and the official areas from the Census Bureau (FCC as a county backup).
  async function lookupAt(lat, lon, from, extra = {}) {
    setStatus({ type: 'loading', msg: 'Looking up the ZIP code and county…' });
    setPin({ lat, lon, label: from === 'gps' ? 'Your location' : extra.typedZip || 'Selected point' });
    setView({ center: [lat, lon], zoom: from === 'zip' ? 14 : 17 });
    const askUs = inUs(lat, lon);
    const [osm, census] = await Promise.allSettled([
      reverseLookup(lat, lon, wait),
      askUs ? censusAt(lat, lon) : Promise.resolve(null),
    ]);
    const place = osm.status === 'fulfilled' && !osm.value?.error ? osm.value : null;
    const cc = place?.address?.country_code;
    let gov = census.status === 'fulfilled' && census.value?.state ? census.value : null;
    let govSource = 'census';
    if (!gov && askUs && (!cc || US_CODES.has(cc))) {
      const f = await fccAt(lat, lon).catch(() => null);
      if (f) { gov = f; govSource = 'fcc'; }
    }
    if (!place && !gov) { fail(osm.reason?.message || 'The lookup services did not answer. Check your connection and try again.'); return; }

    if (gov && (!cc || US_CODES.has(cc))) {
      setRes({
        kind: 'us', from, ...extra, govSource,
        zip: from === 'zip' ? extra.typedZip : place?.address?.postcode?.slice(0, 10) || null,
        address: place ? usAddress(place.address, place.display_name) : null,
        ...gov,
      });
    } else {
      setRes({ kind: 'world', from, zip: place?.address?.postcode || null, country: place?.address?.country, countryCode: cc, address: place?.display_name?.split(',').slice(0, 4).join(',') });
    }
    setStatus({ type: 'ok', msg: '' });
  }

  const useMyLocation = () => {
    if (!('geolocation' in navigator)) { fail('Your browser does not support location. Type your address or ZIP code instead.'); return; }
    setStatus({ type: 'loading', msg: 'Requesting your location…' });
    navigator.geolocation.getCurrentPosition(
      (p) => lookupAt(p.coords.latitude, p.coords.longitude, 'gps', { accuracy: p.coords.accuracy }),
      (e) => fail(e.code === 1
        ? 'Location permission was denied. Allow it from the lock icon in the address bar, or type your street address below instead.'
        : 'Your device could not get a location fix. Try again near a window, or type your address below.'),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  };

  // A typed ZIP is placed at its centre and described from there; anything
  // else is an address or place, geocoded and looked up like a map click.
  const search = async (e) => {
    e.preventDefault();
    const text = query.trim();
    if (!text) return;
    setStatus({ type: 'loading', msg: 'Searching…' });
    const zip = isZip(text) ? text.slice(0, 5) : null;
    try {
      const d = zip ? await searchPostcode(zip, 'us,pr', wait) : await searchAddress(text, wait);
      if (!d?.length) { fail(zip ? `ZIP code ${zip} was not found. Check the digits, or search the street address instead.` : `No place found for "${text}". Try adding the city and state.`); return; }
      await lookupAt(Number(d[0].lat), Number(d[0].lon), zip ? 'zip' : 'search', zip ? { typedZip: zip } : {});
    } catch (err) {
      fail(err.message?.includes('limiting') ? err.message : 'The search did not complete. Check your connection and try again.');
    }
  };

  // A typed ZIP whose first two digits (its state group) differ from the
  // Census ZIP area at the point OpenStreetMap returned is suspicious. Three
  // digits is too strict: single-building ZIPs such as 10118 sit inside
  // Census areas like 10001 from a neighbouring sectional center.
  const zipDoubt = res?.kind === 'us' && res.from === 'zip' && res.zcta && res.zcta.slice(0, 2) !== res.typedZip.slice(0, 2);
  const zipDiffers = res?.kind === 'us' && res.zip && res.zcta && res.zip !== res.zcta && !zipDoubt;

  const rows = res?.kind === 'us'
    ? [
        ['Nearest address', res.from === 'zip' ? null : res.address],
        ['Census ZIP area', res.zcta && `${res.zcta} (ZCTA)`],
        ['City or town', res.place || res.subdivision],
        ['County', res.county],
        ['State', res.state],
        ['U.S. House district', res.congressional],
        ['State senate / upper house', res.stateSenate],
        ['State house / lower house', res.stateHouse],
        ['School district', res.school],
      ]
    : res
      ? [['Nearest address', res.address], ['Country', res.country]]
      : [];
  const shownZip = res?.zip || (res?.kind === 'us' ? res.zcta : null);

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold">Find the ZIP code where you are</h2>
        <button type="button" onClick={useMyLocation} disabled={busy} className="btn-primary">📍 Find my ZIP code</button>
      </div>

      <form onSubmit={search} className="flex flex-wrap gap-2 mb-3">
        <input
          className="field flex-1 min-w-[200px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Or type a street address, place, or ZIP code"
          aria-label="Street address, place, or ZIP code"
        />
        <button type="submit" disabled={busy} className="btn-ghost">Look up</button>
      </form>

      <div aria-live="polite">
        {status.type === 'loading' && <p className="text-sm text-fg-subtle mb-3">{status.msg}</p>}
        {status.type === 'err' && <p role="alert" className="mb-3 bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{status.msg}</p>}

        {res && status.type === 'ok' && (
          <div className="glass-strong rounded-xl p-4 sm:p-5 mb-4">
            <div className="text-[11px] uppercase tracking-wider text-accent font-semibold">
              {res.kind === 'world'
                ? (res.from === 'gps' ? 'Your postcode' : 'Postcode at this point')
                : res.from === 'gps' ? 'Your ZIP code' : res.from === 'zip' ? 'ZIP code details' : 'ZIP code at this point'}
            </div>
            {shownZip ? (
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <span className="font-display text-4xl font-extrabold tracking-tight text-fg">{shownZip}</span>
                <CopyButton text={shownZip} label={res.kind === 'world' ? 'Copy postcode' : 'Copy ZIP code'} className="btn-ghost text-xs" />
              </div>
            ) : (
              <p className="mt-2 text-fg">No ZIP or postcode is recorded for this spot in OpenStreetMap.</p>
            )}

            {zipDoubt && (
              <p className="mt-2 text-sm text-rose-500">
                We could not confirm {res.typedZip}: the place OpenStreetMap gives for it lies in the Census ZIP area {res.zcta}, in a different part of the country. It may be mistyped or not a real ZIP code.
              </p>
            )}

            <dl className="mt-4 grid sm:grid-cols-[13rem_1fr] gap-x-4 gap-y-1.5 text-sm">
              {rows.filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-fg-subtle">{k}</dt>
                  <dd className="text-fg min-w-0 break-words">{v}</dd>
                </div>
              ))}
            </dl>
            {res.address && res.from !== 'zip' && (
              <div className="mt-2"><CopyButton text={shownZip ? `${res.address} ${shownZip}` : res.address} label={shownZip ? (res.kind === 'world' ? 'Copy address and postcode' : 'Copy address and ZIP') : 'Copy address'} className="text-xs text-accent hover:underline" /></div>
            )}

            <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
              {res.kind === 'us' ? (
                <>
                  {res.from === 'zip'
                    ? <>County, city, and districts are for the centre of ZIP {res.typedZip}; a ZIP code can cross county and district lines, so check the full address for anything official.</>
                    : res.zip
                      ? <>ZIP code from the nearest address in OpenStreetMap.</>
                      : <>OpenStreetMap has no ZIP for this spot, so the Census ZIP area is shown instead; it usually, but not always, matches the mailing ZIP.</>}
                  {zipDiffers && <> The Census ZIP area here ({res.zcta}) differs from the ZIP on the nearest address. Census areas only approximate ZIP codes, so this happens near ZIP boundaries, in rural areas, and for buildings or P.O. boxes with their own ZIP. For mail, use the ZIP on your own address.</>}
                  {' '}{res.govSource === 'fcc' ? 'County and state from the FCC Area API; the Census service did not answer, so districts are not shown.' : 'County, city, and districts from the U.S. Census Bureau geocoder.'}
                  {res.accuracy > 50 && <> Your device placed you within about {formatMeters(res.accuracy)}, so the result may belong to a nearby street. Click your building on the map to check.</>}
                </>
              ) : (
                <>
                  This point is outside the United States. Postcode and address from OpenStreetMap.
                  {res.countryCode === 'gb' && <> For UK postcodes with council and ward, use <Link href="/whats-my-postcode" className="text-accent hover:underline">What&rsquo;s My Postcode</Link>.</>}
                </>
              )}
            </p>
          </div>
        )}
      </div>

      <Map center={view.center} zoom={view.zoom} pin={pin} layer="standard" onPin={(lat, lon) => lookupAt(lat, lon, 'map')} />
      <p className="mt-2 text-xs text-fg-subtle">Click anywhere on the map to get the ZIP code, county, and districts at that spot.</p>
    </section>
  );
}
