---
title: "GPS Distance Calculator — Between Two Coordinates (Free)"
description: "Distance between two latitude/longitude pairs in km, miles, nautical miles and meters. Haversine formula plus initial bearing. Free, no signup."
url: https://getmylocations.com/distance-calculator
---

Free Tool · Pure JavaScript Math

# GPS distance calculator — between two coordinates

Enter two latitude / longitude pairs and get the great-circle distance in kilometers, miles, nautical miles, and meters, plus the initial bearing. Uses the Haversine formula — pure JavaScript, no API call, no signup.

## Calculate distance

Point A

Point B

## What this calculator does

The tool above takes two pairs of latitude and longitude and returns the straight-line distance over Earth’s surface — the kind of distance an airline quotes when it tells you the flight is 5,000 km, not the longer driving distance that follows roads. The calculation runs in your browser using the Haversine formula, which has been the standard for sea and air navigation for over a century. It is accurate to about 0.5% globally — roughly five kilometers off on a thousand-kilometer trip, which is fine for trip planning and overkill for almost everything else.

Need the coordinates first? The [My Location tool](https://getmylocations.com/my-location) gives you yours in two seconds. If your coordinates are in DMS or UTM rather than decimal degrees, run them through the [Coordinates Converter](https://getmylocations.com/coordinates-converter) first. To pick two points visually instead of typing them, drop pins on the [interactive map](https://getmylocations.com/maps) and read off the coordinates.

## Sanity-check the math against known distances

The first time you use any distance calculator, it pays to verify the output against a pair you already know the answer for. Six common city pairs with their great-circle distances rounded to the nearest kilometre / mile / nautical mile:

From

To

km

mi

NM

London (51.5074, -0.1278)

Paris (48.8566, 2.3522)

344

214

186

New York JFK (40.6413, -73.7781)

London LHR (51.4700, -0.4543)

5,540

3,443

2,991

Karachi (24.8607, 67.0011)

Dubai (25.2048, 55.2708)

1,193

741

644

Sydney (-33.8688, 151.2093)

Tokyo (35.6762, 139.6503)

7,818

4,858

4,221

San Francisco (37.7749, -122.4194)

Los Angeles (34.0522, -118.2437)

559

347

302

Cape Town (-33.9249, 18.4241)

Cairo (30.0444, 31.2357)

7,222

4,488

3,899

Paste any pair above into the tool to verify — the displayed result should match within one kilometre.

## How accurate is great-circle distance, really?

Earth is not a perfect sphere. It bulges slightly at the equator because of its own spin — the equatorial radius is about 21 kilometers larger than the polar radius. The Haversine formula assumes a sphere and ignores that bulge. For most pairs of points the error this introduces is well under one percent.

The points where the error matters are large distances along high-latitude paths — for example, polar flight routes. For those, the Vincenty formula uses the actual ellipsoid shape and gets within millimeters. Survey-grade work uses Vincenty; everyone else uses Haversine because it is simpler and the difference is invisible at the scale humans care about.

## Why driving distance is always longer

People sometimes punch in two coordinates expecting the driving distance and are surprised when the result is much smaller. Driving distance has to follow roads, go around lakes and mountains, respect one-way streets, and divert through interchanges. A drive from London to Paris is about 460 km along roads — but only 344 km in a straight line over the English Channel. The straight-line version is the one this page calculates.

If what you actually want is the road distance, use the [Driving Directions tool](https://getmylocations.com/driving-directions) instead. It calls the routing engine that does know about roads.

## What the bearing field tells you

Alongside the distance, the calculator returns an initial bearing — the compass direction you would head if you started walking from point A towards point B. The catch with great-circle routes is that the bearing does not stay constant. A great-circle path from London to Tokyo starts heading northeast and ends heading southeast, even though Tokyo is south of London on the map. That is why polar flight routes look curved on a flat map but are actually straight lines on the globe.

## Frequently asked questions

How do I calculate the distance between two GPS coordinates?+

Paste each coordinate pair into the tool above — latitude first, then longitude — and the page returns the great-circle distance in kilometers, miles, nautical miles, and meters, plus the initial bearing. The math runs entirely in your browser; no signup, no API call. For an outdoor measurement against a known landmark, six decimals of input precision is more than enough.

What is the Haversine formula and why is this calculator using it?+

The Haversine formula gives the great-circle distance between two points on a sphere — the shortest path across the surface, the kind of distance airlines quote. It treats Earth as a perfect sphere and is accurate to about 0.5% globally (roughly five kilometers of error on a thousand-kilometer trip). It is the standard for navigation and trip planning because it is simple, fast, and the error is invisible at human scales.

How is great-circle distance different from driving distance?+

Great-circle distance is the straight line over Earth's surface. Driving distance follows roads — going around lakes, respecting one-way streets, diverting through interchanges. London to Paris is about 460 km by road but only 344 km in a straight line over the English Channel. If you need the road distance, use a routing tool like Google Maps or Apple Maps; this calculator only computes the geodesic line.

How accurate is this calculator?+

For any two points on Earth, the error is well under 1% — typically under 0.5%. The remaining error comes from Earth not being a perfect sphere (it bulges 21 km at the equator). For survey-grade precision the Vincenty formula gets within millimeters by modeling the actual ellipsoid; for everything else, Haversine is fine. The calculator also displays the initial bearing, which is the compass direction at the starting point — it changes along the path because great-circle routes curve on a flat map.

How do I find the GPS coordinates of two points?+

For your current location, open the My Location tool and tap Find — it gives you your live coordinates in two seconds. For other places, search a landmark in Google Maps, long-press the pin, and the coordinates appear in the search bar at the top. Copy them into this calculator. The GPS Coordinates Finder page also covers every shortcut.

What units does the distance calculator support?+

Kilometers (km), statute miles (mi), nautical miles (NM), and meters (m). All four are computed from the same Haversine result, so they are exactly consistent — no rounding mismatches between the displayed values. Nautical miles are useful for marine and aviation; meters are useful for short distances (under a kilometer) where the other units lose precision in the trailing digits.

## Useful companion tools

[

### My Location

Get your live GPS coordinates

](https://getmylocations.com/my-location)[

### Coordinates Converter

DD ↔ DMS ↔ UTM

](https://getmylocations.com/coordinates-converter)[

### Address Finder

Address ↔ coordinates

](https://getmylocations.com/address-finder)[

### Driving Directions

Road-following route

](https://getmylocations.com/driving-directions)[

### Interactive Maps

Pick two points visually

](https://getmylocations.com/maps)

AA

Written by

### Ahmed Anwar

Independent web developer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
