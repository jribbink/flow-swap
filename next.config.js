/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  env: {
    NETWORK: 'local'
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/swap',
        permanent: true
      }
    ];
  }
};
