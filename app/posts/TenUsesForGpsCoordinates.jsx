import Link from 'next/link';

export default function TenUsesForGpsCoordinates() {
  return (
    <article className="prose-invert">
      <p className="text-lg text-slate-300/90 leading-relaxed">
        I have a note on my phone called &ldquo;coords&rdquo; with about
        thirty latitude&ndash;longitude pairs in it. The dentist&rsquo;s
        side entrance because the front door is impossible to find at
        night. A particular tree in a friend&rsquo;s farm where her
        family scattered her father&rsquo;s ashes. The spot on a hiking
        trail where I once turned around because the weather closed in.
        None of these have addresses. All of them are usable in any map
        app in the world, on any device, forever, with no account or
        platform lock-in. That&rsquo;s the underrated power of two
        numbers.
      </p>

      <p className="mt-4 text-slate-300/90 leading-relaxed">
        Most people only think about GPS coordinates when their
        navigation app refuses to find an address. Here are ten of the
        things I&rsquo;ve actually used coordinates for &mdash; or
        watched friends use &mdash; that an address can&rsquo;t handle.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">1. Marking a place that has no address</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        A favourite fishing hole. A tent site in the middle of a forest.
        The exact spot where a trail crosses a stream. The car park for
        a beach without a town. None of these have postal addresses, but
        every one has a coordinate. Save the lat/lon in your phone&rsquo;s
        notes and you can return to the exact spot years later, in any
        navigation app you happen to be using by then.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">2. Sharing your location in an emergency</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        If you&rsquo;re lost and 911/112 asks where you are, a
        six-decimal coordinate is the most precise answer you can give
        &mdash; accurate to within a meter or two. It works even when
        the dispatcher&rsquo;s street-address lookup fails. Modern
        smartphones do this automatically via Advanced Mobile Location,
        but knowing how to read and say your own coordinates is the
        backup you want when AML doesn&rsquo;t fire. Full walkthrough:
        {' '}<Link href="/blog/gps-coordinates-emergencies-aml-guide" className="text-electric-400 hover:underline">GPS coordinates in emergencies</Link>.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">3. Geotagging photos that lost their EXIF</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Instagram, WhatsApp, and most chat apps strip the EXIF metadata
        (including embedded GPS) from photos before posting. If you want
        to remember where a shot was taken, save the coordinates in a
        notes app or a photo-editor field at the moment you take it.
        I&rsquo;ve gone back through years of holiday photos trying to
        reconstruct where each one was and lost the battle more than
        once.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">4. Measuring exact distance between two places</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Need the straight-line distance between two coordinates &mdash;
        say, your home and a planned holiday rental? Plug them into the
        {' '}<Link href="/distance-calculator" className="text-electric-400 hover:underline">distance calculator</Link>{' '}
        and the Haversine formula returns the great-circle distance.
        This is how airlines calculate flight distances and how
        real-estate apps tell you a property is &ldquo;4.2 km from the
        beach.&rdquo;
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">5. Building a geofence</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        A geofence is an invisible perimeter defined by a centre
        coordinate and a radius. Phone automations (iOS Shortcuts,
        Android Tasker, Home Assistant) trigger actions when you cross
        one: turn on the lights when you arrive home, silence
        notifications when you walk into the office, remind you to pick
        up something when you&rsquo;re near the supermarket. The whole
        setup needs one coordinate to start.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">6. Proving (or disproving) a delivery</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Some delivery apps share the courier&rsquo;s drop-off coordinates
        as part of the confirmation. If a driver claims
        &ldquo;delivered&rdquo; but no package arrives, comparing their
        reported drop-off coordinate to your home coordinate can show
        the package was left at the wrong address &mdash; useful
        evidence in a refund claim, useful information for the courier
        company when they investigate.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">7. Geocaching</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Over three million caches are hidden around the world, each
        pinpointed by a precise GPS coordinate. Players use the
        coordinate alone &mdash; no other directions, no street address
        &mdash; to find a small container, log their visit, sometimes
        swap a trinket. The game is the reason the consumer GPS market
        exists at all; it&rsquo;s where Garmin and Magellan first found
        non-professional customers in the early 2000s.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">8. Sanity-checking your VPN</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Connect to a VPN that claims to be in Tokyo, then open
        {' '}<Link href="/ip-location" className="text-electric-400 hover:underline">IP Location</Link>.
        If it places you near Tokyo, the IP-based signal is leaking
        properly. If your real city shows up instead, the VPN has a
        DNS or WebRTC leak somewhere and you should know about it
        before you trust it for anything sensitive. Two clicks beats
        guessing.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">9. Plotting weather stations and microclimates</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Personal weather stations from Davis, Tempest, and Ambient ask
        for exact GPS coordinates during setup so the public weather
        network knows where each reading came from. Hyperlocal
        forecasting is built on dense, coordinate-tagged sensor
        networks. The Tempest network, for instance, pulls in around a
        hundred thousand backyard stations now &mdash; each one a
        coordinate plus a temperature, pressure, and wind reading
        feeding back into the forecast model.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">10. Precision agriculture</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Modern tractors use centimetre-accurate GPS to drive themselves
        along perfectly parallel rows, drop fertiliser on the exact
        square meter where soil samples flagged a deficiency, and stop
        seeding the moment they cross a known &ldquo;bad&rdquo; patch.
        The savings on inputs (water, seed, fertiliser) regularly hit
        double-digit percentages &mdash; a direct consequence of GPS
        coordinates getting cheap and precise enough to be a routine
        farm input.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Bonus: a privacy-friendly way to share a property listing</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Selling a property privately? Share the listing photo with the
        coordinate pasted underneath. The recipient can click straight
        into Maps or Street View to evaluate the neighbourhood &mdash;
        no street address publicly listed, no leak of full identifying
        information, but enough for a serious buyer to do their initial
        homework. The same trick works for short-term rentals where you
        want guests to find the door without putting the exact unit
        number on a public booking page.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">How to grab a coordinate in two seconds</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Whenever you need a coordinate for any of the above &mdash;
        open
        {' '}<Link href="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link>,
        approve the location prompt, copy the six-decimal lat/lon from
        the dashboard. Paste it into your notes app and it&rsquo;ll
        still work in 2036.
      </p>
    </article>
  );
}
