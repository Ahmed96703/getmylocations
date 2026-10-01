---
title: "Browser Geolocation API — What Websites Can and Can't See"
description: "A walkthrough of navigator.geolocation: how it works, what the OS fuses into a coordinate, the permission model, and the privacy implications."
url: https://getmylocations.com/blog/browser-geolocation-api-explained
---

# Browser Geolocation API — What Websites Can and Can't See

A

Ahmed Anwar

May 19, 2026·9 min read

-   geolocation
-   api
-   privacy

* * *

If you’ve ever called `navigator.geolocation.getCurrentPosition` once and assumed you understood what it does — same. Then I built a site whose entire purpose is to call that one function in every plausible permutation, and the surprising answer is that the API itself is the small part. Most of what looks like behaviour of the browser is actually behaviour of the operating system underneath it, and the same five lines of JavaScript can return a 3-meter GPS fix, a 25-meter Wi-Fi guess, or a 5-kilometre IP estimate depending on what the OS decides to hand back.

This article is the version of the W3C Geolocation API I wish I had when I started. What the page sees. What it doesn’t. What `enableHighAccuracy` really does. Which error codes are recoverable and which aren’t.

The browser never measures location itself. It asks the OS, which picks whichever combination of signals is available and hands one coordinate back.

## The surface area is tiny

The browser exposes `navigator.geolocation` with three methods:

-   `getCurrentPosition(success, error, options)` — ask once for the current location.
-   `watchPosition(success, error, options)` — subscribe to a stream of updates as the user moves.
-   `clearWatch(watchId)` — stop a previous subscription.

The first call (of either method) triggers the permission prompt: “getmylocations.com wants to use your location: Allow / Block.” The actual coordinate only flows back after Allow.

## What lands in the success callback

A `GeolocationPosition` with two parts: a timestamp and a `coords` dictionary containing:

-   **latitude** and **longitude** — decimal degrees, the actual coordinate.
-   **accuracy** — the radius of the 95% confidence circle in meters. An accuracy of 8 means the device is 95% sure you’re within 8 m of the reported point.
-   **altitude** and **altitudeAccuracy** — often `null` because most desktops don’t measure altitude.
-   **heading** — direction of motion in degrees from true north, only meaningful in watch mode on a moving device.
-   **speed** — meters per second, also only meaningful in watch mode.

That’s the whole payload. The page does _not_ receive: which satellites were heard, which Wi-Fi BSSIDs were scanned, the user’s IP (that comes from the connection itself, not from the API), the device’s unique identifier, or any history. Each call returns a fresh reading; nothing about previous calls is shared with the page.

## Where the coordinate actually comes from

The browser doesn’t measure location. It asks the OS, which fuses signals depending on hardware and permissions:

-   **GNSS satellites.** The most accurate option when available, but requires a GPS chip. Most desktops don’t have one. Phones, tablets, and modern Macs do.
-   **Wi-Fi BSSID lookup.** Apple and Google keep global databases of Wi-Fi access points keyed to GPS-collected coordinates. The OS scans visible Wi-Fi, queries the database, gets back a position. Typical accuracy: 10–25 m.
-   **Cell-tower triangulation.** Coarse but useful indoors. The carrier’s knowledge of which tower you’re on and signal strength produces a ~500–2000 m fix.
-   **IP geolocation.** Last-resort fallback. Often kilometres off.

The OS picks the most accurate combination it can and presents a single coordinate. The `accuracy` field is the only signal you get about which source won — under 10 m almost always means GPS, 20–100 m typically Wi-Fi, 1000+ usually IP-only.

## enableHighAccuracy is not always what you want

The options object accepts the flag `{ enableHighAccuracy: true }`. Setting it asks the OS to use GNSS even when it’s slower and more battery-hungry. Off, the OS may return a cached Wi-Fi-only fix in milliseconds. On, it spends a few seconds talking to satellites for a meter-grade reading.

