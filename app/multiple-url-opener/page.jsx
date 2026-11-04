import ToolPage, { toolMetadata, Section, P, UL, OL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';
import { parseUrls } from './parse.js';

// Each row is run through the tool's own parser at build time.
const LINES = [
  ['example.com', 'https:// is added'],
  ['www.wikipedia.org/wiki/Map', 'Paths are kept'],
  ['http://neverssl.com', 'http:// is kept as typed'],
  ['EXAMPLE.COM', 'Same as example.com, so skipped as a duplicate'],
  ['ftp://files.example.com', 'Not a web address'],
  ['localhost', 'No dot, so not a public site'],
  ['hello', 'Plain words are ignored'],
];
const lineRows = (() => {
  const seen = new Set();
  return LINES.map(([line, why]) => {
    const [url] = parseUrls(line);
    const opened = url && !seen.has(url);
    if (url) seen.add(url);
    return [line, opened ? url : 'Skipped', why];
  });
})();

const path = '/multiple-url-opener';
export const metadata = toolMetadata({
  path,
  title: 'Multiple URL Opener: Open Many Links at Once (Free)',
  description: 'Paste a list of links and open them all in new tabs with one click, or one at a time. Accepts bare domains, removes duplicates and works in any browser.',
  keywords: ['multiple url opener', 'open multiple urls', 'open multiple links at once', 'bulk url opener', 'open all links', 'mass url opener'],
});

const faqs = [
  { q: 'Can I open the links in a private or incognito window?', a: 'Yes. Open this page in a private window first; links it opens stay in that window. Links opened from a normal window open in normal tabs.' },
  { q: 'How do I open the same set of links every day?', a: 'Paste them here once, open them all, then save them as a bookmarks folder. Chrome and Edge can then reopen the whole folder with right-click › Open all, and Firefox with Open All in Tabs. Chrome also has “Open a specific set of pages” under On startup in its settings.' },
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
      bold={['open them all in new tabs with one click']}
      appDescription="Free multiple URL opener that parses a pasted list of links or domains, removes duplicates, and opens them in new tabs all at once or one at a time."
      tool={<Tool />}
      faqs={faqs}
      related={['/link-analyzer', '/website-server-checker']}
      updated="2026-11-04"
      features={['Open every link in new tabs with one click', 'Or open them one at a time with Open next', 'Accepts bare domains such as example.com', 'Removes duplicates', 'Skips lines that are not web addresses', 'Nothing is saved or sent anywhere']}
    >
      <Section title="What is a multiple URL opener?">
        <P>
          A multiple URL opener takes a list of web addresses and opens each one in its own browser tab, so you do not have to copy and paste them one by one. It is useful whenever you have a column of links in a spreadsheet, an email or a report and need to look at every page: checking a site after an update, reviewing search results or starting the day with the same set of dashboards.
        </P>
      </Section>

      <Section title="How to open many links at once">
        <OL items={[
          <>Paste your list, one link per line. Spaces and commas also work as separators.</>,
          <>Press <B>Open all</B>. If only one tab opens, allow pop-ups for this site and press it again.</>,
          <>Or press <B>Open next</B> repeatedly to open them one by one; opened links turn grey.</>,
        ]} />
      </Section>

      <Section title="How your list is read">
        <P>Each line, or each item separated by spaces or commas, is turned into a full address. These examples were run through the tool itself:</P>
        <Table head={['You paste', 'Opens', 'Why']} rows={lineRows} />
        <P>Duplicates are compared after this clean-up, so <Code>example.com</Code>, <Code>https://example.com</Code> and <Code>EXAMPLE.COM</Code> open only once.</P>
      </Section>

      <Section title="How to allow pop-ups so Open all works">
        <P>Browsers let a page open only one tab per click unless you allow pop-ups for that site. You only need to do this once:</P>
        <Table head={['Browser', 'How to allow pop-ups for this site']} rows={[
          ['Chrome', 'Click the blocked pop-up icon at the right of the address bar, choose Always allow pop-ups and redirects, then Done'],
          ['Edge', 'Click the blocked pop-up icon in the address bar and choose Always allow'],
          ['Firefox', 'In the yellow bar that says pop-ups were blocked, click Options (or Preferences) › Allow pop-ups'],
          ['Safari on Mac', 'Safari › Settings › Websites › Pop-up Windows, and set this site to Allow'],
          ['Chrome on Android', 'Settings › Site settings › Pop-ups and redirects, and allow this site'],
          ['Safari on iPhone and iPad', 'Settings › Safari (Settings › Apps › Safari on iOS 18 and later), turn off Block Pop-ups; or use Open next'],
        ]} />
      </Section>

      <Section title="Open all or Open next?">
        <Table head={['', 'Open all', 'Open next']} rows={[
          ['Tabs per click', 'Every link in the list', 'One'],
          ['Needs pop-ups allowed', 'Yes, for more than one tab', 'No'],
          ['Best for', 'Short lists you want side by side', 'Long lists, phones and tablets, or reviewing pages in order'],
          ['Keeps your place', 'No', 'Yes: opened links turn grey'],
        ]} />
        <P>
          Every open tab uses memory, so on a laptop or phone it is kinder to open a long list in batches of 10 to 20 and close each batch before the next.
        </P>
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
