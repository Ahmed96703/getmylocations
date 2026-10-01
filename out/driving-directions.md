---
title: "Get Directions — Free Driving Directions Route Planner"
description: "Get directions between any two addresses with free driving, walking, biking, or transit routes. Plan from and to directions powered by Google Maps."
url: https://getmylocations.com/driving-directions
---

Free Tool · Powered by Google Maps

# Get directions — free driving directions route planner

Plan a **driving, walking, bicycling, or public-transit** route between any two addresses or GPS coordinates.

## Plan a route

[Open in Google Maps](#)

## Why the suggested route is not always the shortest

Routing engines do not optimise for distance. They optimise for time. Two routes between the same pair of points can differ wildly because the longer one might be a motorway with steady traffic while the shorter one cuts through residential streets with traffic lights every two hundred meters. The engine looks at the road graph, the historical speed on each segment at this hour of the day, and the current real-time traffic from millions of phones, and picks whichever combination produces the lowest predicted arrival time.

This is also why the route can change between two attempts a few minutes apart. A crash on the motorway gets reported, the predicted speed for that segment drops, and the engine reroutes everyone through the longer-looking detour that is now faster.

## Walking, biking, and transit use different graphs

Picking a different travel mode is not just a slower version of the same route. Walking directions include pedestrian-only streets, staircases, and pedestrian crossings that a driving route cannot use. Biking directions know about bike lanes where they have been mapped, and avoid motorways. Transit directions read schedules — they will tell you to walk seven minutes to a bus stop, ride for nineteen minutes, and walk three minutes at the other end, with the timings tied to the next scheduled departure.

Transit coverage is the unevenest of the four. London, Tokyo, and New York have minute-by-minute schedules; many smaller cities only have major bus and metro lines mapped, and rural areas often have no transit data at all.

## Why two apps quote different arrival times

Open Google Maps, Apple Maps, and Waze at the same time with the same destination, and you will often see three different ETAs. Each app has its own traffic data set, its own preferences (some default to avoiding tolls, some weight motorway speed more aggressively), and its own model for how aggressively a typical driver actually drives. Even Google Maps and Waze, both owned by Google since it bought Waze in 2013, regularly disagree because each app weighs traffic reports and route preferences differently. A 5 to 15% difference between them is normal. For a long trip, that is half an hour of disagreement.

## When the embed gives up

The Google Maps embed used here is a lightweight version of the full Maps app. It handles one origin and one destination cleanly, and it shows traffic-adjusted ETAs. What it does not do is multi-stop routes, offline downloads, or step-by-step navigation. For any of those, the _Open in Google Maps_ button hands the same route off to the full app on your device. Before you leave, you might also want to preview the destination in [Street View](https://getmylocations.com/street-view) to check the entrance, or explore the area around it on the [interactive map](https://getmylocations.com/maps).

## Plan something else

[

### Distance Calculator

](https://getmylocations.com/distance-calculator)[

### Street View

](https://getmylocations.com/street-view)[

### Address Finder

](https://getmylocations.com/address-finder)[

### My Location

](https://getmylocations.com/my-location)

## Entering an origin or destination that has no address

Both fields accept a decimal-degree coordinate pair as well as a street address. That matters more often than it sounds: campsites, trailheads, building site entrances, rural properties on unnamed lanes, and anywhere a friend has sent you a pin rather than a postcode. Paste `29.749907, -95.358421` into either field and the router treats it as an exact point on the road graph.

One caveat worth knowing: routing snaps your coordinate to the nearest routable road. If the point you give is in the middle of a large site, the route ends at whichever road edge is closest as the crow flies — which is not always the correct entrance. For big venues, searching the name usually beats pasting a coordinate, because the map data records the actual vehicle entrance. To read off your own coordinates first, use the [My Location tool](https://getmylocations.com/my-location).

## Route distance is not straight-line distance

The distance this planner reports is the length of the actual driven path — every bend, every detour around a river, every one-way system. That is almost always longer than the straight-line distance between the same two points, sometimes dramatically so in mountainous or coastal terrain where the road has to go the long way round.

If what you actually want is the great-circle distance — the “as the crow flies” figure used for flight planning, radio range, geofencing, and delivery-zone rules — the [distance calculator](https://getmylocations.com/distance-calculator) computes it directly from two coordinate pairs using the Haversine formula. Comparing the two numbers is a quick sanity check on how indirect a journey really is. Some detour is normal: a 2012 nationwide US study by Boscoe, Henry and Zdeb measured an average road-to-straight-line ratio of about 1.4. A ratio of 2 or more usually means a river, mountain range, or coastline the road has to go around.

## Frequently asked questions

Why is the ETA different from what my car satnav says?+

Built-in car navigation usually runs on map data that is months or years old and often has no live traffic feed at all. The routing here uses current traffic conditions aggregated from phones on the road right now. On a clear road the two will agree closely; in rush hour the live-traffic estimate is almost always the more realistic one.

Can I add multiple stops to a route?+

Not in this embed — it handles one origin and one destination. For a multi-stop route, plan the first leg here and then use the "Open in Google Maps" button, which hands the route to the full app where you can add waypoints.

Can I get directions from my current location?+

Yes. Tap "Use my location" under the origin field and allow the location prompt; it fills in your GPS coordinates and reloads the route. You can also paste coordinates into the field yourself. To get a precise coordinate pair first, use the My Location tool and copy the "lat, lon" string it produces.

Does the route avoid tolls or motorways?+

The embed uses default routing preferences, which do not exclude tolls or motorways. Those options live in the full Google Maps app — open the route there and set them under the route options menu.

Why does it say no route found?+

Usually one of three things: the two points are separated by water with no ferry in the road graph, one of the addresses did not geocode to a real place, or the selected travel mode has no coverage there (transit is the common culprit). Try switching to driving mode first to confirm the two endpoints are reachable at all.

AA

Written by

### Ahmed Anwar

Independent web developer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
