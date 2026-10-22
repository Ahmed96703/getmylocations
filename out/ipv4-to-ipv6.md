---
title: "IPv4 to IPv6 Converter: Mapped, NAT64 & 6to4 Forms"
description: "Convert an IPv4 address to IPv6: IPv4-mapped (::ffff:), NAT64 and 6to4 forms, in short and expanded notation, and convert them back to IPv4."
url: https://getmylocations.com/ipv4-to-ipv6
---

Free Tool · Both directions

# IPv4 to IPv6 converter

Type an **IPv4 address** to see it in **every standard IPv6 form**: **IPv4-mapped**, NAT64, 6to4 and the obsolete IPv4-compatible form. Paste one of those IPv6 forms to get the IPv4 address back.

## Convert an IPv4 address to IPv6

Try:

Sponsored

## How the conversion works

An IPv4 address is 32 bits, written as four decimal numbers. An IPv6 address is 128 bits, written as eight groups of four hex digits. To fit IPv4 into IPv6, each pair of IPv4 numbers becomes one hex group, and a fixed prefix fills the rest.

| Step | Example: 192.0.2.1 |
| --- | --- |
| Split into four numbers | 192 · 0 · 2 · 1 |
| Each number to two hex digits | c0 · 00 · 02 · 01 |
| Pair them into two groups | c000 : 0201 |
| Add the IPv4-mapped prefix | ::ffff:c000:201 (or ::ffff:192.0.2.1) |

## Which IPv6 form to use

-   **IPv4-mapped** (`::ffff:0:0/96`): the one you will meet most, in server logs, socket APIs and databases that store every address as IPv6.
-   **NAT64** (`64:ff9b::/96`): for IPv6-only networks reaching IPv4 servers.
-   **6to4** (`2002::/16`): an old tunnelling method, deprecated in 2015 (RFC 7526). You may still see it in old configurations.
-   **IPv4-compatible** (`::a.b.c.d`): deprecated since 2006. Do not use it.

Private addresses such as `192.168.1.1` convert the same way, but they stay private: the IPv6 form does not make them reachable from the internet. To see who owns a public address, use the [IP WHOIS lookup](https://getmylocations.com/ip-whois-lookup).

## Frequently asked questions

Can an IPv4 address be converted to IPv6?

An IPv4 address can be written in IPv6 notation, most often as an IPv4-mapped address such as ::ffff:192.0.2.1. That is a way of representing the IPv4 address inside IPv6 software, not a new address: it does not give the device a real IPv6 address, which only your network can assign.

What is ::ffff: in front of an IP address?

It marks an IPv4-mapped IPv6 address. Servers listening on IPv6 sockets see IPv4 visitors this way, so logs often show ::ffff:203.0.113.5. The part after ::ffff: is the ordinary IPv4 address.

What is NAT64?

NAT64 lets devices on an IPv6-only network reach IPv4-only sites. The network’s DNS gives them a synthetic address in 64:ff9b::/96 with the IPv4 address in the last 32 bits, and a gateway translates the traffic. Many mobile networks work this way.

Do I need IPv6?

Most home and mobile connections now have both. Websites keep working over IPv4, but IPv6 avoids carrier-grade NAT and is required by some networks. Your provider assigns IPv6; no converter can create it for you.

## Related tools

[

### IP WHOIS Lookup

Who owns an IP address

](https://getmylocations.com/ip-whois-lookup)[

### ASN WHOIS Lookup

Owner of an autonomous system

](https://getmylocations.com/asn-lookup)[

### IP Blacklist Checker

Is an IP on spam blocklists?

](https://getmylocations.com/ip-blacklist-checker)[

### MAC Address Lookup

Device maker from a MAC address

](https://getmylocations.com/mac-address-lookup)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
