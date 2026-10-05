---
title: "IP Location Lookup — Find Any IP's City and ISP (Free)"
description: "Look up any IPv4 or IPv6 address to see its city, country, ISP and ASN on a map, plus how far your IP location is from where you actually are. Try it."
url: https://getmylocations.com/ip-location
---

Complete Guide

# IP location lookup — what your public IP reveals, and what it doesn't

Every device on the public internet has an IP address. That address quietly leaks a surprising amount about you — your approximate city, your internet provider, the network that owns your address — but also _less_ than most people assume. This guide explains exactly what an IP lookup can and can't tell, how to find your own public IP, how IP-based geolocation actually works under the hood, and what to do when the city it reports is wrong.

## Lookup an IP address

* * *

## What each IP address lookup result means

The lookup returns a dozen fields. Some come straight from public registration records and are nearly always right; others are database estimates. Here is how far to trust each one.

Field

What it is

How reliable

IP address, version

The public address, IPv4 or IPv6

Exact

ISP / Org

The organisation the address block is registered to

High: comes from registry records

ASN

Autonomous System Number, the ID of the network that routes the address on the internet

High

Country

Where the address is registered and used

Very high, unless you are on a VPN

Region, city, postal code

The database’s best guess at where the network serves

Moderate to low; often the ISP’s hub, not you

Coordinates

A point for that city or region, used for the map pin

Low: never a street address

Timezone, UTC offset, currency

Derived from the estimated location

As reliable as the country or region

* * *

## What is a public IP address?

A public IP address is the number your internet provider hands out to your home router, office network, or mobile hotspot so the rest of the internet can route packets back to you. It looks like `203.0.113.42` for the older IPv4 system or like `2001:db8::1` for the newer IPv6 system. Most home connections still get IPv4, often shared with dozens of other customers via Carrier-Grade NAT; many mobile networks have moved to IPv6.

Crucially, your **private** IP (something like `192.168.1.5`) is completely separate. That's the address your router gives your laptop or phone on your local Wi-Fi. The outside world never sees it — only your public IP is visible to websites.

These ranges are never public, and the tool recognises them without sending them anywhere:

-   `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`: private networks (RFC 1918)
-   `100.64.0.0/10`: carrier-grade NAT inside ISP and mobile networks (RFC 6598)
-   `127.0.0.0/8` and `::1`: loopback, meaning “this device”
-   `169.254.0.0/16` and `fe80::/10`: link-local, self-assigned when no router answers
-   `fc00::/7`: IPv6 unique local addresses, the IPv6 equivalent of private ranges (RFC 4193)

* * *

## How to find your public IP — three ways

### 1\. Use a browser tool

Easiest by far. Tap _Lookup my IP_ in the tool at the top of this page and your public IP, ISP, and estimated city appear below it. You don't need to grant any permission — the lookup service simply reports the address your browser connected from.

### 2\. Ask your router

Open your router's admin page (usually `192.168.1.1` or `192.168.0.1`) in a browser. The WAN or Internet section shows the IP your ISP has assigned. This is the ground-truth source — if it disagrees with a website's reading, you're probably behind a VPN or proxy.

### 3\. Command line

On macOS or Linux, run `curl ifconfig.me` or `curl ipinfo.io/ip`. On Windows, use PowerShell: `(Invoke-WebRequest ifconfig.me).Content`. The answer is your current public IP, fetched directly.

* * *

## How IP geolocation actually works

When a website turns your IP into “Lahore, Pakistan” or “Mumbai, India”, it isn't reading anything from your computer. It's looking up the IP in a database. The database itself is built by companies like MaxMind, IPinfo, IP2Location, and BigDataCloud from several signals. The tool on this page uses ipapi.co’s database:

-   **ARIN/RIPE/APNIC registration records.** When an ISP buys a block of IP addresses, they register it with the regional internet registry along with the country it operates in. This gives a country-level fix essentially for free.
-   **BGP routing data.** The way IP traffic is announced across the internet backbone reveals which network operator handles which block, and roughly where their peering points are.
-   **Reverse DNS hints.** An IP's PTR record often encodes the city or POP (point of presence). A hostname like `karachi-pool-3.isp.pk` is a fairly strong signal.
-   **Latency-based triangulation.** Some providers ping known servers from an unknown IP and use response times to narrow the geographic possibilities.
-   **Crowd-sourced ground truth.** When a mobile app with GPS access also sees an IP, it can tag that IP with a real coordinate. Millions of these readings train the database.

