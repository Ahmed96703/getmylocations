'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Polyline, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { TILES } from '../components/tileLayers.js';

function Follow({ at, follow }) {
  const map = useMap();
  useEffect(() => {
    if (follow && at) map.panTo([at.lat, at.lon], { animate: true });
  }, [at, follow, map]);
  return null;
}

function ClickHandler({ onPick }) {
  useMapEvents({ click(e) { onPick?.(e.latlng.lat, e.latlng.lng); } });
  return null;
}

// World map with the craft, its ground track (past dashed, next orbit solid)
// and the observer.
export default function TrackMap({ at, past = [], next = [], me, follow, onPick, name }) {
  const tiles = TILES.light;
  return (
    <div className="w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-line">
      <MapContainer center={[20, 0]} zoom={2} minZoom={1} preferCanvas worldCopyJump className="w-full h-full" scrollWheelZoom aria-label={`Live map of the ${name}`}>
        <TileLayer attribution={`${tiles.attribution} · Orbit: CelesTrak`} url={tiles.url} maxZoom={tiles.maxZoom} />
        {past.map((p, i) => <Polyline key={`p${i}`} positions={p} interactive={false} pathOptions={{ color: '#64748b', weight: 2, dashArray: '4 6' }} />)}
        {next.map((p, i) => <Polyline key={`n${i}`} positions={p} interactive={false} pathOptions={{ color: '#2563eb', weight: 2.5 }} />)}
        {me && (
          <CircleMarker center={[me.lat, me.lon]} radius={6} pathOptions={{ color: '#0369a1', fillColor: '#0ea5e9', fillOpacity: 1 }}>
            <Tooltip>{me.where || 'Your place'}</Tooltip>
          </CircleMarker>
        )}
        {at && (
          <CircleMarker center={[at.lat, at.lon]} radius={9} pathOptions={{ color: '#ffffff', weight: 2, fillColor: '#dc2626', fillOpacity: 1 }}>
            <Tooltip permanent direction="right">{name}</Tooltip>
          </CircleMarker>
        )}
        <Follow at={at} follow={follow} />
        <ClickHandler onPick={onPick} />
      </MapContainer>
    </div>
  );
}
