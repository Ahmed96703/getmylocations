# Topic Cluster Plan — getmylocations.com

*2026-10-06. Built from `docs/seo-plan/SEO-STRATEGY.md` and `CONTENT-CALENDAR.md`
(strategy import), then checked against search results. Files:
`cluster-plan.json` (data), `cluster-map.html` (open in a browser).*

## Method and its limits

- 20 keywords; the top results for each came from the WebSearch tool on
  2026-10-06. All 190 pairs were compared by shared result URLs.
- **No pair shared more than one URL.** Under the rules (0–1 shared means
  separate pages) every keyword gets its own page, and nothing should be
  merged. The only single-URL overlaps:
  - "how to read GPS coordinates" ↔ "how to enter coordinates in Google Maps":
    both include Google's own Maps help page.
  - "DMS to decimal degrees" ↔ "how many decimal places": both include
    Wikipedia's *Decimal degrees* article.
- Clusters therefore follow **search intent and the site's existing tool
  hubs**, not overlap scores.
- **Caveats:** WebSearch is not Google's index, and keyword volumes were not
  available. Check Search Console impressions before writing each post.

## Structure

The homepage is the site-wide pillar. Each cluster's hub is an existing tool
page that already ranks for the tool-intent queries. Posts are the spokes.

| Cluster | Hub (exists) | Existing spokes | New posts | Tool queries the hub itself should win |
|---|---|---|---|---|
| Coordinate formats | `/coordinates-converter` | latitude-vs-longitude | how to read GPS coordinates · how many decimal places · what is MGRS · UTM zones explained · what3words vs Plus Codes | coordinate converter, DMS to decimal, UTM to lat long, Plus Code converter (after the feature ships) |
| Distance | `/distance-calculator` | — | Haversine vs Vincenty · great-circle vs rhumb line · how far did I walk | distance between coordinates (mixed intent) |
| GPS accuracy | `/gps-vs-ip-accuracy` | how-gps-works | how accurate is phone GPS · why GPS is inaccurate in cities | — |
| IP location and privacy | `/ip-location` | what-is-ip-location, what-your-ip-reveals | does a VPN hide your location | — |

**11 new posts, about 16,200 words.**

**Not given posts:**
- "geohash to lat long": the results are developer libraries (npm, PyPI, GitHub). Handle it as a converter feature only.
- "what is my elevation": tool intent. The planned `/elevation` tool is the page.
- "how to enter coordinates in Google Maps": Google's help holds 3 of 7 results. Make it a section of "how to read GPS coordinates" instead.

## Cannibalization checks

| Risk | Decision |
|---|---|
| New "how to read GPS coordinates" vs existing *how to find your GPS coordinates* and *latitude vs longitude* | Different jobs: *find* means get my own numbers, *read* means interpret a coordinate someone gave you. Keep the format explanations in the new post short and link to latitude-vs-longitude for the detail. |
| New "how accurate is phone GPS" vs `/gps-vs-ip-accuracy` | Check Search Console first. If `/gps-vs-ip-accuracy` already gets impressions for phone-GPS accuracy queries, expand it instead of adding a post. |
| New "Haversine vs Vincenty" vs `/distance-calculator`, which already has a sphere-vs-ellipsoid table | Different audiences: developers choosing a formula versus users measuring a distance. The post links to the tool, and the tool's table stays short. |

## Internal links (full list in `cluster-plan.json`, 57 links)

- **Pillar ↔ hub:** the homepage links to each hub and each hub links back (already true).
- **Hub ↔ spoke, both ways, mandatory:** each new post links to its hub in the first two paragraphs, and the hub gets a "Guides" link to each new post.
- **Spoke → next spoke in the same cluster:** recommended.
- **Cross-cluster, optional:**
  - decimal places → Haversine vs Vincenty
  - how far did I walk → phone GPS accuracy
  - phone GPS accuracy → IP location accuracy
  - VPN → how GPS works
- **Incoming links:** every post also gets one from its topic section on `/blog`. With the hub and the previous spoke, that makes at least 3 incoming links per post, so no page is orphaned.
- **Anchor text:** use the target query or a close variant, never "click here".

## Order (matches CONTENT-CALENDAR.md)

1. Haversine vs Vincenty: the data is ready.
2. How many decimal places.
3. How to read GPS coordinates.
4. What is MGRS.
5. UTM zones explained.
6. How far did I walk.
7. what3words vs Plus Codes: after the Plus Code feature ships.
8. Great-circle vs rhumb line.
9. Why GPS is inaccurate in cities.
10. Does a VPN hide your location.
11. How accurate is phone GPS: only after the Search Console check.
