import Link from 'next/link';
import Tool from './Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';

export const metadata = {
  title: 'Address Finder — Convert Address to GPS Coordinates (and Back) Free',
  description:
    'Free address finder — convert any street address to GPS coordinates, or paste a lat/long pair to get the nearest street address. Two-way geocoding, instant, no signup.',
  keywords: [
    'address finder',
    'geocoding',
    'address to coordinates',
    'coordinates to address',
    'find address from coordinates',
    'what is my current location address',
  ],
  alternates: { canonical: '/address-finder' },
  openGraph: {
    title: 'Address Finder — Address to GPS Coordinates and Back (Free)',
    description:
      'Convert any street address into GPS coordinates, or reverse coordinates back into an address. Two-way, instant.',
    url: 'https://getmylocations.com/address-finder',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Address Finder — Two-way Address ↔ GPS Coordinates',
    description: 'Address to lat/long, or lat/long to address. Free, instant, no signup.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Address Finder',
  description:
    'Free browser-based geocoding tool that converts any street address or landmark name into GPS coordinates, and reverses GPS coordinates into the nearest street address.',
  url: 'https://getmylocations.com/address-finder',
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
    { '@type': 'ListItem', position: 2, name: 'Address Finder', item: 'https://getmylocations.com/address-finder' },
  ],
};

