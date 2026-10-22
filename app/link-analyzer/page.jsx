import ToolPage, { toolMetadata, Section, P, UL, B, A, Code } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/link-analyzer';
export const metadata = toolMetadata({
  path,
  title: 'Website Link Analyzer: Check Internal, External & Nofollow Links',
  description: 'List every link on a web page with its anchor text, see internal, external and nofollow counts, find empty anchors, and export the list as CSV. Free SEO tool.',
  keywords: ['link analyzer', 'website link analyzer', 'check links on a page', 'nofollow link checker', 'internal link checker', 'external link checker', 'extract links from page'],
});

const faqs = [
  { q: 'What does the link analyzer show?', a: 'Every link in the page’s HTML: the address, the anchor text (the clickable words), whether it points to the same site or another one, and its rel values such as nofollow, sponsored and ugc.' },
  { q: 'What is a nofollow link?', a: 'A link marked rel="nofollow" asks search engines not to pass ranking credit through it. rel="sponsored" marks paid links and rel="ugc" marks links in user content such as comments. Google treats all three as hints.' },
  { q: 'Why do internal links matter for SEO?', a: 'Search engines find and weigh pages through links. Pages linked from many places on your own site, with descriptive anchor text, are easier to discover and understand.' },
  { q: 'Why are some links missing?', a: 'The tool reads the HTML the server sends. Links added later by JavaScript, such as in some menus or infinite-scroll lists, are not in that HTML.' },
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
      appDescription="Free website link analyzer that extracts all links from a web page, classifies them as internal or external, shows anchor text and rel attributes (nofollow, sponsored, ugc), flags empty anchors and exports CSV."
      tool={<Tool />}
      faqs={faqs}
      related={['/open-graph-checker', '/view-page-source']}
    >
      <Section title="What to look for">
        <UL items={[
          <><B>Empty anchor text:</B> links with no words, such as icon-only links without alt text, tell visitors and search engines nothing.</>,
          <><B>Generic anchors:</B> &ldquo;click here&rdquo; and &ldquo;read more&rdquo; waste a chance to describe the target page.</>,
          <><B>Paid or affiliate links</B> should carry <Code>rel=&quot;sponsored&quot;</Code>.</>,
          <><B>Too few internal links</B> to your important pages from the page you are checking.</>,
        ]} />
      </Section>

      <Section title="How it works">
        <P>
          The page is fetched once from our server; links are read from its HTML in your browser and resolved to full addresses, so <Code>/about</Code> becomes <Code>https://example.com/about</Code>. Links that only jump within the page (<Code>#section</Code>) and JavaScript links are skipped. To open a list of links all at once, paste them into the <A href="/multiple-url-opener">multiple URL opener</A>.
        </P>
      </Section>
    </ToolPage>
  );
}
