---
title: "My Live Location Now — Track Your Real-Time Position Free"
description: "Watch your GPS position, speed and path update live, then save the route as a GPX file. Runs in your browser with no signup or stored data. Start now."
url: https://getmylocations.com/live-location
---

Free Tool · Continuous GPS stream in your browser

# My live location now — watch your real-time position update.

Tap one button and the page subscribes to your device’s GPS stream. Coordinates, accuracy, speed, heading, and the map pin all refresh automatically as you move, and the map draws the path you have walked — not a single snapshot, but a running fix. When you are done, save the route as a GPX file. Your coordinates never reach a server we run, and the stream stops the moment you tap _Stop_.

## Live location tracker

Tap _Start live tracking_ to begin. Your position refreshes automatically as you move; tap _Stop_ when you are done.

## Live vs. one-shot — the difference matters

Most location tools return a single fix and then go quiet. You tap, you see a coordinate, the page is done. That is fine if you are standing still and want to copy your position into a form. It is useless the moment you start moving — the pin stays where you were five seconds ago.

Live tracking is the opposite. The page asks the browser to _keep handing back new readings_ as the GPS receiver computes them. The browser provides this through a standard call called `watchPosition`: you supply a callback once, and it fires every time the operating system has a fresh fix to report. That is exactly what the tool above does, and it is why the “Updates” counter rises on its own while the “Live” badge is showing.

The tool asks for the strictest settings the API allows: `enableHighAccuracy: true` so the OS powers up the GPS receiver rather than settling for Wi-Fi, `maximumAge: 0` so it never replays a cached fix, and a `timeout` of 20 seconds before it reports that no reading arrived.

## What each live GPS location reading means

Every update the browser delivers carries more than a coordinate. Here is what each tile in the tracker shows, and when it is allowed to be blank under the W3C Geolocation API specification.

| Reading | Unit | What it tells you |
| --- | --- | --- |
| Latitude, longitude | degrees | Your position, shown to six decimal places. |
| Accuracy | meters | The radius of a circle the device is 95% confident you are inside. Smaller is better. |
| Speed | km/h | Reported by the device in meters per second and converted here. Blank when the device cannot measure it. |
| Heading | degrees from true north | Your direction of travel, with a compass point. Always blank while you are standing still. |
| Altitude | meters | Height reported by the device. Often blank on laptops and on Wi-Fi-only fixes. |
| Distance | m or km | Length of the path drawn on the map since you tapped Start. |
| Time elapsed | minutes:seconds | Time since you tapped Start. It stops counting when you tap Stop. |
| Average speed | km/h | Distance divided by time elapsed, so stops at traffic lights pull it down. Shown after the first ten seconds. |
| Updates | count, time | How many readings have arrived, and when the latest one did. |

