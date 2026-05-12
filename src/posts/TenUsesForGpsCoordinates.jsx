import { Link } from 'react-router-dom';

export default function TenUsesForGpsCoordinates() {
  return (
    <article className="prose-invert">
      <p className="text-lg text-slate-300/90 leading-relaxed">
        Most people only think about GPS coordinates when their navigation app refuses to find an address. But two numbers — latitude and longitude — quietly power dozens of jobs that ordinary street addresses can’t handle. Here are ten of the most useful (and surprising) things you can do with a precise GPS coordinate, whether you grab it from a phone or from a free tool like <Link to="/" className="text-electric-400 hover:underline">GetMyLocations</Link>.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">1. Mark a spot that has no address</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        A favorite fishing hole, a tent site in the middle of a forest, the entrance to a hiking trail, a beach without a parking lot — none of these have postal addresses, but they all have GPS coordinates. Save the lat/lon in your phone’s notes and you can return to the exact spot years later.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">2. Share your location in an emergency</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        If you’re lost and 911/112 asks where you are, a six-decimal coordinate is the most precise answer you can give — accurate within ~1 meter. It works even when the dispatcher’s street-address lookup fails. Modern smartphones already do this automatically via AML (Advanced Mobile Location), but knowing how to find and read your own coordinates is a powerful backup.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">3. Geotag photos that lost their EXIF data</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Social platforms like Instagram and WhatsApp strip the EXIF metadata (including embedded GPS) from photos before posting. If you want to remember where a shot was taken, save the coordinates in a notes app or a photo-editor field at the moment you take it.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">4. Calculate exact distance between two places</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Need to know the straight-line (great-circle) distance between two coordinates — say, your home and a planned vacation rental? Plug them into the Haversine formula or any free distance calculator. This is how airlines calculate flight distances and how real-estate apps tell you a property is “4.2 km from the beach.”
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">5. Build a geofence</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        A geofence is an invisible perimeter defined by a center coordinate and a radius. Phone automation apps (iOS Shortcuts, Android Tasker, Home Assistant) can trigger actions when you cross one: turn on the lights when you arrive home, silence notifications when you walk into your office, remind you to grab the groceries when you’re near the supermarket. All you need is a single GPS coordinate to start.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">6. Verify a delivery is actually at your door</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Some delivery apps now share the courier’s live coordinates. If a driver claims “delivered” but the package never arrived, comparing their reported drop-off coordinates to your home coordinates can prove the package was left at the wrong address — useful evidence in a refund claim.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">7. Geocaching — the world’s biggest treasure hunt</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Over three million “caches” are hidden around the world, each pinpointed by a precise GPS coordinate. Players use the coordinate alone — no other directions — to find a hidden container, log their visit, and sometimes swap small trinkets. It’s the original use case GPS receivers were designed for in the consumer market.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">8. Verify whether a VPN is working</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Connect to a VPN claiming to be in Tokyo, then open <Link to="/" className="text-electric-400 hover:underline">GetMyLocations</Link> and decline the precise GPS prompt. The IP-only fallback should now place you near Tokyo. If your real city shows instead, the VPN has a leak — useful information before doing anything that depends on the VPN actually working.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">9. Plot weather stations and microclimates</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Personal weather stations from Davis, Tempest, and Ambient need exact GPS coordinates during setup so the public weather network knows where they’re measuring from. Hyperlocal forecasting and agriculture both depend on dense networks of coordinate-tagged sensors.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">10. Precision agriculture</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Modern tractors use centimeter-accurate GPS to drive themselves along perfectly parallel rows, drop fertilizer on the exact square meter where soil samples flagged a deficiency, and stop seeding the moment they cross a known “bad” patch. The savings on inputs (water, seed, fertilizer) regularly hit double-digit percentages — a direct consequence of GPS coordinates getting cheap and precise.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Bonus: pinpoint your house from a screenshot</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Selling a property privately? Sharing the listing photo with the coordinates pasted underneath lets buyers click straight into Google Maps Street View — no address, no leak of full identifying info, but enough for serious lookers to evaluate the neighborhood.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">How to grab a coordinate, fast</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Need a coordinate right now for any of the above? Open <Link to="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link>. Approve the location prompt, and you’ll have a six-decimal-precision latitude/longitude in two seconds — copy it to your clipboard with one click. The interactive map confirms you’re looking at the right place before you save or share.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Want more?</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        For the “why” behind these numbers, read our beginner-friendly explainer on <Link to="/blog/latitude-vs-longitude-explained" className="text-electric-400 hover:underline">latitude vs longitude</Link>, the deeper dive into <Link to="/blog/how-gps-works" className="text-electric-400 hover:underline">how GPS works</Link>, or the comparison of <Link to="/blog/what-is-ip-location-and-how-accurate" className="text-electric-400 hover:underline">IP location vs GPS</Link>.
      </p>
    </article>
  );
}
