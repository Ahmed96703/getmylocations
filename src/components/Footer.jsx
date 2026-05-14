import { Link } from 'react-router-dom';

const YEAR = new Date().getFullYear();

const SITE_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms' },
];

// Quick links — keyword-rich internal anchors grouped by topic cluster.
// Anchor links go to relevant sections of the home page or blog posts.
const QUICK_LINKS = [
  {
    heading: 'GPS & Coordinates',
    links: [
      { to: '/', label: 'Latitude longitude finder' },
      { to: '/', label: 'My exact coordinates' },
      { to: '/blog/latitude-vs-longitude-explained', label: 'Decimal degrees converter' },
      { to: '/blog/latitude-vs-longitude-explained', label: 'WGS-84 coordinates' },
      { to: '/', label: 'Live GPS coordinates' },
      { to: '/', label: 'Free GPS tracker online' },
    ],
  },
  {
    heading: 'IP & Networking',
    links: [
      { to: '/', label: 'Track my IP' },
      { to: '/', label: 'What is my public IP' },
      { to: '/', label: 'IP geolocator' },
      { to: '/blog/what-is-ip-location-and-how-accurate', label: 'IPv4 lookup' },
      { to: '/blog/what-is-ip-location-and-how-accurate', label: 'IP to location' },
      { to: '/', label: 'Internet provider lookup' },
    ],
  },
  {
    heading: 'Map & Navigation',
    links: [
      { to: '/', label: 'Pinpoint my location' },
      { to: '/', label: 'Street address from GPS' },
      { to: '/', label: 'Reverse geocode online' },
      { to: '/', label: 'Interactive location map' },
      { to: '/', label: 'Drop pin GPS' },
      { to: '/', label: 'Find address by lat long' },
    ],
  },
  {
    heading: 'Compare & Troubleshoot',
    links: [
      { to: '/blog/what-is-ip-location-and-how-accurate', label: 'GPS vs IP accuracy' },
      { to: '/blog/how-gps-works', label: 'How accurate is browser location' },
      { to: '/blog/how-to-find-your-gps-coordinates', label: 'Fix GPS not working' },
      { to: '/blog/how-to-find-your-gps-coordinates', label: 'Enable browser location Chrome' },
      { to: '/blog/what-is-ip-location-and-how-accurate', label: 'VPN and GPS location' },
      { to: '/', label: 'Why is my location wrong' },
    ],
  },
];

export default function Footer() {
  return (
    <footer role="contentinfo" className="mt-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 py-10">

        {/* Quick Links — topic clusters for internal authority */}
        <nav aria-label="Footer topics" className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {QUICK_LINKS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[11px] uppercase tracking-[0.18em] text-electric-400 font-semibold mb-3">{col.heading}</h3>
              <ul className="space-y-1.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-slate-400 hover:text-slate-100 transition leading-snug"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <nav aria-label="Site">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-300">
              {SITE_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-electric-400 transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-xs text-slate-500 text-center sm:text-right">
            &copy; {YEAR} <span className="text-slate-300 font-semibold">GetMyLocations</span>. All rights reserved.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            Map data © OpenStreetMap contributors.
          </p>
        </div>
      </div>
    </footer>
  );
}
