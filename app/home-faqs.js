// Shared FAQ source for the homepage.
// Used by:
//  - page.jsx (server component) to emit the FAQPage JSON-LD into the prerendered HTML.
//  - HomeClient.jsx (client component) to render the visible <details> FAQ section.
// Keep visible copy and JSON-LD in sync by editing this file only.

export const HOME_FAQS = [
  {
    q: 'How does this site know where I am?',
    a: 'When you click the location button, your browser asks the operating system for your position. The OS combines what it can: GPS satellite signals, the Wi-Fi networks visible to your device, the mobile cell you are connected to, and your IP address. It picks the most accurate answer available and hands a single coordinate back to the page. Outdoors on a phone, that is usually 3 to 5 meters. On a laptop indoors, it can be 25 meters or more.',
  },
  {
    q: 'Why is the location it shows me wrong?',
    a: 'Four common reasons. First, you might be indoors, so the OS is using Wi-Fi or IP instead of real GPS. Second, you might be on a VPN, which makes the IP fallback look like the VPN exit. Third, on mobile data the carrier sometimes routes everyone through one regional gateway, so the IP guess can be a city or two off. Fourth, you might have denied the precise location prompt earlier without realising it, which forces the page back to the IP guess.',
  },
  {
    q: 'Do you store my coordinates?',
    a: 'No. The coordinate the page reads stays inside your browser tab. The only thing we send to a third party is the coordinate itself to OpenStreetMap or BigDataCloud, so they can return the city and country name. Once you close the tab there is nothing left on our side to keep or delete.',
  },
  {
    q: 'How many decimal places do I actually need?',
    a: 'Three decimals is roughly a city block. Four is a building. Five is a parking space. Six is around 11 centimeters, which is finer than any consumer GPS chip can deliver under normal conditions. We display six because it is the standard storage format, but treat the last digit as noise.',
  },
  {
    q: 'Will this work on my laptop?',
    a: 'It will work, but accuracy drops sharply because most laptops do not have a GPS chip. Instead the OS falls back to looking up the Wi-Fi access points your laptop can see against Apple and Google databases. In a city with dense Wi-Fi coverage that gets you within about 25 meters. In a rural area with little Wi-Fi, the result might be off by several kilometers because all the OS has left is your IP address.',
  },
  {
    q: 'Does using a VPN change the result?',
    a: 'It changes the IP-based fallback completely but does not touch your real GPS reading. If you have allowed precise location, the page will still see your actual position — the VPN cannot rewrite a signal coming from a satellite. If you have denied precise location, the page will show whichever city your VPN exit is in.',
  },
  {
    q: 'My browser blocked location permanently. How do I undo that?',
    a: 'In Chrome, click the small lock icon to the left of the URL, choose Site settings, and change Location from Block to Allow. Reload the tab. Firefox and Edge work the same way. On Safari, the permission lives in Safari → Settings → Websites → Location.',
  },
  {
    q: 'Is there an ad-free version?',
    a: 'The site is supported by ads served through Google AdSense. There is no paid plan. Everything the site does — reading your location, converting coordinates, displaying the map — is free and works without an account.',
  },
];
