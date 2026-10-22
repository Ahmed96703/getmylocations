import Link from 'next/link';
import { breadcrumbSchema } from '../components/breadcrumbSchema.js';
import Tool from './Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';
import AdSense from '../components/AdSense.jsx';
import Monetag from '../components/Monetag.jsx';
import NativeAd from '../components/NativeAd.jsx';
import SideAd from '../components/SideAd.jsx';
import { AUTHOR } from '../components/author.js';

export const metadata = {
  title: 'Radius Map: Draw a Circle on a Map in Miles or km',
  description:
    'Draw a radius around any address, ZIP code or your location: 1, 5, 10 or 50 miles or km. See the area covered, add more circles, and share the map. Free.',
  keywords: ['radius map', 'draw a radius on a map', 'map radius tool', 'mile radius map', '5 mile radius', 'radius around me', 'draw circle on map', 'km radius map'],
  alternates: { canonical: '/radius-map' },
  openGraph: {
    title: 'Radius Map: Draw a Circle on a Map in Miles or km',
    description: 'Draw a radius around any address or your location, in miles or km. See the area covered and share the map. Free.',
    url: 'https://getmylocations.com/radius-map',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Radius Map: Draw a Circle on a Map in Miles or km',
    description: 'Draw a radius around any address or your location, in miles or km. Free.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Radius Map',
  description:
    'Free tool that draws a circle of any radius, in miles, kilometers, meters or feet, around an address, ZIP code, your current location, or any point on a map. Shows the diameter, circumference and area, draws several circles at once, and shares the map as a link.',
  url: 'https://getmylocations.com/radius-map',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'GetMyLocations' },
  author: AUTHOR,
};

const faqs = [
  {
    q: 'How do I draw a radius on a map?',
    a: 'Search for an address, city or ZIP code, press "Use my location", or click the map to set the center. Then type the radius or pick one of the preset distances, and choose miles, kilometers, meters or feet. The circle is drawn straight away, with its area underneath.',
  },
  {
    q: 'Can I draw a radius in Google Maps?',
    a: 'Google Maps has no circle or radius tool. Its "Measure distance" option draws lines between points, not a circle. Draw the radius here instead, then use "Copy coordinates" to look up the center in Google Maps if you need to.',
  },
  {
    q: 'Can I draw more than one circle?',
    a: 'Yes. Press "+ Add circle" for a second ring around the same center, for example 5 and 10 miles. Click the map to move the selected circle somewhere else, such as two stores with their own delivery areas. Up to 10 circles fit on one map, each in its own color.',
  },
  {
    q: 'How do I share the map?',
    a: 'Press "Copy link to this map". The link holds the center, radius and unit of every circle, so whoever opens it sees the same circles. Nothing is saved on our server; everything is in the link itself.',
  },
  {
    q: 'Why does a large circle look like an oval?',
    a: 'Flat web maps stretch everything more the further it is from the equator. The tool draws a true circle on the Earth, every edge point at exactly the chosen distance from the center, so a circle of a few hundred miles appears taller than it is wide on the map. On the ground it is round.',
  },
  {
    q: 'Is the radius the same as driving distance?',
    a: 'No. A radius is a straight line from the center, as the crow flies. Roads bend around rivers, hills and blocks, so the driving distance to the edge of the circle is usually longer. For distance along roads, use Driving Directions.',
  },
];

const ROWS = [
  ['1 mile', '1.61 km', '3.14 sq mi (2,011 acres)', '8.1 km²', 'About a 20-minute walk to the edge'],
  ['3 miles', '4.83 km', '28.3 sq mi', '73 km²', 'A short bike ride; a typical school or local delivery area'],
  ['5 miles', '8.05 km', '78.5 sq mi', '203 km²', 'A 10 to 20-minute drive; a common delivery or "near me" range'],
  ['10 miles', '16.1 km', '314 sq mi', '814 km²', 'A city and its inner suburbs'],
  ['25 miles', '40.2 km', '1,963 sq mi', '5,085 km²', 'A whole metro area; a common commute limit'],
  ['50 miles', '80.5 km', '7,854 sq mi', '20,341 km²', 'About an hour on the highway; a regional service area'],
  ['100 miles', '161 km', '31,414 sq mi', '81,363 km²', 'A day-trip range; roughly the size of South Carolina'],
];

