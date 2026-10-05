---
title: "Share Your Location Safely — WhatsApp, Maps & Signal"
description: "Compare WhatsApp, iMessage, Google Maps and Signal for sharing your location. What each leaks, which duration to pick, and how to stop a share."
url: https://getmylocations.com/blog/how-to-share-gps-location-safely
---

# Share Your Location Safely — WhatsApp, Maps & Signal

A

Ahmed Anwar

May 18, 2026·10 min read

-   privacy
-   sharing
-   safety

* * *

![Translucent shield protecting a location pin with a soft glow, illustrating safe location sharing](https://getmylocations.com/blog-images/how-to-share-gps-location-safely-hero.jpg)

Quick answer

Share with one person, for a limited time, and stop when you no longer need it. WhatsApp live location lasts 15 minutes, 1 hour, or 8 hours; Google Maps and Apple’s Find My let you pick a duration too, so avoid “until I turn it off.” For a one-off meeting point, send a static pin or raw coordinates instead of a live location, and check your active shares now and then for any you have forgotten.

Two years ago I shared my live location with a friend on Google Maps so she could find a café we’d agreed on. We met, ate, went home. Three months later I happened to open the location-sharing screen for something else and her name was still on the list. I’d set it to “until I turn it off” and forgotten. She’d been able to see where I was, in real time, for ninety-odd days. She hadn’t looked, because she isn’t weird. But she could have.

The lesson, which I now live by: pick a duration every single time you share. Never “forever.” That one rule prevents the most common location-sharing privacy mistake. The rest of this guide is the practical stuff — which app is right for which situation, what they actually leak, and a checklist for the seconds before you hit Send.

## A short mental model

Every method of sharing answers four questions. Whenever you’re about to share, run through them and pick whichever option does the _minimum_ the situation actually needs.

1.  **Who sees it?** One person, a chat thread, a public link, or an entire account?
2.  **For how long?** A single static pin, 15 minutes, end-of-day, or open-ended?
3.  **How precise?** The exact device coordinate, a coarsened bubble, or a static pin?
4.  **Live or static?** A snapshot that won’t update, or a dot that follows you in real time?

## WhatsApp — the global default

For most people on most days, WhatsApp is the right answer. **Send Location** drops a static pin into the chat. **Share Live Location** broadcasts your moving position for 15 minutes, 1 hour, or 8 hours — no option to leave it on indefinitely, which is the friction WhatsApp gets right.

Contents are end-to-end encrypted, so Meta can’t read the coordinates. Two caveats: (a) the _metadata_ — who shared with whom, when, for how long — is still visible to Meta and may be retained, and (b) both iOS and Android record the share in the share-sheet history, which apps with broad permissions can sometimes see. For sharing inside a group chat with multiple people, WhatsApp is usually the safest cross-platform option. Just remember the timer keeps running — don’t share to a group of 30 if only one person actually needs it.

## iMessage and Find My (iPhone-only)

iPhones have two options that look similar but behave differently. **Send My Current Location** drops a static pin into the chat — one-shot, won’t update. **Share My Location** creates a live-tracking link that updates in the recipient’s Maps app for the duration you pick: one hour, until end of day, or indefinitely (this is the one I now refuse to use).

Find My is the more durable system. Adding someone as a Find My friend creates an indefinite share that lives outside any chat, survives device wipes, and works between Apple accounts even when no message has ever been exchanged. Most family location-sharing setups live here. Audit it monthly — same logic, same trap.

Both are end-to-end encrypted between Apple devices, so Apple can’t read the underlying coordinates. The recipient’s phone still caches a copy, which you have no control over if their device is compromised.

## Google Maps live sharing

Google Maps offers a 1-hour-to-indefinite live share that uses a Google account as the destination instead of a phone number. It works across Android and iOS as long as both sides have the Maps app. Maps also supports sending a static pin via any messaging app — useful for pointing a friend at a parking spot or a trailhead without exposing your live location. The pin is just a URL like `maps.google.com/?q=48.858420,2.294500` that opens straight to that coordinate.

Important: Google Maps live sharing is _not_ end-to-end encrypted — the coordinate streams through Google’s servers, where Google can technically read it. For sensitive cases (journalists, activists, harassment) prefer iMessage or Signal.

## Signal — the option of last resort that still works smoothly

Signal supports both static-pin and live-location sharing with the strongest cryptographic guarantees available in a mainstream messaging app: end-to-end encryption, no metadata retention beyond what’s strictly necessary, forward secrecy if keys ever leak. For one-on-one sharing where you genuinely care who can see the coordinates — medical situations, abuse-recovery cases, sources protecting reporters — this is the right tool.

The trade-off is that fewer of your contacts have it installed, which sometimes matters more than the security model does.

## Plus Codes — addresses where addresses don’t exist

Plus Codes (Google’s open-source format, formerly called Open Location Codes) are short alphanumeric strings that encode a coordinate. The Eiffel Tower is `8FW4V75V+8Q`. They work where there are no street addresses — rural areas, refugee camps, parts of Karachi where the postal system never properly covered — and they’re short enough to read aloud or write on the side of a parcel.

From a privacy standpoint a Plus Code is just a static encoding of a coordinate. It has no metadata and isn’t tracked. Once you share one, the recipient can paste it into any Maps app to see the spot. They can’t use it to track you — it’s a permanent label on a place, not a beacon on you.

## Raw coordinates — old-school, universal, still the best fallback

A pair like `24.860422, 67.001137` is the lowest common denominator. It works in every map app, every car navigation system, every emergency dispatcher’s console. It’s the only format guaranteed to work with no app installed, no signup, and no platform lock-in.

Use raw coordinates when you’re sending across ecosystems (Apple to Android to a car’s built-in nav), when you’re writing into long-term notes that should still work in five years, or when you’re communicating with first responders. You can grab your own current coordinates — in copy-paste-ready DD format — from the [My Location tool](https://getmylocations.com/my-location) or the [GPS Coordinates page](https://getmylocations.com/my-location) in two seconds.

## A safety checklist for the moment before you hit Send

-   **Pick a duration, never “until I cancel.”** Set 1 hour or end-of-day. The story I opened this article with is what happens otherwise.
-   **One person, not a group.** If only one person needs to find you, only one person should see you.
-   **Prefer a static pin when you can.** If you just want to tell someone where you parked, a static pin reveals nothing about your current movement.
-   **Audit your active shares monthly.** Both iOS Find My and Google Maps have a “people who can see your location” screen. Open it on the first of every month.
-   **Don’t post live location publicly.** Posting “here’s where I am” on social media tells everyone who follows you — including bots and stalkers — that your home is currently empty.
-   **Be wary of unsolicited location links.** An attacker can send a fake “hi, here’s where I am” link that’s actually a tracking pixel; clicking it leaks _your_ location.

## For emergencies, raw coordinates still win

911 (US), 112 (Europe), 999 (UK), 15 (Pakistan), and most other emergency dispatchers can take a raw latitude/longitude over the phone. Modern smartphones also send GPS automatically via Advanced Mobile Location when you dial — but having a backup, the coordinates you’ve read off your own screen, is invaluable when AML hasn’t propagated or the call is from a landline. Full walk-through: [GPS coordinates in emergencies](https://getmylocations.com/blog/gps-coordinates-emergencies-aml-guide).

## The apps compared, in one table

Six common ways to share a location, ordered roughly from “use this by default” to “use this when you need maximum control.” End-to-end encryption protects the coordinate itself from the platform; it doesn’t protect you from a careless recipient or a long-running share you forgot about.

| App | End-to-end | Durations | Platforms | Best for |
| --- | --- | --- | --- | --- |
| WhatsApp | Yes | 15 min · 1 hr · 8 hr | iOS / Android | Cross-platform default |
| iMessage | Yes (Apple-to-Apple) | 1 hr · end of day · indefinite | Apple only | Apple-to-Apple family |
| Find My | Yes (Apple-to-Apple) | 1 hr · end of day · indefinite | Apple only | Long-term family setups |
| Google Maps | No | 1 hr → indefinite | iOS / Android | Casual + non-sensitive |
| Signal | Yes (strongest) | Static + live | iOS / Android / desktop | Sensitive / journalists |
| Raw coordinates | N/A (no live stream) | Static only | Universal | Cross-ecosystem, long-term |

## How to stop a share you already sent

Revoking is the step everyone forgets. Each app exposes the same action behind a slightly different door — here is exactly where each one lives.

-   **WhatsApp.** Open the chat you shared into, tap the live-location card, then _Stop sharing_. Or open Settings → Privacy → Live location to see every chat where the timer is still running and stop them in bulk.
-   **iMessage.** Open the conversation, tap the contact’s name at the top, scroll to the location card, and tap _Stop Sharing My Location_. For Find My, open the Find My app → People → tap the person → _Stop Sharing My Location_.
-   **Google Maps.** Tap your profile picture → Location sharing. The list shows everyone who can currently see you. Tap each person and choose _Stop_. The share dies immediately on their end.
-   **Signal.** Tap your most recent location share message, then _End share_. Signal shares also expire automatically at the duration you set.
-   **Find My family group.** Settings → your name → Family Sharing → Location Sharing → tap each member to toggle. The family share is the most likely to have been on for years without a review.

Put a recurring 60-second calendar event on the first of every month called “audit location shares.” That single habit catches everything the urgency of the moment encourages you to forget.

## What the recipient actually sees

It is worth knowing exactly what lands on the other person’s screen, because the experience is different in each app:

-   **WhatsApp:** a map card inside the chat with a live pin that updates as you move and a countdown showing time remaining. Tapping it opens a full-screen view in Maps.
-   **iMessage:** a card that opens directly in Apple Maps with a live pin. The recipient can choose to share back, giving you their location too.
-   **Google Maps:** a notification in the recipient’s Maps app and an entry under the “Shared with you” tab. No expiry banner unless you set one.
-   **Signal:** a static or live map inside the chat, identical to other Signal media — no separate app launch.
-   **Raw coordinates:** a hyperlink (eg. `maps.google.com/?q=24.86,67.00`) that opens the recipient’s default maps app to a single pin. No tracking, no expiry, no platform lock-in.

If the person you are sharing with is on a different platform than you, the experience often degrades to a plain coordinate link — which, fortunately, every modern maps app on Earth knows how to open. Our [coordinates converter](https://getmylocations.com/coordinates-converter) can translate between formats if the recipient’s app only accepts DMS or UTM.

## Frequently asked questions

What is the safest way to share my live location with one person?+

Signal is the strongest mainstream choice — end-to-end encrypted, no metadata retention, with both static-pin and live-location sharing. WhatsApp is a close second and far more likely to be installed by the person you are sharing with. iMessage works between Apple users with similar guarantees. Avoid Google Maps live sharing for sensitive cases — the coordinate stream is not end-to-end encrypted.

How do I stop sharing my live location after I have already started?+

On WhatsApp, open the chat, tap your active live-location card, and choose "Stop sharing." On iMessage, open the contact card and tap "Stop Sharing My Location" (or remove them from Find My). In Google Maps, tap your profile → Location sharing → tap the person → Stop. In Signal, the share auto-expires; tap the share message to end it sooner. Always open the share-management screen monthly to catch ones you forgot.

Is WhatsApp live location end-to-end encrypted?+

Yes — the coordinate stream itself is encrypted so Meta cannot read it. What is not encrypted is the metadata: who is sharing with whom, when, and for how long. For day-to-day sharing that is usually fine; for sensitive cases (journalists, activists, abuse-recovery), Signal is a stricter choice that retains less metadata.

Can someone track me with a location link I clicked?+

A genuine location share works the other way — you receive someone’s coordinates, not give yours. But fake "here is where I am" links sent by attackers can be tracking pixels that record your IP and approximate location the moment you open them. Treat unexpected location messages from unknown numbers exactly like unexpected attachments: do not open. Real shares from people you know usually appear inline in the messaging app, not as bare URLs.

What happens if I share my location "until I turn it off"?+

It stays active until you remember to revoke it — which, in practice, often means months. Find My, Google Maps, and iMessage all offer this option and all of them are how people accidentally share their live location for far longer than they intended. The single rule worth following: always pick a duration. One hour, end-of-day, eight hours. Never indefinite.

Should I share live location or a static pin?+

Default to a static pin. If you only need someone to find a meeting spot, a parked car, or a trailhead, a one-shot coordinate reveals nothing about your movements. Live sharing is the right tool when the other person needs to know when you arrive, when you are running late, or for safety walks home — but it is overkill for "I am at the coffee shop on Main Street."

## Grab a coordinate now

Open the [My Location tool](https://getmylocations.com/my-location), click Allow, and your current latitude and longitude appear at the top of the dashboard. One click copies them in the format every app accepts. From there it pastes into iMessage, WhatsApp, Maps, Signal, or any of the others above. If you want a continuously updating reading instead of a snapshot, the [Live Location tracker](https://getmylocations.com/live-location) keeps refreshing as you move.

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).

[← Back to all posts](https://getmylocations.com/blog)
