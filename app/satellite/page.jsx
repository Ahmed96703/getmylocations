import Link from 'next/link';
import { breadcrumbSchema } from '../components/breadcrumbSchema.js';
import Tool from './Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';
import AdSense from '../components/AdSense.jsx';
import Monetag from '../components/Monetag.jsx';
import { AUTHOR } from '../components/author.js';
import NativeAd from '../components/NativeAd.jsx';
import SideAd from '../components/SideAd.jsx';

export const metadata = {
  title: 'Google Maps Satellite View Free: Satellite Map of Any Address',
  description:
    'Free satellite view of any address, like Google Maps satellite view, with the most up-to-date satellite images and the date each photo was taken. No signup.',
  keywords: [
    'satellite view', 'satellite view of my house', 'satellite map', 'satellite view by address', 'free satellite view', 'satellite image date', 'aerial view',
    'google maps satellite view', 'google maps satellite view free', 'google maps satellite view location', 'google satellite view', 'google map satellite view',
    'google earth satellite view free', 'google earth view', 'satellite view of my location', 'satellite maps of my location', 'aerial view of my house',
    'aerial view of property by address', 'free live satellite view street address', 'satellite maps street view', 'live satellite view',
    'up to date satellite images', 'updated satellite images', 'most recent satellite images', 'most up to date satellite images',
    'most up to date satellite maps', 'latest satellite imagery', 'satellite imagery', 'satellite maps',
  ],
  alternates: { canonical: '/satellite' },
  openGraph: {
    title: 'Google Maps Satellite View Free: Satellite Map of Any Address',
    description: 'See any address from above with up-to-date satellite images, and find out when the photo was taken. Free, no signup.',
    url: 'https://getmylocations.com/satellite',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Maps Satellite View Free: Satellite Map of Any Address',
    description: 'See any address from above with up-to-date satellite images, and find out when the photo was taken.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Satellite View',
  description:
    'Free satellite map of any address or coordinate, with the capture date, resolution, and provider of the photo on screen, optional place-name and road overlays, and shareable links.',
  url: 'https://getmylocations.com/satellite',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'GetMyLocations' },
  author: AUTHOR,
  dateModified: '2026-10-23',
};

// Capture dates read from Esri's imagery metadata on 15 October 2026. The
// mosaic is updated over time, so the tool always shows the live value.
const SAMPLES = [
  { place: 'Eiffel Tower, Paris', date: '12 April 2025', res: '46 cm', kind: 'Satellite (Vantor Vivid Advanced)' },
  { place: 'Statue of Liberty, New York', date: '11 May 2025', res: '50 cm', kind: 'Satellite (Vantor Vivid Advanced)' },
  { place: 'Badshahi Mosque, Lahore', date: '15 October 2025', res: '50 cm', kind: 'Satellite (Vantor Vivid Advanced)' },
  { place: 'Pyramids of Giza', date: '17 April 2025', res: '50 cm', kind: 'Satellite (Vantor Vivid Advanced)' },
  { place: 'Rural Nebraska, USA', date: '2 October 2025', res: '31 cm', kind: 'Satellite (Vantor Vivid)' },
];

// Ready-made views: #zoom/lat/lon opens the map at that spot.
const VIEWS = [
  { place: 'Statue of Liberty, New York', hash: '17/40.68925/-74.04450' },
  { place: 'Olvera, Andalusia, Spain (white hill town)', hash: '16/36.93490/-5.26012' },
  { place: 'Colorful rooftops of Burano, Venice', hash: '17/45.48540/12.41680' },
  { place: 'Eiffel Tower, Paris', hash: '17/48.85837/2.29448' },
  { place: 'Pyramids of Giza, Egypt', hash: '16/29.97650/31.13090' },
  { place: 'Badshahi Mosque, Lahore', hash: '17/31.58800/74.30960' },
];

