/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", "cdn-143.anonfiles.com", "robohash.org"]
  }
}

module.exports = nextConfig
