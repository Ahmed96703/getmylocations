import { Link } from 'react-router-dom';

const YEAR = new Date().getFullYear();

const LINKS = [
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms' },
];

export default function Footer() {
  return (
    <footer role="contentinfo" className="mt-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-300">
            {LINKS.map((l) => (
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
    </footer>
  );
}
