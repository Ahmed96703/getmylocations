import Link from 'next/link';
import { breadcrumbSchema } from '../components/breadcrumbSchema.js';
import Tool from './Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';
import AdSense from '../components/AdSense.jsx';
import SideAd from '../components/SideAd.jsx';
import { AUTHOR } from '../components/author.js';

export const metadata = {
  title: 'World Map with Countries: Free Interactive Map of the World',
  description: 'Free interactive world map with countries and country names. Zoom into any country, city or address, switch to satellite view and read GPS coordinates.',
  keywords: [
    'world map',
    'world map with countries',
    'world map with country name',
    'world map countries',
    'map of the world',
    'map of world',
    'global map',
    'earth map',
    'interactive map',
    'free interactive maps online',
    'free online maps',
    'free maps',
    'satellite map',
    'free interactive world map download',
  ],
  alternates: { canonical: '/maps' },
  openGraph: {
    title: 'World Map with Countries: Free Interactive Map of the World',
    description: 'Free interactive world map with countries and country names. Zoom into any country, city or address, switch to satellite view and read GPS coordinates.',
    url: 'https://getmylocations.com/maps',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'World Map with Countries: Free Interactive Map of the World',
    description: 'Free interactive world map with country names, search, satellite view and GPS coordinates. No signup.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'World Map',
  alternateName: ['Map of the World', 'Interactive World Map'],
  description:
    'Free interactive world map with countries and country names, search, pin-drop GPS coordinates, and a toggle for standard, satellite, and dark views. No signup, no API key.',
  url: 'https://getmylocations.com/maps',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'GetMyLocations' },
  author: AUTHOR,
};

