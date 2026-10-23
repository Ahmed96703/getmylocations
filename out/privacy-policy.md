---
title: "Privacy Policy — GetMyLocations"
description: "How GetMyLocations handles your location data, what the third-party reverse-geocoding services receive, and what cookies Google AdSense sets."
url: https://getmylocations.com/privacy-policy
---

# Privacy Policy

Last updated: October 24, 2026

This page explains what information GetMyLocations receives when you use the site, what we do with it, and which third parties are involved. The summary at the top covers the common questions; the sections below give the details for anyone who wants them.

## Short summary

-   The GPS coordinate the site reads from your browser stays in your browser.
-   Only the coordinate itself is sent to a third-party service so we can show a city name. No identifier we control travels with it.
-   We use Google Analytics to count visits and see which pages are used. We do not have an account system.
-   The host (Cloudflare) keeps short-lived request logs the way any web host does.
-   Ads are served by Adcash, and by Google AdSense once it is enabled. Each sets its own advertising cookies. You can opt out of personalization at any time.

## 1\. What we read from your browser

When you click any location button on the site, the browser asks the operating system for your position and returns a latitude and longitude to the page. That coordinate is held in memory in the open tab. We do not write it to a database we own, and there is no account to attach it to. Closing the tab discards it.

Some tools also call `navigator.geolocation.watchPosition`, which subscribes to updates as you move. The same rule applies: the updates are kept in the tab until you close it or stop watching.

## 2\. Reverse geocoding — what the third party sees

A coordinate on its own is just numbers. To show a readable street address, city and country, the page sends the coordinate to a reverse-geocoding service. We use:

-   **BigDataCloud** — the first choice for the city and country on the homepage tool. Their privacy policy is published at bigdatacloud.com/privacy-and-cookie-policy.
-   **OpenStreetMap Nominatim** — used for the nearest street address on the homepage and My Location, by the Address Finder, by the Street View tool to turn a typed address into coordinates, by What’s My Postcode for the nearest address and for postcodes outside the UK, and as a fallback elsewhere. Their privacy policy is published at wiki.osmfoundation.org/wiki/Privacy\_Policy.
-   **postcodes.io** — used by What’s My Postcode to find the UK postcode nearest a coordinate, or the details of a postcode you type. It is a free, open-source service maintained by Ideal Postcodes on Office for National Statistics data (source code at github.com/ideal-postcodes/postcodes.io). It does not publish a separate privacy policy; the request carries only the coordinate or postcode and your IP, as above.
-   **U.S. Census Bureau geocoder** — used by What’s My ZIP Code to find the county, city, districts, and Census ZIP area for a coordinate in the United States. The page loads the answer as a small script from geocoding.geo.census.gov, which receives the coordinate and your IP. The Census Bureau’s privacy policy is at census.gov/about/policies/privacy.html.
-   **FCC Area API** — a backup for the county and state on What’s My ZIP Code when the Census service does not answer. It receives the coordinate and your IP. The FCC’s privacy policy is at fcc.gov/general/privacy-policy.

Each request contains the coordinate and your IP (visible to any web service you connect to). It does not contain a username, an email, or any identifier we attach. Where a service publishes a privacy or retention policy, it is linked above.

## 3\. Map tiles

The maps you see are rendered with Leaflet and use tile images from OpenStreetMap, plus Esri (ArcGIS) imagery on the Satellite View tool and when you switch the Interactive Map to satellite view. Loading a tile reveals your IP and the tile coordinate to those providers, the same as any embedded map would. The Satellite View tool also asks Esri for the capture date of the photo at the centre of the map, which sends Esri that point’s coordinates. Their privacy policies are published at wiki.osmfoundation.org/wiki/Privacy\_Policy and esri.com/en-us/privacy.

The Driving Directions tool embeds a Google Maps route, and the Street View tool opens Google Street View (or embeds it on the page when enabled). Those embeds and links are served by Google, which receives your IP and the place or route shown, under the Google Privacy Policy at policies.google.com/privacy.

## 4\. IP lookups and the network, web and everyday tools

The IP Location tool calls the public freeipapi.com endpoint (privacy policy at freeipapi.com/privacy). The IP you look up — your own when you click _Lookup my IP_, or any IP you paste — is sent to freeipapi.com, which returns the geolocation data. Their policy covers what they keep.

On the My Location page, the rough location shown before you press the button is Cloudflare’s own estimate for your IP address, which this site’s server reads from the request and returns to your browser. It is not sent to any other service and is not stored.

