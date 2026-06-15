import Link from 'next/link';
import Tool from '../my-location/Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';

export const metadata = {
  title: 'GPS Coordinates Finder — Get My Latitude and Longitude in 2 Seconds (Free)',
  description:
    'Free GPS coordinates finder — read your exact latitude, longitude, and accuracy radius right in the browser. Plus a complete guide to DD, DMS, UTM, and the six-decimal sweet spot.',
  keywords: [
    'gps coordinates',
    'gps coordinates finder',
    'find my coordinates',
    'gps coordinates of my location',
    'find my current coordinates',
    'find coordinates',
  ],
  alternates: { canonical: '/gps-coordinates-finder' },
  openGraph: {
    title: 'GPS Coordinates Finder — Get My Lat/Long in 2 Seconds (Free)',
    description:
      'Read your exact latitude, longitude, and accuracy radius free in your browser. No signup, no install.',
    url: 'https://getmylocations.com/gps-coordinates-finder',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPS Coordinates Finder — Get Lat/Long in 2 Seconds',
    description: 'Free, browser-based. No signup. Plus a complete guide to DD, DMS, UTM.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'GPS Coordinates Finder',
  description:
    'Free browser-based tool that reads your GPS coordinates and displays them in decimal degrees with accuracy radius and a live map.',
  url: 'https://getmylocations.com/gps-coordinates-finder',
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
    { '@type': 'ListItem', position: 2, name: 'GPS Coordinates Finder', item: 'https://getmylocations.com/gps-coordinates-finder' },
  ],
};

