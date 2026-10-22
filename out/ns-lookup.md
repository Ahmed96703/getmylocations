---
title: "NS Lookup: Find Any Domain’s Name Servers & DNS Host"
description: "Look up the name servers (NS records) of any domain, their IP addresses, the SOA serial, and which company hosts the domain’s DNS. Free, live results."
url: https://getmylocations.com/ns-lookup
---

Free Tool · Live DNS

# NS lookup: who hosts this domain’s DNS?

Enter a domain to see its **name servers**, their IPv4 and IPv6 addresses, the zone’s primary server and serial number, and **which company hosts the DNS**.

## Find a domain’s name servers

Try:

Sponsored

## Why name servers matter

Every DNS lookup for your domain ends at your name servers. If they are wrong, slow or down, your website and email stop working for everyone, even though the servers behind them are fine. That is why domains list at least two, ideally on different networks.

-   **Moving to a new host** such as Cloudflare: check the new name servers are live before deleting the old zone.
-   **Site not loading after a change:** confirm the registrar shows the same name servers as the lookup.
-   **Zone serial** (from the SOA record): many hosts raise it on every edit, so it shows whether your change reached the servers.

## Reading the SOA record

The start of authority record names the zone’s primary server and an admin contact written as a name, with the first dot standing for @ (`hostmaster.example.com` means `hostmaster@example.com`). It also carries the serial number and timers secondary servers use to stay in sync.

For every record type at once, use the full [DNS lookup](https://getmylocations.com/dns-lookup); for mail servers, [MX lookup](https://getmylocations.com/mx-lookup).

## Frequently asked questions

What is a name server?

A name server holds a domain’s DNS records and answers questions about them, such as “what is the IP address of www.example.com?”. The NS records list which servers do this for a domain.

How do I find who hosts my DNS?

Look up your domain here. The name server names usually reveal the host: \*.ns.cloudflare.com is Cloudflare, ns-\*.awsdns-\* is Amazon Route 53, ns\*.domaincontrol.com is GoDaddy.

How long does a name server change take?

Changing name servers is done at your registrar and updates the parent zone (such as .com). It usually shows within an hour, but resolvers may keep the old servers cached for up to two days.

Is this the same as the nslookup command?

It answers the same question as running nslookup -type=NS example.com, without needing a terminal, and it also finds each server’s addresses and the SOA details.

## Related tools

[

### DNS Lookup

A, AAAA, CNAME, TXT and more

](https://getmylocations.com/dns-lookup)[

### Domain Age Checker

When a domain was registered

](https://getmylocations.com/domain-age-checker)[

### MX Lookup

Mail servers for a domain

](https://getmylocations.com/mx-lookup)[

### DMARC Checker

Check a domain’s DMARC and SPF

](https://getmylocations.com/dmarc-checker)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
