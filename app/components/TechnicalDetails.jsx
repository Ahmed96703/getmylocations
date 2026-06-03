const SECTIONS = [
  {
    title: 'What the browser actually sees from your IP',
    body:
      'Your IP address is the return address the rest of the internet uses to send packets back to you. Geolocation services keep databases that map blocks of IPs to the cities the ISP that owns them serves. When the page checks your IP, what comes back is a guess based on those records — typically your country and a city that is somewhere within 25 km of you. It is not your street and it is not your name. The accuracy depends on how recently the database was refreshed and how your ISP routes traffic.',
  },
  {
    title: 'How the GPS reading is taken',
    body:
      'When you allow precise location, the browser asks the operating system for a coordinate. On a phone outdoors, the OS uses the GNSS chip — the same hardware Google Maps uses — to triangulate against satellites from the GPS, Galileo, GLONASS, and BeiDou systems. The result is usually accurate to a few meters. Indoors or on a laptop, the OS falls back to whatever it has: nearby Wi-Fi access points cross-referenced against a worldwide database, the cell tower you are connected to, or your IP. The page receives whichever the OS thinks is the best answer.',
  },
  {
    title: 'How we turn the coordinate into a place name',
    body:
      'A pair of numbers like 31.5497, 74.3436 is not very useful on its own, so the page sends them to a reverse-geocoding service that returns the matching city, region, and country. We use BigDataCloud as the first choice and OpenStreetMap Nominatim as the fallback when BigDataCloud is rate-limited. Both have their own privacy policies, which the Privacy Policy page links to. The coordinate goes out, the place name comes back, and nothing is stored on our side.',
  },
  {
    title: 'Why GPS and IP often disagree',
    body:
      'GPS measures your position from physics — time of flight from satellites whose orbits are known. IP geolocation looks up a database row. The first can be accurate to meters; the second is rarely better than the city. When the two disagree it is almost always because the IP database is stale, you are on a VPN, or your mobile carrier is routing traffic through a regional gateway in a different city. Trust the GPS reading when you have it. Treat the IP reading as a hint.',
  },
  {
    title: 'What the page does with your data',
    body:
      'The coordinate stays in your browser tab. The reverse-geocoding request sends only the coordinate to the third-party service; it does not include any identifier we control. We do not keep a database that tracks visitors. The hosting provider (Cloudflare) keeps short-lived request logs the way any web host does, and Google AdSense — once approved — sets its own cookies for advertising. The Privacy Policy spells out what each service receives.',
  },
];

export default function TechnicalDetails() {
  return (
    <section aria-labelledby="tech-details" className="mt-14">
      <h2 id="tech-details" className="font-display text-2xl font-bold">How the site works</h2>
      <p className="text-sm text-slate-400 mt-1">The mechanics behind the location reading, in plain English.</p>
      <div className="glass mt-4 rounded-2xl divide-y divide-white/5">
        {SECTIONS.map((s) => (
          <details key={s.title} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer list-none font-semibold">
              {s.title}
              <span className="text-electric-400 group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
            </summary>
            <p className="mt-3 text-slate-300/90 text-sm leading-relaxed">{s.body}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
