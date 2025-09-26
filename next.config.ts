/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["skillacross.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "skillacross.com",
        port: "",
        pathname: "/api/media/**",
      },
    ],
  },
};

module.exports = nextConfig;
