import Link from 'next/link';

export default function EnableLocationDesktop() {
  return (
    <article className="prose-invert">
      <p className="text-lg text-fg-muted leading-relaxed">
        You open a maps site, a weather app, or a delivery page on your
        laptop, the &ldquo;find my location&rdquo; button does nothing, and
        you sit there wondering what you broke. The truth is you probably
        didn&rsquo;t break anything &mdash; location on a laptop runs
        through three separate switches, and any one of them being off
        will block the whole thing. The fix takes ninety seconds once you
        know where the switches live.
      </p>

      <p className="mt-4 text-fg-muted leading-relaxed">
        The three layers, in the order they have to be on:
      </p>
      <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
        <li>The <strong>operating system&rsquo;s location service</strong> &mdash; one big master switch in Settings.</li>
        <li>The <strong>per-app permission</strong> &mdash; the browser has to be allowed to ask.</li>
        <li>The <strong>per-site permission</strong> in the browser &mdash; whether you clicked Allow or Block the first time the site asked.</li>
      </ol>
      <p className="mt-3 text-fg-muted leading-relaxed">
        This guide walks through each one on Windows 10, Windows 11, and
        macOS, then covers the browser-specific bits for Chrome, Safari,
        Firefox, and Edge. By the end the &ldquo;find my location&rdquo;
        button on any well-behaved site should work on your machine.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Windows 11 &mdash; turning location services back on</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Microsoft moved a lot of settings around in Windows 11, and
        Location is one of them. The path is:
      </p>
      <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
        <li>Open <strong>Settings</strong> (Win key + I).</li>
        <li>Click <strong>Privacy &amp; security</strong> in the left-hand sidebar.</li>
        <li>Scroll down to the <strong>App permissions</strong> group and click <strong>Location</strong>.</li>
        <li>Toggle <strong>Location services</strong> to On at the top of the page.</li>
        <li>Below that, find the <strong>Let apps access your location</strong> toggle and turn that on as well.</li>
        <li>Scroll further down to the list of apps and make sure your browser (Microsoft Edge, Google Chrome, Firefox &mdash; whichever you use) has its individual toggle on.</li>
      </ol>

      {/* TODO: Ahmed to add a screenshot of the Windows 11 Location settings page showing the main "Location services" toggle and the app list. /public/screenshots/windows-11-location-settings.png */}

      <p className="mt-3 text-fg-muted leading-relaxed">
        One detail people miss: the per-app toggle below the main one is
        the second switch in our three-layer model. Turning the main
        switch on but leaving the app-specific one off is a common cause
        of &ldquo;I turned it on but it still doesn&rsquo;t work.&rdquo;
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Windows 10 &mdash; the same idea, slightly different menus</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        On Windows 10 the path is:
      </p>
      <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
        <li>Open <strong>Settings</strong> (Win key + I).</li>
        <li>Click <strong>Privacy</strong>.</li>
        <li>Choose <strong>Location</strong> from the left sidebar.</li>
        <li>Under <em>Allow access to location on this device</em>, click <strong>Change</strong> and turn it on.</li>
        <li>Below that, toggle <strong>Allow apps to access your location</strong>.</li>
        <li>Scroll down to <em>Choose which apps can access your location</em> and confirm your browser is enabled.</li>
      </ol>
      <p className="mt-3 text-fg-muted leading-relaxed">
        If the toggles are greyed out, jump down to the section on
        managed devices &mdash; that&rsquo;s an IT-policy problem, not a
        Windows problem.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">macOS &mdash; Location Services in System Settings</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        On a Mac the equivalent setting is buried inside Privacy &amp;
        Security. On macOS Ventura, Sonoma, or later (the new System
        Settings layout), here&rsquo;s the path:
      </p>
      <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
        <li>Click the Apple menu &rarr; <strong>System Settings</strong>.</li>
        <li>In the sidebar, click <strong>Privacy &amp; Security</strong>.</li>
        <li>Click <strong>Location Services</strong>.</li>
        <li>Toggle <strong>Location Services</strong> on at the top.</li>
        <li>Scroll the app list below it and make sure your browser (Safari, Chrome, Firefox) is checked.</li>
      </ol>

      {/* TODO: Ahmed to add a screenshot of macOS System Settings → Privacy & Security → Location Services with the main toggle visible and the app list showing browsers enabled. /public/screenshots/macos-location-services.png */}

      <p className="mt-3 text-fg-muted leading-relaxed">
        On older macOS (Big Sur and earlier, with the original System
        Preferences app), the equivalent is <strong>System
        Preferences</strong> &rarr; <strong>Security &amp; Privacy</strong>
        &rarr; <strong>Privacy</strong> tab &rarr; <strong>Location
        Services</strong> in the left list. You may need to click the
        padlock at the bottom of the window and authenticate before
        toggles will accept changes.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Browser permission &mdash; the layer most people forget</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Even with the OS toggles all on, a browser still has its own
        permission system. The first time any site asks for your
        location, the browser shows an Allow/Block prompt. If you clicked
        Block by accident (or chose &ldquo;Never allow on this
        site&rdquo;), the prompt won&rsquo;t come back &mdash; the
        browser silently denies every future request from that site
        without telling you. This is the single most common cause of
        &ldquo;the button does nothing&rdquo; problems.
      </p>

      <h3 className="font-display text-lg font-bold mt-8">Google Chrome &mdash; resetting a site permission</h3>
      <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
        <li>Visit the site you want to fix (e.g. <Link href="/" className="text-accent hover:underline">getmylocations.com</Link>).</li>
        <li>Click the lock or info icon to the left of the URL.</li>
        <li>Click <strong>Site settings</strong> in the dropdown.</li>
        <li>In the permissions list, find <strong>Location</strong> and change it to <strong>Allow</strong> (or <strong>Ask</strong>, then refresh the page).</li>
        <li>Refresh the tab and the location prompt should reappear.</li>
      </ol>

      {/* TODO: Ahmed to add a screenshot of Chrome's URL-bar lock icon → Site settings dropdown highlighting the Location row. /public/screenshots/chrome-site-permission-location.png */}

      <p className="mt-3 text-fg-muted leading-relaxed">
        To reset permission for many sites at once, type
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">chrome://settings/content/location</code>{' '}
        into the address bar. You&rsquo;ll see a list of sites under
        &ldquo;Not allowed to use your location&rdquo; &mdash; click the
        trash icon next to any site to clear its block, and the next
        visit will prompt fresh.
      </p>

      {/* TODO: Ahmed to add a screenshot of chrome://settings/content/location showing the blocked-sites list. /public/screenshots/chrome-content-location.png */}

      <h3 className="font-display text-lg font-bold mt-8">Safari (macOS) &mdash; per-site permission</h3>
      <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
        <li>With Safari open, click <strong>Safari</strong> &rarr; <strong>Settings</strong> in the menu bar (or press &#x2318;,).</li>
        <li>Click the <strong>Websites</strong> tab.</li>
        <li>In the left sidebar, click <strong>Location</strong>.</li>
        <li>Find the site in the list, and use the dropdown next to it to set <strong>Allow</strong> or <strong>Ask</strong>.</li>
        <li>At the bottom, set <em>When visiting other websites</em> to <strong>Ask</strong> so new sites can prompt.</li>
      </ol>

      {/* TODO: Ahmed to add a screenshot of Safari → Settings → Websites → Location with a site set to Allow. /public/screenshots/safari-websites-location.png */}

      <h3 className="font-display text-lg font-bold mt-8">Firefox &mdash; per-site, and the global reset</h3>
      <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
        <li>Open the site whose permission you want to fix.</li>
        <li>Click the small lock icon in the URL bar, then click <strong>Clear permission and reload</strong> at the bottom of the panel.</li>
        <li>The next time the site asks, you&rsquo;ll get a fresh Allow/Block prompt.</li>
      </ol>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Or for the master list: type
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">about:preferences#privacy</code>{' '}
        in the address bar, scroll down to <strong>Permissions</strong>,
        click <strong>Settings</strong> next to Location, and edit
        per-site rules from there.
      </p>

      {/* TODO: Ahmed to add a screenshot of Firefox's URL-bar lock icon panel with the Clear permission link visible. /public/screenshots/firefox-clear-permission.png */}

      <h3 className="font-display text-lg font-bold mt-8">Microsoft Edge &mdash; the same as Chrome, slightly relabelled</h3>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Edge uses Chromium under the hood, so the menus look almost
        identical to Chrome. Type
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">edge://settings/content/location</code>{' '}
        for the master list, or click the lock icon in the URL bar
        &rarr; <strong>Permissions for this site</strong> &rarr;
        <strong> Location</strong>. The Allow / Block options work
        exactly the same.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">When the toggles are greyed out</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        On work laptops, school computers, and any device managed by an
        IT department, Location Services may be locked off at the policy
        level. You&rsquo;ll see the toggle but it won&rsquo;t respond, or
        a tooltip will say <em>&ldquo;Some of these settings are managed
        by your organization.&rdquo;</em> No amount of clicking will
        change it &mdash; the policy is enforced from a domain
        controller you don&rsquo;t control.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The honest answer here is: you need IT to lift the policy, and
        they usually have a reason for it (compliance, audit trail,
        liability). On a personal laptop you should never see this
        message; if you do, run an antivirus scan, because some
        installers add fake group policies as a side effect.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Why your laptop&rsquo;s location is less accurate than your phone&rsquo;s</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Even with every switch correctly on, a laptop&rsquo;s location
        reading is usually less precise than a phone&rsquo;s. The reason
        is hardware: most laptops have no GPS chip. Instead they use
        Wi-Fi positioning, which works by scanning visible Wi-Fi access
        points and matching them against the global database that Google
        and Apple keep. In a city with dense Wi-Fi coverage, that gets
        you within roughly 20&ndash;50 meters &mdash; usually accurate
        enough to know which neighbourhood you&rsquo;re in. In a rural
        area where few networks are mapped, the same logic falls back to
        your IP address, and accuracy collapses to a 5&ndash;50 km
        radius.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Two practical implications. First, plugging in via Ethernet
        often gives a <em>worse</em> location reading than Wi-Fi,
        because the wired connection turns off the Wi-Fi radio, which
        was the source of the precision. Second, a VPN doesn&rsquo;t
        actually break the OS-level location reading at all &mdash; the
        VPN only changes your IP-based fallback. If GPS or Wi-Fi
        positioning is available, the browser still gets the real
        coordinate, and the VPN is irrelevant.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Testing whether it actually works</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Once you&rsquo;ve flipped the switches, the fastest way to
        confirm the fix is to open
        {' '}<Link href="/" className="text-accent hover:underline font-semibold">GetMyLocations</Link>{' '}
        and click the location button. If the prompt appears and you
        click Allow, your latitude and longitude land on screen within a
        couple of seconds along with an accuracy radius in meters.
        That&rsquo;s a clean success.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        If the page tells you it can&rsquo;t get your location, the most
        likely remaining cause is that your browser&rsquo;s site
        permission for this page is set to Block from a previous visit
        &mdash; even though you cleared it in the master settings.
        Re-check using the lock-icon dropdown described above and you
        should be sorted.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Related reading</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        For the deeper technical story of what your browser actually
        does when a site asks for your location, see
        {' '}<Link href="/blog/browser-geolocation-api-explained" className="text-accent hover:underline">the browser geolocation API explained</Link>.
        If your problem turns out to be wrong-city accuracy rather than
        a denied prompt, the
        {' '}<Link href="/gps-vs-ip-accuracy" className="text-accent hover:underline">GPS vs IP accuracy guide</Link>{' '}
        covers why that happens. And the
        {' '}<Link href="/fix-location-not-working" className="text-accent hover:underline">general fix-location guide</Link>{' '}
        has a broader troubleshooting list that includes browser
        extensions, VPNs, and corporate networks.
      </p>
    </article>
  );
}
