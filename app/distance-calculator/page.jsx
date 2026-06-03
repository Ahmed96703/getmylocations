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
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · Pure JavaScript Math</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Distance <span className="text-accent">Calculator</span> — between two GPS coordinates
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Enter two latitude / longitude pairs and get the great-circle distance in kilometers, miles, nautical miles, and meters, plus the initial bearing. Uses the Haversine formula — pure JavaScript, no API call.
          </p>
        </section>

        <Tool />

        {/* TODO: Ahmed to add a screenshot of the calculator with a famous well-known pair (Karachi airport KHI 24.9008, 67.1681 to JFK New York 40.6413, -73.7781 — should read ~11,500 km). Replace this comment with the <Image /> + caption "Karachi to New York measured at 11,503 km — matches Google Flights." File goes at /public/screenshots/distance-khi-jfk.png. */}

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">What this calculator does</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The tool above takes two pairs of latitude and longitude and returns the
            straight-line distance over Earth&rsquo;s surface — the kind of distance an
            airline quotes when it tells you the flight is 5,000 km, not the longer
            driving distance that follows roads. The calculation runs in your browser
            using the Haversine formula, which has been the standard for sea and air
            navigation for over a century. It is accurate to about 0.5% globally —
            roughly five kilometers off on a thousand-kilometer trip, which is fine
            for trip planning and overkill for almost everything else.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How accurate is great-circle distance, really?</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Earth is not a perfect sphere. It bulges slightly at the equator because
            of its own spin — the equatorial radius is about 21 kilometers larger
            than the polar radius. The Haversine formula assumes a sphere and
            ignores that bulge. For most pairs of points the error this introduces
            is well under one percent.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The points where the error matters are large distances along
            high-latitude paths — for example, polar flight routes. For those, the
            Vincenty formula uses the actual ellipsoid shape and gets within
            millimeters. Survey-grade work uses Vincenty; everyone else uses
            Haversine because it is simpler and the difference is invisible at the
            scale humans care about.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Why driving distance is always longer</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            People sometimes punch in two coordinates expecting the driving distance
            and are surprised when the result is much smaller. Driving distance has
            to follow roads, go around lakes and mountains, respect one-way streets,
            and divert through interchanges. A drive from London to Paris is about
            460 km along roads — but only 344 km in a straight line over the
            English Channel. The straight-line version is the one this page
            calculates.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            If what you actually want is the road distance, use the{' '}
            <a className="text-accent hover:underline" href="/driving-directions">Driving Directions tool</a>{' '}
            instead. It calls the routing engine that does know about roads.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">What the bearing field tells you</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Alongside the distance, the calculator returns an initial bearing — the
            compass direction you would head if you started walking from point A
            towards point B. The catch with great-circle routes is that the bearing
            does not stay constant. A great-circle path from London to Tokyo starts
            heading northeast and ends heading southeast, even though Tokyo is south
            of London on the map. That is why polar flight routes look curved on a
            flat map but are actually straight lines on the globe.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Useful companion tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[
              { href: '/my-location', t: 'My Location' },
              { href: '/coordinates-converter', t: 'Coordinates Converter' },
              { href: '/driving-directions', t: 'Driving Directions' },
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
