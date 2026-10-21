---
title: "What's My ZIP Code? Find Your ZIP, County & District"
description: "Find the ZIP code where you are in one tap, plus your county, city, congressional district and school district from U.S. Census data. Free, no signup."
url: https://getmylocations.com/whats-my-zip-code
---

Free Tool · United States

# What’s my ZIP code? Plus your county and districts

Press one button to see the ZIP code for where you are, together with your county, city, U.S. House district, state legislative districts, and school district from the U.S. Census Bureau. You can also type an address or a ZIP code, or click any point on the map. Free, no signup.

## Find the ZIP code where you are

Click anywhere on the map to get the ZIP code, county, and districts at that spot.

Sponsored

## How the tool finds your ZIP code

Your browser asks your device for its position, which on a phone usually comes from GPS and Wi-Fi and is accurate to a few meters outdoors. The tool then makes two lookups at once. OpenStreetMap’s Nominatim service finds the nearest street address and the ZIP code recorded with it, which is the ZIP you would write on an envelope. The U.S. Census Bureau’s geocoder reports which official areas the point falls in: the Census ZIP area, county, city or town, congressional and state legislative districts, and school district.

Only the coordinates are sent to those services, and nothing is stored by this site. If the Census service is slow or down, the county and state come from the FCC’s Area API instead. See the [Privacy Policy](https://getmylocations.com/privacy-policy) for details.

## How ZIP codes work

The Postal Service introduced ZIP codes, for Zone Improvement Plan, in 1963, and today there are about 42,000 of them. The five digits narrow down step by step:

| Digits | Example (10118) | What they identify |
| --- | --- | --- |
| First digit | 1 | A group of states, from 0 in the Northeast to 9 on the West Coast, Alaska, and Hawaii. 1 covers New York, Pennsylvania, and Delaware. |
| First three | 101 | The sectional center facility, the mail processing plant that serves the area. |
| All five | 10118 | The delivery area: a post office's routes, a town, or, as here, a single building (the Empire State Building). |
| ZIP+4 | 10118-#### | Four more digits for a block, one side of a street, a floor, or a large mail recipient. |

The key point is that a ZIP code is a set of mail delivery routes, not an area with an official boundary. That is why it does not tell you your county or district on its own.

## ZIP code or Census ZIP area?

Because ZIP codes are routes, the Census Bureau draws its own approximation of them as areas, called ZIP Code Tabulation Areas (ZCTAs), built from census blocks. There were 33,791 ZCTAs in the 2020 Census, against roughly 42,000 ZIP codes. The missing ones are mostly ZIP codes for P.O. boxes only and for single buildings or organizations, which have no area of their own.

The tool shows both. At the White House, the mailing ZIP is `20500`, but the Census area is `20006`. At the Empire State Building, the mailing ZIP is `10118` and the Census area `10001`. On an ordinary street the two are usually the same. When they differ, use the mailing ZIP for post and forms, and the Census area only for statistics.

## Why a ZIP code alone cannot tell you your county or district

-   **ZIP codes cross county lines.** Many rural ZIP codes, and plenty of suburban ones, cover parts of two or more counties. Property tax, voting, jury service, and court cases all follow the county, so use the exact location.
-   **Districts are drawn from census blocks.** Congressional, state senate, and state house districts follow census blocks, which split ZIP codes freely. Two houses with the same ZIP can be in different districts.
-   **Cities are not ZIP codes either.** The place name in a mailing address is the post office’s, which can differ from the town you actually live in. The tool shows the incorporated city or town from the Census Bureau, or the township or census subdivision where there is none.

That is why the tool looks up your location rather than your ZIP code for these. When you type a ZIP code, the county and districts shown are for its center, and the result says so.

## When the result might not be yours

-   **Rough location fix.** Indoors, or on a laptop without GPS, your position can be 50 m or more out, enough to land on the next street or across a boundary. The tool warns you when your device reports low accuracy.
-   **You live near a boundary.** ZIP, county, and district lines often run down the middle of a road. Click your own building on the map to be sure.
-   **The map has no address for your building.** OpenStreetMap is edited by volunteers, and some new or rural addresses are missing. The tool then falls back to the Census ZIP area and says so.

For anything official, such as voter registration, confirm with the source: the USPS ZIP code lookup for mail, and your state or county election office for districts.

## Frequently asked questions

How do I find out what my ZIP code is?

Press "Find my ZIP code" and allow location access, and the tool shows the ZIP code for where you are along with your county and districts. If you are indoors and the result looks like a neighbor's, click your own building on the map or type your street address. Your ZIP code is also printed on any mail delivered to your address and on utility bills.

What county am I in?

The tool shows your county with every result. It comes from the U.S. Census Bureau, which keeps the official county boundaries. Keep in mind that ZIP codes and counties do not line up: one ZIP code can cover parts of two or more counties, so look up your address or location, not just your ZIP code, when the county matters.

What congressional district am I in?

Each result lists your U.S. House district, for example NY-12, and your state senate and state house districts, from the Census Bureau's current district boundaries. States with a single representative show "at large". Because districts follow census blocks rather than ZIP codes, use your exact address or location rather than a ZIP code for this.

Why does the Census ZIP area differ from my ZIP code?

The Census Bureau publishes ZIP Code Tabulation Areas, which approximate ZIP codes as areas on a map. ZIP codes themselves are delivery routes, and some belong to a single building or to P.O. boxes only, such as 20500 for the White House or 10118 for the Empire State Building. Those have no Census area of their own, so the surrounding one (20006 or 10001) is shown alongside.

Does it work outside the United States?

Outside the U.S. the tool shows the postcode and address recorded in OpenStreetMap. For the UK, our What's My Postcode tool uses the official postcode directory and adds the council, ward, and constituency.

## Sources

-   County, city, districts, and Census ZIP areas: [U.S. Census Bureau Geocoder](https://geocoding.geo.census.gov/geocoder/) (current boundaries).
-   County and state backup: [FCC Area API](https://geo.fcc.gov/api/census/).
-   Mailing ZIP codes and addresses: [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), via the Nominatim geocoder.
-   Number of ZIP codes: [USPS Postal Facts](https://facts.usps.com/42000-zip-codes/). Number of ZCTAs: 2020 Census TIGER/Line files.

## Related tools

[

### My Location

Your coordinates and address

](https://getmylocations.com/my-location)[

### Address Finder

Address ↔ coordinates

](https://getmylocations.com/address-finder)[

### Satellite View

See the address from above

](https://getmylocations.com/satellite)[

### What's My Postcode

For the UK and Europe

](https://getmylocations.com/whats-my-postcode)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
