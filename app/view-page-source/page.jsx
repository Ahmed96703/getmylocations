import ToolPage, { toolMetadata, Section, P, UL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/view-page-source';
export const metadata = toolMetadata({
  path,
  title: 'View Page Source: See Any Website’s HTML Code Online',
  description: 'View the HTML source code of any web page online, on any device, with line numbers, search and copy. Works on phones and tablets with no View Source option.',
  keywords: ['view page source', 'view html source code', 'view source online', 'see website source code', 'view source on iphone', 'html source viewer'],
});

const faqs = [
  { q: 'How do I view page source on a phone?', a: 'Mobile browsers mostly hide View Source. Paste the page address into this tool instead: it shows the same HTML with line numbers and search, on any phone or tablet.' },
  { q: 'Why is the source different from what I see in the browser?', a: 'This shows the HTML the server sends. Many sites then build or change the page with JavaScript, and that is not in the original source. Browser developer tools (Elements panel) show the page after JavaScript runs.' },
  { q: 'How do I view source on a computer?', a: 'Press Ctrl+U (Windows, Linux) or ⌥⌘U (Mac) in Chrome, Edge and Firefox, or type view-source: before the address. In Safari, first turn on Settings › Advanced › Show features for web developers.' },
  { q: 'Can I see a site’s server code or database?', a: 'No. View source only shows what the server sends to every visitor: HTML, and links to CSS and JavaScript. The code that runs on the server is never visible.' },
  { q: 'Is it allowed to view a website’s source code?', a: 'Yes. The source is what the site sends to every visitor’s browser, and every browser can show it. Copying the design, text or images into your own site is a different matter: they are still covered by copyright.' },
  { q: 'Why does the tool say the site could not be reached?', a: 'The site did not answer within 10 seconds, the address does not exist, or its firewall blocks automated visitors. Our fetcher identifies itself as GetMyLocationsBot; some sites refuse every bot. Your own browser’s View Source still works on those pages.' },
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
      bold={['HTML source', 'line numbers']}
      appDescription="Free online HTML source viewer that fetches a web page and shows its source code with line numbers, search highlighting, line wrapping and copy, including on mobile devices."
      tool={<Tool />}
      faqs={faqs}
      related={['/open-graph-checker', '/link-analyzer']}
      updated="2026-11-04"
      features={['HTML source with line numbers', 'Search with highlighted matches', 'Line wrapping on or off', 'Copy the whole source', 'Follows redirects and shows the final address', 'Works on iPhone, iPad and Android']}
    >
      <Section title="What is page source?">
        <P>
          A web page&rsquo;s source is the HTML code the server sends to your browser: the text, the tags around it, and links to the styles, scripts and images that make up the page. The browser turns it into what you see. Viewing the source shows what is really on a page, including things you never see, such as the title tag, meta description, structured data and tracking scripts.
        </P>
      </Section>

      <Section title="How to view page source in each browser">
        <Table head={['Browser', 'How']} rows={[
          ['Chrome, Edge (Windows, Linux)', <><Code>Ctrl</Code> + <Code>U</Code>, or right-click › View page source</>],
          ['Chrome, Edge (Mac)', <><Code>⌥</Code> + <Code>⌘</Code> + <Code>U</Code></>],
          ['Firefox', <><Code>Ctrl</Code> + <Code>U</Code> on Windows and Linux, <Code>⌘</Code> + <Code>U</Code> on Mac</>],
          ['Safari (Mac)', <>Settings › Advanced › Show features for web developers, then <Code>⌥</Code> + <Code>⌘</Code> + <Code>U</Code></>],
          ['Chrome on Android', <>Type <Code>view-source:</Code> in front of the address</>],
          ['Safari on iPhone and iPad', 'No built-in option: paste the address into the tool above'],
        ]} />
      </Section>

      <Section title="What to look for in the source">
        <UL items={[
          <><B>SEO tags:</B> search for <Code>&lt;title</Code>, <Code>name=&quot;description&quot;</Code>, <Code>rel=&quot;canonical&quot;</Code> and <Code>robots</Code>.</>,
          <><B>Structured data:</B> search for <Code>application/ld+json</Code> to find schema markup.</>,
          <><B>Tracking and ads:</B> search for <Code>gtag</Code>, <Code>googletagmanager</Code> or an ad network&rsquo;s name to see which scripts load.</>,
          <><B>Verification codes:</B> check a <Code>google-site-verification</Code> meta tag is really on the page.</>,
        ]} />
      </Section>

      <Section title="Page source vs Inspect Element">
        <P>
          <B>Page source</B> is the original HTML, exactly as the server sent it. <B>Inspect Element</B> (the Elements panel in developer tools) shows the page as it is now, after JavaScript has added, removed or changed parts of it. Search engines and social apps read the original HTML first, so the source is the better test of whether a title, link or tag is really there. Inspect is better for finding why something looks wrong on screen.
        </P>
      </Section>

      <Section title="Why does the source look empty or different?">
        <UL items={[
          <><B>The site is built with JavaScript:</B> many apps send an almost empty page with a <Code>&lt;div id=&quot;root&quot;&gt;</Code> and fill it in later. The source shows only that shell.</>,
          <><B>All on one line:</B> the HTML is minified to save space. Turn <B>Wrap lines</B> on and use the search box.</>,
          <><B>A different page:</B> the address redirected, for example to a login or a country version. The tool shows the final address under the toolbar.</>,
          <><B>An error page:</B> the status shown is 403 or 503 when a firewall blocks automated visitors.</>,
        ]} />
      </Section>

      <Section title="Limits">
        <P>
          Pages are fetched once from our server, so pages behind a login or a paywall show the logged-out version. The tool follows up to 10 redirects, waits up to 10 seconds, and cuts the source at 1.5 MB, which covers almost all pages; the same address is cached for five minutes. Social sharing tags are easier to check with the <A href="/open-graph-checker">Open Graph checker</A>, and links with the <A href="/link-analyzer">link analyzer</A>. To open many pages in tabs at once, use the <A href="/multiple-url-opener">multiple URL opener</A>.
        </P>
      </Section>
    </ToolPage>
  );
}
