import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["giphy.gif", "unsplash.com"],
  },
  compiler: {
    styledComponents: true,
  },
};

export default withNextIntl(nextConfig);
