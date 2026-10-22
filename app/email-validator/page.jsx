import ToolPage, { toolMetadata, Section, P, UL, B, A, Code } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/email-validator';
export const metadata = toolMetadata({
  path,
  title: 'Email Validator: Check If an Email Address Is Valid (Free)',
  description: 'Check an email address for typos, a valid format, a real domain and working mail servers, and spot throwaway and role addresses. Free, instant, no signup.',
  keywords: ['email validator', 'validate email address', 'email checker', 'check if email is valid', 'email address verification', 'email syntax check'],
});

const faqs = [
  { q: 'Can this tell me if a mailbox exists?', a: 'No tool can say that for certain without sending a message. Mail servers deliberately hide whether a mailbox exists, and probing them is treated as spam. This tool checks everything that can be checked publicly: format, typos, the domain and its mail servers.' },
  { q: 'Why is an address “risky”?', a: 'It is valid but may not reach a real, lasting inbox: a throwaway service such as Mailinator, or a domain with no mail server records.' },
  { q: 'What is a role address?', a: 'An address for a job or team rather than a person, such as info@ or support@. Mail to it is fine, but it is usually read by several people and often filtered more strictly by newsletter services.' },
  { q: 'Is the address I type stored?', a: 'No. The check runs in your browser; only the domain is looked up in public DNS. The address itself is not sent to this site.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="Email Validator"
      eyebrow="Free Tool · Format, domain & mail servers"
      h1="Email validator"
      accent="is this address real?"
      intro="Type an email address to check its format, catch common typos such as gmial.com, confirm the domain exists and has mail servers, and spot throwaway and role addresses."
      appDescription="Free email address validator that checks syntax against the RFC rules, suggests corrections for common domain typos, verifies the domain and its MX records, and flags disposable and role-based addresses."
      tool={<Tool />}
      faqs={faqs}
      related={['/mx-lookup', '/dmarc-checker']}
    >
      <Section title="What the validator checks">
        <UL items={[
          <><B>Format:</B> one @, a name of up to 64 allowed characters, and a real-looking domain. <Code>anna..b@x.com</Code> or <Code>anna@x</Code> fail.</>,
          <><B>Typos:</B> slips such as <Code>gmial.com</Code> or <Code>hotmail.co</Code> are caught with a suggested fix.</>,
          <><B>Domain:</B> the domain must exist in DNS.</>,
          <><B>Mail servers:</B> the domain needs MX records; a “null MX” says it never takes mail.</>,
          <><B>Throwaway and role addresses</B> are flagged so you can decide whether to accept them.</>,
        ]} />
      </Section>

      <Section title="When to validate addresses">
        <P>
          Checking addresses before you save them keeps a mailing list clean: bounces from invalid addresses hurt your sender reputation, and enough of them can get your mail sent to spam. The most common real-world problem is a simple typo in the domain, which this check catches.
        </P>
        <P>To see which provider handles a domain&rsquo;s email, use the <A href="/mx-lookup">MX lookup</A>; to check your own domain is set up to send, the <A href="/dmarc-checker">DMARC checker</A>.</P>
      </Section>
    </ToolPage>
  );
}
