import { Inter, Sora } from 'next/font/google';
import './globals.css';
import SiteHeader from './components/SiteHeader.jsx';
import Footer from './components/Footer.jsx';
import MidAd from './components/MidAd.jsx';
import NativeAd from './components/NativeAd.jsx';
import StickyAd from './components/StickyAd.jsx';
import { LEGACY_ADS } from './components/adQueue.js';

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
  // No site-wide canonical: every page sets its own, and a default here
  // would make error pages claim the homepage as their canonical.
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
    yandex: '3ce52bf25b66fa21',
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

// Google Analytics 4. The measurement ID is public (it appears in every page's
// HTML), so it is set here; NEXT_PUBLIC_GA_ID can still override it.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-61M4GZ7H3N';

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
    { '@type': 'WebPage', name: 'Radius Map', url: 'https://getmylocations.com/radius-map' },
    { '@type': 'WebPage', name: 'Fire Map', url: 'https://getmylocations.com/fire-map' },
    { '@type': 'WebPage', name: 'Address Finder', url: 'https://getmylocations.com/address-finder' },
    { '@type': 'WebPage', name: "What's My ZIP Code", url: 'https://getmylocations.com/whats-my-zip-code' },
    { '@type': 'WebPage', name: "What's My Postcode", url: 'https://getmylocations.com/whats-my-postcode' },
    { '@type': 'WebPage', name: 'Maps', url: 'https://getmylocations.com/maps' },
    { '@type': 'WebPage', name: 'Satellite View', url: 'https://getmylocations.com/satellite' },
    { '@type': 'WebPage', name: 'Street View', url: 'https://getmylocations.com/street-view' },
    { '@type': 'WebPage', name: 'Driving Directions', url: 'https://getmylocations.com/driving-directions' },
    { '@type': 'WebPage', name: 'Blog', url: 'https://getmylocations.com/blog' },
    { '@type': 'WebPage', name: 'About', url: 'https://getmylocations.com/about' },
    { '@type': 'WebPage', name: 'Contact', url: 'https://getmylocations.com/contact' },
  ],
};

// Runs synchronously before paint to apply the user's preferred theme.
// Avoids the flash-of-wrong-theme on first load.
const GROW_INIT_SCRIPT = `!(function(){window.growMe||((window.growMe=function(e){window.growMe._.push(e);}),(window.growMe._=[]));var e=document.createElement("script");(e.type="text/javascript"),(e.src="https://faves.grow.me/main.js"),(e.defer=!0),e.setAttribute("data-grow-faves-site-id","U2l0ZTo0OGU5NzA1Zi04ZGRmLTRlODMtODE4Mi05MDlmMDAzZDQxM2Y=");var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t);})();`;

// GA4 with Google Consent Mode. In the EEA, UK and Switzerland analytics and
// ad storage start denied; Mediavine's consent banner (IAB TCF, shown only
// where the law requires it) then decides. Its own Consent Mode switch is off
// ("cm_cmp_consentmode": false in its config), so the TCF choice is passed to
// gtag here: analytics needs purposes 1 (store on device) and 8 (measure
// content), ads purposes 1, 3, 4 and 7 as Google maps them.
const CONSENT_REGIONS = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH'];
const GA_INIT_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',region:${JSON.stringify(CONSENT_REGIONS)},wait_for_update:500});
gtag('consent','default',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});
gtag('js',new Date());gtag('config','${GA_ID}');
(function(){var n=0;function hook(){if(typeof window.__tcfapi!=='function'){if(n++<40)setTimeout(hook,250);return}
window.__tcfapi('addEventListener',2,function(d,ok){if(!ok||!d||!d.gdprApplies)return;if(d.eventStatus!=='tcloaded'&&d.eventStatus!=='useractioncomplete')return;
var c=(d.purpose&&d.purpose.consents)||{};function g(b){return b?'granted':'denied'}
gtag('consent','update',{ad_storage:g(c[1]),ad_user_data:g(c[1]&&c[7]),ad_personalization:g(c[3]&&c[4]),analytics_storage:g(c[1]&&c[8])});});}hook();})();`;

// Location permission events for every tool at once: wraps the browser's
// geolocation calls and reports only whether a position was found, denied or
// failed, never the position itself. One event per call (per watch, for live
// tracking). See app/components/track.js for the other events.
const GEO_TRACK_SCRIPT = `(function(){var g=navigator.geolocation;if(!g)return;
function ev(n,p){try{var o={tool:location.pathname};for(var k in p)o[k]=p[k];window.gtag&&window.gtag('event',n,o)}catch(e){}}
function wrap(name){var orig=g[name];if(typeof orig!=='function')return;g[name]=function(ok,err,opt){var sent=false;function once(n,p){if(!sent){sent=true;ev(n,p)}}
return orig.call(g,function(pos){once('location_found',{method:name==='watchPosition'?'live':'once'});if(ok)ok(pos)},function(e){once(e&&e.code===1?'location_denied':'location_error',{code:e?e.code:0});if(err)err(e)},opt)}}
wrap('getCurrentPosition');wrap('watchPosition')})();`;

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" data-theme="light" className={`${inter.variable} ${sora.variable}`}>
      <head>
        {/* Open connections to the ad servers while the HTML is still arriving:
            the wrapper, its settings and Google's ad tag each start a new
            connection otherwise, which pushes the first ad back. */}
        <link rel="preconnect" href="https://scripts.scriptwrapper.com" />
        <link rel="preconnect" href="https://scripts.journeymv.com" />
        <link rel="preconnect" href="https://securepubads.g.doubleclick.net" />
        {/* Mediavine (Journey) ad script, first in <head> as Mediavine asks:
            earlier execution means more competitive bids. */}
        <script
          type="text/javascript"
          async
          data-noptimize="1"
          data-cfasync="false"
          src="https://scripts.scriptwrapper.com/tags/a06f0ea4-130f-4d01-9141-3bd6dcc5e239.js"
        />
        {/* Grow (Mediavine) installation script, as given in the Grow dashboard. */}
        <script
          data-grow-initializer=""
          dangerouslySetInnerHTML={{ __html: GROW_INIT_SCRIPT }}
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavSchema) }}
        />
        {GA_ID && (
          <>
            {/* Consent defaults first, then the library. */}
            <script
              dangerouslySetInnerHTML={{
                __html: GA_INIT_SCRIPT,
              }}
            />
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: GEO_TRACK_SCRIPT }} />
          </>
        )}
      </head>
      <body>
        {/* Mediavine "Disable Ads" settings, from its dashboard tool. In the
            layout, so they apply to every page: no ZergNet (a widget that sends
            readers to other sites) and no Chicory (recipe ingredient ads). */}
        <div id="ad-management-config-settings" data-blocklist-chicory="1" data-blocklist-zergnet="1" />
        <a href="#content" className="skip-link">Skip to content</a>
        <SiteHeader />
        {LEGACY_ADS && <NativeAd />}
        <div className="journey-wrap">
          <div id="content" tabIndex={-1}>{children}</div>
          {/* Mediavine puts its sticky sidebar ad in here (selector #journey-sidebar,
              stopping at .site-footer). Shown only in the right margin of text
              pages wide enough for a 300px ad; see globals.css. */}
          <aside id="journey-sidebar" aria-label="Advertisement" />
        </div>
        <Footer />
        {LEGACY_ADS && <MidAd />}
        {LEGACY_ADS && <StickyAd />}
      </body>
    </html>
  );
}
