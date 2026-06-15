import Link from 'next/link';

const faqs = [
  {
    q: 'What is the safest way to share my live location with one person?',
    a: 'Signal is the strongest mainstream choice — end-to-end encrypted, no metadata retention, with both static-pin and live-location sharing. WhatsApp is a close second and far more likely to be installed by the person you are sharing with. iMessage works between Apple users with similar guarantees. Avoid Google Maps live sharing for sensitive cases — the coordinate stream is not end-to-end encrypted.',
  },
  {
    q: 'How do I stop sharing my live location after I have already started?',
    a: 'On WhatsApp, open the chat, tap your active live-location card, and choose "Stop sharing." On iMessage, open the contact card and tap "Stop Sharing My Location" (or remove them from Find My). In Google Maps, tap your profile → Location sharing → tap the person → Stop. In Signal, the share auto-expires; tap the share message to end it sooner. Always open the share-management screen monthly to catch ones you forgot.',
  },
  {
    q: 'Is WhatsApp live location end-to-end encrypted?',
    a: 'Yes — the coordinate stream itself is encrypted so Meta cannot read it. What is not encrypted is the metadata: who is sharing with whom, when, and for how long. For day-to-day sharing that is usually fine; for sensitive cases (journalists, activists, abuse-recovery), Signal is a stricter choice that retains less metadata.',
  },
  {
    q: 'Can someone track me with a location link I clicked?',
    a: 'A genuine location share works the other way — you receive someone’s coordinates, not give yours. But fake "here is where I am" links sent by attackers can be tracking pixels that record your IP and approximate location the moment you open them. Treat unexpected location messages from unknown numbers exactly like unexpected attachments: do not open. Real shares from people you know usually appear inline in the messaging app, not as bare URLs.',
  },
  {
    q: 'What happens if I share my location "until I turn it off"?',
    a: 'It stays active until you remember to revoke it — which, in practice, often means months. Find My, Google Maps, and iMessage all offer this option and all of them are how people accidentally share their live location for far longer than they intended. The single rule worth following: always pick a duration. One hour, end-of-day, eight hours. Never indefinite.',
  },
  {
    q: 'Should I share live location or a static pin?',
    a: 'Default to a static pin. If you only need someone to find a meeting spot, a parked car, or a trailhead, a one-shot coordinate reveals nothing about your movements. Live sharing is the right tool when the other person needs to know when you arrive, when you are running late, or for safety walks home — but it is overkill for "I am at the coffee shop on Main Street."',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const comparison = [
  { app: 'WhatsApp', e2e: 'Yes', durations: '15 min · 1 hr · 8 hr', cross: 'iOS / Android', best: 'Cross-platform default' },
  { app: 'iMessage', e2e: 'Yes (Apple-to-Apple)', durations: '1 hr · end of day · indefinite', cross: 'Apple only', best: 'Apple-to-Apple family' },
  { app: 'Find My', e2e: 'Yes (Apple-to-Apple)', durations: '1 hr · end of day · indefinite', cross: 'Apple only', best: 'Long-term family setups' },
  { app: 'Google Maps', e2e: 'No', durations: '1 hr → indefinite', cross: 'iOS / Android', best: 'Casual + non-sensitive' },
  { app: 'Signal', e2e: 'Yes (strongest)', durations: 'Static + live', cross: 'iOS / Android / desktop', best: 'Sensitive / journalists' },
  { app: 'Raw coordinates', e2e: 'N/A (no live stream)', durations: 'Static only', cross: 'Universal', best: 'Cross-ecosystem, long-term' },
];

export default function HowToShareGpsLocationSafely() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
        copy-paste-ready DD format &mdash; from the{' '}
        <Link href="/my-location" className="text-accent hover:underline">My Location tool</Link>{' '}
        or the{' '}
        <Link href="/gps-coordinates" className="text-accent hover:underline">GPS Coordinates page</Link>{' '}
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

      <h2 className="font-display text-2xl font-bold mt-12">The apps compared, in one table</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Six common ways to share a location, ordered roughly from
        &ldquo;use this by default&rdquo; to &ldquo;use this when you
        need maximum control.&rdquo; End-to-end encryption protects the
        coordinate itself from the platform; it doesn&rsquo;t protect
        you from a careless recipient or a long-running share you forgot
        about.
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-tint/5 text-left text-fg-muted">
              <th className="px-3 py-2 font-semibold">App</th>
              <th className="px-3 py-2 font-semibold">End-to-end</th>
              <th className="px-3 py-2 font-semibold">Durations</th>
              <th className="px-3 py-2 font-semibold">Platforms</th>
              <th className="px-3 py-2 font-semibold">Best for</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.app} className="border-t border-line-subtle">
                <td className="px-3 py-2 text-fg font-semibold">{row.app}</td>
                <td className="px-3 py-2 text-fg-muted">{row.e2e}</td>
                <td className="px-3 py-2 text-fg-muted">{row.durations}</td>
                <td className="px-3 py-2 text-fg-muted">{row.cross}</td>
                <td className="px-3 py-2 text-fg-muted">{row.best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="font-display text-2xl font-bold mt-12">How to stop a share you already sent</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Revoking is the step everyone forgets. Each app exposes the same
        action behind a slightly different door &mdash; here is exactly
        where each one lives.
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li>
          <strong>WhatsApp.</strong> Open the chat you shared into, tap
          the live-location card, then <em>Stop sharing</em>. Or open
          Settings → Privacy → Live location to see every chat where the
          timer is still running and stop them in bulk.
        </li>
        <li>
          <strong>iMessage.</strong> Open the conversation, tap the
          contact&rsquo;s name at the top, scroll to the location card,
          and tap <em>Stop Sharing My Location</em>. For Find My,
          open the Find My app → People → tap the person → <em>Stop
          Sharing My Location</em>.
        </li>
        <li>
          <strong>Google Maps.</strong> Tap your profile picture →
          Location sharing. The list shows everyone who can currently see
          you. Tap each person and choose <em>Stop</em>. The share dies
          immediately on their end.
        </li>
        <li>
          <strong>Signal.</strong> Tap your most recent location share
          message, then <em>End share</em>. Signal shares also expire
          automatically at the duration you set.
        </li>
        <li>
          <strong>Find My family group.</strong> Settings → your name →
          Family Sharing → Location Sharing → tap each member to toggle.
          The family share is the most likely to have been on for years
          without a review.
        </li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Put a recurring 60-second calendar event on the first of every
        month called &ldquo;audit location shares.&rdquo; That single
        habit catches everything the urgency of the moment encourages
        you to forget.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">What the recipient actually sees</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        It is worth knowing exactly what lands on the other person&rsquo;s
        screen, because the experience is different in each app:
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li>
          <strong>WhatsApp:</strong> a map card inside the chat with a
          live pin that updates as you move and a countdown showing time
          remaining. Tapping it opens a full-screen view in Maps.
        </li>
        <li>
          <strong>iMessage:</strong> a card that opens directly in
          Apple Maps with a live pin. The recipient can choose to share
          back, giving you their location too.
        </li>
        <li>
          <strong>Google Maps:</strong> a notification in the recipient&rsquo;s
          Maps app and an entry under the &ldquo;Shared with you&rdquo;
          tab. No expiry banner unless you set one.
        </li>
        <li>
          <strong>Signal:</strong> a static or live map inside the chat,
          identical to other Signal media &mdash; no separate app launch.
        </li>
        <li>
          <strong>Raw coordinates:</strong> a hyperlink (eg.{' '}
          <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">maps.google.com/?q=24.86,67.00</code>)
          that opens the recipient&rsquo;s default maps app to a single pin.
          No tracking, no expiry, no platform lock-in.
        </li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        If the person you are sharing with is on a different platform
        than you, the experience often degrades to a plain coordinate
        link &mdash; which, fortunately, every modern maps app on Earth
        knows how to open. Our{' '}
        <Link href="/coordinates-converter" className="text-accent hover:underline">coordinates converter</Link>{' '}
        can translate between formats if the recipient&rsquo;s app only
        accepts DMS or UTM.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Frequently asked questions</h2>
      <div className="glass mt-4 rounded-2xl divide-y divide-line-subtle not-prose">
        {faqs.map((f) => (
          <details key={f.q} className="group p-5">
            <summary className="flex items-center justify-between cursor-pointer list-none font-semibold">
              {f.q}
              <span className="text-accent group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
            </summary>
            <p className="mt-3 text-fg-muted text-sm leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>

      <h2 className="font-display text-2xl font-bold mt-12">Grab a coordinate now</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Open the{' '}
        <Link href="/my-location" className="text-accent hover:underline font-semibold">My Location tool</Link>,
        click Allow, and your current latitude and longitude appear at the
        top of the dashboard. One click copies them in the format every
        app accepts. From there it pastes into iMessage, WhatsApp, Maps,
        Signal, or any of the others above. If you want a continuously
        updating reading instead of a snapshot, the{' '}
        <Link href="/live-location" className="text-accent hover:underline">Live Location tracker</Link>{' '}
        keeps refreshing as you move.
      </p>
    </article>
    </>
  );
}
