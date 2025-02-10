/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: true,
    reactRemoveProperties: { properties: ["^data-testid$"] },
  },
};

export default nextConfig;
