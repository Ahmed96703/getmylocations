import Link from 'next/link';

const faqs = [
  {
    q: 'Does my phone send GPS coordinates to 911 or 112 automatically?',
    a: 'Yes, on most modern smartphones in most countries. Both iOS (under the name HELO) and Android use Advanced Mobile Location to transmit a precise coordinate and accuracy estimate to the dispatcher the moment you dial an emergency number — even if location services were off. Coverage depends on whether the receiving dispatch centre has activated AML; the EENA tracks the live country list.',
  },
  {
    q: 'Do I still need to read my coordinates if AML is automatic?',
    a: 'Yes, as a backup. AML can fail silently — landlines, VoIP, older networks, and countries that have not deployed the receiver all break it. The dispatcher will not tell you they did not receive your coordinate; they will just ask where you are. Knowing how to read your own number off the phone in under ten seconds is the skill worth practicing once when nothing is wrong.',
  },
  {
    q: 'What is the fastest way to find my GPS coordinates in an emergency?',
    a: 'On an iPhone, open the Compass app — coordinates sit at the bottom of the screen. On Android, open Google Maps and long-press the blue dot. In any browser, open the GetMyLocations my-location tool and tap Find. Each takes under ten seconds. Practice once now, in calm conditions, so the screen flow is muscle memory if you ever need it.',
  },
  {
    q: 'What do I say first when I dial 911 with a coordinate?',
    a: 'Lead with what is happening and where, then the coordinate. "Medical emergency. Adult male, unconscious. My coordinates are forty-eight point eight five eight four, two point two nine four five. Decimal degrees." The dispatcher will read the numbers back — wait for the read-back and confirm before moving on. Read each digit individually, not as a whole number.',
  },
  {
    q: 'What if there is no cellular signal at all?',
    a: 'Newer iPhones (14 and later) and recent Pixels include Emergency SOS via Satellite — point the phone at the sky and the OS walks you through a guided text exchange with a dispatcher. For backcountry work without that hardware, a dedicated satellite messenger (Garmin inReach, ZOLEO, SPOT) handles the same job and works anywhere on Earth.',
  },
  {
    q: 'Should I use What3Words or just say the numbers?',
    a: 'Raw decimal degrees are still the safer choice in the moment. They are universally understood by every dispatch system on Earth, do not require the dispatcher to have a specific lookup tool open, and work in any language. What3Words and Plus Codes are excellent backups, especially in places without street addresses, but in the twenty-second window when the dispatcher is asking where you are, raw numbers travel best.',
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

const emergencyNumbers = [
  { region: 'European Union (all member states)', num: '112', aml: 'Yes' },
  { region: 'United Kingdom', num: '999 (also 112)', aml: 'Yes' },
  { region: 'United States &amp; Canada', num: '911', aml: 'Partial (NG911 rollout)' },
  { region: 'Australia', num: '000 (112 from mobiles)', aml: 'Yes' },
  { region: 'New Zealand', num: '111', aml: 'Yes' },
  { region: 'India', num: '112', aml: 'Rolling out' },
  { region: 'Pakistan', num: '15 (police), 1122 (rescue)', aml: 'Limited' },
  { region: 'Japan', num: '110 (police), 119 (fire / ambulance)', aml: 'Partial' },
  { region: 'South Africa', num: '112 (mobile), 10111 (police)', aml: 'Limited' },
  { region: 'Brazil', num: '190 (police), 192 (medical)', aml: 'No' },
];

export default function GpsCoordinatesEmergencies() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="prose-invert">
        <figure className="mb-8 -mt-2">
          <img
            src="/blog-images/gps-coordinates-emergencies-aml-guide-hero.jpg"
            alt="Location pin surrounded by concentric signal rings against a starry night sky, evoking emergency-call positioning"
            className="w-full h-auto rounded-xl"
            loading="eager"
          />
        </figure>
        <p className="text-lg text-fg-muted leading-relaxed">
          In 2014, a Lithuanian teenager named Karol Otulakowski phoned the
          emergency services from a forest. He couldn&rsquo;t describe where
          he was. He died before the call handler could find him. That call
          is one of the cases the European Emergency Number Association
          cites every time they push for Advanced Mobile Location &mdash;
          the technology that now automatically sends a caller&rsquo;s GPS
          coordinates to the dispatcher the instant they dial 112 or 911,
          with no app to install and no permission to grant.
        </p>

        <p className="mt-4 text-fg-muted leading-relaxed">
          AML covers most of the world&rsquo;s urban emergencies now, but
          it has gaps. Landlines don&rsquo;t use it. VoIP apps don&rsquo;t
          use it. Older networks haven&rsquo;t upgraded. The single skill
          worth practising once, when you don&rsquo;t need it, is reading
          your own coordinates off your phone and saying them out loud to a
          dispatcher. The rest of this article is what I worked out about
          how that whole pipeline functions, and where the brittle bits are.
        </p>

        <h2 className="font-display text-2xl font-bold mt-12">What happens at the dispatch centre</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Every modern dispatch centre (PSAP, public safety answering point)
          runs a computer-aided dispatch system with a built-in map. When a
          coordinate is entered &mdash; either manually by the dispatcher or
          automatically from AML &mdash; the map zooms straight to the spot,
          overlays the nearest streets, and routes the closest available
          unit. The whole pipeline, from coordinate received to ambulance
          dispatched, can take under a minute in well-equipped centres.
        </p>
        <p className="mt-3 text-fg-muted leading-relaxed">
          The console is also doing{' '}
          <Link href="/reverse-geocoding" className="text-accent hover:underline">reverse geocoding</Link>{' '}
          in the background:
          turning the coordinate back into a human-readable address
          (&ldquo;14th and Main, opposite the pharmacy&rdquo;) so the
          responding crew can call out the destination over the radio. This
          is why supplying a coordinate is more useful than supplying an
          address &mdash; the coordinate is the canonical reference, the
          address text is derived from it.
        </p>

        <figure className="my-10">
          <img
            src="/blog-images/gps-coordinates-emergencies-aml-guide-mid.jpg"
            alt="Stylised phone broadcasting signal waves toward an abstract dispatcher tower, illustrating Advanced Mobile Location"
            className="w-full h-auto rounded-xl"
            loading="lazy"
          />
        </figure>

        <h2 className="font-display text-2xl font-bold mt-12">What your phone does automatically</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Since the late 2010s, both iOS (under the name Hybridized
          Emergency Location, HELO) and Android have shipped
          <strong> Advanced Mobile Location</strong>. The instant you dial an
          emergency number, the phone:
        </p>
        <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
          <li>Turns on GPS, Wi-Fi, and cellular positioning at maximum accuracy &mdash; even if you had location services off.</li>
          <li>Computes the best available fix within a few seconds.</li>
          <li>Transmits the coordinates and an accuracy estimate to the dispatcher over a secure side-channel.</li>
          <li>Drops the elevated positioning the moment you hang up.</li>
        </ol>
        <p className="mt-3 text-fg-muted leading-relaxed">
          It works without the caller doing anything. It works whether or
          not the user has granted location permission to any app &mdash;
          emergency calls bypass the normal permission model that{' '}
          <Link href="/blog/browser-geolocation-api-explained" className="text-accent hover:underline">browser geolocation</Link>{' '}
          and regular apps obey. It works in
          airplane mode if the cellular for the emergency call itself comes
          back up.
        </p>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Coverage is uneven. AML is mandatory in most EU member states, the
          UK, Australia, and New Zealand, and is rolled out in many US
          states under the Next Generation 911 programme. Pakistan&rsquo;s 15
          service and India&rsquo;s 112 are adopting it incrementally. The
          official EENA list tracks who has switched on the receiving
          infrastructure.
        </p>

        <h2 className="font-display text-2xl font-bold mt-12">When AML isn&rsquo;t there to save you</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          AML covers the common case beautifully. The cases where it fails
          are exactly the ones where having a manual backup matters most:
        </p>
        <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
          <li><strong>Landline calls.</strong> AML is a smartphone feature. A landline call relies on the registered service address, which may be the building manager&rsquo;s office and not your flat.</li>
          <li><strong>VoIP calls.</strong> WhatsApp calls to emergency numbers, Skype calls, and most carrier-VoIP setups don&rsquo;t carry AML payloads.</li>
          <li><strong>Countries that haven&rsquo;t deployed it.</strong> Big parts of central Asia, Africa, and the Americas don&rsquo;t yet receive AML even from compliant phones.</li>
          <li><strong>You&rsquo;re calling about someone else.</strong> AML reports the calling phone&rsquo;s position, not the incident&rsquo;s. If you&rsquo;re calling from a kilometre away because you can&rsquo;t reach the person, the dispatcher needs the incident coordinate from you verbally.</li>
          <li><strong>Maritime, aviation, or wilderness.</strong> Coast guard and mountain rescue dispatchers usually want coordinates spoken aloud or transmitted by satellite messenger, regardless of phone-side automation.</li>
          <li><strong>The dispatcher is overwhelmed.</strong> In a mass incident, even where AML works, the dispatcher may need to confirm the coordinate verbally to make sure the system displayed the right one.</li>
        </ul>

        <h2 className="font-display text-2xl font-bold mt-12">Reading your coordinates &mdash; per device</h2>

        <h3 className="font-display text-lg font-semibold mt-6 text-fg">iPhone</h3>
        <ol className="mt-2 space-y-2 text-fg-muted list-decimal list-inside">
          <li>Open the Compass app (pre-installed). Coordinates sit at the bottom of the screen.</li>
          <li>Or open Apple Maps, tap the blue location dot, swipe up on the info panel, and the coordinates are listed under &ldquo;My Location&rdquo;.</li>
          <li>Long-press to copy.</li>
        </ol>

        <h3 className="font-display text-lg font-semibold mt-6 text-fg">Android</h3>
        <ol className="mt-2 space-y-2 text-fg-muted list-decimal list-inside">
          <li>Open Google Maps.</li>
          <li>Long-press anywhere on the map at your location &mdash; a red pin appears.</li>
          <li>The coordinates appear in the search bar at the top. Tap to copy.</li>
        </ol>

        <h3 className="font-display text-lg font-semibold mt-6 text-fg">Any browser</h3>
        <p className="mt-2 text-fg-muted leading-relaxed">
          Open{' '}
          <Link href="/my-location" className="text-accent hover:underline font-semibold">the My Location tool</Link>
          {' '}or{' '}
          <Link href="/gps-coordinates" className="text-accent hover:underline font-semibold">the GPS Coordinates page</Link>.
          Click Allow on the location prompt. The coordinates appear in the
          dashboard with a one-click copy button. If the prompt is missing
          or denied, our{' '}
          <Link href="/fix-location-not-working" className="text-accent hover:underline">fix-location guide</Link>
          {' '}walks through every permission setting that can block it.
        </p>

        <h3 className="font-display text-lg font-semibold mt-6 text-fg">Garmin or a dedicated GPS unit</h3>
        <p className="mt-2 text-fg-muted leading-relaxed">
          Most outdoor handhelds have a &ldquo;Where am I?&rdquo; menu that
          shows current coordinates, plus an emergency mode that strips the
          screen down to coordinates and a panic button.
        </p>

        <h2 className="font-display text-2xl font-bold mt-12">A four-line script for the call</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Dispatchers are trained to extract information in a specific
          order. You can save them &mdash; and yourself &mdash; ten or
          fifteen seconds by leading with the things they need first. The
          order that works best:
        </p>
        <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside">
          <li>
            <strong>What is happening.</strong> One short sentence.
            &ldquo;Medical emergency, adult male, unconscious.&rdquo;
            &ldquo;Road accident, two cars, possible injuries.&rdquo;
            &ldquo;House fire, ground floor, people still inside.&rdquo;
          </li>
          <li>
            <strong>Where you are, by coordinate.</strong> &ldquo;My
            coordinates are forty-eight point eight five eight four, two
            point two nine four five &mdash; decimal degrees.&rdquo; Always
            name the format. Speak the digits individually, not the whole
            number.
          </li>
          <li>
            <strong>Who you are.</strong> &ldquo;My name is Maria, I&rsquo;m
            calling from the scene.&rdquo; If you are calling about someone
            else who is at a different location, say so explicitly.
          </li>
          <li>
            <strong>Wait for the read-back.</strong> The dispatcher will
            repeat the coordinate. Confirm verbally before they hang up the
            map &mdash; a single mishearing of one digit moves the rescue
            team a hundred metres.
          </li>
        </ol>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Two things to avoid. Don&rsquo;t describe the surroundings before
          giving the coordinate (&ldquo;there&rsquo;s a red car and a
          tree&rdquo;) &mdash; that information is most useful after the
          coordinate has been logged. And don&rsquo;t hang up just because
          you finished saying the numbers; in many jurisdictions the
          dispatcher is required to stay on the line until responders arrive.
        </p>

        <h2 className="font-display text-2xl font-bold mt-12">Emergency numbers around the world</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          The number you dial matters as much as the coordinate you give.
          Most modern smartphones accept any of the major international
          codes and route them correctly, but knowing the local number for
          where you actually are is faster:
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-tint/5 text-left text-fg-muted">
                <th className="px-3 py-2 font-semibold">Region</th>
                <th className="px-3 py-2 font-semibold">Number</th>
                <th className="px-3 py-2 font-semibold">AML</th>
              </tr>
            </thead>
            <tbody>
              {emergencyNumbers.map((row) => (
                <tr key={row.region} className="border-t border-line-subtle">
                  <td className="px-3 py-2 text-fg-muted" dangerouslySetInnerHTML={{ __html: row.region }} />
                  <td className="px-3 py-2 font-mono text-fg">{row.num}</td>
                  <td className="px-3 py-2 text-fg-subtle">{row.aml}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-fg-subtle leading-relaxed">
          From a mobile, 112 will be routed correctly across most of the
          world even when it is not the official local number &mdash; it is
          a GSM standard. 911 has the same fallback behaviour in much of
          the Americas. When in doubt, dial 112 from a mobile.
        </p>

        <h2 className="font-display text-2xl font-bold mt-12">Saying the numbers out loud</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Two formats are common. Either works with most dispatchers, but
          tell them which one you&rsquo;re reading from:
        </p>
        <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
          <li><strong>Decimal degrees:</strong> &ldquo;forty-eight point eight five eight four, two point two nine four five.&rdquo;</li>
          <li><strong>Degrees, minutes, seconds:</strong> &ldquo;forty-eight degrees, fifty-one minutes, thirty seconds North; two degrees, seventeen minutes, forty seconds East.&rdquo;</li>
        </ul>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Speak slowly. Read each digit individually (&ldquo;eight five eight
          four&rdquo;, not &ldquo;eight thousand five hundred
          eighty-four&rdquo;). Dispatchers are trained to write digits, and a
          single mishearing can drop rescuers 100 meters off. When they read
          the number back, listen for the read-back to match exactly and
          confirm verbally. If you are unsure which format you are looking
          at, our{' '}
          <Link href="/coordinates-converter" className="text-accent hover:underline">coordinates converter</Link>{' '}
          translates between DD, DMS, and UTM with one click.
        </p>

        <h2 className="font-display text-2xl font-bold mt-12">What3Words, Plus Codes, and why I still prefer raw numbers</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          Several services tag 3-meter squares of the world with memorable
          codes. <strong>What3Words</strong> assigns three random words to
          each square (&ldquo;filled.count.soap&rdquo;); <strong>Plus
          Codes</strong> use a short alphanumeric format. Some emergency
          services accept either &mdash; the UK&rsquo;s 999 service
          supports both What3Words and AML, for instance.
        </p>
        <p className="mt-3 text-fg-muted leading-relaxed">
          In an emergency I would still prefer raw coordinates. Decimal
          degrees are universally understood; they don&rsquo;t require the
          dispatcher to have a particular company&rsquo;s lookup tool open;
          they don&rsquo;t depend on the call being in English; they work
          on every dispatch system in the world. The branded formats are
          useful as a backup or for places where the address-system genuinely
          doesn&rsquo;t exist (rural Mongolia, refugee camps), but for the
          twenty-second window where the dispatcher is asking where you are,
          raw numbers are the safer bet.
        </p>

        <h2 className="font-display text-2xl font-bold mt-12">Satellite SOS &mdash; when there is no cellular at all</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          AML and verbal coordinates both assume the call connects. In
          deep wilderness, on the water, or after a network outage, the
          call won&rsquo;t. Two technologies fill that gap.
        </p>
        <p className="mt-3 text-fg-muted leading-relaxed">
          <strong>Emergency SOS via Satellite</strong> ships in iPhone 14 and
          later, and in recent Pixel models. When the phone detects no
          cellular and no Wi-Fi, holding the side button triggers a guided
          interface: point the phone at the sky, the OS walks you through a
          short questionnaire (&ldquo;What is happening?&rdquo;,
          &ldquo;How many people?&rdquo;), and your answers plus your GPS
          fix are relayed by satellite to a relay centre that texts the
          local dispatcher. The exchange is text-only and slow &mdash;
          minutes, not seconds &mdash; but it works anywhere in the
          satellite&rsquo;s coverage footprint.
        </p>
        <p className="mt-3 text-fg-muted leading-relaxed">
          <strong>Dedicated satellite messengers</strong> like Garmin
          inReach, ZOLEO, and SPOT do the same job on any phone-less
          device. They run on the Iridium or Globalstar networks, which
          cover the entire surface of the planet. They are the standard
          tool for any wilderness travel above an hour from a road.
          Trigger the SOS button, the device transmits your coordinates
          plus a short message to a 24/7 monitoring centre, and the
          centre coordinates rescue with the appropriate local agency.
        </p>

        <h2 className="font-display text-2xl font-bold mt-12">Things to do before you ever need this</h2>
        <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
          <li>
            Make sure Location Services / GPS is enabled at the OS level. AML can&rsquo;t fire if the chip is off. If your phone is currently refusing to share its location to apps, our{' '}
            <Link href="/blog/enable-location-on-iphone-and-android" className="text-accent hover:underline">iPhone &amp; Android location setup guide</Link>{' '}
            walks through every switch.
          </li>
          <li>Set up your phone&rsquo;s emergency contacts and Medical ID. They&rsquo;re visible from the lock screen and save dispatchers a step.</li>
          <li>Memorise the emergency number for where you actually are. It&rsquo;s not always 911. EU: 112. UK: 999. Pakistan: 15. India: 112. Australia: 000.</li>
          <li>For wilderness work, carry a satellite messenger (Garmin inReach, ZOLEO, the newer iPhones&rsquo; Emergency SOS via Satellite). They work where cellular doesn&rsquo;t.</li>
          <li>If you travel internationally, install the regional 112 / 999 app of the country you&rsquo;re visiting. Many countries have one.</li>
        </ul>

        <h2 className="font-display text-2xl font-bold mt-12">Reporting an incident that isn&rsquo;t happening to you</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          If you witness an emergency that&rsquo;s a few meters away &mdash;
          a road accident, a person collapsing on a trail &mdash; AML sends
          <em> your</em> location, not the incident&rsquo;s. Verbally confirm
          the incident location separately, ideally a coordinate you&rsquo;ve
          read off your own phone after walking close enough to the scene
          that the GPS reading is reliable.
        </p>
        <p className="mt-3 text-fg-muted leading-relaxed">
          On highways, naming the nearest kilometre-marker post is often
          faster than coordinates. Inside large parks or campuses, the
          opposite is true &mdash; a coordinate beats &ldquo;by the main
          gate&rdquo; every time.
        </p>

        <h2 className="font-display text-2xl font-bold mt-12">Practise once, when nothing is wrong</h2>
        <p className="mt-3 text-fg-muted leading-relaxed">
          The single most useful exercise is to read your coordinates off
          your phone right now, in a low-stakes moment, just to know what
          the process feels like. Open
          {' '}<Link href="/my-location" className="text-accent hover:underline font-semibold">the My Location tool</Link>,
          see the numbers, get a feel for what &ldquo;24.860422,
          67.001137&rdquo; looks and sounds like. The next time you need to
          say it under stress, it&rsquo;ll take you ten seconds instead of
          two minutes &mdash; and you&rsquo;ll know the screen flow already.
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
      </article>
    </>
  );
}
