import ToolPage, { toolMetadata, Section, P, UL, B, A, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/internet-speed-test';
export const metadata = toolMetadata({
  path,
  title: 'Internet Speed Test: Free WiFi & Net Speed Test (Mbps)',
  description: 'Free internet speed test: check your WiFi, broadband, DSL, fiber or 5G download and upload speed in Mbps, plus ping and jitter. No app, no signup.',
  keywords: [
    'internet speed test', 'speed test', 'net speed test', 'wifi speed test', 'dsl speed test', 'ookla speed test',
    'broadband speed test', 'check internet speed', 'internet speed checker', 'download speed test', 'upload speed test',
    'ping test', 'jitter test', 'mobile speed test', '5g speed test', 'fiber speed test', 'cable speed test',
    'bandwidth test', 'mbps test', 'speedtest',
  ],
  image: '/images/og-internet-speed-test.png',
});

const faqs = [
  { q: 'What is a good internet speed?', a: 'For one person, 25 Mbps download covers any single activity in the FCC’s speed guide, including 4K streaming. A household streaming 4K on several screens is comfortable with 100 Mbps or more. For video calls and gaming, ping under 50 ms and jitter under 10 ms matter more than raw speed.' },
  { q: 'How do I run a WiFi speed test?', a: 'Connect your phone or laptop to the WiFi network, stay in the room you want to check and press Start. Run it again next to the router: if that result is much faster, the line is fine and the WiFi signal is what slows you down.' },
  { q: 'Is this the same as the Ookla speed test?', a: 'No. Speedtest by Ookla is a separate service with its own servers. This net speed test measures the same things (download, upload, ping and jitter) against Cloudflare’s network, so results are usually close but not identical. Testing on both is a good way to confirm a slow result.' },
  { q: 'Does it work as a DSL, cable, fiber or 5G speed test?', a: 'Yes. The test measures whatever connection your device is using, so it works as a DSL speed test, a cable or fiber broadband speed test, or a mobile 4G and 5G speed test, on any provider.' },
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
      eyebrow="Free Speed Test · About 20 seconds"
      h1="Internet Speed Test"
      intro="Press Start to check internet speed: download and upload in Mbps, plus ping and jitter, measured against Cloudflare’s nearest data center. A free speed test for WiFi, broadband, DSL, fiber and mobile 5G, with no app, no signup and nothing stored."
      bold={['check internet speed', 'download and upload in Mbps', 'ping and jitter', 'free speed test']}
      appDescription="Free browser-based internet speed test (net speed test and WiFi speed test) that measures download and upload throughput with parallel streams, plus latency and jitter, against Cloudflare's global network, for WiFi, DSL, cable, fiber and mobile connections, and shows the visitor's IP, network and test location."
      tool={<Tool />}
      faqs={faqs}
      related={['/bytes-bits-converter', '/ip-whois-lookup', '/website-server-checker', '/dns-lookup']}
      updated="2026-11-02"
      image="/images/og-internet-speed-test.png"
      features={['Download speed in Mbps', 'Upload speed in Mbps', 'Ping (latency)', 'Jitter', 'Shows your IP, network and test location', 'Works on WiFi, DSL, cable, fiber and 5G']}
    >
      <Section title="What is an internet speed test?">
        <P>
          An <B>internet speed test</B> measures how fast your connection moves data: download and upload speed in megabits per second (Mbps), plus ping and jitter in milliseconds. It sends and receives test data from a nearby server and times it, so the result reflects your WiFi, router and provider together.
        </P>
        <P>
          This one runs four checks, one after another, and shows each result live:
        </P>
        <UL items={[
          <><B>Download speed</B> (Mbps): how fast data reaches you. It decides how quickly pages load and whether video streams in HD or 4K.</>,
          <><B>Upload speed</B> (Mbps): how fast you send data. It matters for video calls, cloud backups and live streaming.</>,
          <><B>Ping</B> (ms): the round trip to the server. Lower is better for gaming and calls.</>,
          <><B>Jitter</B> (ms): how much ping varies. Steady, low jitter keeps calls smooth.</>,
        ]} />
        <P>
          Several parallel streams fill the connection the way a real download does, so the figure reflects your line rather than a single slow request. The test data comes from <A href="https://speed.cloudflare.com/">Cloudflare’s speed test</A> endpoints, answered by its data center nearest to you. It works as a <B>download speed test</B>, <B>upload speed test</B>, <B>ping test</B> and <B>jitter test</B> in one, and as a <B>broadband speed test</B>, a <B>bandwidth test</B> and a quick <B>internet speed checker</B>.
        </P>
      </Section>

      <Section title="What speed do you need?">
        <P>
          Most activities need far less than people expect: the FCC puts 4K streaming, the most demanding one, at 25 Mbps download, and HD video at 5–8 Mbps. Add these figures up for everything your household does at the same time.
        </P>
        <Table head={['Activity', 'FCC minimum download', 'Also important']} rows={[
          ['Browsing, email, social media', '1 Mbps', '—'],
          ['HD video streaming', '5–8 Mbps', 'Netflix asks for 5 Mbps for 1080p'],
          ['4K video streaming', '25 Mbps', 'Netflix asks for 15 Mbps for 4K'],
          ['HD video conferencing', '6 Mbps', 'Steady upload and low jitter'],
          ['Online multiplayer gaming', '4 Mbps', 'Ping under 50 ms'],
          ['File downloading', '10 Mbps', '—'],
          ['Working from home', '5–25 Mbps', 'Upload matters for calls and cloud files'],
        ]} />
        <P>
          Sources: the FCC’s <A href="https://www.fcc.gov/consumers/guides/broadband-speed-guide">Broadband Speed Guide</A> (one activity at a time) and Netflix’s <A href="https://help.netflix.com/en/node/306">internet speed recommendations</A>. The ping figure is a common gaming rule of thumb, not an FCC number.
        </P>
      </Section>

      <Section title="WiFi speed test: is it the WiFi or the line?">
        <P>
          A <B>WiFi speed test</B> measures the whole path: your device, the wireless signal, the router and the line from your provider. To find where speed is lost:
        </P>
        <UL items={[
          <><B>Test next to the router,</B> then in the room where things feel slow. A big drop points to the WiFi signal, not the line.</>,
          <><B>Test on a cable</B> if your laptop has an Ethernet port. That result is the true speed of your connection.</>,
          <><B>Try the 5 GHz band</B> (or 6 GHz on newer routers). It is much faster than 2.4 GHz at short range.</>,
          <><B>Restart the router</B> and test again. It clears a surprising number of slowdowns.</>,
        ]} />
        <figure className="mt-4">
          <img
            src="/images/internet-speed-test-path.svg"
            width={800}
            height={300}
            loading="lazy"
            alt="A speed test times the whole path: your device, the WiFi link, your router, your provider's line and Cloudflare's nearest data center. Testing on a cable or next to the router removes the WiFi step."
            className="w-full h-auto rounded-xl ring-1 ring-line"
          />
          <figcaption className="mt-2 text-sm text-fg-subtle">The slowest step on the path sets your result.</figcaption>
        </figure>
      </Section>

      <Section title="DSL, cable, fiber and 5G speed tests: what speed is normal?">
        <P>
          The same <B>net speed test</B> works on any kind of connection and any provider. What counts as a normal result depends on the technology:
        </P>
        <Table head={['Connection', 'Typical download', 'Typical upload', 'Notes']} rows={[
          ['DSL / ADSL / VDSL', '5–100 Mbps', '1–20 Mbps', 'Slower the farther you are from the exchange'],
          ['Cable', '100–1,000 Mbps', '10–50 Mbps', 'Evenings can be slower on busy networks'],
          ['Fiber (FTTH)', '300–2,000+ Mbps', 'Often equal to download', 'Lowest ping and jitter'],
          ['Mobile 4G', '10–60 Mbps', '5–20 Mbps', 'Varies with signal and crowds'],
          ['Mobile 5G', '100–1,000 Mbps', '10–100 Mbps', 'Best near a mid-band or mmWave mast'],
          ['Satellite', '25–250 Mbps', '5–30 Mbps', 'High ping on older geostationary services'],
        ]} />
        <P>
          A <B>DSL speed test</B> often shows a much lower upload than download: that is how DSL is built, not a fault. A <B>fiber speed test</B> often shows upload almost as fast as download, while a <B>cable speed test</B> usually shows a much lower upload. For a <B>mobile speed test</B> or <B>5G speed test</B>, switch off WiFi first so the phone uses the mobile network.
        </P>
      </Section>

      <Section title="How do you get an accurate speed test result?">
        <UL items={[
          <><B>Pause other downloads</B> and streaming on the same connection.</>,
          <><B>Test close to the router,</B> or on a cable, to separate Wi-Fi problems from the line itself.</>,
          <><B>Test at different times:</B> evenings are often slower when the whole neighborhood is online.</>,
          <><B>Turn off a VPN,</B> which adds distance and overhead, unless you want to measure the VPN.</>,
          <><B>Close other browser tabs,</B> especially video and cloud sync, before you press Start.</>,
          <><B>Let the page finish loading</B> before you press Start, so nothing else on the page is still downloading while you test.</>,
        ]} />
        <P>
          Speeds are in megabits per second; file sizes are in megabytes, eight times larger. A 100 Mbps connection downloads about 12.5 MB each second. Convert any figure with the <A href="/bytes-bits-converter">bytes and bits converter</A>.
        </P>
      </Section>

      <Section title="How does it compare with the Ookla speed test?">
        <P>
          Many people know the <B>Ookla speed test</B> (Speedtest.net). It and this test measure the same four numbers, but they use different server networks, so results can differ by a few percent:
        </P>
        <Table head={['', 'This speed test', 'Ookla Speedtest']} rows={[
          ['Servers', 'Cloudflare’s nearest data center', 'Choice of thousands of hosted servers'],
          ['Measures', 'Download, upload, ping, jitter', 'Download, upload, ping, jitter'],
          ['Needs an app', 'No, runs in the browser', 'Browser or app'],
          ['Signup', 'None', 'None for basic tests'],
          ['Extra info', 'Your IP, network and test location', 'Provider and server name'],
        ]} />
        <P>
          If one <B>speed test</B> shows a slow result, run another to confirm before contacting your provider. Two low results from different networks point to your connection, not the test.
        </P>
      </Section>

      <Section title="Speed test slow? What to try next">
        <UL items={[
          <><B>Compare with your plan.</B> Getting 80–90% of the advertised speed on a cable is normal. Run the internet speed test two or three times before you judge.</>,
          <><B>Check for many devices</B> sharing the connection: phones updating apps, TVs streaming, cloud backups.</>,
          <><B>Update the router firmware,</B> or replace a router older than about five years.</>,
          <><B>Record a few results</B> at different times. A screenshot of repeated slow tests is the best evidence for your provider.</>,
          <><B>High ping but good speed?</B> Check whether the server you use is far away; see where an address is with the <A href="/ip-whois-lookup">IP WHOIS lookup</A>.</>,
        ]} />
      </Section>
    </ToolPage>
  );
}
