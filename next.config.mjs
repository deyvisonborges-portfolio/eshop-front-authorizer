/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default nextConfig;
