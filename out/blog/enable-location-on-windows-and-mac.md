---
title: "How to Turn On Location on a Laptop (Windows 10, 11 & Mac)"
description: "Turn on location on any laptop — Windows 10, Windows 11, or Mac. Enable Location Services, allow your browser, and fix the greyed-out toggle on a work laptop."
url: https://getmylocations.com/blog/enable-location-on-windows-and-mac
---

# How to Turn On Location on a Laptop (Windows 10, 11 & Mac)

A

Ahmed Anwar

June 3, 2026·9 min read

-   troubleshooting
-   desktop
-   browser

* * *

You open a maps site, a weather app, or a delivery page on your laptop, the “find my location” button does nothing, and you sit there wondering what you broke. The truth is you probably didn’t break anything — location on a laptop runs through three separate switches, and any one of them being off will block the whole thing. The fix takes ninety seconds once you know where the switches live.

The three layers, in the order they have to be on:

1.  The **operating system’s location service** — one big master switch in Settings.
2.  The **per-app permission** — the browser has to be allowed to ask.
3.  The **per-site permission** in the browser — whether you clicked Allow or Block the first time the site asked.

This guide walks through each one on Windows 10, Windows 11, and macOS, then covers the browser-specific bits for Chrome, Safari, Firefox, and Edge. By the end the “find my location” button on any well-behaved site should work on your machine.

## Windows 11 — turning location services back on

Microsoft moved a lot of settings around in Windows 11, and Location is one of them. The path is:

1.  Open **Settings** (Win key + I).
2.  Click **Privacy & security** in the left-hand sidebar.
3.  Scroll down to the **App permissions** group and click **Location**.
4.  Toggle **Location services** to On at the top of the page.
5.  Below that, find the **Let apps access your location** toggle and turn that on as well.
6.  Scroll further down to the list of apps and make sure your browser (Microsoft Edge, Google Chrome, Firefox — whichever you use) has its individual toggle on.

One detail people miss: the per-app toggle below the main one is the second switch in our three-layer model. Turning the main switch on but leaving the app-specific one off is a common cause of “I turned it on but it still doesn’t work.”

## Windows 10 — the same idea, slightly different menus

On Windows 10 the path is:

1.  Open **Settings** (Win key + I).
2.  Click **Privacy**.
3.  Choose **Location** from the left sidebar.
4.  Under _Allow access to location on this device_, click **Change** and turn it on.
5.  Below that, toggle **Allow apps to access your location**.
6.  Scroll down to _Choose which apps can access your location_ and confirm your browser is enabled.

If the toggles are greyed out, jump down to the section on managed devices — that’s an IT-policy problem, not a Windows problem.

## macOS — Location Services in System Settings

On a Mac the equivalent setting is buried inside Privacy & Security. On macOS Ventura, Sonoma, or later (the new System Settings layout), here’s the path:

1.  Click the Apple menu → **System Settings**.
2.  In the sidebar, click **Privacy & Security**.
3.  Click **Location Services**.
4.  Toggle **Location Services** on at the top.
5.  Scroll the app list below it and make sure your browser (Safari, Chrome, Firefox) is checked.

On older macOS (Big Sur and earlier, with the original System Preferences app), the equivalent is **System Preferences** → **Security & Privacy** → **Privacy** tab → **Location Services** in the left list. You may need to click the padlock at the bottom of the window and authenticate before toggles will accept changes.

## Browser permission — the layer most people forget

Even with the OS toggles all on, a browser still has its own permission system. The first time any site asks for your location, the browser shows an Allow/Block prompt. If you clicked Block by accident (or chose “Never allow on this site”), the prompt won’t come back — the browser silently denies every future request from that site without telling you. This is the single most common cause of “the button does nothing” problems.

### Google Chrome — resetting a site permission

