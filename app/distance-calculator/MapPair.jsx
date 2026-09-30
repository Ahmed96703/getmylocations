'use client';

import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { TILES } from '../components/tileLayers.js';
import L from 'leaflet';

// Fix default marker icons in Leaflet + Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

function FitBounds({ a, b }) {
  const map = useMap();
  useEffect(() => {
    if (!a || !b) return;
    map.fitBounds([a, b], { padding: [40, 40] });
  }, [a, b, map]);
  return null;
}

export default function MapPair({ a, b }) {
  if (!a || !b) return null;
  return (
    <MapContainer center={a} zoom={3} className="w-full h-full">
      <TileLayer
        attribution={TILES.dark.attribution}
        url={TILES.dark.url}
        maxZoom={TILES.dark.maxZoom}
        className={TILES.dark.className}
      />
      <Marker position={a} />
      <Marker position={b} />
      <Polyline positions={[a, b]} color="#0ea5e9" weight={3} opacity={0.85} />
      <FitBounds a={a} b={b} />
    </MapContainer>
  );
}
