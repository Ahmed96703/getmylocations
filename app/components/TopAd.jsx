'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { afterLoad, loadBanner } from './adQueue.js';

// 468x60 banner just under the site header, so it is on the first screen of
// every page. Only on screens at least 500px wide: the banner does not fit a
// phone, and phones see the 320x50 sticky footer banner instead. Its space is part of the page HTML, so nothing moves when it loads.
// It loads again after each in-site navigation, as a new page view.
const UNIT = { key: '751305b90a4f564c073f052bf38f2298', width: 468, height: 60 };
const MIN_WIDTH = 500;

export default function TopAd() {
  const slot = useRef(null);
  const pathname = usePathname();

  useEffect(() => afterLoad(() => {
    if (!slot.current || window.innerWidth < MIN_WIDTH) return;
    slot.current.replaceChildren();
    loadBanner(slot.current, UNIT);
  }), [pathname]);

  return (
    <aside aria-label="Sponsored" className="hidden min-[500px]:flex justify-center px-3 pt-3">
      <div ref={slot} style={{ width: UNIT.width, height: UNIT.height }} />
    </aside>
  );
}
