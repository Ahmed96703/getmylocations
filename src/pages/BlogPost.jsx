import { lazy, Suspense, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout.jsx';
import AdSlot from '../components/AdSlot.jsx';
import { findPost } from '../posts/manifest.js';

const POSTS = {
  'how-to-find-your-gps-coordinates': lazy(() => import('../posts/HowToFindGpsCoordinates.jsx')),
  'what-is-ip-location-and-how-accurate': lazy(() => import('../posts/WhatIsIpLocation.jsx')),
  'latitude-vs-longitude-explained': lazy(() => import('../posts/LatitudeVsLongitude.jsx')),
  'how-gps-works': lazy(() => import('../posts/HowGpsWorks.jsx')),
  '10-uses-for-gps-coordinates': lazy(() => import('../posts/TenUsesForGpsCoordinates.jsx')),
  'how-to-share-gps-location-safely': lazy(() => import('../posts/HowToShareGpsLocationSafely.jsx')),
  'browser-geolocation-api-explained': lazy(() => import('../posts/BrowserGeolocationApi.jsx')),
  'gps-coordinates-emergencies-aml-guide': lazy(() => import('../posts/GpsCoordinatesEmergencies.jsx')),
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = findPost(slug);
  const Body = POSTS[slug];

  useEffect(() => {
    if (!post) return;
    const canonical = `https://getmylocations.com/blog/${post.slug}`;
    let link = document.querySelector('link[rel="canonical"]');
    const prev = link?.getAttribute('href');
    if (link) link.setAttribute('href', canonical);
    return () => { if (link && prev) link.setAttribute('href', prev); };
  }, [post]);

  if (!post || !Body) return <Navigate to="/blog" replace />;

  const dateStr = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: 'GetMyLocations' },
    publisher: {
      '@type': 'Organization',
      name: 'GetMyLocations',
      logo: { '@type': 'ImageObject', url: 'https://getmylocations.com/icon-512.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://getmylocations.com/blog/${post.slug}` },
    image: 'https://getmylocations.com/og-image.png',
  };

  return (
    <PageLayout title={post.title}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Breadcrumb" className="text-xs text-slate-400 mb-4">
        <Link to="/" className="hover:text-electric-400">Home</Link>
        <span aria-hidden="true" className="mx-1.5">/</span>
        <Link to="/blog" className="hover:text-electric-400">Blog</Link>
      </nav>

      <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">{post.title}</h1>

      <div className="mt-4 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-electric-400 to-electric-600 grid place-items-center text-ink-950 font-bold text-sm" aria-hidden="true">G</div>
          <div className="text-sm leading-tight">
            <div className="font-semibold text-slate-100">GetMyLocations Editorial</div>
            <div className="text-xs text-slate-400">
              <time dateTime={post.date}>{dateStr}</time>
              <span className="mx-1.5" aria-hidden="true">·</span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </div>
        {post.tags?.length > 0 && (
          <ul className="flex gap-1.5 ml-auto">
            {post.tags.map((t) => (
              <li key={t} className="px-2 py-0.5 rounded-full bg-white/5 ring-1 ring-white/10 text-[11px] uppercase tracking-wider text-slate-300">{t}</li>
            ))}
          </ul>
        )}
      </div>

      <hr className="my-8 border-white/10" />

      <Suspense fallback={<div className="text-slate-400 text-sm">Loading…</div>}>
        <Body />
      </Suspense>

      <AdSlot label="Advertisement" format="fluid" layout="in-article" minHeight={200} />

      <div className="mt-14 p-6 glass rounded-2xl">
        <div className="text-xs uppercase tracking-[0.16em] text-electric-400 font-semibold">Try the tool</div>
        <div className="font-display text-xl font-bold mt-1">Find your exact GPS coordinates in 2 seconds</div>
        <p className="text-sm text-slate-300/90 mt-1">Free, no signup, runs entirely in your browser.</p>
        <Link to="/" className="btn-primary mt-4 inline-flex">Open GetMyLocations</Link>
      </div>

      <Link to="/blog" className="block mt-10 text-sm text-electric-400 hover:underline">← Back to all posts</Link>
    </PageLayout>
  );
}