The lookup itself is cheap to run, but the answer is inherently fuzzy, as the next section shows. For why this matters, see our [deep dive on IP location accuracy](https://getmylocations.com/blog/what-is-ip-location-and-how-accurate).

* * *

## How accurate is IP geolocation?

MaxMind, one of the largest IP database providers, publishes its own estimates: **99.8% accuracy at the country level**, and for US addresses about **80% at the state or region level** and **66% for the city**, where “correct” means within 50 km. So even by a major provider’s own measure, one US city guess in three is more than 50 km out.

Level

Typical accuracy

Country

99.8%

State or region (US)

about 80%

City, within 50 km (US)

about 66%

Street address

not possible from an IP

Source: MaxMind’s published accuracy estimates, checked October 2026. MaxMind notes that accuracy varies widely by country, by connection type (mobile is usually worse than fixed broadband), by IPv4 versus IPv6, and by how each ISP manages its addresses; its online accuracy comparison breaks this down country by country. Other providers, including the one this tool uses, publish their own figures, and providers often disagree at city level for the same address.

* * *

## How far off is your IP location?

Averages only go so far; what matters is how wrong the guess is for your connection. After you look up your own IP, the tool offers a _Measure the gap_ button. With your permission it reads your device’s location, the same way our[My Location tool](https://getmylocations.com/my-location) does, and shows how many kilometres separate it from the IP database’s estimate. Your device location stays in the browser; only the distance is displayed.

A gap of a few kilometres means the database knows your ISP’s local network well. Tens of kilometres usually means you are being placed at the ISP’s regional hub. Hundreds of kilometres or a different country almost always means a VPN, a corporate network, or a mobile carrier routing you through a distant gateway. Try it on Wi-Fi and again on mobile data to see the difference. For the full comparison of the two methods, see[GPS vs IP accuracy](https://getmylocations.com/gps-vs-ip-accuracy).

* * *

## What your IP tells someone (and what it doesn't)

### What it usually reveals

-   Your country (almost always correct).
-   Your region or state (often correct).
-   The internet service provider (ISP) that owns your IP block.
-   For some commercial databases (not the free one used here), whether the address belongs to a hosting provider or a known VPN exit node.
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

You can sanity-check the answer yourself by running `whois` against your IP in a terminal. The `OrgName` or `netname` field is the ISP that registered the IP block. The ASN in the results identifies the network that announces the address on the internet; large ISPs and cloud providers each have their own, so the same ASN across two lookups means the same network operator.

* * *

## Look up a domain’s IP location

You can type a domain name such as `example.com` (or paste a full URL) instead of an IP. The tool resolves it to an IPv4 address using Cloudflare’s public DNS, falling back to IPv6 if there is none, then looks that address up.

Expect a surprise with big websites: most sit behind a content delivery network, so the location you see is the CDN’s nearest edge server, often in or near your own country, not where the company or its servers actually are. The ISP field will usually name the CDN, such as Cloudflare or Akamai, which is the giveaway.

* * *

## When the city is wrong

Seeing the wrong city in an IP lookup is extremely common and almost never your fault. The usual causes:

-   **You're on a VPN.** The IP you appear to be on belongs to the VPN's exit server. That's the entire point of a VPN.
-   **You're on a corporate network.** Your traffic exits through the company's head office. The IP looks like it's there.
-   **You're on a mobile carrier.** Mobile traffic is often back-hauled to the carrier's regional aggregation. Your IP can geolocate hundreds of miles from where you're sitting.
-   **The database is stale.** ISPs reassign IP blocks. Databases catch up slowly — sometimes months.

If a database has your network in the wrong place and it causes you problems (the wrong country’s content, for example), you can ask the providers to correct it. MaxMind takes corrections at `maxmind.com/en/geoip-location-correction` and IPinfo at `ipinfo.io/corrections`; others usually accept corrections through their contact pages. Corrections tend to take weeks to reach every site that uses the data.

The fix, if you need accurate location, is to grant GPS-level browser geolocation instead of relying on IP. Step-by-step browser fixes are in our [troubleshooting guide](https://getmylocations.com/fix-location-not-working).

* * *

## Privacy considerations

Every website you visit can see your IP — that's required for the connection to work. What they do with it varies. GetMyLocations doesn't log your IP for analytics, but our hosting provider (Cloudflare) keeps short-lived request logs for abuse prevention. Using this tool sends the IP being looked up to ipapi.co, and a typed domain name to Cloudflare’s DNS resolver. Private and reserved addresses are recognised in your browser and never sent. Advertising services may process your IP for their own purposes. The full breakdown is in our [Privacy Policy](https://getmylocations.com/privacy-policy).

If you want to limit what an IP lookup reveals, the standard tools are a reputable consumer VPN (Mullvad, IVPN, ProtonVPN), the Tor browser for stronger anonymity, or simply visiting from a different network. None of these are bulletproof — they all leak in different ways — but they substantially raise the cost of tracking.

* * *

## Frequently asked questions

How do I look up my own IP location?+

Tap the "Lookup my IP" button on the tool above. Within a second or two the page returns your public IP (IPv4 or IPv6), the database-guessed city and country, the ISP and ASN that own the IP block, the timezone, and a map pin. No permission prompt is needed — IP geolocation uses only the address your connection already exposes. If you then tap "Measure the gap", the tool compares that estimate with your device location and shows the distance between them.

How do I look up someone else's IP location?+

Paste the IP address into the input field on the tool above and the lookup runs against that IP instead of yours. The same fields come back: city, region, country, ISP, ASN, and timezone. You can also type a domain name such as example.com; the tool resolves it to an IP address first. Important caveat: an IP reveals at most a city and an ISP — never a street address, never a name. Anything more requires legal process served on the ISP.

How accurate is IP geolocation?+

MaxMind, one of the largest IP database providers, estimates 99.8% accuracy at the country level; for US addresses, about 80% at the state level and 66% for the city (within 50 km). Accuracy varies widely by country and is usually worst on mobile data, where carrier-grade NAT routes many subscribers through one regional gateway. Street-level accuracy from an IP alone is essentially impossible.

Why is the city it shows wrong?+

Five common causes: (1) a VPN is rewriting your IP to its exit-server location, (2) cellular CGNAT is routing you through a far-away gateway, (3) a corporate or school network exits via a distant office, (4) the database is stale and has not caught up with an ISP block reassignment, or (5) you are connecting through a CDN that reports its own location. Disconnect any VPN, switch from cellular to Wi-Fi, and re-run the lookup.

What is the difference between IP geolocation and GPS?+

IP geolocation reads your visible IP and looks it up in a database — accuracy 5–50 km, no permission prompt, defeated by VPN. GPS reads satellite signals directly through your device — accuracy 3–5 m outdoors, requires browser permission, unaffected by VPN. They are complementary, not interchangeable. For "what country is this user in?" IP is fine; for "where exactly is this user standing?" GPS is the only option.

Can someone find my home address from my IP?+

No — not without a court order. A public IP lookup reveals your country, usually your city, and your ISP; some commercial databases also flag known VPN and proxy addresses. It does not reveal your name or street. Tying an IP to a specific human address requires a subpoena served on the ISP that owns the IP block. Films routinely overstate this; news stories about someone being "tracked through their IP" almost always have a court order in the middle.

Why does the tool say my IP is a private address?+

Addresses such as 192.168.x.x, 10.x.x.x, and 172.16.x.x to 172.31.x.x are private (RFC 1918): your router hands them out inside your home or office, and the same numbers are reused on millions of other networks. 100.64.x.x to 100.127.x.x is carrier-grade NAT space (RFC 6598) used inside ISP networks. None of these are visible on the public internet, so they have no location. The tool recognises them in your browser without sending them anywhere. Leave the box empty to look up your public IP.

Which database does this IP lookup use?+

Public addresses are looked up with ipapi.co. Domain names are first resolved to an IP address using Cloudflare's public DNS (1.1.1.1). Different providers often disagree at city level because each builds its database from different signals, so another site may show a different city for the same IP.

## Related tools and guides

-   [What is IP location and how accurate is it?](https://getmylocations.com/blog/what-is-ip-location-and-how-accurate)
-   [GPS vs IP accuracy — side-by-side comparison](https://getmylocations.com/gps-vs-ip-accuracy)
-   [What your IP address really tells apps about you](https://getmylocations.com/blog/what-your-ip-reveals)
-   [My Location — GPS-based reading (more precise than IP)](https://getmylocations.com/my-location)
-   [Fix location not working — troubleshooting](https://getmylocations.com/fix-location-not-working)
-   [How GPS works — satellite math](https://getmylocations.com/blog/how-gps-works)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
