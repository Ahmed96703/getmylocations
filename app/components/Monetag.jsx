'use client';

import { useEffect } from 'react';

// Monetag ad tags. Opt-in per page, next to <AdSense />: only substantial
// content pages (tools, guides, blog posts) render this, so about, contact,
// legal pages and the 404 page stay ad-free.
//
// Speed: the tags load only after the page has finished loading and the
// browser is idle, so they cannot delay the page's first paint, its largest
// image or text (LCP), or the first taps on the tools.
//
// Moving to another ad network later (Journey, Mediavine and similar do not
// allow other networks alongside them): empty ZONES, or delete this component
// and its imports. public/sw.js must then be replaced with a worker that
// unregisters itself, or visitors who allowed push notifications keep it.
// One Multitag (zone 300917, "Bright tag", added 2026-10-23 at the user's
// request). It replaced the separate OnClick Popunder (12092105) and Push
// (12092113) zones, which would otherwise run alongside it and show a second
// popunder. Which formats it shows (Popunder, Push, In-Page Push, Vignette) is
// set in the Monetag dashboard, not here. public/sw.js is the push worker
// Monetag supplies for this tag (push zone 12104787 on 3nbf4.com). The Adsterra Popunder, Social
// Bar and sticky footer were removed the same day, so this is the site's only
// popunder.
const ZONES = [
  { zone: '300917', src: 'https://quge5.com/88/tag.min.js' }, // Multitag
];

function addTags() {
  for (const { zone, src } of ZONES) {
    if (document.querySelector(`script[data-zone="${zone}"]`)) continue;
    const s = document.createElement('script');
    s.dataset.zone = zone;
    s.src = src;
    s.async = true;
    s.dataset.cfasync = 'false'; // keep Cloudflare Rocket Loader off it, as Monetag asks
    document.body.appendChild(s);
  }
}

export default function Monetag() {
  useEffect(() => {
    let idle;
    const whenIdle = () => {
      idle = 'requestIdleCallback' in window
        ? window.requestIdleCallback(addTags, { timeout: 3000 })
        : window.setTimeout(addTags, 1500);
    };
    // Already loaded when a visitor arrives by clicking a link inside the site.
    if (document.readyState === 'complete') whenIdle();
    else window.addEventListener('load', whenIdle, { once: true });
    return () => {
      window.removeEventListener('load', whenIdle);
      if (idle && 'cancelIdleCallback' in window) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);
  return null;
}
