import ToolPage, { toolMetadata, Section, P, UL, B, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/time-difference';

export const metadata = toolMetadata({
  path: PATH,
  title: 'Time Difference Calculator: Time Zones Between Two Places',
  description:
    'What time is it there? See the current time and time difference between your location and any city or country, with daylight saving changes and the best hours to call or meet. Free time zone converter.',
  keywords: ['time difference', 'time difference calculator', 'time zone converter', 'what time is it in', 'time difference between', 'time zone difference', 'best time to call', 'meeting planner time zones', 'current time in', 'time zones'],
});

const faqs = [
  {
    q: 'How do I find the time difference between two places?',
    a: 'The first box starts with your device\'s time zone. Search a city or country in the second box, such as New York, London, Dubai, Karachi or Sydney. The tool shows the time in both places now, how many hours ahead or behind the second one is, and an hour-by-hour table for the next day.',
  },
  {
    q: 'Does it include daylight saving time?',
    a: 'Yes. Times follow the current rules for each place, and the tool tells you the date of the next clock change in either place, which can change the difference between them by an hour.',
  },
  {
    q: 'Why does the difference change during the year?',
    a: 'Because many countries move their clocks on different dates, and some never do. The UK and the EU change on the last Sundays of March and October, the US and Canada on the second Sunday of March and the first Sunday of November, and Australia\'s south-eastern states in early October and early April. In the weeks between the American and European changes, London and New York are 4 hours apart instead of 5.',
  },
  {
    q: 'Why are some time zones 30 or 45 minutes off?',
    a: 'Some countries chose an offset in between whole hours: India is UTC+5:30, Iran UTC+3:30, Newfoundland UTC−3:30, central Australia UTC+9:30 and Nepal UTC+5:45. The tool handles these the same as any other zone.',
  },
  {
    q: 'What is the best time to call someone abroad?',
    a: 'Look for the green rows in the table: hours that fall between 9:00 and 17:00 in both places. When there are none, the yellow rows show hours when both people are likely to be awake.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="Time Difference Calculator"
      eyebrow="Free Tool · Any city or country"
      h1="Time difference calculator"
      accent="what time is it there right now?"
      intro="See the current time and the time difference between where you are and any city, town or country in the world, with daylight saving taken into account. An hour-by-hour table shows when you are both at work or awake, so you can pick the best time to call or meet. Free, no signup."
      bold={['current time and the time difference', 'daylight saving', 'best time to call or meet']}
      appDescription="Free time difference calculator and time zone converter between any two places, with daylight saving changes and an hour-by-hour meeting planner."
      features={['Current time in both places', 'Hours ahead or behind, including half-hour zones', 'Next daylight saving change', 'Hour-by-hour best time to call', 'Works for any city, town or point']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/sunrise-sunset', label: 'Sunrise & Sunset', desc: 'Daylight in any place' },
        { href: '/distance-calculator', label: 'Distance Calculator', desc: 'How far away is it?' },
        { href: '/my-location', label: 'My Location', desc: 'Where you are right now' },
        { href: '/maps', label: 'World Map', desc: 'Explore any place' },
      ]}
    >
      <Section title="Time differences people check most">
        <Table
          head={['From', 'To', 'Difference in November–March', 'Difference in summer']}
          rows={[
            ['London', 'New York', 'New York 5 h behind', '5 h behind (4 h for a few weeks in March and Oct–Nov)'],
            ['London', 'Dubai', 'Dubai 4 h ahead', '3 h ahead'],
            ['London', 'Karachi', 'Karachi 5 h ahead', '4 h ahead'],
            ['London', 'Sydney', 'Sydney 11 h ahead', '9 h ahead (10 h for a few weeks around early April and in October)'],
            ['New York', 'Los Angeles', 'LA 3 h behind', '3 h behind'],
            ['Sydney', 'Auckland', 'Auckland 2 h ahead', '2 h ahead (3 h for about a week in late September)'],
          ]}
        />
        <P>
          These follow from each country&rsquo;s current rules. Exact differences on a given day can shift when one place has changed its clocks and the other has not yet, which is why the tool works them out for today.
        </P>
      </Section>

      <Section title="UTC, GMT and time zone names">
        <UL items={[
          <><B>UTC</B> (Coordinated Universal Time) is the world&rsquo;s reference clock. Every zone is written as an offset from it, such as UTC+1 or UTC−5.</>,
          <><B>GMT</B> is the UK&rsquo;s winter time and, for everyday use, the same as UTC. In summer the UK uses BST, UTC+1.</>,
          <><B>Abbreviations</B> like EST, CET or AEST are handy but ambiguous (CST is used in the US, China and Cuba), so the tool also shows the UTC offset and the official zone name, such as America/Chicago.</>,
        ]} />
      </Section>
    </ToolPage>
  );
}
