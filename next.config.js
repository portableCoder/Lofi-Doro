
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['img.youtube.com'],
    loader: 'akamai',
    path: '',
  },

  basePath: '/Lofi-Doro',
  assetPrefix: '/Lofi-Doro'
}

module.exports = nextConfig
