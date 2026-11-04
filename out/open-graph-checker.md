---
title: "Open Graph Checker: Preview Link Cards for Facebook & X"
description: "Check a page’s Open Graph and Twitter Card tags and preview its link on Facebook, LinkedIn, WhatsApp and X, with fixes for missing tags and small images."
url: https://getmylocations.com/open-graph-checker
---

Free Tool · Social share preview

# Open Graph checker: how will this link look when shared?

Enter a page address to **preview its share card** on Facebook, LinkedIn, WhatsApp and X, see every **Open Graph and Twitter Card tag**, and get a list of what to fix, including image size.

Last updated November 4, 2026 by [Ahmed Anwar](https://getmylocations.com/about).

## Check a page’s Open Graph tags

Try:

## What is an Open Graph checker?

An Open Graph checker reads the hidden tags in a page’s HTML that social apps use to build a link preview: the title, short description and picture you see when someone shares the address. [Open Graph](https://ogp.me/) was created by Facebook and is now read by LinkedIn, WhatsApp, Slack, Discord, Telegram and others; X adds its own Twitter Card tags. This checker shows the tags, draws the preview, and tells you what is missing before you share.

## The tags every page should have

| Tag | Example |
| --- | --- |
| og:title | `<meta property="og:title" content="Radius Map">` |
| og:description | One or two sentences, under about 200 characters |
| og:image | Full https:// address of a 1200 × 630 image |
| og:image:alt | A short description of the image, read aloud by screen readers |
| og:url | The canonical address of the page |
| og:type | `website` for most pages, `article` for posts |
| twitter:card | `summary_large_image` |

## What the checker tests

-   **Fix:** `og:title` or `og:image` is missing, or the image address does not load.
-   **Tip:** `og:description`, `og:url` or `twitter:card` is missing; the image is smaller than 1200 × 630; or `og:title` is longer than 90 characters and will be cut off.
-   **OK:** the image loads and is at least 1200 pixels wide.

The image is measured by loading it in your browser, the same way a social app would. The page itself is fetched once by our server, so a page behind a login shows its logged-out tags, which is what social apps see too.

## How each app builds the preview

| App | Reads | Notes |
| --- | --- | --- |
| Facebook | og: tags | Caches the preview; refresh it in the Sharing Debugger |
| LinkedIn | og: tags | Caches for about a week; refresh it in Post Inspector |
| WhatsApp | og: tags | Often shows a small square thumbnail; keep text in the centre of the image |
| X (Twitter) | twitter: tags, then og: | Needs twitter:card = summary\_large\_image for the big picture |
| Slack, Discord, Telegram | og: and twitter: tags | Show the site name from og:site\_name when it is set |

## Why is my link preview wrong or not showing?

-   **An old preview:** the app cached it before your fix. Use Facebook’s Sharing Debugger or LinkedIn’s Post Inspector; on WhatsApp, a slightly changed address (such as adding `?v=2`) is fetched fresh.
-   **Relative image paths** such as `/img/share.png`: some platforms need the full address.
-   **Tags added by JavaScript:** share crawlers read only the original HTML, so tags must be in the page source.
-   **The site blocks bots:** a firewall that challenges unknown visitors also blocks the apps’ preview crawlers, so no card appears.
-   **One image for every page:** works, but a page-specific image gets more clicks.

Check the raw HTML with [View Page Source](https://getmylocations.com/view-page-source), or every link on the page with the [link analyzer](https://getmylocations.com/link-analyzer). To open a list of your pages in tabs and review them one after another, use the [multiple URL opener](https://getmylocations.com/multiple-url-opener).

## Frequently asked questions

What are Open Graph tags?

Meta tags in a page’s HTML, such as og:title, og:description and og:image, that tell Facebook, LinkedIn, WhatsApp, Slack and others what title, text and picture to show when someone shares the link.

What size should an og:image be?

1200 × 630 pixels (a 1.91:1 ratio) works everywhere. Keep important text away from the edges, since some apps crop to a square, and keep the file under about 5 MB.

I fixed my tags but Facebook still shows the old preview

Facebook and LinkedIn cache previews. Open Facebook’s Sharing Debugger or LinkedIn’s Post Inspector, enter the address and ask them to scrape it again.

Does X (Twitter) use Open Graph?

X reads its own twitter: tags first and falls back to Open Graph. Add twitter:card = summary\_large\_image to get the large picture card.

Do Open Graph tags help SEO?

Not directly: Google does not rank pages by their og: tags. They decide how a link looks when shared, and a clear title and picture get more clicks from social apps and chats, which brings visitors who may link to the page.

Why does the checker say the image could not be loaded?

The address in og:image returned an error, is not a public https:// address, or the image host blocks requests from other sites. Open the image address in a new tab; if it does not show there, social apps cannot load it either.

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
