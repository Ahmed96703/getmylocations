import ToolPage, { toolMetadata, Section, P, UL, B, A, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/bytes-bits-converter';
export const metadata = toolMetadata({
  path,
  title: 'Bytes & Bits Converter: KB, MB, GB, Mbps & Download Time',
  description: 'Convert between bits, bytes, KB, MB, GB, TB, KiB, MiB, GiB and Mbps, and work out how long a download takes at your internet speed. Free and instant.',
  keywords: ['bytes to bits', 'bits to bytes', 'data size converter', 'mb to gb', 'mbps to mb/s', 'gb to mb', 'download time calculator'],
});

const faqs = [
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
      appDescription="Free data size converter between bits, bytes, decimal SI units (KB to PB, kb to Tb) and binary IEC units (KiB to TiB), with a download time calculator for a file size and speed in Mbps."
      tool={<Tool />}
      faqs={faqs}
      related={['/internet-speed-test', '/binary-to-text']}
    >
      <Section title="Decimal and binary units">
        <Table head={['Decimal (SI)', 'Bytes', 'Binary (IEC)', 'Bytes']} rows={[
          ['1 KB (kilobyte)', '1,000', '1 KiB (kibibyte)', '1,024'],
          ['1 MB (megabyte)', '1,000,000', '1 MiB (mebibyte)', '1,048,576'],
          ['1 GB (gigabyte)', '1,000,000,000', '1 GiB (gibibyte)', '1,073,741,824'],
          ['1 TB (terabyte)', '10¹²', '1 TiB (tebibyte)', '1,099,511,627,776'],
        ]} />
        <P>The gap grows with size: a gibibyte is about 7% larger than a gigabyte, a tebibyte about 10% larger than a terabyte.</P>
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
