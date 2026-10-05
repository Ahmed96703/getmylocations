import Link from 'next/link';
import { breadcrumbSchema } from '../components/breadcrumbSchema.js';

export const metadata = {
  title: 'About — GetMyLocations',
  description: 'Free, privacy-first location tools. Built by Ahmed Anwar — geolocation, GPS, and IP networking guides written from primary sources.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About — GetMyLocations',
    description:
      'Why GetMyLocations exists, how the tools are tested, and how the writing is reviewed.',
    url: 'https://getmylocations.com/about',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — GetMyLocations',
    description:
      'Why GetMyLocations exists, how the tools are tested, and how the writing is reviewed.',
    images: ['/og-image.png'],
  },
};

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': 'https://getmylocations.com/about',
  name: 'About Ahmed Anwar — GetMyLocations',
  url: 'https://getmylocations.com/about',
  mainEntity: {
    '@type': 'Person',
    '@id': 'https://getmylocations.com/about#ahmed-anwar',
    name: 'Ahmed Anwar',
    jobTitle: 'Senior Software Engineer',
    url: 'https://getmylocations.com/about',
    worksFor: {
      '@type': 'Organization',
      name: 'GetMyLocations',
      url: 'https://getmylocations.com/',
    },
    description:
      'Senior software engineer based in Karachi, Pakistan. Builds geolocation tools, mapping pages, and coordinate utilities. Writes about GPS, browser geolocation, and IP geolocation.',
    knowsAbout: [
      'GPS',
      'Browser Geolocation API',
      'IP Geolocation',
      'Leaflet',
      'OpenStreetMap',
      'React',
      'Next.js',
    ],
  },
};

