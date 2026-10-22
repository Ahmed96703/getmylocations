import ToolPage, { toolMetadata, Section, P, UL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/asn-lookup';
export const metadata = toolMetadata({
  path,
  title: 'ASN Lookup: AS Number Owner, Country & IP Blocks (Free)',
  description: 'Look up any autonomous system number (ASN) or find the ASN of an IP: owner, country, registry, allocation date and every IP block it announces.',
  keywords: ['asn lookup', 'asn whois', 'as number lookup', 'ip to asn', 'autonomous system lookup', 'bgp asn lookup', 'what is my asn'],
});

const faqs = [
  { q: 'What is an ASN?', a: 'An autonomous system number identifies a network that decides its own routing on the internet, such as an internet provider, a cloud company or a university. Each one announces the IP address blocks it handles, and routers worldwide use those announcements, through BGP, to deliver traffic.' },
  { q: 'How do I find the ASN of an IP address?', a: 'Type the IP address into the box. The tool finds which network announces the block that contains it, then shows that network’s number, name and country, and the exact block your IP is in.' },
  { q: 'What is my ASN?', a: 'The tool looks up your own IP when the page opens, so the first result is the network your connection goes through, normally your internet or mobile provider.' },
  { q: 'Where does the data come from?', a: 'The IP-to-ASN mapping and names come from Team Cymru’s public IP-to-ASN service, the registration details from the regional internet registries’ RDAP servers, and the list of announced blocks from RIPEstat, run by the RIPE NCC.' },
  { q: 'Why does one company have several ASNs?', a: 'Large companies often run separate networks for different regions, products or acquired businesses, and each gets its own number. Google, Amazon and Microsoft each operate many.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="ASN Lookup"
      eyebrow="Free Tool · BGP & registry data"
      h1="ASN lookup"
      accent="who runs this network?"
      intro="Enter an AS number such as AS15169, or an IP address, to see the network’s owner, country and registry, when it was allocated, and every IP block it announces. Your own network is shown to start."
      appDescription="Free ASN WHOIS lookup: finds the autonomous system for an IP address and shows the AS name, country, registry, allocation date, abuse contact and announced IPv4 and IPv6 prefixes."
      tool={<Tool />}
      faqs={faqs}
      related={['/ip-whois-lookup', '/ip-location']}
    >
      <Section title="How to use the ASN lookup">
        <UL items={[
          <><B>By number:</B> type <Code>AS13335</Code> or just <Code>13335</Code>.</>,
          <><B>By IP address:</B> type an IPv4 or IPv6 address to find the network that routes it and the block it belongs to.</>,
          <><B>See the blocks:</B> open &ldquo;Announced IP blocks&rdquo; for every prefix the network announced over the last two weeks.</>,
        ]} />
      </Section>

      <Section title="ASN, IP block and IP address">
        <P>
          The internet is a network of about 75,000 networks. Each one that routes traffic on its own has an <B>autonomous system number</B>. It announces the <B>IP blocks</B> (prefixes such as <Code>8.8.8.0/24</Code>) it can deliver, and every single <B>IP address</B> sits inside one of those blocks.
        </P>
        <Table head={['Example', 'ASN', 'Network']} rows={[
          ['8.8.8.8 (Google DNS)', 'AS15169', 'Google LLC'],
          ['1.1.1.1 (Cloudflare DNS)', 'AS13335', 'Cloudflare, Inc.'],
          ['9.9.9.9 (Quad9 DNS)', 'AS19281', 'Quad9'],
          ['Facebook and Instagram', 'AS32934', 'Meta Platforms, Inc.'],
        ]} />
        <P>
          Numbers up to 65,535 are the original 16-bit ASNs; newer ones go up to about 4.29 billion. Ranges such as 64,512–65,534 are private and never appear on the public internet.
        </P>
      </Section>

      <Section title="Why people look up ASNs">
        <UL items={[
          <><B>Troubleshooting:</B> see which provider carries traffic for a site, or whether two addresses belong to the same network.</>,
          <><B>Security:</B> block or allow a whole hosting provider in a firewall, or recognise traffic from data centers rather than homes.</>,
          <><B>Abuse reports:</B> find the network operator responsible for an address and its abuse contact.</>,
        ]} />
        <P>
          For the registration record of a single address, use the <A href="/ip-whois-lookup">IP WHOIS lookup</A>; for its estimated location, <A href="/ip-location">IP Location</A>.
        </P>
      </Section>
    </ToolPage>
  );
}
