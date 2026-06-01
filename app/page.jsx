import HomeClient from './HomeClient.jsx';

// MIGRATION NOTE:
// The homepage uses Browser APIs (Geolocation, Leaflet maps) that only run client-side.
// So the heavy lifting is moved into HomeClient.jsx (marked 'use client').
// This page is a Server Component that ONLY renders metadata + the static intro HTML
// (the FAQ, "How it works", and SEO content). Tool UI loads on the client.

export const metadata = {
  title: 'Find My Location — Free GPS Coordinates & IP Tool',
  description:
    'Free, privacy-first location finder. Find your GPS coordinates, latitude, longitude, city, and country instantly. Live map, no signup, runs in your browser.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Find My Location — Free GPS Coordinates & IP Tool',
    description: 'Free, privacy-first location finder. Instant GPS coordinates and IP location, no signup.',
    url: 'https://getmylocations.com/',
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'GetMyLocations — Location Finder',
  description:
    'Free, privacy-first IP & GPS location finder. Shows latitude, longitude, city and country on an interactive map.',
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
            <span className="text-electric-400">Get My Location</span> — Find My Current Coordinates &amp; Live GPS Tracker
          </h1>
          <p className="text-slate-300/90 mt-3 max-w-2xl leading-relaxed">
            Free, privacy-first <strong className="text-slate-100">latitude longitude finder</strong> and{' '}
            <strong className="text-slate-100">IP geolocator</strong>. Get your exact coordinates,
            pinpoint your location on a live map, and reverse-geocode an address — all in your browser.
          </p>
        </section>

        {/* Client-side interactive tool (Geolocation API, Leaflet map, etc.) */}
        <HomeClient />
      </main>
    </>
  );
}
