import Link from 'next/link';

export default function LatLonHistory() {
  return (
    <article className="prose-invert">
      <p className="text-lg text-fg-muted leading-relaxed">
        In October 1884, twenty-five countries sat down in a conference room
        in Washington and voted on which line should count as the middle of
        the world. France lost the vote, abstained from the result, and
        kept the Paris meridian on its own charts for another twenty-seven
        years out of pride. That argument is the reason your phone today
        reads longitude from a brass strip set into the ground at a south-east
        London observatory.
      </p>

      <p className="mt-4 text-fg-muted leading-relaxed">
        Latitude was never really in dispute &mdash; the equator picks itself,
        sitting halfway between the poles because that&rsquo;s where the
        planet&rsquo;s own spin tells you it should. Longitude had no such
        natural anchor, which is why the political fight took so long. What I
        find genuinely surprising about the history is how recently the system
        settled. The grid is 2,200 years old, but the version of it your phone
        actually uses was finalised within the last 50.
      </p>

      {/* TODO: Ahmed to find or photograph an image of the Greenwich Prime Meridian brass line for this article. A close-up of the actual strip embedded in the observatory courtyard would beat any stock illustration. /public/screenshots/greenwich-meridian.jpg, caption it with "The 0° longitude line at the Royal Observatory — every coordinate on your phone is measured from here." */}

      <h2 className="font-display text-2xl font-bold mt-12">The Greeks drew the first grid</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Around 230 BC the Greek scholar Eratosthenes &mdash; the same man who
        calculated the size of the Earth by watching shadows in two cities
        &mdash; sketched the first coordinate system on a map of the known
        world. He drew lines parallel to the equator and lines running pole
        to pole. A century later Hipparchus formalised them as 360 degrees
        and proposed using astronomical observations to actually assign
        coordinates to specific places.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        By 150 AD, Ptolemy&rsquo;s <em>Geography</em> listed about eight thousand
        places with their latitude and longitude. He got the size of the
        Mediterranean wrong by 40%, but the framework is unmistakable. If you
        put a Ptolemaic coordinate next to a modern one for the same city,
        the format is exactly the same.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Latitude was the easy half</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Finding how far north or south you are turns out to be straightforward
        if you can see the stars. The angle the sun sits above the horizon at
        noon, or the angle of the North Star above your spot in the northern
        hemisphere, gives you latitude directly. The instruments &mdash; the
        astrolabe, then the sextant &mdash; got better over the centuries but
        the principle never changed. Any decent ship&rsquo;s captain in the
        1700s could read latitude reliably from the deck of a moving ship.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Longitude was the disaster that killed people</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Longitude requires you to know the time. If it is noon where you are
        &mdash; which the sun tells you &mdash; and it is, say, 4 PM at
        Greenwich, then the four-hour difference tells you how far east or
        west of Greenwich you are. The catch is that there were no clocks
        accurate enough to keep Greenwich time on a ship that had been at
        sea for weeks. Pendulum clocks were useless on a rolling deck. The
        astronomical alternatives were complex, slow, and only worked at
        night in clear weather.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The result was a regular slaughter at sea. Ships missed their islands
        by hundreds of miles and ran aground. In 1707 a British fleet wrecked
        itself on the rocks of the Isles of Scilly because the navigators
        had no idea how far east they were; nearly 2,000 sailors drowned in
        one night. Seven years later, in 1714, Parliament passed the
        Longitude Act, putting up what was then a colossal cash prize
        &mdash; &pound;20,000, the equivalent of millions today &mdash; for
        a workable solution.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">John Harrison&rsquo;s clocks</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        John Harrison was a Yorkshire carpenter who taught himself clockmaking.
        Over forty years he built a series of marine chronometers &mdash; the
        first portable clocks accurate enough to keep Greenwich time on a
        wooden ship in a North Atlantic gale. His fourth attempt, H4, ran for
        81 days at sea and lost less than five seconds. Longitude was solved.
        The Royal Navy still owed him most of the prize money for decades
        afterwards; he had to petition the king personally to get it.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        All four of Harrison&rsquo;s clocks still work and are on display at
        the Royal Observatory in Greenwich today. H4 is the size of a large
        pocket watch.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">Whose meridian is zero?</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        With reliable clocks, every seafaring nation could measure longitude
        from somewhere. The French ran theirs through Paris. The Spanish
        through Cadiz. Americans through Washington. The Portuguese through
        Lisbon. Each country&rsquo;s charts were unreadable on another
        country&rsquo;s ships, and that became expensive once steamships and
        international cabling made commerce continuous.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The 1884 Washington conference settled it. Greenwich won &mdash; not
        because it was geographically special, but because British nautical
        charts were already the most widely used and reprinting every chart
        in the world was unappealing. France abstained out of pique and
        France&rsquo;s civil railway clocks ran on &ldquo;Paris time minus
        nine minutes 21 seconds&rdquo; (the offset from Greenwich) until
        1911, when they finally gave in.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">From sextants to satellites</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The instruments changed entirely; the coordinate system did not. GPS,
        launched by the US Department of Defense in the late 1970s and made
        fully available for civilian use in 2000, gives you latitude and
        longitude using exactly the definition Ptolemy used, accurate to a
        few meters instead of a few miles. The Galileo (EU), GLONASS
        (Russia), and BeiDou (China) systems all use the same grid. Your
        phone reads from all of them simultaneously and hands the result to
        whichever app asked for it.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        What I think is worth pausing on: a Greek scholar in Alexandria, an
        English clockmaker in Yorkshire, and twenty-five governments arguing
        in Washington all contributed to the number your weather app needs
        to forecast for the right city. None of them could have imagined any
        of the others. That is the part of the history I keep coming back to.
      </p>

      <h2 className="font-display text-2xl font-bold mt-12">See your own coordinates</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Two clicks on the{' '}
        <Link href="/gps-coordinates" className="text-accent hover:underline font-semibold">GPS Coordinates tool</Link>{' '}
        give you the latitude and longitude that took two millennia to make
        readable. The latitude number you see comes from astronomical
        principles a Greek scholar would have recognised; the longitude
        number comes from a Yorkshire clock and an 1884 vote.
      </p>
    </article>
  );
}
