import PageLayout from '../components/PageLayout.jsx';

export default function Terms() {
  return (
    <PageLayout title="Terms of Service">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Terms of Service</h1>
      <p className="text-sm text-slate-400 mt-2">Last updated: May 13, 2026</p>

      <p className="mt-6 text-slate-300/90 leading-relaxed">
        These Terms of Service (“Terms”) govern your access to and use of the GetMyLocations website (the “Service”) at <a className="text-electric-400 hover:underline" href="https://getmylocations.com/">getmylocations.com</a>. By using the Service you agree to these Terms.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">1. Service description</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        GetMyLocations is a free browser-based tool that uses your device’s geolocation capabilities to display your latitude, longitude, city, and country on an interactive map. The Service is provided “as is” for informational and personal use.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">2. Acceptable use</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">You agree not to:</p>
      <ul className="mt-3 space-y-1.5 text-slate-300/90 list-disc list-inside">
        <li>Use the Service to harass, stalk, or harm any person.</li>
        <li>Attempt to interfere with, disrupt, or reverse-engineer the Service.</li>
        <li>Use automated scrapers, bots, or spiders that violate the robots.txt directives.</li>
        <li>Use the Service for any unlawful purpose or in violation of any applicable regulations.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-10">3. Accuracy disclaimer</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The Service estimates location using your browser’s Geolocation API and third-party reverse-geocoding providers. Results may be inaccurate, especially when GPS is unavailable. Do not rely on the Service for emergency response, navigation, surveying, or any safety-critical purpose.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">4. Third-party services</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The Service uses third-party providers (OpenStreetMap, CARTO, BigDataCloud, Nominatim, Google Fonts, Google AdSense, Cloudflare). Each operates under its own terms and may collect technical request metadata. Their terms apply alongside ours.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">5. Advertising</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The Service may display advertisements provided by Google AdSense and other partners. Ads and sponsored content are clearly labeled. We do not endorse and are not responsible for any third-party advertised products or services.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">6. Intellectual property</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        All branding, design, code, and original written content on the Service belongs to GetMyLocations. Map data is © OpenStreetMap contributors and is used under the Open Database License. You may not republish, sell, or redistribute the Service or its content without prior written permission.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">7. Limitation of liability</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        To the maximum extent permitted by law, GetMyLocations is not liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, arising from your use of the Service.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">8. Termination</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        We may suspend or terminate access to the Service at any time, with or without notice, for any reason, including violation of these Terms.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">9. Changes to these Terms</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        We may update these Terms periodically. The “Last updated” date above reflects the latest revision. Continued use of the Service after changes constitutes acceptance of the new Terms.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">10. Governing law</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        These Terms are governed by the laws of the Islamic Republic of Pakistan, without regard to its conflict-of-laws principles.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">11. Contact</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Questions about these Terms? Email <a className="text-electric-400 hover:underline" href="mailto:hello@getmylocations.com">hello@getmylocations.com</a>.
      </p>
    </PageLayout>
  );
}
