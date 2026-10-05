---
title: "Why your maps app sometimes puts you on the wrong street"
description: "Five reasons the pin lands at the wrong door — interpolated house numbers, mislabelled buildings, and new streets the database has not caught up with."
url: https://getmylocations.com/blog/why-maps-show-wrong-street
---

# Why your maps app sometimes puts you on the wrong street

A

Ahmed Anwar

May 30, 2026·8 min read

-   maps
-   troubleshooting
-   addresses

* * *

![Two map pins sitting slightly offset from each other on a stylised street grid, illustrating address mismatch](https://getmylocations.com/blog-images/why-maps-show-wrong-street-hero.jpg)

A few months ago a courier rang the gate next to mine, stood there for ten minutes, called me, sent me a screenshot of his maps app with the pin clearly on the wrong building, and then handed me a package addressed to a flat I’ve lived in for three years. The pin had drifted by exactly one house. I’ve had this happen often enough that I went and worked out why.

The short answer is that maps don’t actually know where every address is. They store enough information to make a good guess and usually they’re right. When they’re wrong, the reason is almost always one of five fairly mundane things, none of them catastrophic, all of them fixable if you know what to look for.

## The address itself is being interpolated

When you type a street address into a map, the app does not look up an exact coordinate for that specific house number. It looks up the start and end of the street, sees the house-number range that belongs to it (say 1–199 on the north side, 2–200 on the south), and works out where number 47 should sit by sliding along the line. The technique is called _address interpolation_. It went mainstream with the US Census Bureau’s DIME street files for the 1970 census, and their successor, TIGER, built for the 1990 census, still sits underneath many US geocoders today.

It works fine on a tidy suburban street where houses are evenly spaced. It falls apart the moment something irregular happens. A builder skipped a plot. A single big building took the space of four. The block was renumbered in the 1980s and the records still reflect the old layout. The result is the familiar off-by-two-houses problem I started this article with.

Countries with a national address register suffer far less. In Great Britain, Ordnance Survey’s AddressBase gives every address a Unique Property Reference Number (UPRN) tied to an actual building, so there is nothing to interpolate. Where no such register exists — much of South Asia and Africa, and plenty of rural America — interpolation and guesswork fill the gap.

## The building outline has the wrong address attached

Modern maps know about buildings, not just streets. Each building has a polygon — an outline drawn on the map — and one or more addresses attached to it. When somebody, somewhere, attached the wrong address to a polygon, the pin sits on the wrong building until someone notices.

This is particularly common where two buildings sit close together and an editor mixed them up. OpenStreetMap and Google fix these when users report them. Most of the time, the wrong pin will quietly correct itself within a few months once enough people have hit the same problem. If it’s your house and you want to push the fix, both services have a “report a problem” button under the map. Mine took three weeks to land after I filed it.

## The entrance is on a different side of the building

A corner building has two addresses, one per street, and the map only picks one. If the entrance is around the back, the driving directions will lead you to the correct building but the wrong door, which is exactly as useless as leading you to a different building entirely. I’ve watched delivery drivers stare at a wall for several minutes trying to work out where the bell is.

The workaround that actually works: in the delivery app, type the entrance into the notes field as a sentence. “Entrance is on the side facing the green park, blue door, ring twice.” That sentence does more for the courier than the address ever will.

## Your phone’s GPS is drifting, not the map

Sometimes the address is fine and the map is fine and the building outline is correctly tagged. Your phone is the thing that’s wrong. GPS works poorly in tall, narrow streets because the signal bounces off the buildings on either side before reaching you, and the receiver can’t always tell the difference between a direct signal and a reflected one that took a longer path. The effect is called _multipath_, and it can throw your reading off by 20 or 30 meters. For comparison, GPS.gov puts a typical smartphone under open sky at about 4.9 meters. Walk down a street in the financial district of any big city and the blue dot will jump back and forth across the road like it’s having a small breakdown.

Indoors it gets worse. GPS can barely see the satellites through a roof, so the OS falls back to Wi-Fi positioning. If the building’s Wi-Fi access points are not in Google or Apple’s databases — new build, deep basement, rural area — your position can be off by several hundred meters. Open the map outside on the pavement, not inside the lobby, when you’re trying to confirm a location.

## The street was added six months ago

New housing developments are a perennial source of wrong pins. The street exists in real life, has signs at both ends, and is lined with houses that have numbers on the gates — but the map won’t catch up for six to twelve months. The map will route you to the nearest road it does know about and then leave you stranded.

The most reliable workaround for new addresses is to skip the address entirely and share the destination as raw coordinates. The courier’s map app will navigate to a latitude and longitude even when it has never heard of the street the coordinates fall on. There is no edge case where coordinates fail and the address works; the reverse happens constantly.

If a full coordinate pair feels clumsy to read out, Google Maps also shows a Plus Code for every spot — a short code like `V2GR+49 Karachi`, which lands on the Mazar-e-Quaid. It’s built on Open Location Code, which Google open-sourced in 2014 for places that have no street address at all.

## What to do when it actually matters

For ordinary cases none of this is a crisis. The pin is close enough, you find the right door, the package arrives. For cases where it matters — emergency response, important deliveries, picking up a stranger at night — here are the things that consistently work:

-   Send a coordinate instead of an address. Open your maps app, long-press the spot, share the coordinate that comes back.
-   Add a landmark to the instructions. “The brown gate next to the white car” works better than a house number when the house number is two off.
-   For deliveries, write the entrance description into the notes field as a full sentence.
-   If you keep getting visitors at the wrong door, report the address position to the map provider once. The fix takes a few weeks but it sticks for good.

## Test your own address right now

The quickest way to see how badly your address is mapped is to use the [Address Finder](https://getmylocations.com/address-finder). Type in your full address and see where the resulting pin lands. If it’s on the wrong building, you now know why the courier keeps getting confused, and you have the coordinate of where the pin actually _is_ so you can give people a sentence to explain the offset. You can also check the satellite imagery on the [interactive map](https://getmylocations.com/maps) to confirm the building footprint, or preview the street frontage in [Street View](https://getmylocations.com/street-view). For the underlying algorithm that translates coordinates into addresses, see the [reverse geocoding guide](https://getmylocations.com/reverse-geocoding). And for the basics on how your phone produces the GPS fix that feeds into all of this, read [How GPS works](https://getmylocations.com/blog/how-gps-works).

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).

[← Back to all posts](https://getmylocations.com/blog)
