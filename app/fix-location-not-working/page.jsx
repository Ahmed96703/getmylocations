import Link from 'next/link';
import AuthorBio from '../components/AuthorBio.jsx';

export const metadata = {
  title: 'Location Not Working? 7 Fixes for Chrome, Safari, Firefox, Edge, iOS & Android',
  description:
    "Location not working in your browser? Step-by-step fixes for Chrome, Safari, Firefox, Edge, iOS, and Android — re-enable permissions, fix wrong-city errors, and stop GPS drift.",
  keywords: [
    'location not working',
    'fix location',
    'browser location not working',
    'location services not working',
    'gps not working',
  ],
  alternates: { canonical: '/fix-location-not-working' },
  openGraph: {
    title: 'Location Not Working? 7 Fixes for Every Browser and Device',
    description:
      'Step-by-step fixes for Chrome, Safari, Firefox, Edge, iOS, and Android — re-enable permissions, fix wrong-city errors, and stop GPS drift.',
    url: 'https://getmylocations.com/fix-location-not-working',
    type: 'article',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Location Not Working? 7 Fixes for Every Browser',
    description: 'Re-enable permissions, fix wrong-city errors, and stop GPS drift — Chrome, Safari, Firefox, Edge, iOS, Android.',
    images: ['/og-image.png'],
  },
};

