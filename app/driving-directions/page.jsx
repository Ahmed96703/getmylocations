import Link from 'next/link';
import { breadcrumbSchema } from '../components/breadcrumbSchema.js';
import Tool from './Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';
import AdSense from '../components/AdSense.jsx';

export const metadata = {
  title: 'Get Directions — Free Driving Directions Route Planner',
  description: 'Get driving, walking, cycling or transit directions between any two places or coordinates, preview both on a map, and open the route in Google Maps.',
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
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Driving Directions',
  description:
    'Plan a driving, walking, bicycling, or public-transit route between any two places or GPS coordinates (any format). Shows both places and the straight-line distance, and opens the full route with travel time and turn-by-turn steps in Google Maps.',
  url: 'https://getmylocations.com/driving-directions',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'GetMyLocations' },
  author: { '@type': 'Person', name: 'Ahmed Anwar', url: 'https://getmylocations.com/about' },
};


const faqs = [
  {
    q: 'Where do I see the travel time and turn-by-turn steps?',
    a: 'In Google Maps. Tap "Open route in Google Maps" and the route opens with its distance, travel time with current traffic, alternative routes, and step-by-step directions, on the website or in the Google Maps app on your phone. This page finds both places, shows them on a map with the straight-line distance between them, and hands Google exactly the start, destination, and travel mode you chose.',
  },
  {
    q: 'Why is the ETA in Google Maps different from my car satnav?',
    a: 'Built-in car navigation often runs on map data that is months or years old and may have no live traffic feed at all. Google Maps estimates travel time from current and typical traffic on each road. On a clear road the two usually agree closely; in rush hour the live-traffic estimate is usually the more realistic one.',
  },
  {
    q: 'Can I add multiple stops to a route?',
    a: 'Plan the first leg here, then open the route in Google Maps, where you can add stops. Google Maps supports multiple stops for driving, walking, and cycling routes.',
  },
  {
    q: 'Can I get directions from my current location?',
    a: 'Yes. Tap "Use my location" under the starting point and allow the location prompt; it fills in your GPS coordinates. You can also paste coordinates in any format, such as decimal degrees or degrees-minutes-seconds.',
  },
  {
    q: 'Can the route avoid tolls or motorways?',
    a: 'Yes, in Google Maps. Open the route there and use the route options menu to avoid tolls, motorways, or ferries. This page passes only the start, destination, and travel mode.',
  },
  {
    q: 'Why can\'t it find one of my places?',
    a: 'The preview looks places up in OpenStreetMap, which may not know a new building or a business name. Add the city and country, or paste coordinates from the Address Finder or Google Maps. If Google Maps then says no route was found, the places may be separated by water with no ferry, or the travel mode (often transit) has no coverage there; try driving first.',
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
      <AdSense />
      <main role="main" className="max-w-5xl mx-auto px-5 py-10">
        <nav aria-label="Breadcrumb" className="text-xs text-fg-subtle mb-3">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-fg-muted">Driving Directions</li>
          </ol>
        </nav>

        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · Powered by Google Maps</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Get directions — free <span className="text-accent">driving directions</span> route planner
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Plan a <strong className="text-fg">driving, walking, bicycling, or public-transit</strong> route between any two places or GPS coordinates. The page shows both places and the straight-line distance between them, then opens the full route, with travel time and turn-by-turn directions, in Google Maps.
          </p>
        </section>

        <Tool />

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How to get directions between two places</h2>
          <ol className="mt-3 space-y-1.5 text-fg-muted list-decimal list-inside leading-relaxed">
            <li>Type the starting point and the destination: an address, a landmark, or coordinates in any format. Or tap <em>Use my location</em> for the start.</li>
            <li>Choose driving, walking, bicycling, or public transit.</li>
            <li>Tap <em>Get directions</em>. Both places appear on the map with the straight-line distance between them, so you can check they are the places you meant.</li>
            <li>Tap <em>Open route in Google Maps</em> for the road route, its distance and travel time with current traffic, and turn-by-turn directions, on the web or in the app.</li>
          </ol>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Place names are looked up with OpenStreetMap&rsquo;s free geocoder for the preview, which allows one request per second, so the two lookups take a moment. Google Maps receives your original text (or your coordinates) and finds the places itself.
          </p>
        </section>

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
            Even Google Maps and Waze, both owned by Google since it bought
            Waze in 2013, regularly disagree because each app weighs traffic
            reports and route preferences differently.
            On a long trip those differences can add up to many minutes, so treat
            any single ETA as an estimate rather than a promise.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">What the full Google Maps app adds</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            This page sets up a single route from one place to another. Opening it in Google Maps
            adds everything a real trip needs: alternative routes, live traffic and travel time,
            extra stops, avoiding tolls, motorways, or ferries, choosing a departure or arrival time
            for transit, offline maps, and spoken turn-by-turn navigation on your phone. Before you leave, you might also want to
            preview the destination in{' '}
            <Link href="/street-view" className="text-accent hover:underline">Street View</Link>{' '}
            to check the entrance, or explore the area around it on the{' '}
            <Link href="/maps" className="text-accent hover:underline">interactive map</Link>.
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
            Both fields accept coordinates as well as a street address, in decimal degrees, degrees-minutes-seconds, UTM, or as a Google Maps link. That matters
            more often than it sounds: campsites, trailheads, building site entrances, rural properties on
            unnamed lanes, and anywhere a friend has sent you a pin rather than a postcode. Paste{' '}
            <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">29.749907, -95.358421</code>{' '}
            into either field and Google Maps routes to that exact point.
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
            The distance Google Maps shows for a route is the length of the actual path &mdash; every bend,
            every detour around a river, every one-way system. The distance shown on this page is the
            straight line between the two places, calculated in your browser on the WGS 84 ellipsoid.
            The road distance is almost always longer, sometimes dramatically so in mountainous
            or coastal terrain where the road has to go the long way round.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            If what you actually want is the great-circle distance &mdash; the &ldquo;as the crow flies&rdquo;
            figure used for flight planning, radio range, geofencing, and delivery-zone rules &mdash; the{' '}
            <Link href="/distance-calculator" className="text-accent hover:underline">distance calculator</Link>{' '}
            computes it directly from two coordinate pairs, with bearings and the midpoint. Comparing the two
            numbers is a quick sanity check on how indirect a journey really is. Some detour is normal: a
            2012 nationwide US study by Boscoe, Henry and Zdeb measured an average road-to-straight-line
            ratio of about 1.4. A ratio of 2 or more usually means a river, mountain range, or coastline
            the road has to go around.
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
