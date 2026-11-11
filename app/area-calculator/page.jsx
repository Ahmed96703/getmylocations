import ToolPage, { toolMetadata, Section, P, UL, B, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/area-calculator';

export const metadata = toolMetadata({
  path: PATH,
  title: 'Area Calculator on Map: Measure Land Area in Acres & m²',
  description:
    'Measure the area of any field, plot, garden, roof or property on a satellite map: click the corners to get acres, hectares, square metres and square feet, plus the perimeter. Free land area calculator.',
  keywords: ['area calculator', 'land area calculator', 'acreage calculator', 'measure area on map', 'acre calculator', 'square footage calculator', 'how many acres is my land', 'field area calculator', 'plot area calculator', 'hectare calculator'],
});

const faqs = [
  {
    q: 'How do I measure the area of my land?',
    a: 'Search your address, zoom in close and switch to Satellite. Then click each corner of the land in order around the edge. The area appears as soon as there are three corners, in acres, hectares, square metres, square feet and more, with the perimeter.',
  },
  {
    q: 'How many square feet are in an acre?',
    a: 'One acre is 43,560 square feet, or 4,046.86 square metres, about 90% of an American football field between the end zones. A hectare is 10,000 square metres, or about 2.47 acres.',
  },
  {
    q: 'How accurate is the area?',
    a: 'The calculation itself is exact on the curved Earth; the result depends on how closely your clicks follow the real boundary. Zoomed in on satellite imagery, a field is usually within 1 to 2% of its surveyed size. Satellite images can be slightly offset, and trees can hide a boundary.',
  },
  {
    q: 'Can I measure a curved boundary?',
    a: 'Yes. Add more corners along the curve: the more points you click, the closer the shape follows it. Undo removes the last point if a click lands in the wrong place.',
  },
  {
    q: 'Can I use this for a planning application or a sale?',
    a: 'Use it to estimate. For legal purposes, the boundary on the land registry title plan or a measured survey is what counts.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="Area Calculator"
      eyebrow="Free Tool · Draw on a satellite map"
      h1="Area calculator"
      accent="measure land area on a map in acres and m²"
      intro="Measure the area of any field, plot, garden, roof, car park or property by clicking its corners on a map or satellite image. Get the size in acres, hectares, square metres, square feet, square yards and square miles, plus the perimeter. Works anywhere in the world; free, no signup."
      bold={['field, plot, garden, roof', 'satellite image', 'acres, hectares, square metres, square feet', 'perimeter']}
      appDescription="Free land area calculator: draw a shape on a map or satellite image to measure its area in acres, hectares, square metres and square feet, and its perimeter."
      features={['Draw on a street map or satellite image', 'Acres, hectares, m², sq ft, sq yd, km², sq mi', 'Perimeter in metres, feet and miles', 'Copy the area and corner coordinates', 'Warns when the sides cross']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/distance-calculator', label: 'Distance Calculator', desc: 'Distance between two points' },
        { href: '/radius-map', label: 'Radius Map', desc: 'Draw a circle of any radius' },
        { href: '/satellite', label: 'Satellite View', desc: 'Satellite imagery of any address' },
        { href: '/elevation', label: 'Elevation Finder', desc: 'Height and slope of the land' },
      ]}
    >
      <Section title="How to measure an area on the map">
        <UL items={[
          <><B>Find the place:</B> search an address or use your location, then zoom in.</>,
          <><B>Switch to Satellite</B> with the button on the map to see fences, hedges and roof edges.</>,
          <><B>Click each corner in order</B> around the edge. For a curved edge, click several points along it.</>,
          <><B>Read the area</B> in every unit, and copy the result or the corner coordinates to share.</>,
        ]} />
      </Section>

      <Section title="Area units and conversions">
        <Table
          head={['Unit', 'In square metres', 'In acres', 'Good for']}
          rows={[
            ['1 square foot', '0.0929 m²', '0.000023', 'Rooms and houses (US, UK)'],
            ['1 square metre', '1 m²', '0.000247', 'Rooms, flats, gardens'],
            ['1 acre', '4,046.86 m²', '1', 'Land and farms (US, UK)'],
            ['1 hectare', '10,000 m²', '2.471', 'Land and farms (Europe, Australia)'],
            ['1 square kilometre', '1,000,000 m²', '247.1', 'Towns, lakes, parks'],
            ['1 square mile', '2,589,988 m²', '640', 'Large estates, counties'],
          ]}
        />
        <P>
          For comparison, a football pitch is about 0.7 hectares (1.75 acres), and a tennis court is about 260 m².
        </P>
      </Section>
    </ToolPage>
  );
}
