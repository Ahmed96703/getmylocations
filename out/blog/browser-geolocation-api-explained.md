---
title: "Browser Geolocation API: What Websites Can and Can't See"
description: "How navigator.geolocation works: getCurrentPosition, watchPosition, options, accuracy, error codes and permissions, with code you can copy."
url: https://getmylocations.com/blog/browser-geolocation-api-explained
---

# Browser Geolocation API: What Websites Can and Can't See

A

Ahmed Anwar

May 19, 2026·Updated October 6, 2026·10 min read

-   geolocation
-   api
-   privacy

* * *

If you’ve ever called `navigator.geolocation.getCurrentPosition` once and assumed you understood what it does — same. Then I built a site whose entire purpose is to call that one function in every plausible permutation, and the surprising answer is that the API itself is the small part. Most of what looks like behaviour of the browser is actually behaviour of the operating system underneath it, and the same five lines of JavaScript can return a GPS fix good to a few meters, a Wi-Fi estimate tens of meters out, or a coarse network guess kilometres away, depending on what the OS decides to hand back.

This article is the version of the W3C Geolocation API I wish I had when I started. What the page sees. What it doesn’t. What `enableHighAccuracy` really does. Which error codes are recoverable and which aren’t.

The browser never measures location itself. It asks the OS, which picks whichever combination of signals is available and hands one coordinate back.

## The surface area is tiny

The browser exposes `navigator.geolocation` with three methods:

-   `getCurrentPosition(success, error, options)` — ask once for the current location.
-   `watchPosition(success, error, options)` — subscribe to a stream of updates as the user moves.
-   `clearWatch(watchId)` — stop a previous subscription.

The first call (of either method) triggers the permission prompt, unless the user has already decided for this site. The wording differs by browser (Chrome, for example, offers _Allow this time_, _Allow on every visit_ and _Never allow_). The coordinate only flows back after the user allows it. The spec does not require a click before asking, but a page that asks the moment it loads, with no explanation, is the one people block.

A complete request, with all three options set explicitly to their defaults and every error handled:

```
if (!('geolocation' in navigator)) {
  showMessage('This browser has no Geolocation API.');
} else {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      showMessage(`${latitude.toFixed(6)}, ${longitude.toFixed(6)} (±${Math.round(accuracy)} m)`);
    },
    (err) => {
      if (err.code === err.PERMISSION_DENIED) showMessage('Location is blocked for this site.');
      else if (err.code === err.POSITION_UNAVAILABLE) showMessage('No position available. Try near a window.');
      else if (err.code === err.TIMEOUT) showMessage('Timed out. Try again.');
    },
    { enableHighAccuracy: false, timeout: Infinity, maximumAge: 0 } // the defaults
  );
}
```

## What lands in the success callback

A `GeolocationPosition` with two parts: a timestamp and a `coords` dictionary containing:

-   **latitude** and **longitude** — decimal degrees, the actual coordinate.
-   **accuracy** — the radius of the 95% confidence circle in meters. An accuracy of 8 means the device is 95% sure you’re within 8 m of the reported point.
-   **altitude** and **altitudeAccuracy** — often `null` because most desktops don’t measure altitude.
-   **heading** — direction of motion in degrees clockwise from true north. `null` when the device cannot tell, and `NaN` when it is standing still (speed 0). Available from either method, but most useful while watching a moving device.
-   **speed** — meters per second, or `null` when the device cannot measure it.

That’s the whole payload. The page does _not_ receive: which satellites were heard, which Wi-Fi BSSIDs were scanned, the user’s IP (that comes from the connection itself, not from the API), the device’s unique identifier, or any history. Each call returns a fresh reading; nothing about previous calls is shared with the page.

## Where the coordinate actually comes from

The browser doesn’t measure location. It asks the OS, which fuses signals depending on hardware and permissions:

-   **GNSS satellites.** The most accurate option when available, but requires a GPS chip. Most desktops and laptops don’t have one — Macs included. Phones do, and so do tablets with mobile data (a Wi-Fi-only iPad does not).
-   **Wi-Fi BSSID lookup.** Apple and Google keep global databases of Wi-Fi access points keyed to GPS-collected coordinates. The OS scans visible Wi-Fi, queries the database, gets back a position, often good to tens of meters in a city.
-   **Cell-tower triangulation.** Coarse but useful indoors. The towers the phone can hear, and their signal strength, give a position that is usually hundreds of meters to kilometres out.
-   **IP geolocation.** Last-resort fallback. Often kilometres off.

The OS picks the most accurate combination it can and presents a single coordinate. The `accuracy` field is the only signal you get about which source won. As a rough rule, a radius of a few meters points to GPS, tens of meters to Wi-Fi, and thousands of meters to cell or network estimates.

## The three options and their defaults

| Option | Default | What it controls |
| --- | --- | --- |
| `enableHighAccuracy` | false | A hint to use the most accurate source (usually GPS), at a cost in time and battery. |
| `timeout` | no limit | How long to wait, in milliseconds, before the error callback fires with TIMEOUT. |
| `maximumAge` | 0 | How old a cached position may be, in milliseconds. 0 forces a fresh reading; Infinity accepts any cached one. |

