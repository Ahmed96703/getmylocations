import Link from 'next/link';
import Tool from './Tool.jsx';

export const metadata = {
  title: 'US Map — Interactive Map of the United States',
  description: 'Free interactive map of the United States. Search any US city or address, drop a pin, see GPS coordinates, and get your current US location on a live map.',
  keywords: ['us map', 'map of united states', 'interactive us map', 'us map with cities', 'usa map online'],
  alternates: { canonical: '/us-map' },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'US Map',
  url: 'https://getmylocations.com/us-map',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function UsMapPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />

      <main className="max-w-5xl mx-auto px-5 py-10">
        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · United States Map</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Interactive map of the <span className="text-accent">United States</span>
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Search any US city or address, click anywhere on the country to drop a pin and read the GPS coordinates, or use your phone&rsquo;s location to centre the map on where you are. Free, no signup, no API key.
          </p>
        </section>

        <Tool />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">What this map does</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The map opens centred on the continental United States at a
            zoom level where the outline of all 48 contiguous states is
            visible at once. Zoom in for state, county, and city detail.
            The basemap is OpenStreetMap rendered through CARTO&rsquo;s
            Voyager style, so place names, highways, and city outlines all
            show clearly without the visual noise of a full satellite view.
            For satellite imagery of the same area, switch to the{' '}
            <Link href="/satellite" className="text-accent hover:underline">Satellite tool</Link>.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Three things you can do here</h2>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
            <li><strong>Find any US location.</strong> Type a city, ZIP code, or full street address and the map jumps to it.</li>
            <li><strong>Read coordinates anywhere.</strong> Click on the map to drop a pin. The exact latitude and longitude appear below the map.</li>
            <li><strong>Centre on your current location.</strong> Tap the &ldquo;Use my location&rdquo; button and the map jumps to your GPS position, if you allow the browser&rsquo;s location prompt.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Coordinate reference for major US cities</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-line text-accent text-[11px] uppercase tracking-wider">
                  <th className="text-left py-2 pr-4">City</th>
                  <th className="text-left py-2 pr-4">Latitude</th>
                  <th className="text-left py-2">Longitude</th>
                </tr>
              </thead>
              <tbody className="text-fg-muted font-mono text-xs">
                <tr className="border-b border-line-subtle"><td className="py-2 pr-4 font-sans">New York, NY</td><td className="py-2 pr-4">40.7128</td><td className="py-2">-74.0060</td></tr>
                <tr className="border-b border-line-subtle"><td className="py-2 pr-4 font-sans">Los Angeles, CA</td><td className="py-2 pr-4">34.0522</td><td className="py-2">-118.2437</td></tr>
                <tr className="border-b border-line-subtle"><td className="py-2 pr-4 font-sans">Chicago, IL</td><td className="py-2 pr-4">41.8781</td><td className="py-2">-87.6298</td></tr>
                <tr className="border-b border-line-subtle"><td className="py-2 pr-4 font-sans">Houston, TX</td><td className="py-2 pr-4">29.7604</td><td className="py-2">-95.3698</td></tr>
                <tr className="border-b border-line-subtle"><td className="py-2 pr-4 font-sans">Miami, FL</td><td className="py-2 pr-4">25.7617</td><td className="py-2">-80.1918</td></tr>
                <tr className="border-b border-line-subtle"><td className="py-2 pr-4 font-sans">Seattle, WA</td><td className="py-2 pr-4">47.6062</td><td className="py-2">-122.3321</td></tr>
                <tr><td className="py-2 pr-4 font-sans">Denver, CO</td><td className="py-2 pr-4">39.7392</td><td className="py-2">-104.9903</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Related tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[
              { href: '/satellite', t: 'Satellite View' },
              { href: '/maps', t: 'Interactive Maps' },
              { href: '/my-location', t: 'My Location' },
              { href: '/distance-calculator', t: 'Distance Calculator' },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="glass rounded-2xl p-4 hover:ring-accent/40 ring-1 ring-line transition no-underline">
                <h3 className="font-display text-base font-bold text-fg hover:text-accent transition">{t.t}</h3>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
