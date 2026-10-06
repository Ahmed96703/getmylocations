import Link from 'next/link';

export default function BrowserGeolocationApi() {
  return (
    <article className="prose-invert">
      <p className="text-lg text-fg-muted leading-relaxed">
        If you&rsquo;ve ever called
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">navigator.geolocation.getCurrentPosition</code>{' '}
        once and assumed you understood what it does &mdash; same. Then I
        built a site whose entire purpose is to call that one function in
        every plausible permutation, and the surprising answer is that the
        API itself is the small part. Most of what looks like behaviour of
        the browser is actually behaviour of the operating system underneath
        it, and the same five lines of JavaScript can return a GPS fix
        good to a few meters, a Wi-Fi estimate tens of meters out, or a
        coarse network guess kilometres away, depending on what the OS
        decides to hand back.
      </p>

      <p className="mt-4 text-fg-muted leading-relaxed">
        This article is the version of the W3C Geolocation API I wish I
        had when I started. What the page sees. What it doesn&rsquo;t.
        What
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">enableHighAccuracy</code>{' '}
        really does. Which error codes are recoverable and which aren&rsquo;t.
      </p>

      <figure className="my-10 flex flex-col items-center">
        <svg viewBox="0 0 520 280" className="w-full max-w-2xl" role="img" aria-label="Flow of a browser geolocation request: page calls the browser, which asks the operating system, which fuses GPS, Wi-Fi, cell, and IP signals into one coordinate">
          <rect x="10" y="120" width="90" height="44" rx="8" fill="none" className="stroke-line" strokeWidth="1.5" />
          <text x="55" y="140" textAnchor="middle" className="fill-fg" fontSize="11" fontWeight="700">Page</text>
          <text x="55" y="156" textAnchor="middle" className="fill-fg-subtle" fontSize="9">getCurrentPosition()</text>
          <rect x="130" y="120" width="90" height="44" rx="8" fill="none" className="stroke-line" strokeWidth="1.5" />
          <text x="175" y="140" textAnchor="middle" className="fill-fg" fontSize="11" fontWeight="700">Browser</text>
          <text x="175" y="156" textAnchor="middle" className="fill-fg-subtle" fontSize="9">permission check</text>
          <rect x="250" y="120" width="90" height="44" rx="8" fill="none" className="stroke-accent" strokeWidth="2" />
          <text x="295" y="140" textAnchor="middle" className="fill-fg" fontSize="11" fontWeight="700">OS</text>
          <text x="295" y="156" textAnchor="middle" className="fill-fg-subtle" fontSize="9">signal fusion</text>
          <rect x="370" y="30" width="140" height="34" rx="6" fill="none" className="stroke-line" strokeWidth="1.5" />
          <text x="440" y="51" textAnchor="middle" className="fill-fg-muted" fontSize="11">GPS satellites · meters</text>
          <rect x="370" y="78" width="140" height="34" rx="6" fill="none" className="stroke-line" strokeWidth="1.5" />
          <text x="440" y="99" textAnchor="middle" className="fill-fg-muted" fontSize="11">Wi-Fi lookup · tens of m</text>
          <rect x="370" y="126" width="140" height="34" rx="6" fill="none" className="stroke-line" strokeWidth="1.5" />
          <text x="440" y="147" textAnchor="middle" className="fill-fg-muted" fontSize="11">Cell tower · hundreds of m+</text>
          <rect x="370" y="174" width="140" height="34" rx="6" fill="none" className="stroke-line" strokeWidth="1.5" />
          <text x="440" y="195" textAnchor="middle" className="fill-fg-muted" fontSize="11">IP fallback · kilometres</text>
          <line x1="100" y1="142" x2="128" y2="142" className="stroke-fg-subtle" strokeWidth="1.5" />
          <polygon points="125,138 132,142 125,146" className="fill-fg-subtle" />
          <line x1="220" y1="142" x2="248" y2="142" className="stroke-fg-subtle" strokeWidth="1.5" />
          <polygon points="245,138 252,142 245,146" className="fill-fg-subtle" />
          <line x1="340" y1="132" x2="370" y2="47" className="stroke-fg-subtle" strokeWidth="1" opacity="0.55" />
          <line x1="340" y1="138" x2="370" y2="95" className="stroke-fg-subtle" strokeWidth="1" opacity="0.55" />
          <line x1="340" y1="146" x2="370" y2="143" className="stroke-fg-subtle" strokeWidth="1" opacity="0.55" />
          <line x1="340" y1="152" x2="370" y2="191" className="stroke-fg-subtle" strokeWidth="1" opacity="0.55" />
          <text x="200" y="248" textAnchor="middle" className="fill-fg-subtle" fontSize="10" fontStyle="italic">single coordinate flows back</text>
          <path d="M 290 224 Q 175 200 70 224" fill="none" className="stroke-accent" strokeWidth="1.5" strokeDasharray="4,3" />
          <polygon points="76,221 67,225 73,229" className="fill-accent" />
        </svg>
        <figcaption className="mt-3 text-xs text-fg-subtle text-center max-w-md mx-auto leading-relaxed">
          The browser never measures location itself. It asks the OS, which picks whichever combination of signals is available and hands one coordinate back.
        </figcaption>
      </figure>

      <h2 className="font-display text-2xl font-bold mt-12">The surface area is tiny</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The browser exposes
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">navigator.geolocation</code>{' '}
        with three methods:
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li><code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">getCurrentPosition(success, error, options)</code> &mdash; ask once for the current location.</li>
        <li><code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">watchPosition(success, error, options)</code> &mdash; subscribe to a stream of updates as the user moves.</li>
        <li><code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">clearWatch(watchId)</code> &mdash; stop a previous subscription.</li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The first call (of either method) triggers the permission prompt,
        unless the user has already decided for this site. The wording
        differs by browser (Chrome, for example, offers <em>Allow this
        time</em>, <em>Allow on every visit</em> and <em>Never allow</em>).
        The coordinate only flows back after the user allows it. The spec
        does not require a click before asking, but a page that asks the
        moment it loads, with no explanation, is the one people block.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        A complete request, with all three options set explicitly to their
        defaults and every error handled:
      </p>
      <pre className="mt-3 overflow-x-auto rounded-xl bg-tint/10 p-4 text-sm"><code>{`if (!('geolocation' in navigator)) {
  showMessage('This browser has no Geolocation API.');
} else {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      showMessage(\`\${latitude.toFixed(6)}, \${longitude.toFixed(6)} (±\${Math.round(accuracy)} m)\`);
    },
    (err) => {
      if (err.code === err.PERMISSION_DENIED) showMessage('Location is blocked for this site.');
      else if (err.code === err.POSITION_UNAVAILABLE) showMessage('No position available. Try near a window.');
      else if (err.code === err.TIMEOUT) showMessage('Timed out. Try again.');
    },
    { enableHighAccuracy: false, timeout: Infinity, maximumAge: 0 } // the defaults
  );
}`}</code></pre>

      <h2 className="font-display text-2xl font-bold mt-12">What lands in the success callback</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        A
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">GeolocationPosition</code>{' '}
        with two parts: a timestamp and a
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">coords</code>{' '}
        dictionary containing:
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li><strong>latitude</strong> and <strong>longitude</strong> &mdash; decimal degrees, the actual coordinate.</li>
        <li><strong>accuracy</strong> &mdash; the radius of the 95% confidence circle in meters. An accuracy of 8 means the device is 95% sure you&rsquo;re within 8 m of the reported point.</li>
        <li><strong>altitude</strong> and <strong>altitudeAccuracy</strong> &mdash; often <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">null</code> because most desktops don&rsquo;t measure altitude.</li>
        <li><strong>heading</strong> &mdash; direction of motion in degrees clockwise from true north. <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">null</code> when the device cannot tell, and <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">NaN</code> when it is standing still (speed 0). Available from either method, but most useful while watching a moving device.</li>
        <li><strong>speed</strong> &mdash; meters per second, or <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">null</code> when the device cannot measure it.</li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        That&rsquo;s the whole payload. The page does <em>not</em> receive:
        which satellites were heard, which Wi-Fi BSSIDs were scanned, the
        user&rsquo;s IP (that comes from the connection itself, not from
        the API), the device&rsquo;s unique identifier, or any history.
        Each call returns a fresh reading; nothing about previous calls
        is shared with the page.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Where the coordinate actually comes from</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The browser doesn&rsquo;t measure location. It asks the OS, which
        fuses signals depending on hardware and permissions:
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li><strong>GNSS satellites.</strong> The most accurate option when available, but requires a GPS chip. Most desktops and laptops don&rsquo;t have one &mdash; Macs included. Phones do, and so do tablets with mobile data (a Wi-Fi-only iPad does not).</li>
        <li><strong>Wi-Fi BSSID lookup.</strong> Apple and Google keep global databases of Wi-Fi access points keyed to GPS-collected coordinates. The OS scans visible Wi-Fi, queries the database, gets back a position, often good to tens of meters in a city.</li>
        <li><strong>Cell-tower triangulation.</strong> Coarse but useful indoors. The towers the phone can hear, and their signal strength, give a position that is usually hundreds of meters to kilometres out.</li>
        <li><strong>IP geolocation.</strong> Last-resort fallback. Often kilometres off.</li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The OS picks the most accurate combination it can and presents a
        single coordinate. The
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">accuracy</code>{' '}
        field is the only signal you get about which source won. As a rough
        rule, a radius of a few meters points to GPS, tens of meters to
        Wi-Fi, and thousands of meters to cell or network estimates.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The three options and their defaults</h2>
      <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-tint/5 text-left text-fg-muted">
              <th className="px-3 py-2 font-semibold">Option</th>
              <th className="px-3 py-2 font-semibold">Default</th>
              <th className="px-3 py-2 font-semibold">What it controls</th>
            </tr>
          </thead>
          <tbody className="text-fg-muted">
            <tr className="border-t border-line-subtle"><td className="px-3 py-2"><code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">enableHighAccuracy</code></td><td className="px-3 py-2">false</td><td className="px-3 py-2">A hint to use the most accurate source (usually GPS), at a cost in time and battery.</td></tr>
            <tr className="border-t border-line-subtle"><td className="px-3 py-2"><code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">timeout</code></td><td className="px-3 py-2">no limit</td><td className="px-3 py-2">How long to wait, in milliseconds, before the error callback fires with TIMEOUT.</td></tr>
            <tr className="border-t border-line-subtle"><td className="px-3 py-2"><code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">maximumAge</code></td><td className="px-3 py-2">0</td><td className="px-3 py-2">How old a cached position may be, in milliseconds. 0 forces a fresh reading; Infinity accepts any cached one.</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Defaults as given by MDN and the W3C Geolocation specification. The
        spec stores the &ldquo;no limit&rdquo; timeout as the largest
        unsigned 32-bit number, about 49.7 days, which in practice means
        waiting forever.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">enableHighAccuracy is not always what you want</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The options object accepts the flag
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">{`{ enableHighAccuracy: true }`}</code>.
        Setting it asks the OS to use GNSS even when it&rsquo;s slower and
        more battery-hungry. Off, the OS may return a cached Wi-Fi-only
        fix in milliseconds. On, it spends a few seconds talking to
        satellites for a meter-grade reading.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Counterintuitively, high accuracy is sometimes <em>worse</em> for
        the user. If you&rsquo;re indoors with no GPS line-of-sight, asking
        for high accuracy makes the OS fight a losing battle for several
        seconds before giving up and falling back anyway. For most
        map-style use cases, the default is right.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The permission model has more layers than you&rsquo;d expect</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The API is gated by a stack of restrictions, not one:
      </p>
      <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
        <li><strong>HTTPS required.</strong> The spec restricts the API to secure contexts. On a plain-HTTP page browsers refuse the request, usually by calling the error callback with PERMISSION_DENIED, so the location never travels over an unencrypted connection.</li>
        <li><strong>No click required, but it helps.</strong> The spec does not demand a user gesture, and browsers will prompt on page load. Asking in response to a button press, after explaining why, is what keeps people from clicking Block.</li>
        <li><strong>Per-site permission, remembered.</strong> The user&rsquo;s choice is stored per origin. They can revoke it at any time from the browser&rsquo;s site-settings UI.</li>
        <li><strong>Iframe restrictions.</strong> Geolocation is a policy-controlled feature whose default allowlist is <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">&apos;self&apos;</code>: same-origin frames may ask, but a cross-origin iframe needs an explicit <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">allow=&quot;geolocation&quot;</code> attribute.</li>
        <li><strong>OS-level switch.</strong> If location is off for the whole device, or the browser app itself is not allowed to use it, the request fails &mdash; usually with PERMISSION_DENIED or POSITION_UNAVAILABLE &mdash; however the site&rsquo;s own permission is set.</li>
      </ol>
      <p className="mt-3 text-fg-muted leading-relaxed">
        A page can check where it stands before asking, without triggering
        a prompt, through the Permissions API:
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">navigator.permissions.query(&#123; name: &apos;geolocation&apos; &#125;)</code>{' '}
        resolves to <em>granted</em>, <em>denied</em> or <em>prompt</em>, and fires a
        <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm"> change</code> event when the user changes it in site settings.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The three error codes and what to do about each</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The error callback receives a
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">GeolocationPositionError</code>{' '}
        with a numeric code. They behave very differently:
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li><strong>1 (PERMISSION_DENIED)</strong> &mdash; the user clicked Block, or the OS has location off. Calling again won&rsquo;t help; the user has to manually re-enable in site settings. <em>Recover by showing them the path.</em></li>
        <li><strong>2 (POSITION_UNAVAILABLE)</strong> &mdash; the OS tried and couldn&rsquo;t produce a fix. Usually means GPS is unavailable (indoors) and the Wi-Fi/cell fallback also failed. Retrying might help; moving outside helps more.</li>
        <li><strong>3 (TIMEOUT)</strong> &mdash; the request didn&rsquo;t complete within the timeout. The default timeout is effectively unlimited, so this only fires if you set one. Increasing the timeout usually fixes it.</li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Distinguishing these matters because the recovery flow is different
        for each. The biggest UX win I ever shipped on this site was a
        dedicated permission-denied screen that walks the user through
        re-enabling location for the site in their specific browser, with
        the right instructions for Chrome, Safari, and Firefox, instead
        of a generic &ldquo;location unavailable&rdquo; message.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What a page can and can&rsquo;t infer about you</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Once you grant permission, the page sees a coordinate. From one
        reading, less is deducible than people fear:
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li><strong>From one fix:</strong> your city, the building (if it&rsquo;s a known one), your altitude when reported, whether you&rsquo;re moving (in watch mode), rough activity (walking vs driving) from speed.</li>
        <li><strong>Not from one fix:</strong> your name, your phone number, your past locations, who you live with, your home/work address &mdash; unless this <em>is</em> your home or work and they cross-reference.</li>
        <li><strong>From watching over time:</strong> almost everything in the previous list. A site that&rsquo;s seen you for a week can guess where you live and work.</li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The single most useful privacy lever a user has is to revoke
        permission for sites that don&rsquo;t need live location. A map
        site asking once per visit is fine. A games or social app
        silently calling
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">watchPosition</code>{' '}
        in the background is something to be skeptical of.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">How this site uses the API</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The <Link href="/" className="text-accent hover:underline font-semibold">GetMyLocations</Link> homepage
        asks as soon as it loads, because showing your location is the
        whole page. It takes one fresh reading with
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">getCurrentPosition</code>{' '}
        and keeps a
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">watchPosition</code>{' '}
        running so the dot follows you, and it listens to the Permissions
        API so it can retry the moment you unblock the site. The other
        tools only ask when you press a location button. Coordinates are
        processed in the browser. Map tiles and reverse-geocoding requests
        go to third parties as described in the
        {' '}<Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>,
        but the raw coordinate itself is never sent to a server I operate.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        If you want to feel the difference between accuracy values
        directly, open the{' '}
        <Link href="/my-location" className="text-accent hover:underline">My Location</Link>{' '}
        tool on a phone, then turn off Precise Location for your browser
        (on iPhone: Settings &rarr; Privacy &amp; Security &rarr; Location
        Services &rarr; Safari Websites; on Android: Settings &rarr; Apps
        &rarr; Chrome &rarr; Permissions &rarr; Location) and try again.
        The accuracy radius grows from meters to kilometres; Android
        documents approximate location as an area of about 3 square
        kilometres. To see{' '}
        <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">watchPosition</code>{' '}
        in action, try the{' '}
        <Link href="/live-location" className="text-accent hover:underline">Live Location</Link>{' '}
        tracker — it streams coordinates continuously and shows the update
        count climbing. For a comparison of GPS accuracy versus IP-based
        positioning, see{' '}
        <Link href="/gps-vs-ip-accuracy" className="text-accent hover:underline">GPS vs IP accuracy</Link>.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        If location isn&rsquo;t working at all, the step-by-step guides for{' '}
        <Link href="/blog/enable-location-on-iphone-and-android" className="text-accent hover:underline">iPhone &amp; Android</Link>{' '}
        and{' '}
        <Link href="/blog/enable-location-on-windows-and-mac" className="text-accent hover:underline">Windows &amp; Mac</Link>{' '}
        walk through every toggle.
      </p>
    </article>
  );
}
