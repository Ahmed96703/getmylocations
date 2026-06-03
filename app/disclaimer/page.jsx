import Link from 'next/link';

export const metadata = {
  title: 'Disclaimer',
  description:
    'Important limits on the accuracy of the location, IP, and coordinate data shown on GetMyLocations.',
  alternates: { canonical: '/disclaimer' },
};

export default function Disclaimer() {
  return (
    <main role="main" className="max-w-3xl mx-auto px-5 py-12 prose-invert">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Disclaimer</h1>
      <p className="text-sm text-fg-subtle mt-2">Last updated: 2026</p>

      <p className="mt-6 text-fg-muted leading-relaxed">
        GetMyLocations is a free informational and utility service. The page below
        spells out the limits of what the site can tell you, so you can decide when to
        trust it and when to double-check with another source.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">Location accuracy</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The coordinate the site shows is whatever the browser&rsquo;s Geolocation API
        returns. That number can be wrong. Outdoors on a phone, expect three to five
        meters of error. Indoors, on a laptop, or behind a VPN, the error can be tens
        of meters or several kilometers. The site has no way to verify the reading;
        it only displays it. Do not use the Service for navigation, safety, legal, or
        emergency decisions without an independent check.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">IP geolocation accuracy</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        IP-based location is an educated guess pulled from a third-party database. The
        country it returns is usually correct. The city is often wrong, especially for
        mobile networks that route traffic through a regional gateway, and for users
        behind a VPN or corporate proxy. Treat the IP city as a hint, not as proof of
        where someone is.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">Not professional advice</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Articles, FAQs, and explanatory text on the Service are for general education.
        They are not professional advice for navigation, surveying, emergency response,
        privacy law, or anything else. If a decision matters, consult a qualified
        source and use a calibrated instrument.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">Third-party content</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The map tiles, reverse-geocoded place names, IP lookups, and advertisements
        come from third parties (OpenStreetMap, CARTO, BigDataCloud, ipapi.co, Google
        AdSense). The Service does not control the accuracy or content of what these
        providers return. The{' '}
        <Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>{' '}
        lists each provider with a link to its own terms.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">Advertising</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Advertisements on the Service are served by Google AdSense and are chosen by
        Google, not by us. We do not endorse, vet, or take responsibility for any
        product, service, or claim made in an advertisement. Clicking an ad takes you
        to a third-party site governed by its own terms.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">External links</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Some pages link out to documentation, news sites, or third-party tools that we
        think readers will find useful. We do not control those sites and we do not
        endorse everything on them.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">No warranty</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The Service is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; We do not
        warrant that the site, the tools, or the information they return will be
        accurate, current, uninterrupted, or fit for any particular purpose. To the
        maximum extent permitted by law, we disclaim all implied warranties.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">Limitation of liability</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Under no circumstances will GetMyLocations or its owner be liable for any
        direct or indirect loss arising from your use of the Service, including loss
        caused by acting on an inaccurate location or IP reading.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">Changes</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        We update this page when the services we rely on change. The date at the top
        reflects the most recent revision.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">Contact</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        If you spot an error on the Service or have a question about this disclaimer,
        email <a className="text-accent hover:underline" href="mailto:hello@getmylocations.com">hello@getmylocations.com</a>.
      </p>
    </main>
  );
}
