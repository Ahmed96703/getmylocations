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

      <h2 className="font-display text-2xl font-bold mt-12">See your own GPS coordinates</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Curious what your GPS chip is reporting right now? Open <Link to="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link> — it pulls your live latitude, longitude, and accuracy radius (in meters) straight from the browser’s geolocation API, which is itself talking to the same GPS hardware your maps app uses. The accuracy number on the dashboard is your real-time DOP estimate, in human-readable form.
      </p>
    </article>
  );
}
