import Link from 'next/link';
import { breadcrumbSchema } from './breadcrumbSchema.js';
import AuthorBio from './AuthorBio.jsx';
import AdSense from './AdSense.jsx';
import Monetag from './Monetag.jsx';
import NativeAd from './NativeAd.jsx';
import SideAd from './SideAd.jsx';
import { AUTHOR } from './author.js';
import { NET_TOOLS } from './netTools.js';

const SITE = 'https://getmylocations.com';

// Page metadata for a tool page: title, description and keywords, with the
// canonical URL, Open Graph and Twitter cards filled in the same way as the
// other tool pages.
export function toolMetadata({ path, title, description, keywords }) {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: { title, description, url: `${SITE}${path}`, type: 'website', images: ['/og-image.png'] },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] },
  };
}

// Shared layout for the network, web and text tools: breadcrumb, heading,
// the tool, the ads, the guide (children), FAQ and related tools. Every page
// still writes its own guide; this only removes the repeated frame.
export default function ToolPage({ path, name, eyebrow, h1, accent, intro, appDescription, tool, faqs = [], related = [], children }) {
  const crumbs = breadcrumbSchema([{ name, path }]);
  const app = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description: appDescription,
    url: `${SITE}${path}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@type': 'Organization', name: 'GetMyLocations' },
    author: AUTHOR,
  };
  // Related tools: the ones the page names first, then others from the same group.
  const own = NET_TOOLS.find((t) => t.href === path);
  const picks = [
    ...related.map((href) => NET_TOOLS.find((t) => t.href === href) || null).filter(Boolean),
    ...NET_TOOLS.filter((t) => t.group === own?.group && t.href !== path && !related.includes(t.href)),
  ].slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <AdSense />

      <Monetag />

      <main role="main" className="max-w-5xl mx-auto px-5 py-10">
        <nav aria-label="Breadcrumb" className="text-xs text-fg-subtle mb-3">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
            <li aria-hidden="true">›</li>
            <li className="text-fg-muted">{name}</li>
          </ol>
        </nav>

        <section className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-2">{eyebrow}</p>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            {h1}{accent && <>: <span className="text-accent">{accent}</span></>}
          </h1>
          <p className="text-lg text-fg-muted mt-4 max-w-3xl">{intro}</p>
        </section>

        {tool}
        <NativeAd />
        <SideAd />

        <div className="tool-guide">{children}</div>

        {faqs.length > 0 && (
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
        )}

        {picks.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold">Related tools</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
              {picks.map((t) => (
                <Link key={t.href} href={t.href} className="glass rounded-2xl p-4 hover:ring-accent/40 ring-1 ring-line transition no-underline">
                  <h3 className="font-display text-base font-bold text-fg hover:text-accent transition">{t.label}</h3>
                  <p className="text-xs text-fg-subtle mt-1">{t.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
        <AuthorBio />
      </main>
    </>
  );
}

// Guide building blocks, so every page's text uses the same styles.
export function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

export function P({ children }) {
  return <p className="mt-3 text-fg-muted leading-relaxed">{children}</p>;
}

export function UL({ items }) {
  return (
    <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside leading-relaxed">
      {items.map((it, i) => <li key={i}>{it}</li>)}
    </ul>
  );
}

export function OL({ items }) {
  return (
    <ol className="mt-3 space-y-2 text-fg-muted list-decimal list-inside leading-relaxed">
      {items.map((it, i) => <li key={i}>{it}</li>)}
    </ol>
  );
}

export function B({ children }) {
  return <strong className="text-fg">{children}</strong>;
}

export function Code({ children }) {
  return <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">{children}</code>;
}

export function A({ href, children }) {
  return href.startsWith('/')
    ? <Link href={href} className="text-accent hover:underline">{children}</Link>
    : <a href={href} target="_blank" rel="noopener" className="text-accent hover:underline">{children}</a>;
}

export function Table({ head, rows }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl ring-1 ring-line">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-tint/5 text-left text-fg-muted">
            {head.map((h) => <th key={h} className="px-3 py-2 font-semibold">{h}</th>)}
          </tr>
        </thead>
        <tbody className="text-fg-muted">
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-line-subtle">
              {r.map((c, j) => <td key={j} className={`px-3 py-2 ${j === 0 ? 'text-fg whitespace-nowrap' : ''}`}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