Defaults as given by MDN and the W3C Geolocation specification. The spec stores the “no limit” timeout as the largest unsigned 32-bit number, about 49.7 days, which in practice means waiting forever.

## enableHighAccuracy is not always what you want

The options object accepts the flag `{ enableHighAccuracy: true }`. Setting it asks the OS to use GNSS even when it’s slower and more battery-hungry. Off, the OS may return a cached Wi-Fi-only fix in milliseconds. On, it spends a few seconds talking to satellites for a meter-grade reading.

Counterintuitively, high accuracy is sometimes _worse_ for the user. If you’re indoors with no GPS line-of-sight, asking for high accuracy makes the OS fight a losing battle for several seconds before giving up and falling back anyway. For most map-style use cases, the default is right.

## The permission model has more layers than you’d expect

The API is gated by a stack of restrictions, not one:

1.  **HTTPS required.** The spec restricts the API to secure contexts. On a plain-HTTP page browsers refuse the request, usually by calling the error callback with PERMISSION\_DENIED, so the location never travels over an unencrypted connection.
2.  **No click required, but it helps.** The spec does not demand a user gesture, and browsers will prompt on page load. Asking in response to a button press, after explaining why, is what keeps people from clicking Block.
3.  **Per-site permission, remembered.** The user’s choice is stored per origin. They can revoke it at any time from the browser’s site-settings UI.
4.  **Iframe restrictions.** Geolocation is a policy-controlled feature whose default allowlist is `'self'`: same-origin frames may ask, but a cross-origin iframe needs an explicit `allow="geolocation"` attribute.
5.  **OS-level switch.** If location is off for the whole device, or the browser app itself is not allowed to use it, the request fails — usually with PERMISSION\_DENIED or POSITION\_UNAVAILABLE — however the site’s own permission is set.

A page can check where it stands before asking, without triggering a prompt, through the Permissions API: `navigator.permissions.query({ name: 'geolocation' })` resolves to _granted_, _denied_ or _prompt_, and fires a `change` event when the user changes it in site settings.

## The three error codes and what to do about each

The error callback receives a `GeolocationPositionError` with a numeric code. They behave very differently:

-   **1 (PERMISSION\_DENIED)** — the user clicked Block, or the OS has location off. Calling again won’t help; the user has to manually re-enable in site settings. _Recover by showing them the path._
-   **2 (POSITION\_UNAVAILABLE)** — the OS tried and couldn’t produce a fix. Usually means GPS is unavailable (indoors) and the Wi-Fi/cell fallback also failed. Retrying might help; moving outside helps more.
-   **3 (TIMEOUT)** — the request didn’t complete within the timeout. The default timeout is effectively unlimited, so this only fires if you set one. Increasing the timeout usually fixes it.

Distinguishing these matters because the recovery flow is different for each. The biggest UX win I ever shipped on this site was a dedicated permission-denied screen that walks the user through re-enabling location for the site in their specific browser, with the right instructions for Chrome, Safari, and Firefox, instead of a generic “location unavailable” message.

## What a page can and can’t infer about you

Once you grant permission, the page sees a coordinate. From one reading, less is deducible than people fear:

-   **From one fix:** your city, the building (if it’s a known one), your altitude when reported, whether you’re moving (in watch mode), rough activity (walking vs driving) from speed.
-   **Not from one fix:** your name, your phone number, your past locations, who you live with, your home/work address — unless this _is_ your home or work and they cross-reference.
-   **From watching over time:** almost everything in the previous list. A site that’s seen you for a week can guess where you live and work.

The single most useful privacy lever a user has is to revoke permission for sites that don’t need live location. A map site asking once per visit is fine. A games or social app silently calling `watchPosition` in the background is something to be skeptical of.

## How this site uses the API

The [GetMyLocations](https://getmylocations.com/) homepage asks as soon as it loads, because showing your location is the whole page. It takes one fresh reading with `getCurrentPosition` and keeps a `watchPosition` running so the dot follows you, and it listens to the Permissions API so it can retry the moment you unblock the site. The other tools only ask when you press a location button. Coordinates are processed in the browser. Map tiles and reverse-geocoding requests go to third parties as described in the [Privacy Policy](https://getmylocations.com/privacy-policy), but the raw coordinate itself is never sent to a server I operate.

If you want to feel the difference between accuracy values directly, open the [My Location](https://getmylocations.com/my-location) tool on a phone, then turn off Precise Location for your browser (on iPhone: Settings → Privacy & Security → Location Services → Safari Websites; on Android: Settings → Apps → Chrome → Permissions → Location) and try again. The accuracy radius grows from meters to kilometres; Android documents approximate location as an area of about 3 square kilometres. To see `watchPosition` in action, try the [Live Location](https://getmylocations.com/live-location) tracker — it streams coordinates continuously and shows the update count climbing. For a comparison of GPS accuracy versus IP-based positioning, see [GPS vs IP accuracy](https://getmylocations.com/gps-vs-ip-accuracy).

If location isn’t working at all, the step-by-step guides for [iPhone & Android](https://getmylocations.com/blog/enable-location-on-iphone-and-android) and [Windows & Mac](https://getmylocations.com/blog/enable-location-on-windows-and-mac) walk through every toggle.

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).

[← Back to all posts](https://getmylocations.com/blog)
