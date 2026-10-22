'use client';

import { useState } from 'react';
import { Card, CopyButton } from '../components/toolUi.jsx';

const enc = new TextEncoder();
const dec = new TextDecoder('utf-8', { fatal: true });

const FORMATS = {
  binary: { label: 'Binary', base: 2, width: 8, re: /^[01\s]+$/ },
  hex: { label: 'Hex', base: 16, width: 2, re: /^(0x)?[0-9a-f\s]+$/i },
  decimal: { label: 'Decimal (bytes)', base: 10, width: 0, re: /^[\d\s,]+$/ },
  base64: { label: 'Base64', re: /^[A-Za-z0-9+/=\s_-]+$/ },
};

export function fromText(text, fmt) {
  const bytes = enc.encode(text);
  if (fmt === 'base64') {
    let bin = '';
    for (let i = 0; i < bytes.length; i += 8192) bin += String.fromCharCode(...bytes.subarray(i, i + 8192));
    return btoa(bin);
  }
  const { base, width } = FORMATS[fmt];
  return [...bytes].map((b) => (width ? b.toString(base).padStart(width, '0') : String(b))).join(' ');
}

export function toText(input, fmt) {
  const s = input.trim();
  if (!s) return '';
  let bytes;
  if (fmt === 'base64') {
    bytes = Uint8Array.from(atob(s.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
  } else {
    const { base, width } = FORMATS[fmt];
    let parts;
    if (fmt === 'binary') {
      const bits = s.replace(/\s+/g, '');
      // Grouped with spaces: take the groups; one long run: split into 8-bit bytes.
      parts = /\s/.test(s) ? s.split(/\s+/) : bits.match(/.{1,8}/g);
      if (!/\s/.test(s) && bits.length % 8) throw new Error(`That is ${bits.length} bits, not a whole number of 8-bit bytes.`);
    } else if (fmt === 'hex') {
      const h = s.replace(/0x/gi, '').replace(/\s+/g, '');
      if (h.length % width) throw new Error('Hex needs two digits per byte.');
      parts = h.match(/.{2}/g);
    } else {
      parts = s.split(/[\s,]+/);
    }
    bytes = Uint8Array.from(parts.map((p) => {
      const n = parseInt(p, base);
      if (Number.isNaN(n) || n > 255) throw new Error(`“${p}” is not a byte (0–255).`);
      return n;
    }));
  }
  try { return dec.decode(bytes); } catch { throw new Error('Those bytes are not valid UTF-8 text.'); }
}

export default function Tool() {
  const [fmt, setFmt] = useState('binary');
  const [text, setText] = useState('Hello');
  const [code, setCode] = useState(() => fromText('Hello', 'binary'));
  const [err, setErr] = useState('');

  const onText = (t) => { setText(t); setErr(''); setCode(fromText(t, fmt)); };
  const onCode = (c) => {
    setCode(c);
    if (c.trim() && !FORMATS[fmt].re.test(c.trim())) { setErr(`That does not look like ${FORMATS[fmt].label.toLowerCase()}.`); return; }
    try { setText(toText(c, fmt)); setErr(''); } catch (e) { setErr(e.message); }
  };
  const switchFmt = (f) => { setFmt(f); setErr(''); setCode(fromText(text, f)); };

  return (
    <Card title="Convert text to binary and back">
      <div className="flex flex-wrap gap-1.5 mb-4">
        {Object.entries(FORMATS).map(([k, { label }]) => (
          <button key={k} type="button" onClick={() => switchFmt(k)} className={`text-sm px-3 py-1.5 rounded-md border transition ${fmt === k ? 'bg-accent/15 border-accent/50 text-accent' : 'bg-tint/5 border-line hover:bg-accent/10'}`}>{label}</button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1.5"><label htmlFor="b2t-text" className="text-xs font-semibold text-fg-subtle">Text</label><CopyButton text={text} /></div>
          <textarea id="b2t-text" className="field text-sm h-44" value={text} onChange={(e) => onText(e.target.value)} spellCheck={false} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5"><label htmlFor="b2t-code" className="text-xs font-semibold text-fg-subtle">{FORMATS[fmt].label}</label><CopyButton text={code} /></div>
          <textarea id="b2t-code" className="field font-mono text-xs h-44" value={code} onChange={(e) => onCode(e.target.value)} spellCheck={false} />
        </div>
      </div>
      {err && <p role="alert" className="mt-3 bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{err}</p>}
      <p className="text-xs text-fg-subtle mt-3">Type in either box; the other updates. Text is encoded as UTF-8, so accented letters and emoji take 2 to 4 bytes.</p>
    </Card>
  );
}
