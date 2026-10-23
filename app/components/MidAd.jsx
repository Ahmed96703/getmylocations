'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { afterLoad, loadBanner, watchFill } from './adQueue.js';
import { MID as UNIT, midDocksRight } from './adLayout.js';

// 300x250 banner in the middle of the page's guide text. Rendered once in the
// layout; on each page it finds the section headings that come after the
// native banner (so always below the tool) and puts the banner before the
// middle one. On guides and blog posts, where the native banner is at the end,
// it uses the headings before it. Pages with fewer than three headings to
// choose from get no banner.
//
// On screens with a wide right margin it goes under the 160x600 rail instead
// (see adLayout.js), never in both places.
//
// It is inserted after load, so to avoid pushing text the visitor is reading,
// it only goes in when the chosen heading is still below the screen.
const NATIVE = '[id^="container-7e46cc3a"]';

function insert() {
  // On wide screens SideAd shows this banner in the right column instead.
  if (midDocksRight()) return null;
  const main = document.querySelector('main');
  if (!main) return null;
  const native = main.querySelector(NATIVE);
  const all = [...main.querySelectorAll('h2')];
  // The native banner now sits above <main> on every page: use all headings.
  if (!native) {
    if (all.length < 3) return null;
    return place(all);
  }
  // eslint-disable-next-line no-bitwise
  const after = all.filter((h) => native.compareDocumentPosition(h) & Node.DOCUMENT_POSITION_FOLLOWING);
  // Guides and blog posts have the native banner at the end: use the headings before it.
  const headings = after.length >= 3 ? after : all.filter((h) => !after.includes(h));
  if (headings.length < 3) return null;
  return place(headings);
}

function place(headings) {
  const target = headings[Math.floor(headings.length / 2)];
  if (target.getBoundingClientRect().top < window.innerHeight) return null;

  const box = document.createElement('aside');
  box.setAttribute('aria-label', 'Sponsored');
  box.className = 'not-prose my-10 flex flex-col items-center';
  box.innerHTML = '<p class="text-[10px] uppercase tracking-[0.18em] text-fg-subtle font-semibold mb-2 self-start">Sponsored</p>';
  const slot = document.createElement('div');
  slot.style.width = `${UNIT.width}px`;
  slot.style.minHeight = `${UNIT.height}px`;
  box.appendChild(slot);
  target.parentNode.insertBefore(box, target);
  loadBanner(slot, UNIT).then(() => watchFill(slot, {
    onEmpty: () => { box.style.display = 'none'; },
    onFill: () => { box.style.display = ''; },
  }));
  return box;
}

export default function MidAd() {
  const pathname = usePathname();
  useEffect(() => {
    let box = null;
    const cancel = afterLoad(() => { box = insert(); });
    return () => { cancel(); box?.remove(); };
  }, [pathname]);
  return null;
}
