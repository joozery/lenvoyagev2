import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  // Increase body size limit for API routes (upload files)
  experimental: {
    serverActions: {
      bodySizeLimit: '300mb',
    },
  },
};

export default nextConfig;
