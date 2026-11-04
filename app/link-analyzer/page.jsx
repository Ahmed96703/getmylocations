import ToolPage, { toolMetadata, Section, P, UL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/link-analyzer';
export const metadata = toolMetadata({
  path,
  title: 'Link Analyzer: Check Internal, External & Nofollow Links',
  description: 'List every link on a web page with its anchor text, see internal, external and nofollow counts, find empty anchors, and export the list as CSV. Free SEO tool.',
  keywords: ['link analyzer', 'website link analyzer', 'check links on a page', 'nofollow link checker', 'internal link checker', 'external link checker', 'extract links from page'],
});

const faqs = [
  { q: 'What does the link analyzer show?', a: 'Every link in the page’s HTML: the address, the anchor text (the clickable words), whether it points to the same site or another one, and its rel values such as nofollow, sponsored and ugc.' },
  { q: 'What is a nofollow link?', a: 'A link marked rel="nofollow" asks search engines not to pass ranking credit through it. rel="sponsored" marks paid links and rel="ugc" marks links in user content such as comments. Google treats all three as hints.' },
  { q: 'Why do internal links matter for SEO?', a: 'Search engines find and weigh pages through links. Pages linked from many places on your own site, with descriptive anchor text, are easier to discover and understand.' },
  { q: 'Why are some links missing?', a: 'The tool reads the HTML the server sends. Links added later by JavaScript, such as in some menus or infinite-scroll lists, are not in that HTML.' },
  { q: 'Does it check for broken links?', a: 'No. It lists the links on one page but does not visit each one. To test them, copy the list and open the addresses with the multiple URL opener, or check a single page’s status and redirects with the website server checker.' },
  { q: 'Are links to a subdomain counted as internal?', a: 'No. Only links to the same host name, with or without www, count as internal. A link from example.com to blog.example.com is listed as external, which matches how many SEO tools report it.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="Website Link Analyzer"
      eyebrow="Free Tool · SEO"
      h1="Website link analyzer"
      accent="every link on a page"
      intro="Enter a page address to list all its links with their anchor text, split into internal, external, nofollow and other links, spot links with no anchor text, and copy the list as CSV."
      bold={['all its links', 'internal, external, nofollow']}
      appDescription="Free website link analyzer that extracts all links from a web page, classifies them as internal or external, shows anchor text and rel attributes (nofollow, sponsored, ugc), flags empty anchors and exports CSV."
      tool={<Tool />}
      faqs={faqs}
      related={['/open-graph-checker', '/view-page-source']}
      updated="2026-11-04"
      features={['Every link on a page with its anchor text', 'Internal, external and nofollow counts', 'Shows sponsored, ugc and new-tab links', 'Flags links with no anchor text', 'Filter by link type', 'Copy the list as CSV']}
    >
      <Section title="What is a link analyzer?">
        <P>
          A link analyzer reads a web page and lists every link on it: where each one points, the words people click (the anchor text), and how it is marked for search engines. It is a quick way to check a page&rsquo;s internal linking, find links you forgot to label as paid or affiliate, and see which other sites a page points to.
        </P>
      </Section>

      <Section title="How to read the results">
        <Table head={['Result', 'What it counts']} rows={[
          ['Total links', 'Every link in the HTML, including repeats of the same address'],
          ['Unique addresses', 'How many different addresses those links point to'],
          ['Internal', 'Links to the same host name, with or without www'],
          ['External', 'Links to any other site, including your own subdomains'],
          ['Nofollow', <>Links with <Code>rel=&quot;nofollow&quot;</Code>; <Code>sponsored</Code>, <Code>ugc</Code> and &ldquo;new tab&rdquo; show in the Rel column</>],
          ['Without anchor text', 'Links with no words and no image alt text: often icon buttons'],
          ['Email, phone & other', <><Code>mailto:</Code>, <Code>tel:</Code> and other non-web links</>],
        ]} />
      </Section>

      <Section title="What to look for">
        <UL items={[
          <><B>Empty anchor text:</B> links with no words, such as icon-only links without alt text, tell visitors and search engines nothing.</>,
          <><B>Generic anchors:</B> &ldquo;click here&rdquo; and &ldquo;read more&rdquo; waste a chance to describe the target page.</>,
          <><B>Paid or affiliate links</B> should carry <Code>rel=&quot;sponsored&quot;</Code>.</>,
          <><B>Too few internal links</B> to your important pages from the page you are checking.</>,
        ]} />
      </Section>

      <Section title="Good and weak anchor text">
        <Table head={['Weak', 'Better', 'Why']} rows={[
          ['click here', 'check your MX records', 'Says what the target page does'],
          ['read more', 'how IP geolocation works', 'Makes sense out of context, for screen readers too'],
          ['(icon only)', 'an icon with alt text or an aria-label', 'Gives the link a name'],
          ['best cheap tool best tool', 'compare speed test tools', 'Natural words, not repeated keywords'],
        ]} />
        <P>
          Google uses anchor text to understand the page a link points to, and recommends text that is short, descriptive and relevant to the target, as described in its <A href="https://developers.google.com/search/docs/crawling-indexing/links-crawlable">link best practices</A>.
        </P>
      </Section>

      <Section title="How many links should a page have?">
        <P>
          There is no fixed number. Google dropped its old advice to keep pages under about 100 links years ago; what matters is that links are useful to the reader. As a working check, every important page on a site should be linked from several related pages with descriptive anchors, and a page you are checking should link to the next pages a reader is likely to need. A long list of footer or menu links is normal and not a problem.
        </P>
      </Section>

      <Section title="How it works">
        <P>
          The page is fetched once from our server; links are read from its HTML in your browser and resolved to full addresses, so <Code>/about</Code> becomes <Code>https://example.com/about</Code>. Links that only jump within the page (<Code>#section</Code>) and JavaScript links are skipped. The table shows the first 1,000 links; <B>Copy as CSV</B> copies every link in the current filter, ready to paste into a spreadsheet. To open a list of links all at once, paste them into the <A href="/multiple-url-opener">multiple URL opener</A>; to see where one address redirects, use the <A href="/website-server-checker">website server checker</A>.
        </P>
      </Section>
    </ToolPage>
  );
}
