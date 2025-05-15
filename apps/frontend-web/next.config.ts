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
};

export default nextConfig;
