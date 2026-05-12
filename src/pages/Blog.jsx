import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout.jsx';
import AdSlot from '../components/AdSlot.jsx';
import { POSTS } from '../posts/manifest.js';

const AD_AFTER_INDEX = 1; // insert after the second post

export default function Blog() {
  return (
    <PageLayout title="Blog">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Blog</h1>
      <p className="mt-3 text-slate-300/90">Guides and notes on geolocation, GPS coordinates, and finding your way online.</p>

      <ul className="mt-10 space-y-5">
        {POSTS.map((p, i) => (
          <Fragment key={p.slug}>
            <li>
              <Link to={`/blog/${p.slug}`} className="block glass rounded-2xl p-6 hover:ring-electric-400/40 ring-1 ring-white/10 transition group">
                <time className="text-xs text-slate-400 uppercase tracking-wider">
                  {new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  <span className="mx-2" aria-hidden="true">·</span>
                  {p.readingTime} min read
                </time>
                <h2 className="font-display text-xl font-bold mt-1.5 leading-snug group-hover:text-electric-400 transition">{p.title}</h2>
                <p className="text-sm text-slate-300/90 mt-2">{p.excerpt}</p>
                <span className="inline-block mt-3 text-xs text-electric-400 font-semibold uppercase tracking-wider">Read article →</span>
              </Link>
            </li>
            {i === AD_AFTER_INDEX && <li aria-hidden="true"><AdSlot label="Advertisement" minHeight={250} /></li>}
          </Fragment>
        ))}
      </ul>
    </PageLayout>
  );
}
