import Link from 'next/link';
import Tool from '../my-location/Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';

export const metadata = {
  title: 'My Current Location — Find Your Exact Address & Coordinates Now',
  description:
    'Free instant tool to find my current location — get your exact street address and GPS coordinates in two seconds, right in the browser. No signup, no install.',
  keywords: [
    'my current location',
    'what is my current location address',
    'present location',
    'my current location address',
    'what is my current location',
  ],
  alternates: { canonical: '/my-current-location' },
  openGraph: {
    title: 'My Current Location — Find Your Exact Address & Coordinates Now',
    description:
      'Get your current street address and GPS coordinates instantly. Free browser tool — no signup, no install.',
    url: 'https://getmylocations.com/my-current-location',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Current Location — Find Your Exact Address & Coordinates',
    description: 'Address + coordinates in two seconds. Free, browser-based, no signup.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'My Current Location',
  description:
    'Free browser-based tool that finds your current location, reverse-geocodes the GPS coordinates into a readable street address, and displays both on a live map.',
  url: 'https://getmylocations.com/my-current-location',
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
    { '@type': 'ListItem', position: 2, name: 'My Current Location', item: 'https://getmylocations.com/my-current-location' },
  ],
};

const faqs = [
  {
    q: 'How do I find my current location address?',
    a: 'Tap the button above and allow the location permission. The page reads your GPS coordinates from the browser, then asks a free reverse-geocoding service (OpenStreetMap Nominatim) to translate those numbers into a street, neighborhood, city, and country. The readable address appears in the dashboard within a second or two of the coordinate fix.',
  },
  {
    q: 'Why is my current location wrong or out of date?',
    a: 'The most common cause is a cached location: your browser may hand back the last fix it stored rather than asking for a fresh one. Other causes are a VPN rewriting your IP, indoor GPS blockage, an "approximate" permission rather than "precise," or battery-saver mode on a phone. Refreshing the page and tapping the button again forces a new reading.',
  },
  {
    q: 'How do I get the exact coordinates of where I am right now?',
    a: 'The dashboard above shows the raw latitude and longitude in decimal degrees, accurate to six decimal places (about 11 cm of theoretical precision). The "Copy coordinates" button puts the pair on your clipboard in the standard "lat, lon" format that Google Maps, Apple Maps, and most GPS apps accept directly.',
  },
  {
    q: 'Does this work if my device does not have GPS?',
    a: 'Yes — most laptops have no GPS chip, but the browser still produces a coordinate by using Wi-Fi positioning (matching the access points it can hear against a known database) or, as a last resort, IP geolocation. The accuracy radius will be larger, and the resulting address may be your nearest city center rather than your street.',
  },
  {
    q: 'Is my current location saved or shared with anyone?',
    a: 'No. The GPS coordinates are processed in your browser and never sent to a server we control. The only outgoing call this page makes with the coordinates is to OpenStreetMap Nominatim, which performs the reverse-geocoding and does not log queries to identifiable users. We do not store, sell, or correlate the readings.',
  },
  {
    q: 'What is the difference between my current location and my GPS coordinates?',
    a: 'Your GPS coordinates are two numbers (latitude and longitude). Your "current location," in everyday language, usually means a human-readable address — "1600 Pennsylvania Avenue NW, Washington, DC" — that someone can type into a map app. The page above gives you both at once, so you can copy whichever format you need.',
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

export default function MyCurrentLocationPage() {
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
            <li className="text-fg-muted">My Current Location</li>
          </ol>
        </nav>

        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">
            Free Tool · Address + coordinates in one click
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            My <span className="text-accent">current location</span> — find your exact address right now.
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Click the button below and the page reads a fresh GPS fix from your device, then translates the coordinates into a readable street address. You get both — the raw <em>latitude, longitude</em> pair and the human-friendly &ldquo;street, city, country&rdquo; — without signing up or installing anything.
          </p>
        </section>

        <Tool />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">From two numbers to a real address</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Your phone always knows your location as two raw numbers. The first half of the work above is reading those numbers; the second half — the part most people actually care about — is turning <code className="font-mono text-sm bg-tint/10 px-1.5 py-0.5 rounded">29.749907, -95.358421</code> into something like &ldquo;Houston, Texas, United States&rdquo; that you can paste into a delivery form or share with a friend.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            That second step is called <strong className="text-fg">reverse geocoding</strong>. The page calls a free OpenStreetMap service that holds a global index of every road, building footprint, and administrative boundary, and asks it for the closest match to your coordinates. The match is usually a street name when you are outdoors with a clean GPS fix, and a neighborhood or city center when your reading is fuzzier. Either way, you see the same two numbers you started with — just dressed up as words.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How to find your current address on any device</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The tool above does the same thing on every platform, but the permission flow differs. The goal in each case is to make sure the browser gets a fresh, precise reading rather than a stale or fuzzy one.
          </p>

          <h3 className="font-display text-lg font-bold mt-5">iPhone</h3>
          <ol className="mt-2 space-y-1.5 text-fg-muted list-decimal list-inside leading-relaxed">
            <li>Pull down Control Center and check that Location Services is enabled (the arrow icon).</li>
            <li>If you have used the page before and it remembers an old permission, go to Safari → Settings → Privacy &amp; Security → Location and reset it to <em>Ask</em>.</li>
            <li>Tap the button, and when iOS asks, choose <em>Allow Once</em> with <em>Precise: On</em>.</li>
            <li>Wait two or three seconds. The street address shows up under the accuracy radius once Nominatim responds.</li>
          </ol>

          <h3 className="font-display text-lg font-bold mt-5">Android</h3>
          <ol className="mt-2 space-y-1.5 text-fg-muted list-decimal list-inside leading-relaxed">
            <li>Pull down the quick-settings panel and confirm Location is on.</li>
            <li>In Chrome, tap the address bar lock icon → Permissions → Location → Allow if the site is remembered.</li>
            <li>Tap the button. Android offers a precise/approximate choice — choose <em>Precise</em>.</li>
            <li>The address line resolves as soon as the OS returns the GPS fix.</li>
          </ol>

          <h3 className="font-display text-lg font-bold mt-5">Desktop or laptop</h3>
          <ol className="mt-2 space-y-1.5 text-fg-muted list-decimal list-inside leading-relaxed">
            <li>Click the button. A permission prompt appears under the address bar.</li>
            <li>Click <em>Allow</em>. Because most laptops have no GPS chip, the browser uses Wi-Fi positioning instead.</li>
            <li>Expect the address to resolve to your neighborhood or city center rather than your exact street, with an accuracy radius of 10 to 50 meters.</li>
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Why your &ldquo;current&rdquo; location may not actually be current</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The word &ldquo;current&rdquo; is the trickiest part of this question. A reading can be wrong in two very different ways: the GPS fix itself can be off, or the fix can be perfectly accurate but stale. The second case is easy to miss, because the page still reports a confident-looking address.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Browsers cache the last good fix and may hand it back instantly if the OS thinks nothing has changed. If you just got off a train or walked a few blocks, the cached reading can show you starting from where you were five minutes ago. The Find button on this page disables that cache explicitly — it sets <code className="font-mono text-sm bg-tint/10 px-1.5 py-0.5 rounded">maximumAge: 0</code> on the geolocation request — so every tap asks for a brand-new reading rather than a recycled one. If a result still looks stale, reload the tab and try again.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            GPS drift is the other gotcha. When you are stationary indoors, the chip will quietly wander a few meters in random directions as it loses and regains satellites. The address rarely changes, but the dot on the map will jiggle. That is normal — the radius drawn around the pin shows where the device is 95% confident you actually are.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">When the address is precise — and when it is not</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            How specific the resolved address gets depends entirely on the accuracy of the underlying coordinate. A rough guide:
          </p>
          <ul className="mt-4 space-y-2 text-fg-muted leading-relaxed">
            <li><strong className="text-fg">Outdoors, phone, GPS:</strong> 3–5 m accuracy → exact street address, often the right building.</li>
            <li><strong className="text-fg">Indoors, phone, Wi-Fi:</strong> 10–25 m → street name, possibly wrong house number.</li>
            <li><strong className="text-fg">Laptop, Wi-Fi only:</strong> 25–100 m → neighborhood, sometimes the wrong street on a grid.</li>
            <li><strong className="text-fg">Cell-tower fallback:</strong> a few hundred meters to several km → district or city center.</li>
            <li><strong className="text-fg">IP geolocation only:</strong> 5–50 km → city or metropolitan area, never a street.</li>
          </ul>
          <p className="mt-3 text-fg-muted leading-relaxed">
            If you need the most exact address possible, step outside, give your phone fifteen seconds to lock onto satellites, and only then tap the button. Indoors, the resolution caps at the room you are sitting in.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Privacy: what gets sent, what stays in your browser</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Your coordinates never reach a server we operate. The Geolocation API hands them to JavaScript running in your tab, and the only outgoing call this page then makes is the reverse-geocoding lookup to OpenStreetMap. That request contains just the two numbers and no identifier — no name, no account, no fingerprint. We do not log the readings or build a session profile around them.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            If you prefer to skip even that one outgoing call and see only the numeric coordinates, use the{' '}
            <Link href="/gps-coordinates" className="text-accent hover:underline">GPS coordinates</Link>{' '}
            page, which omits the address lookup entirely. If you want a deeper read on how the W3C Geolocation API decides what to share with a webpage, our{' '}
            <Link href="/blog/browser-geolocation-api-explained" className="text-accent hover:underline">browser geolocation guide</Link>{' '}
            walks through it line by line.
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
              { href: '/what-is-my-location', t: 'What Is My Location?', d: 'The in-depth answer to the question' },
              { href: '/live-location', t: 'Live Location', d: 'Track your real-time position as you move' },
              { href: '/my-location', t: 'My Location', d: 'Action-first tool — one click to find' },
              { href: '/gps-coordinates', t: 'GPS Coordinates', d: 'Raw latitude and longitude, no address lookup' },
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
