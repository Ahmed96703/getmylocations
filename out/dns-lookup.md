---
title: "DNS Lookup: Check A, AAAA, CNAME, TXT & All DNS Records"
description: "Look up any domain’s DNS records: A, AAAA, CNAME, MX, NS, TXT, SOA, CAA and reverse (PTR), and compare Cloudflare and Google DNS to check propagation."
url: https://getmylocations.com/dns-lookup
---

Free Tool · Live DNS over HTTPS

# DNS lookup: see any domain’s records

Enter a domain to see its **A, AAAA, CNAME, MX, NS, TXT, SOA and CAA records** at once, or pick one type. Enter an IP address for a **reverse (PTR) lookup**, and compare Cloudflare and Google DNS to check whether a change has spread.

## Look up DNS records

Try:

Sponsored

## DNS record types

| Type | What it holds | Example |
| --- | --- | --- |
| A | IPv4 address of the name | `203.0.113.10` |
| AAAA | IPv6 address | `2001:db8::10` |
| CNAME | An alias: “look up this other name instead” | `www → example.com` |
| MX | Mail servers, with a priority | `10 mx1.example.com` |
| NS | Name servers that hold the domain’s records | `ns1.example.net` |
| TXT | Text: SPF, DMARC, site verification codes | `v=spf1 include:… ~all` |
| SOA | Zone details: primary server, serial number, timers | — |
| CAA | Which certificate authorities may issue SSL certificates | `0 issue "letsencrypt.org"` |
| PTR | Name for an IP address (reverse DNS) | `dns.google` |

## When to use a DNS lookup

-   **After moving a site or changing hosts:** check the A and AAAA records point to the new server.
-   **Email not arriving:** check the MX records, then SPF and DMARC with the [DMARC checker](https://getmylocations.com/dmarc-checker).
-   **Domain verification:** confirm the TXT record that Google, Microsoft or another service asked you to add is live.
-   **SSL certificate errors:** check CAA records allow your certificate authority.

The tool asks Cloudflare’s public resolver (1.1.1.1) and, when comparing, Google’s (8.8.8.8), using encrypted DNS over HTTPS. Results are live, not from a stored copy. For mail servers only, see [MX lookup](https://getmylocations.com/mx-lookup); for name servers, [NS lookup](https://getmylocations.com/ns-lookup).

## Frequently asked questions

What is a DNS lookup?

It asks the domain name system for the records stored for a name, such as the IP address of a website (A and AAAA), where its email goes (MX) or which servers hold its records (NS). Browsers do this every time you open a site.

How do I check if my DNS change has propagated?

Tick “Compare Cloudflare and Google DNS” and look up the record. If both show the new value, most of the internet sees it. If they differ, one still has the old answer cached; it updates when the TTL shown runs out.

What is a reverse DNS (PTR) lookup?

It finds the name registered for an IP address, the opposite of a normal lookup. Type an IP address and the tool asks for its PTR record. Mail servers check this to make sure a sending server is who it says it is.

What does TTL mean?

Time to live: how long resolvers may keep a record in their cache before asking again. A one-hour TTL means a change can take up to an hour to reach everyone.

Why does a record show “No A record”?

The domain exists but has no record of that type. Many domains have no AAAA (IPv6) record, and the bare domain often has no CNAME. NXDOMAIN, on the other hand, means the name does not exist at all.

## Related tools

[

### MX Lookup

Mail servers for a domain

](https://getmylocations.com/mx-lookup)[

### NS Lookup

Name servers for a domain

](https://getmylocations.com/ns-lookup)[

### DMARC Checker

Check a domain’s DMARC and SPF

](https://getmylocations.com/dmarc-checker)[

### Email Validator

Check an address can receive mail

](https://getmylocations.com/email-validator)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
