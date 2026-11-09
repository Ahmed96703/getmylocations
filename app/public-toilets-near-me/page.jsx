import Link from '@/app/components/Link.jsx';
import { breadcrumbSchema } from '../components/breadcrumbSchema.js';
import Tool from './Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';
import AdSense from '../components/AdSense.jsx';
import { AUTHOR } from '../components/author.js';
import SideAd from '../components/SideAd.jsx';

export const metadata = {
  title: 'Public Toilets Near Me: Free & Accessible Toilets Map',
  description:
    'Find the nearest public toilets from your location, with distance, free or paid, wheelchair access, baby changing and opening hours. Free map, works across Europe.',
  keywords: ['public toilets near me', 'toilets near me', 'nearest toilet', 'free toilets near me', 'accessible toilets near me', 'public restroom near me', 'wc near me'],
  alternates: { canonical: '/public-toilets-near-me' },
  openGraph: {
    title: 'Public Toilets Near Me: Free & Accessible Toilets Map',
    description: 'The nearest public toilets from your location: free or paid, wheelchair access, baby changing and hours.',
    url: 'https://getmylocations.com/public-toilets-near-me',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Public Toilets Near Me: Free & Accessible Toilets Map',
    description: 'The nearest public toilets from your location, free or paid, with accessibility.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Public Toilets Near Me',
  description:
    'Free map tool that lists the public toilets within 2 km of your location or any place, from OpenStreetMap, with distance, walking time, whether they are free, wheelchair access, baby changing, opening hours as mapped, and directions.',
  url: 'https://getmylocations.com/public-toilets-near-me',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'GetMyLocations' },
  author: AUTHOR,
};

const link = 'text-accent hover:underline';
const P = 'mt-3 text-fg-muted leading-relaxed';

const faqs = [
  {
    q: 'Are the toilets on the map free?',
    a: 'Those marked "Free" are recorded as free on OpenStreetMap and those marked "Paid" as charging, with the price where a volunteer noted it. Many have no label either way. Tick "Free only" to hide everything not marked free, which also hides the unlabelled ones.',
  },
  {
    q: 'Does it show toilets in cafés and shops?',
    a: 'Only where they are mapped as toilets open to the public, or marked "Customers only". Ordinary café and restaurant toilets are not usually mapped. Toilets that are private, or marked as not open to the public, are left out.',
  },
  {
    q: 'How do I find a wheelchair-accessible toilet?',
    a: 'Tick "Wheelchair accessible" to show only toilets recorded as fully accessible. "Limited wheelchair access" usually means a step or a narrow door. In the UK many accessible toilets are locked with a RADAR key from the National Key Scheme; Changing Places toilets, with a hoist and adult-sized changing bench, are listed by the Changing Places consortium.',
  },
  {
    q: 'Why is a toilet I know missing, or closed?',
    a: 'It may not be on OpenStreetMap yet, or it closed after it was mapped. Our copy is up to a week old. The "Details or fix" link under each result opens it on openstreetmap.org, where anyone can add a toilet or mark one closed.',
  },
  {
    q: 'Is my location stored?',
    a: 'No. Your browser rounds your position to about 1 km before it asks our server for the toilets in that area, and the distance to each one is worked out on your device. Nothing is saved by this site.',
  },
];

export default function PublicToiletsNearMePage() {
  const crumbs = breadcrumbSchema([{ name: 'Public Toilets Near Me', path: '/public-toilets-near-me' }]);
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
            <li className="text-fg-muted">Public Toilets Near Me</li>
          </ol>
        </nav>

        <section className="mb-6">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · OpenStreetMap data</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Public toilets near me: <span className="text-accent">the nearest toilet, free or paid</span>
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            One tap shows the <strong>public toilets within 2 km</strong> of you, nearest first, with the walking time and whether each one is <strong>free</strong>, <strong>wheelchair accessible</strong> or has <strong>baby changing</strong>. Works anywhere, with the best coverage in European cities. Free, no signup.
          </p>
        </section>

        <Tool />

        <article>
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold">How to find the nearest public toilet</h2>
            <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside leading-relaxed">
              <li><strong className="text-fg">Press &ldquo;Toilets near me&rdquo;</strong> and allow location access, or type a street, station or square. You can also click the map.</li>
              <li><strong className="text-fg">Narrow it down</strong> with the boxes: free only, wheelchair accessible, or baby changing.</li>
              <li><strong className="text-fg">Read the labels and hours.</strong> Each result says how far it is and how long the walk takes, plus the opening hours where they are mapped.</li>
              <li><strong className="text-fg">Press Directions</strong> to open walking directions in Google Maps.</li>
            </ol>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">Free public toilets in Europe: where to look</h2>
            <p className={P}>
              Free street toilets vary a lot from city to city. Paris has hundreds of free self-cleaning <em>sanisettes</em> on its pavements, while toilets at railway stations in Germany, Switzerland and much of Italy usually charge a small fee. When the map is empty nearby, these places almost always have one:
            </p>
            <ul className="mt-3 space-y-1.5 text-fg-muted list-disc list-inside leading-relaxed">
              <li><strong className="text-fg">Large stations and airports,</strong> often paid in mainland Europe; in the UK, toilets at the big stations Network Rail runs are free.</li>
              <li><strong className="text-fg">Shopping centres, department stores and big supermarkets,</strong> usually free.</li>
              <li><strong className="text-fg">Libraries, museums and town halls</strong> during opening hours.</li>
              <li><strong className="text-fg">Cafés and fast-food restaurants,</strong> many of which expect you to buy something; some print a code on the receipt.</li>
            </ul>
            <p className={P}>
              Some German towns run the <em>Nette Toilette</em> scheme, in which cafés and shops let anyone use their toilet for free; look for the red-and-white smiley sticker by the door.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">Accessible toilets and baby changing</h2>
            <p className={P}>
              Tick <strong className="text-fg">Wheelchair accessible</strong> to see only toilets recorded as step-free with room for a wheelchair, and <strong className="text-fg">Baby changing</strong> for those with a changing table. In the UK many accessible toilets are locked to keep them clean and available, and open with a RADAR key from the National Key Scheme, sold by Disability Rights UK and many councils. For people who need a hoist and an adult changing bench, Changing Places toilets are listed on the Changing Places website.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">Where the data comes from</h2>
            <p className={P}>
              The toilets come from{' '}
              <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener" className={link}>OpenStreetMap</a>, the free map built by volunteers, read through the QLever search engine of the University of Freiburg, with the Overpass API as a backup. Toilets that are private, or marked as closed to the public, are left out. Our server keeps each area&rsquo;s answer for up to a week. If a toilet is missing or has closed, the &ldquo;Details or fix&rdquo; link opens it on OpenStreetMap, where anyone can update it for the next person.
            </p>
          </section>
        </article>

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

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Related tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[
              { href: '/pharmacy-near-me', t: 'Pharmacy Near Me', d: 'Nearest pharmacy, hospital and defibrillator' },
              { href: '/my-location', t: 'My Location', d: 'Where you are, with the street address' },
              { href: '/street-view', t: 'Street View', d: 'See the entrance before you walk there' },
              { href: '/maps', t: 'Interactive Maps', d: 'Explore the area around you' },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="glass rounded-2xl p-4 hover:ring-accent/40 ring-1 ring-line transition no-underline">
                <h3 className="font-display text-base font-bold text-fg hover:text-accent transition">{t.t}</h3>
                <p className="text-xs text-fg-subtle mt-1">{t.d}</p>
              </Link>
            ))}
          </div>
        </section>
        <SideAd />
        <AuthorBio />
      </main>
    </>
  );
}
