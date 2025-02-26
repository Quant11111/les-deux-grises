import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["giphy.gif", "unsplash.com", "dsq73kname7kn.cloudfront.net"],
  },
  compiler: {
    styledComponents: true,
  },
};

export default withNextIntl(nextConfig);
