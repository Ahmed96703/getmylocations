import Link from 'next/link';
import BlogImage from '../components/BlogImage.jsx';

const faqs = [
  {
    q: 'How do I turn on Location Services on my iPhone?',
    a: 'Open Settings → Privacy & Security → Location Services and toggle the master switch on (it should be green). Then scroll down to the app list and confirm each app you care about is set to "While Using the App" or "Always," with the Precise Location toggle on if you want exact positioning. Without precise mode, the app gets a deliberately fuzzed coordinate accurate only to a few kilometres.',
  },
  {
    q: 'How do I enable location on Android?',
    a: 'Open Settings → Location and toggle "Use location" on at the top. The same screen also shows "App location permissions" — tap any app to choose Allow all the time, Allow only while using the app, Ask every time, or Don\'t allow. Confirm "Use precise location" is on for maps and navigation apps. On Samsung and Xiaomi phones the path may be under Privacy → Permission manager → Location.',
  },
  {
    q: 'Why is Location Services greyed out on my iPhone?',
    a: 'Usually because Screen Time restrictions are blocking it. Open Settings → Screen Time → Content & Privacy Restrictions → Location Services and make sure changes are allowed. A managed work phone (MDM-enrolled) can also lock the switch — in that case your IT administrator controls it.',
  },
  {
    q: 'What does Precise Location actually do?',
    a: 'It controls whether the app gets your real position or a deliberately coarsened one. Android\'s documentation puts approximate location within an area of about 3 square kilometres, while precise location is usually within about 50 metres and often much better. The toggle is per app on both iOS and Android. Turn it on for maps, navigation, and ride-hailing; leave it off for apps that only need to know your city (weather, news, retail loyalty apps) as a privacy compromise.',
  },
  {
    q: 'How do I let one website (not an app) use my location on my phone?',
    a: 'On iPhone, first let the browser itself use location: Settings → Privacy & Security → Location Services → Safari Websites (or Settings → Chrome → Location) → While Using the App. Then, in Safari, open the site, tap the AA icon in the address bar, choose Website Settings and set Location to Allow. In Chrome on Android, tap View site information (the icon left of the address), then Permissions → Location. Reload the page after either change.',
  },
  {
    q: 'Location is on, but a website on my phone still cannot find me. Why?',
    a: 'On iPhone the usual cause is the browser\'s own permission: if Safari Websites (or Chrome) is set to Never under Location Services, every site fails no matter what the site setting says. Check in this order: Location Services on, the browser allowed While Using the App, the site set to Allow, Precise Location on, then reload the page.',
  },
  {
    q: 'My app still does not get location after I enabled everything — what now?',
    a: 'Three usual culprits: (1) battery optimisation is killing the background process — exempt the app under Settings → Apps → [App] → Battery → Unrestricted on Android; (2) the app needs Precise Location specifically, and you granted only Approximate; or (3) on iOS, Low Power Mode is reducing background activity, which can delay updates for apps that are not open. Turn Low Power Mode off for a quick test.',
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

export default function EnableLocationMobile() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <article className="prose-invert">
      <figure className="mb-8 -mt-2">
        <BlogImage
          src="/blog-images/enable-location-on-iphone-and-android-hero.jpg"
          alt="Two smartphone silhouettes side by side, each glowing with a location pin in the centre"
          className="w-full h-auto rounded-xl"
          width={1600}
          height={783}
          loading="eager"
          fetchPriority="high"
        />
      </figure>
      <aside className="mb-6 rounded-xl border border-accent/40 bg-accent/5 p-4" aria-label="Quick answer">
        <p className="text-[11px] uppercase tracking-wider text-accent font-semibold">Quick answer</p>
        <p className="mt-1 text-fg leading-relaxed">On iPhone, open Settings &rarr; Privacy &amp; Security &rarr; Location Services, turn it on, then set the app you need to <em>While Using</em>. For websites, set <em>Safari Websites</em> (or <em>Chrome</em>) there too. On Android, open Settings &rarr; Location and turn on <em>Use location</em>, then allow the app when it asks. For a website, also allow Location in the browser&rsquo;s site settings: the <em>AA</em> menu in Safari, or the icon left of the address in Chrome.</p>
      </aside>
      <p className="text-lg text-fg-muted leading-relaxed">
        A phone with location turned off is a phone that can&rsquo;t do
        half of what people use a phone for. Maps stops navigating.
        Ride-hailing apps can&rsquo;t find you. Delivery apps stop
        showing nearby restaurants. Weather defaults to the wrong city.
        It&rsquo;s usually one of three switches that&rsquo;s in the
        wrong position, and there&rsquo;s a logical order to checking
        them.
      </p>

      <p className="mt-4 text-fg-muted leading-relaxed">
        The three layers, same as on a laptop:
      </p>
      <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
        <li>The <strong>OS-wide Location Services switch</strong>.</li>
        <li>The <strong>per-app permission</strong> &mdash; Maps, Weather, your browser, each one separately allowed. For websites, the browser counts as the app: if Safari or Chrome is not allowed, no site can get your location.</li>
        <li>The <strong>per-site permission</strong> when a website (not an app) asks &mdash; controlled by the browser.</li>
      </ol>
      <p className="mt-3 text-fg-muted leading-relaxed">
        On a phone there&rsquo;s a fourth wrinkle that desktops
        don&rsquo;t have: <strong>Precise Location</strong>. iOS and
        Android both let users grant a coarsened location instead of the real one (Android documents it as an area of about 3&nbsp;square kilometres). Most apps
        ask for precise; if you tapped the wrong option once, an app may
        be running on the fuzzy version without you realising it.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">iPhone &mdash; Location Services and per-app permissions</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        On iOS the path to the master switch is:
      </p>
      <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
        <li>Open <strong>Settings</strong>.</li>
        <li>Scroll down to <strong>Privacy &amp; Security</strong>.</li>
        <li>Tap <strong>Location Services</strong> at the top.</li>
        <li>Toggle <strong>Location Services</strong> on. The toggle has to be green.</li>
      </ol>

      <p className="mt-3 text-fg-muted leading-relaxed">
        Below the master toggle is a list of every app that has ever
        asked for your location, with the current setting next to each.
        The settings are:
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li><strong>Never</strong> &mdash; the app never gets the location, even if you&rsquo;re using it.</li>
        <li><strong>Ask Next Time Or When I Share</strong> &mdash; the app gets prompted again next time it tries.</li>
        <li><strong>While Using the App</strong> &mdash; the app gets the location only while it&rsquo;s open in the foreground.</li>
        <li><strong>Always</strong> &mdash; the app can read your location whenever it wants, including in the background.</li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Tap any app to change its setting. <em>While Using the App</em>{' '}
        is the right answer for most things. <em>Always</em> should be
        reserved for apps that genuinely need background tracking
        (fitness apps recording a run, navigation apps doing turn-by-turn).
      </p>

      <p className="mt-3 text-fg-muted leading-relaxed">
        While you&rsquo;re on the app&rsquo;s settings screen, look for
        the <strong>Precise Location</strong> toggle at the bottom. If
        it&rsquo;s off, the app gets a deliberately coarsened location, typically accurate only to a few kilometres. For maps and navigation apps, you almost
        certainly want this on. For things like a coffee-chain app that
        just wants to know which city you&rsquo;re in, leaving Precise
        Location off is a legitimate privacy choice.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">iPhone &mdash; let your browser use location</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        This is the switch most guides skip, and the most common reason a
        website on an iPhone cannot find you. iOS treats your browser as an
        app, so the browser needs its own permission before any website
        can ask:
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li><strong>Safari:</strong> Settings &rarr; Privacy &amp; Security &rarr; Location Services &rarr; <strong>Safari Websites</strong> &rarr; <strong>While Using the App</strong> (or <em>Ask Next Time</em>), with <strong>Precise Location</strong> on.</li>
        <li><strong>Chrome:</strong> Settings &rarr; <strong>Chrome</strong> &rarr; <strong>Location</strong> &rarr; <strong>While Using the App</strong>. Google&rsquo;s help notes this is where Chrome&rsquo;s location access is set on iPhone and iPad; Chrome then asks each site with an <em>Allow</em> prompt.</li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        If the browser is set to <em>Never</em>, every site fails silently
        or reports that permission was denied, however the site&rsquo;s own
        setting looks.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Safari and Chrome on iPhone &mdash; per-site permissions</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Two different prompts can appear. The first time a browser itself
        wants location, iOS asks whether to allow <em>the app</em> (Allow
        Once, Allow While Using App, Don&rsquo;t Allow). After that, each
        website gets its own, simpler prompt: <em>Allow</em> or{' '}
        <em>Don&rsquo;t Allow</em>. If you tapped Don&rsquo;t Allow for a
        site in Safari and want to undo it:
      </p>
      <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
        <li>Open the site in Safari.</li>
        <li>Tap the <strong>AA</strong> button in the address bar.</li>
        <li>Tap <strong>Website Settings</strong>.</li>
        <li>Set <strong>Location</strong> to <strong>Allow</strong> or <strong>Ask</strong>.</li>
        <li>Reload the page.</li>
      </ol>

      <p className="mt-3 text-fg-muted leading-relaxed">
        For Chrome on iPhone, Google&rsquo;s help documents the iPhone
        setting above rather than a per-site location list inside Chrome:
        Chrome asks each site when the site requests your location. If a site was refused,
        reloading the page lets it ask again.
      </p>

      <figure className="my-10">
        <BlogImage
          src="/blog-images/enable-location-on-iphone-and-android-mid.jpg"
          alt="Single smartphone surrounded by concentric circles on a light blue background, evoking layered location permissions"
          className="w-full h-auto rounded-xl"
          width={1600}
          height={803}
          loading="lazy"
        />
      </figure>

      <h2 className="font-display text-2xl font-bold mt-12">Android &mdash; the master toggle</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Android settings vary slightly across phone manufacturers
        (Samsung&rsquo;s One UI, Google&rsquo;s Pixel UI, Xiaomi&rsquo;s
        MIUI, OnePlus&rsquo;s OxygenOS all rearrange things), but the
        underlying paths are the same. On current Android versions:
      </p>
      <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
        <li>Open <strong>Settings</strong>.</li>
        <li>Tap <strong>Location</strong>. On some phones it sits inside <strong>Privacy</strong> or <strong>Security &amp; privacy</strong>.</li>
        <li>Toggle <strong>Use location</strong> on at the top.</li>
      </ol>
      <p className="mt-3 text-fg-muted leading-relaxed">
        On the same screen, open <strong>Location services</strong> and
        check <strong>Google Location Accuracy</strong>. It adds Wi-Fi and
        mobile-network positioning to GPS, which gives a faster, steadier
        fix indoors.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        If you can&rsquo;t find it, pull down the notification shade and
        look for the <strong>Location</strong> quick-settings tile. Tap
        it once to toggle on/off; long-press it to jump straight to the
        Settings screen.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Android per-app permissions &mdash; four options, three timings</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        On the Location settings screen, look for <strong>App location
        permissions</strong> or <strong>App permissions &rarr;
        Location</strong>. You&rsquo;ll see every app that has ever
        asked for the location, grouped by what they&rsquo;re currently
        allowed to do (<em>Allowed all the time</em>, <em>Allowed only while
        in use</em>, <em>Not allowed</em>). Tap an app to choose one of:
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li><strong>Allow all the time</strong> &mdash; the app can read your location even when you&rsquo;re not using it.</li>
        <li><strong>Allow only while using the app</strong> &mdash; foreground only.</li>
        <li><strong>Ask every time</strong> &mdash; you&rsquo;ll be prompted each session.</li>
        <li><strong>Don&rsquo;t allow</strong> &mdash; denied until you change it.</li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Not every app offers <em>all the time</em>; it only appears for
        apps that ask for background location. On the same
        screen you&rsquo;ll also find <strong>Use precise location</strong>{' '}
        &mdash; same idea as iOS&rsquo;s Precise Location toggle. If
        it&rsquo;s off, the app gets a coarsened position.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Chrome on Android &mdash; per-site permission</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        When a website asks for your location in Chrome on Android, the
        prompt offers <em>Allow this time</em>, <em>Allow while visiting
        the site</em> or <em>Never allow</em>. If you refused it earlier
        and want to undo that:
      </p>
      <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
        <li>Open the site in Chrome.</li>
        <li>Tap <strong>View site information</strong>, the icon to the left of the address (it replaced the padlock in Chrome 117).</li>
        <li>Tap <strong>Permissions</strong>.</li>
        <li>Turn <strong>Location</strong> on, or tap it to change the setting.</li>
        <li>Reload the page.</li>
      </ol>

      <p className="mt-3 text-fg-muted leading-relaxed">
        To clear all site-level location blocks at once, open Chrome&rsquo;s
        three-dot menu &rarr; <strong>Settings</strong> &rarr; <strong>Site
        settings</strong> &rarr; <strong>Location</strong>. Chrome itself
        also needs Android&rsquo;s location permission (Settings &rarr;
        Apps &rarr; Chrome &rarr; Permissions &rarr; Location). Sites you&rsquo;ve
        blocked appear in a list; tap any one and choose <strong>Reset
        permissions</strong>.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The battery-saver gotcha (Android specifically)</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Android&rsquo;s aggressive battery optimization &mdash;
        especially on Samsung, Xiaomi, OnePlus, and Huawei phones
        &mdash; can quietly kill background location for apps it
        decides are using too much power. The app keeps its permission
        on paper but stops actually getting location updates. The
        symptom is &ldquo;the app worked yesterday and stopped working
        today even though I didn&rsquo;t change anything.&rdquo;
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The fix is to exempt the app from battery optimisation.
        <strong> Settings</strong> &rarr; <strong>Apps</strong> &rarr;
        the specific app &rarr; <strong>Battery</strong> &rarr; choose
        <strong> Unrestricted</strong> or <strong>Not optimised</strong>.
        The wording varies by manufacturer. On Samsung phones with One UI 7,
        also open <strong>Settings</strong> &rarr; <strong>Battery</strong>{' '}
        &rarr; <strong>Background usage limits</strong> and add the app to{' '}
        <strong>Never sleeping apps</strong>, so it is not put to sleep
        automatically.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">iOS-specific quirks worth knowing about</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Two settings on iOS are worth knowing about even with everything
        switched on:
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li>
          <strong>Low Power Mode</strong> (Settings &rarr; Battery)
          reduces background activity. Apps you have open still get
          location normally, but apps working in the background may get
          updates later or less often.
        </li>
        <li>
          <strong>Significant Locations</strong> (Settings &rarr; Privacy
          &amp; Security &rarr; Location Services &rarr; System Services
          &rarr; Significant Locations) is the feature that keeps a
          history of places you frequently visit. It&rsquo;s on by
          default. Turning it off doesn&rsquo;t affect normal app
          location at all &mdash; it only stops iOS from building the
          personal-location history. Worth checking if you want to know
          what your phone has remembered.
        </li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">Test the fix</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Quickest way to confirm everything is working: open the{' '}
        <Link href="/my-location" className="text-accent hover:underline font-semibold">My Location tool</Link>{' '}
        on your phone, tap the location button, and tap Allow on the
        permission prompt if it appears. Within a couple of seconds
        you&rsquo;ll see your six-decimal latitude and longitude plus
        an accuracy radius. GPS.gov says GPS-enabled smartphones are
        typically accurate to within 4.9&nbsp;meters (16&nbsp;ft) under
        open sky, and the radius the browser reports is usually somewhat
        larger. Indoors expect tens of meters, because the GPS chip
        can&rsquo;t see the satellites clearly through a roof.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        If the accuracy radius is huge (hundreds of meters or
        kilometres), GPS is probably off or unavailable and your phone
        fell back to Wi-Fi positioning or IP geolocation. Stepping
        outside fixes that almost instantly &mdash; the satellites need
        line-of-sight.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Location is on, but a website still fails</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Check the layers in this order; each one blocks everything below it:
      </p>
      <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
        <li><strong>Phone:</strong> Location Services (iPhone) or Use location (Android) is on.</li>
        <li><strong>Browser app:</strong> Safari Websites or Chrome is set to <em>While Using the App</em> (iPhone), or Chrome has the Location permission (Android).</li>
        <li><strong>Website:</strong> the site is set to <em>Allow</em> in Safari&rsquo;s Website Settings or Chrome&rsquo;s site information.</li>
        <li><strong>Precision:</strong> Precise Location is on for the browser, or the site only gets an approximate area.</li>
        <li><strong>Reload</strong> the page so it asks again.</li>
      </ol>

      <h2 className="font-display text-2xl font-bold mt-12">Still not working?</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        If you&rsquo;ve walked through every switch above and an app or
        website still cannot read your location, the problem is usually
        deeper in the permission stack &mdash; a denied per-site
        permission, an OS-level privacy restriction, or an
        insecure-context error on the page itself. Our{' '}
        <Link href="/fix-location-not-working" className="text-accent hover:underline font-semibold">fix location not working guide</Link>{' '}
        runs through the seven most common reasons, in order, with the
        exact menu paths for each browser.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Frequently asked questions</h2>
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

      <h2 className="font-display text-2xl font-bold mt-12">Related reading</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        For the underlying mechanics &mdash; what your phone actually
        does when an app asks for location, and how it fuses GPS, Wi-Fi,
        and cellular signals &mdash; see
        {' '}<Link href="/blog/how-gps-works" className="text-accent hover:underline">how GPS works</Link>{' '}
        and the
        {' '}<Link href="/blog/browser-geolocation-api-explained" className="text-accent hover:underline">browser geolocation API explained</Link>.
        For the equivalent walkthrough on a laptop or desktop, see the
        {' '}<Link href="/blog/enable-location-on-windows-and-mac" className="text-accent hover:underline">Windows and Mac guide</Link>.
        And if you just want to read your current coordinates fast, the
        {' '}<Link href="/blog/how-to-find-your-gps-coordinates" className="text-accent hover:underline">how to find your GPS coordinates</Link>{' '}
        guide covers every shortcut. To understand the difference between
        the question form and the live-tracking form, the{' '}
        <Link href="/my-location" className="text-accent hover:underline">what is my location guide</Link>{' '}
        and the{' '}
        <Link href="/live-location" className="text-accent hover:underline">live location tracker</Link>{' '}
        each take a different angle.
      </p>
    </article>
    </>
  );
}
