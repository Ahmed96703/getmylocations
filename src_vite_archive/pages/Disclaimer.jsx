import PageLayout from '../components/PageLayout.jsx';
import { Link } from 'react-router-dom';

export default function Disclaimer() {
  return (
    <PageLayout title="Disclaimer">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Disclaimer</h1>
      <p className="text-sm text-slate-400 mt-2">Last updated: May 20, 2026</p>

      <p className="mt-6 text-slate-300/90 leading-relaxed">
        The information provided by GetMyLocations (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) on
        {' '}<a className="text-electric-400 hover:underline" href="https://getmylocations.com/">getmylocations.com</a>{' '}
        (the &ldquo;Service&rdquo;) is for general informational and educational purposes only. By using
        the Service you accept the terms of this Disclaimer in full. If you disagree with any part,
        please discontinue use.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">1. Location accuracy disclaimer</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        GetMyLocations uses a combination of the browser&apos;s Geolocation API, IP geolocation
        databases, Wi-Fi positioning (where supported by the device), and GPS hardware (where
        available) to estimate your position. All of these signals can be inaccurate or unavailable.
        Reported coordinates, city names, country information, accuracy radii, and reverse-geocoded
        addresses are best-effort estimates and may be incorrect.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        You should not rely on the Service for any purpose where positioning errors of meters,
        kilometers, or even cities could cause harm or loss. This includes but is not limited to:
        aviation navigation, marine navigation, autonomous vehicle control, search and rescue
        operations, legal proceedings, surveying, geofencing for safety-critical systems, or
        precision agriculture without independent verification.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">2. No professional advice</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Articles and guides published on the Service &mdash; including content about emergency
        services, GPS, IP networking, browser geolocation, location sharing, privacy, and similar
        topics &mdash; are written for general education. They do not constitute professional,
        legal, medical, safety, regulatory, or engineering advice. Consult a qualified professional
        for advice specific to your situation.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Information about emergency procedures (911, 112, 999, 15, AML, etc.) is provided for
        general awareness only. In a real emergency, contact your local emergency services
        immediately and follow their instructions &mdash; do not delay action based on anything you
        read here.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">3. Third-party services disclaimer</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The Service integrates third-party providers including, but not limited to:
      </p>
      <ul className="mt-3 space-y-2 text-slate-300/90 list-disc list-inside">
        <li><strong>OpenStreetMap &amp; CARTO</strong> &mdash; interactive map tiles.</li>
        <li><strong>BigDataCloud &amp; OpenStreetMap Nominatim</strong> &mdash; reverse-geocoding APIs.</li>
        <li><strong>Google Fonts</strong> &mdash; typography.</li>
        <li><strong>Google AdSense</strong> &mdash; advertising and consent management.</li>
        <li><strong>Cloudflare</strong> &mdash; hosting and CDN.</li>
      </ul>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        We do not control these third parties and are not responsible for the accuracy,
        completeness, availability, or content of any data, service, or advertisement they
        provide. Each third party has its own terms and privacy policies that govern your
        interaction with them through the Service. See our
        {' '}<Link to="/privacy-policy" className="text-electric-400 hover:underline">Privacy Policy</Link>{' '}
        for more detail on data handling by these providers.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">4. Advertising disclaimer</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The Service displays third-party advertisements served by Google AdSense and may, in the
        future, include sponsored content, affiliate links, or other forms of paid placement. We
        do not endorse, guarantee, or assume responsibility for any product, service, or claim
        made in any advertisement. Clicking on an advertisement takes you to a third-party
        website governed by that party&apos;s own terms; we are not responsible for what happens
        there.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Advertising revenue helps us keep the core tool free for all users. Editorial content
        decisions are made independently of advertiser interests &mdash; we do not edit articles
        or omit information at the request of any advertiser.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">5. External links disclaimer</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The Service may contain links to external websites that are not provided or maintained
        by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any
        information on these external sites and have no control over the nature, content, and
        availability of those sites. The inclusion of any links does not imply a recommendation
        or endorse the views expressed within them.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">6. No warranty</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without
        warranties of any kind, either express or implied. We make no warranty that the Service
        will be uninterrupted, error-free, secure, timely, or that defects will be corrected. We
        make no warranties as to the accuracy, reliability, or completeness of any information
        available through the Service.
      </p>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        To the maximum extent permitted by applicable law, we disclaim all warranties,
        express or implied, including but not limited to warranties of merchantability, fitness
        for a particular purpose, non-infringement, and any warranty arising out of course of
        dealing or usage of trade.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">7. Limitation of liability</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Under no circumstances shall GetMyLocations, its owner, contributors, or affiliates be
        liable for any direct, indirect, incidental, special, consequential, or punitive damages
        &mdash; including without limitation loss of profits, data, use, goodwill, or other
        intangible losses &mdash; resulting from (a) your access to or use of (or inability to
        access or use) the Service, (b) any conduct or content of any third party on the Service,
        or (c) unauthorized access, use, or alteration of your transmissions or content.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">8. Errors and omissions</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        While we make every effort to ensure the information presented on the Service is
        accurate at the time of publication, we make no representations or warranties of any
        kind, express or implied, about the completeness, accuracy, reliability, suitability, or
        availability of any information. We reserve the right to correct or remove content,
        without prior notice, at our sole discretion. If you spot an error, please
        {' '}<Link to="/contact" className="text-electric-400 hover:underline">contact us</Link>{' '}
        so we can correct it.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">9. Fair use</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        This Service may contain references to and quotations from third-party material for the
        purposes of commentary, criticism, news reporting, teaching, scholarship, and research.
        Such use is believed to constitute &ldquo;fair use&rdquo; under copyright law. If you believe any
        material on the Service infringes your copyright, please contact us at
        {' '}<a className="text-electric-400 hover:underline" href="mailto:hello@getmylocations.com">hello@getmylocations.com</a>{' '}
        with the relevant details and we will respond promptly.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">10. Changes to this Disclaimer</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        We may update this Disclaimer from time to time. The &ldquo;Last updated&rdquo; date above will
        always reflect the latest revision. Continued use of the Service after changes
        constitutes acceptance of the updated Disclaimer.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">11. Contact</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Questions about this Disclaimer? Email
        {' '}<a className="text-electric-400 hover:underline" href="mailto:hello@getmylocations.com">hello@getmylocations.com</a>.
      </p>
    </PageLayout>
  );
}
