---
title: "How GPS Works: From Satellites to Your Phone"
description: "A clear, no-buzzword walkthrough of how satellites 20,000 km overhead let your phone know exactly where you are — and what can go wrong."
url: https://getmylocations.com/blog/how-gps-works
---

# How GPS Works: From Satellites to Your Phone

A

Ahmed Anwar

May 10, 2026·9 min read

-   gps
-   satellites
-   technology

* * *

![GPS satellites orbiting Earth with signal lines beaming down toward the planet](https://getmylocations.com/blog-images/how-gps-works-hero.jpg)

The signal a GPS satellite sends to your phone, by the time it arrives, is about as faint as a 25-watt light bulb seen from 20,000 km away. That fact is the source of most of GPS’s properties — why it doesn’t work indoors, why it takes a few seconds to lock on, why it’s easy to jam, why the chip needs an antenna with a clear view of the sky. The receiver is doing a remarkable amount of work to extract a coordinate from a signal that weak, on hardware that costs less than a cup of coffee.

This article is the version of “how GPS works” I wish I’d had when I started building location tooling: not too deep into the physics, but specific enough to predict when you’ll get a 3-meter fix, when you’ll get nothing, and why.

Trilateration: each satellite tells your phone where it is and what time it is. The time difference reveals distance; three distances narrow your position to one point. A fourth satellite resolves clock error.

## The system, end to end

GPS (Global Positioning System) is owned and operated by the US Space Force, free to use for anyone on Earth. It has three parts:

1.  **The space segment** — about 31 active satellites in MEO orbit at ~20,200 km altitude.
2.  **The control segment** — ground stations that track the satellites and correct their orbits and clocks.
3.  **The user segment** — anything with a GPS receiver: your phone, a car dashboard, a hiking watch, a tractor, a cruise missile.

Each satellite continuously broadcasts: “I am satellite 17. My current orbital position is X, Y, Z. The exact time right now is T.” The receiver’s job is to pick up enough of these broadcasts to triangulate where it must be sitting.

## Catching the signal

GPS satellites transmit on two civilian frequencies (L1 at 1575.42 MHz and L5 at 1176.45 MHz; L2 carries an encrypted military signal). At ground level the broadcast is the 25-watt-bulb-at-20,000-km I opened the article with — which is why GPS struggles indoors, under heavy tree cover, or in deep urban canyons.

For a usable position the chip typically needs to hear at least **four satellites**. Modern multi-constellation phones routinely see 20+ simultaneously, which is the main reason time-to-first-fix has dropped from “a minute” on old units to “a second or two” on current ones.

## The clock trick that does most of the work

The distance from your phone to a satellite comes from one measurement: the satellite tells you when the signal was sent; your phone records when it arrived; multiply the time difference by the speed of light (~300,000 km/s); that’s your distance to that satellite.

The hard part is that the speed of light is so fast that a 1-microsecond clock error puts you off by 300 meters. Every satellite carries an **atomic clock** accurate to nanoseconds for exactly this reason — and the math your phone runs has to account for the fact that its own quartz clock is wildly imprecise by comparison.

## Trilateration, not triangulation

With distance from one satellite, you’re somewhere on the surface of a giant sphere centred on it. With two, you’re on the circle where two spheres intersect. With three, the circle shrinks to two possible points (one in space, one on Earth). With four, all uncertainty collapses to a single 3D position: your latitude, longitude, and altitude.

This is **trilateration**, not triangulation — triangulation involves measuring angles, which GPS doesn’t do. The fourth satellite has a bonus job: by demanding that all four distance measurements agree on one consistent answer, the math also derives your phone’s exact time as a side product. This is why GPS is also the backbone time-sync source for cell towers, electrical grids, and financial markets — not for the position, for the nanosecond-accurate time.

## What actually wrecks GPS accuracy

In ideal conditions, civilian GPS is accurate to about **3–5 meters**. Several real-world factors chip away at that:

-   **Atmospheric delay.** The ionosphere and troposphere slow the signal slightly. Receivers compensate with models, but it’s never perfect.
-   **Multipath.** Signals bounce off buildings before reaching you, arriving later than the direct path. This is why GPS gets weird in dense downtowns — the blue dot jumping back and forth across a street is multipath in action.
-   **Satellite geometry.** If all visible satellites are clustered in one corner of the sky, the math is geometrically unstable. Serious receivers report this as the “DOP” (dilution of precision) number.
-   **Obstructions.** Concrete, foliage, tunnels — all kill the already-weak signal.

## Your phone isn’t using just GPS

Modern smartphones use a hybrid: **A-GPS** (assisted GPS, where the almanac comes in over cellular data instead of being decoded slowly from the satellite signal) on top of **GNSS** (Global Navigation Satellite Systems generally):

-   **GPS (USA)** — the original.
-   **GLONASS (Russia)** — same idea, different constellation.
-   **Galileo (EU)** — newer, generally the most accurate of the four.
-   **BeiDou (China)** — newest, growing fast.
-   **QZSS (Japan)** — augments coverage over Asia.

Your phone listens to all of them simultaneously. On top of GNSS, it also pulls Wi-Fi triangulation (matching visible Wi-Fi networks against Google’s database), cell-tower triangulation, and IMU sensors (accelerometers and gyroscopes) to keep position updated even when satellites are temporarily blocked. The combination is what makes a modern phone’s blue dot feel almost magical compared to a 2010-era standalone GPS unit.

## Why your phone locks faster than your old car GPS did

Old standalone receivers had to download the full satellite almanac (the schedule of where each satellite is and when) over the radio link itself — 30 seconds to several minutes depending on conditions. Modern phones download the same almanac over cellular data in milliseconds. That’s the “Assisted” in A-GPS, and it’s the main reason first-fix on a smartphone feels instant.

## Can GPS be jammed or spoofed?

Yes to both, and the cases are worth knowing.

**Jamming** just drowns the satellite signal in noise on the same frequency. Because the original signal is so weak, a small jammer can take out a meaningful radius. A canonical case: in 2009, a contractor near Newark Airport was plugging a $30 in-cab jammer into his cigarette lighter every morning to defeat his employer’s fleet tracking. He repeatedly knocked out the airport’s Smart Landing System until the FAA narrowed the source down through weeks of triangulation. Civilian jammers are illegal in most countries but still cheap and common.

**Spoofing** is more sophisticated: an attacker broadcasts a stronger, fake version of the constellation to convince a receiver it’s somewhere it isn’t. Ships in the Black Sea have repeatedly reported false GPS positions placing them on dry land at airports — textbook spoofing patterns from a state actor. Modern receivers push back by cross-checking signals across multiple GNSS constellations (a Galileo signal disagreeing with a GPS signal is a strong red flag) and by watching for unrealistic position jumps.

## RTK and centimetre-level accuracy

Consumer GPS hovers around 3–5 meters. For surveying, agriculture, and drone work, that’s nowhere near enough. The technique called **Real-Time Kinematic (RTK)** closes the gap to centimetres using a fixed base station at a precisely surveyed point.

The base station knows its own coordinates exactly. It receives the same GPS signals you do, calculates what its position would _appear_ to be based on those signals alone, and broadcasts the difference — a correction — to nearby rover receivers in real time. Your moving receiver applies the correction and ends up with sub-centimetre accuracy.

Network RTK extends this by combining corrections from dozens of base stations across a region. A self-driving tractor in Nebraska can pull corrections from a state-wide network and stay within 2 cm of a target row for kilometres. The high-end iPhones with the U1 chip don’t do full RTK, but they include enough hardware that compatible apps can pull network corrections for sub-meter accuracy in supported regions.

## Where GPS quietly runs the world

The obvious uses — navigation, fitness tracking, geocaching — are only the visible tip. GPS underpins infrastructure most people never think about:

-   **Time synchronisation.** Cell towers, electrical grids, and stock exchanges sync their clocks against GPS to nanosecond precision. A GPS outage doesn’t just break maps — it can drop calls and halt trading.
-   **Precision agriculture.** A modern tractor drives itself in perfectly straight rows for kilometres, dropping fertilizer and seed based on per-square-meter soil data collected previously.
-   **Aviation.** The LPV approach procedure uses GPS for low-visibility landings at small airports that can’t afford ground-based ILS infrastructure.
-   **Search and rescue.** Advanced Mobile Location sends the caller’s GPS to dispatchers automatically when they dial 112 or 911.
-   **Tectonic monitoring.** Permanent GPS receivers on faults detect the millimetre-per-year motion that precedes major earthquakes.
-   **Asset tracking.** Shipping containers, rental scooters, stolen-bike trackers — all cheap GPS modules with cellular backhaul.

## Battery cost, and how the OS hides it

A GPS receiver running continuously can chew through ~25% of a phone battery in a day. Modern OSes hide this by being smart: instead of running GPS at full duty cycle, they fall back to Wi-Fi and cell positioning while you’re stationary, sample GPS in short bursts as you walk, and only run it continuously during active turn-by-turn navigation.

The “high accuracy” / “battery saving” / “device only” toggles in location settings really mean: _use everything including cloud-assisted Wi-Fi positioning_, _use only Wi-Fi and cell_, or _use only the GPS chip_. The first is most accurate and uses moderate battery; the second is fastest but coarsest; the third is most private but slowest to lock on.

## Indoors is a different problem entirely

GPS doesn’t work indoors — the satellite signal is too weak to penetrate roofs. Indoor positioning systems fill the gap with completely different technology: Bluetooth beacons, Wi-Fi round-trip-time measurements, ultra-wideband chips, visual SLAM using the phone’s camera. Airports and shopping malls deploy these for indoor mapping; accuracy is usually in the 1–3 meter range. None of it involves GPS at all, even though most apps blur the distinction in their UI.

## What’s coming next

GPS itself is mid-modernisation. The new GPS III satellites broadcast a civilian signal called L1C designed to interoperate with Galileo and BeiDou, letting multi-constellation receivers combine signals more efficiently. Galileo is rolling out a free High Accuracy Service that pushes corrections globally and brings ~20 cm accuracy to consumer devices without needing a local RTK base station.

In parallel, a new generation of LEO PNT (Low-Earth-Orbit Position, Navigation, Timing) constellations are launching — Iridium’s STL service and several SpaceX-adjacent projects. LEO signals are much stronger than MEO-orbit GPS signals and much harder to jam, which is why aviation and defence are paying close attention.

## See what your chip is reporting right now

Open the [My Location](https://getmylocations.com/my-location) tool on a phone outdoors. The accuracy radius on the dashboard is your real-time DOP estimate translated into meters. If you’ve never paid attention to it before, walk from a sheltered spot to open sky and watch the number drop. That’s the constellation locking on satellites in real time, in front of you. To watch the fix update continuously as you walk, try the [live tracker](https://getmylocations.com/live-location). The coordinate the tool gives you is in decimal degrees — if you need DMS or UTM for a chart or a survey report, the [Coordinates Converter](https://getmylocations.com/coordinates-converter) handles the translation.

For the practical side — ten real-world uses for the coordinates your chip produces — see [Ten uses for GPS coordinates](https://getmylocations.com/blog/10-uses-for-gps-coordinates). For a quick refresher on what latitude and longitude actually mean and how to read them, start with [Latitude vs longitude explained](https://getmylocations.com/blog/latitude-vs-longitude-explained). And for step-by-step instructions to read your coordinates on any device, there’s [How to find your GPS coordinates](https://getmylocations.com/blog/how-to-find-your-gps-coordinates).

AA

Written by

### Ahmed Anwar

Independent web developer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).

[← Back to all posts](https://getmylocations.com/blog)
