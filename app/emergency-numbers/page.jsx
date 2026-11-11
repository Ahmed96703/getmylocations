import ToolPage, { toolMetadata, Section, P, UL, B, A, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';
import { NUMBERS } from './numbers.js';

const PATH = '/emergency-numbers';

export const metadata = toolMetadata({
  path: PATH,
  title: 'Emergency Numbers by Country: Police, Ambulance & Fire',
  description:
    'Emergency phone numbers for police, ambulance and fire in more than 70 countries, with the number for where you are right now and tap-to-call. 112, 911, 999, 000 and the rest explained.',
  keywords: ['emergency numbers by country', 'emergency number', 'what is the emergency number in', 'police number', 'ambulance number', 'european emergency number 112', '911 in europe', 'emergency number abroad', 'international emergency number', 'emergency services number'],
});

const names = new Intl.DisplayNames(['en'], { type: 'region' });
const rows = Object.entries(NUMBERS)
  .map(([cc, [main, police, amb, fire]]) => [names.of(cc), main || '—', police || main, amb || main, fire || main])
  .sort((a, b) => a[0].localeCompare(b[0]));

const faqs = [
  {
    q: 'Is there one international emergency number?',
    a: 'No single number works everywhere, but 112 comes closest: it works in every EU country and in many others, and most mobile phones sold in Europe treat 112 as an emergency number. In North America the number is 911.',
  },
  {
    q: 'Does 911 work in Europe, or 112 in the US?',
    a: 'In the US and Canada, dialling 112 on many mobile phones connects to 911, but this depends on the phone and the network. In Europe, 911 is not an emergency number in most countries. Learn the local number before you travel.',
  },
  {
    q: 'Can I call the emergency number without a SIM or credit?',
    a: 'In most countries, yes: mobile phones can call 112 or the local emergency number with no credit, and in many with no SIM card, using any available network. The UK and some other countries do not accept calls from phones without a SIM.',
  },
  {
    q: 'What if I cannot speak?',
    a: 'Stay on the line and make a noise, tap the phone or answer questions by pressing keys if asked. In the UK, the "Silent Solution" lets you press 55 to show the call is genuine. Several countries also accept emergency texts after a one-time registration.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="Emergency Numbers by Country"
      eyebrow="Free Tool · Tap to call"
      h1="Emergency numbers"
      accent="police, ambulance and fire, by country"
      intro="Find the emergency phone number for police, ambulance and fire in the country you are in, or any other, with one tap to call it. Covers more than 70 countries across Europe, the Americas, Asia, the Middle East, Africa and Oceania, and explains which numbers, such as 112, work across borders. Free, no signup."
      bold={['emergency phone number', 'police, ambulance and fire', 'one tap to call', '112']}
      appDescription="Free emergency numbers by country: police, ambulance and fire numbers for 70+ countries, detected from your location, with tap-to-call."
      features={['Numbers for where you are', '70+ countries', 'Police, ambulance and fire', 'Tap to call', 'Travel notes, such as tourist police']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/my-location', label: 'My Location', desc: 'Your exact location to tell responders' },
        { href: '/live-location', label: 'Live Location', desc: 'Your location right now' },
        { href: '/pharmacy-near-me', label: 'Pharmacy Near Me', desc: 'Pharmacies open now' },
        { href: '/public-holidays', label: 'Public Holidays', desc: 'Holidays by country' },
      ]}
    >
      <Section title="Emergency numbers in every country listed">
        <Table head={['Country', 'Main number', 'Police', 'Ambulance', 'Fire']} rows={rows} />
        <P>
          &ldquo;—&rdquo; means there is no single number for all services: call the one for the service you need.
        </P>
      </Section>

      <Section title="When you call">
        <UL items={[
          <><B>Say where you are first.</B> If you do not know the address, give a landmark, or read out the coordinates from <A href="/my-location">My Location</A>.</>,
          <><B>Say which service you need</B> and what has happened.</>,
          <><B>Answer the questions</B> and follow the instructions; help is often already being sent while you talk.</>,
          <><B>Do not hang up</B> until the operator tells you to.</>,
        ]} />
      </Section>
    </ToolPage>
  );
}
