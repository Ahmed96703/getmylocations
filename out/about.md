---
title: "About — GetMyLocations"
description: "Free, privacy-first location tools. Built by Ahmed Anwar — geolocation, GPS, and IP networking guides written from primary sources."
url: https://getmylocations.com/about
---

# About GetMyLocations

Last reviewed October 1, 2026 · Tested on real devices before publish

GetMyLocations is a small independent site that does one thing: it reads your GPS coordinates straight from the browser and turns them into a place name you can copy, share, or feed into a map. The site also hosts a handful of related tools (IP lookup, coordinate-format conversion, distance between two points) and a growing set of articles explaining how the underlying systems actually work.

## Why this site exists

Most “find my location” pages on the web are wrappers around an ad-loaded IP lookup, which is why they place you in the wrong city about half the time. The browser already has a high-accuracy geolocation API that asks the operating system for a real GPS fix — the same signal Maps uses for turn-by-turn directions. GetMyLocations uses that API directly, in your browser, and never sends the coordinate to a server we run. The reverse-geocoding lookup that turns the coordinate into a city name goes to a third party (BigDataCloud or OpenStreetMap Nominatim) and the response stays in the tab. The [Privacy Policy](https://getmylocations.com/privacy-policy) lists every third party in plain language.

## About Ahmed Anwar

I’m **Ahmed Anwar**, an independent web developer based in Karachi, Pakistan. I’ve been building production web apps for roughly five years, mostly around React, Next.js, and the kind of mapping tooling this site is built on — Leaflet, OpenStreetMap tiles, browser geolocation, and the free-tier IP-geolocation APIs you see referenced throughout the guides.

The reason I’m comfortable writing about this stuff is that I ship it. Every tool on this site — the my-location reader, the coordinates converter with live UTM math, the distance calculator using the haversine formula, the driving-directions embed — I wrote and debugged personally, on real devices, in real browsers, with the same API rate limits and CORS quirks any other developer would hit. The articles explain what I learned while building.

## How the writing is done

Honest disclosure: the long-form articles and guides on this site are researched and drafted with the help of an AI writing assistant, then edited and fact-checked by me before they go live. I add the specific numbers, name the APIs the tools actually call, and cut anything that reads like filler. The code for every tool is hand-written and tested on a real phone and laptop before it ships. If you ever spot something that’s wrong, vague, or feels generated, email me at the address below — corrections go up the same day and are logged in [Corrections](#corrections) below.

## Corrections

Mistakes that made it past review, and what changed. Typos and wording tweaks are not listed; anything that was factually wrong is.

-   **October 1, 2026 — [Why maps show the wrong street](https://getmylocations.com/blog/why-maps-show-wrong-street).** Said address interpolation dates back to 1800s surveyors. It went mainstream with the US Census Bureau’s DIME files for the 1970 census and the later TIGER files.
-   **October 1, 2026 — [GPS vs IP accuracy](https://getmylocations.com/gps-vs-ip-accuracy).** Blamed a slow first GPS fix on downloading the almanac. The receiver is waiting for each satellite’s ephemeris, which repeats every 30 seconds.
-   **October 1, 2026 — [Live Location](https://getmylocations.com/live-location).** Android steps named a “High accuracy” mode removed in Android 10, and a tip about tethering a laptop to a phone’s GPS described a feature macOS and Windows do not have. The page also promised the place-name lookup runs at most once every 10 seconds, but the code could run it more often while driving; the code now keeps that promise.
-   **October 1, 2026 — [Driving Directions](https://getmylocations.com/driving-directions).** The FAQ said leaving the origin empty uses your location; it shows an error instead. The “Use my location” button is the way. A 1.4× road-to-straight-line ratio was described as unusual when it is the US average.
-   **October 1, 2026 — [Homepage](https://getmylocations.com/).** Claimed eleven tools (there are nine), said “no tracking” although Google AdSense runs on the site, and named only OpenStreetMap as the reverse-geocoding service when BigDataCloud is tried first.
-   **October 1, 2026 — [My Location](https://getmylocations.com/my-location).** Said six decimal places is about one meter; it is about 11 centimeters. The [Coordinates Converter](https://getmylocations.com/coordinates-converter) FAQ said phones deliver five-decimal (~1.1 m) precision; they typically manage 3–5 m.

## Contact

Email [ahmed@getmylocations.com](mailto:ahmed@getmylocations.com) for questions, feedback, corrections, or partnership ideas. I read everything; I reply to most things within a day or two.
