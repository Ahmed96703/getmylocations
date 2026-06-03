import Link from 'next/link';

export default function GpsCoordinatesEmergencies() {
  return (
    <article className="prose-invert">
      <p className="text-lg text-slate-300/90 leading-relaxed">
        In 2014, a Lithuanian teenager named Karol Otulakowski phoned the
        emergency services from a forest. He couldn&rsquo;t describe where
        he was. He died before the call handler could find him. That call
        is one of the cases the European Emergency Number Association
        cites every time they push for Advanced Mobile Location &mdash;
        the technology that now automatically sends a caller&rsquo;s GPS
        coordinates to the dispatcher the instant they dial 112 or 911,
        with no app to install and no permission to grant.
      </p>

      <p className="mt-4 text-slate-300/90 leading-relaxed">
        AML covers most of the world&rsquo;s urban emergencies now, but
        it has gaps. Landlines don&rsquo;t use it. VoIP apps don&rsquo;t
        use it. Older networks haven&rsquo;t upgraded. The single skill
        worth practising once, when you don&rsquo;t need it, is reading
        your own coordinates off your phone and saying them out loud to a
        dispatcher. The rest of this article is what I worked out about
        how that whole pipeline functions, and where the brittle bits are.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What happens at the dispatch centre</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Every modern dispatch centre (PSAP, public safety answering point)
        runs a computer-aided dispatch system with a built-in map. When a
        coordinate is entered &mdash; either manually by the dispatcher or
        automatically from AML &mdash; the map zooms straight to the spot,
        overlays the nearest streets, and routes the closest available
        unit. The whole pipeline, from coordinate received to ambulance
        dispatched, can take under a minute in well-equipped centres.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The console is also doing reverse geocoding in the background:
        turning the coordinate back into a human-readable address
        (&ldquo;14th and Main, opposite the pharmacy&rdquo;) so the
        responding crew can call out the destination over the radio. This
        is why supplying a coordinate is more useful than supplying an
        address &mdash; the coordinate is the canonical reference, the
        address text is derived from it.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What your phone does automatically</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Since the late 2010s, both iOS (under the name Hybridized
        Emergency Location, HELO) and Android have shipped
        <strong> Advanced Mobile Location</strong>. The instant you dial an
        emergency number, the phone:
      </p>
      <ol className="mt-3 space-y-2 text-slate-300/90 list-decimal list-inside">
        <li>Turns on GPS, Wi-Fi, and cellular positioning at maximum accuracy &mdash; even if you had location services off.</li>
        <li>Computes the best available fix within a few seconds.</li>
        <li>Transmits the coordinates and an accuracy estimate to the dispatcher over a secure side-channel.</li>
        <li>Drops the elevated positioning the moment you hang up.</li>
      </ol>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        It works without the caller doing anything. It works whether or
        not the user has granted location permission to any app &mdash;
        emergency calls bypass the normal permission model. It works in
        airplane mode if the cellular for the emergency call itself comes
        back up.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Coverage is uneven. AML is mandatory in most EU member states, the
        UK, Australia, and New Zealand, and is rolled out in many US
        states under the Next Generation 911 programme. Pakistan&rsquo;s 15
        service and India&rsquo;s 112 are adopting it incrementally. The
        official EENA list tracks who has switched on the receiving
        infrastructure.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">When AML isn&rsquo;t there to save you</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        AML covers the common case beautifully. The cases where it fails
        are exactly the ones where having a manual backup matters most:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><strong>Landline calls.</strong> AML is a smartphone feature. A landline call relies on the registered service address, which may be the building manager&rsquo;s office and not your flat.</li>
        <li><strong>VoIP calls.</strong> WhatsApp calls to emergency numbers, Skype calls, and most carrier-VoIP setups don&rsquo;t carry AML payloads.</li>
        <li><strong>Countries that haven&rsquo;t deployed it.</strong> Big parts of central Asia, Africa, and the Americas don&rsquo;t yet receive AML even from compliant phones.</li>
        <li><strong>You&rsquo;re calling about someone else.</strong> AML reports the calling phone&rsquo;s position, not the incident&rsquo;s. If you&rsquo;re calling from a kilometre away because you can&rsquo;t reach the person, the dispatcher needs the incident coordinate from you verbally.</li>
        <li><strong>Maritime, aviation, or wilderness.</strong> Coast guard and mountain rescue dispatchers usually want coordinates spoken aloud or transmitted by satellite messenger, regardless of phone-side automation.</li>
        <li><strong>The dispatcher is overwhelmed.</strong> In a mass incident, even where AML works, the dispatcher may need to confirm the coordinate verbally to make sure the system displayed the right one.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">Reading your coordinates &mdash; per device</h2>

      <h3 className="font-display text-lg font-semibold mt-6 text-slate-100">iPhone</h3>
      <ol className="mt-2 space-y-2 text-slate-300/90 list-decimal list-inside">
        <li>Open the Compass app (pre-installed). Coordinates sit at the bottom of the screen.</li>
        <li>Or open Apple Maps, tap the blue location dot, swipe up on the info panel, and the coordinates are listed under &ldquo;My Location&rdquo;.</li>
        <li>Long-press to copy.</li>
      </ol>

      <h3 className="font-display text-lg font-semibold mt-6 text-slate-100">Android</h3>
      <ol className="mt-2 space-y-2 text-slate-300/90 list-decimal list-inside">
        <li>Open Google Maps.</li>
        <li>Long-press anywhere on the map at your location &mdash; a red pin appears.</li>
        <li>The coordinates appear in the search bar at the top. Tap to copy.</li>
      </ol>

      <h3 className="font-display text-lg font-semibold mt-6 text-slate-100">Any browser</h3>
      <p className="mt-2 text-slate-300/90 leading-relaxed">
        Open <Link href="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link>.
        Click Allow on the location prompt. The coordinates appear in the
        dashboard with a one-click copy button.
      </p>

      <h3 className="font-display text-lg font-semibold mt-6 text-slate-100">Garmin or a dedicated GPS unit</h3>
      <p className="mt-2 text-slate-300/90 leading-relaxed">
        Most outdoor handhelds have a &ldquo;Where am I?&rdquo; menu that
        shows current coordinates, plus an emergency mode that strips the
        screen down to coordinates and a panic button.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Saying the numbers out loud</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Two formats are common. Either works with most dispatchers, but
        tell them which one you&rsquo;re reading from:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><strong>Decimal degrees:</strong> &ldquo;forty-eight point eight five eight four, two point two nine four five.&rdquo;</li>
        <li><strong>Degrees, minutes, seconds:</strong> &ldquo;forty-eight degrees, fifty-one minutes, thirty seconds North; two degrees, seventeen minutes, forty seconds East.&rdquo;</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Speak slowly. Read each digit individually (&ldquo;eight five eight
        four&rdquo;, not &ldquo;eight thousand five hundred
        eighty-four&rdquo;). Dispatchers are trained to write digits, and a
        single mishearing can drop rescuers 100 meters off. When they read
        the number back, listen for the read-back to match exactly and
        confirm verbally.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What3Words, Plus Codes, and why I still prefer raw numbers</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Several services tag 3-meter squares of the world with memorable
        codes. <strong>What3Words</strong> assigns three random words to
        each square (&ldquo;filled.count.soap&rdquo;); <strong>Plus
        Codes</strong> use a short alphanumeric format. Some emergency
        services accept either &mdash; the UK&rsquo;s 999 service
        supports both What3Words and AML, for instance.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        In an emergency I would still prefer raw coordinates. Decimal
        degrees are universally understood; they don&rsquo;t require the
        dispatcher to have a particular company&rsquo;s lookup tool open;
        they don&rsquo;t depend on the call being in English; they work
        on every dispatch system in the world. The branded formats are
        useful as a backup or for places where the address-system genuinely
        doesn&rsquo;t exist (rural Mongolia, refugee camps), but for the
        twenty-second window where the dispatcher is asking where you are,
        raw numbers are the safer bet.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Things to do before you ever need this</h2>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li>Make sure Location Services / GPS is enabled at the OS level. AML can&rsquo;t fire if the chip is off.</li>
        <li>Set up your phone&rsquo;s emergency contacts and Medical ID. They&rsquo;re visible from the lock screen and save dispatchers a step.</li>
        <li>Memorise the emergency number for where you actually are. It&rsquo;s not always 911. EU: 112. UK: 999. Pakistan: 15. India: 112. Australia: 000.</li>
        <li>For wilderness work, carry a satellite messenger (Garmin inReach, ZOLEO, the newer iPhones&rsquo; Emergency SOS via Satellite). They work where cellular doesn&rsquo;t.</li>
        <li>If you travel internationally, install the regional 112 / 999 app of the country you&rsquo;re visiting. Many countries have one.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">Reporting an incident that isn&rsquo;t happening to you</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        If you witness an emergency that&rsquo;s a few meters away &mdash;
        a road accident, a person collapsing on a trail &mdash; AML sends
        <em> your</em> location, not the incident&rsquo;s. Verbally confirm
        the incident location separately, ideally a coordinate you&rsquo;ve
        read off your own phone after walking close enough to the scene
        that the GPS reading is reliable.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        On highways, naming the nearest kilometre-marker post is often
        faster than coordinates. Inside large parks or campuses, the
        opposite is true &mdash; a coordinate beats &ldquo;by the main
        gate&rdquo; every time.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Practise once, when nothing is wrong</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The single most useful exercise is to read your coordinates off
        your phone right now, in a low-stakes moment, just to know what
        the process feels like. Open
        {' '}<Link href="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link>,
        see the numbers, get a feel for what &ldquo;24.860422,
        67.001137&rdquo; looks and sounds like. The next time you need to
        say it under stress, it&rsquo;ll take you ten seconds instead of
        two minutes &mdash; and you&rsquo;ll know the screen flow already.
      </p>
    </article>
  );
}