For how the browser decides which of these values to fill in, see our guide to[how the browser Geolocation API works](https://getmylocations.com/blog/browser-geolocation-api-explained).

## How real-time positioning actually works

Inside your phone, the GPS chip is solving the same equation several times per second. It hears timestamps from four or more satellites overhead and back-solves for the only position on Earth where those particular delays line up. When you walk, the math changes — you are slightly closer to one satellite, slightly farther from another — and the chip outputs a new coordinate. The operating system passes that coordinate up to the browser, which passes it to this page, which redraws the dot.

Two practical knobs decide how lively the “live” reading actually feels. The first is the GPS sample rate, which most chipsets run at 1 Hz (one fix per second) by default. The second is the operating system’s smoothing layer, which sometimes withholds a new reading if it has not changed enough to matter. A clean outdoor walk should generate one update every second or two; a stationary indoor reading often updates only every five to ten seconds because the OS sees no real movement.

## Track my location on the map: path and distance travelled

While tracking is on, the map draws a line along the route you have taken and the Distance tile adds up its length. GPS jitter would normally turn a person standing still into a growing scribble, so the tracker is strict about which readings join the path: a new point is only added once you have moved at least 10 meters from the last one, and only from a reading accurate to 50 meters or better. Standing still therefore adds nothing, and a sudden indoor Wi-Fi guess hundreds of meters off is left out.

The trade-off is that very small movements, like pacing around a room, will not register. The path and distance reset each time you tap _Start live tracking_, and nothing is kept once you close the tab unless you download it first.

### Save your route as a GPX file

Once the path has two points, a _Download route (GPX)_ button appears under the readings. GPX is the standard file format for GPS tracks (version 1.1, published by Topografix), so Strava, Komoot, Garmin Connect, Google Earth and most hiking apps can open it. Each point in the file carries its latitude and longitude, the time it was recorded, and the altitude when the device reported one. The file holds exactly the points drawn on the map, after the 10-meter and 50-meter filters above.

The file is assembled by JavaScript in your browser and saved straight to your device; it is not uploaded anywhere first. You can download it while still tracking or after tapping _Stop_. To measure the straight-line gap between where you started and where you ended, paste both coordinates into the [distance calculator](https://getmylocations.com/distance-calculator).

## Enabling live updates on each device

### iPhone

1.  In Settings → Privacy & Security → Location Services, make sure the service is on at the system level.
2.  Scroll to your browser, tap it, and select _While Using the App_ with _Precise Location_ turned on. Without precise mode iOS feeds the browser a deliberately fuzzed coordinate that does not update as you move.
3.  Come back, tap _Start live tracking_, and choose _Allow While Using App_ on the permission prompt.
4.  Keep the tab in the foreground — iOS pauses the GPS stream to background tabs to save battery.

### Android

1.  In Settings → Location, switch Location on, then open _Location services_ and make sure _Google Location Accuracy_ is on (it adds Wi-Fi and cell positioning to GPS). Android 9 and older call this the _High accuracy_ mode.
2.  In Chrome, tap the address-bar lock icon → Permissions → Location → Allow.
3.  Tap _Start live tracking_. On Android 12 and later, the prompt asks you to choose between precise and approximate — choose precise; approximate will not update meaningfully as you walk.
4.  Like iOS, Android throttles GPS to background tabs; keep this one focused while tracking.

### Desktop or laptop

1.  Click _Start live tracking_ and allow the permission prompt under the address bar.
2.  Expect slow, infrequent updates. Most laptops have no GPS chip, so the browser falls back to Wi-Fi positioning, which only changes when you move between buildings or float between access points.
3.  If you need crisp updates while moving, open this page on your phone instead. Neither macOS nor Windows passes a phone’s GPS fix through to a laptop browser, so a laptop will only ever see Wi-Fi or IP positioning.

## Battery, accuracy, and the live-tracking tradeoff

High-accuracy live tracking is the most expensive geolocation mode a browser can run. It keeps the GPS radio warm, the Wi-Fi scanner active, and the application processor awake to deliver each callback. How much battery that costs depends on the phone, the signal, and above all whether the screen stays on, so the honest way to know is to note your battery percentage before and after a ten-minute session. It matters on a long road trip and barely registers on a short walk. The widget above releases all of those handles the instant you tap _Stop tracking_, and disconnects them automatically if you navigate away from this page.

There is also a sneakier tradeoff: _jitter_. A static one-shot reading hides the natural noise in any GPS fix, because you only see the final smoothed coordinate. Live tracking exposes the noise — you watch the dot wander a few meters as the chip recomputes. That is not the tool being wrong; it is the GPS being honest. (If the dot sits in the wrong city entirely, the browser has probably fallen back to IP location; see [why GPS and IP disagree](https://getmylocations.com/gps-vs-ip-accuracy).) If you need a single clean reading, our [one-shot My Location page](https://getmylocations.com/my-location) is the better fit. If you want to explore the area around your position with satellite imagery or switch between map styles, the [interactive map](https://getmylocations.com/maps) gives you a larger, freeform canvas.

## Keep the screen awake while tracking

Phones pause location updates to a web page once the screen turns off, so a walk with the phone in your pocket can leave long gaps in the path. Tick _Keep screen on_ next to the start button and the page asks the browser for a screen wake lock (the Screen Wake Lock API), which stops the display from sleeping while tracking is running.

The lock is released the moment you stop tracking or untick the box. If you switch to another app the browser drops it automatically, and the page asks for it again when you come back. If your browser does not support wake locks, the option is simply not shown. Battery-saver modes can also refuse the request; tracking still works, but the screen may sleep.

## When the live feed lags or freezes

If the update counter stops climbing or the timestamp goes stale, one of these is usually the cause:

-   **Tab moved to the background.** Both iOS and Android pause the GPS stream to inactive tabs. Bring this page back to the foreground.
-   **Indoor signal loss.** Walking from a parking lot into a steel-framed building can drop GPS within seconds; the OS waits to see if the signal returns before falling back to Wi-Fi.
-   **Screen went to sleep.** A dark screen pauses the stream on most phones. Tick _Keep screen on_ before you start, as described above.
-   **Battery-saver kicked in.** Low-power modes downsample GPS or block the radio entirely while the screen is dim. Disable battery saver for the session.
-   **Browser denied background permission.** Some browsers stop firing the watch callback after a few minutes if they decide the page is idle. Close and re-open the tab to restart the stream.
-   **No movement.** If you are sitting still, the OS may legitimately have nothing new to report. The last fix on screen is still your current position.

If tracking never starts at all, work through the [location not working fix guide](https://getmylocations.com/fix-location-not-working).

## How to share your live location with someone

This page only ever shows your own position to you. It cannot create a link for someone else to follow, because that would mean sending your coordinates to a server, which this site deliberately never does. To share a moving position with someone you trust, use an app built for it:

1.  **Google Maps:** tap your profile picture → _Location sharing_ → _New share_, choose how long, then pick a contact.
2.  **Apple Find My or Messages:** in a conversation, tap the contact’s name → _Share My Location_, then choose one hour, until the end of the day, or indefinitely.
3.  **WhatsApp:** in a chat, tap the attachment button → _Location_ → _Share live location_, then choose 15 minutes, 1 hour, or 8 hours.

All three let you stop sharing early. To show someone a route after the fact instead, download it as a GPX file above and send the file. Before you share, read[how to share your GPS location safely](https://getmylocations.com/blog/how-to-share-gps-location-safely).

## Privacy: the stream stays with you

Live tracking sounds invasive, but the data path is no different from a single-shot reading — there are just more readings. Every coordinate is delivered to JavaScript inside your own tab; none of them are posted to a server we control, written to any database, or correlated with anything else about your session. The page makes one throttled network call per ten seconds (at most) to translate the latest coordinate into a readable place name, and that request contains nothing but two numbers. A downloaded GPX file stays on your device unless you choose to send it to someone.

If you want to dig further into what a browser is — and is not — allowed to do with your GPS, our [guide to the W3C Geolocation API](https://getmylocations.com/blog/browser-geolocation-api-explained) walks through the permission model and the difference between `getCurrentPosition` and `watchPosition` in plain English.

## Frequently asked questions

What does "live location" actually mean?+

A live location is a position that keeps updating, not a single one-shot reading. The tracker subscribes to a stream of GPS fixes — usually one every one to five seconds — and replaces the displayed coordinates with the newest one each time. As long as the page stays open and the button is in the "Live" state, the map pin follows wherever you walk, drive, or ride.

How do I share my live location with someone?+

This page shows your own live position; it does not generate a shareable link other people can open. For sharing, use the dedicated feature in Google Maps ("Share location" → choose a contact and a duration) or Apple Maps ("Share My Location"). Both encrypt and time-limit the link, which is the right way to share a moving position with someone you trust.

Can I save the route I walked?+

Yes. Once the map shows a path, tap "Download route (GPX)". The file contains every point on the drawn path with its time and, where the device reports it, its altitude, in the standard GPX 1.1 format that Strava, Komoot, Garmin Connect and Google Earth open. It is built in your browser and saved to your device; we never receive a copy. Download before closing the tab, because the path is not kept anywhere else.

How is average speed worked out?+

It is the Distance tile divided by the Time elapsed tile. Because elapsed time keeps running while you stand still, stops pull the average down, the same way a fitness app reports "average moving plus stopped". The Speed tile next to it is different: that is the instantaneous speed the device reports with each reading.

Why does my live location keep jumping around?+

Two normal causes. (1) The GPS chip is constantly recomputing the fix from the satellites it can hear; even when you are standing still, the noise floor pulls each new reading a few meters in a random direction. (2) When the OS switches between GPS, Wi-Fi, and cell-tower estimates, the coordinates can jump tens of meters as the source changes. Both look like jitter but are working as designed.

Does live tracking drain my battery?+

Yes. Holding the GPS receiver in high-accuracy mode and waking the processor for every reading costs real battery, and keeping the screen on (the "Keep screen on" option) usually costs more than the GPS itself. How much depends on the phone, the signal, and screen brightness, so the honest way to know is to note your battery percentage before and after a ten-minute session. Stop tracking with the button above whenever you are not actively using the page; the tool releases the GPS handle immediately.

Is my live location private?+

Yes. The coordinate stream is delivered to JavaScript running in your own browser tab and is never posted to a server we control. The only outgoing request the page makes with your coordinates is a throttled reverse-geocoding call to OpenStreetMap (no more than once every ten seconds), so the city label can update as you move. We do not store, log, or correlate any of it.

How often does the position update?+

The browser delivers a new fix whenever the operating system has one it considers a real change. On a phone with a clean GPS signal, that is usually every one to two seconds while moving and every five to ten seconds while still. On a laptop using Wi-Fi positioning, updates can be sparser — sometimes only every fifteen or twenty seconds — because Wi-Fi fixes are inherently slower.

Why is my heading blank?+

Heading is the direction you are moving, measured in degrees clockwise from true north. The W3C Geolocation specification says a device that is standing still must report no heading, because a direction of travel only exists while you are travelling. Start walking and it fills in. Laptops and some phones never report it at all, in which case it stays blank.

How accurate is live location indoors?+

Usually far worse than outdoors. Indoors the GPS signal is too weak, so the phone falls back to Wi-Fi positioning, which is typically accurate to tens of meters and sometimes hundreds. Watch the Accuracy tile: it is the radius the device is 95% confident you are inside. The path trail ignores any reading worse than 50 m, so indoor guesses do not scribble across the map.

## Related tools and guides

[

### My Location

Your GPS coordinates + address, one tap

](https://getmylocations.com/my-location)[

### Latitude vs Longitude

What the two numbers mean

](https://getmylocations.com/blog/latitude-vs-longitude-explained)[

### IP Location

Look up any IP address

](https://getmylocations.com/ip-location)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
