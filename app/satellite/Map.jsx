'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const pinIcon = L.divIcon({
  className: 'pulse-icon-wrapper',
  html: '<div class="pulse-marker" role="img" aria-label="Pinned location"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function FlyTo({ center, zoom }) {
  const map = useMap();
  useEffect(() => { map.flyTo(center, zoom, { duration: 0.8 }); }, [center, zoom, map]);
  return null;
}

function ClickHandler({ onPin }) {
  useMapEvents({ click(e) { onPin(e.latlng.lat, e.latlng.lng); } });
  return null;
}

export default function Map({ center, zoom, pin, onPin }) {
  return (
    <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-line">
      <MapContainer
        center={center}
        zoom={zoom}
        className="w-full h-full"
        scrollWheelZoom
        maxZoom={19}
        aria-label="Satellite imagery map"
      >
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, USDA, USGS, GeoEye, IGN, IGP, and the GIS User Community'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          maxZoom={19}
        />
        <FlyTo center={center} zoom={zoom} />
        <ClickHandler onPin={onPin} />
        {pin && (
          <Marker position={[pin.lat, pin.lon]} icon={pinIcon}>
            <Popup>
              <div className="font-semibold">{pin.label}</div>
              <div className="text-xs">{pin.lat.toFixed(5)}, {pin.lon.toFixed(5)}</div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
