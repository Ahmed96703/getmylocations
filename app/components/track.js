// GA4 events for tool usage. Only event names and fixed labels go to Google,
// never what a visitor typed or found: no coordinates, addresses, IPs, email
// addresses or domains. The privacy policy promises location stays in the
// browser, and Google's terms forbid personal data in events.
// Location permission events come from GEO_TRACK_SCRIPT in layout.jsx, which
// covers every tool that asks for the device's position.
export function track(event, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', event, { tool: window.location.pathname, ...params });
  } catch { /* analytics must never break a tool */ }
}
