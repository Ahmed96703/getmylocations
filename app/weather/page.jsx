import ToolPage, { toolMetadata, Section, P, UL, B, A, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/weather';

export const metadata = toolMetadata({
  path: PATH,
  title: 'Weather Near Me: Hourly Forecast & Will It Rain Today?',
  description:
    'Weather for your location right now, hour by hour and for the next 9 days: temperature, feels-like, rain, wind and UV, with a straight answer to "will it rain today?". Any place in the world, °C or °F.',
  keywords: ['weather near me', 'weather today', 'will it rain today', 'hourly weather', 'weather forecast', 'weather for my location', 'rain forecast', 'weather tomorrow', '10 day weather forecast', 'local weather'],
});

const faqs = [
  {
    q: 'Will it rain today where I am?',
    a: 'Press "Weather near me" and the panel on the right answers it: whether rain is expected for the rest of today, from what time and how much in total. Below it you can see each hour, and tomorrow\'s outlook.',
  },
  {
    q: 'How far ahead is the forecast?',
    a: 'Hour by hour for about the next two and a half days, then in 6-hour steps up to 9 or 10 days. Forecasts for the next day or two are reliable; beyond five days, treat them as a guide to the trend rather than the detail.',
  },
  {
    q: 'What does "feels like" mean?',
    a: 'In cold, windy weather it is the wind chill: how cold the air feels on bare skin. In hot, humid weather it is the heat index, because sweat dries more slowly. In between it is the same as the air temperature.',
  },
  {
    q: 'How much rain is a lot?',
    a: 'Under 1 mm in an hour is light rain or drizzle; 1 to 4 mm is moderate and will soak you on a walk; over 4 mm an hour is heavy. Over a whole day, 10 mm is a wet day and 25 mm or more can cause local flooding.',
  },
  {
    q: 'Where does the forecast come from?',
    a: 'From the Norwegian Meteorological Institute (MET Norway), which publishes forecasts for the whole world, combining the European centre\'s global model with higher-resolution models over Europe.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="Weather Near Me"
      eyebrow="Free Tool · Hourly and 9-day forecast"
      h1="Weather near me"
      accent="hourly forecast and will it rain today?"
      intro="Check the weather where you are right now and for any town or city in the world: the temperature and what it feels like, wind, humidity and UV, a clear answer to whether it will rain today and from what time, an hour-by-hour forecast for the next two days and a 9-day outlook. In °C and km/h or °F and mph. Free, no signup."
      bold={['weather where you are right now', 'whether it will rain today', 'hour-by-hour forecast', '9-day outlook']}
      appDescription="Free weather forecast for your location or any place: current conditions, will it rain today, hourly forecast for 48 hours and a 9-day outlook, from MET Norway data."
      features={['Current temperature and feels-like', 'Will it rain today, and when', 'Hour-by-hour for 48 hours', '9-day forecast', '°C and km/h or °F and mph']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/air-quality', label: 'Air Quality & UV', desc: 'AQI and UV index now' },
        { href: '/sunrise-sunset', label: 'Sunrise & Sunset', desc: 'Daylight hours and golden hour' },
        { href: '/flood-warnings', label: 'Flood Warnings', desc: 'Live flood alerts (England)' },
        { href: '/sea-temperature', label: 'Sea Temperature', desc: 'Is the sea warm enough to swim?' },
      ]}
    >
      <Section title="Reading the forecast">
        <Table
          head={['Wind', 'km/h', 'mph', 'What it is like']}
          rows={[
            ['Light', 'Under 12', 'Under 8', 'Leaves rustle; smoke drifts'],
            ['Moderate', '12–28', '8–18', 'Small branches move; dust and paper lift'],
            ['Strong', '29–49', '19–31', 'Large branches sway; umbrellas hard to use'],
            ['Gale', '50–74', '32–46', 'Twigs break; walking into the wind is hard'],
            ['Storm', '75+', '47+', 'Damage to trees and buildings likely'],
          ]}
        />
        <P>
          Gusts can be half as strong again as the average wind, especially in towns and on hills. Weather symbols show the main weather for the hour or 6-hour block; &ldquo;showers&rdquo; means rain that comes and goes with dry spells, while &ldquo;rain&rdquo; means a longer spell.
        </P>
      </Section>

      <Section title="Planning around the weather">
        <UL items={[
          <><B>Outdoor plans:</B> check the hourly rain row; a dry gap of two or three hours between showers is common.</>,
          <><B>Cold mornings:</B> clear skies overnight mean a colder dawn, with frost or ice when the low is near 0 °C (32 °F).</>,
          <><B>Sun:</B> a UV index of 3 or more means sun protection; see <A href="/air-quality">air quality and UV</A> for the day&rsquo;s peak.</>,
          <><B>Stargazing and aurora:</B> look for nights with low cloud cover, and check the <A href="/northern-lights">northern lights forecast</A>.</>,
        ]} />
      </Section>
    </ToolPage>
  );
}
