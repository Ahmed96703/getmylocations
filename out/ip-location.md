---
title: "IP Location Lookup — Find Any IP's City and ISP (Free)"
description: "Find any IP's city, country, ISP and approximate location in two seconds. Plus how IP geolocation works and why the city is often wrong."
url: https://getmylocations.com/ip-location
---

Complete Guide

# IP location lookup — what your public IP reveals, and what it doesn't

Every device on the public internet has an IP address. That address quietly leaks a surprising amount about you — your approximate city, your internet provider, the kind of connection you're on — but also _less_ than most people assume. This guide explains exactly what an IP lookup can and can't tell, how to find your own public IP, how IP-based geolocation actually works under the hood, and what to do when the city it reports is wrong.

## Lookup an IP address

* * *

## What is a public IP address?

A public IP address is the number your internet provider hands out to your home router, office network, or mobile hotspot so the rest of the internet can route packets back to you. It looks like `203.0.113.42` for the older IPv4 system or like `2001:db8::1` for the newer IPv6 system. Most home connections still get IPv4, often shared with dozens of other customers via Carrier-Grade NAT; many mobile networks have moved to IPv6.

Crucially, your **private** IP (something like `192.168.1.5`) is completely separate. That's the address your router gives your laptop or phone on your local Wi-Fi. The outside world never sees it — only your public IP is visible to websites.

* * *

## How to find your public IP — three ways

### 1\. Use a browser tool

Easiest by far. Tap the button on the tool above and the IP, ISP, and database-guessed city appear in the dashboard panel. The dedicated IP Location tool does the same thing in a tighter standalone widget. You don't need to grant any permission — the page just reads the IP visible to the server when your browser connected.

### 2\. Ask your router

Open your router's admin page (usually `192.168.1.1` or `192.168.0.1`) in a browser. The WAN or Internet section shows the IP your ISP has assigned. This is the ground-truth source — if it disagrees with a website's reading, you're probably behind a VPN or proxy.

### 3\. Command line

On macOS or Linux, run `curl ifconfig.me` or `curl ipinfo.io/ip`. On Windows, use PowerShell: `(Invoke-WebRequest ifconfig.me).Content`. The answer is your current public IP, fetched directly.

* * *

## How IP geolocation actually works

When a website turns your IP into “Lahore, Pakistan” or “Mumbai, India”, it isn't reading anything from your computer. It's looking up the IP in a database. The database itself is built by companies like MaxMind, IPinfo, IP2Location, and BigDataCloud from several signals:

-   **ARIN/RIPE/APNIC registration records.** When an ISP buys a block of IP addresses, they register it with the regional internet registry along with the country it operates in. This gives a country-level fix essentially for free.
-   **BGP routing data.** The way IP traffic is announced across the internet backbone reveals which network operator handles which block, and roughly where their peering points are.
-   **Reverse DNS hints.** An IP's PTR record often encodes the city or POP (point of presence). A hostname like `karachi-pool-3.isp.pk` is a fairly strong signal.
-   **Latency-based triangulation.** Some providers ping known servers from an unknown IP and use response times to narrow the geographic possibilities.
-   **Crowd-sourced ground truth.** When a mobile app with GPS access also sees an IP, it can tag that IP with a real coordinate. Millions of these readings train the database.

