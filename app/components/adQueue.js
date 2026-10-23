// Loads the bauval.org iframe banners one at a time. Every banner tag reads its
// size and key from the same global, window.atOptions, when its script runs,
// so two banners loading at once could read each other's settings. Each load
// waits for the previous script to finish (plus a short gap) before setting
// atOptions for the next one.

const GAP_MS = 300;
let chain = Promise.resolve();

// Append the banner script for { key, width, height } inside `slot`.
// Resolves when the script has run, or failed to load.
export function loadBanner(slot, { key, width, height }) {
  const run = chain.then(() => new Promise((resolve) => {
    if (!slot.isConnected) { resolve(); return; }
    window.atOptions = { key, format: 'iframe', height, width, params: {} };
    const script = document.createElement('script');
    script.src = `https://bauval.org/22/${key}`;
    script.async = true;
    const done = () => window.setTimeout(resolve, GAP_MS);
    script.onload = done;
    script.onerror = done;
    slot.appendChild(script);
  }));
  chain = run;
  return run;
}

// Run `fn` after the page has loaded and the browser is idle, or after
// `fallbackMs` if loading is slow (map pages keep fetching tiles).
// Returns a cancel function.
export function afterLoad(fn, fallbackMs = 4000) {
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
