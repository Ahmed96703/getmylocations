---
title: "Reverse Geocoding — How Coordinates Become an Address"
description: "How GPS coordinates become a street address: the algorithm step by step, common failure modes, and free APIs (Nominatim, BigDataCloud) to call."
url: https://getmylocations.com/reverse-geocoding
---

Complete Guide

# Reverse geocoding — turn a pair of GPS coordinates into a street address

You have a latitude and longitude. You want the street, the neighborhood, the city, or even the building name. That translation — coordinates to a human-readable address — is called **reverse geocoding**. It powers ride-hailing apps, courier confirmations, photo-tagging, weather alerts by zip code, and the “city” field on every “find my location” page. This guide explains how it works, when it's accurate, when it isn't, and how to do it yourself.

**Want to try it right now?** The [Address Finder tool](https://getmylocations.com/address-finder) does reverse geocoding on demand — paste any lat/long and get the nearest street address in under a second. For your own current location, the [My Current Location tool](https://getmylocations.com/my-location) reads your GPS and reverse-geocodes it in one tap.

* * *

## What reverse geocoding is (and isn't)

**Forward geocoding** goes from text to coordinates: you type “1600 Amphitheatre Parkway, Mountain View, CA” and you get `37.4220, -122.0841`. That's what a search box in Google Maps does.

**Reverse geocoding** is the opposite direction: you have the coordinates and want the text. It's harder than it sounds, because the same coordinate can be inside a building, inside a park, inside a body of water, or on a private road that has no official address.

Reverse geocoding is also not the same as **IP geolocation**. Reverse geocoding starts from real coordinates (typically from a GPS chip); IP geolocation guesses coordinates from a network address. Read more in our [IP location lookup guide](https://getmylocations.com/ip-location).

* * *

## How it works under the hood

Every reverse geocoder needs three things: a database of place boundaries (countries, regions, cities, postal codes), a database of street centerlines with house-number ranges, and an algorithm to pick the most specific answer that still contains your point.

The algorithm is roughly:

1.  **Country.** A point-in-polygon test against world country borders. This is fast and almost always correct.
2.  **Region / state.** A second polygon test inside the country's subdivisions.
3.  **City or town.** A third polygon test. Cities have fuzzy edges — one address may be inside a city legally and outside it for postal purposes, depending on which dataset you ask.
4.  **Street.** Find the nearest street segment within a small radius (usually 50–200 m). The segment has a left-side and right-side house-number range; interpolate.
5.  **House number.** The interpolation gives a guess at the house number. It's often off by a few houses because streets number unevenly — gaps, corner lots, renumbered blocks.
6.  **Postal code.** A separate polygon dataset gives the zip / postcode.

Big providers (Google, Mapbox, HERE) add a points-of-interest layer on top: if your coordinate is inside a known building polygon, the response can include the building name (“Eiffel Tower”, “Sydney Opera House”) instead of just a street address. Open data sources like OpenStreetMap have the same idea but with patchier coverage.

* * *

## Find the address from a latitude / longitude pair

Three practical ways to do it, in order of how much work they take:

### 1\. Use the Address Finder tool

The fastest way: paste your coordinates into the [Address Finder](https://getmylocations.com/address-finder), drop a manual pin, and the reverse-geocoded result appears next to it. The pipeline uses [OpenStreetMap Nominatim](https://nominatim.org/) with a free fallback. For your own live coordinates, the [My Current Location tool](https://getmylocations.com/my-location) reads your GPS first and then reverse-geocodes in the same flow.

### 2\. Use Google Maps directly

Type the coordinates straight into the Google Maps search box, separated by a comma: `48.8584, 2.2945`. Maps centers on the location and shows the address in the left panel. Useful for one-off checks but not bulk work.

### 3\. Hit an API directly

For programmatic work, two free options:

-   **OpenStreetMap Nominatim**: `https://nominatim.openstreetmap.org/reverse?lat=48.8584&lon=2.2945&format=json`. Free, no API key. Rate-limited to ~1 request per second — respect their fair-use policy.
-   **[BigDataCloud](https://www.bigdatacloud.com/)**: free reverse-geocoding tier with no API key needed for client-side calls, decent global coverage. We use it as the default in GetMyLocations.

* * *

## Accuracy — when reverse geocoding gets it wrong

Reverse geocoding is one of those features that's 95% correct and the remaining 5% is memorable. Common failure modes:

-   **House number is off by a few.** Street centerline interpolation assumes evenly numbered houses, but real streets have gaps, irregular plots, and renumbered blocks. Off-by-two is normal in suburbs; off-by-ten happens in older neighborhoods.
-   **Coordinates inside a building return the wrong building.** If two buildings are close together and the polygons overlap or are slightly mislabeled, the API may return whichever was indexed first.
-   **Rural areas have no street address at all.** A coordinate in the middle of a forest, on a dirt track, or on a long-frontage farm will return only a town and region. There's nothing more specific to return.
-   **Bodies of water.** Reverse geocoding the middle of a lake or sea typically returns a description like “Pacific Ocean” rather than a street address.
-   **International disagreements.** Contested borders (Kashmir, Crimea, Western Sahara) appear differently depending on which provider's map of the world you query.
-   **Newly built streets.** A street built in the last 6–12 months may not be in the provider's database yet.

* * *

## Typical uses for reverse geocoding

-   **Ride-hailing and delivery confirmations.** “Driver is at 24 Main St” comes from reverse-geocoding the driver's GPS in real time.
-   **Photo metadata.** Apple Photos, Google Photos, and Lightroom all reverse-geocode embedded EXIF GPS into city / country tags so you can browse photos by place.
-   **Weather alerts.** Severe-weather pushes are targeted by zip code; the phone reverse-geocodes its GPS to figure out which zip to subscribe to.
-   **Insurance and emergency response.** A 911/112 dispatcher reverse-geocodes an inbound AML coordinate to get a confirm-able address.
-   **Marketing and analytics.** Aggregated GPS pings reverse-geocoded to city level power footfall reports, retail catchment studies, and traffic analytics.
-   **Hiking and trip logs.** Turning a GPX track's coordinates into named places gives you a journal entry rather than a list of numbers.

* * *

## Drop a pin on the map and reverse-geocode it

The most visual way to do reverse geocoding is to drop a pin. Open the [Address Finder](https://getmylocations.com/address-finder), switch to manual input mode, type or paste any coordinates, and the map flies to that point with a pin. The address text appears in the dashboard underneath, with separate fields for city, region, country, and (where available) the nearest street.

For a refresher on coordinate formats before you paste anything in, see our [GPS coordinates finder guide](https://getmylocations.com/my-location) and the [decimal degrees converter](https://getmylocations.com/coordinates-converter).

* * *

## Privacy and what we (don't) keep

When you reverse-geocode through any tool on this site, the coordinates are sent in real time to a third-party API (OpenStreetMap Nominatim) to produce the address — we don't cache or store them on a server we operate. Nominatim has its own privacy practices, summarized in our [Privacy Policy](https://getmylocations.com/privacy-policy).

* * *

## Frequently asked questions

What is reverse geocoding in simple terms?+

Reverse geocoding is the translation of a GPS coordinate (a pair of numbers like 48.858420, 2.294500) into a human-readable address like "5 Avenue Anatole France, 75007 Paris, France." It is the opposite direction of forward geocoding, which takes an address as input and returns coordinates. Every modern ride-hailing app, courier confirmation, and "share my location" message relies on reverse geocoding behind the scenes.

How does reverse geocoding actually work?+

The algorithm runs a series of point-in-polygon tests at increasing specificity: country, region/state, city, then street. For the street level, it finds the nearest street centerline within ~50–200 m and interpolates between the start and end house numbers stored for that segment. A separate polygon dataset returns the postal code. Big providers also overlay a points-of-interest layer so a coordinate inside a known building can return the building name instead of a street address.

Why does reverse geocoding sometimes return the wrong house number?+

Map databases rarely store a coordinate for every individual house. Instead they store the start and end of each street and the range of numbers along it, then linearly interpolate. This assumes evenly spaced houses, which is almost never true in practice. Off-by-two house numbers are normal in suburbs; off-by-ten can happen in older neighborhoods with irregular plot sizes or renumbered blocks.

Is reverse geocoding the same as IP geolocation?+

No. Reverse geocoding starts from real GPS coordinates (typically from a device GPS chip, accurate to a few metres) and produces an address. IP geolocation starts from a network address (visible to any website) and guesses a coordinate from a database — accurate only to a city, often only to a country. They use different inputs, different algorithms, and have wildly different accuracy guarantees.

What are the best free reverse-geocoding APIs?+

OpenStreetMap Nominatim is the most-used free option — no API key required, but rate-limited to about one request per second per IP. The endpoint is https://nominatim.openstreetmap.org/reverse?format=json&lat=…&lon=… and returns JSON with country, region, city, road, and house number where available. BigDataCloud offers a free client-side tier with decent global coverage. For high-volume or commercial use, MapBox, HERE, and Google Geocoding offer paid plans with higher accuracy and SLAs.

How do I reverse-geocode coordinates right now?+

For a one-off lookup, use the Address Finder tool — paste a lat/long pair (latitude first) and it returns the nearest street address via Nominatim in under a second. For your own current location, the My Current Location tool reads your GPS and reverse-geocodes it in one tap. For programmatic use, call the Nominatim or BigDataCloud API endpoints directly with a standard HTTP GET.

## Related tools and guides

-   [Address Finder — the two-way geocoding tool](https://getmylocations.com/address-finder)
-   [My Current Location — your address in one tap](https://getmylocations.com/my-location)
-   [GPS coordinates finder — complete guide](https://getmylocations.com/my-location)
-   [Decimal degrees converter (DD ↔ DMS)](https://getmylocations.com/coordinates-converter)
-   [IP location lookup — complete guide](https://getmylocations.com/ip-location)
-   [Why maps put you on the wrong street](https://getmylocations.com/blog/why-maps-show-wrong-street)
-   [Fix location not working — troubleshooting](https://getmylocations.com/fix-location-not-working)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
