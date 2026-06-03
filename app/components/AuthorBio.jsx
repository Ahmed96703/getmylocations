import Link from 'next/link';

export default function AuthorBio() {
  return (
    <aside
      aria-label="About the author"
      className="mt-14 not-prose rounded-2xl border border-line bg-white/[0.03] p-6 sm:p-7"
    >
      <div className="flex items-start gap-4">
        <div
          aria-hidden="true"
          className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-strong flex items-center justify-center font-bold text-accent-fg"
        >
          AA
        </div>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.16em] text-accent font-semibold">Written by</p>
          <h3 className="font-display text-lg font-bold text-fg mt-1">Ahmed Anwar</h3>
          <p className="text-sm text-fg-muted leading-relaxed mt-2">
            Independent web developer in Karachi. Builds the geolocation tools,
            mapping pages, and coordinate utilities on GetMyLocations. Writes
            about GPS, browser geolocation, and IP geolocation from the
            perspective of someone who ships the code, not the marketing.
          </p>
          <p className="text-xs text-fg-subtle mt-3 leading-relaxed">
            This article was researched and drafted with AI assistance, then
            edited and fact-checked by Ahmed before publication.{' '}
            <Link href="/about" className="text-accent hover:underline">More about the author</Link>.
          </p>
        </div>
      </div>
    </aside>
  );
}
