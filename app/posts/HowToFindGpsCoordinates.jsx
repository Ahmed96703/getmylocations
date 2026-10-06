import Link from 'next/link';

export default function HowToFindGpsCoordinates() {
  return (
    <article className="prose-invert">
      <aside className="mb-6 rounded-xl border border-accent/40 bg-accent/5 p-4" aria-label="Quick answer">
        <p className="text-[11px] uppercase tracking-wider text-accent font-semibold">Quick answer</p>
        <p className="mt-1 text-fg leading-relaxed">The quickest way on any device is to open a browser location tool such as our <Link href="/my-location" className="text-accent hover:underline">My Location</Link> page and allow location; your latitude and longitude appear in seconds. On an iPhone the built-in Compass app shows them at the bottom of the screen. On Android, open Google Maps and press and hold the blue dot. On a Mac or a Windows PC, use the browser method.</p>
      </aside>
      <p className="text-lg text-fg-muted leading-relaxed">
        You&rsquo;re standing in front of a plot of land and the surveyor
        you hired wants the coordinates so he can pull the right cadastral
        record. Or you&rsquo;re at a campsite that doesn&rsquo;t have an
        address and you want to save the exact spot for next year. Or a
        friend is lost in a city you both don&rsquo;t know and the only
        useful thing to send is two numbers.
      </p>

      <p className="mt-4 text-fg-muted leading-relaxed">
        The fastest way is to open
        {' '}<Link href="/" className="text-accent hover:underline">GetMyLocations</Link>{' '}
        in any browser, allow the prompt, and read the numbers off the
        dashboard. Total time, including granting the permission: about
        two seconds. But if you&rsquo;d rather use what&rsquo;s already on
        your phone, every common device has a built-in way too. Here are
        the methods, ranked by how quickly each one actually gets you to
        a coordinate.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">A 30-second mental model of what you&rsquo;re reading</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        GPS coordinates pinpoint any spot on Earth with two numbers:
        <strong> latitude</strong> (how far north or south of the equator
        you are) and <strong>longitude</strong> (how far east or west of
        the prime meridian). Modern devices report them as
        <strong> WGS-84 decimal degrees</strong> &mdash; for example,
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent">40.712776, -74.005974</code>{' '}
        points to lower Manhattan, and
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent">24.860422, 67.001137</code>{' '}
        points to a street in Karachi where I&rsquo;m sitting as I write
        this.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The decimals matter more than people expect. Six decimal places
        gets you to within about 11 cm. Three decimals widens the
        uncertainty to about 110 meters. For a hiking spot, use at least
        five. For a delivery address, three is probably fine.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">In any browser (the fastest path)</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The browser&rsquo;s Geolocation API combines GPS (if available),
        Wi-Fi triangulation, and IP signals to estimate your position in
        seconds. No installs, no signup.
      </p>
      <ol className="mt-3 list-decimal list-inside space-y-1.5 text-fg-muted">
        <li>Open <Link href="/" className="text-accent hover:underline">GetMyLocations</Link> in Chrome, Safari, Firefox, or Edge.</li>
        <li>Click <strong>Allow</strong> on the permission prompt.</li>
        <li>Read your latitude, longitude, accuracy radius, city, and country off the dashboard.</li>
        <li>Click <strong>Copy Coordinates</strong> to put them on your clipboard.</li>
      </ol>
      <p className="mt-3 text-sm text-fg-subtle">
        Tip from testing: the accuracy improves dramatically near a window
        or outdoors, because more Wi-Fi access points are visible and
        more satellites have line-of-sight.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">On an iPhone or iPad</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        iOS doesn&rsquo;t put coordinates in the Maps app&rsquo;s main UI,
        which annoys me, but the Compass app does.
      </p>
      <ol className="mt-3 list-decimal list-inside space-y-1.5 text-fg-muted">
        <li>Make sure Location Services is on. <strong>Settings &rarr; Privacy &amp; Security &rarr; Location Services</strong>, then scroll down and enable Compass.</li>
        <li>Open the Compass app (pre-installed on every iPhone).</li>
        <li>Latitude, longitude, and elevation appear at the bottom of the screen.</li>
      </ol>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Alternative path: in Apple Maps, drop a pin on your current
        location, scroll up on the pin&rsquo;s card, and the coordinates
        appear under the address. More taps, but useful if Compass is
        unavailable for some reason.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">On Android</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Android is the cleanest of the three. Google Maps exposes
        coordinates in two clicks.
      </p>
      <ol className="mt-3 list-decimal list-inside space-y-1.5 text-fg-muted">
        <li>Open Google Maps.</li>
        <li>Tap and hold the blue dot showing your current location.</li>
        <li>A red pin drops and the coordinates appear in the search bar at the top.</li>
        <li>Tap the coordinates to copy.</li>
      </ol>

      <h2 className="font-display text-2xl font-bold mt-12">On a Mac</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        A Mac without GPS hardware falls back to Wi-Fi triangulation
        &mdash; usually accurate to 30&ndash;50 meters in urban areas,
        much worse in rural ones. The browser route is still the fastest:
      </p>
      <ol className="mt-3 list-decimal list-inside space-y-1.5 text-fg-muted">
        <li>Open <Link href="/" className="text-accent hover:underline">GetMyLocations</Link> in Safari or Chrome.</li>
        <li>Approve the permission prompt.</li>
        <li>Coordinates display instantly.</li>
      </ol>

      <h2 className="font-display text-2xl font-bold mt-12">On Windows 10 or 11</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Windows uses its Location Service (a blend of Wi-Fi, IP, and any
        built-in GPS hardware your machine actually has &mdash; most
        desktops don&rsquo;t).
      </p>
      <ol className="mt-3 list-decimal list-inside space-y-1.5 text-fg-muted">
        <li>Open <strong>Settings &rarr; Privacy &amp; security &rarr; Location</strong> and turn location on, including the setting for desktop apps further down the page, which covers Chrome and Firefox.</li>
        <li>Open <Link href="/" className="text-accent hover:underline">GetMyLocations</Link> in Edge or Chrome and allow location; your coordinates appear in a few seconds.</li>
      </ol>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Older guides suggest the built-in Windows Maps app; it no longer works. Microsoft removed it from
        the Store in July 2025, pushed a final update that disabled it, and stopped preinstalling it from
        Windows 11 version 24H2.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">How accurate is the number you just read?</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Accuracy depends entirely on what signals your device can see:
      </p>
      <ul className="mt-3 space-y-1.5 text-fg-muted list-disc list-inside">
        <li><strong>Phone with GPS, outdoors:</strong> 3&ndash;5 meters.</li>
        <li><strong>Phone with GPS, indoors:</strong> 10&ndash;50 meters (roofs and walls block satellite signal).</li>
        <li><strong>Laptop without GPS, near Wi-Fi:</strong> 20&ndash;50 meters.</li>
        <li><strong>Laptop on VPN or desktop without Wi-Fi:</strong> often 5&ndash;50 km (city-level IP guess).</li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        If the accuracy radius you see on
        {' '}<Link href="/" className="text-accent hover:underline">GetMyLocations</Link>{' '}
        is over 500 meters, step outside or disable your VPN for a
        dramatically better fix.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Who actually sees your coordinates?</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        When you grant location permission to a website, the browser sends
        coordinates <em>only</em> to that page&rsquo;s JavaScript &mdash;
        not to Google, not to any third party. GetMyLocations runs
        entirely in your browser; your coordinates are never transmitted
        to a server I control. The one outbound request is to a free
        reverse-geocoding API (BigDataCloud, with OpenStreetMap Nominatim
        as fallback) to turn the coordinate into a place name, and that
        lookup carries no identifier I can attach back to you.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Always check the site is HTTPS (the lock icon) before allowing
        location. Revoke the permission at any time via your
        browser&rsquo;s site settings.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">A few common follow-up questions</h2>

      <h3 className="font-semibold text-lg mt-6 text-fg">Can I find my coordinates without an internet connection?</h3>
      <p className="mt-2 text-fg-muted leading-relaxed">
        Yes &mdash; your phone&rsquo;s GPS chip itself works without
        internet. Use the Compass app on iPhone or any offline GPS app on
        Android. The browser-based methods need connectivity to load
        the page itself, though.
      </p>

      <h3 className="font-semibold text-lg mt-6 text-fg">Why is my location wrong by several kilometers?</h3>
      <p className="mt-2 text-fg-muted leading-relaxed">
        Almost always because the browser fell back to IP geolocation,
        which knows only your ISP&rsquo;s nearest hub. Step near a window
        so Wi-Fi triangulation kicks in, or use a device with a real GPS
        chip.
      </p>

      <h3 className="font-semibold text-lg mt-6 text-fg">Is it safe to share my coordinates?</h3>
      <p className="mt-2 text-fg-muted leading-relaxed">
        For one-off sharing with someone you know, fine. Avoid publishing
        precise coordinates of your home or a child&rsquo;s school on
        social media &mdash; anyone can plug them into Maps. If you need
        to post publicly, round to two or three decimals to reduce
        precision.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Try it</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Open the{' '}
        <Link href="/my-location" className="text-accent hover:underline font-semibold">My Location</Link>{' '}
        tool and allow the location prompt. The latitude, longitude, accuracy
        radius and nearest street address will be on screen in a couple of seconds.
        If you need the coordinate in DMS or UTM instead of decimal degrees, paste it into the{' '}
        <Link href="/coordinates-converter" className="text-accent hover:underline">Coordinates Converter</Link>.
        To watch the fix update continuously as you walk, switch to the{' '}
        <Link href="/live-location" className="text-accent hover:underline">live location tracker</Link>.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        For the theory behind how your phone actually computes this number, read{' '}
        <Link href="/blog/how-gps-works" className="text-accent hover:underline">How GPS works</Link>.
        For a primer on reading and interpreting the two numbers, see{' '}
        <Link href="/blog/latitude-vs-longitude-explained" className="text-accent hover:underline">Latitude vs longitude explained</Link>.
        And if you plan to share your coordinates with someone, the{' '}
        <Link href="/blog/how-to-share-gps-location-safely" className="text-accent hover:underline">safe sharing guide</Link>{' '}
        covers what to strip before posting publicly.
      </p>
    </article>
  );
}
