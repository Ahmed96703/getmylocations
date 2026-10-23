---
title: "SSL Certificate Checker & Fingerprint (SHA-256, SHA-1)"
description: "See every valid SSL/TLS certificate for a domain: issuer, names covered, expiry date and days left, and its SHA-256 and SHA-1 fingerprints. Free."
url: https://getmylocations.com/ssl-certificate-checker
---

Free Tool · Certificate Transparency

# SSL certificate checker: issuer, expiry and fingerprints

Enter a domain to see all its **valid SSL/TLS certificates** from the public Certificate Transparency logs: who issued them, which names they cover, when they expire, and their **SHA-256, SHA-1 and public key fingerprints**.

## Check a domain’s SSL certificates

Try:

## What to check on a certificate

-   **Days left:** renew well before expiry; an expired certificate shows a full-page browser warning to every visitor.
-   **Names covered:** the certificate must include each name you serve, such as both `example.com` and `www.example.com`, or a wildcard like `*.example.com`.
-   **Issuer:** make sure it is the authority you use. Your DNS can restrict which ones may issue with a CAA record, visible in the [DNS lookup](https://getmylocations.com/dns-lookup).

## Fingerprints and pinning

Apps and APIs sometimes accept only a server whose certificate matches a known fingerprint. Because certificates are renewed every few months, pinning the certificate means updating the pin each time; pinning the public key (its SHA-256 is shown for each certificate) or the issuing authority is less fragile.

To see the server software and security headers a site sends, use the [website server checker](https://getmylocations.com/website-server-checker).

## Frequently asked questions

Where does this tool get the certificates from?

From Certificate Transparency (CT) logs, public append-only logs that every trusted certificate authority must write each certificate to before browsers accept it. The tool searches them through SSLMate’s Cert Spotter service.

Is this the certificate my server is using right now?

It lists all currently valid certificates issued for the name. Usually the newest one is the one in use. To be sure, compare the fingerprint here with the one your browser shows (padlock › Connection is secure › Certificate details).

What is a certificate fingerprint?

A hash of the whole certificate: SHA-256 is 32 bytes, SHA-1 is 20 bytes, written as hex pairs. It identifies one exact certificate and is used for certificate pinning, API allow-lists and checking you are talking to the right server.

Why do some certificates show only 90 days?

Let’s Encrypt and many others issue 90-day certificates and renew them automatically. Industry rules are shortening all public certificates further, to 47 days by 2029.

Can I find certificates I did not know about?

Yes, and that is a key use of CT logs: if a certificate appears for your domain that you did not request, someone may have mis-issued it. Report it to the issuer.

## Related tools

[

### Website Server Checker

Server software and headers

](https://getmylocations.com/website-server-checker)[

### Domain Age Checker

When a domain was registered

](https://getmylocations.com/domain-age-checker)[

### View Page Source

HTML source of any page

](https://getmylocations.com/view-page-source)[

### Open Graph Checker

Preview a link’s share card

](https://getmylocations.com/open-graph-checker)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
