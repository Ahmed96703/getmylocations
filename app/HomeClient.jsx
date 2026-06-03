'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './components/Dashboard.jsx';
import ManualInput from './components/ManualInput.jsx';
import PermissionBlocked from './components/PermissionBlocked.jsx';
import TechnicalDetails from './components/TechnicalDetails.jsx';
import { useGeolocation } from './hooks/useGeolocation.js';
import { useReverseGeocode } from './hooks/useReverseGeocode.js';
import { POSTS } from './posts/manifest.js';

// Leaflet must be loaded client-only (uses window/document at module level)
const MapView = dynamic(() => import('./components/MapView.jsx'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-tint/5 animate-pulse" aria-label="Loading map" />,
});

const FAQS = [
  {
    q: 'How does this site know where I am?',
    a: 'When you click the location button, your browser asks the operating system for your position. The OS combines what it can: GPS satellite signals, the Wi-Fi networks visible to your device, the mobile cell you are connected to, and your IP address. It picks the most accurate answer available and hands a single coordinate back to the page. Outdoors on a phone, that is usually 3 to 5 meters. On a laptop indoors, it can be 25 meters or more.',
  },
  {
    q: 'Why is the location it shows me wrong?',
    a: 'Four common reasons. First, you might be indoors, so the OS is using Wi-Fi or IP instead of real GPS. Second, you might be on a VPN, which makes the IP fallback look like the VPN exit. Third, on mobile data the carrier sometimes routes everyone through one regional gateway, so the IP guess can be a city or two off. Fourth, you might have denied the precise location prompt earlier without realising it, which forces the page back to the IP guess.',
  },
  {
    q: 'Do you store my coordinates?',
    a: 'No. The coordinate the page reads stays inside your browser tab. The only thing we send to a third party is the coordinate itself to OpenStreetMap or BigDataCloud, so they can return the city and country name. Once you close the tab there is nothing left on our side to keep or delete.',
  },
  {
    q: 'How many decimal places do I actually need?',
    a: 'Three decimals is roughly a city block. Four is a building. Five is a parking space. Six is around 11 centimeters, which is finer than any consumer GPS chip can deliver under normal conditions. We display six because it is the standard storage format, but treat the last digit as noise.',
  },
  {
    q: 'Will this work on my laptop?',
    a: 'It will work, but accuracy drops sharply because most laptops do not have a GPS chip. Instead the OS falls back to looking up the Wi-Fi access points your laptop can see against Apple and Google databases. In a city with dense Wi-Fi coverage that gets you within about 25 meters. In a rural area with little Wi-Fi, the result might be off by several kilometers because all the OS has left is your IP address.',
  },
  {
    q: 'Does using a VPN change the result?',
    a: 'It changes the IP-based fallback completely but does not touch your real GPS reading. If you have allowed precise location, the page will still see your actual position — the VPN cannot rewrite a signal coming from a satellite. If you have denied precise location, the page will show whichever city your VPN exit is in.',
  },
  {
    q: 'My browser blocked location permanently. How do I undo that?',
    a: 'In Chrome, click the small lock icon to the left of the URL, choose Site settings, and change Location from Block to Allow. Reload the tab. Firefox and Edge work the same way. On Safari, the permission lives in Safari → Settings → Websites → Location.',
  },
  {
    q: 'Is there an ad-free version?',
    a: 'The site is supported by ads served through Google AdSense. There is no paid plan. Everything the site does — reading your location, converting coordinates, displaying the map — is free and works without an account.',
  },
];

const FEATURES = [
  { t: 'Coordinates in two seconds', d: 'One click reads your position from the browser and shows it with the accuracy the device reports.' },
  { t: 'Move and watch it update', d: 'Live mode keeps tracking as you walk or drive, so you can see how the fix improves outdoors.' },
  { t: 'City and country resolution', d: 'The coordinate is reverse-geocoded against OpenStreetMap so you see a readable place name alongside the numbers.' },
  { t: 'Nothing leaves your browser', d: 'The coordinate stays in your tab. Only the city lookup goes to a third party — see the Privacy Policy for what that means in practice.' },
];

