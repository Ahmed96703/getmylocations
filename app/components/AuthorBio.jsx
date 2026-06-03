import Link from 'next/link';

export default function AuthorBio() {
  return (
    <aside
      aria-label="About the author"
      className="mt-14 not-prose rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7"
    >
      <div className="flex items-start gap-4">
        <div
          aria-hidden="true"
          className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-electric-400 to-electric-600 flex items-center justify-center font-bold text-ink-950"
        >
          AA
        </div>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.16em] text-electric-400 font-semibold">Written by</p>
          <h3 className="font-display text-lg font-bold text-slate-100 mt-1">Ahmed Anwar</h3>
          <p className="text-sm text-slate-300/90 leading-relaxed mt-2">
            Independent web developer in Karachi. Builds the geolocation tools,
            mapping pages, and coordinate utilities on GetMyLocations. Writes
            about GPS, browser geolocation, and IP geolocation from the
            perspective of someone who ships the code, not the marketing.
          </p>
          <p className="text-xs text-slate-400 mt-3 leading-relaxed">
            This article was researched and drafted with AI assistance, then
            edited and fact-checked by Ahmed before publication.{' '}
            <Link href="/about" className="text-electric-400 hover:underline">More about the author</Link>.
          </p>
        </div>
      </div>
    </aside>
  );
}
