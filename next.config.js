/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
  images: {
    remotePatterns: [
      {

        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
