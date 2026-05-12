import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo.jsx';

const NAV = [
  { to: '/', label: 'Tool', end: true },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  return (
    <header role="banner" className="sticky top-0 z-20 border-b border-white/5 bg-ink-950/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
        <Link to="/" aria-label="GetMyLocations home" className="flex items-center gap-3 group">
          <Logo size={36} />
          <div>
            <div className="font-display text-lg font-bold leading-none group-hover:text-electric-400 transition">GetMyLocations</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Real-time Location Finder</div>
          </div>
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-1 text-sm font-medium">
            {NAV.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  end={n.end}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-full transition ${isActive ? 'text-electric-400' : 'text-slate-300 hover:text-white'}`
                  }
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
