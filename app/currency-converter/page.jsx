import ToolPage, { toolMetadata, Section, P, UL, B } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/currency-converter';

export const metadata = toolMetadata({
  path: PATH,
  title: 'Currency Converter: Today\'s Exchange Rates for 160+ Currencies',
  description:
    'Free currency converter with today\'s exchange rates for more than 160 currencies: US dollar, euro, pound, rouble, rupee, yen and more. Convert any amount and see a quick table of common amounts both ways.',
  keywords: ['currency converter', 'exchange rate today', 'currency exchange rates', 'dollar to euro', 'euro to dollar', 'pound to euro', 'usd to rub', 'dollar to rupee', 'money converter', 'convert currency'],
});

const faqs = [
  {
    q: 'How do I convert currency?',
    a: 'Type the amount, choose the currency you have in "From" and the one you want in "To". The result updates as you type. Press ⇄ to swap the two, and use the tables below for common amounts in both directions.',
  },
  {
    q: 'How often are the rates updated?',
    a: 'Once a day. The time of the last update is shown under the converter. Exchange rates move all day while markets are open, so treat the figures as a daily reference rather than a live trading price.',
  },
  {
    q: 'Why does my bank give a different rate?',
    a: 'This converter shows the mid-market rate, halfway between the buying and selling prices. Banks, card providers and exchange offices add a margin or a fee, often 1 to 5% and more at airports, so you receive less than the mid-market amount.',
  },
  {
    q: 'Is it better to pay in the local currency abroad?',
    a: 'Usually yes. When a card machine or cash machine abroad offers to charge you in your home currency, the conversion rate it uses is often worse than your own card\'s. Choosing the local currency lets your card provider convert it instead.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="Currency Converter"
      eyebrow="Free Tool · Updated daily"
      h1="Currency converter"
      accent="today's exchange rates"
      intro="Convert between more than 160 currencies at today's mid-market exchange rates: US dollars, euros, British pounds, Russian roubles, Indian and Pakistani rupees, Japanese yen, UAE dirhams and every other currency in use. Type any amount, swap with one tap, and see a ready-made table of common amounts in both directions. Free, no signup."
      bold={['more than 160 currencies', "today's mid-market exchange rates", 'table of common amounts']}
      appDescription="Free currency converter for 160+ currencies with daily mid-market exchange rates, swap button and conversion tables for common amounts."
      features={['160+ currencies', 'Daily mid-market rates', 'Instant conversion as you type', 'Tables of common amounts both ways', 'Starts with your local currency']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/time-difference', label: 'Time Difference', desc: 'Time zones for travel' },
        { href: '/public-holidays', label: 'Public Holidays', desc: 'Holidays by country' },
        { href: '/emergency-numbers', label: 'Emergency Numbers', desc: 'Police and ambulance abroad' },
        { href: '/fuel-cost-calculator', label: 'Fuel Cost Calculator', desc: 'Cost of a road trip' },
      ]}
    >
      <Section title="Getting the best exchange rate">
        <UL items={[
          <><B>Compare with the mid-market rate:</B> the closer an offer is to the rate shown here, the smaller the hidden margin.</>,
          <><B>Avoid airport and hotel exchange desks,</B> which usually have the widest margins.</>,
          <><B>Pay in the local currency</B> when a card machine abroad asks.</>,
          <><B>Check your card&rsquo;s foreign transaction fee;</B> some cards charge none.</>,
          <><B>Take out larger sums less often</B> if your bank charges a fixed fee per cash withdrawal abroad.</>,
        ]} />
      </Section>

      <Section title="Currency codes">
        <P>
          Every currency has a three-letter ISO 4217 code: usually the two-letter country code plus the first letter of the currency&rsquo;s name, as in USD (US dollar), GBP (Great Britain pound), JPY (Japanese yen) and RUB (Russian rouble). The euro, shared by 21 European Union countries, is EUR.
        </P>
      </Section>
    </ToolPage>
  );
}
