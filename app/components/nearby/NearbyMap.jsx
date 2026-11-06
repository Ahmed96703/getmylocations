'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { TILES } from '../tileLayers.js';

function Fit({ points, fitKey }) {
  const map = useMap();
  useEffect(() => {
    if (points.length > 1) map.fitBounds(points, { padding: [30, 30], maxZoom: 17 });
    else if (points.length === 1) map.setView(points[0], 15);
  }, [fitKey, map]);
  return null;
}

function FlyTo({ focus }) {
  const map = useMap();
  useEffect(() => {
    if (focus) map.flyTo([focus.lat, focus.lon], Math.max(map.getZoom(), 17), { duration: 0.8 });
  }, [focus, map]);
  return null;
}

function ClickHandler({ onPick }) {
  useMapEvents({ click(e) { onPick(e.latlng.lat, e.latlng.lng); } });
  return null;
}

export default function NearbyMap({ center, places, color, label, fitKey, focus, onPick }) {
  const tiles = TILES.light;
  const points = center ? [[center.lat, center.lon], ...places.map((p) => [p.lat, p.lon])] : [];
  return (
    <div className="w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-line">
      <MapContainer
        center={center ? [center.lat, center.lon] : [50.5, 10]}
        zoom={center ? 14 : 4}
        className="w-full h-full"
        scrollWheelZoom
        aria-label={`Map of ${label}`}
      >
        <TileLayer attribution={tiles.attribution} url={tiles.url} maxZoom={tiles.maxZoom} />
        {places.map((p, i) => (
          <CircleMarker
            key={p.id}
            center={[p.lat, p.lon]}
            radius={i < 3 ? 9 : 7}
            pathOptions={{ color: '#ffffff', weight: 2, fillColor: color, fillOpacity: 0.95 }}
          >
            <Tooltip>{i + 1}. {p.tags.name || label}</Tooltip>
          </CircleMarker>
        ))}
        {center && (
          <CircleMarker center={[center.lat, center.lon]} radius={7} pathOptions={{ color: '#0369a1', fillColor: '#0ea5e9', fillOpacity: 1 }}>
            <Tooltip>{center.place === 'you' ? 'You' : 'Search point'}</Tooltip>
          </CircleMarker>
        )}
        <Fit points={points} fitKey={fitKey} />
        <FlyTo focus={focus} />
        <ClickHandler onPick={onPick} />
      </MapContainer>
    </div>
  );
}
