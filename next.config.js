const { i18n } = require("./next-i18next.config")
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NEXT_PUBLIC_ENV === "develop",
})

module.exports = withPWA({
  i18n,
  reactStrictMode: true,
})
