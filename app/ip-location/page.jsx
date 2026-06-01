import Link from 'next/link';
import Tool from './Tool.jsx';

export const metadata = {
  title: 'IP Location — Find My IP Address Country, City & ISP Free',
  description: 'Free IP location finder. Find my IP address with country, city, ISP, timezone, and map. Lookup any IPv4 or IPv6 address. No signup, no API key.',
  keywords: ['ip location', 'ip address lookup', 'ip location finder', 'my ip address', 'what is my ip', 'ip geolocation'],
  alternates: { canonical: '/ip-location' },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'IP Location Lookup',
  url: 'https://getmylocations.com/ip-location',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function IpLocationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />

      <main className="max-w-5xl mx-auto px-5 py-10">
        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-electric-400 font-semibold mb-2">Free Tool · No API key required</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            IP <span className="text-electric-400">Location</span> — find any IP address on a map
          </h1>
          <p className="text-lg text-slate-300/90 mt-4 max-w-3xl">
            Look up the city, country, ISP, timezone, and approximate coordinates of any public IP address — your own or someone else&apos;s. Click one button to look up your own IP, or paste any IPv4 / IPv6 address.
          </p>
        </section>

        <Tool />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">What is IP location?</h2>
          <p className="mt-3 text-slate-300/90 leading-relaxed">
            <strong className="text-slate-100">IP geolocation</strong> is the process of estimating where in the world an IP address is physically located. Every device on the public internet has an IP address — a unique number issued by an Internet Service Provider — and those addresses are assigned in blocks registered to specific countries, regions, and (often) cities.
          </p>
          <p className="mt-3 text-slate-300/90 leading-relaxed">
            Country-level accuracy is typically 95-99%. City-level accuracy is usually 50-75% and can easily be off by 25 km or more. Street-level accuracy is essentially impossible from IP alone.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Related tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[
              { href: '/my-location', t: 'My Location' },
              { href: '/gps-coordinates', t: 'GPS Coordinates' },
              { href: '/address-finder', t: 'Address Finder' },
              { href: '/distance-calculator', t: 'Distance Calculator' },
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
