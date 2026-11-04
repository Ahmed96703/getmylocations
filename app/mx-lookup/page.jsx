import ToolPage, { toolMetadata, Section, P, UL, OL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/mx-lookup';
export const metadata = toolMetadata({
  path,
  title: 'MX Lookup: Find Any Domain’s Mail Servers & Provider',
  description: 'Look up the MX records of any domain or email address: mail servers in priority order, their IP addresses, and which email provider the domain uses. Free.',
  keywords: ['mx lookup', 'mx record lookup', 'check mx records', 'mail server lookup', 'email provider lookup', 'mx record checker'],
});

const faqs = [
  { q: 'What is an MX record?', a: 'A mail exchanger record tells other mail servers where to deliver email for a domain. Each one names a server and a priority number; senders try the lowest number first.' },
  { q: 'How do I find out who hosts a domain’s email?', a: 'Look up its MX records. The server names give it away: aspmx.l.google.com means Google Workspace, *.mail.protection.outlook.com means Microsoft 365. The tool names the provider for you.' },
  { q: 'What happens if a domain has no MX record?', a: 'Sending servers fall back to the domain’s A record and try to deliver there. In practice, a domain without MX records usually cannot receive email.' },
  { q: 'How long do MX changes take?', a: 'As long as the TTL on the old records, often an hour, sometimes a day. Lower the TTL a day before switching providers so the change spreads quickly.' },
  { q: 'Can an MX record point to an IP address?', a: 'No. RFC 5321 requires an MX record to name a host, and that host needs its own A or AAAA record. An MX record that contains an IP address, or points to a CNAME, breaks delivery from some senders.' },
  { q: 'Why does the tool show a different provider than I expected?', a: 'The first MX server may belong to a security gateway such as Mimecast or Proofpoint, which filters mail and then passes it on to the real mailbox provider. The MX record only shows the first stop.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="MX Lookup"
      eyebrow="Free Tool · Live DNS"
      h1="MX lookup"
      accent="where does this domain’s email go?"
      intro="Enter a domain or an email address to see its mail servers in priority order, the IP address of each one, and which email provider it uses."
      bold={['mail servers in priority order', 'which email provider it uses']}
      appDescription="Free MX record lookup that lists a domain's mail exchangers in priority order with their IPv4 and IPv6 addresses, detects the email provider and recognises null MX records."
      tool={<Tool />}
      faqs={faqs}
      related={['/dmarc-checker', '/email-validator']}
      updated="2026-11-04"
      features={['MX records in priority order', 'IPv4 and IPv6 address of each mail server', 'Detects 16 email providers and gateways', 'Accepts a domain or an email address', 'Recognises null MX (domain takes no mail)', 'Live DNS over HTTPS']}
    >
      <Section title="What is an MX lookup?">
        <P>
          An MX lookup asks the Domain Name System which servers receive email for a domain. MX stands for &ldquo;mail exchanger&rdquo;. Every domain that accepts email publishes one or more MX records, and every mail server in the world reads them before delivering a message. Looking them up tells you who hosts a domain&rsquo;s email, whether it is set up at all, and which server will be tried first.
        </P>
      </Section>

      <Section title="How email finds its way">
        <OL items={[
          <>You send a message to <Code>anna@example.com</Code>.</>,
          <>Your mail server looks up the MX records of <Code>example.com</Code>.</>,
          <>It connects to the server with the lowest priority number and hands the message over; if that server does not answer, it tries the next.</>,
        ]} />
        <P>So if MX records are wrong or missing, mail bounces or disappears, even though the website works fine.</P>
      </Section>

      <Section title="How to read the result">
        <Table head={['Field', 'What it means']} rows={[
          ['Mail provider', 'The service the server names belong to, such as Google Workspace or Microsoft 365. “Own or unrecognised” means a company’s own server or a smaller host.'],
          ['Priority', 'Lower numbers are tried first. The number itself does not matter, only the order: 1, 5, 10 works the same as 10, 20, 30.'],
          ['Same priority', 'Servers with the same number share the load; senders pick one at random.'],
          ['Mail server', 'The host name the record points to. It must have its own A or AAAA record.'],
          ['IP addresses', 'Where that host name points. Use it to check the server with the blacklist checker.'],
        ]} />
        <P>
          The lookup uses DNS over HTTPS (Cloudflare&rsquo;s public resolver), so it shows what the rest of the internet sees right now, not a cached copy on your computer. You can type a whole email address; the part after the @ is looked up.
        </P>
      </Section>

      <Section title="Common MX setups">
        <UL items={[
          <><B>Google Workspace:</B> <Code>smtp.google.com</Code> (newer setups), or <Code>aspmx.l.google.com</Code> with backups at priority 5 and 10.</>,
          <><B>Microsoft 365:</B> one record such as <Code>example-com.mail.protection.outlook.com</Code>.</>,
          <><B>Forwarding services</B> (Cloudflare Email Routing, ImprovMX): receive mail and forward it to another inbox.</>,
          <><B>Security gateways</B> (Mimecast, Proofpoint, Barracuda): filter mail before it reaches the real mailbox provider.</>,
        ]} />
      </Section>

      <Section title="Why is my email not arriving? MX problems to check">
        <UL items={[
          <><B>No MX records:</B> the domain was never set up for email, or the records were lost when the domain moved to a new DNS host. Copy them from your email provider&rsquo;s setup page.</>,
          <><B>Old provider still listed:</B> after switching, records for both providers send part of the mail to the old one. Remove the old records.</>,
          <><B>Server name with no IP address:</B> the IP column shows &ldquo;&mdash;&rdquo;. The host name in the record is misspelled or no longer exists.</>,
          <><B>Null MX:</B> a single record of &ldquo;.&rdquo; means the domain refuses all email (<A href="https://www.rfc-editor.org/rfc/rfc7505">RFC 7505</A>). Fine for a domain that never receives mail, wrong for one that should.</>,
          <><B>Recent change:</B> other servers keep the old records until their TTL runs out, usually an hour, at most a day or two.</>,
        ]} />
        <P>
          MX records only cover receiving. To make sure your own mail is trusted, also check SPF and DMARC with the <A href="/dmarc-checker">DMARC checker</A>, whether your server&rsquo;s IP is on a spam list with the <A href="/ip-blacklist-checker">blacklist checker</A>, and whether a single address can receive mail with the <A href="/email-validator">email validator</A>. For any other record type, use the <A href="/dns-lookup">DNS lookup</A>.
        </P>
      </Section>
    </ToolPage>
  );
}
