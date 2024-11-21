import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["giphy.gif", "unsplash.com"],
  },
};

export default withNextIntl(nextConfig);
