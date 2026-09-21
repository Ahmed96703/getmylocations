// Basemap tile sources — single source of truth for every map on the site.
//
// These were CARTO (basemaps.cartocdn.com) until September 2026, when CARTO
// began requiring an API key and started stamping "API KEY REQUIRED" across
// unauthenticated tiles. Everything here is keyless.
//
// The dark style is plain OpenStreetMap run through a CSS invert filter
// (.map-tiles-dark in globals.css) rather than a purpose-built dark basemap:
// Esri's Dark Gray Canvas is keyless but stops at zoom 16 and serves a
// "Map data not yet available" placeholder beyond it, which is useless for a
// location tool where people zoom to their own street.

const OSM = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const OSM_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export const TILES = {
  light: {
    url: OSM,
    attribution: OSM_ATTR,
    maxZoom: 19,
  },
  dark: {
    url: OSM,
    attribution: OSM_ATTR,
    maxZoom: 19,
    className: 'map-tiles-dark',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, USDA, USGS, GeoEye, IGN, IGP, and the GIS User Community',
    maxZoom: 19,
  },
};

// The /maps page labels its light style "standard".
TILES.standard = TILES.light;

export default TILES;
