import ToolPage, { toolMetadata, Section, P, UL, B, A, Code } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/ns-lookup';
export const metadata = toolMetadata({
  path,
  title: 'NS Lookup: Find Any Domain’s Name Servers & DNS Host',
  description: 'Look up the name servers (NS records) of any domain, their IP addresses, the SOA serial, and which company hosts the domain’s DNS. Free, live results.',
  keywords: ['ns lookup', 'nslookup online', 'name server lookup', 'check nameservers', 'ns record lookup', 'who hosts my dns', 'dns host lookup'],
});

const faqs = [
  { q: 'What is a name server?', a: 'A name server holds a domain’s DNS records and answers questions about them, such as “what is the IP address of www.example.com?”. The NS records list which servers do this for a domain.' },
  { q: 'How do I find who hosts my DNS?', a: 'Look up your domain here. The name server names usually reveal the host: *.ns.cloudflare.com is Cloudflare, ns-*.awsdns-* is Amazon Route 53, ns*.domaincontrol.com is GoDaddy.' },
  { q: 'How long does a name server change take?', a: 'Changing name servers is done at your registrar and updates the parent zone (such as .com). It usually shows within an hour, but resolvers may keep the old servers cached for up to two days.' },
  { q: 'Is this the same as the nslookup command?', a: 'It answers the same question as running nslookup -type=NS example.com, without needing a terminal, and it also finds each server’s addresses and the SOA details.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="NS Lookup"
      eyebrow="Free Tool · Live DNS"
      h1="NS lookup"
      accent="who hosts this domain’s DNS?"
      intro="Enter a domain to see its name servers, their IPv4 and IPv6 addresses, the zone’s primary server and serial number, and which company hosts the DNS."
      bold={['name servers', 'which company hosts the DNS']}
      appDescription="Free online NS lookup that lists a domain's name servers with their IP addresses, reads the SOA record (primary server, serial, admin contact) and identifies the DNS hosting provider."
      tool={<Tool />}
      faqs={faqs}
      related={['/dns-lookup', '/domain-age-checker']}
    >
      <Section title="Why name servers matter">
        <P>
          Every DNS lookup for your domain ends at your name servers. If they are wrong, slow or down, your website and email stop working for everyone, even though the servers behind them are fine. That is why domains list at least two, ideally on different networks.
        </P>
        <UL items={[
          <><B>Moving to a new host</B> such as Cloudflare: check the new name servers are live before deleting the old zone.</>,
          <><B>Site not loading after a change:</B> confirm the registrar shows the same name servers as the lookup.</>,
          <><B>Zone serial</B> (from the SOA record): many hosts raise it on every edit, so it shows whether your change reached the servers.</>,
        ]} />
      </Section>

      <Section title="Reading the SOA record">
        <P>
          The start of authority record names the zone&rsquo;s primary server and an admin contact written as a name, with the first dot standing for @ (<Code>hostmaster.example.com</Code> means <Code>hostmaster@example.com</Code>). It also carries the serial number and timers secondary servers use to stay in sync.
        </P>
        <P>For every record type at once, use the full <A href="/dns-lookup">DNS lookup</A>; for mail servers, <A href="/mx-lookup">MX lookup</A>.</P>
      </Section>
    </ToolPage>
  );
}
