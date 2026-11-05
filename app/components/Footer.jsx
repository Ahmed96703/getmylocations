import Link from '@/app/components/Link.jsx';
import { NET_GROUPS, NET_TOOLS } from './netTools.js';

const YEAR = new Date().getFullYear();

const SITE_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/about#editorial-policy', label: 'How we check facts' },
  { href: '/about#corrections', label: 'Corrections' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

const GUIDE_LINKS = [
  { href: '/my-location', label: 'GPS Coordinates Guide' },
  { href: '/ip-location', label: 'IP Location Lookup' },
  { href: '/coordinates-converter', label: 'Coordinates Converter' },
  { href: '/reverse-geocoding', label: 'Reverse Geocoding' },
  { href: '/gps-vs-ip-accuracy', label: 'GPS vs IP Accuracy' },
  { href: '/fix-location-not-working', label: 'Fix Location Issues' },
];

export default function Footer() {
  return (
    <footer role="contentinfo" className="site-footer mt-16 px-3 sm:px-4 pb-4">
      <div className="max-w-7xl mx-auto glass-strong rounded-[1.75rem] border border-line-subtle shadow-2xl p-6 sm:p-8">
        <nav aria-label="Guides" className="mb-6 pb-6 border-b border-line-subtle">
          <h3 className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-3">Guides</h3>
          <ul className="flex flex-wrap gap-2 text-sm text-fg-muted">
            {GUIDE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex items-center rounded-full border border-line bg-surface/60 px-3 py-1.5 hover:border-accent/30 hover:text-accent transition">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* The header's Tools menu only renders when opened, so this is the
            crawlable link to each tool from every page. */}
        <nav aria-label="Tools" className="mb-6 pb-6 border-b border-line-subtle">
          <h3 className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-3">Free tools</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm">
            {NET_GROUPS.map((g) => (
              <div key={g.id}>
                <h4 className="text-xs font-semibold text-fg mb-1.5">{g.label}</h4>
                <ul className="space-y-1 text-fg-muted">
                  {NET_TOOLS.filter((t) => t.group === g.id).map((t) => (
                    <li key={t.href}>
                      <Link href={t.href} className="hover:text-accent transition">{t.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm">
          <nav aria-label="Site">
            <ul className="flex flex-wrap items-center gap-2 text-fg-muted">
              {SITE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex items-center rounded-full border border-transparent px-3 py-1.5 hover:border-line hover:bg-surface/60 hover:text-accent transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-xs text-fg-subtle text-left sm:text-right">
            &copy; {YEAR} <span className="text-fg-muted font-semibold">GetMyLocations</span>. All rights reserved.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            Map data © OpenStreetMap contributors.
          </p>
        </div>
        <p className="mt-6 pt-6 border-t border-line-subtle text-xs text-fg-subtle text-center leading-relaxed">
          Articles and guides are reviewed by{' '}
          <Link href="/about" className="text-fg-muted hover:text-accent transition">Ahmed Anwar</Link>
          {' '}before publication. See About for the full writing process and device-testing notes.
        </p>
      </div>
    </footer>
  );
}
