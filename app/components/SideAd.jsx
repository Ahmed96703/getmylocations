'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { afterLoad, loadBanner } from './adQueue.js';

// Side rails: a 160x600 banner in the empty margin right of the page content
// and a 160x300 banner left of it. Each rail loads only when the screen is
// wide and tall enough for the whole banner to sit beside <main> without
// covering it, so phones, tablets and small laptops never load them and never
// see an empty box. Both fade out while the footer is on screen.
const RAILS = {
  right: { key: '72441e3f6e9573bd52d1e4bfff97780f', width: 160, height: 600 },
  left: { key: '79a6bc4777764a4918e11ff5161036bd', width: 160, height: 300 },
};
const TOP = 104; // below the sticky header
const GAP = 16;

// Where a rail goes, or null when there is no room for it.
function place(side) {
  const main = document.querySelector('main');
  if (!main) return null;
  const { width, height } = RAILS[side];
  const rect = main.getBoundingClientRect();
  const free = side === 'right' ? window.innerWidth - rect.right : rect.left;
  if (free < width + 2 * GAP || window.innerHeight < TOP + height + 40) return null;
  return { left: Math.round(side === 'right' ? rect.right + (free - width) / 2 : (free - width) / 2) };
}

function Rail({ side, footerShown }) {
  const slot = useRef(null);
  const [pos, setPos] = useState(null);

  useEffect(() => afterLoad(() => setPos(place(side))), [side]);

  const shown = pos !== null;
  useEffect(() => {
    if (!shown || !slot.current) return undefined;
    loadBanner(slot.current, RAILS[side]);
    const onResize = () => { const p = place(side); if (p) setPos(p); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [shown, side]);

  if (!shown) return null;
  const { width, height } = RAILS[side];
  // Rendered into <body>: a parent with a blur or transform would otherwise
  // make "fixed" relative to that parent instead of the window.
  return createPortal(
    <aside
      aria-label="Sponsored"
      className="fixed z-20 transition-opacity duration-300"
      style={{ top: TOP, left: pos.left, width, opacity: footerShown ? 0 : 1, pointerEvents: footerShown ? 'none' : 'auto' }}
    >
      <p className="text-[10px] uppercase tracking-[0.18em] text-fg-subtle font-semibold mb-1.5">Sponsored</p>
      <div ref={slot} style={{ width, minHeight: height }} />
    </aside>,
    document.body,
  );
}

export default function SideAd() {
  const [footerShown, setFooterShown] = useState(false);
  useEffect(() => {
    const footer = document.querySelector('footer[role="contentinfo"]');
    if (!footer) return undefined;
    const io = new IntersectionObserver(([e]) => setFooterShown(e.isIntersecting));
    io.observe(footer);
    return () => io.disconnect();
  }, []);
  return (
    <>
      <Rail side="right" footerShown={footerShown} />
      <Rail side="left" footerShown={footerShown} />
    </>
  );
}
