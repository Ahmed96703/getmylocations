import { readFileSync, writeFileSync } from 'node:fs';
import TurndownService from 'turndown';

// Write a Markdown copy of every sitemap page next to its HTML in out/, and
// advertise it with <link rel="alternate" type="text/markdown">.
// Usage:  node scripts/markdown.mjs   (runs automatically as npm postbuild)
//
// AI agents can read /my-location.md (or /index.md for the homepage) instead
// of parsing the full HTML page. Only <main> is converted, so header, footer,
// ads and scripts stay out. The .md files are served with noindex (see
// public/_headers) so they never compete with the HTML pages in search.

const ORIGIN = 'https://getmylocations.com';
const OUT = new URL('../out/', import.meta.url);

const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  new URL(m[1].trim()).pathname.replace(/\/$/, ''),
);

const turndown = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
});
// Interactive tool widgets and decoration carry no readable content.
turndown.remove([
  'script', 'style', 'noscript', 'svg', 'canvas', 'iframe',
  'form', 'input', 'button', 'select', 'textarea', 'label', 'ins',
  'nav', // breadcrumbs; the front matter url already says where the page sits
]);

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>');

let written = 0;
for (const path of paths) {
  const base = path === '' ? 'index' : path.slice(1);
  const htmlFile = new URL(`${base}.html`, OUT);
  const mdHref = `/${base}.md`;
  let html;
  try {
    html = readFileSync(htmlFile, 'utf8');
  } catch {
    console.error(`markdown: no ${base}.html for sitemap path "${path || '/'}"`);
    process.exit(1);
  }

  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0];
  if (!main) {
    console.error(`markdown: no <main> in ${base}.html`);
    process.exit(1);
  }
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');

  const body = turndown
    .turndown(main)
    .replace(/\]\(\//g, `](${ORIGIN}/`) // absolute links survive being read out of context
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  const front = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `url: ${ORIGIN}${path || '/'}`,
    '---',
  ].join('\n');
  writeFileSync(new URL(`${base}.md`, OUT), `${front}\n\n${body}\n`);

  if (!html.includes('type="text/markdown"')) {
    html = html.replace(
      '</head>',
      `<link rel="alternate" type="text/markdown" href="${mdHref}"/></head>`,
    );
    writeFileSync(htmlFile, html);
  }
  written++;
}
console.log(`markdown: wrote ${written} .md files to out/`);
