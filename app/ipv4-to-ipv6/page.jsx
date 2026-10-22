import ToolPage, { toolMetadata, Section, P, UL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/ipv4-to-ipv6';
export const metadata = toolMetadata({
  path,
  title: 'IPv4 to IPv6 Converter: Mapped, NAT64 & 6to4 Forms',
  description: 'Convert an IPv4 address to IPv6: IPv4-mapped (::ffff:), NAT64 and 6to4 forms, in short and expanded notation, and convert them back to IPv4.',
  keywords: ['ipv4 to ipv6', 'ipv4 to ipv6 converter', 'ipv4 mapped ipv6', '::ffff', 'nat64 address', '6to4 address', 'ipv6 to ipv4'],
});

const faqs = [
  { q: 'Can an IPv4 address be converted to IPv6?', a: 'An IPv4 address can be written in IPv6 notation, most often as an IPv4-mapped address such as ::ffff:192.0.2.1. That is a way of representing the IPv4 address inside IPv6 software, not a new address: it does not give the device a real IPv6 address, which only your network can assign.' },
  { q: 'What is ::ffff: in front of an IP address?', a: 'It marks an IPv4-mapped IPv6 address. Servers listening on IPv6 sockets see IPv4 visitors this way, so logs often show ::ffff:203.0.113.5. The part after ::ffff: is the ordinary IPv4 address.' },
  { q: 'What is NAT64?', a: 'NAT64 lets devices on an IPv6-only network reach IPv4-only sites. The network’s DNS gives them a synthetic address in 64:ff9b::/96 with the IPv4 address in the last 32 bits, and a gateway translates the traffic. Many mobile networks work this way.' },
  { q: 'Do I need IPv6?', a: 'Most home and mobile connections now have both. Websites keep working over IPv4, but IPv6 avoids carrier-grade NAT and is required by some networks. Your provider assigns IPv6; no converter can create it for you.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="IPv4 to IPv6 Converter"
      eyebrow="Free Tool · Both directions"
      h1="IPv4 to IPv6 converter"
      intro="Type an IPv4 address to see it in every standard IPv6 form: IPv4-mapped, NAT64, 6to4 and the obsolete IPv4-compatible form. Paste one of those IPv6 forms to get the IPv4 address back."
      bold={['IPv4 address', 'every standard IPv6 form', 'IPv4-mapped']}
      appDescription="Free converter that writes an IPv4 address in its IPv6 forms (IPv4-mapped ::ffff:, NAT64 64:ff9b::/96, 6to4 2002::/16, IPv4-compatible) in short and expanded notation, and extracts the IPv4 address from those forms."
      tool={<Tool />}
      faqs={faqs}
      related={['/ip-whois-lookup', '/ip-location']}
    >
      <Section title="How the conversion works">
        <P>
          An IPv4 address is 32 bits, written as four decimal numbers. An IPv6 address is 128 bits, written as eight groups of four hex digits. To fit IPv4 into IPv6, each pair of IPv4 numbers becomes one hex group, and a fixed prefix fills the rest.
        </P>
        <Table head={['Step', 'Example: 192.0.2.1']} rows={[
          ['Split into four numbers', '192 · 0 · 2 · 1'],
          ['Each number to two hex digits', 'c0 · 00 · 02 · 01'],
          ['Pair them into two groups', 'c000 : 0201'],
          ['Add the IPv4-mapped prefix', '::ffff:c000:201 (or ::ffff:192.0.2.1)'],
        ]} />
      </Section>

      <Section title="Which IPv6 form to use">
        <UL items={[
          <><B>IPv4-mapped</B> (<Code>::ffff:0:0/96</Code>): the one you will meet most, in server logs, socket APIs and databases that store every address as IPv6.</>,
          <><B>NAT64</B> (<Code>64:ff9b::/96</Code>): for IPv6-only networks reaching IPv4 servers.</>,
          <><B>6to4</B> (<Code>2002::/16</Code>): an old tunnelling method, deprecated in 2015 (RFC 7526). You may still see it in old configurations.</>,
          <><B>IPv4-compatible</B> (<Code>::a.b.c.d</Code>): deprecated since 2006. Do not use it.</>,
        ]} />
        <P>
          Private addresses such as <Code>192.168.1.1</Code> convert the same way, but they stay private: the IPv6 form does not make them reachable from the internet. To see who owns a public address, use the <A href="/ip-whois-lookup">IP WHOIS lookup</A>.
        </P>
      </Section>
    </ToolPage>
  );
}
