import Link from 'next/link';

export default function WhatIsIpLocation() {
  return (
    <article className="prose-invert">
      <p className="text-lg text-fg-muted leading-relaxed">
        Industry studies of IP geolocation accuracy come back with a
        number that surprises people: the city the database returns is
        right only 50 to 75% of the time on residential broadband, and
        significantly worse on mobile networks. The country, by contrast,
        is right 95 to 99% of the time. This gap &mdash; very accurate at
        the country level, fairly bad at the city level &mdash; explains
        almost every &ldquo;why does the website think I&rsquo;m in a
        different city?&rdquo; story you&rsquo;ve ever heard.
      </p>

      {/* TODO: Ahmed to add a side-by-side image &mdash; left panel: actual ipapi.co response showing city/country/ISP from his real home connection; right panel: actual browser-geolocation reading from /my-location on the same machine. Caption the offset in km. /public/screenshots/ip-vs-gps-side-by-side.png. Once added, edit the paragraph below to cite the real offset instead of "tens of kilometers" generalities. */}

      <h2 className="font-display text-2xl font-bold mt-12">What an IP actually is</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        An IP (Internet Protocol) address is the number every device gets
        when it connects to the internet, so that responses can find their
        way back. Two formats are in widespread use:
      </p>
      <ul className="mt-3 space-y-1.5 text-fg-muted list-disc list-inside">
        <li><strong>IPv4</strong> &mdash; four numbers separated by dots, e.g. <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent">142.250.190.78</code></li>
        <li><strong>IPv6</strong> &mdash; eight blocks of hex digits, e.g. <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent">2001:0db8:85a3::8a2e:0370:7334</code></li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        IP addresses aren&rsquo;t random. Your ISP draws them from a block
        it owns, and those blocks are registered to specific geographic
        regions. That registration is the seed of every geolocation
        database in the world.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">How the databases are actually built</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The four or five companies that dominate IP geolocation &mdash;
        MaxMind, IPinfo, IP2Location, BigDataCloud &mdash; each spend
        tens of millions of dollars a year keeping their databases
        current. The raw inputs are the same for everyone:
      </p>
      <ol className="mt-3 list-decimal list-inside space-y-1.5 text-fg-muted">
        <li><strong>Regional Internet Registry records</strong> &mdash; RIPE, ARIN, APNIC, etc. publish which ISPs own which IP ranges.</li>
        <li><strong>BGP routing snapshots</strong> &mdash; which network operator announces which prefix on which backbone.</li>
        <li><strong>Reverse-DNS PTR records</strong> &mdash; which sometimes encode a city or point-of-presence name.</li>
        <li><strong>Latency probes</strong> &mdash; servers around the world ping the IP; the response time helps narrow which city it&rsquo;s near.</li>
        <li><strong>Wi-Fi BSSID corroboration</strong> &mdash; for mobile devices, cross-checking against the Apple/Google Wi-Fi databases.</li>
        <li><strong>User corrections</strong> &mdash; when someone reports &ldquo;my location is wrong,&rdquo; the database updates.</li>
      </ol>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Updates propagate unevenly. A new IP block allocated to a
        Pakistani ISP last week may be correct in BigDataCloud&rsquo;s
        daily refresh but show up as &ldquo;unknown&rdquo; in a
        six-month-old free dataset. This is why ad networks and fraud
        teams pay for premium feeds while small developers (myself
        included, for this site) use the free monthly snapshots.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The accuracy numbers, in order of how often they&rsquo;re right</h2>
      <ul className="mt-3 space-y-1.5 text-fg-muted list-disc list-inside">
        <li><strong>Country level:</strong> 95&ndash;99%. The one thing IP geolocation reliably does well.</li>
        <li><strong>Region or state:</strong> 80&ndash;90% in developed countries; lower elsewhere.</li>
        <li><strong>City:</strong> 50&ndash;75% &mdash; often pointing to a different city in the same metro area.</li>
        <li><strong>Street:</strong> essentially impossible from IP alone. Best the public databases get you is a 5&ndash;50 km radius.</li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The easiest way to feel the difference is to open
        {' '}<Link href="/" className="text-accent hover:underline">GetMyLocations</Link>{' '}
        and decline the precise GPS prompt. The page falls back to IP
        estimation, and you&rsquo;ll often see a city kilometres from
        where you actually are.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Why the city is wrong so often</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        A handful of recurring scenarios throw IP geolocation off, and
        between them they cover most of the failures:
      </p>
      <ul className="mt-3 space-y-1.5 text-fg-muted list-disc list-inside">
        <li><strong>VPNs.</strong> Your visible IP belongs to the provider&rsquo;s server. Use a Tokyo VPN and IP databases swear you&rsquo;re in Tokyo.</li>
        <li><strong>Carrier-grade NAT on mobile.</strong> Cellular networks pool thousands of subscribers behind a single IP, often anchored to a city far from yours.</li>
        <li><strong>Corporate or school networks.</strong> Traffic might exit via a single data centre hundreds of kilometres away.</li>
        <li><strong>Tor or proxy chains.</strong> Apparent IP could be anywhere.</li>
        <li><strong>Stale database entries.</strong> ISPs reassign IP blocks; if the database hasn&rsquo;t caught up, you&rsquo;re reported wherever the previous owner was.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">IP versus GPS &mdash; the numbers side-by-side</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-fg-subtle border-b border-line">
              <th className="text-left py-2 pr-4 font-semibold">Property</th>
              <th className="text-left py-2 pr-4 font-semibold">IP Location</th>
              <th className="text-left py-2 font-semibold">GPS</th>
            </tr>
          </thead>
          <tbody className="text-fg-muted">
            <tr className="border-b border-line-subtle"><td className="py-2 pr-4">Typical accuracy</td><td className="py-2 pr-4">5&ndash;50 km</td><td className="py-2">3&ndash;5 m</td></tr>
            <tr className="border-b border-line-subtle"><td className="py-2 pr-4">Works offline</td><td className="py-2 pr-4">No</td><td className="py-2">Yes</td></tr>
            <tr className="border-b border-line-subtle"><td className="py-2 pr-4">Indoor performance</td><td className="py-2 pr-4">Same as outdoor</td><td className="py-2">Degraded</td></tr>
            <tr className="border-b border-line-subtle"><td className="py-2 pr-4">Permission needed</td><td className="py-2 pr-4">No (visible by default)</td><td className="py-2">Yes</td></tr>
            <tr><td className="py-2 pr-4">Defeated by VPN</td><td className="py-2 pr-4">Yes</td><td className="py-2">No</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="font-display text-2xl font-bold mt-12">What IP geolocation is actually useful for</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Despite the imprecision, IP geolocation earns its keep in a few
        specific jobs:
      </p>
      <ul className="mt-3 space-y-1.5 text-fg-muted list-disc list-inside">
        <li><strong>Country-level licensing.</strong> Netflix, Spotify, and BBC iPlayer use it to enforce regional rights.</li>
        <li><strong>Default language and currency.</strong> E-commerce sites guess your preferred locale on first load.</li>
        <li><strong>Fraud detection.</strong> A payment from an IP in Lagos using a card billed in Toronto looks suspicious.</li>
        <li><strong>Coarse advertising.</strong> &ldquo;Find a plumber near you&rdquo; ads.</li>
        <li><strong>Server log analysis.</strong> Understanding which countries traffic comes from.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">CGNAT, IPv6, and why mobile is the hardest case</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The world ran out of unassigned IPv4 addresses in 2011 (APNIC,
        the Asia-Pacific registry, exhausted first). ISPs respond with
        <strong> Carrier-Grade NAT</strong>: multiple subscribers share a
        single public IPv4, distinguished only by port number. From the
        outside, hundreds of households in a neighbourhood can all look
        like the same IP. For geolocation this is mostly tolerable
        &mdash; the shared IP still maps to roughly the same area &mdash;
        but for any service that needs to reach back into your network
        (a game server, a VoIP call, remote desktop), CGNAT is a permanent
        headache.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Mobile carriers are the worst case for geolocation specifically.
        Cellular traffic is back-hauled to a small number of gateways
        before exiting to the public internet. Your IP almost always
        resolves to whichever city houses the gateway your traffic
        passes through &mdash; not where you&rsquo;re actually standing.
        Reliance Jio users in eastern India often geolocate to Mumbai;
        Verizon LTE traffic across the US northeast often geolocates to a
        single Pennsylvania facility. If a service desperately needs your
        real location and you&rsquo;re on cellular, IP is essentially
        useless &mdash; only GPS will get them what they need.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        IPv6 solves the address shortage with a space large enough to
        give every grain of sand on Earth its own address. Adoption is
        uneven &mdash; about 45% of Google traffic worldwide was over
        IPv6 in 2025 &mdash; but rising. IPv6 geolocation tends to be a
        bit more honest because there&rsquo;s no incentive to share
        addresses across many subscribers.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">CDNs muddy the picture even more</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        When you visit a popular site, the IP your browser connects to
        usually belongs to a Content Delivery Network (Cloudflare, Akamai,
        Fastly), not to the actual application server. CDNs route you to
        whichever data centre is closest. This is exactly the
        latency-aware routing that makes the modern web fast, but it
        means a single hostname can resolve to dozens of IPs around the
        world depending on where you are.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Server-side IP geolocation can lie in either direction as a
        result. A data centre in Frankfurt serves users all across
        Europe; databases tagged with the data centre&rsquo;s coordinates
        report all those users as German. The opposite &mdash; many users
        in one city served from a far-away data centre &mdash; happens
        too when smaller CDNs lack regional presence.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What an IP genuinely reveals about you</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Every website you visit sees your IP &mdash; there&rsquo;s no
        getting around that, somebody has to know where to send the
        response. What an IP <em>does</em> give away in 2026:
      </p>
      <ul className="mt-3 space-y-1.5 text-fg-muted list-disc list-inside">
        <li>Your country, and with some luck your city.</li>
        <li>Your ISP or mobile carrier.</li>
        <li>Whether you&rsquo;re on a VPN, Tor exit, or known proxy.</li>
        <li>Approximately when you connected.</li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        What it doesn&rsquo;t: your name, your street address, your
        identity. To get those, an investigator needs a legal subpoena
        served on your ISP. If you read a news story about somebody
        being &ldquo;tracked through their IP,&rdquo; there is almost
        always a court order somewhere in the middle of the story.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">See it for yourself</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Open
        {' '}<Link href="/" className="text-accent hover:underline font-semibold">GetMyLocations</Link>{' '}
        and decline the precise GPS prompt. You&rsquo;ll get the IP-only
        estimate, often pleasantly wrong by 10+ km. Then allow GPS and
        watch the accuracy number jump by four or five orders of
        magnitude. That direct A/B is the single fastest way to grok the
        difference between the two systems.
      </p>
    </article>
  );
}
