import Link from 'next/link';

export const metadata = {
  title: 'Decimal Degrees Converter — DD to DMS Conversion Guide',
  description: "Convert decimal degrees to DMS (degrees, minutes, seconds) and back. Complete reference with formula, examples, and precision guidelines.",
  alternates: { canonical: '/decimal-degrees-converter' },
  openGraph: {
    title: 'Decimal Degrees Converter — DD to DMS Conversion Guide',
    description: "Convert decimal degrees to DMS and back. Complete reference with formula and examples.",
    url: 'https://getmylocations.com/decimal-degrees-converter',
  },
};

export default function DecimalDegreesConverter() {
  return (
    <main role="main" className="max-w-3xl mx-auto px-5 py-12 prose-invert">
      <article>
        <p className="text-xs uppercase tracking-[0.18em] text-electric-400 font-semibold">Guide &amp; Reference</p>
        <h1 className="font-display text-4xl font-extrabold tracking-tight mt-2 leading-[1.1]">
          Decimal degrees converter &mdash; DD to DMS conversion guide
        </h1>
        <p className="mt-4 text-lg text-slate-300/90 leading-relaxed">
          Latitude and longitude come in two common formats: decimal degrees (DD) like
          {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">48.858420</code>, and
          degrees-minutes-seconds (DMS) like
          {' '}<code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">48&deg; 51&apos; 30.3&quot; N</code>.
          Modern apps prefer DD; older charts and surveys use DMS. This guide explains how the conversion works,
          when to use which format, and the precision implications. For an interactive converter that translates
          DD &harr; DMS &harr; DDM &harr; UTM in real time, see our {' '}
          <Link href="/coordinates-converter" className="text-electric-400 hover:underline font-semibold">Coordinates Converter tool</Link>.
        </p>

        <div className="glass rounded-2xl p-5 mt-6 ring-1 ring-electric-400/30 bg-electric-500/5">
          <p className="text-sm text-slate-300/90">
            <strong className="text-slate-100">Quick action:</strong> Use our free{' '}
            <Link href="/coordinates-converter" className="text-electric-400 hover:underline font-semibold">Coordinates Converter</Link>{' '}
            for real-time, two-way DD &harr; DMS &harr; DDM &harr; UTM conversion with map preview.
          </p>
        </div>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">What the two formats mean</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          A coordinate is just an angle. Decimal degrees write that angle as a single number with a
          fractional part: <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">48.858420</code>.
          DMS breaks the same angle into three integer-ish parts: 48 full degrees, then 51 minutes
          (1/60 of a degree each), then 30.3 seconds (1/60 of a minute each).
        </p>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          The math is the same in both cases. To go from DD to DMS, take the integer part as degrees,
          multiply the fractional part by 60 to get minutes (integer part of the result), then
          multiply <em>that</em> fractional part by 60 to get seconds. To go the other way, add
          everything up: degrees + minutes/60 + seconds/3600.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">When to use which format</h2>
        <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
          <li><strong>Use DD</strong> for anything digital &mdash; APIs, spreadsheets, Google Maps URLs, GIS files, navigation apps. It&apos;s the modern standard and avoids parsing the &deg; &apos; &quot; symbols.</li>
          <li><strong>Use DMS</strong> for paper nautical charts, aviation publications, land-survey documents, and historical references. Many published surveys still cite DMS.</li>
          <li><strong>Convert when crossing formats</strong> &mdash; e.g., reading a coordinate off an old chart and pasting it into Google Maps, or copying a phone&apos;s coordinate into a printed expedition report.</li>
        </ul>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">How much precision do you really need?</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          Each decimal place of latitude or longitude shrinks your error by roughly a factor of ten.
          A practical rule:
        </p>
        <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
          <li>3 decimals (~110 m) &mdash; enough to identify a city block.</li>
          <li>4 decimals (~11 m) &mdash; enough to identify a building.</li>
          <li>5 decimals (~1.1 m) &mdash; enough to identify a parking space. This is what most smartphone GPS chips realistically deliver.</li>
          <li>6 decimals (~11 cm) &mdash; the de facto storage format, but the real-world accuracy is rarely better than ~1 m.</li>
        </ul>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          For DMS, one second of latitude is about 31 meters, and one decimal of a second is about
          3 meters. Old surveys often give whole-second precision &mdash; perfectly adequate for
          showing a landmark, less so for guiding a drone.
        </p>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">Hemispheres and signs &mdash; common mistakes</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          DD uses signs: positive for North/East, negative for South/West. DMS uses hemisphere
          letters (N, S, E, W) instead. Mixing the two is the single most common mistake in
          conversion. Two examples to keep in mind:
        </p>
        <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
          <li>Sydney Opera House &mdash; <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">-33.8568, 151.2153</code> in DD &harr; <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">33&deg; 51&apos; 24.5&quot; S, 151&deg; 12&apos; 55.1&quot; E</code> in DMS. The S flips the sign, not the magnitude.</li>
          <li>Statue of Liberty &mdash; <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">40.6892, -74.0445</code> in DD &harr; <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm">40&deg; 41&apos; 21.1&quot; N, 74&deg; 2&apos; 40.2&quot; W</code> in DMS. North is positive, West is negative.</li>
        </ul>

        <hr className="my-10 border-white/10" />

        <h2 className="font-display text-2xl font-bold">Try the live converter</h2>
        <p className="mt-3 text-slate-300/90 leading-relaxed">
          For a working interactive tool that converts DD, DMS, DDM, and UTM in real time with a map
          preview, use our {' '}
          <Link href="/coordinates-converter" className="text-electric-400 hover:underline font-semibold">Coordinates Converter</Link>.
          Or grab your live coordinates first from {' '}
          <Link href="/my-location" className="text-electric-400 hover:underline font-semibold">My Location</Link>{' '}
          or {' '}
          <Link href="/gps-coordinates" className="text-electric-400 hover:underline font-semibold">GPS Coordinates</Link>.
        </p>

        <h2 className="font-display text-2xl font-bold mt-10">Related guides</h2>
        <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
          <li><Link href="/coordinates-converter" className="text-electric-400 hover:underline">Coordinates Converter (interactive tool)</Link></li>
          <li><Link href="/gps-coordinates-finder" className="text-electric-400 hover:underline">GPS coordinates finder &mdash; complete guide</Link></li>
          <li><Link href="/blog/latitude-vs-longitude-explained" className="text-electric-400 hover:underline">Latitude vs longitude &mdash; the difference, explained</Link></li>
          <li><Link href="/fix-location-not-working" className="text-electric-400 hover:underline">Fix location not working &mdash; troubleshooting</Link></li>
        </ul>
      </article>
    </main>
  );
}
