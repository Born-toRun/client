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
        hostname: "cdn.born-to-run.kro.kr",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "cdn.born-to-run.kro.kr",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
