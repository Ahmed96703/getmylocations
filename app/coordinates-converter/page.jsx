import Link from 'next/link';
import Tool from './Tool.jsx';

export const metadata = {
  title: 'Latitude and Longitude Converter — DD ↔ DMS ↔ UTM Free',
  description: 'Free latitude and longitude converter. Convert GPS coordinates between Decimal Degrees, DMS, DDM, and UTM in real time. With map. No signup.',
  keywords: ['coordinates converter', 'gps coordinates converter', 'dd to dms', 'decimal degrees converter', 'utm converter', 'lat long converter'],
  alternates: { canonical: '/coordinates-converter' },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Coordinates Converter',
  url: 'https://getmylocations.com/coordinates-converter',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function CoordinatesConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />

      <main className="max-w-5xl mx-auto px-5 py-10">
        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-electric-400 font-semibold mb-2">Free Tool · Real-time Conversion</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Convert latitude and longitude between <span className="text-electric-400">every common format</span>
          </h1>
          <p className="text-lg text-slate-300/90 mt-4 max-w-3xl">
            Convert any GPS coordinate between <strong className="text-slate-100">Decimal Degrees</strong>, <strong className="text-slate-100">Degrees-Minutes-Seconds</strong>, <strong className="text-slate-100">Degrees-Decimal-Minutes</strong>, and <strong className="text-slate-100">Universal Transverse Mercator</strong>. Edit any field and the others update instantly.
          </p>
        </section>

        <Tool />

        {/* TODO: Ahmed to add an annotated screenshot of the converter with a real famous coordinate (Eiffel Tower 48.8584° N, 2.2945° E) so readers see DD, DMS, DDM, and UTM side-by-side. Replace this comment with the <Image /> tag pointing at /public/screenshots/converter-eiffel-annotated.png. */}

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How the tool handles each format</h2>
          <p className="mt-3 text-slate-300/90 leading-relaxed">
            Decimal degrees are the master input. Type a value into either of the
            two top boxes and the page recalculates the DMS, DDM, and UTM versions
            on the fly. If you have the coordinate in DMS or DDM, type it in the
            corresponding row and the tool back-converts to decimal degrees. UTM
            is shown as a read-only output because typing easting and northing by
            hand is uncommon and error-prone — almost everyone who works in UTM
            already has it in a GIS file.
          </p>
          <p className="mt-3 text-slate-300/90 leading-relaxed">
            For a deeper read on what each format actually represents and why
            anyone would use one over another, see the dedicated{' '}
            <a className="text-electric-400 hover:underline" href="/decimal-degrees-converter">decimal degrees conversion guide</a>.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">How the UTM zone is calculated</h2>
          <p className="mt-3 text-slate-300/90 leading-relaxed">
            UTM divides the world into 60 vertical zones, each six degrees of
            longitude wide. Zone 1 starts at the international date line and runs
            east. Your zone number is found from your longitude with the formula
            <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400 text-sm mx-1">floor((lon + 180) / 6) + 1</code>.
            Norway and Svalbard have hand-tuned exceptions to keep their countries
            from straddling zone boundaries, and the tool honours those special
            cases. The letter that follows the zone number — like the U in
            &ldquo;31U&rdquo; — comes from your latitude and identifies the eight-degree band
            you are sitting in.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Common mistakes the tool catches</h2>
          <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
            <li>Latitude over 90 or longitude over 180 — the tool flags this rather than producing nonsense.</li>
            <li>Forgetting to switch the hemisphere letter when typing DMS for southern or western locations.</li>
            <li>Pasting a coordinate with the longitude first (a GeoJSON pattern). The tool assumes latitude first; if your map ends up in the ocean, swap the two.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Where to go from here</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[
              { href: '/my-location', t: 'My Location' },
              { href: '/gps-coordinates', t: 'GPS Coordinates' },
              { href: '/distance-calculator', t: 'Distance Calculator' },
              { href: '/decimal-degrees-converter', t: 'DD Converter Guide' },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="glass rounded-2xl p-4 hover:ring-electric-400/40 ring-1 ring-white/10 transition no-underline">
                <h3 className="font-display text-base font-bold text-slate-100 hover:text-electric-400 transition">{t.t}</h3>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
