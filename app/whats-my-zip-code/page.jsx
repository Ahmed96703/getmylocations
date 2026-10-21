import Link from 'next/link';
import { breadcrumbSchema } from '../components/breadcrumbSchema.js';
import Tool from './Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';
import AdSense from '../components/AdSense.jsx';
import Monetag from '../components/Monetag.jsx';
import NativeAd from '../components/NativeAd.jsx';
import { AUTHOR } from '../components/author.js';

export const metadata = {
  title: "What's My ZIP Code? Find Your ZIP, County & District",
  description:
    'Find the ZIP code where you are in one tap, plus your county, city, congressional district and school district from U.S. Census data. Free, no signup.',
  keywords: ["what's my zip code", 'what is my zip code', 'my zip code', 'zip code of my location', 'what county am i in', 'what congressional district am i in', 'zip code lookup'],
  alternates: { canonical: '/whats-my-zip-code' },
  openGraph: {
    title: "What's My ZIP Code? Find Your ZIP, County & District",
    description: 'Your ZIP code, county, city, and congressional district in one tap, from U.S. Census data. Free.',
    url: 'https://getmylocations.com/whats-my-zip-code',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "What's My ZIP Code? Find Your ZIP, County & District",
    description: 'Your ZIP code, county, city, and congressional district in one tap. Free.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: "What's My ZIP Code",
  description:
    'Free tool that finds the ZIP code of your current location, a typed address, or any point on a map, along with the county, city, U.S. House district, state legislative districts, and school district from the U.S. Census Bureau geocoder.',
  url: 'https://getmylocations.com/whats-my-zip-code',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'GetMyLocations' },
  author: AUTHOR,
};

const code = 'bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm';

const faqs = [
  {
    q: 'How do I find out what my ZIP code is?',
    a: 'Press "Find my ZIP code" and allow location access, and the tool shows the ZIP code for where you are along with your county and districts. If you are indoors and the result looks like a neighbor\'s, click your own building on the map or type your street address. Your ZIP code is also printed on any mail delivered to your address and on utility bills.',
  },
  {
    q: 'What county am I in?',
    a: 'The tool shows your county with every result. It comes from the U.S. Census Bureau, which keeps the official county boundaries. Keep in mind that ZIP codes and counties do not line up: one ZIP code can cover parts of two or more counties, so look up your address or location, not just your ZIP code, when the county matters.',
  },
  {
    q: 'What congressional district am I in?',
    a: 'Each result lists your U.S. House district, for example NY-12, and your state senate and state house districts, from the Census Bureau\'s current district boundaries. States with a single representative show "at large". Because districts follow census blocks rather than ZIP codes, use your exact address or location rather than a ZIP code for this.',
  },
  {
    q: 'Why does the Census ZIP area differ from my ZIP code?',
    a: 'The Census Bureau publishes ZIP Code Tabulation Areas, which approximate ZIP codes as areas on a map. ZIP codes themselves are delivery routes, and some belong to a single building or to P.O. boxes only, such as 20500 for the White House or 10118 for the Empire State Building. Those have no Census area of their own, so the surrounding one (20006 or 10001) is shown alongside.',
  },
  {
    q: 'Does it work outside the United States?',
    a: 'Outside the U.S. the tool shows the postcode and address recorded in OpenStreetMap. For the UK, our What\'s My Postcode tool uses the official postcode directory and adds the council, ward, and constituency.',
  },
];