export default function MapsPage() {
  const crumbs = breadcrumbSchema([{ name: 'World Map', path: '/maps' }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <AdSense />


      <main role="main" className="max-w-5xl mx-auto px-5 py-10">
        <nav aria-label="Breadcrumb" className="text-xs text-fg-subtle mb-3">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-fg-muted">World Map</li>
          </ol>
        </nav>

        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · World Map</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            World Map
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            A free, interactive <strong className="text-fg">world map with countries</strong> and <strong className="text-fg">country names</strong>. The <strong className="text-fg">map of the world</strong> opens on the whole globe; zoom into any country, city or street, switch between standard, <strong>satellite</strong>, and dark map styles, drop a pin to read off the <strong>GPS coordinates</strong>, or centre the map on your <strong>current location</strong>. Works anywhere &mdash; a street in Tokyo, a trailhead in Colorado, the whole outline of the United States. No signup, no API key.
          </p>
        </section>

        <Tool />
        <SideAd />

        <article>
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold">World map with countries and country names</h2>
            <p className="mt-3 text-fg-muted leading-relaxed">
              The map opens zoomed out on the entire <strong className="text-fg">global map</strong>, with country borders drawn in. It works as a <strong className="text-fg">world map with country name</strong> labels: every country large enough to fit a label shows its name. Zoom in and the labels change with the scale: first the larger cities, then states and provinces, then towns and streets. Smaller countries such as Luxembourg, Singapore or the Caribbean islands get their label after a zoom step or two. To go straight to a country, type its name in the search box.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Country borders and names come from OpenStreetMap, whose volunteers draw borders as they are controlled on the ground. Where a border is disputed, the map may show a dashed line, and the names are in English or the local language depending on the place.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">How many countries are on the world map?</h2>
            <p className="mt-3 text-fg-muted leading-relaxed">
              There are 195 <strong className="text-fg">world map countries</strong> in the usual count: the 193 member states of the 
              <a href="https://www.un.org/en/about-us/member-states" target="_blank" rel="noopener" className="text-accent underline">United Nations</a> 
              plus its two observer states, the Holy See (Vatican City) and Palestine. By continent:
            </p>
            <div className="overflow-x-auto mt-4 rounded-xl ring-1 ring-line" tabIndex={0} role="region" aria-label="Countries by continent">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-tint/5 text-fg-muted">
                    <th className="px-3 py-2 font-semibold">Continent</th>
                    <th className="px-3 py-2 font-semibold">Countries</th>
                    <th className="px-3 py-2 font-semibold">Largest by area</th>
                  </tr>
                </thead>
                <tbody className="text-fg-muted">
                  {[
                    ['Africa', '54', 'Algeria'],
                    ['Asia', '48', 'China'],
                    ['Europe', '44', 'Russia'],
                    ['North America', '23', 'Canada'],
                    ['South America', '12', 'Brazil'],
                    ['Oceania', '14', 'Australia'],
                    ['Total', '195', 'Russia'],
                  ].map(([c, n, big]) => (
                    <tr key={c} className="border-t border-line-subtle">
                      <td className="px-3 py-2 text-fg">{c}</td>
                      <td className="px-3 py-2 font-mono">{n}</td>
                      <td className="px-3 py-2">{big}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-fg-subtle">
              Russia and Turkey span Europe and Asia; here Russia is counted in Europe and Turkey in Asia, as in most lists. North America includes Central America and the Caribbean. Antarctica has no countries.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">Why the map of the world makes Greenland look huge</h2>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Every flat <strong className="text-fg">map of world</strong> has to stretch the round Earth somewhere. This one, like Google Maps and most web maps, uses the Web Mercator projection, which keeps shapes right at any one spot but makes land look bigger the farther it is from the equator. On screen Greenland looks about as big as Africa; in reality Africa, at about 30 million km&sup2;, is roughly 14 times larger than Greenland&rsquo;s 2.2 million km&sup2;. Antarctica is left off the bottom because Mercator stretches the poles to infinity. To compare real sizes, use the 
              <Link href="/radius-map" className="text-accent hover:underline">radius map</Link>: a 1,000 km circle drawn over Norway looks far wider than the same circle over Kenya.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">Three map styles, one click apart</h2>
            <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
              <li><strong>Standard</strong> &mdash; OpenStreetMap rendered through CARTO&rsquo;s Voyager style. Clean labels, full road network, easy on the eye for navigation tasks.</li>
              <li><strong>Satellite</strong> &mdash; high-resolution aerial imagery from Esri&rsquo;s World Imagery service. Best for seeing what a place actually looks like, not just how it&rsquo;s named.</li>
              <li><strong>Dark</strong> &mdash; CARTO&rsquo;s dark basemap. The same style used on the homepage. Good for low-light viewing or when you want a less visually noisy map.</li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">What this tool is for</h2>
            <p className="mt-3 text-fg-muted leading-relaxed">
              This is the freeform &ldquo;just give me a map I can poke around&rdquo;
              tool. Unlike the other map-based pages on the site, it doesn&rsquo;t
              do any one specific task &mdash; no routing, no street-level
              photography, no distance measurement. It&rsquo;s the map you open
              when you want to see where something is, read a coordinate off it,
              or just explore. For task-specific work, the other tools are
              usually a better fit: routing goes through{' '}
              <Link href="/driving-directions" className="text-accent hover:underline">Driving Directions</Link>,
              street-level views through{' '}
              <Link href="/street-view" className="text-accent hover:underline">Street View</Link>,
              and distance measurement through the{' '}
              <Link href="/distance-calculator" className="text-accent hover:underline">Distance Calculator</Link>.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">Where the map data comes from</h2>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Cartographic tiles come from OpenStreetMap (an open, community-edited
              map of the world) rendered through CARTO. Satellite tiles come from
              Esri&rsquo;s World Imagery service. Place-name search uses the
              OpenStreetMap Nominatim geocoder. None of these require an account
              or an API key for the modest traffic this site sends them. Their
              individual privacy policies are listed on the{' '}
              <Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link> page.
            </p>
          </section>


          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">Earth map in satellite view</h2>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Switch to the Satellite style for a free <strong className="text-fg">earth map</strong> made of aerial photos: a <strong className="text-fg">satellite map</strong> of the whole planet that you can zoom down to single buildings, including an <strong className="text-fg">aerial view of my location</strong> with the My location button. The imagery is Esri World Imagery, not Google&rsquo;s, but it covers the same places for free and needs no Google Earth download.
            </p>
            <p className="mt-3 text-fg-muted leading-relaxed">
              For a closer look at one address, such as a <strong className="text-fg">satellite view of my house</strong>, the 
              <Link href="/satellite" className="text-accent hover:underline">Google Maps satellite view</Link> 
              tool does more: it opens on imagery, overlays place names and roads on the photo, and tells you when the
              photo under your screen was taken and how sharp it is. To see a street from ground level, use 
              <Link href="/street-view" className="text-accent hover:underline">Street View</Link>.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">Free online maps with directions and your live location</h2>
            <p className="mt-3 text-fg-muted leading-relaxed">
              This is one of several <strong className="text-fg">free online maps</strong> on the site, all <strong className="text-fg">free interactive maps online</strong> with no signup or app. Type your address to find your house on the map, or tap My location to show your current location. For a position that keeps updating as you move, use 
              <Link href="/live-location" className="text-accent hover:underline">Live Location</Link>. For <strong className="text-fg">free maps</strong> with a route, turn-by-turn steps and the travel time from your location, use 
              <Link href="/driving-directions" className="text-accent hover:underline">driving directions</Link>.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">Can I download this interactive world map?</h2>
            <p className="mt-3 text-fg-muted leading-relaxed">
              This <strong className="text-fg">interactive map</strong> runs in the browser and has no download button; it needs an internet connection to load each area as you zoom. For a <strong className="text-fg">free interactive world map download</strong> to use offline, the map data behind it is open: OpenStreetMap data is free to download and reuse under the 
              <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener" className="text-accent underline">Open Database License</a>, and offline map apps such as Organic Maps and OsmAnd use it. For a picture of the world map, take a screenshot and keep the credit &ldquo;&copy; OpenStreetMap contributors, &copy; CARTO&rdquo;.
            </p>
            <h3 className="font-display text-lg font-bold mt-5">How to download a map of your location for offline use</h3>
            <ol className="mt-2 space-y-1.5 text-fg-muted list-decimal list-inside leading-relaxed">
              <li><strong className="text-fg">Google Maps app</strong> (Android and iPhone): tap your profile picture &rarr; <em>Offline maps</em> &rarr; <em>Select your own map</em>, drag the box over your town or region, then tap <em>Download</em>. Directions and search keep working there without signal.</li>
              <li><strong className="text-fg">Organic Maps or OsmAnd</strong> (free, OpenStreetMap data): open the app, find your area, and accept the prompt to download that country or region. Whole countries download, not only a box.</li>
              <li><strong className="text-fg">A picture of one spot:</strong> tap <em>My location</em> on the map above, zoom to the area you need, and take a screenshot. It is an image, so it will not update or let you search.</li>
            </ol>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">Three things you can do here</h2>
            <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
              <li><strong>Find any location.</strong> Type a city, ZIP or postal code, or full street address and the map jumps to it.</li>
              <li><strong>Read coordinates anywhere.</strong> Click on the map to drop a pin. The exact latitude and longitude appear below the map.</li>
              <li><strong>Centre on your current location.</strong> Tap the &ldquo;My location&rdquo; button and the map jumps to your GPS position, if you allow the browser&rsquo;s location prompt.</li>
            </ul>
            <p className="mt-3 text-fg-muted leading-relaxed">
              To read your own position with a full accuracy radius and a resolved street address rather than
              just a map pin, use the{' '}
              <Link href="/my-location" className="text-accent hover:underline">My Location tool</Link>.
              If you have a coordinate in DMS or UTM and need it in decimal degrees before searching, the{' '}
              <Link href="/coordinates-converter" className="text-accent hover:underline">Coordinates Converter</Link>{' '}
              handles the translation. To go from a place name to coordinates (or back), try the{' '}
              <Link href="/address-finder" className="text-accent hover:underline">Address Finder</Link>.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">Coordinate reference for major US cities</h2>
            <p className="mt-3 text-fg-muted leading-relaxed">
              Handy starting points if you want to jump the map somewhere specific, or check a coordinate you
              have been given against a known city centre. Latitude first, longitude second, as always.
            </p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-line">
                    <th className="py-2 pr-4 font-semibold text-fg">City</th>
                    <th className="py-2 pr-4 font-semibold text-fg">Latitude</th>
                    <th className="py-2 font-semibold text-fg">Longitude</th>
                  </tr>
                </thead>
                <tbody className="text-fg-muted">
                  {[
                    ['New York, NY', '40.7128', '-74.0060'],
                    ['Los Angeles, CA', '34.0522', '-118.2437'],
                    ['Chicago, IL', '41.8781', '-87.6298'],
                    ['Houston, TX', '29.7604', '-95.3698'],
                    ['Miami, FL', '25.7617', '-80.1918'],
                    ['Seattle, WA', '47.6062', '-122.3321'],
                    ['Denver, CO', '39.7392', '-104.9903'],
                  ].map(([c, lat, lon]) => (
                    <tr key={c} className="border-b border-line-subtle">
                      <td className="py-2 pr-4">{c}</td>
                      <td className="py-2 pr-4 font-mono">{lat}</td>
                      <td className="py-2 font-mono">{lon}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold">Related tools</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
              {[
                { href: '/my-location', t: 'My Location' },
                { href: '/street-view', t: 'Street View' },
                { href: '/driving-directions', t: 'Driving Directions' },
                { href: '/distance-calculator', t: 'Distance Calculator' },
              ].map((t) => (
                <Link key={t.href} href={t.href} className="glass rounded-2xl p-4 hover:ring-accent/40 ring-1 ring-line transition no-underline">
                  <h3 className="font-display text-base font-bold text-fg hover:text-accent transition">{t.t}</h3>
                </Link>
              ))}
            </div>
          </section>
        </article>
        <AuthorBio />
      </main>
    </>
  );
}
