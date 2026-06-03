import Link from 'next/link';
import Tool from './Tool.jsx';
import ProofPanel from '../components/ProofPanel.jsx';

export const metadata = {
  title: 'Driving Directions — Free Route Planner',
  description: 'Free driving directions tool. Plan a driving, walking, biking, or transit route between any two addresses. Powered by Google Maps.',
  keywords: ['driving directions', 'route planner', 'directions', 'walking directions', 'transit directions'],
  alternates: { canonical: '/driving-directions' },
  openGraph: {
    title: 'Driving Directions — Free Route Planner',
    description:
      'Plan a driving, walking, biking, or transit route between any two addresses.',
    url: 'https://getmylocations.com/driving-directions',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Driving Directions — Free Route Planner',
    description:
      'Plan a driving, walking, biking, or transit route between any two addresses.',
    images: ['/og-image.png'],
  },
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
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · Powered by Google Maps</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Driving <span className="text-accent">Directions</span> — free route planner
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Plan a <strong className="text-fg">driving, walking, bicycling, or public-transit</strong> route between any two addresses or GPS coordinates.
          </p>
        </section>

        <Tool />

        <ProofPanel
          title="Real route and ETA proof"
          device="Capture a route from a real origin to a well-known landmark so the ETA, distance, and polyline are all visible together."
          caption="Showing a believable route makes the page feel like a working tool instead of an empty embed."
          fileHint="/public/screenshots/driving-directions-khi.png"
        />

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Why the suggested route is not always the shortest</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Routing engines do not optimise for distance. They optimise for time.
            Two routes between the same pair of points can differ wildly because
            the longer one might be a motorway with steady traffic while the
            shorter one cuts through residential streets with traffic lights every
            two hundred meters. The engine looks at the road graph, the historical
            speed on each segment at this hour of the day, and the current
            real-time traffic from millions of phones, and picks whichever
            combination produces the lowest predicted arrival time.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            This is also why the route can change between two attempts a few
            minutes apart. A crash on the motorway gets reported, the predicted
            speed for that segment drops, and the engine reroutes everyone through
            the longer-looking detour that is now faster.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Walking, biking, and transit use different graphs</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Picking a different travel mode is not just a slower version of the
            same route. Walking directions include pedestrian-only streets,
            staircases, and pedestrian crossings that a driving route cannot use.
            Biking directions know about bike lanes where they have been mapped,
            and avoid motorways. Transit directions read schedules — they will
            tell you to walk seven minutes to a bus stop, ride for nineteen
            minutes, and walk three minutes at the other end, with the timings
            tied to the next scheduled departure.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Transit coverage is the unevenest of the four. London, Tokyo, and New
            York have minute-by-minute schedules; many smaller cities only have
            major bus and metro lines mapped, and rural areas often have no
            transit data at all.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Why two apps quote different arrival times</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Open Google Maps, Apple Maps, and Waze at the same time with the same
            destination, and you will often see three different ETAs. Each app
            has its own traffic data set, its own preferences (some default to
            avoiding tolls, some weight motorway speed more aggressively), and
            its own model for how aggressively a typical driver actually drives.
            A 5 to 15% difference between them is normal. For a long trip, that
            is half an hour of disagreement.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">When the embed gives up</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The Google Maps embed used here is a lightweight version of the full
            Maps app. It handles one origin and one destination cleanly, and it
            shows traffic-adjusted ETAs. What it does not do is multi-stop routes,
            offline downloads, or step-by-step navigation. For any of those, the
            <em> Open in Google Maps</em> button hands the same route off to the
            full app on your device.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Plan something else</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[{ href: '/distance-calculator', t: 'Distance Calculator' }, { href: '/street-view', t: 'Street View' }, { href: '/address-finder', t: 'Address Finder' }, { href: '/my-location', t: 'My Location' }].map((t) => (
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
