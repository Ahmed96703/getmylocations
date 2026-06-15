import Link from 'next/link';
import Tool from './Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';

export const metadata = {
  title: 'GPS Distance Calculator — Distance Between Two Coordinates (Haversine, Free)',
  description:
    'Free GPS distance calculator — distance between two latitude/longitude pairs in km, miles, nautical miles, and meters. Haversine formula, plus initial bearing. No signup.',
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
      'Calculate the great-circle distance between two GPS coordinates in km, miles, nautical miles, and meters. Pure JavaScript, no signup.',
    url: 'https://getmylocations.com/distance-calculator',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPS Distance Calculator — Between Two Coordinates',
    description: 'Great-circle distance in km, miles, nautical miles, meters. Haversine, free.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'GPS Distance Calculator',
  description:
    'Free browser-based tool that calculates the great-circle distance and initial bearing between two GPS coordinates using the Haversine formula.',
  url: 'https://getmylocations.com/distance-calculator',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'GetMyLocations' },
  author: { '@type': 'Person', name: 'Ahmed Anwar' },
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
    a: 'Paste each coordinate pair into the tool above — latitude first, then longitude — and the page returns the great-circle distance in kilometers, miles, nautical miles, and meters, plus the initial bearing. The math runs entirely in your browser; no signup, no API call. For an outdoor measurement against a known landmark, six decimals of input precision is more than enough.',
  },
  {
    q: 'What is the Haversine formula and why is this calculator using it?',
    a: 'The Haversine formula gives the great-circle distance between two points on a sphere — the shortest path across the surface, the kind of distance airlines quote. It treats Earth as a perfect sphere and is accurate to about 0.5% globally (roughly five kilometers of error on a thousand-kilometer trip). It is the standard for navigation and trip planning because it is simple, fast, and the error is invisible at human scales.',
  },
  {
    q: 'How is great-circle distance different from driving distance?',
    a: 'Great-circle distance is the straight line over Earth\'s surface. Driving distance follows roads — going around lakes, respecting one-way streets, diverting through interchanges. London to Paris is about 460 km by road but only 344 km in a straight line over the English Channel. If you need the road distance, use a routing tool like Google Maps or Apple Maps; this calculator only computes the geodesic line.',
  },
  {
    q: 'How accurate is this calculator?',
    a: 'For any two points on Earth, the error is well under 1% — typically under 0.5%. The remaining error comes from Earth not being a perfect sphere (it bulges 21 km at the equator). For survey-grade precision the Vincenty formula gets within millimeters by modeling the actual ellipsoid; for everything else, Haversine is fine. The calculator also displays the initial bearing, which is the compass direction at the starting point — it changes along the path because great-circle routes curve on a flat map.',
  },
  {
    q: 'How do I find the GPS coordinates of two points?',
    a: 'For your current location, open the My Location tool and tap Find — it gives you your live coordinates in two seconds. For other places, search a landmark in Google Maps, long-press the pin, and the coordinates appear in the search bar at the top. Copy them into this calculator. The GPS Coordinates Finder page also covers every shortcut.',
  },
  {
    q: 'What units does the distance calculator support?',
    a: 'Kilometers (km), statute miles (mi), nautical miles (NM), and meters (m). All four are computed from the same Haversine result, so they are exactly consistent — no rounding mismatches between the displayed values. Nautical miles are useful for marine and aviation; meters are useful for short distances (under a kilometer) where the other units lose precision in the trailing digits.',
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

const cityPairs = [
  { a: 'London (51.5074, -0.1278)', b: 'Paris (48.8566, 2.3522)', km: '344', mi: '214', nm: '186' },
  { a: 'New York JFK (40.6413, -73.7781)', b: 'London LHR (51.4700, -0.4543)', km: '5,540', mi: '3,443', nm: '2,991' },
  { a: 'Karachi (24.8607, 67.0011)', b: 'Dubai (25.2048, 55.2708)', km: '1,193', mi: '741', nm: '644' },
  { a: 'Sydney (-33.8688, 151.2093)', b: 'Tokyo (35.6762, 139.6503)', km: '7,818', mi: '4,858', nm: '4,221' },
  { a: 'San Francisco (37.7749, -122.4194)', b: 'Los Angeles (34.0522, -118.2437)', km: '559', mi: '347', nm: '302' },
  { a: 'Cape Town (-33.9249, 18.4241)', b: 'Cairo (30.0444, 31.2357)', km: '7,222', mi: '4,488', nm: '3,899' },
];

export default function DistanceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="max-w-5xl mx-auto px-5 py-10">
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
            Enter two latitude / longitude pairs and get the great-circle distance in kilometers, miles, nautical miles, and meters, plus the initial bearing. Uses the Haversine formula — pure JavaScript, no API call, no signup.
          </p>
        </section>

        <Tool />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">What this calculator does</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The tool above takes two pairs of latitude and longitude and returns the straight-line distance over Earth&rsquo;s surface — the kind of distance an airline quotes when it tells you the flight is 5,000 km, not the longer driving distance that follows roads. The calculation runs in your browser using the Haversine formula, which has been the standard for sea and air navigation for over a century. It is accurate to about 0.5% globally — roughly five kilometers off on a thousand-kilometer trip, which is fine for trip planning and overkill for almost everything else.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Need the coordinates first? The{' '}
            <Link href="/my-location" className="text-accent hover:underline">My Location tool</Link>{' '}
            gives you yours in two seconds, and the{' '}
            <Link href="/gps-coordinates-finder" className="text-accent hover:underline">GPS coordinates finder</Link>{' '}
            covers every way to read your own. To find the coordinates of <em>another</em> place, long-press the location on Google Maps and the coordinates appear in the search bar.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Sanity-check the math against known distances</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The first time you use any distance calculator, it pays to verify the output against a pair you already know the answer for. Six common city pairs with their great-circle distances rounded to the nearest kilometre / mile / nautical mile:
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-fg-subtle">
            Paste any pair above into the tool to verify — the displayed result should match within one kilometre.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How accurate is great-circle distance, really?</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Earth is not a perfect sphere. It bulges slightly at the equator because of its own spin — the equatorial radius is about 21 kilometers larger than the polar radius. The Haversine formula assumes a sphere and ignores that bulge. For most pairs of points the error this introduces is well under one percent.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The points where the error matters are large distances along high-latitude paths — for example, polar flight routes. For those, the Vincenty formula uses the actual ellipsoid shape and gets within millimeters. Survey-grade work uses Vincenty; everyone else uses Haversine because it is simpler and the difference is invisible at the scale humans care about.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Why driving distance is always longer</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            People sometimes punch in two coordinates expecting the driving distance and are surprised when the result is much smaller. Driving distance has to follow roads, go around lakes and mountains, respect one-way streets, and divert through interchanges. A drive from London to Paris is about 460 km along roads — but only 344 km in a straight line over the English Channel. The straight-line version is the one this page calculates.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            If what you actually want is the road distance, use the{' '}
            <Link href="/driving-directions" className="text-accent hover:underline">Driving Directions tool</Link>{' '}
            instead. It calls the routing engine that does know about roads.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">What the bearing field tells you</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Alongside the distance, the calculator returns an initial bearing — the compass direction you would head if you started walking from point A towards point B. The catch with great-circle routes is that the bearing does not stay constant. A great-circle path from London to Tokyo starts heading northeast and ends heading southeast, even though Tokyo is south of London on the map. That is why polar flight routes look curved on a flat map but are actually straight lines on the globe.
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
              { href: '/gps-coordinates-finder', t: 'GPS Coordinates Finder', d: 'Tool + complete guide' },
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
