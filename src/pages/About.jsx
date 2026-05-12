import PageLayout from '../components/PageLayout.jsx';

export default function About() {
  return (
    <PageLayout title="About">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">About GetMyLocations</h1>
      <p className="mt-4 text-slate-300/90 leading-relaxed">
        GetMyLocations is a free, privacy-first geolocation tool. It detects your current location using a combination of IP, Wi-Fi, and GPS signals and shows your exact latitude, longitude, city, and country on an interactive map — instantly, in your browser.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">Our mission</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        We believe finding your own location shouldn’t require signing up, installing an app, or handing your data to a third party. GetMyLocations runs 100% client-side: your coordinates never leave your device, no analytics track you, and the map is powered by free, open-source OpenStreetMap data.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">Who it’s for</h2>
      <ul className="mt-3 space-y-2 text-slate-300/90">
        <li>• Travelers verifying their GPS coordinates abroad</li>
        <li>• Developers testing geolocation APIs</li>
        <li>• Field workers needing quick latitude/longitude lookups</li>
        <li>• Anyone curious about “what is my exact location right now?”</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-10">Built with</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        React, Tailwind CSS, Leaflet, and OpenStreetMap. Deployed on Cloudflare. Open source at heart, built to last.
      </p>
    </PageLayout>
  );
}
