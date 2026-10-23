'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { afterLoad, loadBanner } from './adQueue.js';

// Top banner just under the site header, on the first screen of every page:
// 728x90 on desktop, 468x60 on tablets. Phones get none here; they see the
// 320x50 sticky footer banner. The sticky footer uses 468x60 on desktop and
// 320x50 below that, so no banner key appears twice on a page.
//
// The slot's height is reserved in CSS for each screen size, so nothing moves
// when the ad loads. It loads again after each in-site navigation.
const DESKTOP = { key: 'a763592167bceee6b0a7f30bba35b478', width: 728, height: 90 };
const TABLET = { key: '751305b90a4f564c073f052bf38f2298', width: 468, height: 60 };
const DESKTOP_MIN = 760;
const TABLET_MIN = 500;

export default function TopAd() {
  const slot = useRef(null);
  const pathname = usePathname();
  const [unit, setUnit] = useState(null);

  useEffect(() => afterLoad(() => {
    if (!slot.current) return;
    const w = window.innerWidth;
    const u = w >= DESKTOP_MIN ? DESKTOP : w >= TABLET_MIN ? TABLET : null;
    if (!u) return;
    slot.current.replaceChildren();
    setUnit(u);
    loadBanner(slot.current, u);
  }), [pathname]);

  return (
    <aside
      aria-label="Sponsored"
      className="hidden min-[500px]:flex justify-center px-3 pt-3 min-[500px]:h-[72px] min-[760px]:h-[102px]"
    >
      <div ref={slot} style={unit ? { width: unit.width, height: unit.height } : undefined} />
    </aside>
  );
}
