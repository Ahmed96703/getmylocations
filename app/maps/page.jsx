import Link from 'next/link';
import Tool from './Tool.jsx';

export const metadata = {
  title: 'Maps — Free Online Interactive Map with Search',
  description: 'Free online interactive map with search, pin-drop, and a layer toggle for standard, satellite, and dark views. No signup, no API key.',
  keywords: ['free online map', 'interactive map online', 'free map tool', 'map with coordinates', 'world map online'],
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
            Search any place on Earth, switch between standard, satellite, and dark map styles, drop a pin to read off the GPS coordinates, or centre the map on your current location. No signup, no API key.
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

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Related tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[
              { href: '/satellite', t: 'Satellite View' },
              { href: '/us-map', t: 'US Map' },
              { href: '/my-location', t: 'My Location' },
              { href: '/gps-coordinates', t: 'GPS Coordinates' },
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
