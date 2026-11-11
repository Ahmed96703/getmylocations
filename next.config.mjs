import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — generates real HTML for every page at build time.
  // Output goes to /out directory. Deploy this to Cloudflare.
  output: 'export',

  // Trailing slashes are nicer for Cloudflare static hosting
  trailingSlash: false,

  // Allow images from any source (geolocation tools use OpenStreetMap tiles)
  images: {
    unoptimized: true,
  },

  // Disable React strict mode double-renders in production
  reactStrictMode: true,

  // Don't typecheck on build (no TS in project)
  typescript: { ignoreBuildErrors: true },

  // Don't ESLint on build
  eslint: { ignoreDuringBuilds: true },

  // satellite.js (ISS Tracker) also ships an optional WebAssembly build that
  // needs Node built-ins; the tracker uses only the JavaScript SGP4, so drop it.
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      [fileURLToPath(new URL('./node_modules/satellite.js/dist/wasm/index.js', import.meta.url))]: false,
    };
    return config;
  },
};

export default nextConfig;
