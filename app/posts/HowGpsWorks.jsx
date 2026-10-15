import Link from 'next/link';
import BlogImage from '../components/BlogImage.jsx';

export default function HowGpsWorks() {
  return (
    <article className="prose-invert">
      <figure className="mb-8 -mt-2">
        <BlogImage
          src="/blog-images/how-gps-works-hero.jpg"
          alt="GPS satellites orbiting Earth with signal lines beaming down toward the planet"
          className="w-full h-auto rounded-xl"
          width={1600}
          height={770}
          loading="eager"
          fetchPriority="high"
        />
      </figure>
      <aside className="mb-6 rounded-xl border border-accent/40 bg-accent/5 p-4" aria-label="Quick answer">
        <p className="text-[11px] uppercase tracking-wider text-accent font-semibold">Quick answer</p>
        <p className="mt-1 text-fg leading-relaxed">
          About 31 GPS satellites orbit 20,200&nbsp;km up, each broadcasting its position and the exact time
          from an atomic clock. Your phone measures how long each signal took to arrive, turns those delays
          into distances, and finds the one point that fits four or more of them. That is trilateration;
          phones also use other satellite systems and Wi-Fi to get there faster.
        </p>
      </aside>
      <p className="text-lg text-fg-muted leading-relaxed">
        By the time a GPS satellite&rsquo;s signal reaches your phone it is extraordinarily faint &mdash;
        far weaker than the background radio noise around it. That fact is the source of most of GPS&rsquo;s
        properties &mdash; why it doesn&rsquo;t work indoors, why it
        takes a few seconds to lock on, why it&rsquo;s easy to jam, why
        the chip needs an antenna with a clear view of the sky. The
        receiver is doing a remarkable amount of work to extract a
        coordinate from a signal that weak, on hardware that costs less
        than a cup of coffee.
      </p>

      <p className="mt-4 text-fg-muted leading-relaxed">
        This article is the version of &ldquo;how GPS works&rdquo; I wish
        I&rsquo;d had when I started building location tooling: not too
        deep into the physics, but specific enough to predict when
        you&rsquo;ll get a fix good to a few metres, when you&rsquo;ll get nothing,
        and why.
      </p>

      <figure className="my-10 flex flex-col items-center">
        <svg viewBox="0 0 360 300" className="w-full max-w-md" role="img" aria-label="GPS trilateration: three satellite signal ranges intersecting at one point on the ground">
          <circle cx="120" cy="110" r="85" fill="none" className="stroke-accent" strokeWidth="1.5" opacity="0.55" />
          <circle cx="240" cy="110" r="85" fill="none" className="stroke-accent" strokeWidth="1.5" opacity="0.55" />
          <circle cx="180" cy="210" r="85" fill="none" className="stroke-accent" strokeWidth="1.5" opacity="0.55" />
          <g className="fill-accent">
            <rect x="113" y="35" width="14" height="8" rx="1" />
            <rect x="104" y="38" width="32" height="2" />
            <rect x="104" y="40" width="32" height="2" />
          </g>
          <text x="120" y="28" textAnchor="middle" className="fill-fg-muted" fontSize="10" fontWeight="600">Satellite 1</text>
          <g className="fill-accent">
            <rect x="233" y="35" width="14" height="8" rx="1" />
            <rect x="224" y="38" width="32" height="2" />
            <rect x="224" y="40" width="32" height="2" />
          </g>
          <text x="240" y="28" textAnchor="middle" className="fill-fg-muted" fontSize="10" fontWeight="600">Satellite 2</text>
          <g className="fill-accent">
            <rect x="173" y="278" width="14" height="8" rx="1" />
            <rect x="164" y="281" width="32" height="2" />
            <rect x="164" y="283" width="32" height="2" />
          </g>
          <text x="180" y="296" textAnchor="middle" className="fill-fg-muted" fontSize="10" fontWeight="600">Satellite 3</text>
          <circle cx="180" cy="145" r="6" className="fill-accent" />
          <circle cx="180" cy="145" r="13" fill="none" className="stroke-accent" strokeWidth="1.5" opacity="0.45" />
          <text x="192" y="148" className="fill-fg" fontSize="11" fontWeight="600">Your phone</text>
        </svg>
        <figcaption className="mt-3 text-xs text-fg-subtle text-center max-w-md leading-relaxed">
          Trilateration: each satellite tells your phone where it is and what time it is. The time difference reveals distance; three distances narrow your position to one point. A fourth satellite resolves clock error.
        </figcaption>
      </figure>

      <h2 className="font-display text-2xl font-bold mt-12">The system, end to end</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        GPS (Global Positioning System) is owned and operated by the US
        Space Force, free to use for anyone on Earth. It has three parts:
      </p>
      <ol className="mt-3 list-decimal list-inside space-y-1.5 text-fg-muted">
        <li><strong>The space segment</strong> &mdash; the US Space Force has flown{' '}<a href="https://www.gps.gov/space-segment" target="_blank" rel="noopener" className="text-accent hover:underline">31 operational satellites</a> for over a decade, in medium Earth orbit about 20,200&nbsp;km up.</li>
        <li><strong>The control segment</strong> &mdash; ground stations that track the satellites and correct their orbits and clocks.</li>
        <li><strong>The user segment</strong> &mdash; anything with a GPS receiver: your phone, a car dashboard, a hiking watch, a tractor, a cruise missile.</li>
      </ol>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Each satellite continuously broadcasts: &ldquo;I am satellite 17.
        My current orbital position is X, Y, Z. The exact time right now
        is T.&rdquo; The receiver&rsquo;s job is to pick up enough of
        these broadcasts to work out where it must be.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Catching the signal</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        GPS broadcasts on three frequency bands. The original civilian
        signal, L1&nbsp;C/A (1575.42&nbsp;MHz), is joined on newer satellites by
        three more civilian signals: <strong>L2C</strong> (1227.60&nbsp;MHz),
        <strong>L5</strong> (1176.45&nbsp;MHz) and <strong>L1C</strong>; the military
        uses separate encrypted codes. However many signals there are, they
        arrive far below the noise floor, which is why GPS struggles indoors,
        under heavy tree cover, or in deep urban canyons.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        For a usable position the chip typically needs to hear at least
        <strong> four satellites</strong>. Modern multi-constellation
        phones can track dozens of satellites from several systems at once,
        and together with network assistance (below) that is why a phone
        usually gets a fix in seconds where an old standalone unit could
        take a minute or more.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The clock trick that does most of the work</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The distance from your phone to a satellite comes from one
        measurement: the satellite tells you when the signal was sent;
        your phone records when it arrived; multiply the time difference
        by the speed of light (~300,000 km/s); that&rsquo;s your distance
        to that satellite.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The hard part is that the speed of light is so fast that a
        1-microsecond clock error puts you off by 300 meters. Every
        satellite carries an <strong>atomic clock</strong> accurate to
        nanoseconds for exactly this reason &mdash; and the math your
        phone runs has to account for the fact that its own quartz clock
        is wildly imprecise by comparison.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Einstein has to be accounted for too. Seen from the ground, the satellite
        clocks tick faster because gravity is weaker up there (general relativity)
        and slower because they move at about 14,000&nbsp;km/h (special relativity).
        The net effect is roughly <strong>38 microseconds a day fast</strong>, which
        left uncorrected would add kilometres of error per day. The clocks are
        deliberately set to run slightly slow before launch so that, in orbit, they
        keep ground time.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Trilateration, not triangulation</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        With distance from one satellite, you&rsquo;re somewhere on the
        surface of a giant sphere centred on it. With two, you&rsquo;re
        on the circle where two spheres intersect. With three, the
        circle shrinks to two possible points (one in space, one on
        Earth). With four, all uncertainty collapses to a single 3D
        position: your latitude, longitude, and altitude.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        This is <strong>trilateration</strong>, not triangulation
        &mdash; triangulation involves measuring angles, which GPS
        doesn&rsquo;t do. The fourth satellite has a bonus job: by
        demanding that all four distance measurements agree on one
        consistent answer, the math also derives your phone&rsquo;s
        exact time as a side product. This is why GPS is also the
        backbone time-sync source for cell towers, electrical grids, and
        financial markets &mdash; not for the position, for the
        nanosecond-accurate time.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What actually wrecks GPS accuracy</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Under open sky, GPS.gov says GPS-enabled smartphones are typically
        accurate to within{' '}<a href="https://www.gps.gov/gps-accuracy" target="_blank" rel="noopener" className="text-accent hover:underline">4.9&nbsp;m (16&nbsp;ft)</a>.
        Several real-world factors chip away at that:
      </p>
      <ul className="mt-3 space-y-1.5 text-fg-muted list-disc list-inside">
        <li><strong>Atmospheric delay.</strong> The ionosphere and troposphere slow the signal slightly. Receivers compensate with models, but it&rsquo;s never perfect.</li>
        <li><strong>Multipath.</strong> Signals bounce off buildings before reaching you, arriving later than the direct path. This is why GPS gets weird in dense downtowns &mdash; the blue dot jumping back and forth across a street is multipath in action.</li>
        <li><strong>Satellite geometry.</strong> If all visible satellites are clustered in one corner of the sky, the math is geometrically unstable. Serious receivers report this as the &ldquo;DOP&rdquo; (dilution of precision) number.</li>
        <li><strong>Obstructions.</strong> Concrete, foliage, tunnels &mdash; all kill the already-weak signal.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">Your phone isn&rsquo;t using just GPS</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Modern smartphones use a hybrid: <strong>A-GPS</strong> (assisted
        GPS, where the satellites&rsquo; orbit data comes in over the
        mobile network instead of being decoded slowly from the satellite
        signal) on top of <strong>GNSS</strong> (Global Navigation
        Satellite Systems generally):
      </p>
      <ul className="mt-3 space-y-1.5 text-fg-muted list-disc list-inside">
        <li><strong>GPS (USA)</strong> &mdash; the original.</li>
        <li><strong>GLONASS (Russia)</strong> &mdash; same idea, different constellation.</li>
        <li><strong>Galileo (EU)</strong> &mdash; civilian-run, with a free high-accuracy correction service.</li>
        <li><strong>BeiDou (China)</strong> &mdash; global since its third generation was completed in 2020.</li>
        <li><strong>QZSS (Japan)</strong> &mdash; augments coverage over Asia.</li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Your phone listens to all of them simultaneously. On top of GNSS,
        it also pulls Wi-Fi triangulation (matching visible Wi-Fi
        networks against Google&rsquo;s or Apple&rsquo;s database), cell-tower
        triangulation, and IMU sensors (accelerometers and gyroscopes)
        to keep position updated even when satellites are temporarily
        blocked. The combination is what makes a modern phone&rsquo;s
        blue dot feel almost magical compared to a 2010-era
        standalone GPS unit.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Why your phone locks faster than your old car GPS did</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Before a receiver can use a satellite it needs that satellite&rsquo;s
        <strong>ephemeris</strong>, its precise orbit, which the satellite
        rebroadcasts only every 30 seconds at a very slow data rate. A
        standalone receiver starting cold has to sit and decode it from the
        weak signal, which takes tens of seconds at best and much longer in
        poor conditions. A phone downloads the same orbit data over the
        mobile network in a moment. That&rsquo;s the &ldquo;Assisted&rdquo;
        in A-GPS, and it&rsquo;s the main reason a phone&rsquo;s first fix
        feels almost instant.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Can GPS be jammed or spoofed?</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Yes to both, and the cases are worth knowing.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        <strong>Jamming</strong> just drowns the satellite signal in
        noise on the same frequency. Because the original signal is so
        weak, a small jammer can take out a meaningful radius. A
        well-known case: a New Jersey driver used a cheap jammer in his
        company pickup to stop his employer tracking it, and it kept
        disrupting an experimental GPS landing system (GBAS) at Newark
        Liberty airport. The FCC traced the truck by direction-finding in
        August 2012 and{' '}<a href="https://insidegnss.com/fcc-fines-operator-of-gps-jammer-that-affected-newark-airport-gbas/" target="_blank" rel="noopener" className="text-accent hover:underline">proposed a $31,875 fine</a>.
        Jammers are illegal to use in most countries but still cheap and
        easy to buy.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        <strong>Spoofing</strong> is more sophisticated: an attacker
        broadcasts a stronger, fake version of the constellation to
        convince a receiver it&rsquo;s somewhere it isn&rsquo;t. In June
        2017, ships near Novorossiysk in the Black Sea reported GPS
        positions at an inland airport, a textbook spoofing pattern; a 2019
        report by the research group C4ADS linked many such incidents to
        Russian state activity. Modern receivers push back by
        cross-checking signals across multiple GNSS constellations (a
        Galileo signal disagreeing with a GPS signal is a strong red
        flag) and by watching for unrealistic position jumps.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">RTK and centimetre-level accuracy</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        A phone&rsquo;s few metres of accuracy is nowhere near enough for
        surveying, agriculture, and drone work.
        The technique called <strong>Real-Time Kinematic (RTK)</strong>{' '}
        closes the gap to centimetres using a fixed base station at a
        precisely surveyed point.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The base station knows its own coordinates exactly. It receives
        the same GPS signals you do, calculates what its position would
        <em> appear</em> to be based on those signals alone, and
        broadcasts the difference &mdash; a correction &mdash; to nearby
        rover receivers in real time. Your moving receiver applies the
        correction and ends up accurate to a centimetre or two.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Network RTK extends this by combining corrections from dozens of
        base stations across a region. A self-driving tractor in Nebraska
        can pull corrections from a state-wide network and stay within
        2 cm of a target row for kilometres. Phones are not RTK
        receivers, but they are getting closer: many recent models receive
        both L1 and L5 signals, which helps in cities, and Android has let
        apps read raw satellite measurements since Android 7, so
        specialist apps can apply their own corrections.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Where GPS quietly runs the world</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The obvious uses &mdash; navigation, fitness tracking, geocaching
        &mdash; are only the visible tip. GPS underpins infrastructure
        most people never think about:
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li><strong>Time synchronisation.</strong> Cell towers, electrical grids, and stock exchanges sync their clocks against GPS to nanosecond precision. A GPS outage doesn&rsquo;t just break maps &mdash; it can drop calls and halt trading.</li>
        <li><strong>Precision agriculture.</strong> A modern tractor drives itself in perfectly straight rows for kilometres, dropping fertilizer and seed based on per-square-meter soil data collected previously.</li>
        <li><strong>Aviation.</strong> LPV approaches use GPS with WAAS corrections for low-visibility landings at airports without ground-based ILS equipment.</li>
        <li><strong>Emergency calls.</strong> In countries that support Advanced Mobile Location, the phone sends its position to the dispatcher automatically when you dial (see{' '}<Link href="/blog/gps-coordinates-emergencies-aml-guide" className="text-accent hover:underline">GPS coordinates in an emergency</Link>).</li>
        <li><strong>Tectonic monitoring.</strong> Permanent GPS stations measure the millimetres-per-year motion of tectonic plates and the strain building on faults.</li>
        <li><strong>Asset tracking.</strong> Shipping containers, rental scooters, stolen-bike trackers &mdash; all cheap GPS modules with cellular backhaul.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">Battery cost, and how the OS hides it</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Running the GPS receiver continuously costs real battery. Modern
        operating systems keep that cost down:
        instead of running GPS at full duty cycle, they fall back to
        Wi-Fi and cell positioning while you&rsquo;re stationary, sample
        GPS in short bursts as you walk, and only run it continuously
        during active turn-by-turn navigation.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Older Android versions made you choose between &ldquo;high
        accuracy&rdquo;, &ldquo;battery saving&rdquo; and &ldquo;device
        only&rdquo; modes. Current Android replaced them with a single
        <em> Google Location Accuracy</em> switch, which adds Wi-Fi and
        mobile-network positioning to GPS; turning it off leaves the
        satellites alone, which is slower to lock on and weaker indoors.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Indoors is a different problem entirely</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        GPS doesn&rsquo;t work indoors &mdash; the satellite signal is
        too weak to penetrate roofs. Indoor positioning systems fill the
        gap with completely different technology: Bluetooth beacons,
        Wi-Fi round-trip-time measurements, ultra-wideband chips, visual
        SLAM using the phone&rsquo;s camera. Airports and shopping malls
        deploy these for indoor maps, and where they are installed they can
        place you to within a few metres. None of it involves GPS at all, even
        though most apps blur the distinction in their UI.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What&rsquo;s coming next</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        GPS itself is mid-modernisation. The new GPS III satellites
        broadcast a civilian signal called L1C designed to interoperate
        with Galileo and BeiDou, letting multi-constellation receivers
        combine signals more efficiently. Galileo is rolling out a free
        High Accuracy Service that broadcasts corrections worldwide, aiming
        for about 20&nbsp;cm without a local base station, for receivers
        built to use it (most phones are not yet).
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        In parallel, a new generation of LEO PNT (Low-Earth-Orbit
        Position, Navigation, Timing) services are arriving, such as STL,
        which uses the Iridium satellites, and several commercial
        start-ups. LEO signals are much stronger than MEO-orbit GPS
        signals and much harder to jam, which is why aviation and
        defence are paying close attention.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">See what your chip is reporting right now</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Open the{' '}
        <Link href="/my-location" className="text-accent hover:underline font-semibold">My Location</Link>{' '}
        tool on a phone outdoors. The accuracy radius on the dashboard is
        the device&rsquo;s own estimate: the circle it is 95% sure you are
        inside. If
        you&rsquo;ve never paid attention to it before, walk from a
        sheltered spot to open sky and watch the number drop. That&rsquo;s
        the constellation locking on satellites in real time, in front
        of you. To watch the fix update continuously as you walk, try the{' '}
        <Link href="/live-location" className="text-accent hover:underline">live location tracker</Link>.
        The coordinate the tool gives you is in decimal degrees — if you need DMS or UTM for a chart or a survey report, the{' '}
        <Link href="/coordinates-converter" className="text-accent hover:underline">Coordinates Converter</Link>{' '}
        handles the translation.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        If the dot lands in the wrong city rather than a few metres off, the
        device has fallen back to your IP address; see{' '}
        <Link href="/gps-vs-ip-accuracy" className="text-accent hover:underline">GPS vs IP accuracy</Link>. If it
        lands on the wrong street, the address database is often to blame; see{' '}
        <Link href="/blog/why-maps-show-wrong-street" className="text-accent hover:underline">why maps show the wrong street</Link>.
        And to measure distances on the Earth&rsquo;s real shape, see{' '}
        <Link href="/blog/haversine-vs-vincenty" className="text-accent hover:underline">haversine vs Vincenty</Link>.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        For the practical side — ten real-world uses for the coordinates your chip produces — see{' '}
        <Link href="/blog/10-uses-for-gps-coordinates" className="text-accent hover:underline">Ten uses for GPS coordinates</Link>.
        For a quick refresher on what latitude and longitude actually mean and how to read them, start with{' '}
        <Link href="/blog/latitude-vs-longitude-explained" className="text-accent hover:underline">Latitude vs longitude explained</Link>.
        And for step-by-step instructions to read your coordinates on any device, there&rsquo;s{' '}
        <Link href="/blog/how-to-find-your-gps-coordinates" className="text-accent hover:underline">How to find your GPS coordinates</Link>.
      </p>
    </article>
  );
}
