import ToolPage, { toolMetadata, Section, P, UL, B, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/sunrise-sunset';

export const metadata = toolMetadata({
  path: PATH,
  title: 'Sunrise and Sunset Times Today: Golden Hour & Day Length',
  description:
    'What time is sunset today? Sunrise and sunset times for your location or any place, with golden hour, first and last light, twilight, solar noon, day length and a monthly calendar.',
  keywords: ['sunrise and sunset times', 'sunset time today', 'what time is sunset', 'sunrise time', 'what time is sunrise tomorrow', 'golden hour', 'golden hour today', 'day length', 'sunset calculator', 'civil twilight', 'first light', 'last light'],
});

const faqs = [
  {
    q: 'What time is sunset today?',
    a: 'Press "Sunrise & sunset here" to use your location, or search for any place. The tool shows today\'s sunset in that place\'s own time zone, with the time of last light, when it gets fully dark enough to need street lights, about 25 to 40 minutes later in Europe and North America.',
  },
  {
    q: 'When is golden hour?',
    a: 'Golden hour is the time when the sun is low, less than 6 degrees above the horizon, and the light is soft and warm. In the morning it runs from sunrise until the time shown as "Morning golden hour ends"; in the evening from "Evening golden hour starts" until sunset. Near the equator it lasts about 25 minutes; at high latitudes in summer it can last several hours.',
  },
  {
    q: 'What is the difference between sunset and dusk?',
    a: 'Sunset is when the top of the sun drops below the horizon. Dusk (civil dusk, or last light) comes later, when the sun is 6 degrees below the horizon and it is too dark to read outdoors. Nautical and astronomical dusk follow at 12 and 18 degrees, when the sky is fully dark.',
  },
  {
    q: 'How accurate are the times?',
    a: 'Usually within a minute of national almanacs, for sea level and a flat horizon. Mountains, hills or tall buildings to the east or west can hide the sun for several minutes longer, and the exact moment varies a little with air temperature and pressure.',
  },
  {
    q: 'Why is the earliest sunset not on the shortest day?',
    a: 'Because the Earth\'s orbit is an ellipse and its axis is tilted, solar noon drifts by a few minutes over the year. In the Northern Hemisphere the earliest sunset comes in early to mid December and the latest sunrise in early January, either side of the shortest day around 21 December.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="Sunrise and Sunset Times"
      eyebrow="Free Tool · Works for any place"
      h1="Sunrise and sunset times"
      accent="today, with golden hour and day length"
      intro="See what time the sun rises and sets today at your location or anywhere in the world, with golden hour, first and last light, all three twilights, solar noon and how long the day is. Pick any date, or see the whole month. Times are shown in the place's own time zone, daylight saving included. Free, no signup."
      bold={['what time the sun rises and sets today', 'golden hour', 'first and last light', 'how long the day is']}
      appDescription="Free sunrise and sunset calculator for any place and date, with golden hour, civil, nautical and astronomical twilight, solar noon, day length and a monthly table, in the local time zone."
      features={['Sunrise and sunset in the local time zone', 'Golden hour, first light and last light', 'Civil, nautical and astronomical twilight', 'Day length and change from the day before', 'Monthly sunrise and sunset calendar']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/my-location', label: 'My Location', desc: 'Your exact coordinates and address' },
        { href: '/coordinates-converter', label: 'Coordinates Converter', desc: 'Convert latitude and longitude' },
        { href: '/earthquakes-near-me', label: 'Earthquakes Near Me', desc: 'Recent earthquakes on a live map' },
        { href: '/maps', label: 'World Map', desc: 'Explore any place on the map' },
      ]}
    >
      <Section title="How to find sunrise and sunset times">
        <UL items={[
          <><B>Press &ldquo;Sunrise &amp; sunset here&rdquo;</B> to use your location, or search a city, town or address anywhere.</>,
          <><B>Read today&rsquo;s times</B>: sunrise, sunset, daylight and solar noon, each in the place&rsquo;s own time zone.</>,
          <><B>Change the date</B> with the arrows or the calendar, for example to see what time the sun rises tomorrow or on a holiday.</>,
          <><B>Scroll the monthly table</B> to plan a trip, a photo shoot or a run, and click any day to see its full twilight times.</>,
        ]} />
      </Section>

      <Section title="Twilight and golden hour explained">
        <Table
          head={['Moment', 'Sun position', 'What it means']}
          rows={[
            ['Golden hour', '6° above to the horizon', 'Low, warm, soft light that photographers prefer'],
            ['Sunrise / sunset', 'Top edge on the horizon', 'The moments given in weather forecasts'],
            ['Civil twilight', '0° to 6° below', 'Still light enough to be outdoors without lamps; "first light" and "last light"'],
            ['Nautical twilight', '6° to 12° below', 'The horizon fades; sailors could still take star sightings'],
            ['Astronomical twilight', '12° to 18° below', 'Sky almost dark; faint stars appear'],
            ['Night', 'More than 18° below', 'Fully dark sky for stargazing'],
          ]}
        />
        <P>
          The blue hour that photographers talk about is roughly the civil twilight just before sunrise and after sunset, when the sky turns deep blue.
        </P>
      </Section>

      <Section title="Why day length changes through the year">
        <P>
          The Earth&rsquo;s axis is tilted by about 23.4 degrees, so for half the year each hemisphere leans toward the sun and gets longer days. Days change fastest around the equinoxes in March and September, by two to four minutes a day in mid latitudes such as London or New York, and slowest around the solstices in June and December. Near the equator the day stays close to 12 hours all year. North of the Arctic Circle the sun does not set at all around midsummer and does not rise around midwinter; the tool shows both.
        </P>
      </Section>
    </ToolPage>
  );
}
