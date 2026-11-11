import ToolPage, { toolMetadata, Section, P, UL, B, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/air-quality';

export const metadata = toolMetadata({
  path: PATH,
  title: 'Air Quality Near Me Today: AQI, UV Index & Pollen Count',
  description:
    'Air quality near you right now: US and European AQI, PM2.5, ozone and NO₂, today\'s UV index and the pollen count (grass, birch, ragweed), with an hourly forecast and 4-day outlook for any place.',
  keywords: ['air quality near me', 'aqi near me', 'air quality today', 'air quality index', 'uv index today', 'uv index near me', 'pollen count today', 'pollen count near me', 'pm2.5 near me', 'is the air quality bad today'],
});

const faqs = [
  {
    q: 'What is the air quality near me today?',
    a: 'Press "Air quality near me" to use your location, or search any place. The tool shows the current air quality index with what it means for outdoor activity, the main pollutants, the UV index and, in Europe, the pollen count, with an hour-by-hour forecast.',
  },
  {
    q: 'What is a good AQI?',
    a: 'On the US scale, 0 to 50 is good and 51 to 100 moderate; above 100 the air is unhealthy for sensitive groups such as people with asthma, older adults and children. On the European scale, below 40 is good or fair, 40 to 60 moderate and above 60 poor.',
  },
  {
    q: 'Why does this differ from my local monitoring station?',
    a: 'These are model forecasts for an area about 11 km across in Europe and 45 km elsewhere, not readings from one street. Next to a busy road or during a local fire, a nearby station can show worse air; in a park it can show better.',
  },
  {
    q: 'When do I need sun protection?',
    a: 'When the UV index is 3 or more. In the UK and northern Europe that is common from about April to September around the middle of the day; in Australia and New Zealand, UV is high or extreme on most summer days and can be moderate even in winter.',
  },
  {
    q: 'Why is there no pollen count for my area?',
    a: 'The pollen model covers Europe only, including the UK. Outside the season, roughly February to September, counts are usually zero. For the US and Australia, national weather services and allergy organisations publish their own pollen forecasts.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="Air Quality Near Me"
      eyebrow="Free Tool · Copernicus forecast data"
      h1="Air quality near me"
      accent="AQI, UV index and pollen count today"
      intro="See the air quality where you are right now on the US or European index, what it means for exercise and health, the levels of PM2.5, ozone and nitrogen dioxide, today's UV index and, in Europe and the UK, the pollen count for grass, trees and weeds. With an hourly forecast and a 4-day outlook for any place. Free, no signup."
      bold={['air quality where you are right now', 'PM2.5, ozone and nitrogen dioxide', "today's UV index", 'pollen count']}
      appDescription="Free air quality checker for any place: US and European AQI, pollutants, UV index and European pollen counts, with hourly and 4-day forecasts from Copernicus data."
      features={['US AQI and European AQI', 'PM2.5, PM10, NO₂, ozone, SO₂ and CO', 'UV index now and today\'s peak', 'Grass, tree and weed pollen (Europe)', 'Hourly forecast and 4-day outlook']}
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
          head={['US AQI', 'European AQI', 'Level', 'What to do']}
          rows={[
            ['0–50', '0–40', 'Good / fair', 'Enjoy the outdoors as usual'],
            ['51–100', '40–60', 'Moderate', 'Unusually sensitive people may limit long, hard exercise outside'],
            ['101–150', '60–80', 'Unhealthy for sensitive groups / poor', 'People with asthma, heart or lung disease, older adults and children should take it easier'],
            ['151–200', '80–100', 'Unhealthy / very poor', 'Everyone should cut down hard exercise outdoors'],
            ['201+', '100+', 'Very unhealthy to hazardous', 'Stay indoors with windows closed if you can'],
          ]}
        />
        <P>
          The two scales are calculated differently, so the same air can score 43 on one and 65 on the other. The tool picks the US index in the Americas and the European index elsewhere; switch between them with the buttons.
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

      <Section title="Pollen and hay fever">
        <P>
          In Europe and the UK, tree pollen (alder from late winter, birch in April and May, olive around the Mediterranean) comes first, grass pollen peaks from late May to July, and weed pollen such as ragweed and mugwort runs from late summer into autumn. Counts are highest on warm, dry, breezy days and usually lowest after rain. If you have hay fever, check the forecast in the morning, keep windows closed when counts are high, and shower and change clothes after being outside.
        </P>
      </Section>
    </ToolPage>
  );
}
