# Comparison Pages — getmylocations.com

*Planned 2026-10-05. getmylocations.com is free and ad-supported, so there
is no pricing to compare and no "switch to us" funnel. Comparison pages only
make sense here where the site can contribute **tested, verifiable data**.
Every page below is built around a test the reader can repeat.*

## Which comparison pages to build

| # | Page | Target query | Why it fits | Build when |
|---|---|---|---|---|
| 1 | **what3words vs Plus Codes vs GPS coordinates** | "what3words vs plus codes", "what3words alternative" | Real demand: a "we tested 7 what3words alternatives" page ranks for it. The converter can show all three side by side once Plus Codes ship. | After Plus Codes land in the converter (calendar: Oct–Dec 2026) |
| 2 | **Free coordinate converters, tested on tricky inputs** | "best coordinate converter", "utm converter accurate" | Ranking pages for this query repeat feature claims ("6 decimal places"); none tests edge cases. Original test data is the information gain. | After the test protocol below has been run by hand |
| 3 | **Haversine vs Vincenty: how much distance error does a sphere cause?** | "haversine vs vincenty" (developer query) | The site's distance code already computes both; the table below is real output. Distinct from the tool page's intent (developers, not users). | Any time; data ready |

### Not building (and why)

| Idea | Reason |
|---|---|
| "getmylocations vs gps-coordinates.org" and other brand-vs-brand pages | No evidence anyone searches these brand pairs; attacking small free tools reads as spam |
| "Life360 alternatives" / "Find My alternatives" | Different product (family tracking with accounts and servers); claiming to be an alternative would be misleading |
| Roundups ranking ourselves #1 without tests | Google's reviews guidance rewards first-hand testing; an untested self-ranking is the pattern it demotes |

---

## Page 1 — what3words vs Plus Codes vs GPS coordinates

**Title (58):** `what3words vs Plus Codes vs GPS Coordinates: Which to Use`
**H1:** what3words vs Plus Codes vs GPS coordinates
**Slug:** `/blog/what3words-vs-plus-codes-vs-coordinates`
**Target:** ~1,800 words · hub: `/coordinates-converter`

### Comparison matrix (fill each cell from the cited source; mark "as of" date)

| | GPS coordinates (lat, long) | Plus Codes (Open Location Code) | what3words |
|---|---|---|---|
| Example (Badshahi Mosque) | 31.588126, 74.309353 | *generate with the converter* | *look up on what3words.com; do not invent* |
| Grid size | Any precision (6 decimals ≈ 0.11 m of latitude) | ~14 × 14 m at 10 characters (source: Open Location Code spec) | 3 × 3 m squares (source: what3words) |
| Licence | Public standard (WGS 84) | Open source, Apache 2.0 (source: github.com/google/open-location-code) | Proprietary; API access governed by what3words terms |
| Works offline | Yes | Yes (pure algorithm) | Needs the app or its word list |
| Language | Numbers, language-neutral | Letters/digits, language-neutral | Words; separate word lists per language |
| Typo risk | Swapped or missing minus sign | Wrong character → nearby or invalid cell | Similar-sounding words can point to a different place (cite a published analysis, e.g. Language Log) |
| Accepted by | Every map app, emergency services via phone location | Google Maps search | what3words app; some emergency services and couriers |

### Outline
1. **Quick answer (100):** which to use for what (sharing with a person, emergency, data entry, software).
2. **How each one works (400):** one H3 each, with the same landmark encoded in all three.
3. **The comparison table (above)**, with a featured-snippet target.
4. **Precision, in metres (250):** a table generated from the converter code.
5. **Errors and typos (250):** what a one-character or one-word mistake does.
6. **Licensing and offline use (200).**
7. **Which should you use? (250):** per scenario.
8. **Convert between them (100):** CTA to the converter.
9. **FAQ** (genuine questions; no new FAQ markup needed for SERP benefit).

**Fairness rules:** link the official what3words and Open Location Code
pages for each claim; state that getmylocations.com supports coordinates and
Plus Codes but not what3words (the reason is proprietary licensing); credit
what3words' real strength, memorability.

---

## Page 2 — Free coordinate converters, tested

**Title (57):** `Free Coordinate Converters Tested on 6 Tricky Inputs (2026)`
**Slug:** `/blog/coordinate-converters-tested`

### Test protocol (run by hand; record screenshots and the date)

Expected answers come from proj4, GeographicLib and the mgrs library (the
same references the site's own converter was checked against). Each tool
scores pass, fail or not supported per row.

| # | Input | Why it is tricky | Expected (reference library) |
|---|---|---|---|
| 1 | 78.2232, 15.6267 → UTM | Svalbard uses zone 33X, not the regular grid | zone 33X (compute exact E/N with proj4) |
| 2 | 60.39, 5.32 (Bergen) → UTM | Norway exception: zone 32V | zone 32V |
| 3 | -33.856784, 151.215297 → UTM | Southern hemisphere false northing | compute with proj4 |
| 4 | 0.000001, 179.999999 → DMS | Antimeridian and rounding to 60″ | no "60″" or "180°00′60″" output |
| 5 | 31°35′17.3″N 74°18′33.7″E → DD | DMS parsing with prime/double-prime symbols | 31.588139, 74.309361 |
| 6 | MGRS `43RDQ...` (pick a Lahore point) → DD | MGRS truncation, not rounding | compute with mgrs |

**Tools to test** (from page one for "coordinate converter", 2026-10-05):
gpxanalyzer.com, simplemaplab.com, mapscaping.com, toolv.com, coordconv.com,
geoqux.com, and getmylocations.com itself, which must be included and scored
by the same rules, failures and all.

**Rule:** publish only results actually observed. If a tool can't be tested
(down, paywalled), write "not tested", never a guess.

---

## Page 3 — Haversine vs Vincenty

**Title (55):** `Haversine vs Vincenty: How Much Error Does a Sphere Add?`
**Slug:** `/blog/haversine-vs-vincenty`

### Data (real output, generated 2026-10-05 from `app/distance-calculator/dist.js`; haversine on a 6,371,008.8 m sphere)

| Route | Vincenty (WGS 84) | Haversine (sphere) | Difference | Error |
|---|---|---|---|---|
| London → Paris | 343.923 km | 343.557 km | −367 m | −0.107% |
| Lahore → Karachi | 1,032.166 km | 1,033.000 km | +834 m | +0.081% |
| New York → Los Angeles | 3,944.422 km | 3,935.752 km | −8,671 m | −0.220% |
| Oslo → Longyearbyen | 2,049.801 km | 2,043.396 km | −6,406 m | −0.312% |
| Sydney → Santiago | 11,368.984 km | 11,346.731 km | −22,254 m | −0.196% |
| 1 km due north at 60°N | 1.000 km | 0.999 km | −2 m | −0.195% |

Generate the published table at build time, the same way the distance
calculator's reference table is generated, so the numbers can't drift from
the code. Drop near-antipodal pairs (Vincenty's known convergence edge case)
or explain the fallback. The post links to `/distance-calculator`, and its
intent (developers choosing a formula) differs from the tool page's (users
measuring a distance).

---

## Conversion and trust elements (all three pages)

- One CTA after the comparison table, pointing to the relevant tool; none inside competitor sections.
- An "Updated [date]" line, the author byline, a methodology paragraph and a disclosure line ("getmylocations.com is our site").
- Review every 3 months, or when a compared product changes.
- Schema: see `comparison-schema.json`. Use BlogPosting plus ItemList only. No Product or AggregateRating: there are no genuine ratings, and self-serving review markup is against Google's guidelines.
