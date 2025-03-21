/** @type {import('next').NextConfig} */

// const withPurgeCss = require("next-purgecss")

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  compiler: {
    // removeConsole: true,
    // reactRemoveProperties: { properties: ["^data-testid$"] },
  },
}

export default nextConfig
