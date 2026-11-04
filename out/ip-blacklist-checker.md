---
title: "Blacklist Checker: Free IP & Email Blacklist Check"
description: "Free blacklist check for any IP, domain or email address: is my IP blacklisted? See results from 14 spam blacklists at once, the reason, and how to get removed."
url: https://getmylocations.com/ip-blacklist-checker
---

Free Blacklist Checker · 14 blacklists at once

# Blacklist Checker

**Is my IP blacklisted?** Enter an IPv4 address, a domain or an email address for a **free blacklist check** against **14 widely used spam blacklists**, with the reason and a link to each list. For an **email blacklist check**, the tool tests the mail server that handles the domain’s email. Your own IP is checked to start.

Last updated November 4, 2026 by [Ahmed Anwar](https://getmylocations.com/about).

## Check an IP, domain or email against spam blacklists

Try:

## How to check if your IP or email is blacklisted

-   **Your own IP:** nothing to type. The page runs an **IP blacklist check** on your current address as soon as it opens, answering “**is my IP address blacklisted?**”.
-   **Another IP:** paste any IPv4 address, such as a mail server or a visitor that sent spam.
-   **A domain or email address:** type `example.com` or `you@example.com` to **check if your email is blacklisted**. The tool looks up the domain’s mail server and runs a **mail server blacklist check** on its IP.

Results arrive list by list in a few seconds. The summary says how many of the 14 lists include the address, and each row links to the list’s own page, where you can read the details and request **blacklist removal**.

## Email blacklist: why your emails go to spam

An **email blacklist** is a list of IP addresses that mail servers refuse or distrust. When your mail server’s IP is on one, messages you send may bounce with errors like “554 rejected, listed at …” or quietly land in spam. A **domain blacklist check** and an **SMTP blacklist check** both come down to the same question: is the IP your email leaves from on a list?

| Symptom | Likely cause | What to check |
| --- | --- | --- |
| Bounces mentioning a list name | Your sending IP is blacklisted | Run the check above, then follow the removal link |
| Mail lands in spam, no bounce | Missing SPF, DKIM or DMARC, or poor reputation | The DMARC checker and the email header analyzer |
| Only one recipient rejects you | That provider’s own filter, not a public list | Their bounce message and postmaster pages |
| Listed after a hacked account or form | Spam sent through your server | Change passwords, fix the form, then request removal |

## How blocklists work

A DNS blocklist (DNSBL or RBL) is a list of IP addresses published through DNS. When a mail server receives a message, it reverses the sender’s IP and asks the list: for `203.0.113.7` on SpamCop it asks for `7.113.0.203.bl.spamcop.net`. An answer such as `127.0.0.2` means listed; “no such name” means not listed. This **blacklist checker** asks the same questions, so you see what mail servers see. It is the same **DNSBL check** or **RBL check** mail admins run, and a quick **IP reputation check**.

## If your IP is listed

1.  **Read the reason** shown in the results and on the list’s site. It often names the date and type of problem.
2.  **Fix the cause.** Scan devices for malware, change passwords of mail accounts that may be compromised, close open relays, and protect website forms with a captcha.
3.  **Check your mail setup.** Make sure the server has SPF, DKIM and DMARC records and a matching reverse DNS name. The [DMARC checker](https://getmylocations.com/dmarc-checker) helps, and the [MX lookup](https://getmylocations.com/mx-lookup) shows which servers receive your mail.
4.  **Request removal** through the list’s own page. Some, such as SpamCop and blocklist.de, drop listings automatically once spam stops; the table below gives each listSome, such as SpamCop and PSBL, expire listings automatically once spam stops.rsquo;s process.

## How to get removed from each blacklist

Fix the cause first: every list below adds the address again if spam keeps coming from it. Then follow the list’s own process. Many lists need no request at all and drop the address once the spam stops.

| Blacklist | How removal works | How long |
| --- | --- | --- |
| Spamhaus | Look the address up at [check.spamhaus.org](https://check.spamhaus.org/); it explains the listing and offers the removal steps for that list | Depends on the list |
| Barracuda | Fill in the [removal request](https://www.barracudacentral.org/rbl/removal-request) form with the IP, your email and a reason. Requests without valid details are ignored | Usually within 12 hours |
| SpamCop | Automatic: no request needed. [SpamCop](https://www.spamcop.net/bl.shtml) drops the address when reports stop | About 24 hours after the last report |
| UCEPROTECT Level 1 | Automatic, or a paid express removal. See its [removal policy](https://www.uceprotect.net/en/index.php?m=7&s=6). Levels 2 and 3 list whole networks: ask your provider | 7 days after the last spam |
| PSBL | Self-service: anyone can remove an address on [psbl.org](https://psbl.org/) | Immediate, then DNS updates |
| Mailspike (both lists) | Use the delist form on its [IP check page](https://mailspike.io/ip_verify). Botnet listings wait until the infection is gone | 6 to 36 hours |
| blocklist.de | Automatic, or early removal on the [delist page](https://www.blocklist.de/en/delist.html) once the problem is fixed | 48 hours, or within an hour of a request |
| 0spam | Automatic for its realtime list; otherwise a free account and a removal request on [0spam.org](https://0spam.org/) | 24 hours; long-term listings need 60 days clean |
| SPFBL | Free [delist](https://spfbl.net/en/delist/) if the server’s reverse DNS points back to it; a paid option otherwise | Not stated |
| DroneBL | Look the address up on [dronebl.org](https://dronebl.org/lookup) and follow the instructions it gives | Not stated |
| InterServer, GBUdb, Anonmails, s5h.net | Follow the link next to the list in your results above | See the list’s site |

Checked on each list’s own website on 4 November 2026. Lists change their rules, so the list’s page is always the final word. If an address keeps coming back, ask its owner: the [IP WHOIS lookup](https://getmylocations.com/ip-whois-lookup) shows the abuse contact.

## Which lists matter most

-   **Spamhaus** is the most widely used. It cannot be checked from a browser tool; use [check.spamhaus.org](https://check.spamhaus.org/).
-   **Barracuda** and **SpamCop** are used by many business mail servers, so a **Barracuda blacklist check** and a **SpamCop blacklist check** are both included above.
-   **UCEPROTECT Level 1** lists single addresses; its Levels 2 and 3 list whole networks and are used far less.

To see who is responsible for an address, use the [IP WHOIS lookup](https://getmylocations.com/ip-whois-lookup).

## “Your IP has been banned”: is that a blacklist?

Usually not. When a website, game or forum says **your IP has been banned**, that is the site’s own block, kept on its own servers, and it does not appear on the spam blacklists checked here. Common causes are too many failed logins, a shared IP that someone else misused, or a VPN address the site blocks.

-   **Turn off a VPN or proxy** and try again from your normal connection.
-   **Restart your router.** Many home providers give you a new IP address when it reconnects.
-   **Contact the site** with your IP address (shown at the top of the results) and ask why it was blocked.

If spam blacklists list your IP too, that points to malware or a misused connection: fix that first, then ask the site to lift the ban.

## Frequently asked questions

How long does it take to get off a blacklist?

It depends on the list. SpamCop drops a listing about 24 hours after reports stop, blocklist.de after 48 hours, and UCEPROTECT Level 1 seven days after the last spam reached its traps. Barracuda reviews removal requests, usually within 12 hours, and Mailspike removes an address 6 to 36 hours after a delist request. All of them list the address again if the spam continues.

Do I have to pay to be removed from a blacklist?

No, not from the main lists. SpamCop, PSBL, blocklist.de, Mailspike and 0spam remove addresses for free, by request or automatically. UCEPROTECT offers a paid express removal, but its Level 1 listings expire on their own after seven days, so paying is optional.

Is my IP blacklisted?

Open this page and your own IP address is checked straight away against 14 spam blacklists. A green result means it is on none of them; a red one names each list and the reason it gives.

How do I do an email blacklist check?

Type your email address or its domain, such as you@example.com or example.com. The checker finds the mail server that handles the domain’s email (its MX record) and checks that server’s IP address against every blacklist, because that is the address other mail servers judge you by.

Is this blacklist checker free?

Yes. It is free with no signup and no limit, for IP addresses, domains and email addresses.

What does it mean if my IP is blacklisted?

A blocklist operator has seen spam, malware or attacks coming from that address, or it belongs to a range that should not send mail directly, such as home connections. Mail servers that use the list may reject or junk email from it.

Why is my home IP listed?

Some lists include whole ranges of home and mobile addresses on purpose, because legitimate mail should leave through a mail provider, not straight from a home connection. It does not mean you did anything wrong, and it does not affect browsing.

How do I get my IP removed from a blacklist?

First fix the cause: an infected device, an open relay, a hacked website form or a compromised mail account. Then follow the removal link on the list’s own site, linked in the results. Many lists remove addresses automatically after a quiet period.

Why is Spamhaus not in the list?

Spamhaus refuses lookups that come through public DNS services, which is how a browser-based checker works, so the result would always be an error. Check Spamhaus directly at check.spamhaus.org.

Does a listing affect my website?

Usually not. DNS blocklists are used mainly by mail servers. Browsers and search engines do not use them to block websites.

## Related tools

[

### MX Lookup

Mail servers for a domain

](https://getmylocations.com/mx-lookup)[

### DMARC Checker

Check a domain’s DMARC and SPF

](https://getmylocations.com/dmarc-checker)[

### IP WHOIS Lookup

Who owns an IP address

](https://getmylocations.com/ip-whois-lookup)[

### Email Validator

Check an address can receive mail

](https://getmylocations.com/email-validator)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
