'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { TILES } from '../components/tileLayers.js';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

export default function MapMarker({ lat, lon, label }) {
  return (
    <MapContainer center={[lat, lon]} zoom={10} className="w-full h-full">
      <TileLayer
        attribution={TILES.dark.attribution}
        url={TILES.dark.url}
        maxZoom={TILES.dark.maxZoom}
        className={TILES.dark.className}
      />
      <Marker position={[lat, lon]}>
        <Popup>{label}</Popup>
      </Marker>
    </MapContainer>
  );
}