const MORE_TOOLS = [
  { href: '/my-location', t: 'My Location', d: 'Where am I right now? Instant GPS coordinates plus city, country, and live map.' },
  { href: '/gps-coordinates', t: 'GPS Coordinates', d: 'Live latitude and longitude in DD and DMS, accuracy, altitude, and watch mode.' },
  { href: '/coordinates-converter', t: 'Coordinates Converter', d: 'Convert any coordinate between Decimal Degrees, DMS, DDM, and UTM formats.' },
  { href: '/ip-location', t: 'IP Location', d: 'Look up the city, country, and ISP of any public IPv4 or IPv6 address.' },
  { href: '/distance-calculator', t: 'Distance Calculator', d: 'Great-circle distance between two coordinates using the Haversine formula.' },
  { href: '/address-finder', t: 'Address Finder', d: 'Address-to-coordinates and coordinates-to-address geocoding both ways.' },
  { href: '/maps', t: 'Interactive Maps', d: 'Explore places with map layers and a cleaner visual context.' },
  { href: '/satellite', t: 'Satellite View', d: 'See a satellite image of any address or coordinate.' },
  { href: '/us-map', t: 'US Map', d: 'Browse a map of the United States at a glance.' },
  { href: '/street-view', t: 'Street View', d: 'See any address or coordinate in Google Street View instantly.' },
  { href: '/driving-directions', t: 'Driving Directions', d: 'Plan a driving, walking, biking, or transit route between two places.' },
];

