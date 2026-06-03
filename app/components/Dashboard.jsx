'use client';

import { motion, AnimatePresence } from 'framer-motion';

const fmt = (n, d = 6) => (n == null ? '—' : Number(n).toFixed(d));

function Stat({ label, value }) {
  return (
    <div className="rounded-xl bg-tint/5 border border-line px-4 py-3">
      <div className="text-[10px] uppercase tracking-[0.14em] text-fg-subtle font-semibold">{label}</div>
      <div className="mt-0.5 text-base font-semibold tabular-nums text-fg">{value}</div>
    </div>
  );
}

export default function Dashboard({ pos, meta, place, placeLoading, mode, onCopy, copied }) {
  const flag = place?.countryCode
    ? String.fromCodePoint(...[...place.countryCode].map((c) => 0x1f1e6 - 65 + c.charCodeAt(0)))
    : '';

  return (
    <aside
      role="complementary"
      aria-label="Location dashboard"
      className="glass rounded-3xl p-5 sm:p-6 w-full lg:w-[380px] lg:shrink-0"
    >
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">
          {mode === 'auto' ? 'Live · Auto' : 'Manual'}
        </div>
        <span className="flex items-center gap-1.5 text-xs text-fg-subtle" aria-live="polite">
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${pos ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} aria-hidden="true" />
          {pos ? 'Tracking' : 'Waiting'}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={(place?.city || '') + (place?.country || '') + 'p'}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="mt-4"
        >
          <div className="text-xs text-fg-subtle">Current location</div>
          <div className="font-display text-2xl sm:text-3xl font-bold mt-1 leading-tight">
            {placeLoading ? (
              <span className="inline-block h-7 w-44 bg-tint/10 rounded animate-pulse" />
            ) : place ? (
              <>
                <span>{place.city}</span>
                {place.region && <span className="text-fg-subtle">, {place.region}</span>}
              </>
            ) : '—'}
          </div>
          <div className="mt-1 text-sm text-fg-muted flex items-center gap-1.5">
            {flag && <span aria-hidden="true">{flag}</span>}
            <span>{place?.country || '—'}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-5 grid grid-cols-2 gap-2.5">
        <Stat label="Latitude" value={fmt(pos?.[0])} />
        <Stat label="Longitude" value={fmt(pos?.[1])} />
        <Stat label="Accuracy" value={meta?.accuracy ? `±${Math.round(meta.accuracy)} m` : '—'} />
        <Stat label="Updated" value={meta?.ts ? new Date(meta.ts).toLocaleTimeString() : '—'} />
      </div>

      <button
        type="button"
        onClick={onCopy}
        disabled={!pos}
        aria-label="Copy coordinates to clipboard"
        className="btn-primary w-full mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>
        </svg>
        {copied ? 'Copied!' : 'Copy Coordinates'}
      </button>
    </aside>
  );
}