const faqs = [
  {
    q: 'How do I convert a street address to GPS coordinates?',
    a: 'Type the address into the tool above and tap Search. The page sends the address to OpenStreetMap Nominatim, which returns the matching latitude and longitude in decimal degrees, plus a confidence score and the resolved label. For obscure addresses, adding the city and country to the query dramatically improves accuracy — "Main Street" matches nothing useful, but "Main Street, Springfield, Illinois" works fine.',
  },
  {
    q: 'How do I find the address of a GPS coordinate?',
    a: 'Paste the latitude and longitude into the same tool (latitude first, then longitude) and tap Search. The reverse-geocoding call returns the nearest street, neighborhood, city, and country. Resolution depends on the underlying database — outdoor city addresses usually resolve to a street; rural coordinates often resolve only to a village or district.',
  },
  {
    q: 'Why is the address one or two house numbers off?',
    a: 'Map databases rarely store a coordinate for every individual house number. Instead they store the start and end of each street and the range of numbers along it, then interpolate to estimate where house 47 sits. This works fine on a tidy block but falls apart when houses are spaced unevenly or when a street was renumbered. The result is the familiar pattern of a pin landing two houses short or on the wrong side of a small street.',
  },
  {
    q: 'What is my current location address?',
    a: 'To get your live current address, use the My Current Location tool — it reads your GPS coordinates from the browser and reverse-geocodes them into a readable street, neighborhood, and city in two seconds. The address finder above is the broader two-way tool: enter any address or coordinate, not just your own.',
  },
  {
    q: 'Why does the lookup sometimes return nothing?',
    a: 'Three common causes. (1) The address is ambiguous — "Central Park" alone matches dozens of places worldwide, so add a city. (2) The coverage is thin — rural areas in many countries are mapped at the village level rather than the street level. (3) The Nominatim endpoint is rate-limited to about one request per second per IP; rapid-fire queries can return temporary errors. Slow down, add geographic context, try again.',
  },
  {
    q: 'Is this address finder accurate enough for delivery?',
    a: 'For most modern North-American and European addresses, yes. For dense city centers in Asia and South America, it lands on the right street most of the time but may miss the exact building. For rural addresses or new developments, it often resolves only to the nearest road. If you are sending a courier, supplement the geocoded coordinate with a landmark or photo — the coordinate gets them within a few buildings; the landmark closes the gap.',
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

const examples = [
  { input: 'Eiffel Tower', resolved: '48.858420, 2.294500 → 5 Avenue Anatole France, 75007 Paris, France' },
  { input: '1600 Pennsylvania Ave NW, Washington, DC', resolved: '38.897700, -77.036553 → The White House' },
  { input: 'Badshahi Mosque, Lahore', resolved: '31.587893, 74.310494 → Walled City of Lahore, Punjab, Pakistan' },
  { input: '40.689247, -74.044502', resolved: 'Statue of Liberty National Monument, Liberty Island, NY' },
  { input: '-33.856785, 151.215290', resolved: 'Sydney Opera House, Bennelong Point, Sydney, NSW, Australia' },
];

export default function AddressFinderPage() {
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
            <li className="text-fg-muted">Address Finder</li>
          </ol>
        </nav>

        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · Two-way Geocoding</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Address finder — <span className="text-accent">address ↔ GPS coordinates</span>
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Type any address, landmark, or place name and get the GPS coordinates. Or paste a latitude/longitude pair and get the nearest street address back. Powered by OpenStreetMap Nominatim. Free, no signup, instant.
          </p>
        </section>

        <Tool />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">What this tool does</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The page does two related jobs in one widget. Type in an address or a landmark name — &ldquo;Eiffel Tower&rdquo;, &ldquo;1600 Pennsylvania Ave&rdquo;, &ldquo;Badshahi Mosque, Lahore&rdquo; — and it returns the latitude and longitude. Paste a coordinate the other way and it tells you the nearest street address. Both lookups call OpenStreetMap&rsquo;s Nominatim service, which is free for low-volume use and covers most of the world.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            If you only need <em>your own</em> current address rather than someone else&apos;s, the{' '}
            <Link href="/my-current-location" className="text-accent hover:underline">My Current Location tool</Link>{' '}
            is more direct — it reads your GPS, reverse-geocodes it, and shows the street/city in one tap. For the conceptual deep-dive on the coordinates-to-address direction, our{' '}
            <Link href="/reverse-geocoding" className="text-accent hover:underline">reverse geocoding guide</Link>{' '}
            walks through how the algorithm actually picks the nearest address.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Worked examples — what input gives what output</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The tool accepts free-text addresses, landmark names, and raw coordinates interchangeably. Five examples showing the kind of result to expect:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tint/5 text-left text-fg-muted">
                  <th className="px-3 py-2 font-semibold">You type</th>
                  <th className="px-3 py-2 font-semibold">Tool returns</th>
                </tr>
              </thead>
              <tbody>
                {examples.map((row) => (
                  <tr key={row.input} className="border-t border-line-subtle">
                    <td className="px-3 py-2 font-mono text-xs text-fg">{row.input}</td>
                    <td className="px-3 py-2 text-xs text-fg-muted">{row.resolved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Why house numbers are sometimes one or two off</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Map databases rarely have a coordinate stored for every individual house number. Instead, they store the start and end of each street, the range of numbers along it (say 1 to 199 on the north side), and they slide along the line to estimate where number 47 sits. This works fine on a tidy block. It falls apart when houses are spaced unevenly, when one giant property took up four old plots, or when a street was renumbered decades ago and the records still reflect the old pattern.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The result is the familiar pattern of a pin that lands two houses short, or on the wrong side of a small street. For everyday use this is close enough; for couriers, it is the reason packages occasionally end up next door. Our{' '}
            <Link href="/blog/why-maps-show-wrong-street" className="text-accent hover:underline">post on why maps put you on the wrong street</Link>{' '}
            goes deeper into the interpolation math.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Where geocoding works well, and where it does not</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Coverage is uneven. North America, western Europe, Japan, South Korea, and Australia have near-complete address data. Major cities in Pakistan, India, the Middle East, and Africa are usually well covered for streets but inconsistent for individual buildings. Rural areas anywhere in the world tend to fall back to whichever village or district the coordinate is in.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            When a lookup fails, adding context usually fixes it. &ldquo;Main Street&rdquo; on its own resolves to nothing useful. &ldquo;Main Street, Springfield, Illinois&rdquo; works fine. The same logic applies to landmarks — adding the city and country disambiguates the dozens of &ldquo;Central Park&rdquo;s out there.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Rate limits and fair use</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The free Nominatim endpoint asks users to keep traffic to about one request per second per IP. That is fine for a manual page like this one. If you need to geocode thousands of addresses at once, either self-host Nominatim — the data is free to download — or use a paid commercial geocoder. Hammering the free endpoint will get your IP temporarily blocked.
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
          <h2 className="font-display text-2xl font-bold">Related tools and guides</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
            {[
              { href: '/my-current-location', t: 'My Current Location', d: 'Your address right now, one tap' },
              { href: '/my-location', t: 'My Location', d: 'Live GPS coordinates' },
              { href: '/reverse-geocoding', t: 'Reverse Geocoding', d: 'The concept, explained' },
              { href: '/coordinates-converter', t: 'Coordinates Converter', d: 'DD ↔ DMS ↔ UTM' },
              { href: '/distance-calculator', t: 'Distance Calculator', d: 'Between two addresses' },
              { href: '/gps-coordinates-finder', t: 'GPS Coordinates Finder', d: 'Tool + complete guide' },
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
