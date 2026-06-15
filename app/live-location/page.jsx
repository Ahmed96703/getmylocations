import Link from 'next/link';
import LiveTool from './LiveTool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';

export const metadata = {
  title: 'My Live Location Now — Track Your Real-Time Position Free',
  description:
    'Free live location tracker — watch your real-time GPS position update as you move. Continuous browser tracking, accuracy radius, no signup, nothing leaves the page.',
  keywords: [
    'my live location now',
    'my location live',
    'my location right now',
    'my location now',
    'live location',
  ],
  alternates: { canonical: '/live-location' },
  openGraph: {
    title: 'My Live Location Now — Track Your Real-Time Position Free',
    description:
      'Live, continuously-updating GPS position in your browser. Free, no signup, nothing transmitted.',
    url: 'https://getmylocations.com/live-location',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Live Location Now — Track Your Real-Time Position',
    description: 'Free live GPS tracker that updates as you move. Browser-based, no signup.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'My Live Location Now',
  description:
    'Browser-based live location tracker. Uses the W3C watchPosition API to stream your GPS coordinates continuously and plot the latest fix on an interactive map.',
  url: 'https://getmylocations.com/live-location',
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
    { '@type': 'ListItem', position: 2, name: 'Live Location', item: 'https://getmylocations.com/live-location' },
  ],
};

