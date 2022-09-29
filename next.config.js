/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.datocms-assets.com'],
  },
  // i18n: {
      // providing the locales supported by your application
   // locales: ["en", "pt"],
    //  default locale used when the non-locale paths are visited
   // defaultLocale: "pt",
  //},
}

module.exports = nextConfig
