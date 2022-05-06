/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    network: 'local'
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/swap',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
