import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service',
  description:
    'The terms that govern your use of the GetMyLocations website and tools.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service — GetMyLocations',
    description:
      'The terms that govern your use of the GetMyLocations website and tools.',
    url: 'https://getmylocations.com/terms',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service — GetMyLocations',
    description:
      'The terms that govern your use of the GetMyLocations website and tools.',
    images: ['/og-image.png'],
  },
};

export default function Terms() {
  return (
    <main role="main" className="max-w-3xl mx-auto px-5 py-12 prose-invert">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Terms of Service</h1>
      <p className="text-sm text-fg-subtle mt-2">Last updated: 2026</p>

      <p className="mt-6 text-fg-muted leading-relaxed">
        These terms cover your use of the GetMyLocations website at{' '}
        <Link href="/" className="text-accent hover:underline">getmylocations.com</Link>{' '}
        (the &ldquo;Service&rdquo;). By using the Service you agree to them. If you do not agree,
        please stop using the Service.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">1. What the Service is</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The Service is a collection of free browser-based tools that read your location,
        convert between coordinate formats, look up IP addresses, calculate distances,
        and render maps. The tools work without an account. There is no paid tier and
        no signup. The Service is supported by advertising.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">2. Acceptable use</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        You agree to use the Service for lawful purposes only. You will not:
      </p>
      <ul className="mt-3 space-y-2 text-fg-muted list-disc list-inside">
        <li>Use the tools to harass, stalk, or surveil another person.</li>
        <li>Attempt to overwhelm or scrape the site at a rate that interferes with normal use.</li>
        <li>Look up IP addresses or coordinates you are not authorised to inspect.</li>
        <li>Reverse-engineer, modify, or redistribute the site&rsquo;s code without permission.</li>
        <li>Interfere with the security features of the site.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-10">3. No professional advice</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Information on the Service — including articles, tool readouts, and explanatory
        text — is for general information only. It is not professional, legal, medical,
        safety, or engineering advice. If you need to make a safety-critical decision
        (navigation, emergency response, surveying, legal proceedings) consult a
        qualified source and a calibrated instrument.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">4. Accuracy of location data</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The coordinates the Service displays are whatever the browser&rsquo;s Geolocation
        API returns, combined with the reverse-geocoding services described in the{' '}
        <Link href="/privacy-policy" className="text-accent hover:underline">Privacy Policy</Link>.
        That output can be wrong — sometimes by meters, sometimes by kilometers — for the
        reasons explained in the tool&rsquo;s own explanatory text and FAQs. You agree not to
        rely on the Service for any purpose where positioning errors could cause harm.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">5. Third-party services</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The Service integrates several third parties (OpenStreetMap, BigDataCloud,
        Cloudflare, Google AdSense, ipapi.co). When you use a tool that calls one of
        these services you are also accepting that service&rsquo;s own terms. The Privacy
        Policy lists each provider and links to its policy.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">6. Advertising</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The Service displays advertisements through Google AdSense. We do not endorse,
        verify, or take responsibility for products and services shown in those ads.
        Clicking an advertisement takes you to a third-party page governed by its own
        terms.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">7. Intellectual property</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The site&rsquo;s code, design, and original written content belong to GetMyLocations.
        Map tiles belong to OpenStreetMap contributors and CARTO. You may link to any
        page on the Service. You may quote short passages with attribution.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">8. &ldquo;As is&rdquo; — no warranty</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. We do not
        warrant that it will be uninterrupted, error-free, secure, or that the data it
        produces is accurate. To the maximum extent permitted by law, we disclaim all
        implied warranties of merchantability, fitness for a particular purpose, and
        non-infringement.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">9. Limitation of liability</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        To the maximum extent permitted by law, GetMyLocations and its owner are not
        liable for any indirect, incidental, special, consequential, or punitive
        damages arising from your use of the Service — including any loss caused by
        relying on a location reading that turned out to be wrong.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">10. Changes</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        These terms can change as the Service evolves. The date at the top reflects the
        most recent revision. Continued use of the Service after changes constitutes
        acceptance.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">11. Contact</h2>
      <p className="mt-3 text-fg-muted leading-relaxed">
        Questions about these terms can go to{' '}
        <a className="text-accent hover:underline" href="mailto:hello@getmylocations.com">hello@getmylocations.com</a>.
      </p>
    </main>
  );
}
