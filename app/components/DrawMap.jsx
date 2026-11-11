'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Polyline, Polygon, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { TILES } from './tileLayers.js';

function Clicks({ onAdd }) {
  useMapEvents({ click(e) { onAdd?.(e.latlng.lat, e.latlng.lng); } });
  return null;
}

function GoTo({ view }) {
  const map = useMap();
  useEffect(() => {
    if (view) map.setView([view.lat, view.lon], view.zoom || 16);
  }, [view, map]);
  return null;
}

// Map for drawing a line or an area by clicking. `points` are [lat, lon]
// pairs; `closed` draws a polygon instead of a line. `marks` are extra dots
// ({ lat, lon, color, tip }), e.g. the highest point on a profile.
export default function DrawMap({ points, onAdd, closed = false, view, marks = [], label = 'Map', start = [30, 0], startZoom = 2 }) {
  const [sat, setSat] = useState(false);
  const tiles = sat ? TILES.satellite : TILES.light;
  const color = sat ? '#facc15' : '#2563eb';
  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-line">
      <MapContainer center={start} zoom={startZoom} worldCopyJump className="w-full h-full" scrollWheelZoom doubleClickZoom={false} aria-label={label} style={{ cursor: 'crosshair' }}>
        <TileLayer key={sat ? 's' : 'm'} attribution={tiles.attribution} url={tiles.url} maxZoom={tiles.maxZoom || 19} />
        {points.length > 1 && (closed && points.length > 2
          ? <Polygon positions={points} interactive={false} pathOptions={{ color, weight: 3, fillOpacity: 0.2 }} />
          : <Polyline positions={points} interactive={false} pathOptions={{ color, weight: 3 }} />)}
        {points.map((p, i) => (
          <CircleMarker key={`${i}-${p[0]}`} center={p} radius={5} interactive={false} pathOptions={{ color: '#fff', weight: 2, fillColor: color, fillOpacity: 1 }} />
        ))}
        {marks.map((m) => (
          <CircleMarker key={m.key || `${m.lat},${m.lon}`} center={[m.lat, m.lon]} radius={7} pathOptions={{ color: '#fff', weight: 2, fillColor: m.color || '#dc2626', fillOpacity: 1 }}>
            {m.tip && <Tooltip permanent={!!m.permanent} direction="top">{m.tip}</Tooltip>}
          </CircleMarker>
        ))}
        <Clicks onAdd={onAdd} />
        <GoTo view={view} />
      </MapContainer>
      <button type="button" onClick={() => setSat((s) => !s)} className="absolute top-3 right-3 z-[500] text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/90 text-slate-900 shadow ring-1 ring-black/10 hover:bg-white">
        {sat ? 'Map' : 'Satellite'}
      </button>
    </div>
  );
}
