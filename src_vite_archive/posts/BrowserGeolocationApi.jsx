import { Link } from 'react-router-dom';

export default function BrowserGeolocationApi() {
  return (
    <article className="prose-invert">
      <p className="text-lg text-slate-300/90 leading-relaxed">
        Every &ldquo;find my location&rdquo; button on the web is a thin wrapper around the same primitive: the W3C Geolocation API, a JavaScript interface every modern browser implements. It looks like five lines of code from the outside, but underneath it&apos;s coordinating with the operating system, the GNSS chip, the Wi-Fi positioning service, and the user&apos;s privacy settings &mdash; sometimes all at once. This article explains exactly what that API does, what websites can and can&apos;t see when you grant the permission, and how to think about its accuracy and privacy trade-offs.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The API in 30 seconds</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The browser exposes
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">navigator.geolocation</code>{' '}
        with three methods:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">getCurrentPosition(success, error, options)</code> &mdash; ask for a single one-shot location reading.</li>
        <li><code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">watchPosition(success, error, options)</code> &mdash; subscribe to a stream of updates as the user moves.</li>
        <li><code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">clearWatch(watchId)</code> &mdash; stop a previous subscription.</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        When the page first calls either of the first two, the browser shows the user a permission prompt (&ldquo;getmylocations.com wants to use your location: Allow / Block&rdquo;). The actual location is only delivered after Allow.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What gets returned to the page</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        On success, the callback receives a <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">GeolocationPosition</code> object with two parts: a timestamp and a <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">coords</code> dictionary containing:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><strong>latitude</strong> and <strong>longitude</strong> &mdash; decimal degrees, the actual coordinate.</li>
        <li><strong>accuracy</strong> &mdash; the radius of the 95% confidence circle in meters. An accuracy of 8 means the device is 95% sure you&apos;re within 8 m of the reported point.</li>
        <li><strong>altitude</strong> and <strong>altitudeAccuracy</strong> &mdash; often null because most desktops don&apos;t measure altitude.</li>
        <li><strong>heading</strong> &mdash; the direction of motion in degrees from true north, only available when watching position on a moving device.</li>
        <li><strong>speed</strong> &mdash; metres per second, also only meaningful in watch mode.</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        That&apos;s it. The page does <em>not</em> receive: which satellites your phone heard, which Wi-Fi BSSIDs were nearby, your IP address (that comes from the connection itself, not the API), your device&apos;s unique identifier, or any history. Each call returns a fresh reading; nothing about past calls is shared.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Where the coordinate actually comes from</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The browser never measures location itself. It asks the operating system, which in turn fuses several signals depending on what hardware and permissions are available:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><strong>GNSS satellites</strong> &mdash; the most accurate signal when available, but only on devices with a GPS chip. Most desktops don&apos;t have one. Phones, tablets, and modern Macs do.</li>
        <li><strong>Wi-Fi BSSID lookup</strong> &mdash; Apple and Google operate global databases of Wi-Fi access points keyed to GPS-collected coordinates. The OS scans visible Wi-Fi, asks the database, gets a position back. Typical accuracy: 10&ndash;25 m.</li>
        <li><strong>Cell-tower triangulation</strong> &mdash; coarse but useful indoors. The carrier&apos;s knowledge of which tower you&apos;re on and signal strength produces a ~500&ndash;2000 m fix.</li>
        <li><strong>IP geolocation</strong> &mdash; the fallback of last resort. Used when everything else is unavailable. Often kilometers off.</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Modern OSes pick the most accurate available combination and present the result as a single coordinate. The <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">accuracy</code> field tells you which one won &mdash; under 10 m usually means GPS, 20&ndash;100 m usually means Wi-Fi, 1000+ usually means IP-only.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">enableHighAccuracy &mdash; what it really does</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The options object accepts a flag:
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">{`{ enableHighAccuracy: true }`}</code>.
        Setting this asks the OS to use GNSS even if it&apos;s slower and uses more battery. With it off, the OS may return a cached or Wi-Fi-only fix in milliseconds; with it on, the OS spends a few seconds talking to satellites for a meter-grade reading.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Counterintuitively, high accuracy can sometimes be <em>less</em> useful. If you&apos;re indoors with no GPS signal, asking for high accuracy makes the OS fight a losing battle for several seconds before giving up and falling back anyway. For most map-style use cases, the default is the right choice.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The permission model &mdash; what the browser actually enforces</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The Geolocation API is subject to several layered restrictions:
      </p>
      <ol className="mt-3 space-y-2 text-slate-300/90 list-decimal list-inside">
        <li><strong>HTTPS required.</strong> The API silently fails on plain HTTP. This prevents man-in-the-middle attacks from injecting fake locations.</li>
        <li><strong>User gesture required (sometimes).</strong> Some browsers refuse to show the prompt unless the call comes from inside a click handler, to prevent surprise prompts on page load.</li>
        <li><strong>Per-site permission.</strong> The user&apos;s choice is remembered per site. They can revoke it at any time from the browser&apos;s site-settings UI.</li>
        <li><strong>Iframe restrictions.</strong> Modern browsers require third-party iframes to have an explicit <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">allow=&quot;geolocation&quot;</code> attribute to even ask.</li>
        <li><strong>OS-level kill switch.</strong> If the user has disabled location services at the operating-system level, the browser falls back to IP-only no matter what the page requests.</li>
      </ol>

      <h2 className="font-display text-2xl font-bold mt-12">Error codes &mdash; what each one means</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The error callback receives a <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">GeolocationPositionError</code> with a numeric code:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><strong>1 (PERMISSION_DENIED)</strong> &mdash; the user clicked Block, or the OS has location off. Re-asking won&apos;t help; the user has to manually re-enable in site settings.</li>
        <li><strong>2 (POSITION_UNAVAILABLE)</strong> &mdash; the OS tried and couldn&apos;t produce a fix. Usually means GPS is unavailable (indoors) and the Wi-Fi/cell fallback also failed. Retry might help; moving might help more.</li>
        <li><strong>3 (TIMEOUT)</strong> &mdash; the request didn&apos;t complete within the timeout. The default is no timeout, so this only fires if the page set one. Increasing the timeout often fixes it.</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Good websites distinguish between these codes and give different help messages. The most helpful is &mdash; ironically &mdash; the &ldquo;here&apos;s how to re-enable&rdquo; recovery flow we ship in GetMyLocations when the user has previously denied permission, since browsers themselves don&apos;t volunteer that information.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Privacy implications &mdash; what websites can and can&apos;t infer</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Once you grant permission, the page sees your real-time coordinate. From that one number, surprisingly little is deducible without other signals:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><strong>What they CAN infer:</strong> the city, the building if it&apos;s a known one, your apparent altitude (if reported), whether you&apos;re moving (in watch mode), and rough activity (walking vs driving) from speed.</li>
        <li><strong>What they CANNOT infer from one reading:</strong> your name, your phone number, your past locations, who you live with, your home or work address (unless this <em>is</em> your home or work and they look it up).</li>
        <li><strong>What they CAN infer with patterns over time:</strong> almost everything in the previous list. A site that&apos;s been watching you for a week can probably guess where you live and work.</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The single most important privacy lever: <strong>revoke permission for sites that don&apos;t actively need live location.</strong> A map site asking once per visit is fine; a games or social site silently using
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">watchPosition</code>{' '}
        in the background is something to be skeptical of.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">How GetMyLocations uses the API</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        <Link to="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link> calls
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">getCurrentPosition</code>{' '}
        once on page load (after the user grants permission), then optionally switches to
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">watchPosition</code>{' '}
        if they enable live tracking. Coordinates are processed entirely in the browser &mdash; map tiles and reverse-geocoding requests are sent to third parties as described in our
        {' '}<Link to="/privacy-policy" className="text-electric-400 hover:underline">Privacy Policy</Link>, but the raw coordinate itself is not stored on a server we operate.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        For a side-by-side feel of what different accuracy values look like, open the tool and toggle the precise-location permission off and back on. The accuracy radius drawn on the map jumps from ~5 m to ~10 km in real time &mdash; a more intuitive demonstration than any blog post.
      </p>
    </article>
  );
}
