import PageLayout from '../components/PageLayout.jsx';

const POSTS = [
  {
    slug: 'how-to-find-your-gps-coordinates',
    title: 'How to find your exact GPS coordinates (3 methods)',
    excerpt: 'The fastest ways to get precise latitude and longitude — in a browser, on iPhone, and on Android.',
    date: '2026-05-13',
  },
  {
    slug: 'what-is-ip-location-and-how-accurate',
    title: 'What is IP location and how accurate is it really?',
    excerpt: 'IP geolocation explained: how it works, why it’s often city-level only, and when GPS beats it.',
    date: '2026-05-10',
  },
  {
    slug: 'latitude-vs-longitude-explained',
    title: 'Latitude vs longitude — a 2-minute primer',
    excerpt: 'The simplest explanation of geographic coordinates, WGS-84, and what those decimals actually mean.',
    date: '2026-05-05',
  },
];

export default function Blog() {
  return (
    <PageLayout title="Blog">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Blog</h1>
      <p className="mt-3 text-slate-300/90">Notes and guides on geolocation, GPS, and finding your way online.</p>

      <ul className="mt-10 space-y-6">
        {POSTS.map((p) => (
          <li key={p.slug} className="glass rounded-2xl p-6">
            <time className="text-xs text-slate-400 uppercase tracking-wider">{new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            <h2 className="font-display text-xl font-bold mt-1 leading-snug">{p.title}</h2>
            <p className="text-sm text-slate-300/90 mt-2">{p.excerpt}</p>
            <span className="inline-block mt-3 text-xs text-electric-400 font-semibold uppercase tracking-wider">Coming soon</span>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
