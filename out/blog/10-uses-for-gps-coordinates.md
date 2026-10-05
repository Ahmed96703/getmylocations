---
title: "10 Surprising Uses for GPS Coordinates in Everyday Life"
description: "From geocaching to verifying VPNs to precision farming — ten practical things you can do once you know how to read your own latitude and longitude."
url: https://getmylocations.com/blog/10-uses-for-gps-coordinates
---

# 10 Surprising Uses for GPS Coordinates in Everyday Life

A

Ahmed Anwar

May 9, 2026·6 min read

-   gps
-   use-cases
-   guide

* * *

![Grid of small flat-design icons (tent, compass, fishing rod, sailboat, mountain, weather) all in a cool blue-and-green palette, representing varied uses for GPS coordinates](https://getmylocations.com/blog-images/10-uses-for-gps-coordinates-hero.jpg)

I have a note on my phone called “coords” with about thirty latitude–longitude pairs in it. The dentist’s side entrance because the front door is impossible to find at night. A particular tree in a friend’s farm where her family scattered her father’s ashes. The spot on a hiking trail where I once turned around because the weather closed in. None of these have addresses. All of them are usable in any map app in the world, on any device, forever, with no account or platform lock-in. That’s the underrated power of two numbers.

Most people only think about GPS coordinates when their navigation app refuses to find an address. Here are ten of the things I’ve actually used coordinates for — or watched friends use — that an address can’t handle.

## 1\. Marking a place that has no address

A favourite fishing hole. A tent site in the middle of a forest. The exact spot where a trail crosses a stream. The car park for a beach without a town. None of these have postal addresses, but every one has a coordinate. Save the lat/lon in your phone’s notes and you can return to the exact spot years later, in any navigation app you happen to be using by then.

## 2\. Sharing your location in an emergency

If you’re lost and 911/112 asks where you are, a six-decimal coordinate is the most precise answer you can give — accurate to within a meter or two. It works even when the dispatcher’s street-address lookup fails. Modern smartphones do this automatically via Advanced Mobile Location, but knowing how to read and say your own coordinates is the backup you want when AML doesn’t fire. Full walkthrough: [GPS coordinates in emergencies](https://getmylocations.com/blog/gps-coordinates-emergencies-aml-guide).

## 3\. Geotagging photos that lost their EXIF

Instagram, WhatsApp, and most chat apps strip the EXIF metadata (including embedded GPS) from photos before posting. If you want to remember where a shot was taken, save the coordinates in a notes app or a photo-editor field at the moment you take it. I’ve gone back through years of holiday photos trying to reconstruct where each one was and lost the battle more than once.

## 4\. Measuring exact distance between two places

Need the straight-line distance between two coordinates — say, your home and a planned holiday rental? Plug them into the [distance calculator](https://getmylocations.com/distance-calculator) and the Haversine formula returns the great-circle distance. This is how airlines calculate flight distances and how real-estate apps tell you a property is “4.2 km from the beach.”

## 5\. Building a geofence

A geofence is an invisible perimeter defined by a centre coordinate and a radius. Phone automations (iOS Shortcuts, Android Tasker, Home Assistant) trigger actions when you cross one: turn on the lights when you arrive home, silence notifications when you walk into the office, remind you to pick up something when you’re near the supermarket. The whole setup needs one coordinate to start.

## 6\. Proving (or disproving) a delivery

Some delivery apps share the courier’s drop-off coordinates as part of the confirmation. If a driver claims “delivered” but no package arrives, comparing their reported drop-off coordinate to your home coordinate can show the package was left at the wrong address — useful evidence in a refund claim, useful information for the courier company when they investigate.

## 7\. Geocaching

Over three million caches are hidden around the world, each pinpointed by a precise GPS coordinate. Players use the coordinate alone — no other directions, no street address — to find a small container, log their visit, sometimes swap a trinket. The game is the reason the consumer GPS market exists at all; it’s where Garmin and Magellan first found non-professional customers in the early 2000s.

## 8\. Sanity-checking your VPN

Connect to a VPN that claims to be in Tokyo, then open [IP Location](https://getmylocations.com/ip-location). If it places you near Tokyo, the IP-based signal is leaking properly. If your real city shows up instead, the VPN has a DNS or WebRTC leak somewhere and you should know about it before you trust it for anything sensitive. Two clicks beats guessing.

## 9\. Plotting weather stations and microclimates

Personal weather stations from Davis, Tempest, and Ambient ask for exact GPS coordinates during setup so the public weather network knows where each reading came from. Hyperlocal forecasting is built on dense, coordinate-tagged sensor networks. The Tempest network, for instance, pulls in around a hundred thousand backyard stations now — each one a coordinate plus a temperature, pressure, and wind reading feeding back into the forecast model.

## 10\. Precision agriculture

Modern tractors use centimetre-accurate GPS to drive themselves along perfectly parallel rows, drop fertiliser on the exact square meter where soil samples flagged a deficiency, and stop seeding the moment they cross a known “bad” patch. The savings on inputs (water, seed, fertiliser) regularly hit double-digit percentages — a direct consequence of GPS coordinates getting cheap and precise enough to be a routine farm input.

## Bonus: a privacy-friendly way to share a property listing

Selling a property privately? Share the listing photo with the coordinate pasted underneath. The recipient can click straight into Maps or Street View to evaluate the neighbourhood — no street address publicly listed, no leak of full identifying information, but enough for a serious buyer to do their initial homework. The same trick works for short-term rentals where you want guests to find the door without putting the exact unit number on a public booking page.

## How to grab a coordinate in two seconds

Whenever you need a coordinate for any of the above — open [GetMyLocations](https://getmylocations.com/), approve the location prompt, copy the six-decimal lat/lon from the dashboard. Paste it into your notes app and it’ll still work in 2036.

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).

[← Back to all posts](https://getmylocations.com/blog)
