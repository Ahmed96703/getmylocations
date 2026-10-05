---
title: "What Is IP Location, and How Accurate Is It Really?"
description: "IP location gets the country right 99.8% of the time but often misses the city. The real accuracy figures, and why mobile networks and VPNs break it."
url: https://getmylocations.com/blog/what-is-ip-location-and-how-accurate
---

# What Is IP Location, and How Accurate Is It Really?

A

Ahmed Anwar

May 12, 2026·Updated October 5, 2026·10 min read

-   ip
-   geolocation
-   privacy

* * *

![Minimalist globe outline with continents in soft slate and teal, suggesting global IP geolocation coverage](https://getmylocations.com/blog-images/what-is-ip-location-and-how-accurate-hero.jpg)

IP location is the city, region, and country a database associates with your internet address, and it is far less precise than most people assume. MaxMind, one of the largest providers, puts its own country-level accuracy at 99.8%, but for US addresses only about 66% of city guesses land within 50 km of the right place, and mobile networks are usually worse. This gap — very accurate at the country level, fairly bad at the city level — explains almost every “why does the website think I’m in a different city?” story you’ve ever heard.

The country is almost always right; a street address is never available. Most “wrong city” complaints fall into the gap between the two. Figures are MaxMind’s own estimates; other providers publish different ones.

## What an IP actually is

An IP (Internet Protocol) address is the number every device gets when it connects to the internet, so that responses can find their way back. Two formats are in widespread use:

-   **IPv4** — four numbers separated by dots, e.g. `142.250.190.78`
-   **IPv6** — eight blocks of hex digits, e.g. `2001:0db8:85a3::8a2e:0370:7334`

IP addresses aren’t random. Your ISP draws them from a block it owns, and those blocks are registered to specific geographic regions. That registration is the seed of every geolocation database in the world.

## How the databases are actually built

A handful of companies dominate IP geolocation — MaxMind, IPinfo, IP2Location, BigDataCloud, among others — and each keeps its database current from broadly the same raw inputs:

1.  **Regional Internet Registry records** — RIPE, ARIN, APNIC, etc. publish which ISPs own which IP ranges.
2.  **BGP routing snapshots** — which network operator announces which prefix on which backbone.
3.  **Reverse-DNS PTR records** — which sometimes encode a city or point-of-presence name.
4.  **Latency probes** — servers around the world ping the IP; the response time helps narrow which city it’s near.
5.  **Device-reported locations** — apps and services that see both an IP address and a GPS or Wi-Fi position can tag that IP with a real place.
6.  **User corrections** — when someone reports “my location is wrong,” the database updates.

Updates propagate unevenly. A new IP block allocated to a Pakistani ISP last week may be correct in BigDataCloud’s daily refresh but show up as “unknown” in a six-month-old free dataset. This is why ad networks and fraud teams pay for premium feeds. The IP Location tool on this site uses ipapi.co’s free lookup service, so its answers are only as current as that provider’s data.

## The accuracy numbers, in order of how often they’re right

-   **Country level:** 99.8% (MaxMind). The one thing IP geolocation reliably does well.
-   **Region or state:** about 80% for US addresses (MaxMind); usually lower in countries with less data.
-   **City:** about 66% of US addresses land within 50 km of the right city (MaxMind), often pointing to a different city in the same metro area.
-   **Street:** essentially impossible from IP alone. Best the public databases get you is a 5–50 km radius.

The easiest way to feel the difference is to open the [IP Location tool](https://getmylocations.com/ip-location) — it shows the city your IP resolves to without asking for a GPS permission — and then compare against the [My Location tool](https://getmylocations.com/my-location), which uses GPS. You will often see the two readings kilometres apart, and that gap is the IP error in a single screenshot.

## Why the city is wrong so often

A handful of recurring scenarios throw IP geolocation off, and between them they cover most of the failures:

-   **VPNs.** Your visible IP belongs to the provider’s server. Use a Tokyo VPN and IP databases swear you’re in Tokyo.
-   **Carrier-grade NAT on mobile.** Cellular networks pool thousands of subscribers behind a single IP, often anchored to a city far from yours.
-   **Corporate or school networks.** Traffic might exit via a single data centre hundreds of kilometres away.
-   **Tor or proxy chains.** Apparent IP could be anywhere.
-   **Stale database entries.** ISPs reassign IP blocks; if the database hasn’t caught up, you’re reported wherever the previous owner was.

## IP versus GPS — the numbers side-by-side

| Property | IP Location | GPS |
| --- | --- | --- |
| Typical accuracy | 5–50 km | 3–5 m |
| Works offline | No | Yes |
| Indoor performance | Same as outdoor | Degraded |
| Permission needed | No (visible by default) | Yes |
| Defeated by VPN | Yes | No |

## What IP geolocation is actually useful for

Despite the imprecision, IP geolocation earns its keep in a few specific jobs:

-   **Country-level licensing.** Netflix, Spotify, and BBC iPlayer use it to enforce regional rights.
-   **Default language and currency.** E-commerce sites guess your preferred locale on first load.
-   **Fraud detection.** A payment from an IP in Lagos using a card billed in Toronto looks suspicious.
-   **Coarse advertising.** “Find a plumber near you” ads.
-   **Server log analysis.** Understanding which countries traffic comes from.

## CGNAT, IPv6, and why mobile is the hardest case

The world ran out of unassigned IPv4 addresses in 2011 (APNIC, the Asia-Pacific registry, exhausted first). ISPs respond with **Carrier-Grade NAT**: multiple subscribers share a single public IPv4, distinguished only by port number. From the outside, hundreds of households in a neighbourhood can all look like the same IP. For geolocation this is mostly tolerable — the shared IP still maps to roughly the same area — but for any service that needs to reach back into your network (a game server, a VoIP call, remote desktop), CGNAT is a permanent headache.

Mobile carriers are the worst case for geolocation specifically. Cellular traffic is back-hauled to a small number of gateways before exiting to the public internet. Your IP almost always resolves to whichever city houses the gateway your traffic passes through — not where you’re actually standing. Reliance Jio users in eastern India often geolocate to Mumbai; Verizon LTE traffic across the US northeast often geolocates to a single Pennsylvania facility. If a service desperately needs your real location and you’re on cellular, IP is essentially useless — only GPS will get them what they need.

IPv6 solves the address shortage with a space large enough to give every grain of sand on Earth its own address. Adoption is uneven — about 45% of Google traffic worldwide was over IPv6 in 2025 — but rising. IPv6 geolocation tends to be a bit more honest because there’s no incentive to share addresses across many subscribers.

## CDNs muddy the picture even more

When you visit a popular site, the IP your browser connects to usually belongs to a Content Delivery Network (Cloudflare, Akamai, Fastly), not to the actual application server. CDNs route you to whichever data centre is closest. This is exactly the latency-aware routing that makes the modern web fast, but it means a single hostname can resolve to dozens of IPs around the world depending on where you are.

Server-side IP geolocation can lie in either direction as a result. A data centre in Frankfurt serves users all across Europe; databases tagged with the data centre’s coordinates report all those users as German. The opposite — many users in one city served from a far-away data centre — happens too when smaller CDNs lack regional presence.

## What an IP genuinely reveals about you

Every website you visit sees your IP — there’s no getting around that, somebody has to know where to send the response. What an IP _does_ give away in 2026:

-   Your country, and with some luck your city.
-   Your ISP or mobile carrier.
-   Whether you’re on a VPN, Tor exit, or known proxy.
-   Approximately when you connected.

What it doesn’t: your name, your street address, your identity. To get those, an investigator needs a legal subpoena served on your ISP. If you read a news story about somebody being “tracked through their IP,” there is almost always a court order somewhere in the middle of the story.

## How to check your own IP location right now

Treat the next two readings as a sample of what every website you visit sees by default. Open the [IP Location tool](https://getmylocations.com/ip-location) first — it queries an IP database with your visible address and reports the city, country, ISP, and whether you appear to be behind a VPN or proxy. Note how confident the page is and what it gets wrong about you.

Then open the [My Location tool](https://getmylocations.com/my-location) and allow the GPS prompt. The accuracy radius typically drops from kilometres to single metres in front of your eyes. That A/B is the fastest way to internalise the difference between the two systems. For an even deeper side-by-side of where each one wins and loses, our [GPS vs IP accuracy guide](https://getmylocations.com/gps-vs-ip-accuracy) breaks it down by use case.

## How to change or hide your IP location

Because IP geolocation is read straight off your visible IP address, anything that changes the IP also changes the location. The four practical options, ranked by how reliably they shift you to a chosen place:

-   **Reputable paid VPN.** Pick an exit server in the city you want websites to see, connect, and the visible IP becomes one from that range. Free VPNs work but are heavily blocked and often log your traffic.
-   **Tor Browser.** Routes traffic through three relays before exiting; your apparent IP is the last relay, which can be anywhere. The strongest privacy posture, but slow, and a growing list of sites refuse Tor exit IPs.
-   **Switching to mobile data.** Cellular puts you behind Carrier-Grade NAT, often anchored to a city far from yours. A simple way to move your apparent location by tens of kilometres without any extra software, though you can’t choose the destination.
-   **A friend’s hotspot in another city.** Tethering through someone else’s mobile carrier or home broadband gives you their IP. Good for testing what a website looks like in another region; useless for hiding from a determined adversary, since the new IP is just a different identifiable account.

Important caveat: none of these hide your _real_ location from a website that uses [browser geolocation](https://getmylocations.com/blog/browser-geolocation-api-explained) with your permission. The geolocation API reads your GPS or Wi-Fi position from the operating system, not your IP, so a VPN does nothing to it. If you want to be invisible at the location level, decline the GPS prompt as well.

## When IP geolocation is the right tool — and when it isn’t

Pick the right tool for the question. IP geolocation excels at the jobs where a city-level guess is enough and the work has to scale to millions of requests with zero permission prompts:

-   Country-level licensing and regional pricing
-   Default-language detection on first page load
-   Fraud signals (an IP from one country, a card billed in another)
-   Server-log analysis and traffic reporting
-   Coarse local-ad targeting (“plumber near you”)

Where IP geolocation is the wrong tool — and where I see people repeatedly mis-deploy it:

-   Driving directions or any nearby-search that needs street precision
-   Emergency dispatch (covered in our [emergency GPS coordinates guide](https://getmylocations.com/blog/gps-coordinates-emergencies-aml-guide))
-   Compliance with strict regional rules (eg. age-gating in a single state)
-   Anything where being wrong by 50 km would actually hurt the user

For those jobs, GPS or another sensor-based reading is the only safe choice. Our [IP location lookup guide](https://getmylocations.com/ip-location) goes further into the API and database choices if you’re implementing IP geolocation in software yourself.

## Frequently asked questions

How accurate is IP geolocation, really?+

MaxMind, one of the largest IP database providers, estimates 99.8% accuracy at the country level; for US addresses, about 80% at the state level and 66% for the city, where correct means within 50 km. Accuracy varies widely by country and is usually worse on mobile networks. Street level from an IP alone is essentially impossible.

How can I check my own IP location?+

Open any IP-lookup tool — our own IP Location page returns your apparent IP, the database city and country, the ISP, and whether you appear to be behind a VPN or proxy. Treat what it shows as a sample of what every website you visit sees by default. The reading is wrong roughly a quarter of the time on residential broadband and much more on cellular.

Why does the website think I am in a different city than I actually am?+

Five usual suspects: a VPN whose exit server is in another city, cellular Carrier-Grade NAT routing your traffic through a far-away gateway, a corporate or school network exiting via a distant data centre, a CDN cache reporting its own location rather than yours, or a stale database entry that has not caught up with an ISP reassignment.

How do I change or hide my IP location?+

A reputable paid VPN is the easiest answer — pick an exit server in the city you want websites to see, connect, and your apparent IP changes to one in that range. Tor anonymises more aggressively but is slow and many sites block it. Mobile data from a different carrier or a hotspot from a friend in another city also changes your IP. Switching off Wi-Fi for cellular on a phone often moves your apparent city by tens of kilometres because of how CGNAT gateways work.

Can someone find my exact address from my IP address?+

No — not without legal process. An IP reveals your country, usually your city, your ISP, and whether you are on a VPN or proxy. It does not reveal your name, your street, or your identity. Tying an IP to a specific human requires a subpoena served on the ISP that owns the block. News stories about people being "tracked through their IP" almost always have a court order hidden somewhere in the middle.

Is IP location better than GPS for finding where I am?+

No — they are not comparable. GPS gives you 3 to 5 metres of accuracy outdoors. IP gives you 5 to 50 kilometres in the best case. IP is the right tool for country-level licensing, fraud detection, and rough localisation; GPS is the right tool for "where am I, exactly?" If you want a single coordinate you can copy into a map, use a browser geolocation tool instead of an IP lookup.

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).

[← Back to all posts](https://getmylocations.com/blog)
