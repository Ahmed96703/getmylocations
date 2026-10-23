'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { afterLoad, loadBanner, watchFill } from './adQueue.js';
import { TOP, GAP, RIGHT, LEFT, MID, placeRail } from './adLayout.js';

// Side rails in the empty margins beside the page content: a 160x300 banner
// on the left, and on the right a 160x600 banner, with the 300x250 banner
// below it when the right margin is wide enough (see adLayout.js; MidAd then
// leaves it out of the text). Rails load only when they fit beside <main>
// without covering it, so phones, tablets and small laptops never load them
// and never see an empty box. Fixed rails fade out while the footer is on
// screen; a right column too tall for the screen scrolls with the page.

function Slot({ unit, load }) {
  const ref = useRef(null);
  const [empty, setEmpty] = useState(false);
  useEffect(() => {
    if (!load || !ref.current) return undefined;
    let stop;
    let live = true;
    loadBanner(ref.current, unit).then(() => {
      if (live) stop = watchFill(ref.current, { onEmpty: () => setEmpty(true), onFill: () => setEmpty(false) });
    });
    return () => { live = false; stop?.(); };
  }, [load, unit]);
  return (
    <div style={empty ? { display: 'none' } : undefined}>
      <p className="text-[10px] uppercase tracking-[0.18em] text-fg-subtle font-semibold mb-1.5">Sponsored</p>
      <div ref={ref} style={{ width: unit.width, minHeight: unit.height }} />
    </div>
  );
}

function Rail({ side, footerShown }) {
  const [pos, setPos] = useState(null);

  useEffect(() => afterLoad(() => setPos(placeRail(side))), [side]);

  const shown = pos !== null;
  useEffect(() => {
    if (!shown) return undefined;
    // Keep the column beside the content when the window is resized; what it
    // contains (docked 300x250 or not) was decided once, when it loaded.
    const onResize = () => { const p = placeRail(side); if (p) setPos((old) => ({ ...old, left: p.left, fixed: old.dockMid ? p.fixed : old.fixed })); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [shown, side]);

  if (!shown) return null;
  const hide = pos.fixed && footerShown;
  // Rendered into <body>: a parent with a blur or transform would otherwise
  // make "fixed" relative to that parent instead of the window.
  return createPortal(
    <aside
      aria-label="Sponsored"
      className={`${pos.fixed ? 'fixed' : 'absolute'} z-20 transition-opacity duration-300 flex flex-col items-center`}
      style={{ top: TOP, left: pos.left, width: pos.width, gap: GAP, opacity: hide ? 0 : 1, pointerEvents: hide ? 'none' : 'auto' }}
    >
      <Slot unit={side === 'left' ? LEFT : RIGHT} load />
      {pos.dockMid && <Slot unit={MID} load />}
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
