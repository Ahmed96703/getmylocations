import Link from 'next/link';
import Tool from './Tool.jsx';

export const metadata = {
  title: 'Driving Directions — Free Route Planner',
  description: 'Free driving directions tool. Plan a driving, walking, biking, or transit route between any two addresses. Powered by Google Maps.',
  keywords: ['driving directions', 'route planner', 'directions', 'walking directions', 'transit directions'],
  alternates: { canonical: '/driving-directions' },
};

const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Driving Directions', url: 'https://getmylocations.com/driving-directions',
  applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web',
  isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function DrivingDirectionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <main className="max-w-5xl mx-auto px-5 py-10">
        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-electric-400 font-semibold mb-2">Free Tool · Powered by Google Maps</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Driving <span className="text-electric-400">Directions</span> — free route planner
          </h1>
          <p className="text-lg text-slate-300/90 mt-4 max-w-3xl">
            Plan a <strong className="text-slate-100">driving, walking, bicycling, or public-transit</strong> route between any two addresses or GPS coordinates.
          </p>
        </section>

        <Tool />

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">About route planning</h2>
          <p className="mt-3 text-slate-300/90 leading-relaxed">
            Modern routing engines combine a road graph, historical traffic patterns, and real-time traffic feeds to pick the path with the lowest predicted travel time, not the shortest distance. This is why two routes between the same two points can differ.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Related tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[{ href: '/distance-calculator', t: 'Distance Calculator' }, { href: '/street-view', t: 'Street View' }, { href: '/address-finder', t: 'Address Finder' }, { href: '/my-location', t: 'My Location' }].map((t) => (
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