export default function ZipCodePage() {
  const crumbs = breadcrumbSchema([{ name: "What's My ZIP Code", path: '/whats-my-zip-code' }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <AdSense />

      <Monetag />

      <main role="main" className="max-w-5xl mx-auto px-5 py-10">
        <nav aria-label="Breadcrumb" className="text-xs text-fg-subtle mb-3">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-fg-muted">What&rsquo;s My ZIP Code</li>
          </ol>
        </nav>

        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · United States</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            What&rsquo;s my ZIP code? <span className="text-accent">Plus your county and districts</span>
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Press one button to see the ZIP code for where you are, together with your county, city, U.S. House district, state legislative districts, and school district from the U.S. Census Bureau. You can also type an address or a ZIP code, or click any point on the map. Free, no signup.
          </p>
        </section>

        <Tool />
        <NativeAd />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">How the tool finds your ZIP code</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Your browser asks your device for its position, which on a phone usually comes from GPS and Wi-Fi and is accurate to a few meters outdoors. The tool then makes two lookups at once. OpenStreetMap&rsquo;s Nominatim service finds the nearest street address and the ZIP code recorded with it, which is the ZIP you would write on an envelope. The U.S. Census Bureau&rsquo;s geocoder reports which official areas the point falls in: the Census ZIP area, county, city or town, congressional and state legislative districts, and school district.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Only the coordinates are sent to those services, and nothing is stored by this site. If the Census service is slow or down, the county and state come from the FCC&rsquo;s Area API instead. See the{' '}
            <Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link> for details.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How ZIP codes work</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The Postal Service introduced ZIP codes, for Zone Improvement Plan, in 1963, and today there are about 42,000 of them. The five digits narrow down step by step:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tint/5 text-left text-fg-muted">
                  <th className="px-3 py-2 font-semibold">Digits</th>
                  <th className="px-3 py-2 font-semibold">Example (10118)</th>
                  <th className="px-3 py-2 font-semibold">What they identify</th>
                </tr>
              </thead>
              <tbody className="text-fg-muted">
                {[
                  ['First digit', '1', 'A group of states, from 0 in the Northeast to 9 on the West Coast, Alaska, and Hawaii. 1 covers New York, Pennsylvania, and Delaware.'],
                  ['First three', '101', 'The sectional center facility, the mail processing plant that serves the area.'],
                  ['All five', '10118', 'The delivery area: a post office\'s routes, a town, or, as here, a single building (the Empire State Building).'],
                  ['ZIP+4', '10118-####', 'Four more digits for a block, one side of a street, a floor, or a large mail recipient.'],
                ].map(([p, e, d]) => (
                  <tr key={p} className="border-t border-line-subtle">
                    <td className="px-3 py-2 text-fg">{p}</td>
                    <td className="px-3 py-2 font-mono text-xs text-fg">{e}</td>
                    <td className="px-3 py-2">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The key point is that a ZIP code is a set of mail delivery routes, not an area with an official boundary. That is why it does not tell you your county or district on its own.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">ZIP code or Census ZIP area?</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Because ZIP codes are routes, the Census Bureau draws its own approximation of them as areas, called ZIP Code Tabulation Areas (ZCTAs), built from census blocks. There were 33,791 ZCTAs in the 2020 Census, against roughly 42,000 ZIP codes. The missing ones are mostly ZIP codes for P.O. boxes only and for single buildings or organizations, which have no area of their own.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The tool shows both. At the White House, the mailing ZIP is <code className={code}>20500</code>, but the Census area is <code className={code}>20006</code>. At the Empire State Building, the mailing ZIP is <code className={code}>10118</code> and the Census area <code className={code}>10001</code>. On an ordinary street the two are usually the same. When they differ, use the mailing ZIP for post and forms, and the Census area only for statistics.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Why a ZIP code alone cannot tell you your county or district</h2>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside leading-relaxed">
            <li><strong className="text-fg">ZIP codes cross county lines.</strong> Many rural ZIP codes, and plenty of suburban ones, cover parts of two or more counties. Property tax, voting, jury service, and court cases all follow the county, so use the exact location.</li>
            <li><strong className="text-fg">Districts are drawn from census blocks.</strong> Congressional, state senate, and state house districts follow census blocks, which split ZIP codes freely. Two houses with the same ZIP can be in different districts.</li>
            <li><strong className="text-fg">Cities are not ZIP codes either.</strong> The place name in a mailing address is the post office&rsquo;s, which can differ from the town you actually live in. The tool shows the incorporated city or town from the Census Bureau, or the township or census subdivision where there is none.</li>
          </ul>
          <p className="mt-3 text-fg-muted leading-relaxed">
            That is why the tool looks up your location rather than your ZIP code for these. When you type a ZIP code, the county and districts shown are for its center, and the result says so.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">When the result might not be yours</h2>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside leading-relaxed">
            <li><strong className="text-fg">Rough location fix.</strong> Indoors, or on a laptop without GPS, your position can be 50 m or more out, enough to land on the next street or across a boundary. The tool warns you when your device reports low accuracy.</li>
            <li><strong className="text-fg">You live near a boundary.</strong> ZIP, county, and district lines often run down the middle of a road. Click your own building on the map to be sure.</li>
            <li><strong className="text-fg">The map has no address for your building.</strong> OpenStreetMap is edited by volunteers, and some new or rural addresses are missing. The tool then falls back to the Census ZIP area and says so.</li>
          </ul>
          <p className="mt-3 text-fg-muted leading-relaxed">
            For anything official, such as voter registration, confirm with the source: the USPS ZIP code lookup for mail, and your state or county election office for districts.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="glass rounded-xl p-4">
                <summary className="font-semibold cursor-pointer text-fg">{f.q}</summary>
                <p className="mt-2 text-fg-muted leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Sources</h2>
          <ul className="mt-3 space-y-1.5 text-fg-muted list-disc list-inside leading-relaxed text-sm">
            <li>County, city, districts, and Census ZIP areas: <a href="https://geocoding.geo.census.gov/geocoder/" target="_blank" rel="noopener" className="text-accent hover:underline">U.S. Census Bureau Geocoder</a> (current boundaries).</li>
            <li>County and state backup: <a href="https://geo.fcc.gov/api/census/" target="_blank" rel="noopener" className="text-accent hover:underline">FCC Area API</a>.</li>
            <li>Mailing ZIP codes and addresses: <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener" className="text-accent hover:underline">OpenStreetMap contributors</a>, via the Nominatim geocoder.</li>
            <li>Number of ZIP codes: <a href="https://facts.usps.com/42000-zip-codes/" target="_blank" rel="noopener" className="text-accent hover:underline">USPS Postal Facts</a>. Number of ZCTAs: 2020 Census TIGER/Line files.</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Related tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[
              { href: '/my-location', t: 'My Location', d: 'Your coordinates and address' },
              { href: '/address-finder', t: 'Address Finder', d: 'Address ↔ coordinates' },
              { href: '/satellite', t: 'Satellite View', d: 'See the address from above' },
              { href: '/whats-my-postcode', t: "What's My Postcode", d: 'For the UK and Europe' },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="glass rounded-2xl p-4 hover:ring-accent/40 ring-1 ring-line transition no-underline">
                <h3 className="font-display text-base font-bold text-fg hover:text-accent transition">{t.t}</h3>
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