const faqs = [
  {
    q: 'Is this Google Maps satellite view?',
    a: 'It works the same way, but the photos come from Esri\'s World Imagery rather than Google, and this map tells you the date each photo was taken, which Google Maps does not. To see Google\'s own picture of the same spot, press "Open this view in Google Maps satellite view" under the map. Both are free.',
  },
  {
    q: 'How do I see a satellite view of my location?',
    a: 'Press "My location" above the map and allow location access. The map centres on where you are, at street level, with the capture date of the photo shown under it. Your position stays in your browser and is not sent to us.',
  },
  {
    q: 'Is there a free alternative to Google Earth satellite view?',
    a: 'Yes. This page shows free satellite and aerial imagery of the whole world in your browser, with no download and no account, and opens any spot in Google Maps or Google Street View with one click. Google Earth adds 3D buildings and historical imagery; this map adds the capture date and source of every photo.',
  },
  {
    q: 'Is this a live satellite view?',
    a: 'No, and no free service is. The detailed imagery on this page, on Google Maps, and on Bing Maps is a mosaic of photos taken months or years ago. The panel under the map tells you exactly when the photo you are looking at was taken. Satellites that do image the whole Earth continuously, such as weather satellites, see details of around half a kilometre at best, enough for clouds but not for buildings.',
  },
  {
    q: 'How do I see my house from a satellite?',
    a: 'Type your address into the search box and press Search, or press "My location" to centre the map on where you are. The map zooms to street level. Turn on Place labels or Roads if you need help getting your bearings, and click the map to drop a pin on the exact building.',
  },
  {
    q: 'Why does Google Maps show a different picture of my house?',
    a: 'Google, Apple, Bing, and Esri buy imagery from different providers and update different areas at different times, so the same address can show a different season, a different year, or even a building that has since been demolished. Use "Compare in Google Maps" under the map to open the same spot in Google\'s satellite view.',
  },
  {
    q: 'How detailed is the imagery?',
    a: 'In most towns and cities it is 30 to 50 cm per pixel, so a car covers roughly ten pixels: you can see cars, trees, swimming pools, and roof shapes, but not number plates or faces. Some cities have aerial photography down to about 15 cm. Remote areas can be much coarser, and zoomed out you see a 15 m global mosaic.',
  },
  {
    q: 'Can I ask for my house to be blurred?',
    a: 'Satellite and aerial imagery providers generally do not blur individual homes on request, because the photos are taken from directly above and do not show anything a passer-by could not see. Street-level photos are different: Google Street View and Apple Look Around both accept blur requests for houses, faces, and number plates.',
  },
];

