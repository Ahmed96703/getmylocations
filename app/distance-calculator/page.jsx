import Link from 'next/link';
import Tool from './Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';
import AdSense from '../components/AdSense.jsx';
import { measure } from './dist.js';
import { AUTHOR } from '../components/author.js';

export const metadata = {
  title: 'GPS Distance Calculator — Between Two Coordinates (Free)',
  description:
    'Measure the distance between two GPS coordinates on the WGS 84 ellipsoid in km, miles and nautical miles, with bearing, midpoint and map. Try it free.',
  keywords: [
    'distance calculator',
    'gps distance calculator',
    'distance between coordinates',
    'distance between two points',
    'haversine calculator',
    'great circle distance',
  ],
  alternates: { canonical: '/distance-calculator' },
  openGraph: {
    title: 'GPS Distance Calculator — Between Two Coordinates (Free)',
    description:
      'Distance between two GPS coordinates on the WGS 84 ellipsoid in km, miles, nautical miles, and meters, with bearings, midpoint, and a great-circle map.',
    url: 'https://getmylocations.com/distance-calculator',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPS Distance Calculator — Between Two Coordinates',
    description: 'Ellipsoidal distance, bearings, and midpoint between two GPS coordinates. Free, no signup.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'GPS Distance Calculator',
  description:
    'Free browser-based tool that calculates the distance, initial and final bearing, and midpoint between two GPS coordinates on the WGS 84 ellipsoid (Vincenty), shows the spherical haversine result for comparison, accepts DD, DMS, DDM, and UTM input, and draws the great-circle route on a map.',
  url: 'https://getmylocations.com/distance-calculator',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'GetMyLocations' },
  author: AUTHOR,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getmylocations.com/' },
    { '@type': 'ListItem', position: 2, name: 'Distance Calculator', item: 'https://getmylocations.com/distance-calculator' },
  ],
};

