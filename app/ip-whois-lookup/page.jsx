import ToolPage, { toolMetadata, Section, P, UL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/ip-whois-lookup';
export const metadata = toolMetadata({
  path,
  title: 'IP WHOIS Lookup: Who Owns This IP Address? (Free)',
  description: 'Find who owns any IPv4 or IPv6 address: network name, address range, country, registry and abuse contact, straight from the official registry.',
  keywords: ['ip whois', 'ip whois lookup', 'who owns this ip', 'ip owner lookup', 'whois ip address', 'rdap lookup', 'ip abuse contact'],
});

const faqs = [
  { q: 'What does an IP WHOIS lookup show?', a: 'It shows the registration record for the block of addresses an IP belongs to: the organization it is assigned to, the address range, the country it was registered in, the regional registry that issued it, the dates it was registered and last changed, and the contacts, including where to report abuse.' },
  { q: 'Does IP WHOIS show who is using the IP right now?', a: 'No. It shows the organization the addresses are registered to, usually an internet provider, hosting company or large business. Which of their customers used an address at a given moment is known only to that provider and is not public.' },
  { q: 'Is WHOIS the same as RDAP?', a: 'RDAP is the newer replacement for the old WHOIS protocol. It returns the same registration data in a structured format, over a normal web connection. All five regional registries run RDAP servers, and this tool reads them directly.' },
  { q: 'Why does the country differ from the IP location?', a: 'The WHOIS country is where the organization registered the block, often its head office. IP location databases estimate where an address is actually used, which can be a different city or country. Use IP Location for the estimated location.' },
  { q: 'How do I report abuse from an IP address?', a: 'Send your report to the abuse contact shown in the results, with the date, time and time zone of the activity and any logs. The provider can match the time to the customer who used the address.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="IP WHOIS Lookup"
      eyebrow="Free Tool · Official registry data"
      h1="IP WHOIS lookup"
      accent="who owns this IP address?"
      intro="Enter any IPv4 or IPv6 address to see the organization it is registered to, its address range and country, the registry that issued it, and the abuse contact. Your own IP is looked up to start."
      appDescription="Free IP WHOIS lookup that reads the RDAP record for an IPv4 or IPv6 address from the regional internet registry and shows the network name, address range, CIDR, country, registry, dates and contacts."
      tool={<Tool />}
      faqs={faqs}
      related={['/asn-lookup', '/ip-blacklist-checker']}
    >
      <Section title="How to look up who owns an IP">
        <UL items={[
          <><B>Type or paste the address.</B> IPv4 (<Code>203.0.113.7</Code>) and IPv6 (<Code>2001:db8::1</Code>) both work. The tool starts with your own public IP.</>,
          <><B>Read the network and range.</B> Addresses are handed out in blocks, so the record covers a range, shown both as first–last address and in CIDR form.</>,
          <><B>Check the contacts.</B> The table lists the organizations attached to the record and their role: registrant, administrative, technical or abuse.</>,
        ]} />
      </Section>

      <Section title="Who hands out IP addresses">
        <P>
          The global pool is managed by IANA, which gives large blocks to five regional internet registries (RIRs). They assign smaller blocks to internet providers, hosting companies and other organizations, and keep the public record of who holds each one.
        </P>
        <Table head={['Registry', 'Region']} rows={[
          ['ARIN', 'United States, Canada, parts of the Caribbean'],
          ['RIPE NCC', 'Europe, the Middle East and Central Asia'],
          ['APNIC', 'Asia and the Pacific, including Australia and New Zealand'],
          ['LACNIC', 'Latin America and the Caribbean'],
          ['AFRINIC', 'Africa'],
        ]} />
        <P>
          The tool asks <A href="https://rdap.org/">rdap.org</A>, which forwards the question to whichever registry holds the address, so you always get the authoritative record.
        </P>
      </Section>

      <Section title="What WHOIS can and cannot tell you">
        <P>
          A WHOIS record is about the <B>block</B>, not a person. For a home or mobile connection it names the internet provider; for a server it names the hosting company or, sometimes, the business that rents a large block. It never shows a customer&rsquo;s name or street address.
        </P>
        <P>
          To estimate where an address is used, see <A href="/ip-location">IP Location</A>; to see the network an address is routed through, use the <A href="/asn-lookup">ASN lookup</A>; and to check whether it is listed for sending spam, use the <A href="/ip-blacklist-checker">IP blacklist checker</A>.
        </P>
      </Section>
    </ToolPage>
  );
}
