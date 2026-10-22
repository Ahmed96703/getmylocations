'use client';

import { useState } from 'react';
import { Card, ResultTable } from '../components/toolUi.jsx';

// Every unit in bits.
export const UNITS = [
  ['bit', 'Bit (b)', 1],
  ['B', 'Byte (B)', 8],
  ['kb', 'Kilobit (kb)', 1e3],
  ['Mb', 'Megabit (Mb)', 1e6],
  ['Gb', 'Gigabit (Gb)', 1e9],
  ['Tb', 'Terabit (Tb)', 1e12],
  ['KB', 'Kilobyte (KB)', 8e3],
  ['MB', 'Megabyte (MB)', 8e6],
  ['GB', 'Gigabyte (GB)', 8e9],
  ['TB', 'Terabyte (TB)', 8e12],
  ['PB', 'Petabyte (PB)', 8e15],
  ['KiB', 'Kibibyte (KiB)', 8 * 1024],
  ['MiB', 'Mebibyte (MiB)', 8 * 1024 ** 2],
  ['GiB', 'Gibibyte (GiB)', 8 * 1024 ** 3],
  ['TiB', 'Tebibyte (TiB)', 8 * 1024 ** 4],
];
const BITS = Object.fromEntries(UNITS.map(([k, , v]) => [k, v]));

export function fmtNum(n) {
  if (n === 0) return '0';
  const a = Math.abs(n);
  if (a >= 1e15 || a < 1e-6) return n.toExponential(4).replace(/\.?0+e/, 'e');
  return n.toLocaleString('en-US', { maximumFractionDigits: a >= 100 ? 2 : a >= 1 ? 4 : 8 });
}

export function duration(seconds) {
  if (!Number.isFinite(seconds)) return '—';
  if (seconds < 1) return `${(seconds * 1000).toFixed(0)} ms`;
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  return [d && `${d} d`, h && `${h} h`, m && `${m} min`, (s || (!d && !h && !m)) && `${s} s`].filter(Boolean).join(' ');
}

export default function Tool() {
  const [value, setValue] = useState('1');
  const [unit, setUnit] = useState('GB');
  const [size, setSize] = useState('4');
  const [sizeUnit, setSizeUnit] = useState('GB');
  const [speed, setSpeed] = useState('100');

  const bits = Number(value) * BITS[unit];
  const valid = value.trim() !== '' && Number.isFinite(bits) && bits >= 0;
  const seconds = (Number(size) * BITS[sizeUnit]) / (Number(speed) * 1e6);

  return (
    <Card title="Convert bytes, bits and data sizes">
      <div className="flex flex-wrap gap-2">
        <input className="field flex-1 min-w-[140px] font-mono" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} aria-label="Amount" />
        <select className="field w-auto" value={unit} onChange={(e) => setUnit(e.target.value)} aria-label="Unit">
          {UNITS.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
        </select>
      </div>
      {valid ? (
        <ResultTable
          head={['Unit', 'Value']}
          mono={[1]}
          rows={UNITS.filter(([k]) => k !== unit).map(([k, label, b]) => [label, fmtNum(bits / b)])}
        />
      ) : <p className="text-sm text-rose-500 mt-3">Enter a number, such as 1.5.</p>}

      <h3 className="font-semibold mt-6">How long will a download take?</h3>
      <div className="flex flex-wrap items-center gap-2 mt-2 text-sm">
        <input className="field w-24 font-mono" inputMode="decimal" value={size} onChange={(e) => setSize(e.target.value)} aria-label="File size" />
        <select className="field w-auto" value={sizeUnit} onChange={(e) => setSizeUnit(e.target.value)} aria-label="File size unit">
          {['MB', 'GB', 'TB', 'MiB', 'GiB'].map((k) => <option key={k}>{k}</option>)}
        </select>
        <span>at</span>
        <input className="field w-24 font-mono" inputMode="decimal" value={speed} onChange={(e) => setSpeed(e.target.value)} aria-label="Speed in Mbps" />
        <span>Mbps</span>
      </div>
      <p className="mt-3 text-lg font-semibold text-fg">{Number(speed) > 0 && Number(size) >= 0 ? duration(seconds) : '—'}</p>
      <p className="text-xs text-fg-subtle">At full speed. Real downloads are usually 10 to 20 percent slower because of network overhead and Wi-Fi.</p>
    </Card>
  );
}
