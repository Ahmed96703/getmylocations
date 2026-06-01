import Link from 'next/link';


export const metadata = {
  title: 'GPS Coordinates Finder — Read Latitude and Longitude',
  description: "Complete guide to reading GPS coordinates. Decimal degrees, DMS, UTM formats explained with examples, precision tips, and the math behind the numbers.",
  alternates: { canonical: '/gps-coordinates-finder' },
  openGraph: {
    title: 'GPS Coordinates Finder — Read Latitude and Longitude',
    description: "Complete guide to reading GPS coordinates. Decimal degrees, DMS, UTM formats explained with examples, precision tips, and the math behind the numbers.",
    url: 'https://getmylocations.com/gps-coordinates-finder',
  },
};

export default function GpsCoordinatesFinder() {
  return (
    <main role="main" className="max-w-3xl mx-auto px-5 py-12 prose-invert">
      <article>
        <p className="text-xs uppercase tracking-[0.18em] text-electric-400 font-semibold">Complete Guide</p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight mt-2 leading-[1.1]">
          GPS coordinates finder — read your latitude and longitude in plain English
        </h1>
        <p className="mt-4 text-lg text-slate-300/90 leading-relaxed">
          Latitude and longitude sound technical, but they&apos;re just two numbers that pin any
          point on Earth to within a meter. This guide explains exactly what those numbers mean,
          how to read them in the three formats you&apos;ll see in the wild (decimal degrees, DMS,
          and UTM), how to grab your own coordinates in two seconds, and where you&apos;ll actually
          use them &mdash; from emergency calls to sharing a hiking trailhead.
        </p>

        <div className="mt-6 glass rounded-2xl p-5 ring-1 ring-electric-400/30">
          <p className="text-sm text-slate-300/90 leading-relaxed">
            <strong className="text-slate-100">In a hurry?</strong> Open the
            {' '}<Link href="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link>{' '}
            tool, click Allow on the location prompt, and your latitude and longitude appear instantly &mdash;
            already formatted in WGS-84 decimal degrees with six-digit precision (about one meter).
          </p>
        </div>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">What latitude and longitude actually are</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          Think of Earth as an orange covered in two sets of lines. The horizontal rings &mdash; running
          parallel to the equator &mdash; are <strong>lines of latitude</strong>. They tell you how far
          north or south you are. The vertical lines that run pole to pole are <strong>lines of
          longitude</strong>. They tell you how far east or west you are.
        </p>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          Latitude runs from 0&deg; at the equator to 90&deg; at the poles. The North Pole is +90&deg;
          (latitude 90&deg;&nbsp;N) and the South Pole is &minus;90&deg; (latitude 90&deg;&nbsp;S).
          Longitude runs from 0&deg; at the Prime Meridian in Greenwich, England, to 180&deg; in either
          direction, meeting at the International Date Line in the Pacific. East is positive, west is negative.
        </p>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          Any pair of these two numbers identifies one and only one point on Earth&apos;s surface. The
          Eiffel Tower is at <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">48.8584, 2.2945</code>.
          The Sydney Opera House is at <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">&minus;33.8568, 151.2153</code>. The negative latitude tells you it&apos;s in the
          southern hemisphere; the longitude tells you it&apos;s east of Greenwich.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">How to read each part of a coordinate</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          Every decimal-degree coordinate has the same shape: <em>latitude</em>, then <em>longitude</em>,
          separated by a comma. <strong>Latitude always comes first.</strong> This trips people up because
          mapping APIs disagree &mdash; Google Maps and most consumer apps use the (lat, lon) order, but
          GeoJSON and many GIS systems use (lon, lat). When in doubt, the larger of the two absolute
          values is usually longitude (since longitude goes up to 180 and latitude only to 90).
        </p>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          The number of decimal places tells you how precise the coordinate is:
        </p>
        <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
          <li><code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">48.8</code> &mdash; ~11 km. Enough to identify a city.</li>
          <li><code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">48.86</code> &mdash; ~1.1 km. Enough to identify a neighborhood.</li>
          <li><code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">48.858</code> &mdash; ~110 m. Enough to identify a city block.</li>
          <li><code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">48.8584</code> &mdash; ~11 m. Enough to identify a building.</li>
          <li><code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">48.85842</code> &mdash; ~1.1 m. Enough to identify a parking space.</li>
          <li><code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">48.858420</code> &mdash; ~11 cm. More than consumer GPS can reliably deliver.</li>
        </ul>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          Six decimals (about one meter) is the practical sweet spot. Most smartphone GPS chips are
          accurate to roughly 3&ndash;5 meters under ideal conditions, so writing down more digits than
          that creates false precision.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">The three coordinate formats you&apos;ll see</h2>

        <h3 className="font-display text-lg font-semibold mt-6 text-slate-100">Decimal degrees (DD) &mdash; the modern default</h3>
        <p className="mt-2 text-slate-300/90 leading-relaxed">
          Example: <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">48.858420, 2.294500</code>. Two
          decimal numbers, comma-separated. This is what every smartphone, GPS receiver, Google Maps URL,
          and modern API produces. It&apos;s the easiest to read, the easiest to paste, and the format
          GetMyLocations defaults to.
        </p>

        <h3 className="font-display text-lg font-semibold mt-6 text-slate-100">Degrees, minutes, seconds (DMS) &mdash; the paper-map classic</h3>
        <p className="mt-2 text-slate-300/90 leading-relaxed">
          Example: <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">48&deg; 51&apos; 30.3&quot; N, 2&deg; 17&apos; 40.2&quot; E</code>.
          Each degree is divided into 60 minutes; each minute is divided into 60 seconds. Hemisphere
          letters (N/S, E/W) replace the &plusmn; sign. Older nautical charts, aviation maps, and most
          land-survey documents use DMS.
        </p>
        <p className="mt-2 text-slate-300/90 leading-relaxed">
          Converting between DD and DMS isn&apos;t hard. The integer part of the decimal degree is the
          degrees value. Multiply the remainder by 60 to get minutes (taking the integer part), and
          multiply <em>that</em> remainder by 60 to get seconds. For example, 48.8584&deg; becomes
          48&deg; + (0.8584 &times; 60)&apos; = 48&deg; 51.504&apos;, then 48&deg; 51&apos; (0.504 &times; 60)&quot; = 48&deg; 51&apos; 30.24&quot;.
        </p>

        <h3 className="font-display text-lg font-semibold mt-6 text-slate-100">UTM (Universal Transverse Mercator)</h3>
        <p className="mt-2 text-slate-300/90 leading-relaxed">
          Example: <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">31U 448262 5411917</code>.
          UTM divides the world into 60 vertical zones, each treated as a flat plane, then expresses
          your position as &ldquo;eastings&rdquo; and &ldquo;northings&rdquo; in meters. It&apos;s preferred by hikers,
          search-and-rescue teams, and the military because distances on a UTM grid translate
          directly to real-world meters, so you can pace them out on the ground.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">How a browser actually finds your coordinates</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          When you click &ldquo;Allow&rdquo; on a location prompt, the browser doesn&apos;t magically know where
          you are. It asks the operating system, which fuses several signals into a single best-guess
          coordinate:
        </p>
        <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
          <li>
            <strong>GNSS satellites.</strong> Your phone or laptop&apos;s chip listens for signals from GPS
            (US), Galileo (EU), GLONASS (Russia), BeiDou (China), and QZSS (Japan). With four or more
            satellites in view, it triangulates a 3D position. Read our <Link href="/blog/how-gps-works" className="text-electric-400 hover:underline">how GPS works</Link> guide
            for the satellite math.
          </li>
          <li>
            <strong>Wi-Fi BSSID lookup.</strong> Apple and Google maintain global databases of Wi-Fi
            access point MAC addresses paired to GPS coordinates collected from millions of phones. If
            your device can hear three or more known access points, your OS can infer your position to
            within ~25 meters even with no GPS signal at all.
          </li>
          <li>
            <strong>Cell-tower triangulation.</strong> On mobile, the carrier&apos;s knowledge of which
            tower you&apos;re connected to (and signal strength) provides a fallback when GPS is
            unavailable. Accuracy: a few hundred meters in cities, several kilometers in rural areas.
          </li>
          <li>
            <strong>IP geolocation.</strong> The slowest, least accurate fallback. Used when none of
            the above are available, or when the user denies precise location. Read more in our
            {' '}<Link href="/blog/what-is-ip-location-and-how-accurate" className="text-electric-400 hover:underline">guide to IP location accuracy</Link>.
          </li>
        </ul>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">Practical uses for your coordinates</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          You almost certainly already use coordinates without thinking about them. A few uses where
          knowing how to read them by hand really pays off:
        </p>
        <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
          <li>
            <strong>Emergency calls.</strong> If a dispatcher can&apos;t find your address (no street sign,
            wrong house number, foreign country), six decimals of latitude and longitude give them an
            unambiguous fix. Modern smartphones already do this automatically through
            Advanced Mobile Location (AML), but knowing how to read your own coordinates is a
            life-saving backup.
          </li>
          <li>
            <strong>Sharing a place that has no address.</strong> A trailhead, a campsite, a fishing
            spot, the entrance to a cave. Coordinates beat written directions every time.
          </li>
          <li>
            <strong>Geocaching.</strong> The world&apos;s biggest treasure hunt. Over three million caches
            are hidden globally, each identified only by coordinates.
          </li>
          <li>
            <strong>Verifying a VPN.</strong> Connect to a VPN claiming to be in another country, then
            open GetMyLocations and decline the precise GPS prompt. The IP-only fallback should place
            you near the VPN&apos;s claimed location. If your real city shows, the VPN has a leak.
          </li>
          <li>
            <strong>Calibrating GPS-tagged photos.</strong> Cameras and phones embed GPS in EXIF
            metadata. Comparing the EXIF to a known-good reading on the same spot helps you spot
            a drifting GPS module.
          </li>
        </ul>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">Privacy: what the website actually sees</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          When you grant the Geolocation API permission, the website receives only the resulting
          latitude/longitude/accuracy &mdash; not which satellites your phone heard or which Wi-Fi
          access points helped. GetMyLocations processes those numbers entirely in your browser; the
          map tiles come from OpenStreetMap, and reverse geocoding (turning coordinates into a city
          name) routes through BigDataCloud. We don&apos;t store your coordinates, but the third-party
          services we use have their own privacy practices &mdash; see our
          {' '}<Link href="/privacy-policy" className="text-electric-400 hover:underline">Privacy Policy</Link> for the full breakdown.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">Find your coordinates now</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          Open <Link href="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link>, click Allow on the prompt, and your live latitude and
          longitude appear at the top of the dashboard with the accuracy radius displayed underneath.
          One click copies them to your clipboard in decimal-degree format.
        </p>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          If the prompt doesn&apos;t appear or your reading is wrong, jump to our
          {' '}<Link href="/fix-location-not-working" className="text-electric-400 hover:underline">troubleshooting guide</Link> and you&apos;ll be back on the
          map in under a minute.
        </p>

        <h2 className="font-display text-2xl font-bold mt-10">Related guides</h2>
        <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
          <li><Link href="/blog/latitude-vs-longitude-explained" className="text-electric-400 hover:underline">Latitude vs longitude &mdash; the difference, explained</Link></li>
          <li><Link href="/blog/how-gps-works" className="text-electric-400 hover:underline">How GPS works &mdash; the satellite math</Link></li>
          <li><Link href="/blog/how-to-find-your-gps-coordinates" className="text-electric-400 hover:underline">How to find your GPS coordinates</Link></li>
          <li><Link href="/blog/10-uses-gps-coordinates" className="text-electric-400 hover:underline">10 surprising things you can do with a GPS coordinate</Link></li>
          <li><Link href="/fix-location-not-working" className="text-electric-400 hover:underline">Fix location not working &mdash; troubleshooting guide</Link></li>
        </ul>
      </article>
    </main>
  );
}
