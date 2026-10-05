# SEO Strategy — getmylocations.com

*Written 2026-10-05. Companion files: `COMPETITOR-ANALYSIS.md`,
`CONTENT-CALENDAR.md`, `IMPLEMENTATION-ROADMAP.md`, `SITE-STRUCTURE.md`.*

## 1. Where the site stands

| Area | State on 2026-10-05 | Evidence |
|---|---|---|
| Site type | Free browser-based location tools plus supporting guides; earns from AdSense on 26 content pages | Build, `AdSense.jsx` |
| Size | 32 indexable URLs: 9 tools, 4 guide pages, 13 blog posts, the blog index, 5 info pages | `public/sitemap.xml` |
| Technical | Static HTML, full text without JavaScript, valid sitemap, self-canonicals, real 404s, agent checks 8/8 | Sitemap, agentic and GEO reports in `docs/` |
| Content quality | Tool outputs checked against proj4, GeographicLib and mgrs; sourced statistics; public corrections log | Earlier content-brief runs |
| Authority | Near-zero third-party mentions or links; one named author with a GitHub profile | Backlinks and GEO reports |
| Rankings | Ranks for long-tail queries (e.g. "my live location now"); absent from page one for head terms such as "my location", "ip location" and "distance calculator" | Web searches, 2026-10-05 |
| Measurement | Search Console is verified but no API access is configured here; PageSpeed quota exhausted | `/seo google` not set up |

**Diagnosis.** The on-site work is ahead of the site's authority. Every audit
this month ended at the same wall: the site is technically sound and
accurate, but almost nobody links to it or mentions it, and head-term SERPs
are held by 10-to-20-year-old domains (gps-coordinates.org, iplocation.net,
calculator.net). More on-page polish has sharply diminishing returns until
that changes.

## 2. Goal

Grow organic visits to the tool pages, the pages that earn AdSense revenue
and answer the query fastest. Get there through three levers, in this order:

1. **Win the long tail the site can already win.** Specific, accurate,
   intent-matched pages (e.g. "UTM to lat long Svalbard", "save walking route
   as GPX in browser") face weaker competition than head terms.
2. **Make the tools the most complete free option in each niche.** Add the
   missing features competitors list (Plus Codes, Geohash, elevation, area),
   all client-side so the privacy promise holds.
3. **Earn real mentions.** These come from places where developers and map
   users already are (Show HN, GIS Stack Exchange, GitHub, YouTube), never
   from bought or swapped links.

## 3. Positioning

> **Free location tools that are verifiably correct and keep your data on your device.**

This is the angle no head-term competitor takes. Each claim is backed by
something a reader can check:

| Claim | Proof already on the site |
|---|---|
| Correct | Vincenty ellipsoidal distance; UTM with Norway and Svalbard exceptions; outputs cross-checked against proj4, GeographicLib and mgrs |
| Honest | Corrections log on /about; sourced accuracy figures (MaxMind); limits stated (e.g. no follow-me link, IP city accuracy) |
| Private | Coordinates are processed in the browser; GPX is built on the device; third-party calls are disclosed in the privacy policy |

## 4. Keyword strategy

Ordered by how winnable each group is in the next six months:

| Tier | Example queries | Target page | Approach |
|---|---|---|---|
| A: long tail, winnable now | "my live location now", "save route gpx browser", "utm svalbard zone", "how many decimal places gps" | Existing tools and posts | Keep pages accurate and fresh; add the answer high on the page |
| B: feature gaps | "plus code converter", "geohash to lat long", "what is my elevation", "measure area on map" | Converter and new tools | Build features (roadmap phases 2–3) |
| C: head terms | "my location", "ip location", "distance calculator", "where am i" | /, /ip-location, /distance-calculator | Realistic only after authority grows; maintain, do not chase with doorway pages |

**Rejected on purpose:** programmatic "latitude and longitude of [city]" or
"distance from [city] to [city]" pages. They would be hundreds of near-identical
pages (the site's own quality gate stops at 50 location pages), they compete
with established databases, and they are the scaled-content pattern Google's
spam policies target.

## 5. E-E-A-T plan

- **Experience:** add field-test notes measured by the owner, e.g. a timed
  walk recorded on /live-location against a known distance, or Wi-Fi vs
  mobile results on /ip-location (still outstanding).
- **Expertise:** keep the single author entity; add LinkedIn to `sameAs`
  (waiting on the URL).
- **Authority:** mentions plan in `docs/link-building-kit.md`.
- **Trust:** keep the corrections log, and review the posts dated May–June
  on a schedule (see calendar).

## 6. Schema plan (no changes needed for Google features)

Current markup is right for the page types: WebApplication on tools,
BlogPosting on posts, BreadcrumbList, Person with `@id` and `sameAs`, and
Organization with WebSite. FAQPage stays in place but no new FAQ markup is
added for SERP benefit, because Google retired FAQ rich results on
2026-05-07. HowTo is not used. New tools get WebApplication plus
BreadcrumbList, matching the existing ones.

## 7. Measurement

Open Search Console first. Every target in the roadmap is relative to a
baseline that only Search Console has.

- **Weekly:** Search Console → Performance → Pages, clicks and impressions for the 9 tool URLs.
- **Monthly:** queries at positions 8–20 (the "striking distance" list), which feeds the content calendar.
- **Monthly:** referring domains in Search Console → Links.
- **Optional:** connect the API with `/seo google setup` so these reports can be pulled here.
