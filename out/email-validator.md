---
title: "Email Validator: Check If an Email Address Is Valid (Free)"
description: "Check an email address for typos, a valid format, a real domain and working mail servers, and spot throwaway and role addresses. Free, instant, no signup."
url: https://getmylocations.com/email-validator
---

Free Tool · Format, domain & mail servers

# Email validator: is this address real?

Type an **email address** to check its format, **catch common typos** such as gmial.com, confirm the domain exists and **has mail servers**, and spot throwaway and role addresses.

Last updated November 4, 2026 by [Ahmed Anwar](https://getmylocations.com/about).

## Check an email address

Try:

## What is an email validator?

An email validator checks whether an email address could receive mail before you send anything to it. It tests the address in layers: is it written correctly, is the domain a real one, and has that domain published mail servers. Each layer catches a different kind of bad address, from a mistyped `gmial.com` to a company domain that expired years ago.

## What the validator checks

-   **Format:** one @, a name of up to 64 allowed characters, and a real-looking domain. `anna..b@x.com` or `anna@x` fail.
-   **Typos:** slips such as `gmial.com` or `hotmail.co` are caught with a suggested fix.
-   **Domain:** the domain must exist in DNS.
-   **Mail servers:** the domain needs MX records; a “null MX” says it never takes mail.
-   **Throwaway and role addresses** are flagged so you can decide whether to accept them.

## What the results mean

| Result | When you see it | What to do |
| --- | --- | --- |
| Valid | Correct format, the domain exists and it has mail servers | Safe to use |
| Risky | A throwaway inbox service, or a domain with a website but no MX record | Accept with care, or ask for another address |
| Invalid | Bad format, a known typo, a domain that does not exist, no mail servers or a null MX | Ask the person to check and retype it |

A role address such as `support@` is flagged but not marked risky: it is a working inbox, just usually a shared one.

## Valid and invalid email address examples

Every verdict in this table comes from the same format check the tool runs:

| Address | Format | Why |
| --- | --- | --- |
| anna.smith@example.com | Valid | Ordinary address |
| anna+news@example.com | Valid | Plus addressing, used to sort or filter mail |
| o'brien@example.com | Valid | Apostrophes and many other symbols are allowed |
| anna..smith@example.com | Invalid | Two dots in a row |
| .anna@example.com | Invalid | Starts with a dot |
| anna smith@example.com | Invalid | Contains a space |
| anna@example | Invalid | No top-level domain such as .com |
| anna@-example.com | Invalid | Domain starts with a hyphen |
| anna@@example.com | Invalid | Two @ signs |
| aaaaaaaaaaaa…aa@example.com | Invalid | Name part is 65 characters, over the 64 limit |

The rules come from [RFC 5321](https://www.rfc-editor.org/rfc/rfc5321) and [RFC 5322](https://www.rfc-editor.org/rfc/rfc5322). The standards also allow rare forms such as quoted names with spaces (`"anna smith"@example.com`), but almost no real mailbox uses them and many websites reject them, so the tool treats them as invalid.

## Typos the validator catches

A misspelled domain is the most common reason a real person’s address bounces. These are the slips the tool recognizes, each with its suggested fix:

| Typed | Suggested fix |
| --- | --- |
| gmial.com | gmail.com |
| gmai.com | gmail.com |
| gamil.com | gmail.com |
| gmail.co | gmail.com |
| gmail.con | gmail.com |
| gnail.com | gmail.com |
| hotmial.com | hotmail.com |
| hotmal.com | hotmail.com |
| hotmail.co | hotmail.com |
| yahooo.com | yahoo.com |
| yaho.com | yahoo.com |
| yahoo.co | yahoo.com |
| outlok.com | outlook.com |
| outloo.com | outlook.com |
| iclod.com | icloud.com |
| icloud.co | icloud.com |

## Why no tool can prove a mailbox exists

Some services claim to confirm that a mailbox is real by connecting to the mail server and asking whether it would accept a message, then hanging up before sending. That check is unreliable. Many domains are “catch-all” and say yes to every name; large providers often accept first and bounce later; some servers delay unknown senders on purpose; and repeated probing looks like a spammer harvesting addresses, which can get the checking server’s IP blacklisted. This tool stops at what public DNS can prove. The only certain test is a message the person has to act on.

## How to validate email addresses in a sign-up form

1.  **Check the format** as the person types, with a clear message instead of a silent rejection.
2.  **Suggest a fix for typos** such as `gmial.com`, but let the person keep what they typed: some unusual domains are real.
3.  **Look up the domain’s MX records** on your server before saving the address.
4.  **Send a confirmation link** and only add the address to your list once it is clicked (double opt-in). This proves the inbox exists and that its owner wants your mail.
5.  **Remove addresses that hard-bounce** straight away, so they do not drag down your sender reputation.

## When to validate addresses

Checking addresses before you save them keeps a mailing list clean: bounces from invalid addresses hurt your sender reputation, and enough of them can get your mail sent to spam. The most common real-world problem is a simple typo in the domain, which this check catches.

To see which provider handles a domain’s email, use the [MX lookup](https://getmylocations.com/mx-lookup); to check your own domain is set up to send, the [DMARC checker](https://getmylocations.com/dmarc-checker).

## Frequently asked questions

What makes an email address invalid?

A missing or extra @, a space, two dots in a row, a dot at the start or end of the name, a domain without a top-level part such as .com, a name longer than 64 characters or an address longer than 254. An address can also have a perfect format and still be useless if its domain does not exist or has no mail servers.

Is an address with a plus sign valid?

Yes. anna+news@gmail.com is a valid address, and Gmail, Outlook, iCloud and many other providers deliver it to anna@. People use the part after the plus to sort mail or see who shared their address, so forms should not reject it.

Can this tell me if a mailbox exists?

No tool can say that for certain without sending a message. Mail servers deliberately hide whether a mailbox exists, and probing them is treated as spam. This tool checks everything that can be checked publicly: format, typos, the domain and its mail servers.

Why is an address “risky”?

It is valid but may not reach a real, lasting inbox: a throwaway service such as Mailinator, or a domain with no mail server records.

What is a role address?

An address for a job or team rather than a person, such as info@ or support@. Mail to it is fine, but it is usually read by several people and often filtered more strictly by newsletter services.

Is the address I type stored?

No. The check runs in your browser; only the domain is looked up in public DNS. The address itself is not sent to this site.

## Related tools

[

### MX Lookup

Mail servers for a domain

](https://getmylocations.com/mx-lookup)[

### DMARC Checker

Check a domain’s DMARC and SPF

](https://getmylocations.com/dmarc-checker)[

### DNS Lookup

A, AAAA, CNAME, TXT and more

](https://getmylocations.com/dns-lookup)[

### NS Lookup

Name servers for a domain

](https://getmylocations.com/ns-lookup)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
