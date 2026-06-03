import Link from 'next/link';
import ProofPanel from '../components/ProofPanel.jsx';

export default function HowGpsWorks() {
  return (
    <article className="prose-invert">
      <p className="text-lg text-fg-muted leading-relaxed">
        The signal a GPS satellite sends to your phone, by the time it
        arrives, is about as faint as a 25-watt light bulb seen from
        20,000 km away. That fact is the source of most of GPS&rsquo;s
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
        you&rsquo;ll get a 3-meter fix, when you&rsquo;ll get nothing,
        and why.
      </p>

      <ProofPanel
        title="Satellite skyplot proof"
        device="Use GPSTest or a similar Android app in open sky so readers can see locked satellites across multiple constellations."
        caption="A skyplot is the strongest first-party proof that the GPS article is based on real hardware instead of generic summaries."
        fileHint="/public/screenshots/gps-skyplot-real.png"
      />

      <h2 className="font-display text-2xl font-bold mt-12">The system, end to end</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        GPS (Global Positioning System) is owned and operated by the US
        Space Force, free to use for anyone on Earth. It has three parts:
      </p>
      <ol className="mt-3 list-decimal list-inside space-y-1.5 text-fg-muted">
        <li><strong>The space segment</strong> &mdash; about 31 active satellites in MEO orbit at ~20,200 km altitude.</li>
        <li><strong>The control segment</strong> &mdash; ground stations that track the satellites and correct their orbits and clocks.</li>
        <li><strong>The user segment</strong> &mdash; anything with a GPS receiver: your phone, a car dashboard, a hiking watch, a tractor, a cruise missile.</li>
      </ol>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Each satellite continuously broadcasts: &ldquo;I am satellite 17.
        My current orbital position is X, Y, Z. The exact time right now
        is T.&rdquo; The receiver&rsquo;s job is to pick up enough of
        these broadcasts to triangulate where it must be sitting.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Catching the signal</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        GPS satellites transmit on two civilian frequencies (L1 at
        1575.42 MHz and L5 at 1176.45 MHz; L2 carries an encrypted
        military signal). At ground level the broadcast is the
        25-watt-bulb-at-20,000-km I opened the article with &mdash;
        which is why GPS struggles indoors, under heavy tree cover, or
        in deep urban canyons.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        For a usable position the chip typically needs to hear at least
        <strong> four satellites</strong>. Modern multi-constellation
        phones routinely see 20+ simultaneously, which is the main reason
        time-to-first-fix has dropped from &ldquo;a minute&rdquo; on old
        units to &ldquo;a second or two&rdquo; on current ones.
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
        In ideal conditions, civilian GPS is accurate to about
        <strong> 3&ndash;5 meters</strong>. Several real-world factors
        chip away at that:
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
        GPS, where the almanac comes in over cellular data instead of
        being decoded slowly from the satellite signal) on top of
        <strong> GNSS</strong> (Global Navigation Satellite Systems
        generally):
      </p>
      <ul className="mt-3 space-y-1.5 text-fg-muted list-disc list-inside">
        <li><strong>GPS (USA)</strong> &mdash; the original.</li>
        <li><strong>GLONASS (Russia)</strong> &mdash; same idea, different constellation.</li>
        <li><strong>Galileo (EU)</strong> &mdash; newer, generally the most accurate of the four.</li>
        <li><strong>BeiDou (China)</strong> &mdash; newest, growing fast.</li>
        <li><strong>QZSS (Japan)</strong> &mdash; augments coverage over Asia.</li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Your phone listens to all of them simultaneously. On top of GNSS,
        it also pulls Wi-Fi triangulation (matching visible Wi-Fi
        networks against Google&rsquo;s database), cell-tower
        triangulation, and IMU sensors (accelerometers and gyroscopes)
        to keep position updated even when satellites are temporarily
        blocked. The combination is what makes a modern phone&rsquo;s
        blue dot feel almost magical compared to a 2010-era
        standalone GPS unit.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Why your phone locks faster than your old car GPS did</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Old standalone receivers had to download the full satellite
        almanac (the schedule of where each satellite is and when) over
        the radio link itself &mdash; 30 seconds to several minutes
        depending on conditions. Modern phones download the same almanac
        over cellular data in milliseconds. That&rsquo;s the
        &ldquo;Assisted&rdquo; in A-GPS, and it&rsquo;s the main reason
        first-fix on a smartphone feels instant.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Can GPS be jammed or spoofed?</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Yes to both, and the cases are worth knowing.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        <strong>Jamming</strong> just drowns the satellite signal in
        noise on the same frequency. Because the original signal is so
        weak, a small jammer can take out a meaningful radius. A
        canonical case: in 2009, a contractor near Newark Airport was
        plugging a $30 in-cab jammer into his cigarette lighter every
        morning to defeat his employer&rsquo;s fleet tracking. He
        repeatedly knocked out the airport&rsquo;s Smart Landing System
        until the FAA narrowed the source down through weeks of
        triangulation. Civilian jammers are illegal in most countries
        but still cheap and common.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        <strong>Spoofing</strong> is more sophisticated: an attacker
        broadcasts a stronger, fake version of the constellation to
        convince a receiver it&rsquo;s somewhere it isn&rsquo;t. Ships
        in the Black Sea have repeatedly reported false GPS positions
        placing them on dry land at airports &mdash; textbook spoofing
        patterns from a state actor. Modern receivers push back by
        cross-checking signals across multiple GNSS constellations (a
        Galileo signal disagreeing with a GPS signal is a strong red
        flag) and by watching for unrealistic position jumps.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">RTK and centimetre-level accuracy</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Consumer GPS hovers around 3&ndash;5 meters. For surveying,
        agriculture, and drone work, that&rsquo;s nowhere near enough.
        The technique called <strong>Real-Time Kinematic (RTK)</strong>
        closes the gap to centimetres using a fixed base station at a
        precisely surveyed point.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The base station knows its own coordinates exactly. It receives
        the same GPS signals you do, calculates what its position would
        <em> appear</em> to be based on those signals alone, and
        broadcasts the difference &mdash; a correction &mdash; to nearby
        rover receivers in real time. Your moving receiver applies the
        correction and ends up with sub-centimetre accuracy.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Network RTK extends this by combining corrections from dozens of
        base stations across a region. A self-driving tractor in Nebraska
        can pull corrections from a state-wide network and stay within
        2 cm of a target row for kilometres. The high-end iPhones with
        the U1 chip don&rsquo;t do full RTK, but they include enough
        hardware that compatible apps can pull network corrections for
        sub-meter accuracy in supported regions.
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
        <li><strong>Aviation.</strong> The LPV approach procedure uses GPS for low-visibility landings at small airports that can&rsquo;t afford ground-based ILS infrastructure.</li>
        <li><strong>Search and rescue.</strong> Advanced Mobile Location sends the caller&rsquo;s GPS to dispatchers automatically when they dial 112 or 911.</li>
        <li><strong>Tectonic monitoring.</strong> Permanent GPS receivers on faults detect the millimetre-per-year motion that precedes major earthquakes.</li>
        <li><strong>Asset tracking.</strong> Shipping containers, rental scooters, stolen-bike trackers &mdash; all cheap GPS modules with cellular backhaul.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">Battery cost, and how the OS hides it</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        A GPS receiver running continuously can chew through ~25% of a
        phone battery in a day. Modern OSes hide this by being smart:
        instead of running GPS at full duty cycle, they fall back to
        Wi-Fi and cell positioning while you&rsquo;re stationary, sample
        GPS in short bursts as you walk, and only run it continuously
        during active turn-by-turn navigation.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The &ldquo;high accuracy&rdquo; / &ldquo;battery saving&rdquo; /
        &ldquo;device only&rdquo; toggles in location settings really
        mean: <em>use everything including cloud-assisted Wi-Fi
        positioning</em>, <em>use only Wi-Fi and cell</em>, or <em>use
        only the GPS chip</em>. The first is most accurate and uses
        moderate battery; the second is fastest but coarsest; the third
        is most private but slowest to lock on.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Indoors is a different problem entirely</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        GPS doesn&rsquo;t work indoors &mdash; the satellite signal is
        too weak to penetrate roofs. Indoor positioning systems fill the
        gap with completely different technology: Bluetooth beacons,
        Wi-Fi round-trip-time measurements, ultra-wideband chips, visual
        SLAM using the phone&rsquo;s camera. Airports and shopping malls
        deploy these for indoor mapping; accuracy is usually in the
        1&ndash;3 meter range. None of it involves GPS at all, even
        though most apps blur the distinction in their UI.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What&rsquo;s coming next</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        GPS itself is mid-modernisation. The new GPS III satellites
        broadcast a civilian signal called L1C designed to interoperate
        with Galileo and BeiDou, letting multi-constellation receivers
        combine signals more efficiently. Galileo is rolling out a free
        High Accuracy Service that pushes corrections globally and
        brings ~20 cm accuracy to consumer devices without needing a
        local RTK base station.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        In parallel, a new generation of LEO PNT (Low-Earth-Orbit
        Position, Navigation, Timing) constellations are launching
        &mdash; Iridium&rsquo;s STL service and several SpaceX-adjacent
        projects. LEO signals are much stronger than MEO-orbit GPS
        signals and much harder to jam, which is why aviation and
        defence are paying close attention.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">See what your chip is reporting right now</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Open
        {' '}<Link href="/" className="text-accent hover:underline font-semibold">GetMyLocations</Link>{' '}
        on a phone outdoors. The accuracy radius on the dashboard is
        your real-time DOP estimate translated into meters. If
        you&rsquo;ve never paid attention to it before, walk from a
        sheltered spot to open sky and watch the number drop. That&rsquo;s
        the constellation locking on satellites in real time, in front
        of you.
      </p>
    </article>
  );
}
