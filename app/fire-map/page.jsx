import Link from 'next/link';
import { breadcrumbSchema } from '../components/breadcrumbSchema.js';
import Tool from './Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';
import AdSense from '../components/AdSense.jsx';
import { AUTHOR } from '../components/author.js';
import SideAd from '../components/SideAd.jsx';

export const metadata = {
  title: 'Live Fire Map: Bushfires & Wildfires Near You (24 Hours)',
  description:
    'Satellite-detected fires near you in the last 24 hours, with distance, direction and time. Australia, New Zealand, the US and worldwide.',
  keywords: ['fire map', 'bushfire map', 'fires near me', 'wildfire map', 'bushfires near me', 'live fire map', 'wildfires near me', 'nasa fire map'],
  alternates: { canonical: '/fire-map' },
  openGraph: {
    title: 'Live Fire Map: Bushfires & Wildfires Near You (24 Hours)',
    description: 'Satellite fire hotspots near you in the last 24 hours, with distance and direction. Australia, New Zealand, US and worldwide.',
    url: 'https://getmylocations.com/fire-map',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Fire Map: Bushfires & Wildfires Near You (24 Hours)',
    description: 'Satellite fire hotspots near you in the last 24 hours, with distance and direction.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Live Fire Map',
  description:
    'Free map of satellite-detected fire hotspots from the last 24 hours (NASA FIRMS, VIIRS), showing how many lie within a chosen distance of your location or any place, and the distance, direction and detection time of the nearest ones.',
  url: 'https://getmylocations.com/fire-map',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'GetMyLocations' },
  author: AUTHOR,
};

const link = 'text-accent hover:underline';

const OFFICIAL = [
  ['New South Wales', 'NSW Rural Fire Service and its Fires Near Me app', 'https://www.rfs.nsw.gov.au/'],
  ['Victoria', 'VicEmergency', 'https://emergency.vic.gov.au/'],
  ['Western Australia', 'Emergency WA', 'https://www.emergency.wa.gov.au/'],
  ['South Australia', 'Country Fire Service (CFS)', 'https://www.cfs.sa.gov.au/'],
  ['New Zealand', 'Fire and Emergency New Zealand', 'https://www.fireandemergency.nz/'],
  ['United States', 'InciWeb, for large wildfires, plus your county alerts', 'https://inciweb.wildfire.gov/'],
];

const faqs = [
  {
    q: 'Is this an official fire warning service?',
    a: 'No. The map shows where satellites detected heat in the last 24 hours. It does not show which way a fire is moving, how dangerous it is, or whether you need to leave. Warnings, evacuation advice and road closures come only from your state or national fire and emergency service. If you see fire or smoke threatening life or property, call 000 in Australia, 111 in New Zealand, or 911 in the US and Canada.',
  },
  {
    q: 'How up to date is the fire map?',
    a: 'It shows detections from the last 24 hours. NASA publishes each satellite pass within about three hours, and the Suomi NPP and NOAA-20 satellites each pass over a given place about twice a day, so a fire can burn for several hours before it appears. Hover over a dot, or look at the table, for the exact time it was detected.',
  },
  {
    q: 'Why is there a fire dot where there is no fire?',
    a: 'A hotspot is any 375 m pixel that was much hotter than its surroundings. Most are bushfires, grass fires or planned burns, but gas flares, steel works, volcanoes and large sun-heated surfaces can also trigger one. We hide the low-confidence detections, which are most often false alarms.',
  },
  {
    q: 'Why is a fire I know about missing?',
    a: 'Thick cloud or smoke can hide a fire from the satellite, small or slow-burning fires may not be hot enough to detect, and a fire that started after the last satellite pass will not appear yet. That is another reason to rely on official warnings, which combine reports from the ground.',
  },
  {
    q: 'Does it work outside Australia?',
    a: 'Yes. It uses NASA regional files for Australia and New Zealand, the United States, Alaska, Canada and Europe, and the worldwide file everywhere else. Search for any town or click the map to check it.',
  },
];

