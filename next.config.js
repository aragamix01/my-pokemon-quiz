/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.pokemon.com',
      },
    ],
    formats: ['image/webp', 'image/avif'], // Modern formats for optimization
    minimumCacheTTL: 60 * 60 * 24 * 30, // Cache for 30 days,
    unoptimized: true
  },

  // Webpack configuration for @xenova/transformers compatibility
  // NOTE: Turbopack is disabled to use webpack for proper @xenova/transformers support
  webpack: (config, { isServer }) => {
    // Fix for @xenova/transformers - externalize sharp on server
    if (isServer) {
      config.externals = [...(config.externals || []), 'sharp'];
    }

    // Add fallbacks for node modules not available in browser
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };

    // Handle .node files and WASM
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });

    return config;
  },
}

module.exports = nextConfig