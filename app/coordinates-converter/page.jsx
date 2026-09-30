import Link from 'next/link';
import Tool from './Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';

export const metadata = {
  title: 'Coordinates Converter — DD, DMS, DDM & UTM (Free Tool)',
  description:
    'Free coordinates converter — convert GPS latitude and longitude between Decimal Degrees, DMS, DDM, and UTM in real time. Live map, no signup, no install.',
  keywords: [
    'coordinates converter',
    'gps coordinates converter',
    'dd to dms',
    'decimal degrees converter',
    'utm converter',
    'lat long converter',
    'convert coordinates',
  ],
  alternates: { canonical: '/coordinates-converter' },
  openGraph: {
    title: 'Coordinates Converter — Convert DD, DMS, DDM, UTM Free',
    description:
      'Convert GPS latitude and longitude between Decimal Degrees, DMS, DDM, and UTM in real time.',
    url: 'https://getmylocations.com/coordinates-converter',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coordinates Converter — DD ↔ DMS ↔ DDM ↔ UTM Free',
    description: 'Convert GPS latitude and longitude in real time. Free, no signup, runs in your browser.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Coordinates Converter',
  description:
    'Free browser-based tool that converts GPS latitude and longitude between Decimal Degrees (DD), Degrees-Minutes-Seconds (DMS), Degrees-Decimal-Minutes (DDM), and Universal Transverse Mercator (UTM).',
  url: 'https://getmylocations.com/coordinates-converter',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'GetMyLocations' },
  author: { '@type': 'Person', name: 'Ahmed Anwar', url: 'https://getmylocations.com/about' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getmylocations.com/' },
    { '@type': 'ListItem', position: 2, name: 'Coordinates Converter', item: 'https://getmylocations.com/coordinates-converter' },
  ],
};

const ddExamples = [
  { name: 'Eiffel Tower, Paris', dd: '48.858420, 2.294500', hemi: 'N, E' },
  { name: 'Statue of Liberty, NYC', dd: '40.689247, -74.044502', hemi: 'N, W' },
  { name: 'Sydney Opera House', dd: '-33.856785, 151.215290', hemi: 'S, E' },
  { name: 'Cape Town', dd: '-33.924870, 18.424055', hemi: 'S, E' },
  { name: 'Buenos Aires', dd: '-34.603722, -58.381592', hemi: 'S, W' },
  { name: 'Tokyo Tower', dd: '35.658580, 139.745560', hemi: 'N, E' },
];

