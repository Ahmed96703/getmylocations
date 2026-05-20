import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../components/Logo.jsx';
import Dashboard from '../components/Dashboard.jsx';
import ManualInput from '../components/ManualInput.jsx';
import Footer from '../components/Footer.jsx';
import PermissionBlocked from '../components/PermissionBlocked.jsx';
import AdSlot from '../components/AdSlot.jsx';
import TechnicalDetails from '../components/TechnicalDetails.jsx';
import { useGeolocation } from '../hooks/useGeolocation.js';
import { useReverseGeocode } from '../hooks/useReverseGeocode.js';
import { POSTS } from '../posts/manifest.js';

const MapView = lazy(() => import('../MapView.jsx'));

const FAQS = [
  // Head-term queries (high search volume)
  { q: 'Where am I right now?', a: 'Open GetMyLocations and allow the location prompt — within two seconds the page answers "where am I" with your exact coordinates, city, country, and a live map pin. No signup needed.' },
  { q: "What's my location now?", a: 'GetMyLocations is the fastest answer to "what\'s my location now" — it combines GPS, Wi-Fi, and IP signals to show your live position on a map the instant you grant permission.' },
  { q: 'Is there a free lat long finder?', a: 'Yes. GetMyLocations is a free lat long finder (also known as a latitude and longitude finder or longitude and latitude finder) that works in any modern browser without signup.' },

  // Cluster A — GPS & Coordinates
  { q: 'How do I find my current coordinates?', a: 'Open Get My Location and approve the browser permission. Your exact coordinates — latitude and longitude in WGS-84 decimal degrees — appear instantly with six-digit precision, copyable in one click.' },
  { q: 'How do I find latitude and longitude?', a: 'Our latitude longitude finder uses your browser\'s GPS chip and Wi-Fi triangulation to display live GPS coordinates. For converting decimal degrees to DMS (degrees-minutes-seconds), use our upcoming decimal degrees converter.' },
  { q: 'What are my exact coordinates right now?', a: 'Your exact coordinates appear on the dashboard the moment you allow location access. We show 6-digit decimal degrees, accurate to ~11 cm. Switch to Advanced mode to enter any custom coordinates and map them.' },
  { q: 'Is this a free GPS tracker?', a: 'Yes — GetMyLocations is a free GPS tracker online. No app, no signup. It uses the same Geolocation API that paid GPS coordinate generator apps use, just free and privacy-respecting.' },

  // Cluster B — IP & Networking
  { q: 'How do I track my IP?', a: 'When you visit the site, we automatically run an IP geolocator on your address as fallback when GPS is unavailable. This shows your IP city, country, and internet provider — the same data any IP address location detector reveals.' },
  { q: 'What is my public IP?', a: 'Your public IP is the address your router or mobile network uses to reach the internet. Our IP-to-location lookup decodes it into a region. Works for both IPv4 lookup and IPv6 addresses.' },
  { q: 'Why is my IP showing wrong city?', a: 'IP geolocation is built from carrier records that lag months behind reality. Mobile networks especially pool thousands of users behind one IP in a distant city. For accurate results, allow precise GPS in the browser prompt.' },
  { q: 'How do I find my IPv6?', a: 'If your network has IPv6, GetMyLocations will detect and display it. Most home networks still use IPv4, but mobile networks increasingly assign IPv6 — visible in the dashboard tooltip.' },

  // Cluster C — Map & Navigation
  { q: 'How do I get a street address from GPS?', a: 'After fetching your coordinates, we run a reverse geocode online via OpenStreetMap to extract your street address from GPS data. The map-my-coordinates step happens automatically — no extra click needed.' },
  { q: 'Can I pinpoint my location on a live map?', a: 'Yes. The interactive location map drops a pulsing pin GPS-style on your exact position. Use the Locate Me button to recenter. To find an address by lat long manually, switch to Advanced mode.' },
  { q: 'How do I get an address from coordinates?', a: 'Paste any latitude and longitude into Advanced mode and our reverse-geocoder turns those coordinates into a street address from GPS data in milliseconds.' },

  // Cluster D — Comparison & Troubleshooting
  { q: 'GPS vs IP accuracy — which is better?', a: 'GPS wins by a huge margin: 3–5 meters vs IP\'s 5–50 km. Browser location vs GPS: browsers without GPS chips fall back to Wi-Fi or IP, which is significantly less accurate. Always allow precise location for best results.' },
  { q: 'Why is my location wrong?', a: 'The most common reasons: a VPN, mobile carrier-grade NAT routing traffic through a distant city, an outdated geolocation database, or denying the GPS permission so the browser falls back to IP-only.' },
  { q: 'How accurate is browser location?', a: 'On a phone with GPS outdoors: 3–5 meters. On a phone indoors: 10–50 meters. On a laptop with Wi-Fi only: 20–50 meters. On a desktop with no Wi-Fi (IP-only): 5–50 km.' },
  { q: 'How do I fix GPS not working?', a: 'Check three things: (1) your device has location services enabled in OS settings, (2) you\'ve allowed the site permission, (3) you\'re not in airplane mode. To enable browser location in Chrome: click the lock icon → Site settings → Location → Allow.' },
  { q: 'Why is location permission denied?', a: 'You\'ve previously denied the prompt for this site. Click the lock icon in your address bar → Site settings → reset Location to "Allow", then reload. Our denied-permission helper guides you through it.' },
  { q: 'Does VPN affect GPS location?', a: 'A VPN hides your IP address (and thus IP geolocation) but does NOT change your GPS chip\'s reading. With GPS allowed, GetMyLocations sees your true position even while connected to a VPN.' },

  { q: 'Is GetMyLocations free and private?', a: 'Yes. 100% free, no signup, no tracking. Your coordinates and IP location are never stored or sent to a server we control — everything runs in your browser.' },
];

