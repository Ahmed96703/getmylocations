import ToolPage, { toolMetadata, Section, P, UL, OL, B, A } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/multiple-url-opener';
export const metadata = toolMetadata({
  path,
  title: 'Multiple URL Opener: Open Many Links at Once (Free)',
  description: 'Paste a list of links and open them all in new tabs with one click, or one at a time. Accepts bare domains, removes duplicates and works in any browser.',
  keywords: ['multiple url opener', 'open multiple urls', 'open multiple links at once', 'bulk url opener', 'open all links', 'mass url opener'],
});

const faqs = [
  { q: 'Why does only one tab open?', a: 'Browsers allow one new tab per click to stop pop-up spam. Allow pop-ups for this site once (click the blocked pop-up icon in the address bar) and “Open all” will open the whole list. “Open next” always works without changing any settings.' },
  { q: 'How many links can I open?', a: 'There is no limit in the tool, but each tab uses memory. Opening more than 20 to 30 at once can slow a computer down; open large lists in batches.' },
  { q: 'Do I need to type https://?', a: 'No. Bare domains such as example.com get https:// added. Duplicates and anything that is not a web address are skipped.' },
  { q: 'Is my list saved?', a: 'No. The list stays in your browser tab and is gone when you close or reload the page.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="Multiple URL Opener"
      eyebrow="Free Tool · Any browser"
      h1="Multiple URL opener"
      accent="open a list of links at once"
      intro="Paste links or domains, one per line, and open them all in new tabs with one click, or step through them with “Open next”. Duplicates and invalid lines are removed."
      appDescription="Free multiple URL opener that parses a pasted list of links or domains, removes duplicates, and opens them in new tabs all at once or one at a time."
      tool={<Tool />}
      faqs={faqs}
      related={['/link-analyzer', '/website-server-checker']}
    >
      <Section title="How to open many links at once">
        <OL items={[
          <>Paste your list, one link per line. Spaces and commas also work as separators.</>,
          <>Press <B>Open all</B>. If only one tab opens, allow pop-ups for this site and press it again.</>,
          <>Or press <B>Open next</B> repeatedly to open them one by one; opened links turn grey.</>,
        ]} />
      </Section>

      <Section title="Handy uses">
        <UL items={[
          <><B>Checking a batch of pages</B> after a site update or a redirect change.</>,
          <><B>Morning routine:</B> open the same set of dashboards and news sites.</>,
          <><B>Research:</B> open every result from a list in one go. To collect all links from a page first, use the <A href="/link-analyzer">link analyzer</A> and copy them.</>,
        ]} />
        <P>Links open with <B>noopener</B>, so the opened pages cannot control this tab.</P>
      </Section>
    </ToolPage>
  );
}
