import ToolPage, { toolMetadata, Section, P, UL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/binary-to-text';
export const metadata = toolMetadata({
  path,
  title: 'Binary to Text Converter (and Text to Binary, Hex, Base64)',
  description: 'Convert binary to text and text to binary instantly, plus hex, decimal bytes and Base64, in both directions. Handles accents and emoji (UTF-8). Free.',
  keywords: ['binary to text', 'text to binary', 'binary translator', 'binary code translator', 'hex to text', 'text to hex', 'base64 decode'],
});

const faqs = [
  { q: 'How do I convert binary to text?', a: 'Paste the binary into the right-hand box with the Binary tab selected. Each group of 8 bits is one byte; the tool turns the bytes into text using UTF-8. Spaces between groups are optional.' },
  { q: 'What is “Hello” in binary?', a: '01001000 01100101 01101100 01101100 01101111. Each letter is one byte: H is 72, e is 101, l is 108 and o is 111.' },
  { q: 'Why do some characters take more than 8 bits?', a: 'In UTF-8, English letters and digits take one byte, accented letters such as é take two, most other scripts three, and emoji four. That is why “é” is 11000011 10101001.' },
  { q: 'What is Base64 for?', a: 'Base64 writes any bytes using only letters, digits, + and /, so binary data can travel through email, URLs and JSON. It makes data about a third larger and is an encoding, not encryption.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="Binary to Text Converter"
      eyebrow="Free Tool · Both directions"
      h1="Binary to text converter"
      intro="Type text to see it in binary, or paste binary to read it as text. Switch to hex, decimal bytes or Base64 with one click. Both boxes update as you type."
      appDescription="Free two-way converter between UTF-8 text and binary, hexadecimal, decimal byte values and Base64, with live conversion and validation."
      tool={<Tool />}
      faqs={faqs}
      related={['/bytes-bits-converter', '/md5-generator']}
    >
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
