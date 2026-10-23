'use client';

import { useEffect } from 'react';
// Adcash AutoTag (zone ungo8strks), on every page from the layout. Since
// 2026-10-24 it is the site's only ad network besides AdSense: Monetag and
// Adsterra were removed that day at the user's request. Which formats AutoTag
// shows (popunder, interstitial, in-page push and so on) is set in the Adcash
// dashboard.
//
// Adcash's instructions put the library high in <head>; it loads here after
// the page has loaded instead, like the other ad tags, so it cannot delay the
// first paint or the first taps on the tools. AutoTag still runs on that
// first page view.
const LIB = 'https://acscdn.com/script/aclib.js';

// Run `fn` after the page has loaded and the browser is idle, or after
// `fallbackMs` if loading is slow (map pages keep fetching tiles).
function afterLoad(fn, fallbackMs = 4000) {
  let idle;
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    idle = 'requestIdleCallback' in window
      ? window.requestIdleCallback(fn, { timeout: 3000 })
      : window.setTimeout(fn, 1500);
  };
  const fallback = window.setTimeout(start, fallbackMs);
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
  return () => {
    window.clearTimeout(fallback);
    window.removeEventListener('load', start);
    if (idle && 'cancelIdleCallback' in window) window.cancelIdleCallback(idle);
    else window.clearTimeout(idle);
  };
}
const ZONE = 'ungo8strks';

function run() {
  if (window.aclib?.runAutoTag) { window.aclib.runAutoTag({ zoneId: ZONE }); return; }
  if (document.getElementById('aclib')) return; // still loading; its onload runs the tag
  const s = document.createElement('script');
  s.id = 'aclib';
  s.src = LIB;
  s.async = true;
  s.onload = () => window.aclib?.runAutoTag({ zoneId: ZONE });
  document.head.appendChild(s);
}

export default function Adcash() {
  useEffect(() => afterLoad(run), []);
  return null;
}
