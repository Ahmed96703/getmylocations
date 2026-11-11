import ToolPage, { toolMetadata, Section, P, UL, B, A } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/crime-map';

export const metadata = toolMetadata({
  path: PATH,
  title: 'UK Crime Map by Postcode: Crime in My Area',
  description:
    'See crimes reported within a mile of any UK postcode or your location, by type, street and month, from official police.uk data. Free crime map for England, Wales and Northern Ireland.',
  keywords: ['crime map', 'uk crime map', 'crime map by postcode', 'crime in my area', 'crime rate by postcode', 'police crime map', 'crime near me', 'is my area safe', 'police.uk crime map', 'crime statistics by postcode'],
});

const faqs = [
  {
    q: 'Where does the crime data come from?',
    a: 'From data.police.uk, the official site where every police force in England, Wales and Northern Ireland publishes the crimes reported to it each month. It is the same data behind the police.uk neighbourhood pages, released under the Open Government Licence.',
  },
  {
    q: 'Why are crimes shown on the same few points?',
    a: 'To protect victims, police.uk never publishes exact addresses. Each crime is moved to the nearest of a fixed set of anonymous map points, usually the middle of a street or a landmark such as a car park or a shopping area, labelled "On or near ...". A busy point can stand for crimes from several nearby streets.',
  },
  {
    q: 'Why is the latest month two months ago?',
    a: 'Forces send their data to the Home Office once a month and it is published about two months after the month ends, so in November you will usually see September. Some forces publish late, so the newest month can be incomplete for a few weeks.',
  },
  {
    q: 'Does it cover Scotland?',
    a: 'No. Police Scotland does not publish street-level crime to police.uk, so every place in Scotland shows no crimes. Police Scotland publishes its own statistics by council area and ward.',
  },
  {
    q: 'Why does my area show no crimes at all?',
    a: 'Either the place is in Scotland, or the police force that covers it has not sent its data to police.uk for that month. The tool names the force in that case. Greater Manchester Police, for example, has not published street-level crime to police.uk for recent months, so Manchester shows none; the force website is the place to look for its figures.',
  },
  {
    q: 'Is a high number a sign that an area is dangerous?',
    a: 'Not on its own. Town centres, stations and shopping streets always show more crime because far more people pass through them, and shoplifting or anti-social behaviour make up a large share. Compare like with like: residential streets with residential streets, and look at the types of crime as well as the total.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="UK Crime Map"
      eyebrow="Free Tool · Official police.uk data"
      h1="UK crime map"
      accent="crime in my area by postcode"
      intro="See every crime reported within one mile of a UK postcode, street or your current location, by type and by street, for any of the last 12 months. The data comes from police.uk, published by every force in England, Wales and Northern Ireland. Free, no signup."
      bold={['crime reported within one mile of a UK postcode', 'by type and by street', 'police.uk']}
      appDescription="Free map of crimes reported to the police within one mile of a UK postcode or location, by category, street and month, from data.police.uk."
      features={['Crimes within one mile of a postcode or location', 'Breakdown by crime type', 'Streets with the most reports', 'Any of the last 12 months', 'England, Wales and Northern Ireland']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/whats-my-postcode', label: "What's My Postcode", desc: 'Your postcode, council and ward' },
        { href: '/radius-map', label: 'Radius Map', desc: 'Draw a mile around any place' },
        { href: '/street-view', label: 'Street View', desc: 'See the street before you visit' },
        { href: '/my-location', label: 'My Location', desc: 'Your exact position and address' },
      ]}
    >
      <Section title="How to check crime in your area">
        <UL items={[
          <><B>Press &ldquo;Crime near me&rdquo;</B> to use your location, or type a <B>postcode</B>, street or town. You can also click the map.</>,
          <><B>Pick a month</B> to see how it compares with earlier ones. The newest month is about two months ago.</>,
          <><B>Read the breakdown.</B> The list shows each type of crime with its share of the total; click one to show only that type on the map.</>,
          <><B>Check the streets list</B> to see which points have the most reports, then use <A href="/street-view">Street View</A> to see what is there, often a station, a shop or a pub.</>,
        ]} />
      </Section>

      <Section title="What the crime types mean">
        <UL items={[
          <><B>Anti-social behaviour</B>: nuisance, rowdy or inconsiderate behaviour, such as noise, littering or harassment, that is reported but is not always a crime.</>,
          <><B>Violence and sexual offences</B>: assaults from common assault upwards, harassment, and sexual offences.</>,
          <><B>Shoplifting</B> and <B>other theft</B>: theft from shops, and thefts that fit no other group, such as from a garden or workplace.</>,
          <><B>Burglary</B>: entering a home or business to steal. <B>Vehicle crime</B> is theft of or from a vehicle, or tampering with one.</>,
          <><B>Criminal damage and arson</B>, <B>public order</B>, <B>drugs</B>, <B>robbery</B>, <B>bicycle theft</B>, <B>theft from the person</B> (such as pickpocketing) and <B>possession of weapons</B> follow their everyday meaning.</>,
        ]} />
      </Section>

      <Section title="Is this area safe? Reading the numbers fairly">
        <P>
          A crime count measures where crime is reported, not how risky a place is for you. A street with a railway station or a large supermarket can show dozens of crimes a month while the houses behind it show none, because shoplifting and incidents in busy public places make up much of the total. To judge an area, compare two places of the same kind, look at several months rather than one, and look at the types: burglary and vehicle crime matter more to a resident than shoplifting in a town centre.
        </P>
        <P>
          Police force websites and the neighbourhood pages on <A href="https://www.police.uk/">police.uk</A> also show your local policing team and their current priorities.
        </P>
      </Section>

      <Section title="Report a crime">
        <P>
          In an emergency, or if a crime is happening now, call <B>999</B>. To report a crime that is not an emergency, call <B>101</B> or use your force&rsquo;s online form. To report information anonymously, contact the independent charity <A href="https://crimestoppers-uk.org/">Crimestoppers</A> on 0800 555 111.
        </P>
      </Section>
    </ToolPage>
  );
}
