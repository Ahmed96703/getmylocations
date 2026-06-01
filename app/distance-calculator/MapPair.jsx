'use client';

import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icons in Leaflet + Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
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
        attribution='&copy; OpenStreetMap, &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
      />
      <Marker position={a} />
      <Marker position={b} />
      <Polyline positions={[a, b]} color="#0ea5e9" weight={3} opacity={0.85} />
      <FitBounds a={a} b={b} />
    </MapContainer>
  );
}
