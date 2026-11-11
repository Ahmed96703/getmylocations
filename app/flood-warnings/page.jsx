import ToolPage, { toolMetadata, Section, P, UL, B, A, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/flood-warnings';

export const metadata = toolMetadata({
  path: PATH,
  title: 'Flood Warnings Near Me: Live Flood Alerts & River Levels (England)',
  description:
    'Live flood warnings and flood alerts near your postcode or location in England, on a map, with the latest river levels at nearby gauges compared with their normal range. Official Environment Agency data, updated every 15 minutes.',
  keywords: ['flood warnings near me', 'flood alerts near me', 'flood warnings', 'river levels near me', 'flood map', 'flood warning by postcode', 'environment agency flood warnings', 'am i at risk of flooding', 'river level today', 'flood alert uk'],
});

const faqs = [
  {
    q: 'Are there flood warnings near me now?',
    a: 'Press "Floods near me" or search a postcode or town in England. The tool lists every flood alert, flood warning and severe flood warning in force within the distance you choose, straight from the Environment Agency, which updates them every 15 minutes.',
  },
  {
    q: 'What is the difference between a flood alert and a flood warning?',
    a: 'A flood alert means flooding is possible, so be prepared. A flood warning means flooding is expected, so act now. A severe flood warning means there is a danger to life. When the risk has passed, the Environment Agency marks it "no longer in force".',
  },
  {
    q: 'How do I read the river levels?',
    a: 'Each gauge is compared with its own normal range, the band the river stays within about 90% of the time. "Above normal range" means the river is higher than usual there, which does not by itself mean flooding. Levels are measured against each gauge\'s own reference point, so do not compare numbers between gauges.',
  },
  {
    q: 'Does it cover Wales, Scotland and Northern Ireland?',
    a: 'No. Each nation runs its own warnings: Natural Resources Wales, SEPA Floodline in Scotland, and the Department for Infrastructure in Northern Ireland. The tool links to each one.',
  },
  {
    q: 'How can I get flood warnings sent to my phone?',
    a: 'Sign up for free flood warnings on GOV.UK, by phone, text or email, for your address in England, or call Floodline on 0345 988 1188. The service will call you when a warning is issued for your area, even at night.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="Flood Warnings Near Me"
      eyebrow="Free Tool · Official Environment Agency data"
      h1="Flood warnings near me"
      accent="live flood alerts and river levels in England"
      intro="Check live flood warnings and flood alerts near your postcode or location on a map, with what each one means and what to do. See the latest level of the nearest rivers compared with their normal range. Official Environment Agency data for England, updated every 15 minutes. Free, no signup."
      bold={['live flood warnings and flood alerts', 'postcode', 'latest level of the nearest rivers', 'Environment Agency']}
      appDescription="Free live map of Environment Agency flood warnings, flood alerts and river levels near any postcode or location in England."
      features={['Flood alerts, warnings and severe warnings', 'Search radius 10, 25 or 50 km', 'Nearest river gauges with normal range', 'What each warning means and what to do', 'Links for Wales, Scotland and Northern Ireland']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/whats-my-postcode', label: "What's My Postcode", desc: 'Your postcode and council' },
        { href: '/earthquakes-near-me', label: 'Earthquakes Near Me', desc: 'Recent earthquakes on a live map' },
        { href: '/elevation', label: 'Elevation Finder', desc: 'Height above sea level of any point' },
        { href: '/fire-map', label: 'Fire Map', desc: 'Wildfires near you' },
      ]}
    >
      <Section title="Flood warning levels and what to do">
        <Table
          head={['Level', 'Meaning', 'What to do']}
          rows={[
            ['Flood alert', 'Flooding is possible', 'Be prepared: check your flood plan, move cars and valuables from low ground, keep up to date'],
            ['Flood warning', 'Flooding is expected', 'Act now: move family, pets and valuables upstairs, turn off gas, electricity and water if safe, put flood protection in place'],
            ['Severe flood warning', 'Danger to life', 'Follow the emergency services; be ready to leave; call 999 if you are in immediate danger'],
            ['No longer in force', 'No further flooding expected', 'Take care: floodwater can still be deep, fast and dirty'],
          ]}
        />
        <P>
          Never walk, drive or swim through floodwater. Thirty centimetres of moving water is enough to float a car, and drains and manholes may be open under the surface.
        </P>
      </Section>

      <Section title="Check your long-term flood risk">
        <P>
          Live warnings tell you what is happening now. To see how likely a property is to flood from rivers, the sea, surface water or reservoirs over the years, before you buy or rent, use the government&rsquo;s <A href="https://check-long-term-flood-risk.service.gov.uk/">long-term flood risk service</A>. To be told automatically when a warning is issued, <A href="https://www.gov.uk/sign-up-for-flood-warnings">sign up for flood warnings</A>.
        </P>
        <UL items={[
          <><B>Wales:</B> <A href="https://naturalresources.wales/flooding">Natural Resources Wales</A> issues flood warnings and shows river levels.</>,
          <><B>Scotland:</B> <A href="https://floodline.sepa.org.uk/">SEPA Floodline</A> covers flood updates and warnings.</>,
          <><B>Northern Ireland:</B> <A href="https://www.nidirect.gov.uk/articles/flooding">nidirect</A> explains who to contact; the flooding incident line is 0300 2000 100.</>,
        ]} />
      </Section>
    </ToolPage>
  );
}
