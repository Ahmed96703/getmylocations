'use client';

import { useState } from 'react';

function detectBrowser() {
  const ua = navigator.userAgent;
  if (/CriOS/i.test(ua)) return 'chrome-ios';
  if (/FxiOS/i.test(ua)) return 'firefox-ios';
  if (/iPad|iPhone|iPod/.test(ua)) return 'safari-ios';
  if (/Edg\//i.test(ua)) return 'edge';
  if (/Chrome/i.test(ua) && /Google Inc/.test(navigator.vendor)) return 'chrome';
  if (/Firefox/i.test(ua)) return 'firefox';
  if (/Safari/i.test(ua) && /Apple/.test(navigator.vendor)) return 'safari';
  return 'other';
}

const INSTRUCTIONS = {
  chrome: [
    'Click the 🔒 lock icon in the address bar (left of getmylocations.com).',
    'Find “Location” and change it to “Allow”.',
    'Reload the page.',
  ],
  edge: [
    'Click the 🔒 lock icon in the address bar.',
    'Open “Permissions for this site” and set Location to “Allow”.',
    'Reload the page.',
  ],
  firefox: [
    'Click the 🔒 lock icon in the address bar.',
    'Click “Clear permissions and reload” or set Location to “Allow”.',
  ],
  safari: [
    'Open Safari menu → Settings → Websites → Location.',
    'Find getmylocations.com and choose “Allow”.',
    'Reload the page.',
  ],
  'safari-ios': [
    'Open the iOS Settings app → Safari → Location.',
    'Set it to “Allow” or “Ask”.',
    'Return to Safari and reload the page.',
  ],
  'chrome-ios': [
    'Open the iOS Settings app → Chrome → Location.',
    'Set it to “While Using the App”.',
    'Return to Chrome and reload the page.',
  ],
  'firefox-ios': [
    'Open the iOS Settings app → Firefox → Location.',
    'Set it to “While Using the App”.',
    'Return to Firefox and reload the page.',
  ],
  other: [
    'Open your browser’s site settings for this page.',
    'Set Location permission to “Allow”.',
    'Reload the page.',
  ],
};

export default function PermissionBlocked({ onRetry, onManualMode }) {
  const [browser] = useState(detectBrowser);
  const steps = INSTRUCTIONS[browser] || INSTRUCTIONS.other;

  return (
    <div role="alert" className="glass rounded-3xl p-6 sm:p-7 ring-1 ring-rose-400/30">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-11 h-11 rounded-xl bg-rose-500/15 ring-1 ring-rose-400/30 grid place-items-center" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-300">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-display text-xl font-bold text-rose-100">Location access blocked</h2>
          <p className="text-sm text-rose-100/70 mt-1">
            Your browser is blocking location permission for this site. The “Retry” button can’t re-prompt — you’ll need to allow it manually.
          </p>
        </div>
      </div>

      <ol className="mt-5 space-y-2 text-sm text-fg-muted list-decimal list-inside marker:text-accent">
        {steps.map((s) => <li key={s}>{s}</li>)}
      </ol>

      <div className="mt-6 flex flex-wrap gap-2">
        <button onClick={() => window.location.reload()} className="btn-primary">
          I’ve allowed it — reload
        </button>
        <button onClick={onRetry} className="btn-ghost">
          Try again without reload
        </button>
        {onManualMode && (
          <button onClick={onManualMode} className="btn-ghost">
            Use Advanced mode instead
          </button>
        )}
      </div>
    </div>
  );
}