const faqs = [
  {
    q: 'What does "live location" actually mean?',
    a: 'A live location is a position that keeps updating, not a single one-shot reading. The tracker subscribes to a stream of GPS fixes — usually one every one to five seconds — and replaces the displayed coordinates with the newest one each time. As long as the page stays open and the button is in the "Live" state, the map pin follows wherever you walk, drive, or ride.',
  },
  {
    q: 'How do I share my live location with someone?',
    a: 'This page shows your own live position; it does not generate a shareable link other people can open. For sharing, use the dedicated feature in Google Maps ("Share location" → choose a contact and a duration) or Apple Maps ("Share My Location"). Both encrypt and time-limit the link, which is the right way to share a moving position with someone you trust.',
  },
  {
    q: 'Why does my live location keep jumping around?',
    a: 'Two normal causes. (1) The GPS chip is constantly recomputing the fix from the satellites it can hear; even when you are standing still, the noise floor pulls each new reading a few meters in a random direction. (2) When the OS switches between GPS, Wi-Fi, and cell-tower estimates, the coordinates can jump tens of meters as the source changes. Both look like jitter but are working as designed.',
  },
  {
    q: 'Does live tracking drain my battery?',
    a: 'Yes — measurably, though not dramatically. Holding the GPS receiver in high-accuracy mode and waking the radio every couple of seconds typically costs 5 to 12 percent of battery per hour on a modern phone. Stop tracking with the button above whenever you are not actively using the page; the tool releases the GPS handle immediately.',
  },
  {
    q: 'Is my live location private?',
    a: 'Yes. The coordinate stream is delivered to JavaScript running in your own browser tab and is never posted to a server we control. The only outgoing request the page makes with your coordinates is a throttled reverse-geocoding call to OpenStreetMap (no more than once every ten seconds), so the city label can update as you move. We do not store, log, or correlate any of it.',
  },
  {
    q: 'How often does the position update?',
    a: 'The browser delivers a new fix whenever the operating system has one it considers a real change. On a phone with a clean GPS signal, that is usually every one to two seconds while moving and every five to ten seconds while still. On a laptop using Wi-Fi positioning, updates can be sparser — sometimes only every fifteen or twenty seconds — because Wi-Fi fixes are inherently slower.',
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

export default function LiveLocationPage() {
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
            <li className="text-fg-muted">Live Location</li>
          </ol>
        </nav>

        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">
            Free Tool · Continuous GPS stream in your browser
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            My <span className="text-accent">live location</span> now — watch your real-time position update.
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            Tap one button and the page subscribes to your device&rsquo;s GPS stream. Coordinates, accuracy, speed, and the map pin all refresh automatically as you move — not a single snapshot, but a running fix. Nothing leaves your browser; the stream stops the moment you tap <em>Stop</em>.
          </p>
        </section>

        <LiveTool />

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Live vs. one-shot — the difference matters</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Most location tools return a single fix and then go quiet. You tap, you see a coordinate, the page is done. That is fine if you are standing still and want to copy your position into a form. It is useless the moment you start moving — the pin stays where you were five seconds ago.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Live tracking is the opposite. The page asks the browser to <em>keep handing back new readings</em> as the GPS receiver computes them. The browser provides this through a standard call called <code className="font-mono text-sm bg-tint/10 px-1.5 py-0.5 rounded">watchPosition</code>: you supply a callback once, and it fires every time the operating system has a fresh fix to report. That is exactly what the tool above does, and it is why the &ldquo;Updates&rdquo; counter rises on its own while the &ldquo;Live&rdquo; badge is showing.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How real-time positioning actually works</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Inside your phone, the GPS chip is solving the same equation several times per second. It hears timestamps from four or more satellites overhead and back-solves for the only position on Earth where those particular delays line up. When you walk, the math changes — you are slightly closer to one satellite, slightly farther from another — and the chip outputs a new coordinate. The operating system passes that coordinate up to the browser, which passes it to this page, which redraws the dot.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Two practical knobs decide how lively the &ldquo;live&rdquo; reading actually feels. The first is the GPS sample rate, which most chipsets run at 1 Hz (one fix per second) by default. The second is the operating system&rsquo;s smoothing layer, which sometimes withholds a new reading if it has not changed enough to matter. A clean outdoor walk should generate one update every second or two; a stationary indoor reading often updates only every five to ten seconds because the OS sees no real movement.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Enabling live updates on each device</h2>

          <h3 className="font-display text-lg font-bold mt-5">iPhone</h3>
          <ol className="mt-2 space-y-1.5 text-fg-muted list-decimal list-inside leading-relaxed">
            <li>In Settings → Privacy &amp; Security → Location Services, make sure the service is on at the system level.</li>
            <li>Scroll to your browser, tap it, and select <em>While Using the App</em> with <em>Precise Location</em> turned on. Without precise mode iOS feeds the browser a deliberately fuzzed coordinate that does not update as you move.</li>
            <li>Come back, tap <em>Start live tracking</em>, and choose <em>Allow While Using App</em> on the permission prompt.</li>
            <li>Keep the tab in the foreground — iOS pauses the GPS stream to background tabs to save battery.</li>
          </ol>

          <h3 className="font-display text-lg font-bold mt-5">Android</h3>
          <ol className="mt-2 space-y-1.5 text-fg-muted list-decimal list-inside leading-relaxed">
            <li>In Settings → Location, switch Location on and confirm the mode is set to <em>High accuracy</em> (uses GPS plus Wi-Fi).</li>
            <li>In Chrome, tap the address-bar lock icon → Permissions → Location → Allow.</li>
            <li>Tap <em>Start live tracking</em>. Android may ask you to choose between precise and approximate — choose precise; approximate will not update meaningfully as you walk.</li>
            <li>Like iOS, Android throttles GPS to background tabs; keep this one focused while tracking.</li>
          </ol>

          <h3 className="font-display text-lg font-bold mt-5">Desktop or laptop</h3>
          <ol className="mt-2 space-y-1.5 text-fg-muted list-decimal list-inside leading-relaxed">
            <li>Click <em>Start live tracking</em> and allow the permission prompt under the address bar.</li>
            <li>Expect slow, infrequent updates. Most laptops have no GPS chip, so the browser falls back to Wi-Fi positioning, which only changes when you move between buildings or float between access points.</li>
            <li>If you carry the laptop and want crisp updates, tether it to a phone&rsquo;s GPS by enabling Location Sharing between the two — laptops then inherit the phone&rsquo;s precise fix.</li>
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Battery, accuracy, and the live-tracking tradeoff</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            High-accuracy live tracking is the most expensive geolocation mode a browser can run. It keeps the GPS radio warm, the Wi-Fi scanner active, and the application processor awake to deliver each callback. On a modern phone that costs roughly five to twelve percent of battery per hour — noticeable if you leave it on for a long road trip, negligible for a fifteen-minute walk. The widget above releases all of those handles the instant you tap <em>Stop tracking</em>, and disconnects them automatically if you navigate away from this page.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            There is also a sneakier tradeoff: <em>jitter</em>. A static one-shot reading hides the natural noise in any GPS fix, because you only see the final smoothed coordinate. Live tracking exposes the noise — you watch the dot wander a few meters as the chip recomputes. That is not the tool being wrong; it is the GPS being honest. If you need a single clean reading, our{' '}
            <Link href="/my-location" className="text-accent hover:underline">one-shot My Location page</Link>{' '}
            is the better fit.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">When the live feed lags or freezes</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            If the update counter stops climbing or the timestamp goes stale, one of these is usually the cause:
          </p>
          <ul className="mt-4 space-y-2 text-fg-muted leading-relaxed">
            <li><strong className="text-fg">Tab moved to the background.</strong> Both iOS and Android pause the GPS stream to inactive tabs. Bring this page back to the foreground.</li>
            <li><strong className="text-fg">Indoor signal loss.</strong> Walking from a parking lot into a steel-framed building can drop GPS within seconds; the OS waits to see if the signal returns before falling back to Wi-Fi.</li>
            <li><strong className="text-fg">Battery-saver kicked in.</strong> Low-power modes downsample GPS or block the radio entirely while the screen is dim. Disable battery saver for the session.</li>
            <li><strong className="text-fg">Browser denied background permission.</strong> Some browsers stop firing the watch callback after a few minutes if they decide the page is idle. Close and re-open the tab to restart the stream.</li>
            <li><strong className="text-fg">No movement.</strong> If you are sitting still, the OS may legitimately have nothing new to report. The last fix on screen is still your current position.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Privacy: the stream stays with you</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Live tracking sounds invasive, but the data path is no different from a single-shot reading — there are just more readings. Every coordinate is delivered to JavaScript inside your own tab; none of them are posted to a server we control, written to any database, or correlated with anything else about your session. The page makes one throttled network call per ten seconds (at most) to translate the latest coordinate into a readable place name, and that request contains nothing but two numbers.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            If you want to dig further into what a browser is — and is not — allowed to do with your GPS, our{' '}
            <Link href="/blog/browser-geolocation-api-explained" className="text-accent hover:underline">guide to the W3C Geolocation API</Link>{' '}
            walks through the permission model and the difference between <code className="font-mono text-xs bg-tint/10 px-1 rounded">getCurrentPosition</code> and <code className="font-mono text-xs bg-tint/10 px-1 rounded">watchPosition</code> in plain English.
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
              { href: '/my-current-location', t: 'My Current Location', d: 'Address + coordinates from a single fix' },
              { href: '/what-is-my-location', t: 'What Is My Location?', d: 'In-depth answer to the question' },
              { href: '/my-location', t: 'My Location', d: 'Action-first one-click tool' },
              { href: '/gps-coordinates', t: 'GPS Coordinates', d: 'Raw latitude and longitude' },
              { href: '/blog/latitude-vs-longitude-explained', t: 'Latitude vs Longitude', d: 'What the two numbers mean' },
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
