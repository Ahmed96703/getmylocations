'use client';

import { useEffect, useState } from 'react';
import { Card, CopyButton, Badge } from '../components/toolUi.jsx';
import { md5 } from './md5.js';

const ALGOS = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');

async function hashAll(bytes) {
  const out = { MD5: md5(bytes) };
  for (const a of ALGOS.slice(1)) out[a] = hex(await crypto.subtle.digest(a, bytes));
  return out;
}

export default function Tool() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [hashes, setHashes] = useState(null);
  const [upper, setUpper] = useState(false);
  const [check, setCheck] = useState('');
  const [tooBig, setTooBig] = useState('');
  const alertTooBig = (f) => setTooBig(`${f.name} is ${(f.size / 1024 ** 3).toFixed(1)} GB. Files up to 512 MB can be hashed in the browser; for larger ones use certutil (Windows), shasum (Mac) or sha256sum (Linux).`);

  // Text hashes update as you type.
  useEffect(() => {
    if (file) return;
    let live = true;
    hashAll(new TextEncoder().encode(text)).then((h) => live && setHashes(h));
    return () => { live = false; };
  }, [text, file]);

  const pickFile = async (f) => {
    if (!f) return;
    if (f.size > 512 * 1024 * 1024) { alertTooBig(f); return; }
    setTooBig('');
    setFile({ name: f.name, size: f.size });
    setHashes(null);
    const bytes = new Uint8Array(await f.arrayBuffer());
    setHashes(await hashAll(bytes));
  };

  const want = check.trim().toLowerCase();
  const match = want && hashes ? Object.entries(hashes).find(([, v]) => v === want)?.[0] : null;

  return (
    <Card title="Generate MD5, SHA-1 and SHA-256 hashes">
      {!file ? (
        <textarea className="field font-mono text-sm h-32" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste text to hash" aria-label="Text to hash" spellCheck={false} />
      ) : (
        <div className="rounded-lg border border-line bg-tint/5 p-3 text-sm flex flex-wrap items-center justify-between gap-2">
          <span><strong>{file.name}</strong> · {file.size.toLocaleString()} bytes</span>
          <button type="button" className="btn-ghost text-xs" onClick={() => { setFile(null); setHashes(null); }}>Hash text instead</button>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
        <label className="btn-ghost text-xs cursor-pointer">
          Hash a file…
          <input type="file" className="sr-only" onChange={(e) => pickFile(e.target.files?.[0])} />
        </label>
        <label className="flex items-center gap-1.5 text-xs"><input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} /> Uppercase</label>
        <span className="text-xs text-fg-subtle">Text is encoded as UTF-8. Nothing leaves your device.</span>
      </div>
      {tooBig && <p role="alert" className="mt-3 bg-rose-500/10 border border-rose-400/30 text-rose-500 rounded-lg p-3 text-sm">{tooBig}</p>}
      {!hashes && file && <p className="text-sm text-fg-subtle mt-3">Hashing…</p>}
      {hashes && (
        <div className="mt-4 space-y-2">
          {ALGOS.map((a) => {
            const v = upper ? hashes[a].toUpperCase() : hashes[a];
            return (
              <div key={a} className={`flex flex-wrap items-center gap-2 rounded-lg border px-3 py-2 ${match === a ? 'border-emerald-400/60 bg-emerald-500/10' : 'border-line bg-tint/5'}`}>
                <span className="text-xs font-semibold w-16">{a}</span>
                <span className="font-mono text-xs break-all flex-1 min-w-0">{v}</span>
                <CopyButton text={v} />
              </div>
            );
          })}
        </div>
      )}
      <div className="mt-4">
        <input className="field font-mono text-xs" value={check} onChange={(e) => setCheck(e.target.value)} placeholder="Paste an expected hash to compare (optional)" aria-label="Expected hash" />
        {want && hashes && <p className="mt-2 text-sm">{match ? <><Badge ok>Match</Badge> It is the {match} hash of this {file ? 'file' : 'text'}.</> : <><Badge ok={false}>No match</Badge> None of the hashes is equal to the one you pasted.</>}</p>}
      </div>
    </Card>
  );
}
