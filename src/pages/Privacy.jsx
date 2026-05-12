import PageLayout from '../components/PageLayout.jsx';

export default function Privacy() {
  return (
    <PageLayout title="Privacy Policy">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
      <p className="text-sm text-slate-400 mt-2">Last updated: May 13, 2026</p>

      <p className="mt-6 text-slate-300/90 leading-relaxed">
        GetMyLocations (“we”, “our”, “us”) respects your privacy. This Privacy Policy explains what information the service handles and how it is protected when you use <a className="text-electric-400 hover:underline" href="https://getmylocations.com/">getmylocations.com</a>.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">1. The short version</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        GetMyLocations is a fully client-side tool. Your coordinates, addresses, and any inputs stay in your browser. We do not run a backend server that stores your data and we do not sell or share information with third parties.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">2. Information we process</h2>
      <ul className="mt-3 space-y-2 text-slate-300/90">
        <li><strong>Geolocation data:</strong> When you grant permission, your browser provides your latitude and longitude to the page. This data is used in-memory only and is never transmitted to our servers (we don’t operate any).</li>
        <li><strong>Reverse-geocoding requests:</strong> To translate coordinates into a city/country, your browser sends the coordinates to a third-party API (BigDataCloud or OpenStreetMap Nominatim). These providers have their own privacy policies.</li>
        <li><strong>Standard server logs:</strong> Our hosting provider (Cloudflare) may keep anonymized request logs (IP, user agent) for security and abuse prevention, as described in their privacy policy.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-10">3. Cookies & tracking</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        We do not use cookies, analytics scripts, fingerprinting, or advertising trackers on this site.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">4. Third-party services</h2>
      <ul className="mt-3 space-y-2 text-slate-300/90">
        <li><strong>OpenStreetMap / CARTO:</strong> serves the map tiles you see.</li>
        <li><strong>BigDataCloud / Nominatim:</strong> performs reverse geocoding.</li>
        <li><strong>Google Fonts:</strong> serves the website typography.</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Each of these providers may collect basic request metadata as outlined in their respective policies.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">5. Your rights</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        You can revoke the browser’s location permission at any time via your browser settings. Because we do not store personal data, there is nothing for us to delete on request.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">6. Children’s privacy</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        GetMyLocations is not directed at children under 13 and we do not knowingly collect data from them.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">7. Changes to this policy</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        We may update this policy from time to time. The “Last updated” date at the top will always reflect the latest revision.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">8. Contact</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Questions about privacy? Email <a className="text-electric-400 hover:underline" href="mailto:hello@getmylocations.com">hello@getmylocations.com</a>.
      </p>
    </PageLayout>
  );
}
