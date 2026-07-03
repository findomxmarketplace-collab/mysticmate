import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow larger body size for readings with detailed content
  serverExternalPackages: ['pdf-lib'],
};

export default nextConfig;
