import { Link } from 'react-router-dom';

export default function HowGpsWorks() {
  return (
    <article className="prose-invert">
      <p className="text-lg text-slate-300/90 leading-relaxed">
        Every time your phone shows a blue dot on a map, it’s pulling off a quiet feat of engineering: receiving radio signals from satellites 20,000 km overhead, measuring how long they took to arrive down to the nanosecond, and solving four-dimensional geometry to figure out exactly where you’re standing. Here’s how GPS actually works — without the buzzwords, but without skipping the interesting parts either.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The system at 30,000 feet</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        GPS (Global Positioning System) is owned and operated by the U.S. Space Force, but it’s free for anyone in the world to use. It has three parts:
      </p>
      <ol className="mt-3 list-decimal list-inside space-y-1.5 text-slate-300/90">
        <li><strong>The space segment</strong> — about 31 active satellites orbiting Earth at ~20,200 km altitude.</li>
        <li><strong>The control segment</strong> — ground stations that monitor the satellites and adjust their orbits and clocks.</li>
        <li><strong>The user segment</strong> — anything with a GPS receiver: your phone, your car’s dashboard, a hiking watch, a tractor.</li>
      </ol>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Each satellite continuously broadcasts a radio signal saying, in essence: <em>“I am satellite 17. My current position is X, Y, Z. The exact time right now is T.”</em>
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Step 1: Catching the signal</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        GPS satellites transmit on two main frequencies (L1 at 1575.42 MHz and L2 at 1227.60 MHz). The signal is extremely weak by the time it reaches you — about as faint as a 25-watt light bulb seen from 20,000 km away. That’s why GPS struggles indoors or under heavy tree cover.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Your phone’s GPS chip listens for these broadcasts and decodes them. To get a usable position, it typically needs <strong>at least four satellites</strong> in view.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Step 2: Measuring time, very precisely</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The trick to figuring out distance is simple: the satellite says <em>when</em> the signal was sent, and your phone records <em>when</em> it arrived. Multiply that time difference by the speed of light (~300,000 km/s), and you have the distance to that satellite.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The hard part: the speed of light is so fast that even a 1-microsecond clock error puts you off by 300 meters. To fix this, every satellite carries an <strong>atomic clock</strong> accurate to nanoseconds — and the math your phone runs accounts for the fact that its own quartz clock is wildly imprecise compared to the satellites’.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Step 3: Trilateration — the geometric trick</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        With distance from one satellite, you know you’re somewhere on the surface of a giant sphere centered on that satellite. With distance from two, you’re on the circle where two spheres intersect. With three, the circle shrinks to two possible points (one in space, one on Earth). With four, all uncertainty collapses to a single 3D position — your latitude, longitude, and altitude.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        This is called <strong>trilateration</strong> (not triangulation — that involves measuring angles, not distances).
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The fourth satellite also solves the clock-error problem: by demanding that all four measurements agree on one consistent answer, the math derives your phone’s exact time as a bonus. This is why GPS is also used as a time-sync source for everything from cell towers to financial markets.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What affects GPS accuracy?</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        In ideal conditions, civilian GPS is accurate to about <strong>3-5 meters</strong>. Several real-world factors degrade this:
      </p>
      <ul className="mt-3 space-y-1.5 text-slate-300/90 list-disc list-inside">
        <li><strong>Atmospheric delay</strong> — the ionosphere and troposphere slow the signal slightly. Receivers compensate with models.</li>
        <li><strong>Multipath</strong> — signals bounce off buildings before reaching you. This is why GPS gets weird in dense city downtowns.</li>
        <li><strong>Satellite geometry</strong> — if all visible satellites are clustered in one corner of the sky, the math becomes less stable. The “DOP” (dilution of precision) number on serious GPS receivers measures this.</li>
        <li><strong>Obstructions</strong> — concrete walls, foliage, tunnels — kill weak signals.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">Your phone isn’t just using GPS</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Modern smartphones use a hybrid called <strong>A-GPS (Assisted GPS)</strong> plus <strong>GNSS (Global Navigation Satellite Systems)</strong>:
      </p>
      <ul className="mt-3 space-y-1.5 text-slate-300/90 list-disc list-inside">
        <li><strong>GPS (USA)</strong> — the original.</li>
        <li><strong>GLONASS (Russia)</strong> — same idea, different constellation.</li>
        <li><strong>Galileo (EU)</strong> — newer, generally more accurate.</li>
        <li><strong>BeiDou (China)</strong> — newest, growing fast.</li>
        <li><strong>QZSS (Japan)</strong> — augments coverage over Asia.</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Your phone can listen to all of them simultaneously — typically locking onto 20+ satellites at once. That’s why “GPS” fixes have gotten dramatically faster and more accurate in the last few years.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        On top of GNSS, phones also use <strong>Wi-Fi triangulation</strong> (matching visible Wi-Fi networks against Google’s database), <strong>cell-tower triangulation</strong>, and <strong>IMU sensors</strong> (accelerometers and gyroscopes) to keep your position updated even when satellites are blocked.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Why does my phone find a GPS lock faster than my old car GPS?</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Old standalone GPS receivers had to download the full satellite almanac from scratch over the radio link — taking 30 seconds to several minutes. Modern phones download the almanac via cellular data in milliseconds (that’s the “Assisted” part of A-GPS), making the first fix near-instant.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Can GPS be jammed or spoofed?</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Yes. Because GPS signals are so weak, even a small jammer can overwhelm them locally. <strong>Spoofing</strong> — broadcasting fake but realistic signals — is harder but documented in military contexts and increasingly seen near conflict zones. Phones now flag suspicious GPS as “unreliable” when the math doesn’t add up.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Civilian jammers are illegal in most countries but still common. A driver who wants to evade fleet-tracking might plug a $30 jammer into the cigarette lighter — and unintentionally take out GPS for everyone within a few hundred meters, including aircraft and emergency services nearby. The most famous case was Newark Airport in 2009, where a single contractor’s in-cab jammer regularly disrupted the Smart Landing System until the FAA tracked him down.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Spoofing is a more sophisticated attack. By transmitting a stronger, fake constellation, an attacker can convince a receiver it’s somewhere it isn’t. Ships in the Black Sea have repeatedly reported false GPS positions placing them on dry land at airports — a textbook spoofing pattern. Modern receivers fight back by cross-checking signals against multiple GNSS constellations (a Galileo signal disagreeing with a GPS signal is a red flag) and by watching for unrealistic position jumps.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">RTK and centimeter-level precision</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Consumer GPS hovers around 3–5 meters of accuracy. For surveying, agriculture, and drone work, that’s nowhere near enough. The technique called <strong>Real-Time Kinematic (RTK)</strong> closes the gap to centimeters by using a fixed base station at a precisely surveyed point.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The base station knows its own coordinates exactly. It receives the same GPS signals you do, calculates what its position would <em>appear</em> to be based on those signals alone, and broadcasts the difference — a correction — to nearby rover receivers in real time. Your moving receiver applies the correction and ends up with sub-centimeter accuracy.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Network RTK takes this further by combining corrections from dozens of base stations across a region. A self-driving tractor in Nebraska can pull corrections from a state-wide network and stay within 2 cm of a target row for kilometers. The high-end iPhones with the U1 chip don’t do full RTK, but they include enough hardware that compatible apps can pull network corrections for sub-meter accuracy in supported regions.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">How GPS gets used in the real world</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The obvious uses — navigation, fitness tracking, geocaching — are only the beginning. GPS quietly underpins infrastructure most people never think about:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><strong>Time synchronization.</strong> Cell towers, electrical grids, and stock exchanges synchronize their clocks against GPS to nanosecond precision. A GPS outage doesn’t just break maps — it can drop calls and halt trading.</li>
        <li><strong>Precision agriculture.</strong> A modern tractor can drive itself in perfectly straight rows for kilometers, dropping fertilizer and seed based on previously-collected per-square-meter soil data. RTK GPS makes this possible.</li>
        <li><strong>Aviation.</strong> Aircraft use GPS for approach and landing in low visibility (the LPV procedure, for example, replaces the need for ground-based ILS in many small airports).</li>
        <li><strong>Search and rescue.</strong> AML (Advanced Mobile Location) automatically transmits a caller’s GPS coordinates to emergency dispatchers when they dial 911 or 112.</li>
        <li><strong>Tectonic monitoring.</strong> Permanent GPS receivers placed on faults can detect the few millimeters of motion that precede major earthquakes.</li>
        <li><strong>Asset tracking.</strong> Shipping containers, rental scooters, and stolen-bike trackers all rely on cheap GPS modules and cellular backhaul.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">Battery cost and how phones cheat</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        A GPS receiver running continuously can chew through ~25% of a phone battery in a day. Modern OSes hide this by being clever: instead of running GPS at full duty cycle, they fall back to Wi-Fi and cell positioning when you’re stationary, sample GPS in short bursts when you’re walking, and only run it continuously during active navigation.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The “high accuracy” / “battery saving” / “device only” toggles in your phone’s location settings really mean: <em>use everything including cloud-assisted Wi-Fi positioning</em>, <em>use only Wi-Fi and cell</em>, or <em>use only the GPS chip</em>. The first is most accurate and uses moderate battery; the second is faster but coarse; the third is most private but slowest to lock on.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What about indoor positioning?</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        GPS doesn’t work indoors — the satellite signal is just too weak to penetrate roofs and walls. Indoor positioning systems (IPS) fill the gap with completely different technology: Bluetooth beacons, Wi-Fi RTT (round-trip time) measurements, ultra-wideband (UWB) chips, and visual SLAM using the phone’s camera. Airports and shopping malls have started deploying these for indoor mapping, with accuracy usually in the 1–3 meter range. None of this involves GPS at all, even though most apps blur the distinction in their UI.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The future of GNSS</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        GPS itself is mid-modernization. The next-generation GPS III satellites broadcast a new civilian signal called L1C that’s designed to interoperate with Galileo and BeiDou, allowing multi-constellation receivers to combine signals more efficiently. Galileo is rolling out a free High Accuracy Service (HAS) that pushes corrections globally and brings ~20 cm accuracy to consumer devices without RTK.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        In parallel, a new generation of <strong>LEO PNT</strong> (Low-Earth-Orbit Position, Navigation, Timing) constellations are launching — Iridium’s STL service and several SpaceX-adjacent projects. LEO signals are much stronger than the 20,000-km MEO GPS signals and much harder to jam, which is why aviation and defense are paying close attention.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">See your own GPS coordinates</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Curious what your GPS chip is reporting right now? Open <Link to="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link> — it pulls your live latitude, longitude, and accuracy radius (in meters) straight from the browser’s geolocation API, which is itself talking to the same GPS hardware your maps app uses. The accuracy number on the dashboard is your real-time DOP estimate, in human-readable form.
      </p>
    </article>
  );
}
