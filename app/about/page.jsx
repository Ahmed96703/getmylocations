import Link from 'next/link';

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

export default function About() {
  return (
    <main role="main" className="max-w-3xl mx-auto px-5 py-12 prose-invert">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">About GetMyLocations</h1>
      <p className="mt-2 text-sm text-fg-subtle">Last reviewed June 3, 2026 · Tested on real devices before publish</p>
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
        I&rsquo;m <strong className="text-fg">Ahmed Anwar</strong>, an
        independent web developer based in Karachi, Pakistan. I&rsquo;ve been
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
        below &mdash; corrections go up the same day.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">Contact</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Email <a className="text-accent hover:underline" href="mailto:hello@getmylocations.com">hello@getmylocations.com</a> for
        questions, feedback, corrections, or partnership ideas. I read everything;
        I reply to most things within a day or two.
      </p>
    </main>
  );
}
