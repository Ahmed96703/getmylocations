import { readFileSync } from 'node:fs';

// Submit URLs to IndexNow (Bing, Yandex, Seznam, Naver).
// Usage:  node scripts/indexnow.mjs
//
// The URL list is read from public/sitemap.xml rather than hardcoded. It used
// to be a hand-maintained array that had drifted to 11 of 32 URLs, missing
// every tool page, so the pages that matter most were never submitted.
// Run this after a deploy, especially one that adds or redirects URLs.

const HOST = 'getmylocations.com';
const KEY = 'ee1554a41cb26eb4c13925cd6bd63fa2';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const sitemap = readFileSync(
  new URL('../public/sitemap.xml', import.meta.url),
  'utf8',
);
const URLS = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

if (URLS.length === 0) {
  console.error('No <loc> entries found in public/sitemap.xml — nothing to submit.');
  process.exit(1);
}
console.log(`Submitting ${URLS.length} URLs from sitemap.xml`);

const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: URLS };

const endpoints = [
  'https://api.indexnow.org/IndexNow',
  'https://www.bing.com/IndexNow',
  'https://yandex.com/indexnow',
];

for (const url of endpoints) {
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    console.log(`${url} → ${r.status} ${r.statusText}`);
  } catch (e) {
    console.error(`${url} → ${e.message}`);
  }
}