export default function HomeClient() {
  const [mode, setMode] = useState('auto');
  const [manualPos, setManualPos] = useState(null);
  const [copied, setCopied] = useState(false);
  const [shareState, setShareState] = useState('idle');

  const { pos: autoPos, meta: autoMeta, error, loading, retry, permission } = useGeolocation(mode === 'auto');

  const pos = mode === 'manual' ? manualPos : autoPos;
  const meta = mode === 'manual' ? { accuracy: null, ts: Date.now() } : autoMeta;
  const { data: place, loading: placeLoading } = useReverseGeocode(pos);

  useEffect(() => {
    if (mode === 'manual' && !manualPos && autoPos) setManualPos(autoPos);
  }, [mode, autoPos, manualPos]);

  const onCopy = () => {
    if (!pos) return;
    navigator.clipboard.writeText(`${pos[0]}, ${pos[1]}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const onShare = async () => {
    if (!pos) return;
    const [lat, lon] = pos;
    const placeStr = place ? ` (${place.city}${place.country ? ', ' + place.country : ''})` : '';
    const text = `My current location: ${lat.toFixed(6)}, ${lon.toFixed(6)}${placeStr}\nhttps://getmylocations.com/`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'My location', text, url: 'https://getmylocations.com/' });
        setShareState('shared');
        setTimeout(() => setShareState('idle'), 1800);
        return;
      } catch {
        // user cancelled — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      setShareState('copied');
      setTimeout(() => setShareState('idle'), 1800);
    } catch {
      setShareState('idle');
    }
  };

  const featuredPosts = POSTS.slice(0, 3);

  return (
    <>
      <ul aria-label="Features" className="mt-5 flex flex-wrap gap-2 text-xs">
        {FEATURES.map((f) => (
          <li
            key={f.t}
            title={f.d}
            className="inline-flex items-center px-3 py-1.5 rounded-full bg-tint/5 ring-1 ring-line text-fg-muted"
          >
            <span className="font-medium">{f.t}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        {permission === 'denied' && mode === 'auto' && (
          <div className="mb-6">
            <PermissionBlocked onRetry={retry} onManualMode={() => setMode('manual')} />
          </div>
        )}

        {error && permission !== 'denied' && (
          <div role="alert" className="mb-6 rounded-2xl glass border-rose-400/30 px-5 py-4 flex items-start justify-between gap-4">
            <div>
              <div className="font-semibold text-rose-200">Couldn&rsquo;t access location</div>
              <div className="text-sm text-rose-200/80 mt-0.5">{error}</div>
            </div>
            <button onClick={retry} className="btn-ghost">Retry</button>
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">
          <div className="space-y-4">
            <div
              role="region"
              aria-label="Interactive map"
              className="relative rounded-3xl overflow-hidden ring-1 ring-line shadow-2xl shadow-black/40 h-[480px] sm:h-[560px] glass"
            >
              {loading && !pos && mode === 'auto' && (
                <div className="absolute inset-0 grid place-items-center" aria-busy="true">
                  <div className="flex flex-col items-center gap-3 text-fg-muted">
                    <div className="w-10 h-10 rounded-full border-2 border-electric-400 border-t-transparent animate-spin" />
                    <div className="text-sm">Locating you…</div>
                  </div>
                </div>
              )}
              {pos && (
                <MapView pos={pos} onCopied={() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }} />
              )}
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={onShare}
                disabled={!pos}
                aria-label="Share my location"
                className="btn-primary flex-1 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {shareState === 'shared' ? 'Shared!' : shareState === 'copied' ? 'Link copied!' : 'Share My Location'}
              </button>

              <a
                href="#more-tools"
                className="btn-ghost flex-1 sm:flex-none justify-center"
              >
                Explore more tools
              </a>
            </div>

            <AnimatePresence>
              {mode === 'manual' && (
                <ManualInput key="manual" pos={pos} onApply={(p) => setManualPos(p)} />
              )}
            </AnimatePresence>
          </div>

          <Dashboard
            pos={pos}
            meta={meta}
            place={place}
            placeLoading={placeLoading}
            mode={mode}
            onCopy={onCopy}
            copied={copied}
          />
        </div>
      </div>

      <section aria-labelledby="more-tools" className="mt-14 scroll-mt-24" id="more-tools">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 id="more-tools-h" className="font-display text-2xl font-bold">Core location tools</h2>
            <p className="text-sm text-fg-subtle mt-1">Eleven free, browser-based tools for everything location, GPS, and IP related. Open any one — no signup, no app.</p>
          </div>
          <span className="text-xs text-fg-subtle uppercase tracking-wider">11 tools</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          {MORE_TOOLS.map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="glass rounded-2xl p-5 flex flex-col hover:ring-accent/40 ring-1 ring-line transition group no-underline"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-fg group-hover:text-accent transition">{t.t}</h3>
                <span className="text-[10px] uppercase tracking-wider text-accent font-semibold opacity-0 group-hover:opacity-100 transition">Open →</span>
              </div>
              <p className="text-sm text-fg-subtle mt-2 flex-1 leading-snug">{t.d}</p>
            </a>
          ))}
        </div>
      </section>

      <section aria-labelledby="how" className="mt-14">
        <h2 id="how" className="font-display text-2xl font-bold">How GetMyLocations works</h2>
        <div className="grid sm:grid-cols-3 gap-3 mt-4">
          {[
            { t: 'Allow access', d: 'Approve the one-time browser location prompt.' },
            { t: 'See it live', d: 'Coordinates and your city/country resolve in real time.' },
            { t: 'Explore more', d: 'Visit the Tools menu for a coordinates converter, distance calculator, IP lookup, and more.' },
          ].map((s, i) => (
            <div key={s.t} className="glass rounded-2xl p-5">
              <div className="w-7 h-7 rounded-lg bg-electric-500 text-accent-fg text-sm font-bold grid place-items-center" aria-hidden="true">{i + 1}</div>
              <div className="mt-3 font-semibold">{s.t}</div>
              <p className="text-sm text-fg-muted mt-1">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <TechnicalDetails />

      <section aria-labelledby="featured-posts" className="mt-14">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 id="featured-posts" className="font-display text-2xl font-bold">From the blog</h2>
            <p className="text-sm text-fg-subtle mt-1">Guides on GPS, geolocation, and finding your way online.</p>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-accent hover:text-accent transition">
            View all posts →
          </Link>
        </div>

        <ul className="grid md:grid-cols-3 gap-4 mt-5">
          {featuredPosts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="block h-full glass rounded-2xl p-5 ring-1 ring-line hover:ring-accent/40 transition group"
              >
                <time className="text-[11px] text-fg-subtle uppercase tracking-wider">
                  {new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  {p.readingTime} min read
                </time>
                <h3 className="font-display text-base font-bold mt-1.5 leading-snug group-hover:text-accent transition line-clamp-2">{p.title}</h3>
                <p className="text-sm text-fg-muted/80 mt-2 line-clamp-3">{p.excerpt}</p>
                <span className="inline-block mt-3 text-xs text-accent font-semibold uppercase tracking-wider">Read →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="faq" className="mt-14">
        <h2 id="faq" className="font-display text-2xl font-bold">Frequently asked questions</h2>
        <div className="glass mt-4 rounded-2xl divide-y divide-line-subtle">
          {FAQS.map((f) => (
            <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer list-none font-semibold">
                {f.q}
                <span className="text-accent group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
              </summary>
              <p className="mt-2 text-fg-muted text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

    </>
  );
}
