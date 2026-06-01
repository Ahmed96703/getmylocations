'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { FlyTo, LocateButton, CopyFloating } from './MapControls.jsx';
import 'leaflet/dist/leaflet.css';

const pulseIcon = L.divIcon({
  className: 'pulse-icon-wrapper',
  html: '<div class="pulse-marker" role="img" aria-label="Your location"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

export default function MapView({ pos, onLocate, onCopied }) {
  const fmt = (n, d = 5) => Number(n).toFixed(d);
  return (
    <MapContainer
      center={pos}
      zoom={15}
      className="w-full h-full"
      scrollWheelZoom
      aria-label="Interactive map showing the current location"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap, &copy; CARTO'
        url={TILE_URL}
        subdomains="abcd"
      />
      <Marker position={pos} icon={pulseIcon} alt="Current location marker">
        <Popup>
          <div className="font-semibold">You are here</div>
          <div className="text-xs">{fmt(pos[0])}, {fmt(pos[1])}</div>
        </Popup>
      </Marker>
      <FlyTo pos={pos} />
      <LocateButton pos={pos} onLocate={onLocate} />
      <CopyFloating pos={pos} onCopied={onCopied} />
    </MapContainer>
  );
}
