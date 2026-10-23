---
title: "Email Header Analyzer: Trace Where an Email Came From"
description: "Paste email headers to see the sender’s IP, every server the message passed through and the delays, and whether SPF, DKIM and DMARC passed. Private, in your browser."
url: https://getmylocations.com/email-header-analyzer
---

Free Tool · Runs in your browser

# Email header analyzer: where did this email really come from?

Paste an email’s **full headers** to see **the IP address it was sent from**, every server it passed through with the delay at each step, and whether it passed **SPF, DKIM and DMARC**. Nothing you paste leaves your browser.

## Analyze email headers

Everything is analyzed in your browser. The headers are not sent anywhere.

## Reading the Received lines

Each server that handles a message adds a `Received:` line at the top, so the newest is first and the oldest last. The analyzer reverses them to show the path in order, from the sending server to your inbox.

| Part | Meaning |
| --- | --- |
| from mail-sor-f41.google.com \[209.85.220.41\] | The server that handed the message over, and its IP |
| by mx.example.com | The server that received it |
| with ESMTPS | The protocol; an S at the end means the hop was encrypted |
| ; Tue, 21 Oct 2026 09:14:07 -0700 | When it was received, used to calculate delays |

## Key headers to check

-   **Authentication-Results:** what your provider found when checking SPF, DKIM and DMARC.
-   **Return-Path:** where bounces go; it should belong to the sender or their mail service.
-   **Reply-To:** where your reply would go. A Reply-To at a different domain is a classic phishing trick.
-   **Message-ID:** usually shows which system created the message.

Found a suspicious IP? Check it with the [blacklist checker](https://getmylocations.com/ip-blacklist-checker), see who owns it with the [IP WHOIS lookup](https://getmylocations.com/ip-whois-lookup), or estimate its location with [IP Location](https://getmylocations.com/ip-location).

## Frequently asked questions

How do I see the full headers of an email?

Gmail: open the message, click ⋮ and choose “Show original”. Outlook on the web: … › View › View message source. Outlook desktop: File › Properties, then copy “Internet headers”. Apple Mail: View › Message › All Headers. Yahoo: … › View raw message.

Can I find the sender’s location from the headers?

The headers show the IP address of the first public server the message passed through. For mail sent through Gmail, Outlook.com or other big providers, that is the provider’s server, not the sender’s computer, so it does not reveal where the person is.

How do I tell if an email is phishing?

Look for SPF, DKIM or DMARC failures, a From domain that does not match the Return-Path or Reply-To, and a first server that has nothing to do with the claimed sender. Any one of these is a warning sign, not proof.

Are my headers uploaded anywhere?

No. The analyzer runs entirely in your browser; nothing you paste leaves your device.

## Related tools

[

### DMARC Checker

Check a domain’s DMARC and SPF

](https://getmylocations.com/dmarc-checker)[

### IP Blacklist Checker

Is an IP on spam blocklists?

](https://getmylocations.com/ip-blacklist-checker)[

### DNS Lookup

A, AAAA, CNAME, TXT and more

](https://getmylocations.com/dns-lookup)[

### MX Lookup

Mail servers for a domain

](https://getmylocations.com/mx-lookup)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
