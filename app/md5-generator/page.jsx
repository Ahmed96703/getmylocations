import ToolPage, { toolMetadata, Section, P, UL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/md5-generator';
export const metadata = toolMetadata({
  path,
  title: 'MD5 Generator & SHA-256 Hash Generator (Text or File)',
  description: 'Generate MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes of any text or file, and check a download against its published hash. Runs in your browser.',
  keywords: ['md5 generator', 'md5 hash generator', 'sha256 generator', 'hash generator', 'md5 checksum', 'sha1 generator', 'file hash checker'],
});

const faqs = [
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
    >
      <Section title="Which hash to use">
        <Table head={['Algorithm', 'Length', 'Use it for']} rows={[
          ['MD5', '32 hex characters', 'Checksums, cache keys, deduplication. Not security.'],
          ['SHA-1', '40 hex characters', 'Legacy systems and Git object IDs. Not new security uses.'],
          ['SHA-256', '64 hex characters', 'File verification, signatures, blockchains: the modern default'],
          ['SHA-512', '128 hex characters', 'Same as SHA-256 with a larger output'],
        ]} />
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
