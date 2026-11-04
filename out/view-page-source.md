---
title: "View Page Source: See Any Website’s HTML Code Online"
description: "View the HTML source code of any web page online, on any device, with line numbers, search and copy. Works on phones and tablets with no View Source option."
url: https://getmylocations.com/view-page-source
---

Free Tool · Any device

# View page source: see any page’s HTML

Enter a web address to see the page’s **HTML source** with **line numbers**. Search inside it, wrap or unwrap long lines, and copy it. Handy on phones and tablets, which have no View Source button.

Last updated November 4, 2026 by [Ahmed Anwar](https://getmylocations.com/about).

## View the HTML source of a page

Try:

## What is page source?

A web page’s source is the HTML code the server sends to your browser: the text, the tags around it, and links to the styles, scripts and images that make up the page. The browser turns it into what you see. Viewing the source shows what is really on a page, including things you never see, such as the title tag, meta description, structured data and tracking scripts.

## How to view page source in each browser

| Browser | How |
| --- | --- |
| Chrome, Edge (Windows, Linux) | `Ctrl` + `U`, or right-click › View page source |
| Chrome, Edge (Mac) | `⌥` + `⌘` + `U` |
| Firefox | `Ctrl` + `U` on Windows and Linux, `⌘` + `U` on Mac |
| Safari (Mac) | Settings › Advanced › Show features for web developers, then `⌥` + `⌘` + `U` |
| Chrome on Android | Type `view-source:` in front of the address |
| Safari on iPhone and iPad | No built-in option: paste the address into the tool above |

## What to look for in the source

-   **SEO tags:** search for `<title`, `name="description"`, `rel="canonical"` and `robots`.
-   **Structured data:** search for `application/ld+json` to find schema markup.
-   **Tracking and ads:** search for `gtag`, `googletagmanager` or an ad network’s name to see which scripts load.
-   **Verification codes:** check a `google-site-verification` meta tag is really on the page.

## Page source vs Inspect Element

**Page source** is the original HTML, exactly as the server sent it. **Inspect Element** (the Elements panel in developer tools) shows the page as it is now, after JavaScript has added, removed or changed parts of it. Search engines and social apps read the original HTML first, so the source is the better test of whether a title, link or tag is really there. Inspect is better for finding why something looks wrong on screen.

## Why does the source look empty or different?

-   **The site is built with JavaScript:** many apps send an almost empty page with a `<div id="root">` and fill it in later. The source shows only that shell.
-   **All on one line:** the HTML is minified to save space. Turn **Wrap lines** on and use the search box.
-   **A different page:** the address redirected, for example to a login or a country version. The tool shows the final address under the toolbar.
-   **An error page:** the status shown is 403 or 503 when a firewall blocks automated visitors.

## Limits

Pages are fetched once from our server, so pages behind a login or a paywall show the logged-out version. The tool follows up to 10 redirects, waits up to 10 seconds, and cuts the source at 1.5 MB, which covers almost all pages; the same address is cached for five minutes. Social sharing tags are easier to check with the [Open Graph checker](https://getmylocations.com/open-graph-checker), and links with the [link analyzer](https://getmylocations.com/link-analyzer). To open many pages in tabs at once, use the [multiple URL opener](https://getmylocations.com/multiple-url-opener).

## Frequently asked questions

How do I view page source on a phone?

Mobile browsers mostly hide View Source. Paste the page address into this tool instead: it shows the same HTML with line numbers and search, on any phone or tablet.

Why is the source different from what I see in the browser?

This shows the HTML the server sends. Many sites then build or change the page with JavaScript, and that is not in the original source. Browser developer tools (Elements panel) show the page after JavaScript runs.

How do I view source on a computer?

Press Ctrl+U (Windows, Linux) or ⌥⌘U (Mac) in Chrome, Edge and Firefox, or type view-source: before the address. In Safari, first turn on Settings › Advanced › Show features for web developers.

Can I see a site’s server code or database?

No. View source only shows what the server sends to every visitor: HTML, and links to CSS and JavaScript. The code that runs on the server is never visible.

Is it allowed to view a website’s source code?

Yes. The source is what the site sends to every visitor’s browser, and every browser can show it. Copying the design, text or images into your own site is a different matter: they are still covered by copyright.

Why does the tool say the site could not be reached?

The site did not answer within 10 seconds, the address does not exist, or its firewall blocks automated visitors. Our fetcher identifies itself as GetMyLocationsBot; some sites refuse every bot. Your own browser’s View Source still works on those pages.

## Related tools

[

### Open Graph Checker

Preview a link’s share card

](https://getmylocations.com/open-graph-checker)[

### Website Link Analyzer

All links on a page

](https://getmylocations.com/link-analyzer)[

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
