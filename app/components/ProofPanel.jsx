export default function ProofPanel({
  title,
  caption,
  device,
  updated = 'June 3, 2026',
}) {
  return (
    <figure className="mt-10 rounded-3xl border border-line-subtle bg-tint/5 p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-accent font-semibold">
            First-party proof
          </p>
          <h3 className="font-display text-xl font-bold mt-1">{title}</h3>
        </div>
        <p className="text-xs text-fg-subtle">Last checked {updated}</p>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-line bg-background/70">
        <div className="grid min-h-[220px] place-items-center p-6 text-center">
          <div className="max-w-md">
            <p className="text-sm font-semibold text-fg">First-party screenshot slot</p>
            <p className="mt-2 text-sm text-fg-muted leading-relaxed">{device}</p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-fg-subtle">
              Reserved for a real device capture.
            </p>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 text-sm text-fg-muted leading-relaxed">{caption}</figcaption>
    </figure>
  );
}
