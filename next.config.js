const path = require('path');
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { dev }) => {
    config.resolve.alias['components'] = path.join(__dirname, 'components');
    return config;
  },
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;
