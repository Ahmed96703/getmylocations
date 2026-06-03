import Link from 'next/link';

export default function WhyMapsShowWrongStreet() {
  return (
    <article className="prose-invert">
      <p className="text-lg text-fg-muted leading-relaxed">
        A few months ago a courier rang the gate next to mine, stood there
        for ten minutes, called me, sent me a screenshot of his maps app
        with the pin clearly on the wrong building, and then handed me a
        package addressed to a flat I&rsquo;ve lived in for three years.
        The pin had drifted by exactly one house. I&rsquo;ve had this happen
        often enough that I went and worked out why.
      </p>

      <p className="mt-4 text-fg-muted leading-relaxed">
        The short answer is that maps don&rsquo;t actually know where every
        address is. They store enough information to make a good guess and
        usually they&rsquo;re right. When they&rsquo;re wrong, the reason is
        almost always one of five fairly mundane things, none of them
        catastrophic, all of them fixable if you know what to look for.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The address itself is being interpolated</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        When you type a street address into a map, the app does not look up
        an exact coordinate for that specific house number. It looks up the
        start and end of the street, sees the house-number range that
        belongs to it (say 1&ndash;199 on the north side, 2&ndash;200 on the
        south), and works out where number 47 should sit by sliding along
        the line. The technique is called <em>address interpolation</em>
        and it predates GPS by about a century &mdash; surveyors were doing
        it on paper maps in the 1800s.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        It works fine on a tidy suburban street where houses are evenly
        spaced. It falls apart the moment something irregular happens. A
        builder skipped a plot. A single big building took the space of
        four. The block was renumbered in the 1980s and the records still
        reflect the old layout. The result is the familiar off-by-two-houses
        problem I started this article with.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The building outline has the wrong address attached</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Modern maps know about buildings, not just streets. Each building
        has a polygon &mdash; an outline drawn on the map &mdash; and one
        or more addresses attached to it. When somebody, somewhere,
        attached the wrong address to a polygon, the pin sits on the wrong
        building until someone notices.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        This is particularly common where two buildings sit close together
        and an editor mixed them up. OpenStreetMap and Google fix these when
        users report them. Most of the time, the wrong pin will quietly
        correct itself within a few months once enough people have hit the
        same problem. If it&rsquo;s your house and you want to push the fix,
        both services have a &ldquo;report a problem&rdquo; button under the
        map. Mine took three weeks to land after I filed it.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The entrance is on a different side of the building</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        A corner building has two addresses, one per street, and the map
        only picks one. If the entrance is around the back, the driving
        directions will lead you to the correct building but the wrong
        door, which is exactly as useless as leading you to a different
        building entirely. I&rsquo;ve watched delivery drivers stare at a
        wall for several minutes trying to work out where the bell is.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The workaround that actually works: in the delivery app, type the
        entrance into the notes field as a sentence. &ldquo;Entrance is on
        the side facing the green park, blue door, ring twice.&rdquo; That
        sentence does more for the courier than the address ever will.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Your phone&rsquo;s GPS is drifting, not the map</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Sometimes the address is fine and the map is fine and the building
        outline is correctly tagged. Your phone is the thing that&rsquo;s
        wrong. GPS works poorly in tall, narrow streets because the signal
        bounces off the buildings on either side before reaching you, and
        the receiver can&rsquo;t always tell the difference between a
        direct signal and a reflected one that took a longer path. The
        effect is called <em>multipath</em>, and it can throw your reading
        off by 20 or 30 meters. Walk down a street in the financial
        district of any big city and the blue dot will jump back and forth
        across the road like it&rsquo;s having a small breakdown.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Indoors it gets worse. GPS can barely see the satellites through a
        roof, so the OS falls back to Wi-Fi positioning. If the
        building&rsquo;s Wi-Fi access points are not in Google or
        Apple&rsquo;s databases &mdash; new build, deep basement, rural
        area &mdash; your position can be off by several hundred meters.
        Open the map outside on the pavement, not inside the lobby, when
        you&rsquo;re trying to confirm a location.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The street was added six months ago</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        New housing developments are a perennial source of wrong pins. The
        street exists in real life, has signs at both ends, and is lined
        with houses that have numbers on the gates &mdash; but the map
        won&rsquo;t catch up for six to twelve months. The map will route
        you to the nearest road it does know about and then leave you
        stranded.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The most reliable workaround for new addresses is to skip the
        address entirely and share the destination as raw coordinates. The
        courier&rsquo;s map app will navigate to a latitude and longitude
        even when it has never heard of the street the coordinates fall
        on. There is no edge case where coordinates fail and the address
        works; the reverse happens constantly.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What to do when it actually matters</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        For ordinary cases none of this is a crisis. The pin is close
        enough, you find the right door, the package arrives. For cases
        where it matters &mdash; emergency response, important deliveries,
        picking up a stranger at night &mdash; here are the things that
        consistently work:
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li>Send a coordinate instead of an address. Open your maps app, long-press the spot, share the coordinate that comes back.</li>
        <li>Add a landmark to the instructions. &ldquo;The brown gate next to the white car&rdquo; works better than a house number when the house number is two off.</li>
        <li>For deliveries, write the entrance description into the notes field as a full sentence.</li>
        <li>If you keep getting visitors at the wrong door, report the address position to the map provider once. The fix takes a few weeks but it sticks for good.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">Test your own address right now</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The quickest way to see how badly your address is mapped is to use
        the{' '}
        <Link href="/address-finder" className="text-accent hover:underline font-semibold">Address Finder</Link>.
        Type in your full address and see where the resulting pin lands. If
        it&rsquo;s on the wrong building, you now know why the courier
        keeps getting confused, and you have the coordinate of where the
        pin actually <em>is</em> so you can give people a sentence to
        explain the offset.
      </p>
    </article>
  );
}
