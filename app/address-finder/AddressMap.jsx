'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { TILES } from '../components/tileLayers.js';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

// MapContainer only reads `center` once, so move the view explicitly
// whenever a new result arrives (the old shared map kept the first view).
function Follow({ points }) {
  const map = useMap();
  const key = points.map((p) => p.join(',')).join(';');
  useEffect(() => {
    if (points.length === 1) map.flyTo(points[0], Math.max(map.getZoom(), 16), { duration: 0.8 });
    else map.flyToBounds(points, { padding: [60, 60], maxZoom: 18, duration: 0.8 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, map]);
  return null;
}

// `place` is the geocoded result; `query` (reverse lookups only) is the point
// the user entered, drawn with a dashed line to the address it resolved to.
export default function AddressMap({ place, label, query }) {
  const points = query ? [query, place] : [place];
  return (
    <MapContainer center={place} zoom={16} className="w-full h-full">
      <TileLayer
        attribution={TILES.light.attribution}
        url={TILES.light.url}
        maxZoom={TILES.light.maxZoom}
        className={TILES.light.className}
      />
      <Marker position={place}>
        <Popup>{label}</Popup>
      </Marker>
      {query && (
        <>
          <CircleMarker center={query} radius={6} pathOptions={{ color: '#f59e0b', fillOpacity: 1 }}>
            <Tooltip>Your point</Tooltip>
          </CircleMarker>
          <Polyline positions={[query, place]} pathOptions={{ color: '#f59e0b', dashArray: '6 6', weight: 2 }} />
        </>
      )}
      <Follow points={points} />
    </MapContainer>
  );
}
