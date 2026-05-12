import { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../components/Logo.jsx';
import Dashboard from '../components/Dashboard.jsx';
import ManualInput from '../components/ManualInput.jsx';
import Footer from '../components/Footer.jsx';
import PermissionBlocked from '../components/PermissionBlocked.jsx';
import AdSlot from '../components/AdSlot.jsx';
import { useGeolocation } from '../hooks/useGeolocation.js';
import { useReverseGeocode } from '../hooks/useReverseGeocode.js';

const MapView = lazy(() => import('../MapView.jsx'));

const FAQS = [
  { q: 'How do I find my current location online?', a: "Open GetMyLocations and approve the browser's location permission. Your latitude, longitude, city, and country appear instantly on an interactive map." },
  { q: 'What is my IP location?', a: 'IP location is an approximate position derived from your network address. GetMyLocations combines IP, Wi-Fi, and GPS signals for the most accurate result.' },
  { q: 'How do I find latitude and longitude?', a: 'GetMyLocations displays live GPS coordinates in WGS-84 degrees. You can also enter coordinates manually to fly the map to any location.' },
  { q: 'Is GetMyLocations free and private?', a: 'Yes. GetMyLocations is 100% free, requires no signup, and runs fully in your browser — your coordinates are never stored or shared.' },
  { q: 'Why is my location not accurate?', a: 'Without GPS, browsers estimate location from Wi-Fi or IP, which is less precise. Enable location services and stay outdoors for meter-level accuracy.' },
];

export default function LocationFinder() {
  const [mode, setMode] = useState('auto'); // 'auto' | 'manual'
  const [manualPos, setManualPos] = useState(null);
  const [copied, setCopied] = useState(false);

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
            Find <span className="text-electric-400">my location</span> — IP & GPS coordinates.
          </h1>
          <p className="text-slate-300/90 mt-2 max-w-2xl">
            GetMyLocations is a free, privacy-first location finder. Detect your current latitude and longitude, see your city and country, and view it all live on an interactive map — no signup, no tracking, 100% in your browser.
          </p>
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

        <AdSlot label="Advertisement" minHeight={250} />

        <section aria-labelledby="faq" className="mt-12">
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
