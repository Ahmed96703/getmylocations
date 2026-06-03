import Link from 'next/link';

const YEAR = new Date().getFullYear();

const SITE_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

const GUIDE_LINKS = [
  { href: '/gps-coordinates-finder', label: 'GPS Coordinates Guide' },
  { href: '/ip-location-lookup', label: 'IP Location Lookup' },
  { href: '/decimal-degrees-converter', label: 'Decimal Degrees Converter' },
  { href: '/reverse-geocoding', label: 'Reverse Geocoding' },
  { href: '/gps-vs-ip-accuracy', label: 'GPS vs IP Accuracy' },
  { href: '/fix-location-not-working', label: 'Fix Location Issues' },
];

export default function Footer() {
  return (
    <footer role="contentinfo" className="mt-16 border-t border-line-subtle">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <nav aria-label="Guides" className="mb-6 pb-6 border-b border-line-subtle">
          <h3 className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold mb-3">Guides</h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-muted">
            {GUIDE_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-accent transition">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <nav aria-label="Site">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-fg-muted">
              {SITE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-accent transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-xs text-fg-subtle text-center sm:text-right">
            &copy; {YEAR} <span className="text-fg-muted font-semibold">GetMyLocations</span>. All rights reserved.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            Map data © OpenStreetMap contributors.
          </p>
        </div>
        <p className="mt-6 pt-6 border-t border-line-subtle text-xs text-fg-subtle text-center leading-relaxed">
          Articles and guides on this site are researched and drafted with AI assistance and reviewed by{' '}
          <Link href="/about" className="text-fg-muted hover:text-accent transition">Ahmed Anwar</Link>
          {' '}before publication. Tools are written and tested by hand.
        </p>
      </div>
    </footer>
  );
}
