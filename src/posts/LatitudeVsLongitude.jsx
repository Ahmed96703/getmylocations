import { Link } from 'react-router-dom';

export default function LatitudeVsLongitude() {
  return (
    <article className="prose-invert">
      <p className="text-lg text-slate-300/90 leading-relaxed">
        Latitude and longitude are the two numbers that turn anywhere on Earth into a unique address. They’re the foundation of every GPS, map, navigation app, and weather forecast — and once you grasp the basic mental model, you’ll never confuse them again. This guide walks through what each one measures, the formats you’ll see in the wild, and the gotchas that trip up most beginners.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The mental model in 30 seconds</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Imagine a grid wrapped around the globe.
      </p>
      <ul className="mt-3 space-y-1.5 text-slate-300/90 list-disc list-inside">
        <li><strong>Latitude</strong> = the horizontal lines (like rungs of a ladder). They tell you how far <strong>north or south</strong> you are.</li>
        <li><strong>Longitude</strong> = the vertical lines (like orange slices). They tell you how far <strong>east or west</strong> you are.</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Together, a latitude–longitude pair is a single unique point — every spot on Earth has exactly one.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Latitude — north and south</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Latitude is measured from the <strong>equator</strong>, the imaginary horizontal line halfway between the North and South Poles. The equator is <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400">0°</code>.
      </p>
      <ul className="mt-3 space-y-1.5 text-slate-300/90 list-disc list-inside">
        <li><strong>North pole:</strong> +90° (or simply 90°N)</li>
        <li><strong>Equator:</strong> 0°</li>
        <li><strong>South pole:</strong> −90° (or 90°S)</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Memorable landmarks:
      </p>
      <ul className="mt-3 space-y-1.5 text-slate-300/90 list-disc list-inside">
        <li>London: 51.5° N</li>
        <li>New York: 40.7° N</li>
        <li>Karachi: 24.9° N</li>
        <li>Sydney: 33.9° S (or −33.9°)</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        A useful intuition: <strong>1° of latitude ≈ 111 km</strong>, almost everywhere on Earth. So a latitude change of 0.01° (one hundredth of a degree) is about 1.1 km on the ground.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Longitude — east and west</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Longitude is measured from the <strong>prime meridian</strong>, an imaginary vertical line that — by international agreement in 1884 — runs through the Royal Observatory in Greenwich, London.
      </p>
      <ul className="mt-3 space-y-1.5 text-slate-300/90 list-disc list-inside">
        <li><strong>Prime meridian (Greenwich):</strong> 0°</li>
        <li><strong>180° east / west:</strong> roughly the international date line in the Pacific</li>
      </ul>
      <ul className="mt-3 space-y-1.5 text-slate-300/90 list-disc list-inside">
        <li>London: 0° (right on the prime meridian)</li>
        <li>New York: −74.0° (or 74° W)</li>
        <li>Karachi: 67.0° E</li>
        <li>Tokyo: 139.7° E</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Unlike latitude, the real-world distance covered by 1° of longitude <strong>depends on where you are</strong>. At the equator, 1° of longitude ≈ 111 km. At the poles, it shrinks to zero. In Karachi or New York (~30-40° latitude), 1° of longitude is roughly 90-95 km.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">How to write coordinates</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        You’ll see three common formats. They all encode the same point:
      </p>
      <ol className="mt-3 list-decimal list-inside space-y-2 text-slate-300/90">
        <li>
          <strong>Decimal degrees (DD):</strong> <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400">40.712776, -74.005974</code>
          <span className="block text-sm text-slate-400 ml-6">Most common today; used by Google Maps, GPS apps, and APIs.</span>
        </li>
        <li>
          <strong>Degrees, minutes, seconds (DMS):</strong> <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400">40°42'45.99"N 74°00'21.51"W</code>
          <span className="block text-sm text-slate-400 ml-6">Old-school nautical and aviation format.</span>
        </li>
        <li>
          <strong>Decimal minutes (DMM):</strong> <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400">40°42.766'N 74°00.358'W</code>
          <span className="block text-sm text-slate-400 ml-6">Common in marine GPS units.</span>
        </li>
      </ol>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The order is almost always <strong>latitude first, longitude second</strong> — though programmers sometimes flip them in JavaScript/SQL geometry types, so always double-check.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">How many decimals do I need?</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Each extra decimal in decimal-degrees format multiplies your precision by 10:
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-white/10">
              <th className="text-left py-2 pr-4 font-semibold">Decimals</th>
              <th className="text-left py-2 pr-4 font-semibold">Precision</th>
              <th className="text-left py-2 font-semibold">Use case</th>
            </tr>
          </thead>
          <tbody className="text-slate-300/90">
            <tr className="border-b border-white/5"><td className="py-2 pr-4">0</td><td className="py-2 pr-4">~111 km</td><td className="py-2">Country</td></tr>
            <tr className="border-b border-white/5"><td className="py-2 pr-4">1</td><td className="py-2 pr-4">~11 km</td><td className="py-2">Large city</td></tr>
            <tr className="border-b border-white/5"><td className="py-2 pr-4">2</td><td className="py-2 pr-4">~1.1 km</td><td className="py-2">Neighborhood</td></tr>
            <tr className="border-b border-white/5"><td className="py-2 pr-4">3</td><td className="py-2 pr-4">~110 m</td><td className="py-2">Street</td></tr>
            <tr className="border-b border-white/5"><td className="py-2 pr-4">4</td><td className="py-2 pr-4">~11 m</td><td className="py-2">Single building</td></tr>
            <tr className="border-b border-white/5"><td className="py-2 pr-4">5</td><td className="py-2 pr-4">~1.1 m</td><td className="py-2">Doorway / parked car</td></tr>
            <tr><td className="py-2 pr-4">6</td><td className="py-2 pr-4">~0.11 m</td><td className="py-2">Survey grade</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="font-display text-2xl font-bold mt-12">Common confusions (and how to avoid them)</h2>

      <h3 className="font-semibold text-lg mt-6 text-slate-100">1. Is the negative sign before latitude or longitude?</h3>
      <p className="mt-2 text-slate-300/90 leading-relaxed">
        A negative sign before <strong>latitude</strong> means <strong>south</strong> of the equator. Before <strong>longitude</strong>, it means <strong>west</strong> of Greenwich.
      </p>

      <h3 className="font-semibold text-lg mt-6 text-slate-100">2. Which comes first in “lat, lon”?</h3>
      <p className="mt-2 text-slate-300/90 leading-relaxed">
        For human-readable output and most map applications: <strong>latitude first</strong>. But some geometry libraries (PostGIS, GeoJSON) flip it to <strong>longitude, latitude</strong> for historical math reasons. When in doubt, paste the coordinates into a map app and see if the pin lands where expected.
      </p>

      <h3 className="font-semibold text-lg mt-6 text-slate-100">3. What about altitude?</h3>
      <p className="mt-2 text-slate-300/90 leading-relaxed">
        Latitude and longitude pinpoint your spot <em>on</em> the Earth’s surface. To express height, you need a third value — altitude or elevation — measured in meters above mean sea level. GPS receivers report it separately.
      </p>

      <h3 className="font-semibold text-lg mt-6 text-slate-100">4. What does “WGS-84” mean?</h3>
      <p className="mt-2 text-slate-300/90 leading-relaxed">
        It’s the global coordinate system that virtually every modern GPS, map, and phone uses. Unless you’re a surveyor working with a national grid, WGS-84 is the only one you’ll meet.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The history behind the grid</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The latitude–longitude system is two thousand years older than you might expect. The Greek scholar Hipparchus proposed dividing the world into 360° around its axis back in the 2nd century BC, and Ptolemy formalized a coordinate grid in his <em>Geography</em> around 150 AD. The equator was the obvious choice for latitude’s zero — it’s defined by the planet’s spin axis — but longitude’s zero was arbitrary and the cause of centuries of arguments.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Different countries used different prime meridians for hundreds of years: the French ran theirs through Paris, the Spaniards through Cadiz, the Americans through Washington. Greenwich won the international vote at the 1884 Meridian Conference for prosaic reasons — most maritime nautical charts of the era were already published using Greenwich, and re-printing them all was unappealing. The result: every GPS coordinate today is measured from a brass strip in a south-east London suburb.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Famous coordinates worth knowing</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        A handful of coordinates show up often enough that they’re worth recognizing:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><strong>0°, 0°</strong> — the intersection of the equator and the prime meridian. Sits in the Atlantic Ocean off the coast of Ghana. Often called Null Island; not actually an island.</li>
        <li><strong>Eiffel Tower:</strong> 48.8584, 2.2945</li>
        <li><strong>Statue of Liberty:</strong> 40.6892, −74.0445</li>
        <li><strong>Sydney Opera House:</strong> −33.8568, 151.2153</li>
        <li><strong>Mount Everest summit:</strong> 27.9881, 86.9250</li>
        <li><strong>North Pole:</strong> 90.0, undefined longitude</li>
        <li><strong>South Pole:</strong> −90.0, undefined longitude</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        That “undefined longitude” at the poles is one of the system’s pleasant quirks: every meridian converges to the same point, so longitude has no meaning there.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Edge cases that confuse software</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Three coordinate edge cases regularly break poorly-written mapping code:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li>
          <strong>The antimeridian (longitude ±180°).</strong> This is where east and west meet in the Pacific. A great-circle line from Alaska to Vladivostok crosses ±180°, but naive code that treats longitude as a flat number will draw the line all the way around the world the other way. Proper geospatial libraries handle this; you can spot the bug whenever a flight-route map shows planes flying through Africa to cross the Pacific.
        </li>
        <li>
          <strong>The poles (latitude ±90°).</strong> Longitude is meaningless here. Distance calculations using formulas that assume rectangular coordinates fall apart. Real-world cases: weather forecasting at McMurdo Station, GPS-guided drones over Arctic ice.
        </li>
        <li>
          <strong>Coordinate sign convention disagreements.</strong> Some legacy databases use west-positive longitude (instead of the now-standard east-positive). Loading a 1980s NOAA dataset directly into Google Maps will reflect everything horizontally.
        </li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">What comes first — latitude or longitude?</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        <strong>Latitude comes first in almost every human-readable format.</strong> When you see a coordinate written as <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400">48.858420, 2.294500</code>, the first number is the <em>latitude</em> (48.858420 N) and the second is the <em>longitude</em> (2.294500 E). This is the order used by Google Maps, Apple Maps, every smartphone, and almost every navigation app you&rsquo;ll ever paste a coordinate into.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The reason is historical. Latitude was the easier value to measure in the age of sail — a sextant reading off the noon sun gives it directly — so it was always quoted first in published almanacs and nautical tables. That convention carried straight through to consumer mapping apps and is still the safest assumption today.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        There is one big exception: <strong>GeoJSON and many programming geometry libraries put longitude first</strong> — <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400">[2.294500, 48.858420]</code>. Mathematicians prefer (x, y) order and longitude maps to x, so the geospatial standards bodies followed that convention. Loading a GeoJSON file directly into a (lat, lon)-assuming app will reflect every point horizontally — a classic bug source.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        <strong>Quick rule to tell which is which:</strong> the value with the larger absolute maximum is longitude (|lon| can be up to 180) and the smaller is latitude (|lat| can only be up to 90). If one of your numbers has an absolute value greater than 90, that one is definitely longitude. If both are under 90, default to latitude first unless you know the source uses GeoJSON convention.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Why “lat, lon” and not “lon, lat”?</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Both conventions exist and the choice has cost engineering hours all over the world. The short version: humans read in (latitude, longitude) order because latitude was historically the easier value to measure (a sextant reading off the noon sun), so it came first in published almanacs. Mathematicians, on the other hand, prefer (x, y) — and longitude maps to x — so geometry libraries flipped the order. GeoJSON inherited the math convention; KML, WKT, and most user-facing apps kept the human one.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Rule of thumb when reading a coordinate from an unfamiliar source: the value with the smaller absolute maximum is latitude (|lat| ≤ 90) and the larger is longitude (|lon| ≤ 180). If one of your numbers is bigger than 90 in absolute value, that one is definitely longitude.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Distance between two coordinate pairs</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        A common task: how far apart are two latitude–longitude pairs? You can’t use Pythagoras because the Earth is round. The <strong>Haversine formula</strong> gives the great-circle distance — the shortest path across the sphere’s surface — and is accurate to within ~0.5% for any pair of points on Earth.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        For most everyday cases (driving distances, real-estate ad copy, flight planning), Haversine is plenty. For higher accuracy over very long distances, the Vincenty formula accounts for Earth’s actual ellipsoid shape and is accurate to a few millimeters. Both are one-liners in any modern programming language.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Try it yourself</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Open <Link to="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link> — you’ll see your own latitude and longitude in decimal degrees, with six decimal places of precision and a live map pin. Toggle into Advanced mode to type any coordinates and watch the map fly there in real time.
      </p>
    </article>
  );
}
