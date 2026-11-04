import { createHash } from 'node:crypto';
import ToolPage, { toolMetadata, Section, P, UL, OL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';
import { md5 } from './md5.js';

// Hashed at build time: MD5 with the tool's own code, SHA-256 with Node's crypto,
// which implements the same standard as the browser's crypto.subtle.
const utf8 = (t) => new TextEncoder().encode(t);
const sha256 = (t) => createHash('sha256').update(t, 'utf8').digest('hex');
const md5Of = (t) => md5(utf8(t));
const EXAMPLES = [
  ['(empty)', ''],
  ['hello', 'hello'],
  ['Hello', 'Hello'],
  ['hello + newline', 'hello\n'],
  ['hello world', 'hello world'],
];
const exampleRows = EXAMPLES.map(([label, t]) => [label, <Code key="m">{md5Of(t)}</Code>, <Code key="s">{sha256(t)}</Code>]);

const path = '/md5-generator';
export const metadata = toolMetadata({
  path,
  title: 'MD5 Generator & SHA-256 Hash Generator (Text or File)',
  description: 'Generate MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes of any text or file, and check a download against its published hash. Runs in your browser.',
  keywords: ['md5 generator', 'md5 hash generator', 'sha256 generator', 'hash generator', 'md5 checksum', 'sha1 generator', 'file hash checker'],
});

const faqs = [
  { q: 'What is the MD5 of an empty string?', a: `${md5Of('')}. Every tool that hashes zero bytes gets this same value, so seeing it usually means a file or field was empty. The SHA-256 of an empty string is ${sha256('')}.` },
  { q: 'Should I use MD5 or SHA-256?', a: 'Use SHA-256 unless something specifically asks for MD5. Both spot accidental corruption equally well, but only SHA-256 also protects against someone deliberately making a fake file with the same hash. MD5 is still common for older download pages, cache keys and quick duplicate checks.' },
  { q: 'What is an MD5 hash?', a: 'A 128-bit fingerprint of some data, written as 32 hex characters. The same input always gives the same hash, and changing a single character changes the whole hash. It is widely used as a checksum to spot corrupted or altered files.' },
  { q: 'Is MD5 secure?', a: 'Not for security. Researchers can create two different files with the same MD5, so it must not be used for passwords, signatures or certificates. It is still fine for detecting accidental corruption. For anything security-related, use SHA-256.' },
  { q: 'Can an MD5 hash be decrypted?', a: 'No. Hashing is one-way. Sites that claim to “decrypt” MD5 look the hash up in tables of hashes of common words and leaked passwords, which only works for short, common inputs.' },
  { q: 'How do I check a downloaded file?', a: 'Choose “Hash a file…”, select the download and paste the hash published on the download page into the compare box. A match means the file is exactly what the publisher released. Large files may take a few seconds.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="MD5 & SHA Hash Generator"
      eyebrow="Free Tool · Text or file, on your device"
      h1="MD5 & SHA hash generator"
      intro="Type text or pick a file to get its MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes instantly, then paste a published hash to check it matches. Nothing is uploaded: hashing happens in your browser."
      bold={['MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes']}
      appDescription="Free client-side hash generator computing MD5, SHA-1, SHA-256, SHA-384 and SHA-512 of UTF-8 text or local files, with uppercase output and a compare box for verifying checksums."
      tool={<Tool />}
      faqs={faqs}
      related={['/password-generator', '/binary-to-text']}
      updated="2026-11-04"
      features={['MD5, SHA-1, SHA-256, SHA-384 and SHA-512', 'Hash text as you type', 'Hash files up to 512 MB', 'Compare against a published checksum', 'Lowercase or uppercase output', 'Nothing is uploaded: runs in your browser']}
    >
      <Section title="What is an MD5 generator?">
        <P>
          An MD5 generator turns any text or file into a short, fixed-length fingerprint called a hash. The same input always gives the same 32-character MD5, and the smallest change, even one letter or an extra space, gives a completely different one. That makes hashes useful for checking that a download arrived intact, that two files are identical, or that a piece of text has not been changed. This tool also makes SHA-1 and SHA-2 hashes, the stronger standards most software uses today.
        </P>
      </Section>

      <Section title="Which hash to use">
        <Table head={['Algorithm', 'Length', 'Use it for']} rows={[
          ['MD5', '32 hex characters', 'Checksums, cache keys, deduplication. Not security.'],
          ['SHA-1', '40 hex characters', 'Legacy systems and Git object IDs. Not new security uses.'],
          ['SHA-256', '64 hex characters', 'File verification, signatures, blockchains: the modern default'],
          ['SHA-384', '96 hex characters', 'TLS certificates and systems that ask for it specifically'],
          ['SHA-512', '128 hex characters', 'Same as SHA-256 with a larger output'],
        ]} />
      </Section>

      <Section title="MD5 and SHA-256 hash examples">
        <P>One letter, or a newline you cannot see, changes the whole hash. These were computed when this page was built, with the same MD5 code the tool runs:</P>
        <Table head={['Input', 'MD5', 'SHA-256']} rows={exampleRows} />
      </Section>

      <Section title="How to check a file hash without a website">
        <P>Every major operating system can hash a file from the command line. Replace <Code>file.zip</Code> with your file&rsquo;s name:</P>
        <Table head={['System', 'SHA-256', 'MD5']} rows={[
          ['Windows (Command Prompt)', <Code key="a">certutil -hashfile file.zip SHA256</Code>, <Code key="b">certutil -hashfile file.zip MD5</Code>],
          ['Windows (PowerShell)', <Code key="a">Get-FileHash file.zip</Code>, <Code key="b">Get-FileHash file.zip -Algorithm MD5</Code>],
          ['Mac', <Code key="a">shasum -a 256 file.zip</Code>, <Code key="b">md5 file.zip</Code>],
          ['Linux', <Code key="a">sha256sum file.zip</Code>, <Code key="b">md5sum file.zip</Code>],
        ]} />
        <P>Some tools print the hash in capitals and others in small letters; the two are the same hash.</P>
      </Section>

      <Section title="Why MD5 and SHA-1 are no longer safe">
        <OL items={[
          <><B>2004:</B> researchers led by Xiaoyun Wang published the first MD5 collisions, two different inputs with the same hash.</>,
          <><B>2008:</B> a team used MD5 collisions to create a rogue certificate authority certificate that browsers would have trusted.</>,
          <><B>2012:</B> the Flame malware used an MD5 collision to forge a Microsoft code-signing certificate.</>,
          <><B>2017:</B> Google and CWI Amsterdam published SHAttered, the first SHA-1 collision: two different PDF files with the same SHA-1.</>,
        ]} />
        <P>
          None of these attacks lets anyone turn a hash back into its input, and accidental corruption still always changes the hash. They mean an attacker can prepare two files that share an MD5 or SHA-1, so neither should be trusted where someone might cheat. No practical collision is known for SHA-256.
        </P>
      </Section>

      <Section title="Things that change the hash">
        <UL items={[
          <><B>Invisible characters:</B> a trailing space or newline gives a completely different hash. <Code>hello</Code> and <Code>hello⏎</Code> do not match.</>,
          <><B>Letter case of the input:</B> <Code>Hello</Code> and <Code>hello</Code> differ. The case of the hex output does not matter.</>,
          <><B>Text encoding:</B> this tool uses UTF-8, the standard almost everywhere.</>,
        ]} />
        <P>Passwords should never be stored as plain MD5 or SHA hashes; services use slow, salted algorithms such as bcrypt or Argon2. To create a strong password, use the <A href="/password-generator">password generator</A>.</P>
      </Section>
    </ToolPage>
  );
}
