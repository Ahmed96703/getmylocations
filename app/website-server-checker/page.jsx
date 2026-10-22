import ToolPage, { toolMetadata, Section, P, UL, B, A, Code } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/website-server-checker';
export const metadata = toolMetadata({
  path,
  title: 'Website Server Checker: Server, OS & HTTP Headers (Free)',
  description: 'See what a website runs on: server software, operating system when disclosed, CDN, CMS and framework, plus redirects, response time and missing security headers.',
  keywords: ['website server checker', 'check website os', 'what server is a website using', 'http header checker', 'website technology checker', 'security headers check'],
});

const faqs = [
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
      eyebrow="Free Tool · Live HTTP check"
      h1="Website server checker"
      accent="what is this site running on?"
      intro="Enter a website to see its server software, the operating system when the server discloses it, the CDN, CMS and framework behind it, any redirects and the response time, and which security headers are missing."
      appDescription="Free website server and technology checker that fetches a page and reports the Server header, disclosed operating system, CDN, hosting, CMS and framework, redirects, response time, all response headers and missing security headers."
      tool={<Tool />}
      faqs={faqs}
      related={['/ssl-certificate-checker', '/view-page-source']}
    >
      <Section title="How the check works">
        <P>
          The tool requests the page once from our server, follows up to ten redirects, and records the response headers and the HTML. It then looks for known signatures: a <Code>cf-ray</Code> header means Cloudflare, <Code>wp-content</Code> in the HTML means WordPress, and the <Code>Server</Code> header often names the web server and sometimes its operating system.
        </P>
      </Section>

      <Section title="What the results are good for">
        <UL items={[
          <><B>Security review:</B> missing headers are quick wins, and a server that advertises an old version number is worth updating or hiding.</>,
          <><B>Migration checks:</B> after moving host or adding a CDN, confirm the new stack is the one answering.</>,
          <><B>Redirect problems:</B> see every hop, such as http → https → www, and remove unnecessary ones that slow the first visit.</>,
        ]} />
        <P>To read the page&rsquo;s full HTML, use <A href="/view-page-source">View Page Source</A>; for its social sharing tags, the <A href="/open-graph-checker">Open Graph checker</A>.</P>
      </Section>
    </ToolPage>
  );
}
