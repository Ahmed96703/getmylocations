import ToolPage, { toolMetadata, Section, P, UL, B, A, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/domain-age-checker';
export const metadata = toolMetadata({
  path,
  title: 'Domain Age Checker: Free Website Age & Domain Age Lookup',
  description: 'Check domain age free: see exactly how old any website or domain is in years, months and days, plus registration and expiry dates, from the official registry.',
  keywords: [
    'domain age checker', 'domain age', 'check domain age', 'website age', 'domain age checker free',
    'domain age calculator', 'website age checker', 'how old is a website', 'how old is a domain',
    'when was domain registered', 'domain registration date', 'domain creation date', 'domain expiry date checker',
    'domain age lookup', 'whois domain age', 'site age checker', 'domain history', 'rdap lookup',
  ],
});

// Registration dates read from each domain's RDAP record (via rdap.org) on
// CHECKED. Ages are counted to that date, so the table stays true between
// rebuilds; recheck the list when the date is moved.
const CHECKED = '2026-11-04';
const FAMOUS = [
  ['symbolics.com', '1985-03-15', 'The first .com ever registered'],
  ['bbn.com', '1985-04-24', 'BBN built the ARPANET, the internet’s forerunner'],
  ['ibm.com', '1986-03-19', ''],
  ['apple.com', '1987-02-19', ''],
  ['microsoft.com', '1991-05-02', ''],
  ['x.com', '1993-04-02', 'Used for X (formerly Twitter) since 2023'],
  ['cnn.com', '1993-09-22', ''],
  ['amazon.com', '1994-11-01', ''],
  ['yahoo.com', '1995-01-18', ''],
  ['ebay.com', '1995-08-04', ''],
  ['tiktok.com', '1996-07-21', 'TikTok launched worldwide in 2017'],
  ['facebook.com', '1997-03-29', 'Facebook launched in 2004'],
  ['google.com', '1997-09-15', ''],
  ['netflix.com', '1997-11-11', ''],
  ['twitter.com', '2000-01-21', 'Twitter launched in 2006'],
  ['wikipedia.org', '2001-01-13', ''],
  ['linkedin.com', '2002-11-02', ''],
  ['instagram.com', '2004-06-04', 'Instagram launched in 2010'],
  ['youtube.com', '2005-02-15', ''],
  ['reddit.com', '2005-04-29', ''],
  ['openai.com', '2007-01-19', 'OpenAI was founded in 2015'],
  ['github.com', '2007-10-09', ''],
  ['whatsapp.com', '2008-09-04', ''],
];
const yearsBetween = (from, to) => {
  const [a, b] = [new Date(from), new Date(to)];
  let y = b.getUTCFullYear() - a.getUTCFullYear();
  if (b.getUTCMonth() < a.getUTCMonth() || (b.getUTCMonth() === a.getUTCMonth() && b.getUTCDate() < a.getUTCDate())) y -= 1;
  return y;
};
const longDate = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

const faqs = [
  { q: 'What is the oldest domain name?', a: 'symbolics.com, registered on 15 March 1985, is the oldest .com domain and the first ever registered in the .com zone. bbn.com followed on 24 April 1985. Both are still registered today.' },
  { q: 'How old is google.com?', a: `google.com was registered on 15 September 1997, which makes it ${yearsBetween('1997-09-15', CHECKED)} years old as of ${longDate(CHECKED)}. The domain is a year older than Google the company, which was founded in September 1998.` },
  { q: 'How do I check domain age?', a: 'Type the domain or paste the website’s address into the checker and press Check age. It reads the registration date from the registry that runs the domain’s ending (such as Verisign for .com), which is the official record, and shows the age in years, months and days.' },
  { q: 'Is this domain age checker free?', a: 'Yes. It is free with no signup and no daily limit. Check as many domains as you like.' },
  { q: 'Is website age the same as domain age?', a: 'Not always. Domain age counts from the day the name was registered. A website can go live years later, or a domain can be re-registered after an older site on it expired. To see when a site was first online, look up its earliest snapshot on the Internet Archive’s Wayback Machine.' },
  { q: 'Can I paste a full URL or a subdomain?', a: 'Yes. Paste a full address such as https://blog.example.com/page and the checker reduces it to the registered domain, example.com, because only the registered domain has a registration date.' },
  { q: 'Is domain age a Google ranking factor?', a: 'Google has said domain age itself is not a ranking factor. Older sites often rank well because they have built up content and links over time, not because of the date.' },
  { q: 'Why does the age reset after a domain was dropped?', a: 'If a domain expires and someone else registers it again, the registry creates a new record with a new creation date. The age shown is that of the current registration.' },
  { q: 'Why does my country domain show no data?', a: 'The tool uses RDAP, the modern replacement for WHOIS. All generic domains (.com, .org, .net and new ones) support it, but some country-code registries do not publish RDAP data yet.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="Domain Age Checker"
      eyebrow="Free Domain Age Checker · Official registry data"
      h1="Domain Age Checker"
      intro="Enter any domain or website address to check domain age: see exactly how old it is in years, months and days, when it was registered and when it expires, with its registrar, status and name servers, straight from the official registry."
      bold={['check domain age', 'how old it is in years, months and days', 'when it was registered and when it expires']}
      appDescription="Free domain age checker and website age checker that reads a domain's RDAP record to calculate its age in years, months and days and show its creation, expiry and last-updated dates, registrar, status codes and name servers."
      tool={<Tool />}
      faqs={faqs}
      related={['/ip-whois-lookup', '/dns-lookup', '/ns-lookup', '/ssl-certificate-checker', '/website-server-checker']}
      updated="2026-11-04"
    >
      <Section title="How to check the age of a domain or website">
        <UL items={[
          <><B>Enter the domain,</B> such as example.com, or paste the full website address. Subdomains and page paths are removed for you.</>,
          <><B>Press Check age.</B> The checker asks the domain’s official registry for its record, the same data a <B>WHOIS domain age</B> lookup shows.</>,
          <><B>Read the result:</B> the <B>domain age</B> in years, months and days, the <B>domain registration date</B> (the <B>domain creation date</B>), the expiry date with time left, the registrar and the name servers.</>,
        ]} />
        <P>
          This <B>domain age checker</B> works as a <B>domain age calculator</B>: it counts from the registry’s creation date to today, so the figure is exact to the day, not rounded to the year.
        </P>
      </Section>

      <Section title="Why check a domain’s age">
        <UL items={[
          <><B>Spotting scams:</B> a shop or bank site registered a few weeks ago deserves extra caution. Phishing sites are often registered only days before they are used.</>,
          <><B>Buying a domain:</B> check its <B>domain history</B> and expiry before paying.</>,
          <><B>SEO and link building:</B> see how long a site has been around before you buy a link, a guest post or the whole site.</>,
          <><B>Your own domains:</B> use it as a <B>domain expiry date checker</B> and see the expiry date before it lapses and someone else takes it.</>,
        ]} />
      </Section>

      <Section title="Domain age vs website age">
        <Table head={['Feature', 'Domain age', 'Website age']} rows={[
          ['Counts from', 'The day the domain was registered', 'The day a site first went online'],
          ['Source', 'Official registry (RDAP / WHOIS)', 'Archive snapshots, such as the Wayback Machine'],
          ['Resets when', 'The domain expires and is registered again', 'Rarely; old snapshots stay'],
          ['Best for', 'Ownership, scam checks, expiry', 'Content history, past owners’ sites'],
        ]} />
        <P>
          For most purposes, <B>website age</B> and domain age are close, so this <B>website age checker</B> answers both “<B>how old is a domain</B>” and “<B>how old is a website</B>”. If you need to know what was on a domain before, open its earliest snapshot on the <A href="https://web.archive.org/">Internet Archive’s Wayback Machine</A>.
        </P>
      </Section>

      <Section title="How old are famous websites?">
        <P>
          These are the registration dates of well-known domains, read from each one&rsquo;s official registry record. Several are older than the company that uses them now: the name was registered by someone else first and bought later, or registered long before launch. That is the gap between domain age and website age in practice.
        </P>
        <Table head={['Domain', 'Registered', 'Age', 'Note']} rows={FAMOUS.map(([d, reg, note]) => [
          d,
          longDate(reg),
          `${yearsBetween(reg, CHECKED)} years`,
          note || '—',
        ])} />
        <P>
          Ages are counted to {longDate(CHECKED)}, when the records were checked. Type any of these domains into the checker above for its age today, to the day.
        </P>
      </Section>

      <Section title="Reading the domain status">
        <UL items={[
          <><B>client transfer prohibited:</B> transfer lock set by the registrar, normal and recommended.</>,
          <><B>active / ok:</B> no restrictions, the domain works normally.</>,
          <><B>redemption period / pending delete:</B> the domain has expired and will soon be released.</>,
          <><B>server hold / client hold:</B> the domain is suspended and will not resolve.</>,
        ]} />
        <P>To see who is behind an IP address, use the <A href="/ip-whois-lookup">IP WHOIS lookup</A>; to see where the domain points, the <A href="/dns-lookup">DNS lookup</A>; to check its certificates, the <A href="/ssl-certificate-checker">SSL certificate checker</A>.</P>
      </Section>
    </ToolPage>
  );
}
