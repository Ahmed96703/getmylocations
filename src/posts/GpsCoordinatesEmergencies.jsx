import { Link } from 'react-router-dom';

export default function GpsCoordinatesEmergencies() {
  return (
    <article className="prose-invert">
      <p className="text-lg text-slate-300/90 leading-relaxed">
        Knowing how to read and share your own GPS coordinates is one of those skills that nobody teaches but everyone eventually needs. The 911 dispatcher whose address-lookup is failing, the hiker whose injury is two valleys away from the trailhead, the parent in a foreign city explaining where to send an ambulance &mdash; in all of these, two numbers solve in seconds what a paragraph of directions can&apos;t. This guide explains how emergency services use coordinates, what Advanced Mobile Location (AML) does automatically, when to read coordinates yourself, and how to do it on whichever device you have.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">How emergency dispatchers use coordinates</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Every modern dispatch center (PSAP, public safety answering point) has a computer-aided dispatch (CAD) system with a built-in map. When a coordinate is entered &mdash; either manually by the dispatcher or automatically from AML &mdash; the map zooms straight to the spot, overlays the nearest streets, and routes the closest available response unit. The whole pipeline, from coordinate received to ambulance dispatched, can take under a minute in well-equipped centers.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The dispatcher&apos;s console is also doing reverse geocoding behind the scenes: turning the coordinate back into a human-readable address (&ldquo;14th and Main, opposite the pharmacy&rdquo;) so the responding crew can call out a destination over the radio. This is why supplying a coordinate is more useful than just saying &ldquo;the corner of 14th and Main&rdquo; &mdash; the coordinate is the canonical reference, the address text is derived.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Advanced Mobile Location (AML) &mdash; what your phone does automatically</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Since the late 2010s, both iOS (under the name Hybridized Emergency Location, HELO) and Android have shipped <strong>Advanced Mobile Location</strong>. The instant you dial an emergency number, the phone:
      </p>
      <ol className="mt-3 space-y-2 text-slate-300/90 list-decimal list-inside">
        <li>Temporarily turns on GPS, Wi-Fi, and cellular positioning at maximum accuracy.</li>
        <li>Computes the best available location fix within a few seconds.</li>
        <li>Transmits the coordinates &mdash; along with accuracy estimate &mdash; to the dispatcher over a secure side-channel.</li>
        <li>Stops the elevated positioning when you hang up.</li>
      </ol>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        AML works without the caller doing anything. It works whether the user has granted location permission to any app or not &mdash; emergency calls bypass the normal permission model. It works in airplane mode if cellular for the emergency call itself comes back up.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Coverage is uneven. AML is mandatory in most EU member states, the UK, Australia, New Zealand, and is rolled out in many US states under the Next Generation 911 (NG911) program. Pakistan&apos;s 15 service and India&apos;s 112 are adopting it incrementally. The official ITU-T E.161 list tracks which countries have switched on the receiving infrastructure.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">When AML isn&apos;t enough &mdash; and you need to read coordinates yourself</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        AML covers most cases but fails in several common scenarios where having a manual backup is invaluable:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><strong>Calling from a landline.</strong> AML is a smartphone feature. Landline emergency calls still rely on the registered service address, which may be outdated.</li>
        <li><strong>Calling from a third-party VoIP service.</strong> WhatsApp calls to emergency numbers, Skype calls, and some carrier-VoIP setups don&apos;t carry AML.</li>
        <li><strong>The country hasn&apos;t deployed it.</strong> Many regions, especially in central Asia, Africa, and parts of the Americas, don&apos;t yet receive AML.</li>
        <li><strong>The dispatcher&apos;s system is down or backed up.</strong> Even where AML is deployed, a dispatcher overwhelmed in a major incident may need to confirm the coordinate verbally with you.</li>
        <li><strong>You&apos;re reporting an emergency for someone else.</strong> AML reports the calling phone&apos;s location, not the location of the actual incident. If you&apos;re calling from a kilometer away, you need to verbally relay the incident&apos;s coordinates.</li>
        <li><strong>Maritime, aviation, or wilderness emergencies.</strong> Dispatchers for the coast guard or mountain rescue typically want coordinates spoken or transmitted by satellite messenger, regardless of phone-side automation.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">How to read your coordinates fast &mdash; per device</h2>

      <h3 className="font-display text-lg font-semibold mt-6 text-slate-100">iPhone</h3>
      <ol className="mt-2 space-y-2 text-slate-300/90 list-decimal list-inside">
        <li>Open Apple Maps.</li>
        <li>Tap the blue location dot.</li>
        <li>Swipe up on the info panel that appears. The coordinates are listed under &ldquo;My Location&rdquo;.</li>
        <li>Long-press to copy.</li>
      </ol>
      <p className="mt-2 text-slate-300/90 leading-relaxed">
        Alternative: open the Compass app. Coordinates appear at the bottom of the screen with three-decimal precision.
      </p>

      <h3 className="font-display text-lg font-semibold mt-6 text-slate-100">Android</h3>
      <ol className="mt-2 space-y-2 text-slate-300/90 list-decimal list-inside">
        <li>Open Google Maps.</li>
        <li>Long-press anywhere on the map at your location &mdash; a red pin appears.</li>
        <li>The coordinates appear in the search bar at the top.</li>
        <li>Tap to copy.</li>
      </ol>

      <h3 className="font-display text-lg font-semibold mt-6 text-slate-100">Any browser</h3>
      <p className="mt-2 text-slate-300/90 leading-relaxed">
        Open <Link to="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link>. Click Allow on the location prompt. Coordinates appear immediately at the top of the dashboard with one-click copy.
      </p>

      <h3 className="font-display text-lg font-semibold mt-6 text-slate-100">Garmin or dedicated GPS unit</h3>
      <p className="mt-2 text-slate-300/90 leading-relaxed">
        Most outdoor handhelds have a &ldquo;Where am I?&rdquo; menu that displays current coordinates and an emergency mode that simplifies the screen to just the coordinates and a panic button.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">How to communicate coordinates over the phone</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Two formats are common; either works with most dispatchers but they should be told which one you&apos;re reading:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><strong>Decimal degrees</strong> &mdash; &ldquo;forty-eight point eight five eight four, two point two nine four five&rdquo;.</li>
        <li><strong>Degrees, minutes, seconds</strong> &mdash; &ldquo;forty-eight degrees, fifty-one minutes, thirty seconds North; two degrees, seventeen minutes, forty seconds East&rdquo;.</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Speak slowly and read each digit individually (&ldquo;eight five eight four&rdquo;, not &ldquo;eight thousand five hundred eighty-four&rdquo;) &mdash; dispatchers are trained to write digits, and a mishearing on a single digit can put rescue 100 meters off. Repeat the full coordinate back when they read it back to confirm.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What3Words and other shortcuts</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Several services tag 3-meter squares of the world with memorable codes. <strong>What3Words</strong> assigns three random words to each square (&ldquo;filled.count.soap&rdquo;); <strong>Plus Codes</strong> use a short alphanumeric format. Some emergency services accept either &mdash; the UK&apos;s 999 service supports both What3Words and AML.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The honest advice: in an emergency, prefer raw coordinates over any branded format. Decimal degrees are universally understood; What3Words requires the dispatcher to have the company&apos;s lookup tool open and the call to be in English (or the right localized word list).
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Pre-emergency checklist</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Things to do before you ever need this:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li>Make sure GPS / Location Services is enabled at the OS level. This is required for AML to work.</li>
        <li>Verify your phone&apos;s emergency contact settings (iOS Medical ID, Android emergency information). These are visible from the lock screen and can save dispatchers another step.</li>
        <li>Know which emergency number to dial &mdash; this isn&apos;t always 911. EU: 112. UK: 999. Pakistan: 15. India: 112. Australia: 000.</li>
        <li>For wilderness work, carry a satellite messenger (Garmin inReach, ZOLEO, Apple Emergency SOS via satellite on iPhone 14+) that works where there&apos;s no cellular.</li>
        <li>If you frequently travel internationally, install the regional emergency app of the country you visit &mdash; many have one (e.g. EU&apos;s 112 app, Germany&apos;s Nora).</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">Reporting someone else&apos;s emergency</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        If you witness an emergency that isn&apos;t happening to you &mdash; a road accident a few meters away, a hiker injured at a known coordinate &mdash; AML sends <em>your</em> location, not the incident&apos;s. Always verbally confirm the incident location separately, ideally with a coordinate you&apos;ve read off your own device after walking close to the spot.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        For accidents on a highway, naming the kilometer marker on the nearest mile-post is often the fastest reference. For events inside large parks or campuses, a coordinate beats the address of the main entrance.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Practice once when you don&apos;t need it</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The single most useful thing you can do is read your coordinates off your phone, right now, in a low-stakes moment. Open <Link to="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link>, see the numbers, get a feel for what &ldquo;48.858420, 2.294500&rdquo; looks and sounds like, and the next time you need to do it for real it&apos;ll take you ten seconds instead of two minutes.
      </p>
    </article>
  );
}
