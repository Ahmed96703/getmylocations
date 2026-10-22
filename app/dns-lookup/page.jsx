import ToolPage, { toolMetadata, Section, P, UL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/dns-lookup';
export const metadata = toolMetadata({
  path,
  title: 'DNS Lookup: Check A, AAAA, CNAME, TXT & All DNS Records',
  description: 'Look up any domain’s DNS records: A, AAAA, CNAME, MX, NS, TXT, SOA, CAA and reverse (PTR), and compare Cloudflare and Google DNS to check propagation.',
  keywords: ['dns lookup', 'dns checker', 'check dns records', 'dns record lookup', 'txt record lookup', 'cname lookup', 'reverse dns lookup', 'dns propagation check'],
});

const faqs = [
  { q: 'What is a DNS lookup?', a: 'It asks the domain name system for the records stored for a name, such as the IP address of a website (A and AAAA), where its email goes (MX) or which servers hold its records (NS). Browsers do this every time you open a site.' },
  { q: 'How do I check if my DNS change has propagated?', a: 'Tick “Compare Cloudflare and Google DNS” and look up the record. If both show the new value, most of the internet sees it. If they differ, one still has the old answer cached; it updates when the TTL shown runs out.' },
  { q: 'What is a reverse DNS (PTR) lookup?', a: 'It finds the name registered for an IP address, the opposite of a normal lookup. Type an IP address and the tool asks for its PTR record. Mail servers check this to make sure a sending server is who it says it is.' },
  { q: 'What does TTL mean?', a: 'Time to live: how long resolvers may keep a record in their cache before asking again. A one-hour TTL means a change can take up to an hour to reach everyone.' },
  { q: 'Why does a record show “No A record”?', a: 'The domain exists but has no record of that type. Many domains have no AAAA (IPv6) record, and the bare domain often has no CNAME. NXDOMAIN, on the other hand, means the name does not exist at all.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="DNS Lookup"
      eyebrow="Free Tool · Live DNS over HTTPS"
      h1="DNS lookup"
      accent="see any domain’s records"
      intro="Enter a domain to see its A, AAAA, CNAME, MX, NS, TXT, SOA and CAA records at once, or pick one type. Enter an IP address for a reverse (PTR) lookup, and compare Cloudflare and Google DNS to check whether a change has spread."
      appDescription="Free DNS lookup tool that queries A, AAAA, CNAME, MX, NS, TXT, SOA, CAA, SRV and PTR records over DNS-over-HTTPS, with TTLs and a Cloudflare versus Google comparison for propagation checks."
      tool={<Tool />}
      faqs={faqs}
      related={['/mx-lookup', '/ns-lookup']}
    >
      <Section title="DNS record types">
        <Table head={['Type', 'What it holds', 'Example']} rows={[
          ['A', 'IPv4 address of the name', <Code>203.0.113.10</Code>],
          ['AAAA', 'IPv6 address', <Code>2001:db8::10</Code>],
          ['CNAME', 'An alias: “look up this other name instead”', <Code>www → example.com</Code>],
          ['MX', 'Mail servers, with a priority', <Code>10 mx1.example.com</Code>],
          ['NS', 'Name servers that hold the domain’s records', <Code>ns1.example.net</Code>],
          ['TXT', 'Text: SPF, DMARC, site verification codes', <Code>v=spf1 include:… ~all</Code>],
          ['SOA', 'Zone details: primary server, serial number, timers', '—'],
          ['CAA', 'Which certificate authorities may issue SSL certificates', <Code>0 issue "letsencrypt.org"</Code>],
          ['PTR', 'Name for an IP address (reverse DNS)', <Code>dns.google</Code>],
        ]} />
      </Section>

      <Section title="When to use a DNS lookup">
        <UL items={[
          <><B>After moving a site or changing hosts:</B> check the A and AAAA records point to the new server.</>,
          <><B>Email not arriving:</B> check the MX records, then SPF and DMARC with the <A href="/dmarc-checker">DMARC checker</A>.</>,
          <><B>Domain verification:</B> confirm the TXT record that Google, Microsoft or another service asked you to add is live.</>,
          <><B>SSL certificate errors:</B> check CAA records allow your certificate authority.</>,
        ]} />
        <P>
          The tool asks Cloudflare&rsquo;s public resolver (1.1.1.1) and, when comparing, Google&rsquo;s (8.8.8.8), using encrypted DNS over HTTPS. Results are live, not from a stored copy. For mail servers only, see <A href="/mx-lookup">MX lookup</A>; for name servers, <A href="/ns-lookup">NS lookup</A>.
        </P>
      </Section>
    </ToolPage>
  );
}
