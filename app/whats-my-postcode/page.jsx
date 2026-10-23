import Link from 'next/link';
import { breadcrumbSchema } from '../components/breadcrumbSchema.js';
import Tool from './Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';
import AdSense from '../components/AdSense.jsx';
import NativeAd from '../components/NativeAd.jsx';
import SideAd from '../components/SideAd.jsx';
import { AUTHOR } from '../components/author.js';

export const metadata = {
  title: "What's My Postcode? Find Your Postcode From Your Location",
  description:
    'Find the postcode where you are in one tap, with your nearest address, council and ward. Official UK postcode data, plus postcodes across Europe. Free.',
  keywords: ["what's my postcode", 'what is my postcode', 'find my postcode', 'my postcode', 'postcode finder', 'postcode of my current location', 'postcode lookup'],
  alternates: { canonical: '/whats-my-postcode' },
  openGraph: {
    title: "What's My Postcode? Find Your Postcode From Your Location",
    description: 'Your postcode, nearest address, council and ward in one tap. Official UK postcode data. Free, no signup.',
    url: 'https://getmylocations.com/whats-my-postcode',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "What's My Postcode? Find Your Postcode From Your Location",
    description: 'Your postcode, nearest address, council and ward in one tap. Free, no signup.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: "What's My Postcode",
  description:
    'Free tool that finds the postcode of your current location, a typed address, or any point on a map. UK postcodes come from the Office for National Statistics Postcode Directory with council, ward and constituency; other countries use OpenStreetMap. Also checks typed UK postcodes and spots retired ones.',
  url: 'https://getmylocations.com/whats-my-postcode',
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
    q: 'How do I find out what my postcode is?',
    a: 'Press "Find my postcode" and allow location access. The tool reads your position from your device and looks up the postcode there. If you are indoors and the result looks like a neighbour\'s, click your own building on the map, or type your street address into the search box instead. Your postcode is also printed on any letter or parcel delivered to your address, on council tax bills, and on utility bills.',
  },
  {
    q: 'Is the postcode shown always correct?',
    a: 'In the UK the postcode list itself is official, but the tool has to pick the postcode nearest to your position, and postcode areas are irregular shapes, not circles. If you live near the edge of one, the nearest centre point can belong to the next street. Check the nearest address shown with the result; if it is not your building, click your building on the map.',
  },
  {
    q: 'Why does a website say my postcode is invalid?',
    a: 'The usual causes are a mistyped character (0 and O, or 1 and I), a missing or extra space, or a postcode that has been retired. Royal Mail retires and replaces postcodes when streets are redeveloped. Type the postcode into the search box: the tool tells you if it is current, retired (and in which year), or does not exist.',
  },
  {
    q: 'My home is a new build. Why does it have no postcode?',
    a: 'New streets are named and numbered by the local council first, and Royal Mail then allocates a postcode. Until that happens, the property will not appear in address lookups. Ask the developer or the council\'s street naming and numbering team for the official address and the date it was registered with Royal Mail.',
  },
  {
    q: 'Does this work outside the UK?',
    a: 'Yes. In the United States, use our What\'s My ZIP Code tool, which adds your county and districts. Elsewhere outside Great Britain and Northern Ireland the postcode comes from OpenStreetMap, which records postcodes for most of Europe, such as 10117 in central Berlin or 75007 around the Eiffel Tower. Coverage is good in cities and patchier in the countryside. Ireland\'s Eircodes are not in open data, so the tool links to the official Eircode finder there.',
  },
];

