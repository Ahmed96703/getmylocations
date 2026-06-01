'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from './components/Dashboard.jsx';
import ManualInput from './components/ManualInput.jsx';
import PermissionBlocked from './components/PermissionBlocked.jsx';
import AdSlot from './components/AdSlot.jsx';
import TechnicalDetails from './components/TechnicalDetails.jsx';
import { useGeolocation } from './hooks/useGeolocation.js';
import { useReverseGeocode } from './hooks/useReverseGeocode.js';
import { POSTS } from './posts/manifest.js';

// Leaflet must be loaded client-only (uses window/document at module level)
const MapView = dynamic(() => import('./components/MapView.jsx'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-white/5 animate-pulse" aria-label="Loading map" />,
});

const FAQS = [
  { q: 'Where am I right now?', a: 'Open GetMyLocations and allow the location prompt — within two seconds the page answers "where am I" with your exact coordinates, city, country, and a live map pin. No signup needed.' },
  { q: "What's my location now?", a: 'GetMyLocations is the fastest answer to "what\'s my location now" — it combines GPS, Wi-Fi, and IP signals to show your live position on a map the instant you grant permission.' },
  { q: 'Is there a free lat long finder?', a: 'Yes. GetMyLocations is a free lat long finder (also known as a latitude and longitude finder or longitude and latitude finder) that works in any modern browser without signup.' },
  { q: 'How do I find my current coordinates?', a: 'Open Get My Location and approve the browser permission. Your exact coordinates — latitude and longitude in WGS-84 decimal degrees — appear instantly with six-digit precision, copyable in one click.' },
  { q: 'How do I find latitude and longitude?', a: 'Our latitude longitude finder uses your browser\'s GPS chip and Wi-Fi triangulation to display live GPS coordinates. For converting decimal degrees to DMS (degrees-minutes-seconds), use our coordinates converter.' },
  { q: 'Is this a free GPS tracker?', a: 'Yes — GetMyLocations is a free GPS tracker online. No app, no signup. It uses the same Geolocation API that paid GPS coordinate generator apps use, just free and privacy-respecting.' },
  { q: 'How do I track my IP?', a: 'When you visit the site, we automatically run an IP geolocator on your address as fallback when GPS is unavailable. This shows your IP city, country, and internet provider — the same data any IP address location detector reveals.' },
  { q: 'Why is my IP showing wrong city?', a: 'IP geolocation is built from carrier records that lag months behind reality. Mobile networks especially pool thousands of users behind one IP in a distant city. For accurate results, allow precise GPS in the browser prompt.' },
  { q: 'How do I get a street address from GPS?', a: 'After fetching your coordinates, we run a reverse geocode online via OpenStreetMap to extract your street address from GPS data. The map-my-coordinates step happens automatically — no extra click needed.' },
  { q: 'Why is my location wrong?', a: 'The most common reasons: a VPN, mobile carrier-grade NAT routing traffic through a distant city, an outdated geolocation database, or denying the GPS permission so the browser falls back to IP-only.' },
  { q: 'How accurate is browser location?', a: 'On a phone with GPS outdoors: 3–5 meters. On a phone indoors: 10–50 meters. On a laptop with Wi-Fi only: 20–50 meters. On a desktop with no Wi-Fi (IP-only): 5–50 km.' },
  { q: 'How do I fix GPS not working?', a: 'Check three things: (1) your device has location services enabled in OS settings, (2) you\'ve allowed the site permission, (3) you\'re not in airplane mode. To enable browser location in Chrome: click the lock icon → Site settings → Location → Allow.' },
  { q: 'Does VPN affect GPS location?', a: 'A VPN hides your IP address (and thus IP geolocation) but does NOT change your GPS chip\'s reading. With GPS allowed, GetMyLocations sees your true position even while connected to a VPN.' },
  { q: 'Is GetMyLocations free and private?', a: 'Yes. 100% free, no signup needed. Your GPS coordinates are processed in your browser and never sent to a server we operate. We do use third-party services for reverse geocoding and advertising — see our Privacy Policy for details.' },
];

const FEATURES = [
  { t: 'Find my current coordinates', d: 'Exact latitude and longitude with six-decimal precision, copied to your clipboard in one click.' },
  { t: 'Live GPS tracker', d: 'Real-time coordinate updates as you move — watch your latitude and longitude tick live.' },
  { t: 'IP & city lookup', d: 'Reverse-geocodes your location into city, region, and country in milliseconds.' },
  { t: 'Privacy-first', d: '100% client-side coordinate processing. Your GPS reading is not sent to a server we operate. No signup required.' },
];

