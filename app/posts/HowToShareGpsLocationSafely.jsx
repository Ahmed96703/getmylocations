import Link from 'next/link';

export default function HowToShareGpsLocationSafely() {
  return (
    <article className="prose-invert">
      <figure className="mb-8 -mt-2">
        <img
          src="/blog-images/how-to-share-gps-location-safely-hero.jpg"
          alt="Translucent shield protecting a location pin with a soft glow, illustrating safe location sharing"
          className="w-full h-auto rounded-xl"
          loading="eager"
        />
      </figure>
      <p className="text-lg text-fg-muted leading-relaxed">
        Two years ago I shared my live location with a friend on Google
        Maps so she could find a caf&eacute; we&rsquo;d agreed on. We met,
        ate, went home. Three months later I happened to open the
        location-sharing screen for something else and her name was still
        on the list. I&rsquo;d set it to &ldquo;until I turn it off&rdquo;
        and forgotten. She&rsquo;d been able to see where I was, in real
        time, for ninety-odd days. She hadn&rsquo;t looked, because she
        isn&rsquo;t weird. But she could have.
      </p>

      <p className="mt-4 text-fg-muted leading-relaxed">
        The lesson, which I now live by: pick a duration every single
        time you share. Never &ldquo;forever.&rdquo; That one rule prevents
        the most common location-sharing privacy mistake. The rest of
        this guide is the practical stuff &mdash; which app is right for
        which situation, what they actually leak, and a checklist for the
        seconds before you hit Send.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">A short mental model</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Every method of sharing answers four questions. Whenever you&rsquo;re
        about to share, run through them and pick whichever option does
        the <em>minimum</em> the situation actually needs.
      </p>
      <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
        <li><strong>Who sees it?</strong> One person, a chat thread, a public link, or an entire account?</li>
        <li><strong>For how long?</strong> A single static pin, 15 minutes, end-of-day, or open-ended?</li>
        <li><strong>How precise?</strong> The exact device coordinate, a coarsened bubble, or a static pin?</li>
        <li><strong>Live or static?</strong> A snapshot that won&rsquo;t update, or a dot that follows you in real time?</li>
      </ol>

      <h2 className="font-display text-2xl font-bold mt-12">WhatsApp &mdash; the global default</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        For most people on most days, WhatsApp is the right answer.
        <strong> Send Location</strong> drops a static pin into the chat.
        <strong> Share Live Location</strong> broadcasts your moving
        position for 15 minutes, 1 hour, or 8 hours &mdash; no option to
        leave it on indefinitely, which is the friction WhatsApp gets right.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Contents are end-to-end encrypted, so Meta can&rsquo;t read the
        coordinates. Two caveats: (a) the <em>metadata</em> &mdash; who
        shared with whom, when, for how long &mdash; is still visible to
        Meta and may be retained, and (b) both iOS and Android record the
        share in the share-sheet history, which apps with broad
        permissions can sometimes see. For sharing inside a group chat
        with multiple people, WhatsApp is usually the safest cross-platform
        option. Just remember the timer keeps running &mdash; don&rsquo;t
        share to a group of 30 if only one person actually needs it.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">iMessage and Find My (iPhone-only)</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        iPhones have two options that look similar but behave differently.
        <strong> Send My Current Location</strong> drops a static pin into
        the chat &mdash; one-shot, won&rsquo;t update.
        <strong> Share My Location</strong> creates a live-tracking link
        that updates in the recipient&rsquo;s Maps app for the duration
        you pick: one hour, until end of day, or indefinitely (this is the
        one I now refuse to use).
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Find My is the more durable system. Adding someone as a Find My
        friend creates an indefinite share that lives outside any chat,
        survives device wipes, and works between Apple accounts even when
        no message has ever been exchanged. Most family location-sharing
        setups live here. Audit it monthly &mdash; same logic, same trap.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Both are end-to-end encrypted between Apple devices, so Apple
        can&rsquo;t read the underlying coordinates. The recipient&rsquo;s
        phone still caches a copy, which you have no control over if their
        device is compromised.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Google Maps live sharing</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Google Maps offers a 1-hour-to-indefinite live share that uses a
        Google account as the destination instead of a phone number. It
        works across Android and iOS as long as both sides have the Maps
        app. Maps also supports sending a static pin via any messaging
        app &mdash; useful for pointing a friend at a parking spot or a
        trailhead without exposing your live location. The pin is just a
        URL like
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">maps.google.com/?q=48.858420,2.294500</code>{' '}
        that opens straight to that coordinate.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Important: Google Maps live sharing is <em>not</em> end-to-end
        encrypted &mdash; the coordinate streams through Google&rsquo;s
        servers, where Google can technically read it. For sensitive cases
        (journalists, activists, harassment) prefer iMessage or Signal.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Signal &mdash; the option of last resort that still works smoothly</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Signal supports both static-pin and live-location sharing with the
        strongest cryptographic guarantees available in a mainstream
        messaging app: end-to-end encryption, no metadata retention beyond
        what&rsquo;s strictly necessary, forward secrecy if keys ever
        leak. For one-on-one sharing where you genuinely care who can see
        the coordinates &mdash; medical situations, abuse-recovery cases,
        sources protecting reporters &mdash; this is the right tool.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The trade-off is that fewer of your contacts have it installed,
        which sometimes matters more than the security model does.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Plus Codes &mdash; addresses where addresses don&rsquo;t exist</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Plus Codes (Google&rsquo;s open-source format, formerly called Open
        Location Codes) are short alphanumeric strings that encode a
        coordinate. The Eiffel Tower is
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">8FW4V75V+8Q</code>.
        They work where there are no street addresses &mdash; rural areas,
        refugee camps, parts of Karachi where the postal system never
        properly covered &mdash; and they&rsquo;re short enough to read
        aloud or write on the side of a parcel.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        From a privacy standpoint a Plus Code is just a static encoding of
        a coordinate. It has no metadata and isn&rsquo;t tracked. Once you
        share one, the recipient can paste it into any Maps app to see
        the spot. They can&rsquo;t use it to track you &mdash; it&rsquo;s
        a permanent label on a place, not a beacon on you.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Raw coordinates &mdash; old-school, universal, still the best fallback</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        A pair like
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">24.860422, 67.001137</code>{' '}
        is the lowest common denominator. It works in every map app, every
        car navigation system, every emergency dispatcher&rsquo;s console.
        It&rsquo;s the only format guaranteed to work with no app
        installed, no signup, and no platform lock-in.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Use raw coordinates when you&rsquo;re sending across ecosystems
        (Apple to Android to a car&rsquo;s built-in nav), when you&rsquo;re
        writing into long-term notes that should still work in five
        years, or when you&rsquo;re communicating with first responders.
        You can grab your own current coordinates &mdash; in
        copy-paste-ready DD format &mdash; from
        {' '}<Link href="/" className="text-accent hover:underline">GetMyLocations</Link>{' '}
        in two seconds.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">A safety checklist for the moment before you hit Send</h2>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li><strong>Pick a duration, never &ldquo;until I cancel.&rdquo;</strong> Set 1 hour or end-of-day. The story I opened this article with is what happens otherwise.</li>
        <li><strong>One person, not a group.</strong> If only one person needs to find you, only one person should see you.</li>
        <li><strong>Prefer a static pin when you can.</strong> If you just want to tell someone where you parked, a static pin reveals nothing about your current movement.</li>
        <li><strong>Audit your active shares monthly.</strong> Both iOS Find My and Google Maps have a &ldquo;people who can see your location&rdquo; screen. Open it on the first of every month.</li>
        <li><strong>Don&rsquo;t post live location publicly.</strong> Posting &ldquo;here&rsquo;s where I am&rdquo; on social media tells everyone who follows you &mdash; including bots and stalkers &mdash; that your home is currently empty.</li>
        <li><strong>Be wary of unsolicited location links.</strong> An attacker can send a fake &ldquo;hi, here&rsquo;s where I am&rdquo; link that&rsquo;s actually a tracking pixel; clicking it leaks <em>your</em> location.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">For emergencies, raw coordinates still win</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        911 (US), 112 (Europe), 999 (UK), 15 (Pakistan), and most other
        emergency dispatchers can take a raw latitude/longitude over the
        phone. Modern smartphones also send GPS automatically via Advanced
        Mobile Location when you dial &mdash; but having a backup, the
        coordinates you&rsquo;ve read off your own screen, is invaluable
        when AML hasn&rsquo;t propagated or the call is from a landline.
        Full walk-through:
        {' '}<Link href="/blog/gps-coordinates-emergencies-aml-guide" className="text-accent hover:underline">GPS coordinates in emergencies</Link>.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Grab a coordinate now</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Open
        {' '}<Link href="/" className="text-accent hover:underline font-semibold">GetMyLocations</Link>,
        click Allow, and your current latitude and longitude appear at the
        top of the dashboard. One click copies them in the format every
        app accepts. From there it pastes into iMessage, WhatsApp, Maps,
        Signal, or any of the others above.
      </p>
    </article>
  );
}
