import ToolPage, { toolMetadata, Section, P, UL, B, A, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/internet-speed-test';
export const metadata = toolMetadata({
  path,
  title: 'Internet Speed Test: Download, Upload, Ping & Jitter',
  description: 'Test your internet speed in about 20 seconds: download and upload in Mbps, ping and jitter, measured against Cloudflare’s global network. Free, no app, no signup.',
  keywords: ['internet speed test', 'speed test', 'wifi speed test', 'check internet speed', 'download speed test', 'upload speed test', 'ping test'],
});

const faqs = [
  { q: 'What is a good internet speed?', a: 'For one person, 25 Mbps download handles HD streaming and video calls. A household streaming 4K on several screens is comfortable with 100 Mbps or more. For video calls and gaming, ping under 50 ms and jitter under 10 ms matter more than raw speed.' },
  { q: 'Why is my result lower than my plan?', a: 'Plans are sold as “up to” speeds. Wi-Fi distance and walls, other devices using the connection, an old router or a busy time of day all lower the result. For the most accurate figure, test on a cable connection with other devices idle.' },
  { q: 'What are ping and jitter?', a: 'Ping is how long a tiny message takes to reach the server and come back. Jitter is how much that time varies. High jitter causes choppy calls and lag in games even on a fast connection.' },
  { q: 'Which server does the test use?', a: 'Cloudflare’s speed-test endpoints, answered by whichever of its data centers is closest to you, so the result reflects your connection rather than a distant server.' },
  { q: 'How much data does the test use?', a: 'On a fast connection up to about 250 MB, less on slower ones. On a limited mobile plan, run it only when you need to.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="Internet Speed Test"
      eyebrow="Free Tool · About 20 seconds"
      h1="Internet speed test"
      accent="how fast is your connection?"
      intro="Press Start to measure your download and upload speed in Mbps, plus ping and jitter, against Cloudflare’s nearest data center. No app, no signup, and nothing is stored."
      appDescription="Free browser-based internet speed test that measures download and upload throughput with parallel streams, plus latency and jitter, against Cloudflare's global network, and shows the visitor's IP, network and test location."
      tool={<Tool />}
      faqs={faqs}
      related={['/bytes-bits-converter', '/ip-whois-lookup']}
    >
      <Section title="What speed do you need?">
        <Table head={['Activity', 'Download per device', 'Also important']} rows={[
          ['Browsing, email, music', '5 Mbps', '—'],
          ['HD video streaming', '5–10 Mbps', '—'],
          ['4K video streaming', '25 Mbps', '—'],
          ['Video calls (HD)', '4–8 Mbps', 'Upload 3+ Mbps, low jitter'],
          ['Online gaming', '10 Mbps', 'Ping under 50 ms'],
          ['Uploading large files, live streaming', '—', 'Upload 10+ Mbps'],
        ]} />
      </Section>

      <Section title="Getting an accurate result">
        <UL items={[
          <><B>Pause other downloads</B> and streaming on the same connection.</>,
          <><B>Test close to the router,</B> or on a cable, to separate Wi-Fi problems from the line itself.</>,
          <><B>Test at different times:</B> evenings are often slower when the whole neighborhood is online.</>,
          <><B>Turn off a VPN,</B> which adds distance and overhead, unless you want to measure the VPN.</>,
        ]} />
        <P>
          Speeds are in megabits per second; file sizes are in megabytes, eight times larger. A 100 Mbps connection downloads about 12.5 MB each second. Convert any figure with the <A href="/bytes-bits-converter">bytes and bits converter</A>.
        </P>
      </Section>
    </ToolPage>
  );
}
