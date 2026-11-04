---
title: "Link Analyzer: Check Internal, External & Nofollow Links"
description: "List every link on a web page with its anchor text, see internal, external and nofollow counts, find empty anchors, and export the list as CSV. Free SEO tool."
url: https://getmylocations.com/link-analyzer
---

Free Tool · SEO

# Website link analyzer: every link on a page

Enter a page address to list **all its links** with their anchor text, split into **internal, external, nofollow** and other links, spot links with no anchor text, and copy the list as CSV.

Last updated November 4, 2026 by [Ahmed Anwar](https://getmylocations.com/about).

## Analyze the links on a page

Try:

## What is a link analyzer?

A link analyzer reads a web page and lists every link on it: where each one points, the words people click (the anchor text), and how it is marked for search engines. It is a quick way to check a page’s internal linking, find links you forgot to label as paid or affiliate, and see which other sites a page points to.

## How to read the results

| Result | What it counts |
| --- | --- |
| Total links | Every link in the HTML, including repeats of the same address |
| Unique addresses | How many different addresses those links point to |
| Internal | Links to the same host name, with or without www |
| External | Links to any other site, including your own subdomains |
| Nofollow | Links with `rel="nofollow"`; `sponsored`, `ugc` and “new tab” show in the Rel column |
| Without anchor text | Links with no words and no image alt text: often icon buttons |
| Email, phone & other | `mailto:`, `tel:` and other non-web links |

## What to look for

-   **Empty anchor text:** links with no words, such as icon-only links without alt text, tell visitors and search engines nothing.
-   **Generic anchors:** “click here” and “read more” waste a chance to describe the target page.
-   **Paid or affiliate links** should carry `rel="sponsored"`.
-   **Too few internal links** to your important pages from the page you are checking.

## Good and weak anchor text

| Weak | Better | Why |
| --- | --- | --- |
| click here | check your MX records | Says what the target page does |
| read more | how IP geolocation works | Makes sense out of context, for screen readers too |
| (icon only) | an icon with alt text or an aria-label | Gives the link a name |
| best cheap tool best tool | compare speed test tools | Natural words, not repeated keywords |

Google uses anchor text to understand the page a link points to, and recommends text that is short, descriptive and relevant to the target, as described in its [link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).

## How many links should a page have?

There is no fixed number. Google dropped its old advice to keep pages under about 100 links years ago; what matters is that links are useful to the reader. As a working check, every important page on a site should be linked from several related pages with descriptive anchors, and a page you are checking should link to the next pages a reader is likely to need. A long list of footer or menu links is normal and not a problem.

## How it works

The page is fetched once from our server; links are read from its HTML in your browser and resolved to full addresses, so `/about` becomes `https://example.com/about`. Links that only jump within the page (`#section`) and JavaScript links are skipped. The table shows the first 1,000 links; **Copy as CSV** copies every link in the current filter, ready to paste into a spreadsheet. To open a list of links all at once, paste them into the [multiple URL opener](https://getmylocations.com/multiple-url-opener); to see where one address redirects, use the [website server checker](https://getmylocations.com/website-server-checker).

## Frequently asked questions

What does the link analyzer show?

Every link in the page’s HTML: the address, the anchor text (the clickable words), whether it points to the same site or another one, and its rel values such as nofollow, sponsored and ugc.

What is a nofollow link?

A link marked rel="nofollow" asks search engines not to pass ranking credit through it. rel="sponsored" marks paid links and rel="ugc" marks links in user content such as comments. Google treats all three as hints.

Why do internal links matter for SEO?

Search engines find and weigh pages through links. Pages linked from many places on your own site, with descriptive anchor text, are easier to discover and understand.

Why are some links missing?

The tool reads the HTML the server sends. Links added later by JavaScript, such as in some menus or infinite-scroll lists, are not in that HTML.

Does it check for broken links?

No. It lists the links on one page but does not visit each one. To test them, copy the list and open the addresses with the multiple URL opener, or check a single page’s status and redirects with the website server checker.

Are links to a subdomain counted as internal?

No. Only links to the same host name, with or without www, count as internal. A link from example.com to blog.example.com is listed as external, which matches how many SEO tools report it.

## Related tools

[

### Open Graph Checker

Preview a link’s share card

](https://getmylocations.com/open-graph-checker)[

### View Page Source

HTML source of any page

](https://getmylocations.com/view-page-source)[

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
