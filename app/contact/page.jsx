export const metadata = {
  title: 'Contact — GetMyLocations',
  description: 'Get in touch with GetMyLocations for questions, feedback, corrections, or partnership ideas. We reply within 24 hours.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact — GetMyLocations',
    description:
      'Contact details, correction policy, and partnership contact for GetMyLocations.',
    url: 'https://getmylocations.com/contact',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — GetMyLocations',
    description:
      'Contact details, correction policy, and partnership contact for GetMyLocations.',
    images: ['/og-image.png'],
  },
};

export default function Contact() {
  return (
    <main role="main" className="max-w-3xl mx-auto px-5 py-12 prose-invert">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">Contact</h1>
      <p className="mt-4 text-fg-muted leading-relaxed">
        Questions, feedback, or a partnership idea? We&rsquo;d love to hear from you.
      </p>
      <p className="mt-3 text-sm text-fg-subtle">
        Last reviewed June 3, 2026. The fastest response path is email with the exact
        page URL, device, browser, and a one-line summary of the issue.
      </p>

      <div className="glass rounded-2xl p-6 mt-8">
        <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">Email</div>
        <a href="mailto:hello@getmylocations.com" className="font-display text-2xl font-bold mt-1 inline-block hover:text-accent transition">
          hello@getmylocations.com
        </a>
        <p className="text-sm text-fg-subtle mt-2">We typically reply within 24 hours.</p>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <article className="glass rounded-2xl p-5 ring-1 ring-line">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">Corrections</p>
          <h2 className="font-display text-xl font-bold mt-1">What to include</h2>
          <p className="mt-2 text-sm text-fg-muted leading-relaxed">
            Send the page URL, the sentence or screenshot that is wrong, what device
            you used, and what the correct version should say. That is usually enough
            to patch the issue without a long back-and-forth.
          </p>
        </article>
        <article className="glass rounded-2xl p-5 ring-1 ring-line">
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">Partnerships</p>
          <h2 className="font-display text-xl font-bold mt-1">What we can discuss</h2>
          <p className="mt-2 text-sm text-fg-muted leading-relaxed">
            Tool integrations, content collaborations, and technical questions are all
            welcome. Please include enough detail that we can answer without guessing.
          </p>
        </article>
      </section>

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

      <section className="mt-8 rounded-2xl border border-line-subtle bg-tint/5 p-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">Response policy</p>
        <p className="mt-2 text-sm text-fg-muted leading-relaxed">
          We usually reply within 24 hours. Clear bug reports and factual corrections
          get priority, because those make the whole site better for everyone.
        </p>
      </section>
    </main>
  );
}
