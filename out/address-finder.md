---
title: "Address Finder — Convert Address to GPS Coordinates"
description: "Convert any street address to GPS coordinates, or a lat/long pair to the nearest address. Two-way geocoding, instant, free, no signup."
url: https://getmylocations.com/address-finder
---

Free Tool · Two-way Geocoding

# Address finder — address ↔ GPS coordinates

Type any address, landmark, or place name and get the GPS coordinates. Or paste a latitude/longitude pair and get the nearest street address back. Powered by OpenStreetMap Nominatim. Free, no signup, instant.

## Address → Coordinates

Forward geocoding

## Coordinates → Address

Reverse geocoding

## What this tool does

The page does two related jobs in one widget. Type in an address or a landmark name — “Eiffel Tower”, “1600 Pennsylvania Ave”, “Badshahi Mosque, Lahore” — and it returns the latitude and longitude. Paste a coordinate the other way and it tells you the nearest street address. Both lookups call OpenStreetMap’s Nominatim service, which is free for low-volume use and covers most of the world.

If you only need _your own_ current address rather than someone else's, the [My Current Location tool](https://getmylocations.com/my-location) is more direct — it reads your GPS, reverse-geocodes it, and shows the street/city in one tap. If the result comes back in DMS or UTM and you need decimal degrees, the [Coordinates Converter](https://getmylocations.com/coordinates-converter) handles the translation. For the conceptual deep-dive on the coordinates-to-address direction, our [reverse geocoding guide](https://getmylocations.com/reverse-geocoding) walks through how the algorithm actually picks the nearest address.

## Worked examples — what input gives what output

The tool accepts free-text addresses, landmark names, and raw coordinates interchangeably. Five examples showing the kind of result to expect:

You type

Tool returns

Eiffel Tower

48.858420, 2.294500 → 5 Avenue Anatole France, 75007 Paris, France

1600 Pennsylvania Ave NW, Washington, DC

38.897700, -77.036553 → The White House

Badshahi Mosque, Lahore

31.587893, 74.310494 → Walled City of Lahore, Punjab, Pakistan

40.689247, -74.044502

Statue of Liberty National Monument, Liberty Island, NY

\-33.856785, 151.215290

Sydney Opera House, Bennelong Point, Sydney, NSW, Australia

## Why house numbers are sometimes one or two off

Map databases rarely have a coordinate stored for every individual house number. Instead, they store the start and end of each street, the range of numbers along it (say 1 to 199 on the north side), and they slide along the line to estimate where number 47 sits. This works fine on a tidy block. It falls apart when houses are spaced unevenly, when one giant property took up four old plots, or when a street was renumbered decades ago and the records still reflect the old pattern.

The result is the familiar pattern of a pin that lands two houses short, or on the wrong side of a small street. For everyday use this is close enough; for couriers, it is the reason packages occasionally end up next door. Our [post on why maps put you on the wrong street](https://getmylocations.com/blog/why-maps-show-wrong-street) goes deeper into the interpolation math.

## Where geocoding works well, and where it does not

Coverage is uneven. North America, western Europe, Japan, South Korea, and Australia have near-complete address data. Major cities in Pakistan, India, the Middle East, and Africa are usually well covered for streets but inconsistent for individual buildings. Rural areas anywhere in the world tend to fall back to whichever village or district the coordinate is in.

When a lookup fails, adding context usually fixes it. “Main Street” on its own resolves to nothing useful. “Main Street, Springfield, Illinois” works fine. The same logic applies to landmarks — adding the city and country disambiguates the dozens of “Central Park”s out there.

## Rate limits and fair use

The free Nominatim endpoint asks users to keep traffic to about one request per second per IP. That is fine for a manual page like this one. If you need to geocode thousands of addresses at once, either self-host Nominatim — the data is free to download — or use a paid commercial geocoder. Hammering the free endpoint will get your IP temporarily blocked.

## Frequently asked questions

How do I convert a street address to GPS coordinates?+

Type the address into the tool above and tap Search. The page sends the address to OpenStreetMap Nominatim, which returns the matching latitude and longitude in decimal degrees, plus a confidence score and the resolved label. For obscure addresses, adding the city and country to the query dramatically improves accuracy — "Main Street" matches nothing useful, but "Main Street, Springfield, Illinois" works fine.

How do I find the address of a GPS coordinate?+

Paste the latitude and longitude into the same tool (latitude first, then longitude) and tap Search. The reverse-geocoding call returns the nearest street, neighborhood, city, and country. Resolution depends on the underlying database — outdoor city addresses usually resolve to a street; rural coordinates often resolve only to a village or district.

Why is the address one or two house numbers off?+

Map databases rarely store a coordinate for every individual house number. Instead they store the start and end of each street and the range of numbers along it, then interpolate to estimate where house 47 sits. This works fine on a tidy block but falls apart when houses are spaced unevenly or when a street was renumbered. The result is the familiar pattern of a pin landing two houses short or on the wrong side of a small street.

What is my current location address?+

To get your live current address, use the My Current Location tool — it reads your GPS coordinates from the browser and reverse-geocodes them into a readable street, neighborhood, and city in two seconds. The address finder above is the broader two-way tool: enter any address or coordinate, not just your own.

Why does the lookup sometimes return nothing?+

Three common causes. (1) The address is ambiguous — "Central Park" alone matches dozens of places worldwide, so add a city. (2) The coverage is thin — rural areas in many countries are mapped at the village level rather than the street level. (3) The Nominatim endpoint is rate-limited to about one request per second per IP; rapid-fire queries can return temporary errors. Slow down, add geographic context, try again.

Is this address finder accurate enough for delivery?+

For most modern North-American and European addresses, yes. For dense city centers in Asia and South America, it lands on the right street most of the time but may miss the exact building. For rural addresses or new developments, it often resolves only to the nearest road. If you are sending a courier, supplement the geocoded coordinate with a landmark or photo — the coordinate gets them within a few buildings; the landmark closes the gap.

## Related tools and guides

[

### My Location

Your GPS coordinates + address, one tap

](https://getmylocations.com/my-location)[

### Reverse Geocoding

The concept, explained

](https://getmylocations.com/reverse-geocoding)[

### Coordinates Converter

DD ↔ DMS ↔ UTM

](https://getmylocations.com/coordinates-converter)[

### Distance Calculator

Between two addresses

](https://getmylocations.com/distance-calculator)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
