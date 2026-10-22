import ToolPage, { toolMetadata, Section, P, UL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/open-graph-checker';
export const metadata = toolMetadata({
  path,
  title: 'Open Graph Checker: Preview Link Cards for Facebook & X',
  description: 'Check a page’s Open Graph and Twitter Card tags and preview how its link looks on Facebook, LinkedIn, WhatsApp and X, with fixes for missing tags and small images.',
  keywords: ['open graph checker', 'og tags checker', 'open graph preview', 'twitter card validator', 'facebook link preview', 'og image checker', 'social share preview'],
});

const faqs = [
  { q: 'What are Open Graph tags?', a: 'Meta tags in a page’s HTML, such as og:title, og:description and og:image, that tell Facebook, LinkedIn, WhatsApp, Slack and others what title, text and picture to show when someone shares the link.' },
  { q: 'What size should an og:image be?', a: '1200 × 630 pixels (a 1.91:1 ratio) works everywhere. Keep important text away from the edges, since some apps crop to a square, and keep the file under about 5 MB.' },
  { q: 'I fixed my tags but Facebook still shows the old preview', a: 'Facebook and LinkedIn cache previews. Open Facebook’s Sharing Debugger or LinkedIn’s Post Inspector, enter the address and ask them to scrape it again.' },
  { q: 'Does X (Twitter) use Open Graph?', a: 'X reads its own twitter: tags first and falls back to Open Graph. Add twitter:card = summary_large_image to get the large picture card.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="Open Graph Checker"
      eyebrow="Free Tool · Social share preview"
      h1="Open Graph checker"
      accent="how will this link look when shared?"
      intro="Enter a page address to preview its share card on Facebook, LinkedIn, WhatsApp and X, see every Open Graph and Twitter Card tag, and get a list of what to fix, including image size."
      appDescription="Free Open Graph and Twitter Card checker that reads a page's og: and twitter: meta tags, previews the share cards for Facebook and X, measures the og:image and lists missing or weak tags."
      tool={<Tool />}
      faqs={faqs}
      related={['/view-page-source', '/link-analyzer']}
    >
      <Section title="The tags every page should have">
        <Table head={['Tag', 'Example']} rows={[
          ['og:title', <Code>&lt;meta property=&quot;og:title&quot; content=&quot;Radius Map&quot;&gt;</Code>],
          ['og:description', 'One or two sentences, under about 200 characters'],
          ['og:image', 'Full https:// address of a 1200 × 630 image'],
          ['og:url', 'The canonical address of the page'],
          ['og:type', <><Code>website</Code> for most pages, <Code>article</Code> for posts</>],
          ['twitter:card', <Code>summary_large_image</Code>],
        ]} />
      </Section>

      <Section title="Common mistakes">
        <UL items={[
          <><B>Relative image paths</B> such as <Code>/img/share.png</Code>: some platforms need the full address.</>,
          <><B>Tags added by JavaScript:</B> share crawlers read only the original HTML, so tags must be in the page source.</>,
          <><B>One image for every page:</B> works, but a page-specific image gets more clicks.</>,
        ]} />
        <P>Check the raw HTML with <A href="/view-page-source">View Page Source</A>, or every link on the page with the <A href="/link-analyzer">link analyzer</A>.</P>
      </Section>
    </ToolPage>
  );
}
