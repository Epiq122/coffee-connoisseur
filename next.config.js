const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    config.resolve.alias['components'] = path.join(__dirname, 'components');
    return config;
  },
};

module.exports = nextConfig;
