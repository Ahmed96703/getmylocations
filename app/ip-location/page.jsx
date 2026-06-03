import Link from 'next/link';
import Tool from './Tool.jsx';
import ProofPanel from '../components/ProofPanel.jsx';

export const metadata = {
  title: 'What Is My IP? IP Location — Find My IP Address Country, City & ISP',
  description: 'What is my IP? Find my IP location with country, city, ISP, timezone, and map. Lookup any IPv4 or IPv6 address. No signup, no API key.',
  keywords: ['ip location', 'ip address lookup', 'ip location finder', 'my ip address', 'what is my ip', 'ip geolocation'],
  alternates: { canonical: '/ip-location' },
  openGraph: {
    title: 'What Is My IP? IP Location — Find My IP Address Country, City & ISP',
    description:
      'What is my IP? Look up your public IP address and compare the city result against GPS.',
    url: 'https://getmylocations.com/ip-location',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is My IP? IP Location — Find My IP Address Country, City & ISP',
    description:
      'What is my IP? Look up your public IP address and compare the city result against GPS.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'IP Location Lookup',
  url: 'https://getmylocations.com/ip-location',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function IpLocationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />

      <main className="max-w-5xl mx-auto px-5 py-10">
        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · No API key required</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            What is my IP? Look up any IP address — yours or <span className="text-accent">someone else&rsquo;s</span>
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Look up the city, country, ISP, timezone, and approximate coordinates of any public IP address — your own or someone else&apos;s. Click one button to look up your own IP, or paste any IPv4 / IPv6 address.
          </p>
        </section>

        <Tool />

        <ProofPanel
          title="GPS versus IP comparison"
          device="Use a real home connection, compare the IP-derived result against the live GPS reading from My Location, and note the offset in kilometers."
          caption="This proof block turns the page from a generic lookup tool into a real-world comparison with an actual measurement behind it."
          fileHint="/public/screenshots/ip-vs-gps-real-comparison.png"
        />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">How this tool works</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Click <em>Lookup my IP</em> and the page calls ipapi.co with no
            arguments. Their server sees the IP you came from and replies with
            its best guess of the city, region, country, internet provider, and
            timezone. You can also paste any other public IP into the input box
            and look it up the same way — the call goes out, the answer comes
            back, and we display it in the table below. Nothing is stored on our
            side.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            For a longer discussion of how the underlying databases are built,
            how mobile carriers and VPNs distort the result, and what an IP
            lookup actually does and does not reveal, see the dedicated{' '}
            <a className="text-accent hover:underline" href="/ip-location-lookup">IP location lookup guide</a>.
            That article goes into the bits this tool page deliberately keeps short.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Reading the result</h2>
          <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
            <li>The <strong>country</strong> field is almost always right.</li>
            <li>The <strong>city</strong> field is correct about half the time on residential broadband and much less on mobile networks, because carriers route traffic through regional gateways.</li>
            <li>The <strong>ISP</strong> field tells you which company owns the IP block — useful for spotting VPN exits and data-centre IPs.</li>
            <li>The <strong>coordinates</strong> are typically the centroid of the ISP&rsquo;s service area for that block, not a specific building.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Free API limits</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            ipapi.co lets unauthenticated users do up to 1,000 lookups per IP per
            day. That is enough for a manual page like this. If you hit the
            limit you will see an error from their server until the next day
            rolls over.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">More IP and geolocation tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[
              { href: '/my-location', t: 'My Location' },
              { href: '/gps-coordinates', t: 'GPS Coordinates' },
              { href: '/address-finder', t: 'Address Finder' },
              { href: '/distance-calculator', t: 'Distance Calculator' },
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
