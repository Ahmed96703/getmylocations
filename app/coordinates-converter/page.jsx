import Link from 'next/link';
import Tool from './Tool.jsx';

export const metadata = {
  title: 'Latitude and Longitude Converter — DD ↔ DMS ↔ UTM Free',
  description: 'Free latitude and longitude converter. Convert GPS coordinates between Decimal Degrees, DMS, DDM, and UTM in real time. With map. No signup.',
  keywords: ['coordinates converter', 'gps coordinates converter', 'dd to dms', 'decimal degrees converter', 'utm converter', 'lat long converter'],
  alternates: { canonical: '/coordinates-converter' },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Coordinates Converter',
  url: 'https://getmylocations.com/coordinates-converter',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function CoordinatesConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />

      <main className="max-w-5xl mx-auto px-5 py-10">
        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-electric-400 font-semibold mb-2">Free Tool · Real-time Conversion</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Coordinates <span className="text-electric-400">Converter</span> — DD, DMS, DDM, UTM
          </h1>
          <p className="text-lg text-slate-300/90 mt-4 max-w-3xl">
            Convert any GPS coordinate between <strong className="text-slate-100">Decimal Degrees</strong>, <strong className="text-slate-100">Degrees-Minutes-Seconds</strong>, <strong className="text-slate-100">Degrees-Decimal-Minutes</strong>, and <strong className="text-slate-100">Universal Transverse Mercator</strong>. Edit any field and the others update instantly.
          </p>
        </section>

        <Tool />

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">When to use which format</h2>
          <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
            <li><strong>Decimal Degrees (DD)</strong> — Google Maps, smartphone apps, modern APIs.</li>
            <li><strong>DMS</strong> — paper nautical charts, aviation, land-survey documents.</li>
            <li><strong>DDM</strong> — marine GPS receivers, amateur radio.</li>
            <li><strong>UTM</strong> — hiking, surveying, military, GIS.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Related tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[
              { href: '/my-location', t: 'My Location' },
              { href: '/gps-coordinates', t: 'GPS Coordinates' },
              { href: '/distance-calculator', t: 'Distance Calculator' },
              { href: '/decimal-degrees-converter', t: 'DD Converter Guide' },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="glass rounded-2xl p-4 hover:ring-electric-400/40 ring-1 ring-white/10 transition no-underline">
                <h3 className="font-display text-base font-bold text-slate-100 hover:text-electric-400 transition">{t.t}</h3>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
