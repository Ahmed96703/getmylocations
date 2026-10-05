---
title: "GPS Distance Calculator — Between Two Coordinates (Free)"
description: "Measure the distance between two GPS coordinates on the WGS 84 ellipsoid in km, miles and nautical miles, with bearing, midpoint and map. Try it free."
url: https://getmylocations.com/distance-calculator
---

Free Tool · Pure JavaScript Math

# GPS distance calculator — between two coordinates

Enter two points in any common format and get the distance between them in kilometers, miles, nautical miles, and meters, with the initial and final bearing, the midpoint, and the route on a map. Calculated on the WGS 84 ellipsoid, the same Earth model GPS uses, entirely in your browser: no API call, no signup.

## Calculate distance

48.858420, 2.294500 · read as Decimal degrees

40.689200, \-74.044500 · read as Decimal degrees

5,853.103

Kilometers

3,636.949

Miles

3,160.423

Nautical miles

5,853,102.9

Meters

Initial bearing (at A)

291.79° (WNW)

Final bearing (arriving at B)

233.71° (SW)

Midpoint

51.585242, \-39.052782

Sphere (haversine) for comparison

5,837.423 km (−15.680 km)

Distance and bearings are calculated on the WGS 84 ellipsoid (Vincenty’s formulae).

## What this calculator does

The tool above takes two points and returns the shortest distance between them over Earth’s surface, the kind of distance an airline quotes when it tells you the flight is 5,000 km, not the longer driving distance that follows roads. It calculates on the WGS 84 ellipsoid using Vincenty’s formulae, published in 1975 and widely used in survey and mapping software, and shows:

-   the distance in kilometers, statute miles, nautical miles, and meters
-   the **initial bearing** leaving A and the **final bearing** arriving at B
-   the **midpoint** of the route
-   the spherical haversine distance for comparison, and the difference
-   the great-circle route on a map

