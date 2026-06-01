import PageLayout from '../components/PageLayout.jsx';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <PageLayout title="About">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">About GetMyLocations</h1>
      <p className="mt-4 text-slate-300/90 leading-relaxed">
        GetMyLocations is a free geolocation tool that detects your current
        location using a combination of IP, Wi-Fi, and GPS signals and shows
        your exact latitude, longitude, city, and country on an interactive
        map — instantly, in your browser. The site is built and maintained by
        a small team focused on geolocation, mapping, and online privacy.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">Our mission</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        We believe finding your own location shouldn&rsquo;t require signing up
        or installing an app. GetMyLocations runs 100% client-side: your
        coordinates are processed in your browser and never sent to a server
        we operate, and the map is powered by free, open-source OpenStreetMap
        data. See our <a className="text-electric-400 hover:underline" href="/privacy-policy">Privacy Policy</a> for
        details on third-party services we use, including reverse-geocoding
        APIs and advertising.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Beyond the core tool, we publish in-depth editorial guides on
        geolocation, GPS technology, IP networking, and digital privacy. Every
        article is written from primary sources &mdash; the W3C Geolocation
        API specification, Regional Internet Registry documentation, GNSS
        provider publications, browser vendor implementation notes &mdash; and
        verified against current behavior in real browsers and devices.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">Who it&rsquo;s for</h2>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li>Travelers verifying their GPS coordinates abroad.</li>
        <li>Developers testing geolocation APIs and reverse-geocoding pipelines.</li>
        <li>Field workers and surveyors needing quick latitude/longitude lookups.</li>
        <li>Hikers, sailors, and emergency volunteers who occasionally need to read coordinates off a screen for a dispatcher.</li>
        <li>Curious people who want to know &ldquo;what is my exact location right now?&rdquo; without installing yet another app.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-10">Editorial standards</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Articles are reviewed before publication for technical accuracy and
        kept up to date as standards and browser implementations evolve.
        Substantive corrections are noted in the article. Our content covers
        topics including:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><Link to="/blog/how-gps-works" className="text-electric-400 hover:underline">How GPS satellites compute a position</Link></li>
        <li><Link to="/blog/what-is-ip-location-and-how-accurate" className="text-electric-400 hover:underline">How accurate IP geolocation really is</Link></li>
        <li><Link to="/blog/browser-geolocation-api-explained" className="text-electric-400 hover:underline">What websites can and can&rsquo;t see through the browser Geolocation API</Link></li>
        <li><Link to="/blog/gps-coordinates-emergencies-aml-guide" className="text-electric-400 hover:underline">Using GPS coordinates in emergencies (AML / 911 / 112)</Link></li>
        <li><Link to="/blog/how-to-share-gps-location-safely" className="text-electric-400 hover:underline">Sharing your live location safely across iMessage, WhatsApp, Maps, and Signal</Link></li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-10">About the author</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        GetMyLocations is run by <strong className="text-slate-100">Ahmed Anwar</strong>, an
        independent software developer with hands-on experience building geolocation
        tooling, reverse-geocoding pipelines, and map-based web applications.
        He has been working with the W3C Geolocation API, OpenStreetMap, and
        commercial geocoding APIs (BigDataCloud, Nominatim, Mapbox) for
        several years across freelance and product engagements.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Editorial decisions, content review, and tool development are all his.
        Reader questions, corrections, and topic suggestions are very welcome
        &mdash; see the <Link to="/contact" className="text-electric-400 hover:underline">Contact page</Link> for
        the best way to reach him.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">Privacy &amp; trust</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        We don&rsquo;t collect personal information through the core tool. Your
        GPS coordinates are processed in your browser; we do not store them.
        We do integrate third-party services for advertising
        (Google AdSense), reverse geocoding (BigDataCloud / OpenStreetMap
        Nominatim), and hosting (Cloudflare), each of which has its own
        privacy practices. Full details are in the <a className="text-electric-400 hover:underline" href="/privacy-policy">Privacy Policy</a> and
        the use terms in our <a className="text-electric-400 hover:underline" href="/terms">Terms of Service</a>.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">Built with</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        React, Tailwind CSS, Leaflet, and OpenStreetMap. Deployed on
        Cloudflare. Open standards at heart, built to last.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">Contact</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Email <a className="text-electric-400 hover:underline" href="mailto:hello@getmylocations.com">hello@getmylocations.com</a> for
        questions, feedback, corrections, partnership ideas, or to report a bug. We typically reply within 24 hours.
      </p>
    </PageLayout>
  );
}
