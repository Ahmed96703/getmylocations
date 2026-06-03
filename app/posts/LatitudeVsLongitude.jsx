import Link from 'next/link';

export default function LatitudeVsLongitude() {
  return (
    <article className="prose-invert">
      <p className="text-lg text-slate-300/90 leading-relaxed">
        I forget which one runs sideways at least once a year, and I
        write about coordinates for a living. The trick that finally
        stuck for me is the ladder: <strong>lat</strong>itude is the
        rungs of a <em>la</em>dder, running across; longitude is the long
        vertical poles. If you can hold onto that one image, the rest of
        the system &mdash; signs, ranges, formats, edge cases &mdash;
        falls out naturally.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The mental model in one image</h2>
      <ul className="mt-3 space-y-1.5 text-slate-300/90 list-disc list-inside">
        <li><strong>Latitude</strong> = the horizontal rungs of a ladder around the globe. Tells you how far <strong>north or south</strong> you are.</li>
        <li><strong>Longitude</strong> = the vertical orange-slice lines from pole to pole. Tells you how far <strong>east or west</strong> you are.</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        A latitude&ndash;longitude pair is a single unique point. Every
        spot on Earth has exactly one.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Latitude: north and south, easy half</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Latitude is measured from the <strong>equator</strong>, the
        horizontal line halfway between the poles. The equator is
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400">0&deg;</code>.
        From there:
      </p>
      <ul className="mt-3 space-y-1.5 text-slate-300/90 list-disc list-inside">
        <li>North pole: <strong>+90&deg;</strong> (or 90&deg;N)</li>
        <li>Equator: <strong>0&deg;</strong></li>
        <li>South pole: <strong>&minus;90&deg;</strong> (or 90&deg;S)</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">A few landmarks worth memorising:</p>
      <ul className="mt-3 space-y-1.5 text-slate-300/90 list-disc list-inside">
        <li>London: 51.5&deg;N</li>
        <li>New York: 40.7&deg;N</li>
        <li>Karachi: 24.9&deg;N</li>
        <li>Sydney: 33.9&deg;S (or &minus;33.9&deg;)</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Useful intuition: <strong>1&deg; of latitude is about 111 km
        everywhere on Earth.</strong> A latitude change of 0.01&deg; is
        roughly 1.1 km on the ground. Latitude was the easy half because
        a sextant reading off the noon sun gives it directly &mdash; any
        decent ship&rsquo;s captain in 1750 could read latitude from a
        moving deck.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Longitude: east and west, the hard half</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Longitude is measured from the <strong>prime meridian</strong>, a
        vertical line that &mdash; by an 1884 international vote &mdash;
        runs through the Royal Observatory in Greenwich. Why Greenwich
        specifically? Mostly because the British already had the most
        widely used maritime charts and re-printing every chart in the
        world was unappealing. The story is the
        {' '}<Link href="/blog/history-of-latitude-and-longitude" className="text-electric-400 hover:underline">history of latitude and longitude</Link>{' '}
        post if you want the full version.
      </p>
      <ul className="mt-3 space-y-1.5 text-slate-300/90 list-disc list-inside">
        <li>Prime meridian (Greenwich): 0&deg;</li>
        <li>Antimeridian (international date line, roughly): &plusmn;180&deg;</li>
      </ul>
      <ul className="mt-3 space-y-1.5 text-slate-300/90 list-disc list-inside">
        <li>London: 0&deg; (right on the line)</li>
        <li>New York: &minus;74.0&deg; (or 74&deg;W)</li>
        <li>Karachi: 67.0&deg;E</li>
        <li>Tokyo: 139.7&deg;E</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Unlike latitude, the real-world distance covered by 1&deg; of
        longitude <strong>depends on where you are</strong>. At the
        equator, 1&deg; of longitude is about 111 km. At the poles, it
        shrinks to zero (all meridians converge). Around the latitude of
        Karachi or New York, 1&deg; of longitude works out to roughly
        90&ndash;95 km.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Which comes first, latitude or longitude?</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Almost every human-readable format puts <strong>latitude
        first</strong>. When you see
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400">48.858420, 2.294500</code>,
        the first number is latitude (48.858420&deg;N) and the second is
        longitude (2.294500&deg;E). This is the order used by Google Maps,
        Apple Maps, every smartphone, and almost every navigation app
        you&rsquo;ll ever paste a coordinate into.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The one big exception: <strong>GeoJSON, PostGIS, and many
        programming geometry libraries put longitude first</strong>
        &mdash; <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400">[2.294500, 48.858420]</code>.
        Mathematicians prefer (x, y) order, longitude maps to x, and the
        geospatial standards bodies followed the math. Loading a GeoJSON
        file directly into a (lat, lon)-assuming app reflects every
        point horizontally. I&rsquo;ve hit this bug more than once.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        <strong>Quick rule for unfamiliar coordinates:</strong> if either
        number has an absolute value greater than 90, that one is
        definitely longitude (|lat| can only go up to 90; |lon| can go
        up to 180). If both numbers are under 90 in absolute value, assume
        latitude first unless the source explicitly uses GeoJSON
        convention.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The three formats you&rsquo;ll see</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        All three encode the same point in different notations:
      </p>
      <ol className="mt-3 list-decimal list-inside space-y-2 text-slate-300/90">
        <li>
          <strong>Decimal degrees (DD):</strong> <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400">40.712776, -74.005974</code>
          <span className="block text-sm text-slate-400 ml-6">Default everywhere modern. Google Maps, GPS apps, APIs.</span>
        </li>
        <li>
          <strong>Degrees, minutes, seconds (DMS):</strong> <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400">40&deg;42&apos;45.99&quot;N 74&deg;00&apos;21.51&quot;W</code>
          <span className="block text-sm text-slate-400 ml-6">Old-school nautical and aviation format.</span>
        </li>
        <li>
          <strong>Degrees and decimal minutes (DDM):</strong> <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400">40&deg;42.766&apos;N 74&deg;00.358&apos;W</code>
          <span className="block text-sm text-slate-400 ml-6">Common on marine GPS units.</span>
        </li>
      </ol>

      <h2 className="font-display text-2xl font-bold mt-12">How many decimal places do you actually need?</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Each extra decimal in DD format divides your uncertainty by 10:
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
            <tr className="border-b border-white/5"><td className="py-2 pr-4">2</td><td className="py-2 pr-4">~1.1 km</td><td className="py-2">Neighbourhood</td></tr>
            <tr className="border-b border-white/5"><td className="py-2 pr-4">3</td><td className="py-2 pr-4">~110 m</td><td className="py-2">Street</td></tr>
            <tr className="border-b border-white/5"><td className="py-2 pr-4">4</td><td className="py-2 pr-4">~11 m</td><td className="py-2">Single building</td></tr>
            <tr className="border-b border-white/5"><td className="py-2 pr-4">5</td><td className="py-2 pr-4">~1.1 m</td><td className="py-2">Doorway / parked car</td></tr>
            <tr><td className="py-2 pr-4">6</td><td className="py-2 pr-4">~0.11 m</td><td className="py-2">Survey grade</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        For most everyday sharing, four decimals is plenty. Posting your
        home address publicly? Two or three decimals coarsens you to the
        neighbourhood without giving away the doorway.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">A few common stumbles</h2>

      <h3 className="font-semibold text-lg mt-6 text-slate-100">Is the negative sign on latitude or longitude?</h3>
      <p className="mt-2 text-slate-300/90 leading-relaxed">
        Negative latitude = south of the equator. Negative longitude =
        west of Greenwich.
      </p>

      <h3 className="font-semibold text-lg mt-6 text-slate-100">What about altitude?</h3>
      <p className="mt-2 text-slate-300/90 leading-relaxed">
        Latitude and longitude pin you to a spot on the surface. Height
        is a separate value &mdash; altitude or elevation &mdash;
        measured in meters above mean sea level. GPS receivers report it
        in a separate field.
      </p>

      <h3 className="font-semibold text-lg mt-6 text-slate-100">What does &ldquo;WGS-84&rdquo; mean?</h3>
      <p className="mt-2 text-slate-300/90 leading-relaxed">
        The global coordinate system virtually every modern GPS, map, and
        phone uses. Unless you&rsquo;re a surveyor working with a national
        grid, WGS-84 is the only one you&rsquo;ll meet.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Coordinates worth memorising</h2>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><strong>0&deg;, 0&deg;</strong> &mdash; the intersection of the equator and prime meridian, in the Atlantic off the coast of Ghana. Nicknamed &ldquo;Null Island&rdquo;; not actually an island. If you ever see an app place something there, it&rsquo;s a bug &mdash; somebody set lat and lon to zero as a default.</li>
        <li><strong>Eiffel Tower:</strong> 48.8584, 2.2945</li>
        <li><strong>Statue of Liberty:</strong> 40.6892, &minus;74.0445</li>
        <li><strong>Sydney Opera House:</strong> &minus;33.8568, 151.2153</li>
        <li><strong>Mount Everest summit:</strong> 27.9881, 86.9250</li>
        <li><strong>North Pole:</strong> 90.0, undefined longitude (all meridians meet)</li>
        <li><strong>South Pole:</strong> &minus;90.0, undefined longitude</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">Three edge cases that break poorly-written software</h2>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li>
          <strong>The antimeridian (longitude &plusmn;180&deg;).</strong>
          Where east meets west in the Pacific. A great-circle line from
          Alaska to Vladivostok crosses &plusmn;180&deg;, but naive code
          treating longitude as a flat number draws the line all the way
          around the world the other way. You can spot the bug whenever
          a flight-tracker map shows planes flying through Africa to
          cross the Pacific.
        </li>
        <li>
          <strong>The poles (latitude &plusmn;90&deg;).</strong> Longitude
          is meaningless here. Distance formulas that assume rectangular
          coordinates fall apart. Real-world relevance: weather
          forecasting at McMurdo, GPS-guided drones over Arctic ice.
        </li>
        <li>
          <strong>West-positive longitude.</strong> Some legacy databases
          (pre-1980s NOAA, for instance) use west-positive instead of
          today&rsquo;s east-positive convention. Loading directly into
          Google Maps reflects every point horizontally.
        </li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">Distance between two coordinates</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        How far apart are two latitude&ndash;longitude pairs? You
        can&rsquo;t use Pythagoras because the Earth is round. The
        <strong> Haversine formula</strong> gives the great-circle distance
        &mdash; the shortest path across the sphere&rsquo;s surface
        &mdash; accurate to within ~0.5% for any pair of points on
        Earth. For most everyday cases (driving estimates, real-estate
        copy, flight planning), it&rsquo;s plenty. For long-distance
        survey accuracy, the Vincenty formula accounts for
        Earth&rsquo;s actual ellipsoid shape and is good to a few
        millimeters. Both are one-liners in any modern programming
        language; the
        {' '}<Link href="/distance-calculator" className="text-electric-400 hover:underline">distance calculator</Link>{' '}
        on this site uses Haversine.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Read your own coordinates</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Open
        {' '}<Link href="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link>{' '}
        and you&rsquo;ll see your own latitude and longitude in decimal
        degrees, with six decimals of precision, plus a live map pin.
        Toggle into Advanced mode to type any coordinates and watch the
        map fly there in real time. Worth doing once just to anchor what
        the numbers feel like for the place you&rsquo;re sitting in.
      </p>
    </article>
  );
}
