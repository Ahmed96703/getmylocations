import ToolPage, { toolMetadata, Section, P, UL, B, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/fuel-cost-calculator';

export const metadata = toolMetadata({
  path: PATH,
  title: 'Trip Fuel Cost Calculator: Petrol, Diesel & EV Journey Cost',
  description:
    'Work out the fuel cost of a car journey: enter two places for the road distance, your mpg or L/100 km and the fuel price, and see the total, the cost per mile or km and the split between passengers. Electric cars too.',
  keywords: ['fuel cost calculator', 'trip fuel cost calculator', 'petrol cost calculator', 'journey cost calculator', 'gas cost calculator', 'road trip gas calculator', 'fuel cost for a journey', 'mpg calculator', 'ev charging cost calculator', 'how much will my trip cost in fuel'],
});

const faqs = [
  {
    q: 'How do I work out the fuel cost of a journey?',
    a: 'Divide the distance by your car\'s fuel economy to get the fuel used, then multiply by the fuel price. For 300 km at 6.5 L/100 km and 1.70 a litre: 300 × 6.5 ÷ 100 = 19.5 litres, × 1.70 = 33.15. The calculator does this for you, with the road distance found from two places.',
  },
  {
    q: 'Is a UK gallon the same as a US gallon?',
    a: 'No. A UK (imperial) gallon is 4.546 litres and a US gallon is 3.785 litres, so the same car does about 20% more miles per gallon in UK figures. 40 mpg (UK) equals about 33 mpg (US) and 7.1 L/100 km. Choose the right unit in the calculator.',
  },
  {
    q: 'How do I find my car\'s real fuel economy?',
    a: 'Fill the tank, reset the trip counter, drive normally, then fill up again. Divide the distance driven by the litres or gallons you put in. The figure on the car\'s dashboard is a good guide but is often a little optimistic.',
  },
  {
    q: 'How much does it cost to charge an electric car for a trip?',
    a: 'Switch to "Electric", enter the car\'s efficiency (shown on the dashboard in miles/kWh or kWh/100 km) and the price per kWh. Charging at home is usually far cheaper than at rapid public chargers, so use the price you will actually pay.',
  },
  {
    q: 'How should we split fuel costs for a car share?',
    a: 'A common way is to divide the fuel cost evenly between everyone in the car, including the driver; set "People sharing". Some groups also add a little for wear, parking or tolls, which the calculator does not include.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="Trip Fuel Cost Calculator"
      eyebrow="Free Tool · Road distance included"
      h1="Trip fuel cost calculator"
      accent="what will this journey cost in fuel?"
      intro="Find out how much a car journey will cost in petrol, diesel or electricity. Enter where you start and where you are going for the road distance and driving time, add your car's fuel economy in mpg (UK or US), L/100 km or km/L and the price you pay, and see the total for one way or a return trip, the cost per mile or kilometre and each person's share. Free, no signup."
      bold={['how much a car journey will cost', 'road distance', 'mpg (UK or US), L/100 km', "each person's share"]}
      appDescription="Free trip fuel cost calculator: road distance between two places, fuel or electricity used and total cost, cost per mile or km, return trips and cost per person."
      features={['Road distance and driving time', 'mpg (UK and US), L/100 km, km/L', 'Price per litre or gallon, any currency', 'Electric cars: kWh and price per kWh', 'Return trip and split per person']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/distance-calculator', label: 'Distance Calculator', desc: 'Straight-line distance' },
        { href: '/ev-charging-near-me', label: 'EV Charging Near Me', desc: 'Charging points on the way' },
        { href: '/currency-converter', label: 'Currency Converter', desc: 'Fuel prices abroad' },
        { href: '/weather', label: 'Weather Near Me', desc: 'Forecast for the drive' },
      ]}
    >
      <Section title="Fuel economy conversions">
        <Table
          head={['L/100 km', 'mpg (UK)', 'mpg (US)', 'km/L']}
          rows={[
            ['4.0', '70.6', '58.8', '25.0'],
            ['5.0', '56.5', '47.0', '20.0'],
            ['6.0', '47.1', '39.2', '16.7'],
            ['7.0', '40.4', '33.6', '14.3'],
            ['8.0', '35.3', '29.4', '12.5'],
            ['10.0', '28.2', '23.5', '10.0'],
            ['12.0', '23.5', '19.6', '8.3'],
          ]}
        />
        <P>
          Lower L/100 km is better; higher mpg and km/L are better. To convert, mpg (UK) = 282.5 ÷ L/100 km, and mpg (US) = 235.2 ÷ L/100 km.
        </P>
      </Section>

      <Section title="Ways to spend less on fuel">
        <UL items={[
          <><B>Drive smoothly:</B> gentle acceleration and braking can save a noticeable share of fuel.</>,
          <><B>Slow down a little:</B> on motorways, fuel use rises quickly above about 90 km/h (55 mph).</>,
          <><B>Check the tyres:</B> under-inflated tyres increase rolling resistance.</>,
          <><B>Lose the weight and drag:</B> empty roof boxes and bike racks when you are not using them.</>,
          <><B>Fill up off the motorway:</B> fuel at motorway services usually costs more.</>,
        ]} />
      </Section>
    </ToolPage>
  );
}
