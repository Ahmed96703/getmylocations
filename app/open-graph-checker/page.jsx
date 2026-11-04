import ToolPage, { toolMetadata, Section, P, UL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/open-graph-checker';
export const metadata = toolMetadata({
  path,
  title: 'Open Graph Checker: Preview Link Cards for Facebook & X',
  description: 'Check a page’s Open Graph and Twitter Card tags and preview its link on Facebook, LinkedIn, WhatsApp and X, with fixes for missing tags and small images.',
  keywords: ['open graph checker', 'og tags checker', 'open graph preview', 'twitter card validator', 'facebook link preview', 'og image checker', 'social share preview'],
});

const faqs = [
  { q: 'What are Open Graph tags?', a: 'Meta tags in a page’s HTML, such as og:title, og:description and og:image, that tell Facebook, LinkedIn, WhatsApp, Slack and others what title, text and picture to show when someone shares the link.' },
  { q: 'What size should an og:image be?', a: '1200 × 630 pixels (a 1.91:1 ratio) works everywhere. Keep important text away from the edges, since some apps crop to a square, and keep the file under about 5 MB.' },
  { q: 'I fixed my tags but Facebook still shows the old preview', a: 'Facebook and LinkedIn cache previews. Open Facebook’s Sharing Debugger or LinkedIn’s Post Inspector, enter the address and ask them to scrape it again.' },
  { q: 'Does X (Twitter) use Open Graph?', a: 'X reads its own twitter: tags first and falls back to Open Graph. Add twitter:card = summary_large_image to get the large picture card.' },
  { q: 'Do Open Graph tags help SEO?', a: 'Not directly: Google does not rank pages by their og: tags. They decide how a link looks when shared, and a clear title and picture get more clicks from social apps and chats, which brings visitors who may link to the page.' },
  { q: 'Why does the checker say the image could not be loaded?', a: 'The address in og:image returned an error, is not a public https:// address, or the image host blocks requests from other sites. Open the image address in a new tab; if it does not show there, social apps cannot load it either.' },
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
      bold={['preview its share card', 'Open Graph and Twitter Card tag']}
      appDescription="Free Open Graph and Twitter Card checker that reads a page's og: and twitter: meta tags, previews the share cards for Facebook and X, measures the og:image and lists missing or weak tags."
      tool={<Tool />}
      faqs={faqs}
      related={['/view-page-source', '/link-analyzer']}
      updated="2026-11-04"
      features={['Facebook, LinkedIn and WhatsApp card preview', 'X (Twitter) summary and large image card preview', 'Lists every og: and twitter: tag', 'Measures the og:image size', 'Flags missing or weak tags', 'Shows title, description and canonical']}
    >
      <Section title="What is an Open Graph checker?">
        <P>
          An Open Graph checker reads the hidden tags in a page&rsquo;s HTML that social apps use to build a link preview: the title, short description and picture you see when someone shares the address. <A href="https://ogp.me/">Open Graph</A> was created by Facebook and is now read by LinkedIn, WhatsApp, Slack, Discord, Telegram and others; X adds its own Twitter Card tags. This checker shows the tags, draws the preview, and tells you what is missing before you share.
        </P>
      </Section>

      <Section title="The tags every page should have">
        <Table head={['Tag', 'Example']} rows={[
          ['og:title', <Code>&lt;meta property=&quot;og:title&quot; content=&quot;Radius Map&quot;&gt;</Code>],
          ['og:description', 'One or two sentences, under about 200 characters'],
          ['og:image', 'Full https:// address of a 1200 × 630 image'],
          ['og:image:alt', 'A short description of the image, read aloud by screen readers'],
          ['og:url', 'The canonical address of the page'],
          ['og:type', <><Code>website</Code> for most pages, <Code>article</Code> for posts</>],
          ['twitter:card', <Code>summary_large_image</Code>],
        ]} />
      </Section>

      <Section title="What the checker tests">
        <UL items={[
          <><B>Fix:</B> <Code>og:title</Code> or <Code>og:image</Code> is missing, or the image address does not load.</>,
          <><B>Tip:</B> <Code>og:description</Code>, <Code>og:url</Code> or <Code>twitter:card</Code> is missing; the image is smaller than 1200 &times; 630; or <Code>og:title</Code> is longer than 90 characters and will be cut off.</>,
          <><B>OK:</B> the image loads and is at least 1200 pixels wide.</>,
        ]} />
        <P>
          The image is measured by loading it in your browser, the same way a social app would. The page itself is fetched once by our server, so a page behind a login shows its logged-out tags, which is what social apps see too.
        </P>
      </Section>

      <Section title="How each app builds the preview">
        <Table head={['App', 'Reads', 'Notes']} rows={[
          ['Facebook', 'og: tags', 'Caches the preview; refresh it in the Sharing Debugger'],
          ['LinkedIn', 'og: tags', 'Caches for about a week; refresh it in Post Inspector'],
          ['WhatsApp', 'og: tags', 'Often shows a small square thumbnail; keep text in the centre of the image'],
          ['X (Twitter)', 'twitter: tags, then og:', 'Needs twitter:card = summary_large_image for the big picture'],
          ['Slack, Discord, Telegram', 'og: and twitter: tags', 'Show the site name from og:site_name when it is set'],
        ]} />
      </Section>

      <Section title="Why is my link preview wrong or not showing?">
        <UL items={[
          <><B>An old preview:</B> the app cached it before your fix. Use Facebook&rsquo;s Sharing Debugger or LinkedIn&rsquo;s Post Inspector; on WhatsApp, a slightly changed address (such as adding <Code>?v=2</Code>) is fetched fresh.</>,
          <><B>Relative image paths</B> such as <Code>/img/share.png</Code>: some platforms need the full address.</>,
          <><B>Tags added by JavaScript:</B> share crawlers read only the original HTML, so tags must be in the page source.</>,
          <><B>The site blocks bots:</B> a firewall that challenges unknown visitors also blocks the apps&rsquo; preview crawlers, so no card appears.</>,
          <><B>One image for every page:</B> works, but a page-specific image gets more clicks.</>,
        ]} />
        <P>
          Check the raw HTML with <A href="/view-page-source">View Page Source</A>, or every link on the page with the <A href="/link-analyzer">link analyzer</A>. To open a list of your pages in tabs and review them one after another, use the <A href="/multiple-url-opener">multiple URL opener</A>.
        </P>
      </Section>
    </ToolPage>
  );
}
