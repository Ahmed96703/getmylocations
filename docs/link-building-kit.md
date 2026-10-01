# Link-building kit — getmylocations.com

Ready-to-paste copy for the backlink steps that need your own accounts.
Everything here is checked against the live site as of 2026-10-01 (9 tools,
BigDataCloud → Nominatim reverse geocoding, Next.js static export on
Cloudflare, Leaflet maps). Update the numbers if the site changes before you post.

Already done: the GitHub repo now has the site as its website, a description,
and 7 topics.

---

## 1. Get real backlink data (do these first, ~20 min total)

### Google Search Console — Links report
Search Console → **Links** → *Top linking sites*. This is the first-party list
of who links to you. Note the count; it is your baseline.

### Bing Webmaster Tools
1. https://www.bing.com/webmasters → sign in → **Import from Google Search
   Console** (verifies the site in one click).
2. **Backlinks** report shows inbound links Bing knows about.
3. Settings → **API access** → generate a key, then:
   ```bash
   mkdir -p ~/.config/claude-seo
   # add "bing_api_key" to ~/.config/claude-seo/backlinks-api.json
   ```

### Moz API (free tier)
1. Sign up at https://moz.com/products/api and copy the API key.
2. Add it next to the Bing key:
   ```json
   { "moz_api_key": "YOUR_MOZ_KEY", "bing_api_key": "YOUR_BING_KEY" }
   ```
3. Re-run `/seo backlinks https://getmylocations.com/` — with Moz connected the
   report can produce a real score instead of INSUFFICIENT DATA.

### GitHub profile website (needs your login)
github.com → Settings → Public profile → **URL** → `https://getmylocations.com`.
(The CLI token lacks the `user` scope, so this one can't be set from the terminal.)

Note: your GitHub bio says "Senior Software Engineer"; the About page says
"independent web developer … roughly five years". Make the two match so the
author identity reads consistently.

---

## 2. Show HN

Post at https://news.ycombinator.com/submit on a weekday morning US time.
Stay in the thread for the first 2–3 hours and answer every question.

**Title** (80 char max):
```
Show HN: GetMyLocations – browser GPS tools where no server of mine sees your location
```

**URL:** `https://getmylocations.com`

**Text** (leave blank when a URL is given — post this as the first comment instead):
```
I built a set of small location tools that run entirely in the browser:
find your coordinates and address, live tracking, a DD/DMS/DDM/UTM converter,
IP lookup, Haversine distance, geocoding, maps, Street View and directions —
nine tools in all.

The design constraint was that the coordinate never reaches a server I run.
The page calls the Geolocation API (enableHighAccuracy, maximumAge 0), and the
only outbound request is reverse geocoding: BigDataCloud first, OpenStreetMap
Nominatim as the fallback. It's a Next.js static export on Cloudflare with
Leaflet for maps.

A few things I learned that surprised me:
- Most "where am I" sites use IP lookup, which is often wrong at city level on
  mobile data because carriers route through regional gateways.
- The accuracy field in the Geolocation API is a 95%-confidence radius, and
  indoors it's often thousands of metres.
- My own live tracker was re-geocoding every few seconds while driving because
  of an && that should have been an ||.

The guides are drafted with an AI assistant and fact-checked by me; there's a
public corrections log on the About page listing what I got wrong and fixed.
Feedback on accuracy is very welcome.
```

---

## 3. AlternativeTo

https://alternativeto.net → **Add application**

- **Name:** GetMyLocations
- **URL:** https://getmylocations.com
- **License:** Free
- **Platforms:** Online / Web
- **Short description:**
  `Free browser tools to find your GPS coordinates and address, convert coordinate formats, look up IP location and measure distances. No signup.`
- **Tags:** geolocation, gps, coordinates, maps, privacy-focused
- **Alternative to:** add it as an alternative on existing listings for
  coordinate finders you know well (e.g. LatLong.net, GPS Coordinates). Only
  pick ones that genuinely do the same job.

---

## 4. Product Hunt

https://www.producthunt.com/posts/new — launch 12:01 am Pacific.

- **Name:** GetMyLocations
- **Tagline** (60 char max): `Your GPS coordinates and address, straight from the browser`
- **Description:**
  ```
  Nine free location tools in one place: find your coordinates and address,
  track live, convert DD/DMS/UTM, look up any IP, measure distances, and plan
  routes. No signup, no app, and your coordinates never touch our servers.
  ```
- **Topics:** Maps, Developer Tools, Privacy
- **First comment (maker):** reuse the Show HN text above, trimmed to the
  first two paragraphs.
- **Gallery:** screenshots of the homepage map, the coordinates converter, and
  the GPS vs IP accuracy table.

---

## 5. Stack Overflow / GIS Stack Exchange

Rules that matter (from Stack Exchange's self-promotion policy):
- **You must disclose that you own the site in every answer that links to it**,
  e.g. "(disclosure: I run this site)". Undisclosed links get deleted and can
  get the account suspended.
- The answer must be complete without the link. The link is a bonus.
- Don't link in more than a small fraction of your answers.

Good-fit question types and the page to (optionally) link:

| Question type | Page |
|---|---|
| Convert decimal degrees ↔ DMS | /coordinates-converter |
| Haversine distance / great-circle distance | /distance-calculator |
| Why is navigator.geolocation inaccurate / accuracy huge indoors | /gps-vs-ip-accuracy |
| How many decimal places for lat/long | /coordinates-converter (precision table) |
| watchPosition vs getCurrentPosition | /blog/browser-geolocation-api-explained |

---

## 6. dev.to / Hashnode write-up

Cross-post with a canonical link so Google credits the original:

```yaml
---
title: What I learned building a privacy-first geolocation site
published: true
tags: javascript, webdev, geolocation, privacy
canonical_url: https://getmylocations.com/blog/browser-geolocation-api-explained
---
```

Outline (write it in your own words, from the build):
1. Why browser GPS beats IP lookup, with the GPS vs IP accuracy table numbers.
2. watchPosition settings and what each one costs (battery, staleness).
3. Reverse geocoding without a backend: BigDataCloud → Nominatim fallback,
   and respecting Nominatim's 1 request/second policy.
4. The && vs || throttle bug and how a page's privacy promise caught it.
5. Publishing a corrections log — why it builds trust.

Link back to 2–3 tools in context, not in a list at the end.

---

## Don't

- Buy links, use PBNs, or join link exchanges.
- Submit to dozens of directories at once (50+ is a toxic-link pattern).
- Post the same promotional text in multiple communities.

## Track it

Monthly: Search Console → Links → Top linking sites count.
Goal: first 10–20 genuine referring domains within 3 months.
If still under 5 after 3 months, change the approach rather than doing more of
the same.
