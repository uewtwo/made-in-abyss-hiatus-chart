/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_FRONTEND_ORIGIN,
  generateRobotsTxt: true,
  changefreq: "monthly",
}
