import Link from 'next/link';

const faqs = [
  {
    q: 'How accurate is IP geolocation, really?',
    a: 'Country level: 95–99% accurate. Region or state: 80–90% in developed markets, lower elsewhere. City: only 50–75%, and often points to a different city in the same metropolitan area. Street level from an IP alone is essentially impossible — the best you can squeeze out of a public database is a 5 to 50 km radius around your real position.',
  },
  {
    q: 'How can I check my own IP location?',
    a: 'Open any IP-lookup tool — our own IP Location page returns your apparent IP, the database city and country, the ISP, and whether you appear to be behind a VPN or proxy. Treat what it shows as a sample of what every website you visit sees by default. The reading is wrong roughly a quarter of the time on residential broadband and much more on cellular.',
  },
  {
    q: 'Why does the website think I am in a different city than I actually am?',
    a: 'Five usual suspects: a VPN whose exit server is in another city, cellular Carrier-Grade NAT routing your traffic through a far-away gateway, a corporate or school network exiting via a distant data centre, a CDN cache reporting its own location rather than yours, or a stale database entry that has not caught up with an ISP reassignment.',
  },
  {
    q: 'How do I change or hide my IP location?',
    a: 'A reputable paid VPN is the easiest answer — pick an exit server in the city you want websites to see, connect, and your apparent IP changes to one in that range. Tor anonymises more aggressively but is slow and many sites block it. Mobile data from a different carrier or a hotspot from a friend in another city also changes your IP. Switching off Wi-Fi for cellular on a phone often moves your apparent city by tens of kilometres because of how CGNAT gateways work.',
  },
  {
    q: 'Can someone find my exact address from my IP address?',
    a: 'No — not without legal process. An IP reveals your country, usually your city, your ISP, and whether you are on a VPN or proxy. It does not reveal your name, your street, or your identity. Tying an IP to a specific human requires a subpoena served on the ISP that owns the block. News stories about people being "tracked through their IP" almost always have a court order hidden somewhere in the middle.',
  },
  {
    q: 'Is IP location better than GPS for finding where I am?',
    a: 'No — they are not comparable. GPS gives you 3 to 5 metres of accuracy outdoors. IP gives you 5 to 50 kilometres in the best case. IP is the right tool for country-level licensing, fraud detection, and rough localisation; GPS is the right tool for "where am I, exactly?" If you want a single coordinate you can copy into a map, use a browser geolocation tool instead of an IP lookup.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function WhatIsIpLocation() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <article className="prose-invert">
      <figure className="mb-8 -mt-2">
        <img
          src="/blog-images/what-is-ip-location-and-how-accurate-hero.jpg"
          alt="Minimalist globe outline with continents in soft slate and teal, suggesting global IP geolocation coverage"
          className="w-full h-auto rounded-xl"
          loading="eager"
        />
      </figure>
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

      <figure className="my-10">
        <svg viewBox="0 0 480 290" className="w-full max-w-2xl mx-auto" role="img" aria-label="Bar chart of IP geolocation accuracy at country, region, city, and street levels">
          <text x="240" y="22" textAnchor="middle" className="fill-fg" fontSize="13" fontWeight="700">How often IP geolocation is right</text>
          <line x1="70" y1="60" x2="70" y2="240" className="stroke-line" strokeWidth="1" />
          <line x1="70" y1="240" x2="440" y2="240" className="stroke-line" strokeWidth="1" />
          <line x1="65" y1="60" x2="75" y2="60" className="stroke-line" strokeWidth="1" />
          <text x="60" y="64" textAnchor="end" className="fill-fg-subtle" fontSize="10">100%</text>
          <line x1="65" y1="150" x2="75" y2="150" className="stroke-line" strokeWidth="1" />
          <text x="60" y="154" textAnchor="end" className="fill-fg-subtle" fontSize="10">50%</text>
          <line x1="65" y1="240" x2="75" y2="240" className="stroke-line" strokeWidth="1" />
          <text x="60" y="244" textAnchor="end" className="fill-fg-subtle" fontSize="10">0%</text>
          <rect x="100" y="64" width="70" height="176" rx="4" className="fill-accent" opacity="0.9" />
          <text x="135" y="56" textAnchor="middle" className="fill-fg" fontSize="12" fontWeight="700">97%</text>
          <text x="135" y="262" textAnchor="middle" className="fill-fg-muted" fontSize="11" fontWeight="500">Country</text>
          <rect x="190" y="91" width="70" height="149" rx="4" className="fill-accent" opacity="0.72" />
          <text x="225" y="83" textAnchor="middle" className="fill-fg" fontSize="12" fontWeight="700">85%</text>
          <text x="225" y="262" textAnchor="middle" className="fill-fg-muted" fontSize="11" fontWeight="500">Region</text>
          <rect x="280" y="132" width="70" height="108" rx="4" className="fill-accent" opacity="0.55" />
          <text x="315" y="124" textAnchor="middle" className="fill-fg" fontSize="12" fontWeight="700">60%</text>
          <text x="315" y="262" textAnchor="middle" className="fill-fg-muted" fontSize="11" fontWeight="500">City</text>
          <rect x="370" y="231" width="70" height="9" rx="2" className="fill-accent" opacity="0.4" />
          <text x="405" y="225" textAnchor="middle" className="fill-fg" fontSize="12" fontWeight="700">~5%</text>
          <text x="405" y="262" textAnchor="middle" className="fill-fg-muted" fontSize="11" fontWeight="500">Street</text>
          <text x="240" y="282" textAnchor="middle" className="fill-fg-subtle" fontSize="10" fontStyle="italic">Approximate hit-rates from common geolocation databases</text>
        </svg>
        <figcaption className="mt-3 text-xs text-fg-subtle text-center max-w-md mx-auto leading-relaxed">
          The country is almost always right; the street level is almost never. Most &ldquo;wrong city&rdquo; complaints fall into the middle.
        </figcaption>
      </figure>

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
        The easiest way to feel the difference is to open the{' '}
        <Link href="/ip-location" className="text-accent hover:underline">IP Location tool</Link>{' '}
        — it shows the city your IP resolves to without asking for a GPS
        permission — and then compare against the{' '}
        <Link href="/my-location" className="text-accent hover:underline">My Location tool</Link>,
        which uses GPS. You will often see the two readings kilometres
        apart, and that gap is the IP error in a single screenshot.
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

      <h2 className="font-display text-2xl font-bold mt-12">How to check your own IP location right now</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Treat the next two readings as a sample of what every website you
        visit sees by default. Open the{' '}
        <Link href="/ip-location" className="text-accent hover:underline font-semibold">IP Location tool</Link>{' '}
        first — it queries an IP database with your visible address and
        reports the city, country, ISP, and whether you appear to be
        behind a VPN or proxy. Note how confident the page is and what it
        gets wrong about you.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Then open the{' '}
        <Link href="/my-location" className="text-accent hover:underline font-semibold">My Location tool</Link>{' '}
        and allow the GPS prompt. The accuracy radius typically drops
        from kilometres to single metres in front of your eyes. That A/B
        is the fastest way to internalise the difference between the two
        systems. For an even deeper side-by-side of where each one wins
        and loses, our{' '}
        <Link href="/gps-vs-ip-accuracy" className="text-accent hover:underline">GPS vs IP accuracy guide</Link>{' '}
        breaks it down by use case.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">How to change or hide your IP location</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Because IP geolocation is read straight off your visible IP
        address, anything that changes the IP also changes the location.
        The four practical options, ranked by how reliably they shift you
        to a chosen place:
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li>
          <strong>Reputable paid VPN.</strong> Pick an exit server in the
          city you want websites to see, connect, and the visible IP
          becomes one from that range. Free VPNs work but are heavily
          blocked and often log your traffic.
        </li>
        <li>
          <strong>Tor Browser.</strong> Routes traffic through three
          relays before exiting; your apparent IP is the last relay,
          which can be anywhere. The strongest privacy posture, but slow,
          and a growing list of sites refuse Tor exit IPs.
        </li>
        <li>
          <strong>Switching to mobile data.</strong> Cellular puts you
          behind Carrier-Grade NAT, often anchored to a city far from
          yours. A simple way to move your apparent location by tens of
          kilometres without any extra software, though you can&rsquo;t
          choose the destination.
        </li>
        <li>
          <strong>A friend&rsquo;s hotspot in another city.</strong>
          Tethering through someone else&rsquo;s mobile carrier or home
          broadband gives you their IP. Good for testing what a website
          looks like in another region; useless for hiding from a
          determined adversary, since the new IP is just a different
          identifiable account.
        </li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Important caveat: none of these hide your <em>real</em> location
        from a website that uses{' '}
        <Link href="/blog/browser-geolocation-api-explained" className="text-accent hover:underline">browser geolocation</Link>{' '}
        with your permission. The geolocation API reads your GPS or
        Wi-Fi position from the operating system, not your IP, so a VPN
        does nothing to it. If you want to be invisible at the location
        level, decline the GPS prompt as well.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">When IP geolocation is the right tool &mdash; and when it isn&rsquo;t</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Pick the right tool for the question. IP geolocation excels at
        the jobs where a city-level guess is enough and the work has to
        scale to millions of requests with zero permission prompts:
      </p>
      <ul className="mt-3 space-y-1.5 text-fg-muted list-disc list-inside">
        <li>Country-level licensing and regional pricing</li>
        <li>Default-language detection on first page load</li>
        <li>Fraud signals (an IP from one country, a card billed in another)</li>
        <li>Server-log analysis and traffic reporting</li>
        <li>Coarse local-ad targeting (&ldquo;plumber near you&rdquo;)</li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Where IP geolocation is the wrong tool — and where I see people
        repeatedly mis-deploy it:
      </p>
      <ul className="mt-3 space-y-1.5 text-fg-muted list-disc list-inside">
        <li>Driving directions or any nearby-search that needs street precision</li>
        <li>Emergency dispatch (covered in our{' '}
          <Link href="/blog/gps-coordinates-emergencies-aml-guide" className="text-accent hover:underline">emergency GPS coordinates guide</Link>)
        </li>
        <li>Compliance with strict regional rules (eg. age-gating in a single state)</li>
        <li>Anything where being wrong by 50 km would actually hurt the user</li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        For those jobs, GPS or another sensor-based reading is the
        only safe choice. Our{' '}
        <Link href="/ip-location-lookup" className="text-accent hover:underline">IP location lookup guide</Link>{' '}
        goes further into the API and database choices if you&rsquo;re
        implementing IP geolocation in software yourself.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Frequently asked questions</h2>
      <div className="glass mt-4 rounded-2xl divide-y divide-line-subtle not-prose">
        {faqs.map((f) => (
          <details key={f.q} className="group p-5">
            <summary className="flex items-center justify-between cursor-pointer list-none font-semibold">
              {f.q}
              <span className="text-accent group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
            </summary>
            <p className="mt-3 text-fg-muted text-sm leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </article>
    </>
  );
}
