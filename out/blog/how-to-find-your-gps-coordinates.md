---
title: "How to Find GPS Coordinates on iPhone, Android, Mac & PC"
description: "Find your latitude and longitude with apps you already have: iPhone Compass, Apple Maps, Google Maps on phone or desktop, and how accurate they are."
url: https://getmylocations.com/blog/how-to-find-your-gps-coordinates
---

# How to Find GPS Coordinates on iPhone, Android, Mac & PC

A

Ahmed Anwar

May 13, 2026·Updated October 15, 2026·6 min read

-   gps
-   coordinates
-   guide

* * *

Quick answer

On an iPhone, open the Compass app: your latitude and longitude are at the bottom. On Android, open Google Maps, touch and hold an unlabeled spot next to your blue dot, and the coordinates appear in the search box. On a computer, right-click a spot in Google Maps and the coordinates are the first line of the menu. Any device can also use a browser page such as [My Location](https://getmylocations.com/my-location).

You’re standing on a plot of land and the surveyor wants its coordinates. You’re at a campsite with no address and want to find the exact spot next year. A friend is lost and the only useful thing to send is two numbers. Every phone and computer can already show you those numbers; the trick is knowing where each one hides them. This guide covers the apps you already have, device by device.

## Which method to use

| Device | Where | Format shown | Works offline? |
| --- | --- | --- | --- |
| iPhone | Compass app | Degrees, minutes, seconds | Yes (GPS only) |
| iPhone or iPad | Apple Maps: drop a pin | Decimal degrees | Needs map data |
| Android or iPhone | Google Maps: touch and hold the map | Decimal degrees | Needs map data |
| Windows or Mac | Google Maps in a browser: right-click | Decimal degrees | No |
| Any device | A browser location page | Decimal degrees, accuracy | No |

The formats differ: the Compass app shows degrees, minutes and seconds (DMS), the map apps show decimal degrees. Both describe the same point; the [coordinates converter](https://getmylocations.com/coordinates-converter) turns one into the other.

## On an iPhone: the Compass app

The fastest method on an iPhone, and the only one here that works with no signal at all, because it reads the GPS chip directly.

1.  Check that Location Services is on, and that Compass is allowed: **Settings → Privacy & Security → Location Services → Compass**.
2.  Open the Compass app.
3.  Your latitude and longitude appear at the bottom of the screen, in degrees, minutes and seconds, with your elevation.

The Compass app is on iPhone only; iPads do not have it, so on an iPad use Apple Maps below.

## On an iPhone or iPad: Apple Maps

1.  Open Maps and touch and hold the map where you are (next to the blue dot) to drop a pin.
2.  Swipe up on the pin’s card. The latitude and longitude are listed in the details.

## On Android (or iPhone): Google Maps

Google’s [own instructions](https://support.google.com/maps/answer/18539) are the same on Android and iPhone:

1.  Open Google Maps and wait for the blue dot to settle on your position.
2.  Touch and hold an area of the map that isn’t labeled, right next to the blue dot. A red pin drops.
3.  Your coordinates appear in the search box at the top, in decimal degrees. Tap them to copy.

Tapping the blue dot itself opens your location card instead, so aim for the empty map beside it.

## On a Windows PC or Mac: Google Maps in the browser

1.  Open Google Maps in any browser and click the location button so the map centres on you.
2.  Right-click your spot on the map.
3.  The latitude and longitude are the first line of the menu. Click them to copy.

A computer only knows where it is if location is switched on for the system and the browser. On Windows 11 that is **Settings → Privacy & security → Location**, including the setting for desktop apps further down, which covers Chrome and Firefox; on a Mac it is **System Settings → Privacy & Security → Location Services**. The full steps are in [turning on location on a laptop](https://getmylocations.com/blog/enable-location-on-windows-and-mac). Older guides mention the Windows Maps app; Microsoft withdrew it in July 2025.

## On any device: a browser location page

If you would rather not hunt through menus, a web page can ask the browser for your position directly. Our [My Location](https://getmylocations.com/my-location) tool shows the coordinates ready to copy, how accurate the reading is, and the nearest street address. To watch the numbers change as you walk, use the [live location tracker](https://getmylocations.com/live-location).

## How accurate is the number you just read?

It depends on which signals the device can use, not on the app:

-   **Phone outdoors with a clear sky:** GPS.gov says GPS-enabled smartphones are typically accurate to within [4.9 m (16 ft)](https://www.gps.gov/gps-accuracy).
-   **Indoors or between tall buildings:** tens of metres, because roofs and walls block or reflect the satellite signals.
-   **Laptop or desktop:** most have no GPS chip, so the position comes from nearby Wi-Fi networks, or from your IP address if there are none. An IP-based guess is often only right to the city (see [GPS vs IP accuracy](https://getmylocations.com/gps-vs-ip-accuracy)).
-   **Approximate location switched on:** if an app was only given approximate location, Android documents its accuracy as an area of about [3 square kilometres](https://developer.android.com/develop/sensors-and-location/location/permissions); switch on precise location for that app.

## How many decimal places should you keep?

Each decimal place of latitude is ten times finer than the last. Five decimals is about 1.1 m and six is about 11 cm, which is already finer than a phone can measure. For a delivery or a meeting point, four or five decimals is plenty; when posting a location publicly, rounding to two or three decimals hides the exact building.

Always give latitude first, then longitude. For example, `40.712776, -74.005974` is lower Manhattan; swapping the two numbers puts the point somewhere else entirely. If that order still trips you up, see [latitude vs longitude explained](https://getmylocations.com/blog/latitude-vs-longitude-explained).

## Who can see your coordinates?

Reading the numbers in the Compass app keeps them on your phone. Map apps and browsers are different: to work out a position from Wi-Fi networks, the operating system or browser asks its provider’s location service (Google says [Chrome sends information to Google Location Services](https://support.google.com/chrome/answer/142065) for this). A website only receives your coordinates after you allow its location prompt.

On GetMyLocations the coordinates stay in your browser tab; the only lookups that receive them are the address and city services named in the [privacy policy](https://getmylocations.com/privacy-policy). Before allowing location on any site, check the address starts with `https://`, and remove the permission later in the browser’s site settings. Before sending your coordinates to anyone, read [how to share your location safely](https://getmylocations.com/blog/how-to-share-gps-location-safely).

## Common questions

### Can I find my coordinates without an internet connection?

Yes. The GPS chip in a phone works without a connection, so the iPhone Compass app shows coordinates with no signal at all. Map apps can do the same if you downloaded offline maps beforehand. Web pages need a connection to load.

### Why is my location wrong by several kilometres?

Usually because the device had no GPS or Wi-Fi fix and fell back to your IP address, which often points to your provider’s network in another part of the city or country. A VPN moves it further. Step outside or near a window, switch off the VPN, or use a phone. The [location troubleshooting guide](https://getmylocations.com/fix-location-not-working) goes through the causes in order.

### How do I send my coordinates to someone?

Copy them as text (latitude, then longitude) and paste them into a message. Every map app can open a pair of decimal coordinates. For a moving position, a time-limited live location share is better; the [sharing guide](https://getmylocations.com/blog/how-to-share-gps-location-safely) compares the apps.

For how the phone actually computes the position, read [how GPS works](https://getmylocations.com/blog/how-gps-works).

Sponsored

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).

[← Back to all posts](https://getmylocations.com/blog)
