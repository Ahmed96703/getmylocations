import Link from 'next/link';
import { haversine, vincentyInverse, vincentyDirect } from '../distance-calculator/dist.js';

// Both tables below are computed from the Distance Calculator's own code when
// the site is built, so the numbers on this page cannot drift from the tool.
const ROUTES = [
  ['London → Paris', 51.5074, -0.1278, 48.8566, 2.3522],
  ['Lahore → Karachi', 31.5204, 74.3587, 24.8607, 67.0011],
  ['Oslo → Longyearbyen (Svalbard)', 59.9139, 10.7522, 78.2232, 15.6267],
  ['New York → Los Angeles', 40.7128, -74.006, 34.0522, -118.2437],
  ['Sydney → Santiago', -33.8688, 151.2093, -33.4489, -70.6693],
];

const km = (m) => (m / 1000).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const signed = (x, digits = 0) => `${x > 0 ? '+' : x < 0 ? '−' : ''}${Math.abs(x).toLocaleString('en-US', { maximumFractionDigits: digits, minimumFractionDigits: digits })}`;

const routeRows = ROUTES.map(([name, a, b, c, d]) => {
  const v = vincentyInverse(a, b, c, d).meters;
  const h = haversine(a, b, c, d);
  return { name, v, h, diff: h - v, pct: ((h - v) / v) * 100 };
});

// 100 km measured due north and due east at several latitudes.
const segmentRows = [0, 30, 45, 60, 80].map((lat) => {
  const n = vincentyDirect(lat, 0, 0, 100000);
  const e = vincentyDirect(lat, 0, 90, 100000);
  return {
    lat,
    ns: haversine(lat, 0, n.lat, n.lon) - 100000,
    ew: haversine(lat, 0, e.lat, e.lon) - 100000,
  };
});

const code = 'bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm';
const ext = 'text-accent hover:underline';

