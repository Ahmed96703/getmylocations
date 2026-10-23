---
title: "MAC Address Lookup: Find the Device Manufacturer (Free)"
description: "Find which company made a device from its MAC address, using the official IEEE register of more than 40,000 prefixes. Spots private, randomized addresses too."
url: https://getmylocations.com/mac-address-lookup
---

Free Tool · Official IEEE register

# MAC address lookup: who made this device?

Paste a **MAC address**, or just its first six digits, to see the **manufacturer from the IEEE register**, whether the address is private (randomized), and the same address in every common format.

## Find the maker of a MAC address

Try:

## How to read a MAC address

| Part | Example: 3C:22:FB:12:34:56 | Meaning |
| --- | --- | --- |
| First 3 bytes | 3C:22:FB | OUI: the manufacturer’s prefix |
| Last 3 bytes | 12:34:56 | Serial number chosen by the manufacturer |
| 2nd bit of first byte | 3C = 0011 1100 → 0 | 0 = assigned by maker, 1 = local (random) |
| 1st bit of first byte | 3C = 0011 1100 → 0 | 0 = one device, 1 = multicast group |

A quick way to spot a private address: if the second character is `2`, `6`, `A` or `E`, as in `DA:A1:19:…`, the address is locally administered and will not match a manufacturer.

## Common uses

-   **Unknown devices on your Wi-Fi:** your router lists connected MAC addresses; the maker often tells you what the device is (a TV, a printer, a smart plug).
-   **Network troubleshooting:** identify devices in DHCP leases, switch tables and logs.
-   **Inventory:** group devices by manufacturer.

The register is the IEEE’s public MA-L list, with more than 40,000 prefixes. Larger blocks are listed; the smaller MA-M and MA-S blocks used by some small makers are not, so a few devices show the parent prefix’s holder or no match. For addresses on the internet rather than the local network, see the [IP WHOIS lookup](https://getmylocations.com/ip-whois-lookup).

## Frequently asked questions

What is a MAC address?

A MAC address is the hardware address of a network interface, such as a phone’s Wi-Fi or a laptop’s Ethernet port. It is six bytes, usually written as 3C:22:FB:12:34:56, and is used to deliver data on the local network.

How does a MAC lookup find the manufacturer?

The first three bytes are the Organizationally Unique Identifier (OUI), a prefix the IEEE sells to manufacturers. The tool looks that prefix up in the IEEE’s public register.

Why does it say “private” or “randomized”?

iPhones, Android phones and Windows now use a random MAC address for each Wi-Fi network to stop tracking. These addresses have the “locally administered” bit set and belong to no manufacturer, so no lookup can name the maker.

Can a MAC address locate or identify a person?

No. A MAC address never leaves the local network, so websites cannot see it, and the register only names the company that made the network chip.

How do I find my device’s MAC address?

On Windows run ipconfig /all; on a Mac hold Option and click the Wi-Fi icon; on iPhone open Settings › General › About › Wi-Fi Address; on Android open Settings › About phone › Status. For Wi-Fi, the per-network private address is shown under that network’s settings.

## Related tools

[

### IP WHOIS Lookup

Who owns an IP address

](https://getmylocations.com/ip-whois-lookup)[

### IPv4 to IPv6

Convert an IPv4 address to IPv6

](https://getmylocations.com/ipv4-to-ipv6)[

### ASN WHOIS Lookup

Owner of an autonomous system

](https://getmylocations.com/asn-lookup)[

### IP Blacklist Checker

Is an IP on spam blocklists?

](https://getmylocations.com/ip-blacklist-checker)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
