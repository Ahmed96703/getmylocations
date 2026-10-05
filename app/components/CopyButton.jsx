'use client';

import { useState } from 'react';

// A copy button that says whether the copy worked. The label sits in a
// polite live region, so screen readers and browsing agents hear the result
// rather than having to guess.
export default function CopyButton({ text, label = 'Copy', className }) {
  const [state, setState] = useState('idle'); // idle | done | fail

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState('done');
    } catch {
      setState('fail');
    }
    setTimeout(() => setState('idle'), 1800);
  };

  return (
    <button type="button" onClick={onClick} className={className}>
      <span aria-live="polite">{state === 'done' ? 'Copied ✓' : state === 'fail' ? 'Copy failed' : label}</span>
    </button>
  );
}
