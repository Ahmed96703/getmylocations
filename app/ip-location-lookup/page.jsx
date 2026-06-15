import Link from 'next/link';
import Tool from '../ip-location/Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';

export const metadata = {
  title: 'IP Location Lookup — Find Any IP\'s City, ISP, and Geolocation (Free)',
  description:
    'Free IP location lookup — find any IP\'s city, country, ISP, and approximate geolocation in two seconds. Plus a complete guide to how IP geolocation works and why the city is often wrong.',
  keywords: [
    'ip location',
    'ip location lookup',
    'my geolocation',
    'geolocation finder',
    'geolocation tracker',
    'isp lookup',
    'find my ip',
  ],
  alternates: { canonical: '/ip-location-lookup' },
  openGraph: {
    title: 'IP Location Lookup — Find Any IP\'s City, ISP, and Geolocation',
    description:
      'Free IP location lookup — city, country, ISP, and approximate geolocation in two seconds. Plus a complete guide.',
    url: 'https://getmylocations.com/ip-location-lookup',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IP Location Lookup — City, ISP, and Geolocation',
    description: 'Look up any IP free. Plus a complete guide to how IP geolocation works.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'IP Location Lookup',
  description:
    'Free browser-based tool that looks up any IP address and returns the database-guessed city, country, ISP, and approximate geolocation.',
  url: 'https://getmylocations.com/ip-location-lookup',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'GetMyLocations' },
  author: { '@type': 'Person', name: 'Ahmed Anwar' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getmylocations.com/' },
    { '@type': 'ListItem', position: 2, name: 'IP Location Lookup', item: 'https://getmylocations.com/ip-location-lookup' },
  ],
};