const faqs = [
  {
    q: 'How do I convert decimal degrees to DMS?',
    a: 'Take the integer part of the decimal degree as the degrees value. Multiply the fractional part by 60 to get minutes (keep the integer part). Multiply the remaining fraction by 60 again to get seconds. Example: 48.8584° → 48° + (0.8584 × 60)′ = 48° 51.504′ → 48° 51′ (0.504 × 60)″ = 48° 51′ 30.24″. The tool above does this automatically as you type, including the hemisphere letter.',
  },
  {
    q: 'How do I convert DMS back to decimal degrees?',
    a: 'Take the degrees as is, divide the minutes by 60, divide the seconds by 3600, then add them all together. For southern latitudes or western longitudes, negate the result. Example: 48° 51′ 30.24″ N = 48 + 51/60 + 30.24/3600 = 48.8584°. Type either format into the tool above and the other recalculates in real time.',
  },
  {
    q: 'What is UTM and why would I use it?',
    a: 'Universal Transverse Mercator divides the world into 60 zones six degrees of longitude wide, each treated as a flat plane. Your position is expressed as "eastings" and "northings" in metres — so distances on a UTM grid translate directly to real-world metres on the ground. Hikers, search-and-rescue teams, surveyors, and the military prefer UTM for that reason. For everyday navigation, decimal degrees is far more common.',
  },
  {
    q: 'What does the letter after the UTM zone number mean (like "31U")?',
    a: 'The number is the longitude zone (1–60, six degrees wide). The letter is the latitude band (C–X, eight degrees tall, skipping I and O so they are not confused with 1 and 0). Together they uniquely identify which of the world\'s ~1,200 UTM cells you are in. The tool computes both from your input automatically and accounts for the Norway/Svalbard exceptions.',
  },
  {
    q: 'What is the difference between DMS and DDM?',
    a: 'Degrees-Minutes-Seconds (DMS) splits a degree into 60 minutes and each minute into 60 seconds — three units. Degrees-Decimal-Minutes (DDM) splits a degree into 60 minutes but expresses the remainder as a decimal — two units. Example: 48° 51′ 30.24″ in DMS becomes 48° 51.504′ in DDM. Marine GPS units typically display DDM; aviation and survey work usually use DMS.',
  },
  {
    q: 'My map ends up in the ocean off the coast of Africa — what is wrong?',
    a: "You almost certainly pasted a (longitude, latitude) coordinate where the tool expected (latitude, longitude). GeoJSON, PostGIS, and most programming libraries put longitude first; Google Maps, Apple Maps, and most consumer apps put latitude first. Swap the two values and try again. A quick sanity check: if either number is greater than 90 in absolute value, that one must be longitude (|latitude| only goes up to 90).",
  },
  {
    q: 'What are decimal degrees in GPS coordinates?',
    a: 'Decimal degrees (DD) write a latitude or longitude as a single signed number with a fractional part — for example, 48.858420 for the Eiffel Tower\'s latitude. Positive means north or east; negative means south or west. DD is the modern default produced by every smartphone, GPS receiver, Google Maps URL, and web API. It is the format almost every digital system accepts directly.',
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

const landmarks = [
  { name: 'Eiffel Tower, Paris', dd: '48.858420, 2.294500', dms: "48°51′30.3″N 2°17′40.2″E", ddm: "48°51.504′N 2°17.670′E", utm: '31U 448262 5411917' },
  { name: 'Statue of Liberty, NYC', dd: '40.689247, -74.044502', dms: "40°41′21.3″N 74°02′40.2″W", ddm: "40°41.355′N 74°02.670′W", utm: '18T 580757 4504699' },
  { name: 'Sydney Opera House', dd: '-33.856785, 151.215290', dms: "33°51′24.4″S 151°12′55.0″E", ddm: "33°51.407′S 151°12.917′E", utm: '56H 334893 6252053' },
  { name: 'Mount Everest summit', dd: '27.988100, 86.925000', dms: "27°59′17.2″N 86°55′30.0″E", ddm: "27°59.286′N 86°55.500′E", utm: '45R 492588 3095886' },
];

export default function CoordinatesConverterPage() {
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
            <li className="text-fg-muted">Coordinates Converter</li>
          </ol>
        </nav>

        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · Real-time Conversion</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Coordinates converter — convert between <span className="text-accent">DD, DMS, DDM, and UTM</span>
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Convert any GPS coordinate between <strong className="text-fg">Decimal Degrees</strong>, <strong className="text-fg">Degrees-Minutes-Seconds</strong>, <strong className="text-fg">Degrees-Decimal-Minutes</strong>, and <strong className="text-fg">Universal Transverse Mercator</strong>. Edit any field and the others update instantly. Free, no signup, runs entirely in your browser.
          </p>
        </section>

        <Tool />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">When you actually need to convert coordinates</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            For everyday use, your phone hands you decimal degrees and every app accepts them. The conversion problem only shows up when two systems disagree on format, and it shows up more often than you would think:
          </p>
          <ul className="mt-4 space-y-2 text-fg-muted leading-relaxed">
            <li>
              <strong>Aviation flight plans</strong> usually require degrees-minutes-seconds. A modern smartphone reading needs translating before it can go into the flight planner.
            </li>
            <li>
              <strong>Marine GPS units</strong> typically display degrees-decimal-minutes. Cross-referencing a chart coordinate against your modern phone takes a quick DD ↔ DDM conversion.
            </li>
            <li>
              <strong>Land-survey documents and older maps</strong> almost always use DMS. Reading a deed or a topographic chart from before about 1995 and matching it to a modern satellite view is a DMS-to-DD job.
            </li>
            <li>
              <strong>Hiking and search-and-rescue work</strong> often uses UTM because grid distances map directly to meters on the ground. You can pace UTM offsets in a way you cannot pace decimal-degree differences.
            </li>
            <li>
              <strong>GIS pipelines and GeoJSON</strong> use (longitude, latitude) order, while Google Maps and consumer apps use (latitude, longitude). The tool above normalises the order; using the wrong order is the most common silent error in coordinate work.
            </li>
            <li>
              <strong>Emergency dispatch.</strong> Most dispatchers can take decimal degrees or DMS. Knowing which one you are reading off your phone matters more than the conversion itself — see our{' '}
              <Link href="/blog/gps-coordinates-emergencies-aml-guide" className="text-accent hover:underline">emergency GPS guide</Link>{' '}
              for the four-line script to say on the call.
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Format quick reference</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The same point on Earth in all four formats — useful as a calibration check the first time you use the tool:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tint/5 text-left text-fg-muted">
                  <th className="px-3 py-2 font-semibold">Landmark</th>
                  <th className="px-3 py-2 font-semibold">DD</th>
                  <th className="px-3 py-2 font-semibold">DMS</th>
                  <th className="px-3 py-2 font-semibold">DDM</th>
                  <th className="px-3 py-2 font-semibold">UTM</th>
                </tr>
              </thead>
              <tbody>
                {landmarks.map((l) => (
                  <tr key={l.name} className="border-t border-line-subtle">
                    <td className="px-3 py-2 text-fg-muted">{l.name}</td>
                    <td className="px-3 py-2 font-mono text-xs text-fg">{l.dd}</td>
                    <td className="px-3 py-2 font-mono text-xs text-fg-muted">{l.dms}</td>
                    <td className="px-3 py-2 font-mono text-xs text-fg-muted">{l.ddm}</td>
                    <td className="px-3 py-2 font-mono text-xs text-fg-muted">{l.utm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How the tool handles each format</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Decimal degrees are the master input. Type a value into either of the two top boxes and the page recalculates the DMS, DDM, and UTM versions on the fly. If you have the coordinate in DMS or DDM, type it in the corresponding row and the tool back-converts to decimal degrees. UTM is shown as a read-only output because typing easting and northing by hand is uncommon and error-prone — almost everyone who works in UTM already has it in a GIS file or a topographic chart.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            For a deeper read on what each format actually represents and why anyone would use one over another, the{' '}
            <Link href="/coordinates-converter" className="text-accent hover:underline">decimal degrees guide</Link>{' '}
            zooms in on DD specifically, and the{' '}
            <Link href="/blog/latitude-vs-longitude-explained" className="text-accent hover:underline">latitude vs longitude post</Link>{' '}
            covers signs, order, and the memory tricks.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How the UTM zone is calculated</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            UTM divides the world into 60 vertical zones, each six degrees of longitude wide. Zone 1 starts at the international date line and runs east. Your zone number is found from your longitude with the formula{' '}
            <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm mx-1">floor((lon + 180) / 6) + 1</code>.
            Norway and Svalbard have hand-tuned exceptions to keep their countries from straddling zone boundaries, and the tool honours those special cases. The letter that follows the zone number — like the U in &ldquo;31U&rdquo; — comes from your latitude and identifies the eight-degree band you are sitting in.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Common mistakes the tool catches</h2>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
            <li>Latitude over 90 or longitude over 180 — the tool flags this rather than producing nonsense.</li>
            <li>Forgetting to switch the hemisphere letter when typing DMS for southern or western locations.</li>
            <li>Pasting a coordinate with the longitude first (a GeoJSON pattern). The tool assumes latitude first; if your map ends up in the ocean, swap the two.</li>
            <li>Mixing up DDM and DMS — they look similar but the trailing fraction is in different units. Type into the field labelled for the format you actually have.</li>
          </ul>
        </section>

        <section className="mt-10">
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

          </section>

        <section className="mt-10">

          <h2 className="font-display text-2xl font-bold">When to use DD versus DMS</h2>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
            <li><strong>Use DD</strong> for anything digital &mdash; APIs, spreadsheets, Google Maps URLs, GIS files, navigation apps. It is the modern standard and avoids parsing the ° ′ ″ symbols.</li>
            <li><strong>Use DMS</strong> for paper nautical charts, aviation publications, land-survey documents, and historical references. Many published surveys still cite DMS.</li>
            <li><strong>Use DDM</strong> on marine GPS units. DDM splits the minute decimal but skips seconds entirely — a notation most chart-plotter manufacturers default to.</li>
            <li><strong>Use UTM</strong> for hiking, search-and-rescue, surveying — anywhere grid distances need to map directly to metres on the ground.</li>
            <li><strong>Convert when crossing formats</strong> &mdash; e.g., reading a coordinate off an old chart and pasting it into Google Maps, or copying a phone&apos;s coordinate into a printed expedition report.</li>
          </ul>

          </section>

        <section className="mt-10">

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

          </section>

        <section className="mt-10">

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
          <h2 className="font-display text-2xl font-bold">Related tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
            {[
              { href: '/my-location', t: 'My Location', d: 'Get your live GPS coordinates' },
              { href: '/live-location', t: 'Live Location', d: 'Real-time tracking as you move' },
              { href: '/distance-calculator', t: 'Distance Calculator', d: 'Haversine between two points' },
              { href: '/address-finder', t: 'Address Finder', d: 'Address ↔ coordinates' },
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
