import Link from 'next/link';
import Tool from './Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';
import AdSense from '../components/AdSense.jsx';

export const metadata = {
  title: 'IP Location Lookup — Find Any IP\'s City and ISP (Free)',
  description:
    'Look up any IPv4 or IPv6 address to see its city, country, ISP and ASN on a map, plus how far your IP location is from where you actually are. Try it.',
  keywords: [
    'ip location',
    'ip location lookup',
    'my geolocation',
    'geolocation finder',
    'geolocation tracker',
    'isp lookup',
    'find my ip',
  ],
  alternates: { canonical: '/ip-location' },
  openGraph: {
    title: 'IP Location Lookup — Find Any IP\'s City and ISP',
    description:
      'Free IP location lookup — city, country, ISP, and approximate geolocation in two seconds. Plus a complete guide.',
    url: 'https://getmylocations.com/ip-location',
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
    'Free browser-based tool that looks up any IPv4 or IPv6 address or domain name and returns the database-estimated city, country, ISP, ASN, and timezone on a map. Recognises private and reserved addresses locally, and can measure how far your IP location is from your GPS position.',
  url: 'https://getmylocations.com/ip-location',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'GetMyLocations' },
  author: { '@type': 'Person', name: 'Ahmed Anwar', url: 'https://getmylocations.com/about' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getmylocations.com/' },
    { '@type': 'ListItem', position: 2, name: 'IP Location Lookup', item: 'https://getmylocations.com/ip-location' },
  ],
};

