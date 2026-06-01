import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout.jsx';

export default function GpsVsIpAccuracy() {
  return (
    <PageLayout title="GPS vs IP Accuracy — Which Is More Precise and When">
      <article>
        <p className="text-xs uppercase tracking-[0.18em] text-electric-400 font-semibold">Comparison Guide</p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight mt-2 leading-[1.1]">
          GPS vs IP accuracy &mdash; which method is more precise, and when does each one fail?
        </h1>
        <p className="mt-4 text-lg text-slate-300/90 leading-relaxed">
          Every &ldquo;find my location&rdquo; tool quietly chooses between two very different signals: the
          GPS chip in your device, and the public IP your network handed you. They&apos;re not
          remotely equivalent &mdash; one places you within a meter, the other within tens of
          kilometers &mdash; but the difference is invisible unless you know what to look for. This
          guide explains how accurate each one really is, when one fails and the other saves you,
          and why your browser sometimes shows the wrong city even with location permission granted.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">The short answer</h2>
        <div className="mt-4 glass rounded-2xl p-5 ring-1 ring-white/10 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-electric-400 uppercase tracking-wider text-xs">
                <th className="pb-3 pr-4">Method</th>
                <th className="pb-3 pr-4">Typical accuracy</th>
                <th className="pb-3 pr-4">Best case</th>
                <th className="pb-3">Worst case</th>
              </tr>
            </thead>
            <tbody className="text-slate-300/90">
              <tr className="border-t border-white/10">
                <td className="py-3 pr-4 font-semibold text-slate-100">GPS (outdoor)</td>
                <td className="py-3 pr-4">3&ndash;5 m</td>
                <td className="py-3 pr-4">~30 cm (RTK, surveying gear)</td>
                <td className="py-3">~10 m (urban canyon)</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="py-3 pr-4 font-semibold text-slate-100">Wi-Fi positioning</td>
                <td className="py-3 pr-4">10&ndash;25 m</td>
                <td className="py-3 pr-4">~5 m (dense Wi-Fi, dense BSSID db)</td>
                <td className="py-3">~100 m (rural, sparse Wi-Fi)</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="py-3 pr-4 font-semibold text-slate-100">Cell tower</td>
                <td className="py-3 pr-4">500&ndash;2000 m</td>
                <td className="py-3 pr-4">~50 m (5G small cells)</td>
                <td className="py-3">several km (rural macro cells)</td>
              </tr>
              <tr className="border-t border-white/10">
                <td className="py-3 pr-4 font-semibold text-slate-100">IP geolocation</td>
                <td className="py-3 pr-4">city-level (~25 km)</td>
                <td className="py-3 pr-4">~1 km (residential ISP, fresh data)</td>
                <td className="py-3">wrong country (VPN, mobile gateway)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-slate-300/90 leading-relaxed text-sm">
          GPS is two to four orders of magnitude more accurate than IP for finding <em>where you are
          right now</em>. IP is much faster and works without permission, which is why so many
          websites use it as a default. Both are useful &mdash; for different things.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">How accurate is browser location, really?</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          When a web page calls the browser&apos;s Geolocation API, what comes back is whatever the
          operating system decides to provide. Modern OSes fuse multiple signals and pick the best
          available:
        </p>
        <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
          <li><strong>Outdoors, on a phone, in clear weather:</strong> ~3 m. Pure GNSS (GPS + Galileo + GLONASS + BeiDou) is doing the work.</li>
          <li><strong>Indoors, in a city, on a phone:</strong> ~20 m. Wi-Fi BSSID lookup carries the load because the GPS signal is too weak.</li>
          <li><strong>On a desktop with no GPS chip:</strong> ~25 m to ~5 km. Wi-Fi if available, otherwise IP-only.</li>
          <li><strong>Permission denied:</strong> the API throws an error. The page falls back to IP geolocation, which is wildly less accurate.</li>
        </ul>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          Every reading also comes with an
          {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">accuracy</code>{' '}
          field in meters. Treat it as the radius of a circle the device thinks it&apos;s probably
          inside. An accuracy of 8 means the OS is fairly confident you&apos;re within an 8-meter
          radius; an accuracy of 5000 (yes, common indoors) means it&apos;s essentially guessing.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">Why GPS wins for &ldquo;where am I right now&rdquo;</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          GPS measures your position from physics: time-of-flight from at least four satellites,
          each broadcasting an atomic-clock-stamped signal from a known orbit. Solve the system,
          get a coordinate. Nothing about it depends on a database, a network connection, or
          someone&apos;s prior visit.
        </p>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          The downsides: it takes a few seconds to a few minutes to get a first fix (acquiring
          the satellites&apos; orbit data, called the almanac, takes time). It needs a reasonably
          clear sky &mdash; indoors and in &ldquo;urban canyons&rdquo; the signal multi-paths off
          buildings and accuracy degrades. It also requires hardware &mdash; most laptops and
          desktops don&apos;t have a GPS chip at all and fall back to Wi-Fi or IP. For the deeper
          physics, read our <Link to="/blog/how-gps-works" className="text-electric-400 hover:underline">how GPS works</Link> guide.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">Why IP loses for precision but wins elsewhere</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          IP geolocation is a database lookup. There&apos;s no measurement &mdash; just a guess based
          on which ISP owns your IP block and which city they registered it to. The provider can
          be wrong by anywhere from a few kilometers to a different continent if you&apos;re behind
          a VPN.
        </p>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          Where IP wins: it&apos;s instantaneous, requires no permission, works on every device (no
          GPS chip needed), and is exactly precise enough for the use cases where you only need a
          country or region &mdash; localizing language, currency, or content licensing. For the
          full picture, see the
          {' '}<Link to="/ip-location-lookup" className="text-electric-400 hover:underline">IP location lookup guide</Link>.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">VPN and GPS &mdash; what gets rewritten and what doesn&apos;t</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          This is the single biggest source of confusion. A VPN tunnels your network traffic
          through a server somewhere else. That changes your <em>IP-visible location</em>
          completely. It does <em>not</em> touch the GPS chip in your phone or the Wi-Fi BSSID
          scan your OS performs.
        </p>
        <p className="mt-3 text-slate-300/90 leading-relaxed">Concrete examples:</p>
        <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
          <li>
            VPN on, GPS permission granted &mdash; the browser shows your <em>real</em> location.
            The IP-based map widget on the same page may show the VPN exit city. They disagree by
            design.
          </li>
          <li>
            VPN on, GPS permission denied &mdash; the browser falls back to IP. The map shows the
            VPN exit city.
          </li>
          <li>
            VPN off, GPS permission denied &mdash; the browser falls back to IP. The map shows
            wherever your ISP&apos;s database has you registered.
          </li>
          <li>
            VPN on, browsing on a desktop with no GPS chip &mdash; everything is IP-based. Wi-Fi
            positioning may still work if Apple/Google have indexed your nearby access points,
            but most of those Wi-Fi databases also check IP for sanity and may refuse to answer
            from a VPN.
          </li>
        </ul>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          Useful trick: a quick way to verify a VPN actually works is to open
          {' '}<Link to="/" className="text-electric-400 hover:underline">GetMyLocations</Link> on a desktop,
          decline the precise-location prompt, and check whether the IP-only fallback places you
          where the VPN claims to be. If it doesn&apos;t, the VPN has a leak.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">When each method fails &mdash; and what to do</h2>
        <div className="mt-4 grid sm:grid-cols-2 gap-5">
          <div className="glass rounded-2xl p-5 ring-1 ring-white/10">
            <h3 className="font-display text-lg font-semibold text-slate-100">GPS fails when&hellip;</h3>
            <ul className="mt-3 space-y-2 text-slate-300/90 text-sm list-disc list-inside">
              <li>You&apos;re deep inside a building with no sky view.</li>
              <li>You&apos;re in an urban canyon and signals are multi-pathing.</li>
              <li>The device is in battery-saver mode and downsampled GPS.</li>
              <li>You&apos;re on a desktop with no GPS hardware.</li>
              <li>The OS hasn&apos;t acquired the satellite almanac yet (cold start).</li>
            </ul>
            <p className="mt-3 text-slate-300/90 text-sm">
              <strong className="text-slate-100">Fix:</strong> move closer to a window, give it a minute, and turn on Wi-Fi so the OS can fuse signals.
            </p>
          </div>

          <div className="glass rounded-2xl p-5 ring-1 ring-white/10">
            <h3 className="font-display text-lg font-semibold text-slate-100">IP fails when&hellip;</h3>
            <ul className="mt-3 space-y-2 text-slate-300/90 text-sm list-disc list-inside">
              <li>You&apos;re behind a VPN, corporate proxy, or Tor.</li>
              <li>You&apos;re on mobile data and the carrier back-hauls through a distant gateway.</li>
              <li>Your ISP recently reassigned the IP block and the database is stale.</li>
              <li>You&apos;re on CGNAT and the visible IP rotates.</li>
            </ul>
            <p className="mt-3 text-slate-300/90 text-sm">
              <strong className="text-slate-100">Fix:</strong> grant precise browser location, or disable the VPN if you only need country-level accuracy. Step-by-step in our
              {' '}<Link to="/fix-location-not-working" className="text-electric-400 hover:underline">troubleshooting guide</Link>.
            </p>
          </div>
        </div>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">Which one to use for which task</h2>
        <ul className="mt-3 space-y-3 text-slate-300/90 list-disc list-inside">
          <li>
            <strong>Navigation, find-my-coordinates, geocaching, AML emergency dispatch:</strong>
            {' '}GPS. There&apos;s no substitute &mdash; you need meters, not kilometers.
          </li>
          <li>
            <strong>Localizing language, currency, content geo-blocking, fraud scoring:</strong>
            {' '}IP. You only need country or region; speed and zero-permission matter.
          </li>
          <li>
            <strong>Weather, news, &ldquo;restaurants near me&rdquo;:</strong> either, with a hybrid fallback.
            Try GPS first if the user grants it; fall back to IP for a city-level guess that&apos;s
            still useful.
          </li>
          <li>
            <strong>Verifying a VPN actually works:</strong> IP only, with GPS deliberately denied.
            See the trick described above.
          </li>
          <li>
            <strong>Asset tracking, fleet management, drone control:</strong> GPS (often with RTK
            corrections for centimeter-level precision).
          </li>
        </ul>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">See both readings side by side</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          The fastest way to feel the difference: open
          {' '}<Link to="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link> and
          allow the location prompt. The dashboard shows your IP-derived city alongside your
          GPS-derived coordinates and accuracy. Toggle the precise-location permission off and
          back on; you&apos;ll see the city stay the same while the coordinates and accuracy radius
          change dramatically.
        </p>

        <h2 className="font-display text-2xl font-bold mt-10">Related guides</h2>
        <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
          <li><Link to="/ip-location-lookup" className="text-electric-400 hover:underline">IP location lookup &mdash; complete guide</Link></li>
          <li><Link to="/gps-coordinates-finder" className="text-electric-400 hover:underline">GPS coordinates finder &mdash; complete guide</Link></li>
          <li><Link to="/fix-location-not-working" className="text-electric-400 hover:underline">Fix location not working &mdash; troubleshooting</Link></li>
          <li><Link to="/reverse-geocoding" className="text-electric-400 hover:underline">Reverse geocoding &mdash; coordinates to address</Link></li>
          <li><Link to="/blog/how-gps-works" className="text-electric-400 hover:underline">How GPS works &mdash; the satellite math</Link></li>
          <li><Link to="/blog/what-is-ip-location-and-how-accurate" className="text-electric-400 hover:underline">What is IP location and how accurate is it?</Link></li>
        </ul>
      </article>
    </PageLayout>
  );
}
