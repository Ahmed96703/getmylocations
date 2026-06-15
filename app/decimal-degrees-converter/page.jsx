import Link from 'next/link';
import Tool from '../coordinates-converter/Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';

export const metadata = {
  title: 'Decimal Degrees Converter — DD to DMS, DDM, UTM (Free Live Tool)',
  description:
    'Free decimal degrees converter — convert DD to DMS, DDM, and UTM in real time. Plus the math, precision table, and DD ↔ DMS examples for every hemisphere.',
  keywords: [
    'decimal degrees',
    'decimal degrees converter',
    'dd to dms',
    'dd coordinates',
    'convert decimal degrees',
    'dd format',
  ],
  alternates: { canonical: '/decimal-degrees-converter' },
  openGraph: {
    title: 'Decimal Degrees Converter — DD to DMS, DDM, UTM (Free)',
    description:
      'Convert decimal degrees to DMS, DDM, and UTM in real time. Plus the math, precision table, and worked examples.',
    url: 'https://getmylocations.com/decimal-degrees-converter',
    type: 'article',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decimal Degrees Converter — DD to DMS, DDM, UTM',
    description: 'Free, live, runs in your browser. Plus the math and precision rules.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Decimal Degrees Converter',
  description:
    'Free browser-based decimal degrees converter — translates DD ↔ DMS ↔ DDM ↔ UTM in real time, with a focus on decimal-degree (DD) format used by smartphones and modern APIs.',
  url: 'https://getmylocations.com/decimal-degrees-converter',
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
    { '@type': 'ListItem', position: 2, name: 'Decimal Degrees Converter', item: 'https://getmylocations.com/decimal-degrees-converter' },
  ],
};

