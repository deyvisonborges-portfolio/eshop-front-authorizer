/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
