---
title: "Share Your Location Safely: WhatsApp, iPhone, Google Maps"
description: "Share your live location without oversharing: who can see it, how long it lasts, and how to stop it on WhatsApp, iPhone, Google Maps and Messages."
url: https://getmylocations.com/blog/how-to-share-gps-location-safely
---

# Share Your Location Safely: WhatsApp, iPhone, Google Maps

A

Ahmed Anwar

May 18, 2026·Updated October 5, 2026·12 min read

-   privacy
-   sharing
-   safety

* * *

![Translucent shield protecting a location pin with a soft glow, illustrating safe location sharing](https://getmylocations.com/blog-images/how-to-share-gps-location-safely-hero.jpg)

Quick answer

Share with one person, for a limited time, and stop when you no longer need it. WhatsApp live location lasts 15 minutes, 1 hour, or 8 hours; Google Maps and Apple’s Find My let you pick a duration too, so avoid “until I turn it off.” For a one-off meeting point, send a static pin or raw coordinates instead of a live location. And check who can already see you: on an iPhone, Settings → Privacy & Security → Safety Check lists every share in one place.

Here is the most common way location sharing goes wrong. You share your live location so a friend can find the café you agreed on, tap “until I turn it off” because it is the quickest option, meet, and go home. Months later their name is still on your sharing list, and for all that time they could have seen where you were, in real time. Nobody did anything wrong; the share just never ended.

The fix is one rule: pick a duration every single time you share. Never “forever.” That one rule prevents the most common location-sharing privacy mistake. The rest of this guide is the practical stuff — which app is right for which situation, what they actually leak, and a checklist for the seconds before you hit Send.

## A short mental model

Every method of sharing answers four questions. Whenever you’re about to share, run through them and pick whichever option does the _minimum_ the situation actually needs.

1.  **Who sees it?** One person, a chat thread, a public link, or an entire account?
2.  **For how long?** A single static pin, 15 minutes, end-of-day, or open-ended?
3.  **How precise?** The exact device coordinate, a coarsened bubble, or a static pin?
4.  **Live or static?** A snapshot that won’t update, or a dot that follows you in real time?

## WhatsApp — the global default

For most people on most days, WhatsApp is the right answer. **Send Location** drops a static pin into the chat. **Share Live Location** broadcasts your moving position for 15 minutes, 1 hour, or 8 hours — no option to leave it on indefinitely, which is the friction WhatsApp gets right.

Contents are end-to-end encrypted, so Meta can’t read the coordinates. Two caveats: (a) the _metadata_ — who shared with whom, when, for how long — is still visible to Meta and may be retained, and (b) everyone in the chat sees the live location, so sharing into a group shares with all of its members. For sharing inside a group chat with multiple people, WhatsApp is usually the safest cross-platform option. Just remember the timer keeps running — don’t share to a group of 30 if only one person actually needs it.

## iMessage and Find My (iPhone-only)

iPhones have two options that look similar but behave differently. **Send My Current Location** drops a static pin into the chat — one-shot, won’t update. **Share My Location** shares your live position for the duration you pick: one hour, until end of day, or indefinitely (the option to avoid). It appears in the conversation and in the recipient’s Find My app.

Find My is the more durable system. Adding someone as a Find My friend creates a share that lives outside any chat and works between Apple accounts even when no message has ever been exchanged. Most family location-sharing setups live here. Audit it monthly — same logic, same trap.

[Apple’s Find My privacy notice](https://www.apple.com/legal/privacy/data/en/find-my/) says that if you and the person you share with are both on iOS 17 or later, your location is not accessible to Apple; with someone on an older version, it may be, if they request it. Apple keeps a shared location for up to 24 hours to provide the service, then deletes it. The recipient’s phone still shows it to whoever is holding that phone.

## Google Maps live sharing

Google Maps lets you choose how long to share, or pick _Until you turn this off_, and sends the share to a Google account instead of a phone number. If you share by link instead, Google says the link works for up to 24 hours. It works across Android and iOS as long as both sides have the Maps app. Maps also supports sending a static pin via any messaging app — useful for pointing a friend at a parking spot or a trailhead without exposing your live location. The pin is just a URL like `maps.google.com/?q=48.858420,2.294500` that opens straight to that coordinate.

Two things to know. [Google says](https://support.google.com/maps/answer/15437054) people you share with can see not only your recent location but your name and photo, your phone’s battery level and whether it is charging, and arrival and departure times if they set a notification. And Google does not describe Maps sharing as end-to-end encrypted: it processes your location to provide the feature, under its privacy policy. For sensitive cases, WhatsApp or an iPhone-to-iPhone share on iOS 17 or later keeps the location away from the platform.

## Google Messages — live location inside a text chat

Google Messages on Android can now share your real-time location from inside a conversation, for 1 hour, for today only, until you turn it off, or for a custom time of up to 24 hours. [Google is explicit](https://support.google.com/messages/answer/16929688) about the catch: your messages in that chat may be end-to-end encrypted, but the location sharing is powered by Google Maps (Find Hub) and processed by Google, so it follows the same rules as Maps sharing above.

## Signal — a private pin, not a live location

Signal can send your current location as a one-time pin, end-to-end encrypted like every Signal message, from a service built to keep as little metadata as possible. It does _not_ offer live location sharing, so there is no timer to set and nothing to stop later. For telling one person where to meet you, when you care who can see it, that is often exactly what you want.

The trade-off is that fewer of your contacts have it installed, and if you need someone to follow you on a walk home, you will need one of the live options above.

## Plus Codes — addresses where addresses don’t exist

Plus Codes (the everyday name for [Open Location Code](https://github.com/google/open-location-code), an open-source format published by Google) are short alphanumeric strings that encode a coordinate. The Eiffel Tower is `8FW4V75V+8Q`. They work where there are no street addresses — rural areas, refugee camps, parts of Karachi where the postal system never properly covered — and they’re short enough to read aloud or write on the side of a parcel.

From a privacy standpoint a Plus Code is just a static encoding of a coordinate. It has no metadata and isn’t tracked. Once you share one, the recipient can paste it into any Maps app to see the spot. They can’t use it to track you — it’s a permanent label on a place, not a beacon on you.

## Raw coordinates — old-school, universal, still the best fallback

A pair like `24.860422, 67.001137` is the lowest common denominator. It works in every map app, every car navigation system, every emergency dispatcher’s console. It’s the only format guaranteed to work with no app installed, no signup, and no platform lock-in.

Use raw coordinates when you’re sending across ecosystems (Apple to Android to a car’s built-in nav), when you’re writing into long-term notes that should still work in five years, or when you’re communicating with first responders. You can grab your own current coordinates — in copy-paste-ready DD format — from the [My Location tool](https://getmylocations.com/my-location) in two seconds.

## A safety checklist for the moment before you hit Send

-   **Pick a duration, never “until I cancel.”** Set 1 hour or end-of-day. The forgotten share at the top of this article is what happens otherwise.
-   **One person, not a group.** If only one person needs to find you, only one person should see you.
-   **Prefer a static pin when you can.** If you just want to tell someone where you parked, a static pin reveals nothing about your current movement.
-   **Audit your active shares monthly.** Both iOS Find My and Google Maps have a “people who can see your location” screen. Open it on the first of every month.
-   **Don’t post live location publicly.** Posting “here’s where I am” on social media tells everyone who follows you — including bots and stalkers — that your home is currently empty.
-   **Be wary of unsolicited location links.** A fake “hi, here’s where I am” link can log your IP address, which usually reveals your city, the moment you open it. Never tap Allow on a location prompt from a page someone sent you unexpectedly.

## Check who can see your location right now

Before worrying about the next share, find the ones already running. Each platform has one screen for it:

-   **iPhone:** Settings → Privacy & Security → **Safety Check** → Manage Sharing & Access. It lists the people you share your location with in Find My and lets you stop each one, and it also reviews which apps can use your location.
-   **Google Maps:** tap your profile picture → **Location sharing**. Everyone who can currently see you is listed there.
-   **WhatsApp:** Settings → Privacy → **Location** shows every chat where a live location is still running.

If you are worried that someone is tracking you against your will, Safety Check’s _Emergency Reset_ on iPhone stops all sharing at once. Bear in mind that the other person may notice the share has stopped; if you are in danger, contact local support services first.

## For emergencies, raw coordinates still win

911 (US), 112 (Europe), 999 (UK), 1122 (Rescue) or 15 (police) in Pakistan, and most other emergency services can take a raw latitude and longitude over the phone. In countries that support Advanced Mobile Location (most of Europe and the UK among them), your phone also sends its position automatically when you dial — but having a backup, the coordinates you’ve read off your own screen, is invaluable where AML isn’t available or the call is from a landline. Full walk-through: [GPS coordinates in emergencies](https://getmylocations.com/blog/gps-coordinates-emergencies-aml-guide).

## The apps compared, in one table

Six common ways to share a location. “Who can read it” follows each company’s own documentation, checked October 2026. End-to-end encryption protects the coordinate itself from the platform; it doesn’t protect you from a careless recipient or a long-running share you forgot about.

| App | Live? | Who can read it | Durations | Platforms | Best for |
| --- | --- | --- | --- | --- | --- |
| WhatsApp | Yes | End-to-end encrypted | 15 min · 1 hr · 8 hr | iOS / Android | Cross-platform default |
| Messages / Find My (Apple) | Yes | Not Apple, if both on iOS 17+; Apple keeps it up to 24 h | 1 hr · end of day · indefinitely | Apple only | iPhone-to-iPhone, family |
| Google Maps | Yes | Processed by Google | Chosen time · until you turn it off | iOS / Android | Casual, cross-platform |
| Google Messages | Yes | Processed by Google (via Maps) | 1 hr · today · until off · custom ≤ 24 h | Android | Android chats |
| Signal | No — one-time pin | End-to-end encrypted | Static only | iOS / Android | Sending a meeting point privately |
| Raw coordinates | No | Whoever you send them to | Static only | Universal | Cross-ecosystem, emergencies |

## How to stop a share you already sent

Revoking is the step everyone forgets. Each app exposes the same action behind a slightly different door — here is exactly where each one lives.

-   **WhatsApp.** Open the chat you shared into, tap the live-location card, then _Stop sharing_. Or open Settings → Privacy → Location to see every chat where the timer is still running.
-   **iMessage.** Open the conversation, tap the contact’s name at the top, scroll to the location card, and tap _Stop Sharing My Location_. For Find My, open the Find My app → People → tap the person → _Stop Sharing My Location_.
-   **Google Maps.** Tap your profile picture → Location sharing. The list shows everyone who can currently see you. Tap each person and choose _Stop_. The share dies immediately on their end.
-   **Google Messages.** Open the conversation, tap the message with your location, then next to your name tap _Stop_ → _Stop sharing_.
-   **Signal.** Nothing to stop: a Signal location is a one-time pin. Delete the message if you no longer want it in the chat.
-   **Everything on an iPhone at once.** Settings → Privacy & Security → Safety Check.
-   **Find My family group.** Settings → your name → Family Sharing → Location Sharing → tap each member to toggle. The family share is the most likely to have been on for years without a review.

Put a recurring 60-second calendar event on the first of every month called “audit location shares.” That single habit catches everything the urgency of the moment encourages you to forget.

## What the recipient actually sees

It is worth knowing exactly what lands on the other person’s screen, because the experience is different in each app:

-   **WhatsApp:** a map card inside the chat with a live pin that updates as you move until the timer ends.
-   **Messages (iPhone):** a live map in the conversation, and your name under People in their Find My app. They can choose to share back.
-   **Google Maps:** your position in their Maps app, plus your name, photo and battery level, as listed above.
-   **Signal:** a single map pin in the chat. It does not move.
-   **Raw coordinates:** a hyperlink (eg. `maps.google.com/?q=24.86,67.00`) that opens the recipient’s default maps app to a single pin. No tracking, no expiry, no platform lock-in.

If the person you are sharing with is on a different platform than you, the experience often degrades to a plain coordinate link — which, fortunately, every modern maps app on Earth knows how to open. Our [coordinates converter](https://getmylocations.com/coordinates-converter) can translate between formats if the recipient’s app only accepts DMS or UTM.

## Frequently asked questions

What is the safest way to share my live location with one person?+

For a live location, WhatsApp is end-to-end encrypted and makes you pick 15 minutes, 1 hour or 8 hours, so it cannot be left on indefinitely. Between iPhones, Apple says it cannot access a location you share in Find My or Messages when both people are on iOS 17 or later. Google Maps and Google Messages location sharing is processed by Google. Signal has no live location; it can send a one-time pin, end-to-end encrypted, which is often all you need.

How do I stop sharing my live location after I have already started?+

On WhatsApp, open the chat, tap your active live-location card, and choose "Stop sharing." On iMessage, open the contact card and tap "Stop Sharing My Location" (or remove them from Find My). In Google Maps, tap your profile → Location sharing → tap the person → Stop. A Signal location is a one-time pin, so there is nothing to stop; delete the message if you no longer want it in the chat. On an iPhone, Settings → Privacy & Security → Safety Check shows everyone you share with in one place.

Is WhatsApp live location end-to-end encrypted?+

Yes — the coordinate stream itself is encrypted so Meta cannot read it. What is not encrypted is the metadata: who is sharing with whom, when, and for how long. For day-to-day sharing that is usually fine. If metadata matters, send a one-time pin over Signal instead, which is designed to keep as little metadata as possible.

Can someone track me with a location link I clicked?+

A genuine location share works the other way — you receive someone’s coordinates, not give yours. But a fake "here is where I am" link can lead to a page that logs your IP address, which usually reveals your city and network, the moment you open it. It only gets your precise position if you tap Allow on a location prompt, so never allow location on a page someone sent you unexpectedly. Treat unexpected location messages from unknown numbers exactly like unexpected attachments: do not open. Real shares from people you know usually appear inline in the messaging app, not as bare URLs.

What happens if I share my location "until I turn it off"?+

It stays active until you remember to revoke it — which, in practice, often means months. Find My, Messages, Google Maps and Google Messages all offer this option and all of them are how people accidentally share their live location for far longer than they intended. The single rule worth following: always pick a duration. One hour, end-of-day, eight hours. Never indefinite.

Should I share live location or a static pin?+

Default to a static pin. If you only need someone to find a meeting spot, a parked car, or a trailhead, a one-shot coordinate reveals nothing about your movements. Live sharing is the right tool when the other person needs to know when you arrive, when you are running late, or for safety walks home — but it is overkill for "I am at the coffee shop on Main Street."

## Grab a coordinate now

Open the [My Location tool](https://getmylocations.com/my-location), click Allow, and your current latitude and longitude appear at the top of the dashboard. One click copies them in the format every app accepts. From there it pastes into Messages, WhatsApp, Maps, Signal, or any of the others above. If you want a continuously updating reading instead of a snapshot, the [Live Location tracker](https://getmylocations.com/live-location) keeps refreshing as you move.

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).

[← Back to all posts](https://getmylocations.com/blog)