const faqs = [
  {
    q: 'What are decimal degrees in GPS coordinates?',
    a: 'Decimal degrees (DD) write a latitude or longitude as a single signed number with a fractional part — for example, 48.858420 for the Eiffel Tower\'s latitude. Positive means north or east; negative means south or west. DD is the modern default produced by every smartphone, GPS receiver, Google Maps URL, and web API. It is the format almost every digital system accepts directly.',
  },
  {
    q: 'How do I convert decimal degrees to DMS?',
    a: 'Take the integer part of the decimal degree as the degrees value. Multiply the fractional part by 60 to get the minutes (keep the integer part). Multiply the remaining fraction by 60 again to get the seconds. Example: 48.8584° → 48° + (0.8584 × 60)′ = 48° 51.504′ → 48° 51′ (0.504 × 60)″ = 48° 51′ 30.24″. The tool above does this automatically as you type, including the N/S/E/W hemisphere letter.',
  },
  {
    q: 'How do I convert DMS back to decimal degrees?',
    a: 'Take the degrees as is, divide the minutes by 60, divide the seconds by 3600, then add the three together. For southern latitudes or western longitudes, negate the result. Example: 48° 51′ 30.24″ N = 48 + 51/60 + 30.24/3600 = 48.8584°. Type either format into the tool and the other recalculates immediately.',
  },
  {
    q: 'How many decimal places does a DD coordinate need?',
    a: 'Each decimal divides the uncertainty by ten. Three decimals (~110 m) is enough for a city block; four (~11 m) lands on a building; five (~1.1 m) is what most smartphone GPS realistically delivers; six (~11 cm) is the de facto storage format. Writing more than six is false precision because consumer GPS rarely beats one metre under ideal conditions.',
  },
  {
    q: 'Why are some decimal-degree coordinates negative?',
    a: 'DD uses signs to indicate hemispheres. Positive latitude = north of the equator; negative latitude = south of the equator. Positive longitude = east of Greenwich; negative longitude = west. So Sydney is -33.8568, 151.2153 (south, east) and the Statue of Liberty is 40.6892, -74.0445 (north, west). DMS uses N/S/E/W letters instead — the same point, the same magnitude, just a different notation for direction.',
  },
  {
    q: 'Is DD the same as the format Google Maps uses?',
    a: 'Yes. Open Google Maps in a browser, right-click any point, and the first item in the menu is the DD coordinate — "48.858420, 2.294500" — ready to copy. iPhone\'s Compass app, Apple Maps, Android\'s long-press menu, and almost every GPS app default to the same format. DD is the lingua franca of consumer mapping.',
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

const ddExamples = [
  { name: 'Eiffel Tower, Paris', dd: '48.858420, 2.294500', hemi: 'N, E' },
  { name: 'Statue of Liberty, NYC', dd: '40.689247, -74.044502', hemi: 'N, W' },
  { name: 'Sydney Opera House', dd: '-33.856785, 151.215290', hemi: 'S, E' },
  { name: 'Cape Town', dd: '-33.924870, 18.424055', hemi: 'S, E' },
  { name: 'Buenos Aires', dd: '-34.603722, -58.381592', hemi: 'S, W' },
  { name: 'Tokyo Tower', dd: '35.658580, 139.745560', hemi: 'N, E' },
];

export default function DecimalDegreesConverter() {
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
            <li className="text-fg-muted">Decimal Degrees Converter</li>
          </ol>
        </nav>

        <article>
          <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">Free Tool · DD Focus</p>
          <h1 className="font-display text-4xl font-extrabold tracking-tight mt-2 leading-[1.1]">
            Decimal degrees converter &mdash; DD to DMS, DDM, and UTM
          </h1>
          <p className="mt-4 text-lg text-fg-muted leading-relaxed">
            Decimal degrees (DD) is the modern default for latitude and longitude — the format every
            smartphone, GPS receiver, and modern API produces. Paste a DD value into the tool below
            and you get the equivalent in degrees-minutes-seconds (DMS), degrees-decimal-minutes
            (DDM), and Universal Transverse Mercator (UTM) instantly. Below the tool, this page goes
            deep on DD specifically: what the number means, how to convert it by hand, and how many
            decimal places you actually need.
          </p>

          <div className="not-prose my-8">
            <Tool />
          </div>

          <hr className="my-10 border-line" />

          <h2 className="font-display text-2xl font-bold">What decimal degrees actually mean</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            A coordinate is just an angle. Decimal degrees write that angle as a single number with a
            fractional part: <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">48.858420</code>.
            The integer part (48) is the degree; the fractional part (0.858420) is what fraction of the
            next degree you are. Northern hemisphere latitudes are positive (0 to +90); southern
            latitudes are negative. Eastern longitudes are positive (0 to +180); western longitudes
            are negative.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Two numbers in DD format identify a single point on Earth&apos;s surface. Latitude comes
            first (Google Maps convention); longitude second. The order matters: if either value is
            greater than 90 in absolute value, that one must be longitude — latitude only goes up to
            ±90. For deeper coverage of the order, signs, and edge cases, see the{' '}
            <Link href="/blog/latitude-vs-longitude-explained" className="text-accent hover:underline">latitude vs longitude guide</Link>.
          </p>

          <hr className="my-10 border-line" />

          <h2 className="font-display text-2xl font-bold">The DD ↔ DMS conversion math</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Decimal degrees and DMS encode the same angle in different notations. The math both ways:
          </p>
          <h3 className="font-display text-lg font-semibold mt-5 text-fg">DD → DMS</h3>
          <ol className="mt-2 space-y-1.5 text-fg-muted list-decimal list-inside">
            <li>Take the integer part of the decimal degree — that is your degrees value.</li>
            <li>Multiply the fractional part by 60 — the integer part of the result is your minutes.</li>
            <li>Multiply the remaining fraction by 60 again — that is your seconds.</li>
          </ol>
          <p className="mt-2 text-fg-muted leading-relaxed">
            Example: 48.858420° → 48° + (0.858420 × 60)′ = 48° 51.5052′ → 48° 51′ (0.5052 × 60)″ = 48° 51′ 30.31″.
          </p>
          <h3 className="font-display text-lg font-semibold mt-5 text-fg">DMS → DD</h3>
          <p className="mt-2 text-fg-muted leading-relaxed">
            Take the degrees as is, divide the minutes by 60, divide the seconds by 3600, then add
            the three together. For southern latitudes or western longitudes, negate the final result
            (since DMS uses an N/S/E/W letter where DD uses a sign).
          </p>
          <p className="mt-2 text-fg-muted leading-relaxed">
            Example: 48° 51′ 30.31″ N = 48 + 51/60 + 30.31/3600 = 48.858420°.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            For all four formats at once (including DDM and UTM), the{' '}
            <Link href="/coordinates-converter" className="text-accent hover:underline">multi-format coordinates converter</Link>{' '}
            has the same engine with a broader interface.
          </p>

          <hr className="my-10 border-line" />

          <h2 className="font-display text-2xl font-bold">When to use DD versus DMS</h2>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
            <li><strong>Use DD</strong> for anything digital &mdash; APIs, spreadsheets, Google Maps URLs, GIS files, navigation apps. It is the modern standard and avoids parsing the ° ′ ″ symbols.</li>
            <li><strong>Use DMS</strong> for paper nautical charts, aviation publications, land-survey documents, and historical references. Many published surveys still cite DMS.</li>
            <li><strong>Use DDM</strong> on marine GPS units. DDM splits the minute decimal but skips seconds entirely — a notation most chart-plotter manufacturers default to.</li>
            <li><strong>Use UTM</strong> for hiking, search-and-rescue, surveying — anywhere grid distances need to map directly to metres on the ground.</li>
            <li><strong>Convert when crossing formats</strong> &mdash; e.g., reading a coordinate off an old chart and pasting it into Google Maps, or copying a phone&apos;s coordinate into a printed expedition report.</li>
          </ul>

          <hr className="my-10 border-line" />

          <h2 className="font-display text-2xl font-bold">DD precision — how many decimal places you really need</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Each decimal place of latitude or longitude shrinks your error by roughly a factor of ten.
            The full table:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line not-prose">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tint/5 text-left text-fg-muted">
                  <th className="px-3 py-2 font-semibold">Decimals</th>
                  <th className="px-3 py-2 font-semibold">Precision</th>
                  <th className="px-3 py-2 font-semibold">What it identifies</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-line-subtle"><td className="px-3 py-2 font-mono">0</td><td className="px-3 py-2 font-mono">~111 km</td><td className="px-3 py-2 text-fg-muted">A country or region</td></tr>
                <tr className="border-t border-line-subtle"><td className="px-3 py-2 font-mono">1</td><td className="px-3 py-2 font-mono">~11 km</td><td className="px-3 py-2 text-fg-muted">A large city</td></tr>
                <tr className="border-t border-line-subtle"><td className="px-3 py-2 font-mono">2</td><td className="px-3 py-2 font-mono">~1.1 km</td><td className="px-3 py-2 text-fg-muted">A neighbourhood</td></tr>
                <tr className="border-t border-line-subtle"><td className="px-3 py-2 font-mono">3</td><td className="px-3 py-2 font-mono">~110 m</td><td className="px-3 py-2 text-fg-muted">A city block</td></tr>
                <tr className="border-t border-line-subtle"><td className="px-3 py-2 font-mono">4</td><td className="px-3 py-2 font-mono">~11 m</td><td className="px-3 py-2 text-fg-muted">A single building</td></tr>
                <tr className="border-t border-line-subtle"><td className="px-3 py-2 font-mono">5</td><td className="px-3 py-2 font-mono">~1.1 m</td><td className="px-3 py-2 text-fg-muted">A parking space — smartphone GPS limit</td></tr>
                <tr className="border-t border-line-subtle"><td className="px-3 py-2 font-mono">6</td><td className="px-3 py-2 font-mono">~11 cm</td><td className="px-3 py-2 text-fg-muted">Survey grade — false precision for consumer GPS</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-fg-muted leading-relaxed">
            For DMS, one second of latitude is about 31 metres, and one decimal of a second is about
            3 metres. Old surveys often give whole-second precision — perfectly adequate for showing
            a landmark, less so for guiding a drone.
          </p>

          <hr className="my-10 border-line" />

          <h2 className="font-display text-2xl font-bold">Hemispheres and signs — the most common DD mistakes</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            DD uses signs: positive for North/East, negative for South/West. DMS uses hemisphere
            letters (N, S, E, W) instead. Mixing the two is the single most common mistake in
            conversion. A reference of landmarks in all four hemispheres:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line not-prose">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tint/5 text-left text-fg-muted">
                  <th className="px-3 py-2 font-semibold">Landmark</th>
                  <th className="px-3 py-2 font-semibold">DD</th>
                  <th className="px-3 py-2 font-semibold">Hemispheres</th>
                </tr>
              </thead>
              <tbody>
                {ddExamples.map((row) => (
                  <tr key={row.name} className="border-t border-line-subtle">
                    <td className="px-3 py-2 text-fg-muted">{row.name}</td>
                    <td className="px-3 py-2 font-mono text-xs text-fg">{row.dd}</td>
                    <td className="px-3 py-2 font-mono text-fg-muted">{row.hemi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Two landmarks worth memorising as sanity checks: Sydney is -33.8568, 151.2153 (south,
            east — first number negative, second positive); the Statue of Liberty is 40.6892,
            -74.0445 (north, west — first positive, second negative). If your map ends up in the wrong
            ocean, one of those signs is off.
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
            <li><Link href="/coordinates-converter" className="text-accent hover:underline">Coordinates Converter &mdash; same tool with multi-format focus</Link></li>
            <li><Link href="/my-location" className="text-accent hover:underline">My Location &mdash; get your live DD coordinates</Link></li>
            <li><Link href="/gps-coordinates" className="text-accent hover:underline">GPS Coordinates &mdash; raw lat/long display</Link></li>
            <li><Link href="/gps-coordinates-finder" className="text-accent hover:underline">GPS coordinates finder &mdash; complete guide</Link></li>
            <li><Link href="/blog/latitude-vs-longitude-explained" className="text-accent hover:underline">Latitude vs longitude &mdash; the difference, explained</Link></li>
            <li><Link href="/distance-calculator" className="text-accent hover:underline">Distance calculator &mdash; Haversine between two DD pairs</Link></li>
            <li><Link href="/fix-location-not-working" className="text-accent hover:underline">Fix location not working &mdash; troubleshooting</Link></li>
          </ul>

          <AuthorBio />
        </article>
      </main>
    </>
  );
}
