import { Inter, Sora } from 'next/font/google';
import './globals.css';
import SiteHeader from './components/SiteHeader.jsx';
import Footer from './components/Footer.jsx';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://getmylocations.com/'),
  title: {
    default: 'GetMyLocations — Find My Location, GPS Coordinates & IP',
    // No brand suffix: it cost 17 of the ~60 characters Google renders, on a
    // brand that drew 5 impressions in three months. Pages carry their own
    // full title instead.
    template: '%s',
  },
  description:
    'Free, privacy-first location tools — find my GPS coordinates, IP location, distance calculator, address finder, and more. No signup, runs in your browser.',
  authors: [{ name: 'GetMyLocations' }],
  generator: 'Next.js',
  referrer: 'strict-origin-when-cross-origin',
  alternates: {
    canonical: '/',
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
    // SVG for modern browsers, with a raster fallback — Google's favicon
    // crawler and some SERP surfaces do not render SVG.
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
};

// Google Analytics 4. Set NEXT_PUBLIC_GA_ID in the build environment to enable;
// without it the tag is omitted entirely rather than firing against a blank ID.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
  sameAs: ['https://github.com/Ahmed96703'],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'GetMyLocations',
  url: 'https://getmylocations.com/',
};

const siteNavSchema = {
  '@context': 'https://schema.org',
  '@type': 'SiteNavigationElement',
  name: 'Main Navigation',
  hasPart: [
    { '@type': 'WebPage', name: 'My Location', url: 'https://getmylocations.com/my-location' },
    { '@type': 'WebPage', name: 'Live Location', url: 'https://getmylocations.com/live-location' },
    { '@type': 'WebPage', name: 'Coordinates Converter', url: 'https://getmylocations.com/coordinates-converter' },
    { '@type': 'WebPage', name: 'IP Location', url: 'https://getmylocations.com/ip-location' },
    { '@type': 'WebPage', name: 'Distance Calculator', url: 'https://getmylocations.com/distance-calculator' },
    { '@type': 'WebPage', name: 'Address Finder', url: 'https://getmylocations.com/address-finder' },
    { '@type': 'WebPage', name: 'Maps', url: 'https://getmylocations.com/maps' },
    { '@type': 'WebPage', name: 'Street View', url: 'https://getmylocations.com/street-view' },
    { '@type': 'WebPage', name: 'Driving Directions', url: 'https://getmylocations.com/driving-directions' },
    { '@type': 'WebPage', name: 'Blog', url: 'https://getmylocations.com/blog' },
    { '@type': 'WebPage', name: 'About', url: 'https://getmylocations.com/about' },
    { '@type': 'WebPage', name: 'Contact', url: 'https://getmylocations.com/contact' },
  ],
};

// Runs synchronously before paint to apply the user's preferred theme.
// Avoids the flash-of-wrong-theme on first load.
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" data-theme="light" className={`${inter.variable} ${sora.variable}`}>
      <head>
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavSchema) }}
        />
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`,
              }}
            />
          </>
        )}
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