const faqs = [
  {
    q: 'How do I find my GPS coordinates right now?',
    a: 'Tap the button on the tool above and allow the location permission. Your six-decimal latitude and longitude appear within two seconds, along with an accuracy radius. The "Copy coordinates" button puts the pair on your clipboard in the standard "lat, lon" format every map app understands. On iPhone the Compass app also shows live coordinates at the bottom of the screen; on Android, long-press your blue dot in Google Maps.',
  },
  {
    q: 'What are GPS coordinates of my location?',
    a: 'Two decimal numbers — a latitude and a longitude — that identify any spot on Earth to within a meter. Latitude is between -90 and +90 (how far north or south of the equator you are). Longitude is between -180 and +180 (how far east or west of Greenwich, England). Combined, they are the canonical reference for your position; a street address is derived from them, not the other way round.',
  },
  {
    q: 'How accurate are GPS coordinates from a browser?',
    a: 'On a phone outdoors with a clean satellite view: 3–5 metres. On a phone indoors using Wi-Fi positioning: 10–25 metres. On a laptop with no GPS chip: 25–100 metres via Wi-Fi, or 5–50 kilometres if it falls back to IP geolocation. The accuracy radius reported next to the coordinates is the device’s own 95% confidence circle — trust it.',
  },
  {
    q: 'How many decimal places should I keep when writing down coordinates?',
    a: 'Six is the sweet spot. Four decimals (~11 m) lands on a building; five (~1.1 m) lands on a parked car; six (~11 cm) is survey-grade. Most consumer GPS receivers can deliver three-to-five meters under ideal conditions, so writing more than six digits is false precision. For posting your home publicly, two or three decimals (~110 m – 1 km) coarsens you to a neighborhood without giving away the doorway.',
  },
  {
    q: 'What is the difference between DD, DMS, and UTM?',
    a: 'They all encode the same point in different notations. Decimal degrees (DD) is the modern default — "48.858420, 2.294500." Degrees-minutes-seconds (DMS) is the old nautical and aviation format — "48° 51\' 30.3\" N, 2° 17\' 40.2\" E." UTM divides the world into 60 zones and expresses position in metric eastings and northings — preferred by hikers and search-and-rescue because grid distance maps directly to meters on the ground. Our coordinates converter translates between all three with one click.',
  },
  {
    q: 'Why are my GPS coordinates wrong or jumping around?',
    a: 'Three common causes. (1) You are indoors with weak satellite reception, so the OS is using Wi-Fi or IP positioning with a much larger error radius. (2) You denied "precise" permission, so the browser is given a deliberately fuzzed coordinate. (3) A VPN is rewriting your IP, which only matters if no GPS or Wi-Fi positioning is available. Step outside, give the phone fifteen seconds to lock onto satellites, and re-read.',
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

export default function GpsCoordinatesFinder() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main role="main" className="max-w-3xl mx-auto px-5 py-12 prose-invert">
        <nav aria-label="Breadcrumb" className="text-xs text-fg-subtle mb-4 not-prose">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-fg-muted">GPS Coordinates Finder</li>
          </ol>
        </nav>

        <article>
          <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">Free Tool · Complete Guide</p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight mt-2 leading-[1.1]">
            GPS coordinates finder — get your latitude and longitude in two seconds
          </h1>
          <p className="mt-4 text-lg text-fg-muted leading-relaxed">
            Tap the button below and the page reads your exact GPS coordinates straight from your
            browser. You get the latitude, longitude, accuracy radius, city, and a live map pin —
            without signing up or installing anything. Below the tool, the guide covers what the two
            numbers actually mean, how to read DD/DMS/UTM, and where the readings come from.
          </p>

          <div className="not-prose my-8">
            <Tool />
          </div>

          <hr className="my-10 border-line" />

          <h2 className="font-display text-2xl font-bold">What latitude and longitude actually are</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Think of Earth as an orange covered in two sets of lines. The horizontal rings &mdash; running
            parallel to the equator &mdash; are <strong>lines of latitude</strong>. They tell you how far
            north or south you are. The vertical lines that run pole to pole are <strong>lines of
            longitude</strong>. They tell you how far east or west you are.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Latitude runs from 0&deg; at the equator to 90&deg; at the poles. The North Pole is +90&deg;
            (latitude 90&deg;&nbsp;N) and the South Pole is &minus;90&deg; (latitude 90&deg;&nbsp;S).
            Longitude runs from 0&deg; at the Prime Meridian in Greenwich, England, to 180&deg; in either
            direction, meeting at the International Date Line in the Pacific. East is positive, west is negative.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Any pair of these two numbers identifies one and only one point on Earth&apos;s surface. The
            Eiffel Tower is at <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">48.8584, 2.2945</code>.
            The Sydney Opera House is at <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">&minus;33.8568, 151.2153</code>. The negative latitude tells you it&apos;s in the
            southern hemisphere; the longitude tells you it&apos;s east of Greenwich. For the deep history
            of <em>why</em> we measure from Greenwich at all, see{' '}
            <Link href="/blog/history-of-latitude-and-longitude" className="text-accent hover:underline">the history of latitude and longitude</Link>.
          </p>

          <hr className="my-10 border-line" />

          <h2 className="font-display text-2xl font-bold">How to read each part of a coordinate</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Every decimal-degree coordinate has the same shape: <em>latitude</em>, then <em>longitude</em>,
            separated by a comma. <strong>Latitude always comes first.</strong> This trips people up because
            mapping APIs disagree &mdash; Google Maps and most consumer apps use the (lat, lon) order, but
            GeoJSON and many GIS systems use (lon, lat). When in doubt, the larger of the two absolute
            values is usually longitude (since longitude goes up to 180 and latitude only to 90). The{' '}
            <Link href="/blog/latitude-vs-longitude-explained" className="text-accent hover:underline">latitude vs longitude guide</Link>{' '}
            covers the memory tricks and edge cases.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The number of decimal places tells you how precise the coordinate is:
          </p>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
            <li><code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">48.8</code> &mdash; ~11 km. Enough to identify a city.</li>
            <li><code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">48.86</code> &mdash; ~1.1 km. Enough to identify a neighborhood.</li>
            <li><code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">48.858</code> &mdash; ~110 m. Enough to identify a city block.</li>
            <li><code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">48.8584</code> &mdash; ~11 m. Enough to identify a building.</li>
            <li><code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">48.85842</code> &mdash; ~1.1 m. Enough to identify a parking space.</li>
            <li><code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">48.858420</code> &mdash; ~11 cm. More than consumer GPS can reliably deliver.</li>
          </ul>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Six decimals (about one meter) is the practical sweet spot. Most smartphone GPS chips are
            accurate to roughly 3&ndash;5 meters under ideal conditions, so writing down more digits than
            that creates false precision.
          </p>

          <hr className="my-10 border-line" />

          <h2 className="font-display text-2xl font-bold">The three coordinate formats you&apos;ll see</h2>

          <h3 className="font-display text-lg font-semibold mt-6 text-fg">Decimal degrees (DD) &mdash; the modern default</h3>
          <p className="mt-2 text-fg-muted leading-relaxed">
            Example: <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">48.858420, 2.294500</code>. Two
            decimal numbers, comma-separated. This is what every smartphone, GPS receiver, Google Maps URL,
            and modern API produces. It&apos;s the easiest to read, the easiest to paste, and the format
            the tool above defaults to.
          </p>

          <h3 className="font-display text-lg font-semibold mt-6 text-fg">Degrees, minutes, seconds (DMS) &mdash; the paper-map classic</h3>
          <p className="mt-2 text-fg-muted leading-relaxed">
            Example: <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">48&deg; 51&apos; 30.3&quot; N, 2&deg; 17&apos; 40.2&quot; E</code>.
            Each degree is divided into 60 minutes; each minute is divided into 60 seconds. Hemisphere
            letters (N/S, E/W) replace the &plusmn; sign. Older nautical charts, aviation maps, and most
            land-survey documents use DMS.
          </p>
          <p className="mt-2 text-fg-muted leading-relaxed">
            Converting between DD and DMS isn&apos;t hard. The integer part of the decimal degree is the
            degrees value. Multiply the remainder by 60 to get minutes (taking the integer part), and
            multiply <em>that</em> remainder by 60 to get seconds. For example, 48.8584&deg; becomes
            48&deg; + (0.8584 &times; 60)&apos; = 48&deg; 51.504&apos;, then 48&deg; 51&apos; (0.504 &times; 60)&quot; = 48&deg; 51&apos; 30.24&quot;.
            Our{' '}
            <Link href="/coordinates-converter" className="text-accent hover:underline">coordinates converter</Link>{' '}
            does this in one click if you would rather skip the arithmetic.
          </p>

          <h3 className="font-display text-lg font-semibold mt-6 text-fg">UTM (Universal Transverse Mercator)</h3>
          <p className="mt-2 text-fg-muted leading-relaxed">
            Example: <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">31U 448262 5411917</code>.
            UTM divides the world into 60 vertical zones, each treated as a flat plane, then expresses
            your position as &ldquo;eastings&rdquo; and &ldquo;northings&rdquo; in meters. It&apos;s preferred by hikers,
            search-and-rescue teams, and the military because distances on a UTM grid translate
            directly to real-world meters, so you can pace them out on the ground.
          </p>

          <hr className="my-10 border-line" />

          <h2 className="font-display text-2xl font-bold">How a browser actually finds your coordinates</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            When you click &ldquo;Allow&rdquo; on a location prompt, the browser doesn&apos;t magically know where
            you are. It asks the operating system, which fuses several signals into a single best-guess
            coordinate:
          </p>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
            <li>
              <strong>GNSS satellites.</strong> Your phone or laptop&apos;s chip listens for signals from GPS
              (US), Galileo (EU), GLONASS (Russia), BeiDou (China), and QZSS (Japan). With four or more
              satellites in view, it triangulates a 3D position. Read{' '}
              <Link href="/blog/how-gps-works" className="text-accent hover:underline">how GPS works</Link>{' '}
              for the satellite math.
            </li>
            <li>
              <strong>Wi-Fi BSSID lookup.</strong> Apple and Google maintain global databases of Wi-Fi
              access point MAC addresses paired to GPS coordinates collected from millions of phones. If
              your device can hear three or more known access points, your OS can infer your position to
              within ~25 meters even with no GPS signal at all.
            </li>
            <li>
              <strong>Cell-tower triangulation.</strong> On mobile, the carrier&apos;s knowledge of which
              tower you&apos;re connected to (and signal strength) provides a fallback when GPS is
              unavailable. Accuracy: a few hundred meters in cities, several kilometers in rural areas.
            </li>
            <li>
              <strong>IP geolocation.</strong> The slowest, least accurate fallback. Used when none of
              the above are available, or when the user denies precise location.{' '}
              <Link href="/blog/what-is-ip-location-and-how-accurate" className="text-accent hover:underline">IP location accuracy explained</Link>.
            </li>
          </ul>

          <hr className="my-10 border-line" />

          <h2 className="font-display text-2xl font-bold">Practical uses for your coordinates</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            You almost certainly already use coordinates without thinking about them. A few uses where
            knowing how to read them by hand really pays off:
          </p>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
            <li>
              <strong>Emergency calls.</strong> If a dispatcher can&apos;t find your address (no street sign,
              wrong house number, foreign country), six decimals of latitude and longitude give them an
              unambiguous fix. Our{' '}
              <Link href="/blog/gps-coordinates-emergencies-aml-guide" className="text-accent hover:underline">emergency-GPS guide</Link>{' '}
              covers the four-line script to say on the call.
            </li>
            <li>
              <strong>Sharing a place that has no address.</strong> A trailhead, a campsite, a fishing
              spot, the entrance to a cave. Coordinates beat written directions every time. To convert a
              coordinate <em>back</em> into a readable street address, the{' '}
              <Link href="/address-finder" className="text-accent hover:underline">address finder</Link>{' '}
              handles both directions.
            </li>
            <li>
              <strong>Measuring distance between two points.</strong> The{' '}
              <Link href="/distance-calculator" className="text-accent hover:underline">distance calculator</Link>{' '}
              uses the Haversine great-circle formula on a pair of coordinates.
            </li>
            <li>
              <strong>Geocaching.</strong> The world&apos;s biggest treasure hunt. Over three million caches
              are hidden globally, each identified only by coordinates.
            </li>
            <li>
              <strong>Verifying a VPN.</strong> Connect to a VPN claiming to be in another country, then
              open the{' '}
              <Link href="/ip-location" className="text-accent hover:underline">IP Location tool</Link>{' '}
              to see what your IP looks like. Compare against the GPS reading above — if the IP places you
              elsewhere but GPS still shows your real city, the VPN&apos;s IP-side is working but GPS leaks
              your real location.
            </li>
            <li>
              <strong>Calibrating GPS-tagged photos.</strong> Cameras and phones embed GPS in EXIF
              metadata. Comparing the EXIF to a known-good reading on the same spot helps you spot
              a drifting GPS module.
            </li>
          </ul>

          <hr className="my-10 border-line" />

          <h2 className="font-display text-2xl font-bold">Privacy: what the website actually sees</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            When you grant the Geolocation API permission, the website receives only the resulting
            latitude/longitude/accuracy &mdash; not which satellites your phone heard or which Wi-Fi
            access points helped. The tool above processes those numbers entirely in your browser; the
            map tiles come from OpenStreetMap, and reverse geocoding (turning coordinates into a city
            name) routes through OpenStreetMap Nominatim. We don&apos;t store your coordinates &mdash;
            see our{' '}
            <Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>{' '}
            for the full breakdown of third parties involved.
          </p>

          <hr className="my-10 border-line" />

          <h2 className="font-display text-2xl font-bold">Related tools on this site</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5 not-prose">
            {[
              { href: '/gps-coordinates', t: 'GPS Coordinates', d: 'Raw lat/long display' },
              { href: '/my-location', t: 'My Location', d: 'Action-first one-click tool' },
              { href: '/my-current-location', t: 'My Current Location', d: 'Address + coordinates' },
              { href: '/live-location', t: 'Live Location', d: 'Continuous tracking' },
              { href: '/coordinates-converter', t: 'Coordinates Converter', d: 'DD ↔ DMS ↔ UTM' },
              { href: '/distance-calculator', t: 'Distance Calculator', d: 'Between two coordinates' },
              { href: '/address-finder', t: 'Address Finder', d: 'Address ↔ coordinates' },
              { href: '/ip-location', t: 'IP Location', d: 'Look up any IP address' },
              { href: '/fix-location-not-working', t: 'Fix Location Issues', d: 'Troubleshooting checklist' },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="glass rounded-2xl p-4 hover:ring-accent/40 ring-1 ring-line transition group no-underline">
                <h3 className="font-display text-base font-bold text-fg group-hover:text-accent transition">{t.t}</h3>
                <p className="text-xs text-fg-subtle mt-1">{t.d}</p>
              </Link>
            ))}
          </div>

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

          <h2 className="font-display text-2xl font-bold mt-10">Related guides</h2>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
            <li><Link href="/blog/latitude-vs-longitude-explained" className="text-accent hover:underline">Latitude vs longitude &mdash; the difference, explained</Link></li>
            <li><Link href="/blog/how-gps-works" className="text-accent hover:underline">How GPS works &mdash; the satellite math</Link></li>
            <li><Link href="/blog/how-to-find-your-gps-coordinates" className="text-accent hover:underline">How to find your GPS coordinates</Link></li>
            <li><Link href="/blog/10-uses-for-gps-coordinates" className="text-accent hover:underline">10 surprising things you can do with a GPS coordinate</Link></li>
            <li><Link href="/blog/gps-coordinates-emergencies-aml-guide" className="text-accent hover:underline">GPS coordinates in an emergency &mdash; how to send your location to 911 or 112</Link></li>
            <li><Link href="/fix-location-not-working" className="text-accent hover:underline">Fix location not working &mdash; troubleshooting guide</Link></li>
          </ul>

          <AuthorBio />
        </article>
      </main>
    </>
  );
}
