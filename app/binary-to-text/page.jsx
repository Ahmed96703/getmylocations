import ToolPage, { toolMetadata, Section, P, UL, OL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/binary-to-text';
export const metadata = toolMetadata({
  path,
  title: 'Binary to Text Converter (and Text to Binary, Hex, Base64)',
  description: 'Convert binary to text and text to binary instantly, plus hex, decimal bytes and Base64, in both directions. Handles accents and emoji (UTF-8). Free.',
  keywords: [
    'binary to text', 'text to binary', 'binary translator', 'binary code translator', 'hex to text', 'text to hex', 'base64 decode',
    'binary to text converter', 'binary code', 'binary to english', 'binary decoder', 'binary alphabet', 'binary to ascii',
    'letters in binary', 'name in binary', 'how to read binary',
  ],
  image: '/images/og-binary-to-text.png',
});

// 8-bit binary for a character, e.g. 'A' -> '01000001'.
const bin = (ch) => ch.charCodeAt(0).toString(2).padStart(8, '0');
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const DIGITS = '0123456789'.split('');

const faqs = [
  { q: 'How do I convert binary to text?', a: 'Paste the binary into the right-hand box with the Binary tab selected. Each group of 8 bits is one byte; the tool turns the bytes into text using UTF-8. Spaces between groups are optional.' },
  { q: 'How do I translate binary code to English?', a: 'Paste the 0s and 1s into the converter and the English text appears in the left-hand box as you type. To do it by hand, split the binary into groups of 8, turn each group into a number, and look the number up in the binary alphabet table on this page.' },
  { q: 'What does 01001000 01101001 mean?', a: 'It says “Hi”. 01001000 is 72, the capital letter H, and 01101001 is 105, the small letter i.' },
  { q: 'Is this binary translator free?', a: 'Yes. It is free with no signup and no limit, and the conversion happens in your browser, so the text you type is not sent anywhere.' },
  { q: 'What is “Hello” in binary?', a: '01001000 01100101 01101100 01101100 01101111. Each letter is one byte: H is 72, e is 101, l is 108 and o is 111.' },
  { q: 'Why do some characters take more than 8 bits?', a: 'In UTF-8, English letters and digits take one byte, accented letters such as é take two, most other scripts three, and emoji four. That is why “é” is 11000011 10101001.' },
  { q: 'What is Base64 for?', a: 'Base64 writes any bytes using only letters, digits, + and /, so binary data can travel through email, URLs and JSON. It makes data about a third larger and is an encoding, not encryption.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="Binary to Text Converter"
      eyebrow="Free Binary Translator · Both directions"
      h1="Binary to Text Converter"
      intro="Paste binary code to read it as text, or type text to see it in binary. This free binary translator also converts hex, decimal bytes and Base64, handles accents and emoji, and updates both boxes as you type."
      bold={['binary code', 'read it as text', 'see it in binary', 'free binary translator']}
      appDescription="Free two-way binary translator: converts binary code to text and text to binary using UTF-8, plus hexadecimal, decimal byte values and Base64, with live conversion and validation."
      tool={<Tool />}
      faqs={faqs}
      related={['/bytes-bits-converter', '/md5-generator', '/password-generator']}
      updated="2026-10-23"
    >
      <Section title="Binary translator: binary code to English">
        <P>
          This <B>binary to text converter</B> works as a <B>binary decoder</B> and an encoder at once. Paste a message written in 0s and 1s into the Binary box and the English text appears on the left; type in the Text box and you get <B>text to binary</B> on the right. It reads binary with or without spaces, so a long unbroken string like <Code>0100100001101001</Code> works as well as <Code>01001000 01101001</Code>.
        </P>
        <P>
          Because it uses UTF-8, the same encoding web pages use, it is also a <B>binary to ASCII</B> converter for plain English: every ASCII letter, digit and punctuation mark is one byte, exactly as in the table below.
        </P>
      </Section>

      <Section title="How to read binary code by hand">
        <figure className="mt-4">
          <img
            src="/images/binary-to-text-hi.svg"
            width={800}
            height={360}
            loading="lazy"
            alt="Binary to text example: 01001000 is decimal 72, the letter H, and 01101001 is decimal 105, the letter i, so the binary reads Hi"
            className="w-full h-auto rounded-xl ring-1 ring-line"
          />
          <figcaption className="mt-2 text-sm text-fg-subtle">Two bytes of binary code, decoded to the word “Hi”.</figcaption>
        </figure>
        <OL items={[
          <><B>Split the binary into groups of 8 bits.</B> Each group is one byte, for example <Code>01001000</Code>.</>,
          <><B>Turn each group into a number.</B> The 8 positions are worth 128, 64, 32, 16, 8, 4, 2 and 1; add up the positions that hold a 1. In <Code>01001000</Code> that is 64 + 8 = 72.</>,
          <><B>Look the number up.</B> 72 is the capital letter H. The <B>binary alphabet</B> below lists every letter and digit, so you can skip the arithmetic.</>,
        ]} />
        <P>
          This is <B>how to read binary</B> for any English message. Characters outside English, such as é or emoji, take two to four bytes in UTF-8; the converter above handles those for you.
        </P>
      </Section>

      <Section title="Binary alphabet: A–Z, a–z and 0–9 in binary">
        <P>
          The <B>letters in binary</B>, as computers store them. Capital and small letters differ by a single bit (the third from the left), which is why <Code>A</Code> is 01000001 and <Code>a</Code> is 01100001.
        </P>
        <Table head={['Capital', 'Binary', 'Small', 'Binary']} rows={UPPER.map((c) => {
          const l = c.toLowerCase();
          return [c, <Code key="u">{bin(c)}</Code>, l, <Code key="l">{bin(l)}</Code>];
        })} />
        <Table head={['Digit', 'Binary', 'Character', 'Binary']} rows={[
          ...[0, 1, 2, 3, 4].map((i) => [DIGITS[i], <Code key="a">{bin(DIGITS[i])}</Code>, DIGITS[i + 5], <Code key="b">{bin(DIGITS[i + 5])}</Code>]),
          ['space', <Code key="s">{bin(' ')}</Code>, '!', <Code key="e">{bin('!')}</Code>],
          ['.', <Code key="p">{bin('.')}</Code>, '?', <Code key="q">{bin('?')}</Code>],
        ]} />
      </Section>

      <Section title="How binary text works">
        <P>
          Computers store text as numbers. Each character becomes one or more bytes (UTF-8), and each byte is eight binary digits. Reading binary back is the same steps in reverse: group the bits in eights, turn each group into a number, and look up the character.
        </P>
        <Table head={['Character', 'Decimal', 'Hex', 'Binary']} rows={[
          ['A', '65', '41', <Code>01000001</Code>],
          ['a', '97', '61', <Code>01100001</Code>],
          ['0', '48', '30', <Code>00110000</Code>],
          ['space', '32', '20', <Code>00100000</Code>],
          ['é', '195 169', 'c3 a9', <Code>11000011 10101001</Code>],
        ]} />
      </Section>

      <Section title="Binary vs ASCII vs UTF-8">
        <UL items={[
          <><B>Binary</B> is just the number system: every value written with 0s and 1s.</>,
          <><B>ASCII</B> is a 1960s table that gives 128 characters (English letters, digits, punctuation) the numbers 0 to 127.</>,
          <><B>UTF-8</B> is today’s standard. It keeps the ASCII numbers for those 128 characters, so English text is identical in both, and adds every other script and emoji using two to four bytes.</>,
        ]} />
        <P>
          UTF-8 is defined in <A href="https://www.rfc-editor.org/rfc/rfc3629">RFC 3629</A>, and the characters it can encode are listed by the <A href="https://home.unicode.org/">Unicode Consortium</A>. This converter follows that standard, so its output matches what browsers and programming languages produce.
        </P>
      </Section>

      <Section title="Text to binary for names and messages">
        <P>
          To write your <B>name in binary</B>, type it into the Text box and copy the result. Each letter becomes eight digits, so “Sam” is <Code>{['S', 'a', 'm'].map(bin).join(' ')}</Code>. It is a popular idea for bracelets, tattoos, cards and puzzles; check capital and small letters, because they give different binary.
        </P>
        <P>
          For other ways to encode text, switch the tool to <B>hex</B> or <B>Base64</B>, or create a checksum of it with the <A href="/md5-generator">MD5 and SHA hash generator</A>.
        </P>
      </Section>

      <Section title="Accepted input">
        <UL items={[
          <><B>Binary:</B> 8-bit groups separated by spaces, or one long run of 0s and 1s whose length is a multiple of 8.</>,
          <><B>Hex:</B> two digits per byte, with or without spaces or a <Code>0x</Code> prefix.</>,
          <><B>Decimal:</B> byte values from 0 to 255, separated by spaces or commas.</>,
          <><B>Base64:</B> standard or URL-safe (with - and _).</>,
        ]} />
        <P>To see how big data is in other units, use the <A href="/bytes-bits-converter">bytes and bits converter</A>.</P>
      </Section>
    </ToolPage>
  );
}
