import Link from 'next/link';
import { POSTS } from '../posts/manifest.js';

export const metadata = {
  title: 'Blog — Notes on GPS, geolocation, and online privacy',
  description:
    'Articles about how GPS actually works, how the browser Geolocation API behaves, how IP geolocation is built, and what to do when the location your phone shows is wrong.',
  alternates: { canonical: '/blog' },
};

export default function Blog() {
  return (
    <main role="main" className="max-w-3xl mx-auto px-5 py-12">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Blog</h1>
      <p className="mt-3 text-slate-300/90">
        Notes on GPS, geolocation, and the small ways the location your phone shows
        can be wrong.
      </p>

      <ul className="mt-10 space-y-5">
        {POSTS.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="block glass rounded-2xl p-6 hover:ring-electric-400/40 ring-1 ring-white/10 transition group"
            >
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
        ))}
      </ul>
    </main>
  );
}
