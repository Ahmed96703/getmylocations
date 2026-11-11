import ToolPage, { toolMetadata, Section, P, UL, B, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const PATH = '/northern-lights';

export const metadata = toolMetadata({
  path: PATH,
  title: 'Northern Lights Forecast Tonight: Aurora Map & Kp Index',
  description:
    'Can you see the northern lights tonight? Live aurora forecast map, the chance of aurora overhead and within view of your town, when it gets dark, and the Kp index forecast for the next 3 days. Southern lights too.',
  keywords: ['northern lights forecast', 'aurora forecast', 'northern lights tonight', 'can i see the northern lights tonight', 'aurora borealis forecast', 'northern lights near me', 'kp index', 'kp index forecast', 'aurora map', 'southern lights forecast'],
});

const faqs = [
  {
    q: 'Can I see the northern lights tonight?',
    a: 'Press "Aurora near me" or search your town. The tool shows the chance of aurora overhead, the strongest aurora within about 800 km (which can be seen low on the horizon), and whether it is dark enough. You also need a clear sky, so check the cloud forecast.',
  },
  {
    q: 'What Kp do I need to see the aurora?',
    a: 'In northern Norway, Iceland, Finland and Alaska, Kp 2 or 3 is often enough on a dark, clear night. Around Kp 5, a minor storm, the aurora can often be seen from Scotland, southern Scandinavia, the Baltic states and the northern US. Kp 7 or more can bring it much further south, as in May and October 2024.',
  },
  {
    q: 'What time is best to see the northern lights?',
    a: 'Usually within an hour or two either side of local midnight, but displays can happen any time it is dark. They often come in bursts of 10 to 30 minutes, so stay out for a while.',
  },
  {
    q: 'Why do photos show more colour than my eyes?',
    a: 'In dim light the eye sees little colour, so a faint aurora can look like a grey-white cloud. A phone in night mode or a camera on a few seconds\' exposure collects more light and shows the green and red clearly.',
  },
  {
    q: 'How accurate is the aurora forecast?',
    a: 'The map is a short-term forecast, 30 to 90 minutes ahead, based on solar wind measured by spacecraft between the Earth and the Sun. The 3-day Kp forecast is less certain, because the timing and strength of solar storms are hard to predict until they arrive.',
  },
];

export default function Page() {
  return (
    <ToolPage
      path={PATH}
      name="Northern Lights Forecast"
      eyebrow="Free Tool · Live NOAA aurora data"
      h1="Northern lights forecast"
      accent="can you see the aurora tonight?"
      intro="See where the northern lights (aurora borealis) and southern lights (aurora australis) are forecast right now on a live map, the chance of aurora overhead and within view of your town, when it gets dark enough, and the Kp index forecast for the next 3 days. Updated about every 5 minutes from NOAA. Free, no signup."
      bold={['northern lights', 'live map', 'chance of aurora overhead', 'Kp index forecast']}
      appDescription="Free northern lights forecast: live aurora map, chance of aurora at your location, darkness check and the 3-day Kp index forecast, from NOAA space weather data."
      features={['Live aurora map, both hemispheres', 'Chance overhead and within view', 'When it gets dark enough', 'Kp index forecast for 3 days', 'Storm level (G1 to G5)']}
      tool={<Tool />}
      faqs={faqs}
      related={[
        { href: '/moon-phase', label: 'Moon Phase', desc: 'A bright moon washes out faint aurora' },
        { href: '/weather', label: 'Weather Near Me', desc: 'Cloud and rain forecast' },
        { href: '/iss-tracker', label: 'ISS Tracker', desc: 'Spot the space station' },
        { href: '/sunrise-sunset', label: 'Sunrise & Sunset', desc: 'Twilight times' },
      ]}
    >
      <Section title="Kp index and where the aurora can be seen">
        <Table
          head={['Kp', 'Level', 'Often seen from']}
          rows={[
            ['0–2', 'Quiet', 'Arctic Norway, Iceland, northern Finland and Sweden, Alaska, northern Canada'],
            ['3–4', 'Unsettled to active', 'Also the Faroes, Shetland, central Scandinavia, southern Alaska'],
            ['5 (G1)', 'Minor storm', 'Scotland, southern Norway and Sweden, the Baltic states, the northern US states, Tasmania'],
            ['6–7 (G2–G3)', 'Moderate to strong storm', 'Northern England, Ireland, Denmark, Germany\'s north, northern Poland, New Zealand\'s South Island'],
            ['8–9 (G4–G5)', 'Severe to extreme storm', 'Much of Europe and the US; in May 2024 it was photographed as far south as Spain and Florida'],
          ]}
        />
        <P>
          These are rough guides for a dark, clear night. The aurora sits in an oval around each magnetic pole, which is offset towards Canada in the north, so Alaska and Canada see it further south than Europe at the same Kp.
        </P>
      </Section>

      <Section title="Tips for seeing the northern lights">
        <UL items={[
          <><B>Get away from lights.</B> Even a small town&rsquo;s glow hides a faint aurora; a dark spot 20 minutes out of town makes a big difference.</>,
          <><B>Look towards the pole:</B> north in the northern hemisphere, south in the southern.</>,
          <><B>Check clouds and the moon.</B> Clear skies are essential, and a full moon washes out faint displays.</>,
          <><B>Be patient.</B> Activity comes and goes; give it at least an hour, and let your eyes adjust for 15 minutes without a phone screen.</>,
          <><B>Use your camera.</B> Night mode often shows aurora before you can see it.</>,
        ]} />
      </Section>
    </ToolPage>
  );
}
