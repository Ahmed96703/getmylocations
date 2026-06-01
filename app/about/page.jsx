import Link from 'next/link';

export const metadata = {
  title: 'About — GetMyLocations',
  description: 'Free, privacy-first location tools. Built by Ahmed Anwar — geolocation, GPS, and IP networking guides written from primary sources.',
  alternates: { canonical: '/about' },
};

export default function About() {
  return (
    <main role="main" className="max-w-3xl mx-auto px-5 py-12 prose-invert">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">About GetMyLocations</h1>
      <p className="mt-4 text-slate-300/90 leading-relaxed">
        GetMyLocations is a free geolocation tool that detects your current location
        using a combination of IP, Wi-Fi, and GPS signals and shows your exact
        latitude, longitude, city, and country on an interactive map — instantly, in
        your browser. The site is built and maintained by a small team focused on
        geolocation, mapping, and online privacy.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">Our mission</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        We believe finding your own location shouldn&rsquo;t require signing up or installing an
        app. GetMyLocations runs 100% client-side: your coordinates are processed in your
        browser and never sent to a server we operate, and the map is powered by free,
        open-source OpenStreetMap data. See our{' '}
        <Link href="/privacy-policy" className="text-electric-400 hover:underline">Privacy Policy</Link>{' '}
        for details on third-party services we use, including reverse-geocoding APIs and advertising.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">About the author</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        GetMyLocations is run by <strong className="text-slate-100">Ahmed Anwar</strong>, an
        independent software developer with hands-on experience building geolocation
        tooling, reverse-geocoding pipelines, and map-based web applications.
      </p>

      <h2 className="font-display text-2xl font-bold mt-10">Contact</h2>
      <p className="mt-3 text-slate-300/90 leading-relaxed">
        Email <a className="text-electric-400 hover:underline" href="mailto:hello@getmylocations.com">hello@getmylocations.com</a> for
        questions, feedback, corrections, or partnership ideas.
      </p>
    </main>
  );
}
