import ToolPage, { toolMetadata, Section, P, UL, B, A } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/domain-age-checker';
export const metadata = toolMetadata({
  path,
  title: 'Domain Age Checker: When Was a Domain Registered?',
  description: 'Find a domain’s exact age, registration and expiry dates, registrar and status from the official registry (RDAP). Free and instant, no signup.',
  keywords: ['domain age checker', 'domain age', 'how old is a domain', 'when was domain registered', 'domain registration date', 'domain expiry date check'],
});

const faqs = [
  { q: 'How do I find out when a domain was registered?', a: 'Type the domain into the checker. It reads the registration date from the registry that runs the domain’s ending (such as Verisign for .com), which is the official record.' },
  { q: 'Is domain age a Google ranking factor?', a: 'Google has said domain age itself is not a ranking factor. Older sites often rank well because they have built up content and links over time, not because of the date.' },
  { q: 'Why does the age reset after a domain was dropped?', a: 'If a domain expires and someone else registers it again, the registry creates a new record with a new creation date. The age shown is that of the current registration.' },
  { q: 'Why does my country domain show no data?', a: 'The tool uses RDAP, the modern replacement for WHOIS. All generic domains (.com, .org, .net and new ones) support it, but some country-code registries do not publish RDAP data yet.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="Domain Age Checker"
      eyebrow="Free Tool · Official registry data"
      h1="Domain age checker"
      accent="how old is this domain?"
      intro="Enter any domain to see exactly how old it is, when it was registered and when it expires, with its registrar, status and name servers, straight from the official registry."
      bold={['how old it is', 'when it was registered and when it expires']}
      appDescription="Free domain age checker that reads a domain's RDAP record to show its age, creation, expiry and last-updated dates, registrar, status codes and name servers."
      tool={<Tool />}
      faqs={faqs}
      related={['/ns-lookup', '/ssl-certificate-checker']}
    >
      <Section title="Why check a domain’s age">
        <UL items={[
          <><B>Spotting scams:</B> a shop or bank site registered a few weeks ago deserves extra caution.</>,
          <><B>Buying a domain:</B> check its history and expiry before paying.</>,
          <><B>Your own domains:</B> see the expiry date before it lapses and someone else takes it.</>,
        ]} />
      </Section>

      <Section title="Reading the domain status">
        <UL items={[
          <><B>client transfer prohibited:</B> transfer lock set by the registrar, normal and recommended.</>,
          <><B>active / ok:</B> no restrictions, the domain works normally.</>,
          <><B>redemption period / pending delete:</B> the domain has expired and will soon be released.</>,
          <><B>server hold / client hold:</B> the domain is suspended and will not resolve.</>,
        ]} />
        <P>To see where the domain points, use the <A href="/dns-lookup">DNS lookup</A>; to check its certificates, the <A href="/ssl-certificate-checker">SSL certificate checker</A>.</P>
      </Section>
    </ToolPage>
  );
}