On the homepage, if no exact location is available (you declined the prompt, it failed, or you have not answered yet), you can click _Show my approximate area_. Only then is your IP address sent to BigDataCloud (listed above) to estimate your city. Nothing is looked up unless you click.

If you type a domain name (such as example.com) into the IP Location tool, your browser first asks Cloudflare’s public DNS resolver (cloudflare-dns.com, the 1.1.1.1 service) for the domain’s IP address, then looks that IP up at freeipapi.com. Cloudflare receives the domain name and your IP address as part of that DNS request; see 1.1.1.1/privacy. Private and reserved addresses (such as 192.168.x.x) are recognised in your browser and are not sent to either service. The optional “Measure the gap” check reads your device location in the browser and only compares it with the lookup result there; that reading is not sent anywhere.

The network, web and everyday tools send only what you type to the service that answers it, directly from your browser: DNS questions to Cloudflare’s and Google’s public resolvers (and, for the blacklist and ASN checks, to the blocklists and Team Cymru through DNS); IP, ASN and domain registration lookups to the regional internet registries through rdap.org, and announced IP blocks to RIPEstat; certificate searches to SSLMate’s Cert Spotter; and the speed test to Cloudflare’s speed-test servers. Each of these sees your IP address as part of the request. Tools that read a web page (View Page Source, Open Graph Checker, Link Analyzer and Website Server Checker) ask our own server to fetch that page once; the address you enter passes through Cloudflare’s request logs like any other request, and we keep no copy of the page. The password, hash, random word, binary and unit tools, the email header analyzer, the IPv4 to IPv6 converter and the MAC lookup work entirely in your browser; what you type there is not sent anywhere.

## 5\. Hosting and request logs

The site is hosted on Cloudflare. Like every web host, Cloudflare keeps short request logs (IP address, user agent, URL requested, timestamp) so that abuse and outages can be diagnosed. We do not pull those logs into a separate analytics tool. Cloudflare’s privacy policy is published at cloudflare.com/privacypolicy.

## 6\. Analytics — Google Analytics

We use Google Analytics 4 to understand how many people visit, which pages and tools they use, and roughly where they come from (country and city level). Google Analytics sets first-party cookies (such as `_ga`) and receives your IP address, which Google Analytics 4 does not log or store. We see only totals, not individual visitors, and we do not link analytics to your GPS coordinates. You can opt out with Google’s browser add-on at tools.google.com/dlpage/gaoptout.

## 7\. Advertising — Adcash and Google AdSense

Once Google AdSense is enabled on the site, Google and its advertising partners may set cookies (for example `__gads`, `__gpi`, and `NID`) to serve advertisements, prevent fraud, and — where you have consented — personalize them. You can review and change your ad personalization settings at adssettings.google.com or opt out of personalized advertising network-wide at aboutads.info/choices.

For visitors in the European Economic Area, the United Kingdom, and Switzerland, the AdSense Consent Management Platform shows a consent dialog the first time you visit, in line with GDPR and ePrivacy rules.

Pop-under, full-screen, in-page and other ads on the site are served by Adcash. Adcash and its advertisers may set cookies and receive your IP address, device and browser details, and the page you are viewing, to choose and measure ads and to prevent fraud. Adcash’s privacy policy is published at adcash.com.

Until October 24, 2026 the site also showed ads from Monetag and Adsterra. If you allowed notifications from this site while Monetag was used, the notification service worker now removes itself the next time you visit; you can also turn notifications off at any time in your browser’s site settings.

## 8\. What we do not do

-   We do not use analytics to identify you or to build an advertising profile of you.
-   We do not sell or rent data to anyone.
-   We do not have user accounts, so there is no profile to compromise.
-   We do not store your GPS coordinates on a server we own.

## 9\. Children

The site is a general-audience utility and is not directed at children under 13. If you believe a child has provided personal information through the site, contact us at [ahmed@getmylocations.com](mailto:ahmed@getmylocations.com) and we will respond promptly.

## 10\. Your rights

Under GDPR, CCPA, and similar laws, you have rights to access, correct, or delete personal data held about you. Because we do not store personal data on our own servers, requests are best directed to the third-party services listed above. You can revoke browser location permission at any time through your browser’s site settings.

## 11\. Changes to this policy

We update this page when the services we use change. The date at the top reflects the most recent revision. Material changes will be noted briefly at the top of the page for a reasonable period.

## 12\. Contact

Questions about anything on this page can go to [ahmed@getmylocations.com](mailto:ahmed@getmylocations.com). See the [Contact page](https://getmylocations.com/contact) for response-time expectations.