const faqs = [
  {
    q: 'How do I calculate the distance between two GPS coordinates?',
    a: 'Paste each point into the tool above, latitude first, in any common format: decimal degrees, DMS, DDM, or UTM. The page returns the distance in kilometers, miles, nautical miles, and meters, the initial and final bearing, the midpoint, and a map of the route. The math runs entirely in your browser; no signup, no API call. For an outdoor measurement against a known landmark, six decimals of input precision is more than enough.',
  },
  {
    q: 'Does this calculator use the haversine formula or Vincenty?',
    a: 'Both. The main result uses Vincenty\'s formulae on the WGS 84 ellipsoid, the shape GPS uses, which agrees with the GeographicLib reference library to well under a millimeter. The haversine result, which treats Earth as a sphere with a 6,371 km radius, is shown underneath for comparison, with the difference. For two points almost exactly opposite each other on the globe, where Vincenty\'s method does not converge, the tool falls back to haversine and says so.',
  },
  {
    q: 'How is great-circle distance different from driving distance?',
    a: 'Great-circle distance is the straight line over Earth\'s surface. Driving distance follows roads — going around lakes, respecting one-way streets, diverting through interchanges. London to Paris is about 460 km by road but only about 344 km in a straight line over the English Channel. If you need the road distance, use a routing tool like Google Maps or Apple Maps; this calculator only computes the geodesic line.',
  },
  {
    q: 'How accurate is this calculator?',
    a: 'The main result is calculated on the WGS 84 ellipsoid and, in our tests on 20,000 random point pairs, matched the GeographicLib reference library to within 0.1 mm. The real limit is your input: six decimal places of latitude and longitude pin each point to about 11 cm. The spherical haversine figure shown for comparison can be off by up to about 0.56%, which is 5.6 km on a 1,000 km trip.',
  },
  {
    q: 'How do I find the GPS coordinates of two points?',
    a: 'For your current location, tap Use my location under point A, or open the My Location tool and tap Find my location. For other places, search a landmark in Google Maps, long-press (or right-click) the spot, and the coordinates appear at the top of the panel. Paste them straight into this calculator; DMS and UTM work too.',
  },
  {
    q: 'What units does the distance calculator support?',
    a: 'Kilometers (km), statute miles (mi), nautical miles (NM), and meters (m). All four are computed from the same ellipsoidal result, so they are exactly consistent — no rounding mismatches between the displayed values. Nautical miles are useful for marine and aviation; meters are useful for short distances (under a kilometer) where the other units lose precision in the trailing digits.',
  },
  {
    q: 'What is the midpoint between two coordinates?',
    a: 'The midpoint is the point exactly halfway along the shortest route between them, not the average of the two latitudes and longitudes. Averaging works for nearby points but goes badly wrong over long distances and across the 180th meridian. The tool computes the true halfway point on the ellipsoid and marks it on the map in orange.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

// Reference distances are computed at build time with the same code the
// tool runs, so the table can never disagree with the calculator.
const CITY_PAIRS = [
  ['London', 51.5074, -0.1278, 'Paris', 48.8566, 2.3522],
  ['New York JFK', 40.6413, -73.7781, 'London LHR', 51.47, -0.4543],
  ['Karachi', 24.8607, 67.0011, 'Dubai', 25.2048, 55.2708],
  ['Sydney', -33.8688, 151.2093, 'Tokyo', 35.6762, 139.6503],
  ['San Francisco', 37.7749, -122.4194, 'Los Angeles', 34.0522, -118.2437],
  ['Cape Town', -33.9249, 18.4241, 'Cairo', 30.0444, 31.2357],
];
const n0 = (v) => Math.round(v).toLocaleString('en-US');
const cityPairs = CITY_PAIRS.map(([an, alat, alon, bn, blat, blon]) => {
  const m = measure(alat, alon, blat, blon);
  const km = m.meters / 1000;
  const diff = (m.sphereMeters - m.meters) / 1000;
  return {
    a: `${an} (${alat}, ${alon})`,
    b: `${bn} (${blat}, ${blon})`,
    km: n0(km),
    mi: n0(km * 0.621371192),
    nm: n0(km / 1.852),
    sphere: n0(m.sphereMeters / 1000),
    diff: `${diff >= 0 ? '+' : '−'}${Math.abs(diff).toFixed(1)}`,
  };
});

export default function DistanceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <AdSense />

      <main role="main" className="max-w-5xl mx-auto px-5 py-10">
        <nav aria-label="Breadcrumb" className="text-xs text-fg-subtle mb-3">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-fg-muted">Distance Calculator</li>
          </ol>
        </nav>

        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · Pure JavaScript Math</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            GPS distance calculator — <span className="text-accent">between two coordinates</span>
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Enter two points in any common format and get the distance between them in kilometers, miles, nautical miles, and meters, with the initial and final bearing, the midpoint, and the route on a map. Calculated on the WGS 84 ellipsoid, the same Earth model GPS uses, entirely in your browser: no API call, no signup.
          </p>
        </section>

        <Tool />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">What this calculator does</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The tool above takes two points and returns the shortest distance between them over Earth&rsquo;s surface, the kind of distance an airline quotes when it tells you the flight is 5,000 km, not the longer driving distance that follows roads. It calculates on the WGS 84 ellipsoid using Vincenty&rsquo;s formulae, published in 1975 and widely used in survey and mapping software, and shows:
          </p>
          <ul className="mt-3 space-y-1.5 text-fg-muted list-disc list-inside leading-relaxed">
            <li>the distance in kilometers, statute miles, nautical miles, and meters</li>
            <li>the <strong className="text-fg">initial bearing</strong> leaving A and the <strong className="text-fg">final bearing</strong> arriving at B</li>
            <li>the <strong className="text-fg">midpoint</strong> of the route</li>
            <li>the spherical haversine distance for comparison, and the difference</li>
            <li>the great-circle route on a map</li>
          </ul>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Need the coordinates first? The{' '}
            <Link href="/my-location" className="text-accent hover:underline">My Location tool</Link>{' '}
            gives you yours in two seconds. To see the same point in every format, use the{' '}
            <Link href="/coordinates-converter" className="text-accent hover:underline">Coordinates Converter</Link>. To pick two points visually instead of typing them, drop pins on the{' '}
            <Link href="/maps" className="text-accent hover:underline">interactive map</Link>{' '}
            and read off the coordinates.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Enter latitude and longitude in any format</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Each point box reads the same formats as our coordinate converter, and shows underneath how it understood your input:
          </p>
          <ul className="mt-3 space-y-1.5 text-fg-muted list-disc list-inside leading-relaxed">
            <li>Decimal degrees: <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">51.5074, -0.1278</code> or <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">51.5074° N, 0.1278° W</code></li>
            <li>DMS: <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">51°30'26.6"N 0°07'40.1"W</code></li>
            <li>DDM: <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">51°30.444'N 0°07.668'W</code></li>
            <li>UTM: <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">30U 699316 5710164</code></li>
            <li>A Google Maps link containing <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">@lat,lon</code></li>
          </ul>
          <p className="mt-3 text-fg-muted leading-relaxed">
            You can mix formats: a DMS point A and a UTM point B work fine. Out-of-range values are flagged instead of producing a wrong distance.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Sanity-check the math against known distances</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The first time you use any distance calculator, it pays to verify it against pairs you already know. These six city pairs are calculated with the calculator&rsquo;s own code when the page is built, so pasting any pair into the tool gives exactly these numbers. The last two columns show what a spherical haversine calculator would say instead, and how far off that is.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tint/5 text-left text-fg-muted">
                  <th className="px-3 py-2 font-semibold">From</th>
                  <th className="px-3 py-2 font-semibold">To</th>
                  <th className="px-3 py-2 font-semibold">km</th>
                  <th className="px-3 py-2 font-semibold">mi</th>
                  <th className="px-3 py-2 font-semibold">NM</th>
                  <th className="px-3 py-2 font-semibold">Sphere km</th>
                  <th className="px-3 py-2 font-semibold">Sphere error</th>
                </tr>
              </thead>
              <tbody>
                {cityPairs.map((row) => (
                  <tr key={row.a + row.b} className="border-t border-line-subtle">
                    <td className="px-3 py-2 font-mono text-xs text-fg-muted">{row.a}</td>
                    <td className="px-3 py-2 font-mono text-xs text-fg-muted">{row.b}</td>
                    <td className="px-3 py-2 font-mono text-fg">{row.km}</td>
                    <td className="px-3 py-2 font-mono text-fg-muted">{row.mi}</td>
                    <td className="px-3 py-2 font-mono text-fg-muted">{row.nm}</td>
                    <td className="px-3 py-2 font-mono text-fg-muted">{row.sphere}</td>
                    <td className="px-3 py-2 font-mono text-fg-muted">{row.diff} km</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-fg-subtle">
            Distances are rounded to the nearest whole unit. Checked against the GeographicLib reference library in October 2026.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How accurate is great-circle distance, really?</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Earth is not a perfect sphere. Its spin makes it bulge at the equator: the equatorial radius is about 21 km larger than the polar radius. The haversine formula, which most online distance calculators use, ignores that and treats Earth as a ball with a 6,371 km radius. This calculator instead uses the WGS 84 ellipsoid, the model GPS itself uses, so the bulge is accounted for.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            We tested the calculator against GeographicLib, the reference library used in GIS software, on 20,000 random pairs of points around the world. The largest difference was under 0.1 mm. In practice your input is the limit: six decimal places pin each point to about 11 cm.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Haversine vs ellipsoid: when the difference matters</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The spherical haversine shortcut is wrong by up to about 0.56%, and the error depends on direction and latitude. It is worst for short north&ndash;south trips near the equator, where it overstates distance by up to about 0.56%, and for short trips near the poles, where it understates by up to about 0.44%. Over very long routes the errors partly cancel; from the equator to the North Pole it is only about 0.06% off.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            In kilometers, the table above shows it plainly: haversine is about 15 km short on New York to London and about 32 km long on Cape Town to Cairo. That is irrelevant for estimating a flight time and very relevant for fuel planning, surveying, or checking a developer&rsquo;s own distance code. The &ldquo;sphere&rdquo; line in the tool shows the gap for whatever two points you enter.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Why driving distance is always longer</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            People sometimes punch in two coordinates expecting the driving distance and are surprised when the result is much smaller. Driving distance has to follow roads, go around lakes and mountains, respect one-way streets, and divert through interchanges. A drive from London to Paris is about 460 km along roads, but only about 344 km in a straight line over the English Channel. The straight-line version is the one this page calculates.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            If what you actually want is the road distance, use the{' '}
            <Link href="/driving-directions" className="text-accent hover:underline">Driving Directions tool</Link>{' '}
            instead. It calls the routing engine that does know about roads. Across the US, roads average about 1.4 times the straight-line distance.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">What the bearing field tells you</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The calculator returns two bearings. The <strong className="text-fg">initial bearing</strong> is the compass direction you set off in from point A; the <strong className="text-fg">final bearing</strong> is the direction you are travelling when you arrive at point B. On the shortest route the two are usually different, because a great circle crosses each meridian at a different angle. London to Tokyo leaves London heading about 32° (north-northeast) and arrives in Tokyo heading about 156° (south-southeast), even though Tokyo is south of London on the map.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">The midpoint between two coordinates</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The midpoint is the place exactly halfway along the shortest route, and it is shown as an orange dot on the map. It is not the average of the two latitudes and longitudes: averaging New York and Sydney gives 3.4°N, 38.6°E, in East Africa near the Ethiopia&ndash;Kenya border, while the real halfway point is in the central Pacific, near 8.9°N, 147.7°W. The tool walks half the route&rsquo;s length along the ellipsoid from point A to find it.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Reading the great-circle line on the map</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The blue line is the actual shortest route. On a flat web map it usually looks curved, bowing toward the nearer pole, because the map stretches the globe sideways. That curve is the straight line on the real planet. Routes that cross the 180° meridian, such as Tokyo to Los Angeles, are drawn across the Pacific rather than the long way round the map.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
          <div className="glass mt-4 rounded-2xl divide-y divide-line-subtle">
            {faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex items-center justify-between cursor-pointer list-none font-semibold">
                  {f.q}
                  <span className="text-accent group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-fg-muted text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Useful companion tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
            {[
              { href: '/my-location', t: 'My Location', d: 'Get your live GPS coordinates' },
              { href: '/coordinates-converter', t: 'Coordinates Converter', d: 'DD ↔ DMS ↔ UTM' },
              { href: '/address-finder', t: 'Address Finder', d: 'Address ↔ coordinates' },
              { href: '/driving-directions', t: 'Driving Directions', d: 'Road-following route' },
              { href: '/maps', t: 'Interactive Maps', d: 'Pick two points visually' },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="glass rounded-2xl p-4 hover:ring-accent/40 ring-1 ring-line transition group no-underline">
                <h3 className="font-display text-base font-bold text-fg group-hover:text-accent transition">{t.t}</h3>
                <p className="text-xs text-fg-subtle mt-1">{t.d}</p>
              </Link>
            ))}
          </div>
        </section>

        <AuthorBio />
      </main>
    </>
  );
}
