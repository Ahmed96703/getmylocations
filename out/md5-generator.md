---
title: "MD5 Generator & SHA-256 Hash Generator (Text or File)"
description: "Generate MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes of any text or file, and check a download against its published hash. Runs in your browser."
url: https://getmylocations.com/md5-generator
---

Free Tool · Text or file, on your device

# MD5 & SHA hash generator

Type text or pick a file to get its **MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes** instantly, then paste a published hash to check it matches. Nothing is uploaded: hashing happens in your browser.

Last updated November 4, 2026 by [Ahmed Anwar](https://getmylocations.com/about).

## Generate MD5, SHA-1 and SHA-256 hashes

 Text is encoded as UTF-8. Nothing leaves your device.

## What is an MD5 generator?

An MD5 generator turns any text or file into a short, fixed-length fingerprint called a hash. The same input always gives the same 32-character MD5, and the smallest change, even one letter or an extra space, gives a completely different one. That makes hashes useful for checking that a download arrived intact, that two files are identical, or that a piece of text has not been changed. This tool also makes SHA-1 and SHA-2 hashes, the stronger standards most software uses today.

## Which hash to use

| Algorithm | Length | Use it for |
| --- | --- | --- |
| MD5 | 32 hex characters | Checksums, cache keys, deduplication. Not security. |
| SHA-1 | 40 hex characters | Legacy systems and Git object IDs. Not new security uses. |
| SHA-256 | 64 hex characters | File verification, signatures, blockchains: the modern default |
| SHA-384 | 96 hex characters | TLS certificates and systems that ask for it specifically |
| SHA-512 | 128 hex characters | Same as SHA-256 with a larger output |

## MD5 and SHA-256 hash examples

One letter, or a newline you cannot see, changes the whole hash. These were computed when this page was built, with the same MD5 code the tool runs:

| Input | MD5 | SHA-256 |
| --- | --- | --- |
| (empty) | `d41d8cd98f00b204e9800998ecf8427e` | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` |
| hello | `5d41402abc4b2a76b9719d911017c592` | `2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824` |
| Hello | `8b1a9953c4611296a827abf8c47804d7` | `185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969` |
| hello + newline | `b1946ac92492d2347c6235b4d2611184` | `5891b5b522d5df086d0ff0b110fbd9d21bb4fc7163af34d08286a2e846f6be03` |
| hello world | `5eb63bbbe01eeed093cb22bb8f5acdc3` | `b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9` |

## How to check a file hash without a website

Every major operating system can hash a file from the command line. Replace `file.zip` with your file’s name:

| System | SHA-256 | MD5 |
| --- | --- | --- |
| Windows (Command Prompt) | `certutil -hashfile file.zip SHA256` | `certutil -hashfile file.zip MD5` |
| Windows (PowerShell) | `Get-FileHash file.zip` | `Get-FileHash file.zip -Algorithm MD5` |
| Mac | `shasum -a 256 file.zip` | `md5 file.zip` |
| Linux | `sha256sum file.zip` | `md5sum file.zip` |

Some tools print the hash in capitals and others in small letters; the two are the same hash.

## Why MD5 and SHA-1 are no longer safe

1.  **2004:** researchers led by Xiaoyun Wang published the first MD5 collisions, two different inputs with the same hash.
2.  **2008:** a team used MD5 collisions to create a rogue certificate authority certificate that browsers would have trusted.
3.  **2012:** the Flame malware used an MD5 collision to forge a Microsoft code-signing certificate.
4.  **2017:** Google and CWI Amsterdam published SHAttered, the first SHA-1 collision: two different PDF files with the same SHA-1.

None of these attacks lets anyone turn a hash back into its input, and accidental corruption still always changes the hash. They mean an attacker can prepare two files that share an MD5 or SHA-1, so neither should be trusted where someone might cheat. No practical collision is known for SHA-256.

## Things that change the hash

-   **Invisible characters:** a trailing space or newline gives a completely different hash. `hello` and `hello⏎` do not match.
-   **Letter case of the input:** `Hello` and `hello` differ. The case of the hex output does not matter.
-   **Text encoding:** this tool uses UTF-8, the standard almost everywhere.

Passwords should never be stored as plain MD5 or SHA hashes; services use slow, salted algorithms such as bcrypt or Argon2. To create a strong password, use the [password generator](https://getmylocations.com/password-generator).

## Frequently asked questions

What is the MD5 of an empty string?

d41d8cd98f00b204e9800998ecf8427e. Every tool that hashes zero bytes gets this same value, so seeing it usually means a file or field was empty. The SHA-256 of an empty string is e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855.

Should I use MD5 or SHA-256?

Use SHA-256 unless something specifically asks for MD5. Both spot accidental corruption equally well, but only SHA-256 also protects against someone deliberately making a fake file with the same hash. MD5 is still common for older download pages, cache keys and quick duplicate checks.

What is an MD5 hash?

A 128-bit fingerprint of some data, written as 32 hex characters. The same input always gives the same hash, and changing a single character changes the whole hash. It is widely used as a checksum to spot corrupted or altered files.

Is MD5 secure?

Not for security. Researchers can create two different files with the same MD5, so it must not be used for passwords, signatures or certificates. It is still fine for detecting accidental corruption. For anything security-related, use SHA-256.

Can an MD5 hash be decrypted?

No. Hashing is one-way. Sites that claim to “decrypt” MD5 look the hash up in tables of hashes of common words and leaked passwords, which only works for short, common inputs.

How do I check a downloaded file?

Choose “Hash a file…”, select the download and paste the hash published on the download page into the compare box. A match means the file is exactly what the publisher released. Large files may take a few seconds.

## Related tools

[

### Password Generator

Strong passwords and passphrases

](https://getmylocations.com/password-generator)[

### Binary to Text

Binary, text, hex and decimal

](https://getmylocations.com/binary-to-text)[

### Internet Speed Test

Download, upload and ping

](https://getmylocations.com/internet-speed-test)[

### Random Word Generator

Random English words

](https://getmylocations.com/random-word-generator)

AA

Written by

### Ahmed Anwar

Senior software engineer in Karachi. Builds the geolocation tools, mapping pages, and coordinate utilities on GetMyLocations. Writes about GPS, browser geolocation, and IP geolocation from the perspective of someone who ships the code, not the marketing.

This article was researched and drafted with AI assistance, then edited and fact-checked by Ahmed before publication. [More about the author](https://getmylocations.com/about).
