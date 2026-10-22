import ToolPage, { toolMetadata, Section, P, UL, B, A, Code, Table } from '../components/ToolPage.jsx';
import Tool from './Tool.jsx';

const path = '/mac-address-lookup';
export const metadata = toolMetadata({
  path,
  title: 'MAC Address Lookup: Find the Device Manufacturer (Free)',
  description: 'Find which company made a device from its MAC address, using the official IEEE register of more than 40,000 prefixes. Spots private, randomized addresses too.',
  keywords: ['mac address lookup', 'mac vendor lookup', 'oui lookup', 'mac address manufacturer', 'who made this device', 'mac address vendor'],
});

const faqs = [
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
      appDescription="Free MAC address vendor lookup using the IEEE MA-L (OUI) register: shows the manufacturer, whether the address is unicast or multicast and universally or locally administered, and the address in colon, hyphen and dot notation."
      tool={<Tool />}
      faqs={faqs}
      related={['/ip-whois-lookup', '/ipv4-to-ipv6']}
    >
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
