import ToolPage, { toolMetadata, Section, P, UL, B, A, Code } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/view-page-source';
export const metadata = toolMetadata({
  path,
  title: 'View Page Source: See Any Website’s HTML Code Online',
  description: 'View the HTML source code of any web page online, on any device, with line numbers, search and copy. Works on phones and tablets that have no View Source option.',
  keywords: ['view page source', 'view html source code', 'view source online', 'see website source code', 'view source on iphone', 'html source viewer'],
});

const faqs = [
  { q: 'How do I view page source on a phone?', a: 'Mobile browsers mostly hide View Source. Paste the page address into this tool instead: it shows the same HTML with line numbers and search, on any phone or tablet.' },
  { q: 'Why is the source different from what I see in the browser?', a: 'This shows the HTML the server sends. Many sites then build or change the page with JavaScript, and that is not in the original source. Browser developer tools (Elements panel) show the page after JavaScript runs.' },
  { q: 'How do I view source on a computer?', a: 'Press Ctrl+U (Windows, Linux) or ⌥⌘U (Mac) in Chrome, Edge and Firefox, or type view-source: before the address. In Safari, first turn on Settings › Advanced › Show features for web developers.' },
  { q: 'Can I see a site’s server code or database?', a: 'No. View source only shows what the server sends to every visitor: HTML, and links to CSS and JavaScript. The code that runs on the server is never visible.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="View Page Source"
      eyebrow="Free Tool · Any device"
      h1="View page source"
      accent="see any page’s HTML"
      intro="Enter a web address to see the page’s HTML source with line numbers. Search inside it, wrap or unwrap long lines, and copy it. Handy on phones and tablets, which have no View Source button."
      appDescription="Free online HTML source viewer that fetches a web page and shows its source code with line numbers, search highlighting, line wrapping and copy, including on mobile devices."
      tool={<Tool />}
      faqs={faqs}
      related={['/open-graph-checker', '/link-analyzer']}
    >
      <Section title="What to look for in the source">
        <UL items={[
          <><B>SEO tags:</B> search for <Code>&lt;title</Code>, <Code>name=&quot;description&quot;</Code>, <Code>rel=&quot;canonical&quot;</Code> and <Code>robots</Code>.</>,
          <><B>Structured data:</B> search for <Code>application/ld+json</Code> to find schema markup.</>,
          <><B>Tracking and ads:</B> search for <Code>gtag</Code>, <Code>googletagmanager</Code> or an ad network&rsquo;s name to see which scripts load.</>,
          <><B>Verification codes:</B> check a <Code>google-site-verification</Code> meta tag is really on the page.</>,
        ]} />
      </Section>

      <Section title="Limits">
        <P>
          Pages are fetched once from our server, so pages behind a login or a paywall show the logged-out version. The source is cut at 1.5 MB, which covers almost all pages. Social sharing tags are easier to check with the <A href="/open-graph-checker">Open Graph checker</A>, and links with the <A href="/link-analyzer">link analyzer</A>.
        </P>
      </Section>
    </ToolPage>
  );
}