export default function About() {
  const crumbs = breadcrumbSchema([{ name: 'About', path: '/about' }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <main role="main" className="max-w-3xl mx-auto px-5 py-12 prose-invert">
        <nav aria-label="Breadcrumb" className="text-xs text-fg-subtle mb-3">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-fg-muted">About</li>
          </ol>
        </nav>

      <h1 className="font-display text-4xl font-extrabold tracking-tight">About GetMyLocations</h1>
      <p className="mt-2 text-sm text-fg-subtle">Last reviewed October 1, 2026 · Tested on real devices before publish</p>
      <p className="mt-4 text-fg-muted leading-relaxed">
        GetMyLocations is a small independent site that does one thing: it reads
        your GPS coordinates straight from the browser and turns them into a
        place name you can copy, share, or feed into a map. The site also hosts
        a handful of related tools (IP lookup, coordinate-format conversion,
        distance between two points) and a growing set of articles explaining
        how the underlying systems actually work.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">Why this site exists</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Most &ldquo;find my location&rdquo; pages on the web are wrappers around an
        ad-loaded IP lookup, which is why they place you in the wrong city
        about half the time. The browser already has a high-accuracy geolocation
        API that asks the operating system for a real GPS fix &mdash; the same
        signal Maps uses for turn-by-turn directions. GetMyLocations uses that
        API directly, in your browser, and never sends the coordinate to a
        server we run. The reverse-geocoding lookup that turns the coordinate
        into a city name goes to a third party (BigDataCloud or OpenStreetMap
        Nominatim) and the response stays in the tab. The{' '}
        <Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>{' '}
        lists every third party in plain language.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">About Ahmed Anwar</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        I&rsquo;m <strong className="text-fg">Ahmed Anwar</strong>, a
        senior software engineer based in Karachi, Pakistan, and I build this site independently. I&rsquo;ve been
        building production web apps for roughly five years, mostly around
        React, Next.js, and the kind of mapping tooling this site is built on
        &mdash; Leaflet, OpenStreetMap tiles, browser geolocation, and the
        free-tier IP-geolocation APIs you see referenced throughout the guides.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The reason I&rsquo;m comfortable writing about this stuff is that I
        ship it. Every tool on this site &mdash; the my-location reader, the
        coordinates converter with live UTM math, the distance calculator using
        the haversine formula, the driving-directions embed &mdash; I wrote and
        debugged personally, on real devices, in real browsers, with the same
        API rate limits and CORS quirks any other developer would hit. The
        articles explain what I learned while building.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">How the writing is done</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Honest disclosure: the long-form articles and guides on this site are
        researched and drafted with the help of an AI writing assistant, then
        edited and fact-checked by me before they go live. I add the specific
        numbers, name the APIs the tools actually call, and cut anything that
        reads like filler. The code for every tool is hand-written and tested
        on a real phone and laptop before it ships. If you ever spot something
        that&rsquo;s wrong, vague, or feels generated, email me at the address
        below &mdash; corrections go up the same day and are logged in{' '}
        <a href="#corrections" className="text-accent hover:underline">Corrections</a> below.
      </p>

      <h2 id="corrections" className="font-display text-2xl font-bold mt-10">Corrections</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Mistakes that made it past review, and what changed. Typos and
        wording tweaks are not listed; anything that was factually wrong is.
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li><strong>October 1, 2026 &mdash; <Link href="/blog/why-maps-show-wrong-street" className="text-accent hover:underline">Why maps show the wrong street</Link>.</strong> Said address interpolation dates back to 1800s surveyors. It went mainstream with the US Census Bureau&rsquo;s DIME files for the 1970 census and the later TIGER files.</li>
        <li><strong>October 1, 2026 &mdash; <Link href="/gps-vs-ip-accuracy" className="text-accent hover:underline">GPS vs IP accuracy</Link>.</strong> Blamed a slow first GPS fix on downloading the almanac. The receiver is waiting for each satellite&rsquo;s ephemeris, which repeats every 30 seconds.</li>
        <li><strong>October 1, 2026 &mdash; <Link href="/live-location" className="text-accent hover:underline">Live Location</Link>.</strong> Android steps named a &ldquo;High accuracy&rdquo; mode removed in Android 10, and a tip about tethering a laptop to a phone&rsquo;s GPS described a feature macOS and Windows do not have. The page also promised the place-name lookup runs at most once every 10 seconds, but the code could run it more often while driving; the code now keeps that promise. Its description and intro also said &ldquo;nothing leaves the page,&rdquo; although the place-name lookup is sent to OpenStreetMap, and quoted a battery cost of 5&ndash;12% per hour with no source; both are corrected.</li>
        <li><strong>October 1, 2026 &mdash; <Link href="/driving-directions" className="text-accent hover:underline">Driving Directions</Link>.</strong> The FAQ said leaving the origin empty uses your location; it shows an error instead. The &ldquo;Use my location&rdquo; button is the way. A 1.4&times; road-to-straight-line ratio was described as unusual when it is the US average.</li>
        <li><strong>October 1, 2026 &mdash; <Link href="/" className="text-accent hover:underline">Homepage</Link>.</strong> Claimed eleven tools (there are nine), said &ldquo;no tracking&rdquo; although Google AdSense runs on the site, and named only OpenStreetMap as the reverse-geocoding service when BigDataCloud is tried first.</li>
        <li><strong>October 1, 2026 &mdash; <Link href="/my-location" className="text-accent hover:underline">My Location</Link>.</strong> Said six decimal places is about one meter; it is about 11 centimeters. The <Link href="/coordinates-converter" className="text-accent hover:underline">Coordinates Converter</Link> FAQ said phones deliver five-decimal (~1.1 m) precision; they typically manage 3&ndash;5 m.</li>
        <li><strong>October 5, 2026 &mdash; <Link href="/coordinates-converter" className="text-accent hover:underline">Coordinates Converter</Link>.</strong> The reference table&rsquo;s UTM values had been typed in by hand and were up to 237 m off (Sydney Opera House); they are now generated by the converter&rsquo;s own code and checked against an independent library. The page also claimed the tool flagged out-of-range values (it did not), honoured the Svalbard UTM zone exceptions (only Norway&rsquo;s was implemented), and showed a live map (there was none). Editing a DMS field also left the UTM and DDM results stale. All of these are now fixed in the tool itself.</li>
        <li><strong>October 5, 2026 &mdash; <Link href="/ip-location" className="text-accent hover:underline">IP Location Lookup</Link>.</strong> Two answers said the lookup shows whether you are on a residential, mobile, hosting, or VPN connection; the tool has never shown a connection type. The page also gave two different, unsourced sets of accuracy figures; they are replaced with MaxMind&rsquo;s published estimates. The page now also names the database it uses (ipapi.co).</li>
        <li><strong>October 5, 2026 &mdash; <Link href="/distance-calculator" className="text-accent hover:underline">Distance Calculator</Link>.</strong> Clicking a preset or the swap button showed the previous pair&rsquo;s distance and bearing (London to Paris displayed 5,837 km). The reference table promised results within one kilometre but three rows were 8 to 17 km off, and the page understated the spherical formula&rsquo;s error (up to about 0.56%, not &ldquo;typically under 0.5%&rdquo;). The tool now calculates on the WGS 84 ellipsoid, the table is generated from its own code, and both are checked against the GeographicLib reference library.</li>
        <li><strong>October 5, 2026 &mdash; <Link href="/address-finder" className="text-accent hover:underline">Address Finder</Link>.</strong> The worked-examples table no longer matched what the tool returns (the Statue of Liberty&rsquo;s coordinates resolve to Flagpole Plaza and the Sydney Opera House&rsquo;s to a nearby public toilet, not the landmarks the table claimed); it is replaced with dated real lookups. The FAQ also promised a confidence score the tool never showed and told readers to tap a Search button that did not exist.</li>
        <li><strong>October 5, 2026 &mdash; <Link href="/street-view" className="text-accent hover:underline">Street View</Link>.</strong> The tool never showed a Street View panorama: the embed it used displayed an ordinary map for addresses and a blank box for coordinates, while the page described navigation arrows, a capture date in the corner, and a panorama that &ldquo;jumps to the Eiffel Tower&rdquo;. It also said Google had covered about five million miles; Google&rsquo;s own figure is over 10 million. The tool now pins the exact spot and opens the real panorama through Google&rsquo;s official Street View link.</li>
        <li><strong>October 5, 2026 &mdash; <Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>.</strong> Listed CARTO as a map-tile provider after the site had stopped using it, and did not mention the Google Maps embeds on the Driving Directions and Street View pages. Both are corrected.</li>
        <li><strong>October 5, 2026 &mdash; <Link href="/driving-directions" className="text-accent hover:underline">Driving Directions</Link>.</strong> The embedded Google map never drew a route, yet the page said the route, its traffic-adjusted travel time, and turn-by-turn steps were shown on the page. The tool now previews both places with the straight-line distance and opens the real route in Google Maps; the page describes exactly that.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-10">Contact</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Email <a className="text-accent hover:underline" href="mailto:ahmed@getmylocations.com">ahmed@getmylocations.com</a> for
        questions, feedback, corrections, or partnership ideas. I read everything;
        I reply to most things within a day or two.
      </p>
    </main>
    </>
  );
}
