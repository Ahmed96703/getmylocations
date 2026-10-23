---
title: "How to Turn On Location Services on iPhone & Android"
description: "Turn on Location Services on iPhone and Android, allow Safari or Chrome to use it, fix website permissions and Precise Location. Updated for 2026."
url: https://getmylocations.com/blog/enable-location-on-iphone-and-android
---

# How to Turn On Location Services on iPhone & Android

A

Ahmed Anwar

June 3, 2026·Updated October 5, 2026·10 min read

-   troubleshooting
-   mobile
-   privacy

* * *

![Two smartphone silhouettes side by side, each glowing with a location pin in the centre](https://getmylocations.com/blog-images/enable-location-on-iphone-and-android-hero.jpg)

Quick answer

On iPhone, open Settings → Privacy & Security → Location Services, turn it on, then set the app you need to _While Using_. For websites, set _Safari Websites_ (or _Chrome_) there too. On Android, open Settings → Location and turn on _Use location_, then allow the app when it asks. For a website, also allow Location in the browser’s site settings: the _AA_ menu in Safari, or the icon left of the address in Chrome.

A phone with location turned off is a phone that can’t do half of what people use a phone for. Maps stops navigating. Ride-hailing apps can’t find you. Delivery apps stop showing nearby restaurants. Weather defaults to the wrong city. It’s usually one of three switches that’s in the wrong position, and there’s a logical order to checking them.

The three layers, same as on a laptop:

1.  The **OS-wide Location Services switch**.
2.  The **per-app permission** — Maps, Weather, your browser, each one separately allowed. For websites, the browser counts as the app: if Safari or Chrome is not allowed, no site can get your location.
3.  The **per-site permission** when a website (not an app) asks — controlled by the browser.

On a phone there’s a fourth wrinkle that desktops don’t have: **Precise Location**. iOS and Android both let users grant a coarsened location instead of the real one ([Android documents it](https://developer.android.com/develop/sensors-and-location/location/permissions) as an area of about 3 square kilometres). Most apps ask for precise; if you tapped the wrong option once, an app may be running on the fuzzy version without you realising it.

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

While you’re on the app’s settings screen, look for the **Precise Location** toggle at the bottom. If it’s off, the app gets a deliberately coarsened location, typically accurate only to a few kilometres. For maps and navigation apps, you almost certainly want this on. For things like a coffee-chain app that just wants to know which city you’re in, leaving Precise Location off is a legitimate privacy choice.

## iPhone — let your browser use location

This is the switch most guides skip, and the most common reason a website on an iPhone cannot find you. iOS treats your browser as an app, so the browser needs its own permission before any website can ask:

-   **Safari:** Settings → Privacy & Security → Location Services → **Safari Websites** → **While Using the App** (or _Ask Next Time_), with **Precise Location** on.
-   **Chrome:** Settings → **Chrome** → **Location** → **While Using the App**. [Google’s help](https://support.google.com/chrome/answer/142065) notes this is where Chrome’s location access is set on iPhone and iPad; Chrome then asks each site with an _Allow_ prompt.

If the browser is set to _Never_, every site fails silently or reports that permission was denied, however the site’s own setting looks.

## Safari and Chrome on iPhone — per-site permissions

Two different prompts can appear. The first time a browser itself wants location, iOS asks whether to allow _the app_ (Allow Once, Allow While Using App, Don’t Allow). After that, each website gets its own, simpler prompt: _Allow_ or _Don’t Allow_. If you tapped Don’t Allow for a site in Safari and want to undo it:

1.  Open the site in Safari.
2.  Tap the **AA** button in the address bar.
3.  Tap **Website Settings**.
4.  Set **Location** to **Allow** or **Ask**.
5.  Reload the page.

For Chrome on iPhone, Google’s help documents the iPhone setting above rather than a per-site location list inside Chrome: Chrome asks each site when the site requests your location. If a site was refused, reloading the page lets it ask again.

![Single smartphone surrounded by concentric circles on a light blue background, evoking layered location permissions](https://getmylocations.com/blog-images/enable-location-on-iphone-and-android-mid.jpg)

## Android — the master toggle

Android settings vary slightly across phone manufacturers (Samsung’s One UI, Google’s Pixel UI, Xiaomi’s MIUI, OnePlus’s OxygenOS all rearrange things), but the underlying paths are the same. On current Android versions:

1.  Open **Settings**.
2.  Tap **Location**. On some phones it sits inside **Privacy** or **Security & privacy**.
3.  Toggle **Use location** on at the top.

On the same screen, open **Location services** and check **Google Location Accuracy**. It adds Wi-Fi and mobile-network positioning to GPS, which gives a faster, steadier fix indoors.

If you can’t find it, pull down the notification shade and look for the **Location** quick-settings tile. Tap it once to toggle on/off; long-press it to jump straight to the Settings screen.

## Android per-app permissions — four options, three timings

On the Location settings screen, look for **App location permissions** or **App permissions → Location**. You’ll see every app that has ever asked for the location, grouped by what they’re currently allowed to do (_Allowed all the time_, _Allowed only while in use_, _Not allowed_). Tap an app to choose one of:

-   **Allow all the time** — the app can read your location even when you’re not using it.
-   **Allow only while using the app** — foreground only.
-   **Ask every time** — you’ll be prompted each session.
-   **Don’t allow** — denied until you change it.

Not every app offers _all the time_; it only appears for apps that ask for background location. On the same screen you’ll also find **Use precise location** — same idea as iOS’s Precise Location toggle. If it’s off, the app gets a coarsened position.

## Chrome on Android — per-site permission

When a website asks for your location in Chrome on Android, the prompt offers _Allow this time_, _Allow while visiting the site_ or _Never allow_. If you refused it earlier and want to undo that:

1.  Open the site in Chrome.
2.  Tap **View site information**, the icon to the left of the address (it replaced the padlock in Chrome 117).
3.  Tap **Permissions**.
4.  Turn **Location** on, or tap it to change the setting.
5.  Reload the page.

To clear all site-level location blocks at once, open Chrome’s three-dot menu → **Settings** → **Site settings** → **Location**. Chrome itself also needs Android’s location permission (Settings → Apps → Chrome → Permissions → Location). Sites you’ve blocked appear in a list; tap any one and choose **Reset permissions**.

## The battery-saver gotcha (Android specifically)

Android’s aggressive battery optimization — especially on Samsung, Xiaomi, OnePlus, and Huawei phones — can quietly kill background location for apps it decides are using too much power. The app keeps its permission on paper but stops actually getting location updates. The symptom is “the app worked yesterday and stopped working today even though I didn’t change anything.”

The fix is to exempt the app from battery optimisation. **Settings** → **Apps** → the specific app → **Battery** → choose **Unrestricted** or **Not optimised**. The wording varies by manufacturer. On Samsung phones with One UI 7, also open **Settings** → **Battery** → **Background usage limits** and add the app to **Never sleeping apps**, so it is not put to sleep automatically.

## iOS-specific quirks worth knowing about

Two settings on iOS are worth knowing about even with everything switched on:

-   **Low Power Mode** (Settings → Battery) reduces background activity. Apps you have open still get location normally, but apps working in the background may get updates later or less often.
-   **Significant Locations** (Settings → Privacy & Security → Location Services → System Services → Significant Locations) is the feature that keeps a history of places you frequently visit. It’s on by default. Turning it off doesn’t affect normal app location at all — it only stops iOS from building the personal-location history. Worth checking if you want to know what your phone has remembered.

## Test the fix

Quickest way to confirm everything is working: open the [My Location tool](https://getmylocations.com/my-location) on your phone, tap the location button, and tap Allow on the permission prompt if it appears. Within a couple of seconds you’ll see your six-decimal latitude and longitude plus an accuracy radius. [GPS.gov](https://www.gps.gov/gps-accuracy) says GPS-enabled smartphones are typically accurate to within 4.9 meters (16 ft) under open sky, and the radius the browser reports is usually somewhat larger. Indoors expect tens of meters, because the GPS chip can’t see the satellites clearly through a roof.

If the accuracy radius is huge (hundreds of meters or kilometres), GPS is probably off or unavailable and your phone fell back to Wi-Fi positioning or IP geolocation. Stepping outside fixes that almost instantly — the satellites need line-of-sight.

## Location is on, but a website still fails

Check the layers in this order; each one blocks everything below it:

1.  **Phone:** Location Services (iPhone) or Use location (Android) is on.
2.  **Browser app:** Safari Websites or Chrome is set to _While Using the App_ (iPhone), or Chrome has the Location permission (Android).
3.  **Website:** the site is set to _Allow_ in Safari’s Website Settings or Chrome’s site information.
4.  **Precision:** Precise Location is on for the browser, or the site only gets an approximate area.
5.  **Reload** the page so it asks again.

## Still not working?

If you’ve walked through every switch above and an app or website still cannot read your location, the problem is usually deeper in the permission stack — a denied per-site permission, an OS-level privacy restriction, or an insecure-context error on the page itself. Our [fix location not working guide](https://getmylocations.com/fix-location-not-working) runs through the seven most common reasons, in order, with the exact menu paths for each browser.

## Frequently asked questions

How do I turn on Location Services on my iPhone?+

Open Settings → Privacy & Security → Location Services and toggle the master switch on (it should be green). Then scroll down to the app list and confirm each app you care about is set to "While Using the App" or "Always," with the Precise Location toggle on if you want exact positioning. Without precise mode, the app gets a deliberately fuzzed coordinate accurate only to a few kilometres.

How do I enable location on Android?+

Open Settings → Location and toggle "Use location" on at the top. The same screen also shows "App location permissions" — tap any app to choose Allow all the time, Allow only while using the app, Ask every time, or Don't allow. Confirm "Use precise location" is on for maps and navigation apps. On Samsung and Xiaomi phones the path may be under Privacy → Permission manager → Location.

Why is Location Services greyed out on my iPhone?+

Usually because Screen Time restrictions are blocking it. Open Settings → Screen Time → Content & Privacy Restrictions → Location Services and make sure changes are allowed. A managed work phone (MDM-enrolled) can also lock the switch — in that case your IT administrator controls it.

What does Precise Location actually do?+

It controls whether the app gets your real position or a deliberately coarsened one. Android's documentation puts approximate location within an area of about 3 square kilometres, while precise location is usually within about 50 metres and often much better. The toggle is per app on both iOS and Android. Turn it on for maps, navigation, and ride-hailing; leave it off for apps that only need to know your city (weather, news, retail loyalty apps) as a privacy compromise.

How do I let one website (not an app) use my location on my phone?+

On iPhone, first let the browser itself use location: Settings → Privacy & Security → Location Services → Safari Websites (or Settings → Chrome → Location) → While Using the App. Then, in Safari, open the site, tap the AA icon in the address bar, choose Website Settings and set Location to Allow. In Chrome on Android, tap View site information (the icon left of the address), then Permissions → Location. Reload the page after either change.

Location is on, but a website on my phone still cannot find me. Why?+

On iPhone the usual cause is the browser's own permission: if Safari Websites (or Chrome) is set to Never under Location Services, every site fails no matter what the site setting says. Check in this order: Location Services on, the browser allowed While Using the App, the site set to Allow, Precise Location on, then reload the page.

My app still does not get location after I enabled everything — what now?+

Three usual culprits: (1) battery optimisation is killing the background process — exempt the app under Settings → Apps → \[App\] → Battery → Unrestricted on Android; (2) the app needs Precise Location specifically, and you granted only Approximate; or (3) on iOS, Low Power Mode is reducing background activity, which can delay updates for apps that are not open. Turn Low Power Mode off for a quick test.

## Related reading

For the underlying mechanics — what your phone actually does when an app asks for location, and how it fuses GPS, Wi-Fi, and cellular signals — see [how GPS works](https://getmylocations.com/blog/how-gps-works) and the [browser geolocation API explained](https://getmylocations.com/blog/browser-geolocation-api-explained). For the equivalent walkthrough on a laptop or desktop, see the [Windows and Mac guide](https://getmylocations.com/blog/enable-location-on-windows-and-mac). And if you just want to read your current coordinates fast, the [how to find your GPS coordinates](https://getmylocations.com/blog/how-to-find-your-gps-coordinates) guide covers every shortcut. To understand the difference between the question form and the live-tracking form, the [what is my location guide](https://getmylocations.com/my-location) and the [live location tracker](https://getmylocations.com/live-location) each take a different angle.

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).

[← Back to all posts](https://getmylocations.com/blog)
