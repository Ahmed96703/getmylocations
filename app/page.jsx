import HomeClient from './HomeClient.jsx';

// MIGRATION NOTE:
// The homepage uses Browser APIs (Geolocation, Leaflet maps) that only run client-side.
// So the heavy lifting is moved into HomeClient.jsx (marked 'use client').
// This page is a Server Component that ONLY renders metadata + the static intro HTML
// (the FAQ, "How it works", and SEO content). Tool UI loads on the client.

export const metadata = {
  title: 'GetMyLocations — Find your GPS coordinates and city',
  description:
    'A free browser tool that reads your GPS coordinates and reverse-geocodes them into a city and country. Works without an account or install.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'GetMyLocations — Find your GPS coordinates and city',
    description:
      'A free browser tool that reads your GPS coordinates and reverse-geocodes them into a city and country.',
    url: 'https://getmylocations.com/',
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
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-accent">Find your location</span> in two seconds.
          </h1>
          <p className="text-fg-muted mt-3 max-w-2xl leading-relaxed">
            Click the button below and the page reads your GPS coordinates straight from
            the browser. You get the latitude and longitude, an accuracy radius, the
            nearest city, and a live map pin — without an account or an app install.
          </p>
        </section>

        {/* Client-side interactive tool (Geolocation API, Leaflet map, etc.) */}
        <HomeClient />
      </main>
    </>
  );
}
