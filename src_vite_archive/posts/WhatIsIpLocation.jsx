import { Link } from 'react-router-dom';

export default function WhatIsIpLocation() {
  return (
    <article className="prose-invert">
      <p className="text-lg text-slate-300/90 leading-relaxed">
        Every time you stream a video, log into a service, or fill out a form online, somewhere in the background a server is guessing where you are based on your IP address. This is called <strong>IP geolocation</strong> — and while it powers everything from regional Netflix catalogs to fraud detection, it’s far less accurate than most people think. Here’s how it actually works, what it can and can’t see, and how it compares to GPS.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What is an IP address?</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        An IP (Internet Protocol) address is the unique number every device gets when it connects to the internet — like a postal address, but for data packets. There are two formats in widespread use:
      </p>
      <ul className="mt-3 space-y-1.5 text-slate-300/90 list-disc list-inside">
        <li><strong>IPv4</strong> — four numbers separated by dots, e.g. <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400">142.250.190.78</code></li>
        <li><strong>IPv6</strong> — eight blocks of hex digits, e.g. <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400">2001:0db8:85a3::8a2e:0370:7334</code></li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Your IP isn’t random. It’s assigned by your Internet Service Provider (ISP) from a block they own, and those blocks are registered to specific geographic regions.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">How IP location actually works</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        IP geolocation databases (run by companies like MaxMind, IPinfo, BigDataCloud, and IP2Location) map every IP block to a likely city, region, and country. They build these maps by combining:
      </p>
      <ol className="mt-3 list-decimal list-inside space-y-1.5 text-slate-300/90">
        <li><strong>Regional Internet Registry data</strong> — RIPE, ARIN, APNIC, etc. publish which ISPs own which IP ranges.</li>
        <li><strong>ISP-published BGP routing tables</strong> — these reveal where traffic is physically routed.</li>
        <li><strong>User-submitted corrections</strong> — when someone reports “my location is wrong,” the database updates.</li>
        <li><strong>Wi-Fi access point mapping</strong> — for mobile devices, the database can cross-reference visible Wi-Fi SSIDs with known locations.</li>
      </ol>

      <h2 className="font-display text-2xl font-bold mt-12">So, how accurate is IP location?</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The honest answer: <strong>much less accurate than you’d expect.</strong> Industry studies consistently show:
      </p>
      <ul className="mt-3 space-y-1.5 text-slate-300/90 list-disc list-inside">
        <li><strong>Country-level:</strong> 95-99% accurate. This is the one thing IP location does well.</li>
        <li><strong>Region/state-level:</strong> 80-90% accurate in developed countries, lower elsewhere.</li>
        <li><strong>City-level:</strong> 50-75% accurate — often pointing to the wrong city in the same metro area.</li>
        <li><strong>Street-level:</strong> almost never accurate. IP can only get you within 5-50 km in most cases.</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Want to see how your IP is being interpreted right now? Open <Link to="/" className="text-electric-400 hover:underline">GetMyLocations</Link> — when you deny the precise GPS permission, it falls back to IP-based estimation, and you’ll often see a city kilometers from your actual location.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Why IP location is often wrong</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Several common scenarios throw IP geolocation off:
      </p>
      <ul className="mt-3 space-y-1.5 text-slate-300/90 list-disc list-inside">
        <li><strong>You’re on a VPN.</strong> Your visible IP belongs to the VPN provider’s server, not you. Use a Tokyo VPN and IP databases will swear you’re in Tokyo.</li>
        <li><strong>Carrier-grade NAT (mobile networks).</strong> Cell carriers pool thousands of subscribers behind a single IP, often anchored to a city far from yours.</li>
        <li><strong>Corporate / school networks.</strong> All traffic might exit via a single data center hundreds of kilometers away.</li>
        <li><strong>Tor / proxy networks.</strong> Your apparent IP can be anywhere in the world.</li>
        <li><strong>Stale database entries.</strong> ISPs reassign IP blocks; if the database hasn’t updated, you’ll be reported wherever the previous owner was.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">IP location vs GPS: the real comparison</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-white/10">
              <th className="text-left py-2 pr-4 font-semibold">Property</th>
              <th className="text-left py-2 pr-4 font-semibold">IP Location</th>
              <th className="text-left py-2 font-semibold">GPS</th>
            </tr>
          </thead>
          <tbody className="text-slate-300/90">
            <tr className="border-b border-white/5"><td className="py-2 pr-4">Typical accuracy</td><td className="py-2 pr-4">5–50 km</td><td className="py-2">3–5 m</td></tr>
            <tr className="border-b border-white/5"><td className="py-2 pr-4">Works offline</td><td className="py-2 pr-4">No</td><td className="py-2">Yes</td></tr>
            <tr className="border-b border-white/5"><td className="py-2 pr-4">Indoor performance</td><td className="py-2 pr-4">Same as outdoor</td><td className="py-2">Degraded</td></tr>
            <tr className="border-b border-white/5"><td className="py-2 pr-4">User permission needed</td><td className="py-2 pr-4">No (visible by default)</td><td className="py-2">Yes</td></tr>
            <tr><td className="py-2 pr-4">Defeated by VPN</td><td className="py-2 pr-4">Yes</td><td className="py-2">No</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="font-display text-2xl font-bold mt-12">What IP location is good for</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Despite its imprecision, IP geolocation remains useful for a handful of jobs:
      </p>
      <ul className="mt-3 space-y-1.5 text-slate-300/90 list-disc list-inside">
        <li><strong>Country-level content licensing</strong> — Netflix, Spotify, and BBC iPlayer use it to enforce regional rights.</li>
        <li><strong>Default language &amp; currency</strong> — e-commerce sites guess your preferred locale on first load.</li>
        <li><strong>Fraud detection</strong> — a payment from an IP in Lagos using a card billed in Toronto looks suspicious.</li>
        <li><strong>Targeted advertising</strong> — “Find a plumber in [your city]” ads.</li>
        <li><strong>Server log analysis</strong> — understanding which countries traffic comes from.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">Privacy: what your IP reveals about you</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Every website you visit sees your IP — there’s no way around it (someone has to know where to send the response). What an IP <em>does</em> give away:
      </p>
      <ul className="mt-3 space-y-1.5 text-slate-300/90 list-disc list-inside">
        <li>Your country and (with luck) city</li>
        <li>Your ISP or mobile carrier</li>
        <li>Whether you’re on a VPN, Tor, or known proxy</li>
        <li>Approximately when you connected</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        What an IP <strong>does not</strong> give away: your name, your street address, or your identity. To get those, an investigator would need a legal subpoena to your ISP.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        If you want to hide even the country signal, a reputable VPN is the simplest tool. For maximum privacy use Tor — but expect noticeably slower browsing.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Frequently asked questions</h2>

      <h3 className="font-semibold text-lg mt-6 text-slate-100">Can a website see my exact home address from my IP?</h3>
      <p className="mt-2 text-slate-300/90 leading-relaxed">No. The best a public IP geolocation lookup can do is your ISP’s nearest hub, usually 5–50 km from where you actually are.</p>

      <h3 className="font-semibold text-lg mt-6 text-slate-100">Why does my phone show a different city than my IP suggests?</h3>
      <p className="mt-2 text-slate-300/90 leading-relaxed">Because your phone is using GPS or Wi-Fi triangulation in addition to IP. These signals are far more precise than IP alone.</p>

      <h3 className="font-semibold text-lg mt-6 text-slate-100">Is IP location ever useful for security?</h3>
      <p className="mt-2 text-slate-300/90 leading-relaxed">Yes — comparing your typical IP geography to a sudden login from a different country is a cheap, effective anomaly signal that powers most account-protection systems.</p>

      <h2 className="font-display text-2xl font-bold mt-12">A deeper look at how the databases are built</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The four or five companies that dominate IP geolocation each spend tens of millions of dollars a year keeping their databases current. MaxMind&apos;s GeoIP2, IPinfo&apos;s lite and standard tiers, IP2Location&apos;s LITE database, and BigDataCloud&apos;s API all draw from overlapping sources but differ in the corrections they apply and the freshness of their data.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The core inputs are the same for everyone: Regional Internet Registry allocation records (which ISP owns which IP range), BGP routing-table snapshots (which network operator announces which prefix on which backbone), and reverse DNS PTR records (which sometimes encode a city or POP name). What separates a good database from a bad one is the layer on top: latency probes from globally distributed servers (the response time to a known location helps narrow the candidate set), Wi-Fi BSSID corroboration on mobile devices, and crowd-sourced ground truth from apps that have both GPS and IP visibility.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Updates ripple unevenly. A new IP block allocated to a Pakistani ISP last week may appear correctly in BigDataCloud&apos;s daily refresh but show up as &ldquo;unknown&rdquo; in a six-month-old free dataset. This is why ad networks and fraud-detection systems pay for premium feeds while small developers use free monthly snapshots.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">CGNAT and the IPv4 exhaustion problem</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The world ran out of unassigned IPv4 addresses in 2011 (APNIC, the Asia-Pacific registry, exhausted its pool first). ISPs respond with <strong>Carrier-Grade NAT (CGNAT)</strong>: multiple subscribers share a single public IPv4, distinguished by port number. From the outside world&apos;s perspective, hundreds of households in a neighborhood can all look like the same IP.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        For geolocation this is mostly fine — the shared IP still maps to roughly the same area. For other things, it&apos;s a nightmare: hosting a game server, getting a VoIP call to ring through, or being whitelisted for remote work all require port-forwarding that CGNAT breaks. The standard workaround is to pay extra for a static IPv4, or to use a service that does its own NAT traversal (Tailscale, ZeroTier, Cloudflare Tunnel).
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        IPv6 fixes the address shortage with a 128-bit space large enough to give every grain of sand on Earth its own IP. Adoption is uneven — about 45% of Google traffic worldwide was over IPv6 in 2025 — but rising. IPv6 geolocation is typically more honest because there&apos;s no incentive to share addresses across many subscribers.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">CDNs and shared hosting confuse the picture further</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        When you visit a popular site, the IP your browser connects to often belongs to a Content Delivery Network (Cloudflare, Akamai, Fastly), not the actual web server. CDNs route you to whatever data center is geographically closest, which is exactly the kind of latency-aware routing that powers the modern web — but it means a single hostname can resolve to dozens of different IPs around the world depending on where you are.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        For IP geolocation, this matters because the CDN&apos;s IP geolocation can lie in either direction. The data center might be in Frankfurt while serving users across half of Europe; databases tagged with the data center&apos;s location report all those users as German. The reverse — many users in one city served from a far-away data center — is also common when small CDNs lack regional presence.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Mobile carriers are the trickiest case</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Mobile traffic is back-hauled to a small number of carrier gateways before exiting to the public internet. Your IP almost always geolocates to whichever city houses the gateway your traffic was routed through &mdash; not where you&apos;re actually standing. Reliance Jio users in eastern India often geolocate to Mumbai; Verizon LTE traffic across the US northeast often geolocates to a single Pennsylvania facility.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        This is also why geolocating an IP can disagree by hundreds of kilometers on mobile vs Wi-Fi for the same user, same device, same moment. If a service desperately needs your real location and you&apos;re on cellular, IP is essentially useless &mdash; only GPS will get them what they need.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">See it for yourself</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Curious what IP databases think about <em>your</em> IP right now? Open <Link to="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link> and decline the precise GPS prompt — you’ll see the IP-only estimate, often pleasantly wrong by 10+ km. Then allow GPS and watch the accuracy jump by 4-5 orders of magnitude. It’s the single fastest way to grok the difference.
      </p>
    </article>
  );
}
