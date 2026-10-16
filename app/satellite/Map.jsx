'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TILES, LABELS, ROADS } from '../components/tileLayers.js';

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

// Reports the view after every pan or zoom, so the page can look up the
// imagery under the centre of the screen and keep the share link current.
function ViewReporter({ onView, onPin }) {
  const map = useMapEvents({
    moveend() { const c = map.getCenter(); onView(c.lat, c.lng, map.getZoom()); },
    click(e) { onPin(e.latlng.lat, e.latlng.lng); },
  });
  useEffect(() => { const c = map.getCenter(); onView(c.lat, c.lng, map.getZoom()); }, [map]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export default function Map({ center, zoom, pin, labels, roads, onView, onPin }) {
  const sat = TILES.satellite;
  return (
    <div className="w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-line">
      <MapContainer
        center={center}
        zoom={zoom}
        maxZoom={19}
        className="w-full h-full"
        scrollWheelZoom
        worldCopyJump
        aria-label="Satellite imagery map"
      >
        <TileLayer attribution={sat.attribution} url={sat.url} maxZoom={sat.maxZoom} />
        {roads && <TileLayer attribution={ROADS.attribution} url={ROADS.url} maxZoom={19} />}
        {labels && <TileLayer attribution={LABELS.attribution} url={LABELS.url} maxZoom={19} />}
        <FlyTo center={center} zoom={zoom} />
        <ViewReporter onView={onView} onPin={onPin} />
        {pin && (
          <Marker position={[pin.lat, pin.lon]} icon={pinIcon} alt="Pinned location">
            <Popup>
              <div className="font-semibold">{pin.label}</div>
              <div className="text-xs">{pin.lat.toFixed(6)}, {pin.lon.toFixed(6)}</div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
