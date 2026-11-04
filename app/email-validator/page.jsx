import ToolPage, { toolMetadata, Section, P, UL, OL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';
import { DISPOSABLE, ROLES, TYPOS, syntax } from './rules.js';

// Each verdict below is computed at build time by the same check the tool runs.
const EXAMPLES = [
  ['anna.smith@example.com', 'Ordinary address'],
  ['anna+news@example.com', 'Plus addressing, used to sort or filter mail'],
  ["o'brien@example.com", 'Apostrophes and many other symbols are allowed'],
  ['anna..smith@example.com', 'Two dots in a row'],
  ['.anna@example.com', 'Starts with a dot'],
  ['anna smith@example.com', 'Contains a space'],
  ['anna@example', 'No top-level domain such as .com'],
  ['anna@-example.com', 'Domain starts with a hyphen'],
  ['anna@@example.com', 'Two @ signs'],
  [`${'a'.repeat(65)}@example.com`, 'Name part is 65 characters, over the 64 limit'],
].map(([email, note]) => [email.length > 40 ? `${email.slice(0, 12)}…${email.slice(-14)}` : email, syntax(email) ? 'Invalid' : 'Valid', note]);
const typoRows = Object.entries(TYPOS).map(([bad, good]) => [bad, good]);

const path = '/email-validator';
export const metadata = toolMetadata({
  path,
  title: 'Email Validator: Check If an Email Address Is Valid (Free)',
  description: 'Check an email address for typos, a valid format, a real domain and working mail servers, and spot throwaway and role addresses. Free, instant, no signup.',
  keywords: ['email validator', 'validate email address', 'email checker', 'check if email is valid', 'email address verification', 'email syntax check'],
});

const faqs = [
  { q: 'What makes an email address invalid?', a: 'A missing or extra @, a space, two dots in a row, a dot at the start or end of the name, a domain without a top-level part such as .com, a name longer than 64 characters or an address longer than 254. An address can also have a perfect format and still be useless if its domain does not exist or has no mail servers.' },
  { q: 'Is an address with a plus sign valid?', a: 'Yes. anna+news@gmail.com is a valid address, and Gmail, Outlook, iCloud and many other providers deliver it to anna@. People use the part after the plus to sort mail or see who shared their address, so forms should not reject it.' },
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
      bold={['email address', 'catch common typos', 'has mail servers']}
      appDescription="Free email address validator that checks syntax against the RFC rules, suggests corrections for common domain typos, verifies the domain and its MX records, and flags disposable and role-based addresses."
      tool={<Tool />}
      faqs={faqs}
      related={['/mx-lookup', '/dmarc-checker']}
      updated="2026-11-04"
      features={['Format check against the RFC 5321 and 5322 rules', `Catches ${typoRows.length} common domain typos`, 'Checks the domain exists in DNS', 'Checks for mail servers (MX) and null MX', `Flags ${DISPOSABLE.size} throwaway inbox services`, `Flags ${ROLES.size} role names such as info@ and support@`]}
    >
      <Section title="What is an email validator?">
        <P>
          An email validator checks whether an email address could receive mail before you send anything to it. It tests the address in layers: is it written correctly, is the domain a real one, and has that domain published mail servers. Each layer catches a different kind of bad address, from a mistyped <Code>gmial.com</Code> to a company domain that expired years ago.
        </P>
      </Section>

      <Section title="What the validator checks">
        <UL items={[
          <><B>Format:</B> one @, a name of up to 64 allowed characters, and a real-looking domain. <Code>anna..b@x.com</Code> or <Code>anna@x</Code> fail.</>,
          <><B>Typos:</B> slips such as <Code>gmial.com</Code> or <Code>hotmail.co</Code> are caught with a suggested fix.</>,
          <><B>Domain:</B> the domain must exist in DNS.</>,
          <><B>Mail servers:</B> the domain needs MX records; a “null MX” says it never takes mail.</>,
          <><B>Throwaway and role addresses</B> are flagged so you can decide whether to accept them.</>,
        ]} />
      </Section>

      <Section title="What the results mean">
        <Table head={['Result', 'When you see it', 'What to do']} rows={[
          ['Valid', 'Correct format, the domain exists and it has mail servers', 'Safe to use'],
          ['Risky', 'A throwaway inbox service, or a domain with a website but no MX record', 'Accept with care, or ask for another address'],
          ['Invalid', 'Bad format, a known typo, a domain that does not exist, no mail servers or a null MX', 'Ask the person to check and retype it'],
        ]} />
        <P>A role address such as <Code>support@</Code> is flagged but not marked risky: it is a working inbox, just usually a shared one.</P>
      </Section>

      <Section title="Valid and invalid email address examples">
        <P>Every verdict in this table comes from the same format check the tool runs:</P>
        <Table head={['Address', 'Format', 'Why']} rows={EXAMPLES} />
        <P>
          The rules come from <A href="https://www.rfc-editor.org/rfc/rfc5321">RFC 5321</A> and <A href="https://www.rfc-editor.org/rfc/rfc5322">RFC 5322</A>. The standards also allow rare forms such as quoted names with spaces (<Code>&quot;anna smith&quot;@example.com</Code>), but almost no real mailbox uses them and many websites reject them, so the tool treats them as invalid.
        </P>
      </Section>

      <Section title="Typos the validator catches">
        <P>A misspelled domain is the most common reason a real person&rsquo;s address bounces. These are the slips the tool recognizes, each with its suggested fix:</P>
        <Table head={['Typed', 'Suggested fix']} rows={typoRows} />
      </Section>

      <Section title="Why no tool can prove a mailbox exists">
        <P>
          Some services claim to confirm that a mailbox is real by connecting to the mail server and asking whether it would accept a message, then hanging up before sending. That check is unreliable. Many domains are &ldquo;catch-all&rdquo; and say yes to every name; large providers often accept first and bounce later; some servers delay unknown senders on purpose; and repeated probing looks like a spammer harvesting addresses, which can get the checking server&rsquo;s IP blacklisted. This tool stops at what public DNS can prove. The only certain test is a message the person has to act on.
        </P>
      </Section>

      <Section title="How to validate email addresses in a sign-up form">
        <OL items={[
          <><B>Check the format</B> as the person types, with a clear message instead of a silent rejection.</>,
          <><B>Suggest a fix for typos</B> such as <Code>gmial.com</Code>, but let the person keep what they typed: some unusual domains are real.</>,
          <><B>Look up the domain&rsquo;s MX records</B> on your server before saving the address.</>,
          <><B>Send a confirmation link</B> and only add the address to your list once it is clicked (double opt-in). This proves the inbox exists and that its owner wants your mail.</>,
          <><B>Remove addresses that hard-bounce</B> straight away, so they do not drag down your sender reputation.</>,
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
