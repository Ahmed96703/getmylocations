import Link from 'next/link';
import Tool from './Tool.jsx';

export const metadata = {
  title: 'Distance Calculator — Between Two GPS Coordinates',
  description: 'Calculate the great-circle distance between two GPS coordinates in km, miles, nautical miles, meters. Haversine formula, no signup.',
  keywords: ['distance calculator', 'distance between two coordinates', 'haversine calculator', 'great circle distance'],
  alternates: { canonical: '/distance-calculator' },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Distance Calculator',
  url: 'https://getmylocations.com/distance-calculator',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function DistanceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />

      <main className="max-w-5xl mx-auto px-5 py-10">
        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-electric-400 font-semibold mb-2">Free Tool · Pure JavaScript Math</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Distance <span className="text-electric-400">Calculator</span> — between two GPS coordinates
          </h1>
          <p className="text-lg text-slate-300/90 mt-4 max-w-3xl">
            Enter two latitude / longitude pairs and get the great-circle distance in kilometers, miles, nautical miles, and meters, plus the initial bearing. Uses the Haversine formula — pure JavaScript, no API call.
          </p>
        </section>

        <Tool />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">What is a distance calculator?</h2>
          <p className="mt-3 text-slate-300/90 leading-relaxed">
            A <strong className="text-slate-100">distance calculator</strong> tells you how far apart two locations are. This version takes two pairs of latitude and longitude coordinates and returns the <em>straight-line distance over Earth&rsquo;s surface</em> — the <strong className="text-slate-100">great-circle distance</strong>. It is what airlines use when they quote flight distances and what GPS units use when they tell you a destination is &ldquo;240 km away as the crow flies&rdquo;.
          </p>
          <p className="mt-3 text-slate-300/90 leading-relaxed">
            The <strong className="text-slate-100">Haversine formula</strong> is the standard equation, accurate to about 0.5% globally — more than enough for trip planning, real-estate searches, and geofence design.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Related tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[
              { href: '/my-location', t: 'My Location' },
              { href: '/coordinates-converter', t: 'Coordinates Converter' },
              { href: '/driving-directions', t: 'Driving Directions' },
              { href: '/address-finder', t: 'Address Finder' },
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