const FEATURES = [
  { icon: '📍', t: 'Find my current coordinates', d: 'Exact latitude and longitude with six-decimal precision, copied to your clipboard in one click.' },
  { icon: '📡', t: 'Live GPS tracker', d: 'Real-time coordinate updates as you move — watch your latitude and longitude tick live.' },
  { icon: '🌐', t: 'IP & city lookup', d: 'Reverse-geocodes your location into city, region, and country in milliseconds.' },
  { icon: '🔒', t: 'Privacy-first', d: '100% client-side. Your data never leaves your browser. No signup, no tracking.' },
];

const MORE_TOOLS = [
  { t: 'Coordinate Converter', d: 'Convert decimal degrees to DMS and back.', tag: 'Coming soon' },
  { t: 'Distance Calculator', d: 'Compute the great-circle distance between two points.', tag: 'Coming soon' },
  { t: 'Reverse Geocoder', d: 'Paste any latitude/longitude and get the full address.', tag: 'Coming soon' },
  { t: 'IP Lookup', d: 'Look up the approximate location of any public IP address.', tag: 'Coming soon' },
];

export default function LocationFinder() {
  const [mode, setMode] = useState('auto'); // 'auto' | 'manual'
  const [manualPos, setManualPos] = useState(null);
  const [copied, setCopied] = useState(false);
  const [shareState, setShareState] = useState('idle'); // 'idle' | 'shared' | 'copied'

  const { pos: autoPos, meta: autoMeta, error, loading, retry, permission } = useGeolocation(mode === 'auto');

  const pos = mode === 'manual' ? manualPos : autoPos;
  const meta = mode === 'manual' ? { accuracy: null, ts: Date.now() } : autoMeta;
  const { data: place, loading: placeLoading } = useReverseGeocode(pos);

  useEffect(() => { document.title = 'GetMyLocations | Real-time Location Tool'; }, []);

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
    <div className="min-h-full">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 bg-electric-500 text-ink-950 px-3 py-2 rounded-lg z-50">Skip to content</a>

      <header role="banner" className="sticky top-0 z-20 border-b border-white/5 bg-ink-950/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
          <Link to="/" aria-label="GetMyLocations home" className="flex items-center gap-3 group">
            <Logo size={36} />
            <div>
              <div className="font-display text-lg font-bold leading-none group-hover:text-electric-400 transition">GetMyLocations</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Real-time Location Finder</div>
            </div>
          </Link>

          <div role="tablist" aria-label="Location mode" className="glass rounded-full p-1 flex text-xs font-semibold">
            {['auto', 'manual'].map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
                className={`relative px-3.5 py-1.5 rounded-full transition ${mode === m ? 'text-ink-950' : 'text-slate-300 hover:text-white'}`}
              >
                {mode === m && (
                  <motion.span
                    layoutId="mode-pill"
                    className="absolute inset-0 bg-electric-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative capitalize">{m === 'auto' ? 'Auto' : 'Advanced'}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main id="main" role="main" className="max-w-7xl mx-auto px-5 py-8">
        <section aria-labelledby="hero" className="mb-7">
          <h1 id="hero" className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-electric-400">Get My Location</span> — Find My Current Coordinates &amp; Live GPS Tracker
          </h1>

          <p className="text-slate-300/90 mt-3 max-w-2xl leading-relaxed">
            Free, privacy-first <strong className="text-slate-100">latitude longitude finder</strong> and <strong className="text-slate-100">IP geolocator</strong>. Get your exact coordinates, pinpoint your location on a live map, and reverse-geocode an address — all in your browser.
          </p>

          {/* Secondary subheadline — visible, semantically rich */}
          <p className="text-sm text-slate-400 mt-2 max-w-3xl">
            Works as a free GPS tracker online · IP address location detector · street address from GPS · WGS-84 decimal degrees · no signup.
          </p>

          {/* Feature pills — visible */}
          <ul aria-label="Features" className="mt-5 flex flex-wrap gap-2 text-xs">
            {FEATURES.map((f) => (
              <li
                key={f.t}
                title={f.d}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/10 text-slate-200"
              >
                <span aria-hidden="true">{f.icon}</span>
                <span className="font-medium">{f.t}</span>
              </li>
            ))}
          </ul>
        </section>

        {permission === 'denied' && mode === 'auto' && (
          <div className="mb-6">
            <PermissionBlocked onRetry={retry} onManualMode={() => setMode('manual')} />
          </div>
        )}

        {error && permission !== 'denied' && (
          <div role="alert" className="mb-6 rounded-2xl glass border-rose-400/30 px-5 py-4 flex items-start justify-between gap-4">
            <div>
              <div className="font-semibold text-rose-200">Couldn’t access location</div>
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
                <Suspense fallback={<div className="w-full h-full bg-white/5 animate-pulse" aria-label="Loading map" />}>
                  <MapView pos={pos} onCopied={() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }} />
                </Suspense>
              )}
            </div>

            {/* Action row — Share + quick CTAs */}
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={onShare}
                disabled={!pos}
                aria-label="Share my location"
                className="btn-primary flex-1 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                {shareState === 'shared' ? 'Shared!' : shareState === 'copied' ? 'Link copied!' : 'Share My Location'}
              </button>

              <a
                href="#more-tools"
                className="btn-ghost flex-1 sm:flex-none justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6m0 10v6M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24M1 12h6m10 0h6M4.22 19.78l4.24-4.24m7.08-7.08l4.24-4.24" />
                </svg>
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

        <AdSlot label="Advertisement" minHeight={250} />

        {/* MORE TOOLS — drives dwell time + internal linking */}
        <section aria-labelledby="more-tools" className="mt-14 scroll-mt-24" id="more-tools">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 id="more-tools-h" className="font-display text-2xl font-bold">More location tools</h2>
              <p className="text-sm text-slate-400 mt-1">Free utilities we’re building next — each one as fast and private as this one.</p>
            </div>
            <span className="text-xs text-slate-500 uppercase tracking-wider">Roadmap</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            {MORE_TOOLS.map((t) => (
              <article key={t.t} className="glass rounded-2xl p-5 flex flex-col hover:ring-electric-400/30 ring-1 ring-white/10 transition">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-electric-500/15 ring-1 ring-electric-400/30 grid place-items-center text-electric-400" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
                    </svg>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-amber-300/80 font-semibold">{t.tag}</span>
                </div>
                <h3 className="font-display text-base font-bold mt-3">{t.t}</h3>
                <p className="text-sm text-slate-400 mt-1 flex-1">{t.d}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="how" className="mt-14">
          <h2 id="how" className="font-display text-2xl font-bold">How GetMyLocations works</h2>
          <div className="grid sm:grid-cols-3 gap-3 mt-4">
            {[
              { t: 'Allow access', d: 'Approve the one-time browser location prompt.' },
              { t: 'See it live', d: 'Coordinates and your city/country resolve in real time.' },
              { t: 'Go advanced', d: 'Switch to Manual to fly the map to any latitude/longitude.' },
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

        {/* FEATURED BLOG POSTS — surfaces content + dwell time */}
        <section aria-labelledby="featured-posts" className="mt-14">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 id="featured-posts" className="font-display text-2xl font-bold">From the blog</h2>
              <p className="text-sm text-slate-400 mt-1">Guides on GPS, geolocation, and finding your way online.</p>
            </div>
            <Link to="/blog" className="text-sm font-semibold text-electric-400 hover:text-electric-300 transition">
              View all posts →
            </Link>
          </div>

          <ul className="grid md:grid-cols-3 gap-4 mt-5">
            {featuredPosts.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/blog/${p.slug}`}
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

      </main>
      <Footer />
    </div>
  );
}
