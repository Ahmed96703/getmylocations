import Link from 'next/link';
import BlogImage from '../components/BlogImage.jsx';

const faqs = [
  {
    q: 'What is the safest way to share my live location with one person?',
    a: 'For a live location, WhatsApp is end-to-end encrypted and makes you pick 15 minutes, 1 hour or 8 hours, so it cannot be left on indefinitely. Between iPhones, Apple says it cannot access a location you share in Find My or Messages when both people are on iOS 17 or later. Google Maps and Google Messages location sharing is processed by Google. Signal has no live location; it can send a one-time pin, end-to-end encrypted, which is often all you need.',
  },
  {
    q: 'How do I stop sharing my live location after I have already started?',
    a: 'On WhatsApp, open the chat, tap your active live-location card, and choose "Stop sharing." On iMessage, open the contact card and tap "Stop Sharing My Location" (or remove them from Find My). In Google Maps, tap your profile → Location sharing → tap the person → Stop. A Signal location is a one-time pin, so there is nothing to stop; delete the message if you no longer want it in the chat. On an iPhone, Settings → Privacy & Security → Safety Check shows everyone you share with in one place.',
  },
  {
    q: 'Is WhatsApp live location end-to-end encrypted?',
    a: 'Yes — the coordinate stream itself is encrypted so Meta cannot read it. What is not encrypted is the metadata: who is sharing with whom, when, and for how long. For day-to-day sharing that is usually fine. If metadata matters, send a one-time pin over Signal instead, which is designed to keep as little metadata as possible.',
  },
  {
    q: 'Can someone track me with a location link I clicked?',
    a: 'A genuine location share works the other way — you receive someone’s coordinates, not give yours. But a fake "here is where I am" link can lead to a page that logs your IP address, which usually reveals your city and network, the moment you open it. It only gets your precise position if you tap Allow on a location prompt, so never allow location on a page someone sent you unexpectedly. Treat unexpected location messages from unknown numbers exactly like unexpected attachments: do not open. Real shares from people you know usually appear inline in the messaging app, not as bare URLs.',
  },
  {
    q: 'What happens if I share my location "until I turn it off"?',
    a: 'It stays active until you remember to revoke it — which, in practice, often means months. Find My, Messages, Google Maps and Google Messages all offer this option and all of them are how people accidentally share their live location for far longer than they intended. The single rule worth following: always pick a duration. One hour, end-of-day, eight hours. Never indefinite.',
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

// Each row follows the vendor's own documentation, checked 2026-10-05.
const comparison = [
  { app: 'WhatsApp', live: 'Yes', read: 'End-to-end encrypted', durations: '15 min · 1 hr · 8 hr', cross: 'iOS / Android', best: 'Cross-platform default' },
  { app: 'Messages / Find My (Apple)', live: 'Yes', read: 'Not Apple, if both on iOS 17+; Apple keeps it up to 24 h', durations: '1 hr · end of day · indefinitely', cross: 'Apple only', best: 'iPhone-to-iPhone, family' },
  { app: 'Google Maps', live: 'Yes', read: 'Processed by Google', durations: 'Chosen time · until you turn it off', cross: 'iOS / Android', best: 'Casual, cross-platform' },
  { app: 'Google Messages', live: 'Yes', read: 'Processed by Google (via Maps)', durations: '1 hr · today · until off · custom ≤ 24 h', cross: 'Android', best: 'Android chats' },
  { app: 'Signal', live: 'No — one-time pin', read: 'End-to-end encrypted', durations: 'Static only', cross: 'iOS / Android', best: 'Sending a meeting point privately' },
  { app: 'Raw coordinates', live: 'No', read: 'Whoever you send them to', durations: 'Static only', cross: 'Universal', best: 'Cross-ecosystem, emergencies' },
];

export default function HowToShareGpsLocationSafely() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <article className="prose-invert">
      <figure className="mb-8 -mt-2">
        <BlogImage
          src="/blog-images/how-to-share-gps-location-safely-hero.jpg"
          alt="Translucent shield protecting a location pin with a soft glow, illustrating safe location sharing"
          className="w-full h-auto rounded-xl"
          width={1600}
          height={772}
          loading="eager"
          fetchPriority="high"
        />
      </figure>
      <aside className="mb-6 rounded-xl border border-accent/40 bg-accent/5 p-4" aria-label="Quick answer">
        <p className="text-[11px] uppercase tracking-wider text-accent font-semibold">Quick answer</p>
        <p className="mt-1 text-fg leading-relaxed">Share with one person, for a limited time, and stop when you no longer need it. WhatsApp live location lasts 15 minutes, 1 hour, or 8 hours; Google Maps and Apple&rsquo;s Find My let you pick a duration too, so avoid &ldquo;until I turn it off.&rdquo; For a one-off meeting point, send a static pin or raw coordinates instead of a live location. And check who can already see you: on an iPhone, Settings &rarr; Privacy &amp; Security &rarr; Safety Check lists every share in one place.</p>
      </aside>
      <p className="text-lg text-fg-muted leading-relaxed">
        Here is the most common way location sharing goes wrong. You
        share your live location so a friend can find the caf&eacute; you
        agreed on, tap &ldquo;until I turn it off&rdquo; because it is the
        quickest option, meet, and go home. Months later their name is
        still on your sharing list, and for all that time they could have
        seen where you were, in real time. Nobody did anything wrong; the
        share just never ended.
      </p>

      <p className="mt-4 text-fg-muted leading-relaxed">
        The fix is one rule: pick a duration every single time you share. Never &ldquo;forever.&rdquo; That one rule prevents
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
        Meta and may be retained, and (b) everyone in the chat sees the
        live location, so sharing into a group shares with all of its
        members. For sharing inside a group chat
        with multiple people, WhatsApp is usually the safest cross-platform
        option. Just remember the timer keeps running &mdash; don&rsquo;t
        share to a group of 30 if only one person actually needs it.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">iMessage and Find My (iPhone-only)</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        iPhones have two options that look similar but behave differently.
        <strong> Send My Current Location</strong> drops a static pin into
        the chat &mdash; one-shot, won&rsquo;t update.
        <strong> Share My Location</strong> shares your live position for
        the duration you pick: one hour, until end of day, or
        indefinitely (the option to avoid). It appears in the conversation
        and in the recipient&rsquo;s Find My app.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Find My is the more durable system. Adding someone as a Find My
        friend creates a share that lives outside any chat and works
        between Apple accounts even when no message has ever been
        exchanged. Most family location-sharing
        setups live here. Audit it monthly &mdash; same logic, same trap.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        <a href="https://www.apple.com/legal/privacy/data/en/find-my/" target="_blank" rel="noopener" className="text-accent hover:underline">Apple&rsquo;s Find My privacy notice</a> says that if you and the
        person you share with are both on iOS 17 or later, your location
        is not accessible to Apple; with someone on an older version, it
        may be, if they request it. Apple keeps a shared location for up
        to 24 hours to provide the service, then deletes it. The
        recipient&rsquo;s phone still shows it to whoever is holding that
        phone.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Google Maps live sharing</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Google Maps lets you choose how long to share, or pick
        <em> Until you turn this off</em>, and sends the share to a Google
        account instead of a phone number. If you share by link instead,
        Google says the link works for up to 24 hours. It
        works across Android and iOS as long as both sides have the Maps
        app. Maps also supports sending a static pin via any messaging
        app &mdash; useful for pointing a friend at a parking spot or a
        trailhead without exposing your live location. The pin is just a
        URL like
        {' '}<code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">maps.google.com/?q=48.858420,2.294500</code>{' '}
        that opens straight to that coordinate.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Two things to know. <a href="https://support.google.com/maps/answer/15437054" target="_blank" rel="noopener" className="text-accent hover:underline">Google says</a> people you share with can see not
        only your recent location but your name and photo, your phone&rsquo;s
        battery level and whether it is charging, and arrival and departure
        times if they set a notification. And Google does not describe Maps
        sharing as end-to-end encrypted: it processes your location to
        provide the feature, under its privacy policy. For sensitive cases,
        WhatsApp or an iPhone-to-iPhone share on iOS 17 or later keeps the
        location away from the platform.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Google Messages &mdash; live location inside a text chat</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Google Messages on Android can now share your real-time location
        from inside a conversation, for 1 hour, for today only, until you
        turn it off, or for a custom time of up to 24 hours. <a href="https://support.google.com/messages/answer/16929688" target="_blank" rel="noopener" className="text-accent hover:underline">Google is
        explicit</a> about the catch: your messages in that chat may be
        end-to-end encrypted, but the location sharing is powered by
        Google Maps (Find Hub) and processed by Google, so it follows the
        same rules as Maps sharing above.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Signal &mdash; a private pin, not a live location</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Signal can send your current location as a one-time pin, end-to-end
        encrypted like every Signal message, from a service built to keep
        as little metadata as possible. It does <em>not</em> offer live
        location sharing, so there is no timer to set and nothing to stop
        later. For telling one person where to meet you, when you care who
        can see it, that is often exactly what you want.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The trade-off is that fewer of your contacts have it installed,
        and if you need someone to follow you on a walk home, you will need
        one of the live options above.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Plus Codes &mdash; addresses where addresses don&rsquo;t exist</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Plus Codes (the everyday name for <a href="https://github.com/google/open-location-code" target="_blank" rel="noopener" className="text-accent hover:underline">Open Location Code</a>, an
        open-source format published by Google) are short alphanumeric
        strings that encode a coordinate. The Eiffel Tower is
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
        in two seconds.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">A safety checklist for the moment before you hit Send</h2>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li><strong>Pick a duration, never &ldquo;until I cancel.&rdquo;</strong> Set 1 hour or end-of-day. The forgotten share at the top of this article is what happens otherwise.</li>
        <li><strong>One person, not a group.</strong> If only one person needs to find you, only one person should see you.</li>
        <li><strong>Prefer a static pin when you can.</strong> If you just want to tell someone where you parked, a static pin reveals nothing about your current movement.</li>
        <li><strong>Audit your active shares monthly.</strong> Both iOS Find My and Google Maps have a &ldquo;people who can see your location&rdquo; screen. Open it on the first of every month.</li>
        <li><strong>Don&rsquo;t post live location publicly.</strong> Posting &ldquo;here&rsquo;s where I am&rdquo; on social media tells everyone who follows you &mdash; including bots and stalkers &mdash; that your home is currently empty.</li>
        <li><strong>Be wary of unsolicited location links.</strong> A fake &ldquo;hi, here&rsquo;s where I am&rdquo; link can log your IP address, which usually reveals your city, the moment you open it. Never tap Allow on a location prompt from a page someone sent you unexpectedly.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-12">Check who can see your location right now</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Before worrying about the next share, find the ones already
        running. Each platform has one screen for it:
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li><strong>iPhone:</strong> Settings &rarr; Privacy &amp; Security &rarr; <strong>Safety Check</strong> &rarr; Manage Sharing &amp; Access. It lists the people you share your location with in Find My and lets you stop each one, and it also reviews which apps can use your location.</li>
        <li><strong>Google Maps:</strong> tap your profile picture &rarr; <strong>Location sharing</strong>. Everyone who can currently see you is listed there.</li>
        <li><strong>WhatsApp:</strong> Settings &rarr; Privacy &rarr; <strong>Location</strong> shows every chat where a live location is still running.</li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        If you are worried that someone is tracking you against your will,
        Safety Check&rsquo;s <em>Emergency Reset</em> on iPhone stops all
        sharing at once. Bear in mind that the other person may notice the
        share has stopped; if you are in danger, contact local support
        services first.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">For emergencies, raw coordinates still win</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        911 (US), 112 (Europe), 999 (UK), 1122 (Rescue) or 15 (police) in
        Pakistan, and most other emergency services can take a raw
        latitude and longitude over the phone. In countries that support
        Advanced Mobile Location (most of Europe and the UK among them),
        your phone also sends its position automatically when you dial
        &mdash; but having a backup, the coordinates you&rsquo;ve read off
        your own screen, is invaluable where AML isn&rsquo;t available or
        the call is from a landline.
        Full walk-through:
        {' '}<Link href="/blog/gps-coordinates-emergencies-aml-guide" className="text-accent hover:underline">GPS coordinates in emergencies</Link>.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">The apps compared, in one table</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Six common ways to share a location. &ldquo;Who can read
        it&rdquo; follows each company&rsquo;s own documentation, checked
        October 2026. End-to-end encryption protects the coordinate itself
        from the platform; it doesn&rsquo;t protect
        you from a careless recipient or a long-running share you forgot
        about.
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-tint/5 text-left text-fg-muted">
              <th className="px-3 py-2 font-semibold">App</th>
              <th className="px-3 py-2 font-semibold">Live?</th>
              <th className="px-3 py-2 font-semibold">Who can read it</th>
              <th className="px-3 py-2 font-semibold">Durations</th>
              <th className="px-3 py-2 font-semibold">Platforms</th>
              <th className="px-3 py-2 font-semibold">Best for</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.app} className="border-t border-line-subtle">
                <td className="px-3 py-2 text-fg font-semibold">{row.app}</td>
                <td className="px-3 py-2 text-fg-muted">{row.live}</td>
                <td className="px-3 py-2 text-fg-muted">{row.read}</td>
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
          Settings → Privacy → Location to see every chat where the
          timer is still running.
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
          <strong>Google Messages.</strong> Open the conversation, tap the
          message with your location, then next to your name tap{' '}
          <em>Stop</em> &rarr; <em>Stop sharing</em>.
        </li>
        <li>
          <strong>Signal.</strong> Nothing to stop: a Signal location is a
          one-time pin. Delete the message if you no longer want it in the
          chat.
        </li>
        <li>
          <strong>Everything on an iPhone at once.</strong> Settings &rarr;
          Privacy &amp; Security &rarr; Safety Check.
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
          live pin that updates as you move until the timer ends.
        </li>
        <li>
          <strong>Messages (iPhone):</strong> a live map in the
          conversation, and your name under People in their Find My app.
          They can choose to share back.
        </li>
        <li>
          <strong>Google Maps:</strong> your position in their Maps app,
          plus your name, photo and battery level, as listed above.
        </li>
        <li>
          <strong>Signal:</strong> a single map pin in the chat. It does
          not move.
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
        app accepts. From there it pastes into Messages, WhatsApp, Maps,
        Signal, or any of the others above. If you want a continuously
        updating reading instead of a snapshot, the{' '}
        <Link href="/live-location" className="text-accent hover:underline">Live Location tracker</Link>{' '}
        keeps refreshing as you move.
      </p>
    </article>
    </>
  );
}
