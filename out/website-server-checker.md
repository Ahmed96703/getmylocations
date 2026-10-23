---
title: "Website Server Checker: Who Is Hosting This Site? (Free)"
description: "Check host and server details of any website: who hosts the site, server IP and location, server software, CDN, CMS, response time and security headers. Free."
url: https://getmylocations.com/website-server-checker
---

Free Hosting Checker · Live server check

# Website Server Checker

Enter a website in this **website server checker** to **check host and server details**: **who is hosting the site**, its **server IP and location**, the server software and operating system when disclosed, the CDN, CMS and framework, any redirects and the response time, and **which security headers are missing**.

## Check a website’s server

Try:

Sponsored

## How to check who is hosting a website

-   **Enter the address,** such as example.com or a full link. The checker follows redirects to the page visitors really land on.
-   **Read “Hosting & server location”:** the server IP (a **website IP lookup**), the company it belongs to (the **web host** or CDN) and the estimated city and country, like a **server location checker**.
-   **Read the server details:** server software, operating system when shown, response time, and the platform, CMS and framework detected.
-   **Check the security headers** to see which protections the site is missing.

For the full ownership record of the server’s IP, including its address range and abuse contact, paste the IP into the [IP WHOIS lookup](https://getmylocations.com/ip-whois-lookup). For all of a domain’s DNS records, use the [DNS lookup](https://getmylocations.com/dns-lookup).

## What the server details tell you

| Result | What it means |
| --- | --- |
| Server IP | The address the domain points to: the site server, or the CDN edge in front of it |
| Hosted by | The company that owns that IP’s network: the hosting provider, cloud or CDN |
| Server location | Estimated city and country of that IP, the “domain location” people search for |
| Server software | Web server named in the Server header, such as nginx, Apache, LiteSpeed or IIS |
| Response time | How long the server took to answer, in milliseconds, like a ping for websites |
| Detected technology | CDN, hosting platform, CMS and framework found in the headers and HTML |

## How the check works

To **check the server of a website**, and see **what server a website is using**, the tool requests the page once from our server, follows up to ten redirects, and records the response headers and the HTML. It then looks for known signatures: a `cf-ray` header means Cloudflare, `wp-content` in the HTML means WordPress, and the `Server` header often names the web server and sometimes its operating system.

To find the host, it resolves the domain to its IP address with public DNS and looks up which network that IP belongs to and roughly where it is. This is how any **hosting checker**, **web host lookup** or **hosting provider lookup** works, and why a site behind a CDN shows the CDN: the real origin server is deliberately hidden.

## What the results are good for

-   **Finding a site’s host:** answer “**who hosts this site**?” or “**who is hosting this**?” and **find the website host** to report abuse or a copyright problem to the hosting company, or to see which host a competitor uses.
-   **Security review:** as an **HTTP header checker** and **security headers check**, it shows missing headers, which are quick wins, and a server that advertises an old version number is worth updating or hiding.
-   **Migration checks:** after moving host or adding a CDN, confirm the new server is the one answering and the site server is in the right country.
-   **Speed checks:** the **website response time** works like a quick way to **ping a website**; a slow one points to the server or hosting plan rather than the page itself.
-   **Redirect problems:** see every hop, such as http → https → www, and remove unnecessary ones that slow the first visit.

To read the page’s full HTML, use [View Page Source](https://getmylocations.com/view-page-source); for its social sharing tags, the [Open Graph checker](https://getmylocations.com/open-graph-checker); and to see how long the domain has been registered, the [domain age checker](https://getmylocations.com/domain-age-checker).

## Frequently asked questions

How do I find out who is hosting a website?

Enter the website’s address and press Check. The “Hosted by” row shows the company that owns the network the server’s IP address belongs to, which is usually the hosting provider. If the site is behind a CDN such as Cloudflare, you will see the CDN instead, because that is the server visitors actually reach.

Where is a website’s server located?

The checker resolves the domain to its server IP and estimates that IP’s city and country. For sites behind a CDN, the IP belongs to the CDN, so the location is the CDN’s, not the site’s origin server, which the CDN keeps hidden.

Is this the same as pinging a website?

It is close. A ping sends a tiny network packet; this tool makes a real web request and reports the response time in milliseconds, which is what visitors actually experience. Many servers block ping but always answer web requests.

Is this hosting checker free?

Yes. It is free with no signup and no limit. Check as many websites as you like.

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

### IP WHOIS Lookup

Who owns an IP address

](https://getmylocations.com/ip-whois-lookup)[

### DNS Lookup

A, AAAA, CNAME, TXT and more

](https://getmylocations.com/dns-lookup)[

### Domain Age Checker

When a domain was registered

](https://getmylocations.com/domain-age-checker)[

### SSL Certificate Checker

Certificates and fingerprints

](https://getmylocations.com/ssl-certificate-checker)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
