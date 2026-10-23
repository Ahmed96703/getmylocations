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

const faqs = [
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
    >
      <Section title="How to look up who owns an IP">
        <UL items={[
          <><B>Type or paste the address.</B> IPv4 (<Code>203.0.113.7</Code>) and IPv6 (<Code>2001:db8::1</Code>) both work. The tool starts with your own public IP, so it doubles as a “what is my IP” WHOIS check.</>,
          <><B>Read the network and IP range.</B> Addresses are handed out in blocks, so the record covers a range, shown both as first–last address (the <B>NetRange</B>) and in CIDR form.</>,
          <><B>Check the contacts.</B> The table lists the organizations attached to the record and their role: registrant, administrative, technical or abuse.</>,
        ]} />
        <P>
          Whether you search for <B>IP WHOIS</B>, <B>WHOIS IP</B>, <B>“who is” IP</B> or <B>ipwhois</B>, it is the same lookup: the public registration record for an IP address.
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
          The tool asks <A href="https://rdap.org/">rdap.org</A>, which forwards the question to whichever registry holds the address, so you always get the authoritative record, whether it is an ARIN, RIPE, APNIC, LACNIC or AFRINIC WHOIS.
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
