import Link from 'next/link';
import { breadcrumbSchema } from '../components/breadcrumbSchema.js';
import { POSTS } from '../posts/manifest.js';

export const metadata = {
  title: 'Blog — Notes on GPS, geolocation, and online privacy',
  description:
    'How GPS actually works, how the browser Geolocation API behaves, how IP geolocation is built, and what to do when your phone shows the wrong place.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — GPS, geolocation, and privacy notes',
    description:
      'Long-form guides on GPS, IP geolocation, browser permissions, and location accuracy.',
    url: 'https://getmylocations.com/blog',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — GPS, geolocation, and privacy notes',
    description:
      'Long-form guides on GPS, IP geolocation, browser permissions, and location accuracy.',
    images: ['/og-image.png'],
  },
};

export default function Blog() {
  const crumbs = breadcrumbSchema([{ name: 'Blog', path: '/blog' }]);
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'GetMyLocations Blog',
    url: 'https://getmylocations.com/blog',
    description:
      'Long-form guides on GPS, IP geolocation, browser permissions, and location accuracy.',
    publisher: { '@type': 'Organization', name: 'GetMyLocations' },
    blogPost: POSTS.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      dateModified: p.modifiedDate || p.date,
      author: {
        '@type': 'Person',
        name: 'Ahmed Anwar',
        url: 'https://getmylocations.com/about',
      },
      url: `https://getmylocations.com/blog/${p.slug}`,
    })),
  };
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

      <h1 className="font-display text-4xl font-extrabold tracking-tight">Blog</h1>
      <p className="mt-3 text-fg-muted">
        Notes on GPS, geolocation, and the small ways the location your phone shows
        can be wrong.
      </p>
      <p className="mt-3 text-sm text-fg-subtle">
        Last reviewed June 3, 2026. Posts are written from primary sources, tested on
        real devices where relevant, and corrected when readers point out mistakes.
      </p>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <article className="glass rounded-2xl p-5 ring-1 ring-line">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">Start here</p>
          <h2 className="font-display text-xl font-bold mt-1">Begin with the GPS basics</h2>
          <p className="mt-2 text-sm text-fg-muted leading-relaxed">
            Read the GPS and browser geolocation explainers first if you want the
            fastest path to the concepts the rest of the guides depend on.
          </p>
        </article>
        <article className="glass rounded-2xl p-5 ring-1 ring-line">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">Editorial note</p>
          <h2 className="font-display text-xl font-bold mt-1">Primary sources first</h2>
          <p className="mt-2 text-sm text-fg-muted leading-relaxed">
            We prefer standards docs, official platform docs, and direct device testing
            over recycled summaries and generic SEO filler.
          </p>
        </article>
        <article className="glass rounded-2xl p-5 ring-1 ring-line">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">Corrections</p>
          <h2 className="font-display text-xl font-bold mt-1">Send exact fixes</h2>
          <p className="mt-2 text-sm text-fg-muted leading-relaxed">
            If a paragraph is wrong, email the page title and the sentence so we can
            patch it without guessing.
          </p>
        </article>
      </section>

      <section className="mt-8 rounded-2xl border border-line-subtle bg-tint/5 p-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">How to use this blog</p>
        <p className="mt-2 text-sm text-fg-muted leading-relaxed">
          The short guides answer one problem fast. The longer posts explain why the
          problem happens, how the underlying systems work, and when the browser or
          OS is the thing that is actually lying to you. Most articles reference the
          tools on this site — start with the{' '}
          <Link href="/my-location" className="text-accent hover:underline">My Location</Link>{' '}
          finder to see your own GPS fix, then try the{' '}
          <Link href="/coordinates-converter" className="text-accent hover:underline">Coordinates Converter</Link>{' '}
          or{' '}
          <Link href="/distance-calculator" className="text-accent hover:underline">Distance Calculator</Link>{' '}
          to see the concepts in action.
        </p>
      </section>

      <ul className="mt-10 space-y-5">
        {POSTS.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="block glass rounded-2xl p-6 hover:ring-accent/40 ring-1 ring-line transition group"
            >
              <time className="text-xs text-fg-subtle uppercase tracking-wider">
                {new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                <span className="mx-2" aria-hidden="true">·</span>
                {p.readingTime} min read
              </time>
              <h2 className="font-display text-xl font-bold mt-1.5 leading-snug group-hover:text-accent transition">{p.title}</h2>
              <p className="text-sm text-fg-muted mt-2">{p.excerpt}</p>
              <span className="inline-block mt-3 text-xs text-accent font-semibold uppercase tracking-wider">Read article →</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
    </>
  );
}
