import ToolPage, { toolMetadata, Section, P, UL, B, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/antipode-map';

export const metadata = toolMetadata({
  path: PATH,
  title: 'Antipode Map: What Is on the Other Side of the Earth?',
  description:
    'If you dug straight through the Earth, where would you come out? Find the antipode of your location or any place on a map: the exact opposite point, with its local time, day or night and what is there.',
  keywords: ['antipode map', 'antipodes', 'other side of the earth', 'what is on the other side of the world', 'dig through the earth', 'opposite side of the world from me', 'antipode calculator', 'where would i end up if i dug a hole', 'tunnel through the earth map', 'antipodal point'],
});

const faqs = [
  {
    q: 'Where would I come out if I dug through the Earth?',
    a: 'At your antipode, the point exactly opposite. Press "Use my location" or search a place to see it on the second map. For most people it is in the ocean, because most of the planet\'s land is opposite water.',
  },
  {
    q: 'Is the opposite side of the world from the US in China?',
    a: 'No, that is a myth. The antipodes of the United States are almost all in the southern Indian Ocean, south-west of Australia. China\'s antipodes are mostly in Argentina and Chile.',
  },
  {
    q: 'Which places have land on the opposite side?',
    a: 'Much of Spain and Portugal is opposite New Zealand, which is why Madrid\'s antipode is near the small town of Weber on the North Island. Eastern China and Mongolia sit opposite Argentina and Chile, and Hawaii is opposite Botswana and Namibia in southern Africa.',
  },
  {
    q: 'How do you work out an antipode?',
    a: 'Change north to south and keep the same latitude number, then move the longitude 180 degrees, changing east to west. For example, 40.4° N, 3.7° W (Madrid) becomes 40.4° S, 176.3° E.',
  },
  {
    q: 'How far is the antipode?',
    a: 'About 20,015 km over the surface by any route, the farthest you can travel between two places on Earth, and about 12,742 km straight through the centre, the diameter of the planet.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="Antipode Map"
      eyebrow="Free Tool · Two maps side by side"
      h1="Antipode map"
      accent="what is on the other side of the Earth from you?"
      intro="Find the antipode of where you are, or of any city or point: the place you would reach by digging straight through the centre of the Earth. See both points on side-by-side maps with the place name or open sea, local time and whether it is day or night there. Free, no signup."
      bold={['antipode', 'digging straight through the centre of the Earth', 'side-by-side maps', 'day or night']}
      appDescription="Free antipode map: the exact opposite point on Earth from your location or any place, shown on two maps with place name, local time and day or night."
      features={['Antipode of your location or any place', 'Two maps side by side', 'Place name or open sea', 'Local time and day or night at both points', 'Copy the coordinates']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/distance-calculator', label: 'Distance Calculator', desc: 'Distance between any two points' },
        { href: '/time-difference', label: 'Time Difference', desc: 'Time zones between places' },
        { href: '/coordinates-converter', label: 'Coordinates Converter', desc: 'Convert latitude and longitude' },
        { href: '/maps', label: 'World Map', desc: 'Explore the whole planet' },
      ]}
    >
      <Section title="Famous antipodes">
        <Table
          head={['Place', 'Its antipode is near']}
          rows={[
            ['Madrid, Spain', 'Weber, North Island, New Zealand'],
            ['Shanghai, China', 'The Argentina–Uruguay border region'],
            ['Honolulu, Hawaii', 'Botswana, southern Africa'],
            ['Bermuda', 'Western Australia, near Perth'],
            ['London, UK', 'The Pacific Ocean south-east of New Zealand'],
            ['New York, US', 'The Indian Ocean south-west of Australia'],
          ]}
        />
        <P>
          Only a small share of the world&rsquo;s land has land on the opposite side. Spain and New Zealand are the best-known pair; the Antarctic sits opposite the Arctic Ocean.
        </P>
      </Section>

      <Section title="Why the opposite side is different">
        <UL items={[
          <><B>Opposite seasons:</B> when it is summer at one point, it is winter at the other.</>,
          <><B>Opposite day and night:</B> midday at one is close to midnight at the other, and the length of the day is roughly reversed.</>,
          <><B>Opposite sky:</B> the stars you see overhead at night are the ones under the feet of someone at your antipode.</>,
        ]} />
      </Section>
    </ToolPage>
  );
}
