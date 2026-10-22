---
title: "Binary to Text Converter (and Text to Binary, Hex, Base64)"
description: "Convert binary to text and text to binary instantly, plus hex, decimal bytes and Base64, in both directions. Handles accents and emoji (UTF-8). Free."
url: https://getmylocations.com/binary-to-text
---

Free Tool · Both directions

# Binary to text converter

Type text to **see it in binary**, or paste binary to **read it as text**. Switch to hex, decimal bytes or Base64 with one click. Both boxes update as you type.

## Convert text to binary and back

Type in either box; the other updates. Text is encoded as UTF-8, so accented letters and emoji take 2 to 4 bytes.

Sponsored

## How binary text works

Computers store text as numbers. Each character becomes one or more bytes (UTF-8), and each byte is eight binary digits. Reading binary back is the same steps in reverse: group the bits in eights, turn each group into a number, and look up the character.

| Character | Decimal | Hex | Binary |
| --- | --- | --- | --- |
| A | 65 | 41 | `01000001` |
| a | 97 | 61 | `01100001` |
| 0 | 48 | 30 | `00110000` |
| space | 32 | 20 | `00100000` |
| é | 195 169 | c3 a9 | `11000011 10101001` |

## Accepted input

-   **Binary:** 8-bit groups separated by spaces, or one long run of 0s and 1s whose length is a multiple of 8.
-   **Hex:** two digits per byte, with or without spaces or a `0x` prefix.
-   **Decimal:** byte values from 0 to 255, separated by spaces or commas.
-   **Base64:** standard or URL-safe (with - and \_).

To see how big data is in other units, use the [bytes and bits converter](https://getmylocations.com/bytes-bits-converter).

## Frequently asked questions

How do I convert binary to text?

Paste the binary into the right-hand box with the Binary tab selected. Each group of 8 bits is one byte; the tool turns the bytes into text using UTF-8. Spaces between groups are optional.

What is “Hello” in binary?

01001000 01100101 01101100 01101100 01101111. Each letter is one byte: H is 72, e is 101, l is 108 and o is 111.

Why do some characters take more than 8 bits?

In UTF-8, English letters and digits take one byte, accented letters such as é take two, most other scripts three, and emoji four. That is why “é” is 11000011 10101001.

What is Base64 for?

Base64 writes any bytes using only letters, digits, + and /, so binary data can travel through email, URLs and JSON. It makes data about a third larger and is an encoding, not encryption.

## Related tools

[

### Bytes & Bits Converter

KB, MB, GB, Mbps and more

](https://getmylocations.com/bytes-bits-converter)[

### MD5 & SHA Hash Generator

MD5, SHA-1 and SHA-256 hashes

](https://getmylocations.com/md5-generator)[

### Internet Speed Test

Download, upload and ping

](https://getmylocations.com/internet-speed-test)[

### Password Generator

Strong passwords and passphrases

](https://getmylocations.com/password-generator)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
