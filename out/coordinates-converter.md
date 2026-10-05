---
title: "Coordinates Converter — DD, DMS, DDM & UTM (Free Tool)"
description: "Free coordinates converter — convert GPS latitude and longitude between Decimal Degrees, DMS, DDM, and UTM in real time. Live map, no signup, no install."
url: https://getmylocations.com/coordinates-converter
---

Free Tool · Real-time Conversion

# Coordinates converter — convert between DD, DMS, DDM, and UTM

Convert any GPS coordinate between **Decimal Degrees**, **Degrees-Minutes-Seconds**, **Degrees-Decimal-Minutes**, and **Universal Transverse Mercator**. Edit any field and the others update instantly. Free, no signup, runs entirely in your browser.

## Convert coordinates

① Decimal Degrees (DD)

48.858420, 2.294500

② DMS — Degrees Minutes Seconds

Latitude

Longitude

③ DDM — Degrees Decimal Minutes

## When you actually need to convert coordinates

For everyday use, your phone hands you decimal degrees and every app accepts them. The conversion problem only shows up when two systems disagree on format, and it shows up more often than you would think:

-   **Aviation flight plans** usually require degrees-minutes-seconds. A modern smartphone reading needs translating before it can go into the flight planner.
-   **Marine GPS units** typically display degrees-decimal-minutes. Cross-referencing a chart coordinate against your modern phone takes a quick DD ↔ DDM conversion.
-   **Land-survey documents and older maps** almost always use DMS. Reading a deed or a topographic chart from before about 1995 and matching it to a modern satellite view is a DMS-to-DD job.
-   **Hiking and search-and-rescue work** often uses UTM because grid distances map directly to meters on the ground. You can pace UTM offsets in a way you cannot pace decimal-degree differences.
-   **GIS pipelines and GeoJSON** use (longitude, latitude) order, while Google Maps and consumer apps use (latitude, longitude). The tool above normalises the order; using the wrong order is the most common silent error in coordinate work.
-   **Emergency dispatch.** Most dispatchers can take decimal degrees or DMS. Knowing which one you are reading off your phone matters more than the conversion itself — see our [emergency GPS guide](https://getmylocations.com/blog/gps-coordinates-emergencies-aml-guide) for the four-line script to say on the call.

## Format quick reference

The same point on Earth in all four formats — useful as a calibration check the first time you use the tool:

Landmark

DD

DMS

DDM

UTM

Eiffel Tower, Paris

48.858420, 2.294500

48°51′30.3″N 2°17′40.2″E

48°51.504′N 2°17.670′E

31U 448262 5411917

Statue of Liberty, NYC

40.689247, -74.044502

40°41′21.3″N 74°02′40.2″W

40°41.355′N 74°02.670′W

18T 580757 4504699

Sydney Opera House

\-33.856785, 151.215290

33°51′24.4″S 151°12′55.0″E

33°51.407′S 151°12.917′E

56H 334893 6252053

Mount Everest summit

27.988100, 86.925000

27°59′17.2″N 86°55′30.0″E

27°59.286′N 86°55.500′E

45R 492588 3095886

## How the tool handles each format

Decimal degrees are the master input. Type a value into either of the two top boxes and the page recalculates the DMS, DDM, and UTM versions on the fly. If you have the coordinate in DMS or DDM, type it in the corresponding row and the tool back-converts to decimal degrees. UTM is shown as a read-only output because typing easting and northing by hand is uncommon and error-prone — almost everyone who works in UTM already has it in a GIS file or a topographic chart.

Need a coordinate to convert? The [My Location tool](https://getmylocations.com/my-location) reads your GPS and gives you a copyable DD pair in two seconds. For a deeper read on what each format represents, the [latitude vs longitude post](https://getmylocations.com/blog/latitude-vs-longitude-explained) covers signs, order, and the memory tricks.

## How the UTM zone is calculated

UTM divides the world into 60 vertical zones, each six degrees of longitude wide. Zone 1 starts at the international date line and runs east. Your zone number is found from your longitude with the formula `floor((lon + 180) / 6) + 1`. Norway and Svalbard have hand-tuned exceptions to keep their countries from straddling zone boundaries, and the tool honours those special cases. The letter that follows the zone number — like the U in “31U” — comes from your latitude and identifies the eight-degree band you are sitting in.

## Common mistakes the tool catches

-   Latitude over 90 or longitude over 180 — the tool flags this rather than producing nonsense.
-   Forgetting to switch the hemisphere letter when typing DMS for southern or western locations.
-   Pasting a coordinate with the longitude first (a GeoJSON pattern). The tool assumes latitude first; if your map ends up in the ocean, swap the two.
-   Mixing up DDM and DMS — they look similar but the trailing fraction is in different units. Type into the field labelled for the format you actually have.

## The DD ↔ DMS conversion math

Decimal degrees and DMS encode the same angle in different notations. The math both ways:

### DD → DMS

1.  Take the integer part of the decimal degree — that is your degrees value.
2.  Multiply the fractional part by 60 — the integer part of the result is your minutes.
3.  Multiply the remaining fraction by 60 again — that is your seconds.

Example: 48.858420° → 48° + (0.858420 × 60)′ = 48° 51.5052′ → 48° 51′ (0.5052 × 60)″ = 48° 51′ 30.31″.

### DMS → DD

Take the degrees as is, divide the minutes by 60, divide the seconds by 3600, then add the three together. For southern latitudes or western longitudes, negate the final result (since DMS uses an N/S/E/W letter where DD uses a sign).

Example: 48° 51′ 30.31″ N = 48 + 51/60 + 30.31/3600 = 48.858420°.

Once you have two coordinates in decimal degrees, the [Distance Calculator](https://getmylocations.com/distance-calculator) gives you the great-circle distance between them. If you have an address instead of a coordinate, the [Address Finder](https://getmylocations.com/address-finder) converts it to DD for you.

## When to use DD versus DMS

-   **Use DD** for anything digital — APIs, spreadsheets, Google Maps URLs, GIS files, navigation apps. It is the modern standard and avoids parsing the ° ′ ″ symbols.
-   **Use DMS** for paper nautical charts, aviation publications, land-survey documents, and historical references. Many published surveys still cite DMS.
-   **Use DDM** on marine GPS units. DDM splits the minute decimal but skips seconds entirely — a notation most chart-plotter manufacturers default to.
-   **Use UTM** for hiking, search-and-rescue, surveying — anywhere grid distances need to map directly to metres on the ground.
-   **Convert when crossing formats** — e.g., reading a coordinate off an old chart and pasting it into Google Maps, or copying a phone's coordinate into a printed expedition report.

## DD precision — how many decimal places you really need

Each decimal place of latitude or longitude shrinks your error by roughly a factor of ten. The full table:

Decimals

Precision

What it identifies

0

~111 km

A country or region

1

~11 km

A large city

2

~1.1 km

A neighbourhood

3

~110 m

A city block

4

~11 m

A single building

5

~1.1 m

A parking space — smartphone GPS limit

6

~11 cm

Survey grade — false precision for consumer GPS

For DMS, one second of latitude is about 31 metres, and one decimal of a second is about 3 metres. Old surveys often give whole-second precision — perfectly adequate for showing a landmark, less so for guiding a drone.

## Hemispheres and signs — the most common DD mistakes

DD uses signs: positive for North/East, negative for South/West. DMS uses hemisphere letters (N, S, E, W) instead. Mixing the two is the single most common mistake in conversion. A reference of landmarks in all four hemispheres:

Landmark

DD

Hemispheres

Eiffel Tower, Paris

48.858420, 2.294500

N, E

Statue of Liberty, NYC

40.689247, -74.044502

N, W

Sydney Opera House

\-33.856785, 151.215290

S, E

Cape Town

\-33.924870, 18.424055

S, E

Buenos Aires

\-34.603722, -58.381592

S, W

Tokyo Tower

35.658580, 139.745560

N, E

Two landmarks worth memorising as sanity checks: Sydney is -33.8568, 151.2153 (south, east — first number negative, second positive); the Statue of Liberty is 40.6892, -74.0445 (north, west — first positive, second negative). If your map ends up in the wrong ocean, one of those signs is off.

## Frequently asked questions

How do I convert decimal degrees to DMS?+

Take the integer part of the decimal degree as the degrees value. Multiply the fractional part by 60 to get minutes (keep the integer part). Multiply the remaining fraction by 60 again to get seconds. Example: 48.8584° → 48° + (0.8584 × 60)′ = 48° 51.504′ → 48° 51′ (0.504 × 60)″ = 48° 51′ 30.24″. The tool above does this automatically as you type, including the hemisphere letter.

How do I convert DMS back to decimal degrees?+

Take the degrees as is, divide the minutes by 60, divide the seconds by 3600, then add them all together. For southern latitudes or western longitudes, negate the result. Example: 48° 51′ 30.24″ N = 48 + 51/60 + 30.24/3600 = 48.8584°. Type either format into the tool above and the other recalculates in real time.

What is UTM and why would I use it?+

Universal Transverse Mercator divides the world into 60 zones six degrees of longitude wide, each treated as a flat plane. Your position is expressed as "eastings" and "northings" in metres — so distances on a UTM grid translate directly to real-world metres on the ground. Hikers, search-and-rescue teams, surveyors, and the military prefer UTM for that reason. For everyday navigation, decimal degrees is far more common.

What does the letter after the UTM zone number mean (like "31U")?+

The number is the longitude zone (1–60, six degrees wide). The letter is the latitude band (C–X, eight degrees tall, skipping I and O so they are not confused with 1 and 0). Together they uniquely identify which of the world's ~1,200 UTM cells you are in. The tool computes both from your input automatically and accounts for the Norway/Svalbard exceptions.

What is the difference between DMS and DDM?+

Degrees-Minutes-Seconds (DMS) splits a degree into 60 minutes and each minute into 60 seconds — three units. Degrees-Decimal-Minutes (DDM) splits a degree into 60 minutes but expresses the remainder as a decimal — two units. Example: 48° 51′ 30.24″ in DMS becomes 48° 51.504′ in DDM. Marine GPS units typically display DDM; aviation and survey work usually use DMS.

My map ends up in the ocean off the coast of Africa — what is wrong?+

You almost certainly pasted a (longitude, latitude) coordinate where the tool expected (latitude, longitude). GeoJSON, PostGIS, and most programming libraries put longitude first; Google Maps, Apple Maps, and most consumer apps put latitude first. Swap the two values and try again. A quick sanity check: if either number is greater than 90 in absolute value, that one must be longitude (|latitude| only goes up to 90).

What are decimal degrees in GPS coordinates?+

Decimal degrees (DD) write a latitude or longitude as a single signed number with a fractional part — for example, 48.858420 for the Eiffel Tower's latitude. Positive means north or east; negative means south or west. DD is the modern default produced by every smartphone, GPS receiver, Google Maps URL, and web API. It is the format almost every digital system accepts directly.

How many decimal places does a DD coordinate need?+

Each decimal divides the uncertainty by ten. Three decimals (~110 m) is enough for a city block; four (~11 m) lands on a building; five (~1.1 m) is already finer than smartphone GPS, which typically manages 3–5 m outdoors; six (~11 cm) is the de facto storage format. Anything past five decimals is false precision for a phone reading, so treat the sixth digit as noise.

Why are some decimal-degree coordinates negative?+

DD uses signs to indicate hemispheres. Positive latitude = north of the equator; negative latitude = south of the equator. Positive longitude = east of Greenwich; negative longitude = west. So Sydney is -33.8568, 151.2153 (south, east) and the Statue of Liberty is 40.6892, -74.0445 (north, west). DMS uses N/S/E/W letters instead — the same point, the same magnitude, just a different notation for direction.

Is DD the same as the format Google Maps uses?+

Yes. Open Google Maps in a browser, right-click any point, and the first item in the menu is the DD coordinate — "48.858420, 2.294500" — ready to copy. iPhone's Compass app, Apple Maps, Android's long-press menu, and almost every GPS app default to the same format. DD is the lingua franca of consumer mapping.

## Related tools

[

### My Location

Get your live GPS coordinates

](https://getmylocations.com/my-location)[

### Live Location

Real-time tracking as you move

](https://getmylocations.com/live-location)[

### Distance Calculator

Haversine between two points

](https://getmylocations.com/distance-calculator)[

### Address Finder

Address ↔ coordinates

](https://getmylocations.com/address-finder)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
