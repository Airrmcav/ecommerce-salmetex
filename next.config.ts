import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //  output: 'export',
  images: {
    domains: ['localhost', 'backend-ecommerce-87y0.onrender.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'backend-ecommerce-87y0.onrender.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
