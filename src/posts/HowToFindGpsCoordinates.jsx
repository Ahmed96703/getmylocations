import { Link } from 'react-router-dom';

export default function HowToFindGpsCoordinates() {
  return (
    <article className="prose-invert">
      <p className="text-lg text-slate-300/90 leading-relaxed">
        Whether you’re sharing your exact spot with a rescue team, tagging a fishing hole, or just curious about your true position on Earth, knowing how to read your GPS coordinates is a surprisingly useful skill. This guide walks you through the fastest ways to find your latitude and longitude on any device — plus how to interpret the numbers and when to trust them.
      </p>

      <p className="mt-4 text-slate-300/90 leading-relaxed">
        The fastest path: open <Link to="/" className="text-electric-400 hover:underline">GetMyLocations</Link>, allow the browser’s location prompt, and your exact coordinates appear in under two seconds. But if you’d rather use a native app or your phone’s built-in tools, every method below works.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What are GPS coordinates, in 30 seconds?</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        GPS coordinates pinpoint any spot on Earth using two numbers: <strong>latitude</strong> (how far north or south of the equator you are) and <strong>longitude</strong> (how far east or west of the prime meridian). Most modern devices report them in <strong>WGS-84 decimal degrees</strong> — for example, <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400">40.712776, -74.005974</code> points to Lower Manhattan.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The decimals matter. Five decimal places puts you within ~1 meter; three decimals widens to about 100 meters. If you’re sharing a hiking spot, use at least six.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Method 1 — Any web browser (fastest)</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The browser’s built-in Geolocation API combines GPS (if available), Wi-Fi triangulation, and IP signals to estimate your position in seconds. No installs, no signup.
      </p>
      <ol className="mt-3 list-decimal list-inside space-y-1.5 text-slate-300/90">
        <li>Open <Link to="/" className="text-electric-400 hover:underline">GetMyLocations</Link> in Chrome, Safari, Firefox, or Edge.</li>
        <li>Click <strong>Allow</strong> on the location permission prompt.</li>
        <li>Read your latitude, longitude, accuracy, city, and country from the dashboard.</li>
        <li>Click <strong>Copy Coordinates</strong> to share them anywhere.</li>
      </ol>
      <p className="mt-3 text-sm text-slate-400">
        Tip: accuracy improves dramatically near a window or outdoors, because Wi-Fi access points used for triangulation are more visible.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Method 2 — iPhone & iPad</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        iOS doesn’t expose coordinates directly in the Maps app interface, but the Compass app does.
      </p>
      <ol className="mt-3 list-decimal list-inside space-y-1.5 text-slate-300/90">
        <li>Open <strong>Settings → Privacy &amp; Security → Location Services</strong> and make sure it’s on. Enable <strong>Compass</strong>.</li>
        <li>Open the <strong>Compass</strong> app (pre-installed on every iPhone).</li>
        <li>Your latitude, longitude, and elevation appear at the bottom of the screen.</li>
      </ol>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Alternatively, drop a pin in <strong>Apple Maps</strong> on your current location, then scroll up on the pin’s card — coordinates appear under the address.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Method 3 — Android</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Android exposes coordinates through Google Maps in two clicks.
      </p>
      <ol className="mt-3 list-decimal list-inside space-y-1.5 text-slate-300/90">
        <li>Open <strong>Google Maps</strong>.</li>
        <li>Tap and hold on the blue dot showing your current location.</li>
        <li>A red pin drops and your coordinates appear in the search bar at the top.</li>
        <li>Tap the coordinates to copy them.</li>
      </ol>

      <h2 className="font-display text-2xl font-bold mt-12">Method 4 — Mac (macOS)</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        On a Mac without GPS hardware, browsers fall back to Wi-Fi triangulation — usually accurate within 30-50 meters in urban areas.
      </p>
      <ol className="mt-3 list-decimal list-inside space-y-1.5 text-slate-300/90">
        <li>Open <Link to="/" className="text-electric-400 hover:underline">GetMyLocations</Link> in Safari or Chrome.</li>
        <li>Approve the location permission.</li>
        <li>Coordinates display instantly.</li>
      </ol>

      <h2 className="font-display text-2xl font-bold mt-12">Method 5 — Windows 10/11</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Windows uses its <strong>Location Service</strong> (a mix of Wi-Fi, IP, and any built-in GPS).
      </p>
      <ol className="mt-3 list-decimal list-inside space-y-1.5 text-slate-300/90">
        <li>Open <strong>Settings → Privacy &amp; security → Location</strong> and enable it.</li>
        <li>Open the pre-installed <strong>Maps</strong> app and click the location-arrow icon — your coordinates appear at the bottom.</li>
        <li>Or simply open <Link to="/" className="text-electric-400 hover:underline">GetMyLocations</Link> in Edge or Chrome.</li>
      </ol>

      <h2 className="font-display text-2xl font-bold mt-12">How accurate are GPS coordinates, really?</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Accuracy depends entirely on what signals your device can see:
      </p>
      <ul className="mt-3 space-y-1.5 text-slate-300/90 list-disc list-inside">
        <li><strong>Phone with GPS, outdoors:</strong> 3-5 meter accuracy.</li>
        <li><strong>Phone with GPS, indoors:</strong> 10-50 meters (the building blocks satellite signals).</li>
        <li><strong>Laptop without GPS, near Wi-Fi:</strong> 20-50 meters.</li>
        <li><strong>Laptop on VPN / desktop without Wi-Fi:</strong> often 5-50 km (city-level IP guess).</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        If your reported accuracy on <Link to="/" className="text-electric-400 hover:underline">GetMyLocations</Link> is over 500 meters, step outside or disable your VPN for a much better fix.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Privacy: who sees your coordinates?</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        When you grant location permission to a website, your browser sends coordinates <em>only</em> to that page’s JavaScript — not to Google, not to any third party. GetMyLocations runs entirely in your browser; your coordinates are never transmitted to a server we control. The only outbound request is to a free reverse-geocoding API to translate latitude/longitude into a city name, and that lookup carries no identifying information.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Always check that the site is HTTPS (the lock icon) before allowing location, and revoke the permission anytime via your browser’s site settings.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Common uses for GPS coordinates</h2>
      <ul className="mt-3 space-y-1.5 text-slate-300/90 list-disc list-inside">
        <li>Sharing your exact location with emergency services or friends</li>
        <li>Geotagging photos that lost their EXIF data</li>
        <li>Pin-pointing remote spots (campsites, hiking landmarks, fishing holes) that lack addresses</li>
        <li>Testing geolocation features in software you’re building</li>
        <li>Verifying that a VPN or location-spoofer is actually working</li>
        <li>Calculating exact distance between two places</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">Frequently asked questions</h2>

      <h3 className="font-semibold text-lg mt-6 text-slate-100">Can I find my GPS coordinates without an internet connection?</h3>
      <p className="mt-2 text-slate-300/90 leading-relaxed">
        Yes — your phone’s GPS chip works without internet. Use the Compass app on iPhone or any offline GPS app on Android. Browser-based tools, however, require connectivity to call the geolocation API.
      </p>

      <h3 className="font-semibold text-lg mt-6 text-slate-100">Why does my location look wrong by several kilometers?</h3>
      <p className="mt-2 text-slate-300/90 leading-relaxed">
        Most likely your browser fell back to IP geolocation, which only knows your ISP’s nearest server. Step near a window so Wi-Fi triangulation kicks in, or use a device with a GPS chip.
      </p>

      <h3 className="font-semibold text-lg mt-6 text-slate-100">Is it safe to share my coordinates online?</h3>
      <p className="mt-2 text-slate-300/90 leading-relaxed">
        For one-off sharing (e.g. with a friend) it’s fine. Avoid publishing precise coordinates of your home or a child’s school on social media — anyone can plug them into Maps. Round to two or three decimals to reduce precision when posting publicly.
      </p>

      <h3 className="font-semibold text-lg mt-6 text-slate-100">What’s the difference between GPS and IP location?</h3>
      <p className="mt-2 text-slate-300/90 leading-relaxed">
        GPS uses satellites and is accurate to a few meters. IP location guesses your position from your network address and is typically accurate only to the city or even the country level. GetMyLocations combines both for the best possible result.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Try it now</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Ready to find your exact coordinates? Open the free <Link to="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link> tool, allow the location prompt, and you’ll see your latitude, longitude, city, and country in under two seconds — no signup, no tracking, completely free.
      </p>
    </article>
  );
}
