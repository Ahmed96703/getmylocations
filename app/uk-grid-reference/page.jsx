import ToolPage, { toolMetadata, Section, P, UL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/uk-grid-reference';

export const metadata = toolMetadata({
  path: PATH,
  title: 'OS Grid Reference Finder & Converter: Grid Ref to Lat Long',
  description:
    'Find the OS grid reference of your location or any point on the map, and convert grid references, eastings and northings to latitude and longitude and back. 6, 8 and 10-figure references for Great Britain.',
  keywords: ['grid reference finder', 'os grid reference', 'grid reference converter', 'grid ref to lat long', 'easting northing to lat long', 'convert grid reference to latitude longitude', 'my grid reference', '6 figure grid reference', 'ordnance survey grid reference', 'british national grid'],
});

const faqs = [
  {
    q: 'How do I find the grid reference of my location?',
    a: 'Press "My grid reference" and allow location access. The tool converts your phone or computer\'s GPS position to an Ordnance Survey grid reference in 10, 8, 6 and 4-figure forms. You can also click any point on the map.',
  },
  {
    q: 'How do I convert a grid reference to latitude and longitude?',
    a: 'Type or paste it, with or without spaces, for example TQ 300 803 or TQ300803, and press Convert. A shorter reference stands for a square rather than a point, so the latitude and longitude given are for the centre of that square.',
  },
  {
    q: 'What is the difference between a grid reference and easting/northing?',
    a: 'They describe the same position. Eastings and northings are full distances in metres from the grid\'s origin south-west of the Isles of Scilly. A grid reference replaces the first digit or two of each with two letters naming a 100 km square, which is shorter to write and read off a map.',
  },
  {
    q: 'How accurate is the conversion?',
    a: 'Within about 5 metres anywhere in Great Britain. The grid sits on an older datum, OSGB36, that differs from GPS by up to about 120 m, and the tool corrects for that with the Ordnance Survey\'s standard transformation. Work that needs centimetres uses the OS\'s more detailed OSTN15 model.',
  },
  {
    q: 'Does this work in Northern Ireland or Ireland?',
    a: 'No. The British National Grid covers Great Britain, the Isle of Man and the nearby islands. Northern Ireland and the Republic of Ireland use the Irish Grid and, more recently, Irish Transverse Mercator, which have different letters and origins.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="UK Grid Reference Finder"
      eyebrow="Free Tool · Ordnance Survey National Grid"
      h1="OS grid reference finder"
      accent="convert grid references to latitude and longitude"
      intro="Find the Ordnance Survey grid reference of where you are, or of any point on the map, and convert grid references, eastings and northings to GPS latitude and longitude and back. Gives 6, 8 and 10-figure references for anywhere in Great Britain. Works on your device; free, no signup."
      bold={['Ordnance Survey grid reference', 'eastings and northings', 'GPS latitude and longitude', '6, 8 and 10-figure references']}
      appDescription="Free OS grid reference finder and converter for Great Britain: your location's grid reference, and grid references or eastings and northings to WGS84 latitude and longitude and back."
      features={['Grid reference of your location', 'Grid reference to latitude and longitude', 'Easting and northing to lat long', '4, 6, 8 and 10-figure references', 'Click the map for any point']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/coordinates-converter', label: 'Coordinates Converter', desc: 'DMS, UTM, MGRS and more' },
        { href: '/whats-my-postcode', label: "What's My Postcode", desc: 'Your UK postcode and council' },
        { href: '/my-location', label: 'My Location', desc: 'Your GPS coordinates and address' },
        { href: '/crime-map', label: 'UK Crime Map', desc: 'Crime near any UK postcode' },
      ]}
    >
      <Section title="How to read a grid reference">
        <P>
          A grid reference such as <Code>NN 166 712</Code>, the summit area of Ben Nevis, has three parts. The two letters name a 100 km square. The first group of digits is the easting, read left to right along the bottom of the map; the second is the northing, read bottom to top. Always read <B>along the corridor, then up the stairs</B>.
        </P>
        <Table
          head={['Reference', 'Example', 'Pinpoints a square of']}
          rows={[
            ['4-figure', 'NN 16 71', '1 km, one grid square on an OS map'],
            ['6-figure', 'NN 166 712', '100 m, the usual reference for walkers'],
            ['8-figure', 'NN 1666 7126', '10 m, a building or a gate'],
            ['10-figure', 'NN 16667 71262', '1 m, as precise as a GPS fix'],
          ]}
        />
      </Section>

      <Section title="Eastings and northings to latitude and longitude">
        <P>
          Planning applications, surveys and many council and environmental datasets give positions as full eastings and northings, such as <Code>530080, 180337</Code> near Charing Cross. Paste both numbers into the box, separated by a comma or a space, to get the GPS latitude and longitude and the matching grid reference. These are British National Grid values, not UTM: UTM eastings and northings use a different projection and origin, and are converted on the <A href="/coordinates-converter">coordinates converter</A>.
        </P>
      </Section>

      <Section title="When grid references are used">
        <UL items={[
          <><B>Hill walking and mountain rescue:</B> giving a 6 or 8-figure grid reference tells rescuers exactly where you are on their OS map. In an emergency call 999 and ask for the police, then mountain rescue.</>,
          <><B>Ordnance Survey paper and digital maps</B>, from Explorer and Landranger sheets to OS Maps.</>,
          <><B>Planning, environmental and archaeological records</B>, which usually store positions as eastings and northings.</>,
          <><B>Scouts, Duke of Edinburgh and geography fieldwork</B>, where 4 and 6-figure references are taught first.</>,
        ]} />
      </Section>
    </ToolPage>
  );
}
