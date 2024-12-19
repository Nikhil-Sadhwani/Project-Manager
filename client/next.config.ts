import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://project-manager-server-three.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
