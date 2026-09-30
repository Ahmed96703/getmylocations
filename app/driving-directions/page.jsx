import Link from 'next/link';
import { breadcrumbSchema } from '../components/breadcrumbSchema.js';
import Tool from './Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';

export const metadata = {
  title: 'Get Directions — Free Driving Directions Route Planner',
  description: 'Get directions between any two addresses with free driving, walking, biking, or transit routes. Plan from and to directions powered by Google Maps.',
  keywords: ['driving directions', 'route planner', 'directions', 'walking directions', 'transit directions'],
  alternates: { canonical: '/driving-directions' },
  openGraph: {
    title: 'Get Directions — Free Driving Directions Route Planner',
    description:
      'Get directions between any two addresses with free driving, walking, biking, or transit routes.',
    url: 'https://getmylocations.com/driving-directions',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get Directions — Free Driving Directions Route Planner',
    description:
      'Get directions between any two addresses with free driving, walking, biking, or transit routes.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Driving Directions', url: 'https://getmylocations.com/driving-directions',
  applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web',
  isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};


const faqs = [
  {
    q: 'Why is the ETA different from what my car satnav says?',
    a: 'Built-in car navigation usually runs on map data that is months or years old and often has no live traffic feed at all. The routing here uses current traffic conditions aggregated from phones on the road right now. On a clear road the two will agree closely; in rush hour the live-traffic estimate is almost always the more realistic one.',
  },
  {
    q: 'Can I add multiple stops to a route?',
    a: 'Not in this embed — it handles one origin and one destination. For a multi-stop route, plan the first leg here and then use the "Open in Google Maps" button, which hands the route to the full app where you can add waypoints.',
  },
  {
    q: 'Can I get directions from my current location?',
    a: 'Yes. Leave the origin field empty and allow the location prompt, or paste your coordinates into it. To get a precise coordinate pair first, use the My Location tool and copy the "lat, lon" string it produces.',
  },
  {
    q: 'Does the route avoid tolls or motorways?',
    a: 'The embed uses default routing preferences, which do not exclude tolls or motorways. Those options live in the full Google Maps app — open the route there and set them under the route options menu.',
  },
  {
    q: 'Why does it say no route found?',
    a: 'Usually one of three things: the two points are separated by water with no ferry in the road graph, one of the addresses did not geocode to a real place, or the selected travel mode has no coverage there (transit is the common culprit). Try switching to driving mode first to confirm the two endpoints are reachable at all.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function DrivingDirectionsPage() {
  const crumbs = breadcrumbSchema([{ name: 'Driving Directions', path: '/driving-directions' }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="max-w-5xl mx-auto px-5 py-10">
        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · Powered by Google Maps</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Get directions — free <span className="text-accent">driving directions</span> route planner
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Plan a <strong className="text-fg">driving, walking, bicycling, or public-transit</strong> route between any two addresses or GPS coordinates.
          </p>
        </section>

        <Tool />

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

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Entering an origin or destination that has no address</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Both fields accept a decimal-degree coordinate pair as well as a street address. That matters
            more often than it sounds: campsites, trailheads, building site entrances, rural properties on
            unnamed lanes, and anywhere a friend has sent you a pin rather than a postcode. Paste{' '}
            <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">29.749907, -95.358421</code>{' '}
            into either field and the router treats it as an exact point on the road graph.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            One caveat worth knowing: routing snaps your coordinate to the nearest routable road. If the
            point you give is in the middle of a large site, the route ends at whichever road edge is
            closest as the crow flies &mdash; which is not always the correct entrance. For big venues,
            searching the name usually beats pasting a coordinate, because the map data records the actual
            vehicle entrance. To read off your own coordinates first, use the{' '}
            <Link href="/my-location" className="text-accent hover:underline">My Location tool</Link>.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Route distance is not straight-line distance</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The distance this planner reports is the length of the actual driven path &mdash; every bend,
            every detour around a river, every one-way system. That is almost always longer than the
            straight-line distance between the same two points, sometimes dramatically so in mountainous
            or coastal terrain where the road has to go the long way round.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            If what you actually want is the great-circle distance &mdash; the &ldquo;as the crow flies&rdquo;
            figure used for flight planning, radio range, geofencing, and delivery-zone rules &mdash; the{' '}
            <Link href="/distance-calculator" className="text-accent hover:underline">distance calculator</Link>{' '}
            computes it directly from two coordinate pairs using the Haversine formula. Comparing the two
            numbers is a quick sanity check on how indirect a journey really is: a road distance more than
            about 1.4&times; the straight-line figure usually means a significant natural obstacle in the way.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
          <div className="glass mt-4 rounded-2xl divide-y divide-line-subtle">
            {faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex items-center justify-between cursor-pointer list-none font-semibold">
                  {f.q}
                  <span className="text-accent group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-fg-muted text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
        <AuthorBio />
      </main>
    </>
  );
}
