---
title: "Address Finder — Convert Address to GPS Coordinates"
description: "Convert any address to GPS coordinates or coordinates to an address. See every match, how precise it is, and how far it is from your point. Free."
url: https://getmylocations.com/address-finder
---

Free Tool · Two-way Geocoding

# Address finder — address ↔ GPS coordinates

Type any address, landmark, or place name and get its GPS coordinates, with every matching place listed and a label saying how precise the match is. Or paste coordinates in any format and get the nearest address, plus how far that address is from your point. Powered by OpenStreetMap Nominatim. Free, no signup.

## Address → Coordinates

Forward geocoding

## Coordinates → Address

Reverse geocoding

Geocoding by OpenStreetMap’s Nominatim service, limited to one request per second under its usage policy. Map data © OpenStreetMap contributors.

## What this tool does

The page does two related jobs. Type an address or a landmark name, such as “Eiffel Tower”, “1600 Pennsylvania Ave”, or “Badshahi Mosque, Lahore”, and it lists up to five matching places with their latitude and longitude in decimal degrees and DMS. Paste coordinates the other way, in decimal degrees, DMS, DDM, UTM, or as a Google Maps link, and it returns the nearest address. Every result says what kind of thing was matched, and reverse lookups also show how far the matched object is from your point. Both directions use OpenStreetMap’s Nominatim service, which is free for light use and covers most of the world.

If you only need _your own_ current address rather than someone else's, the [My Current Location tool](https://getmylocations.com/my-location) is more direct — it reads your GPS, reverse-geocodes it, and shows the street/city in one tap. To see a result in DDM or UTM as well, the [Coordinates Converter](https://getmylocations.com/coordinates-converter) shows every format. For the conceptual deep-dive on the coordinates-to-address direction, our [reverse geocoding guide](https://getmylocations.com/reverse-geocoding) walks through how the algorithm actually picks the nearest address.

## How precise is each address to coordinates match?

A geocoder always returns a coordinate, even when it only recognised the town. The _Matched to_ line in the tool tells you which kind of thing was found, using the match type and rank that OpenStreetMap’s geocoder returns with every result:

| Matched to | Where the coordinate points |
| --- | --- |
| Building or point of interest | The building, entrance, or object itself; usually within a few meters |
| Street | Somewhere along the street, often tens to hundreds of meters from a particular house |
| Named feature (park, lake, peak) | The middle of the feature, which can be large |
| Neighbourhood or locality | Roughly a few hundred meters to a kilometer off |
| Town or city | The town or city center, often several kilometers off |
| Postcode, region, or country | The middle of that whole area; only useful as a rough location |

If you searched for a full street address and the match is only “Street” or “Town or city”, the house is not in the map data yet; don’t hand that coordinate to a courier as if it were exact.

## Worked examples — what input gives what output

Real lookups run on 5 October 2026. OpenStreetMap is edited constantly, so results can change over time; the match type and distance tell you how much to trust whatever comes back.

| You type | Tool returns | Matched to |
| --- | --- | --- |
| Eiffel Tower | 48.858260, 2.294501 · Eiffel Tower, 5 Avenue Anatole France, Paris | Building or point of interest (also matched a mountain peak in Alberta, Canada) |
| 1600 Pennsylvania Ave NW, Washington, DC | 38.897639, -77.036552 · White House, 1600 Pennsylvania Avenue NW | Building or point of interest |
| Badshahi Mosque, Lahore | 31.588126, 74.309353 · Badshahi Mosque, Fort Road, Walled City of Lahore | Building or point of interest |
| Springfield | 5 matches: Illinois, Massachusetts, Missouri, Ohio, Oregon | Town or city |
| 48.85842, 2.2945 (reverse) | Avenue Gustave Eiffel, Paris, 2 m away | Street (not the tower itself) |
| \-33.856785, 151.21529 (reverse) | 2 Macquarie Street, Sydney, 36 m away (a public toilet near the Opera House) | Building or point of interest |
| 27, 65 (reverse) | Gichak Tehsil, Panjgur District, Balochistan, Pakistan, 30 km away | Town or city |

## When there’s more than one match

Plenty of names exist many times over. “Springfield” returns five US cities before anything else, and “Eiffel Tower” returns both the Paris landmark and a mountain peak in Alberta. Instead of silently picking the first one, the tool lists up to five matches with their full names and match types; click one to see its coordinates and move the map. If none of them is right, add a city, state, or country and search again.

## Why the nearest address can be the wrong building

Reverse geocoding finds the nearest object on the map that has an address or a name, and that is not always the building at your point. The Eiffel Tower’s own coordinates return Avenue Gustave Eiffel, the street beside it. The Sydney Opera House’s coordinates currently return a public toilet on Macquarie Street, 36 m away. In rural Balochistan, a point in open country returns the name of the district, 30 km away.

