import ToolPage, { toolMetadata, Section, P, UL, OL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/dmarc-checker';
export const metadata = toolMetadata({
  path,
  title: 'DMARC Checker: Validate DMARC, SPF & DKIM Records (Free)',
  description: 'Check a domain’s DMARC policy, SPF record and DKIM key in one step: every tag explained, the SPF 10-lookup limit counted, and clear fixes for each problem.',
  keywords: ['dmarc checker', 'dmarc validation', 'dmarc record check', 'spf checker', 'dkim checker', 'check dmarc record', 'email authentication check'],
});

const faqs = [
  { q: 'What is DMARC?', a: 'DMARC is a DNS record at _dmarc.yourdomain that tells receiving mail servers what to do with messages that claim to come from your domain but fail SPF and DKIM checks: deliver them (none), send them to spam (quarantine) or refuse them (reject). It also asks receivers to send you reports.' },
  { q: 'Do I need DMARC?', a: 'Yes, if you send email from your domain. Since 2024 Gmail and Yahoo require bulk senders to publish DMARC, and a missing record makes your mail more likely to land in spam and your domain easier to spoof.' },
  { q: 'What DMARC policy should I use?', a: 'Start with p=none and an rua address to collect reports, fix any legitimate senders that fail, then move to p=quarantine and finally p=reject.' },
  { q: 'What is the SPF 10 lookup limit?', a: 'SPF may trigger at most 10 DNS lookups through include:, a, mx, ptr, exists and redirect. Each include can contain more lookups. Over 10, SPF fails for every message. The checker follows the includes and counts them.' },
  { q: 'What is a DKIM selector?', a: 'DKIM keys are published at <selector>._domainkey.<domain>. The selector is chosen by your mail provider: “google” for Google Workspace, “selector1” and “selector2” for Microsoft 365. You can find it in the s= part of the DKIM-Signature header of an email you sent.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="DMARC Checker"
      eyebrow="Free Tool · DMARC, SPF & DKIM"
      h1="DMARC checker"
      accent="is your email protected from spoofing?"
      intro="Enter your domain to check its DMARC policy and SPF record, with every tag explained and the SPF lookup limit counted. Add a DKIM selector to check the DKIM key as well."
      appDescription="Free DMARC validation tool that reads and explains a domain's DMARC record, checks the SPF record for errors, the all mechanism and the 10 DNS lookup limit, and checks a DKIM key for a given selector."
      tool={<Tool />}
      faqs={faqs}
      related={['/mx-lookup', '/email-header-analyzer']}
    >
      <Section title="SPF, DKIM and DMARC in one minute">
        <Table head={['Record', 'Where', 'What it proves']} rows={[
          ['SPF', <Code>example.com TXT "v=spf1 …"</Code>, 'Which servers may send mail for the domain'],
          ['DKIM', <Code>selector._domainkey.example.com</Code>, 'The message was signed by the domain and not changed on the way'],
          ['DMARC', <Code>_dmarc.example.com</Code>, 'What to do when SPF and DKIM do not match the From address, and where to send reports'],
        ]} />
      </Section>

      <Section title="A safe way to roll out DMARC">
        <OL items={[
          <>Publish <Code>v=DMARC1; p=none; rua=mailto:dmarc@example.com</Code> and wait two to four weeks for reports.</>,
          <>Use the reports to find every service that sends as your domain (newsletters, invoicing, help desk) and give each SPF and DKIM.</>,
          <>Move to <Code>p=quarantine</Code>, then to <Code>p=reject</Code> once nothing legitimate fails.</>,
        ]} />
      </Section>

      <Section title="Common problems this tool catches">
        <UL items={[
          <><B>Two SPF or two DMARC records:</B> receivers treat it as an error and ignore both.</>,
          <><B>+all</B> in SPF, which lets any server pass.</>,
          <><B>More than 10 SPF lookups</B> after adding many services.</>,
          <><B>p=none left in place for months</B>, which reports spoofing but does not stop it.</>,
        ]} />
        <P>To see where an email really came from and whether it passed these checks, paste its headers into the <A href="/email-header-analyzer">email header analyzer</A>.</P>
      </Section>
    </ToolPage>
  );
}
