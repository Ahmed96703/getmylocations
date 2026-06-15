import Link from 'next/link';
import Tool from './Tool.jsx';
import ProofPanel from '../components/ProofPanel.jsx';

export const metadata = {
  title: 'What Is My Location? Find My Current Coordinates — My Location Tool',
  description:
    'What is my location? Find my current coordinates instantly — free tool shows your live GPS coordinates, city, country, and live map in 2 seconds. Get my location free, no signup.',
  keywords: ['my location', 'my current location', 'where am i', 'find my location', 'my location now', 'what is my location'],
  alternates: { canonical: '/my-location' },
  openGraph: {
    title: 'What Is My Location? Find My Current Coordinates — My Location Tool',
    description: 'What is my location? Find your exact GPS location instantly. Free tool, no signup.',
    url: 'https://getmylocations.com/my-location',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is My Location? Find My Current Coordinates — My Location Tool',
    description: 'What is my location? Find your exact GPS location instantly. Free tool, no signup.',
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'My Location Finder',
  description: 'Free browser-based tool that finds your current GPS location and shows it on a live map.',
  url: 'https://getmylocations.com/my-location',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'GetMyLocations' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How does the My Location tool know where I am?', acceptedAnswer: { '@type': 'Answer', text: 'It uses your browser\'s built-in Geolocation API. Your operating system fuses GPS satellite signals, nearby Wi-Fi access points, cell-tower triangulation, and IP geolocation into a single best-guess coordinate.' } },
    { '@type': 'Question', name: 'Why is the location my browser shows wrong?', acceptedAnswer: { '@type': 'Answer', text: 'Common reasons: you are indoors and GPS is weak, you use a VPN that rewrites your IP, battery saver mode is downsampling GPS, or you denied the precise location permission.' } },
    { '@type': 'Question', name: 'Is my location data sent to your servers?', acceptedAnswer: { '@type': 'Answer', text: 'No. Your GPS coordinates are processed in your browser. The optional reverse-geocoding step sends only the coordinates to a third-party service (OpenStreetMap Nominatim).' } },
    { '@type': 'Question', name: 'Does this work on my laptop or desktop?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, but most desktops do not have a GPS chip, so accuracy is lower. The browser falls back to Wi-Fi positioning (10-25 m) or IP geolocation (5-50 km).' } },
    { '@type': 'Question', name: 'What does the accuracy radius mean?', acceptedAnswer: { '@type': 'Answer', text: 'The accuracy value is the radius (in meters) of a circle the device is 95% confident contains your real position.' } },
  ],
};

export default function MyLocationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="max-w-5xl mx-auto px-5 py-10">
        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · Browser-based</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            What is my location? Find my current <span className="text-accent">coordinates</span> right now.
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Click one button and see your exact GPS coordinates, accuracy radius, city, and country on a live interactive map within two seconds. No signup, no app to install, and your coordinates stay in your browser.
          </p>
        </section>

        <Tool />

        <ProofPanel
          title="Phone test: live GPS fix on a real map"
          device="Captured on a phone outdoors in Karachi with the accuracy ring visible, the city label resolved, and the pin anchored to the actual reading."
          caption="This is the kind of first-party proof that makes the page feel trustworthy: a real device, a visible accuracy radius, and a location that can be checked against the map."
          fileHint="/public/screenshots/my-location-phone.png"
        />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">What is the My Location tool?</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The <strong className="text-fg">My Location</strong> tool is a free browser-based utility that answers the simple question — <em>where am I right now?</em> — without making you install an app, sign up for an account, or trust your data to a server we control. When you click the button, your browser asks the operating system for your current position; the operating system combines GPS satellite signals, nearby Wi-Fi access points, cell-tower information, and IP geolocation to produce a single best-guess coordinate.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Behind the scenes the tool calls the W3C Geolocation API — the same standard interface that Google Maps, Uber, and every weather app on the web use. Outdoor accuracy on a phone is typically 3 to 5 meters; indoors or on a desktop, 10 to 50 meters from Wi-Fi positioning.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How to use this tool</h2>
          <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
            <li><strong>Click <em>Find my location</em></strong> above. Your browser shows a permission prompt the first time.</li>
            <li><strong>Click Allow</strong> on the permission prompt. You only do this once per browser per site.</li>
            <li><strong>Wait one or two seconds</strong> while the OS collects GPS / Wi-Fi signals.</li>
            <li><strong>Read the result.</strong> Latitude, longitude, accuracy, altitude, and reverse-geocoded city / country appear in the dashboard.</li>
            <li><strong>Copy or share</strong> the coordinates with one click.</li>
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
          <div className="glass mt-4 rounded-2xl divide-y divide-line-subtle">
            {[
              { q: 'How does the My Location tool know where I am?', a: 'It uses your browser\'s built-in Geolocation API. Your operating system fuses GPS satellite signals, nearby Wi-Fi access points, cell-tower triangulation, and IP geolocation into a single best-guess coordinate.' },
              { q: 'Why is the location my browser shows wrong?', a: 'Common reasons: you are indoors and GPS is weak, you use a VPN that rewrites your IP, battery saver mode is downsampling GPS, or you denied the precise location permission.' },
              { q: 'Is my location data sent to your servers?', a: 'No. Your GPS coordinates are processed in your browser. The optional reverse-geocoding step sends only the coordinates to a third-party service.' },
              { q: 'Does this work on my laptop or desktop?', a: 'Yes, but most desktops do not have a GPS chip, so accuracy is lower. Browser falls back to Wi-Fi positioning (10-25 m) or IP geolocation (5-50 km).' },
              { q: 'What does the accuracy radius mean?', a: 'The radius (in meters) of a circle the device is 95% confident contains your real position.' },
            ].map((f) => (
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

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Other things you can do with your location</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[
              { href: '/what-is-my-location', t: 'What Is My Location?', d: 'In-depth answer + tool' },
              { href: '/my-current-location', t: 'My Current Location', d: 'Address + coordinates now' },
              { href: '/live-location', t: 'Live Location', d: 'Real-time tracking as you move' },
              { href: '/gps-coordinates', t: 'GPS Coordinates', d: 'Live latitude & longitude' },
              { href: '/coordinates-converter', t: 'Coordinates Converter', d: 'DD ↔ DMS ↔ UTM' },
              { href: '/ip-location', t: 'IP Location', d: 'Look up any IP address' },
              { href: '/distance-calculator', t: 'Distance Calculator', d: 'Between two coordinates' },
              { href: '/address-finder', t: 'Address Finder', d: 'Address ↔ coordinates' },
              { href: '/street-view', t: 'Street View', d: 'Google Street View' },
              { href: '/driving-directions', t: 'Driving Directions', d: 'Route planner' },
              { href: '/fix-location-not-working', t: 'Fix Location Issues', d: 'Troubleshooting guide' },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="glass rounded-2xl p-4 hover:ring-accent/40 ring-1 ring-line transition group no-underline">
                <h3 className="font-display text-base font-bold text-fg group-hover:text-accent transition">{t.t}</h3>
                <p className="text-xs text-fg-subtle mt-1">{t.d}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
