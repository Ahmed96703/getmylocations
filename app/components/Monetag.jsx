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
const ZONES = [
  { zone: '12069978', src: 'https://nap5k.com/tag.min.js' }, // In-Page Push banner
  { zone: '12070093', src: 'https://n6wxm.com/vignette.min.js' }, // Vignette banner
];

function addTags() {
  for (const { zone, src } of ZONES) {
    if (document.querySelector(`script[data-zone="${zone}"]`)) continue;
    const s = document.createElement('script');
    s.dataset.zone = zone;
    s.src = src;
    s.async = true;
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
