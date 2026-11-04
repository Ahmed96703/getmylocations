import fs from 'node:fs';
import path_ from 'node:path';
import ToolPage, { toolMetadata, Section, P, UL, OL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

// Counted at build time from the same register files the tool reads, so the
// table always matches what a lookup returns.
const OUI_DIR = path_.join(process.cwd(), 'public', 'data', 'oui');
const holders = {};
let prefixCount = 0;
for (const f of fs.readdirSync(OUI_DIR)) {
  for (const name of Object.values(JSON.parse(fs.readFileSync(path_.join(OUI_DIR, f), 'utf8')))) {
    holders[name] = (holders[name] || 0) + 1;
    prefixCount += 1;
  }
}
const top = Object.entries(holders).sort((a, b) => b[1] - a[1]).slice(0, 15);
const n = (v) => v.toLocaleString('en-US');

const path = '/mac-address-lookup';
export const metadata = toolMetadata({
  path,
  title: 'MAC Address Lookup: Find the Device Manufacturer (Free)',
  description: 'Find which company made a device from its MAC address, using the official IEEE register of more than 40,000 prefixes. Spots private, randomized addresses too.',
  keywords: ['mac address lookup', 'mac vendor lookup', 'oui lookup', 'mac address manufacturer', 'who made this device', 'mac address vendor'],
});

const faqs = [
  { q: 'Which company has the most MAC address prefixes?', a: `Apple, with ${n(holders['Apple, Inc.'])} of the ${n(prefixCount)} prefixes in the IEEE MA-L register, followed by Huawei Technologies and Cisco. Each prefix covers about 16.7 million addresses, so big makers buy new ones as they ship more devices.` },
  { q: 'What is a MAC address?', a: 'A MAC address is the hardware address of a network interface, such as a phone’s Wi-Fi or a laptop’s Ethernet port. It is six bytes, usually written as 3C:22:FB:12:34:56, and is used to deliver data on the local network.' },
  { q: 'How does a MAC lookup find the manufacturer?', a: 'The first three bytes are the Organizationally Unique Identifier (OUI), a prefix the IEEE sells to manufacturers. The tool looks that prefix up in the IEEE’s public register.' },
  { q: 'Why does it say “private” or “randomized”?', a: 'iPhones, Android phones and Windows now use a random MAC address for each Wi-Fi network to stop tracking. These addresses have the “locally administered” bit set and belong to no manufacturer, so no lookup can name the maker.' },
  { q: 'Can a MAC address locate or identify a person?', a: 'No. A MAC address never leaves the local network, so websites cannot see it, and the register only names the company that made the network chip.' },
  { q: 'How do I find my device’s MAC address?', a: 'On Windows run ipconfig /all; on a Mac hold Option and click the Wi-Fi icon; on iPhone open Settings › General › About › Wi-Fi Address; on Android open Settings › About phone › Status. For Wi-Fi, the per-network private address is shown under that network’s settings.' },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      name="MAC Address Lookup"
      eyebrow="Free Tool · Official IEEE register"
      h1="MAC address lookup"
      accent="who made this device?"
      intro="Paste a MAC address, or just its first six digits, to see the manufacturer from the IEEE register, whether the address is private (randomized), and the same address in every common format."
      bold={['MAC address', 'manufacturer from the IEEE register']}
      appDescription="Free MAC address vendor lookup using the IEEE MA-L (OUI) register: shows the manufacturer, whether the address is unicast or multicast and universally or locally administered, and the address in colon, hyphen and dot notation."
      tool={<Tool />}
      faqs={faqs}
      related={['/ip-whois-lookup', '/ipv4-to-ipv6']}
      updated="2026-11-04"
      features={['Manufacturer from the IEEE MA-L (OUI) register', 'Works with the first six digits only', 'Detects private (randomized) addresses', 'Shows unicast or multicast', 'Colon, hyphen and dot formats', 'Lookup runs in your browser']}
    >
      <Section title="What is a MAC address lookup?">
        <P>
          A MAC address lookup reads the first half of a device&rsquo;s hardware address and tells you which company made its network chip. Every Wi-Fi card, Ethernet port and Bluetooth radio gets a 48-bit MAC address, and the first 24 bits are a prefix that the <A href="https://standards.ieee.org/products-programs/regauth/">IEEE Registration Authority</A> sells to manufacturers. Matching the prefix against the IEEE&rsquo;s public register gives the maker, which is usually enough to tell what an unknown device is.
        </P>
      </Section>

      <Section title="How to read a MAC address">
        <Table head={['Part', 'Example: 3C:22:FB:12:34:56', 'Meaning']} rows={[
          ['First 3 bytes', '3C:22:FB', 'OUI: the manufacturer’s prefix'],
          ['Last 3 bytes', '12:34:56', 'Serial number chosen by the manufacturer'],
          ['2nd bit of first byte', '3C = 0011 1100 → 0', '0 = assigned by maker, 1 = local (random)'],
          ['1st bit of first byte', '3C = 0011 1100 → 0', '0 = one device, 1 = multicast group'],
        ]} />
        <P>
          A quick way to spot a private address: if the second character is <Code>2</Code>, <Code>6</Code>, <Code>A</Code> or <Code>E</Code>, as in <Code>DA:A1:19:…</Code>, the address is locally administered and will not match a manufacturer.
        </P>
      </Section>

      <Section title="Which manufacturers own the most MAC prefixes?">
        <P>
          The register the tool uses holds {n(prefixCount)} prefixes owned by {n(Object.keys(holders).length)} organizations. These are the 15 largest holders, counted from the same data:
        </P>
        <Table head={['Manufacturer (as registered)', 'Prefixes']} rows={top.map(([name, count]) => [name, n(count)])} />
        <P>
          Each prefix covers 2<sup>24</sup>, about 16.7 million, addresses. The IEEE Registration Authority itself appears because it splits some prefixes into the smaller MA-M and MA-S blocks sold to small makers. Chip makers such as Espressif and Texas Instruments rank high because their Wi-Fi chips sit inside other companies&rsquo; products, from smart plugs to thermostats.
        </P>
      </Section>

      <Section title="How to identify an unknown device on your Wi-Fi">
        <OL items={[
          <><B>Open your router&rsquo;s device list.</B> It is usually under Connected devices, DHCP clients or Attached devices in the router&rsquo;s admin page, often at <Code>192.168.1.1</Code> or <Code>192.168.0.1</Code>.</>,
          <><B>Copy the MAC address</B> of the device you do not recognize and paste it above.</>,
          <><B>Read the manufacturer</B> and compare it with what is in your home: the table below gives common matches.</>,
          <><B>Still unsure?</B> Switch suspect devices off one at a time and watch which entry disappears. If nothing matches, change your Wi-Fi password: every device then has to reconnect with the new one.</>,
        ]} />
        <Table head={['Manufacturer shown', 'Often turns out to be']} rows={[
          ['Espressif', 'A smart plug, light bulb, camera or other cheap smart-home gadget'],
          ['Amazon Technologies', 'An Echo speaker, Fire TV stick, Kindle or Ring doorbell'],
          ['Apple, Samsung, Xiaomi, OPPO, vivo', 'A phone, tablet, laptop or TV'],
          ['Sagemcom, Commscope, ZTE, Huawei', 'The router or modem from your internet provider'],
          ['Texas Instruments, Silicon Labs', 'A smart-home hub, sensor or other small connected device'],
          ['Intel, Dell, Hewlett Packard', 'A laptop, desktop or printer'],
          ['“Private address”, no maker', 'A phone or computer using a random Wi-Fi address'],
        ]} />
      </Section>

      <Section title="Why so many devices show no manufacturer">
        <P>
          Phones and computers now hide their real MAC address on Wi-Fi. iPhones and iPads use a private Wi-Fi address for each network since iOS 14, Android has randomized it by default since Android 10, and Windows offers random hardware addresses in its Wi-Fi settings. A random address has the &ldquo;locally administered&rdquo; bit set, belongs to no company, and may change when the device forgets and rejoins the network. To see the real maker, look in the device&rsquo;s own settings for its hardware address, or turn the private address off for your home network.
        </P>
      </Section>

      <Section title="Common uses">
        <UL items={[
          <><B>Unknown devices on your Wi-Fi:</B> your router lists connected MAC addresses; the maker often tells you what the device is (a TV, a printer, a smart plug).</>,
          <><B>Network troubleshooting:</B> identify devices in DHCP leases, switch tables and logs.</>,
          <><B>Inventory:</B> group devices by manufacturer.</>,
        ]} />
        <P>
          The register is the IEEE&rsquo;s public MA-L list, with more than 40,000 prefixes. Larger blocks are listed; the smaller MA-M and MA-S blocks used by some small makers are not, so a few devices show the parent prefix&rsquo;s holder or no match. For addresses on the internet rather than the local network, see the <A href="/ip-whois-lookup">IP WHOIS lookup</A>.
        </P>
      </Section>
    </ToolPage>
  );
}
