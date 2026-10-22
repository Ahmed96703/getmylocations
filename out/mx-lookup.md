---
title: "MX Lookup: Find Any Domain’s Mail Servers & Provider"
description: "Look up the MX records of any domain or email address: mail servers in priority order, their IP addresses, and which email provider the domain uses. Free."
url: https://getmylocations.com/mx-lookup
---

Free Tool · Live DNS

# MX lookup: where does this domain’s email go?

Enter a domain or an email address to see its mail servers in priority order, the IP address of each one, and which email provider it uses.

## Find a domain’s mail servers

Try:

Sponsored

## How email finds its way

1.  You send a message to `anna@example.com`.
2.  Your mail server looks up the MX records of `example.com`.
3.  It connects to the server with the lowest priority number and hands the message over; if that server does not answer, it tries the next.

So if MX records are wrong or missing, mail bounces or disappears, even though the website works fine.

## Common MX setups

-   **Google Workspace:** `smtp.google.com` (newer setups), or `aspmx.l.google.com` with backups at priority 5 and 10.
-   **Microsoft 365:** one record such as `example-com.mail.protection.outlook.com`.
-   **Forwarding services** (Cloudflare Email Routing, ImprovMX): receive mail and forward it to another inbox.
-   **Security gateways** (Mimecast, Proofpoint, Barracuda): filter mail before it reaches the real mailbox provider.

MX records only cover receiving. To make sure your own mail is trusted, also check SPF and DMARC with the [DMARC checker](https://getmylocations.com/dmarc-checker), and whether your server’s IP is on a spam list with the [blacklist checker](https://getmylocations.com/ip-blacklist-checker).

## Frequently asked questions

What is an MX record?

A mail exchanger record tells other mail servers where to deliver email for a domain. Each one names a server and a priority number; senders try the lowest number first.

How do I find out who hosts a domain’s email?

Look up its MX records. The server names give it away: aspmx.l.google.com means Google Workspace, \*.mail.protection.outlook.com means Microsoft 365. The tool names the provider for you.

What happens if a domain has no MX record?

Sending servers fall back to the domain’s A record and try to deliver there. In practice, a domain without MX records usually cannot receive email.

How long do MX changes take?

As long as the TTL on the old records, often an hour, sometimes a day. Lower the TTL a day before switching providers so the change spreads quickly.

## Related tools

[

### DMARC Checker

Check a domain’s DMARC and SPF

](https://getmylocations.com/dmarc-checker)[

### Email Validator

Check an address can receive mail

](https://getmylocations.com/email-validator)[

### DNS Lookup

A, AAAA, CNAME, TXT and more

](https://getmylocations.com/dns-lookup)[

### NS Lookup

Name servers for a domain

](https://getmylocations.com/ns-lookup)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
