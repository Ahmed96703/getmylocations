import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout.jsx';

export default function IpLocationLookup() {
  return (
    <PageLayout title="IP Location Lookup — Find Your Public IP, ISP, and Approximate City">
      <article>
        <p className="text-xs uppercase tracking-[0.18em] text-electric-400 font-semibold">Complete Guide</p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight mt-2 leading-[1.1]">
          IP location lookup &mdash; what your public IP reveals, and what it doesn&apos;t
        </h1>
        <p className="mt-4 text-lg text-slate-300/90 leading-relaxed">
          Every device on the public internet has an IP address. That address quietly leaks a
          surprising amount about you &mdash; your approximate city, your internet provider, the
          kind of connection you&apos;re on &mdash; but also <em>less</em> than most people assume.
          This guide explains exactly what an IP lookup can and can&apos;t tell, how to find your
          own public IP, how IP-based geolocation actually works under the hood, and what to do
          when the city it reports is wrong.
        </p>

        <div className="mt-6 glass rounded-2xl p-5 ring-1 ring-electric-400/30">
          <p className="text-sm text-slate-300/90 leading-relaxed">
            <strong className="text-slate-100">Quick answer.</strong> Open the
            {' '}<Link to="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link>{' '}
            tool. Even if you deny the precise-location prompt, the IP fallback shows your public
            IPv4 / IPv6 address, the carrier or ISP that owns the IP block, and the city the
            database has it registered to &mdash; usually within seconds.
          </p>
        </div>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">What is a public IP address?</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          A public IP address is the number your internet provider hands out to your home router,
          office network, or mobile hotspot so the rest of the internet can route packets back to
          you. It looks like <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">203.0.113.42</code>{' '}
          for the older IPv4 system or like
          {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">2001:db8::1</code>{' '}
          for the newer IPv6 system. Most home connections still get IPv4, often shared with
          dozens of other customers via Carrier-Grade NAT; many mobile networks have moved to
          IPv6.
        </p>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          Crucially, your <strong>private</strong> IP (something like
          {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">192.168.1.5</code>) is
          completely separate. That&apos;s the address your router gives your laptop or phone on
          your local Wi-Fi. The outside world never sees it &mdash; only your public IP is
          visible to websites.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">How to find your public IP &mdash; three ways</h2>

        <h3 className="font-display text-lg font-semibold mt-6 text-slate-100">1. Use a browser tool</h3>
        <p className="mt-2 text-slate-300/90 leading-relaxed">
          Easiest by far. Open <Link to="/" className="text-electric-400 hover:underline">GetMyLocations</Link> and
          the IP appears in the dashboard panel. You don&apos;t need to grant any permission &mdash;
          the page just reads the IP visible to the server when your browser connected.
        </p>

        <h3 className="font-display text-lg font-semibold mt-6 text-slate-100">2. Ask your router</h3>
        <p className="mt-2 text-slate-300/90 leading-relaxed">
          Open your router&apos;s admin page (usually <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">192.168.1.1</code>{' '}
          or <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">192.168.0.1</code>) in
          a browser. The WAN or Internet section shows the IP your ISP has assigned. This is the
          ground-truth source &mdash; if it disagrees with a website&apos;s reading, you&apos;re probably
          behind a VPN or proxy.
        </p>

        <h3 className="font-display text-lg font-semibold mt-6 text-slate-100">3. Command line</h3>
        <p className="mt-2 text-slate-300/90 leading-relaxed">
          On macOS or Linux, run <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">curl ifconfig.me</code> or
          {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">curl ipinfo.io/ip</code>. On
          Windows, use PowerShell:
          {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">(Invoke-WebRequest ifconfig.me).Content</code>. The
          answer is your current public IP, fetched directly.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">How IP geolocation actually works</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          When a website turns your IP into &ldquo;Lahore, Pakistan&rdquo; or &ldquo;Mumbai, India&rdquo;, it isn&apos;t
          reading anything from your computer. It&apos;s looking up the IP in a database. The
          database itself is built by companies like MaxMind, IPinfo, IP2Location, and
          BigDataCloud from several signals:
        </p>
        <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
          <li>
            <strong>ARIN/RIPE/APNIC registration records.</strong> When an ISP buys a block of IP
            addresses, they register it with the regional internet registry along with the
            country it operates in. This gives a country-level fix essentially for free.
          </li>
          <li>
            <strong>BGP routing data.</strong> The way IP traffic is announced across the internet
            backbone reveals which network operator handles which block, and roughly where their
            peering points are.
          </li>
          <li>
            <strong>Reverse DNS hints.</strong> An IP&apos;s PTR record often encodes the city or
            POP (point of presence). A hostname like{' '}
            <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">karachi-pool-3.isp.pk</code>{' '}
            is a fairly strong signal.
          </li>
          <li>
            <strong>Latency-based triangulation.</strong> Some providers ping known servers from
            an unknown IP and use response times to narrow the geographic possibilities.
          </li>
          <li>
            <strong>Crowd-sourced ground truth.</strong> When a mobile app with GPS access also
            sees an IP, it can tag that IP with a real coordinate. Millions of these readings
            train the database.
          </li>
        </ul>

        <p className="mt-4 text-slate-300/90 leading-relaxed">
          The result is fast and free, but inherently fuzzy. Country-level accuracy is usually
          better than 99%, but city-level accuracy is often only 50&ndash;80%, and street-level
          accuracy is essentially impossible from IP alone. For why this matters, see our
          {' '}<Link to="/blog/what-is-ip-location-and-how-accurate" className="text-electric-400 hover:underline">deep dive on IP location accuracy</Link>.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">What your IP tells someone (and what it doesn&apos;t)</h2>

        <h3 className="font-display text-lg font-semibold mt-6 text-slate-100">What it usually reveals</h3>
        <ul className="mt-2 space-y-2 text-slate-300/90 list-disc list-inside">
          <li>Your country (almost always correct).</li>
          <li>Your region or state (often correct).</li>
          <li>The internet service provider (ISP) that owns your IP block.</li>
          <li>Whether you&apos;re on residential broadband, mobile data, a hosting provider, or a known VPN exit node.</li>
          <li>An approximate city, accurate to ~25 km on a good day.</li>
        </ul>

        <h3 className="font-display text-lg font-semibold mt-6 text-slate-100">What it does NOT reveal</h3>
        <ul className="mt-2 space-y-2 text-slate-300/90 list-disc list-inside">
          <li>Your street address &mdash; despite what films suggest.</li>
          <li>Your name &mdash; the ISP knows it, but a public IP lookup doesn&apos;t.</li>
          <li>The brand of device you&apos;re using.</li>
          <li>Your exact GPS coordinates &mdash; those would have to come from a browser geolocation grant, not the IP.</li>
        </ul>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">Track your IP &mdash; why it changes</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          If you check your public IP today and again next week, it may have changed entirely.
          Reasons:
        </p>
        <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
          <li>
            <strong>Dynamic ISP leases.</strong> Most residential ISPs hand out IPs with a lease
            time of hours to days. When the lease ends, you may get a different IP from the same
            pool. Restarting the modem usually forces this.
          </li>
          <li>
            <strong>Mobile network re-anchoring.</strong> Switching between LTE and 5G, or between
            cell towers, can move you to a different carrier gateway and a different public IP.
          </li>
          <li>
            <strong>CGNAT (Carrier-Grade NAT).</strong> Multiple subscribers may share a single
            IPv4 with different port ranges. Your visible IP changes every time the carrier&apos;s
            NAT table rotates.
          </li>
          <li>
            <strong>Wi-Fi vs cellular.</strong> Same device, completely different IP depending on
            which network it&apos;s on.
          </li>
        </ul>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          If you need a stable IP &mdash; for remote access, whitelisting, or running a small
          server &mdash; most ISPs offer a static IP as a paid add-on. Otherwise, dynamic DNS
          services like DuckDNS or No-IP can point a hostname at whatever your current IP is.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">IPv4 lookup vs IPv6</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          IPv4 addresses (32 bits, 4.3 billion possible values) ran out years ago. New deployments
          increasingly use IPv6 (128 bits, basically infinite). Both can be looked up the same
          way and both leak similar information, but a few practical differences are worth
          knowing:
        </p>
        <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
          <li>
            <strong>IPv6 is often more honest.</strong> Many CGNAT setups only proxy IPv4. If you
            visit an IPv6-capable site over IPv6, the address you see is more likely your
            device&apos;s actual prefix, not a carrier pool.
          </li>
          <li>
            <strong>Dual-stack confusion.</strong> Most modern devices have both. The IP that gets
            used depends on which the destination site supports and which the local DNS resolves
            first. Geolocation may disagree between the two stacks.
          </li>
          <li>
            <strong>Privacy extensions.</strong> IPv6 supports temporary addresses (RFC 4941)
            that rotate every few hours to avoid tracking. Older IPv6 hosts derived the last 64
            bits from the network card&apos;s MAC, which was a privacy disaster &mdash; modern systems
            avoid this by default.
          </li>
        </ul>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">Internet provider (ISP) lookup</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          The ISP that owns your IP is in the same database as the location. Looking it up tells
          you whether you&apos;re on a residential connection (Comcast, BT, Jazz), a mobile
          carrier (T-Mobile, Reliance Jio), a corporate network, a hosting provider (AWS, Azure,
          Hetzner), or a known VPN. Marketing platforms, fraud-detection systems, and ad networks
          use this to score traffic quality &mdash; a hit from a data-center IP is treated very
          differently from a hit from a residential subscriber.
        </p>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          You can sanity-check the answer yourself by running{' '}
          <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">whois</code>{' '}
          against your IP in a terminal. The
          {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">OrgName</code>{' '}
          or <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">netname</code>{' '}
          field is the ISP that registered the IP block.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">When the city is wrong</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          Seeing the wrong city in an IP lookup is extremely common and almost never your fault.
          The usual causes:
        </p>
        <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
          <li>
            <strong>You&apos;re on a VPN.</strong> The IP you appear to be on belongs to the VPN&apos;s
            exit server. That&apos;s the entire point of a VPN.
          </li>
          <li>
            <strong>You&apos;re on a corporate network.</strong> Your traffic exits through the
            company&apos;s head office. The IP looks like it&apos;s there.
          </li>
          <li>
            <strong>You&apos;re on a mobile carrier.</strong> Mobile traffic is often back-hauled to
            the carrier&apos;s regional aggregation. Your IP can geolocate hundreds of miles from
            where you&apos;re sitting.
          </li>
          <li>
            <strong>The database is stale.</strong> ISPs reassign IP blocks. Databases catch up
            slowly &mdash; sometimes months.
          </li>
        </ul>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          The fix, if you need accurate location, is to grant GPS-level browser geolocation
          instead of relying on IP. Step-by-step browser fixes are in our
          {' '}<Link to="/fix-location-not-working" className="text-electric-400 hover:underline">troubleshooting guide</Link>.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">Privacy considerations</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          Every website you visit can see your IP &mdash; that&apos;s required for the connection
          to work. What they do with it varies. GetMyLocations doesn&apos;t log your IP for
          analytics, but our hosting provider (Cloudflare) keeps short-lived request logs for
          abuse prevention, and our third-party services (reverse geocoding, advertising) may
          process your IP for their own purposes. The full breakdown is in our
          {' '}<Link to="/privacy-policy" className="text-electric-400 hover:underline">Privacy Policy</Link>.
        </p>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          If you want to limit what an IP lookup reveals, the standard tools are a reputable
          consumer VPN (Mullvad, IVPN, ProtonVPN), the Tor browser for stronger anonymity, or
          simply visiting from a different network. None of these are bulletproof &mdash; they
          all leak in different ways &mdash; but they substantially raise the cost of tracking.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">Try the IP lookup now</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          Open <Link to="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link>. Your
          public IP, the ISP that owns it, and the database-guessed city all appear in the
          dashboard &mdash; no permission prompt required, since the page reads what your browser
          already sent on the connection.
        </p>

        <h2 className="font-display text-2xl font-bold mt-10">Related guides</h2>
        <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
          <li><Link to="/blog/what-is-ip-location-and-how-accurate" className="text-electric-400 hover:underline">What is IP location and how accurate is it?</Link></li>
          <li><Link to="/gps-coordinates-finder" className="text-electric-400 hover:underline">GPS coordinates finder &mdash; complete guide</Link></li>
          <li><Link to="/fix-location-not-working" className="text-electric-400 hover:underline">Fix location not working &mdash; troubleshooting</Link></li>
          <li><Link to="/blog/how-gps-works" className="text-electric-400 hover:underline">How GPS works &mdash; satellite math</Link></li>
        </ul>
      </article>
    </PageLayout>
  );
}
