import Link from 'next/link';
import Tool from './Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';
import AdSense from '../components/AdSense.jsx';

export const metadata = {
  title: 'Address Finder — Convert Address to GPS Coordinates',
  description:
    'Convert any address to GPS coordinates or coordinates to an address. See every match, how precise it is, and how far it is from your point. Free.',
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
    'Free browser-based geocoding tool using OpenStreetMap Nominatim. Converts addresses and place names into GPS coordinates (decimal degrees and DMS), lists up to five matches, labels how precise each match is, and reverses coordinates in any format into the nearest address with its distance from the point entered.',
  url: 'https://getmylocations.com/address-finder',
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
    { '@type': 'ListItem', position: 2, name: 'Address Finder', item: 'https://getmylocations.com/address-finder' },
  ],
};

const faqs = [
  {
    q: 'How do I convert a street address to GPS coordinates?',
    a: 'Type the address into the Address to Coordinates box above and tap Find. The page sends it to OpenStreetMap\'s Nominatim geocoder and shows up to five matching places with their latitude and longitude in decimal degrees and DMS, and a label saying whether each match is a building, a street, or only a town. For obscure addresses, adding the city and country helps a lot: "Main Street" on its own is ambiguous, but "Main Street, Springfield, Illinois" is not.',
  },
  {
    q: 'How do I find the address of a GPS coordinate?',
    a: 'Paste the coordinates into the Coordinates to Address box (latitude first) and tap Find. Decimal degrees, DMS, DDM, UTM, and Google Maps links all work. The tool returns the nearest mapped address, says what kind of object it matched, and shows how far that object is from your point. Outdoor city coordinates usually resolve to a building or street; rural coordinates often resolve only to a village or district, sometimes many kilometers away.',
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
    a: 'Three common causes. (1) The address is ambiguous — "Central Park" alone matches dozens of places worldwide, so add a city. (2) The coverage is thin — rural areas in many countries are mapped at the village level rather than the street level. (3) The free Nominatim service allows about one request per second, so the tool spaces requests out automatically; if your network has made many requests recently it may refuse for a while. Slow down, add geographic context, try again.',
  },
  {
    q: 'Is this address finder accurate enough for delivery?',
    a: 'For most modern North-American and European addresses, yes. For dense city centers in Asia and South America, it lands on the right street most of the time but may miss the exact building. For rural addresses or new developments, it often resolves only to the nearest road. If you are sending a courier, supplement the geocoded coordinate with a landmark or photo — the coordinate gets them within a few buildings; the landmark closes the gap.',
  },
  {
    q: 'Why did I get several results for one address?',
    a: 'Many place names exist more than once. "Springfield" matches dozens of towns in the United States alone, and "Eiffel Tower" matches the Paris landmark and a mountain peak in Canada. The tool lists up to five matches with their full names and match type so you can pick the right one; adding a city, state, or country usually narrows it to one.',
  },
  {
    q: 'Why is the address for my coordinates a nearby shop or street?',
    a: 'Reverse geocoding returns the nearest object on the map that has an address, which might be a shop, a road, a park, or even a public toilet, not necessarily the building you are standing in. The tool shows how far that object is from your point: a few meters means it is effectively your location; a hundred meters or more means treat it as the general area.',
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

// Real lookups against OpenStreetMap Nominatim, run on 5 October 2026.
// Results change as the map is edited, so these are dated rather than
// presented as fixed answers.
const examples = [
  { input: 'Eiffel Tower', resolved: '48.858260, 2.294501 · Eiffel Tower, 5 Avenue Anatole France, Paris', match: 'Building or point of interest (also matched a mountain peak in Alberta, Canada)' },
  { input: '1600 Pennsylvania Ave NW, Washington, DC', resolved: '38.897639, -77.036552 · White House, 1600 Pennsylvania Avenue NW', match: 'Building or point of interest' },
  { input: 'Badshahi Mosque, Lahore', resolved: '31.588126, 74.309353 · Badshahi Mosque, Fort Road, Walled City of Lahore', match: 'Building or point of interest' },
  { input: 'Springfield', resolved: '5 matches: Illinois, Massachusetts, Missouri, Ohio, Oregon', match: 'Town or city' },
  { input: '48.85842, 2.2945 (reverse)', resolved: 'Avenue Gustave Eiffel, Paris, 2 m away', match: 'Street (not the tower itself)' },
  { input: '-33.856785, 151.21529 (reverse)', resolved: '2 Macquarie Street, Sydney, 36 m away (a public toilet near the Opera House)', match: 'Building or point of interest' },
  { input: '27, 65 (reverse)', resolved: 'Gichak Tehsil, Panjgur District, Balochistan, Pakistan, 30 km away', match: 'Town or city' },
];

export default function AddressFinderPage() {
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
            <li className="text-fg-muted">Address Finder</li>
          </ol>
        </nav>

        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · Two-way Geocoding</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Address finder — <span className="text-accent">address ↔ GPS coordinates</span>
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Type any address, landmark, or place name and get its GPS coordinates, with every matching place listed and a label saying how precise the match is. Or paste coordinates in any format and get the nearest address, plus how far that address is from your point. Powered by OpenStreetMap Nominatim. Free, no signup.
          </p>
        </section>

        <Tool />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">What this tool does</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The page does two related jobs. Type an address or a landmark name, such as &ldquo;Eiffel Tower&rdquo;, &ldquo;1600 Pennsylvania Ave&rdquo;, or &ldquo;Badshahi Mosque, Lahore&rdquo;, and it lists up to five matching places with their latitude and longitude in decimal degrees and DMS. Paste coordinates the other way, in decimal degrees, DMS, DDM, UTM, or as a Google Maps link, and it returns the nearest address. Every result says what kind of thing was matched, and reverse lookups also show how far the matched object is from your point. Both directions use OpenStreetMap&rsquo;s Nominatim service, which is free for light use and covers most of the world.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            If you only need <em>your own</em> current address rather than someone else&apos;s, the{' '}
            <Link href="/my-location" className="text-accent hover:underline">My Current Location tool</Link>{' '}
            is more direct — it reads your GPS, reverse-geocodes it, and shows the street/city in one tap. To see a result in DDM or UTM as well, the{' '}
            <Link href="/coordinates-converter" className="text-accent hover:underline">Coordinates Converter</Link>{' '}
            shows every format. For the conceptual deep-dive on the coordinates-to-address direction, our{' '}
            <Link href="/reverse-geocoding" className="text-accent hover:underline">reverse geocoding guide</Link>{' '}
            walks through how the algorithm actually picks the nearest address.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How precise is each address to coordinates match?</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            A geocoder always returns a coordinate, even when it only recognised the town. The <em>Matched to</em> line in the tool tells you which kind of thing was found, using the match type and rank that OpenStreetMap&rsquo;s geocoder returns with every result:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
            <table className="w-full text-sm text-left">
              <thead><tr className="bg-tint/5 text-fg-muted"><th className="px-3 py-2 font-semibold">Matched to</th><th className="px-3 py-2 font-semibold">Where the coordinate points</th></tr></thead>
              <tbody className="text-fg-muted">
                <tr className="border-t border-line-subtle"><td className="px-3 py-2 text-fg">Building or point of interest</td><td className="px-3 py-2">The building, entrance, or object itself; usually within a few meters</td></tr>
                <tr className="border-t border-line-subtle"><td className="px-3 py-2 text-fg">Street</td><td className="px-3 py-2">Somewhere along the street, often tens to hundreds of meters from a particular house</td></tr>
                <tr className="border-t border-line-subtle"><td className="px-3 py-2 text-fg">Named feature (park, lake, peak)</td><td className="px-3 py-2">The middle of the feature, which can be large</td></tr>
                <tr className="border-t border-line-subtle"><td className="px-3 py-2 text-fg">Neighbourhood or locality</td><td className="px-3 py-2">Roughly a few hundred meters to a kilometer off</td></tr>
                <tr className="border-t border-line-subtle"><td className="px-3 py-2 text-fg">Town or city</td><td className="px-3 py-2">The town or city center, often several kilometers off</td></tr>
                <tr className="border-t border-line-subtle"><td className="px-3 py-2 text-fg">Postcode, region, or country</td><td className="px-3 py-2">The middle of that whole area; only useful as a rough location</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-fg-muted leading-relaxed">
            If you searched for a full street address and the match is only &ldquo;Street&rdquo; or &ldquo;Town or city&rdquo;, the house is not in the map data yet; don&rsquo;t hand that coordinate to a courier as if it were exact.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Worked examples — what input gives what output</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Real lookups run on 5 October 2026. OpenStreetMap is edited constantly, so results can change over time; the match type and distance tell you how much to trust whatever comes back.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tint/5 text-left text-fg-muted">
                  <th className="px-3 py-2 font-semibold">You type</th>
                  <th className="px-3 py-2 font-semibold">Tool returns</th>
                  <th className="px-3 py-2 font-semibold">Matched to</th>
                </tr>
              </thead>
              <tbody>
                {examples.map((row) => (
                  <tr key={row.input} className="border-t border-line-subtle">
                    <td className="px-3 py-2 font-mono text-xs text-fg">{row.input}</td>
                    <td className="px-3 py-2 text-xs text-fg-muted">{row.resolved}</td>
                    <td className="px-3 py-2 text-xs text-fg-muted">{row.match}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">When there&rsquo;s more than one match</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Plenty of names exist many times over. &ldquo;Springfield&rdquo; returns five US cities before anything else, and &ldquo;Eiffel Tower&rdquo; returns both the Paris landmark and a mountain peak in Alberta. Instead of silently picking the first one, the tool lists up to five matches with their full names and match types; click one to see its coordinates and move the map. If none of them is right, add a city, state, or country and search again.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Why the nearest address can be the wrong building</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Reverse geocoding finds the nearest object on the map that has an address or a name, and that is not always the building at your point. The Eiffel Tower&rsquo;s own coordinates return Avenue Gustave Eiffel, the street beside it. The Sydney Opera House&rsquo;s coordinates currently return a public toilet on Macquarie Street, 36 m away. In rural Balochistan, a point in open country returns the name of the district, 30 km away.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            That is why the tool shows the distance between your point and the matched object, and draws a dashed line between them on the map. A few meters means the address is effectively your location; anything over about a hundred meters means it only describes the area. For how reverse geocoding chooses that nearest object, see our 
            <Link href="/reverse-geocoding" className="text-accent hover:underline">reverse geocoding guide</Link>.
          </p>
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
            OpenStreetMap runs the Nominatim service for free, and its usage policy allows at most one request per second. The tool enforces that itself: if you click again within a second, it waits briefly and tells you why. That is plenty for looking up addresses by hand. If you need to geocode thousands of addresses, self-host Nominatim (the data is free to download) or use a commercial geocoder instead; bulk use of the free service gets blocked. Results and map data are &copy; OpenStreetMap contributors.
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
              { href: '/my-location', t: 'My Location', d: 'Your GPS coordinates + address, one tap' },
              { href: '/reverse-geocoding', t: 'Reverse Geocoding', d: 'The concept, explained' },
              { href: '/coordinates-converter', t: 'Coordinates Converter', d: 'DD ↔ DMS ↔ UTM' },
              { href: '/distance-calculator', t: 'Distance Calculator', d: 'Between two addresses' },
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
