import Link from 'next/link';
import Tool from './Tool.jsx';

export const metadata = {
  title: 'Street View — See Any Address in Google Street View',
  description: 'Free Street View tool. Enter any address or GPS coordinates and see the location in Google Street View. No signup, no API key.',
  keywords: ['street view', 'google street view', 'street view by address', 'virtual tour'],
  alternates: { canonical: '/street-view' },
};

const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Street View Tool', url: 'https://getmylocations.com/street-view',
  applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web',
  isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function StreetViewPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <main className="max-w-5xl mx-auto px-5 py-10">
        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-electric-400 font-semibold mb-2">Free Tool · Powered by Google Street View</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Street <span className="text-electric-400">View</span> — see any address in Google Street View
          </h1>
          <p className="text-lg text-slate-300/90 mt-4 max-w-3xl">
            Type any address, landmark, or GPS coordinate pair, and instantly walk down the street in <strong className="text-slate-100">Google Street View</strong>. No signup, no app to install.
          </p>
        </section>

        <Tool />

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Coverage and limitations</h2>
          <p className="mt-3 text-slate-300/90 leading-relaxed">
            Street View coverage is uneven. Most urban roads in North America, Europe, Japan, South Korea, Australia, and parts of South America have imagery. Major cities in Pakistan, India, the Middle East, and Africa often do too, but rural roads and side streets frequently do not. When no imagery exists, Google&apos;s embed automatically falls back to a normal map view.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Related tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[{ href: '/my-location', t: 'My Location' }, { href: '/driving-directions', t: 'Driving Directions' }, { href: '/address-finder', t: 'Address Finder' }, { href: '/gps-coordinates', t: 'GPS Coordinates' }].map((t) => (
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
