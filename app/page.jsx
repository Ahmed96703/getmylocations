import HomeClient from './HomeClient.jsx';

// MIGRATION NOTE:
// The homepage uses Browser APIs (Geolocation, Leaflet maps) that only run client-side.
// So the heavy lifting is moved into HomeClient.jsx (marked 'use client').
// This page is a Server Component that ONLY renders metadata + the static intro HTML
// (the FAQ, "How it works", and SEO content). Tool UI loads on the client.

export const metadata = {
  title: 'What Is My Location? Find My Current Coordinates — GetMyLocations',
  description:
    'What is my location? Find my current coordinates in seconds with a free browser tool that reads your GPS location and reverse-geocodes it into a city and country. Works without an account or install.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'What Is My Location? Find My Current Coordinates — GetMyLocations',
    description:
      'What is my location? Find your current coordinates in seconds with a free browser tool that reads your GPS location and reverse-geocodes it into a city and country.',
    url: 'https://getmylocations.com/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is My Location? Find My Current Coordinates — GetMyLocations',
    description:
      'What is my location? Find your current coordinates in seconds with a free browser tool that reads your GPS location and reverse-geocodes it into a city and country.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'GetMyLocations',
  description:
    'Browser-based tool that reads your GPS coordinates and reverse-geocodes them into a city and country.',
  url: 'https://getmylocations.com/',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'GetMyLocations' },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {/* Static, server-rendered SEO content (Googlebot sees this in raw HTML) */}
      <main id="main" role="main" className="max-w-7xl mx-auto px-5 py-8">
        <section className="mb-7">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">
            Tested on real phone and laptop
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-accent">What is my location?</span> Find my current coordinates in two seconds.
          </h1>
          <p className="text-fg-muted mt-3 max-w-2xl leading-relaxed">
            Click the button below and the page reads your GPS coordinates straight from
            the browser. You get the latitude and longitude, an accuracy radius, the
            nearest city, and a live map pin — without an account or an app install.
          </p>
          <p className="mt-3 text-sm text-fg-subtle">
            Last reviewed June 3, 2026. If you spot a bad explanation, use the Contact
            page and we will patch factual fixes quickly.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="glass rounded-2xl p-5 ring-1 ring-line">
            <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">Start here</p>
            <h2 className="font-display text-xl font-bold mt-1">Use the live location reader first</h2>
            <p className="mt-2 text-sm text-fg-muted leading-relaxed">
              It is the shortest path from browser permission to a usable coordinate,
              and it shows how the rest of the site&rsquo;s tools fit together.
            </p>
          </div>
          <div className="glass rounded-2xl p-5 ring-1 ring-line">
            <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">Trust signal</p>
            <h2 className="font-display text-xl font-bold mt-1">Checked on real devices</h2>
            <p className="mt-2 text-sm text-fg-muted leading-relaxed">
              The core pages are exercised on an actual phone and laptop before publish,
              so the screenshots, device notes, and explanations stay grounded.
            </p>
          </div>
          <div className="glass rounded-2xl p-5 ring-1 ring-line">
            <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">Corrections</p>
            <h2 className="font-display text-xl font-bold mt-1">Report issues directly</h2>
            <p className="mt-2 text-sm text-fg-muted leading-relaxed">
              If a number, label, or API detail is off, send the exact page and line to
              the Contact page and it gets fixed quickly.
            </p>
          </div>
        </section>

        {/* Client-side interactive tool (Geolocation API, Leaflet map, etc.) */}
        <HomeClient />
      </main>
    </>
  );
}
