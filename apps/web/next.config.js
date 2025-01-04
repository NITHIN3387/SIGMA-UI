/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@sigma/ui"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    outputFileTracingIncludes: {
      "/api": ["packages/database/node_modules/.prisma/**"],
    },
    serverComponentsExternalPackages: ["@prisma/client", ".prisma"],
  },
};
