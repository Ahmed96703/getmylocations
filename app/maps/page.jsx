import Link from 'next/link';
import Tool from './Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';

export const metadata = {
  title: 'Maps — Free Interactive World & Satellite Map with Search',
  description: 'Free interactive map with search, pin-drop coordinates, and a toggle for standard, satellite and dark views. Worldwide, no signup, no API key.',
  keywords: ['free online map', 'interactive map online', 'satellite map', 'satellite view of my address', 'us map', 'map of the united states', 'map with coordinates', 'world map online'],
  alternates: { canonical: '/maps' },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Interactive Maps',
  url: 'https://getmylocations.com/maps',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function MapsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />

      <main className="max-w-5xl mx-auto px-5 py-10">
        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · World Map</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            A free interactive map of <span className="text-accent">the world</span>
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Search any place on Earth, switch between standard, satellite, and dark map styles, drop a pin to read off the GPS coordinates, or centre the map on your current location. Works anywhere &mdash; a street in Tokyo, a trailhead in Colorado, the whole outline of the United States. No signup, no API key.
          </p>
        </section>

        <Tool />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Three map styles, one click apart</h2>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
            <li><strong>Standard</strong> &mdash; OpenStreetMap rendered through CARTO&rsquo;s Voyager style. Clean labels, full road network, easy on the eye for navigation tasks.</li>
            <li><strong>Satellite</strong> &mdash; high-resolution aerial imagery from Esri&rsquo;s World Imagery service. Best for seeing what a place actually looks like, not just how it&rsquo;s named.</li>
            <li><strong>Dark</strong> &mdash; CARTO&rsquo;s dark basemap. The same style used on the homepage. Good for low-light viewing or when you want a less visually noisy map.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">What this tool is for</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            This is the freeform &ldquo;just give me a map I can poke around&rdquo;
            tool. Unlike the other map-based pages on the site, it doesn&rsquo;t
            do any one specific task &mdash; no routing, no street-level
            photography, no distance measurement. It&rsquo;s the map you open
            when you want to see where something is, read a coordinate off it,
            or just explore. For task-specific work, the other tools are
            usually a better fit: routing goes through{' '}
            <Link href="/driving-directions" className="text-accent hover:underline">Driving Directions</Link>,
            street-level views through{' '}
            <Link href="/street-view" className="text-accent hover:underline">Street View</Link>,
            and distance measurement through the{' '}
            <Link href="/distance-calculator" className="text-accent hover:underline">Distance Calculator</Link>.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Where the map data comes from</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Cartographic tiles come from OpenStreetMap (an open, community-edited
            map of the world) rendered through CARTO. Satellite tiles come from
            Esri&rsquo;s World Imagery service. Place-name search uses the
            OpenStreetMap Nominatim geocoder. None of these require an account
            or an API key for the modest traffic this site sends them. Their
            individual privacy policies are listed on the{' '}
            <Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link> page.
          </p>
        </section>


        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Where the satellite imagery comes from</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Switch the layer toggle to <strong>Satellite</strong> and the tiles are sourced from
            Esri&rsquo;s World Imagery service, which stitches together data from a mix of providers
            &mdash; Maxar, DigitalGlobe, GeoEye, USDA Farm Service Agency, and a handful of national
            mapping agencies. Resolution varies by region: urban areas in North America and Europe are
            typically available at sub-meter detail; rural areas and parts of Africa, central Asia, and
            the polar regions are coarser, sometimes 15 meters per pixel or worse. The age of the imagery
            also varies &mdash; some tiles are from the last six months, others are several years old.
          </p>
          <h3 className="font-display text-lg font-semibold mt-6 text-fg">When satellite beats a regular map</h3>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
            <li>Checking what a property actually looks like before visiting.</li>
            <li>Verifying that a building exists at an address you&rsquo;ve been given.</li>
            <li>Planning a hike where the cartographic map lacks trail detail but the imagery shows tracks.</li>
            <li>Spotting parking areas, swimming pools, or other features not labelled in the standard map.</li>
            <li>Confirming geographical context &mdash; is this place in a desert, near water, in a forest?</li>
          </ul>
          <h3 className="font-display text-lg font-semibold mt-6 text-fg">A privacy note about satellite imagery</h3>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Esri&rsquo;s imagery is the same source used by hundreds of mapping products, including some
            government tools. It&rsquo;s already public. If you find your own home and want it obscured in
            a specific imagery provider&rsquo;s product, both Google Earth and Apple Maps have public
            takedown request forms &mdash; Esri does not blur individual properties on request, but the
            imagery shown here is generally a year or two old, not real-time.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Three things you can do here</h2>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
            <li><strong>Find any location.</strong> Type a city, ZIP or postal code, or full street address and the map jumps to it.</li>
            <li><strong>Read coordinates anywhere.</strong> Click on the map to drop a pin. The exact latitude and longitude appear below the map.</li>
            <li><strong>Centre on your current location.</strong> Tap the &ldquo;My location&rdquo; button and the map jumps to your GPS position, if you allow the browser&rsquo;s location prompt.</li>
          </ul>
          <p className="mt-3 text-fg-muted leading-relaxed">
            To read your own position with a full accuracy radius and a resolved street address rather than
            just a map pin, use the{' '}
            <Link href="/my-location" className="text-accent hover:underline">My Location tool</Link>.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Coordinate reference for major US cities</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Handy starting points if you want to jump the map somewhere specific, or check a coordinate you
            have been given against a known city centre. Latitude first, longitude second, as always.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-2 pr-4 font-semibold text-fg">City</th>
                  <th className="py-2 pr-4 font-semibold text-fg">Latitude</th>
                  <th className="py-2 font-semibold text-fg">Longitude</th>
                </tr>
              </thead>
              <tbody className="text-fg-muted">
                {[
                  ['New York, NY', '40.7128', '-74.0060'],
                  ['Los Angeles, CA', '34.0522', '-118.2437'],
                  ['Chicago, IL', '41.8781', '-87.6298'],
                  ['Houston, TX', '29.7604', '-95.3698'],
                  ['Miami, FL', '25.7617', '-80.1918'],
                  ['Seattle, WA', '47.6062', '-122.3321'],
                  ['Denver, CO', '39.7392', '-104.9903'],
                ].map(([c, lat, lon]) => (
                  <tr key={c} className="border-b border-line-subtle">
                    <td className="py-2 pr-4">{c}</td>
                    <td className="py-2 pr-4 font-mono">{lat}</td>
                    <td className="py-2 font-mono">{lon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Related tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[
              { href: '/my-location', t: 'My Location' },
              { href: '/street-view', t: 'Street View' },
              { href: '/driving-directions', t: 'Driving Directions' },
              { href: '/distance-calculator', t: 'Distance Calculator' },
            ].map((t) => (
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
