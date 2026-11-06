'use client';

import NearbyTool from '../components/nearby/NearbyTool.jsx';

const CATEGORIES = [{ id: 'toilets', label: 'Toilets', one: 'Public toilet', radius: 2000, color: '#2563eb' }];

const FILTERS = [
  { id: 'free', label: 'Free only', test: (t) => t.fee === 'no' },
  { id: 'wheelchair', label: 'Wheelchair accessible', test: (t) => t.wheelchair === 'yes' },
  { id: 'baby', label: 'Baby changing', test: (t) => t.changing_table === 'yes' },
];

function badges({ tags }) {
  const out = [];
  if (tags.fee === 'no') out.push('Free');
  if (tags.fee === 'yes') out.push(tags.charge ? `Paid: ${tags.charge}` : 'Paid');
  if (tags.wheelchair === 'yes') out.push('Wheelchair accessible');
  if (tags.wheelchair === 'limited') out.push('Limited wheelchair access');
  if (tags.wheelchair === 'no') out.push('Not wheelchair accessible');
  if (tags.changing_table === 'yes') out.push('Baby changing');
  if (tags.unisex === 'yes') out.push('Unisex');
  if (tags.access === 'customers') out.push('Customers only');
  return out;
}

export default function Tool() {
  return (
    <NearbyTool
      kind="toilets"
      title="Public toilets near a place"
      button="Toilets near me"
      categories={CATEGORIES}
      filters={FILTERS}
      badges={badges}
      empty="Stations, shopping centres, libraries and big parks often have one; try searching the nearest."
    />
  );
}
