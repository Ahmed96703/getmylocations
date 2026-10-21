'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

// 160x600 banner (bauval.org, ad unit 72441e3f…), shown as a fixed rail in the
// empty margin to the right of the page content. It loads only when the
// screen is wide and tall enough for the whole banner to sit beside <main>
// without covering it, so phones, tablets and small laptops never load it and
// never see an empty box. It fades out while the footer is on screen.
//
// Same timing as the other ad tags: after the page has loaded and the browser
// is idle.
const KEY = '72441e3f6e9573bd52d1e4bfff97780f';
const SRC = `https://bauval.org/22/${KEY}`;
const W = 160;
const H = 600;
const TOP = 104; // below the sticky header
const GAP = 16;

// Where the rail goes, or null when there is no room for it.
function place() {
  const main = document.querySelector('main');
  if (!main) return null;
  const right = main.getBoundingClientRect().right;
  const free = window.innerWidth - right;
  if (free < W + 2 * GAP || window.innerHeight < TOP + H + 40) return null;
  return { left: Math.round(right + (free - W) / 2) };
}

export default function SideAd() {
  const slot = useRef(null);
  const [pos, setPos] = useState(null);
  const [footerShown, setFooterShown] = useState(false);

  // Decide once whether this screen has room: after load, or after 4 s if
  // load is slow (map pages keep loading tiles), whichever comes first.
  useEffect(() => {
    let idle;
    let started = false;
    const check = () => setPos(place());
    const whenIdle = () => {
      if (started) return;
      started = true;
      idle = 'requestIdleCallback' in window
        ? window.requestIdleCallback(check, { timeout: 3000 })
        : window.setTimeout(check, 1500);
    };
    const fallback = window.setTimeout(whenIdle, 4000);
    if (document.readyState === 'complete') whenIdle();
    else window.addEventListener('load', whenIdle, { once: true });
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener('load', whenIdle);
      if (idle && 'cancelIdleCallback' in window) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  const shown = pos !== null;

  // Load the banner once the rail is on screen; keep it in place on resize.
  useEffect(() => {
    if (!shown || !slot.current) return undefined;
    window.atOptions = { key: KEY, format: 'iframe', height: H, width: W, params: {} };
    const script = document.createElement('script');
    script.src = SRC;
    script.async = true;
    slot.current.appendChild(script);

    const onResize = () => { const p = place(); if (p) setPos(p); };
    window.addEventListener('resize', onResize);
    const footer = document.querySelector('footer[role="contentinfo"]');
    const io = footer && new IntersectionObserver(([e]) => setFooterShown(e.isIntersecting));
    if (io) io.observe(footer);
    return () => {
      window.removeEventListener('resize', onResize);
      io?.disconnect();
      script.remove();
    };
  }, [shown]);

  if (!shown) return null;
  // Rendered into <body>: a parent with a blur or transform would otherwise
  // make "fixed" relative to that parent instead of the window.
  return createPortal(
    <aside
      aria-label="Sponsored"
      className="fixed z-20 transition-opacity duration-300"
      style={{ top: TOP, left: pos.left, width: W, opacity: footerShown ? 0 : 1, pointerEvents: footerShown ? 'none' : 'auto' }}
    >
      <p className="text-[10px] uppercase tracking-[0.18em] text-fg-subtle font-semibold mb-1.5">Sponsored</p>
      <div ref={slot} style={{ width: W, minHeight: H }} />
    </aside>,
    document.body,
  );
}
