import ToolPage, { toolMetadata, Section, P, UL, B, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/air-quality';

export const metadata = toolMetadata({
  path: PATH,
  title: 'Air Quality Near Me Today: AQI, PM2.5 & UV Index',
  description:
    'Air quality near you right now from the nearest monitoring stations: US AQI, PM2.5, PM10, ozone and NO₂ compared with WHO guidelines, plus today\'s UV index and peak, for any place.',
  keywords: ['air quality near me', 'aqi near me', 'air quality today', 'air quality index', 'uv index today', 'uv index near me', 'pm2.5 near me', 'air pollution near me', 'is the air quality bad today', 'air quality monitoring stations near me'],
});

const faqs = [
  {
    q: 'What is the air quality near me today?',
    a: 'Press "Air quality near me" to use your location, or search any place. The tool finds the monitoring stations within 25 km that reported in the last three days, shows the air quality index from the nearest one with particle readings, what it means for outdoor activity, each station\'s pollutant levels and the UV index.',
  },
  {
    q: 'What is a good AQI?',
    a: 'On the US scale, 0 to 50 is good and 51 to 100 moderate; above 100 the air is unhealthy for sensitive groups such as people with asthma, older adults and children, and above 150 it is unhealthy for everyone.',
  },
  {
    q: 'Why does this differ from my weather app?',
    a: 'Many apps show a computer model forecast for an area several kilometres across. These are measurements from real stations, so they are exact for the station\'s spot but can differ a few streets away, and the index here uses the latest hourly reading rather than a 24-hour average.',
  },
  {
    q: 'Why is there no station near me?',
    a: 'Monitoring networks are dense in cities in Europe, North America and much of Asia, and sparse in rural areas and some countries. If nothing has reported within 25 km in the last three days, the tool says so rather than guessing.',
  },
  {
    q: 'When do I need sun protection?',
    a: 'When the UV index is 3 or more. In the UK and northern Europe that is common from about April to September around the middle of the day; in Australia and New Zealand, UV is high or extreme on most summer days and can be moderate even in winter.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="Air Quality Near Me"
      eyebrow="Free Tool · Live station readings"
      h1="Air quality near me"
      accent="AQI, PM2.5 and UV index today"
      intro="See the air quality where you are right now, measured by the nearest monitoring stations: the US air quality index and what it means for exercise and health, the levels of PM2.5, PM10, ozone and nitrogen dioxide against WHO guidelines, and today's UV index. Works for any place with stations nearby; free, no signup."
      bold={['air quality where you are right now', 'nearest monitoring stations', 'PM2.5, PM10, ozone and nitrogen dioxide', "today's UV index"]}
      appDescription="Free air quality checker for any place: US AQI and pollutant readings from nearby monitoring stations, compared with WHO guidelines, plus the UV index forecast."
      features={['US AQI from the nearest station', 'PM2.5, PM10, NO₂, ozone, SO₂ and CO', 'Readings compared with WHO guidelines', 'UV index now and the next 24 hours\' peak', 'Stations on a map with distance and direction']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/sunrise-sunset', label: 'Sunrise & Sunset', desc: 'Daylight and golden hour' },
        { href: '/fire-map', label: 'Fire Map', desc: 'Wildfires and smoke sources nearby' },
        { href: '/flood-warnings', label: 'Flood Warnings', desc: 'Live flood alerts (England)' },
        { href: '/my-location', label: 'My Location', desc: 'Where you are right now' },
      ]}
    >
      <Section title="Air quality index levels">
        <Table
          head={['US AQI', 'Level', 'What to do']}
          rows={[
            ['0–50', 'Good', 'Enjoy the outdoors as usual'],
            ['51–100', 'Moderate', 'Unusually sensitive people may limit long, hard exercise outside'],
            ['101–150', 'Unhealthy for sensitive groups', 'People with asthma, heart or lung disease, older adults and children should take it easier'],
            ['151–200', 'Unhealthy', 'Everyone should cut down hard exercise outdoors'],
            ['201+', 'Very unhealthy to hazardous', 'Stay indoors with windows closed if you can'],
          ]}
        />
        <P>
          The index is worked out from PM2.5 and PM10 using the US EPA breakpoints revised in 2024, taking whichever is worse. Official indexes average particles over 24 hours, so a short spike, such as smoke from a bonfire, shows higher here than in a daily report.
        </P>
      </Section>

      <Section title="WHO air quality guidelines">
        <Table
          head={['Pollutant', 'WHO guideline', 'Main sources']}
          rows={[
            ['PM2.5', '15 µg/m³ (24-hour)', 'Traffic, wood burning, industry, wildfire smoke'],
            ['PM10', '45 µg/m³ (24-hour)', 'Dust, construction, road and brake wear'],
            ['NO₂', '25 µg/m³ (24-hour)', 'Road traffic, especially diesel'],
            ['Ozone', '100 µg/m³ (8-hour)', 'Forms in sunshine from other pollutants'],
          ]}
        />
        <P>
          The World Health Organization tightened these levels in 2021. Many cities are above them on some days even when the national index says the air is fine, so a reading above the guideline is a nudge to take it easy, not a reason for alarm.
        </P>
      </Section>

      <Section title="UV index and sun protection">
        <UL items={[
          <><B>0–2, low:</B> little risk for most people.</>,
          <><B>3–5, moderate:</B> wear sunscreen, a hat and sunglasses, and seek shade around midday.</>,
          <><B>6–7, high</B> and <B>8–10, very high:</B> SPF 30 or higher, cover up, and stay in the shade in the middle of the day.</>,
          <><B>11 and above, extreme:</B> unprotected skin can burn in minutes; avoid the midday sun.</>,
        ]} />
      </Section>

    </ToolPage>
  );
}
