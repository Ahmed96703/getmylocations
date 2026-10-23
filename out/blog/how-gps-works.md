---
title: "How GPS Works: Satellites, Clocks and Your Phone, Explained"
description: "How 31 satellites and atomic clocks tell your phone where it is: trilateration, relativity, A-GPS, accuracy limits, jamming and RTK, with sources."
url: https://getmylocations.com/blog/how-gps-works
---

# How GPS Works: Satellites, Clocks and Your Phone, Explained

A

Ahmed Anwar

May 10, 2026·Updated October 15, 2026·9 min read

-   gps
-   satellites
-   technology

* * *

![GPS satellites orbiting Earth with signal lines beaming down toward the planet](https://getmylocations.com/blog-images/how-gps-works-hero.jpg)

Quick answer

About 31 GPS satellites orbit 20,200 km up, each broadcasting its position and the exact time from an atomic clock. Your phone measures how long each signal took to arrive, turns those delays into distances, and finds the one point that fits four or more of them. That is trilateration; phones also use other satellite systems and Wi-Fi to get there faster.

By the time a GPS satellite’s signal reaches your phone it is extraordinarily faint — far weaker than the background radio noise around it. That fact is the source of most of GPS’s properties — why it doesn’t work indoors, why it takes a few seconds to lock on, why it’s easy to jam, why the chip needs an antenna with a clear view of the sky. The receiver is doing a remarkable amount of work to extract a coordinate from a signal that weak, on hardware that costs less than a cup of coffee.

This article is the version of “how GPS works” I wish I’d had when I started building location tooling: not too deep into the physics, but specific enough to predict when you’ll get a fix good to a few metres, when you’ll get nothing, and why.

Trilateration: each satellite tells your phone where it is and what time it is. The time difference reveals distance; three distances narrow your position to one point. A fourth satellite resolves clock error.

## The system, end to end

GPS (Global Positioning System) is owned and operated by the US Space Force, free to use for anyone on Earth. It has three parts:

1.  **The space segment** — the US Space Force has flown [31 operational satellites](https://www.gps.gov/space-segment) for over a decade, in medium Earth orbit about 20,200 km up.
2.  **The control segment** — ground stations that track the satellites and correct their orbits and clocks.
3.  **The user segment** — anything with a GPS receiver: your phone, a car dashboard, a hiking watch, a tractor, a cruise missile.

Each satellite continuously broadcasts: “I am satellite 17. My current orbital position is X, Y, Z. The exact time right now is T.” The receiver’s job is to pick up enough of these broadcasts to work out where it must be.

## Catching the signal

GPS broadcasts on three frequency bands. The original civilian signal, L1 C/A (1575.42 MHz), is joined on newer satellites by three more civilian signals: **L2C** (1227.60 MHz),**L5** (1176.45 MHz) and **L1C**; the military uses separate encrypted codes. However many signals there are, they arrive far below the noise floor, which is why GPS struggles indoors, under heavy tree cover, or in deep urban canyons.

For a usable position the chip typically needs to hear at least **four satellites**. Modern multi-constellation phones can track dozens of satellites from several systems at once, and together with network assistance (below) that is why a phone usually gets a fix in seconds where an old standalone unit could take a minute or more.

## The clock trick that does most of the work

The distance from your phone to a satellite comes from one measurement: the satellite tells you when the signal was sent; your phone records when it arrived; multiply the time difference by the speed of light (~300,000 km/s); that’s your distance to that satellite.

The hard part is that the speed of light is so fast that a 1-microsecond clock error puts you off by 300 meters. Every satellite carries an **atomic clock** accurate to nanoseconds for exactly this reason — and the math your phone runs has to account for the fact that its own quartz clock is wildly imprecise by comparison.

Einstein has to be accounted for too. Seen from the ground, the satellite clocks tick faster because gravity is weaker up there (general relativity) and slower because they move at about 14,000 km/h (special relativity). The net effect is roughly **38 microseconds a day fast**, which left uncorrected would add kilometres of error per day. The clocks are deliberately set to run slightly slow before launch so that, in orbit, they keep ground time.

## Trilateration, not triangulation

With distance from one satellite, you’re somewhere on the surface of a giant sphere centred on it. With two, you’re on the circle where two spheres intersect. With three, the circle shrinks to two possible points (one in space, one on Earth). With four, all uncertainty collapses to a single 3D position: your latitude, longitude, and altitude.

This is **trilateration**, not triangulation — triangulation involves measuring angles, which GPS doesn’t do. The fourth satellite has a bonus job: by demanding that all four distance measurements agree on one consistent answer, the math also derives your phone’s exact time as a side product. This is why GPS is also the backbone time-sync source for cell towers, electrical grids, and financial markets — not for the position, for the nanosecond-accurate time.

## What actually wrecks GPS accuracy

Under open sky, GPS.gov says GPS-enabled smartphones are typically accurate to within [4.9 m (16 ft)](https://www.gps.gov/gps-accuracy). Several real-world factors chip away at that:

-   **Atmospheric delay.** The ionosphere and troposphere slow the signal slightly. Receivers compensate with models, but it’s never perfect.
-   **Multipath.** Signals bounce off buildings before reaching you, arriving later than the direct path. This is why GPS gets weird in dense downtowns — the blue dot jumping back and forth across a street is multipath in action.
-   **Satellite geometry.** If all visible satellites are clustered in one corner of the sky, the math is geometrically unstable. Serious receivers report this as the “DOP” (dilution of precision) number.
-   **Obstructions.** Concrete, foliage, tunnels — all kill the already-weak signal.

## Your phone isn’t using just GPS

Modern smartphones use a hybrid: **A-GPS** (assisted GPS, where the satellites’ orbit data comes in over the mobile network instead of being decoded slowly from the satellite signal) on top of **GNSS** (Global Navigation Satellite Systems generally):

-   **GPS (USA)** — the original.
-   **GLONASS (Russia)** — same idea, different constellation.
-   **Galileo (EU)** — civilian-run, with a free high-accuracy correction service.
-   **BeiDou (China)** — global since its third generation was completed in 2020.
-   **QZSS (Japan)** — augments coverage over Asia.

Your phone listens to all of them simultaneously. On top of GNSS, it also pulls Wi-Fi triangulation (matching visible Wi-Fi networks against Google’s or Apple’s database), cell-tower triangulation, and IMU sensors (accelerometers and gyroscopes) to keep position updated even when satellites are temporarily blocked. The combination is what makes a modern phone’s blue dot feel almost magical compared to a 2010-era standalone GPS unit.

## Why your phone locks faster than your old car GPS did

Before a receiver can use a satellite it needs that satellite’s**ephemeris**, its precise orbit, which the satellite rebroadcasts only every 30 seconds at a very slow data rate. A standalone receiver starting cold has to sit and decode it from the weak signal, which takes tens of seconds at best and much longer in poor conditions. A phone downloads the same orbit data over the mobile network in a moment. That’s the “Assisted” in A-GPS, and it’s the main reason a phone’s first fix feels almost instant.

## Can GPS be jammed or spoofed?

Yes to both, and the cases are worth knowing.

**Jamming** just drowns the satellite signal in noise on the same frequency. Because the original signal is so weak, a small jammer can take out a meaningful radius. A well-known case: a New Jersey driver used a cheap jammer in his company pickup to stop his employer tracking it, and it kept disrupting an experimental GPS landing system (GBAS) at Newark Liberty airport. The FCC traced the truck by direction-finding in August 2012 and [proposed a $31,875 fine](https://insidegnss.com/fcc-fines-operator-of-gps-jammer-that-affected-newark-airport-gbas/). Jammers are illegal to use in most countries but still cheap and easy to buy.

**Spoofing** is more sophisticated: an attacker broadcasts a stronger, fake version of the constellation to convince a receiver it’s somewhere it isn’t. In June 2017, ships near Novorossiysk in the Black Sea reported GPS positions at an inland airport, a textbook spoofing pattern; a 2019 report by the research group C4ADS linked many such incidents to Russian state activity. Modern receivers push back by cross-checking signals across multiple GNSS constellations (a Galileo signal disagreeing with a GPS signal is a strong red flag) and by watching for unrealistic position jumps.

## RTK and centimetre-level accuracy

A phone’s few metres of accuracy is nowhere near enough for surveying, agriculture, and drone work. The technique called **Real-Time Kinematic (RTK)** closes the gap to centimetres using a fixed base station at a precisely surveyed point.

The base station knows its own coordinates exactly. It receives the same GPS signals you do, calculates what its position would _appear_ to be based on those signals alone, and broadcasts the difference — a correction — to nearby rover receivers in real time. Your moving receiver applies the correction and ends up accurate to a centimetre or two.

Network RTK extends this by combining corrections from dozens of base stations across a region. A self-driving tractor in Nebraska can pull corrections from a state-wide network and stay within 2 cm of a target row for kilometres. Phones are not RTK receivers, but they are getting closer: many recent models receive both L1 and L5 signals, which helps in cities, and Android has let apps read raw satellite measurements since Android 7, so specialist apps can apply their own corrections.

## Where GPS quietly runs the world

The obvious uses — navigation, fitness tracking, geocaching — are only the visible tip. GPS underpins infrastructure most people never think about:

-   **Time synchronisation.** Cell towers, electrical grids, and stock exchanges sync their clocks against GPS to nanosecond precision. A GPS outage doesn’t just break maps — it can drop calls and halt trading.
-   **Precision agriculture.** A modern tractor drives itself in perfectly straight rows for kilometres, dropping fertilizer and seed based on per-square-meter soil data collected previously.
-   **Aviation.** LPV approaches use GPS with WAAS corrections for low-visibility landings at airports without ground-based ILS equipment.
-   **Emergency calls.** In countries that support Advanced Mobile Location, the phone sends its position to the dispatcher automatically when you dial (see [GPS coordinates in an emergency](https://getmylocations.com/blog/gps-coordinates-emergencies-aml-guide)).
-   **Tectonic monitoring.** Permanent GPS stations measure the millimetres-per-year motion of tectonic plates and the strain building on faults.
-   **Asset tracking.** Shipping containers, rental scooters, stolen-bike trackers — all cheap GPS modules with cellular backhaul.

## Battery cost, and how the OS hides it

Running the GPS receiver continuously costs real battery. Modern operating systems keep that cost down: instead of running GPS at full duty cycle, they fall back to Wi-Fi and cell positioning while you’re stationary, sample GPS in short bursts as you walk, and only run it continuously during active turn-by-turn navigation.

Older Android versions made you choose between “high accuracy”, “battery saving” and “device only” modes. Current Android replaced them with a single _Google Location Accuracy_ switch, which adds Wi-Fi and mobile-network positioning to GPS; turning it off leaves the satellites alone, which is slower to lock on and weaker indoors.

## Indoors is a different problem entirely

GPS doesn’t work indoors — the satellite signal is too weak to penetrate roofs. Indoor positioning systems fill the gap with completely different technology: Bluetooth beacons, Wi-Fi round-trip-time measurements, ultra-wideband chips, visual SLAM using the phone’s camera. Airports and shopping malls deploy these for indoor maps, and where they are installed they can place you to within a few metres. None of it involves GPS at all, even though most apps blur the distinction in their UI.

## What’s coming next

GPS itself is mid-modernisation. The new GPS III satellites broadcast a civilian signal called L1C designed to interoperate with Galileo and BeiDou, letting multi-constellation receivers combine signals more efficiently. Galileo is rolling out a free High Accuracy Service that broadcasts corrections worldwide, aiming for about 20 cm without a local base station, for receivers built to use it (most phones are not yet).

In parallel, a new generation of LEO PNT (Low-Earth-Orbit Position, Navigation, Timing) services are arriving, such as STL, which uses the Iridium satellites, and several commercial start-ups. LEO signals are much stronger than MEO-orbit GPS signals and much harder to jam, which is why aviation and defence are paying close attention.

## See what your chip is reporting right now

Open the [My Location](https://getmylocations.com/my-location) tool on a phone outdoors. The accuracy radius on the dashboard is the device’s own estimate: the circle it is 95% sure you are inside. If you’ve never paid attention to it before, walk from a sheltered spot to open sky and watch the number drop. That’s the constellation locking on satellites in real time, in front of you. To watch the fix update continuously as you walk, try the [live location tracker](https://getmylocations.com/live-location). The coordinate the tool gives you is in decimal degrees — if you need DMS or UTM for a chart or a survey report, the [Coordinates Converter](https://getmylocations.com/coordinates-converter) handles the translation.

If the dot lands in the wrong city rather than a few metres off, the device has fallen back to your IP address; see [GPS vs IP accuracy](https://getmylocations.com/gps-vs-ip-accuracy). If it lands on the wrong street, the address database is often to blame; see [why maps show the wrong street](https://getmylocations.com/blog/why-maps-show-wrong-street). And to measure distances on the Earth’s real shape, see [haversine vs Vincenty](https://getmylocations.com/blog/haversine-vs-vincenty).

For the practical side — ten real-world uses for the coordinates your chip produces — see [Ten uses for GPS coordinates](https://getmylocations.com/blog/10-uses-for-gps-coordinates). For a quick refresher on what latitude and longitude actually mean and how to read them, start with [Latitude vs longitude explained](https://getmylocations.com/blog/latitude-vs-longitude-explained). And for step-by-step instructions to read your coordinates on any device, there’s [How to find your GPS coordinates](https://getmylocations.com/blog/how-to-find-your-gps-coordinates).

Sponsored

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).

[← Back to all posts](https://getmylocations.com/blog)