Need the coordinates first? The [My Location tool](https://getmylocations.com/my-location) gives you yours in two seconds. To see the same point in every format, use the [Coordinates Converter](https://getmylocations.com/coordinates-converter). To pick two points visually instead of typing them, drop pins on the [interactive map](https://getmylocations.com/maps) and read off the coordinates.

## Enter latitude and longitude in any format

Each point box reads the same formats as our coordinate converter, and shows underneath how it understood your input:

-   Decimal degrees: `51.5074, -0.1278` or `51.5074° N, 0.1278° W`
-   DMS: `51°30'26.6"N 0°07'40.1"W`
-   DDM: `51°30.444'N 0°07.668'W`
-   UTM: `30U 699316 5710164`
-   A Google Maps link containing `@lat,lon`

You can mix formats: a DMS point A and a UTM point B work fine. Out-of-range values are flagged instead of producing a wrong distance.

## Sanity-check the math against known distances

The first time you use any distance calculator, it pays to verify it against pairs you already know. These six city pairs are calculated with the calculator’s own code when the page is built, so pasting any pair into the tool gives exactly these numbers. The last two columns show what a spherical haversine calculator would say instead, and how far off that is.

From

To

km

mi

NM

Sphere km

Sphere error

London (51.5074, -0.1278)

Paris (48.8566, 2.3522)

344

214

186

344

−0.4 km

New York JFK (40.6413, -73.7781)

London LHR (51.47, -0.4543)

5,555

3,452

2,999

5,540

−14.9 km

Karachi (24.8607, 67.0011)

Dubai (25.2048, 55.2708)

1,184

736

639

1,182

−2.0 km

Sydney (-33.8688, 151.2093)

Tokyo (35.6762, 139.6503)

7,792

4,842

4,207

7,826

+33.7 km

San Francisco (37.7749, -122.4194)

Los Angeles (34.0522, -118.2437)

559

347

302

559

+0.1 km

Cape Town (-33.9249, 18.4241)

Cairo (30.0444, 31.2357)

7,207

4,479

3,892

7,239

+31.8 km

Distances are rounded to the nearest whole unit. Checked against the GeographicLib reference library in October 2026.

## How accurate is great-circle distance, really?

Earth is not a perfect sphere. Its spin makes it bulge at the equator: the equatorial radius is about 21 km larger than the polar radius. The haversine formula, which most online distance calculators use, ignores that and treats Earth as a ball with a 6,371 km radius. This calculator instead uses the WGS 84 ellipsoid, the model GPS itself uses, so the bulge is accounted for.

We tested the calculator against GeographicLib, the reference library used in GIS software, on 20,000 random pairs of points around the world. The largest difference was under 0.1 mm. In practice your input is the limit: six decimal places pin each point to about 11 cm.

## Haversine vs ellipsoid: when the difference matters

The spherical haversine shortcut is wrong by up to about 0.56%, and the error depends on direction and latitude. It is worst for short north–south trips near the equator, where it overstates distance by up to about 0.56%, and for short trips near the poles, where it understates by up to about 0.44%. Over very long routes the errors partly cancel; from the equator to the North Pole it is only about 0.06% off.

In kilometers, the table above shows it plainly: haversine is about 15 km short on New York to London and about 32 km long on Cape Town to Cairo. That is irrelevant for estimating a flight time and very relevant for fuel planning, surveying, or checking a developer’s own distance code. The “sphere” line in the tool shows the gap for whatever two points you enter.

## Why driving distance is always longer

People sometimes punch in two coordinates expecting the driving distance and are surprised when the result is much smaller. Driving distance has to follow roads, go around lakes and mountains, respect one-way streets, and divert through interchanges. A drive from London to Paris is about 460 km along roads, but only about 344 km in a straight line over the English Channel. The straight-line version is the one this page calculates.

If what you actually want is the road distance, use the [Driving Directions tool](https://getmylocations.com/driving-directions) instead. It calls the routing engine that does know about roads. Across the US, roads average about 1.4 times the straight-line distance.

## What the bearing field tells you

The calculator returns two bearings. The **initial bearing** is the compass direction you set off in from point A; the **final bearing** is the direction you are travelling when you arrive at point B. On the shortest route the two are usually different, because a great circle crosses each meridian at a different angle. London to Tokyo leaves London heading about 32° (north-northeast) and arrives in Tokyo heading about 156° (south-southeast), even though Tokyo is south of London on the map.

## The midpoint between two coordinates

The midpoint is the place exactly halfway along the shortest route, and it is shown as an orange dot on the map. It is not the average of the two latitudes and longitudes: averaging New York and Sydney gives 3.4°N, 38.6°E, in East Africa near the Ethiopia–Kenya border, while the real halfway point is in the central Pacific, near 8.9°N, 147.7°W. The tool walks half the route’s length along the ellipsoid from point A to find it.

## Reading the great-circle line on the map

The blue line is the actual shortest route. On a flat web map it usually looks curved, bowing toward the nearer pole, because the map stretches the globe sideways. That curve is the straight line on the real planet. Routes that cross the 180° meridian, such as Tokyo to Los Angeles, are drawn across the Pacific rather than the long way round the map.

## Frequently asked questions

How do I calculate the distance between two GPS coordinates?+

Paste each point into the tool above, latitude first, in any common format: decimal degrees, DMS, DDM, or UTM. The page returns the distance in kilometers, miles, nautical miles, and meters, the initial and final bearing, the midpoint, and a map of the route. The math runs entirely in your browser; no signup, no API call. For an outdoor measurement against a known landmark, six decimals of input precision is more than enough.

Does this calculator use the haversine formula or Vincenty?+

Both. The main result uses Vincenty's formulae on the WGS 84 ellipsoid, the shape GPS uses, which agrees with the GeographicLib reference library to well under a millimeter. The haversine result, which treats Earth as a sphere with a 6,371 km radius, is shown underneath for comparison, with the difference. For two points almost exactly opposite each other on the globe, where Vincenty's method does not converge, the tool falls back to haversine and says so.

How is great-circle distance different from driving distance?+

Great-circle distance is the straight line over Earth's surface. Driving distance follows roads — going around lakes, respecting one-way streets, diverting through interchanges. London to Paris is about 460 km by road but only about 344 km in a straight line over the English Channel. If you need the road distance, use a routing tool like Google Maps or Apple Maps; this calculator only computes the geodesic line.

How accurate is this calculator?+

The main result is calculated on the WGS 84 ellipsoid and, in our tests on 20,000 random point pairs, matched the GeographicLib reference library to within 0.1 mm. The real limit is your input: six decimal places of latitude and longitude pin each point to about 11 cm. The spherical haversine figure shown for comparison can be off by up to about 0.56%, which is 5.6 km on a 1,000 km trip.

How do I find the GPS coordinates of two points?+

For your current location, tap Use my location under point A, or open the My Location tool and tap Find my location. For other places, search a landmark in Google Maps, long-press (or right-click) the spot, and the coordinates appear at the top of the panel. Paste them straight into this calculator; DMS and UTM work too.

What units does the distance calculator support?+

Kilometers (km), statute miles (mi), nautical miles (NM), and meters (m). All four are computed from the same ellipsoidal result, so they are exactly consistent — no rounding mismatches between the displayed values. Nautical miles are useful for marine and aviation; meters are useful for short distances (under a kilometer) where the other units lose precision in the trailing digits.

What is the midpoint between two coordinates?+

The midpoint is the point exactly halfway along the shortest route between them, not the average of the two latitudes and longitudes. Averaging works for nearby points but goes badly wrong over long distances and across the 180th meridian. The tool computes the true halfway point on the ellipsoid and marks it on the map in orange.

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

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
