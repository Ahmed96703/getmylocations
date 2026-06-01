const SECTIONS = [
  {
    title: 'How we find your IP location',
    body:
      'When you first open Get My Location, our IP geolocator inspects your network address and runs an IP-to-location lookup against an open geolocation database. This IP address location detector works for both IPv4 lookup and IPv6 — but the result is only city-level: an IP geolocator can tell you your country and likely city, plus a rough latitude and longitude, but it cannot pinpoint a street. Your internet provider lookup also reveals your ISP, but never your name.',
  },
  {
    title: 'How we find your exact GPS coordinates',
    body:
      'Our latitude longitude finder uses the browser\'s Geolocation API to access your device\'s GPS chip (on phones) or Wi-Fi triangulation (on laptops). This gives you your exact coordinates in WGS-84 decimal degrees — the same format used by Google Maps, Apple Maps, and every modern GPS tracker. We display live GPS coordinates with six decimals of precision, equivalent to about 11 cm. To convert between decimal degrees and DMS (degrees, minutes, seconds), see our upcoming decimal degrees converter and DMS to decimal coordinates tool.',
  },
  {
    title: 'How we turn coordinates into a street address',
    body:
      'Once we have your latitude and longitude, we run a reverse geocode online against OpenStreetMap and BigDataCloud to fetch your street address from GPS data. This map-my-coordinates step transforms raw numbers into "Karachi, Sindh, Pakistan" — instantly, without storing anything. The live map position you see is rendered with Leaflet so you can drop a pin GPS-style anywhere on Earth in Advanced mode. To find an address by lat long manually, switch to the Advanced tab.',
  },
  {
    title: 'GPS vs IP accuracy — which one to trust?',
    body:
      'GPS vs IP accuracy is night and day. Browser location vs GPS: GPS gives you 3–5 meters, while pure IP-based browser location can be off by 5–50 km. If you\'re asking "why is my location wrong" or "why is my IP showing wrong city", the answer is usually a VPN, mobile carrier-grade NAT, or a stale geolocation database. To enable browser location in Chrome or fix GPS not working, see the troubleshooting tips in our FAQ. A VPN and GPS location combination is the only way to fool both signals at once.',
  },
  {
    title: 'Privacy — your location never leaves your browser',
    body:
      'Get My Location is 100% client-side. Your GPS coordinates, IP address, and reverse-geocoded address are processed entirely in your browser and never stored on a server we control. If location permission denied is showing, the tool falls back to IP-only mode — useful for travelers and people verifying their VPN. You can revoke browser permission at any time from your site settings.',
  },
];

export default function TechnicalDetails() {
  return (
    <section aria-labelledby="tech-details" className="mt-14">
      <h2 id="tech-details" className="font-display text-2xl font-bold">Technical details</h2>
      <p className="text-sm text-slate-400 mt-1">How GetMyLocations finds your IP and GPS, in plain English.</p>
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
