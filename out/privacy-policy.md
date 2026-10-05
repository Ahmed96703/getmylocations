---
title: "Privacy Policy"
description: "How GetMyLocations handles your location data, what the third-party reverse-geocoding services receive, and what cookies Google AdSense sets."
url: https://getmylocations.com/privacy-policy
---

# Privacy Policy

Last updated: October 5, 2026

This page explains what information GetMyLocations receives when you use the site, what we do with it, and which third parties are involved. The summary at the top covers the common questions; the sections below give the details for anyone who wants them.

## Short summary

-   The GPS coordinate the site reads from your browser stays in your browser.
-   Only the coordinate itself is sent to a third-party service so we can show a city name. No identifier we control travels with it.
-   We do not run analytics that profile you. We do not have an account system.
-   The host (Cloudflare) keeps short-lived request logs the way any web host does.
-   Google AdSense, once enabled, will set its own advertising cookies. You can opt out of personalization at any time.

## 1\. What we read from your browser

When you click any location button on the site, the browser asks the operating system for your position and returns a latitude and longitude to the page. That coordinate is held in memory in the open tab. We do not write it to a database we own, and there is no account to attach it to. Closing the tab discards it.

Some tools also call `navigator.geolocation.watchPosition`, which subscribes to updates as you move. The same rule applies: the updates are kept in the tab until you close it or stop watching.

## 2\. Reverse geocoding — what the third party sees

A coordinate on its own is just numbers. To show a readable city and country, the page sends the coordinate to a reverse-geocoding service. We use:

-   **BigDataCloud** — the first choice for the homepage tool. Their privacy policy is published at bigdatacloud.com/privacy-and-cookie-policy.
-   **OpenStreetMap Nominatim** — used by the Address Finder and as a fallback elsewhere. Their privacy policy is published at wiki.osmfoundation.org/wiki/Privacy\_Policy.

Each request contains the coordinate and your IP (visible to any web service you connect to). It does not contain a username, an email, or any identifier we attach. Both services have their own retention policies linked above.

## 3\. Map tiles

The maps you see are rendered with Leaflet and use tile images from OpenStreetMap and CARTO. Loading a tile reveals your IP and the tile coordinate to those providers, the same as any embedded map would. Their privacy policies are published at wiki.osmfoundation.org/wiki/Privacy\_Policy and carto.com/privacy.

## 4\. IP lookups (IP Location tool)

The IP Location tool calls the public ipapi.co endpoint (privacy policy at ipapi.co/privacy). The IP you look up — your own when you click _Lookup my IP_, or any IP you paste — is sent to ipapi.co, which returns the geolocation data. Their policy covers what they keep.

If you type a domain name (such as example.com) into the IP Location tool, your browser first asks Cloudflare’s public DNS resolver (cloudflare-dns.com, the 1.1.1.1 service) for the domain’s IP address, then looks that IP up at ipapi.co. Cloudflare receives the domain name and your IP address as part of that DNS request; see 1.1.1.1/privacy. Private and reserved addresses (such as 192.168.x.x) are recognised in your browser and are not sent to either service. The optional “Measure the gap” check reads your device location in the browser and only compares it with the lookup result there; that reading is not sent anywhere.

## 5\. Hosting and request logs

The site is hosted on Cloudflare. Like every web host, Cloudflare keeps short request logs (IP address, user agent, URL requested, timestamp) so that abuse and outages can be diagnosed. We do not pull those logs into a separate analytics tool. Cloudflare’s privacy policy is published at cloudflare.com/privacypolicy.

## 6\. Advertising — Google AdSense

Once Google AdSense is enabled on the site, Google and its advertising partners may set cookies (for example `__gads`, `__gpi`, and `NID`) to serve advertisements, prevent fraud, and — where you have consented — personalize them. You can review and change your ad personalization settings at adssettings.google.com or opt out of personalized advertising network-wide at aboutads.info/choices.

For visitors in the European Economic Area, the United Kingdom, and Switzerland, the AdSense Consent Management Platform shows a consent dialog the first time you visit, in line with GDPR and ePrivacy rules.

## 7\. What we do not do

-   We do not run our own analytics that profile you across pages.
-   We do not sell or rent data to anyone.
-   We do not have user accounts, so there is no profile to compromise.
-   We do not store your GPS coordinates on a server we own.

## 8\. Children

The site is a general-audience utility and is not directed at children under 13. If you believe a child has provided personal information through the site, contact us at [ahmed@getmylocations.com](mailto:ahmed@getmylocations.com) and we will respond promptly.

## 9\. Your rights

Under GDPR, CCPA, and similar laws, you have rights to access, correct, or delete personal data held about you. Because we do not store personal data on our own servers, requests are best directed to the third-party services listed above. You can revoke browser location permission at any time through your browser’s site settings.

## 10\. Changes to this policy

We update this page when the services we use change. The date at the top reflects the most recent revision. Material changes will be noted briefly at the top of the page for a reasonable period.

## 11\. Contact

Questions about anything on this page can go to [ahmed@getmylocations.com](mailto:ahmed@getmylocations.com). See the [Contact page](https://getmylocations.com/contact) for response-time expectations.
