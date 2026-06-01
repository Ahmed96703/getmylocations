import { Link } from 'react-router-dom';

export default function HowToShareGpsLocationSafely() {
  return (
    <article className="prose-invert">
      <p className="text-lg text-slate-300/90 leading-relaxed">
        Sharing your live location used to be a niche thing &mdash; something you did when you were lost and your friend had a paper map open. Today it powers ride pickups, late-night walks home, family check-ins, hiking buddies, and the &ldquo;I&apos;m five minutes away&rdquo; messages that have replaced the &ldquo;running late&rdquo; phone call. But every method makes different privacy trade-offs, and the wrong choice can leak more about you than you realize.
      </p>

      <p className="mt-4 text-slate-300/90 leading-relaxed">
        This guide walks through the six common ways to share your GPS location &mdash; iMessage, WhatsApp, Google Maps, Find My, plus-codes, and copy-paste of raw coordinates &mdash; and explains the safety and privacy trade-offs of each. By the end you&apos;ll know which method to reach for in which situation.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">A 30-second mental model</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Every location-sharing method answers four questions:
      </p>
      <ol className="mt-3 space-y-2 text-slate-300/90 list-decimal list-inside">
        <li><strong>Who can see it?</strong> One person, a chat thread, a public link, or an entire account?</li>
        <li><strong>How long?</strong> A one-shot pin, 15 minutes, until end-of-day, or forever-until-you-revoke?</li>
        <li><strong>How precise?</strong> The exact device coordinate, a coarsened &ldquo;~1 km&rdquo; bubble, or a static pin?</li>
        <li><strong>Live or static?</strong> A snapshot that won&apos;t update vs a moving dot that follows you in real time?</li>
      </ol>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Whenever you share, run through these four. The right method is whichever <em>minimum</em> answers the situation actually needs.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">1. iMessage / Apple Find My</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        On iPhone you have two options that look similar but behave differently. <strong>Send My Current Location</strong> drops a static pin into the chat &mdash; one-shot, won&apos;t update. <strong>Share My Location</strong> creates a live-tracking link that updates in the recipient&apos;s Maps app for the duration you pick: one hour, until end of day, or indefinitely.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Find My (the dedicated app) is the more durable system. Adding someone as a Find My friend creates an indefinite share that lives outside any chat, survives device wipes, and works between Apple accounts even when no message has been exchanged. Most family location-sharing setups live here.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        <strong>Privacy notes:</strong> iMessage and Find My are end-to-end encrypted between Apple devices, meaning Apple can&apos;t read the underlying coordinates. The downside is the recipient&apos;s phone caches a copy &mdash; if their device is compromised or screen-recorded, that&apos;s out of your control.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">2. WhatsApp &mdash; the most common worldwide</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        WhatsApp has two corresponding features. <strong>Send Location</strong> drops a static pin. <strong>Share Live Location</strong> broadcasts your moving position to the chat for 15 minutes, 1 hour, or 8 hours.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        WhatsApp is end-to-end encrypted, so Meta can&apos;t read the contents. But two important caveats: (a) the metadata &mdash; who shared with whom, when, for how long &mdash; is still visible to Meta and may be retained, and (b) iOS and Android both record location-sharing in the device&apos;s share-sheet history, which apps with broad permissions can sometimes see.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        For sharing inside a group chat with multiple people, WhatsApp is usually the safest cross-platform option. Just remember the share continues until the timer expires &mdash; don&apos;t share to a group of 30 if only one person actually needs to find you.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">3. Google Maps location sharing</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        On Android, Google Maps offers a similar 1-hour-to-indefinite live share that uses a Google account as the destination instead of a phone number. It works across Android and iOS as long as both sides have the Maps app.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Maps also supports sending a static pin via any messaging app &mdash; useful when you want to point a friend to a parking spot or a trailhead without exposing your live location. The pin is just a URL like
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">maps.google.com/?q=48.858420,2.294500</code>{' '}
        that opens directly to that coordinate.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        <strong>Privacy notes:</strong> Google Maps live-sharing is <em>not</em> end-to-end encrypted &mdash; the location streams through Google&apos;s servers, which means Google can technically see it. For most uses this is fine; for sensitive situations (journalists, activists, harassment cases) prefer iMessage or Signal.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">4. Signal &mdash; the privacy choice</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Signal supports both static-pin and live-location sharing with the strongest available cryptographic guarantees: end-to-end encryption, no metadata retention beyond what&apos;s strictly required, and forward secrecy if the keys ever leak.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        For one-on-one sharing where you genuinely care about who can see the coordinates &mdash; medical situations, abuse-recovery cases, sources protecting reporters &mdash; Signal is the option of last resort that still works smoothly. The trade-off is that fewer of your contacts have it installed, which sometimes matters more than the security model.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">5. Plus Codes &mdash; the address you can&apos;t Google-search</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Plus Codes (Google&apos;s open-source format, formerly Open Location Codes) are short alphanumeric strings that encode a coordinate. The Eiffel Tower is
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">8FW4V75V+8Q</code>.
        Plus Codes work where there are no street addresses &mdash; rural areas, refugee camps, slums &mdash; and they&apos;re short enough to read over the phone or write on the side of a parcel.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        From a privacy standpoint, a Plus Code is just a static encoding of a coordinate &mdash; it has no privileged metadata and isn&apos;t tracked. Once you give it out, the recipient can paste it into any Maps app to see the spot. They can&apos;t use it to track you &mdash; it&apos;s a permanent label on a place, not a beacon on you.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">6. Raw coordinates &mdash; old-school but universal</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        A pair like
        {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">48.858420, 2.294500</code>{' '}
        is the lowest common denominator. It works in every map app, every navigation system, every emergency dispatcher&apos;s console. It&apos;s the only format guaranteed to work with no app installed, no signup, and no platform lock-in.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Use raw coordinates when you&apos;re sending across ecosystems (Apple to Android to a vehicle&apos;s built-in nav), when you&apos;re writing to long-term notes that should still work in five years, or when you&apos;re communicating with first responders. You can grab your own current coordinates &mdash; in copy-paste-ready DD format &mdash; from <Link to="/" className="text-electric-400 hover:underline">GetMyLocations</Link> in two seconds.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">A safety checklist before you share</h2>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><strong>Pick a duration, not &ldquo;until I cancel.&rdquo;</strong> Set a 1-hour or end-of-day timer. Many privacy incidents come from forgotten shares that ran for weeks.</li>
        <li><strong>Share with one person, not a group.</strong> If only one person needs it, only one person should see it.</li>
        <li><strong>Static pin beats live share.</strong> If you just want to tell someone where you parked, a static pin reveals nothing about your current movement.</li>
        <li><strong>Audit your active shares.</strong> Both iOS Find My and Google Maps have a &ldquo;people who can see your location&rdquo; screen. Open it monthly.</li>
        <li><strong>Don&apos;t post live location in public.</strong> Posting &ldquo;here&rsquo;s where I am right now&rdquo; on social media is a different category of risk &mdash; you&apos;re telling everyone who follows you, including bots and stalkers, that your home is currently empty.</li>
        <li><strong>Beware of links in messages from strangers.</strong> An attacker can send a fake &ldquo;hi here&apos;s where I am&rdquo; link that&apos;s actually a tracking pixel; clicking it leaks <em>your</em> location.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">For emergencies, raw coordinates win</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        911 (US), 112 (Europe), 999 (UK), 15 (Pakistan), and most other emergency dispatchers can take a raw latitude/longitude over the phone. Modern smartphones also send GPS automatically via Advanced Mobile Location (AML) when you dial an emergency number, but having a backup &mdash; reading your coordinates yourself off a screen &mdash; is invaluable when AML hasn&apos;t propagated or you&apos;re calling from a landline.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        For a complete walkthrough of emergency GPS use, see our guide to <Link to="/blog/gps-coordinates-emergencies-aml-guide" className="text-electric-400 hover:underline">GPS coordinates in emergencies</Link>.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Grab a shareable coordinate now</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Open <Link to="/" className="text-electric-400 hover:underline font-semibold">GetMyLocations</Link>, click Allow, and your current latitude and longitude appear at the top of the dashboard. One click copies them in the format any app understands. From there you can paste into iMessage, WhatsApp, Maps, Signal, or any other tool above.
      </p>
    </article>
  );
}
