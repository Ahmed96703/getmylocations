import ToolPage, { toolMetadata, Section, P, UL, B, A, Code } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/ssl-certificate-checker';
export const metadata = toolMetadata({
  path,
  title: 'SSL Certificate Checker & Fingerprint (SHA-256, SHA-1)',
  description: 'See every valid SSL/TLS certificate for a domain: issuer, names covered, expiry date and days left, and its SHA-256 and SHA-1 fingerprints. Free.',
  keywords: ['ssl certificate checker', 'ssl certificate fingerprint', 'sha256 fingerprint', 'check ssl certificate', 'ssl expiry check', 'tls certificate checker', 'certificate transparency search'],
});

const faqs = [
  { q: 'Where does this tool get the certificates from?', a: 'From Certificate Transparency (CT) logs, public append-only logs that every trusted certificate authority must write each certificate to before browsers accept it. The tool searches them through SSLMate’s Cert Spotter service.' },
  { q: 'Is this the certificate my server is using right now?', a: 'It lists all currently valid certificates issued for the name. Usually the newest one is the one in use. To be sure, compare the fingerprint here with the one your browser shows (padlock › Connection is secure › Certificate details).' },
  { q: 'What is a certificate fingerprint?', a: 'A hash of the whole certificate: SHA-256 is 32 bytes, SHA-1 is 20 bytes, written as hex pairs. It identifies one exact certificate and is used for certificate pinning, API allow-lists and checking you are talking to the right server.' },
  { q: 'Why do some certificates show only 90 days?', a: 'Let’s Encrypt and many others issue 90-day certificates and renew them automatically. Industry rules are shortening all public certificates further, to 47 days by 2029.' },
  { q: 'Can I find certificates I did not know about?', a: 'Yes, and that is a key use of CT logs: if a certificate appears for your domain that you did not request, someone may have mis-issued it. Report it to the issuer.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="SSL Certificate Checker"
      eyebrow="Free Tool · Certificate Transparency"
      h1="SSL certificate checker"
      accent="issuer, expiry and fingerprints"
      intro="Enter a domain to see all its valid SSL/TLS certificates from the public Certificate Transparency logs: who issued them, which names they cover, when they expire, and their SHA-256, SHA-1 and public key fingerprints."
      appDescription="Free SSL certificate checker that searches Certificate Transparency logs for a domain's valid certificates and shows issuer, subject alternative names, validity, days to expiry, revocation, and SHA-256, SHA-1 and public-key SHA-256 fingerprints."
      tool={<Tool />}
      faqs={faqs}
      related={['/website-server-checker', '/domain-age-checker']}
    >
      <Section title="What to check on a certificate">
        <UL items={[
          <><B>Days left:</B> renew well before expiry; an expired certificate shows a full-page browser warning to every visitor.</>,
          <><B>Names covered:</B> the certificate must include each name you serve, such as both <Code>example.com</Code> and <Code>www.example.com</Code>, or a wildcard like <Code>*.example.com</Code>.</>,
          <><B>Issuer:</B> make sure it is the authority you use. Your DNS can restrict which ones may issue with a CAA record, visible in the <A href="/dns-lookup">DNS lookup</A>.</>,
        ]} />
      </Section>

      <Section title="Fingerprints and pinning">
        <P>
          Apps and APIs sometimes accept only a server whose certificate matches a known fingerprint. Because certificates are renewed every few months, pinning the certificate means updating the pin each time; pinning the public key (its SHA-256 is shown for each certificate) or the issuing authority is less fragile.
        </P>
        <P>To see the server software and security headers a site sends, use the <A href="/website-server-checker">website server checker</A>.</P>
      </Section>
    </ToolPage>
  );
}
