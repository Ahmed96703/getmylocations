import Link from 'next/link';
import Tool from './Tool.jsx';
import ProofPanel from './components/ProofPanel.jsx';

export const metadata = {
  title: 'GPS Coordinates — My Live Latitude & Longitude',
  description: 'Get your live GPS coordinates instantly — latitude and longitude in DD and DMS, accuracy, altitude, speed. Free tool, no signup.',
  keywords: ['gps coordinates', 'my gps coordinates', 'find my gps coordinates', 'live gps coordinates', 'current gps coordinates', 'gps coordinates of my location'],
  alternates: { canonical: '/gps-coordinates' },
  openGraph: {
    title: 'GPS Coordinates — My Live Latitude & Longitude',
    description: 'Get your live GPS coordinates in DD and DMS. Free, no signup.',
    url: 'https://getmylocations.com/gps-coordinates',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GPS Coordinates — My Live Latitude & Longitude',
    description: 'Get your live GPS coordinates in DD and DMS. Free, no signup.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'GPS Coordinates Tool',
  url: 'https://getmylocations.com/gps-coordinates',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function GpsCoordinatesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />

      <main className="max-w-5xl mx-auto px-5 py-10">
        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · Live GPS Reading</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            GPS <span className="text-accent">Coordinates</span> — your live latitude and longitude
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Read your exact <strong className="text-fg">GPS coordinates</strong> straight from your device&apos;s GNSS chip. Six-decimal latitude and longitude, instant DMS conversion, accuracy radius, altitude, speed, and heading — all displayed live on a real map.
          </p>
        </section>

        <Tool />

        <ProofPanel
          title="Outdoor phone fix"
          device="Capture the tool outdoors on a real phone so the six-decimal latitude, accuracy radius, and satellite count are visible together."
          caption="A real outdoor capture is the most convincing proof that the coordinates are coming from the device, not a canned example."
          fileHint="/public/screenshots/gps-coordinates-phone.png"
        />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">What are GPS coordinates?</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            A pair of <strong className="text-fg">GPS coordinates</strong> is the universal address system for any spot on Earth. Two numbers — <strong className="text-fg">latitude</strong> (how far north or south of the equator) and <strong className="text-fg">longitude</strong> (how far east or west of the Greenwich prime meridian) — together pin a single point on the planet&apos;s surface to within a meter.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            This tool reads the coordinates straight from your device&apos;s <strong className="text-fg">GNSS chip</strong> through the W3C Geolocation API. On a phone outdoors the chip listens for signals from GPS, Galileo, GLONASS, BeiDou, and QZSS satellites simultaneously and returns a coordinate accurate to about three to five meters.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Precision reference</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-line text-accent text-[11px] uppercase tracking-wider">
                  <th className="text-left py-2 pr-4">Decimals</th>
                  <th className="text-left py-2 pr-4">Real-world precision</th>
                  <th className="text-left py-2">Identifies</th>
                </tr>
              </thead>
              <tbody className="text-fg-muted">
                <tr className="border-b border-line-subtle"><td className="py-2 pr-4 font-mono">48.8</td><td className="py-2 pr-4">~11 km</td><td className="py-2">City</td></tr>
                <tr className="border-b border-line-subtle"><td className="py-2 pr-4 font-mono">48.85</td><td className="py-2 pr-4">~1.1 km</td><td className="py-2">Neighborhood</td></tr>
                <tr className="border-b border-line-subtle"><td className="py-2 pr-4 font-mono">48.858</td><td className="py-2 pr-4">~110 m</td><td className="py-2">City block</td></tr>
                <tr className="border-b border-line-subtle"><td className="py-2 pr-4 font-mono">48.8584</td><td className="py-2 pr-4">~11 m</td><td className="py-2">Building</td></tr>
                <tr className="border-b border-line-subtle"><td className="py-2 pr-4 font-mono">48.85842</td><td className="py-2 pr-4">~1.1 m</td><td className="py-2">Parking space</td></tr>
                <tr><td className="py-2 pr-4 font-mono">48.858420</td><td className="py-2 pr-4">~11 cm</td><td className="py-2">Survey grade</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">More tools on this site</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[
              { href: '/my-location', t: 'My Location', d: 'Where am I right now?' },
              { href: '/coordinates-converter', t: 'Coordinates Converter', d: 'DD ↔ DMS ↔ UTM' },
              { href: '/distance-calculator', t: 'Distance Calculator', d: 'Between two coordinates' },
              { href: '/ip-location', t: 'IP Location', d: 'Look up any IP' },
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
