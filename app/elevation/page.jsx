import ToolPage, { toolMetadata, Section, P, UL, B, A, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/elevation';

export const metadata = toolMetadata({
  path: PATH,
  title: 'What Is My Elevation? Elevation Finder & Profile Map',
  description:
    'Find your elevation above sea level, or the height of any point on the map, in metres and feet. Draw a route to see its elevation profile, total climb, highest point and steepest slope. Free elevation finder.',
  keywords: ['what is my elevation', 'elevation finder', 'my elevation', 'elevation map', 'altitude of my location', 'height above sea level', 'elevation of my address', 'elevation profile', 'elevation calculator', 'how high am i above sea level'],
});

const faqs = [
  {
    q: 'What is my elevation right now?',
    a: 'Press "My elevation" and allow location access. The tool finds the height of the ground where you are, above mean sea level, in metres and feet. If your phone also reports a GPS altitude, both are shown so you can compare them.',
  },
  {
    q: 'Why is my phone\'s altitude different?',
    a: 'GPS measures height less precisely than position, often within 10 to 30 metres, and some phones report height above the mathematical ellipsoid rather than above sea level, which can differ by up to about 100 metres. Height from an elevation model, as here, is usually closer.',
  },
  {
    q: 'Why does a mountain show lower than its official height?',
    a: 'Each figure is an average over a square about 90 m across. A sharp summit is the very top of that square, so it reads lower: Ben Nevis, 1,345 m, shows about 1,290 m. For a peak\'s official height, use the national mapping agency.',
  },
  {
    q: 'How do I see the elevation along a route?',
    a: 'Choose "Elevation profile", click along the route on the map, then press "Show elevation profile". You get a height chart, the total climb and descent, the highest and lowest points marked on the map, and the steepest stretch.',
  },
  {
    q: 'Is my house at risk of flooding if it is low?',
    a: 'Height alone does not tell you. Flood risk depends on nearby rivers, the coast, drainage and defences. In England, check the official long-term flood risk service, and for current warnings use our flood warnings map.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="Elevation Finder"
      eyebrow="Free Tool · Copernicus elevation data"
      h1="What is my elevation?"
      accent="elevation finder and profile map"
      intro="Find your elevation above sea level, or the height of any address, mountain or point you click on the map, in metres and feet. Draw a walk, ride or road to see its elevation profile, the total climb and descent, the highest and lowest points and the steepest slope. Works worldwide; free, no signup."
      bold={['elevation above sea level', 'metres and feet', 'elevation profile', 'total climb and descent']}
      appDescription="Free elevation finder: height above sea level of your location or any point, and an elevation profile with climb, descent and slope along a route you draw."
      features={['Your elevation from your location', 'Height of any point you click', 'Elevation profile along a route', 'Total climb, descent and steepest slope', 'Metres or feet']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/my-location', label: 'My Location', desc: 'Your coordinates and address' },
        { href: '/area-calculator', label: 'Area Calculator', desc: 'Measure land on a map' },
        { href: '/flood-warnings', label: 'Flood Warnings', desc: 'Live flood alerts (England)' },
        { href: '/distance-calculator', label: 'Distance Calculator', desc: 'Distance between two points' },
      ]}
    >
      <Section title="How to find the elevation of a place">
        <UL items={[
          <><B>Your own elevation:</B> press &ldquo;My elevation&rdquo; and allow location.</>,
          <><B>Any place:</B> search an address, town, postcode or mountain, or just click the map.</>,
          <><B>A route:</B> switch to &ldquo;Elevation profile&rdquo;, click along the way, then show the profile.</>,
          <><B>Feet or metres:</B> tick &ldquo;Feet and miles&rdquo; to switch every figure.</>,
        ]} />
      </Section>

      <Section title="Elevation, altitude and height above sea level">
        <P>
          <B>Elevation</B> is the height of the ground above mean sea level. <B>Altitude</B> usually means the height of something above the ground or the sea, such as an aircraft. Mean sea level is an average, set by each country&rsquo;s survey (Ordnance Datum Newlyn in Great Britain, NAVD 88 in the United States), so official heights in different countries can differ by up to a metre or so.
        </P>
        <Table
          head={['Gradient', 'Rise per 100 m', 'Feels like']}
          rows={[
            ['2–3%', '2–3 m', 'A gentle slope; noticeable on a bike'],
            ['5–8%', '5–8 m', 'A steady climb on foot or by bike'],
            ['10–15%', '10–15 m', 'Steep; hard work on a bike'],
            ['20%+', '20 m or more', 'Very steep; the steepest roads in the UK reach about 30%'],
          ]}
        />
        <P>
          Planning a long walk? The total climb matters more than the highest point. A common rule of thumb for hill walking, Naismith&rsquo;s rule, allows an hour for every 5 km of distance plus an hour for every 600 m of climb. To check the weather and air before you go, see <A href="/air-quality">air quality and UV</A>.
        </P>
      </Section>
    </ToolPage>
  );
}
