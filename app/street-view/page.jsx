import Link from 'next/link';
import { breadcrumbSchema } from '../components/breadcrumbSchema.js';
import Tool from './Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';
import AdSense from '../components/AdSense.jsx';
import { AUTHOR } from '../components/author.js';

export const metadata = {
  title: 'Street View — See Any Address in Google Street View',
  description: 'Find any address or GPS coordinate and open it in Google Street View facing the direction you choose. Accepts any coordinate format. Free.',
  keywords: ['street view', 'google street view', 'street view by address', 'virtual tour'],
  alternates: { canonical: '/street-view' },
  openGraph: {
    title: 'Street View — See Any Address in Google Street View',
    description:
      'Enter any address or GPS coordinates and see the location in Google Street View.',
    url: 'https://getmylocations.com/street-view',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Street View — See Any Address in Google Street View',
    description:
      'Enter any address or GPS coordinates and see the location in Google Street View.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Street View Tool',
  description:
    'Free tool that finds any address, landmark, or GPS coordinate (any format), pins it on a map, and opens the nearest Google Street View panorama facing the chosen direction.',
  url: 'https://getmylocations.com/street-view',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'GetMyLocations' },
  author: AUTHOR,
};


const faqs = [
  {
    q: 'Is this the real Google Street View?',
    a: 'Yes. The panorama comes straight from Google: the imagery, the arrows for moving along the street, and the capture date are Google\'s own. This page finds the exact spot first, pins it, and then opens Google Street View there, facing the direction you picked. When the embedded viewer is enabled on this page the panorama appears below the search box; otherwise the Open Street View button opens it in Google Maps or the Google Maps app.',
  },
  {
    q: 'Why does Street View open somewhere slightly different from my pin?',
    a: 'Street View panoramas only exist where Google has photographed, mostly along public roads. Google jumps to the panorama nearest your point, which is usually the road in front of a building rather than its exact center. If there is no imagery nearby at all, Google Maps shows its normal map instead. Try a point on the nearest main road, or check the place from above with satellite view on our interactive map.',
  },
  {
    q: 'How do I see older imagery of the same address?',
    a: 'Open the panorama in the full Google Maps site on a computer and look for the date and the "See more dates" option in the panel at the top left. It lets you scroll back through earlier captures of the same spot. History goes back to 2007 in the first cities Google photographed and is much shorter elsewhere.',
  },
  {
    q: 'Can I use Street View to check a property before renting or buying?',
    a: 'It is a useful first pass: you can see the street, the parking situation, and the condition of neighbouring buildings. Check the capture date first, though. A panorama from four years ago tells you nothing about construction that started last spring. Pair it with current satellite imagery on the maps tool.',
  },
  {
    q: 'Does this page track where I search?',
    a: 'This site does not log or store your searches. If you type an address, it is sent to OpenStreetMap\'s free geocoder to turn it into coordinates; typed coordinates are not sent anywhere until you open Street View. The coordinates are then shared with Google when it shows the panorama. Both services apply their own privacy terms, listed in our privacy policy.',
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

export default function StreetViewPage() {
  const crumbs = breadcrumbSchema([{ name: 'Street View', path: '/street-view' }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AdSense />
      <main role="main" className="max-w-5xl mx-auto px-5 py-10">
        <nav aria-label="Breadcrumb" className="text-xs text-fg-subtle mb-3">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-fg-muted">Street View</li>
          </ol>
        </nav>

        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · Powered by Google Street View</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Street <span className="text-accent">View</span> — see any address in Google Street View
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Type any address, landmark, or GPS coordinates, pick the direction you want to face, and open the spot in <strong className="text-fg">Google Street View</strong>. The tool finds the exact point first, so Street View lands on the right street. No signup, no app to install.
          </p>
        </section>

        <Tool />

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How to see any address in Street View</h2>
          <ol className="mt-3 space-y-1.5 text-fg-muted list-decimal list-inside leading-relaxed">
            <li>Type an address or landmark, or paste coordinates in any format (decimal degrees, DMS, UTM, or a Google Maps link), and press <em>Find</em>. Or tap one of the example places.</li>
            <li>Check the pin on the map and the place name above it. If the name is wrong, add the city and country and search again.</li>
            <li>Pick the direction to face: N, E, S, or W.</li>
            <li>Open Street View. Google shows the panorama nearest your pin, and you can turn, zoom, and move along the street from there.</li>
          </ol>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Typed addresses are turned into coordinates with OpenStreetMap&rsquo;s free geocoder, which allows one request per second, so a lookup may pause for a moment. Coordinates skip that step entirely.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How Street View imagery is captured</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Most of the imagery comes from cars driving the public road network with a
            rooftop camera rig that shoots overlapping photos, stitched into 360-degree
            panoramas a few meters apart. By Street View&rsquo;s 15th anniversary in 2022,
            Google said it had published more than 220 billion images from over 10 million
            miles of travel in 100 countries and territories, starting with five US cities
            in 2007. For
            places cars cannot reach — hiking trails, narrow alleys, museum
            interiors — the same panoramic kit is mounted on a backpack, a
            snowmobile, a small boat, or in the case of some museums, a trolley.
            All of it goes through the same stitching process before it appears in
            Street View.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Coverage and limitations</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Coverage is uneven and that is a feature of the service, not a bug.
            Most public roads in North America, western Europe, Japan, South Korea,
            and Australia have current imagery. Many cities in Pakistan, India,
            Brazil, and Indonesia have partial coverage — major streets are
            mapped, side streets are not. A few countries (parts of Germany, until
            recently, plus most of mainland China, Iran, and North Korea) have
            very limited Street View for legal or political reasons. When there is no
            panorama near your pin, Google Maps shows its normal map instead, which is
            the quickest sign that a place has no coverage.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How old is what you are looking at?</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Every Street View image is dated. In Google Maps the capture month and year
            appear in the panel at the top left of the panorama; check it before drawing
            conclusions, because busy city centers are re-photographed far more often than
            small towns and rural roads, where imagery can be many years old. On a computer,
            the same panel has a &ldquo;See more dates&rdquo; option that lets you scroll
            back through older captures of the same spot.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Privacy and what you can ask Google to blur</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Faces and licence plates are automatically blurred before any panorama
            is published. The blur is applied at upload time and is not reversible
            from the viewer side. If you find yourself or your home in the
            imagery and want it blurred, open the panorama in Google Maps and use
            &ldquo;Report a problem&rdquo; to request blurring of a face, a car, or a
            whole house. Google says blurring is permanent once applied.
          </p>
        </section>


        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Street view, satellite, or standard map &mdash; which one answers your question</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The three ways of looking at a place answer genuinely different questions, and picking the
            wrong one wastes time. A quick decision guide:
          </p>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
            <li>
              <strong>Street view</strong> answers &ldquo;what does this look like from the pavement?&rdquo;
              &mdash; house numbers, shopfronts, whether there is a step at the entrance, what the parking
              is like, whether the street feels busy. It is the only view that shows a building&rsquo;s face.
            </li>
            <li>
              <strong>Satellite imagery</strong> answers &ldquo;what is the shape and context of this place?&rdquo;
              &mdash; the footprint of a building, whether there is a garden or a pool, how far it sits from
              a main road, what the surrounding land is. Switch the layer toggle on the{' '}
              <Link href="/maps" className="text-accent hover:underline">interactive map</Link> to see it.
            </li>
            <li>
              <strong>A standard map</strong> answers &ldquo;what is this called and how do I get there?&rdquo;
              &mdash; street names, one-way arrows, the road network, nearby amenities. Best for planning
              rather than inspecting.
            </li>
          </ul>
          <p className="mt-3 text-fg-muted leading-relaxed">
            In practice most questions need two of the three. Checking out an unfamiliar address before a
            visit usually means one pass in street view for the frontage, one in satellite for the
            approach and parking, and then the{' '}
            <Link href="/driving-directions" className="text-accent hover:underline">Driving Directions</Link>{' '}
            tool to plan the actual route.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Searching by coordinates instead of an address</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The search box accepts a decimal-degree coordinate pair as readily as a street address &mdash;
            paste <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">48.858420, 2.294500</code> and the pin drops on the Eiffel Tower, ready to open in Street View.
            Degrees-minutes-seconds such as <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">48°51'30"N 2°17'40"E</code>, UTM, and Google Maps links work too. This is the reliable way to reach somewhere that has no
            postal address at all: a trailhead, a layby, a field entrance, a spot a friend sent you from
            their phone.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            To get a coordinate pair for where you are standing, use the{' '}
            <Link href="/my-location" className="text-accent hover:underline">My Location tool</Link>, which
            reads your GPS position and gives you a copyable &ldquo;lat, lon&rdquo; string, or simply tap
            <em> My location</em> in the tool above. To see a coordinate in every format, use the{' '}
            <Link href="/coordinates-converter" className="text-accent hover:underline">coordinates converter</Link>.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">When there&rsquo;s no Street View here</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            If Google Maps opens a normal map instead of a panorama, there is no imagery near your pin. Common reasons: the place is on a private road or estate, deep in a park, or in a country or region with little or no coverage. Try moving the pin to the nearest public road (get its coordinates from the{' '}
            <Link href="/address-finder" className="text-accent hover:underline">Address Finder</Link>), or look at the place from above in satellite view on the{' '}
            <Link href="/maps" className="text-accent hover:underline">interactive map</Link>.
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

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Try these next</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[{ href: '/my-location', t: 'My Location' }, { href: '/driving-directions', t: 'Driving Directions' }, { href: '/address-finder', t: 'Address Finder' }, { href: '/maps', t: 'Interactive Maps' }].map((t) => (
              <Link key={t.href} href={t.href} className="glass rounded-2xl p-4 hover:ring-accent/40 ring-1 ring-line transition no-underline">
                <h3 className="font-display text-base font-bold text-fg hover:text-accent transition">{t.t}</h3>
              </Link>
            ))}
          </div>
        </section>
        <AuthorBio />
      </main>
    </>
  );
}
