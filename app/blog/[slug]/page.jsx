import Link from 'next/link';
import { notFound } from 'next/navigation';
import { POSTS, findPost } from '../../posts/manifest.js';
import AuthorBio from '../../components/AuthorBio.jsx';

import BrowserGeolocationApi from '../../posts/BrowserGeolocationApi.jsx';
import GpsCoordinatesEmergencies from '../../posts/GpsCoordinatesEmergencies.jsx';
import HowGpsWorks from '../../posts/HowGpsWorks.jsx';
import HowToFindGpsCoordinates from '../../posts/HowToFindGpsCoordinates.jsx';
import HowToShareGpsLocationSafely from '../../posts/HowToShareGpsLocationSafely.jsx';
import LatitudeVsLongitude from '../../posts/LatitudeVsLongitude.jsx';
import TenUsesForGpsCoordinates from '../../posts/TenUsesForGpsCoordinates.jsx';
import WhatIsIpLocation from '../../posts/WhatIsIpLocation.jsx';
import WhatYourIpReveals from '../../posts/WhatYourIpReveals.jsx';
import WhyMapsShowWrongStreet from '../../posts/WhyMapsShowWrongStreet.jsx';
import LatLonHistory from '../../posts/LatLonHistory.jsx';

const POST_COMPONENTS = {
  'browser-geolocation-api-explained': BrowserGeolocationApi,
  'gps-coordinates-emergencies-aml-guide': GpsCoordinatesEmergencies,
  'how-gps-works': HowGpsWorks,
  'how-to-find-your-gps-coordinates': HowToFindGpsCoordinates,
  'how-to-share-gps-location-safely': HowToShareGpsLocationSafely,
  'latitude-vs-longitude-explained': LatitudeVsLongitude,
  '10-uses-for-gps-coordinates': TenUsesForGpsCoordinates,
  'what-is-ip-location-and-how-accurate': WhatIsIpLocation,
  'what-your-ip-reveals': WhatYourIpReveals,
  'why-maps-show-wrong-street': WhyMapsShowWrongStreet,
  'history-of-latitude-and-longitude': LatLonHistory,
};

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = findPost(params.slug);
  if (!post) return { title: 'Post not found' };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://getmylocations.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default function BlogPost({ params }) {
  const post = findPost(params.slug);
  const Body = POST_COMPONENTS[params.slug];
  if (!post || !Body) notFound();

  const dateStr = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: 'Ahmed Anwar' },
    publisher: {
      '@type': 'Organization',
      name: 'GetMyLocations',
      logo: { '@type': 'ImageObject', url: 'https://getmylocations.com/icon-512.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://getmylocations.com/blog/${post.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main role="main" className="max-w-3xl mx-auto px-5 py-12">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-400 mb-4">
          <Link href="/" className="hover:text-electric-400">Home</Link>
          <span aria-hidden="true" className="mx-1.5">/</span>
          <Link href="/blog" className="hover:text-electric-400">Blog</Link>
        </nav>

        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">{post.title}</h1>

        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-electric-400 to-electric-600 grid place-items-center text-ink-950 font-bold text-sm" aria-hidden="true">A</div>
            <div className="text-sm leading-tight">
              <div className="font-semibold text-slate-100">Ahmed Anwar</div>
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

        <Body />

        <AuthorBio />

        <Link href="/blog" className="block mt-10 text-sm text-electric-400 hover:underline">← Back to all posts</Link>
      </main>
    </>
  );
}
