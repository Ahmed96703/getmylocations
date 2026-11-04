---
title: "MX Lookup: Find Any Domain’s Mail Servers & Provider"
description: "Look up the MX records of any domain or email address: mail servers in priority order, their IP addresses, and which email provider the domain uses. Free."
url: https://getmylocations.com/mx-lookup
---

Free Tool · Live DNS

# MX lookup: where does this domain’s email go?

Enter a domain or an email address to see its **mail servers in priority order**, the IP address of each one, and **which email provider it uses**.

Last updated November 4, 2026 by [Ahmed Anwar](https://getmylocations.com/about).

## Find a domain’s mail servers

Try:

## What is an MX lookup?

An MX lookup asks the Domain Name System which servers receive email for a domain. MX stands for “mail exchanger”. Every domain that accepts email publishes one or more MX records, and every mail server in the world reads them before delivering a message. Looking them up tells you who hosts a domain’s email, whether it is set up at all, and which server will be tried first.

## How email finds its way

1.  You send a message to `anna@example.com`.
2.  Your mail server looks up the MX records of `example.com`.
3.  It connects to the server with the lowest priority number and hands the message over; if that server does not answer, it tries the next.

So if MX records are wrong or missing, mail bounces or disappears, even though the website works fine.

## How to read the result

| Field | What it means |
| --- | --- |
| Mail provider | The service the server names belong to, such as Google Workspace or Microsoft 365. “Own or unrecognised” means a company’s own server or a smaller host. |
| Priority | Lower numbers are tried first. The number itself does not matter, only the order: 1, 5, 10 works the same as 10, 20, 30. |
| Same priority | Servers with the same number share the load; senders pick one at random. |
| Mail server | The host name the record points to. It must have its own A or AAAA record. |
| IP addresses | Where that host name points. Use it to check the server with the blacklist checker. |

The lookup uses DNS over HTTPS (Cloudflare’s public resolver), so it shows what the rest of the internet sees right now, not a cached copy on your computer. You can type a whole email address; the part after the @ is looked up.

## Common MX setups

-   **Google Workspace:** `smtp.google.com` (newer setups), or `aspmx.l.google.com` with backups at priority 5 and 10.
-   **Microsoft 365:** one record such as `example-com.mail.protection.outlook.com`.
-   **Forwarding services** (Cloudflare Email Routing, ImprovMX): receive mail and forward it to another inbox.
-   **Security gateways** (Mimecast, Proofpoint, Barracuda): filter mail before it reaches the real mailbox provider.

## Why is my email not arriving? MX problems to check

-   **No MX records:** the domain was never set up for email, or the records were lost when the domain moved to a new DNS host. Copy them from your email provider’s setup page.
-   **Old provider still listed:** after switching, records for both providers send part of the mail to the old one. Remove the old records.
-   **Server name with no IP address:** the IP column shows “—”. The host name in the record is misspelled or no longer exists.
-   **Null MX:** a single record of “.” means the domain refuses all email ([RFC 7505](https://www.rfc-editor.org/rfc/rfc7505)). Fine for a domain that never receives mail, wrong for one that should.
-   **Recent change:** other servers keep the old records until their TTL runs out, usually an hour, at most a day or two.

MX records only cover receiving. To make sure your own mail is trusted, also check SPF and DMARC with the [DMARC checker](https://getmylocations.com/dmarc-checker), whether your server’s IP is on a spam list with the [blacklist checker](https://getmylocations.com/ip-blacklist-checker), and whether a single address can receive mail with the [email validator](https://getmylocations.com/email-validator). For any other record type, use the [DNS lookup](https://getmylocations.com/dns-lookup).

## Frequently asked questions

What is an MX record?

A mail exchanger record tells other mail servers where to deliver email for a domain. Each one names a server and a priority number; senders try the lowest number first.

How do I find out who hosts a domain’s email?

Look up its MX records. The server names give it away: aspmx.l.google.com means Google Workspace, \*.mail.protection.outlook.com means Microsoft 365. The tool names the provider for you.

What happens if a domain has no MX record?

Sending servers fall back to the domain’s A record and try to deliver there. In practice, a domain without MX records usually cannot receive email.

How long do MX changes take?

As long as the TTL on the old records, often an hour, sometimes a day. Lower the TTL a day before switching providers so the change spreads quickly.

Can an MX record point to an IP address?

No. RFC 5321 requires an MX record to name a host, and that host needs its own A or AAAA record. An MX record that contains an IP address, or points to a CNAME, breaks delivery from some senders.

Why does the tool show a different provider than I expected?

The first MX server may belong to a security gateway such as Mimecast or Proofpoint, which filters mail and then passes it on to the real mailbox provider. The MX record only shows the first stop.

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
