import ToolPage, { toolMetadata, Section, P, UL, OL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/ip-blacklist-checker';
export const metadata = toolMetadata({
  path,
  title: 'Blacklist Checker: Free IP & Email Blacklist Check',
  description: 'Free blacklist check for any IP, domain or email address: is my IP blacklisted? See results from 14 spam blacklists at once, the reason, and how to get removed.',
  keywords: [
    'ip blacklist check', 'blacklist checker', 'is my ip blacklisted', 'dnsbl check', 'spam blacklist check', 'email blacklist check', 'rbl check',
    'blacklist check', 'email blacklist', 'is my ip address blacklisted', 'ip blacklist checker', 'email blacklist checker', 'domain blacklist check',
    'mail server blacklist check', 'check if email is blacklisted', 'ip reputation check', 'smtp blacklist check', 'blacklist removal',
    'barracuda blacklist check', 'spamcop blacklist check', 'your ip has been banned', 'what is my ip address',
  ],
});

const faqs = [
  { q: 'Is my IP blacklisted?', a: 'Open this page and your own IP address is checked straight away against 14 spam blacklists. A green result means it is on none of them; a red one names each list and the reason it gives.' },
  { q: 'How do I do an email blacklist check?', a: 'Type your email address or its domain, such as you@example.com or example.com. The checker finds the mail server that handles the domain’s email (its MX record) and checks that server’s IP address against every blacklist, because that is the address other mail servers judge you by.' },
  { q: 'Is this blacklist checker free?', a: 'Yes. It is free with no signup and no limit, for IP addresses, domains and email addresses.' },
  { q: 'What does it mean if my IP is blacklisted?', a: 'A blocklist operator has seen spam, malware or attacks coming from that address, or it belongs to a range that should not send mail directly, such as home connections. Mail servers that use the list may reject or junk email from it.' },
  { q: 'Why is my home IP listed?', a: 'Some lists include whole ranges of home and mobile addresses on purpose, because legitimate mail should leave through a mail provider, not straight from a home connection. It does not mean you did anything wrong, and it does not affect browsing.' },
  { q: 'How do I get my IP removed from a blacklist?', a: 'First fix the cause: an infected device, an open relay, a hacked website form or a compromised mail account. Then follow the removal link on the list’s own site, linked in the results. Many lists remove addresses automatically after a quiet period.' },
  { q: 'Why is Spamhaus not in the list?', a: 'Spamhaus refuses lookups that come through public DNS services, which is how a browser-based checker works, so the result would always be an error. Check Spamhaus directly at check.spamhaus.org.' },
  { q: 'Does a listing affect my website?', a: 'Usually not. DNS blocklists are used mainly by mail servers. Browsers and search engines do not use them to block websites.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="Blacklist Checker"
      eyebrow="Free Blacklist Checker · 14 blacklists at once"
      h1="Blacklist Checker"
      intro="Is my IP blacklisted? Enter an IPv4 address, a domain or an email address for a free blacklist check against 14 widely used spam blacklists, with the reason and a link to each list. For an email blacklist check, the tool tests the mail server that handles the domain’s email. Your own IP is checked to start."
      bold={['Is my IP blacklisted?', 'free blacklist check', '14 widely used spam blacklists', 'email blacklist check']}
      appDescription="Free blacklist checker for IP addresses, domains and email addresses that queries 14 DNS-based spam blocklists (DNSBLs), including Barracuda, SpamCop, UCEPROTECT and PSBL, checking a domain's mail server (MX) for email blacklist checks, and shows the listing reason and removal links."
      tool={<Tool />}
      faqs={faqs}
      related={['/mx-lookup', '/dmarc-checker', '/ip-whois-lookup', '/email-validator', '/email-header-analyzer']}
    >
      <Section title="How to check if your IP or email is blacklisted">
        <UL items={[
          <><B>Your own IP:</B> nothing to type. The page runs an <B>IP blacklist check</B> on your current address as soon as it opens, answering “<B>is my IP address blacklisted?</B>”.</>,
          <><B>Another IP:</B> paste any IPv4 address, such as a mail server or a visitor that sent spam.</>,
          <><B>A domain or email address:</B> type <Code>example.com</Code> or <Code>you@example.com</Code> to <B>check if your email is blacklisted</B>. The tool looks up the domain’s mail server and runs a <B>mail server blacklist check</B> on its IP.</>,
        ]} />
        <P>
          Results arrive list by list in a few seconds. The summary says how many of the 14 lists include the address, and each row links to the list’s own page, where you can read the details and request <B>blacklist removal</B>.
        </P>
      </Section>

      <Section title="Email blacklist: why your emails go to spam">
        <P>
          An <B>email blacklist</B> is a list of IP addresses that mail servers refuse or distrust. When your mail server’s IP is on one, messages you send may bounce with errors like “554 rejected, listed at …” or quietly land in spam. A <B>domain blacklist check</B> and an <B>SMTP blacklist check</B> both come down to the same question: is the IP your email leaves from on a list?
        </P>
        <Table head={['Symptom', 'Likely cause', 'What to check']} rows={[
          ['Bounces mentioning a list name', 'Your sending IP is blacklisted', 'Run the check above, then follow the removal link'],
          ['Mail lands in spam, no bounce', 'Missing SPF, DKIM or DMARC, or poor reputation', 'The DMARC checker and the email header analyzer'],
          ['Only one recipient rejects you', 'That provider’s own filter, not a public list', 'Their bounce message and postmaster pages'],
          ['Listed after a hacked account or form', 'Spam sent through your server', 'Change passwords, fix the form, then request removal'],
        ]} />
      </Section>

      <Section title="How blocklists work">
        <P>
          A DNS blocklist (DNSBL or RBL) is a list of IP addresses published through DNS. When a mail server receives a message, it reverses the sender&rsquo;s IP and asks the list: for <Code>203.0.113.7</Code> on SpamCop it asks for <Code>7.113.0.203.bl.spamcop.net</Code>. An answer such as <Code>127.0.0.2</Code> means listed; &ldquo;no such name&rdquo; means not listed. This <B>blacklist checker</B> asks the same questions, so you see what mail servers see. It is the same <B>DNSBL check</B> or <B>RBL check</B> mail admins run, and a quick <B>IP reputation check</B>.
        </P>
      </Section>

      <Section title="If your IP is listed">
        <OL items={[
          <><B>Read the reason</B> shown in the results and on the list&rsquo;s site. It often names the date and type of problem.</>,
          <><B>Fix the cause.</B> Scan devices for malware, change passwords of mail accounts that may be compromised, close open relays, and protect website forms with a captcha.</>,
          <><B>Check your mail setup.</B> Make sure the server has SPF, DKIM and DMARC records and a matching reverse DNS name. The <A href="/dmarc-checker">DMARC checker</A> helps, and the <A href="/mx-lookup">MX lookup</A> shows which servers receive your mail.</>,
          <><B>Request removal</B> through the list&rsquo;s own page. Some, such as SpamCop and PSBL, expire listings automatically once spam stops.</>,
        ]} />
      </Section>

      <Section title="Which lists matter most">
        <UL items={[
          <><B>Spamhaus</B> is the most widely used. It cannot be checked from a browser tool; use <A href="https://check.spamhaus.org/">check.spamhaus.org</A>.</>,
          <><B>Barracuda</B> and <B>SpamCop</B> are used by many business mail servers, so a <B>Barracuda blacklist check</B> and a <B>SpamCop blacklist check</B> are both included above.</>,
          <><B>UCEPROTECT Level 1</B> lists single addresses; its Levels 2 and 3 list whole networks and are used far less.</>,
        ]} />
        <P>To see who is responsible for an address, use the <A href="/ip-whois-lookup">IP WHOIS lookup</A>.</P>
      </Section>

      <Section title="“Your IP has been banned”: is that a blacklist?">
        <P>
          Usually not. When a website, game or forum says <B>your IP has been banned</B>, that is the site’s own block, kept on its own servers, and it does not appear on the spam blacklists checked here. Common causes are too many failed logins, a shared IP that someone else misused, or a VPN address the site blocks.
        </P>
        <UL items={[
          <><B>Turn off a VPN or proxy</B> and try again from your normal connection.</>,
          <><B>Restart your router.</B> Many home providers give you a new IP address when it reconnects.</>,
          <><B>Contact the site</B> with your IP address (shown at the top of the results) and ask why it was blocked.</>,
        ]} />
        <P>
          If spam blacklists list your IP too, that points to malware or a misused connection: fix that first, then ask the site to lift the ban.
        </P>
      </Section>
    </ToolPage>
  );
}
