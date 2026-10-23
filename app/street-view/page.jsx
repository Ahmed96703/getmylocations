import Link from 'next/link';
import { breadcrumbSchema } from '../components/breadcrumbSchema.js';
import Tool from './Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';
import AdSense from '../components/AdSense.jsx';
import Monetag from '../components/Monetag.jsx';
import NativeAd from '../components/NativeAd.jsx';
import SideAd from '../components/SideAd.jsx';
import { AUTHOR } from '../components/author.js';

export const metadata = {
  title: 'Google Maps Street View by Address — Free & Instant',
  description: 'Type any address or coordinates and open Google Maps Street View there in one click, facing the way you choose. Free, no signup, works on any device.',
  keywords: [
    'street view', 'google street view', 'google maps street view', 'street view by address', 'google street view address search', 'free street view', 'virtual tour',
    'google maps street view location', 'instant street view', 'google street views by address', 'google maps street view free', 'google street view locations',
    'instant google street view', 'google street view by address', 'google street view lookup', 'google street view address lookup', 'street view of address',
    'google street views of houses by address', 'google maps street view live', 'free live street view', 'google earth street view free', 'free street view maps online',
    'look around street view', 'street view other than google', 'mapillary', 'google maps with street view', 'street viewer',
  ],
  alternates: { canonical: '/street-view' },
  openGraph: {
    title: 'Google Maps Street View by Address — Free & Instant',
    description:
      'Enter any address or GPS coordinates and see the location in Google Street View.',
    url: 'https://getmylocations.com/street-view',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Maps Street View by Address — Free & Instant',
    description:
      'Enter any address or GPS coordinates and see the location in Google Street View.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Google Maps Street View by Address',
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
    q: 'Is Google Maps Street View free?',
    a: 'Yes. Google Street View is free to look at, and so is this page: type an address, open the panorama, and walk along the street with no account, no app and no limit.',
  },
  {
    q: 'Is there a live street view?',
    a: 'No. Google Maps Street View, Apple Look Around and every other street-level service show photos taken in the past, from weeks to many years ago. The capture date is shown in the panorama. For live pictures of a place you need a public webcam, not Street View.',
  },
  {
    q: 'What is instant street view?',
    a: 'It means going straight from an address to the street-level panorama without first searching around a map. This tool does that: it finds the address, pins it, and opens Google Street View there in one click, facing the direction you choose.',
  },
  {
    q: 'Is this the real Google Street View?',
    a: 'Yes. The panorama comes straight from Google: the imagery, the arrows for moving along the street, and the capture date are Google\'s own. This page finds the exact spot first, pins it, and then opens Google Street View there, facing the direction you picked. When the embedded viewer is enabled on this page the panorama appears below the search box; otherwise the Open Street View button opens it in Google Maps or the Google Maps app.',
  },
  {
    q: 'Why does Street View open somewhere slightly different from my pin?',
    a: 'Street View panoramas only exist where Google has photographed, mostly along public roads. Google jumps to the panorama nearest your point, which is usually the road in front of a building rather than its exact center. If there is no imagery nearby at all, Google Maps shows its normal map instead. Try a point on the nearest main road, or check the place from above with our satellite view tool.',
  },
  {
    q: 'How do I see older imagery of the same address?',
    a: 'Open the panorama in the full Google Maps site on a computer and look for the date and the "See more dates" option in the panel at the top left. It lets you scroll back through earlier captures of the same spot. History goes back to 2007 in the first cities Google photographed and is much shorter elsewhere.',
  },
  {
    q: 'Can I use Street View to check a property before renting or buying?',
    a: 'It is a useful first pass: you can see the street, the parking situation, and the condition of neighbouring buildings. Check the capture date first, though. A panorama from four years ago tells you nothing about construction that started last spring. Pair it with satellite imagery from the satellite view tool, which shows when its photo was taken.',
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
      <Monetag />
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
            Google Maps Street View
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Type any address, landmark, or GPS coordinates, pick the direction you want to face, and open the spot in <strong className="text-fg">Google Street View</strong>. It is an <strong className="text-fg">instant street view</strong> of any <strong className="text-fg">Google Maps Street View location</strong>: the tool finds the exact point first, so <strong className="text-fg">Street View</strong> lands on the right street. <strong className="text-fg">Google street views by address</strong> are <strong className="text-fg">free</strong>, with no signup and no app to install.
          </p>
        </section>

        <Tool />
        <NativeAd />
        <SideAd />

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Google street views by address, instant and free</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Most people open <strong className="text-fg">Google Maps Street View</strong> to see one particular house, shop or street. This page is built for that: a <strong className="text-fg">Google Street View address search</strong> that goes from the address you type to the panorama in front of it.
          </p>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside leading-relaxed">
            <li><strong className="text-fg">Street view of an address:</strong> type the house number, street and town, press Find, then Open Street View.</li>
            <li><strong className="text-fg">Google street views of houses by address:</strong> face the side of the road the house is on (N, E, S or W) so the panorama opens looking at it.</li>
            <li><strong className="text-fg">Google Street View lookup by coordinates:</strong> paste a GPS position or a Google Maps link for places with no postal address.</li>
            <li><strong className="text-fg">Google Maps Street View free on any device:</strong> it works in any browser on a phone, tablet or computer, and opens the Google Maps app if you have it.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How to see Google Street View by address</h2>
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
          <h2 className="font-display text-2xl font-bold">Google Street View locations and coverage</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            <strong className="text-fg">Google Street View locations</strong> are uneven, and that is a feature of the service, not a bug.
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
          <h2 className="font-display text-2xl font-bold">Street view other than Google</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Google has the widest coverage, but it is not the only <strong className="text-fg">street viewer</strong>. If Google has no imagery for a place, or only old imagery, one of these may do better:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tint/5 text-left text-fg-muted">
                  <th className="px-3 py-2 font-semibold">Service</th>
                  <th className="px-3 py-2 font-semibold">Who makes it</th>
                  <th className="px-3 py-2 font-semibold">Good to know</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Apple Look Around', 'Apple', 'Sharp, smooth imagery in Apple Maps, mostly in large cities in North America, Europe and Japan'],
                  ['Mapillary', 'Meta (crowdsourced)', 'Free street-level photos uploaded by volunteers, often covering paths and places Google has not driven'],
                  ['Bing Maps Streetside', 'Microsoft', 'Street-level imagery inside Bing Maps for parts of the US and Europe'],
                  ['Yandex Panoramas', 'Yandex', 'Strong coverage in Russia and neighbouring countries'],
                  ['Naver and Kakao Maps', 'Naver, Kakao', 'The most complete street-level imagery for South Korea'],
                ].map((r) => (
                  <tr key={r[0]} className="border-t border-line-subtle">
                    <td className="px-3 py-2 text-fg font-semibold">{r[0]}</td>
                    <td className="px-3 py-2 text-fg-muted">{r[1]}</td>
                    <td className="px-3 py-2 text-fg-muted">{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-fg-muted leading-relaxed">
            For a <strong className="text-fg">look around street view</strong> on an iPhone or Mac, open the same address in Apple Maps and tap the binoculars. For the top-down view of the same place, use our <Link href="/satellite" className="text-accent hover:underline">satellite view</Link>, which also tells you when the photo was taken.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How old is what you are looking at?</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Every Street View image is dated, and none of it is live: a <strong className="text-fg">free live street view</strong> does not exist. In Google Maps the capture month and year
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
              a main road, what the surrounding land is. The{' '}
              <Link href="/satellite" className="text-accent hover:underline">satellite view tool</Link> shows it, with the date the photo was taken.
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
            <Link href="/address-finder" className="text-accent hover:underline">Address Finder</Link>), or look at the place from above in{' '}
            <Link href="/satellite" className="text-accent hover:underline">satellite view</Link>.
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
