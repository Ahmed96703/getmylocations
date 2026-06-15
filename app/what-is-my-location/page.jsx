import Link from 'next/link';
import Tool from '../my-location/Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';

export const metadata = {
  title: 'What Is My Location? How to Find Your GPS Coordinates Right Now',
  description:
    'What is my location? A plain-English answer plus a free browser tool that shows your exact GPS coordinates, accuracy radius, and city — in two seconds, no signup.',
  keywords: ['what is my location', 'what is my current location', 'where am i now exact location', 'find my location'],
  alternates: { canonical: '/what-is-my-location' },
  openGraph: {
    title: 'What Is My Location? How to Find Your GPS Coordinates Right Now',
    description:
      'A plain-English answer to "what is my location" plus a free tool that reads your live GPS coordinates in the browser.',
    url: 'https://getmylocations.com/what-is-my-location',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is My Location? Find Your GPS Coordinates',
    description: 'Plain-English answer plus a free browser tool — no signup, no install.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'What Is My Location?',
  description:
    'Free browser-based tool that answers the question "what is my location?" by reading your device GPS, then reverse-geocoding the coordinates into a city and country.',
  url: 'https://getmylocations.com/what-is-my-location',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'GetMyLocations' },
  author: { '@type': 'Person', name: 'Ahmed Anwar' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getmylocations.com/' },
    { '@type': 'ListItem', position: 2, name: 'What Is My Location?', item: 'https://getmylocations.com/what-is-my-location' },
  ],
};

