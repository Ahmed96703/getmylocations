// AdSense loader. Opt-in per page: AdSense policy says not to place ad code on
// pages with little or no original content, so it is NOT in the root layout.
// Render it only on substantial content pages (tools, guides, blog posts).
// Pages without it (about, contact, legal pages, blog index, 404) never load ads.
// React hoists async scripts into <head>, so this still lands in the page head.
export default function AdSense() {
  return (
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2240955720087760"
      crossOrigin="anonymous"
    />
  );
}
