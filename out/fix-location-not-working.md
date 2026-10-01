---
title: "Location Not Working? 7 Fixes for Any Browser or Phone"
description: "Step-by-step fixes for Chrome, Safari, Firefox, Edge, iOS and Android — re-enable permissions, fix wrong-city errors, and stop GPS drift."
url: https://getmylocations.com/fix-location-not-working
---

Troubleshooting Guide

# Fix Location Not Working — a complete browser & GPS troubleshooting guide

Location features can fail in a dozen different ways, and the error message you see rarely tells you which one. This guide walks through the seven most common causes — from a denied browser prompt to a VPN that's rewriting your IP — and exactly what to click to fix each one, on Chrome, Safari, Firefox, Edge, iOS, and Android.

* * *

## Start here: which problem do you actually have?

Before you change any setting, identify the symptom. Different problems need different fixes, and trying the wrong fix can lock you out of your settings even further.

1.  **Browser shows a small red “blocked” icon in the address bar** → you previously denied the permission prompt. Jump to [re-enabling browser location](#chrome).
2.  **Page says “location permission denied” or never prompts** → the site is blocked by your browser's site settings. Same fix.
3.  **Map shows the wrong city or country** → either a VPN/proxy is rewriting your IP or you only granted IP-level (not GPS-level) accuracy. Jump to [wrong city showing](#wrong-city).
4.  **Coordinates fluctuate wildly every few seconds** → GPS signal is weak (indoors, surrounded by glass/metal) or you're on Wi-Fi-only positioning. Jump to [weak signal fixes](#weak-signal).
5.  **Nothing happens — page just hangs** → the geolocation API is being blocked at the OS or network level. Jump to [advanced diagnostics](#nothing).

* * *

## 1\. Re-enable browser location in Chrome (desktop)

Chrome remembers the “Block” choice forever. Re-prompting the user is not enough — you have to manually reset the per-site permission. Here's the fastest path:

1.  Open the site whose location is broken (e.g. `getmylocations.com`).
2.  Click the small lock icon (or tune icon, on newer Chrome) just left of the URL.
3.  Click **Site settings**.
4.  Find the **Location** row and change it from _Block_ to **Ask** (or **Allow**).
5.  Reload the tab. The permission prompt should re-appear; click **Allow**.

If you don't see the Location row at all, the site never asked because Chrome itself has location disabled globally. Open `chrome://settings/content/location` in the address bar and make sure the top toggle is on. Then revisit the site.

## 2\. Re-enable location in Safari (macOS & iOS)

Safari has _two_ separate gates: Safari's own site permission, and macOS/iOS's system Location Services. Both have to be on.

### macOS Safari

1.  System Settings → Privacy & Security → Location Services. Confirm it's on and Safari is checked.
2.  In Safari: Safari menu → Settings → Websites → Location. Find the site, change to _Allow_.
3.  Reload.

### iOS Safari (iPhone / iPad)

1.  Settings → Privacy & Security → Location Services → turn on globally.
2.  Scroll down to Safari Websites → set to _Ask Next Time Or When I Share_ or _While Using the App_.
3.  Open the site, tap the _aA_ icon in the address bar → Website Settings → Location → Allow.
4.  Reload.

## 3\. Re-enable location in Firefox

1.  Click the lock icon left of the URL → **Clear permissions and reload**. This is the nuclear option and the most reliable.
2.  Alternative: `about:preferences#privacy` → scroll to Permissions → click **Settings…** next to Location → remove the blocked entry → Save Changes.
3.  Reload the page. Click Allow when prompted.

## 4\. Re-enable location in Edge

1.  Click the lock icon → **Permissions for this site**.
2.  Change **Location** from Block to Ask.
3.  Reload, then approve when prompted.

Edge also respects Windows' system Location Privacy setting. If you blocked location at the OS level, no browser permission will help: open Windows Settings → Privacy & security → Location, and turn on both the master switch and the browser entry.

* * *

## 5\. Why is my location wrong? (and how to fix it)

If your browser shows a city you've never been to, the page is almost always doing _IP-based geolocation_, not real GPS. IP geolocation looks up a database row mapping your public IP address to a guessed city, and the database can be:

-   **Stale.** Your ISP may have re-assigned a block of IPs and the database hasn't caught up. Common for residential broadband.
-   **Routing-based.** Mobile carriers often route traffic through a regional aggregation point. Your IP looks like it's in the carrier's gateway city, not yours.
-   **Rewritten by a VPN.** Any VPN, including the “privacy” ones built into some browsers, swaps your real IP for one in another city or country.
-   **Rewritten by a corporate proxy.** Office and school networks often back-haul outbound traffic to a head office, so you appear to be wherever that office is.

**The fix:** grant _precise_ browser-level location (the GPS permission prompt) instead of just letting the page rely on IP. With GPS allowed, your real coordinates come straight from your device's GNSS chip and bypass IP geolocation entirely. For more on the difference, read our [guide to IP location accuracy](https://getmylocations.com/blog/what-is-ip-location-and-how-accurate).

* * *

## 6\. Coordinates fluctuating — fix a weak GPS signal

If your latitude and longitude drift by 50+ meters every few seconds, the device is struggling to get a good GPS fix. The most common culprits:

-   **Indoors with little sky view.** GPS needs a line of sight to at least four satellites. Move to a window or step outside for a clean fix.
-   **Tall buildings reflecting signals (urban canyon).** Manhattan, central Tokyo, and London's financial district are notorious. Multi-path reflections add tens of meters of error.
-   **Inside a car with a metallized windshield.** Some “low-E” coatings block GPS. Holding the phone closer to the side window often helps.
-   **Phone in battery-saver mode.** Several OSes downsample GPS in battery saver to once every few minutes. Disable it temporarily.
-   **Wi-Fi off.** Modern devices fuse GPS with nearby Wi-Fi BSSIDs for faster, more accurate fixes. Turning Wi-Fi off makes positioning slower and less precise even when you're not connected to a network.

* * *

## 7\. Nothing happens — advanced diagnostics

If the page just hangs and never resolves, location is being blocked at a layer below the browser. Check these in order:

1.  **OS-level switch.** Windows: Settings → Privacy & security → Location, master switch on. macOS: System Settings → Privacy & Security → Location Services, on. iOS/Android: Settings → Location → on.
2.  **App-level switch.** The browser itself needs OS permission to access location. Check the same Privacy panel for an entry like “Chrome” or “Safari”.
3.  **Incognito / private mode.** Most browsers refuse to remember location grants in private windows and re-prompt every time. If you keep denying it out of habit, try a normal window.
4.  **Insecure context.** The Geolocation API only works over HTTPS. If you're opening a site via plain `http://` or `file://`, the call silently fails.
5.  **Hardened privacy extensions.** Tools like LibreWolf, Brave shields, and certain “privacy” add-ons spoof or block geolocation by default. Temporarily disable them to test.
6.  **Mobile data saver / data warnings.** Some carriers throttle background location calls. Switching to Wi-Fi often clears this.

* * *

## Verify the fix worked

Once you've made the change, the easiest way to confirm location is working is to open the [My Location tool](https://getmylocations.com/my-location). It runs entirely in your browser, requests the standard Geolocation API permission, and shows your latitude, longitude, accuracy radius, and city within about two seconds of you clicking Allow. If you see fresh coordinates and a pin on the map, you're good.

To check that _live_ (continuously updating) location works as well — useful if you're troubleshooting a watchPosition-based app — try the [Live Location tracker](https://getmylocations.com/live-location). To compare against IP-only positioning, the [IP Location page](https://getmylocations.com/ip-location) works without any permission prompt at all.

Still stuck? Email us at [ahmed@getmylocations.com](mailto:ahmed@getmylocations.com) with your browser, OS version, and a screenshot. We answer every troubleshooting email within a day.

* * *

## Frequently asked questions

Why is my browser location not working?+

Almost always one of three reasons: (1) you previously clicked Block on the permission prompt and the browser remembers it forever — you need to manually reset the per-site permission, (2) the OS-level Location Services switch is off, so no browser permission can help, or (3) the page is being loaded over plain HTTP rather than HTTPS, in which case the Geolocation API silently refuses to run. Walk through this guide in order to rule each one out.

Why does the permission prompt never appear?+

Either the site has been pre-blocked at the browser level (the red "Location blocked" icon will be in the address bar), or the browser itself has location turned off globally. In Chrome, open chrome://settings/content/location and confirm the top toggle is on. In Safari, check System Settings → Privacy & Security → Location Services. In Firefox, clear the site permissions from about:preferences#privacy.

Why is my location showing the wrong city?+

The page is using IP geolocation rather than real GPS — and IP databases are wrong city-level about 25–50% of the time. A VPN, mobile Carrier-Grade NAT, or a stale database entry can put you tens or hundreds of kilometres from your real position. The fix is to grant precise browser-level (GPS) permission instead of relying on IP.

Does a VPN affect my location accuracy?+

It only affects IP-based location, not GPS. If a page reads your IP to guess a city, a VPN moves your apparent location to wherever the VPN exit server is. If a page uses the browser Geolocation API with your permission, it gets your real GPS/Wi-Fi coordinate regardless of any VPN. Disconnect the VPN if you specifically need IP-based location to be right.

iPhone says location services are off — how do I turn them back on?+

Open Settings → Privacy & Security → Location Services and turn the master switch on. Then scroll down, tap your browser (Safari or Chrome), and choose While Using the App with Precise Location enabled. Some sites also need a separate per-site allow under Safari → Settings for Websites → Location.

Does the Geolocation API work without HTTPS?+

No. Modern browsers refuse to expose location to any page loaded over plain HTTP or from a local file:// URL. The call returns a "permission denied" error silently. If you are testing a local site, use a local HTTPS proxy or open it through localhost (which most browsers treat as secure).

* * *

## Related guides

-   [What is IP location and how accurate is it?](https://getmylocations.com/blog/what-is-ip-location-and-how-accurate)
-   [Enable location on iPhone and Android — complete setup](https://getmylocations.com/blog/enable-location-on-iphone-and-android)
-   [Enable Location Services on Windows and Mac](https://getmylocations.com/blog/enable-location-on-windows-and-mac)
-   [Browser Geolocation API explained — what websites can and can't see](https://getmylocations.com/blog/browser-geolocation-api-explained)
-   [How GPS works — the satellite math behind your coordinates](https://getmylocations.com/blog/how-gps-works)
-   [How to find your GPS coordinates](https://getmylocations.com/blog/how-to-find-your-gps-coordinates)
-   [What is my location? — the in-depth guide](https://getmylocations.com/my-location)

AA

Written by

### Ahmed Anwar

Independent web developer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
