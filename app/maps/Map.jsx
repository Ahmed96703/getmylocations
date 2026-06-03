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

const TILE_CONFIG = {
  standard: {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap, &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19,
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, USDA, USGS, GeoEye, IGN, IGP, and the GIS User Community',
    subdomains: '',
    maxZoom: 19,
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap, &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19,
  },
};

function FlyTo({ center, zoom }) {
  const map = useMap();
  useEffect(() => { map.flyTo(center, zoom, { duration: 0.8 }); }, [center, zoom, map]);
  return null;
}

function ClickHandler({ onPin }) {
  useMapEvents({ click(e) { onPin(e.latlng.lat, e.latlng.lng); } });
  return null;
}

export default function Map({ center, zoom, pin, layer, onPin }) {
  const cfg = TILE_CONFIG[layer] || TILE_CONFIG.standard;
  return (
    <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-line">
      <MapContainer
        center={center}
        zoom={zoom}
        className="w-full h-full"
        scrollWheelZoom
        worldCopyJump
        aria-label="Interactive world map"
      >
        <TileLayer
          key={layer}
          attribution={cfg.attribution}
          url={cfg.url}
          subdomains={cfg.subdomains || undefined}
          maxZoom={cfg.maxZoom}
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
