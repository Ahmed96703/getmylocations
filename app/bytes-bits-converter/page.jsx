import ToolPage, { toolMetadata, Section, P, UL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';
import { BITS, fmtNum, duration } from './units.js';

// Computed at build time with the tool's own units and formatting.
const conv = (n, from, to) => fmtNum((n * BITS[from]) / BITS[to]);
const SPEEDS = [10, 25, 100, 300, 1000];
const FILES = [['1 GB file', 1], ['4 GB HD film', 4], ['50 GB game', 50], ['150 GB game', 150]];
const downloadRows = FILES.map(([label, gb]) => [label, ...SPEEDS.map((mbps) => duration((gb * BITS.GB) / (mbps * 1e6)))]);
const DRIVES = [[128, 'GB'], [256, 'GB'], [512, 'GB'], [1, 'TB'], [2, 'TB'], [4, 'TB']];
const driveRows = DRIVES.map(([n, u]) => {
  const gib = (n * BITS[u]) / BITS.GiB;
  return [`${n} ${u}`, gib >= 1000 ? `${fmtNum(Math.round((gib / 1024) * 100) / 100)} TB` : `${fmtNum(Math.round(gib * 10) / 10)} GB`];
});
const COMMON = [
  ['1 GB', 'MB', conv(1, 'GB', 'MB')],
  ['1 GiB', 'MiB', conv(1, 'GiB', 'MiB')],
  ['1 TB', 'GB', conv(1, 'TB', 'GB')],
  ['1 MB', 'bits', conv(1, 'MB', 'bit')],
  ['1 MB', 'KB', conv(1, 'MB', 'KB')],
  ['1 GB', 'GiB', `about ${fmtNum(Math.round(((1 * BITS.GB) / BITS.GiB) * 1000) / 1000)}`],
  ['1 Gb (gigabit)', 'MB', conv(1, 'Gb', 'MB')],
].map(([from, to, v]) => [from, `${v} ${to}`]);

const path = '/bytes-bits-converter';
export const metadata = toolMetadata({
  path,
  title: 'Bytes to Bits Converter: KB, MB, GB, Mbps & Download Time',
  description: 'Convert between bits, bytes, KB, MB, GB, TB, KiB, MiB, GiB and Mbps, and work out how long a download takes at your internet speed. Free and instant.',
  keywords: ['bytes to bits', 'bits to bytes', 'data size converter', 'mb to gb', 'mbps to mb/s', 'gb to mb', 'download time calculator'],
});

const faqs = [
  { q: 'How many MB are in a GB?', a: `${conv(1, 'GB', 'MB')} MB in decimal units, the ones used for drives, phones and data plans. In binary units, 1 GiB is ${conv(1, 'GiB', 'MiB')} MiB, which Windows shows as “1 GB = 1,024 MB”.` },
  { q: 'What is 1 Gbps in MB per second?', a: `${conv(1, 'Gb', 'MB')} MB/s. Divide any speed in Mbps by 8 to get MB/s, so a gigabit connection can download up to about ${conv(1, 'Gb', 'MB')} megabytes each second at full speed.` },
  { q: 'How many bits are in a byte?', a: 'Eight. Internet speeds are given in bits per second (Mbps) and file sizes in bytes (MB), so divide a speed by 8 to get megabytes per second: 100 Mbps is 12.5 MB/s.' },
  { q: 'Is 1 GB 1000 MB or 1024 MB?', a: 'Both are in use. Drive makers and networking use decimal units (1 GB = 1,000 MB). Windows and memory use binary units (1 GiB = 1,024 MiB) but often label them “GB”. That is why a 1 TB drive shows about 931 GB in Windows.' },
  { q: 'What is the difference between Mb and MB?', a: 'A small b means bits, a capital B means bytes. 1 MB (megabyte) = 8 Mb (megabits).' },
  { q: 'How long does it take to download 1 GB?', a: 'At 100 Mbps, about 1 minute 20 seconds at full speed; at 25 Mbps about 5 minutes 20 seconds; at 1 Gbps about 8 seconds. Use the download time calculator above for any size and speed.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="Bytes & Bits Converter"
      eyebrow="Free Tool · Decimal and binary units"
      h1="Bytes and bits converter"
      intro="Enter an amount in any unit to see it in bits, bytes, kilobytes, megabytes, gigabytes and terabytes, in both decimal (KB, MB, GB) and binary (KiB, MiB, GiB) units, and calculate how long a download takes."
      bold={['bits, bytes, kilobytes, megabytes, gigabytes and terabytes', 'how long a download takes']}
      appDescription="Free data size converter between bits, bytes, decimal SI units (KB to PB, kb to Tb) and binary IEC units (KiB to TiB), with a download time calculator for a file size and speed in Mbps."
      tool={<Tool />}
      faqs={faqs}
      related={['/internet-speed-test', '/binary-to-text']}
      updated="2026-11-04"
      features={['Bits, bytes, KB, MB, GB, TB and PB', 'Binary units: KiB, MiB, GiB and TiB', 'Kilobits to terabits for network speeds', 'Download time for any file size and speed', 'Every unit shown at once', 'Runs in your browser']}
    >
      <Section title="What are bits and bytes?">
        <P>
          A <B>bit</B> is the smallest piece of digital data: a single 0 or 1. A <B>byte</B> is a group of 8 bits, enough to store one letter of plain English text. Larger units are built from these: a kilobyte, megabyte and gigabyte are a thousand, a million and a billion bytes. Network speeds are counted in bits per second, and file sizes in bytes. Mixing the two up is the most common reason a download seems eight times slower than the speed you pay for.
        </P>
      </Section>

      <Section title="Common conversions">
        <Table head={['Amount', 'Equals']} rows={COMMON} />
      </Section>

      <Section title="Decimal and binary units">
        <Table head={['Decimal (SI)', 'Bytes', 'Binary (IEC)', 'Bytes']} rows={[
          ['1 KB (kilobyte)', '1,000', '1 KiB (kibibyte)', '1,024'],
          ['1 MB (megabyte)', '1,000,000', '1 MiB (mebibyte)', '1,048,576'],
          ['1 GB (gigabyte)', '1,000,000,000', '1 GiB (gibibyte)', '1,073,741,824'],
          ['1 TB (terabyte)', '10¹²', '1 TiB (tebibyte)', '1,099,511,627,776'],
        ]} />
        <P>The gap grows with size: a gibibyte is about 7% larger than a gigabyte, a tebibyte about 10% larger than a terabyte.</P>
      </Section>

      <Section title="How long does a download take?">
        <P>Time to download each file at full speed, worked out with the same calculator as the tool above:</P>
        <Table head={['File', ...SPEEDS.map((m) => (m >= 1000 ? `${m / 1000} Gbps` : `${m} Mbps`))]} rows={downloadRows} />
        <P>
          Real downloads usually take a little longer. Part of every connection carries network overhead rather than your file, Wi-Fi is often slower than the line itself, and a busy server may not send at your full speed. Many browsers, game launchers and download managers show progress in megabytes per second (MB/s), so a steady 12 MB/s on a 100 Mbps line is close to the maximum of 12.5.
        </P>
      </Section>

      <Section title="Why a new drive shows less space than advertised">
        <P>
          Drive makers count in decimal units, where 1 TB is 10<sup>12</sup> bytes. Windows counts in binary units (1 GiB = 1,024<sup>3</sup> bytes) but labels them &ldquo;GB&rdquo;, so the same drive shows a smaller number. Nothing is missing. This is how each size appears in Windows before formatting and system files take their share:
        </P>
        <Table head={['Sold as', 'Shown in Windows']} rows={driveRows} />
        <P>macOS, iOS and Android use decimal units, so there a 1 TB drive shows close to 1 TB.</P>
      </Section>

      <Section title="Speeds and sizes">
        <UL items={[
          <><B>Internet speed</B> is in megabits per second: 100 Mbps = 12.5 megabytes per second.</>,
          <><B>A 4 GB film</B> takes about 5 minutes 20 seconds at 100 Mbps.</>,
          <><B>Phone storage and data plans</B> are in decimal gigabytes.</>,
        ]} />
        <P>Measure your own connection with the <A href="/internet-speed-test">internet speed test</A>, then plug the result into the download time calculator.</P>
      </Section>
    </ToolPage>
  );
}
