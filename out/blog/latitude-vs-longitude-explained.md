---
title: "Latitude vs Longitude — Which Is Which, and How to Remember"
description: "Which is which, the order in coordinates, signs, decimal precision, the three formats you will meet, and the antimeridian bug that breaks naive code."
url: https://getmylocations.com/blog/latitude-vs-longitude-explained
---

# Latitude vs Longitude — Which Is Which, and How to Remember

A

Ahmed Anwar

May 11, 2026·8 min read

-   coordinates
-   basics
-   guide

* * *

![Stylized globe with prominent latitude and longitude grid lines glowing in sky blue against a navy background](https://getmylocations.com/blog-images/latitude-vs-longitude-explained-hero.jpg)

I forget which one runs sideways at least once a year, and I write about coordinates for a living. The trick that finally stuck for me is the ladder: **lat**itude is the rungs of a _la_dder, running across; longitude is the long vertical poles. If you can hold onto that one image, the rest of the system — signs, ranges, formats, edge cases — falls out naturally.

## The mental model in one image

-   **Latitude** = the horizontal rungs of a ladder around the globe. Tells you how far **north or south** you are.
-   **Longitude** = the vertical orange-slice lines from pole to pole. Tells you how far **east or west** you are.

A latitude–longitude pair is a single unique point. Every spot on Earth has exactly one.

Each decimal place divides the uncertainty by ten. For most everyday uses, four decimals is plenty.

## Latitude: north and south, easy half

Latitude is measured from the **equator**, the horizontal line halfway between the poles. The equator is `0°`. From there:

-   North pole: **+90°** (or 90°N)
-   Equator: **0°**
-   South pole: **−90°** (or 90°S)

A few landmarks worth memorising:

-   London: 51.5°N
-   New York: 40.7°N
-   Karachi: 24.9°N
-   Sydney: 33.9°S (or −33.9°)

Useful intuition: **1° of latitude is about 111 km everywhere on Earth.** A latitude change of 0.01° is roughly 1.1 km on the ground. Latitude was the easy half because a sextant reading off the noon sun gives it directly — any decent ship’s captain in 1750 could read latitude from a moving deck.

## Longitude: east and west, the hard half

Longitude is measured from the **prime meridian**, a vertical line that — by an 1884 international vote — runs through the Royal Observatory in Greenwich. Why Greenwich specifically? Mostly because the British already had the most widely used maritime charts and re-printing every chart in the world was unappealing. The story is the [history of latitude and longitude](https://getmylocations.com/blog/history-of-latitude-and-longitude) post if you want the full version.

-   Prime meridian (Greenwich): 0°
-   Antimeridian (international date line, roughly): ±180°

-   London: 0° (right on the line)
-   New York: −74.0° (or 74°W)
-   Karachi: 67.0°E
-   Tokyo: 139.7°E

Unlike latitude, the real-world distance covered by 1° of longitude **depends on where you are**. At the equator, 1° of longitude is about 111 km. At the poles, it shrinks to zero (all meridians converge). Around the latitude of Karachi or New York, 1° of longitude works out to roughly 90–95 km.

## Which comes first, latitude or longitude?

Almost every human-readable format puts **latitude first**. When you see `48.858420, 2.294500`, the first number is latitude (48.858420°N) and the second is longitude (2.294500°E). This is the order used by Google Maps, Apple Maps, every smartphone, and almost every navigation app you’ll ever paste a coordinate into.

The one big exception: **GeoJSON, PostGIS, and many programming geometry libraries put longitude first** — `[2.294500, 48.858420]`. Mathematicians prefer (x, y) order, longitude maps to x, and the geospatial standards bodies followed the math. Loading a GeoJSON file directly into a (lat, lon)-assuming app reflects every point horizontally. I’ve hit this bug more than once.

**Quick rule for unfamiliar coordinates:** if either number has an absolute value greater than 90, that one is definitely longitude (|lat| can only go up to 90; |lon| can go up to 180). If both numbers are under 90 in absolute value, assume latitude first unless the source explicitly uses GeoJSON convention.

## The three formats you’ll see

All three encode the same point in different notations. Need to convert between them? Our free [coordinates converter](https://getmylocations.com/coordinates-converter) translates DD ↔ DMS ↔ DDM ↔ UTM with one click.

1.  **Decimal degrees (DD):** `40.712776, -74.005974`Default everywhere modern. Google Maps, GPS apps, APIs.
2.  **Degrees, minutes, seconds (DMS):** `40°42'45.99"N 74°00'21.51"W`Old-school nautical and aviation format.
3.  **Degrees and decimal minutes (DDM):** `40°42.766'N 74°00.358'W`Common on marine GPS units.

## How many decimal places do you actually need?

Each extra decimal in DD format divides your uncertainty by 10:

Decimals

Precision

Use case

0

~111 km

Country

1

~11 km

Large city

2

~1.1 km

Neighbourhood

3

~110 m

Street

4

~11 m

Single building

5

~1.1 m

Doorway / parked car

6

~0.11 m

Survey grade

For most everyday sharing, four decimals is plenty. Posting your home address publicly? Two or three decimals coarsens you to the neighbourhood without giving away the doorway.

## A few common stumbles

### Is the negative sign on latitude or longitude?

Negative latitude = south of the equator. Negative longitude = west of Greenwich.

### What about altitude?

Latitude and longitude pin you to a spot on the surface. Height is a separate value — altitude or elevation — measured in meters above mean sea level. GPS receivers report it in a separate field.

### What does “WGS-84” mean?

The global coordinate system virtually every modern GPS, map, and phone uses. Unless you’re a surveyor working with a national grid, WGS-84 is the only one you’ll meet.

## Coordinates worth memorising

-   **0°, 0°** — the intersection of the equator and prime meridian, in the Atlantic off the coast of Ghana. Nicknamed “Null Island”; not actually an island. If you ever see an app place something there, it’s a bug — somebody set lat and lon to zero as a default.
-   **Eiffel Tower:** 48.8584, 2.2945
-   **Statue of Liberty:** 40.6892, −74.0445
-   **Sydney Opera House:** −33.8568, 151.2153
-   **Mount Everest summit:** 27.9881, 86.9250
-   **North Pole:** 90.0, undefined longitude (all meridians meet)
-   **South Pole:** −90.0, undefined longitude

## Three edge cases that break poorly-written software

-   **The antimeridian (longitude ±180°).** Where east meets west in the Pacific. A great-circle line from Alaska to Vladivostok crosses ±180°, but naive code treating longitude as a flat number draws the line all the way around the world the other way. You can spot the bug whenever a flight-tracker map shows planes flying through Africa to cross the Pacific.
-   **The poles (latitude ±90°).** Longitude is meaningless here. Distance formulas that assume rectangular coordinates fall apart. Real-world relevance: weather forecasting at McMurdo, GPS-guided drones over Arctic ice.
-   **West-positive longitude.** Some legacy databases (pre-1980s NOAA, for instance) use west-positive instead of today’s east-positive convention. Loading directly into Google Maps reflects every point horizontally.

## Distance between two coordinates

How far apart are two latitude–longitude pairs? You can’t use Pythagoras because the Earth is round. The **Haversine formula** gives the great-circle distance — the shortest path across the sphere’s surface — accurate to within ~0.5% for any pair of points on Earth. For most everyday cases (driving estimates, real-estate copy, flight planning), it’s plenty. For long-distance survey accuracy, the Vincenty formula accounts for Earth’s actual ellipsoid shape and is good to a few millimeters. Both are one-liners in any modern programming language; the [distance calculator](https://getmylocations.com/distance-calculator) on this site uses Haversine.

## Read your own coordinates

Open the [My Location tool](https://getmylocations.com/my-location) and you’ll see your own latitude and longitude in decimal degrees, with six decimals of precision, plus a live map pin. For the raw coordinate display without the address lookup, the [GPS Coordinates page](https://getmylocations.com/my-location) does the same job. Worth doing once just to anchor what the numbers feel like for the place you’re sitting in.

If you want to watch the coordinates update as you move — a good way to internalise how small a 0.0001° change actually is in the real world — the [Live Location tracker](https://getmylocations.com/live-location) streams a fresh fix every second or two.

## Frequently asked questions

What is the difference between latitude and longitude in simple terms?+

Latitude is the horizontal rungs of a ladder around the globe — it tells you how far north or south of the equator you are, between -90° and +90°. Longitude is the vertical orange-slice lines from pole to pole — it tells you how far east or west of the prime meridian (which runs through Greenwich, England) you are, between -180° and +180°. Two numbers together identify any point on Earth.

Which comes first, latitude or longitude?+

In almost every human-readable format — Google Maps, Apple Maps, smartphone displays, navigation apps — latitude comes first. So in "48.858420, 2.294500" the first number is latitude. The big exception is GeoJSON and most programming geometry libraries (PostGIS, Mapbox, Turf), which use \[longitude, latitude\] order because mathematicians prefer (x, y) and longitude maps to x. Pasting GeoJSON into a lat-first app reflects every point horizontally.

How many decimal places do I need for GPS coordinates?+

Each decimal divides the uncertainty by ten. Four decimals (~11 m) is plenty for a single building. Five (~1.1 m) lands on a parked car. Six (~11 cm) is survey-grade. For posting your home publicly without giving away the doorway, two or three decimals coarsens you to a neighbourhood.

What does a negative latitude or longitude mean?+

A negative latitude is south of the equator (Sydney is -33.9°), and a positive one is north. A negative longitude is west of Greenwich (New York is -74.0°), and a positive one is east. Some older formats use letters instead of signs — "33.9° S" and "74.0° W" mean the same thing as -33.9 and -74.0 in decimal degrees.

How do I find my own latitude and longitude?+

On a phone, open the My Location tool in any browser and tap Allow on the permission prompt — your six-decimal latitude and longitude appear within two seconds. The Compass app on iPhone shows them at the bottom of the screen. On Android, long-press your blue dot in Google Maps and the coordinates appear in the search bar. All three give the same number, in the same format, in lat-first order.

How do I convert latitude and longitude between decimal degrees and DMS?+

Decimal degrees and degrees-minutes-seconds are the same point in different notations. 40.712776° is the same as 40°42′45.99″. To convert manually: keep the integer part as degrees, multiply the fractional part by 60 to get minutes, then multiply the fraction of that by 60 again to get seconds. Or open our free coordinates converter, paste a coordinate in any format, and it returns all three (DD, DMS, DDM, plus UTM) instantly.

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).

[← Back to all posts](https://getmylocations.com/blog)