const faqs = [
  {
    q: 'What does "my location" actually mean?',
    a: 'Two numbers: a latitude and a longitude, in decimal degrees. Latitude is your distance north or south of the equator (between -90 and +90). Longitude is your distance east or west of the prime meridian through Greenwich, England (between -180 and +180). Together they pinpoint any spot on Earth to within a few meters.',
  },
  {
    q: 'How does my phone know where I am?',
    a: 'Modern phones combine four signals: GPS satellites overhead, Wi-Fi access points your phone can hear (each with a known location in a global database), nearby cell-tower triangulation, and a fallback estimate from your IP address. The OS fuses all of them into a single coordinate with a confidence radius.',
  },
  {
    q: 'Why does the result sometimes say I am in the wrong city?',
    a: 'Three common causes. (1) You are connected to a VPN, so the IP-based fallback puts you wherever the VPN exits the internet. (2) You are indoors and GPS is blocked, so the phone falls back to a coarse Wi-Fi or IP estimate. (3) You denied the precise-location permission, so the browser is given a deliberately fuzzed coordinate.',
  },
  {
    q: 'Is the tool sending my location to a server?',
    a: 'Your GPS coordinates stay in your browser. Only the optional reverse-geocoding step (to translate "29.5, -95.1" into "Houston, TX") sends the two numbers to a third-party service (OpenStreetMap Nominatim). We do not log them.',
  },
  {
    q: 'Why is the accuracy radius so large on my laptop?',
    a: 'Most laptops do not have a GPS chip, so the browser cannot use satellites at all. It uses Wi-Fi positioning (10 to 25 meters indoors) or, if no usable Wi-Fi is visible, IP geolocation, which is accurate to a city — usually a 5 to 50 km radius.',
  },
  {
    q: 'How do I get the most accurate reading?',
    a: 'Step outside, away from tall buildings, and wait fifteen seconds before reading the result. Make sure your phone has Location Services on at the system level, give your browser the precise (not approximate) permission, and turn off any VPN. On iOS turn off Low Power Mode, which downsamples GPS.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function WhatIsMyLocationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="max-w-5xl mx-auto px-5 py-10">
        <nav aria-label="Breadcrumb" className="text-xs text-fg-subtle mb-3">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-fg-muted">What Is My Location?</li>
          </ol>
        </nav>

        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">
            Free Tool · Question answered in plain English
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            What is my <span className="text-accent">location</span>? Here&rsquo;s how to find it in two seconds.
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Your &ldquo;location&rdquo; is a pair of numbers — a latitude and a longitude — that your phone or laptop already knows. Click the button below and the page reads those numbers from your browser, then puts a pin on a live map. No signup, no app, no servers logging the coordinates.
          </p>
        </section>

        <Tool />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">What &ldquo;your location&rdquo; really is</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            When you ask <em>what is my location?</em> the technical answer is two decimal numbers. The first is a <strong className="text-fg">latitude</strong> between -90 and +90 — how far north or south of the equator you are. The second is a <strong className="text-fg">longitude</strong> between -180 and +180 — how far east or west of the prime meridian (which runs through Greenwich, England) you are. Combined, those two numbers identify any point on the planet to about a meter.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Your phone already knows them. The widget on this page just asks the operating system for the latest reading using the W3C{' '}
            <Link href="/blog/browser-geolocation-api-explained" className="text-accent hover:underline">Geolocation API</Link>
            {' '}— the same standard interface Google Maps, Uber, and every weather app you have ever installed use. The tool then hands those coordinates to a free reverse-geocoder so you can also see them as a familiar &ldquo;Houston, Texas&rdquo; or &ldquo;Karachi, Pakistan&rdquo; label.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How your device figures out where you are</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Modern phones do not rely on any single source. They combine four signals and produce one fused answer with a confidence radius:
          </p>
          <ul className="mt-4 space-y-3 text-fg-muted leading-relaxed">
            <li>
              <strong className="text-fg">GPS satellites.</strong> Roughly 30 satellites orbit Earth and broadcast their position and a precise timestamp. Your phone&rsquo;s GPS chip listens to four or more at once and trilateral-positions itself. Outdoor accuracy is usually 3 to 5 meters.
            </li>
            <li>
              <strong className="text-fg">Wi-Fi access points.</strong> Companies like Google and Apple have mapped tens of millions of Wi-Fi networks against known coordinates. If your phone sees three networks it has a record of, it can place you indoors to within 10 to 25 meters — no satellites needed.
            </li>
            <li>
              <strong className="text-fg">Cell-tower triangulation.</strong> Even with GPS and Wi-Fi off, your phone&rsquo;s carrier can estimate position from the towers it is connected to. Accuracy varies from 100 meters in a dense city to several kilometers in the countryside.
            </li>
            <li>
              <strong className="text-fg">IP geolocation.</strong> The final fallback. Every IP address is registered to a regional internet provider, so a database can guess your city from your IP alone. Accuracy is 5 to 50 km, and it is wrong any time you use a VPN. See our{' '}
              <Link href="/blog/what-is-ip-location-and-how-accurate" className="text-accent hover:underline">guide to IP location accuracy</Link>{' '}for the full picture.
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How to find your location on any device</h2>

          <h3 className="font-display text-lg font-bold mt-5">iPhone (Safari or Chrome)</h3>
          <ol className="mt-2 space-y-1.5 text-fg-muted list-decimal list-inside leading-relaxed">
            <li>Open Settings → Privacy &amp; Security → Location Services and make sure it is on.</li>
            <li>Scroll down, tap your browser (Safari or Chrome), and choose <em>While Using the App</em> with Precise Location enabled.</li>
            <li>Come back to this page and tap the <em>Find my location</em> button above.</li>
            <li>Tap <em>Allow</em> on the permission prompt the first time.</li>
            <li>Wait one or two seconds — the coordinates, accuracy, and map appear automatically.</li>
          </ol>

          <h3 className="font-display text-lg font-bold mt-5">Android (Chrome)</h3>
          <ol className="mt-2 space-y-1.5 text-fg-muted list-decimal list-inside leading-relaxed">
            <li>Open Settings → Location and toggle it on. Choose <em>High accuracy</em> mode if offered.</li>
            <li>In Chrome, tap the three-dot menu → Settings → Site settings → Location and make sure Chrome can ask.</li>
            <li>Come back to this page and tap <em>Find my location</em>.</li>
            <li>Tap <em>Allow</em> on the prompt. Android will let you choose precise vs. approximate — pick precise.</li>
          </ol>

          <h3 className="font-display text-lg font-bold mt-5">Desktop (Chrome, Edge, Firefox, Safari)</h3>
          <ol className="mt-2 space-y-1.5 text-fg-muted list-decimal list-inside leading-relaxed">
            <li>Click <em>Find my location</em>. Your browser shows a permission prompt under the address bar.</li>
            <li>Click <em>Allow</em>. The reading will use Wi-Fi positioning since most laptops have no GPS chip.</li>
            <li>Expect a larger accuracy radius (10 to 50 meters) than a phone, unless you are tethered to a phone&rsquo;s GPS.</li>
          </ol>
          <p className="mt-3 text-sm text-fg-subtle">
            Stuck? Read{' '}
            <Link href="/fix-location-not-working" className="text-accent hover:underline">why your location is not working</Link>{' '}
            for a checklist that covers VPNs, denied permissions, and indoor signal problems.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">When the location looks wrong</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            If the pin lands on the wrong street — or the wrong city — it is almost always one of these. Run through them in order:
          </p>
          <ol className="mt-4 space-y-2 text-fg-muted list-decimal list-inside leading-relaxed">
            <li><strong className="text-fg">VPN.</strong> If you are connected to a VPN, the IP-based fallback puts you wherever the VPN exits. Disconnect and try again.</li>
            <li><strong className="text-fg">Indoors with no Wi-Fi.</strong> GPS does not pass through reinforced concrete or steel. Step near a window or outside, wait ten seconds.</li>
            <li><strong className="text-fg">Approximate permission.</strong> Both iOS and Android let users grant a deliberately fuzzed location. Re-grant with precise location turned on.</li>
            <li><strong className="text-fg">Battery saver / Low Power Mode.</strong> Phones downsample GPS to conserve battery. Turn it off for the reading.</li>
            <li><strong className="text-fg">Stale Wi-Fi database.</strong> If you moved house recently, Google or Apple may still associate your router with your old address. Toggle Wi-Fi off so the phone uses GPS instead.</li>
          </ol>
          <p className="mt-3 text-sm text-fg-subtle">
            For a deep dive into why the two estimates disagree, see{' '}
            <Link href="/gps-vs-ip-accuracy" className="text-accent hover:underline">GPS vs IP accuracy</Link>.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Privacy: who sees the reading?</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The browser delivers your coordinates to whatever page asked — in this case the script running in your own tab. They are not posted to a server we control. The only network call this page makes with your coordinates is to OpenStreetMap&rsquo;s free Nominatim service, and only so the page can turn the two numbers into a readable city name. We do not store, log, or correlate the readings with anything. The site has no signup, no account, and no analytics tied to your location.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            If you want to read the underlying coordinates without the reverse-geocoding step, our{' '}
            <Link href="/gps-coordinates" className="text-accent hover:underline">GPS coordinates page</Link>{' '}
            shows the raw latitude and longitude only — no city lookup is performed at all.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
          <div className="glass mt-4 rounded-2xl divide-y divide-line-subtle">
            {faqs.map((f) => (
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
          <h2 className="font-display text-2xl font-bold">Related tools and guides</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
            {[
              { href: '/my-current-location', t: 'My Current Location', d: 'Exact address + coordinates right now' },
              { href: '/live-location', t: 'Live Location', d: 'Real-time tracking as you move' },
              { href: '/my-location', t: 'My Location', d: 'Action-first tool — find your location in one click' },
              { href: '/gps-coordinates', t: 'GPS Coordinates', d: 'Raw latitude and longitude, no reverse-geocoding' },
              { href: '/coordinates-converter', t: 'Coordinates Converter', d: 'DD ↔ DMS ↔ UTM' },
              { href: '/ip-location', t: 'IP Location', d: 'Look up any IP address' },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="glass rounded-2xl p-4 hover:ring-accent/40 ring-1 ring-line transition group no-underline">
                <h3 className="font-display text-base font-bold text-fg group-hover:text-accent transition">{t.t}</h3>
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
