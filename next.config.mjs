import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dsq73kname7kn.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "giphy.gif",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

export default withNextIntl(nextConfig);
