'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { usePlace, PlaceSearch } from '../components/usePlace.jsx';
import CopyButton from '../components/CopyButton.jsx';
import { track } from '../components/track.js';
import { polygonArea, pathLength, selfIntersects, AREA_UNITS, fmtNum } from './area.js';

const DrawMap = dynamic(() => import('../components/DrawMap.jsx'), {
  ssr: false,
  loading: () => <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-tint/5 animate-pulse rounded-2xl border border-line" aria-label="Loading map" />,
});

export default function Tool() {
  const [pts, setPts] = useState([]);
  const [view, setView] = useState(null);
  const [tracked, setTracked] = useState(false);

  const place = usePlace((lat, lon) => setView({ lat, lon, zoom: 17 }));
  const add = (lat, lon) => {
    setPts((p) => [...p, [lat, lon]]);
    if (!tracked && pts.length === 2) { track('tool_run'); setTracked(true); }
  };

  const area = polygonArea(pts);
  const perimeter = pathLength(pts, true);
  const crossed = selfIntersects(pts);
  const ready = pts.length >= 3;
  const summary = ready ? `${fmtNum(area)} m² · ${fmtNum(area / 4046.8564224)} acres · ${fmtNum(area / 10000)} ha` : '';

  return (
    <section className="glass rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-bold mb-4">Measure an area on the map</h2>
      <PlaceSearch place={place} button="Start at my location" placeholder="Go to an address, field, park or town" />

      <div className="flex flex-wrap items-center gap-2 mb-3 text-sm">
        <span className="text-fg-muted mr-auto">{pts.length ? `${pts.length} corner${pts.length === 1 ? '' : 's'}. Click to add more.` : 'Click the map at each corner of the area, in order.'}</span>
        <button type="button" className="btn-ghost py-1.5" disabled={!pts.length} onClick={() => setPts((p) => p.slice(0, -1))}>Undo</button>
        <button type="button" className="btn-ghost py-1.5" disabled={!pts.length} onClick={() => setPts([])}>Clear</button>
      </div>

      <DrawMap points={pts} onAdd={add} closed view={view} label="Map: click the corners of the area to measure" start={[40, -20]} startZoom={3} />
      <p className="mt-2 text-xs text-fg-subtle">Zoom in close and switch to Satellite to trace a field, garden, roof or plot. The shape closes back to the first corner on its own.</p>

      <div aria-live="polite" className="mt-4">
        {!ready && <p className="text-sm text-fg-subtle">Add at least three corners to see the area.</p>}
        {ready && crossed && <p role="alert" className="mb-3 bg-amber-500/10 border border-amber-400/40 text-amber-700 dark:text-amber-300 rounded-lg p-3 text-sm">Two sides of the shape cross each other, so the area is not right. Undo and click the corners in order around the edge.</p>}
        {ready && (
          <>
            <div className="rounded-xl p-4 border bg-tint/5 border-line flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-fg-subtle">Area</p>
                <p className="font-display text-3xl font-bold text-fg">{fmtNum(area / 4046.8564224)} acres</p>
                <p className="text-sm text-fg-muted">{fmtNum(area)} m² · {fmtNum(area / 10000)} hectares</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wide text-fg-subtle">Perimeter</p>
                <p className="font-mono text-lg text-fg">{fmtNum(perimeter)} m</p>
                <p className="text-sm text-fg-muted">{fmtNum(perimeter / 0.3048)} ft · {fmtNum(perimeter / 1609.344)} mi</p>
              </div>
            </div>
            <div className="mt-3 overflow-x-auto rounded-xl ring-1 ring-line" tabIndex={0} role="region" aria-label="Area in all units">
              <table className="w-full text-sm">
                <tbody>
                  {AREA_UNITS.map(([id, name, sym, m2]) => (
                    <tr key={id} className="border-t border-line-subtle first:border-0">
                      <th scope="row" className="text-left px-3 py-2 font-medium text-fg-muted">{name}</th>
                      <td className="px-3 py-2 font-mono text-fg text-right">{fmtNum(area / m2)} {sym}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 text-sm">
              <CopyButton text={summary} label="Copy area" className="text-accent hover:underline" />
              <CopyButton text={pts.map(([a, b]) => `${a.toFixed(6)}, ${b.toFixed(6)}`).join('\n')} label="Copy corner coordinates" className="text-accent hover:underline" />
            </div>
          </>
        )}
      </div>

      <p className="mt-4 text-xs text-fg-subtle leading-relaxed">
        Worked out on your device on the curved Earth, so large areas are measured correctly too. The result is as precise as your clicks: zoomed in on satellite imagery, a field is usually within 1 to 2% of a surveyed figure. For legal boundaries, use the title plan or a surveyor.
      </p>
    </section>
  );
}
