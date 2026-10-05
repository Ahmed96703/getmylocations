import Link from 'next/link';
import { breadcrumbSchema } from '../components/breadcrumbSchema.js';
import { POSTS } from '../posts/manifest.js';
import { AUTHOR } from '../components/author.js';

const TITLE = 'GPS, Location & IP Guides — How It Works and How to Fix It';
const DESCRIPTION =
  'Plain-English guides to GPS, coordinates, IP location and location permissions, written from primary sources and kept up to date. Find your fix fast.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/blog' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://getmylocations.com/blog',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
};

const lastChanged = (p) => p.modifiedDate || p.date;
// The newest post date, the same value the sitemap gives /blog at build time.
const UPDATED = POSTS.map(lastChanged).sort().at(-1);

const fmt = (d) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

const link = 'text-accent hover:underline';

// Each topic leads with the tools it supports, so the index works as a map of
// the whole site rather than a list of dates.
const TOPICS = [
  {
    id: 'gps',
    title: 'GPS and your coordinates',
    intro: (
      <>
        How satellites put a dot on your screen, how to read and share the numbers, and what they are useful for. Tools:{' '}
        <Link href="/my-location" className={link}>My Location</Link>,{' '}
        <Link href="/live-location" className={link}>Live Location</Link> and the{' '}
        <Link href="/coordinates-converter" className={link}>Coordinates Converter</Link>.
      </>
    ),
  },
  {
    id: 'permissions',
    title: 'Location permissions and privacy',
    intro: (
      <>
        Turning location on in each operating system and browser, what a website can and cannot see, and how to share
        your position without oversharing. If a site still cannot find you, work through the{' '}
        <Link href="/fix-location-not-working" className={link}>location not working fix guide</Link>.
      </>
    ),
  },
  {
    id: 'ip',
    title: 'IP address and location',
    intro: (
      <>
        What an IP address reveals, how accurate IP location really is, and why it so often names the wrong city. Tools:{' '}
        <Link href="/ip-location" className={link}>IP Location</Link> and the{' '}
        <Link href="/gps-vs-ip-accuracy" className={link}>GPS vs IP accuracy comparison</Link>.
      </>
    ),
  },
  {
    id: 'maps',
    title: 'Maps, addresses and distance',
    intro: (
      <>
        Why a map pin lands on the wrong door, and the tools for moving between places and addresses:{' '}
        <Link href="/address-finder" className={link}>Address Finder</Link>,{' '}
        <Link href="/reverse-geocoding" className={link}>reverse geocoding</Link>,{' '}
        <Link href="/distance-calculator" className={link}>Distance Calculator</Link>,{' '}
        <Link href="/street-view" className={link}>Street View</Link>,{' '}
        <Link href="/driving-directions" className={link}>Driving Directions</Link> and the{' '}
        <Link href="/maps" className={link}>interactive map</Link>.
      </>
    ),
  },
];

// Fail the build rather than silently drop a post with a missing or unknown topic.
const orphans = POSTS.filter((p) => !TOPICS.some((t) => t.id === p.topic));
if (orphans.length) throw new Error(`Blog posts without a known topic: ${orphans.map((p) => p.slug).join(', ')}`);

const FIXES = [
  ['A website says it cannot get my location', '/fix-location-not-working'],
  ['Location is turned off on my laptop', '/blog/enable-location-on-windows-and-mac'],
  ['Location is turned off on my iPhone or Android', '/blog/enable-location-on-iphone-and-android'],
  ['The map puts me on the wrong street', '/blog/why-maps-show-wrong-street'],
  ['A site thinks I am in the wrong city', '/gps-vs-ip-accuracy'],
];

