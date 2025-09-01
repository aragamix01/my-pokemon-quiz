/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com', 'assets.pokemon.com'],
    formats: ['image/webp', 'image/avif'], // Modern formats for optimization
    minimumCacheTTL: 60 * 60 * 24 * 30, // Cache for 30 days,
    unoptimized: true
  },
}

module.exports = nextConfig