import Link from 'next/link';

const ext = 'text-accent hover:underline';
const code = 'bg-tint/10 px-1.5 py-0.5 rounded text-accent';

// Where each built-in method lives, what it shows and whether it needs a
// connection. Steps follow Apple's and Google's own help pages.
const METHODS = [
  ['iPhone', 'Compass app', 'Degrees, minutes, seconds', 'Yes (GPS only)'],
  ['iPhone or iPad', 'Apple Maps: drop a pin', 'Decimal degrees', 'Needs map data'],
  ['Android or iPhone', 'Google Maps: touch and hold the map', 'Decimal degrees', 'Needs map data'],
  ['Windows or Mac', 'Google Maps in a browser: right-click', 'Decimal degrees', 'No'],
  ['Any device', 'A browser location page', 'Decimal degrees, accuracy', 'No'],
];

export default function HowToFindGpsCoordinates() {
  return (
    <article className="prose-invert">
      <aside className="mb-6 rounded-xl border border-accent/40 bg-accent/5 p-4" aria-label="Quick answer">
        <p className="text-[11px] uppercase tracking-wider text-accent font-semibold">Quick answer</p>
        <p className="mt-1 text-fg leading-relaxed">
          On an iPhone, open the Compass app: your latitude and longitude are at the bottom. On Android, open
          Google Maps, touch and hold an unlabeled spot next to your blue dot, and the coordinates appear in the
          search box. On a computer, right-click a spot in Google Maps and the coordinates are the first line of
          the menu. Any device can also use a browser page such as{' '}
          <Link href="/my-location" className={ext}>My Location</Link>.
        </p>
      </aside>

      <p className="text-lg text-fg-muted leading-relaxed">
        You&rsquo;re standing on a plot of land and the surveyor wants its coordinates. You&rsquo;re at a campsite
        with no address and want to find the exact spot next year. A friend is lost and the only useful thing to
        send is two numbers. Every phone and computer can already show you those numbers; the trick is knowing
        where each one hides them. This guide covers the apps you already have, device by device.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Which method to use</h2>
      <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-tint/5 text-left text-fg-muted">
              <th className="px-3 py-2 font-semibold">Device</th>
              <th className="px-3 py-2 font-semibold">Where</th>
              <th className="px-3 py-2 font-semibold">Format shown</th>
              <th className="px-3 py-2 font-semibold">Works offline?</th>
            </tr>
          </thead>
          <tbody className="text-fg-muted">
            {METHODS.map(([d, w, f, o]) => (
              <tr key={w} className="border-t border-line-subtle">
                <td className="px-3 py-2 text-fg">{d}</td>
                <td className="px-3 py-2">{w}</td>
                <td className="px-3 py-2">{f}</td>
                <td className="px-3 py-2">{o}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The formats differ: the Compass app shows degrees, minutes and seconds (DMS), the map apps show decimal
        degrees. Both describe the same point; the{' '}
        <Link href="/coordinates-converter" className={ext}>coordinates converter</Link> turns one into the other.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">On an iPhone: the Compass app</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The fastest method on an iPhone, and the only one here that works with no signal at all, because it reads
        the GPS chip directly.
      </p>
      <ol className="mt-3 list-decimal list-inside space-y-1.5 text-fg-muted">
        <li>Check that Location Services is on, and that Compass is allowed: <strong>Settings &rarr; Privacy &amp; Security &rarr; Location Services &rarr; Compass</strong>.</li>
        <li>Open the Compass app.</li>
        <li>Your latitude and longitude appear at the bottom of the screen, in degrees, minutes and seconds, with your elevation.</li>
      </ol>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The Compass app is on iPhone only; iPads do not have it, so on an iPad use Apple Maps below.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">On an iPhone or iPad: Apple Maps</h2>
      <ol className="mt-3 list-decimal list-inside space-y-1.5 text-fg-muted">
        <li>Open Maps and touch and hold the map where you are (next to the blue dot) to drop a pin.</li>
        <li>Swipe up on the pin&rsquo;s card. The latitude and longitude are listed in the details.</li>
      </ol>

      <h2 className="font-display text-2xl font-bold mt-12">On Android (or iPhone): Google Maps</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Google&rsquo;s{' '}
        <a href="https://support.google.com/maps/answer/18539" target="_blank" rel="noopener" className={ext}>own
        instructions</a> are the same on Android and iPhone:
      </p>
      <ol className="mt-3 list-decimal list-inside space-y-1.5 text-fg-muted">
        <li>Open Google Maps and wait for the blue dot to settle on your position.</li>
        <li>Touch and hold an area of the map that isn&rsquo;t labeled, right next to the blue dot. A red pin drops.</li>
        <li>Your coordinates appear in the search box at the top, in decimal degrees. Tap them to copy.</li>
      </ol>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Tapping the blue dot itself opens your location card instead, so aim for the empty map beside it.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">On a Windows PC or Mac: Google Maps in the browser</h2>
      <ol className="mt-3 list-decimal list-inside space-y-1.5 text-fg-muted">
        <li>Open Google Maps in any browser and click the location button so the map centres on you.</li>
        <li>Right-click your spot on the map.</li>
        <li>The latitude and longitude are the first line of the menu. Click them to copy.</li>
      </ol>
      <p className="mt-3 text-fg-muted leading-relaxed">
        A computer only knows where it is if location is switched on for the system and the browser. On Windows
        11 that is <strong>Settings &rarr; Privacy &amp; security &rarr; Location</strong>, including the setting
        for desktop apps further down, which covers Chrome and Firefox; on a Mac it is{' '}
        <strong>System Settings &rarr; Privacy &amp; Security &rarr; Location Services</strong>. The full steps are
        in{' '}
        <Link href="/blog/enable-location-on-windows-and-mac" className={ext}>turning on location on a laptop</Link>.
        Older guides mention the Windows Maps app; Microsoft withdrew it in July 2025.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">On any device: a browser location page</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        If you would rather not hunt through menus, a web page can ask the browser for your position directly.
        Our <Link href="/my-location" className={ext}>My Location</Link> tool shows the coordinates ready to copy,
        how accurate the reading is, and the nearest street address. To watch the numbers change as you walk, use
        the <Link href="/live-location" className={ext}>live location tracker</Link>.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">How accurate is the number you just read?</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        It depends on which signals the device can use, not on the app:
      </p>
      <ul className="mt-3 space-y-1.5 text-fg-muted list-disc list-inside">
        <li><strong>Phone outdoors with a clear sky:</strong> GPS.gov says GPS-enabled smartphones are typically accurate to within{' '}
          <a href="https://www.gps.gov/gps-accuracy" target="_blank" rel="noopener" className={ext}>4.9&nbsp;m (16&nbsp;ft)</a>.</li>
        <li><strong>Indoors or between tall buildings:</strong> tens of metres, because roofs and walls block or reflect the satellite signals.</li>
        <li><strong>Laptop or desktop:</strong> most have no GPS chip, so the position comes from nearby Wi-Fi networks, or from your IP address if there are none. An IP-based guess is often only right to the city (see{' '}
          <Link href="/gps-vs-ip-accuracy" className={ext}>GPS vs IP accuracy</Link>).</li>
        <li><strong>Approximate location switched on:</strong> if an app was only given approximate location, Android documents its accuracy as an area of about{' '}
          <a href="https://developer.android.com/develop/sensors-and-location/location/permissions" target="_blank" rel="noopener" className={ext}>3 square kilometres</a>; switch on precise location for that app.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">How many decimal places should you keep?</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Each decimal place of latitude is ten times finer than the last. Five decimals is about 1.1&nbsp;m and six
        is about 11&nbsp;cm, which is already finer than a phone can measure. For a delivery or a meeting point,
        four or five decimals is plenty; when posting a location publicly, rounding to two or three decimals hides
        the exact building.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Always give latitude first, then longitude. For example,{' '}
        <code className={code}>40.712776, -74.005974</code> is lower Manhattan; swapping the two numbers puts the
        point somewhere else entirely. If that order still trips you up, see{' '}
        <Link href="/blog/latitude-vs-longitude-explained" className={ext}>latitude vs longitude explained</Link>.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Who can see your coordinates?</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Reading the numbers in the Compass app keeps them on your phone. Map apps and browsers are different:
        to work out a position from Wi-Fi networks, the operating system or browser asks its provider&rsquo;s
        location service (Google says{' '}
        <a href="https://support.google.com/chrome/answer/142065" target="_blank" rel="noopener" className={ext}>Chrome
        sends information to Google Location Services</a> for this). A website only receives your coordinates
        after you allow its location prompt.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        On GetMyLocations the coordinates stay in your browser tab; the only lookups that receive them are the
        address and city services named in the{' '}
        <Link href="/privacy-policy" className={ext}>privacy policy</Link>. Before allowing location on any site,
        check the address starts with <code className={code}>https://</code>, and remove the permission later in
        the browser&rsquo;s site settings. Before sending your coordinates to anyone, read{' '}
        <Link href="/blog/how-to-share-gps-location-safely" className={ext}>how to share your location safely</Link>.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Common questions</h2>

      <h3 className="font-semibold text-lg mt-6 text-fg">Can I find my coordinates without an internet connection?</h3>
      <p className="mt-2 text-fg-muted leading-relaxed">
        Yes. The GPS chip in a phone works without a connection, so the iPhone Compass app shows coordinates with
        no signal at all. Map apps can do the same if you downloaded offline maps beforehand. Web pages need a
        connection to load.
      </p>

      <h3 className="font-semibold text-lg mt-6 text-fg">Why is my location wrong by several kilometres?</h3>
      <p className="mt-2 text-fg-muted leading-relaxed">
        Usually because the device had no GPS or Wi-Fi fix and fell back to your IP address, which often points to
        your provider&rsquo;s network in another part of the city or country. A VPN moves it further. Step outside
        or near a window, switch off the VPN, or use a phone. The{' '}
        <Link href="/fix-location-not-working" className={ext}>location troubleshooting guide</Link> goes through
        the causes in order.
      </p>

      <h3 className="font-semibold text-lg mt-6 text-fg">How do I send my coordinates to someone?</h3>
      <p className="mt-2 text-fg-muted leading-relaxed">
        Copy them as text (latitude, then longitude) and paste them into a message. Every map app can open a pair
        of decimal coordinates. For a moving position, a time-limited live location share is better; the{' '}
        <Link href="/blog/how-to-share-gps-location-safely" className={ext}>sharing guide</Link> compares the apps.
      </p>

      <p className="mt-10 text-fg-muted leading-relaxed">
        For how the phone actually computes the position, read{' '}
        <Link href="/blog/how-gps-works" className={ext}>how GPS works</Link>.
      </p>
    </article>
  );
}
