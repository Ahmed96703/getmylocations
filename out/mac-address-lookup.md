---
title: "MAC Address Lookup: Find the Device Manufacturer (Free)"
description: "Find which company made a device from its MAC address, using the official IEEE register of more than 40,000 prefixes. Spots private, randomized addresses too."
url: https://getmylocations.com/mac-address-lookup
---

Free Tool · Official IEEE register

# MAC address lookup: who made this device?

Paste a **MAC address**, or just its first six digits, to see the **manufacturer from the IEEE register**, whether the address is private (randomized), and the same address in every common format.

Last updated November 4, 2026 by [Ahmed Anwar](https://getmylocations.com/about).

## Find the maker of a MAC address

Try:

## What is a MAC address lookup?

A MAC address lookup reads the first half of a device’s hardware address and tells you which company made its network chip. Every Wi-Fi card, Ethernet port and Bluetooth radio gets a 48-bit MAC address, and the first 24 bits are a prefix that the [IEEE Registration Authority](https://standards.ieee.org/products-programs/regauth/) sells to manufacturers. Matching the prefix against the IEEE’s public register gives the maker, which is usually enough to tell what an unknown device is.

## How to read a MAC address

| Part | Example: 3C:22:FB:12:34:56 | Meaning |
| --- | --- | --- |
| First 3 bytes | 3C:22:FB | OUI: the manufacturer’s prefix |
| Last 3 bytes | 12:34:56 | Serial number chosen by the manufacturer |
| 2nd bit of first byte | 3C = 0011 1100 → 0 | 0 = assigned by maker, 1 = local (random) |
| 1st bit of first byte | 3C = 0011 1100 → 0 | 0 = one device, 1 = multicast group |

A quick way to spot a private address: if the second character is `2`, `6`, `A` or `E`, as in `DA:A1:19:…`, the address is locally administered and will not match a manufacturer.

## Which manufacturers own the most MAC prefixes?

The register the tool uses holds 40,366 prefixes owned by 20,120 organizations. These are the 15 largest holders, counted from the same data:

| Manufacturer (as registered) | Prefixes |
| --- | --- |
| Apple, Inc. | 1,573 |
| HUAWEI TECHNOLOGIES CO.,LTD | 1,416 |
| Cisco Systems, Inc | 1,257 |
| Samsung Electronics Co.,Ltd | 906 |
| Huawei Device Co., Ltd. | 670 |
| Intel Corporate | 666 |
| zte corporation | 505 |
| IEEE Registration Authority | 439 |
| Texas Instruments | 401 |
| Espressif Inc. | 355 |
| Commscope | 345 |
| Xiaomi Communications Co Ltd | 241 |
| Sagemcom Broadband SAS | 219 |
| Fiberhome Telecommunication Technologies Co.,LTD | 218 |
| Juniper Networks | 217 |

Each prefix covers 224, about 16.7 million, addresses. The IEEE Registration Authority itself appears because it splits some prefixes into the smaller MA-M and MA-S blocks sold to small makers. Chip makers such as Espressif and Texas Instruments rank high because their Wi-Fi chips sit inside other companies’ products, from smart plugs to thermostats.

## How to identify an unknown device on your Wi-Fi

1.  **Open your router’s device list.** It is usually under Connected devices, DHCP clients or Attached devices in the router’s admin page, often at `192.168.1.1` or `192.168.0.1`.
2.  **Copy the MAC address** of the device you do not recognize and paste it above.
3.  **Read the manufacturer** and compare it with what is in your home: the table below gives common matches.
4.  **Still unsure?** Switch suspect devices off one at a time and watch which entry disappears. If nothing matches, change your Wi-Fi password: every device then has to reconnect with the new one.

| Manufacturer shown | Often turns out to be |
| --- | --- |
| Espressif | A smart plug, light bulb, camera or other cheap smart-home gadget |
| Amazon Technologies | An Echo speaker, Fire TV stick, Kindle or Ring doorbell |
| Apple, Samsung, Xiaomi, OPPO, vivo | A phone, tablet, laptop or TV |
| Sagemcom, Commscope, ZTE, Huawei | The router or modem from your internet provider |
| Texas Instruments, Silicon Labs | A smart-home hub, sensor or other small connected device |
| Intel, Dell, Hewlett Packard | A laptop, desktop or printer |
| “Private address”, no maker | A phone or computer using a random Wi-Fi address |

## Why so many devices show no manufacturer

Phones and computers now hide their real MAC address on Wi-Fi. iPhones and iPads use a private Wi-Fi address for each network since iOS 14, Android has randomized it by default since Android 10, and Windows offers random hardware addresses in its Wi-Fi settings. A random address has the “locally administered” bit set, belongs to no company, and may change when the device forgets and rejoins the network. To see the real maker, look in the device’s own settings for its hardware address, or turn the private address off for your home network.

## Common uses

-   **Unknown devices on your Wi-Fi:** your router lists connected MAC addresses; the maker often tells you what the device is (a TV, a printer, a smart plug).
-   **Network troubleshooting:** identify devices in DHCP leases, switch tables and logs.
-   **Inventory:** group devices by manufacturer.

The register is the IEEE’s public MA-L list, with more than 40,000 prefixes. Larger blocks are listed; the smaller MA-M and MA-S blocks used by some small makers are not, so a few devices show the parent prefix’s holder or no match. For addresses on the internet rather than the local network, see the [IP WHOIS lookup](https://getmylocations.com/ip-whois-lookup).

## Frequently asked questions

Which company has the most MAC address prefixes?

Apple, with 1,573 of the 40,366 prefixes in the IEEE MA-L register, followed by Huawei Technologies and Cisco. Each prefix covers about 16.7 million addresses, so big makers buy new ones as they ship more devices.

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
