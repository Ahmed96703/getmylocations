import Link from 'next/link';
import Tool from './Tool.jsx';

export const metadata = {
  title: 'Address Finder — Address to GPS Coordinates & Reverse',
  description: 'Free address finder. Convert street address into GPS coordinates, or paste coordinates to get the address. Two-way geocoding via Nominatim.',
  keywords: ['address finder', 'geocoding', 'address to coordinates', 'coordinates to address', 'reverse geocoding'],
  alternates: { canonical: '/address-finder' },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Address Finder',
  url: 'https://getmylocations.com/address-finder',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function AddressFinderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />

      <main className="max-w-5xl mx-auto px-5 py-10">
        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-electric-400 font-semibold mb-2">Free Tool · Two-way Geocoding</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Address <span className="text-electric-400">Finder</span> — address ↔ GPS coordinates
          </h1>
          <p className="text-lg text-slate-300/90 mt-4 max-w-3xl">
            Type any address, landmark, or place name and get the GPS coordinates. Or paste a latitude/longitude pair and get the nearest street address back. Powered by OpenStreetMap Nominatim.
          </p>
        </section>

        <Tool />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">What is geocoding?</h2>
          <p className="mt-3 text-slate-300/90 leading-relaxed">
            <strong className="text-slate-100">Geocoding</strong> is the translation between human addresses and machine coordinates. <em>Forward</em> geocoding turns &ldquo;Eiffel Tower, Paris&rdquo; into <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">48.8584, 2.2945</code>. <em>Reverse</em> geocoding does the opposite.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Related tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[
              { href: '/my-location', t: 'My Location' },
              { href: '/gps-coordinates', t: 'GPS Coordinates' },
              { href: '/coordinates-converter', t: 'Coordinates Converter' },
              { href: '/reverse-geocoding', t: 'Reverse Geocoding Guide' },
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
