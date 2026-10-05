# Site Structure — getmylocations.com

Flat URLs, no dates in slugs. Tools sit at the root because they are the
primary landing pages; posts live under `/blog/`.

```
/                               Home: my location (GPS) + tool hub
├── Tools (9 live, 2–3 planned)
│   ├── /live-location          live tracking, trail, GPX export
│   ├── /my-location            one-shot GPS fix
│   ├── /coordinates-converter  DD · DMS · DDM · UTM · MGRS  (+ Plus Code, Geohash planned)
│   ├── /ip-location            IP geolocation + domain lookup
│   ├── /distance-calculator    Vincenty distance, bearing, midpoint
│   ├── /address-finder         forward + reverse geocoding
│   ├── /street-view            Street View hand-off
│   ├── /driving-directions     route preview + Google Maps hand-off
│   ├── /maps                   interactive map
│   ├── /elevation              PLANNED: "what is my elevation"
│   └── /area-calculator        PLANNED: measure area on a map
├── Guide pages (evergreen, tool-adjacent)
│   ├── /fix-location-not-working
│   ├── /reverse-geocoding
│   └── /gps-vs-ip-accuracy
├── /blog                       index (lastmod = newest post, set at build)
│   └── /blog/<slug>            13 posts, more per calendar
└── Trust pages
    ├── /about                  author, method, corrections log
    ├── /contact
    ├── /privacy-policy
    ├── /terms
    └── /disclaimer
```

## Topic clusters and internal links

Each cluster has one tool as its hub. Posts link up to their hub and across
to one sibling. Tools link down to their two most relevant posts.

| Hub (tool) | Spokes |
|---|---|
| /my-location, /live-location | how-to-find-your-gps-coordinates, enable-location-on-iphone-and-android, enable-location-on-windows-and-mac, how-to-share-gps-location-safely, browser-geolocation-api-explained, /fix-location-not-working |
| /coordinates-converter | latitude-vs-longitude-explained, history-of-latitude-and-longitude, *planned:* decimal-places-precision, what-is-mgrs, plus-codes-vs-coordinates |
| /ip-location | what-is-ip-location-and-how-accurate, what-your-ip-reveals, /gps-vs-ip-accuracy |
| /distance-calculator | *planned:* great-circle-vs-rhumb-line, how-far-did-i-walk-gpx |
| /address-finder | /reverse-geocoding, why-maps-show-wrong-street |
| general | how-gps-works, 10-uses-for-gps-coordinates, gps-coordinates-emergencies-aml-guide |

## Rules for new URLs

1. A new tool page must ship with at least 800 words of original
   explanation, a worked-example table generated from its own code, and
   WebApplication plus BreadcrumbList schema.
2. A new post must target a query no existing page answers. Check Search
   Console for which URL already gets impressions for it.
3. Add it to `public/sitemap.xml`; for posts, the prebuild script fixes the date.
4. No location-swap pages (quality gate: warning at 30, hard stop at 50).