export default function SatellitePage() {
  const crumbs = breadcrumbSchema([{ name: 'Satellite View', path: '/satellite' }]);
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
            <li className="text-fg-muted">Satellite View</li>
          </ol>
        </nav>

        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · Satellite Imagery</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Google Maps Satellite View
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            See any address from above in <strong className="text-fg">free satellite view</strong>, just like Google Maps satellite view, with <strong className="text-fg">up-to-date satellite images</strong> and the exact date each photo was taken: under the map, the tool shows the capture date, how sharp the image is, and who took it, so you know whether you are looking at last spring or five years ago. Search an address, a place, or coordinates in any format for a <strong className="text-fg">satellite view by address</strong>, or press <strong className="text-fg">My location</strong> for a <strong className="text-fg">satellite view of your location</strong>. One click opens the same spot in Google Maps. Free, no signup, no API key.
          </p>
          <p className="mt-3 text-sm text-fg-subtle">
            Last updated <time dateTime="2026-10-23">October 23, 2026</time> by{' '}
            <Link href="/about" className="text-accent hover:underline">Ahmed Anwar</Link>.
          </p>
        </section>

        <Tool />
        <NativeAd />
        <SideAd />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">How to see any address from above</h2>
          <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside leading-relaxed">
            <li><strong className="text-fg">Search.</strong> Type a street address, a town, or a landmark. Coordinates work too, in any format: <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">40.6892, -74.0445</code>, degrees-minutes-seconds, UTM, a Plus Code such as <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">8FW4V75V+9R</code>, a geohash, or a Google Maps link.</li>
            <li><strong className="text-fg">Get your bearings.</strong> Place labels are on by default; turn on Roads to see street names and road lines drawn over the photo. Turn both off for a clean image.</li>
            <li><strong className="text-fg">Pin the building.</strong> Click the map to drop a pin and read its exact coordinates, copy them, or open the same point in Google Maps or Street View.</li>
            <li><strong className="text-fg">Check the date.</strong> The imagery panel updates every time you move the map. If the photo is older than you need, compare it with Google&rsquo;s, which is often from a different year.</li>
            <li><strong className="text-fg">Share it.</strong> The address bar always holds the current view, so the copied link opens the same spot at the same zoom.</li>
          </ol>
        </section>


        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Most up-to-date satellite images: check the date</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            People searching for <strong className="text-fg">up-to-date satellite images</strong>, <strong className="text-fg">updated satellite images</strong> or the <strong className="text-fg">most recent satellite images</strong> usually want one thing: to know the photo shows the place as it is now. No free map offers a <strong className="text-fg">live satellite view</strong>, so the honest answer is to show the date. This map does that for every view: the imagery panel under the map gives the capture date, resolution and source of the exact photo you are looking at.
          </p>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside leading-relaxed">
            <li><strong className="text-fg">Big cities and landmarks:</strong> usually photographed within the last one to two years, as the table below shows.</li>
            <li><strong className="text-fg">Towns and suburbs:</strong> typically one to three years old.</li>
            <li><strong className="text-fg">Rural and remote areas:</strong> can be several years old, and zoomed out you see a global mosaic with no single date.</li>
            <li><strong className="text-fg">Need the latest satellite imagery?</strong> Compare with Google Maps satellite view using the link under the map. Different providers update different places, so one of them is often newer.</li>
          </ul>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Because the date is always on screen, these are the <strong className="text-fg">most up-to-date satellite maps</strong> you can check for free without guessing: if the photo is too old for your purpose, you know straight away.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Satellite view of my location, my house or any property</h2>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside leading-relaxed">
            <li><strong className="text-fg">Satellite view of my location:</strong> press My location and allow access to see <strong className="text-fg">satellite maps of my location</strong>. The map jumps to where you are, at street level.</li>
            <li><strong className="text-fg">Aerial view of my house:</strong> for a <strong className="text-fg">satellite view of my house</strong>, type your street address and press Search, then click your roof to pin it.</li>
            <li><strong className="text-fg">Aerial view of a property by address:</strong> search the address, turn on Roads to see the street names, and check the date before relying on what you see.</li>
            <li><strong className="text-fg">Satellite maps with street view:</strong> pin a point and press Street View here to see the same spot from the street, or use our <Link href="/street-view" className="text-accent hover:underline">Street View</Link> tool for any address.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How old is the satellite image?</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            <strong className="text-fg">Satellite images</strong> of major cities on this map are usually less than two years old: the Eiffel Tower, the Statue of Liberty and the Pyramids of Giza were all photographed in 2025. Rural areas can be several years older. The tool shows the exact <strong className="text-fg">satellite image date</strong> for any point you look at.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Most satellite maps never tell you this. The <strong className="text-fg">satellite imagery</strong> here comes from Esri&rsquo;s World Imagery mosaic, and Esri publishes metadata for every photo in it: the capture date, the resolution, the positional accuracy, and the provider. The tool reads that metadata for the point at the centre of your screen, at your current zoom, because a single view can mix several photos taken on different days.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            What we saw when we checked five places on 15 October 2026:
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tint/5 text-left text-fg-muted">
                  <th className="px-3 py-2 font-semibold">Place</th>
                  <th className="px-3 py-2 font-semibold">Captured</th>
                  <th className="px-3 py-2 font-semibold">Resolution</th>
                  <th className="px-3 py-2 font-semibold">Source</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLES.map((s) => (
                  <tr key={s.place} className="border-t border-line-subtle">
                    <td className="px-3 py-2 text-fg-muted">{s.place}</td>
                    <td className="px-3 py-2 text-fg">{s.date}</td>
                    <td className="px-3 py-2 font-mono text-xs text-fg-muted">{s.res}</td>
                    <td className="px-3 py-2 text-fg-muted">{s.kind}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-fg-muted leading-relaxed">
            So well-known places were photographed within the last year or two, but there is no fixed schedule. Big cities and fast-changing areas are refreshed more often; quiet rural areas can wait several years. Esri replaces tiles as new photos arrive, so the panel may show a newer date than the table by the time you read this.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Zoomed out, below roughly city level, you are not looking at one photo at all but at a 15 m-per-pixel global mosaic assembled from many cloud-free scenes, which has no single date. The panel tells you when that is the case.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">What you can and cannot see</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Resolution is the size of the patch of ground one pixel covers. In most towns the imagery here is 30 to 50 cm per pixel, which in practice means:
          </p>
          <ul className="mt-3 space-y-1.5 text-fg-muted list-disc list-inside leading-relaxed">
            <li><strong className="text-fg">Clearly visible:</strong> buildings and roof shapes, driveways, gardens, swimming pools, cars (about ten pixels long), trees, paths, and field boundaries.</li>
            <li><strong className="text-fg">Just about visible:</strong> road markings, garden furniture, people as a dark dot or shadow.</li>
            <li><strong className="text-fg">Not visible:</strong> faces, number plates, house numbers, or anything under a roof or tree canopy.</li>
          </ul>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Everything is seen from straight above, so walls and shopfronts do not appear. For the face of a building, use{' '}
            <Link href="/street-view" className="text-accent hover:underline">Street View</Link>, which shows the street-level photos instead.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Aerial views to try</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Open any of these in free <strong className="text-fg">satellite view</strong>; each link sets the map to the spot and zoom shown, and the panel shows when the photo was taken.
          </p>
          <ul className="mt-3 grid sm:grid-cols-2 gap-2">
            {VIEWS.map((v) => (
              <li key={v.hash}>
                <a href={`/satellite#${v.hash}`} className="block glass rounded-xl px-4 py-3 text-fg hover:text-accent ring-1 ring-line transition no-underline">
                  <strong>Aerial view of {v.place}</strong>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Satellite or aerial photo?</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            &ldquo;<strong className="text-fg">Satellite view</strong>&rdquo; is the everyday name, but the sharpest imagery on any map is often taken from aircraft. Commercial satellites such as those operated by Vantor (formerly Maxar) photograph most of the world at around 30 to 50 cm per pixel. Planes fly lower and can capture 15 cm or finer, so many cities and national mapping programmes use aerial surveys instead. Esri&rsquo;s mosaic mixes both: in New York, for example, its metadata lists a 15 cm aerial survey from 2024 for the very closest zoom level, above 50 cm satellite imagery for everything else. The imagery panel names the source for whatever you are looking at.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Why another map shows a different picture</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            <strong className="text-fg">Google Maps</strong>, Apple Maps, Bing Maps, and Esri each license imagery from different providers and update different places at different times. The same house can appear in summer on one map and in winter on another, with or without a new extension, or with a neighbouring building that has since been knocked down. Shadows point in different directions, and tall buildings lean differently, because each photo was taken from a slightly different angle. When the date matters, the &ldquo;Compare in Google Maps&rdquo; link under the map opens the same point in <strong className="text-fg">Google satellite view</strong> so you can check both.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Google Maps satellite view, Google Earth or this map?</h2>
          <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-tint/5 text-left text-fg-muted">
                  <th className="px-3 py-2 font-semibold"></th>
                  <th className="px-3 py-2 font-semibold">This satellite map</th>
                  <th className="px-3 py-2 font-semibold">Google Maps satellite view</th>
                  <th className="px-3 py-2 font-semibold">Google Earth</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Free', 'Yes', 'Yes', 'Yes'],
                  ['Shows the photo date', 'Yes, for every view', 'No (copyright year only)', 'In historical imagery mode'],
                  ['Imagery source', 'Esri World Imagery (Vantor and aerial surveys)', 'Google’s providers', 'Google’s providers'],
                  ['Street-level photos', 'One click to Google Street View', 'Yes', 'Yes'],
                  ['Needs an app or account', 'No', 'No', 'Web or app, no account'],
                  ['Coordinates in any format', 'Yes: DMS, UTM, Plus Codes, geohash', 'Decimal and Plus Codes', 'Decimal and DMS'],
                ].map((r) => (
                  <tr key={r[0]} className="border-t border-line-subtle">
                    <td className="px-3 py-2 text-fg font-semibold">{r[0]}</td>
                    <td className="px-3 py-2 text-fg-muted">{r[1]}</td>
                    <td className="px-3 py-2 text-fg-muted">{r[2]}</td>
                    <td className="px-3 py-2 text-fg-muted">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Use whichever photo is newer for the place you care about. This map is the quickest way to check the date, and the link under it opens the same spot in <strong className="text-fg">Google Maps satellite view</strong> to compare. For a <strong className="text-fg">Google Earth view</strong> with 3D buildings, open Google Earth on the web: <strong className="text-fg">Google Earth satellite view free</strong> of charge is another option. Both this map and <strong className="text-fg">Google Maps satellite view free</strong> of charge need no account.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">When satellite view beats a regular map</h2>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside leading-relaxed">
            <li>Checking what a property and its surroundings look like before you visit, rent, or buy.</li>
            <li>Confirming a building actually exists at an address you have been given.</li>
            <li>Finding the right entrance, gate, or car park on a large site for a delivery or a meeting.</li>
            <li>Planning a walk or hike where the map lacks detail but the photo shows tracks and clearings.</li>
            <li>Seeing context a map leaves out: is the place in a desert, next to water, surrounded by forest?</li>
          </ul>
          <p className="mt-3 text-fg-muted leading-relaxed">
            For the opposite job, a clean labelled map for finding your way, the{' '}
            <Link href="/maps" className="text-accent hover:underline">interactive map</Link>{' '}
            is a better fit, and{' '}
            <Link href="/driving-directions" className="text-accent hover:underline">Driving Directions</Link>{' '}
            plans the route there.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Where the imagery and searches come from</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The photos and their metadata come from Esri&rsquo;s World Imagery service, which combines imagery from Vantor, Earthstar Geographics, government mapping agencies, and other contributors. The place-label and road overlays are Esri reference layers built from HERE, Garmin, and OpenStreetMap data. Address searches use OpenStreetMap&rsquo;s Nominatim geocoder; coordinates are read in your browser and never sent anywhere. The map requests imagery tiles and metadata for the area you are viewing from Esri&rsquo;s servers, as every web map does. More detail is in our{' '}
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
              { href: '/street-view', t: 'Street View', d: 'See the front of the building' },
              { href: '/maps', t: 'Interactive Maps', d: 'Labelled map with styles' },
              { href: '/address-finder', t: 'Address Finder', d: 'Address ↔ coordinates' },
              { href: '/coordinates-converter', t: 'Coordinates Converter', d: 'DD, DMS, UTM, Plus Codes' },
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
