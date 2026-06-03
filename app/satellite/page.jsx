import Link from 'next/link';
import Tool from './Tool.jsx';

export const metadata = {
  title: 'Satellite View — Free Satellite Map of Any Address',
  description: 'Free satellite view of any address or coordinates. High-resolution satellite imagery, no signup, no API key. Search any place and see it from above.',
  keywords: ['satellite view', 'satellite map', 'satellite view of my house', 'free satellite imagery', 'satellite view by address'],
  alternates: { canonical: '/satellite' },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Satellite View',
  url: 'https://getmylocations.com/satellite',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function SatellitePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />

      <main className="max-w-5xl mx-auto px-5 py-10">
        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · High-resolution Satellite Imagery</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Satellite view of <span className="text-accent">any address</span>
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Type any address, landmark, or GPS coordinates and see the spot from above in high-resolution satellite imagery. Free, no signup, no API key. Imagery is supplied by Esri&rsquo;s World Imagery service.
          </p>
        </section>

        <Tool />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Where the imagery comes from</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The satellite tiles are sourced from Esri&rsquo;s World Imagery
            service, which stitches together data from a mix of providers
            &mdash; Maxar, DigitalGlobe, GeoEye, USDA Farm Service Agency,
            and a handful of national mapping agencies. Resolution varies
            by region: urban areas in North America and Europe are typically
            available at sub-meter detail; rural areas and parts of Africa,
            central Asia, and the polar regions are coarser, sometimes 15
            meters per pixel or worse. The age of the imagery also varies
            &mdash; some tiles are from the last six months, others are
            several years old.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">When satellite beats a regular map</h2>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
            <li>Checking what a property actually looks like before visiting.</li>
            <li>Verifying that a building exists at an address you&rsquo;ve been given.</li>
            <li>Planning a hike where the cartographic map lacks trail detail but the imagery shows tracks.</li>
            <li>Spotting parking areas, swimming pools, or other features not labelled in the standard map.</li>
            <li>Confirming geographical context &mdash; is this place in a desert, near water, in a forest?</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Privacy note about satellite imagery</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Esri&rsquo;s imagery is the same source used by hundreds of
            mapping products, including some government tools. It&rsquo;s
            already public. If you find your own home and want it obscured
            in a specific imagery provider&rsquo;s product, both Google
            Earth and Apple Maps have public takedown request forms
            &mdash; Esri does not blur individual properties on request,
            but the imagery shown here is generally a year or two old, not
            real-time.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">More mapping tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[
              { href: '/maps', t: 'Interactive Maps' },
              { href: '/us-map', t: 'US Map' },
              { href: '/street-view', t: 'Street View' },
              { href: '/address-finder', t: 'Address Finder' },
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
