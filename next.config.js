/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.datocms-assets.com',
      },
    ],
  },
  i18n: {
      locales: ["en", "pt"],
      defaultLocale: "pt",
  },
}

module.exports = nextConfig
