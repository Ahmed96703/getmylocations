import Link from 'next/link';
import HomeClient from './HomeClient.jsx';
import { HOME_FAQS } from './home-faqs.js';

// MIGRATION NOTE:
// The homepage uses Browser APIs (Geolocation, Leaflet maps) that only run client-side,
// so the heavy lifting is in HomeClient.jsx (marked 'use client'). This page is a Server
// Component that emits metadata + JSON-LD + the static SEO intro (H1, paragraphs, tool
// hub cards). The static export prerenders HomeClient too, so the entire page lands in
// the initial HTML that Googlebot sees.

export const metadata = {
  title: 'GetMyLocations — Find Your Location, GPS Coordinates & Address Instantly',
  description:
    'Free all-in-one location tool — find your location, GPS coordinates, and address instantly in your browser. Plus coordinates converter, IP lookup, distance calculator. No signup.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'GetMyLocations — Find Your Location, GPS Coordinates & Address Instantly',
    description:
      'Free all-in-one location tool. Find your location, coordinates, and address instantly. Plus converter, IP lookup, distance calculator. No signup, runs in your browser.',
    url: 'https://getmylocations.com/',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GetMyLocations — Find Your Location, Coordinates & Address',
    description:
      'Free all-in-one location tool — instant coordinates, address, IP lookup, distance calculator, and more.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'GetMyLocations',
  description:
    'Free browser-based all-in-one location toolkit. Reads your GPS coordinates, reverse-geocodes them into a readable address, and links out to ten more tools — coordinates converter, IP lookup, distance calculator, address finder, live tracker, and more.',
  url: 'https://getmylocations.com/',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'GetMyLocations' },
  author: { '@type': 'Person', name: 'Ahmed Anwar' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: HOME_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const HUB_TOOLS = [
  { href: '/gps-coordinates-finder', t: 'GPS Coordinates Finder', d: 'Read your latitude, longitude, accuracy, and altitude in two seconds.' },
  { href: '/my-current-location', t: 'My Current Location', d: 'Your exact street address and coordinates, reverse-geocoded in one tap.' },
  { href: '/live-location', t: 'Live Location', d: 'Continuous GPS tracking that updates as you move.' },
  { href: '/coordinates-converter', t: 'Coordinates Converter', d: 'Translate DD ↔ DMS ↔ DDM ↔ UTM in real time.' },
  { href: '/distance-calculator', t: 'Distance Calculator', d: 'Great-circle distance between two coordinates (Haversine).' },
  { href: '/ip-location', t: 'IP Location', d: 'Look up the city, country, and ISP of any IPv4 or IPv6 address.' },
  { href: '/address-finder', t: 'Address Finder', d: 'Two-way geocoding — address ↔ coordinates.' },
  { href: '/what-is-my-location', t: 'What Is My Location?', d: 'The in-depth explainer plus the tool, in one page.' },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Static, server-rendered SEO content (Googlebot sees this in raw HTML) */}
      <main id="main" role="main" className="max-w-7xl mx-auto px-5 py-8">
        <section className="mb-7">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">
            Free · No signup · Runs in your browser
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-accent">GetMyLocations</span> — find your location, coordinates, and address instantly.
          </h1>
          <p className="text-fg-muted mt-3 max-w-3xl leading-relaxed">
            An all-in-one location toolkit, free in your browser. Click below and the page
            reads your GPS coordinates, resolves the city and country, and drops a live
            map pin in two seconds. No account, no app install, no tracking — the
            coordinates stay in your tab. Eleven more focused tools live one click away:
            a{' '}
            <Link href="/coordinates-converter" className="text-accent hover:underline">coordinates converter</Link>,
            an{' '}
            <Link href="/ip-location" className="text-accent hover:underline">IP location lookup</Link>,
            a{' '}
            <Link href="/distance-calculator" className="text-accent hover:underline">distance calculator</Link>,
            an{' '}
            <Link href="/address-finder" className="text-accent hover:underline">address finder</Link>,
            and a{' '}
            <Link href="/live-location" className="text-accent hover:underline">live tracker</Link>{' '}
            that updates as you move.
          </p>
          <p className="mt-3 text-sm text-fg-subtle">
            Last reviewed June 16, 2026. Articles and tools are reviewed by{' '}
            <Link href="/about" className="text-accent hover:underline">Ahmed Anwar</Link>{' '}
            before publication; report any inaccurate detail via the{' '}
            <Link href="/contact" className="text-accent hover:underline">Contact page</Link>.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="glass rounded-2xl p-5 ring-1 ring-line">
            <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">One fast tool</p>
            <h2 className="font-display text-xl font-bold mt-1">Coordinates and address in two seconds</h2>
            <p className="mt-2 text-sm text-fg-muted leading-relaxed">
              The widget below reads your live GPS, reverse-geocodes the coordinate
              into a street, city, and country, and draws a live map pin — all in one tap.
            </p>
          </div>
          <div className="glass rounded-2xl p-5 ring-1 ring-line">
            <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">Eleven tools, one hub</p>
            <h2 className="font-display text-xl font-bold mt-1">A focused tool for every job</h2>
            <p className="mt-2 text-sm text-fg-muted leading-relaxed">
              Need DD ↔ DMS, the distance between two points, the city of an IP, or the
              address of a coordinate? Each job has a dedicated tool, linked below.
            </p>
          </div>
          <div className="glass rounded-2xl p-5 ring-1 ring-line">
            <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">Private by default</p>
            <h2 className="font-display text-xl font-bold mt-1">Your location stays in your browser</h2>
            <p className="mt-2 text-sm text-fg-muted leading-relaxed">
              Coordinates are read by JavaScript in your tab. The only outgoing call is a
              throttled reverse-geocoding lookup to OpenStreetMap to translate the numbers
              into a place name — no server we operate sees them.
            </p>
          </div>
        </section>

        {/* Tool hub — prerendered links so Googlebot sees the cluster on first byte */}
        <section aria-labelledby="hub" className="mb-10">
          <h2 id="hub" className="font-display text-2xl font-bold">All-in-one location toolkit — pick a tool</h2>
          <p className="text-sm text-fg-muted mt-1 max-w-3xl">
            The full set of focused, single-job tools on this site. Each one is free, runs in your browser, and is linked back here from related tools and guides.
          </p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {HUB_TOOLS.map((t) => (
              <li key={t.href}>
                <Link href={t.href} className="glass rounded-2xl p-4 ring-1 ring-line hover:ring-accent/40 transition group block no-underline h-full">
                  <h3 className="font-display text-base font-bold text-fg group-hover:text-accent transition">{t.t}</h3>
                  <p className="text-xs text-fg-subtle mt-1.5 leading-snug">{t.d}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Client-side interactive tool (Geolocation API, Leaflet map, etc.) */}
        <HomeClient />
      </main>
    </>
  );
}
