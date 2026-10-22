import ToolPage, { toolMetadata, Section, P, UL, OL, B, A, Code } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/ip-blacklist-checker';
export const metadata = toolMetadata({
  path,
  title: 'IP Blacklist Checker: Is My IP on a Spam Blocklist?',
  description: 'Check an IP address or mail server against 14 spam blocklists (DNSBLs) at once, see why it is listed, and find out how to get it removed. Free.',
  keywords: ['ip blacklist check', 'blacklist checker', 'is my ip blacklisted', 'dnsbl check', 'spam blacklist check', 'email blacklist check', 'rbl check'],
});

const faqs = [
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
      name="IP Blacklist Checker"
      eyebrow="Free Tool · 14 blocklists at once"
      h1="IP blacklist checker"
      accent="is this IP on a spam list?"
      intro="Enter an IPv4 address, or a domain to check its server, and see within seconds whether it is listed on 14 widely used spam blocklists, with the reason and a link to each list. Your own IP is checked to start."
      appDescription="Free IP blacklist checker that queries 14 DNS-based spam blocklists (DNSBLs), including Barracuda, SpamCop, UCEPROTECT and PSBL, for an IPv4 address or a domain's server, and shows the listing reason and removal links."
      tool={<Tool />}
      faqs={faqs}
      related={['/mx-lookup', '/dmarc-checker']}
    >
      <Section title="How blocklists work">
        <P>
          A DNS blocklist (DNSBL or RBL) is a list of IP addresses published through DNS. When a mail server receives a message, it reverses the sender&rsquo;s IP and asks the list: for <Code>203.0.113.7</Code> on SpamCop it asks for <Code>7.113.0.203.bl.spamcop.net</Code>. An answer such as <Code>127.0.0.2</Code> means listed; &ldquo;no such name&rdquo; means not listed. This tool asks the same questions, so you see what mail servers see.
        </P>
      </Section>

      <Section title="If your IP is listed">
        <OL items={[
          <><B>Read the reason</B> shown in the results and on the list&rsquo;s site. It often names the date and type of problem.</>,
          <><B>Fix the cause.</B> Scan devices for malware, change passwords of mail accounts that may be compromised, close open relays, and protect website forms with a captcha.</>,
          <><B>Check your mail setup.</B> Make sure the server has SPF, DKIM and DMARC records and a matching reverse DNS name. The <A href="/dmarc-checker">DMARC checker</A> helps.</>,
          <><B>Request removal</B> through the list&rsquo;s own page. Some, such as SpamCop and PSBL, expire listings automatically once spam stops.</>,
        ]} />
      </Section>

      <Section title="Which lists matter most">
        <UL items={[
          <><B>Spamhaus</B> is the most widely used. It cannot be checked from a browser tool; use <A href="https://check.spamhaus.org/">check.spamhaus.org</A>.</>,
          <><B>Barracuda</B> and <B>SpamCop</B> are used by many business mail servers.</>,
          <><B>UCEPROTECT Level 1</B> lists single addresses; its Levels 2 and 3 list whole networks and are used far less.</>,
        ]} />
        <P>To see who is responsible for an address, use the <A href="/ip-whois-lookup">IP WHOIS lookup</A>.</P>
      </Section>
    </ToolPage>
  );
}