That is why the tool shows the distance between your point and the matched object, and draws a dashed line between them on the map. A few meters means the address is effectively your location; anything over about a hundred meters means it only describes the area. For how reverse geocoding chooses that nearest object, see our[reverse geocoding guide](https://getmylocations.com/reverse-geocoding).

## Why house numbers are sometimes one or two off

Map databases rarely have a coordinate stored for every individual house number. Instead, they store the start and end of each street, the range of numbers along it (say 1 to 199 on the north side), and they slide along the line to estimate where number 47 sits. This works fine on a tidy block. It falls apart when houses are spaced unevenly, when one giant property took up four old plots, or when a street was renumbered decades ago and the records still reflect the old pattern.

The result is the familiar pattern of a pin that lands two houses short, or on the wrong side of a small street. For everyday use this is close enough; for couriers, it is the reason packages occasionally end up next door. Our [post on why maps put you on the wrong street](https://getmylocations.com/blog/why-maps-show-wrong-street) goes deeper into the interpolation math.

## Where geocoding works well, and where it does not

Coverage is uneven. North America, western Europe, Japan, South Korea, and Australia have near-complete address data. Major cities in Pakistan, India, the Middle East, and Africa are usually well covered for streets but inconsistent for individual buildings. Rural areas anywhere in the world tend to fall back to whichever village or district the coordinate is in.

When a lookup fails, adding context usually fixes it. “Main Street” on its own resolves to nothing useful. “Main Street, Springfield, Illinois” works fine. The same logic applies to landmarks — adding the city and country disambiguates the dozens of “Central Park”s out there.

## Rate limits and fair use

OpenStreetMap runs the Nominatim service for free, and its usage policy allows at most one request per second. The tool enforces that itself: if you click again within a second, it waits briefly and tells you why. That is plenty for looking up addresses by hand. If you need to geocode thousands of addresses, self-host Nominatim (the data is free to download) or use a commercial geocoder instead; bulk use of the free service gets blocked. Results and map data are © OpenStreetMap contributors.

## Frequently asked questions

How do I convert a street address to GPS coordinates?+

Type the address into the Address to Coordinates box above and tap Find. The page sends it to OpenStreetMap's Nominatim geocoder and shows up to five matching places with their latitude and longitude in decimal degrees and DMS, and a label saying whether each match is a building, a street, or only a town. For obscure addresses, adding the city and country helps a lot: "Main Street" on its own is ambiguous, but "Main Street, Springfield, Illinois" is not.

How do I find the address of a GPS coordinate?+

Paste the coordinates into the Coordinates to Address box (latitude first) and tap Find. Decimal degrees, DMS, DDM, UTM, and Google Maps links all work. The tool returns the nearest mapped address, says what kind of object it matched, and shows how far that object is from your point. Outdoor city coordinates usually resolve to a building or street; rural coordinates often resolve only to a village or district, sometimes many kilometers away.

Why is the address one or two house numbers off?+

Map databases rarely store a coordinate for every individual house number. Instead they store the start and end of each street and the range of numbers along it, then interpolate to estimate where house 47 sits. This works fine on a tidy block but falls apart when houses are spaced unevenly or when a street was renumbered. The result is the familiar pattern of a pin landing two houses short or on the wrong side of a small street.

What is my current location address?+

To get your live current address, use the My Current Location tool — it reads your GPS coordinates from the browser and reverse-geocodes them into a readable street, neighborhood, and city in two seconds. The address finder above is the broader two-way tool: enter any address or coordinate, not just your own.

Why does the lookup sometimes return nothing?+

Three common causes. (1) The address is ambiguous — "Central Park" alone matches dozens of places worldwide, so add a city. (2) The coverage is thin — rural areas in many countries are mapped at the village level rather than the street level. (3) The free Nominatim service allows about one request per second, so the tool spaces requests out automatically; if your network has made many requests recently it may refuse for a while. Slow down, add geographic context, try again.

Is this address finder accurate enough for delivery?+

For most modern North-American and European addresses, yes. For dense city centers in Asia and South America, it lands on the right street most of the time but may miss the exact building. For rural addresses or new developments, it often resolves only to the nearest road. If you are sending a courier, supplement the geocoded coordinate with a landmark or photo — the coordinate gets them within a few buildings; the landmark closes the gap.

Why did I get several results for one address?+

Many place names exist more than once. "Springfield" matches dozens of towns in the United States alone, and "Eiffel Tower" matches the Paris landmark and a mountain peak in Canada. The tool lists up to five matches with their full names and match type so you can pick the right one; adding a city, state, or country usually narrows it to one.

Why is the address for my coordinates a nearby shop or street?+

Reverse geocoding returns the nearest object on the map that has an address, which might be a shop, a road, a park, or even a public toilet, not necessarily the building you are standing in. The tool shows how far that object is from your point: a few meters means it is effectively your location; a hundred meters or more means treat it as the general area.

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
