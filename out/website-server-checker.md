---
title: "Website Server Checker: Server, OS & HTTP Headers (Free)"
description: "See what a website runs on: server software, operating system when disclosed, CDN, CMS and framework, plus redirects, response time and missing security headers."
url: https://getmylocations.com/website-server-checker
---

Free Tool · Live HTTP check

# Website server checker: what is this site running on?

Enter a website to see its **server software**, **the operating system** when the server discloses it, the CDN, CMS and framework behind it, any redirects and the response time, and **which security headers are missing**.

## Check a website’s server

Try:

Sponsored

## How the check works

The tool requests the page once from our server, follows up to ten redirects, and records the response headers and the HTML. It then looks for known signatures: a `cf-ray` header means Cloudflare, `wp-content` in the HTML means WordPress, and the `Server` header often names the web server and sometimes its operating system.

## What the results are good for

-   **Security review:** missing headers are quick wins, and a server that advertises an old version number is worth updating or hiding.
-   **Migration checks:** after moving host or adding a CDN, confirm the new stack is the one answering.
-   **Redirect problems:** see every hop, such as http → https → www, and remove unnecessary ones that slow the first visit.

To read the page’s full HTML, use [View Page Source](https://getmylocations.com/view-page-source); for its social sharing tags, the [Open Graph checker](https://getmylocations.com/open-graph-checker).

## Frequently asked questions

Can you always tell a website’s operating system?

No. A site only reveals its operating system if its server says so, for example “Apache/2.4.58 (Ubuntu)” or Microsoft IIS, which runs only on Windows. Most sites behind Cloudflare or another CDN show the CDN instead, and well-configured servers hide their version on purpose.

What are HTTP response headers?

Short lines of information a server sends before the page itself: the status code, content type, caching rules, cookies and security settings. Browsers act on them; this tool shows them all.

Which security headers should a site have?

At least HSTS (Strict-Transport-Security), X-Content-Type-Options: nosniff, a Referrer-Policy and protection against framing (X-Frame-Options or a CSP frame-ancestors rule). A Content-Security-Policy is the strongest protection against injected scripts, but takes care to set up.

Why does my site show a different server than my host?

If your site is behind a CDN or proxy such as Cloudflare, visitors connect to the CDN, so the Server header shows “cloudflare”. Your own server is only seen by the CDN.

## Related tools

[

### SSL Certificate Checker

Certificates and fingerprints

](https://getmylocations.com/ssl-certificate-checker)[

### View Page Source

HTML source of any page

](https://getmylocations.com/view-page-source)[

### Domain Age Checker

When a domain was registered

](https://getmylocations.com/domain-age-checker)[

### Open Graph Checker

Preview a link’s share card

](https://getmylocations.com/open-graph-checker)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
