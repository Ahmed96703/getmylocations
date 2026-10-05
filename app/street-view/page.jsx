import Link from 'next/link';
import { breadcrumbSchema } from '../components/breadcrumbSchema.js';
import Tool from './Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';
import AdSense from '../components/AdSense.jsx';

export const metadata = {
  title: 'Street View — See Any Address in Google Street View',
  description: 'Free Street View tool. Enter any address or GPS coordinates and see the location in Google Street View. No signup, no API key.',
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
    'Enter any address, landmark, or GPS coordinates and instantly explore the location in Google Street View. Free, no signup, no app to install.',
  url: 'https://getmylocations.com/street-view',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'GetMyLocations' },
  author: { '@type': 'Person', name: 'Ahmed Anwar', url: 'https://getmylocations.com/about' },
};


const faqs = [
  {
    q: 'Is this the real Google Street View?',
    a: 'Yes. The panorama below is the official Google Street View embed, rendered inside this page. The imagery, the navigation arrows, and the capture date all come straight from Google. This page just gives you a faster way to jump to an address without opening the full Maps app.',
  },
  {
    q: 'Why does my address show a map instead of a panorama?',
    a: 'There is no Street View coverage at that point. The embed falls back to the standard map rather than showing an error. Try dragging to a nearby main road — coverage follows the public road network, so a house on a private lane often has no panorama while the road at the end of it does.',
  },
  {
    q: 'How do I see older imagery of the same address?',
    a: 'The embed shows only the current capture. To scroll through history, open the location in the full Google Maps site and use the time-slider in the top-left corner of the Street View panel. Coverage history typically goes back to 2007 in major cities and much less elsewhere.',
  },
  {
    q: 'Can I use Street View to check a property before renting or buying?',
    a: 'It is a useful first pass — you can see the street, the parking situation, and the general condition of neighbouring buildings. Check the capture date first, though. A panorama from four years ago tells you nothing about construction that started last spring. Pair it with current satellite imagery on the maps tool.',
  },
  {
    q: 'Does this page track where I search?',
    a: 'No. The address you type is passed to the Google Maps embed to render the panorama and is not logged or stored by this site. Google applies its own terms to the embed — see our privacy policy for the list of third parties involved.',
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
            Type any address, landmark, or GPS coordinate pair, and instantly walk down the street in <strong className="text-fg">Google Street View</strong>. No signup, no app to install.
          </p>
        </section>

        <Tool />

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How Street View imagery is captured</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Most of the imagery you see comes from cars driving the public road
            network with a rooftop rig of about nine cameras shooting overlapping
            panoramas every few meters. Google&rsquo;s fleet has covered roughly five
            million miles of public roads since the service launched in 2007. For
            places cars cannot reach — hiking trails, narrow alleys, museum
            interiors — the same panoramic kit is mounted on a backpack, a
            snowmobile, a small boat, or in the case of some museums, a trolley.
            All of it goes through the same stitching pipeline before it reaches
            the embed below.
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
            very limited Street View for legal or political reasons. When the
            embed below cannot find a panorama for an address, it quietly falls
            back to the normal map.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How old is what you are looking at?</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Every Street View image is dated. Look at the bottom-left corner of
            the embed once it loads — the capture month and year are shown there.
            Busy city centres get refreshed every two or three years; smaller
            towns might still be showing imagery from five years ago. For
            historical research this is occasionally useful: Street View has a
            time-slider feature on the full Google Maps site that lets you scroll
            back through older captures of the same address.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Privacy and what you can ask Google to blur</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Faces and licence plates are automatically blurred before any panorama
            is published. The blur is applied at upload time and is not reversible
            from the viewer side. If you find yourself or your home in the
            imagery and want it removed or further blurred, Google has a
            self-service report tool inside Maps — three dots, &ldquo;Report a
            problem&rdquo; — that handles requests for additional blurring within a
            few business days.
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
            paste <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">48.858420, 2.294500</code> and
            the panorama jumps to the Eiffel Tower. This is the reliable way to reach somewhere that has no
            postal address at all: a trailhead, a layby, a field entrance, a spot a friend sent you from
            their phone.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            To get a coordinate pair for where you are standing, use the{' '}
            <Link href="/my-location" className="text-accent hover:underline">My Location tool</Link>, which
            reads your GPS position and gives you a copyable &ldquo;lat, lon&rdquo; string. If you have a
            coordinate in degrees-minutes-seconds and need it in decimal form first, the{' '}
            <Link href="/coordinates-converter" className="text-accent hover:underline">coordinates converter</Link>{' '}
            handles the translation.
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
