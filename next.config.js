/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    domains: ['images.unsplash.com', 'assets.aceternity.com', 'static.vecteezy.com', 'tctrail.ca', 'c8.alamy.com', 'media.istockphoto.com'],
  }
}

module.exports = nextConfig
