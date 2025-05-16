/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['api.learntechww.com','learntechww.com'],
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ];
  },
  // Remove the redirects since middleware will handle them
  // async redirects() {
  //   return [
  //     {
  //       source: '/home',
  //       destination: '/colleges',
  //       permanent: true,
  //     },
  //     {
  //       source: '/study-in-india',
  //       destination: '/colleges',
  //       permanent: true,
  //     },
  //     {
  //       source: '/study-mbbs-abroad',
  //       destination: '/mbbs-abroad',
  //       permanent: true,
  //     },
  //     {
  //       source: '/medical-admission',
  //       destination: '/meds',
  //       permanent: true,
  //     },
  //     {
  //       source: '/copyright',
  //       destination: '/terms-and-conditions',
  //       permanent: true,
  //     },
  //     {
  //       source: '/ayurvedic-course',
  //       destination: '/course/7/ayurveda',
  //       permanent: true,
  //     },
  //     {
  //       source: '/meds-college',
  //       destination: '/colleges',
  //       permanent: true,
  //     },
  //   ]
  // },
}
