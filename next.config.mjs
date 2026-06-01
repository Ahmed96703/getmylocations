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
};

export default nextConfig;