export default function PostcodePage() {
  const crumbs = breadcrumbSchema([{ name: "What's My Postcode", path: '/whats-my-postcode' }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <AdSense />


      <main role="main" className="max-w-5xl mx-auto px-5 py-10">
        <nav aria-label="Breadcrumb" className="text-xs text-fg-subtle mb-3">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-fg-muted">What&rsquo;s My Postcode</li>
          </ol>
        </nav>

        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · UK &amp; Europe</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            What&rsquo;s my postcode? <span className="text-accent">Find it from where you are</span>
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Press one button to see the <strong>postcode for your current location</strong>, with the <strong>nearest address, council, ward, and parliamentary constituency</strong>. UK postcodes come from the official Office for National Statistics directory; elsewhere in Europe the tool uses OpenStreetMap. You can also type an address, check a postcode someone gave you, or click any point on the map. Free, no signup.
          </p>
        </section>

        <Tool />
        <NativeAd />
        <SideAd />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">How the tool finds your postcode</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Your browser asks your device for its position, which on a phone usually comes from GPS and Wi-Fi and is accurate to a few meters outdoors. In Great Britain and Northern Ireland, the tool then asks <a href="https://postcodes.io" target="_blank" rel="noopener" className="text-accent hover:underline">postcodes.io</a>, a free service built on the Office for National Statistics Postcode Directory, for the postcode whose centre point is nearest to you. Every UK postcode has one representative point placed among its addresses. At the same time, OpenStreetMap&rsquo;s Nominatim service returns the nearest street address, so you can check the result against your own front door.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Outside the UK there is no equivalent open, official directory for most countries, so the postcode comes from the address OpenStreetMap holds for that spot. Either way, only the coordinates are sent to those two services for the lookup; nothing is stored by this site. See the{' '}
            <Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link> for details.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How a UK postcode is built</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Royal Mail&rsquo;s address file holds around 1.8 million postcodes. Each one covers about 15 addresses on average, and an ordinary postcode never covers more than 100 delivery points. Every postcode narrows down in four steps, which the tool shows under each result. Taking <code className={code}>SW1A 2AA</code>:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tint/5 text-left text-fg-muted">
                  <th className="px-3 py-2 font-semibold">Part</th>
                  <th className="px-3 py-2 font-semibold">Example</th>
                  <th className="px-3 py-2 font-semibold">What it identifies</th>
                </tr>
              </thead>
              <tbody className="text-fg-muted">
                {[
                  ['Area', 'SW', 'One or two letters for a large region, usually named after a main town or, in London, a compass direction (South Western).'],
                  ['District', 'SW1A', 'The whole first half, called the outward code, which takes mail to the right delivery office.'],
                  ['Sector', 'SW1A 2', 'The district plus the first digit of the second half: a few streets or a neighbourhood.'],
                  ['Unit', 'SW1A 2AA', 'The full postcode: one side of a street, a block of flats, or a single large organisation.'],
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
            The second half, the inward code, is always a digit followed by two letters, which is why a missing space rarely matters but a swapped letter does. Organisations that receive a lot of post can have a postcode of their own.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Why the postcode shown might not be yours</h2>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside leading-relaxed">
            <li><strong className="text-fg">You are near a postcode boundary.</strong> Postcode areas follow streets and buildings, not circles, so the nearest centre point can belong to the house opposite or the next road.</li>
            <li><strong className="text-fg">Your location fix is rough.</strong> Indoors, or on a laptop without GPS, your position can be 50 m or more out. The tool warns you when your device reports low accuracy.</li>
            <li><strong className="text-fg">You live in a large building or estate.</strong> A block of flats, a hospital, or a university campus can have several postcodes, one per entrance or department.</li>
            <li><strong className="text-fg">The property is new.</strong> Brand-new homes have no postcode until the council has named the street and Royal Mail has allocated one.</li>
          </ul>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The fix is the same each time: click your exact building on the map, or type your street address, and the tool looks up the postcode for that spot instead.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Check a postcode, including retired ones</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Type a full UK postcode, with or without the space, and the tool shows where it is and which council, ward, and constituency it belongs to. If a form has rejected a postcode you are sure is right, it may have been retired: Royal Mail withdraws postcodes when streets are rebuilt or renumbered. For example, <code className={code}>E1W 1UU</code> in east London was retired in 2015. The tool recognises retired postcodes and tells you the year, so you know to look up the one in use now.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Postcodes elsewhere in Europe</h2>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside leading-relaxed">
            <li><strong className="text-fg">Germany, France, Spain, Italy:</strong> five digits, for example <code className={code}>10117</code> for central Berlin or <code className={code}>75007</code> for the area around the Eiffel Tower. One code usually covers a whole district of a city or several villages, so it says much less about an exact address than a UK postcode does.</li>
            <li><strong className="text-fg">Netherlands:</strong> four digits and two letters (Dam Square in Amsterdam is <code className={code}>1012 NP</code>), precise to a street or part of one, much like a UK postcode.</li>
            <li><strong className="text-fg">Ireland:</strong> Eircodes, introduced in 2015, are unique to every address. They are not in open data, so for Ireland the tool shows the address and links to the official Eircode finder.</li>
          </ul>
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
            <li>UK postcode locations and administrative areas: <a href="https://www.ons.gov.uk/methodology/geography/geographicalproducts/postcodeproducts" target="_blank" rel="noopener" className="text-accent hover:underline">ONS Postcode Directory</a>, Office for National Statistics (Open Government Licence), served by <a href="https://postcodes.io" target="_blank" rel="noopener" className="text-accent hover:underline">postcodes.io</a>.</li>
            <li>Addresses and postcodes outside the UK: <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener" className="text-accent hover:underline">OpenStreetMap contributors</a>, via the Nominatim geocoder.</li>
            <li>Postcode counts and addresses per postcode: Royal Mail Postcode Address File figures.</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Related tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[
              { href: '/my-location', t: 'My Location', d: 'Your coordinates and address' },
              { href: '/address-finder', t: 'Address Finder', d: 'Address ↔ coordinates' },
              { href: '/satellite', t: 'Satellite View', d: 'See the address from above' },
              { href: '/whats-my-zip-code', t: "What's My ZIP Code", d: 'For the United States' },
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
