import Link from 'next/link';
import Tool from './Tool.jsx';

export const metadata = {
  title: 'Street View — See Any Address in Google Street View',
  description: 'Free Street View tool. Enter any address or GPS coordinates and see the location in Google Street View. No signup, no API key.',
  keywords: ['street view', 'google street view', 'street view by address', 'virtual tour'],
  alternates: { canonical: '/street-view' },
};

const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Street View Tool', url: 'https://getmylocations.com/street-view',
  applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web',
  isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function StreetViewPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <main className="max-w-5xl mx-auto px-5 py-10">
        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · Powered by Google Street View</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Street <span className="text-accent">View</span> — see any address in Google Street View
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Type any address, landmark, or GPS coordinate pair, and instantly walk down the street in <strong className="text-fg">Google Street View</strong>. No signup, no app to install.
          </p>
        </section>

        <Tool />

        {/* TODO: Ahmed to add a screenshot of the embed loaded on a recognisable street (e.g. Times Square or M.A. Jinnah Road, Karachi) so the image clearly shows the Street View pegman controls — not generic map tiles. /public/screenshots/street-view-mta-jinnah.png */}

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How Street View imagery is captured</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Most of the imagery you see comes from cars driving the public road
            network with a rooftop rig of about nine cameras shooting overlapping
            panoramas every few meters. Google&rsquo;s fleet has covered roughly five
            million miles of public roads since the service launched in 2007. For
            places cars cannot reach — hiking trails, narrow alleys, museum
            interiors — the same panoramic kit is mounted on a backpack, a
            snowmobile, a small boat, or in the case of some museums, a trolley.
            All of it goes through the same stitching pipeline before it reaches
            the embed below.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Coverage and limitations</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Coverage is uneven and that is a feature of the service, not a bug.
            Most public roads in North America, western Europe, Japan, South Korea,
            and Australia have current imagery. Many cities in Pakistan, India,
            Brazil, and Indonesia have partial coverage — major streets are
            mapped, side streets are not. A few countries (parts of Germany, until
            recently, plus most of mainland China, Iran, and North Korea) have
            very limited Street View for legal or political reasons. When the
            embed below cannot find a panorama for an address, it quietly falls
            back to the normal map.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How old is what you are looking at?</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Every Street View image is dated. Look at the bottom-left corner of
            the embed once it loads — the capture month and year are shown there.
            Busy city centres get refreshed every two or three years; smaller
            towns might still be showing imagery from five years ago. For
            historical research this is occasionally useful: Street View has a
            time-slider feature on the full Google Maps site that lets you scroll
            back through older captures of the same address.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Privacy and what you can ask Google to blur</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Faces and licence plates are automatically blurred before any panorama
            is published. The blur is applied at upload time and is not reversible
            from the viewer side. If you find yourself or your home in the
            imagery and want it removed or further blurred, Google has a
            self-service report tool inside Maps — three dots, &ldquo;Report a
            problem&rdquo; — that handles requests for additional blurring within a
            few business days.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Try these next</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[{ href: '/my-location', t: 'My Location' }, { href: '/driving-directions', t: 'Driving Directions' }, { href: '/address-finder', t: 'Address Finder' }, { href: '/gps-coordinates', t: 'GPS Coordinates' }].map((t) => (
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
