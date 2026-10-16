// UK postcodes come from postcodes.io, a free service built on the Office for
// National Statistics Postcode Directory (Open Government Licence). It places
// postcodes in Great Britain and Northern Ireland; Channel Islands and Isle of
// Man postcodes are listed but have no coordinates, so a location there (and
// everywhere else) gets its postcode from OpenStreetMap via Nominatim.

const API = 'https://api.postcodes.io';

// Nominatim country code for Great Britain and Northern Ireland.
export const ONS_COUNTRY = 'gb';

// Full UK postcode, with or without the space: "SW1A 2AA", "m11ae", "GIR 0AA".
const UK_RE = /^([A-Z]{1,2}\d[A-Z\d]?|GIR)\s*(\d[A-Z]{2})$/i;

export const isUkPostcode = (text) => UK_RE.test(String(text).trim());

export function formatUkPostcode(text) {
  const m = String(text).trim().match(UK_RE);
  return m ? `${m[1]} ${m[2]}`.toUpperCase() : null;
}

// SW1A 2AA -> area SW, district SW1A, sector SW1A 2, unit SW1A 2AA.
export function postcodeParts(postcode) {
  const pc = formatUkPostcode(postcode);
  if (!pc) return null;
  const [outward, inward] = pc.split(' ');
  return {
    area: outward.match(/^[A-Z]+/)[0],
    district: outward,
    sector: `${outward} ${inward[0]}`,
    unit: pc,
  };
}

function summarise(r, distance) {
  return {
    postcode: r.postcode,
    lat: r.latitude,
    lon: r.longitude,
    distance: distance ?? r.distance ?? null, // meters from the query point to the postcode's centre
    council: r.admin_district,
    ward: r.admin_ward,
    constituency: r.parliamentary_constituency,
    region: r.region,
    country: r.country,
  };
}

// Nearest postcode centre within 2 km of a point, or null.
export async function nearestUkPostcode(lat, lon) {
  const r = await fetch(`${API}/postcodes?lon=${lon}&lat=${lat}&radius=2000&limit=1`);
  if (!r.ok) throw new Error(`postcodes.io ${r.status}`);
  const d = await r.json();
  return d.result?.length ? summarise(d.result[0]) : null;
}

// Look up a typed UK postcode. Retired postcodes come back with the year
// they were terminated, which is a common reason a form rejects one.
export async function lookupUkPostcode(text) {
  const pc = formatUkPostcode(text);
  const r = await fetch(`${API}/postcodes/${encodeURIComponent(pc)}`);
  if (r.ok) return { found: summarise((await r.json()).result) };
  if (r.status !== 404) throw new Error(`postcodes.io ${r.status}`);
  const t = await fetch(`${API}/terminated_postcodes/${encodeURIComponent(pc)}`);
  if (t.ok) {
    const d = (await t.json()).result;
    return { terminated: { postcode: d.postcode, year: d.year_terminated, lat: d.latitude, lon: d.longitude } };
  }
  return { missing: pc };
}
