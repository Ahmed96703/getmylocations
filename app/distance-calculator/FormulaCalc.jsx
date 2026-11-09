'use client';

import { useState } from 'react';
import { track } from '../components/track.js';

const num = (v) => (v.trim() === '' ? NaN : Number(v));
const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(4).replace(/\.?0+$/, ''));

// Distance formula calculator for points on a flat (x, y) or 3D (x, y, z) grid,
// with the working shown step by step.
export default function FormulaCalc() {
  const [v, setV] = useState({ x1: '1', y1: '2', z1: '', x2: '4', y2: '6', z2: '' });
  const set = (k) => (e) => setV((o) => ({ ...o, [k]: e.target.value }));

  const [x1, y1, x2, y2] = [num(v.x1), num(v.y1), num(v.x2), num(v.y2)];
  const has3d = v.z1.trim() !== '' || v.z2.trim() !== '';
  const [z1, z2] = [has3d ? num(v.z1 || '0') : 0, has3d ? num(v.z2 || '0') : 0];
  const ok = [x1, y1, x2, y2, z1, z2].every(Number.isFinite);
  const dx = x2 - x1, dy = y2 - y1, dz = z2 - z1;
  const sum = dx * dx + dy * dy + dz * dz;
  const d = Math.sqrt(sum);

  const box = (k, label) => (
    <label className="flex flex-col text-xs text-fg-subtle">
      {label}
      <input className="field mt-1 w-full font-mono" inputMode="decimal" value={v[k]} onChange={set(k)} onBlur={() => ok && track('tool_run', { tool: 'distance_formula' })} aria-label={`Point ${label}`} />
    </label>
  );

  return (
    <div className="glass rounded-2xl p-5 mt-4">
      <h3 className="font-display text-lg font-bold">Distance formula calculator</h3>
      <div className="mt-3 grid grid-cols-3 gap-2 max-w-md">
        {box('x1', 'x₁')}{box('y1', 'y₁')}{box('z1', 'z₁ (optional)')}
        {box('x2', 'x₂')}{box('y2', 'y₂')}{box('z2', 'z₂ (optional)')}
      </div>
      <div className="mt-4 text-sm text-fg-muted font-mono leading-relaxed" aria-live="polite">
        {ok ? (
          <>
            <p>d = √(({fmt(x2)} − {fmt(x1)})² + ({fmt(y2)} − {fmt(y1)})²{has3d ? ` + (${fmt(z2)} − ${fmt(z1)})²` : ''})</p>
            <p>d = √({fmt(dx)}² + {fmt(dy)}²{has3d ? ` + ${fmt(dz)}²` : ''}) = √{fmt(sum)}</p>
            <p className="text-fg text-base font-semibold mt-1">d = {fmt(d)}</p>
          </>
        ) : (
          <p className="text-rose-500">Enter a number in each x and y box.</p>
        )}
      </div>
    </div>
  );
}