const faqs = [
  {
    q: 'How do I look up my own IP location?',
    a: 'Tap the "Lookup my IP" button on the tool above. Within a second or two the page returns your public IP (IPv4 or IPv6), the database-guessed city and country, the ISP and ASN that own the IP block, the timezone, and a map pin. No permission prompt is needed — IP geolocation uses only the address your connection already exposes. If you then tap "Measure the gap", the tool compares that estimate with your device location and shows the distance between them.',
  },
  {
    q: 'How do I look up someone else\'s IP location?',
    a: 'Paste the IP address into the input field on the tool above and the lookup runs against that IP instead of yours. The same fields come back: city, region, country, ISP, ASN, and timezone. You can also type a domain name such as example.com; the tool resolves it to an IP address first. Important caveat: an IP reveals at most a city and an ISP — never a street address, never a name. Anything more requires legal process served on the ISP.',
  },
  {
    q: 'How accurate is IP geolocation?',
    a: 'MaxMind, one of the largest IP database providers, estimates 99.8% accuracy at the country level; for US addresses, about 80% at the state level and 66% for the city (within 50 km). Accuracy varies widely by country and is usually worst on mobile data, where carrier-grade NAT routes many subscribers through one regional gateway. Street-level accuracy from an IP alone is essentially impossible.',
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
    a: 'No — not without a court order. A public IP lookup reveals your country, usually your city, and your ISP; some commercial databases also flag known VPN and proxy addresses. It does not reveal your name or street. Tying an IP to a specific human address requires a subpoena served on the ISP that owns the IP block. Films routinely overstate this; news stories about someone being "tracked through their IP" almost always have a court order in the middle.',
  },
  {
    q: 'Why does the tool say my IP is a private address?',
    a: 'Addresses such as 192.168.x.x, 10.x.x.x, and 172.16.x.x to 172.31.x.x are private (RFC 1918): your router hands them out inside your home or office, and the same numbers are reused on millions of other networks. 100.64.x.x to 100.127.x.x is carrier-grade NAT space (RFC 6598) used inside ISP networks. None of these are visible on the public internet, so they have no location. The tool recognises them in your browser without sending them anywhere. Leave the box empty to look up your public IP.',
  },
  {
    q: 'Which database does this IP lookup use?',
    a: 'Public addresses are looked up with ipapi.co. Domain names are first resolved to an IP address using Cloudflare\'s public DNS (1.1.1.1). Different providers often disagree at city level because each builds its database from different signals, so another site may show a different city for the same IP.',
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

    <AdSense />

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
          network that owns your address &mdash; but also <em>less</em> than most people assume.
          This guide explains exactly what an IP lookup can and can&apos;t tell, how to find your
          own public IP, how IP-based geolocation actually works under the hood, and what to do
          when the city it reports is wrong.
        </p>

        <div className="not-prose my-8">
          <Tool />
        </div>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">What each IP address lookup result means</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          The lookup returns a dozen fields. Some come straight from public registration records and are nearly always right; others are database estimates. Here is how far to trust each one.
        </p>
        <div className="not-prose mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-tint/5 text-fg-muted">
                <th className="px-3 py-2 font-semibold">Field</th>
                <th className="px-3 py-2 font-semibold">What it is</th>
                <th className="px-3 py-2 font-semibold">How reliable</th>
              </tr>
            </thead>
            <tbody className="text-fg-muted">
              <tr className="border-t border-line-subtle"><td className="px-3 py-2 text-fg">IP address, version</td><td className="px-3 py-2">The public address, IPv4 or IPv6</td><td className="px-3 py-2">Exact</td></tr>
              <tr className="border-t border-line-subtle"><td className="px-3 py-2 text-fg">ISP / Org</td><td className="px-3 py-2">The organisation the address block is registered to</td><td className="px-3 py-2">High: comes from registry records</td></tr>
              <tr className="border-t border-line-subtle"><td className="px-3 py-2 text-fg">ASN</td><td className="px-3 py-2">Autonomous System Number, the ID of the network that routes the address on the internet</td><td className="px-3 py-2">High</td></tr>
              <tr className="border-t border-line-subtle"><td className="px-3 py-2 text-fg">Country</td><td className="px-3 py-2">Where the address is registered and used</td><td className="px-3 py-2">Very high, unless you are on a VPN</td></tr>
              <tr className="border-t border-line-subtle"><td className="px-3 py-2 text-fg">Region, city, postal code</td><td className="px-3 py-2">The database&rsquo;s best guess at where the network serves</td><td className="px-3 py-2">Moderate to low; often the ISP&rsquo;s hub, not you</td></tr>
              <tr className="border-t border-line-subtle"><td className="px-3 py-2 text-fg">Coordinates</td><td className="px-3 py-2">A point for that city or region, used for the map pin</td><td className="px-3 py-2">Low: never a street address</td></tr>
              <tr className="border-t border-line-subtle"><td className="px-3 py-2 text-fg">Timezone, UTC offset, currency</td><td className="px-3 py-2">Derived from the estimated location</td><td className="px-3 py-2">As reliable as the country or region</td></tr>
            </tbody>
          </table>
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
        <p className="mt-3 text-fg-muted leading-relaxed">
          These ranges are never public, and the tool recognises them without sending them anywhere:
        </p>
        <ul className="mt-3 space-y-1.5 text-fg-muted list-disc list-inside">
          <li><code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">10.0.0.0/8</code>, <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">172.16.0.0/12</code>, <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">192.168.0.0/16</code>: private networks (RFC 1918)</li>
          <li><code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">100.64.0.0/10</code>: carrier-grade NAT inside ISP and mobile networks (RFC 6598)</li>
          <li><code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">127.0.0.0/8</code> and <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">::1</code>: loopback, meaning &ldquo;this device&rdquo;</li>
          <li><code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">169.254.0.0/16</code> and <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">fe80::/10</code>: link-local, self-assigned when no router answers</li>
          <li><code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">fc00::/7</code>: IPv6 unique local addresses, the IPv6 equivalent of private ranges (RFC 4193)</li>
        </ul>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">How to find your public IP &mdash; three ways</h2>

        <h3 className="font-display text-lg font-semibold mt-6 text-fg">1. Use a browser tool</h3>
        <p className="mt-2 text-fg-muted leading-relaxed">
          Easiest by far. Tap <em>Lookup my IP</em> in the tool at the top of this page and your public IP, ISP, and estimated city appear below it. You don&apos;t need to grant any permission &mdash;
          the lookup service simply reports the address your browser connected from.
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
          BigDataCloud from several signals. The tool on this page uses ipapi.co&rsquo;s database:
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
          The lookup itself is cheap to run, but the answer is inherently fuzzy, as the next section shows. For why this matters, see our
          {' '}<Link href="/blog/what-is-ip-location-and-how-accurate" className="text-accent hover:underline">deep dive on IP location accuracy</Link>.
        </p>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">How accurate is IP geolocation?</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          MaxMind, one of the largest IP database providers, publishes its own estimates: <strong className="text-fg">99.8% accuracy at the country level</strong>, and for US addresses about <strong className="text-fg">80% at the state or region level</strong> and <strong className="text-fg">66% for the city</strong>, where &ldquo;correct&rdquo; means within 50 km. So even by a major provider&rsquo;s own measure, one US city guess in three is more than 50 km out.
        </p>
        <div className="not-prose mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
          <table className="w-full text-sm text-left">
            <thead><tr className="bg-tint/5 text-fg-muted"><th className="px-3 py-2 font-semibold">Level</th><th className="px-3 py-2 font-semibold">Typical accuracy</th></tr></thead>
            <tbody className="text-fg-muted">
              <tr className="border-t border-line-subtle"><td className="px-3 py-2 text-fg">Country</td><td className="px-3 py-2">99.8%</td></tr>
              <tr className="border-t border-line-subtle"><td className="px-3 py-2 text-fg">State or region (US)</td><td className="px-3 py-2">about 80%</td></tr>
              <tr className="border-t border-line-subtle"><td className="px-3 py-2 text-fg">City, within 50 km (US)</td><td className="px-3 py-2">about 66%</td></tr>
              <tr className="border-t border-line-subtle"><td className="px-3 py-2 text-fg">Street address</td><td className="px-3 py-2">not possible from an IP</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Source: MaxMind&rsquo;s published accuracy estimates, checked October 2026. MaxMind notes that accuracy varies widely by country, by connection type (mobile is usually worse than fixed broadband), by IPv4 versus IPv6, and by how each ISP manages its addresses; its online accuracy comparison breaks this down country by country. Other providers, including the one this tool uses, publish their own figures, and providers often disagree at city level for the same address.
        </p>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">How far off is your IP location?</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Averages only go so far; what matters is how wrong the guess is for your connection. After you look up your own IP, the tool offers a <em>Measure the gap</em> button. With your permission it reads your device&rsquo;s location, the same way our 
          <Link href="/my-location" className="text-accent hover:underline">My Location tool</Link> does, and shows how many kilometres separate it from the IP database&rsquo;s estimate. Your device location stays in the browser; only the distance is displayed.
        </p>
        <p className="mt-3 text-fg-muted leading-relaxed">
          A gap of a few kilometres means the database knows your ISP&rsquo;s local network well. Tens of kilometres usually means you are being placed at the ISP&rsquo;s regional hub. Hundreds of kilometres or a different country almost always means a VPN, a corporate network, or a mobile carrier routing you through a distant gateway. Try it on Wi-Fi and again on mobile data to see the difference. For the full comparison of the two methods, see 
          <Link href="/gps-vs-ip-accuracy" className="text-accent hover:underline">GPS vs IP accuracy</Link>.
        </p>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">What your IP tells someone (and what it doesn&apos;t)</h2>

        <h3 className="font-display text-lg font-semibold mt-6 text-fg">What it usually reveals</h3>
        <ul className="mt-2 space-y-2 text-fg-muted list-disc list-inside">
          <li>Your country (almost always correct).</li>
          <li>Your region or state (often correct).</li>
          <li>The internet service provider (ISP) that owns your IP block.</li>
          <li>For some commercial databases (not the free one used here), whether the address belongs to a hosting provider or a known VPN exit node.</li>
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
          field is the ISP that registered the IP block. The ASN in the results identifies the network that announces the address on the internet; large ISPs and cloud providers each have their own, so the same ASN across two lookups means the same network operator.
        </p>

        <hr className="my-10 border-line" />

        <h2 className="font-display text-2xl font-bold">Look up a domain&rsquo;s IP location</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          You can type a domain name such as <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">example.com</code> (or paste a full URL) instead of an IP. The tool resolves it to an IPv4 address using Cloudflare&rsquo;s public DNS, falling back to IPv6 if there is none, then looks that address up.
        </p>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Expect a surprise with big websites: most sit behind a content delivery network, so the location you see is the CDN&rsquo;s nearest edge server, often in or near your own country, not where the company or its servers actually are. The ISP field will usually name the CDN, such as Cloudflare or Akamai, which is the giveaway.
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
          If a database has your network in the wrong place and it causes you problems (the wrong country&rsquo;s content, for example), you can ask the providers to correct it. MaxMind takes corrections at{' '}
          <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">maxmind.com/en/geoip-location-correction</code> and IPinfo at <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">ipinfo.io/corrections</code>; others usually accept corrections through their contact pages. Corrections tend to take weeks to reach every site that uses the data.
        </p>
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
          abuse prevention. Using this tool sends the IP being looked up to ipapi.co, and a typed
          domain name to Cloudflare&rsquo;s DNS resolver. Private and reserved addresses are recognised
          in your browser and never sent. Advertising services may process your IP for their own purposes. The full breakdown is in our
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
          <li><Link href="/blog/what-is-ip-location-and-how-accurate" className="text-accent hover:underline">What is IP location and how accurate is it?</Link></li>
          <li><Link href="/gps-vs-ip-accuracy" className="text-accent hover:underline">GPS vs IP accuracy &mdash; side-by-side comparison</Link></li>
          <li><Link href="/blog/what-your-ip-reveals" className="text-accent hover:underline">What your IP address really tells apps about you</Link></li>
          <li><Link href="/my-location" className="text-accent hover:underline">My Location &mdash; GPS-based reading (more precise than IP)</Link></li>
          <li><Link href="/fix-location-not-working" className="text-accent hover:underline">Fix location not working &mdash; troubleshooting</Link></li>
          <li><Link href="/blog/how-gps-works" className="text-accent hover:underline">How GPS works &mdash; satellite math</Link></li>
        </ul>

        <AuthorBio />
      </article>
    </main>
    </>
  );
}