const faqs = [
  {
    q: 'How do I look up my own IP location?',
    a: 'Tap the "Lookup my IP" button on the tool above. Within a second or two the page returns your public IP (IPv4 or IPv6), the database-guessed city and country, the ISP that owns the IP block, and whether you appear to be on a residential, mobile, hosting, or VPN connection. No permission prompt — IP geolocation reads only what your browser already sent on the network connection.',
  },
  {
    q: 'How do I look up someone else\'s IP location?',
    a: 'Paste the IP address into the input field on the tool above and the lookup runs against that IP instead of yours. The same fields come back: city, country, ISP, connection type. Important caveat: an IP reveals at most a city and an ISP — never a street address, never a name. Anything more requires legal process served on the ISP.',
  },
  {
    q: 'How accurate is IP geolocation?',
    a: 'Country level: 95–99% accurate. Region or state: 80–90%. City level: only 50–75%, and often off by tens of kilometres. Street level: essentially zero — the best you can squeeze out of a public database is a 5–50 km radius. Mobile traffic is the worst case because cellular Carrier-Grade NAT routes thousands of subscribers through a single regional gateway.',
  },
  {
    q: 'Why is the city it shows wrong?',
    a: 'Five common causes: (1) a VPN is rewriting your IP to its exit-server location, (2) cellular CGNAT is routing you through a far-away gateway, (3) a corporate or school network exits via a distant office, (4) the database is stale and has not caught up with an ISP block reassignment, or (5) you are connecting through a CDN that reports its own location. Disconnect any VPN, switch from cellular to Wi-Fi, and re-run the lookup.',
  },
  {
    q: 'What is the difference between IP geolocation and GPS?',
    a: 'IP geolocation reads your visible IP and looks it up in a database — accuracy 5–50 km, no permission prompt, defeated by VPN. GPS reads satellite signals directly through your device — accuracy 3–5 m outdoors, requires browser permission, unaffected by VPN. They are complementary, not interchangeable. For "what country is this user in?" IP is fine; for "where exactly is this user standing?" GPS is the only option.',
  },
  {
    q: 'Can someone find my home address from my IP?',
    a: 'No — not without a court order. A public IP lookup reveals your country, usually your city, your ISP, and whether you are on a VPN or proxy. It does not reveal your name or street. Tying an IP to a specific human address requires a subpoena served on the ISP that owns the IP block. Films routinely overstate this; news stories about someone being "tracked through their IP" almost always have a court order in the middle.',
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

export default function IpLocationLookup() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

    <main role="main" className="max-w-3xl mx-auto px-5 py-12 prose-invert">
      <nav aria-label="Breadcrumb" className="text-xs text-fg-subtle mb-4 not-prose">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
          <li aria-hidden="true">›</li>
          <li className="text-fg-muted">IP Location Lookup</li>
        </ol>
      </nav>

      <article>
        <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">Complete Guide</p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight mt-2 leading-[1.1]">
          IP location lookup &mdash; what your public IP reveals, and what it doesn&apos;t
        </h1>
        <p className="mt-4 text-lg text-fg-muted leading-relaxed">
          Every device on the public internet has an IP address. That address quietly leaks a
          surprising amount about you &mdash; your approximate city, your internet provider, the
          kind of connection you&apos;re on &mdash; but also <em>less</em> than most people assume.
          This guide explains exactly what an IP lookup can and can&apos;t tell, how to find your
          own public IP, how IP-based geolocation actually works under the hood, and what to do
          when the city it reports is wrong.
        </p>

        <div className="not-prose my-8">
          <Tool />
        </div>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">What is a public IP address?</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          A public IP address is the number your internet provider hands out to your home router,
          office network, or mobile hotspot so the rest of the internet can route packets back to
          you. It looks like <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">203.0.113.42</code>{' '}
          for the older IPv4 system or like
          {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">2001:db8::1</code>{' '}
          for the newer IPv6 system. Most home connections still get IPv4, often shared with
          dozens of other customers via Carrier-Grade NAT; many mobile networks have moved to
          IPv6.
        </p>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Crucially, your <strong>private</strong> IP (something like
          {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">192.168.1.5</code>) is
          completely separate. That&apos;s the address your router gives your laptop or phone on
          your local Wi-Fi. The outside world never sees it &mdash; only your public IP is
          visible to websites.
        </p>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">How to find your public IP &mdash; three ways</h2>

        <h3 className="font-display text-lg font-semibold mt-6 text-fg">1. Use a browser tool</h3>
        <p className="mt-2 text-fg-muted leading-relaxed">
          Easiest by far. Tap the button on the tool above and the IP, ISP, and database-guessed city appear in the dashboard panel. The dedicated{' '}
          <Link href="/ip-location" className="text-accent hover:underline">IP Location tool</Link>{' '}
          does the same thing in a tighter standalone widget. You don&apos;t need to grant any permission &mdash;
          the page just reads the IP visible to the server when your browser connected.
        </p>

        <h3 className="font-display text-lg font-semibold mt-6 text-fg">2. Ask your router</h3>
        <p className="mt-2 text-fg-muted leading-relaxed">
          Open your router&apos;s admin page (usually <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">192.168.1.1</code>{' '}
          or <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">192.168.0.1</code>) in
          a browser. The WAN or Internet section shows the IP your ISP has assigned. This is the
          ground-truth source &mdash; if it disagrees with a website&apos;s reading, you&apos;re probably
          behind a VPN or proxy.
        </p>

        <h3 className="font-display text-lg font-semibold mt-6 text-fg">3. Command line</h3>
        <p className="mt-2 text-fg-muted leading-relaxed">
          On macOS or Linux, run <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">curl ifconfig.me</code> or
          {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">curl ipinfo.io/ip</code>. On
          Windows, use PowerShell:
          {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">(Invoke-WebRequest ifconfig.me).Content</code>. The
          answer is your current public IP, fetched directly.
        </p>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">How IP geolocation actually works</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          When a website turns your IP into &ldquo;Lahore, Pakistan&rdquo; or &ldquo;Mumbai, India&rdquo;, it isn&apos;t
          reading anything from your computer. It&apos;s looking up the IP in a database. The
          database itself is built by companies like MaxMind, IPinfo, IP2Location, and
          BigDataCloud from several signals:
        </p>
        <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
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
            <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">karachi-pool-3.isp.pk</code>{' '}
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

        <p className="mt-4 text-fg-muted leading-relaxed">
          The lookup itself is cheap to run, but the answer is inherently fuzzy.
          Country-level accuracy is usually better than 99%; city-level accuracy
          is often only 50&ndash;80%, and street-level accuracy is essentially
          impossible from IP alone. For why this matters, see our
          {' '}<Link href="/blog/what-is-ip-location-and-how-accurate" className="text-accent hover:underline">deep dive on IP location accuracy</Link>.
        </p>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">What your IP tells someone (and what it doesn&apos;t)</h2>

        <h3 className="font-display text-lg font-semibold mt-6 text-fg">What it usually reveals</h3>
        <ul className="mt-2 space-y-2 text-fg-muted list-disc list-inside">
          <li>Your country (almost always correct).</li>
          <li>Your region or state (often correct).</li>
          <li>The internet service provider (ISP) that owns your IP block.</li>
          <li>Whether you&apos;re on residential broadband, mobile data, a hosting provider, or a known VPN exit node.</li>
          <li>An approximate city, accurate to ~25 km on a good day.</li>
        </ul>

        <h3 className="font-display text-lg font-semibold mt-6 text-fg">What it does NOT reveal</h3>
        <ul className="mt-2 space-y-2 text-fg-muted list-disc list-inside">
          <li>Your street address &mdash; despite what films suggest.</li>
          <li>Your name &mdash; the ISP knows it, but a public IP lookup doesn&apos;t.</li>
          <li>The brand of device you&apos;re using.</li>
          <li>Your exact GPS coordinates &mdash; those would have to come from a browser geolocation grant, not the IP.</li>
        </ul>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">Track your IP &mdash; why it changes</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          If you check your public IP today and again next week, it may have changed entirely.
          Reasons:
        </p>
        <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
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
        <p className="mt-3 text-fg-muted leading-relaxed">
          If you need a stable IP &mdash; for remote access, whitelisting, or running a small
          server &mdash; most ISPs offer a static IP as a paid add-on. Otherwise, dynamic DNS
          services like DuckDNS or No-IP can point a hostname at whatever your current IP is.
        </p>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">IPv4 lookup vs IPv6</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          IPv4 addresses (32 bits, 4.3 billion possible values) ran out years ago. New deployments
          increasingly use IPv6 (128 bits, basically infinite). Both can be looked up the same
          way and both leak similar information, but a few practical differences are worth
          knowing:
        </p>
        <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
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

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">Internet provider (ISP) lookup</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          The ISP that owns your IP is in the same database as the location. Looking it up tells
          you whether you&apos;re on a residential connection (Comcast, BT, Jazz), a mobile
          carrier (T-Mobile, Reliance Jio), a corporate network, a hosting provider (AWS, Azure,
          Hetzner), or a known VPN. Marketing platforms, fraud-detection systems, and ad networks
          use this to score traffic quality &mdash; a hit from a data-center IP is treated very
          differently from a hit from a residential subscriber.
        </p>
        <p className="mt-3 text-fg-muted leading-relaxed">
          You can sanity-check the answer yourself by running{' '}
          <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">whois</code>{' '}
          against your IP in a terminal. The
          {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">OrgName</code>{' '}
          or <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">netname</code>{' '}
          field is the ISP that registered the IP block.
        </p>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">When the city is wrong</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Seeing the wrong city in an IP lookup is extremely common and almost never your fault.
          The usual causes:
        </p>
        <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
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
        <p className="mt-3 text-fg-muted leading-relaxed">
          The fix, if you need accurate location, is to grant GPS-level browser geolocation
          instead of relying on IP. Step-by-step browser fixes are in our
          {' '}<Link href="/fix-location-not-working" className="text-accent hover:underline">troubleshooting guide</Link>.
        </p>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">Privacy considerations</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Every website you visit can see your IP &mdash; that&apos;s required for the connection
          to work. What they do with it varies. GetMyLocations doesn&apos;t log your IP for
          analytics, but our hosting provider (Cloudflare) keeps short-lived request logs for
          abuse prevention, and our third-party services (reverse geocoding, advertising) may
          process your IP for their own purposes. The full breakdown is in our
          {' '}<Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>.
        </p>
        <p className="mt-3 text-fg-muted leading-relaxed">
          If you want to limit what an IP lookup reveals, the standard tools are a reputable
          consumer VPN (Mullvad, IVPN, ProtonVPN), the Tor browser for stronger anonymity, or
          simply visiting from a different network. None of these are bulletproof &mdash; they
          all leak in different ways &mdash; but they substantially raise the cost of tracking.
        </p>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
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

        <h2 className="font-display text-2xl font-bold mt-10">Related tools and guides</h2>
        <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
          <li><Link href="/ip-location" className="text-accent hover:underline">IP Location &mdash; the standalone tool</Link></li>
          <li><Link href="/blog/what-is-ip-location-and-how-accurate" className="text-accent hover:underline">What is IP location and how accurate is it?</Link></li>
          <li><Link href="/gps-vs-ip-accuracy" className="text-accent hover:underline">GPS vs IP accuracy &mdash; side-by-side comparison</Link></li>
          <li><Link href="/blog/what-your-ip-reveals" className="text-accent hover:underline">What your IP address really tells apps about you</Link></li>
          <li><Link href="/my-location" className="text-accent hover:underline">My Location &mdash; GPS-based reading (more precise than IP)</Link></li>
          <li><Link href="/gps-coordinates-finder" className="text-accent hover:underline">GPS coordinates finder &mdash; complete guide</Link></li>
          <li><Link href="/fix-location-not-working" className="text-accent hover:underline">Fix location not working &mdash; troubleshooting</Link></li>
          <li><Link href="/blog/how-gps-works" className="text-accent hover:underline">How GPS works &mdash; satellite math</Link></li>
        </ul>

        <AuthorBio />
      </article>
    </main>
    </>
  );
}
