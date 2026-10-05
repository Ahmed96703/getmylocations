# GEO Analysis — getmylocations.com

*Date: 2026-10-05. Scope: whole site (32 indexable pages). Scores are this
audit's own heuristic, not Google signals. Google's AI optimization guide says
optimizing for AI search "is still SEO"; findings below are framed that way.*

## 1. GEO Readiness Score: **75 / 100**

| Criterion | Weight | Score | Basis |
|---|---|---|---|
| Citability | 25 | 20 | Specific, sourced numbers throughout (MaxMind accuracy, GeographicLib-checked distances, generated reference tables); tools answer the query on first screen |
| Structural readability | 20 | 18 | Clean H1→H2→H3 on every page, question-style headings, tables, numbered steps, FAQs |
| Multi-modal | 15 | 11 | Interactive tools and maps on 9 pages, images on blog posts; no video |
| Authority & brand | 20 | 7 | Byline, dates, cited sources and a public corrections log are strong; **almost no third-party mentions** pull this down |
| Technical accessibility | 20 | 19 | Full server-side HTML, all AI search crawlers allowed, Markdown alternates; −1 because tables are flattened in the Markdown copies |

## 2. Platform readiness (qualitative — not measured)

No AI-visibility tool (e.g. DataForSEO, SE Ranking) is configured, so no platform
gets a numeric score.

| Platform | Readiness | Why |
|---|---|---|
| Google AI Overviews / AI Mode | Moderate | Served from the Googlebot index; depends on ranking, which is limited by the site's age and near-zero backlinks |
| ChatGPT Search | Moderate | OAI-SearchBot allowed; ChatGPT leans heavily on Wikipedia and Reddit, where the site has no presence |
| Perplexity | Low–moderate | PerplexityBot allowed; Perplexity favours community sources (Reddit) — none |
| Bing Copilot | Moderate | Bing index; IndexNow is wired up and used after every deploy |

**Stale index observed:** a web search on 2026-10-05 still returned the site's
old text ("eleven more focused tools", "independent web developer"), corrected
on 1–5 October. Engines have not recrawled yet.

## 3. AI crawler access (robots.txt) — each bot reported separately

**Search / citability crawlers** (decide whether answers can cite the site):

| Bot | Governs | Status |
|---|---|---|
| Googlebot | Google Search, AI Overviews, AI Mode | Allowed |
| OAI-SearchBot | ChatGPT Search citations | Allowed |
| Claude-SearchBot | Claude search citations | Allowed |
| PerplexityBot | Perplexity search | Allowed |
| Applebot | Siri / Spotlight / Safari | Allowed |
| Bingbot | Bing / Copilot | Allowed (Crawl-delay 1) |

**Training crawlers** (licensing choice, not search visibility):

| Bot | Governs | Status |
|---|---|---|
| GPTBot | OpenAI model training | Allowed |
| ClaudeBot | Anthropic model training | Allowed |
| Google-Extended | Gemini/Vertex training & grounding (not Search) | Allowed |
| Applebot-Extended | Apple Intelligence training opt-out signal | Allowed |
| CCBot | Common Crawl | Allowed |

**User-triggered fetchers:** ChatGPT-User and Perplexity-User allowed;
Claude-User has no named group and inherits `*` (allowed).
`Content-Signal: search=yes, ai-input=yes, ai-train=yes` is declared in every
allowed group. Housekeeping only: the `Claude-Web` and `anthropic-ai` groups
are no longer documented by Anthropic and could be removed (harmless as is).

## 4. llms.txt

Present and accurate (updated 2026-10-05: nine tools, correct author).
Reported for completeness only — Google says it is not used by Search and it
carries no weight in this score.

## 5. Brand mentions

| Platform | Presence |
|---|---|
| Wikipedia / Wikidata | None |
| Reddit | None found |
| YouTube | None found |
| LinkedIn | Not linked from the site |
| GitHub | Repo links to the site (since 2026-10-01); profile does not yet |

A web search for "getmylocations" returned only the site's own pages and its
GitHub repo. This is the single biggest GEO gap: third-party studies find brand
mentions correlate with AI citation far more than backlinks do.

## 6. Passage-level citability

Strong, self-contained passages already exist, for example:
- `/gps-vs-ip-accuracy` → "The short answer" accuracy table (first screen)
- `/ip-location` → "How accurate is IP geolocation?" with MaxMind's published figures
- `/distance-calculator` → generated reference table with sphere-vs-ellipsoid error
- `/coordinates-converter` → worked-examples table generated from the tool's own code

## 7. Server-side rendering

Verified 2026-10-05: every sitemap page returns its full article text in raw
HTML (187–2,841 words) before JavaScript runs; JavaScript adds no article
content. Markdown alternates (`/<page>.md`, noindex) exist for all 32 pages.

## 8. Top 5 highest-impact changes

1. **Earn third-party mentions** (owner action). Show HN, an honest Stack
   Exchange answer with ownership disclosed, a short YouTube demo of a tool,
   a dev.to build write-up. Drafts are in `docs/link-building-kit.md`.
2. **Connect the author entity.** Add `sameAs` (GitHub, LinkedIn) to the
   `Person` in every `BlogPosting` and on /about. Waiting on the owner's
   profile URLs.
3. **Get the corrected pages recrawled.** Search Console → Request indexing
   for `/`, `/about` and the six rebuilt tool pages; IndexNow already done.
4. **Keep tables in the Markdown copies.** The HTML→Markdown step flattens
   every table into loose lines; enable GitHub-flavoured table output.
5. **Keep the refresh cadence.** Pages refreshed this week are the freshest
   on the site; blog posts dated May–June should get a dated review on a
   schedule (third-party data links recency to AI citation).

## 9. Schema recommendations

- `BlogPosting.author` (all posts): already has `name`; add `url`
  (/about) and `sameAs: [GitHub, LinkedIn]` once the profiles are confirmed.
- Keep `Organization` + `WebSite` sitewide (present).
- `FAQPage` exists on several pages: Google retired FAQ rich results on
  2026-05-07; leave it in place (no harm), do not add more for SERP benefit.

## 10. Content reformatting suggestions

- Blog posts whose answer sits below a long intro (e.g. the history post)
  would benefit from a 2–3 sentence direct answer under the H1.
- Where an FAQ answer duplicates a body section word-for-word, vary or trim
  it so each passage stands on its own.