Counterintuitively, high accuracy is sometimes _worse_ for the user. If you’re indoors with no GPS line-of-sight, asking for high accuracy makes the OS fight a losing battle for several seconds before giving up and falling back anyway. For most map-style use cases, the default is right.

## The permission model has more layers than you’d expect

The API is gated by a stack of restrictions, not one:

1.  **HTTPS required.** The API silently fails on plain HTTP. This blocks a man-in-the-middle attacker from injecting a fake location.
2.  **User gesture required (sometimes).** Some browsers refuse to show the prompt unless the call originates inside a click handler, to prevent surprise prompts on page load.
3.  **Per-site permission, remembered.** The user’s choice is stored per origin. They can revoke it at any time from the browser’s site-settings UI.
4.  **Iframe restrictions.** Modern browsers require third-party iframes to carry an explicit `allow="geolocation"` attribute to even ask.
5.  **OS-level kill switch.** If the user has disabled location at the operating-system level, the browser falls back to IP-only regardless of what the page does.

## The three error codes and what to do about each

The error callback receives a `GeolocationPositionError` with a numeric code. They behave very differently:

-   **1 (PERMISSION\_DENIED)** — the user clicked Block, or the OS has location off. Calling again won’t help; the user has to manually re-enable in site settings. _Recover by showing them the path._
-   **2 (POSITION\_UNAVAILABLE)** — the OS tried and couldn’t produce a fix. Usually means GPS is unavailable (indoors) and the Wi-Fi/cell fallback also failed. Retrying might help; moving outside helps more.
-   **3 (TIMEOUT)** — the request didn’t complete within the timeout. The default is no timeout, so this only fires if you set one. Increasing the timeout usually fixes it.

Distinguishing these matters because the recovery flow is different for each. The biggest UX win I ever shipped on this site was a dedicated permission-denied screen that walks the user through re-enabling location for the site in their specific browser, with the right instructions for Chrome, Safari, and Firefox. That alone roughly doubled successful re-fixes.

## What a page can and can’t infer about you

Once you grant permission, the page sees a coordinate. From one reading, less is deducible than people fear:

-   **From one fix:** your city, the building (if it’s a known one), your altitude when reported, whether you’re moving (in watch mode), rough activity (walking vs driving) from speed.
-   **Not from one fix:** your name, your phone number, your past locations, who you live with, your home/work address — unless this _is_ your home or work and they cross-reference.
-   **From watching over time:** almost everything in the previous list. A site that’s seen you for a week can guess where you live and work.

The single most useful privacy lever a user has is to revoke permission for sites that don’t need live location. A map site asking once per visit is fine. A games or social app silently calling `watchPosition` in the background is something to be skeptical of.

## How this site uses the API

[GetMyLocations](https://getmylocations.com/) calls `getCurrentPosition` once on page load after permission is granted, then optionally switches to `watchPosition` if the user enables live tracking. Coordinates are processed entirely in the browser. Map tiles and reverse-geocoding requests go to third parties as described in the [Privacy Policy](https://getmylocations.com/privacy-policy), but the raw coordinate itself is never sent to a server I operate.

If you want to feel the difference between accuracy values directly, open the [My Location](https://getmylocations.com/my-location) tool and toggle precise-location off and back on in your browser’s site settings. The accuracy radius drawn on the map jumps from ~5 m to ~10 km in real time. To see `watchPosition` in action, try the [Live Location](https://getmylocations.com/live-location) tracker — it streams coordinates continuously and shows the update count climbing. For a comparison of GPS accuracy versus IP-based positioning, see [GPS vs IP accuracy](https://getmylocations.com/gps-vs-ip-accuracy).

If location isn’t working at all, the step-by-step guides for [iPhone & Android](https://getmylocations.com/blog/enable-location-on-iphone-and-android) and [Windows & Mac](https://getmylocations.com/blog/enable-location-on-windows-and-mac) walk through every toggle.

AA

Written by

### Ahmed Anwar

Independent web developer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).

[← Back to all posts](https://getmylocations.com/blog)
