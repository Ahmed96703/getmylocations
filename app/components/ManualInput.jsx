'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const validLat = (n) => Number.isFinite(n) && n >= -90 && n <= 90;
const validLon = (n) => Number.isFinite(n) && n >= -180 && n <= 180;

export default function ManualInput({ pos, onApply }) {
  const [lat, setLat] = useState(pos ? String(pos[0].toFixed(6)) : '');
  const [lon, setLon] = useState(pos ? String(pos[1].toFixed(6)) : '');
  const [err, setErr] = useState('');

  useEffect(() => {
    if (pos) { setLat(String(pos[0].toFixed(6))); setLon(String(pos[1].toFixed(6))); }
  }, [pos?.[0], pos?.[1]]);

  const submit = (e) => {
    e.preventDefault();
    const la = parseFloat(lat);
    const lo = parseFloat(lon);
    if (!validLat(la)) return setErr('Latitude must be a number between −90 and 90.');
    if (!validLon(lo)) return setErr('Longitude must be a number between −180 and 180.');
    setErr('');
    onApply([la, lo]);
  };

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      onSubmit={submit}
      className="glass rounded-2xl p-4 mt-4 overflow-hidden"
      aria-label="Manual coordinate input"
    >
      <div className="text-xs uppercase tracking-[0.16em] text-accent font-semibold mb-3">Manual coordinates</div>
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs text-fg-subtle">Latitude</span>
          <input
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="e.g. 40.7128"
            inputMode="decimal"
            aria-label="Latitude"
            className="field mt-1"
          />
        </label>
        <label className="block">
          <span className="text-xs text-fg-subtle">Longitude</span>
          <input
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            placeholder="e.g. −74.0060"
            inputMode="decimal"
            aria-label="Longitude"
            className="field mt-1"
          />
        </label>
      </div>
      {err && <div role="alert" className="mt-2 text-xs text-rose-300">{err}</div>}
      <button type="submit" className="btn-primary w-full mt-3">Fly to location</button>
    </motion.form>
  );
}
