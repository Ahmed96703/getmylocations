// Submit URLs to IndexNow (Bing, Yandex, Seznam, Naver).
// Usage:  node scripts/indexnow.mjs
// After deploy, also do: curl "https://www.bing.com/indexnow?url=https://getmylocations.com/&key=ee1554a41cb26eb4c13925cd6bd63fa2"

const HOST = 'getmylocations.com';
const KEY = 'ee1554a41cb26eb4c13925cd6bd63fa2';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const URLS = [
  `https://${HOST}/`,
  `https://${HOST}`,
];

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
