'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Circle, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { TILES } from './tileLayers.js';

function Fit({ center, points, radius, fitKey, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (!center) return;
    if (radius) {
      const d = radius / 111320;
      const e = radius / (111320 * Math.max(0.05, Math.cos((center.lat * Math.PI) / 180)));
      map.fitBounds([[center.lat - d, center.lon - e], [center.lat + d, center.lon + e]], { padding: [20, 20] });
    } else if (points.length) {
      map.fitBounds([[center.lat, center.lon], ...points.map((p) => [p.lat, p.lon])], { padding: [30, 30], maxZoom: 16 });
    } else {
      map.setView([center.lat, center.lon], zoom);
    }
  }, [fitKey, map]);
  return null;
}

function FlyTo({ focus }) {
  const map = useMap();
  useEffect(() => {
    if (focus) map.flyTo([focus.lat, focus.lon], Math.max(map.getZoom(), 15), { duration: 0.8 });
  }, [focus, map]);
  return null;
}

function ClickHandler({ onPick }) {
  useMapEvents({ click(e) { onPick?.(e.latlng.lat, e.latlng.lng); } });
  return null;
}

// Map shared by the single-purpose tools: a center point, an optional radius
// circle, and points drawn on a canvas ({ lat, lon, color, r, tip, key }).
export default function PointsMap({ center, points = [], radius, fitKey, focus, onPick, label = 'Map', centerTip = 'Search point', start = [30, 0], startZoom = 2, attribution = '', zoom = 13 }) {
  const tiles = TILES.light;
  return (
    <div className="w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-line">
      <MapContainer center={center ? [center.lat, center.lon] : start} zoom={center ? 12 : startZoom} preferCanvas worldCopyJump className="w-full h-full" scrollWheelZoom aria-label={label}>
        <TileLayer attribution={`${tiles.attribution}${attribution ? ` · ${attribution}` : ''}`} url={tiles.url} maxZoom={tiles.maxZoom} />
        {center && radius && (
          <Circle center={[center.lat, center.lon]} radius={radius} interactive={false} pathOptions={{ color: '#0ea5e9', weight: 2, fillOpacity: 0.05 }} />
        )}
        {points.map((p) => (
          <CircleMarker key={p.key} center={[p.lat, p.lon]} radius={p.r || 6} pathOptions={{ color: '#ffffff', weight: 1, fillColor: p.color || '#2563eb', fillOpacity: 0.9 }}>
            {p.tip && <Tooltip>{p.tip}</Tooltip>}
          </CircleMarker>
        ))}
        {center && (
          <CircleMarker center={[center.lat, center.lon]} radius={7} pathOptions={{ color: '#0369a1', fillColor: '#0ea5e9', fillOpacity: 1 }}>
            <Tooltip>{centerTip}</Tooltip>
          </CircleMarker>
        )}
        <Fit center={center} points={points} radius={radius} fitKey={fitKey} zoom={zoom} />
        <FlyTo focus={focus} />
        <ClickHandler onPick={onPick} />
      </MapContainer>
    </div>
  );
}