export default function FireMapPage() {
  const crumbs = breadcrumbSchema([{ name: 'Fire Map', path: '/fire-map' }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      {/* Banner ads only, as on every page. The native banner sits at the
          end of the guide and the side rail beside it; neither covers the map.
          AdSense stays opt-in. */}
      <AdSense />

      <main role="main" className="max-w-5xl mx-auto px-5 py-10">
        <nav aria-label="Breadcrumb" className="text-xs text-fg-subtle mb-3">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-fg-muted">Fire Map</li>
          </ol>
        </nav>

        <section className="mb-6">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · Satellite data, last 24 hours</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Live fire map: <span className="text-accent">bushfires and wildfires near you</span>
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            See where satellites have <strong>detected fires in the last 24 hours</strong>, <strong>how far the nearest one is from you</strong>, and in which direction. Works in Australia, New Zealand, the US and worldwide. Free, no signup.
          </p>
        </section>

        <div role="note" className="mb-6 rounded-xl border border-amber-400/50 bg-amber-500/10 p-4 text-sm text-fg-muted leading-relaxed">
          <strong className="text-fg">This is not a warning service.</strong> For warnings and evacuation advice, follow your local fire service. In an emergency call <strong className="text-fg">000</strong> (Australia), <strong className="text-fg">111</strong> (New Zealand) or <strong className="text-fg">911</strong> (US and Canada).
        </div>

        <Tool />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">How to check for fires near you</h2>
          <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside leading-relaxed">
            <li><strong className="text-fg">Choose the place.</strong> Press &ldquo;Fires near me&rdquo; to use your location, search for a town, address or postcode, or click anywhere on the map.</li>
            <li><strong className="text-fg">Choose the distance.</strong> Pick 10 to 500 km, or switch to miles. The blue circle shows the area being checked.</li>
            <li><strong className="text-fg">Read the result.</strong> The box says how many hotspots lie inside the circle and how far and in which direction the nearest one is. The table lists the ten nearest; &ldquo;Show&rdquo; zooms the map to one.</li>
            <li><strong className="text-fg">Check the official source.</strong> If anything is close, open your fire service&rsquo;s map or app for warnings, which the satellite data cannot give you.</li>
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Official fire warnings</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Fire services combine satellite data with reports from crews, aircraft and the public, and they are the only source of warnings and evacuation orders. Use them alongside this map:
          </p>
          <ul className="mt-3 space-y-1.5 text-fg-muted list-disc list-inside leading-relaxed">
            {OFFICIAL.map(([where, who, href]) => (
              <li key={where}><strong className="text-fg">{where}:</strong>{' '}<a href={href} target="_blank" rel="noopener" className={link}>{who}</a></li>
            ))}
            <li><strong className="text-fg">Queensland, Tasmania, the ACT and the NT:</strong> your state or territory fire and emergency service.</li>
          </ul>
          <p className="mt-3 text-fg-muted leading-relaxed">
            In Australia, warnings follow the Australian Warning System&rsquo;s three levels: <strong className="text-fg">Advice</strong>, <strong className="text-fg">Watch and Act</strong>, and <strong className="text-fg">Emergency Warning</strong>, the highest, when you may need to act immediately. Separately, the daily Fire Danger Rating (Moderate, High, Extreme or Catastrophic) tells you how dangerous a fire would be if one started.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Where the fire data comes from</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The dots are &ldquo;active fire&rdquo; detections from the VIIRS instrument on two polar-orbiting satellites, Suomi NPP and NOAA-20, published by NASA&rsquo;s{' '}
            <a href="https://firms.modaps.eosdis.nasa.gov/" target="_blank" rel="noopener" className={link}>Fire Information for Resource Management System (FIRMS)</a>. VIIRS sees the ground in pixels about 375 m across and flags a pixel when it is much hotter than the land around it, by day and by night.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The colors show how long ago each detection was made: red for under 6 hours, orange for 6 to 12 hours, and yellow for 12 to 24 hours. Larger dots mark stronger fires (more than 50 megawatts of radiated heat). A dot is the center of a hot pixel, not the edge of a fire front, and one large fire usually shows up as a cluster of dots.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">What the map cannot tell you</h2>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside leading-relaxed">
            <li><strong className="text-fg">Where the fire is now.</strong> A detection is a snapshot from the moment the satellite passed. Fires can move many kilometres in a few hours on a hot, windy day.</li>
            <li><strong className="text-fg">Fires hidden by cloud or smoke,</strong> or too small or cool to detect.</li>
            <li><strong className="text-fg">Whether a fire is under control,</strong> a planned burn, or an emergency. Only the fire service knows.</li>
          </ul>
          <p className="mt-3 text-fg-muted leading-relaxed">
            If you are in a bushfire-prone area, make a bushfire plan before the season, and decide in advance when you would leave. Leaving early is the safest option.
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
              { href: '/my-location', t: 'My Location', d: 'Your coordinates to give emergency services' },
              { href: '/radius-map', t: 'Radius Map', d: 'Draw a circle around a place' },
              { href: '/satellite', t: 'Satellite View', d: 'See an area from above' },
              { href: '/distance-calculator', t: 'Distance Calculator', d: 'Exact distance between two points' },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="glass rounded-2xl p-4 hover:ring-accent/40 ring-1 ring-line transition no-underline">
                <h3 className="font-display text-base font-bold text-fg hover:text-accent transition">{t.t}</h3>
                <p className="text-xs text-fg-subtle mt-1">{t.d}</p>
              </Link>
            ))}
          </div>
        </section>
        <SideAd />
        <AuthorBio />
      </main>
    </>
  );
}
