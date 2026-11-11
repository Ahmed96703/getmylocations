import ToolPage, { toolMetadata, Section, P, UL, B, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/sea-temperature';

export const metadata = toolMetadata({
  path: PATH,
  title: 'Sea Temperature Today: Water Temperature at Any Beach',
  description:
    'Sea temperature today at any beach or coast in the world, from satellite data: the water temperature in °C or °F, whether it is warm enough to swim, and how it has changed over the last 30 days.',
  keywords: ['sea temperature', 'sea temperature today', 'water temperature', 'ocean temperature', 'sea water temperature near me', 'water temperature at the beach', 'is the sea warm enough to swim', 'sea temperature map', 'beach water temperature', 'ocean temperature today'],
});

const faqs = [
  {
    q: 'What is the sea temperature today?',
    a: 'Search a beach, resort or coastal town, or click the sea on the map. The tool shows the latest daily sea surface temperature at the nearest open water, what it feels like to swim in, and a 30-day trend.',
  },
  {
    q: 'What sea temperature is warm enough to swim?',
    a: 'Most people find 18 °C (64 °F) and above comfortable for a proper swim, and 22 °C (72 °F) and above warm. Below 15 °C (59 °F) the water is cold and a wetsuit helps; below 10 °C (50 °F) cold water shock is a real risk.',
  },
  {
    q: 'When is the sea warmest?',
    a: 'The sea lags behind the air by one to two months. Around Britain and northern Europe it is warmest in late August and September and coldest in February and March; in the Mediterranean it peaks in August at around 25 to 28 °C.',
  },
  {
    q: 'Why is the beach colder than the reading?',
    a: 'Wind blowing offshore can pull up colder water from below (upwelling), and river mouths bring in cold fresh water. In summer the top metre in a sheltered bay can also be warmer than the reading. The figure is a good guide to the open water just off the coast.',
  },
  {
    q: 'Does it work for lakes?',
    a: 'No. The satellite analysis covers seas and oceans; lakes and rivers are not included.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="Sea Temperature"
      eyebrow="Free Tool · Daily satellite data"
      h1="Sea temperature today"
      accent="water temperature at any beach"
      intro="Find the sea temperature today at any beach, resort or stretch of coast in the world, measured by satellites and updated daily. See whether the water is warm enough to swim, in °C or °F, and how it has warmed or cooled over the last 30 days. Free, no signup."
      bold={['sea temperature today', 'measured by satellites', 'warm enough to swim', 'last 30 days']}
      appDescription="Free sea temperature checker: today's water temperature at any beach or coast from daily satellite data, with a swimming comfort guide and 30-day trend."
      features={['Sea temperature at any coast', 'Click the map or search a beach', 'Is it warm enough to swim?', '30-day trend chart', '°C or °F']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/weather', label: 'Weather Near Me', desc: 'Hourly forecast for the beach' },
        { href: '/sunrise-sunset', label: 'Sunrise & Sunset', desc: 'Daylight for an early swim' },
        { href: '/air-quality', label: 'UV Index', desc: 'Sun strength today' },
        { href: '/public-toilets-near-me', label: 'Public Toilets Near Me', desc: 'Toilets near the beach' },
      ]}
    >
      <Section title="Sea temperature and swimming">
        <Table
          head={['Water', '°C', '°F', 'What it is like']}
          rows={[
            ['Very cold', 'Below 10', 'Below 50', 'Risk of cold water shock; experienced cold-water swimmers only'],
            ['Cold', '10–15', '50–59', 'Bracing; a wetsuit helps for more than a dip'],
            ['Cool', '15–18', '59–64', 'Fine once you are in'],
            ['Pleasant', '18–22', '64–72', 'Comfortable for most swimmers'],
            ['Warm', '22–26', '72–79', 'Easy to stay in for a long time'],
            ['Very warm', '26+', '79+', 'Tropical, bath-like water'],
          ]}
        />
      </Section>

      <Section title="Staying safe in cold water">
        <UL items={[
          <><B>Get in slowly</B> and let your breathing settle before you swim; the gasp reflex passes in about a minute.</>,
          <><B>Stay close to shore</B> and swim parallel to it, ideally at a lifeguarded beach.</>,
          <><B>Get out before you shiver,</B> and warm up gradually with dry, warm layers and a hot drink.</>,
          <><B>If you get into trouble,</B> float on your back until your breathing is under control, then call for help or swim to safety.</>,
        ]} />
        <P>
          Temperature is only part of the picture: check the tide times, the wind and the flags at the beach, and never swim alone in cold water.
        </P>
      </Section>
    </ToolPage>
  );
}
