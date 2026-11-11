import ToolPage, { toolMetadata, Section, P, UL, B, A, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/earthquakes-near-me';

export const metadata = toolMetadata({
  path: PATH,
  title: 'Earthquakes Near Me Today: Live Recent Earthquake Map',
  description:
    'See the latest earthquakes near you or any place in the world: magnitude, distance, depth and time, on a live map from USGS and GeoNet. Earthquake today, past 7 and 30 days.',
  keywords: ['earthquakes near me', 'earthquake near me today', 'recent earthquakes', 'earthquake today', 'latest earthquakes', 'earthquake map', 'was there an earthquake just now', 'earthquake nz', 'earthquake california today', 'live earthquake map'],
});

const faqs = [
  {
    q: 'Was there an earthquake near me just now?',
    a: 'Press "Earthquakes near me" with the period set to the past 24 hours. Quakes usually appear within a few minutes in the United States and New Zealand, and within about 20 minutes elsewhere. If you felt shaking and nothing is listed yet, wait a few minutes and search again; it may also have been a passing truck or a blast.',
  },
  {
    q: 'Where does the data come from?',
    a: 'From the US Geological Survey (USGS) catalogue, which collects earthquakes from networks worldwide, and for places in New Zealand also from GeoNet, which lists the small local quakes the worldwide catalogue leaves out. Both are free public services.',
  },
  {
    q: 'Why are small earthquakes missing in my country?',
    a: 'The worldwide catalogue records every quake down to about magnitude 2.5 in the United States, but in most other countries only from about magnitude 4 to 4.5 upwards. Smaller quakes are recorded by national agencies, such as the British Geological Survey in the UK or Geoscience Australia.',
  },
  {
    q: 'What does the magnitude number mean?',
    a: 'Magnitude measures the energy released at the source. Each whole step is about 32 times more energy, so a magnitude 6 releases about 1,000 times the energy of a magnitude 4. How strongly you feel it also depends on how far away and how deep it was, and on the ground under you.',
  },
  {
    q: 'Can this tool warn me before an earthquake?',
    a: 'No. It lists earthquakes that have already happened. Nobody can predict earthquakes. Some regions have early-warning systems that give seconds of notice once shaking has started, such as ShakeAlert on the US West Coast, delivered through phone alerts.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="Earthquakes Near Me"
      eyebrow="Free Tool · Live USGS & GeoNet data"
      h1="Earthquakes near me"
      accent="recent earthquakes today on a live map"
      intro="See every recent earthquake within up to 1,000 km of you or any place: magnitude, distance and direction, depth and time, on a live map. Works worldwide, from California and Alaska to Japan, Turkey, Italy and New Zealand, with data from USGS and GeoNet. Free, no signup."
      bold={['recent earthquake', 'magnitude, distance and direction', 'live map', 'USGS and GeoNet']}
      appDescription="Free live map of recent earthquakes near your location or any place, with magnitude, distance, depth and time, from the USGS and GeoNet catalogues."
      features={['Earthquakes in the past 24 hours, 7 or 30 days', 'Search radius from 100 to 1,000 km', 'Magnitude, depth, distance and direction', 'Largest, nearest and latest at a glance', 'Small New Zealand quakes from GeoNet']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/my-location', label: 'My Location', desc: 'Your exact position and address' },
        { href: '/radius-map', label: 'Radius Map', desc: 'Draw a radius around any place' },
        { href: '/distance-calculator', label: 'Distance Calculator', desc: 'How far is it between two places' },
        { href: '/maps', label: 'World Map', desc: 'Explore any place on the map' },
      ]}
    >
      <Section title="How to check for earthquakes near you">
        <UL items={[
          <><B>Press &ldquo;Earthquakes near me&rdquo;</B> and allow location access, or search for any city or region. You can also click the map.</>,
          <><B>Set the radius, period and smallest magnitude.</B> For &ldquo;was that an earthquake?&rdquo;, choose the past 24 hours; for the activity in a region, 30 days and 500 km.</>,
          <><B>Read the summary</B>: the largest, nearest and most recent quakes, each with distance and compass direction from you.</>,
          <><B>Open a quake</B> to see it on the map, or follow the link to its USGS or GeoNet page for shaking reports and maps.</>,
        ]} />
      </Section>

      <Section title="The magnitude scale">
        <Table
          head={['Magnitude', 'Class', 'What people usually notice near the epicentre']}
          rows={[
            ['Below 3', 'Micro and minor', 'Recorded by instruments; rarely felt'],
            ['3 to 3.9', 'Minor', 'Often felt indoors, like a passing truck; no damage'],
            ['4 to 4.9', 'Light', 'Felt by most people nearby; rattling windows and dishes'],
            ['5 to 5.9', 'Moderate', 'Can damage weak buildings close to the epicentre'],
            ['6 to 6.9', 'Strong', 'Damage over tens of kilometres in populated areas'],
            ['7 and above', 'Major', 'Serious damage over large areas; possible tsunami at sea'],
          ]}
        />
        <P>
          Depth matters as much as size. A shallow magnitude 5 under a town is felt far more strongly than a magnitude 6 that is 300 km deep. That is why the tool shows the depth of each quake.
        </P>
      </Section>

      <Section title="What to do in an earthquake">
        <P>
          <B>Drop, cover and hold on.</B> Drop to your hands and knees, take cover under a sturdy table or against an inside wall away from windows, and hold on until the shaking stops. Do not run outside during the shaking. If you are near the coast and the shaking is long or strong, move to high ground at once without waiting for an official warning.
        </P>
        <UL items={[
          <><B>United States:</B> <A href="https://earthquake.usgs.gov/">USGS</A> earthquake pages and the &ldquo;Did You Feel It?&rdquo; reports; on the West Coast, ShakeAlert warnings arrive as phone alerts.</>,
          <><B>New Zealand:</B> <A href="https://www.geonet.org.nz/">GeoNet</A> for quakes and the &ldquo;Felt it?&rdquo; report, and <A href="https://getready.govt.nz/">Get Ready</A> from Civil Defence for what to do.</>,
          <><B>Australia:</B> <A href="https://earthquakes.ga.gov.au/">Geoscience Australia</A> lists Australian quakes and takes felt reports.</>,
          <><B>United Kingdom:</B> the <A href="https://www.earthquakes.bgs.ac.uk/">British Geological Survey</A> records the small quakes felt across Britain.</>,
        ]} />
      </Section>

      <Section title="Where earthquakes happen">
        <P>
          Most earthquakes happen along the edges of the tectonic plates, above all around the Pacific &ldquo;Ring of Fire&rdquo;: Japan, Indonesia, the Philippines, New Zealand, Chile, Alaska and California. The belt from the Mediterranean through Turkey and Iran to the Himalayas is the other busy zone. Places far from plate edges, such as Britain or eastern Australia, still have small quakes, but rarely damaging ones.
        </P>
      </Section>
    </ToolPage>
  );
}
