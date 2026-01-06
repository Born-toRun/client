import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.b2r.kro.kr",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "cdn.b2r.kro.kr",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.BACKEND_URL || "https://be.b2r.kro.kr"}/api/v1/:path*`
      },
      {
        source: "/oauth2/:path*",
        destination: `${process.env.BACKEND_URL || "https://be.b2r.kro.kr"}/oauth2/:path*`,
      },
      {
        source: "/login/oauth2/code/:provider",
        destination: `${process.env.BACKEND_URL || "https://be.b2r.kro.kr"}/login/oauth2/code/:provider`,
      }
    ];
  },
};

export default nextConfig;
