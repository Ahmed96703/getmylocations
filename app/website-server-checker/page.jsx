import ToolPage, { toolMetadata, Section, P, UL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/website-server-checker';
export const metadata = toolMetadata({
  path,
  title: 'Website Server Checker: Who Is Hosting This Site? (Free)',
  description: 'Check host and server details of any website: who hosts the site, server IP and location, server software, CDN, CMS, response time and security headers. Free.',
  keywords: [
    'website server checker', 'check host', 'who is hosting', 'who is hosting this', 'who hosts this site', 'hosting checker',
    'check server of website', 'server details', 'site server', 'domain location', 'ping website', 'web host lookup',
    'website hosting lookup', 'find website host', 'hosting provider lookup', 'website ip lookup', 'server location checker',
    'what server is a website using', 'website technology checker', 'http header checker', 'security headers check',
    'website response time', 'check website os',
  ],
});

const faqs = [
  { q: 'How do I find out who is hosting a website?', a: 'Enter the website’s address and press Check. The “Hosted by” row shows the company that owns the network the server’s IP address belongs to, which is usually the hosting provider. If the site is behind a CDN such as Cloudflare, you will see the CDN instead, because that is the server visitors actually reach.' },
  { q: 'Where is a website’s server located?', a: 'The checker resolves the domain to its server IP and estimates that IP’s city and country. For sites behind a CDN, the IP belongs to the CDN, so the location is the CDN’s, not the site’s origin server, which the CDN keeps hidden.' },
  { q: 'Is this the same as pinging a website?', a: 'It is close. A ping sends a tiny network packet; this tool makes a real web request and reports the response time in milliseconds, which is what visitors actually experience. Many servers block ping but always answer web requests.' },
  { q: 'Is this hosting checker free?', a: 'Yes. It is free with no signup and no limit. Check as many websites as you like.' },
  { q: 'Can you always tell a website’s operating system?', a: 'No. A site only reveals its operating system if its server says so, for example “Apache/2.4.58 (Ubuntu)” or Microsoft IIS, which runs only on Windows. Most sites behind Cloudflare or another CDN show the CDN instead, and well-configured servers hide their version on purpose.' },
  { q: 'What are HTTP response headers?', a: 'Short lines of information a server sends before the page itself: the status code, content type, caching rules, cookies and security settings. Browsers act on them; this tool shows them all.' },
  { q: 'Which security headers should a site have?', a: 'At least HSTS (Strict-Transport-Security), X-Content-Type-Options: nosniff, a Referrer-Policy and protection against framing (X-Frame-Options or a CSP frame-ancestors rule). A Content-Security-Policy is the strongest protection against injected scripts, but takes care to set up.' },
  { q: 'Why does my site show a different server than my host?', a: 'If your site is behind a CDN or proxy such as Cloudflare, visitors connect to the CDN, so the Server header shows “cloudflare”. Your own server is only seen by the CDN.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="Website Server Checker"
      eyebrow="Free Hosting Checker · Live server check"
      h1="Website Server Checker"
      intro="Enter a website in this website server checker to check host and server details: who is hosting the site, its server IP and location, the server software and operating system when disclosed, the CDN, CMS and framework, any redirects and the response time, and which security headers are missing."
      bold={['website server checker', 'check host and server details', 'who is hosting the site', 'server IP and location', 'which security headers are missing']}
      appDescription="Free website server checker and hosting checker that fetches a page and reports who hosts the site (network owner of its IP), server IP and estimated location, the Server header, disclosed operating system, CDN, hosting platform, CMS and framework, redirects, response time, all response headers and missing security headers."
      tool={<Tool />}
      faqs={faqs}
      related={['/ip-whois-lookup', '/dns-lookup', '/domain-age-checker', '/ssl-certificate-checker', '/view-page-source']}
    >
      <Section title="How to check who is hosting a website">
        <UL items={[
          <><B>Enter the address,</B> such as example.com or a full link. The checker follows redirects to the page visitors really land on.</>,
          <><B>Read “Hosting &amp; server location”:</B> the server IP (a <B>website IP lookup</B>), the company it belongs to (the <B>web host</B> or CDN) and the estimated city and country, like a <B>server location checker</B>.</>,
          <><B>Read the server details:</B> server software, operating system when shown, response time, and the platform, CMS and framework detected.</>,
          <><B>Check the security headers</B> to see which protections the site is missing.</>,
        ]} />
        <P>
          For the full ownership record of the server’s IP, including its address range and abuse contact, paste the IP into the <A href="/ip-whois-lookup">IP WHOIS lookup</A>. For all of a domain’s DNS records, use the <A href="/dns-lookup">DNS lookup</A>.
        </P>
      </Section>

      <Section title="What the server details tell you">
        <Table head={['Result', 'What it means']} rows={[
          ['Server IP', 'The address the domain points to: the site server, or the CDN edge in front of it'],
          ['Hosted by', 'The company that owns that IP’s network: the hosting provider, cloud or CDN'],
          ['Server location', 'Estimated city and country of that IP, the “domain location” people search for'],
          ['Server software', 'Web server named in the Server header, such as nginx, Apache, LiteSpeed or IIS'],
          ['Response time', 'How long the server took to answer, in milliseconds, like a ping for websites'],
          ['Detected technology', 'CDN, hosting platform, CMS and framework found in the headers and HTML'],
        ]} />
      </Section>

      <Section title="How the check works">
        <P>
          To <B>check the server of a website</B>, and see <B>what server a website is using</B>, the tool requests the page once from our server, follows up to ten redirects, and records the response headers and the HTML. It then looks for known signatures: a <Code>cf-ray</Code> header means Cloudflare, <Code>wp-content</Code> in the HTML means WordPress, and the <Code>Server</Code> header often names the web server and sometimes its operating system.
        </P>
        <P>
          To find the host, it resolves the domain to its IP address with public DNS and looks up which network that IP belongs to and roughly where it is. This is how any <B>hosting checker</B>, <B>web host lookup</B> or <B>hosting provider lookup</B> works, and why a site behind a CDN shows the CDN: the real origin server is deliberately hidden.
        </P>
      </Section>

      <Section title="What the results are good for">
        <UL items={[
          <><B>Finding a site’s host:</B> answer “<B>who hosts this site</B>?” or “<B>who is hosting this</B>?” and <B>find the website host</B> to report abuse or a copyright problem to the hosting company, or to see which host a competitor uses.</>,
          <><B>Security review:</B> as an <B>HTTP header checker</B> and <B>security headers check</B>, it shows missing headers, which are quick wins, and a server that advertises an old version number is worth updating or hiding.</>,
          <><B>Migration checks:</B> after moving host or adding a CDN, confirm the new server is the one answering and the site server is in the right country.</>,
          <><B>Speed checks:</B> the <B>website response time</B> works like a quick way to <B>ping a website</B>; a slow one points to the server or hosting plan rather than the page itself.</>,
          <><B>Redirect problems:</B> see every hop, such as http → https → www, and remove unnecessary ones that slow the first visit.</>,
        ]} />
        <P>To read the page&rsquo;s full HTML, use <A href="/view-page-source">View Page Source</A>; for its social sharing tags, the <A href="/open-graph-checker">Open Graph checker</A>; and to see how long the domain has been registered, the <A href="/domain-age-checker">domain age checker</A>.</P>
      </Section>
    </ToolPage>
  );
}
