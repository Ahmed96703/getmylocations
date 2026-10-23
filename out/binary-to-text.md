---
title: "Binary to Text Converter (and Text to Binary, Hex, Base64)"
description: "Convert binary to text and text to binary instantly, plus hex, decimal bytes and Base64, in both directions. Handles accents and emoji (UTF-8). Free."
url: https://getmylocations.com/binary-to-text
---

Free Binary Translator · Both directions

# Binary to Text Converter

Paste **binary code** to **read it as text**, or type text to **see it in binary**. This **free binary translator** also converts hex, decimal bytes and Base64, handles accents and emoji, and updates both boxes as you type.

Last updated October 23, 2026 by [Ahmed Anwar](https://getmylocations.com/about).

## Convert text to binary and back

Type in either box; the other updates. Text is encoded as UTF-8, so accented letters and emoji take 2 to 4 bytes.

## Binary translator: binary code to English

This **binary to text converter** works as a **binary decoder** and an encoder at once. Paste a message written in 0s and 1s into the Binary box and the English text appears on the left; type in the Text box and you get **text to binary** on the right. It reads binary with or without spaces, so a long unbroken string like `0100100001101001` works as well as `01001000 01101001`.

Because it uses UTF-8, the same encoding web pages use, it is also a **binary to ASCII** converter for plain English: every ASCII letter, digit and punctuation mark is one byte, exactly as in the table below.

## How to read binary code by hand

![Binary to text example: 01001000 is decimal 72, the letter H, and 01101001 is decimal 105, the letter i, so the binary reads Hi](https://getmylocations.com/images/binary-to-text-hi.svg)

Two bytes of binary code, decoded to the word “Hi”.

1.  **Split the binary into groups of 8 bits.** Each group is one byte, for example `01001000`.
2.  **Turn each group into a number.** The 8 positions are worth 128, 64, 32, 16, 8, 4, 2 and 1; add up the positions that hold a 1. In `01001000` that is 64 + 8 = 72.
3.  **Look the number up.** 72 is the capital letter H. The **binary alphabet** below lists every letter and digit, so you can skip the arithmetic.

This is **how to read binary** for any English message. Characters outside English, such as é or emoji, take two to four bytes in UTF-8; the converter above handles those for you.

## Binary alphabet: A–Z, a–z and 0–9 in binary

The **letters in binary**, as computers store them. Capital and small letters differ by a single bit (the third from the left), which is why `A` is 01000001 and `a` is 01100001.

| Capital | Binary | Small | Binary |
| --- | --- | --- | --- |
| A | `01000001` | a | `01100001` |
| B | `01000010` | b | `01100010` |
| C | `01000011` | c | `01100011` |
| D | `01000100` | d | `01100100` |
| E | `01000101` | e | `01100101` |
| F | `01000110` | f | `01100110` |
| G | `01000111` | g | `01100111` |
| H | `01001000` | h | `01101000` |
| I | `01001001` | i | `01101001` |
| J | `01001010` | j | `01101010` |
| K | `01001011` | k | `01101011` |
| L | `01001100` | l | `01101100` |
| M | `01001101` | m | `01101101` |
| N | `01001110` | n | `01101110` |
| O | `01001111` | o | `01101111` |
| P | `01010000` | p | `01110000` |
| Q | `01010001` | q | `01110001` |
| R | `01010010` | r | `01110010` |
| S | `01010011` | s | `01110011` |
| T | `01010100` | t | `01110100` |
| U | `01010101` | u | `01110101` |
| V | `01010110` | v | `01110110` |
| W | `01010111` | w | `01110111` |
| X | `01011000` | x | `01111000` |
| Y | `01011001` | y | `01111001` |
| Z | `01011010` | z | `01111010` |

| Digit | Binary | Character | Binary |
| --- | --- | --- | --- |
| 0 | `00110000` | 5 | `00110101` |
| 1 | `00110001` | 6 | `00110110` |
| 2 | `00110010` | 7 | `00110111` |
| 3 | `00110011` | 8 | `00111000` |
| 4 | `00110100` | 9 | `00111001` |
| space | `00100000` | ! | `00100001` |
| . | `00101110` | ? | `00111111` |

## How binary text works

Computers store text as numbers. Each character becomes one or more bytes (UTF-8), and each byte is eight binary digits. Reading binary back is the same steps in reverse: group the bits in eights, turn each group into a number, and look up the character.

| Character | Decimal | Hex | Binary |
| --- | --- | --- | --- |
| A | 65 | 41 | `01000001` |
| a | 97 | 61 | `01100001` |
| 0 | 48 | 30 | `00110000` |
| space | 32 | 20 | `00100000` |
| é | 195 169 | c3 a9 | `11000011 10101001` |

## Binary vs ASCII vs UTF-8

-   **Binary** is just the number system: every value written with 0s and 1s.
-   **ASCII** is a 1960s table that gives 128 characters (English letters, digits, punctuation) the numbers 0 to 127.
-   **UTF-8** is today’s standard. It keeps the ASCII numbers for those 128 characters, so English text is identical in both, and adds every other script and emoji using two to four bytes.

UTF-8 is defined in [RFC 3629](https://www.rfc-editor.org/rfc/rfc3629), and the characters it can encode are listed by the [Unicode Consortium](https://home.unicode.org/). This converter follows that standard, so its output matches what browsers and programming languages produce.

## Text to binary for names and messages

To write your **name in binary**, type it into the Text box and copy the result. Each letter becomes eight digits, so “Sam” is `01010011 01100001 01101101`. It is a popular idea for bracelets, tattoos, cards and puzzles; check capital and small letters, because they give different binary.

For other ways to encode text, switch the tool to **hex** or **Base64**, or create a checksum of it with the [MD5 and SHA hash generator](https://getmylocations.com/md5-generator).

## Accepted input

-   **Binary:** 8-bit groups separated by spaces, or one long run of 0s and 1s whose length is a multiple of 8.
-   **Hex:** two digits per byte, with or without spaces or a `0x` prefix.
-   **Decimal:** byte values from 0 to 255, separated by spaces or commas.
-   **Base64:** standard or URL-safe (with - and \_).

To see how big data is in other units, use the [bytes and bits converter](https://getmylocations.com/bytes-bits-converter).

## Frequently asked questions

How do I convert binary to text?

Paste the binary into the right-hand box with the Binary tab selected. Each group of 8 bits is one byte; the tool turns the bytes into text using UTF-8. Spaces between groups are optional.

How do I translate binary code to English?

Paste the 0s and 1s into the converter and the English text appears in the left-hand box as you type. To do it by hand, split the binary into groups of 8, turn each group into a number, and look the number up in the binary alphabet table on this page.

What does 01001000 01101001 mean?

It says “Hi”. 01001000 is 72, the capital letter H, and 01101001 is 105, the small letter i.

Is this binary translator free?

Yes. It is free with no signup and no limit, and the conversion happens in your browser, so the text you type is not sent anywhere.

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

### Password Generator

Strong passwords and passphrases

](https://getmylocations.com/password-generator)[

### Internet Speed Test

Download, upload and ping

](https://getmylocations.com/internet-speed-test)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