const faqs = [
  {
    q: 'Why is my browser location not working?',
    a: 'Almost always one of three reasons: (1) you previously clicked Block on the permission prompt and the browser remembers it forever — you need to manually reset the per-site permission, (2) the OS-level Location Services switch is off, so no browser permission can help, or (3) the page is being loaded over plain HTTP rather than HTTPS, in which case the Geolocation API silently refuses to run. Walk through this guide in order to rule each one out.',
  },
  {
    q: 'Why does the permission prompt never appear?',
    a: 'Either the site has been pre-blocked at the browser level (the red "Location blocked" icon will be in the address bar), or the browser itself has location turned off globally. In Chrome, open chrome://settings/content/location and confirm the top toggle is on. In Safari, check System Settings → Privacy & Security → Location Services. In Firefox, clear the site permissions from about:preferences#privacy.',
  },
  {
    q: 'Why is my location showing the wrong city?',
    a: 'The page is using IP geolocation rather than real GPS — and IP databases are wrong city-level about 25–50% of the time. A VPN, mobile Carrier-Grade NAT, or a stale database entry can put you tens or hundreds of kilometres from your real position. The fix is to grant precise browser-level (GPS) permission instead of relying on IP.',
  },
  {
    q: 'Does a VPN affect my location accuracy?',
    a: 'It only affects IP-based location, not GPS. If a page reads your IP to guess a city, a VPN moves your apparent location to wherever the VPN exit server is. If a page uses the browser Geolocation API with your permission, it gets your real GPS/Wi-Fi coordinate regardless of any VPN. Disconnect the VPN if you specifically need IP-based location to be right.',
  },
  {
    q: 'iPhone says location services are off — how do I turn them back on?',
    a: 'Open Settings → Privacy & Security → Location Services and turn the master switch on. Then scroll down, tap your browser (Safari or Chrome), and choose While Using the App with Precise Location enabled. Some sites also need a separate per-site allow under Safari → Settings for Websites → Location.',
  },
  {
    q: 'Does the Geolocation API work without HTTPS?',
    a: 'No. Modern browsers refuse to expose location to any page loaded over plain HTTP or from a local file:// URL. The call returns a "permission denied" error silently. If you are testing a local site, use a local HTTPS proxy or open it through localhost (which most browsers treat as secure).',
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getmylocations.com/' },
    { '@type': 'ListItem', position: 2, name: 'Fix Location Not Working', item: 'https://getmylocations.com/fix-location-not-working' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Fix Location Not Working in Any Browser',
  description: 'Step-by-step guide to fixing browser geolocation across Chrome, Safari, Firefox, Edge, iOS, and Android.',
  author: { '@type': 'Person', name: 'Ahmed Anwar' },
  step: [
    { '@type': 'HowToStep', name: 'Identify the symptom', text: 'Match the symptom (blocked icon, no prompt, wrong city, drifting coordinates, or page hangs) to the correct fix.' },
    { '@type': 'HowToStep', name: 'Re-enable browser permission', text: 'Reset the per-site permission via the address-bar lock icon → Site settings → Location → Ask.' },
    { '@type': 'HowToStep', name: 'Re-enable OS-level location', text: 'Open the system Privacy or Location panel and confirm the master switch and the browser entry are both on.' },
    { '@type': 'HowToStep', name: 'Switch from IP to GPS', text: 'Grant precise location on the permission prompt so the page uses GPS instead of IP geolocation.' },
    { '@type': 'HowToStep', name: 'Verify with a known-good tool', text: 'Open the My Location tool to confirm the fix worked.' },
  ],
};

export default function FixLocationNotWorking() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main role="main" className="max-w-3xl mx-auto px-5 py-12 prose-invert">
        <nav aria-label="Breadcrumb" className="text-xs text-fg-subtle mb-4 not-prose">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-fg-muted">Fix Location Not Working</li>
          </ol>
        </nav>

        <article>
        <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">Troubleshooting Guide</p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight mt-2 leading-[1.1]">
          Fix Location Not Working — a complete browser &amp; GPS troubleshooting guide
        </h1>
        <p className="mt-4 text-lg text-fg-muted leading-relaxed">
          Location features can fail in a dozen different ways, and the error message you see rarely
          tells you which one. This guide walks through the seven most common causes — from a denied
          browser prompt to a VPN that&apos;s rewriting your IP — and exactly what to click to fix each
          one, on Chrome, Safari, Firefox, Edge, iOS, and Android.
        </p>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">Start here: which problem do you actually have?</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Before you change any setting, identify the symptom. Different problems need different
          fixes, and trying the wrong fix can lock you out of your settings even further.
        </p>

        <div className="mt-5 glass rounded-2xl p-5 ring-1 ring-line">
          <ol className="space-y-3 text-fg-muted">
            <li><strong className="text-fg">Browser shows a small red &ldquo;blocked&rdquo; icon in the address bar</strong> &rarr; you previously denied the permission prompt. Jump to <a className="text-accent hover:underline" href="#chrome">re-enabling browser location</a>.</li>
            <li><strong className="text-fg">Page says &ldquo;location permission denied&rdquo; or never prompts</strong> &rarr; the site is blocked by your browser&apos;s site settings. Same fix.</li>
            <li><strong className="text-fg">Map shows the wrong city or country</strong> &rarr; either a VPN/proxy is rewriting your IP or you only granted IP-level (not GPS-level) accuracy. Jump to <a className="text-accent hover:underline" href="#wrong-city">wrong city showing</a>.</li>
            <li><strong className="text-fg">Coordinates fluctuate wildly every few seconds</strong> &rarr; GPS signal is weak (indoors, surrounded by glass/metal) or you&apos;re on Wi-Fi-only positioning. Jump to <a className="text-accent hover:underline" href="#weak-signal">weak signal fixes</a>.</li>
            <li><strong className="text-fg">Nothing happens — page just hangs</strong> &rarr; the geolocation API is being blocked at the OS or network level. Jump to <a className="text-accent hover:underline" href="#nothing">advanced diagnostics</a>.</li>
          </ol>
        </div>

        <hr className="my-10 border-line" />

        <h2 id="chrome" className="font-display text-2xl font-bold">1. Re-enable browser location in Chrome (desktop)</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Chrome remembers the &ldquo;Block&rdquo; choice forever. Re-prompting the user is not enough — you have
          to manually reset the per-site permission. Here&apos;s the fastest path:
        </p>
        <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
          <li>Open the site whose location is broken (e.g. <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">getmylocations.com</code>).</li>
          <li>Click the small lock icon (or tune icon, on newer Chrome) just left of the URL.</li>
          <li>Click <strong>Site settings</strong>.</li>
          <li>Find the <strong>Location</strong> row and change it from <em>Block</em> to <strong>Ask</strong> (or <strong>Allow</strong>).</li>
          <li>Reload the tab. The permission prompt should re-appear; click <strong>Allow</strong>.</li>
        </ol>
        <p className="mt-3 text-fg-muted leading-relaxed">
          If you don&apos;t see the Location row at all, the site never asked because Chrome itself has
          location disabled globally. Open <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">chrome://settings/content/location</code> in the address bar
          and make sure the top toggle is on. Then revisit the site.
        </p>

        <h2 className="font-display text-2xl font-bold mt-10">2. Re-enable location in Safari (macOS &amp; iOS)</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Safari has <em>two</em> separate gates: Safari&apos;s own site permission, and macOS/iOS&apos;s
          system Location Services. Both have to be on.
        </p>

        <h3 className="font-display text-lg font-semibold mt-6 text-fg">macOS Safari</h3>
        <ol className="mt-2 space-y-2 text-fg-muted list-decimal list-inside">
          <li>System Settings &rarr; Privacy &amp; Security &rarr; Location Services. Confirm it&apos;s on and Safari is checked.</li>
          <li>In Safari: Safari menu &rarr; Settings &rarr; Websites &rarr; Location. Find the site, change to <em>Allow</em>.</li>
          <li>Reload.</li>
        </ol>

        <h3 className="font-display text-lg font-semibold mt-6 text-fg">iOS Safari (iPhone / iPad)</h3>
        <ol className="mt-2 space-y-2 text-fg-muted list-decimal list-inside">
          <li>Settings &rarr; Privacy &amp; Security &rarr; Location Services &rarr; turn on globally.</li>
          <li>Scroll down to Safari Websites &rarr; set to <em>Ask Next Time Or When I Share</em> or <em>While Using the App</em>.</li>
          <li>Open the site, tap the <em>aA</em> icon in the address bar &rarr; Website Settings &rarr; Location &rarr; Allow.</li>
          <li>Reload.</li>
        </ol>

        <h2 className="font-display text-2xl font-bold mt-10">3. Re-enable location in Firefox</h2>
        <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
          <li>Click the lock icon left of the URL &rarr; <strong>Clear permissions and reload</strong>. This is the nuclear option and the most reliable.</li>
          <li>Alternative: <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">about:preferences#privacy</code> &rarr; scroll to Permissions &rarr; click <strong>Settings&hellip;</strong> next to Location &rarr; remove the blocked entry &rarr; Save Changes.</li>
          <li>Reload the page. Click Allow when prompted.</li>
        </ol>

        <h2 className="font-display text-2xl font-bold mt-10">4. Re-enable location in Edge</h2>
        <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
          <li>Click the lock icon &rarr; <strong>Permissions for this site</strong>.</li>
          <li>Change <strong>Location</strong> from Block to Ask.</li>
          <li>Reload, then approve when prompted.</li>
        </ol>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Edge also respects Windows&apos; system Location Privacy setting. If you blocked location at
          the OS level, no browser permission will help: open Windows Settings &rarr; Privacy &amp;
          security &rarr; Location, and turn on both the master switch and the browser entry.
        </p>

        <hr className="my-10 border-line" />

        <h2 id="wrong-city" className="font-display text-2xl font-bold">5. Why is my location wrong? (and how to fix it)</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          If your browser shows a city you&apos;ve never been to, the page is almost always doing
          <em> IP-based geolocation</em>, not real GPS. IP geolocation looks up a database row
          mapping your public IP address to a guessed city, and the database can be:
        </p>
        <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
          <li><strong>Stale.</strong> Your ISP may have re-assigned a block of IPs and the database hasn&apos;t caught up. Common for residential broadband.</li>
          <li><strong>Routing-based.</strong> Mobile carriers often route traffic through a regional aggregation point. Your IP looks like it&apos;s in the carrier&apos;s gateway city, not yours.</li>
          <li><strong>Rewritten by a VPN.</strong> Any VPN, including the &ldquo;privacy&rdquo; ones built into some browsers, swaps your real IP for one in another city or country.</li>
          <li><strong>Rewritten by a corporate proxy.</strong> Office and school networks often back-haul outbound traffic to a head office, so you appear to be wherever that office is.</li>
        </ul>

        <p className="mt-4 text-fg-muted leading-relaxed">
          <strong>The fix:</strong> grant <em>precise</em> browser-level location (the GPS permission
          prompt) instead of just letting the page rely on IP. With GPS allowed, your real
          coordinates come straight from your device&apos;s GNSS chip and bypass IP geolocation entirely.
          For more on the difference, read our <Link href="/blog/what-is-ip-location-and-how-accurate" className="text-accent hover:underline">guide to IP location accuracy</Link>.
        </p>

        <hr className="my-10 border-line" />

        <h2 id="weak-signal" className="font-display text-2xl font-bold">6. Coordinates fluctuating — fix a weak GPS signal</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          If your latitude and longitude drift by 50+ meters every few seconds, the device is
          struggling to get a good GPS fix. The most common culprits:
        </p>
        <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
          <li><strong>Indoors with little sky view.</strong> GPS needs a line of sight to at least four satellites. Move to a window or step outside for a clean fix.</li>
          <li><strong>Tall buildings reflecting signals (urban canyon).</strong> Manhattan, central Tokyo, and London&apos;s financial district are notorious. Multi-path reflections add tens of meters of error.</li>
          <li><strong>Inside a car with a metallized windshield.</strong> Some &ldquo;low-E&rdquo; coatings block GPS. Holding the phone closer to the side window often helps.</li>
          <li><strong>Phone in battery-saver mode.</strong> Several OSes downsample GPS in battery saver to once every few minutes. Disable it temporarily.</li>
          <li><strong>Wi-Fi off.</strong> Modern devices fuse GPS with nearby Wi-Fi BSSIDs for faster, more accurate fixes. Turning Wi-Fi off makes positioning slower and less precise even when you&apos;re not connected to a network.</li>
        </ul>

        <hr className="my-10 border-line" />

        <h2 id="nothing" className="font-display text-2xl font-bold">7. Nothing happens — advanced diagnostics</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          If the page just hangs and never resolves, location is being blocked at a layer below the
          browser. Check these in order:
        </p>
        <ol className="mt-3 space-y-3 text-fg-muted list-decimal list-inside">
          <li>
            <strong>OS-level switch.</strong> Windows: Settings &rarr; Privacy &amp; security &rarr;
            Location, master switch on. macOS: System Settings &rarr; Privacy &amp; Security &rarr;
            Location Services, on. iOS/Android: Settings &rarr; Location &rarr; on.
          </li>
          <li>
            <strong>App-level switch.</strong> The browser itself needs OS permission to access
            location. Check the same Privacy panel for an entry like &ldquo;Chrome&rdquo; or &ldquo;Safari&rdquo;.
          </li>
          <li>
            <strong>Incognito / private mode.</strong> Most browsers refuse to remember location
            grants in private windows and re-prompt every time. If you keep denying it out of habit,
            try a normal window.
          </li>
          <li>
            <strong>Insecure context.</strong> The Geolocation API only works over HTTPS. If you&apos;re
            opening a site via plain <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">http://</code> or
            <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm"> file://</code>, the call silently fails.
          </li>
          <li>
            <strong>Hardened privacy extensions.</strong> Tools like LibreWolf, Brave shields, and
            certain &ldquo;privacy&rdquo; add-ons spoof or block geolocation by default. Temporarily disable
            them to test.
          </li>
          <li>
            <strong>Mobile data saver / data warnings.</strong> Some carriers throttle background
            location calls. Switching to Wi-Fi often clears this.
          </li>
        </ol>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">Verify the fix worked</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Once you&apos;ve made the change, the easiest way to confirm location is working is to open the{' '}
          <Link href="/my-location" className="text-accent hover:underline font-semibold">My Location tool</Link>.
          It runs entirely in your browser, requests the
          standard Geolocation API permission, and shows your latitude, longitude, accuracy radius,
          and city within about two seconds of you clicking Allow. If you see fresh coordinates and a
          pin on the map, you&apos;re good.
        </p>
        <p className="mt-3 text-fg-muted leading-relaxed">
          To check that <em>live</em> (continuously updating) location works as well — useful if
          you&apos;re troubleshooting a watchPosition-based app — try the{' '}
          <Link href="/live-location" className="text-accent hover:underline">Live Location tracker</Link>.
          To compare against IP-only positioning, the{' '}
          <Link href="/ip-location" className="text-accent hover:underline">IP Location page</Link>{' '}
          works without any permission prompt at all.
        </p>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Still stuck? Email us at <a className="text-accent hover:underline" href="mailto:hello@getmylocations.com">hello@getmylocations.com</a> with your browser,
          OS version, and a screenshot. We answer every troubleshooting email within a day.
        </p>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
        <div className="glass mt-4 rounded-2xl divide-y divide-line-subtle not-prose">
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

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">Related guides</h2>
        <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
          <li><Link href="/blog/what-is-ip-location-and-how-accurate" className="text-accent hover:underline">What is IP location and how accurate is it?</Link></li>
          <li><Link href="/blog/enable-location-on-iphone-and-android" className="text-accent hover:underline">Enable location on iPhone and Android — complete setup</Link></li>
          <li><Link href="/blog/enable-location-on-windows-and-mac" className="text-accent hover:underline">Enable Location Services on Windows and Mac</Link></li>
          <li><Link href="/blog/browser-geolocation-api-explained" className="text-accent hover:underline">Browser Geolocation API explained — what websites can and can&apos;t see</Link></li>
          <li><Link href="/blog/how-gps-works" className="text-accent hover:underline">How GPS works — the satellite math behind your coordinates</Link></li>
          <li><Link href="/blog/how-to-find-your-gps-coordinates" className="text-accent hover:underline">How to find your GPS coordinates</Link></li>
          <li><Link href="/what-is-my-location" className="text-accent hover:underline">What is my location? — the in-depth guide</Link></li>
        </ul>

        <AuthorBio />
      </article>
    </main>
    </>
  );
}
