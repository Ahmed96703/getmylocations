import Link from 'next/link';

export default function EnableLocationMobile() {
  return (
    <article className="prose-invert">
      <figure className="mb-8 -mt-2">
        <img
          src="/blog-images/enable-location-on-iphone-and-android-hero.jpg"
          alt="Two smartphone silhouettes side by side, each glowing with a location pin in the centre"
          className="w-full h-auto rounded-xl"
          loading="eager"
        />
      </figure>
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
        <li>The <strong>per-app permission</strong> &mdash; Maps, Weather, your browser, each one separately allowed.</li>
        <li>The <strong>per-site permission</strong> when a website (not an app) asks &mdash; controlled by the browser.</li>
      </ol>
      <p className="mt-3 text-fg-muted leading-relaxed">
        On a phone there&rsquo;s a fourth wrinkle that desktops
        don&rsquo;t have: <strong>Precise Location</strong>. iOS and
        Android both let users grant a coarsened, &ldquo;within a few
        kilometres&rdquo; location instead of the real one. Most apps
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
        Tap any app to change its setting. <em>While Using the App</em>
        is the right answer for most things. <em>Always</em> should be
        reserved for apps that genuinely need background tracking
        (fitness apps recording a run, navigation apps doing turn-by-turn).
      </p>

      <p className="mt-3 text-fg-muted leading-relaxed">
        While you&rsquo;re on the app&rsquo;s settings screen, look for
        the <strong>Precise Location</strong> toggle at the bottom. If
        it&rsquo;s off, the app gets a fuzzed location accurate only to
        a few kilometres. For maps and navigation apps, you almost
        certainly want this on. For things like a coffee-chain app that
        just wants to know which city you&rsquo;re in, leaving Precise
        Location off is a legitimate privacy choice.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Safari and Chrome on iPhone &mdash; per-site permissions</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        When a website on iOS Safari asks for your location, you see a
        one-time prompt with three options: Allow Once, Allow While
        Using App, or Don&rsquo;t Allow. If you tapped Don&rsquo;t Allow
        and want to undo it for a specific site:
      </p>
      <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
        <li>Open the site in Safari.</li>
        <li>Tap the <strong>AA</strong> button in the address bar (or the small &lt; / &gt; icons on older iOS).</li>
        <li>Tap <strong>Website Settings</strong>.</li>
        <li>Set <strong>Location</strong> to <strong>Allow</strong> or <strong>Ask</strong>.</li>
        <li>Refresh the page.</li>
      </ol>

      <p className="mt-3 text-fg-muted leading-relaxed">
        Chrome on iPhone uses Apple&rsquo;s WebKit under the hood (every
        browser on iOS does &mdash; that&rsquo;s an Apple App Store
        rule), so the underlying permission flow is the same. To manage
        per-site permissions in Chrome on iOS, tap the three-dot menu
        &rarr; <strong>Settings</strong> &rarr; <strong>Content
        Settings</strong> &rarr; <strong>Default browser
        permissions</strong>.
      </p>

      <figure className="my-10">
        <img
          src="/blog-images/enable-location-on-iphone-and-android-mid.jpg"
          alt="Single smartphone surrounded by concentric circles on a light blue background, evoking layered location permissions"
          className="w-full h-auto rounded-xl"
          loading="lazy"
        />
      </figure>

      <h2 className="font-display text-2xl font-bold mt-12">Android &mdash; the master toggle</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Android settings vary slightly across phone manufacturers
        (Samsung&rsquo;s One UI, Google&rsquo;s Pixel UI, Xiaomi&rsquo;s
        MIUI, OnePlus&rsquo;s OxygenOS all rearrange things), but the
        underlying paths are the same. The standard path on a stock
        Android 13/14 device:
      </p>
      <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
        <li>Open <strong>Settings</strong>.</li>
        <li>Tap <strong>Location</strong>. On some phones it sits inside <strong>Privacy</strong> or <strong>Security &amp; privacy</strong>.</li>
        <li>Toggle <strong>Use location</strong> on at the top.</li>
      </ol>
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
        allowed to do:
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li><strong>Allowed all the time</strong> &mdash; the app can read your location even when you&rsquo;re not using it.</li>
        <li><strong>Allowed only while in use</strong> &mdash; foreground only.</li>
        <li><strong>Ask every time</strong> &mdash; you&rsquo;ll be prompted each session.</li>
        <li><strong>Not allowed</strong> &mdash; permanently denied.</li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Tap any app to change which bucket it&rsquo;s in. On the same
        screen you&rsquo;ll also find <strong>Use precise location</strong>
        &mdash; same idea as iOS&rsquo;s Precise Location toggle. If
        it&rsquo;s off, the app gets a coarsened position.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Chrome on Android &mdash; per-site permission</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        When a website asks for your location in Chrome on Android,
        you&rsquo;ll see an Allow/Block prompt. If you blocked it
        previously and want to undo:
      </p>
      <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
        <li>Open the site in Chrome.</li>
        <li>Tap the lock icon to the left of the URL.</li>
        <li>Tap <strong>Permissions</strong>.</li>
        <li>Tap <strong>Location</strong> and choose <strong>Allow</strong> or <strong>Ask</strong>.</li>
        <li>Refresh the page.</li>
      </ol>

      <p className="mt-3 text-fg-muted leading-relaxed">
        To clear all site-level location blocks at once, open Chrome&rsquo;s
        three-dot menu &rarr; <strong>Settings</strong> &rarr; <strong>Site
        settings</strong> &rarr; <strong>Location</strong>. Sites you&rsquo;ve
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
        The wording varies by manufacturer; on Samsung One UI the same
        setting is buried under <strong>Settings</strong> &rarr;
        <strong> Device care</strong> &rarr; <strong>Battery</strong> &rarr;
        <strong> Background usage limits</strong>.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">iOS-specific quirks worth knowing about</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Two things on iOS can silently affect location accuracy even
        with everything switched on:
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li>
          <strong>Low Power Mode</strong> (Settings &rarr; Battery)
          throttles background GPS sampling. Foreground apps still work,
          but anything trying to read location in the background gets
          coarser, slower updates.
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
        Quickest way to confirm everything is working: open
        {' '}<Link href="/" className="text-accent hover:underline font-semibold">GetMyLocations</Link>{' '}
        on your phone, tap the location button, and tap Allow on the
        permission prompt if it appears. Within a couple of seconds
        you&rsquo;ll see your six-decimal latitude and longitude plus
        an accuracy radius. Outdoors on a phone, the accuracy radius
        should be 3&ndash;5 meters. Indoors it&rsquo;s typically
        10&ndash;50 meters because the GPS chip can&rsquo;t see the
        satellites clearly through a roof.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        If the accuracy radius is huge (hundreds of meters or
        kilometres), GPS is probably off or unavailable and your phone
        fell back to Wi-Fi positioning or IP geolocation. Stepping
        outside fixes that almost instantly &mdash; the satellites need
        line-of-sight.
      </p>

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
        guide covers every shortcut.
      </p>
    </article>
  );
}
