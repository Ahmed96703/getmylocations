import { useEffect, useRef } from 'react';

// Set this to your AdSense Publisher ID after approval (format: ca-pub-XXXXXXXXXXXXXXXX)
const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || '';

/**
 * AdSlot — drops an AdSense ad unit anywhere on the page.
 *
 * Usage:
 *   <AdSlot slot="1234567890" />              // responsive auto
 *   <AdSlot slot="1234567890" format="fluid" layout="in-article" />
 *
 * Renders nothing if VITE_ADSENSE_CLIENT is not set, so the layout
 * stays clean during development and before AdSense approval.
 */
export default function AdSlot({ slot, format = 'auto', layout, className = '', style }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ADSENSE_CLIENT) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ad blocker or not ready */
    }
  }, []);

  if (!ADSENSE_CLIENT) return null;

  return (
    <ins
      ref={ref}
      className={`adsbygoogle block ${className}`}
      style={{ display: 'block', ...style }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
      {...(layout ? { 'data-ad-layout': layout } : {})}
    />
  );
}
