# Implementation Roadmap — getmylocations.com

The template's Phase 1 (technical foundation, core pages, schema) is **already
complete**: all audits this month pass. The roadmap starts from measurement
and moves to growth.

## Phase 1 — Measure (weeks 1–2, Oct 2026)

| Task | Owner | Done when |
|---|---|---|
| Record baselines: Search Console clicks, impressions, indexed pages, referring domains | Owner | Numbers written into the KPI table below |
| Request indexing in Search Console for the pages rewritten 1–5 Oct | Owner | Requested; old text gone from Google within ~4 weeks |
| Add LinkedIn to author `sameAs` | Owner gives URL, then code | Live on /about and all posts |
| Field tests: live-location walk; Wi-Fi vs mobile on /ip-location | Owner measures, then code | Notes on both pages |
| Optional: `/seo google setup` for API reporting | Owner | `google_auth.py --check` passes |

## Phase 2 — Complete the tools (weeks 3–12, Oct–Dec 2026)

| Task | Depends on | How we'd know it failed |
|---|---|---|
| Plus Code + Geohash in the converter, verified against reference libraries | — | Any reference mismatch in tests; no impressions for "plus code converter" after 8 weeks |
| /elevation tool (free open elevation API, source disclosed in privacy policy) | Privacy and CSP update | Page not indexed after 4 weeks, or no impressions after 8 |
| 6 new posts per calendar | Phase 1 baseline | New posts get under 20 impressions a week after 6 weeks; rethink topics using Search Console data |
| Show HN + YouTube demo | A feature worth showing | No new referring domain in Search Console → Links within 6 weeks |

## Phase 3 — Scale what works (weeks 13–24, Jan–Mar 2027)

- /area-calculator, and GPX import on the distance calculator.
- Write and refresh posts using Search Console's position 8–20 queries.
- dev.to write-up and monthly GIS Stack Exchange answers.
- Rerun `/seo geo`, `/seo backlinks` and `/seo sitemap` and compare with the October reports in `docs/`.

## Phase 4 — Authority (months 7–12, Apr–Sep 2027)

- Publish one piece of original data, e.g. "We measured browser GPS
  accuracy on 5 phones in 3 cities", with a downloadable dataset. Original
  data is the content most likely to be cited and linked.
- Pitch that data to GIS newsletters and blogs.
- Review head terms: only target "my location" and "ip location" harder if
  referring domains have grown.

## KPI targets

Baselines come from Search Console (Phase 1). Targets are the plan's own
goals, not forecasts. Nothing here guarantees rankings.

| Metric | Baseline (fill from Search Console) | 3 months | 6 months | 12 months |
|---|---|---|---|---|
| Organic clicks / month | ___ | +50% | 2× | 4× |
| Queries ranking top 10 | ___ | +25 | +75 | +200 |
| Referring domains (third-party) | ≈0 (Oct 2026 checks) | 5 | 15 | 40 |
| Indexed pages | ___ of 32 | all sitemap URLs | 45 | 60 |
| Core Web Vitals (field) | not yet measured | all "Good" (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1) | keep | keep |

## Risks

| Risk | Mitigation |
|---|---|
| AdSense layout shifts hurt CLS | Reserve ad slot heights; check CLS once PageSpeed quota allows |
| Free third-party APIs change or rate-limit (Nominatim, ipapi.co, elevation) | Keep usage within policy; show a clear error; disclose sources |
| Head-term SERPs never open up | Plan does not depend on them; long tail and tools carry the growth |
| Owner time | Cadence sized for one person; cut posts before cutting refreshes |
