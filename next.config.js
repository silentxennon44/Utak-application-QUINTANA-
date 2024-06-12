/** @type {import('next').NextConfig} */
const withImages = require('next-images');

const nextConfig = withImages({
  reactStrictMode: false,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
});

module.exports = nextConfig;
