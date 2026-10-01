---
title: "How to Turn On Location Services on iPhone & Android"
description: "Enable Location Services on iPhone and Android, fix per-app and per-site permissions, turn on Precise Location, and beat the battery-saver gotcha."
url: https://getmylocations.com/blog/enable-location-on-iphone-and-android
---

# How to Turn On Location Services on iPhone & Android

A

Ahmed Anwar

June 3, 2026·9 min read

-   troubleshooting
-   mobile
-   privacy

* * *

![Two smartphone silhouettes side by side, each glowing with a location pin in the centre](https://getmylocations.com/blog-images/enable-location-on-iphone-and-android-hero.jpg)

A phone with location turned off is a phone that can’t do half of what people use a phone for. Maps stops navigating. Ride-hailing apps can’t find you. Delivery apps stop showing nearby restaurants. Weather defaults to the wrong city. It’s usually one of three switches that’s in the wrong position, and there’s a logical order to checking them.

The three layers, same as on a laptop:

1.  The **OS-wide Location Services switch**.
2.  The **per-app permission** — Maps, Weather, your browser, each one separately allowed.
3.  The **per-site permission** when a website (not an app) asks — controlled by the browser.

On a phone there’s a fourth wrinkle that desktops don’t have: **Precise Location**. iOS and Android both let users grant a coarsened, “within a few kilometres” location instead of the real one. Most apps ask for precise; if you tapped the wrong option once, an app may be running on the fuzzy version without you realising it.

## iPhone — Location Services and per-app permissions

On iOS the path to the master switch is:

1.  Open **Settings**.
2.  Scroll down to **Privacy & Security**.
3.  Tap **Location Services** at the top.
4.  Toggle **Location Services** on. The toggle has to be green.

Below the master toggle is a list of every app that has ever asked for your location, with the current setting next to each. The settings are:

-   **Never** — the app never gets the location, even if you’re using it.
-   **Ask Next Time Or When I Share** — the app gets prompted again next time it tries.
-   **While Using the App** — the app gets the location only while it’s open in the foreground.
-   **Always** — the app can read your location whenever it wants, including in the background.

Tap any app to change its setting. _While Using the App_ is the right answer for most things. _Always_ should be reserved for apps that genuinely need background tracking (fitness apps recording a run, navigation apps doing turn-by-turn).

While you’re on the app’s settings screen, look for the **Precise Location** toggle at the bottom. If it’s off, the app gets a fuzzed location accurate only to a few kilometres. For maps and navigation apps, you almost certainly want this on. For things like a coffee-chain app that just wants to know which city you’re in, leaving Precise Location off is a legitimate privacy choice.

## Safari and Chrome on iPhone — per-site permissions

When a website on iOS Safari asks for your location, you see a one-time prompt with three options: Allow Once, Allow While Using App, or Don’t Allow. If you tapped Don’t Allow and want to undo it for a specific site:

1.  Open the site in Safari.
2.  Tap the **AA** button in the address bar (or the small < / > icons on older iOS).
3.  Tap **Website Settings**.
4.  Set **Location** to **Allow** or **Ask**.
5.  Refresh the page.

Chrome on iPhone uses Apple’s WebKit under the hood (every browser on iOS does — that’s an Apple App Store rule), so the underlying permission flow is the same. To manage per-site permissions in Chrome on iOS, tap the three-dot menu → **Settings** → **Content Settings** → **Default browser permissions**.

![Single smartphone surrounded by concentric circles on a light blue background, evoking layered location permissions](https://getmylocations.com/blog-images/enable-location-on-iphone-and-android-mid.jpg)

## Android — the master toggle

Android settings vary slightly across phone manufacturers (Samsung’s One UI, Google’s Pixel UI, Xiaomi’s MIUI, OnePlus’s OxygenOS all rearrange things), but the underlying paths are the same. The standard path on a stock Android 13/14 device:

1.  Open **Settings**.
2.  Tap **Location**. On some phones it sits inside **Privacy** or **Security & privacy**.
3.  Toggle **Use location** on at the top.

If you can’t find it, pull down the notification shade and look for the **Location** quick-settings tile. Tap it once to toggle on/off; long-press it to jump straight to the Settings screen.

## Android per-app permissions — four options, three timings

On the Location settings screen, look for **App location permissions** or **App permissions → Location**. You’ll see every app that has ever asked for the location, grouped by what they’re currently allowed to do:

-   **Allowed all the time** — the app can read your location even when you’re not using it.
-   **Allowed only while in use** — foreground only.
-   **Ask every time** — you’ll be prompted each session.
-   **Not allowed** — permanently denied.

Tap any app to change which bucket it’s in. On the same screen you’ll also find **Use precise location** — same idea as iOS’s Precise Location toggle. If it’s off, the app gets a coarsened position.

## Chrome on Android — per-site permission

When a website asks for your location in Chrome on Android, you’ll see an Allow/Block prompt. If you blocked it previously and want to undo:

1.  Open the site in Chrome.
2.  Tap the lock icon to the left of the URL.
3.  Tap **Permissions**.
4.  Tap **Location** and choose **Allow** or **Ask**.
5.  Refresh the page.

To clear all site-level location blocks at once, open Chrome’s three-dot menu → **Settings** → **Site settings** → **Location**. Sites you’ve blocked appear in a list; tap any one and choose **Reset permissions**.

## The battery-saver gotcha (Android specifically)

Android’s aggressive battery optimization — especially on Samsung, Xiaomi, OnePlus, and Huawei phones — can quietly kill background location for apps it decides are using too much power. The app keeps its permission on paper but stops actually getting location updates. The symptom is “the app worked yesterday and stopped working today even though I didn’t change anything.”

The fix is to exempt the app from battery optimisation. **Settings** → **Apps** → the specific app → **Battery** → choose **Unrestricted** or **Not optimised**. The wording varies by manufacturer; on Samsung One UI the same setting is buried under **Settings** → **Device care** → **Battery** → **Background usage limits**.

## iOS-specific quirks worth knowing about

Two things on iOS can silently affect location accuracy even with everything switched on:

-   **Low Power Mode** (Settings → Battery) throttles background GPS sampling. Foreground apps still work, but anything trying to read location in the background gets coarser, slower updates.
-   **Significant Locations** (Settings → Privacy & Security → Location Services → System Services → Significant Locations) is the feature that keeps a history of places you frequently visit. It’s on by default. Turning it off doesn’t affect normal app location at all — it only stops iOS from building the personal-location history. Worth checking if you want to know what your phone has remembered.

## Test the fix

Quickest way to confirm everything is working: open the [My Location tool](https://getmylocations.com/my-location) on your phone, tap the location button, and tap Allow on the permission prompt if it appears. Within a couple of seconds you’ll see your six-decimal latitude and longitude plus an accuracy radius. Outdoors on a phone, the accuracy radius should be 3–5 meters. Indoors it’s typically 10–50 meters because the GPS chip can’t see the satellites clearly through a roof.

If the accuracy radius is huge (hundreds of meters or kilometres), GPS is probably off or unavailable and your phone fell back to Wi-Fi positioning or IP geolocation. Stepping outside fixes that almost instantly — the satellites need line-of-sight. For a deeper look at the resulting address rather than just the coordinate, try the [My Current Location page](https://getmylocations.com/my-location), which also reverse-geocodes the reading into a readable street address.

## Still not working?

If you’ve walked through every switch above and an app or website still cannot read your location, the problem is usually deeper in the permission stack — a denied per-site permission, an OS-level privacy restriction, or an insecure-context error on the page itself. Our [fix location not working guide](https://getmylocations.com/fix-location-not-working) runs through the seven most common reasons, in order, with the exact menu paths for each browser.

## Frequently asked questions

How do I turn on Location Services on my iPhone?+

Open Settings → Privacy & Security → Location Services and toggle the master switch on (it should be green). Then scroll down to the app list and confirm each app you care about is set to "While Using the App" or "Always," with the Precise Location toggle on if you want exact positioning. Without precise mode, the app gets a deliberately fuzzed coordinate accurate only to a few kilometres.

How do I enable location on Android?+

Open Settings → Location and toggle "Use location" on at the top. The same screen also shows "App location permissions" — tap any app to choose Allow all the time, Allow only while in use, Ask every time, or Not allowed. Confirm "Use precise location" is on for maps and navigation apps. On Samsung and Xiaomi phones the path may be under Privacy → Permission manager → Location.

Why is Location Services greyed out on my iPhone?+

Usually because Screen Time restrictions are blocking it. Open Settings → Screen Time → Content & Privacy Restrictions → Location Services and make sure changes are allowed. A managed work phone (MDM-enrolled) can also lock the switch — in that case your IT administrator controls it.

What does Precise Location actually do?+

It controls whether the app gets your real GPS coordinate (a few metres) or a deliberately coarsened one (a few kilometres). The toggle is per-app on iOS and per-app on Android. Turn it on for maps, navigation, and ride-hailing; leave it off for apps that only need to know your city (weather, news, retail loyalty apps) as a privacy compromise.

How do I let one website (not an app) use my location on my phone?+

On iOS Safari, open the site, tap the AA icon in the address bar, choose Website Settings, and set Location to Allow. In Chrome on Android, tap the lock icon to the left of the URL, then Permissions → Location → Allow. Refresh the page after either change to trigger the permission prompt again.

My app still does not get location after I enabled everything — what now?+

Three usual culprits: (1) battery optimisation is killing the background process — exempt the app under Settings → Apps → \[App\] → Battery → Unrestricted on Android; (2) the app needs Precise Location specifically, and you granted only Approximate; or (3) on iOS, Low Power Mode is throttling background GPS sampling. Disable Low Power Mode for a quick test.

## Related reading

For the underlying mechanics — what your phone actually does when an app asks for location, and how it fuses GPS, Wi-Fi, and cellular signals — see [how GPS works](https://getmylocations.com/blog/how-gps-works) and the [browser geolocation API explained](https://getmylocations.com/blog/browser-geolocation-api-explained). For the equivalent walkthrough on a laptop or desktop, see the [Windows and Mac guide](https://getmylocations.com/blog/enable-location-on-windows-and-mac). And if you just want to read your current coordinates fast, the [how to find your GPS coordinates](https://getmylocations.com/blog/how-to-find-your-gps-coordinates) guide covers every shortcut. To understand the difference between the question form and the live-tracking form, the [what is my location guide](https://getmylocations.com/my-location) and the [live location tracker](https://getmylocations.com/live-location) each take a different angle.

AA

Written by

### Ahmed Anwar

Independent web developer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).

[← Back to all posts](https://getmylocations.com/blog)
