'use client';

import { MapContainer, TileLayer, Marker, Polyline, CircleMarker, Tooltip, useMap } from 'react-leaflet';
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

function FitBounds({ path }) {
  const map = useMap();
  useEffect(() => {
    if (path?.length) map.fitBounds(path, { padding: [40, 40] });
  }, [path, map]);
  return null;
}

// `path` is the geodesic from A to B with longitudes unwrapped (they may run
// past ±180), so a route across the Pacific is drawn as one short curve.
export default function MapPair({ path, midpoint }) {
  if (!path?.length) return null;
  const a = path[0];
  const b = path[path.length - 1];
  // Put the midpoint marker on the same unwrapped longitude as the path.
  const ref = path[Math.floor(path.length / 2)][1];
  let midLon = midpoint[1];
  while (midLon - ref > 180) midLon -= 360;
  while (midLon - ref < -180) midLon += 360;
  return (
    <MapContainer center={a} zoom={3} worldCopyJump={false} className="w-full h-full">
      <TileLayer
        attribution={TILES.dark.attribution}
        url={TILES.dark.url}
        maxZoom={TILES.dark.maxZoom}
        className={TILES.dark.className}
      />
      <Polyline positions={path} pathOptions={{ color: '#0ea5e9', weight: 3, opacity: 0.9 }} />
      <Marker position={a}><Tooltip>A</Tooltip></Marker>
      <Marker position={b}><Tooltip>B</Tooltip></Marker>
      <CircleMarker center={[midpoint[0], midLon]} radius={5} pathOptions={{ color: '#f59e0b', fillOpacity: 1 }}>
        <Tooltip>Midpoint</Tooltip>
      </CircleMarker>
      <FitBounds path={path} />
    </MapContainer>
  );
}
