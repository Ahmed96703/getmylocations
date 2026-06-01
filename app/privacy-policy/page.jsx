// MIGRATION NOTE: Copy content from /src/pages/Privacy.jsx into this file.
// Strip the PageLayout wrapper (root layout handles header + footer in Next.js).

export const metadata = {
  title: 'Privacy Policy — GetMyLocations',
  description: 'GetMyLocations privacy policy. How we handle location data, third-party services (AdSense, Cloudflare), and your rights under GDPR and CCPA.',
  alternates: { canonical: '/privacy-policy' },
};

export default function Privacy() {
  return (
    <main role="main" className="max-w-3xl mx-auto px-5 py-12 prose-invert">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
      <p className="text-sm text-slate-400 mt-2">Last updated: 2026</p>
      <p className="mt-6 text-slate-300/90 leading-relaxed">
        {/* TODO: Paste full Privacy content from /src/pages/Privacy.jsx here */}
        Privacy content migration pending — see migration guide for details. The full
        content lives in <code>/src/pages/Privacy.jsx</code> and should be pasted here,
        with the outer <code>&lt;PageLayout&gt;</code> wrapper removed and replaced with
        the <code>&lt;main&gt;</code> wrapper above.
      </p>
    </main>
  );
}
