import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval'
        https://www.googletagmanager.com
        https://www.google-analytics.com
        https://www.googleadservices.com
        https://www.google.com
        https://www.gstatic.com;
      connect-src 'self'
        https://www.google-analytics.com
        https://www.googletagmanager.com
        https://www.googleadservices.com;
      img-src 'self' data:
        https://www.google-analytics.com
        https://www.googletagmanager.com
        https://stats.g.doubleclick.net;
      frame-src
        https://www.googletagmanager.com
        https://www.google.com
        https://www.google.com/ads;
    `.replace(/\n/g, " "), // elimina saltos de línea
  },
];

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'backend-ecommerce-87y0.onrender.com', 'res.cloudinary.com'],
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
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
