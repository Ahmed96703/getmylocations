import ToolPage, { toolMetadata, Section, P, UL, B, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/ev-charging-near-me';

export const metadata = toolMetadata({
  path: PATH,
  title: 'EV Charging Points Near Me: Rapid & Free Chargers Map',
  description:
    'Find electric car charging points near you or any place: rapid and DC fast chargers, CCS, Type 2 and CHAdeMO connectors, power in kW, network and directions. Free map for the UK, Europe, US and Australia.',
  keywords: ['ev charging near me', 'ev charging points near me', 'electric car charging near me', 'charging stations near me', 'rapid chargers near me', 'free ev charging near me', 'tesla supercharger near me', 'ccs charger near me', 'type 2 charger near me', 'ev charger map'],
});

const faqs = [
  {
    q: 'How do I find a rapid charger near me?',
    a: 'Press "Chargers near me" and tick "Rapid / DC fast only". That keeps charging points with a CCS, CHAdeMO or Tesla connector, or a mapped power of 50 kW or more. Each result shows the connectors, the highest power mapped and the network.',
  },
  {
    q: 'Which connector does my car use?',
    a: 'Almost every new electric car in Europe, the UK and Australia charges with Type 2 on AC chargers and CCS (also called CCS2 or Combo) on rapid chargers. Older Nissan Leafs and some Mitsubishis use CHAdeMO. In North America, older cars use J1772 and CCS1, and many newer ones use the Tesla connector, now standardised as NACS.',
  },
  {
    q: 'Are the chargers free?',
    a: 'Most are not. Results marked "Free to charge" are recorded as free on OpenStreetMap, often at supermarkets, hotels or council car parks. Tick that box to show only those. Parking charges can still apply.',
  },
  {
    q: 'Does it show whether a charger is available right now?',
    a: 'No. Live availability comes from each network\'s own app. This map shows where charging points are and what they offer, from OpenStreetMap, refreshed weekly. Check the network app before a long detour.',
  },
  {
    q: 'Why is a charger I know missing?',
    a: 'It may not be on OpenStreetMap yet, as new chargers open every week. The "Details or fix" link opens the map so anyone can add or correct one.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="EV Charging Near Me"
      eyebrow="Free Tool · OpenStreetMap data"
      h1="EV charging points near me"
      accent="rapid, fast and free chargers on a map"
      intro="Find the electric car charging points within 5 km of you or any place, nearest first, with the connectors (CCS, Type 2, CHAdeMO, Tesla), the highest power in kW, the network and whether charging is free. Filter for rapid DC chargers and get driving directions in one tap. Works across the UK, Europe, North America and Australia. Free, no signup."
      bold={['electric car charging points within 5 km', 'CCS, Type 2, CHAdeMO, Tesla', 'power in kW', 'rapid DC chargers']}
      appDescription="Free map of electric vehicle charging points near your location or any place, with connector types, power, network, cost and directions, from OpenStreetMap."
      features={['Charging points within 5 km', 'Filter for rapid and DC fast chargers', 'CCS, Type 2, CHAdeMO and Tesla connectors', 'Power in kW and network name', 'Driving directions']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/driving-directions', label: 'Driving Directions', desc: 'Route and travel time' },
        { href: '/distance-calculator', label: 'Distance Calculator', desc: 'How far is it between two places' },
        { href: '/pharmacy-near-me', label: 'Pharmacy Near Me', desc: 'Nearest pharmacy and hospital' },
        { href: '/public-toilets-near-me', label: 'Public Toilets Near Me', desc: 'Toilets on your route' },
      ]}
    >
      <Section title="How to find a charging point">
        <UL items={[
          <><B>Press &ldquo;Chargers near me&rdquo;</B> and allow location, or search a town, postcode, motorway services or address.</>,
          <><B>Filter</B> for rapid DC chargers, your connector (CCS or Type 2), free charging or open now, or type a network such as Tesla or Ionity.</>,
          <><B>Check the badges</B>: connectors and how many, the highest power, number of bays and how you pay.</>,
          <><B>Press Directions</B> to drive there with Google Maps, and check the network&rsquo;s app for live availability.</>,
        ]} />
      </Section>

      <Section title="Charging speeds explained">
        <Table
          head={['Type', 'Power', 'Typical connector', 'Adds about (average car)']}
          rows={[
            ['Slow (AC)', '3 to 7 kW', 'Type 2, J1772, home wallbox', '15 to 40 km of range per hour'],
            ['Fast (AC)', '11 to 22 kW', 'Type 2', '50 to 120 km per hour, if the car accepts it'],
            ['Rapid (DC)', '50 to 100 kW', 'CCS, CHAdeMO', '10 to 80% in about 40 to 60 minutes'],
            ['Ultra-rapid (DC)', '150 kW and above', 'CCS, Tesla / NACS', '10 to 80% in about 20 to 30 minutes'],
          ]}
        />
        <P>
          The car sets the limit as well as the charger: plugging into a 350 kW charger does not help a car that accepts 50 kW. Charging also slows down above about 80%, so on a long trip two short stops are often quicker than one long one.
        </P>
      </Section>

      <Section title="Where the data comes from">
        <P>
          The charging points come from OpenStreetMap, the free map built by volunteers, read through the QLever search engine of the University of Freiburg. Connector types, power and network are shown as volunteers recorded them, so a newer charger can have less detail. Our server keeps each area&rsquo;s answer for up to a week.
        </P>
      </Section>
    </ToolPage>
  );
}
