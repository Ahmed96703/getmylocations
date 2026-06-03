import Link from 'next/link';
import Tool from './Tool.jsx';

export const metadata = {
  title: 'Address Finder — Address to GPS Coordinates & Reverse',
  description: 'Free address finder. Convert street address into GPS coordinates, or paste coordinates to get the address. Two-way geocoding via Nominatim.',
  keywords: ['address finder', 'geocoding', 'address to coordinates', 'coordinates to address', 'reverse geocoding'],
  alternates: { canonical: '/address-finder' },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Address Finder',
  url: 'https://getmylocations.com/address-finder',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function AddressFinderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />

      <main className="max-w-5xl mx-auto px-5 py-10">
        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-electric-400 font-semibold mb-2">Free Tool · Two-way Geocoding</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Address <span className="text-electric-400">Finder</span> — address ↔ GPS coordinates
          </h1>
          <p className="text-lg text-slate-300/90 mt-4 max-w-3xl">
            Type any address, landmark, or place name and get the GPS coordinates. Or paste a latitude/longitude pair and get the nearest street address back. Powered by OpenStreetMap Nominatim.
          </p>
        </section>

        <Tool />

        {/* TODO: Ahmed to add a screenshot showing the tool resolving "Badshahi Mosque, Lahore" forward (to ~31.5882, 74.3104) and the reverse lookup of those coordinates returning the mosque name. Two-panel image at /public/screenshots/address-finder-badshahi.png. */}

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">What this tool does</h2>
          <p className="mt-3 text-slate-300/90 leading-relaxed">
            The page does two related jobs. Type in an address or a landmark name —
            &ldquo;Eiffel Tower&rdquo;, &ldquo;1600 Pennsylvania Ave&rdquo;, &ldquo;Badshahi Mosque, Lahore&rdquo; — and
            it returns the latitude and longitude. Paste a coordinate the other way
            and it tells you the nearest street address. Both lookups call
            OpenStreetMap&rsquo;s Nominatim service, which is free for low-volume use and
            covers most of the world.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Why house numbers are sometimes one or two off</h2>
          <p className="mt-3 text-slate-300/90 leading-relaxed">
            Map databases rarely have a coordinate stored for every individual house
            number. Instead, they store the start and end of each street, the
            range of numbers along it (say 1 to 199 on the north side), and they
            slide along the line to estimate where number 47 sits. This works fine
            on a tidy block. It falls apart when houses are spaced unevenly, when
            one giant property took up four old plots, or when a street was
            renumbered decades ago and the records still reflect the old pattern.
          </p>
          <p className="mt-3 text-slate-300/90 leading-relaxed">
            The result is the familiar pattern of a pin that lands two houses
            short, or on the wrong side of a small street. For everyday use this is
            close enough; for couriers, it is the reason packages occasionally end
            up next door.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Where geocoding works well, and where it does not</h2>
          <p className="mt-3 text-slate-300/90 leading-relaxed">
            Coverage is uneven. North America, western Europe, Japan, South Korea,
            and Australia have near-complete address data. Major cities in
            Pakistan, India, the Middle East, and Africa are usually well covered
            for streets but inconsistent for individual buildings. Rural areas
            anywhere in the world tend to fall back to whichever village or
            district the coordinate is in.
          </p>
          <p className="mt-3 text-slate-300/90 leading-relaxed">
            When a lookup fails, adding context usually fixes it. &ldquo;Main Street&rdquo; on
            its own resolves to nothing useful. &ldquo;Main Street, Springfield,
            Illinois&rdquo; works fine. The same logic applies to landmarks — adding the
            city and country disambiguates the dozens of &ldquo;Central Park&rdquo;s out there.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Rate limits and fair use</h2>
          <p className="mt-3 text-slate-300/90 leading-relaxed">
            The free Nominatim endpoint asks users to keep traffic to about one
            request per second per IP. That is fine for a manual page like this
            one. If you need to geocode thousands of addresses at once, either
            self-host Nominatim — the data is free to download — or use a paid
            commercial geocoder. Hammering the free endpoint will get your IP
            temporarily blocked.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">If you found this useful</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[
              { href: '/my-location', t: 'My Location' },
              { href: '/gps-coordinates', t: 'GPS Coordinates' },
              { href: '/coordinates-converter', t: 'Coordinates Converter' },
              { href: '/reverse-geocoding', t: 'Reverse Geocoding Guide' },
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
