---
title: "DMARC Checker: Validate DMARC, SPF & DKIM Records (Free)"
description: "Check a domain’s DMARC policy, SPF record and DKIM key in one step: every tag explained, the SPF 10-lookup limit counted, and clear fixes for each problem."
url: https://getmylocations.com/dmarc-checker
---

Free Tool · DMARC, SPF & DKIM

# DMARC checker: is your email protected from spoofing?

Enter your domain to check its DMARC policy and SPF record, with every tag explained and the SPF lookup limit counted. Add a DKIM selector to check the DKIM key as well.

## Check DMARC, SPF and DKIM

Try:

Sponsored

## SPF, DKIM and DMARC in one minute

| Record | Where | What it proves |
| --- | --- | --- |
| SPF | `example.com TXT "v=spf1 …"` | Which servers may send mail for the domain |
| DKIM | `selector._domainkey.example.com` | The message was signed by the domain and not changed on the way |
| DMARC | `_dmarc.example.com` | What to do when SPF and DKIM do not match the From address, and where to send reports |

## A safe way to roll out DMARC

1.  Publish `v=DMARC1; p=none; rua=mailto:dmarc@example.com` and wait two to four weeks for reports.
2.  Use the reports to find every service that sends as your domain (newsletters, invoicing, help desk) and give each SPF and DKIM.
3.  Move to `p=quarantine`, then to `p=reject` once nothing legitimate fails.

## Common problems this tool catches

-   **Two SPF or two DMARC records:** receivers treat it as an error and ignore both.
-   **+all** in SPF, which lets any server pass.
-   **More than 10 SPF lookups** after adding many services.
-   **p=none left in place for months**, which reports spoofing but does not stop it.

To see where an email really came from and whether it passed these checks, paste its headers into the [email header analyzer](https://getmylocations.com/email-header-analyzer).

## Frequently asked questions

What is DMARC?

DMARC is a DNS record at \_dmarc.yourdomain that tells receiving mail servers what to do with messages that claim to come from your domain but fail SPF and DKIM checks: deliver them (none), send them to spam (quarantine) or refuse them (reject). It also asks receivers to send you reports.

Do I need DMARC?

Yes, if you send email from your domain. Since 2024 Gmail and Yahoo require bulk senders to publish DMARC, and a missing record makes your mail more likely to land in spam and your domain easier to spoof.

What DMARC policy should I use?

Start with p=none and an rua address to collect reports, fix any legitimate senders that fail, then move to p=quarantine and finally p=reject.

What is the SPF 10 lookup limit?

SPF may trigger at most 10 DNS lookups through include:, a, mx, ptr, exists and redirect. Each include can contain more lookups. Over 10, SPF fails for every message. The checker follows the includes and counts them.

What is a DKIM selector?

DKIM keys are published at <selector>.\_domainkey.<domain>. The selector is chosen by your mail provider: “google” for Google Workspace, “selector1” and “selector2” for Microsoft 365. You can find it in the s= part of the DKIM-Signature header of an email you sent.

## Related tools

[

### MX Lookup

Mail servers for a domain

](https://getmylocations.com/mx-lookup)[

### Email Header Analyzer

Trace where an email came from

](https://getmylocations.com/email-header-analyzer)[

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
