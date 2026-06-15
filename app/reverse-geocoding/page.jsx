import Link from 'next/link';
import AuthorBio from '../components/AuthorBio.jsx';

export const metadata = {
  title: 'Reverse Geocoding Explained — How Coordinates Become a Street Address',
  description:
    'Reverse geocoding explained — how GPS coordinates become a street address, the algorithm step by step, common failure modes, and free APIs (Nominatim, BigDataCloud) to call yourself.',
  keywords: [
    'reverse geocoding',
    'coordinates to address',
    'what is reverse geocoding',
    'gps to address',
    'lat long to address',
    'nominatim reverse geocoding',
  ],
  alternates: { canonical: '/reverse-geocoding' },
  openGraph: {
    title: 'Reverse Geocoding Explained — Coordinates → Street Address',
    description:
      'How GPS coordinates become a street address, step by step. With accuracy notes, common failure modes, and free APIs.',
    url: 'https://getmylocations.com/reverse-geocoding',
    type: 'article',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reverse Geocoding — Coordinates to Address Explained',
    description: 'How the algorithm picks an address from a lat/long. With APIs and accuracy notes.',
    images: ['/og-image.png'],
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Reverse Geocoding Explained — How Coordinates Become a Street Address',
  description:
    'A complete explainer on reverse geocoding: how a GPS coordinate is translated into a human-readable street address, the algorithm, accuracy limits, and how to call the free APIs yourself.',
  author: { '@type': 'Person', name: 'Ahmed Anwar' },
  publisher: {
    '@type': 'Organization',
    name: 'GetMyLocations',
    logo: { '@type': 'ImageObject', url: 'https://getmylocations.com/icon-512.png' },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://getmylocations.com/reverse-geocoding' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getmylocations.com/' },
    { '@type': 'ListItem', position: 2, name: 'Reverse Geocoding', item: 'https://getmylocations.com/reverse-geocoding' },
  ],
};

const faqs = [
  {
    q: 'What is reverse geocoding in simple terms?',
    a: 'Reverse geocoding is the translation of a GPS coordinate (a pair of numbers like 48.858420, 2.294500) into a human-readable address like "5 Avenue Anatole France, 75007 Paris, France." It is the opposite direction of forward geocoding, which takes an address as input and returns coordinates. Every modern ride-hailing app, courier confirmation, and "share my location" message relies on reverse geocoding behind the scenes.',
  },
  {
    q: 'How does reverse geocoding actually work?',
    a: 'The algorithm runs a series of point-in-polygon tests at increasing specificity: country, region/state, city, then street. For the street level, it finds the nearest street centerline within ~50–200 m and interpolates between the start and end house numbers stored for that segment. A separate polygon dataset returns the postal code. Big providers also overlay a points-of-interest layer so a coordinate inside a known building can return the building name instead of a street address.',
  },
  {
    q: 'Why does reverse geocoding sometimes return the wrong house number?',
    a: 'Map databases rarely store a coordinate for every individual house. Instead they store the start and end of each street and the range of numbers along it, then linearly interpolate. This assumes evenly spaced houses, which is almost never true in practice. Off-by-two house numbers are normal in suburbs; off-by-ten can happen in older neighborhoods with irregular plot sizes or renumbered blocks.',
  },
  {
    q: 'Is reverse geocoding the same as IP geolocation?',
    a: 'No. Reverse geocoding starts from real GPS coordinates (typically from a device GPS chip, accurate to a few metres) and produces an address. IP geolocation starts from a network address (visible to any website) and guesses a coordinate from a database — accurate only to a city, often only to a country. They use different inputs, different algorithms, and have wildly different accuracy guarantees.',
  },
  {
    q: 'What are the best free reverse-geocoding APIs?',
    a: 'OpenStreetMap Nominatim is the most-used free option — no API key required, but rate-limited to about one request per second per IP. The endpoint is https://nominatim.openstreetmap.org/reverse?format=json&lat=…&lon=… and returns JSON with country, region, city, road, and house number where available. BigDataCloud offers a free client-side tier with decent global coverage. For high-volume or commercial use, MapBox, HERE, and Google Geocoding offer paid plans with higher accuracy and SLAs.',
  },
  {
    q: 'How do I reverse-geocode coordinates right now?',
    a: 'For a one-off lookup, use the Address Finder tool — paste a lat/long pair (latitude first) and it returns the nearest street address via Nominatim in under a second. For your own current location, the My Current Location tool reads your GPS and reverse-geocodes it in one tap. For programmatic use, call the Nominatim or BigDataCloud API endpoints directly with a standard HTTP GET.',
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

export default function ReverseGeocoding() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

    <main role="main" className="max-w-3xl mx-auto px-5 py-12 prose-invert">
      <nav aria-label="Breadcrumb" className="text-xs text-fg-subtle mb-4 not-prose">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
          <li aria-hidden="true">›</li>
          <li className="text-fg-muted">Reverse Geocoding</li>
        </ol>
      </nav>

      <article>
        <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">Complete Guide</p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight mt-2 leading-[1.1]">
          Reverse geocoding &mdash; turn a pair of GPS coordinates into a street address
        </h1>
        <p className="mt-4 text-lg text-fg-muted leading-relaxed">
          You have a latitude and longitude. You want the street, the neighborhood, the city, or even
          the building name. That translation &mdash; coordinates to a human-readable address &mdash;
          is called <strong>reverse geocoding</strong>. It powers ride-hailing apps, courier
          confirmations, photo-tagging, weather alerts by zip code, and the &ldquo;city&rdquo; field on
          every &ldquo;find my location&rdquo; page. This guide explains how it works, when it&apos;s
          accurate, when it isn&apos;t, and how to do it yourself.
        </p>

        <div className="mt-6 glass rounded-2xl p-5 ring-1 ring-accent/30">
          <p className="text-sm text-fg-muted leading-relaxed">
            <strong className="text-fg">Want to try it right now?</strong> The{' '}
            <Link href="/address-finder" className="text-accent hover:underline font-semibold">Address Finder tool</Link>{' '}
            does reverse geocoding on demand — paste any lat/long and get the nearest street address in under a second. For your own current location, the{' '}
            <Link href="/my-current-location" className="text-accent hover:underline font-semibold">My Current Location tool</Link>{' '}
            reads your GPS and reverse-geocodes it in one tap.
          </p>
        </div>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">What reverse geocoding is (and isn&apos;t)</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          <strong>Forward geocoding</strong> goes from text to coordinates: you type
          &ldquo;1600 Amphitheatre Parkway, Mountain View, CA&rdquo; and you get
          {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">37.4220, -122.0841</code>.
          That&apos;s what a search box in Google Maps does.
        </p>
        <p className="mt-3 text-fg-muted leading-relaxed">
          <strong>Reverse geocoding</strong> is the opposite direction: you have the coordinates and
          want the text. It&apos;s harder than it sounds, because the same coordinate can be inside a
          building, inside a park, inside a body of water, or on a private road that has no
          official address.
        </p>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Reverse geocoding is also not the same as <strong>IP geolocation</strong>. Reverse geocoding
          starts from real coordinates (typically from a GPS chip); IP geolocation guesses
          coordinates from a network address. Read more in our
          {' '}<Link href="/ip-location-lookup" className="text-accent hover:underline">IP location lookup guide</Link>.
        </p>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">How it works under the hood</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Every reverse geocoder needs three things: a database of place boundaries (countries,
          regions, cities, postal codes), a database of street centerlines with house-number ranges,
          and an algorithm to pick the most specific answer that still contains your point.
        </p>
        <p className="mt-3 text-fg-muted leading-relaxed">
          The algorithm is roughly:
        </p>
        <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
          <li>
            <strong>Country.</strong> A point-in-polygon test against world country borders. This
            is fast and almost always correct.
          </li>
          <li>
            <strong>Region / state.</strong> A second polygon test inside the country&apos;s subdivisions.
          </li>
          <li>
            <strong>City or town.</strong> A third polygon test. Cities have fuzzy edges &mdash; one
            address may be inside a city legally and outside it for postal purposes, depending on
            which dataset you ask.
          </li>
          <li>
            <strong>Street.</strong> Find the nearest street segment within a small radius (usually
            50&ndash;200 m). The segment has a left-side and right-side house-number range; interpolate.
          </li>
          <li>
            <strong>House number.</strong> The interpolation gives a guess at the house number. It&apos;s
            often off by a few houses because streets number unevenly &mdash; gaps, corner lots,
            renumbered blocks.
          </li>
          <li>
            <strong>Postal code.</strong> A separate polygon dataset gives the zip / postcode.
          </li>
        </ol>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Big providers (Google, Mapbox, HERE) add a points-of-interest layer on top: if your
          coordinate is inside a known building polygon, the response can include the building name
          (&ldquo;Eiffel Tower&rdquo;, &ldquo;Sydney Opera House&rdquo;) instead of just a street address. Open data
          sources like OpenStreetMap have the same idea but with patchier coverage.
        </p>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">Find the address from a latitude / longitude pair</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Three practical ways to do it, in order of how much work they take:
        </p>

        <h3 className="font-display text-lg font-semibold mt-6 text-fg">1. Use the Address Finder tool</h3>
        <p className="mt-2 text-fg-muted leading-relaxed">
          The fastest way: paste your coordinates into the{' '}
          <Link href="/address-finder" className="text-accent hover:underline">Address Finder</Link>, drop a manual pin,
          and the reverse-geocoded result appears next to it. The pipeline uses OpenStreetMap
          Nominatim with a free fallback. For your own live coordinates, the{' '}
          <Link href="/my-current-location" className="text-accent hover:underline">My Current Location tool</Link>{' '}
          reads your GPS first and then reverse-geocodes in the same flow.
        </p>

        <h3 className="font-display text-lg font-semibold mt-6 text-fg">2. Use Google Maps directly</h3>
        <p className="mt-2 text-fg-muted leading-relaxed">
          Type the coordinates straight into the Google Maps search box, separated by a comma:
          {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">48.8584, 2.2945</code>.
          Maps centers on the location and shows the address in the left panel. Useful for one-off
          checks but not bulk work.
        </p>

        <h3 className="font-display text-lg font-semibold mt-6 text-fg">3. Hit an API directly</h3>
        <p className="mt-2 text-fg-muted leading-relaxed">
          For programmatic work, two free options:
        </p>
        <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
          <li>
            <strong>OpenStreetMap Nominatim</strong>:
            {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">https://nominatim.openstreetmap.org/reverse?lat=48.8584&amp;lon=2.2945&amp;format=json</code>.
            Free, no API key. Rate-limited to ~1 request per second &mdash; respect their fair-use policy.
          </li>
          <li>
            <strong>BigDataCloud</strong>: free reverse-geocoding tier with no API key needed for
            client-side calls, decent global coverage. We use it as the default in GetMyLocations.
          </li>
        </ul>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">Accuracy &mdash; when reverse geocoding gets it wrong</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Reverse geocoding is one of those features that&apos;s 95% correct and the remaining 5% is
          memorable. Common failure modes:
        </p>
        <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
          <li>
            <strong>House number is off by a few.</strong> Street centerline interpolation assumes
            evenly numbered houses, but real streets have gaps, irregular plots, and renumbered
            blocks. Off-by-two is normal in suburbs; off-by-ten happens in older neighborhoods.
          </li>
          <li>
            <strong>Coordinates inside a building return the wrong building.</strong> If two buildings
            are close together and the polygons overlap or are slightly mislabeled, the API may
            return whichever was indexed first.
          </li>
          <li>
            <strong>Rural areas have no street address at all.</strong> A coordinate in the middle of
            a forest, on a dirt track, or on a long-frontage farm will return only a town and
            region. There&apos;s nothing more specific to return.
          </li>
          <li>
            <strong>Bodies of water.</strong> Reverse geocoding the middle of a lake or sea typically
            returns a description like &ldquo;Pacific Ocean&rdquo; rather than a street address.
          </li>
          <li>
            <strong>International disagreements.</strong> Contested borders (Kashmir, Crimea, Western
            Sahara) appear differently depending on which provider&apos;s map of the world you query.
          </li>
          <li>
            <strong>Newly built streets.</strong> A street built in the last 6&ndash;12 months may not
            be in the provider&apos;s database yet.
          </li>
        </ul>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">Typical uses for reverse geocoding</h2>
        <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
          <li>
            <strong>Ride-hailing and delivery confirmations.</strong> &ldquo;Driver is at 24 Main St&rdquo; comes
            from reverse-geocoding the driver&apos;s GPS in real time.
          </li>
          <li>
            <strong>Photo metadata.</strong> Apple Photos, Google Photos, and Lightroom all reverse-geocode
            embedded EXIF GPS into city / country tags so you can browse photos by place.
          </li>
          <li>
            <strong>Weather alerts.</strong> Severe-weather pushes are targeted by zip code; the
            phone reverse-geocodes its GPS to figure out which zip to subscribe to.
          </li>
          <li>
            <strong>Insurance and emergency response.</strong> A 911/112 dispatcher reverse-geocodes
            an inbound AML coordinate to get a confirm-able address.
          </li>
          <li>
            <strong>Marketing and analytics.</strong> Aggregated GPS pings reverse-geocoded to city
            level power footfall reports, retail catchment studies, and traffic analytics.
          </li>
          <li>
            <strong>Hiking and trip logs.</strong> Turning a GPX track&apos;s coordinates into named
            places gives you a journal entry rather than a list of numbers.
          </li>
        </ul>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">Drop a pin on the map and reverse-geocode it</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          The most visual way to do reverse geocoding is to drop a pin. Open the{' '}
          <Link href="/address-finder" className="text-accent hover:underline font-semibold">Address Finder</Link>,
          switch to manual input mode, type or paste any coordinates, and the map flies to that
          point with a pin. The address text appears in the dashboard underneath, with separate
          fields for city, region, country, and (where available) the nearest street.
        </p>
        <p className="mt-3 text-fg-muted leading-relaxed">
          For a refresher on coordinate formats before you paste anything in, see our
          {' '}<Link href="/gps-coordinates-finder" className="text-accent hover:underline">GPS coordinates finder guide</Link>{' '}
          and the <Link href="/decimal-degrees-converter" className="text-accent hover:underline">decimal degrees converter</Link>.
        </p>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">Privacy and what we (don&apos;t) keep</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          When you reverse-geocode through any tool on this site, the coordinates are sent in real time to
          a third-party API (OpenStreetMap Nominatim) to produce the address &mdash; we don&apos;t cache or store them on a
          server we operate. Nominatim has its own privacy practices, summarized in our
          {' '}<Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>.
        </p>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
        <div className="glass mt-4 rounded-2xl divide-y divide-line-subtle not-prose">
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

        <h2 className="font-display text-2xl font-bold mt-10">Related tools and guides</h2>
        <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
          <li><Link href="/address-finder" className="text-accent hover:underline">Address Finder &mdash; the two-way geocoding tool</Link></li>
          <li><Link href="/my-current-location" className="text-accent hover:underline">My Current Location &mdash; your address in one tap</Link></li>
          <li><Link href="/gps-coordinates-finder" className="text-accent hover:underline">GPS coordinates finder &mdash; complete guide</Link></li>
          <li><Link href="/decimal-degrees-converter" className="text-accent hover:underline">Decimal degrees converter (DD &harr; DMS)</Link></li>
          <li><Link href="/ip-location-lookup" className="text-accent hover:underline">IP location lookup &mdash; complete guide</Link></li>
          <li><Link href="/blog/why-maps-show-wrong-street" className="text-accent hover:underline">Why maps put you on the wrong street</Link></li>
          <li><Link href="/fix-location-not-working" className="text-accent hover:underline">Fix location not working &mdash; troubleshooting</Link></li>
        </ul>

        <AuthorBio />
      </article>
    </main>
    </>
  );
}
