'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, CircleMarker, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { TILES } from '../components/tileLayers.js';
import { ageColor } from './fires.js';

function FitBounds({ points, fitKey }) {
  const map = useMap();
  useEffect(() => {
    if (points.length) map.fitBounds(points, { padding: [20, 20] });
  }, [fitKey, map]);
  return null;
}

function FlyTo({ focus }) {
  const map = useMap();
  useEffect(() => {
    if (focus) map.flyTo([focus.lat, focus.lon], Math.max(map.getZoom(), 11), { duration: 0.8 });
  }, [focus, map]);
  return null;
}

function ClickHandler({ onPick }) {
  useMapEvents({ click(e) { onPick(e.latlng.lat, e.latlng.lng); } });
  return null;
}

// Hotspots are drawn on a canvas, which stays fast with thousands of dots.
export default function FireMap({ center, circle, hotspots, now, fitKey, focus, onPick }) {
  const tiles = TILES.light;
  return (
    <div className="w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-line">
      <MapContainer center={center} zoom={6} preferCanvas className="w-full h-full" scrollWheelZoom worldCopyJump aria-label="Fire hotspot map">
        <TileLayer attribution={`${tiles.attribution} · Fire data: NASA FIRMS`} url={tiles.url} maxZoom={tiles.maxZoom} />
        <Polygon positions={circle} interactive={false} pathOptions={{ color: '#0ea5e9', weight: 2, fillOpacity: 0.06 }} />
        {hotspots.map((f) => {
          const hours = (now - f.t) / 3600000;
          return (
            <CircleMarker
              key={`${f.sat}${f.lat}${f.lon}${f.t}`}
              center={[f.lat, f.lon]}
              radius={f.frp > 50 ? 6 : 4}
              pathOptions={{ color: '#7f1d1d', weight: 0.5, fillColor: ageColor(hours), fillOpacity: 0.9 }}
            >
              <Tooltip>
                Detected {hours < 1 ? 'under an hour' : `${Math.round(hours)} h`} ago · {f.high ? 'high' : 'nominal'} confidence · {Math.round(f.frp)} MW
              </Tooltip>
            </CircleMarker>
          );
        })}
        <CircleMarker center={center} radius={6} pathOptions={{ color: '#0369a1', fillColor: '#0ea5e9', fillOpacity: 1 }}>
          <Tooltip>Search center</Tooltip>
        </CircleMarker>
        <FitBounds points={circle} fitKey={fitKey} />
        <FlyTo focus={focus} />
        <ClickHandler onPick={onPick} />
      </MapContainer>
    </div>
  );
}
