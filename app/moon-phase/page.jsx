import ToolPage, { toolMetadata, Section, P, A, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/moon-phase';

export const metadata = toolMetadata({
  path: PATH,
  title: 'Moon Phase Today: Moonrise, Moonset & Next Full Moon',
  description:
    'What phase is the moon today? See the moon phase and how much is lit, moonrise and moonset times for your location, the next full moon and new moon, and a monthly moon calendar.',
  keywords: ['moon phase today', 'moon tonight', 'when is the next full moon', 'full moon', 'moonrise', 'moonrise and moonset times', 'moon calendar', 'what phase is the moon', 'new moon', 'lunar calendar'],
});

const faqs = [
  {
    q: 'What phase is the moon today?',
    a: 'The tool shows it as soon as the page opens: the phase name, the percentage of the moon that is lit, whether it is growing (waxing) or shrinking (waning), and how many days it is since the last new moon. Change the date to see any other day.',
  },
  {
    q: 'When is the next full moon?',
    a: 'The list under the moon gives the dates and times of the next full moons, new moons and quarters, in your time zone or that of the place you search. A full moon happens about every 29.5 days, so most months have one and a few have two.',
  },
  {
    q: 'What time does the moon rise tonight?',
    a: 'Search your town or use your location to get moonrise and moonset for that place. The moon rises about 50 minutes later each day. A full moon rises around sunset, and a new moon rises with the sun, which is why it cannot be seen.',
  },
  {
    q: 'Is the moon phase the same everywhere?',
    a: 'Yes, the phase is the same for everyone on Earth at a given moment, though the date can differ across time zones. What changes is the view: in the Southern Hemisphere the moon appears upside down compared with the north, so a waxing crescent is lit on the left instead of the right.',
  },
  {
    q: 'What is a blue moon or a supermoon?',
    a: 'A blue moon is usually the second full moon in one calendar month, which happens about every two to three years. A supermoon is a full moon close to the moon\'s nearest point to Earth, when it looks slightly bigger and brighter; the tool shows the moon\'s distance each day.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="Moon Phase Today"
      eyebrow="Free Tool · Works for any place"
      h1="Moon phase today"
      accent="moonrise, moonset and the next full moon"
      intro="See the moon phase right now, how much of it is lit and how old it is, the dates of the next full moon and new moon, and moonrise and moonset times for your location or any place. Includes a monthly moon calendar and works for any date. Free, no signup."
      bold={['moon phase right now', 'next full moon and new moon', 'moonrise and moonset times', 'monthly moon calendar']}
      appDescription="Free moon phase calculator with illumination, moon age, moonrise and moonset times for any place, upcoming full and new moons, and a monthly moon calendar."
      features={['Moon phase and % lit for any date', 'Moonrise and moonset for any place', 'Next full moons, new moons and quarters', 'Monthly moon calendar', 'Northern and Southern Hemisphere view']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/sunrise-sunset', label: 'Sunrise & Sunset', desc: 'Sun times and golden hour' },
        { href: '/time-difference', label: 'Time Difference', desc: 'Time zones between places' },
        { href: '/elevation', label: 'Elevation Finder', desc: 'Height of any point' },
        { href: '/my-location', label: 'My Location', desc: 'Where you are right now' },
      ]}
    >
      <Section title="The phases of the moon">
        <Table
          head={['Phase', 'Days after new moon', 'When it is up']}
          rows={[
            ['New moon', '0', 'Up during the day, next to the sun; not visible'],
            ['Waxing crescent', '1 to 6', 'Evening sky in the west after sunset'],
            ['First quarter', 'about 7.4', 'Afternoon and first half of the night'],
            ['Waxing gibbous', '8 to 14', 'Most of the evening and night'],
            ['Full moon', 'about 14.8', 'All night, rising around sunset'],
            ['Waning gibbous', '15 to 21', 'Late evening to morning'],
            ['Last quarter', 'about 22.1', 'Second half of the night and the morning'],
            ['Waning crescent', '23 to 29', 'Early morning sky in the east before sunrise'],
          ]}
        />
        <P>
          The moon does not make its own light. Its phase is how much of the sunlit half we can see from Earth as it orbits us once every 29.5 days, the time from one new moon to the next.
        </P>
      </Section>

      <Section title="Best nights for stargazing and photos">
        <P>
          For the darkest skies and the Milky Way, go out in the days around the new moon, when there is no moonlight. For photos of the moon itself, a few days either side of first or last quarter is best, because the low sun angle along the edge of the lit part shows craters in sharp relief. A full moon close to the horizon just after it rises, around sunset, looks large and orange and lights up the landscape; check the moonrise time above and the <A href="/sunrise-sunset">sunset time</A> for the same place.
        </P>
      </Section>
    </ToolPage>
  );
}