export default function RadiusMapPage() {
  const crumbs = breadcrumbSchema([{ name: 'Radius Map', path: '/radius-map' }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <AdSense />

      <Monetag />

      <main role="main" className="max-w-5xl mx-auto px-5 py-10">
        <nav aria-label="Breadcrumb" className="text-xs text-fg-subtle mb-3">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-fg-muted">Radius Map</li>
          </ol>
        </nav>

        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · Miles or km</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Radius map: <span className="text-accent">draw a circle around any place</span>
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            See what lies within <strong>1, 5, 10 or 100 miles (or kilometers)</strong> of an address, a ZIP code, or where you are now. <strong>Draw several circles at once</strong>, see the area each one covers, and share the map with a link. Free, no signup.
          </p>
        </section>

        <Tool />
        <NativeAd />
        <SideAd />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">How to draw a radius on a map</h2>
          <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside leading-relaxed">
            <li><strong className="text-fg">Set the center.</strong> Search for an address, town or ZIP code, press &ldquo;Use my location&rdquo;, or click anywhere on the map.</li>
            <li><strong className="text-fg">Choose the radius.</strong> Type a distance or tap a preset, and pick miles, kilometers, meters or feet. The tool starts in miles in the US and UK and in kilometers elsewhere.</li>
            <li><strong className="text-fg">Add more circles if you need them.</strong> &ldquo;+ Add circle&rdquo; draws a wider ring around the same center; click the map to move it to a second place.</li>
            <li><strong className="text-fg">Share or save it.</strong> &ldquo;Copy link to this map&rdquo; gives a link that opens the same circles for anyone.</li>
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">What people use a radius map for</h2>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside leading-relaxed">
            <li><strong className="text-fg">Delivery and service areas.</strong> Restaurants, florists, cleaners and tradespeople show which neighborhoods they cover, often with a second ring for an extra charge.</li>
            <li><strong className="text-fg">House hunting.</strong> Draw 5 or 10 miles around your workplace, a school or family to see which towns are close enough.</li>
            <li><strong className="text-fg">Rules that use a distance.</strong> Some jobs, leases, school places and travel policies are set by distance, such as a non-compete clause covering 25 miles. Check which places fall inside the line.</li>
            <li><strong className="text-fg">&ldquo;Near me&rdquo; settings.</strong> Dating, job and shopping apps often search within a set radius. The map shows what that distance really covers around you.</li>
            <li><strong className="text-fg">Planning trips and events.</strong> See which towns are within an hour&rsquo;s reach, or where guests would travel from.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How big is a 5-mile radius?</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The area of a circle grows with the square of its radius, so doubling the radius covers four times the ground. A 5-mile radius covers about 78.5 square miles; a 10-mile radius covers about 314. Travel times are rough guides for reaching the edge.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tint/5 text-left text-fg-muted">
                  <th className="px-3 py-2 font-semibold">Radius</th>
                  <th className="px-3 py-2 font-semibold">In km</th>
                  <th className="px-3 py-2 font-semibold">Area</th>
                  <th className="px-3 py-2 font-semibold">Area in km²</th>
                  <th className="px-3 py-2 font-semibold">What it covers</th>
                </tr>
              </thead>
              <tbody className="text-fg-muted">
                {ROWS.map(([r, km, a, akm, d]) => (
                  <tr key={r} className="border-t border-line-subtle">
                    <td className="px-3 py-2 text-fg whitespace-nowrap">{r}</td>
                    <td className="px-3 py-2 font-mono text-xs text-fg whitespace-nowrap">{km}</td>
                    <td className="px-3 py-2 font-mono text-xs text-fg whitespace-nowrap">{a}</td>
                    <td className="px-3 py-2 font-mono text-xs text-fg whitespace-nowrap">{akm}</td>
                    <td className="px-3 py-2">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-fg-muted leading-relaxed">
            In kilometers the numbers work the same way: a 10 km radius covers about 314 km² (31,400 hectares), and a 50 km radius about 7,854 km².
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Radius or driving distance?</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            A radius measures in a straight line, &ldquo;as the crow flies&rdquo;. Roads rarely run straight to where you are going: they follow rivers, hills, bridges and street grids, so the distance you actually drive is longer, often by a fifth or more, and much more where a river or a mountain range is in the way. A place just inside a 10-mile circle can easily be a 14-mile drive.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Use the radius map to see which places fall within a distance, and{' '}
            <Link href="/driving-directions" className="text-accent hover:underline">Driving Directions</Link> to check the real route to one of them. For the exact straight-line distance between two points, use the{' '}
            <Link href="/distance-calculator" className="text-accent hover:underline">Distance Calculator</Link>.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How the circles are drawn</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Each circle is made of 128 points, each placed exactly the chosen distance from the center on the WGS 84 ellipsoid, the model of the Earth that GPS uses, with Vincenty&rsquo;s formulae. That keeps the circle correct at any size and anywhere on the globe, including across the date line. The area and circumference are worked out on a sphere of the Earth&rsquo;s mean radius, within about half a percent of the exact figure.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Your location is read by your browser and used only on this page. Place searches go to OpenStreetMap&rsquo;s Nominatim service, and the map comes from OpenStreetMap. Nothing is stored by this site; see the{' '}
            <Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="glass rounded-xl p-4">
                <summary className="font-semibold cursor-pointer text-fg">{f.q}</summary>
                <p className="mt-2 text-fg-muted leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Related tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[
              { href: '/distance-calculator', t: 'Distance Calculator', d: 'Exact distance between two points' },
              { href: '/driving-directions', t: 'Driving Directions', d: 'Distance along the roads' },
              { href: '/my-location', t: 'My Location', d: 'Your coordinates and address' },
              { href: '/fire-map', t: 'Live Fire Map', d: 'Fires within a distance of you' },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="glass rounded-2xl p-4 hover:ring-accent/40 ring-1 ring-line transition no-underline">
                <h3 className="font-display text-base font-bold text-fg hover:text-accent transition">{t.t}</h3>
                <p className="text-xs text-fg-subtle mt-1">{t.d}</p>
              </Link>
            ))}
          </div>
        </section>
        <AuthorBio />
      </main>
    </>
  );
}
