'use client';

import { useEffect, useState } from 'react';
import { reverseLookup } from '../address-finder/geocode.js';
import { track } from '../components/track.js';
import { NUMBERS, EU } from './numbers.js';

const names = (() => { try { return new Intl.DisplayNames(['en'], { type: 'region' }); } catch { return null; } })();
const nameOf = (cc) => names?.of(cc) || cc;

function Call({ n, label, big }) {
  return (
    <a href={`tel:${n.replace(/\s/g, '')}`} className={`flex flex-col items-center justify-center rounded-xl ring-1 ring-line bg-tint/5 hover:bg-tint/10 ${big ? 'p-5' : 'p-3'}`}>
      <span className="text-xs uppercase tracking-wide text-fg-subtle">{label}</span>
      <span className={`font-display font-bold text-rose-600 dark:text-rose-400 ${big ? 'text-5xl' : 'text-2xl'}`}>{n}</span>
    </a>
  );
}

export default function Tool() {
  const [cc, setCc] = useState('');
  const [status, setStatus] = useState({ type: 'idle', msg: '' });
  // Country names come from the browser's Intl data, which differs from the
  // build server's, so the list is filled in after the page has loaded.
  const [list, setList] = useState([]);

  useEffect(() => {
    const r = (navigator.language || '').split('-')[1]?.toUpperCase();
    setCc(NUMBERS[r] ? r : 'GB');
    setList(Object.keys(NUMBERS).sort((a, b) => nameOf(a).localeCompare(nameOf(b))));
  }, []);

  const locate = () => {
    if (!('geolocation' in navigator)) { setStatus({ type: 'err', msg: 'Your browser does not support location. Choose the country instead.' }); return; }
    setStatus({ type: 'loading', msg: 'Finding your country…' });
    navigator.geolocation.getCurrentPosition(async (p) => {
      try {
        const r = await reverseLookup(p.coords.latitude, p.coords.longitude);
        const code = r?.address?.country_code?.toUpperCase();
        if (code && NUMBERS[code]) { setCc(code); setStatus({ type: 'ok', msg: '' }); track('tool_run'); }
        else setStatus({ type: 'err', msg: `We do not list ${code ? nameOf(code) : 'this country'} yet. In most of the world, 112 from a mobile phone reaches the emergency services.` });
      } catch {
        setStatus({ type: 'err', msg: 'The country lookup did not complete. Choose the country instead.' });
      }
    }, () => setStatus({ type: 'err', msg: 'Location permission was denied. Choose the country instead.' }), { timeout: 15000, maximumAge: 600000 });
  };

  const e = NUMBERS[cc];
  const [main, police, amb, fire, note] = e || [];
  const split = police && !(police === amb && amb === fire && fire === main);

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-bold mb-4">Emergency number by country</h2>
      <div className="flex flex-wrap gap-2 mb-3">
        <button type="button" onClick={locate} disabled={status.type === 'loading'} className="btn-primary">📍 Numbers where I am</button>
        <select className="field flex-1 min-w-[200px]" value={cc} onChange={(ev) => { setCc(ev.target.value); setStatus({ type: 'idle', msg: '' }); track('tool_run'); }} aria-label="Country">
          {list.map((c) => <option key={c} value={c}>{nameOf(c)}</option>)}
        </select>
      </div>
      <div aria-live="polite">
        {status.type === 'loading' && <p className="text-sm text-fg-subtle my-2">{status.msg}</p>}
        {status.type === 'err' && <p role="alert" className="my-2 bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{status.msg}</p>}
      </div>

      {e && (
        <div className="mt-2">
          <p className="text-sm text-fg-muted mb-2">Emergency numbers in <span className="font-semibold text-fg">{nameOf(cc)}</span>. Tap a number to call it.</p>
          {main && <Call n={main} label={split ? 'Emergency (all services)' : 'Police, ambulance and fire'} big />}
          {split && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {police && <Call n={police} label="Police" />}
              {amb && <Call n={amb} label="Ambulance" />}
              {fire && <Call n={fire} label="Fire" />}
            </div>
          )}
          {(note || EU.includes(cc)) && (
            <ul className="mt-3 text-sm text-fg-muted list-disc pl-5 space-y-1">
              {note && <li>{note}</li>}
              {EU.includes(cc) && main !== '112' && <li>112 also works anywhere in the EU.</li>}
              {EU.includes(cc) && main === '112' && <li>112 works free from any phone, including foreign mobiles, and operators can often answer in English.</li>}
            </ul>
          )}
        </div>
      )}

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        These are the established national numbers. They rarely change, but if you are moving somewhere or travelling, confirm them locally, for example on arrival at your hotel. Your location is used only to find the country.
      </p>
    </section>
  );
}
