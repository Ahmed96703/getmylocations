import ToolPage, { toolMetadata, Section, P, UL, B, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/iss-tracker';

export const metadata = toolMetadata({
  path: PATH,
  title: 'ISS Tracker: Where Is the ISS Now? Live Map & Pass Times',
  description:
    'Live ISS tracker: where the International Space Station is right now on a world map, its height and speed, and when you can see it pass over your town in the next 10 days. Also tracks Tiangong and Hubble.',
  keywords: ['iss tracker', 'where is the iss', 'where is the iss now', 'iss live location', 'international space station tracker', 'when can i see the iss', 'iss pass times', 'iss flyover tonight', 'space station visible tonight', 'tiangong tracker'],
});

const faqs = [
  {
    q: 'Where is the ISS right now?',
    a: 'The red dot on the map is the International Space Station now, updated every second, with the latitude and longitude it is over, its height and its speed. The blue line shows where it goes on its next orbit.',
  },
  {
    q: 'When can I see the ISS from my house?',
    a: 'Press "Passes over me" or search your town. The table lists every pass in the next 10 days when the station is lit by the sun while your sky is dark, with the time and direction it appears, how high it climbs and when it disappears.',
  },
  {
    q: 'What does the ISS look like in the sky?',
    a: 'A bright, steady white point moving smoothly across the sky in a few minutes, with no flashing lights. On a good pass it is brighter than any star. It often fades out before reaching the horizon as it enters the Earth\'s shadow.',
  },
  {
    q: 'Why can I only see it at dawn and dusk?',
    a: 'The station has no light of its own; you see sunlight reflected from it. That needs your sky to be dark while the station, 400 km up, is still in sunshine, which happens for an hour or two after sunset and before sunrise.',
  },
  {
    q: 'Why are there weeks with no visible passes?',
    a: 'The station\'s orbit slowly shifts, so for some weeks it passes your place only in daylight or in the middle of the night when it is in shadow. Visible passes then return in the evening or the morning.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="ISS Tracker"
      eyebrow="Free Tool · Live orbit map"
      h1="ISS tracker"
      accent="where is the International Space Station now?"
      intro="Follow the International Space Station live on a world map, with the place it is over, its height and its speed, and find out when you can see it from your town: every visible pass in the next 10 days with the time, direction and height in the sky. Switch to track China's Tiangong space station or the Hubble Space Telescope. Free, no signup."
      bold={['International Space Station live', 'when you can see it from your town', 'visible pass', 'Tiangong', 'Hubble Space Telescope']}
      appDescription="Free live ISS tracker: the International Space Station's position, height and speed on a world map, and visible pass times over any place for the next 10 days. Also tracks Tiangong and Hubble."
      features={['Live position every second', 'Ground track of the next orbit', 'Visible pass times for 10 days', 'Direction and height in the sky', 'ISS, Tiangong and Hubble']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/northern-lights', label: 'Northern Lights Forecast', desc: 'Aurora chance tonight' },
        { href: '/moon-phase', label: 'Moon Phase', desc: 'Tonight\'s moon and moonrise' },
        { href: '/sunrise-sunset', label: 'Sunrise & Sunset', desc: 'Twilight times for stargazing' },
        { href: '/antipode-map', label: 'Antipode Map', desc: 'The other side of the Earth' },
      ]}
    >
      <Section title="How to spot the space station">
        <UL items={[
          <><B>Check the time and direction</B> in the table, and be outside a few minutes early.</>,
          <><B>Look low in the direction it appears</B>; it rises from the horizon in a few seconds.</>,
          <><B>It moves steadily</B> and does not blink. A blinking light is a plane.</>,
          <><B>Higher passes are brighter</B>: anything above about 40° is easy to see, even from a city.</>,
          <><B>No telescope needed.</B> Binoculars help a little, but a phone camera on a long exposure shows the trail best.</>,
        ]} />
      </Section>

      <Section title="ISS, Tiangong and Hubble compared">
        <Table
          head={['', 'International Space Station', 'Tiangong', 'Hubble']}
          rows={[
            ['Run by', 'US, Russia, Europe, Japan, Canada', 'China', 'NASA and ESA'],
            ['Crewed', 'Yes, since November 2000', 'Yes, since 2021', 'No'],
            ['Orbit inclination', '51.6°', 'About 41.5°', '28.5°'],
            ['Seen from', 'Most inhabited places', 'Up to about 50° north and south', 'Only the tropics and subtropics'],
          ]}
        />
        <P>
          The inclination sets how far north and south a craft travels. The ISS goes up to 51.6°, which is why it passes over London, Kyiv and Calgary but is seen only low in the sky from Scandinavia or Scotland&rsquo;s far north. Hubble never rises high for anyone much beyond 35° north or south.
        </P>
      </Section>
    </ToolPage>
  );
}
