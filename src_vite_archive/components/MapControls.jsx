import { useMap } from 'react-leaflet';

export function FlyTo({ pos, zoom = 15 }) {
  const map = useMap();
  if (pos) map.flyTo(pos, zoom, { duration: 1.1 });
  return null;
}

export function LocateButton({ pos, onLocate }) {
  const map = useMap();
  return (
    <button
      type="button"
      onClick={() => { onLocate?.(); if (pos) map.flyTo(pos, 16, { duration: 1 }); }}
      aria-label="Locate me — center map on current position"
      className="absolute z-[1000] bottom-5 right-5 glass-strong text-slate-100 hover:text-electric-400 rounded-full px-4 py-2.5 text-sm font-semibold flex items-center gap-2 transition shadow-lg"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
      </svg>
      Locate Me
    </button>
  );
}

export function CopyFloating({ pos, onCopied }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (!pos) return;
        navigator.clipboard.writeText(`${pos[0]}, ${pos[1]}`);
        onCopied?.();
      }}
      aria-label="Copy current coordinates to clipboard"
      className="absolute z-[1000] bottom-5 left-5 glass-strong text-slate-100 hover:text-electric-400 rounded-full p-2.5 transition shadow-lg"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>
      </svg>
    </button>
  );
}
