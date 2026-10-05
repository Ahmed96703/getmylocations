---
title: "GPS Coordinates in an Emergency — Send Your Location to 911"
description: "How to send GPS coordinates to a 911 or 112 dispatcher: what AML does automatically, the script to say on the call, and how to read them off any phone."
url: https://getmylocations.com/blog/gps-coordinates-emergencies-aml-guide
---

# GPS Coordinates in an Emergency — Send Your Location to 911

A

Ahmed Anwar

May 20, 2026·12 min read

-   emergency
-   gps
-   safety

* * *

![Location pin surrounded by concentric signal rings against a starry night sky, evoking emergency-call positioning](https://getmylocations.com/blog-images/gps-coordinates-emergencies-aml-guide-hero.jpg)

In 2014, a Lithuanian teenager named Karol Otulakowski phoned the emergency services from a forest. He couldn’t describe where he was. He died before the call handler could find him. That call is one of the cases the European Emergency Number Association cites every time they push for Advanced Mobile Location — the technology that now automatically sends a caller’s GPS coordinates to the dispatcher the instant they dial 112 or 911, with no app to install and no permission to grant.

AML covers most of the world’s urban emergencies now, but it has gaps. Landlines don’t use it. VoIP apps don’t use it. Older networks haven’t upgraded. The single skill worth practising once, when you don’t need it, is reading your own coordinates off your phone and saying them out loud to a dispatcher. The rest of this article is what I worked out about how that whole pipeline functions, and where the brittle bits are.

## What happens at the dispatch centre

Every modern dispatch centre (PSAP, public safety answering point) runs a computer-aided dispatch system with a built-in map. When a coordinate is entered — either manually by the dispatcher or automatically from AML — the map zooms straight to the spot, overlays the nearest streets, and routes the closest available unit. The whole pipeline, from coordinate received to ambulance dispatched, can take under a minute in well-equipped centres.

The console is also doing [reverse geocoding](https://getmylocations.com/reverse-geocoding) in the background: turning the coordinate back into a human-readable address (“14th and Main, opposite the pharmacy”) so the responding crew can call out the destination over the radio. This is why supplying a coordinate is more useful than supplying an address — the coordinate is the canonical reference, the address text is derived from it.

![Stylised phone broadcasting signal waves toward an abstract dispatcher tower, illustrating Advanced Mobile Location](https://getmylocations.com/blog-images/gps-coordinates-emergencies-aml-guide-mid.jpg)

## What your phone does automatically

Since the late 2010s, both iOS (under the name Hybridized Emergency Location, HELO) and Android have shipped **Advanced Mobile Location**. The instant you dial an emergency number, the phone:

1.  Turns on GPS, Wi-Fi, and cellular positioning at maximum accuracy — even if you had location services off.
2.  Computes the best available fix within a few seconds.
3.  Transmits the coordinates and an accuracy estimate to the dispatcher over a secure side-channel.
4.  Drops the elevated positioning the moment you hang up.

It works without the caller doing anything. It works whether or not the user has granted location permission to any app — emergency calls bypass the normal permission model that [browser geolocation](https://getmylocations.com/blog/browser-geolocation-api-explained) and regular apps obey. It works in airplane mode if the cellular for the emergency call itself comes back up.

Coverage is uneven. AML is mandatory in most EU member states, the UK, Australia, and New Zealand, and is rolled out in many US states under the Next Generation 911 programme. Pakistan’s 15 service and India’s 112 are adopting it incrementally. The official EENA list tracks who has switched on the receiving infrastructure.

## When AML isn’t there to save you

AML covers the common case beautifully. The cases where it fails are exactly the ones where having a manual backup matters most:

-   **Landline calls.** AML is a smartphone feature. A landline call relies on the registered service address, which may be the building manager’s office and not your flat.
-   **VoIP calls.** WhatsApp calls to emergency numbers, Skype calls, and most carrier-VoIP setups don’t carry AML payloads.
-   **Countries that haven’t deployed it.** Big parts of central Asia, Africa, and the Americas don’t yet receive AML even from compliant phones.
-   **You’re calling about someone else.** AML reports the calling phone’s position, not the incident’s. If you’re calling from a kilometre away because you can’t reach the person, the dispatcher needs the incident coordinate from you verbally.
-   **Maritime, aviation, or wilderness.** Coast guard and mountain rescue dispatchers usually want coordinates spoken aloud or transmitted by satellite messenger, regardless of phone-side automation.
-   **The dispatcher is overwhelmed.** In a mass incident, even where AML works, the dispatcher may need to confirm the coordinate verbally to make sure the system displayed the right one.

## Reading your coordinates — per device

### iPhone

1.  Open the Compass app (pre-installed). Coordinates sit at the bottom of the screen.
2.  Or open Apple Maps, tap the blue location dot, swipe up on the info panel, and the coordinates are listed under “My Location”.
3.  Long-press to copy.

### Android

1.  Open Google Maps.
2.  Long-press anywhere on the map at your location — a red pin appears.
3.  The coordinates appear in the search bar at the top. Tap to copy.

### Any browser

Open [the My Location tool](https://getmylocations.com/my-location) or [the GPS Coordinates page](https://getmylocations.com/my-location). Click Allow on the location prompt. The coordinates appear in the dashboard with a one-click copy button. If the prompt is missing or denied, our [fix-location guide](https://getmylocations.com/fix-location-not-working) walks through every permission setting that can block it.

### Garmin or a dedicated GPS unit

Most outdoor handhelds have a “Where am I?” menu that shows current coordinates, plus an emergency mode that strips the screen down to coordinates and a panic button.

## A four-line script for the call

Dispatchers are trained to extract information in a specific order. You can save them — and yourself — ten or fifteen seconds by leading with the things they need first. The order that works best:

1.  **What is happening.** One short sentence. “Medical emergency, adult male, unconscious.” “Road accident, two cars, possible injuries.” “House fire, ground floor, people still inside.”
2.  **Where you are, by coordinate.** “My coordinates are forty-eight point eight five eight four, two point two nine four five — decimal degrees.” Always name the format. Speak the digits individually, not the whole number.
3.  **Who you are.** “My name is Maria, I’m calling from the scene.” If you are calling about someone else who is at a different location, say so explicitly.
4.  **Wait for the read-back.** The dispatcher will repeat the coordinate. Confirm verbally before they hang up the map — a single mishearing of one digit moves the rescue team a hundred metres.

Two things to avoid. Don’t describe the surroundings before giving the coordinate (“there’s a red car and a tree”) — that information is most useful after the coordinate has been logged. And don’t hang up just because you finished saying the numbers; in many jurisdictions the dispatcher is required to stay on the line until responders arrive.

## Emergency numbers around the world

The number you dial matters as much as the coordinate you give. Most modern smartphones accept any of the major international codes and route them correctly, but knowing the local number for where you actually are is faster:

Region

Number

AML

European Union (all member states)

112

Yes

United Kingdom

999 (also 112)

Yes

United States & Canada

911

Partial (NG911 rollout)

Australia

000 (112 from mobiles)

Yes

New Zealand

111

Yes

India

112

Rolling out

Pakistan

15 (police), 1122 (rescue)

Limited

Japan

110 (police), 119 (fire / ambulance)

Partial

South Africa

112 (mobile), 10111 (police)

Limited

Brazil

190 (police), 192 (medical)

No

From a mobile, 112 will be routed correctly across most of the world even when it is not the official local number — it is a GSM standard. 911 has the same fallback behaviour in much of the Americas. When in doubt, dial 112 from a mobile.

## Saying the numbers out loud

Two formats are common. Either works with most dispatchers, but tell them which one you’re reading from:

-   **Decimal degrees:** “forty-eight point eight five eight four, two point two nine four five.”
-   **Degrees, minutes, seconds:** “forty-eight degrees, fifty-one minutes, thirty seconds North; two degrees, seventeen minutes, forty seconds East.”

Speak slowly. Read each digit individually (“eight five eight four”, not “eight thousand five hundred eighty-four”). Dispatchers are trained to write digits, and a single mishearing can drop rescuers 100 meters off. When they read the number back, listen for the read-back to match exactly and confirm verbally. If you are unsure which format you are looking at, our [coordinates converter](https://getmylocations.com/coordinates-converter) translates between DD, DMS, and UTM with one click.

## What3Words, Plus Codes, and why I still prefer raw numbers

Several services tag 3-meter squares of the world with memorable codes. **What3Words** assigns three random words to each square (“filled.count.soap”); **Plus Codes** use a short alphanumeric format. Some emergency services accept either — the UK’s 999 service supports both What3Words and AML, for instance.

In an emergency I would still prefer raw coordinates. Decimal degrees are universally understood; they don’t require the dispatcher to have a particular company’s lookup tool open; they don’t depend on the call being in English; they work on every dispatch system in the world. The branded formats are useful as a backup or for places where the address-system genuinely doesn’t exist (rural Mongolia, refugee camps), but for the twenty-second window where the dispatcher is asking where you are, raw numbers are the safer bet.

## Satellite SOS — when there is no cellular at all

AML and verbal coordinates both assume the call connects. In deep wilderness, on the water, or after a network outage, the call won’t. Two technologies fill that gap.

**Emergency SOS via Satellite** ships in iPhone 14 and later, and in recent Pixel models. When the phone detects no cellular and no Wi-Fi, holding the side button triggers a guided interface: point the phone at the sky, the OS walks you through a short questionnaire (“What is happening?”, “How many people?”), and your answers plus your GPS fix are relayed by satellite to a relay centre that texts the local dispatcher. The exchange is text-only and slow — minutes, not seconds — but it works anywhere in the satellite’s coverage footprint.

**Dedicated satellite messengers** like Garmin inReach, ZOLEO, and SPOT do the same job on any phone-less device. They run on the Iridium or Globalstar networks, which cover the entire surface of the planet. They are the standard tool for any wilderness travel above an hour from a road. Trigger the SOS button, the device transmits your coordinates plus a short message to a 24/7 monitoring centre, and the centre coordinates rescue with the appropriate local agency.

## Things to do before you ever need this

-   Make sure Location Services / GPS is enabled at the OS level. AML can’t fire if the chip is off. If your phone is currently refusing to share its location to apps, our [iPhone & Android location setup guide](https://getmylocations.com/blog/enable-location-on-iphone-and-android) walks through every switch.
-   Set up your phone’s emergency contacts and Medical ID. They’re visible from the lock screen and save dispatchers a step.
-   Memorise the emergency number for where you actually are. It’s not always 911. EU: 112. UK: 999. Pakistan: 15. India: 112. Australia: 000.
-   For wilderness work, carry a satellite messenger (Garmin inReach, ZOLEO, the newer iPhones’ Emergency SOS via Satellite). They work where cellular doesn’t.
-   If you travel internationally, install the regional 112 / 999 app of the country you’re visiting. Many countries have one.

## Reporting an incident that isn’t happening to you

If you witness an emergency that’s a few meters away — a road accident, a person collapsing on a trail — AML sends _your_ location, not the incident’s. Verbally confirm the incident location separately, ideally a coordinate you’ve read off your own phone after walking close enough to the scene that the GPS reading is reliable.

On highways, naming the nearest kilometre-marker post is often faster than coordinates. Inside large parks or campuses, the opposite is true — a coordinate beats “by the main gate” every time.

## Practise once, when nothing is wrong

The single most useful exercise is to read your coordinates off your phone right now, in a low-stakes moment, just to know what the process feels like. Open [the My Location tool](https://getmylocations.com/my-location), see the numbers, get a feel for what “24.860422, 67.001137” looks and sounds like. The next time you need to say it under stress, it’ll take you ten seconds instead of two minutes — and you’ll know the screen flow already.

## Frequently asked questions

Does my phone send GPS coordinates to 911 or 112 automatically?+

Yes, on most modern smartphones in most countries. Both iOS (under the name HELO) and Android use Advanced Mobile Location to transmit a precise coordinate and accuracy estimate to the dispatcher the moment you dial an emergency number — even if location services were off. Coverage depends on whether the receiving dispatch centre has activated AML; the EENA tracks the live country list.

Do I still need to read my coordinates if AML is automatic?+

Yes, as a backup. AML can fail silently — landlines, VoIP, older networks, and countries that have not deployed the receiver all break it. The dispatcher will not tell you they did not receive your coordinate; they will just ask where you are. Knowing how to read your own number off the phone in under ten seconds is the skill worth practicing once when nothing is wrong.

What is the fastest way to find my GPS coordinates in an emergency?+

On an iPhone, open the Compass app — coordinates sit at the bottom of the screen. On Android, open Google Maps and long-press the blue dot. In any browser, open the GetMyLocations my-location tool and tap Find. Each takes under ten seconds. Practice once now, in calm conditions, so the screen flow is muscle memory if you ever need it.

What do I say first when I dial 911 with a coordinate?+

Lead with what is happening and where, then the coordinate. "Medical emergency. Adult male, unconscious. My coordinates are forty-eight point eight five eight four, two point two nine four five. Decimal degrees." The dispatcher will read the numbers back — wait for the read-back and confirm before moving on. Read each digit individually, not as a whole number.

What if there is no cellular signal at all?+

Newer iPhones (14 and later) and recent Pixels include Emergency SOS via Satellite — point the phone at the sky and the OS walks you through a guided text exchange with a dispatcher. For backcountry work without that hardware, a dedicated satellite messenger (Garmin inReach, ZOLEO, SPOT) handles the same job and works anywhere on Earth.

Should I use What3Words or just say the numbers?+

Raw decimal degrees are still the safer choice in the moment. They are universally understood by every dispatch system on Earth, do not require the dispatcher to have a specific lookup tool open, and work in any language. What3Words and Plus Codes are excellent backups, especially in places without street addresses, but in the twenty-second window when the dispatcher is asking where you are, raw numbers travel best.

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).

[← Back to all posts](https://getmylocations.com/blog)
