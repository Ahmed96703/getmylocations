import PageLayout from '../components/PageLayout.jsx';

export default function Privacy() {
  return (
    <PageLayout title="Privacy Policy">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
      <p className="text-sm text-slate-400 mt-2">Last updated: May 13, 2026</p>

      <p className="mt-6 text-slate-300/90 leading-relaxed">
        GetMyLocations (“we”, “our”, “us”) respects your privacy. This Privacy Policy explains what information the Service handles and how it is protected when you use <a className="text-electric-400 hover:underline" href="https://getmylocations.com/">getmylocations.com</a>.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">1. Overview</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The core GetMyLocations tool is fully client-side. Your geolocation data is processed in your browser and never sent to a server we operate. We do, however, integrate third-party services for reverse geocoding, advertising, fonts, and hosting, each of which has its own privacy practices described below.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">2. Information processed</h2>
      <ul className="mt-3 space-y-2 text-slate-300/90">
        <li><strong>Geolocation data:</strong> If you grant permission, your browser provides your latitude and longitude to the page. This data stays in memory in your browser; we do not store it.</li>
        <li><strong>Reverse-geocoding requests:</strong> To translate coordinates into a city/country name, your browser sends the coordinates to a third-party API (BigDataCloud, with OpenStreetMap Nominatim as fallback). These providers have their own privacy policies.</li>
        <li><strong>Standard server logs:</strong> Our hosting provider (Cloudflare) may keep anonymized request logs (IP, user agent) for security and abuse prevention.</li>
        <li><strong>Advertising data:</strong> Google AdSense and its partners may collect data via cookies and identifiers for ad personalization and frequency capping. See section 4.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-10">3. Cookies and tracking</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        GetMyLocations itself does not set first-party cookies for tracking or analytics. However, the third-party services we integrate may set cookies:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90">
        <li><strong>Google AdSense:</strong> may set cookies (for example <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400">__gads</code>, <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400">__gpi</code>, <code className="bg-white/10 px-1.5 py-0.5 rounded text-electric-400">NID</code>) to serve and measure ads, prevent fraud, and (where consented to) personalize advertising.</li>
        <li><strong>Google Fonts:</strong> does not set cookies but does receive your IP when downloading font files.</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        You can control cookies via your browser settings or, for ad personalization, through Google’s <a className="text-electric-400 hover:underline" href="https://adssettings.google.com/" rel="noopener">Ads Settings</a>.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">4. Advertising — Google AdSense</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        We use Google AdSense to display advertisements. Google, as a third-party vendor, uses cookies to serve ads on this Service. Google’s use of advertising cookies enables it and its partners to serve ads based on your visits to this Service and other sites on the Internet.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        For visitors in the European Economic Area, the UK, and Switzerland, we use Google’s Consent Management Platform (CMP) to obtain consent for personalized advertising in accordance with GDPR and ePrivacy regulations. You may opt out of personalized advertising by visiting <a className="text-electric-400 hover:underline" href="https://adssettings.google.com/" rel="noopener">Google Ads Settings</a> or <a className="text-electric-400 hover:underline" href="https://www.aboutads.info/choices/" rel="noopener">aboutads.info</a>.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">5. Third-party services we use</h2>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><strong>OpenStreetMap &amp; CARTO</strong> — interactive map tiles.</li>
        <li><strong>BigDataCloud &amp; OpenStreetMap Nominatim</strong> — reverse geocoding from coordinates to city/country.</li>
        <li><strong>Google Fonts</strong> — typography (Inter, Sora).</li>
        <li><strong>Google AdSense</strong> — advertising and consent management.</li>
        <li><strong>Cloudflare</strong> — hosting, CDN, and basic security logs.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-10">6. Children’s privacy</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The Service is not directed to children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, contact us and we will delete it.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">7. Your rights</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Under GDPR, CCPA, and similar regulations, you have rights to access, correct, or delete personal data. Because we do not store personal data on our own servers, requests should be directed to the third-party providers listed above. You can revoke location permission anytime via your browser settings.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">8. Changes to this Policy</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        We may update this Privacy Policy from time to time. The “Last updated” date above will always reflect the latest revision. Continued use of the Service after changes constitutes acceptance of the updated Policy.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">9. Contact</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Questions about privacy? Email <a className="text-electric-400 hover:underline" href="mailto:hello@getmylocations.com">hello@getmylocations.com</a>.
      </p>
    </PageLayout>
  );
}
