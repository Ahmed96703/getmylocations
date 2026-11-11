import ToolPage, { toolMetadata, Section, P, UL, B } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/public-holidays';

export const metadata = toolMetadata({
  path: PATH,
  title: 'Public Holidays 2026 & 2027 by Country, with Long Weekends',
  description:
    'Public and bank holidays for more than 100 countries in 2026 and 2027: the next holiday and how many days away it is, every date with its local name, regional holidays, and the long weekends you can plan around.',
  keywords: ['public holidays 2026', 'bank holidays 2026', 'public holidays 2027', 'next public holiday', 'holidays by country', 'long weekends 2026', 'national holidays', 'bank holidays uk', 'federal holidays 2026', 'holiday calendar'],
});

const faqs = [
  {
    q: 'When is the next public holiday?',
    a: 'Choose your country (it is picked from your browser\'s language settings to start with). The box at the top shows the next public holiday, its date and how many days away it is.',
  },
  {
    q: 'Which countries are covered?',
    a: 'More than 100, including the United States, the United Kingdom, Canada, Australia, Russia, Germany, France, Spain, Italy, Poland, Brazil, Mexico and Japan. Choose from the list; if your country is missing, the open database does not cover it yet.',
  },
  {
    q: 'What is a regional holiday?',
    a: 'A holiday kept only in part of a country, such as St Andrew\'s Day in Scotland, Epiphany in some German states or a state holiday in the US. The "Where" column shows which regions; tick "Nationwide holidays only" to hide them.',
  },
  {
    q: 'What is a bridge day?',
    a: 'A working day between a public holiday and a weekend. When a holiday falls on a Thursday, taking the Friday off gives a four-day weekend for one day of leave. The long weekends list shows where that works.',
  },
  {
    q: 'What happens when a holiday falls on a weekend?',
    a: 'It depends on the country. The UK and the US move it to the nearest weekday (a "substitute day"), and those substitute days are included in the list; many European countries simply lose the day off that year.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="Public Holidays"
      eyebrow="Free Tool · 100+ countries"
      h1="Public holidays"
      accent="by country, with long weekends"
      intro="See every public and bank holiday in your country for this year, last year and the next two, with the next holiday and a countdown, the local name of each holiday, which regions keep regional holidays, and the long weekends you can plan around, including where one day of leave gives you four days off. For more than 100 countries. Free, no signup."
      bold={['every public and bank holiday', 'next holiday and a countdown', 'long weekends', 'more than 100 countries']}
      appDescription="Free public holiday calendar for 100+ countries: next holiday countdown, all holidays with local names and regions, and long weekends with bridge days."
      features={['100+ countries', 'Next holiday countdown', 'Local holiday names', 'Regional holidays marked', 'Long weekends and bridge days']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/time-difference', label: 'Time Difference', desc: 'Plan calls across time zones' },
        { href: '/currency-converter', label: 'Currency Converter', desc: 'Travel money' },
        { href: '/weather', label: 'Weather Near Me', desc: 'Forecast for the long weekend' },
        { href: '/sunrise-sunset', label: 'Sunrise & Sunset', desc: 'Daylight on holiday' },
      ]}
    >
      <Section title="Planning around public holidays">
        <UL items={[
          <><B>Book early for long weekends:</B> travel and accommodation fill up and cost more around them.</>,
          <><B>Use bridge days:</B> one day of leave between a holiday and a weekend gives you four days off.</>,
          <><B>Check shops and services:</B> in much of Europe most shops close on public holidays; in the US many stay open.</>,
          <><B>Working across countries:</B> holidays rarely line up, so check your colleagues&rsquo; and clients&rsquo; calendars too.</>,
        ]} />
      </Section>

      <Section title="Holidays that move every year">
        <P>
          Some holidays follow the moon or the church calendar, so their dates change. Easter (and Good Friday, Easter Monday, Ascension and Whit Monday with it) can fall between 22 March and 25 April in Western churches, and Orthodox Easter is often a week or more later. Islamic holidays such as Eid al-Fitr move about 11 days earlier each year, and their exact dates can depend on the sighting of the new moon.
        </P>
      </Section>
    </ToolPage>
  );
}
