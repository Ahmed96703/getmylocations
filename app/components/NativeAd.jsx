'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Native banner (bauval.org, ad unit 7e46cc3a…), the Adsterra format that
// fills most reliably. Since 2026-10-24, at the user's request, it sits at the
// top of every page, just under the site header (rendered once in the layout),
// in place of the 728x90 that Adsterra rarely filled. A native unit can appear
// only once per page, so pages no longer carry their own copy below the tool.
//
// It loads after the page has loaded and the browser is idle. The script fills
// the container with this id, so each page view gets a fresh container (keyed
// by path) and a fresh script.
const KEY = '7e46cc3a252bdd36f0d8586bd2a9b3a5';
const SRC = `https://bauval.org/21/${KEY}`;

function NativeSlot() {
  const box = useRef(null);

  useEffect(() => {
    let idle;
    let script;
    const load = () => {
      if (!box.current) return;
      script = document.createElement('script');
      script.src = SRC;
      script.async = true;
      script.dataset.cfasync = 'false';
      box.current.parentNode.insertBefore(script, box.current);
    };
    const whenIdle = () => {
      idle = 'requestIdleCallback' in window
        ? window.requestIdleCallback(load, { timeout: 3000 })
        : window.setTimeout(load, 1500);
    };
    if (document.readyState === 'complete') whenIdle();
    else window.addEventListener('load', whenIdle, { once: true });
    return () => {
      window.removeEventListener('load', whenIdle);
      if (idle && 'cancelIdleCallback' in window) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      script?.remove();
    };
  }, []);

  return (
    <aside aria-label="Sponsored" className="not-prose max-w-5xl mx-auto px-5 pt-4">
      <p className="text-[10px] uppercase tracking-[0.18em] text-fg-subtle font-semibold mb-2">Sponsored</p>
      {/* Reserve the banner's height before the ads arrive, so the page below
          does not jump: the 2x2 widget is about 0.86 times as tall as it is
          wide (847px at 984px, measured 2026-10-24). */}
      <div id={`container-${KEY}`} ref={box} style={{ minHeight: 'calc(min(100vw - 40px, 984px) * 0.86)' }} />
    </aside>
  );
}

export default function NativeAd() {
  const pathname = usePathname();
  return <NativeSlot key={pathname} />;
}