The lookup itself is cheap to run, but the answer is inherently fuzzy. Country-level accuracy is usually better than 99%; city-level accuracy is often only 50–80%, and street-level accuracy is essentially impossible from IP alone. For why this matters, see our [deep dive on IP location accuracy](https://getmylocations.com/blog/what-is-ip-location-and-how-accurate).

* * *

## What your IP tells someone (and what it doesn't)

### What it usually reveals

-   Your country (almost always correct).
-   Your region or state (often correct).
-   The internet service provider (ISP) that owns your IP block.
-   Whether you're on residential broadband, mobile data, a hosting provider, or a known VPN exit node.
-   An approximate city, accurate to ~25 km on a good day.

### What it does NOT reveal

-   Your street address — despite what films suggest.
-   Your name — the ISP knows it, but a public IP lookup doesn't.
-   The brand of device you're using.
-   Your exact GPS coordinates — those would have to come from a browser geolocation grant, not the IP.

* * *

## Track your IP — why it changes

If you check your public IP today and again next week, it may have changed entirely. Reasons:

-   **Dynamic ISP leases.** Most residential ISPs hand out IPs with a lease time of hours to days. When the lease ends, you may get a different IP from the same pool. Restarting the modem usually forces this.
-   **Mobile network re-anchoring.** Switching between LTE and 5G, or between cell towers, can move you to a different carrier gateway and a different public IP.
-   **CGNAT (Carrier-Grade NAT).** Multiple subscribers may share a single IPv4 with different port ranges. Your visible IP changes every time the carrier's NAT table rotates.
-   **Wi-Fi vs cellular.** Same device, completely different IP depending on which network it's on.

If you need a stable IP — for remote access, whitelisting, or running a small server — most ISPs offer a static IP as a paid add-on. Otherwise, dynamic DNS services like DuckDNS or No-IP can point a hostname at whatever your current IP is.

* * *

## IPv4 lookup vs IPv6

IPv4 addresses (32 bits, 4.3 billion possible values) ran out years ago. New deployments increasingly use IPv6 (128 bits, basically infinite). Both can be looked up the same way and both leak similar information, but a few practical differences are worth knowing:

-   **IPv6 is often more honest.** Many CGNAT setups only proxy IPv4. If you visit an IPv6-capable site over IPv6, the address you see is more likely your device's actual prefix, not a carrier pool.
-   **Dual-stack confusion.** Most modern devices have both. The IP that gets used depends on which the destination site supports and which the local DNS resolves first. Geolocation may disagree between the two stacks.
-   **Privacy extensions.** IPv6 supports temporary addresses (RFC 4941) that rotate every few hours to avoid tracking. Older IPv6 hosts derived the last 64 bits from the network card's MAC, which was a privacy disaster — modern systems avoid this by default.

* * *

## Internet provider (ISP) lookup

The ISP that owns your IP is in the same database as the location. Looking it up tells you whether you're on a residential connection (Comcast, BT, Jazz), a mobile carrier (T-Mobile, Reliance Jio), a corporate network, a hosting provider (AWS, Azure, Hetzner), or a known VPN. Marketing platforms, fraud-detection systems, and ad networks use this to score traffic quality — a hit from a data-center IP is treated very differently from a hit from a residential subscriber.

You can sanity-check the answer yourself by running `whois` against your IP in a terminal. The `OrgName` or `netname` field is the ISP that registered the IP block.

* * *

## When the city is wrong

Seeing the wrong city in an IP lookup is extremely common and almost never your fault. The usual causes:

-   **You're on a VPN.** The IP you appear to be on belongs to the VPN's exit server. That's the entire point of a VPN.
-   **You're on a corporate network.** Your traffic exits through the company's head office. The IP looks like it's there.
-   **You're on a mobile carrier.** Mobile traffic is often back-hauled to the carrier's regional aggregation. Your IP can geolocate hundreds of miles from where you're sitting.
-   **The database is stale.** ISPs reassign IP blocks. Databases catch up slowly — sometimes months.

The fix, if you need accurate location, is to grant GPS-level browser geolocation instead of relying on IP. Step-by-step browser fixes are in our [troubleshooting guide](https://getmylocations.com/fix-location-not-working).

* * *

## Privacy considerations

Every website you visit can see your IP — that's required for the connection to work. What they do with it varies. GetMyLocations doesn't log your IP for analytics, but our hosting provider (Cloudflare) keeps short-lived request logs for abuse prevention, and our third-party services (reverse geocoding, advertising) may process your IP for their own purposes. The full breakdown is in our [Privacy Policy](https://getmylocations.com/privacy-policy).

If you want to limit what an IP lookup reveals, the standard tools are a reputable consumer VPN (Mullvad, IVPN, ProtonVPN), the Tor browser for stronger anonymity, or simply visiting from a different network. None of these are bulletproof — they all leak in different ways — but they substantially raise the cost of tracking.

* * *

## Frequently asked questions

How do I look up my own IP location?+

Tap the "Lookup my IP" button on the tool above. Within a second or two the page returns your public IP (IPv4 or IPv6), the database-guessed city and country, the ISP that owns the IP block, and whether you appear to be on a residential, mobile, hosting, or VPN connection. No permission prompt — IP geolocation reads only what your browser already sent on the network connection.

How do I look up someone else's IP location?+

Paste the IP address into the input field on the tool above and the lookup runs against that IP instead of yours. The same fields come back: city, country, ISP, connection type. Important caveat: an IP reveals at most a city and an ISP — never a street address, never a name. Anything more requires legal process served on the ISP.

How accurate is IP geolocation?+

Country level: 95–99% accurate. Region or state: 80–90%. City level: only 50–75%, and often off by tens of kilometres. Street level: essentially zero — the best you can squeeze out of a public database is a 5–50 km radius. Mobile traffic is the worst case because cellular Carrier-Grade NAT routes thousands of subscribers through a single regional gateway.

Why is the city it shows wrong?+

Five common causes: (1) a VPN is rewriting your IP to its exit-server location, (2) cellular CGNAT is routing you through a far-away gateway, (3) a corporate or school network exits via a distant office, (4) the database is stale and has not caught up with an ISP block reassignment, or (5) you are connecting through a CDN that reports its own location. Disconnect any VPN, switch from cellular to Wi-Fi, and re-run the lookup.

What is the difference between IP geolocation and GPS?+

IP geolocation reads your visible IP and looks it up in a database — accuracy 5–50 km, no permission prompt, defeated by VPN. GPS reads satellite signals directly through your device — accuracy 3–5 m outdoors, requires browser permission, unaffected by VPN. They are complementary, not interchangeable. For "what country is this user in?" IP is fine; for "where exactly is this user standing?" GPS is the only option.

Can someone find my home address from my IP?+

No — not without a court order. A public IP lookup reveals your country, usually your city, your ISP, and whether you are on a VPN or proxy. It does not reveal your name or street. Tying an IP to a specific human address requires a subpoena served on the ISP that owns the IP block. Films routinely overstate this; news stories about someone being "tracked through their IP" almost always have a court order in the middle.

## Related tools and guides

-   IP Location — the standalone tool
-   [What is IP location and how accurate is it?](https://getmylocations.com/blog/what-is-ip-location-and-how-accurate)
-   [GPS vs IP accuracy — side-by-side comparison](https://getmylocations.com/gps-vs-ip-accuracy)
-   [What your IP address really tells apps about you](https://getmylocations.com/blog/what-your-ip-reveals)
-   [My Location — GPS-based reading (more precise than IP)](https://getmylocations.com/my-location)
-   [GPS coordinates finder — complete guide](https://getmylocations.com/my-location)
-   [Fix location not working — troubleshooting](https://getmylocations.com/fix-location-not-working)
-   [How GPS works — satellite math](https://getmylocations.com/blog/how-gps-works)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
