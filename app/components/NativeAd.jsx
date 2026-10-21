'use client';

import { useEffect, useRef } from 'react';

// Native banner (bauval.org, ad unit 7e46cc3a…). One per page, placed by each
// page: below the tool on tool pages, above the author box on guides. Not on
// the home page, the fire map or /satellite.
//
// Like the Monetag tags it loads only after the page has loaded and the
// browser is idle. The script fills the container with this id, so the script
// is added again on every mount: after a client-side navigation the new page
// has a fresh, empty container.
const KEY = '7e46cc3a252bdd36f0d8586bd2a9b3a5';
const SRC = `https://bauval.org/21/${KEY}`;

export default function NativeAd() {
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
    <aside aria-label="Sponsored" className="not-prose my-10">
      <p className="text-[10px] uppercase tracking-[0.18em] text-fg-subtle font-semibold mb-2">Sponsored</p>
      {/* min-height keeps the page from jumping when the ads arrive. */}
      <div id={`container-${KEY}`} ref={box} className="min-h-[200px]" />
    </aside>
  );
}
