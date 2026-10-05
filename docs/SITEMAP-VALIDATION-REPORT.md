# Sitemap Validation Report — getmylocations.com

*Checked 2026-10-05 against the live site after deploy `d489bb1`.*

## Summary

| Check | Result |
|---|---|
| Discovery | `Sitemap: https://getmylocations.com/sitemap.xml` in robots.txt; 200, valid `urlset` |
| XML | Well-formed (xmllint) |
| Size | 32 URLs, far under 50,000 URLs / 50 MB |
| Status codes | 32/32 return 200, 0 redirects |
| Canonicals | 32/32 self-canonical (homepage canonical has no trailing slash; the same URL) |
| Indexability | 32/32 `index, follow` in meta and `X-Robots-Tag`; no noindexed URL listed |
| Protocol | HTTPS only |
| Deprecated tags | None (`priority` and `changefreq` not used) |
| Coverage | Every page in the build and every internal link is listed, except `/404` and the Google verification file, which are correctly left out |
| `lastmod` format | W3C date (`YYYY-MM-DD`) on every URL; values vary (not all one date) |
| Blog posts | All 13 `lastmod` values match each post's `modifiedDate` and `dateModified` |

## Issues

**All three fixed on 2026-10-05:** `/blog` is now 2026-10-05, `/maps` is now
2026-10-01, and `scripts/sitemap-dates.mjs` runs before every build
(`prebuild`). It sets each post's `lastmod` from the manifest and gives
`/blog` the newest post date.

| # | Issue | Severity | Evidence | Fix |
|---|---|---|---|---|
| 1 | `/blog` `lastmod` is stale | Medium | Sitemap says 2026-06-03; the page's own `dateModified` says 2026-10-05; its post list (titles, excerpts, dates) changed on 2026-10-05 | Set to 2026-10-05 |
| 2 | `/maps` `lastmod` is stale | Low | Sitemap says 2026-09-30; commit `1ab9dbe` (2026-10-01) added two in-body links to the converter and address finder | Set to 2026-10-01 |
| 3 | `lastmod` is maintained by hand | Low | The two errors above are drift between `public/sitemap.xml` and the pages | Optional: generate blog `lastmod` from `app/posts/manifest.js` at build time |

### Changes deliberately *not* counted as content changes

Since their `lastmod`, several pages were touched only by sitewide changes: the
author `sameAs` link, AdSense loading, breadcrumb navigation, and copy-button
accessibility. Google asks for `lastmod` to reflect significant changes to
main content, structured data or links, and only trusts it when it is
consistently accurate. These pages therefore keep their dates:
`/my-location`, `/fix-location-not-working`, `/reverse-geocoding`,
`/gps-vs-ip-accuracy`, `/contact`, `/terms` and `/disclaimer`.
