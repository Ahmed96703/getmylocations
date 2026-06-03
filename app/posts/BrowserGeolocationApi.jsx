import Link from 'next/link';

export default function BrowserGeolocationApi() {
  return (
    <article className="prose-invert">
      <p className="text-lg text-slate-300/90 leading-relaxed">
        If you&rsquo;ve ever called
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">navigator.geolocation.getCurrentPosition</code>{' '}
        once and assumed you understood what it does &mdash; same. Then I
        built a site whose entire purpose is to call that one function in
        every plausible permutation, and the surprising answer is that the
        API itself is the small part. Most of what looks like behaviour of
        the browser is actually behaviour of the operating system underneath
        it, and the same five lines of JavaScript can return a 3-meter
        GPS fix, a 25-meter Wi-Fi guess, or a 5-kilometre IP estimate
        depending on what the OS decides to hand back.
      </p>

      <p className="mt-4 text-slate-300/90 leading-relaxed">
        This article is the version of the W3C Geolocation API I wish I
        had when I started. What the page sees. What it doesn&rsquo;t.
        What
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">enableHighAccuracy</code>{' '}
        really does. Which error codes are recoverable and which aren&rsquo;t.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The surface area is tiny</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The browser exposes
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">navigator.geolocation</code>{' '}
        with three methods:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">getCurrentPosition(success, error, options)</code> &mdash; ask once for the current location.</li>
        <li><code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">watchPosition(success, error, options)</code> &mdash; subscribe to a stream of updates as the user moves.</li>
        <li><code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">clearWatch(watchId)</code> &mdash; stop a previous subscription.</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The first call (of either method) triggers the permission prompt:
        &ldquo;getmylocations.com wants to use your location: Allow /
        Block.&rdquo; The actual coordinate only flows back after Allow.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What lands in the success callback</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        A
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">GeolocationPosition</code>{' '}
        with two parts: a timestamp and a
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">coords</code>{' '}
        dictionary containing:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><strong>latitude</strong> and <strong>longitude</strong> &mdash; decimal degrees, the actual coordinate.</li>
        <li><strong>accuracy</strong> &mdash; the radius of the 95% confidence circle in meters. An accuracy of 8 means the device is 95% sure you&rsquo;re within 8 m of the reported point.</li>
        <li><strong>altitude</strong> and <strong>altitudeAccuracy</strong> &mdash; often <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">null</code> because most desktops don&rsquo;t measure altitude.</li>
        <li><strong>heading</strong> &mdash; direction of motion in degrees from true north, only meaningful in watch mode on a moving device.</li>
        <li><strong>speed</strong> &mdash; meters per second, also only meaningful in watch mode.</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        That&rsquo;s the whole payload. The page does <em>not</em> receive:
        which satellites were heard, which Wi-Fi BSSIDs were scanned, the
        user&rsquo;s IP (that comes from the connection itself, not from
        the API), the device&rsquo;s unique identifier, or any history.
        Each call returns a fresh reading; nothing about previous calls
        is shared with the page.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Where the coordinate actually comes from</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The browser doesn&rsquo;t measure location. It asks the OS, which
        fuses signals depending on hardware and permissions:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><strong>GNSS satellites.</strong> The most accurate option when available, but requires a GPS chip. Most desktops don&rsquo;t have one. Phones, tablets, and modern Macs do.</li>
        <li><strong>Wi-Fi BSSID lookup.</strong> Apple and Google keep global databases of Wi-Fi access points keyed to GPS-collected coordinates. The OS scans visible Wi-Fi, queries the database, gets back a position. Typical accuracy: 10&ndash;25 m.</li>
        <li><strong>Cell-tower triangulation.</strong> Coarse but useful indoors. The carrier&rsquo;s knowledge of which tower you&rsquo;re on and signal strength produces a ~500&ndash;2000 m fix.</li>
        <li><strong>IP geolocation.</strong> Last-resort fallback. Often kilometres off.</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The OS picks the most accurate combination it can and presents a
        single coordinate. The
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">accuracy</code>{' '}
        field is the only signal you get about which source won &mdash;
        under 10 m almost always means GPS, 20&ndash;100 m typically Wi-Fi,
        1000+ usually IP-only.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">enableHighAccuracy is not always what you want</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The options object accepts the flag
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">{`{ enableHighAccuracy: true }`}</code>.
        Setting it asks the OS to use GNSS even when it&rsquo;s slower and
        more battery-hungry. Off, the OS may return a cached Wi-Fi-only
        fix in milliseconds. On, it spends a few seconds talking to
        satellites for a meter-grade reading.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Counterintuitively, high accuracy is sometimes <em>worse</em> for
        the user. If you&rsquo;re indoors with no GPS line-of-sight, asking
        for high accuracy makes the OS fight a losing battle for several
        seconds before giving up and falling back anyway. For most
        map-style use cases, the default is right.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The permission model has more layers than you&rsquo;d expect</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The API is gated by a stack of restrictions, not one:
      </p>
      <ol className="mt-3 space-y-2 text-slate-300/90 list-decimal list-inside">
        <li><strong>HTTPS required.</strong> The API silently fails on plain HTTP. This blocks a man-in-the-middle attacker from injecting a fake location.</li>
        <li><strong>User gesture required (sometimes).</strong> Some browsers refuse to show the prompt unless the call originates inside a click handler, to prevent surprise prompts on page load.</li>
        <li><strong>Per-site permission, remembered.</strong> The user&rsquo;s choice is stored per origin. They can revoke it at any time from the browser&rsquo;s site-settings UI.</li>
        <li><strong>Iframe restrictions.</strong> Modern browsers require third-party iframes to carry an explicit <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">allow=&quot;geolocation&quot;</code> attribute to even ask.</li>
        <li><strong>OS-level kill switch.</strong> If the user has disabled location at the operating-system level, the browser falls back to IP-only regardless of what the page does.</li>
      </ol>

      <h2 className="font-display text-2xl font-bold mt-12">The three error codes and what to do about each</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The error callback receives a
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">GeolocationPositionError</code>{' '}
        with a numeric code. They behave very differently:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><strong>1 (PERMISSION_DENIED)</strong> &mdash; the user clicked Block, or the OS has location off. Calling again won&rsquo;t help; the user has to manually re-enable in site settings. <em>Recover by showing them the path.</em></li>
        <li><strong>2 (POSITION_UNAVAILABLE)</strong> &mdash; the OS tried and couldn&rsquo;t produce a fix. Usually means GPS is unavailable (indoors) and the Wi-Fi/cell fallback also failed. Retrying might help; moving outside helps more.</li>
        <li><strong>3 (TIMEOUT)</strong> &mdash; the request didn&rsquo;t complete within the timeout. The default is no timeout, so this only fires if you set one. Increasing the timeout usually fixes it.</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Distinguishing these matters because the recovery flow is different
        for each. The biggest UX win I ever shipped on this site was a
        dedicated permission-denied screen that walks the user through
        re-enabling location for the site in their specific browser, with
        the right instructions for Chrome, Safari, and Firefox.
        That alone roughly doubled successful re-fixes.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What a page can and can&rsquo;t infer about you</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Once you grant permission, the page sees a coordinate. From one
        reading, less is deducible than people fear:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><strong>From one fix:</strong> your city, the building (if it&rsquo;s a known one), your altitude when reported, whether you&rsquo;re moving (in watch mode), rough activity (walking vs driving) from speed.</li>
        <li><strong>Not from one fix:</strong> your name, your phone number, your past locations, who you live with, your home/work address &mdash; unless this <em>is</em> your home or work and they cross-reference.</li>
        <li><strong>From watching over time:</strong> almost everything in the previous list. A site that&rsquo;s seen you for a week can guess where you live and work.</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The single most useful privacy lever a user has is to revoke
        permission for sites that don&rsquo;t need live location. A map
        site asking once per visit is fine. A games or social app
        silently calling
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">watchPosition</code>{' '}
        in the background is something to be skeptical of.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">How this site uses the API</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        <Link href="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link> calls
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">getCurrentPosition</code>{' '}
        once on page load after permission is granted, then optionally
        switches to
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">watchPosition</code>{' '}
        if the user enables live tracking. Coordinates are processed
        entirely in the browser. Map tiles and reverse-geocoding requests
        go to third parties as described in the
        {' '}<Link href="/privacy-policy" className="text-electric-400 hover:underline">Privacy Policy</Link>,
        but the raw coordinate itself is never sent to a server I operate.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        If you want to feel the difference between accuracy values
        directly, open the tool and toggle precise-location off and back
        on in your browser&rsquo;s site settings. The accuracy radius
        drawn on the map jumps from ~5 m to ~10 km in real time. More
        intuitive than any blog post.
      </p>
    </article>
  );
}
