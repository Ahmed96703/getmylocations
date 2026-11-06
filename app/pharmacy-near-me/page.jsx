import Link from '@/app/components/Link.jsx';
import { breadcrumbSchema } from '../components/breadcrumbSchema.js';
import Tool from './Tool.jsx';
import AuthorBio from '../components/AuthorBio.jsx';
import AdSense from '../components/AdSense.jsx';
import { AUTHOR } from '../components/author.js';
import SideAd from '../components/SideAd.jsx';

export const metadata = {
  title: 'Pharmacy Near Me: Nearest Pharmacy, Hospital & Defibrillator',
  description:
    'Find the nearest pharmacy, hospital with A&E and public defibrillator (AED) from your location, with distance, opening hours and directions. Free, works across Europe.',
  keywords: ['pharmacy near me', 'nearest pharmacy', 'hospital near me', 'nearest hospital', 'defibrillator near me', 'aed near me', 'nearest a&e', 'chemist near me'],
  alternates: { canonical: '/pharmacy-near-me' },
  openGraph: {
    title: 'Pharmacy Near Me: Nearest Pharmacy, Hospital & Defibrillator',
    description: 'The nearest pharmacy, hospital and public defibrillator from your location, with distance, hours and directions.',
    url: 'https://getmylocations.com/pharmacy-near-me',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pharmacy Near Me: Nearest Pharmacy, Hospital & Defibrillator',
    description: 'The nearest pharmacy, hospital and public defibrillator from your location.',
    images: ['/og-image.png'],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Pharmacy, Hospital and Defibrillator Near Me',
  description:
    'Free map tool that lists the nearest pharmacies (within 3 km), hospitals (within 15 km) and public defibrillators (within 3 km) of your location or any place, from OpenStreetMap, with distance, direction, opening hours as mapped, and directions.',
  url: 'https://getmylocations.com/pharmacy-near-me',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@type': 'Organization', name: 'GetMyLocations' },
  author: AUTHOR,
};

const link = 'text-accent hover:underline';
const P = 'mt-3 text-fg-muted leading-relaxed';

const faqs = [
  {
    q: 'Does it show which pharmacy is open tonight?',
    a: 'Not reliably. It shows the opening hours that OpenStreetMap volunteers have recorded, which are usually right but not always up to date. In many European countries pharmacies take turns to stay open at night and on public holidays, and that rota is not in the map data. Use your country\'s rota service (see the list on this page) or the notice on the door of the nearest pharmacy, which shows the duty pharmacy.',
  },
  {
    q: 'Does a hospital on the list have an emergency department?',
    a: 'Only if it is marked "Emergency department (A&E)". Hospitals without the label may still have one; the information is simply not recorded. Hospitals marked "No emergency department" are often clinics or specialist hospitals. In an emergency call 112 (or 999 in the UK) instead of driving to a hospital yourself.',
  },
  {
    q: 'Can anyone use a public defibrillator?',
    a: 'Yes. Public AEDs are built for untrained people: once switched on, they give spoken instructions and only deliver a shock if the heart rhythm needs one. Call 112 first, or have someone else call, and start chest compressions. The call handler can talk you through it and, in many areas, tell you where the nearest AED is and how to open its cabinet.',
  },
  {
    q: 'Why is a pharmacy I know missing?',
    a: 'Because nobody has added it to OpenStreetMap yet, or it was added recently and our copy is up to a day old. Coverage is very good in most European cities and patchier in rural areas. You can add or correct a place on openstreetmap.org, and the "Details or fix" link under each result opens it there.',
  },
  {
    q: 'Is my location stored?',
    a: 'No. Your browser rounds your position to about 2 km before it asks our server for the places in that area, and the distances to each place are worked out on your device. Nothing is saved by this site.',
  },
];

const ROTAS = [
  ['United Kingdom', 'call NHS 111, or use the NHS "Find a pharmacy" service on nhs.uk (England)'],
  ['Germany', 'the Apotheken-Notdienst search on aponet.de, run by the German pharmacists\' association'],
  ['France', 'call 3237, or ask the gendarmerie or police at night, for the pharmacie de garde'],
  ['Italy and Spain', 'search for "farmacia di turno" or "farmacia de guardia" with your town; the regional health service or the local pharmacists\' association publishes the rota'],
];

export default function PharmacyNearMePage() {
  const crumbs = breadcrumbSchema([{ name: 'Pharmacy Near Me', path: '/pharmacy-near-me' }]);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <AdSense />

      <main role="main" className="max-w-5xl mx-auto px-5 py-10">
        <nav aria-label="Breadcrumb" className="text-xs text-fg-subtle mb-3">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-fg-muted">Pharmacy Near Me</li>
          </ol>
        </nav>

        <section className="mb-6">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">Free Tool · OpenStreetMap data</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Pharmacy near me: <span className="text-accent">nearest pharmacy, hospital and defibrillator</span>
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">
            One tap lists the <strong>nearest pharmacies</strong>, <strong>hospitals</strong> and <strong>public defibrillators (AEDs)</strong> around you, with the distance, the opening hours where they are known, and directions. Works anywhere, with the best coverage in Europe. Free, no signup.
          </p>
        </section>

        <div role="note" className="mb-6 rounded-xl border border-rose-400/50 bg-rose-500/10 p-4 text-sm text-fg-muted leading-relaxed">
          <strong className="text-fg">In an emergency, call first.</strong> Dial <strong className="text-fg">112</strong> anywhere in the EU and in the UK (where <strong className="text-fg">999</strong> also works). For urgent but not life-threatening medical help in the UK, call <strong className="text-fg">111</strong>. Your exact position for the call handler is on{' '}
          <Link href="/my-location" className={link}>My Location</Link>.
        </div>

        <Tool />

        <article>
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold">How to find the nearest pharmacy</h2>
            <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside leading-relaxed">
              <li><strong className="text-fg">Press &ldquo;Find near me&rdquo;</strong> and allow location access, or type a street, town, station or postcode. You can also click anywhere on the map.</li>
              <li><strong className="text-fg">Pick the tab you need:</strong> pharmacies and defibrillators within 3 km, or hospitals within 15 km. The number on each tab is how many were found.</li>
              <li><strong className="text-fg">Check the hours and labels.</strong> Each result shows the opening hours as mapped, and labels such as &ldquo;Dispenses prescriptions&rdquo; or &ldquo;Emergency department (A&amp;E)&rdquo; where they are recorded.</li>
              <li><strong className="text-fg">Press Directions</strong> to open walking directions in Google Maps, or call the number shown before you set off.</li>
            </ol>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">Which pharmacy is open at night or on a Sunday?</h2>
            <p className={P}>
              Across much of Europe pharmacies share out-of-hours duty on a rota, so the <strong className="text-fg">late-night or Sunday pharmacy</strong> changes from day to day. The duty pharmacy is posted on the door or window of every pharmacy in the area, so the nearest one on the list will tell you where to go even when it is closed. National services also publish the rota:
            </p>
            <ul className="mt-3 space-y-1.5 text-fg-muted list-disc list-inside leading-relaxed">
              {ROTAS.map(([where, how]) => (
                <li key={where}><strong className="text-fg">{where}:</strong> {how}.</li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">Nearest hospital with an emergency department</h2>
            <p className={P}>
              The hospitals tab lists every hospital mapped within 15 km. Those marked <strong className="text-fg">Emergency department (A&amp;E)</strong> have one recorded on OpenStreetMap; the label is called A&amp;E in the UK, <em>Notaufnahme</em> in Germany and <em>urgences</em> in France. Many hospitals are not labelled either way, so if the nearest unlabelled hospital is much closer, a quick call or its website will tell you. For anything serious, call 112: an ambulance crew starts treatment on the way and knows which hospital is open for your problem.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">Find a defibrillator (AED) near you</h2>
            <p className={P}>
              Public <strong className="text-fg">defibrillators</strong> hang in green cabinets at stations, shops, sports halls and town squares. The tool lists those mapped within 3 km, with notes such as indoors or outdoors, the floor, and where exactly it hangs when a volunteer recorded it. If someone collapses and is not breathing normally:
            </p>
            <ol className="mt-3 space-y-1.5 text-fg-muted list-decimal list-inside leading-relaxed">
              <li>Call <strong className="text-fg">112</strong> (999 in the UK) and put the phone on speaker.</li>
              <li>Start chest compressions: hard and fast in the middle of the chest, about two per second.</li>
              <li>Send someone else for the AED. Switch it on and follow its spoken instructions.</li>
            </ol>
            <p className={P}>
              Some cabinets are locked, and the call handler gives you the code. A defibrillator in a shop or office is only reachable while the building is open; those marked &ldquo;Customers only&rdquo; may need staff to fetch it.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold">Where the data comes from</h2>
            <p className={P}>
              Every place comes from{' '}
              <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener" className={link}>OpenStreetMap</a>, the free map of the world built by volunteers, read through the Overpass API. Coverage of pharmacies and hospitals is very good in most European towns, and defibrillators have been added in large numbers by local first-responder groups. Our server keeps each area&rsquo;s answer for up to a day, so a place added this morning may not show until tomorrow. When something is wrong, the &ldquo;Details or fix&rdquo; link under each result opens it on OpenStreetMap, where anyone can correct it.
            </p>
          </section>
        </article>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="glass rounded-xl p-4">
                <summary className="font-semibold cursor-pointer text-fg">{f.q}</summary>
                <p className="mt-2 text-fg-muted leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold">Related tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {[
              { href: '/my-location', t: 'My Location', d: 'Your exact position to read out to 112' },
              { href: '/public-toilets-near-me', t: 'Public Toilets Near Me', d: 'Free and accessible toilets nearby' },
              { href: '/driving-directions', t: 'Driving Directions', d: 'Route to the hospital by car' },
              { href: '/whats-my-postcode', t: "What's My Postcode", d: 'Your postcode for forms and taxis' },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="glass rounded-2xl p-4 hover:ring-accent/40 ring-1 ring-line transition no-underline">
                <h3 className="font-display text-base font-bold text-fg hover:text-accent transition">{t.t}</h3>
                <p className="text-xs text-fg-subtle mt-1">{t.d}</p>
              </Link>
            ))}
          </div>
        </section>
        <SideAd />
        <AuthorBio />
      </main>
    </>
  );
}
