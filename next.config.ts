import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // ✅ disables ESLint checks during `next build`
    },
};

export default nextConfig;
