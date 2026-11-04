'use client';

import { useState } from 'react';
import { Card, ResultTable } from '../components/toolUi.jsx';
import { UNITS, BITS, fmtNum, duration } from './units.js';


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
