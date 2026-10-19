'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, CircleMarker, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { TILES } from '../components/tileLayers.js';

function FitBounds({ shapes, fitKey }) {
  const map = useMap();
  useEffect(() => {
    const all = shapes.flatMap((s) => s.points);
    if (all.length) map.fitBounds(all, { padding: [30, 30], maxZoom: 16 });
    // Refit only when asked (new centre, radius or circle), not on every render.
  }, [fitKey, map]);
  return null;
}

function ClickHandler({ onPick }) {
  useMapEvents({ click(e) { onPick(e.latlng.lat, e.latlng.lng); } });
  return null;
}

// `shapes`: [{ id, color, points, center: [lat, lon], label, active }]
export default function RadiusMap({ shapes, fitKey, onPick }) {
  const tiles = TILES.light;
  return (
    <div className="w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-line">
      <MapContainer center={[40, -40]} zoom={3} className="w-full h-full" scrollWheelZoom worldCopyJump aria-label="Radius map">
        <TileLayer attribution={tiles.attribution} url={tiles.url} maxZoom={tiles.maxZoom} />
        {shapes.map((s) => (
          <Polygon
            key={s.id}
            positions={s.points}
            interactive={false}
            pathOptions={{ color: s.color, weight: s.active ? 3 : 2, fillColor: s.color, fillOpacity: s.active ? 0.18 : 0.1 }}
          />
        ))}
        {shapes.map((s) => (
          <CircleMarker key={`c${s.id}`} center={s.center} radius={5} pathOptions={{ color: s.color, fillColor: s.color, fillOpacity: 1 }}>
            <Tooltip direction="top" offset={[0, -6]} permanent={s.active}>{s.label}</Tooltip>
          </CircleMarker>
        ))}
        <FitBounds shapes={shapes} fitKey={fitKey} />
        <ClickHandler onPick={onPick} />
      </MapContainer>
    </div>
  );
}
