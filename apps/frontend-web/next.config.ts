import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    return [
      {
        source: "/api/:path*",
        destination: `${baseUrl}/api/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ss3.4sqi.net", // For categories
      },
      {
        protocol: "https",
        hostname: "fastly.4sqi.net", // For photos
      },
    ],
  },
};

export default nextConfig;
