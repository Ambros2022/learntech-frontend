/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features


module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  images: {
    domains: ['localhost', 'preprod.keralastudy.com'],
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
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin", // "same-origin-allow-popups"
          },
        ],
      },
    ];
  },

  // async redirects() {
  //   console.log('redirect next')
  //   let array =  [

  //     {
  //       source: '/homes',
  //       destination: '/about',
  //       permanent: true,
  //     },]
  //   return [

  //     {
  //       source: '/homes',
  //       destination: '/about',
  //       permanent: true,
  //     },

  //   ]
  // },
}
