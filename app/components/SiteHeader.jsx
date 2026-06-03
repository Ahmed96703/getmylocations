'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const TOOLS = [
  { href: '/my-location', label: 'My Location', desc: 'Where am I right now?' },
  { href: '/gps-coordinates', label: 'GPS Coordinates', desc: 'Live latitude & longitude' },
  { href: '/coordinates-converter', label: 'Coordinates Converter', desc: 'DD ↔ DMS ↔ UTM' },
  { href: '/ip-location', label: 'IP Location', desc: 'Look up any IP address' },
  { href: '/distance-calculator', label: 'Distance Calculator', desc: 'Between two coordinates' },
  { href: '/address-finder', label: 'Address Finder', desc: 'Address ↔ coordinates' },
  { href: '/maps', label: 'Interactive Maps', desc: 'World map with layers' },
  { href: '/satellite', label: 'Satellite View', desc: 'Imagery of any address' },
  { href: '/us-map', label: 'US Map', desc: 'United States map' },
  { href: '/street-view', label: 'Street View', desc: 'Google Street View' },
  { href: '/driving-directions', label: 'Driving Directions', desc: 'Route planner' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const ddRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    function onDoc(e) { if (ddRef.current && !ddRef.current.contains(e.target)) setOpen(false); }
    function onKey(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <header role="banner" className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
        <Link href="/" aria-label="GetMyLocations home" className="flex items-center gap-3 group">
          <Logo size={36} />
          <div>
            <div className="font-display text-lg font-bold leading-none text-fg group-hover:text-accent transition">GetMyLocations</div>
            <div className="text-[11px] text-fg-subtle mt-0.5">Real-time Location Finder</div>
          </div>
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-1 text-sm font-medium">
            <li>
              <Link
                href="/"
                className={`px-3 py-1.5 rounded-full transition ${pathname === '/' ? 'text-accent' : 'text-fg-muted hover:text-fg'}`}
              >
                Home
              </Link>
            </li>

            <li ref={ddRef} className="relative">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
                aria-haspopup="menu"
                aria-expanded={open}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full transition border ${
                  open
                    ? 'bg-accent/15 border-accent/40 text-fg'
                    : 'bg-accent/10 border-accent/20 text-accent hover:text-fg'
                }`}
              >
                Tools <span className={`text-xs transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
              </button>
              {open && (
                <div
                  role="menu"
                  aria-label="All tools"
                  className="absolute right-0 mt-2 w-[320px] max-w-[calc(100vw-2rem)] rounded-xl border border-line bg-surface/95 backdrop-blur-xl shadow-2xl p-1.5 z-40"
                >
                  {TOOLS.map((t) => (
                    <Link
                      key={t.href}
                      href={t.href}
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className={`flex flex-col gap-0.5 px-3 py-2 rounded-lg hover:bg-accent/10 transition group ${
                        pathname === t.href ? 'bg-accent/10' : ''
                      }`}
                    >
                      <span className={`block text-sm font-semibold ${pathname === t.href ? 'text-accent' : 'text-fg group-hover:text-accent'}`}>
                        {t.label}
                      </span>
                      <span className="block text-[11px] text-fg-subtle">{t.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {NAV.slice(1).map((n) => (
              <li key={n.href} className="hidden sm:block">
                <Link
                  href={n.href}
                  className={`px-3 py-1.5 rounded-full transition ${pathname === n.href ? 'text-accent' : 'text-fg-muted hover:text-fg'}`}
                >
                  {n.label}
                </Link>
              </li>
            ))}

            <li className="ml-1">
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
