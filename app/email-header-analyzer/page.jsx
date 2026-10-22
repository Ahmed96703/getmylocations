import ToolPage, { toolMetadata, Section, P, UL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/email-header-analyzer';
export const metadata = toolMetadata({
  path,
  title: 'Email Header Analyzer: Trace Where an Email Came From',
  description: 'Paste email headers to see the sender’s IP, every server the message passed through and the delays, and whether SPF, DKIM and DMARC passed. Private, in your browser.',
  keywords: ['email header analyzer', 'analyze email headers', 'email header checker', 'trace email', 'find sender ip from email', 'email headers explained'],
});

const faqs = [
  { q: 'How do I see the full headers of an email?', a: 'Gmail: open the message, click ⋮ and choose “Show original”. Outlook on the web: … › View › View message source. Outlook desktop: File › Properties, then copy “Internet headers”. Apple Mail: View › Message › All Headers. Yahoo: … › View raw message.' },
  { q: 'Can I find the sender’s location from the headers?', a: 'The headers show the IP address of the first public server the message passed through. For mail sent through Gmail, Outlook.com or other big providers, that is the provider’s server, not the sender’s computer, so it does not reveal where the person is.' },
  { q: 'How do I tell if an email is phishing?', a: 'Look for SPF, DKIM or DMARC failures, a From domain that does not match the Return-Path or Reply-To, and a first server that has nothing to do with the claimed sender. Any one of these is a warning sign, not proof.' },
  { q: 'Are my headers uploaded anywhere?', a: 'No. The analyzer runs entirely in your browser; nothing you paste leaves your device.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="Email Header Analyzer"
      eyebrow="Free Tool · Runs in your browser"
      h1="Email header analyzer"
      accent="where did this email really come from?"
      intro="Paste an email’s full headers to see the IP address it was sent from, every server it passed through with the delay at each step, and whether it passed SPF, DKIM and DMARC. Nothing you paste leaves your browser."
      appDescription="Free, private email header analyzer that parses Received headers into a delivery path with delays, finds the originating IP, and summarises SPF, DKIM and DMARC results and key headers, entirely in the browser."
      tool={<Tool />}
      faqs={faqs}
      related={['/dmarc-checker', '/ip-blacklist-checker']}
    >
      <Section title="Reading the Received lines">
        <P>
          Each server that handles a message adds a <Code>Received:</Code> line at the top, so the newest is first and the oldest last. The analyzer reverses them to show the path in order, from the sending server to your inbox.
        </P>
        <Table head={['Part', 'Meaning']} rows={[
          ['from mail-sor-f41.google.com [209.85.220.41]', 'The server that handed the message over, and its IP'],
          ['by mx.example.com', 'The server that received it'],
          ['with ESMTPS', 'The protocol; an S at the end means the hop was encrypted'],
          ['; Tue, 21 Oct 2026 09:14:07 -0700', 'When it was received, used to calculate delays'],
        ]} />
      </Section>

      <Section title="Key headers to check">
        <UL items={[
          <><B>Authentication-Results:</B> what your provider found when checking SPF, DKIM and DMARC.</>,
          <><B>Return-Path:</B> where bounces go; it should belong to the sender or their mail service.</>,
          <><B>Reply-To:</B> where your reply would go. A Reply-To at a different domain is a classic phishing trick.</>,
          <><B>Message-ID:</B> usually shows which system created the message.</>,
        ]} />
        <P>
          Found a suspicious IP? Check it with the <A href="/ip-blacklist-checker">blacklist checker</A>, see who owns it with the <A href="/ip-whois-lookup">IP WHOIS lookup</A>, or estimate its location with <A href="/ip-location">IP Location</A>.
        </P>
      </Section>
    </ToolPage>
  );
}
