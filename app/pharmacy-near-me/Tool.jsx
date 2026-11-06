'use client';

import NearbyTool from '../components/nearby/NearbyTool.jsx';

const CATEGORIES = [
  { id: 'pharmacy', label: 'Pharmacies', one: 'Pharmacy', radius: 3000, color: '#16a34a' },
  { id: 'hospital', label: 'Hospitals', one: 'Hospital', radius: 15000, color: '#dc2626' },
  { id: 'aed', label: 'Defibrillators', one: 'Defibrillator (AED)', radius: 3000, color: '#f59e0b' },
];

function badges({ k, tags }) {
  const out = [];
  if (k === 'pharmacy') {
    if (tags.dispensing === 'yes') out.push('Dispenses prescriptions');
    if (tags.dispensing === 'no') out.push('No prescriptions');
  }
  if (k === 'hospital') {
    if (tags.emergency === 'yes') out.push('Emergency department (A&E)');
    if (tags.emergency === 'no') out.push('No emergency department');
  }
  if (k === 'aed') {
    if (tags.indoor === 'yes') out.push('Indoors');
    if (tags.indoor === 'no') out.push('Outdoors');
    if (tags.access === 'customers') out.push('Customers only');
    if (tags.access === 'yes' || tags.access === 'public') out.push('Public access');
    if (tags['defibrillator:location']) out.push(`Where: ${tags['defibrillator:location']}`);
    if (tags.level) out.push(`Floor ${tags.level}`);
  }
  if (tags.wheelchair === 'yes') out.push('Wheelchair accessible');
  return out;
}

export default function Tool() {
  return (
    <NearbyTool
      kind="health"
      title="Pharmacies, hospitals and defibrillators near a place"
      button="Find near me"
      categories={CATEGORIES}
      badges={badges}
      empty="Try another tab, or search a nearby town."
    />
  );
}
