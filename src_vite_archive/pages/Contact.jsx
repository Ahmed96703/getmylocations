import PageLayout from '../components/PageLayout.jsx';

export default function Contact() {
  return (
    <PageLayout title="Contact">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Contact</h1>
      <p className="mt-4 text-slate-300/90 leading-relaxed">
        Questions, feedback, or a partnership idea? We’d love to hear from you.
      </p>

      <div className="glass rounded-2xl p-6 mt-8">
        <div className="text-xs uppercase tracking-[0.18em] text-electric-400 font-semibold">Email</div>
        <a href="mailto:hello@getmylocations.com" className="font-display text-2xl font-bold mt-1 inline-block hover:text-electric-400 transition">
          hello@getmylocations.com
        </a>
        <p className="text-sm text-slate-400 mt-2">We typically reply within 24 hours.</p>
      </div>

      <h2 className="font-display text-2xl font-bold mt-10">Frequently asked</h2>
      <div className="mt-4 space-y-4 text-slate-300/90">
        <div>
          <h3 className="font-semibold text-slate-100">Is GetMyLocations free?</h3>
          <p className="text-sm mt-1">Yes — completely free, no signup required. The site is supported by advertising.</p>
        </div>
        <div>
          <h3 className="font-semibold text-slate-100">Do you offer an API?</h3>
          <p className="text-sm mt-1">Not yet — reach out if you have a use case in mind.</p>
        </div>
        <div>
          <h3 className="font-semibold text-slate-100">Found a bug?</h3>
          <p className="text-sm mt-1">Email us with a screenshot and your browser version. Fixes usually ship within a day.</p>
        </div>
      </div>
    </PageLayout>
  );
}
