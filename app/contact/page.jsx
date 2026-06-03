export const metadata = {
  title: 'Contact — GetMyLocations',
  description: 'Get in touch with GetMyLocations for questions, feedback, corrections, or partnership ideas. We reply within 24 hours.',
  alternates: { canonical: '/contact' },
};

export default function Contact() {
  return (
    <main role="main" className="max-w-3xl mx-auto px-5 py-12 prose-invert">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Contact</h1>
      <p className="mt-4 text-fg-muted leading-relaxed">
        Questions, feedback, or a partnership idea? We&rsquo;d love to hear from you.
      </p>

      <div className="glass rounded-2xl p-6 mt-8">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">Email</div>
        <a href="mailto:hello@getmylocations.com" className="font-display text-2xl font-bold mt-1 inline-block hover:text-accent transition">
          hello@getmylocations.com
        </a>
        <p className="text-sm text-fg-subtle mt-2">We typically reply within 24 hours.</p>
      </div>

      <h2 className="font-display text-2xl font-bold mt-10">Frequently asked</h2>
      <div className="mt-4 space-y-4 text-fg-muted">
        <div>
          <h3 className="font-semibold text-fg">Is GetMyLocations free?</h3>
          <p className="text-sm mt-1">Yes — completely free, no signup required. The site is supported by advertising.</p>
        </div>
        <div>
          <h3 className="font-semibold text-fg">Do you offer an API?</h3>
          <p className="text-sm mt-1">Not yet — reach out if you have a use case in mind.</p>
        </div>
        <div>
          <h3 className="font-semibold text-fg">Found a bug?</h3>
          <p className="text-sm mt-1">Email us with a screenshot and your browser version. Fixes usually ship within a day.</p>
        </div>
      </div>
    </main>
  );
}
