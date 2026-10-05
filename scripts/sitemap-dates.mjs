// Runs before `next build`. Keeps the blog <lastmod> values in
// public/sitemap.xml in step with app/posts/manifest.js, the single source of
// truth for each post's modifiedDate, so the sitemap cannot drift from the
// dates the posts show. /blog gets the newest post date, because its list of
// titles, excerpts and dates changes whenever a post does. Other pages are
// still dated by hand: only significant content changes should move them.
import fs from 'node:fs';

const SITEMAP = 'public/sitemap.xml';
const BASE = 'https://getmylocations.com';

const manifest = fs.readFileSync('app/posts/manifest.js', 'utf8');
const posts = [...manifest.matchAll(/slug:\s*'([^']+)'([\s\S]*?)(?=\n\s*slug:|\n\];)/g)].map(([, slug, body]) => {
  const date = body.match(/\bdate:\s*'(\d{4}-\d{2}-\d{2})'/)?.[1];
  const modified = body.match(/modifiedDate:\s*'(\d{4}-\d{2}-\d{2})'/)?.[1];
  return { slug, lastmod: modified || date };
});
if (!posts.length || posts.some((p) => !p.lastmod)) throw new Error('sitemap-dates: could not read post dates from the manifest');

let xml = fs.readFileSync(SITEMAP, 'utf8');
const changes = [];

const setLastmod = (path, lastmod, onlyIfNewer = false) => {
  const re = new RegExp(`(<loc>${BASE}${path}</loc>\\s*<lastmod>)(\\d{4}-\\d{2}-\\d{2})(</lastmod>)`);
  const m = xml.match(re);
  if (!m) throw new Error(`sitemap-dates: ${BASE}${path} is missing from ${SITEMAP}`);
  if (m[2] === lastmod || (onlyIfNewer && m[2] > lastmod)) return;
  xml = xml.replace(re, `$1${lastmod}$3`);
  changes.push(`${path}: ${m[2]} -> ${lastmod}`);
};

for (const p of posts) setLastmod(`/blog/${p.slug}`, p.lastmod);
setLastmod('/blog', posts.map((p) => p.lastmod).sort().at(-1), true);

if (changes.length) fs.writeFileSync(SITEMAP, xml);
console.log(`sitemap-dates: ${posts.length} posts checked${changes.length ? `; updated ${changes.join(', ')}` : ', all in step'}`);
