# AdSense Review Cleanup — Phase 1

**Date:** 2026-05-20
**Status:** Phase 1 of 2 (Phase 2 = sub-pages, after AdSense approval)

## Goal

Remove on-page patterns that violate Google AdSense Program Policies before the
in-review AdSense application is evaluated. Keep all visible UI, real content,
JSON-LD, FAQ, and existing rankings intact.

## Why this is needed now

Five patterns on the site match documented AdSense rejection reasons:

1. **Hidden keyword-stuffed block in `LocationFinder.jsx`** (`<div className="sr-only">`, 4 paragraphs). Violates "Hidden text" + "Keyword stuffing" policies.
2. **23-keyword `<meta name="keywords">` tag in `index.html`**. Modern SEO ignores it; reviewers read it as a spam signal.
3. **Footer `QUICK_LINKS` in `Footer.jsx`** — 30 anchors, 24 of them point to `/` with keyword-variant text (e.g. "What's my location", "Where am I", "Lat long finder"). Reads as deceptive internal linking / PageRank manipulation.
4. **JSON-LD keyword stuffing in `index.html`** — `alternateName` array with 11 search queries and a 15-keyword `keywords` string on the WebApplication schema. Structured-data spam.
5. **Cloaked `seo-shell` block in `index.html`** — full article (h1, h2, lists, FAQ) hidden from users via 1px clip CSS but visible to crawlers. Violates the cloaking policy ("presenting different content to users and search engines").

These are the only items being changed. No new pages, no URL changes, no
removal of legitimate FAQ / blog / accessibility content / visible UI.

## Scope (what changes)

### 1. `src/pages/LocationFinder.jsx`
- **Remove** the `<div className="sr-only">` block at line 171 (the 4-paragraph hidden keyword block).
- **Keep** the `Skip to content` `sr-only` link at line 119 (legitimate accessibility).

### 2. `index.html`
- **Remove** the `<meta name="keywords">` tag entirely. Google has not used this tag for ranking since 2009; removing is safer than trimming.

### 3. `src/components/Footer.jsx`
- **Remove** the entire `QUICK_LINKS` constant and the `<nav aria-label="Footer topics">` block that renders it.
- **Keep** `SITE_LINKS` (About, Blog, Contact, Privacy, Terms) and copyright — those are legitimate navigation.
- After AdSense approval (Phase 2), a slim footer nav can be reintroduced pointing to the future sub-pages (one link per destination, no keyword-variant duplicates).

### 4. `index.html` — JSON-LD cleanup
- **Replace** the 11-item `alternateName` array on the WebApplication schema with a single legitimate alternate name (`"GetMyLocations"`).
- **Remove** the 15-keyword `"keywords"` string on the WebApplication schema entirely.
- Other JSON-LD `alternateName` values (Organization, Person) are legitimate and kept.

### 5. `index.html` — Cloaked seo-shell removal
- **Remove** the `<div class="seo-shell">…</div>` block and its accompanying `.seo-shell { …clip: rect(0,0,0,0)… }` `<style>` rule.
- The `<div id="app-shell">` (visible loading skeleton) is kept — it is shown to users.
- Modern Googlebot renders JavaScript; the cloaked shell is redundant for indexing and a documented policy violation.

## Out of scope (deliberately not touching)

- The visible FAQ section (legitimate Q&A, real value).
- JSON-LD schemas (legitimate structured data).
- Blog posts.
- The visible homepage UI / dashboard / map.
- URL routes.
- robots.txt, sitemap.xml, llms.txt.
- Any new pages or programmatic SEO — that is Phase 2.

## Success criteria

- `grep "sr-only"` in `LocationFinder.jsx` returns only the skip-link line.
- `grep "meta name=\"keywords\""` in `index.html` returns nothing.
- `grep "QUICK_LINKS"` in `Footer.jsx` returns nothing.
- `grep "seo-shell"` in `index.html` returns nothing.
- No JSON-LD `"keywords"` field or multi-item `alternateName` array on WebApplication schema.
- `npm run build` completes without error.
- Visual UI on `/` is identical (removed blocks were either hidden, cloaked, or footer noise).
- Existing visible content, FAQ accordion, blog posts, remaining JSON-LD, and routes remain untouched.

## Risk

Very low. All three removals are deletions of content that is either invisible
to users or duplicative of existing visible content. The user's one currently
ranking keyword ("Find My Current Coordinates") is supported by visible
content elsewhere on the page, not by any of the removed blocks.

## Phase 2 (deferred — after AdSense approval)

Build 9 sub-pages per earlier brainstorm: `/gps-coordinates-finder`,
`/decimal-degrees-converter`, `/ip-location-lookup`, `/track-my-ip`,
`/reverse-geocoding`, `/drop-pin-on-map`, `/fix-location-not-working`,
`/gps-vs-ip-accuracy`, plus homepage. Each with unique 800-1500 words of real
content. Phased rollout (5 pages, then 4). Not in this spec.
