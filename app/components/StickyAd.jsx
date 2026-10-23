'use client';

import { useEffect, useRef, useState } from 'react';
import { afterLoad, loadBanner, watchFill } from './adQueue.js';

// Sticky footer banner: 320x50 on phones and tablets, 728x90 on desktop, chosen once
// when it loads. It has a close button; once closed it stays closed for the
// rest of the visit (this browser tab). While it is open the page gets extra
// bottom padding, so it never covers the end of the page or the site footer.
//
// Since 2026-10-24 the site runs Adsterra banners only: no popunders, Social
// Bar, Smartlink or push ads, so nothing else floats over the page.
const PHONE = { key: '70f4ddd7d6099d44f345e85de8e3c074', width: 320, height: 50 };
// 728x90 on desktop (at least 760px wide), 320x50 below that.
const WIDE = { key: 'a763592167bceee6b0a7f30bba35b478', width: 728, height: 90 };
const WIDE_MIN = 760;
const CLOSED = 'stickyAdClosed';

function wasClosed() {
  try { return sessionStorage.getItem(CLOSED) === '1'; } catch { return false; }
}

export default function StickyAd() {
  const slot = useRef(null);
  const [unit, setUnit] = useState(null);

  useEffect(() => afterLoad(() => {
    if (wasClosed()) return;
    setUnit(window.innerWidth >= WIDE_MIN ? WIDE : PHONE);
  }), []);

  useEffect(() => {
    if (!unit || !slot.current) return undefined;
    let stop;
    let live = true;
    // No ad served (common in some countries): remove the empty bar.
    loadBanner(slot.current, unit).then(() => {
      if (live && slot.current) stop = watchFill(slot.current, { onEmpty: () => setUnit(null) });
    });
    const pad = document.body.style.paddingBottom;
    document.body.style.paddingBottom = `${unit.height + 16}px`;
    return () => { live = false; stop?.(); document.body.style.paddingBottom = pad; };
  }, [unit]);

  const close = () => {
    try { sessionStorage.setItem(CLOSED, '1'); } catch { /* private mode */ }
    setUnit(null);
  };

  if (!unit) return null;
  return (
    <aside
      aria-label="Sponsored"
      className="fixed inset-x-0 bottom-0 z-40 flex justify-center pointer-events-none"
    >
      <div className="relative pointer-events-auto bg-surface/95 border border-line-subtle border-b-0 rounded-t-lg shadow-2xl px-1 pt-1">
        <button
          type="button"
          onClick={close}
          aria-label="Close ad"
          className="absolute -top-7 right-0 h-7 w-7 flex items-center justify-center rounded-t-md bg-surface/95 border border-line-subtle border-b-0 text-fg-muted hover:text-fg text-sm"
        >
          ✕
        </button>
        <div ref={slot} style={{ width: unit.width, height: unit.height }} />
      </div>
    </aside>
  );
}
