/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('swisseph');
    }
    return config;
  },
};

module.exports = nextConfig;
