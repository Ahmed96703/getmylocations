import { useEffect, useRef } from 'react';

// Publisher ID — set from env after approval (VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX).
const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || '';

/**
 * AdSlot — reserves a labeled ad space on the page.
 *
 * Pre-approval (no slot ID yet): renders a subtle "Advertisement" placeholder
 * with realistic min-height so the layout doesn't shift when real ads load.
 *
 * Post-approval (slot ID provided + ADSENSE_CLIENT env set): renders the real
 * AdSense <ins> unit. Layout space stays identical — no CLS, no jank.
 *
 * Usage:
 *   <AdSlot label="Advertisement" />                         // reserved space only
 *   <AdSlot slot="1234567890" />                             // real responsive ad
 *   <AdSlot slot="1234567890" format="fluid" layout="in-article" minHeight={120} />
 */
export default function AdSlot({
  slot,
  format = 'auto',
  layout,
  label = 'Advertisement',
  minHeight = 250,
  className = '',
}) {
  const ref = useRef(null);
  const hasRealAd = !!slot && !!ADSENSE_CLIENT;

  useEffect(() => {
    if (!hasRealAd) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ad blocker or not yet loaded */
    }
  }, [hasRealAd]);

  return (
    <aside
      aria-label={label}
      role="complementary"
      className={`my-8 mx-auto w-full max-w-3xl ${className}`}
    >
      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1.5 text-center font-semibold">
        {label}
      </div>

      {hasRealAd ? (
        <ins
          ref={ref}
          className="adsbygoogle block"
          style={{ display: 'block', minHeight }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
          {...(layout ? { 'data-ad-layout': layout } : {})}
        />
      ) : (
        <div
          aria-hidden="true"
          className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] grid place-items-center text-slate-500 text-xs"
          style={{ minHeight }}
        >
          <span className="opacity-60">Sponsored space</span>
        </div>
      )}
    </aside>
  );
}