const MORE_TOOLS = [
  { href: '/my-location', t: 'My Location', d: 'Where am I right now? Instant GPS coordinates plus city, country, and live map.' },
  { href: '/gps-coordinates', t: 'GPS Coordinates', d: 'Live latitude and longitude in DD and DMS, accuracy, altitude, and watch mode.' },
  { href: '/coordinates-converter', t: 'Coordinates Converter', d: 'Convert any coordinate between Decimal Degrees, DMS, DDM, and UTM formats.' },
  { href: '/ip-location', t: 'IP Location', d: 'Look up the city, country, and ISP of any public IPv4 or IPv6 address.' },
  { href: '/distance-calculator', t: 'Distance Calculator', d: 'Great-circle distance between two coordinates using the Haversine formula.' },
  { href: '/address-finder', t: 'Address Finder', d: 'Address-to-coordinates and coordinates-to-address geocoding both ways.' },
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
            className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/10 text-slate-200"
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
              className="relative rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/40 h-[480px] sm:h-[560px] glass"
            >
              {loading && !pos && mode === 'auto' && (
                <div className="absolute inset-0 grid place-items-center" aria-busy="true">
                  <div className="flex flex-col items-center gap-3 text-slate-300">
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

      <AdSlot label="Advertisement" minHeight={250} />

      <section aria-labelledby="more-tools" className="mt-14 scroll-mt-24" id="more-tools">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 id="more-tools-h" className="font-display text-2xl font-bold">All location tools</h2>
            <p className="text-sm text-slate-400 mt-1">Eight free, browser-based tools for everything location, GPS, and IP related. Open any one — no signup, no app.</p>
          </div>
          <span className="text-xs text-slate-500 uppercase tracking-wider">8 tools</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          {MORE_TOOLS.map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="glass rounded-2xl p-5 flex flex-col hover:ring-electric-400/40 ring-1 ring-white/10 transition group no-underline"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-slate-100 group-hover:text-electric-400 transition">{t.t}</h3>
                <span className="text-[10px] uppercase tracking-wider text-electric-400 font-semibold opacity-0 group-hover:opacity-100 transition">Open →</span>
              </div>
              <p className="text-sm text-slate-400 mt-2 flex-1 leading-snug">{t.d}</p>
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
              <div className="w-7 h-7 rounded-lg bg-electric-500 text-ink-950 text-sm font-bold grid place-items-center" aria-hidden="true">{i + 1}</div>
              <div className="mt-3 font-semibold">{s.t}</div>
              <p className="text-sm text-slate-300/90 mt-1">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <TechnicalDetails />

      <AdSlot label="Advertisement" minHeight={250} />

      <section aria-labelledby="featured-posts" className="mt-14">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 id="featured-posts" className="font-display text-2xl font-bold">From the blog</h2>
            <p className="text-sm text-slate-400 mt-1">Guides on GPS, geolocation, and finding your way online.</p>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-electric-400 hover:text-electric-300 transition">
            View all posts →
          </Link>
        </div>

        <ul className="grid md:grid-cols-3 gap-4 mt-5">
          {featuredPosts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="block h-full glass rounded-2xl p-5 ring-1 ring-white/10 hover:ring-electric-400/40 transition group"
              >
                <time className="text-[11px] text-slate-400 uppercase tracking-wider">
                  {new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  {p.readingTime} min read
                </time>
                <h3 className="font-display text-base font-bold mt-1.5 leading-snug group-hover:text-electric-400 transition line-clamp-2">{p.title}</h3>
                <p className="text-sm text-slate-300/80 mt-2 line-clamp-3">{p.excerpt}</p>
                <span className="inline-block mt-3 text-xs text-electric-400 font-semibold uppercase tracking-wider">Read →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="faq" className="mt-14">
        <h2 id="faq" className="font-display text-2xl font-bold">Frequently asked questions</h2>
        <div className="glass mt-4 rounded-2xl divide-y divide-white/5">
          {FAQS.map((f) => (
            <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer list-none font-semibold">
                {f.q}
                <span className="text-electric-400 group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
              </summary>
              <p className="mt-2 text-slate-300/90 text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <AdSlot label="Advertisement" minHeight={250} />
    </>
  );
}
