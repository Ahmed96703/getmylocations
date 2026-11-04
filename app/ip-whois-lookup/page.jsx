import ToolPage, { toolMetadata, Section, P, UL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/ip-whois-lookup';
export const metadata = toolMetadata({
  path,
  title: 'IP WHOIS Lookup: Free WHOIS IP Tool, Who Owns This IP?',
  description: 'Free IP WHOIS lookup: enter any valid IPv4 or IPv6 address to see who owns the IP, its IP range (NetRange), CIDR, country, registry and abuse contact.',
  keywords: [
    'ip whois lookup', 'ip whois', 'ipwhois', 'whois ip', 'whois lookup ip', 'who is ip', 'ip who is', 'whois',
    'who is', 'whois lookup', 'free ip whois lookup', 'who owns ip', 'who owns this ip', 'whatismyip', 'what is my ip',
    'ip range', 'netrange', 'ip geolocation', 'ip address lookup', 'ip owner lookup', 'find ip owner', 'isp lookup',
    'ipv6 whois', 'cidr lookup', 'arin whois', 'ripe whois', 'apnic whois', 'rdap lookup', 'ip abuse contact',
  ],
});

// Read from RDAP (rdap.org, which forwards to the issuing registry) and
// RIPEstat for the announcing network, on the date shown under the table.
const WELL_KNOWN = [
  ['8.8.8.8', 'Google Public DNS', 'Google LLC', 'AS15169 Google', '8.8.8.0 – 8.8.8.255', 'ARIN'],
  ['8.8.4.4', 'Google Public DNS (second)', 'Google LLC', 'AS15169 Google', '8.8.4.0 – 8.8.4.255', 'ARIN'],
  ['1.1.1.1', 'Cloudflare DNS', 'APNIC Research and Development', 'AS13335 Cloudflare', '1.1.1.0 – 1.1.1.255', 'APNIC'],
  ['1.0.0.1', 'Cloudflare DNS (second)', 'APNIC Research and Development', 'AS13335 Cloudflare', '1.0.0.0 – 1.0.0.255', 'APNIC'],
  ['9.9.9.9', 'Quad9 DNS', 'Quad9', 'AS19281 Quad9', '9.9.9.0 – 9.9.9.255', 'ARIN'],
  ['208.67.222.222', 'OpenDNS (Cisco Umbrella)', 'Cisco OpenDNS, LLC', 'AS36692 Cisco Umbrella', '208.67.216.0 – 208.67.223.255', 'ARIN'],
  ['4.2.2.2', 'Old Level 3 DNS, still widely used', 'Level 3 Parent, LLC', 'AS3356 Level 3', '4.0.0.0 – 4.127.255.255', 'ARIN'],
  ['94.140.14.14', 'AdGuard DNS', 'AdGuard Software Limited', 'AS212772 AdGuard', '94.140.14.0 – 94.140.15.255', 'RIPE NCC'],
  ['198.41.0.4', 'a.root-servers.net, a DNS root server', 'VeriSign Infrastructure & Operations', 'AS19836 Verisign', '198.41.0.0 – 198.41.3.255', 'ARIN'],
  ['17.253.144.10', 'Apple', 'Apple Inc.', 'AS714 Apple', '17.0.0.0 – 17.255.255.255', 'ARIN'],
  ['31.13.64.35', 'Facebook and Instagram', 'Facebook (Meta)', 'AS32934 Facebook', '31.13.64.0 – 31.13.127.255', 'RIPE NCC'],
  ['140.82.112.3', 'GitHub', 'GitHub, Inc.', 'AS36459 GitHub', '140.82.112.0 – 140.82.127.255', 'ARIN'],
  ['54.239.28.85', 'Amazon (AWS)', 'Amazon Technologies Inc.', 'AS16509 Amazon', '54.224.0.0 – 54.255.255.255', 'ARIN'],
  ['13.107.42.14', 'Microsoft 365', 'Microsoft Corporation', 'AS8068 Microsoft', '13.64.0.0 – 13.107.255.255', 'ARIN'],
  ['104.16.132.229', 'A Cloudflare-hosted website', 'Cloudflare, Inc.', 'AS13335 Cloudflare', '104.16.0.0 – 104.31.255.255', 'ARIN'],
];
const RESERVED = [
  ['192.168.1.1', 'Home router (private network)', '192.168.0.0 – 192.168.255.255, RFC 1918'],
  ['10.0.0.1', 'Private network', '10.0.0.0 – 10.255.255.255, RFC 1918'],
  ['100.64.0.1', 'Carrier-grade NAT inside an ISP', '100.64.0.0 – 100.127.255.255, RFC 6598'],
  ['127.0.0.1', 'Loopback: “this device”', '127.0.0.0 – 127.255.255.255, RFC 1122'],
  ['192.0.2.1', 'Documentation examples only (TEST-NET-1)', '192.0.2.0 – 192.0.2.255, RFC 5737'],
];

const faqs = [
  { q: 'Who owns 8.8.8.8?', a: 'Google LLC. 8.8.8.8 and 8.8.4.4 are Google Public DNS. The registry record at ARIN lists the range 8.8.8.0 – 8.8.8.255 as registered to Google, and it is announced by Google’s own network, AS15169.' },
  { q: 'Who owns 1.1.1.1?', a: 'It is registered to APNIC Research and Development, the research arm of the registry for the Asia-Pacific region, and run by Cloudflare as its public DNS resolver under a research agreement. That is why a WHOIS lookup shows APNIC while the network carrying it is Cloudflare’s AS13335.' },
  { q: 'What does an IP WHOIS lookup show?', a: 'It shows the registration record for the block of addresses an IP belongs to: the organization it is assigned to, the IP range (NetRange) and CIDR, the country it was registered in, the regional registry that issued it, the dates it was registered and last changed, and the contacts, including where to report abuse.' },
  { q: 'How do I find out who owns an IP address?', a: 'Enter any valid IP address in the box and press Look up. The network name and the contacts table show the organization the address is registered to, usually an internet provider, hosting company or large business.' },
  { q: 'Is this IP WHOIS lookup free?', a: 'Yes. It is free with no signup and no limit, and it works for both IPv4 and IPv6 addresses.' },
  { q: 'What is my IP, and can I see its WHOIS?', a: 'The tool looks up your own public IP address as soon as the page opens, so the first result you see is your own WHOIS record: your internet provider, its IP range and the registry that issued it.' },
  { q: 'Does IP WHOIS show who is using the IP right now?', a: 'No. It shows the organization the addresses are registered to. Which of their customers used an address at a given moment is known only to that provider and is not public.' },
  { q: 'Is WHOIS the same as RDAP?', a: 'RDAP is the newer replacement for the old WHOIS protocol. It returns the same registration data in a structured format, over a normal web connection. All five regional registries run RDAP servers, and this tool reads them directly.' },
  { q: 'Is IP WHOIS the same as IP geolocation?', a: 'No. The WHOIS country is where the organization registered the block, often its head office. IP geolocation databases estimate where an address is actually used, which can be a different city or country. Use IP Location for the estimated location.' },
  { q: 'How do I report abuse from an IP address?', a: 'Send your report to the abuse contact shown in the results, with the date, time and time zone of the activity and any logs. The provider can match the time to the customer who used the address.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="IP WHOIS Lookup"
      eyebrow="Free IP WHOIS Lookup · Official registry data"
      h1="IP WHOIS Lookup"
      intro="Enter any valid IP address, IPv4 or IPv6, to see who owns the IP: the organization it is registered to, its IP range (NetRange) and country, the registry that issued it, and the abuse contact. Your own IP is looked up to start."
      bold={['Enter any valid IP address', 'who owns the IP', 'IP range (NetRange)', 'abuse contact']}
      appDescription="Free IP WHOIS lookup (whois IP tool) that reads the RDAP record for an IPv4 or IPv6 address from the regional internet registry (ARIN, RIPE NCC, APNIC, LACNIC or AFRINIC) and shows the network name, IP range (NetRange), CIDR, country, registry, dates and contacts, starting with the visitor's own IP."
      tool={<Tool />}
      faqs={faqs}
      related={['/ip-location', '/asn-lookup', '/ip-blacklist-checker', '/domain-age-checker', '/dns-lookup']}
      updated="2026-11-04"
    >
      <Section title="How to look up who owns an IP">
        <UL items={[
          <><B>Type or paste the address.</B> IPv4 (<Code>203.0.113.7</Code>) and IPv6 (<Code>2001:db8::1</Code>) both work. The tool starts with your own public IP, so it doubles as a “<B>what is my IP</B>” WHOIS check and an <B>IPv6 WHOIS</B> too.</>,
          <><B>Read the network and IP range.</B> Addresses are handed out in blocks, so the record covers a range, shown both as first–last address (the <B>NetRange</B>) and in CIDR form, so it also works as a <B>CIDR lookup</B>.</>,
          <><B>Check the contacts.</B> The table lists the organizations attached to the record and their role: registrant, administrative, technical or abuse. The <B>IP abuse contact</B> is where to report misuse.</>,
        ]} />
        <P>
          Whether you search for <B>IP WHOIS</B>, <B>WHOIS IP</B>, <B>“who is” IP</B> or <B>ipwhois</B>, this <B>free IP WHOIS lookup</B> does the same job: the public registration record for an IP address. It is also an <B>IP owner lookup</B> and <B>ISP lookup</B>, the quickest way to <B>find the IP owner</B> and answer “<B>who owns this IP</B>?”
        </P>
      </Section>

      <Section title="What the WHOIS IP result means">
        <Table head={['Field', 'What it tells you']} rows={[
          ['Network name', 'The registry’s name for the block, often a short code for the owner'],
          ['IP range (NetRange)', 'The first and last address in the block the IP belongs to'],
          ['CIDR', 'The same range in network notation, such as 8.8.8.0/24'],
          ['Country', 'Where the block is registered, usually the owner’s head office'],
          ['Allocation type', 'Whether the block was allocated to a provider or assigned to an end user'],
          ['Registry', 'Which of the five regional internet registries issued it'],
          ['Registered / Last changed', 'When the record was created and last updated'],
          ['Abuse contact', 'Where to report spam, attacks or other misuse from the IP'],
        ]} />
      </Section>

      <Section title="Who hands out IP addresses">
        <P>
          The global pool is managed by IANA, which gives large blocks to five regional internet registries (RIRs). They assign smaller blocks to internet providers, hosting companies and other organizations, and keep the public <B>WHOIS</B> record of who holds each one.
        </P>
        <Table head={['Registry', 'Region it manages']} rows={[
          ['African Network Information Centre (AFRINIC)', 'The African continent'],
          ['American Registry for Internet Numbers (ARIN)', 'The United States, Canada, and many Caribbean and North Atlantic islands'],
          ['Asia-Pacific Network Information Centre (APNIC)', 'Asia, Australia, New Zealand and surrounding countries'],
          ['Latin America and Caribbean Network Information Centre (LACNIC)', 'Latin America and parts of the Caribbean'],
          ['Réseaux IP Européens Network Coordination Centre (RIPE NCC)', 'Europe, the Middle East and Central Asia'],
        ]} />
        <P>
          The tool asks <A href="https://rdap.org/">rdap.org</A>, which forwards the question to whichever registry holds the address, so you always get the authoritative record, whether it is an <B>ARIN WHOIS</B>, <B>RIPE WHOIS</B>, <B>APNIC WHOIS</B>, LACNIC or AFRINIC record.
        </P>
      </Section>

      <Section title="Who owns these well-known IP addresses?">
        <P>
          These are addresses people often see in router settings, server logs and network tools. The owner is the organization named in the official registry record; the network is the one that carries the traffic, which is not always the same, as 1.1.1.1 shows.
        </P>
        <Table head={['IP address', 'What it is', 'Registered to', 'Network (ASN)', 'Range', 'Registry']} rows={WELL_KNOWN} />
        <P>
          Some addresses belong to no one. These ranges are reserved by the Internet Assigned Numbers Authority (IANA), so a WHOIS lookup returns IANA or no record at all, and the same addresses are reused on millions of private networks:
        </P>
        <Table head={['IP address', 'What it is', 'Reserved range']} rows={RESERVED} />
        <P>
          Records checked on 4 November 2026 from RDAP and <A href="https://stat.ripe.net/">RIPEstat</A>. Large networks are re-registered and re-routed from time to time, so look an address up in the tool above for its current record. To see every range a network such as AS15169 announces, use the <A href="/asn-lookup">ASN lookup</A>.
        </P>
      </Section>

      <Section title="WHOIS lookup vs IP geolocation">
        <P>
          A <B>WHOIS lookup</B> tells you who an address is <B>registered</B> to. <B>IP geolocation</B> estimates where it is <B>used</B>. A large provider may register all its blocks at its head office in one city while customers use them across the country, so the two can differ. Use both together: WHOIS for ownership and abuse reports, <A href="/ip-location">IP Location</A> for the likely city and region.
        </P>
      </Section>

      <Section title="What WHOIS can and cannot tell you">
        <P>
          A WHOIS record is about the <B>block</B>, not a person. For a home or mobile connection it names the internet provider; for a server it names the hosting company or, sometimes, the business that rents a large block. It never shows a customer&rsquo;s name or street address.
        </P>
        <P>
          To see the network an address is routed through, use the <A href="/asn-lookup">ASN lookup</A>; to check whether it is listed for sending spam, use the <A href="/ip-blacklist-checker">IP blacklist checker</A>; and for a domain name’s registration date, use the <A href="/domain-age-checker">domain age checker</A>.
        </P>
      </Section>
    </ToolPage>
  );
}
