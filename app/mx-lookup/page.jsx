import ToolPage, { toolMetadata, Section, P, UL, OL, B, A, Code } from '../components/ToolPage.jsx';
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
      appDescription="Free MX record lookup that lists a domain's mail exchangers in priority order with their IPv4 and IPv6 addresses, detects the email provider and recognises null MX records."
      tool={<Tool />}
      faqs={faqs}
      related={['/dmarc-checker', '/email-validator']}
    >
      <Section title="How email finds its way">
        <OL items={[
          <>You send a message to <Code>anna@example.com</Code>.</>,
          <>Your mail server looks up the MX records of <Code>example.com</Code>.</>,
          <>It connects to the server with the lowest priority number and hands the message over; if that server does not answer, it tries the next.</>,
        ]} />
        <P>So if MX records are wrong or missing, mail bounces or disappears, even though the website works fine.</P>
      </Section>

      <Section title="Common MX setups">
        <UL items={[
          <><B>Google Workspace:</B> <Code>smtp.google.com</Code> (newer setups), or <Code>aspmx.l.google.com</Code> with backups at priority 5 and 10.</>,
          <><B>Microsoft 365:</B> one record such as <Code>example-com.mail.protection.outlook.com</Code>.</>,
          <><B>Forwarding services</B> (Cloudflare Email Routing, ImprovMX): receive mail and forward it to another inbox.</>,
          <><B>Security gateways</B> (Mimecast, Proofpoint, Barracuda): filter mail before it reaches the real mailbox provider.</>,
        ]} />
        <P>
          MX records only cover receiving. To make sure your own mail is trusted, also check SPF and DMARC with the <A href="/dmarc-checker">DMARC checker</A>, and whether your server&rsquo;s IP is on a spam list with the <A href="/ip-blacklist-checker">blacklist checker</A>.
        </P>
      </Section>
    </ToolPage>
  );
}