export default function HaversineVsVincenty() {
  return (
    <article className="prose-invert">
      <aside className="mb-6 rounded-xl border border-accent/40 bg-accent/5 p-4" aria-label="Quick answer">
        <p className="text-[11px] uppercase tracking-wider text-accent font-semibold">Quick answer</p>
        <p className="mt-1 text-fg leading-relaxed">
          Haversine treats the Earth as a sphere, so its distances are off by up to about half a percent:
          in our test of 200,000 random routes, the worst cases were 0.56% too long and 0.45% too short.
          Vincenty&rsquo;s formulae use the real, slightly flattened shape (the WGS&nbsp;84 ellipsoid) and are
          accurate to about half a millimetre, but can fail for points on nearly opposite sides of the Earth.
          Use haversine for ranking or rough distances; use an ellipsoidal method when the number itself matters.
        </p>
      </aside>

      <p className="text-lg text-fg-muted leading-relaxed">
        Every distance calculator has to pick a model of the Earth. The quick choice is the haversine
        formula on a sphere; the careful choice is an ellipsoidal method such as Vincenty&rsquo;s. Most
        articles stop at &ldquo;Vincenty is more accurate.&rdquo; This one measures by how much, in which
        directions, and where Vincenty itself breaks, using the same code that runs our{' '}
        <Link href="/distance-calculator" className={ext}>distance calculator</Link>.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What each formula assumes</h2>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside leading-relaxed">
        <li>
          <strong>Haversine</strong> computes the great-circle distance on a perfect sphere. Our code uses
          the mean Earth radius of 6,371,008.8&nbsp;m. One radius cannot fit a planet that is wider at the
          equator (6,378.137&nbsp;km) than it is tall at the poles (6,356.752&nbsp;km), so the{' '}
          <a href="https://en.wikipedia.org/wiki/Haversine_formula" target="_blank" rel="noopener" className={ext}>formula
          cannot be guaranteed better than about 0.5%</a>.
        </li>
        <li>
          <strong>Vincenty&rsquo;s formulae</strong> (Thaddeus Vincenty, <em>Survey Review</em>, April 1975)
          solve the distance on the WGS&nbsp;84 ellipsoid that GPS uses, by iteration. They are{' '}
          <a href="https://en.wikipedia.org/wiki/Vincenty%27s_formulae" target="_blank" rel="noopener" className={ext}>accurate
          to within about 0.5&nbsp;mm</a> on the ellipsoid.
        </li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">How big is the difference on real routes?</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Straight-line (geodesic) distances, Vincenty on WGS&nbsp;84 versus haversine on the mean-radius sphere:
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-tint/5 text-left text-fg-muted">
              <th className="px-3 py-2 font-semibold">Route</th>
              <th className="px-3 py-2 font-semibold">Vincenty (km)</th>
              <th className="px-3 py-2 font-semibold">Haversine (km)</th>
              <th className="px-3 py-2 font-semibold">Difference</th>
              <th className="px-3 py-2 font-semibold">Error</th>
            </tr>
          </thead>
          <tbody className="text-fg-muted">
            {routeRows.map((r) => (
              <tr key={r.name} className="border-t border-line-subtle">
                <td className="px-3 py-2 text-fg">{r.name}</td>
                <td className="px-3 py-2 tabular-nums">{km(r.v)}</td>
                <td className="px-3 py-2 tabular-nums">{km(r.h)}</td>
                <td className="px-3 py-2 tabular-nums">{signed(r.diff / 1000, 1)} km</td>
                <td className="px-3 py-2 tabular-nums">{signed(r.pct, 2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Kilometres off on intercontinental routes, hundreds of metres on short ones. For a flight-time
        estimate that is noise. For anything that is billed, surveyed or legally measured, it is not.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Direction and latitude decide the sign of the error</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The error is not a fixed percentage. It depends on which way you travel and how far from the
        equator you are, because the ellipsoid curves differently north&ndash;south than east&ndash;west.
        Here is the haversine error over exactly 100&nbsp;km:
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-tint/5 text-left text-fg-muted">
              <th className="px-3 py-2 font-semibold">Starting latitude</th>
              <th className="px-3 py-2 font-semibold">100 km due north</th>
              <th className="px-3 py-2 font-semibold">100 km due east</th>
            </tr>
          </thead>
          <tbody className="text-fg-muted">
            {segmentRows.map((r) => (
              <tr key={r.lat} className="border-t border-line-subtle">
                <td className="px-3 py-2 text-fg">{r.lat}°</td>
                <td className="px-3 py-2 tabular-nums">{signed(r.ns)} m</td>
                <td className="px-3 py-2 tabular-nums">{signed(r.ew)} m</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Near the equator, haversine overstates north&ndash;south distances by over half a percent; at high
        latitudes it understates distances in every direction. That is why a single &ldquo;correction
        factor&rdquo; for haversine does not work.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The worst case we could find</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        We compared the two methods on 200,000 random pairs of points spread evenly over the globe
        (routes shorter than 1&nbsp;km excluded). The largest errors:
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside leading-relaxed">
        <li><strong>Too long by 0.56%:</strong> a 537&nbsp;km route running almost due north&ndash;south across the equator, near New Guinea.</li>
        <li><strong>Too short by 0.45%:</strong> a 486&nbsp;km route near the North Pole.</li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Both match the known shape of the problem: the sphere is too small to match the equator&rsquo;s
        north&ndash;south curvature and too large near the poles. Only one of the 200,000 Vincenty runs
        failed to converge, which brings us to its weak spot.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Vincenty&rsquo;s weak spot: points on opposite sides of the Earth</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Vincenty&rsquo;s inverse method iterates, and for nearly antipodal points it can converge slowly or
        not at all. A standard failing example is (0°,&nbsp;0°) to (0.5°,&nbsp;179.7°): our implementation
        gives up after 200 iterations. The correct distance, from Charles Karney&rsquo;s 2013 algorithm in the{' '}
        <a href="https://geographiclib.sourceforge.io/" target="_blank" rel="noopener" className={ext}>GeographicLib</a>{' '}
        library, is 19,944.127&nbsp;km; haversine gives 19,950.277&nbsp;km, about 6&nbsp;km too long.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        When Vincenty does not converge, our distance calculator falls back to the haversine result and
        labels it as the sphere distance rather than hiding the switch. Karney&rsquo;s method avoids the
        problem entirely and is the better choice for new code that must handle every pair of points.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Which should you use?</h2>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside leading-relaxed">
        <li><strong>Haversine:</strong> sorting places by distance, &ldquo;within 5&nbsp;km&rdquo; filters, rough travel estimates, anything where 0.5% does not change the decision. It is short, fast and never fails.</li>
        <li><strong>Vincenty:</strong> when you need the actual number to metre-level accuracy and your points are not near-antipodal, or when you are matching survey or GIS software that uses it.</li>
        <li><strong>Karney (GeographicLib):</strong> production geodesy, every pair of points including the awkward ones, and about a thousand times more accurate than Vincenty.</li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Remember that GPS coordinates themselves are only good to a few metres (see{' '}
        <Link href="/gps-vs-ip-accuracy" className={ext}>GPS vs IP accuracy</Link>), so for short distances
        between two phone readings the formula is rarely the biggest source of error.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Haversine in a few lines</h2>
      <pre className="mt-3 overflow-x-auto rounded-xl bg-tint/10 p-4 text-sm"><code>{`const R = 6371008.8; // mean Earth radius in metres (IUGG)
const rad = (d) => (d * Math.PI) / 180;

function haversine(lat1, lon1, lat2, lon2) {
  const dLat = rad(lat2 - lat1);
  const dLon = rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}`}</code></pre>
      <p className="mt-3 text-fg-muted leading-relaxed">
        For the ellipsoid, use a maintained library rather than retyping Vincenty: GeographicLib has
        versions for JavaScript (<code className={code}>geographiclib-geodesic</code>), Python, C++ and more.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">How we checked these numbers</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The route and 100&nbsp;km tables are computed from the distance calculator&rsquo;s source every time
        this site is built. For the random test we also compared our Vincenty implementation with
        GeographicLib on every pair: the largest disagreement was 0.08&nbsp;mm. The test ran on 14 October
        2026 with a fixed random seed, so it can be repeated exactly.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Try any pair yourself in the{' '}
        <Link href="/distance-calculator" className={ext}>distance calculator</Link>, which shows both
        results side by side, or convert coordinates first with the{' '}
        <Link href="/coordinates-converter" className={ext}>coordinates converter</Link>. If latitude and
        longitude still trip you up, start with{' '}
        <Link href="/blog/latitude-vs-longitude-explained" className={ext}>latitude vs longitude explained</Link>.
      </p>
    </article>
  );
}
