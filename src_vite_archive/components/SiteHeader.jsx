import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo.jsx';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const TOOLS = [
  { href: '/my-location', label: 'My Location', desc: 'Where am I right now?' },
  { href: '/gps-coordinates', label: 'GPS Coordinates', desc: 'Live latitude & longitude' },
  { href: '/coordinates-converter', label: 'Coordinates Converter', desc: 'DD ↔ DMS ↔ UTM' },
  { href: '/ip-location', label: 'IP Location', desc: 'Look up any IP address' },
  { href: '/distance-calculator', label: 'Distance Calculator', desc: 'Between two coordinates' },
  { href: '/address-finder', label: 'Address Finder', desc: 'Address ↔ coordinates' },
  { href: '/street-view', label: 'Street View', desc: 'Google Street View' },
  { href: '/driving-directions', label: 'Driving Directions', desc: 'Route planner' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const ddRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e) { if (ddRef.current && !ddRef.current.contains(e.target)) setOpen(false); }
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <header role="banner" className="sticky top-0 z-30 border-b border-white/5 bg-ink-950/70 backdrop-blur-xl">
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
            {NAV.slice(0, 1).map((n) => (
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

            <li ref={ddRef} className="relative">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
                aria-haspopup="menu"
                aria-expanded={open}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full transition border ${open ? 'bg-electric-500/20 border-electric-400/30 text-white' : 'bg-electric-500/10 border-electric-400/20 text-electric-300 hover:text-white'}`}
              >
                Tools <span className={`text-xs transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
              </button>
              {open && (
                <div
                  role="menu"
                  aria-label="All tools"
                  className="absolute right-0 mt-2 w-[320px] max-w-[calc(100vw-2rem)] rounded-xl border border-white/10 bg-ink-950/95 backdrop-blur-xl shadow-2xl p-1.5 z-40"
                >
                  {TOOLS.map((t) => (
                    <a
                      key={t.href}
                      href={t.href}
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className="flex flex-col gap-0.5 px-3 py-2 rounded-lg hover:bg-electric-500/10 transition group"
                    >
                      <span className="block text-sm font-semibold text-slate-100 group-hover:text-electric-400">{t.label}</span>
                      <span className="block text-[11px] text-slate-400">{t.desc}</span>
                    </a>
                  ))}
                </div>
              )}
            </li>

            {NAV.slice(1).map((n) => (
              <li key={n.to} className="hidden sm:block">
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
