import { Link } from 'react-router-dom';

const YEAR = new Date().getFullYear();

const SITE_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms' },
  { to: '/disclaimer', label: 'Disclaimer' },
];

const GUIDE_LINKS = [
  { to: '/gps-coordinates-finder', label: 'GPS Coordinates Guide' },
  { to: '/ip-location-lookup', label: 'IP Location Lookup' },
  { to: '/decimal-degrees-converter', label: 'Decimal Degrees Converter' },
  { to: '/reverse-geocoding', label: 'Reverse Geocoding' },
  { to: '/gps-vs-ip-accuracy', label: 'GPS vs IP Accuracy' },
  { to: '/fix-location-not-working', label: 'Fix Location Issues' },
];

export default function Footer() {
  return (
    <footer role="contentinfo" className="mt-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <nav aria-label="Guides" className="mb-6 pb-6 border-b border-white/5">
          <h3 className="text-[11px] uppercase tracking-[0.18em] text-electric-400 font-semibold mb-3">Guides</h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
            {GUIDE_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-electric-400 transition">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
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
