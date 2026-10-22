---
title: "Open Graph Checker: Preview Link Cards for Facebook & X"
description: "Check a page’s Open Graph and Twitter Card tags and preview how its link looks on Facebook, LinkedIn, WhatsApp and X, with fixes for missing tags and small images."
url: https://getmylocations.com/open-graph-checker
---

Free Tool · Social share preview

# Open Graph checker: how will this link look when shared?

Enter a page address to preview its share card on Facebook, LinkedIn, WhatsApp and X, see every Open Graph and Twitter Card tag, and get a list of what to fix, including image size.

## Check a page’s Open Graph tags

Try:

Sponsored

## The tags every page should have

| Tag | Example |
| --- | --- |
| og:title | `<meta property="og:title" content="Radius Map">` |
| og:description | One or two sentences, under about 200 characters |
| og:image | Full https:// address of a 1200 × 630 image |
| og:url | The canonical address of the page |
| og:type | `website` for most pages, `article` for posts |
| twitter:card | `summary_large_image` |

## Common mistakes

-   **Relative image paths** such as `/img/share.png`: some platforms need the full address.
-   **Tags added by JavaScript:** share crawlers read only the original HTML, so tags must be in the page source.
-   **One image for every page:** works, but a page-specific image gets more clicks.

Check the raw HTML with [View Page Source](https://getmylocations.com/view-page-source), or every link on the page with the [link analyzer](https://getmylocations.com/link-analyzer).

## Frequently asked questions

What are Open Graph tags?

Meta tags in a page’s HTML, such as og:title, og:description and og:image, that tell Facebook, LinkedIn, WhatsApp, Slack and others what title, text and picture to show when someone shares the link.

What size should an og:image be?

1200 × 630 pixels (a 1.91:1 ratio) works everywhere. Keep important text away from the edges, since some apps crop to a square, and keep the file under about 5 MB.

I fixed my tags but Facebook still shows the old preview

Facebook and LinkedIn cache previews. Open Facebook’s Sharing Debugger or LinkedIn’s Post Inspector, enter the address and ask them to scrape it again.

Does X (Twitter) use Open Graph?

X reads its own twitter: tags first and falls back to Open Graph. Add twitter:card = summary\_large\_image to get the large picture card.

## Related tools

[

### View Page Source

HTML source of any page

](https://getmylocations.com/view-page-source)[

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
