import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy',
  description:
    'How GetMyLocations handles your location data, what the third-party reverse-geocoding services receive, and what cookies Google AdSense sets.',
  alternates: { canonical: '/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy — GetMyLocations',
    description:
      'How GetMyLocations handles location data, third-party services, and advertising cookies.',
    url: 'https://getmylocations.com/privacy-policy',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — GetMyLocations',
    description:
      'How GetMyLocations handles location data, third-party services, and advertising cookies.',
    images: ['/og-image.png'],
  },
};

export default function Privacy() {
  return (
    <main role="main" className="max-w-3xl mx-auto px-5 py-12 prose-invert">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
      <p className="text-sm text-fg-subtle mt-2">Last updated: 2026</p>

      <p className="mt-6 text-fg-muted leading-relaxed">
        This page explains what information GetMyLocations receives when you use the
        site, what we do with it, and which third parties are involved. The summary at
        the top covers the common questions; the sections below give the details for
        anyone who wants them.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">Short summary</h2>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li>The GPS coordinate the site reads from your browser stays in your browser.</li>
        <li>Only the coordinate itself is sent to a third-party service so we can show a city name. No identifier we control travels with it.</li>
        <li>We do not run analytics that profile you. We do not have an account system.</li>
        <li>The host (Cloudflare) keeps short-lived request logs the way any web host does.</li>
        <li>Google AdSense, once enabled, will set its own advertising cookies. You can opt out of personalization at any time.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-10">1. What we read from your browser</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        When you click any location button on the site, the browser asks the operating
        system for your position and returns a latitude and longitude to the page. That
        coordinate is held in memory in the open tab. We do not write it to a database
        we own, and there is no account to attach it to. Closing the tab discards it.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Some tools also call <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">navigator.geolocation.watchPosition</code>,
        which subscribes to updates as you move. The same rule applies: the updates
        are kept in the tab until you close it or stop watching.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">2. Reverse geocoding — what the third party sees</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        A coordinate on its own is just numbers. To show a readable city and country,
        the page sends the coordinate to a reverse-geocoding service. We use:
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li>
          <strong>BigDataCloud</strong> — the first choice for the homepage tool.
          Their privacy policy is published at{' '}
          <span className="text-fg-muted font-mono text-sm">bigdatacloud.com/privacy-and-cookie-policy</span>.
        </li>
        <li>
          <strong>OpenStreetMap Nominatim</strong> — used by the Address Finder and as
          a fallback elsewhere. Their privacy policy is published at{' '}
          <span className="text-fg-muted font-mono text-sm">wiki.osmfoundation.org/wiki/Privacy_Policy</span>.
        </li>
      </ul>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Each request contains the coordinate and your IP (visible to any web service
        you connect to). It does not contain a username, an email, or any identifier we
        attach. Both services have their own retention policies linked above.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">3. Map tiles</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The maps you see are rendered with Leaflet and use tile images from
        OpenStreetMap and CARTO. Loading a tile reveals your IP and the tile coordinate
        to those providers, the same as any embedded map would. Their privacy policies
        are published at{' '}
        <span className="text-fg-muted font-mono text-sm">wiki.osmfoundation.org/wiki/Privacy_Policy</span>{' '}
        and{' '}
        <span className="text-fg-muted font-mono text-sm">carto.com/privacy</span>.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">4. IP lookups (IP Location tool)</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The IP Location tool calls the public ipapi.co endpoint
        (privacy policy at{' '}
        <span className="text-fg-muted font-mono text-sm">ipapi.co/privacy</span>).
        The IP you look up — your own when you click <em>Lookup my IP</em>,
        or any IP you paste — is sent to ipapi.co, which returns the geolocation data.
        Their policy covers what they keep.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">5. Hosting and request logs</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The site is hosted on Cloudflare. Like every web host, Cloudflare keeps short
        request logs (IP address, user agent, URL requested, timestamp) so that abuse
        and outages can be diagnosed. We do not pull those logs into a separate
        analytics tool. Cloudflare&rsquo;s privacy policy is published at{' '}
        <span className="text-fg-muted font-mono text-sm">cloudflare.com/privacypolicy</span>.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">6. Advertising — Google AdSense</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Once Google AdSense is enabled on the site, Google and its advertising partners
        may set cookies (for example <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">__gads</code>,{' '}
        <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">__gpi</code>, and{' '}
        <code className="bg-tint/10 px-1.5 py-0.5 rounded text-accent text-sm">NID</code>) to serve
        advertisements, prevent fraud, and — where you have consented — personalize
        them. You can review and change your ad personalization settings at{' '}
        <span className="text-fg-muted font-mono text-sm">adssettings.google.com</span>{' '}
        or opt out of personalized advertising network-wide at{' '}
        <span className="text-fg-muted font-mono text-sm">aboutads.info/choices</span>.
      </p>
      <p className="mt-3 text-fg-muted leading-relaxed">
        For visitors in the European Economic Area, the United Kingdom, and
        Switzerland, the AdSense Consent Management Platform shows a consent dialog
        the first time you visit, in line with GDPR and ePrivacy rules.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">7. What we do not do</h2>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li>We do not run our own analytics that profile you across pages.</li>
        <li>We do not sell or rent data to anyone.</li>
        <li>We do not have user accounts, so there is no profile to compromise.</li>
        <li>We do not store your GPS coordinates on a server we own.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-10">8. Children</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The site is a general-audience utility and is not directed at children under
        13. If you believe a child has provided personal information through the site,
        contact us at <a className="text-accent hover:underline" href="mailto:hello@getmylocations.com">hello@getmylocations.com</a> and
        we will respond promptly.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">9. Your rights</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Under GDPR, CCPA, and similar laws, you have rights to access, correct, or
        delete personal data held about you. Because we do not store personal data on
        our own servers, requests are best directed to the third-party services listed
        above. You can revoke browser location permission at any time through your
        browser&rsquo;s site settings.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">10. Changes to this policy</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        We update this page when the services we use change. The date at the top
        reflects the most recent revision. Material changes will be noted briefly at
        the top of the page for a reasonable period.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">11. Contact</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Questions about anything on this page can go to{' '}
        <a className="text-accent hover:underline" href="mailto:hello@getmylocations.com">hello@getmylocations.com</a>.
        See the <Link href="/contact" className="text-accent hover:underline">Contact page</Link> for response-time expectations.
      </p>
    </main>
  );
}