1.  Visit the site you want to fix (e.g. [getmylocations.com](https://getmylocations.com/)).
2.  Click the lock or info icon to the left of the URL.
3.  Click **Site settings** in the dropdown.
4.  In the permissions list, find **Location** and change it to **Allow** (or **Ask**, then refresh the page).
5.  Refresh the tab and the location prompt should reappear.

To reset permission for many sites at once, type `chrome://settings/content/location` into the address bar. You’ll see a list of sites under “Not allowed to use your location” — click the trash icon next to any site to clear its block, and the next visit will prompt fresh.

### Safari (macOS) — per-site permission

1.  With Safari open, click **Safari** → **Settings** in the menu bar (or press ⌘,).
2.  Click the **Websites** tab.
3.  In the left sidebar, click **Location**.
4.  Find the site in the list, and use the dropdown next to it to set **Allow** or **Ask**.
5.  At the bottom, set _When visiting other websites_ to **Ask** so new sites can prompt.

### Firefox — per-site, and the global reset

1.  Open the site whose permission you want to fix.
2.  Click the small lock icon in the URL bar, then click **Clear permission and reload** at the bottom of the panel.
3.  The next time the site asks, you’ll get a fresh Allow/Block prompt.

Or for the master list: type `about:preferences#privacy` in the address bar, scroll down to **Permissions**, click **Settings** next to Location, and edit per-site rules from there.

### Microsoft Edge — the same as Chrome, slightly relabelled

Edge uses Chromium under the hood, so the menus look almost identical to Chrome. Type `edge://settings/content/location` for the master list, or click the lock icon in the URL bar → **Permissions for this site** → **Location**. The Allow / Block options work exactly the same.

## When the toggles are greyed out

On work laptops, school computers, and any device managed by an IT department, Location Services may be locked off at the policy level. You’ll see the toggle but it won’t respond, or a tooltip will say _“Some of these settings are managed by your organization.”_ No amount of clicking will change it — the policy is enforced from a domain controller you don’t control.

The honest answer here is: you need IT to lift the policy, and they usually have a reason for it (compliance, audit trail, liability). On a personal laptop you should never see this message; if you do, run an antivirus scan, because some installers add fake group policies as a side effect.

## Why your laptop’s location is less accurate than your phone’s

Even with every switch correctly on, a laptop’s location reading is usually less precise than a phone’s. The reason is hardware: most laptops have no GPS chip. Instead they use Wi-Fi positioning, which works by scanning visible Wi-Fi access points and matching them against the global database that Google and Apple keep. In a city with dense Wi-Fi coverage, that gets you within roughly 20–50 meters — usually accurate enough to know which neighbourhood you’re in. In a rural area where few networks are mapped, the same logic falls back to your IP address, and accuracy collapses to a 5–50 km radius.

Two practical implications. First, plugging in via Ethernet often gives a _worse_ location reading than Wi-Fi, because the wired connection turns off the Wi-Fi radio, which was the source of the precision. Second, a VPN doesn’t actually break the OS-level location reading at all — the VPN only changes your IP-based fallback. If GPS or Wi-Fi positioning is available, the browser still gets the real coordinate, and the VPN is irrelevant.

## Testing whether it actually works

Once you’ve flipped the switches, the fastest way to confirm the fix is to open the [My Location tool](https://getmylocations.com/my-location) and click the location button. If the prompt appears and you click Allow, your latitude and longitude land on screen within a couple of seconds along with an accuracy radius in meters. That’s a clean success. To check that _continuous_ live updates work as well, the [Live Location tracker](https://getmylocations.com/live-location) keeps refreshing as you move the laptop — useful for verifying watch-based features.

If the page tells you it can’t get your location, the most likely remaining cause is that your browser’s site permission for this page is set to Block from a previous visit — even though you cleared it in the master settings. Re-check using the lock-icon dropdown described above and you should be sorted.

## Frequently asked questions

How do I enable Location Services on Windows 11?+

Open Settings (Win + I) → Privacy & security → Location. Toggle "Location services" on at the top, then turn on "Let apps access your location" below it. Finally, scroll to the per-app list and confirm your browser (Edge, Chrome, Firefox) has its individual toggle on as well. Three switches, all required.

How do I turn on Location Services on Windows 10?+

Open Settings → Privacy → Location. Under "Allow access to location on this device" click Change and turn it on. Then toggle "Allow apps to access your location" and scroll to confirm your browser is enabled in the per-app list. If the toggle is greyed out, your machine is managed by an IT policy or — on a personal machine — possibly compromised by software that installed a fake group policy.

How do I enable Location Services on a Mac?+

Click the Apple menu → System Settings → Privacy & Security → Location Services. Toggle Location Services on, then scroll the app list below it and check the box next to your browser (Safari, Chrome, Firefox). On older macOS versions the same setting lives at System Preferences → Security & Privacy → Privacy tab → Location Services, and you may need to click the padlock at the bottom to unlock changes.

Why is the Location Services toggle greyed out on my work laptop?+

A managed device — a work laptop, a school computer, a domain-joined machine — can have Location Services locked off at the group-policy level. The toggle is visible but unresponsive, often with a tooltip that reads "Some of these settings are managed by your organization." There is no way around this without your IT department lifting the policy; they usually have a documented compliance reason for it.

I enabled Location Services but my browser still cannot read it — why?+

Either the per-app toggle for your specific browser is off (in the same Windows or macOS Location panel), or the per-site permission inside the browser is set to Block from a previous visit. Click the lock icon left of the address bar → Site settings / Permissions → Location → Ask, refresh the page, and click Allow on the prompt that reappears.

Why is my laptop location so much less accurate than my phone?+

Hardware. Most laptops have no GPS chip, so they fall back to Wi-Fi positioning (10–50 metres in a dense city) or, if no usable Wi-Fi is visible, IP geolocation (5–50 kilometres). A phone with GPS gets 3–5 metres outdoors. Plugging in via Ethernet often makes laptop accuracy worse because the wired connection turns off the Wi-Fi radio that was supplying the precision.

## Related reading

For the deeper technical story of what your browser actually does when a site asks for your location, see [the browser geolocation API explained](https://getmylocations.com/blog/browser-geolocation-api-explained). If your problem turns out to be wrong-city accuracy rather than a denied prompt, the [GPS vs IP accuracy guide](https://getmylocations.com/gps-vs-ip-accuracy) covers why that happens. The [general fix-location guide](https://getmylocations.com/fix-location-not-working) has a broader troubleshooting list that includes browser extensions, VPNs, and corporate networks. For the mobile equivalent of this article, see the [iPhone and Android setup guide](https://getmylocations.com/blog/enable-location-on-iphone-and-android).

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).

[← Back to all posts](https://getmylocations.com/blog)
