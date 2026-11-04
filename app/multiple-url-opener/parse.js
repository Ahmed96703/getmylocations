import { toUrl } from '../components/net.js';

// One address per line (or separated by spaces/commas); bare domains get https://.
// Shared by the tool and the page, so the page's examples match what the tool opens.
export function parseUrls(text) {
  const seen = new Set();
  return text.split(/[\s,]+/).map((s) => toUrl(s)).filter((u) => u && !seen.has(u) && seen.add(u));
}
