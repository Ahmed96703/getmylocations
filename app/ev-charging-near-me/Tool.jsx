'use client';

import NearbyTool from '../components/nearby/NearbyTool.jsx';
import { isOpen } from '../components/nearby/openNow.js';

const CATEGORIES = [{ id: 'charging_station', label: 'Charging points', one: 'Charging point', radius: 5000, color: '#16a34a' }];

const CONNECTORS = [
  ['socket:type2_combo', 'CCS'],
  ['socket:chademo', 'CHAdeMO'],
  ['socket:tesla_supercharger', 'Tesla Supercharger'],
  ['socket:nacs', 'NACS (Tesla)'],
  ['socket:type2', 'Type 2'],
  ['socket:type1_combo', 'CCS1'],
  ['socket:type1', 'Type 1 (J1772)'],
];

// Highest power mapped for any connector, in kW ("150 kW;50 kW" -> 150).
function maxKw(t) {
  let best = 0;
  for (const k of ['socket:type2_combo:output', 'socket:chademo:output', 'socket:type2:output']) {
    for (const m of String(t[k] || '').matchAll(/(\d+(?:\.\d+)?)\s*kw/gi)) best = Math.max(best, Number(m[1]));
  }
  return best;
}
const has = (t, k) => t[k] && t[k] !== 'no' && t[k] !== '0';
const rapid = (t) => maxKw(t) >= 50 || ['socket:type2_combo', 'socket:chademo', 'socket:tesla_supercharger', 'socket:type1_combo', 'socket:nacs'].some((k) => has(t, k));

const FILTERS = [
  { id: 'rapid', label: 'Rapid / DC fast only', test: rapid },
  { id: 'ccs', label: 'CCS', test: (t) => has(t, 'socket:type2_combo') || has(t, 'socket:type1_combo') },
  { id: 'type2', label: 'Type 2', test: (t) => has(t, 'socket:type2') },
  { id: 'free', label: 'Free to charge', test: (t) => t.fee === 'no' },
  { id: 'open', label: 'Open now', test: (t) => (t.opening_hours ? isOpen(t.opening_hours) === true : false) },
];

function badges({ tags: t }) {
  const out = [];
  if (t.network) out.push(t.network);
  for (const [k, name] of CONNECTORS) {
    if (!has(t, k)) continue;
    const n = /^\d+$/.test(t[k]) ? ` ×${t[k]}` : '';
    out.push(`${name}${n}`);
  }
  const kw = maxKw(t);
  if (kw) out.push(`Up to ${kw} kW`);
  if (t.capacity && /^\d+$/.test(t.capacity)) out.push(`${t.capacity} charging bay${t.capacity === '1' ? '' : 's'}`);
  if (t.fee === 'no') out.push('Free to charge');
  if (t['parking:fee'] === 'yes') out.push('Parking fee');
  if (t['authentication:contactless'] === 'yes') out.push('Contactless card');
  if (t['authentication:app'] === 'yes') out.push('App');
  if (t.access === 'customers') out.push('Customers only');
  return out;
}

export default function Tool() {
  return (
    <NearbyTool
      kind="ev"
      title="EV charging points near a place"
      button="Chargers near me"
      categories={CATEGORIES}
      filters={FILTERS}
      badges={badges}
      mode="driving"
      nameFilter="Network, e.g. Tesla, Ionity, BP Pulse"
      empty="Motorway services, supermarkets and large car parks often have chargers; try searching the nearest town."
    />
  );
}
