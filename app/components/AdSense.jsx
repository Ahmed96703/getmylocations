// AdSense loader. Opt-in per page: AdSense policy says not to place ad code on
// pages with little or no original content, so it is NOT in the root layout.
// Render it only on substantial content pages (tools, guides, blog posts).
// Pages without it (about, contact, legal pages, blog index, 404) never load ads.
// React hoists async scripts into <head>, so this still lands in the page head.
import { LEGACY_ADS } from './adQueue.js';

export default function AdSense() {
  if (!LEGACY_ADS) return null;
  return (
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2240955720087760"
      crossOrigin="anonymous"
    />
  );
}
