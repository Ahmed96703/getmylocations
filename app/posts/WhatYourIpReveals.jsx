import Link from 'next/link';

export default function WhatYourIpReveals() {
  return (
    <article className="prose-invert">
      <p className="text-lg text-slate-300/90 leading-relaxed">
        Most of what people believe their IP address &ldquo;reveals&rdquo;
        about them is wrong. It does not contain your name. It does not
        contain your street. It does not let a stranger on a forum find
        your house. It is closer to a return address on a parcel than to a
        passport. The interesting question is what an IP <em>does</em>
        actually give away, because the answer is more mundane than the
        fears and more interesting than the dismissals.
      </p>

      {/* TODO: Ahmed to add a screenshot of the actual ipapi.co JSON response for his home IP &mdash; full field dump (country, region, city, ISP, ASN, timezone). Black out the last octet of the IP. /public/screenshots/ipapi-real-response.png. Caption with the takeaway: "This is the entire payload &mdash; there is no street address in here." */}

      <h2 className="font-display text-2xl font-bold mt-12">An IP is a return label, nothing more</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Your IP is a number your internet provider hands you so that traffic
        from the rest of the network can find its way back. On a home
        connection it looks like
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400">203.0.113.42</code>.
        On a mobile or newer setup it might be IPv6, something like
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400">2001:db8::1</code>.
        Either way, the moment your browser opens a connection, the server
        on the other end logs the IP because the reply has to go somewhere.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        A lot of people picture the IP as a fingerprint &mdash; some
        unique signature that ties them personally to every site they
        visit. It isn&rsquo;t. Every device on your home router shares the
        same public IP. On mobile networks, thousands of subscribers can
        share a single IP at once because the carrier is using a scheme
        called CGNAT to stretch the limited IPv4 pool. Two people in
        different cities on the same carrier can show the same address.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What actually comes back from a lookup</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Paste any IP into a public geolocation lookup and the response is
        smaller than people expect:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li>The country &mdash; almost always right.</li>
        <li>The region or state &mdash; usually right.</li>
        <li>A city &mdash; right roughly half the time on home broadband, far worse on mobile.</li>
        <li>The name of the ISP that owns the block (Comcast, BT, Jazz, Reliance Jio, etc).</li>
        <li>Whether the address belongs to a known VPN exit or a data centre.</li>
        <li>A latitude and longitude that is typically the centroid of the ISP&rsquo;s service area, not your house.</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Notice the absence of the dramatic stuff: your name, your street,
        your phone number, your device model, your email. None of that
        lives in the public databases. The films and TV shows that
        dramatise an IP lookup as a magic identifier are wrong about this
        in roughly the same way they&rsquo;re wrong about &ldquo;enhance,
        zoom in&rdquo; pixel magic.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Why the city is wrong so often</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Mobile carriers route traffic from huge regions through a small
        number of gateways before it touches the public internet. If
        you&rsquo;re on the east coast of India on Reliance Jio, your IP
        might land in Mumbai no matter which city you&rsquo;re actually
        sitting in. The lookup says Mumbai because that&rsquo;s where the
        carrier&rsquo;s public-facing IP lives, not where you are.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        I see the same effect on my own home connection in Karachi. On
        Wi-Fi the IP usually places me a few suburbs over &mdash; close
        enough to be the right city but never the right neighbourhood. The
        moment I switch to mobile data, the city jumps somewhere else
        entirely. Nothing about my physical location changed; the route
        the packets took did.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The same logic applies behind corporate VPNs. The IP the world
        sees is the company&rsquo;s exit point, which might be in a
        different country to your laptop. This is also why VPN providers
        can credibly sell you a &ldquo;virtual location&rdquo;: as far as
        any IP-based service can tell, you really are wherever the exit
        node is sitting.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What a long-running session can infer</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        A single IP lookup is a snapshot. A site that watches the same IP
        across many sessions can infer a lot more without ever knowing
        your name. Times you&rsquo;re online, the rough places you visit
        from (home Wi-Fi, office Wi-Fi, your favourite caf&eacute;), and
        the device fingerprint they can derive from your browser headers
        all combine into a profile.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        This is the part regulators care about, and it&rsquo;s the part
        most articles about IP privacy get wrong by focusing on the IP
        itself. The IP is rarely the limiting factor; the long-running
        cookie that ties multiple sessions to the same person is. If you
        only worry about one thing, worry about that one.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">When somebody actually needs your real identity</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Linking an IP address to a specific human requires the cooperation
        of the ISP, and the ISP will not hand that over without a legal
        request. Police can ask. Civil plaintiffs can subpoena.
        Advertisers cannot &mdash; they have to make do with whatever the
        public databases say. If you ever read a news story about
        somebody being identified from their IP, there is almost always a
        court order somewhere in the middle of the story.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Practical takeaways</h2>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li>Treat your IP as casually public. It is.</li>
        <li>Don&rsquo;t panic when a website &ldquo;sees&rdquo; your city. The guess is normal and often wrong.</li>
        <li>If you actively want to obscure your IP-based location, a reputable VPN handles it. It will not touch the GPS coordinate apps you&rsquo;ve granted location permission to.</li>
        <li>Long-running cookies and account logins tie sessions together in a way the IP never does. Worry about those more.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">Try it on your own connection</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The cheapest experiment is to open the{' '}
        <Link href="/ip-location" className="text-electric-400 hover:underline font-semibold">IP Location tool</Link>{' '}
        and click <em>Lookup my IP</em> twice in a row &mdash; once on
        Wi-Fi and once after switching to mobile data. The city often
        changes. Nothing about you changed; the carrier&rsquo;s routing
        decision did. That&rsquo;s the whole story of IP geolocation in a
        single tab.
      </p>
    </article>
  );
}
