import Link from 'next/link';
import LiveTool from './LiveTool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';
import AdSense from '../components/AdSense.jsx';
import { AUTHOR } from '../components/author.js';

export const metadata = {
  title: 'My Live Location Now — Track Your Real-Time Position Free',
  description:
    'Watch your GPS position, speed and path update live, then save the route as a GPX file. Runs in your browser with no signup or stored data. Start now.',
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
      'Live, continuously-updating GPS position, speed, heading and path in your browser. Free, no signup, and we never store a coordinate.',
    url: 'https://getmylocations.com/live-location',
    type: 'website',
    images: ['/og-image.png'],
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
    'Browser-based live location tracker. Uses the W3C watchPosition API to stream your GPS coordinates continuously, show accuracy, speed, heading and altitude, draw the path you have travelled on an interactive map, and download that path as a GPX 1.1 file built in the browser.',
  url: 'https://getmylocations.com/live-location',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'GetMyLocations' },
  author: AUTHOR,
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
    q: 'Can I save the route I walked?',
    a: 'Yes. Once the map shows a path, tap "Download route (GPX)". The file contains every point on the drawn path with its time and, where the device reports it, its altitude, in the standard GPX 1.1 format that Strava, Komoot, Garmin Connect and Google Earth open. It is built in your browser and saved to your device; we never receive a copy. Download before closing the tab, because the path is not kept anywhere else.',
  },
  {
    q: 'How is average speed worked out?',
    a: 'It is the Distance tile divided by the Time elapsed tile. Because elapsed time keeps running while you stand still, stops pull the average down, the same way a fitness app reports "average moving plus stopped". The Speed tile next to it is different: that is the instantaneous speed the device reports with each reading.',
  },
  {
    q: 'Why does my live location keep jumping around?',
    a: 'Two normal causes. (1) The GPS chip is constantly recomputing the fix from the satellites it can hear; even when you are standing still, the noise floor pulls each new reading a few meters in a random direction. (2) When the OS switches between GPS, Wi-Fi, and cell-tower estimates, the coordinates can jump tens of meters as the source changes. Both look like jitter but are working as designed.',
  },
  {
    q: 'Does live tracking drain my battery?',
    a: 'Yes. Holding the GPS receiver in high-accuracy mode and waking the processor for every reading costs real battery, and keeping the screen on (the "Keep screen on" option) usually costs more than the GPS itself. How much depends on the phone, the signal, and screen brightness, so the honest way to know is to note your battery percentage before and after a ten-minute session. Stop tracking with the button above whenever you are not actively using the page; the tool releases the GPS handle immediately.',
  },
  {
    q: 'Is my live location private?',
    a: 'Yes. The coordinate stream is delivered to JavaScript running in your own browser tab and is never posted to a server we control. The only outgoing request the page makes with your coordinates is a throttled reverse-geocoding call to OpenStreetMap (no more than once every ten seconds), so the city label can update as you move. We do not store, log, or correlate any of it.',
  },
  {
    q: 'How often does the position update?',
    a: 'The browser delivers a new fix whenever the operating system has one it considers a real change. On a phone with a clean GPS signal, that is usually every one to two seconds while moving and every five to ten seconds while still. On a laptop using Wi-Fi positioning, updates can be sparser — sometimes only every fifteen or twenty seconds — because Wi-Fi fixes are inherently slower.',
  },
  {
    q: 'Why is my heading blank?',
    a: 'Heading is the direction you are moving, measured in degrees clockwise from true north. The W3C Geolocation specification says a device that is standing still must report no heading, because a direction of travel only exists while you are travelling. Start walking and it fills in. Laptops and some phones never report it at all, in which case it stays blank.',
  },
  {
    q: 'How accurate is live location indoors?',
    a: 'Usually far worse than outdoors. Indoors the GPS signal is too weak, so the phone falls back to Wi-Fi positioning, which is typically accurate to tens of meters and sometimes hundreds. Watch the Accuracy tile: it is the radius the device is 95% confident you are inside. The path trail ignores any reading worse than 50 m, so indoor guesses do not scribble across the map.',
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

      <AdSense />

      <main role="main" className="max-w-5xl mx-auto px-5 py-10">
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
            Tap one button and the page subscribes to your device&rsquo;s GPS stream. Coordinates, accuracy, speed, heading, and the map pin all refresh automatically as you move, and the map draws the path you have walked — not a single snapshot, but a running fix. When you are done, save the route as a GPX file. Your coordinates never reach a server we run, and the stream stops the moment you tap <em>Stop</em>.
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
          <p className="mt-3 text-fg-muted leading-relaxed">
            The tool asks for the strictest settings the API allows: <code className="font-mono text-sm bg-tint/10 px-1.5 py-0.5 rounded">enableHighAccuracy: true</code> so the OS powers up the GPS receiver rather than settling for Wi-Fi, <code className="font-mono text-sm bg-tint/10 px-1.5 py-0.5 rounded">maximumAge: 0</code> so it never replays a cached fix, and a <code className="font-mono text-sm bg-tint/10 px-1.5 py-0.5 rounded">timeout</code> of 20 seconds before it reports that no reading arrived.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">What each live GPS location reading means</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Every update the browser delivers carries more than a coordinate. Here is what each tile in the tracker shows, and when it is allowed to be blank under the <a href="https://www.w3.org/TR/geolocation/" target="_blank" rel="noopener" className="text-accent hover:underline">W3C Geolocation API specification</a>.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-line text-fg">
                  <th className="py-2 pr-4 font-semibold">Reading</th>
                  <th className="py-2 pr-4 font-semibold">Unit</th>
                  <th className="py-2 font-semibold">What it tells you</th>
                </tr>
              </thead>
              <tbody className="text-fg-muted">
                <tr className="border-b border-line-subtle"><td className="py-2 pr-4">Latitude, longitude</td><td className="py-2 pr-4">degrees</td><td className="py-2">Your position, shown to six decimal places.</td></tr>
                <tr className="border-b border-line-subtle"><td className="py-2 pr-4">Accuracy</td><td className="py-2 pr-4">meters</td><td className="py-2">The radius of a circle the device is 95% confident you are inside. Smaller is better.</td></tr>
                <tr className="border-b border-line-subtle"><td className="py-2 pr-4">Speed</td><td className="py-2 pr-4">km/h</td><td className="py-2">Reported by the device in meters per second and converted here. Blank when the device cannot measure it.</td></tr>
                <tr className="border-b border-line-subtle"><td className="py-2 pr-4">Heading</td><td className="py-2 pr-4">degrees from true north</td><td className="py-2">Your direction of travel, with a compass point. Always blank while you are standing still.</td></tr>
                <tr className="border-b border-line-subtle"><td className="py-2 pr-4">Altitude</td><td className="py-2 pr-4">meters</td><td className="py-2">Height reported by the device. Often blank on laptops and on Wi-Fi-only fixes.</td></tr>
                <tr className="border-b border-line-subtle"><td className="py-2 pr-4">Distance</td><td className="py-2 pr-4">m or km</td><td className="py-2">Length of the path drawn on the map since you tapped Start.</td></tr>
                <tr className="border-b border-line-subtle"><td className="py-2 pr-4">Time elapsed</td><td className="py-2 pr-4">minutes:seconds</td><td className="py-2">Time since you tapped Start. It stops counting when you tap Stop.</td></tr>
                <tr className="border-b border-line-subtle"><td className="py-2 pr-4">Average speed</td><td className="py-2 pr-4">km/h</td><td className="py-2">Distance divided by time elapsed, so stops at traffic lights pull it down. Shown after the first ten seconds.</td></tr>
                <tr><td className="py-2 pr-4">Updates</td><td className="py-2 pr-4">count, time</td><td className="py-2">How many readings have arrived, and when the latest one did.</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-fg-muted leading-relaxed">
            For how the browser decides which of these values to fill in, see our guide to 
            <Link href="/blog/browser-geolocation-api-explained" className="text-accent hover:underline">how the browser Geolocation API works</Link>.
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
          <h2 className="font-display text-2xl font-bold">Track my location on the map: path and distance travelled</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            While tracking is on, the map draws a line along the route you have taken and the Distance tile adds up its length. GPS jitter would normally turn a person standing still into a growing scribble, so the tracker is strict about which readings join the path: a new point is only added once you have moved at least 10 meters from the last one, and only from a reading accurate to 50 meters or better. Standing still therefore adds nothing, and a sudden indoor Wi-Fi guess hundreds of meters off is left out.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The trade-off is that very small movements, like pacing around a room, will not register. The path and distance reset each time you tap <em>Start live tracking</em>, and nothing is kept once you close the tab unless you download it first.
          </p>
          <h3 className="font-display text-lg font-bold mt-5">Save your route as a GPX file</h3>
          <p className="mt-2 text-fg-muted leading-relaxed">
            Once the path has two points, a <em>Download route (GPX)</em> button appears under the readings. GPX is the standard file format for GPS tracks (<a href="https://www.topografix.com/GPX/1/1/" target="_blank" rel="noopener" className="text-accent hover:underline">version 1.1, published by Topografix</a>), so Strava, Komoot, Garmin Connect, Google Earth and most hiking apps can open it. Each point in the file carries its latitude and longitude, the time it was recorded, and the altitude when the device reported one. The file holds exactly the points drawn on the map, after the 10-meter and 50-meter filters above.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The file is assembled by JavaScript in your browser and saved straight to your device; it is not uploaded anywhere first. You can download it while still tracking or after tapping <em>Stop</em>. To measure the straight-line gap between where you started and where you ended, paste both coordinates into the{' '}
            <Link href="/distance-calculator" className="text-accent hover:underline">distance calculator</Link>.
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
            <li>In Settings → Location, switch Location on, then open <em>Location services</em> and make sure <em>Google Location Accuracy</em> is on (it adds Wi-Fi and cell positioning to GPS). Android 9 and older call this the <em>High accuracy</em> mode.</li>
            <li>In Chrome, tap the address-bar lock icon → Permissions → Location → Allow.</li>
            <li>Tap <em>Start live tracking</em>. On Android 12 and later, the prompt asks you to choose between precise and approximate — choose precise; approximate will not update meaningfully as you walk.</li>
            <li>Like iOS, Android throttles GPS to background tabs; keep this one focused while tracking.</li>
          </ol>

          <h3 className="font-display text-lg font-bold mt-5">Desktop or laptop</h3>
          <ol className="mt-2 space-y-1.5 text-fg-muted list-decimal list-inside leading-relaxed">
            <li>Click <em>Start live tracking</em> and allow the permission prompt under the address bar.</li>
            <li>Expect slow, infrequent updates. Most laptops have no GPS chip, so the browser falls back to Wi-Fi positioning, which only changes when you move between buildings or float between access points.</li>
            <li>If you need crisp updates while moving, open this page on your phone instead. Neither macOS nor Windows passes a phone&rsquo;s GPS fix through to a laptop browser, so a laptop will only ever see Wi-Fi or IP positioning.</li>
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Battery, accuracy, and the live-tracking tradeoff</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            High-accuracy live tracking is the most expensive geolocation mode a browser can run. It keeps the GPS radio warm, the Wi-Fi scanner active, and the application processor awake to deliver each callback. How much battery that costs depends on the phone, the signal, and above all whether the screen stays on, so the honest way to know is to note your battery percentage before and after a ten-minute session. It matters on a long road trip and barely registers on a short walk. The widget above releases all of those handles the instant you tap <em>Stop tracking</em>, and disconnects them automatically if you navigate away from this page.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            There is also a sneakier tradeoff: <em>jitter</em>. A static one-shot reading hides the natural noise in any GPS fix, because you only see the final smoothed coordinate. Live tracking exposes the noise — you watch the dot wander a few meters as the chip recomputes. That is not the tool being wrong; it is the GPS being honest. (If the dot sits in the wrong city entirely, the browser has probably fallen back to IP location; see{' '}
            <Link href="/gps-vs-ip-accuracy" className="text-accent hover:underline">why GPS and IP disagree</Link>.) If you need a single clean reading, our{' '}
            <Link href="/my-location" className="text-accent hover:underline">one-shot My Location page</Link>{' '}
            is the better fit. If you want to explore the area around your position with satellite imagery or switch between map styles, the{' '}
            <Link href="/maps" className="text-accent hover:underline">interactive map</Link>{' '}
            gives you a larger, freeform canvas.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Keep the screen awake while tracking</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Phones pause location updates to a web page once the screen turns off, so a walk with the phone in your pocket can leave long gaps in the path. Tick <em>Keep screen on</em> next to the start button and the page asks the browser for a screen wake lock (the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API" target="_blank" rel="noopener" className="text-accent hover:underline">Screen Wake Lock API</a>), which stops the display from sleeping while tracking is running.
          </p>
          <p className="mt-3 text-fg-muted leading-relaxed">
            The lock is released the moment you stop tracking or untick the box. If you switch to another app the browser drops it automatically, and the page asks for it again when you come back. If your browser does not support wake locks, the option is simply not shown. Battery-saver modes can also refuse the request; tracking still works, but the screen may sleep.
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
            <li><strong className="text-fg">Screen went to sleep.</strong> A dark screen pauses the stream on most phones. Tick <em>Keep screen on</em> before you start, as described above.</li>
            <li><strong className="text-fg">Battery-saver kicked in.</strong> Low-power modes downsample GPS or block the radio entirely while the screen is dim. Disable battery saver for the session.</li>
            <li><strong className="text-fg">Browser denied background permission.</strong> Some browsers stop firing the watch callback after a few minutes if they decide the page is idle. Close and re-open the tab to restart the stream.</li>
            <li><strong className="text-fg">No movement.</strong> If you are sitting still, the OS may legitimately have nothing new to report. The last fix on screen is still your current position.</li>
          </ul>
          <p className="mt-3 text-fg-muted leading-relaxed">
            If tracking never starts at all, work through the{' '}
            <Link href="/fix-location-not-working" className="text-accent hover:underline">location not working fix guide</Link>.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How to share your live location with someone</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            This page only ever shows your own position to you. It cannot create a link for someone else to follow, because that would mean sending your coordinates to a server, which this site deliberately never does. To share a moving position with someone you trust, use an app built for it:
          </p>
          <ol className="mt-3 space-y-1.5 text-fg-muted list-decimal list-inside leading-relaxed">
            <li><strong className="text-fg">Google Maps:</strong> tap your profile picture → <em>Location sharing</em> → <em>New share</em>, choose how long, then pick a contact.</li>
            <li><strong className="text-fg">Apple Find My or Messages:</strong> in a conversation, tap the contact&rsquo;s name → <em>Share My Location</em>, then choose one hour, until the end of the day, or indefinitely.</li>
            <li><strong className="text-fg">WhatsApp:</strong> in a chat, tap the attachment button → <em>Location</em> → <em>Share live location</em>, then choose 15 minutes, 1 hour, or 8 hours.</li>
          </ol>
          <p className="mt-3 text-fg-muted leading-relaxed">
            All three let you stop sharing early. To show someone a route after the fact instead, download it as a GPX file above and send the file. Before you share, read 
            <Link href="/blog/how-to-share-gps-location-safely" className="text-accent hover:underline">how to share your GPS location safely</Link>.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Privacy: the stream stays with you</h2>
          <p className="mt-3 text-fg-muted leading-relaxed">
            Live tracking sounds invasive, but the data path is no different from a single-shot reading — there are just more readings. Every coordinate is delivered to JavaScript inside your own tab; none of them are posted to a server we control, written to any database, or correlated with anything else about your session. The page makes one throttled network call per ten seconds (at most) to translate the latest coordinate into a readable place name, and that request contains nothing but two numbers. A downloaded GPX file stays on your device unless you choose to send it to someone.
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
              { href: '/my-location', t: 'My Location', d: 'Your GPS coordinates + address, one tap' },
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
