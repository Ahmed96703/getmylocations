import Link from 'next/link';


export const metadata = {
  title: 'Reverse Geocoding — Convert GPS Coordinates to an Address',
  description: "Reverse geocoding explained. Turn GPS coordinates into a street address using OpenStreetMap Nominatim and BigDataCloud. With accuracy notes and use cases.",
  alternates: { canonical: '/reverse-geocoding' },
  openGraph: {
    title: 'Reverse Geocoding — Convert GPS Coordinates to an Address',
    description: "Reverse geocoding explained. Turn GPS coordinates into a street address using OpenStreetMap Nominatim and BigDataCloud. With accuracy notes and use cases.",
    url: 'https://getmylocations.com/reverse-geocoding',
  },
};

export default function ReverseGeocoding() {
  return (
    <main role="main" className="max-w-3xl mx-auto px-5 py-12 prose-invert">
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
            <strong className="text-fg">Quick way to try it.</strong> Open
            {' '}<Link href="/" className="text-accent hover:underline font-semibold">GetMyLocations</Link>{' '}
            and allow the location prompt. The reverse-geocoded result &mdash; city, region, and
            country &mdash; appears under your coordinates within a second.
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

        <h3 className="font-display text-lg font-semibold mt-6 text-fg">1. Use GetMyLocations</h3>
        <p className="mt-2 text-fg-muted leading-relaxed">
          The fastest way: paste your coordinates into the
          {' '}<Link href="/" className="text-accent hover:underline">main tool</Link>, drop a manual pin,
          and the reverse-geocoded result appears next to it. The pipeline uses BigDataCloud
          first, with OpenStreetMap Nominatim as a fallback for areas BigDataCloud doesn&apos;t cover
          well.
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
          The most visual way to do reverse geocoding is to drop a pin. Open
          {' '}<Link href="/" className="text-accent hover:underline font-semibold">GetMyLocations</Link>,
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
          When you reverse-geocode through GetMyLocations, the coordinates are sent in real time to
          a third-party API to produce the address &mdash; we don&apos;t cache or store them on a
          server we operate. The third parties (BigDataCloud, OpenStreetMap Nominatim) have their
          own privacy practices, summarized in our
          {' '}<Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>.
        </p>

        <h2 className="font-display text-2xl font-bold mt-10">Related guides</h2>
        <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
          <li><Link href="/gps-coordinates-finder" className="text-accent hover:underline">GPS coordinates finder &mdash; complete guide</Link></li>
          <li><Link href="/decimal-degrees-converter" className="text-accent hover:underline">Decimal degrees converter (DD &harr; DMS)</Link></li>
          <li><Link href="/ip-location-lookup" className="text-accent hover:underline">IP location lookup &mdash; complete guide</Link></li>
          <li><Link href="/fix-location-not-working" className="text-accent hover:underline">Fix location not working &mdash; troubleshooting</Link></li>
        </ul>
      </article>
    </main>
  );
}
