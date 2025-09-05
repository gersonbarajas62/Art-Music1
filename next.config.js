// next.config.js
/**
 * Make sure your next.config.js exports an object, not a function or empty string.
 * Example of a valid config:
 */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // ...other config options...
};

module.exports = nextConfig;