# Competitor Analysis — getmylocations.com

*From live web searches on 2026-10-05 for the site's main queries. No
paid SEO data source is connected, so authority is described from what is
observable rather than given as a DA score.*

## Who holds the head terms

| Query | Results seen on page one | Where getmylocations.com is |
|---|---|---|
| my location / where am i | gps-coordinates.org, my-location.org, where-am-i.co, geocords.com, mylocationapp.com, where-am-i.net, where-am-i.org | Not on page one |
| my live location now | jibble.io, where-am-i.co, mylocation.app, mobile-tracker-free.com | **On page one** |
| coordinates converter dms utm | mapscaping.com, gpxanalyzer.com, toolv.com, glandnav.com, coordconv.com, simplemaplab.com | Not on page one |
| ip location lookup | dnschecker.org, keycdn.com, infosniper.net, iplocation.io, whatismyip.com, iplocation.net | Not on page one |
| distance between coordinates | maptive.com, daftlogic.com, mappr.co, calculator.net, gps-coordinates.org, sunearthtools.com | Not on page one |

## The five competitors that matter most

| Competitor | Overlap | Strength | Weakness we can use |
|---|---|---|---|
| **gps-coordinates.org** | My location, distance, coordinates: the closest whole-suite rival | Old domain, ranks across many tool queries | Dated UX, thin explanations, heavy ads |
| **where-am-i.co / .net / .org** | My location, live tracking | Exact-match names; simple pages | About 180 words; no accuracy explanation; no privacy detail |
| **iplocation.net / dnschecker.org** | IP location | Very old, heavily linked network-tool brands | Not beatable on head terms soon; beatable on "how accurate is IP location" (we cite MaxMind's own figures) |
| **gpxanalyzer.com / simplemaplab.com** | Coordinate converter | Formats we lack: **Plus Code, Geohash, GARS** | Fewer edge cases explained (our Norway and Svalbard UTM handling) |
| **calculator.net / maptive.com** | Distance | Huge general-calculator authority | Most use a haversine sphere; our Vincenty ellipsoid is more accurate, and the page shows by how much |

## Gap summary

| Gap | Type | Action |
|---|---|---|
| Plus Code and Geohash in the converter | Feature | Add (both are open algorithms that run client-side) |
| "What is my elevation" | Missing tool | New tool; elevation from a free open API with source disclosed |
| Area measurement on a map | Missing tool | New tool, client-side geodesic area |
| Exact-match domains for "where am i" | Structural | Not fixable; compete on quality and long tail |
| Domain age and links | Authority | Mentions plan; no shortcuts |

## What competitors do that we will not copy

- **Live "follow me" share links.** These need server-side storage, which breaks the site's privacy promise; the page explains this instead.
- **Thousands of "coordinates of [city]" pages.** This is a scaled-content risk; see the strategy.
- **Phone-number tracking claims** (e.g. "trace phone number location"). These are misleading for a browser tool and against the site's honesty positioning.
