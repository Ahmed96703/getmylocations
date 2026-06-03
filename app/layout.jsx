import './globals.css';
import SiteHeader from './components/SiteHeader.jsx';
import Footer from './components/Footer.jsx';

export const metadata = {
  metadataBase: new URL('https://getmylocations.com'),
  title: {
    default: 'GetMyLocations — Find My Location, GPS Coordinates & IP',
    template: '%s | GetMyLocations',
  },
  description:
    'Free, privacy-first location tools — find my GPS coordinates, IP location, distance calculator, address finder, and more. No signup, runs in your browser.',
  authors: [{ name: 'GetMyLocations' }],
  generator: 'Next.js',
  referrer: 'strict-origin-when-cross-origin',
  alternates: {
    canonical: '/',
    languages: { 'en': '/' },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'jlxjqyFGo2NOPZS3SP8PhpN7qPTG2Vx-wWengnckQKU',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://getmylocations.com/',
    siteName: 'GetMyLocations',
    title: 'GetMyLocations — Find My Location, GPS Coordinates & IP',
    description:
      'Free, privacy-first location tools. Find GPS coordinates, IP location, distance, address — all in your browser.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GetMyLocations — Find My Location & GPS Tools',
    description: 'Free location tools — runs in your browser, no signup.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GetMyLocations',
  url: 'https://getmylocations.com/',
  logo: 'https://getmylocations.com/icon-512.png',
  sameAs: [],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'GetMyLocations',
  url: 'https://getmylocations.com/',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://getmylocations.com/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

// Runs synchronously before paint to apply the user's preferred theme.
// Avoids the flash-of-wrong-theme on first load.
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2240955720087760"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <SiteHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