function PostCard({ p }) {
  const updated = p.modifiedDate && p.modifiedDate !== p.date;
  return (
    <li>
      <Link
        href={`/blog/${p.slug}`}
        className="block glass rounded-2xl p-6 hover:ring-accent/40 ring-1 ring-line transition group"
      >
        <p className="text-xs text-fg-subtle uppercase tracking-wider">
          {updated ? (
            <>Updated <time dateTime={p.modifiedDate}>{fmt(p.modifiedDate)}</time></>
          ) : (
            <time dateTime={p.date}>{fmt(p.date)}</time>
          )}
          <span className="mx-2" aria-hidden="true">·</span>
          {p.readingTime} min read
        </p>
        <h3 className="font-display text-xl font-bold mt-1.5 leading-snug group-hover:text-accent transition">{p.title}</h3>
        <p className="text-sm text-fg-muted mt-2">{p.excerpt}</p>
        <span className="inline-block mt-3 text-xs text-accent font-semibold uppercase tracking-wider">Read article →</span>
      </Link>
    </li>
  );
}

export default function Blog() {
  const crumbs = breadcrumbSchema([{ name: 'Blog', path: '/blog' }]);
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'GetMyLocations Blog',
    url: 'https://getmylocations.com/blog',
    description: DESCRIPTION,
    dateModified: UPDATED,
    publisher: { '@type': 'Organization', name: 'GetMyLocations' },
    blogPost: POSTS.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      dateModified: lastChanged(p),
      author: AUTHOR,
      url: `https://getmylocations.com/blog/${p.slug}`,
    })),
  };
  const byTopic = (id) =>
    POSTS.filter((p) => p.topic === id).sort((a, b) => lastChanged(b).localeCompare(lastChanged(a)));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <main role="main" className="max-w-3xl mx-auto px-5 py-12">
        <nav aria-label="Breadcrumb" className="text-xs text-fg-subtle mb-3">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-fg-muted">Blog</li>
          </ol>
        </nav>

        <h1 className="font-display text-4xl font-extrabold tracking-tight">GPS, location and IP guides</h1>
        <p className="mt-3 text-fg-muted">
          Plain-English guides to how GPS, coordinates and IP location work, and what to do when the location your phone
          or browser shows is wrong. Each guide sits next to the free tool that lets you see the idea in action.
        </p>
        <p className="mt-3 text-sm text-fg-subtle">
          Updated <time dateTime={UPDATED}>{fmt(UPDATED)}</time> · Written by{' '}
          <Link href="/about" className={link}>Ahmed Anwar</Link>
        </p>

        <section className="mt-8 rounded-2xl border border-line-subtle bg-tint/5 p-5" aria-labelledby="fix-fast">
          <h2 id="fix-fast" className="font-display text-xl font-bold">Fix a location problem fast</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {FIXES.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className={link}>{label} →</Link>
              </li>
            ))}
          </ul>
        </section>

        {TOPICS.map((t) => (
          <section key={t.id} className="mt-12" aria-labelledby={`topic-${t.id}`}>
            <h2 id={`topic-${t.id}`} className="font-display text-2xl font-bold">{t.title}</h2>
            <p className="mt-2 text-fg-muted leading-relaxed">{t.intro}</p>
            <ul className="mt-5 space-y-5">
              {byTopic(t.id).map((p) => <PostCard key={p.slug} p={p} />)}
            </ul>
          </section>
        ))}

        <section className="mt-12 rounded-2xl border border-line-subtle bg-tint/5 p-5" aria-labelledby="how-written">
          <h2 id="how-written" className="font-display text-xl font-bold">How these guides are written</h2>
          <p className="mt-2 text-sm text-fg-muted leading-relaxed">
            Each guide is checked against standards documents, official platform documentation, and the devices it
            describes, rather than other people&rsquo;s summaries. Numbers carry their source, and tool output is
            generated from the tools&rsquo; own code. When a guide is revised, the date on its card changes.
          </p>
          <p className="mt-2 text-sm text-fg-muted leading-relaxed">
            Found a mistake? Send the page title and the sentence through the{' '}
            <Link href="/contact" className={link}>contact page</Link>; fixes are listed in the{' '}
            <Link href="/about#corrections" className={link}>public corrections log</Link>.
          </p>
        </section>
      </main>
    </>
  );
}
