# learntech-frontend

checking 
ok
Next Js + React + mui + vuxxy + bootstrap + formik
ok
npm i @types/react-star-rating-componentnpm install intl-tel-input
npm install react-rating-stars-component
npm i react-google-login
npm i file-saver
npm install react-linkedin-login-oauth2
npm install react-twitter-auth
npm i jodit-pro-react
npm install chart.js react-chartjs-2
npm i next-share
npm i react-web-share
npm i sharp
npm install framer-motion


v1|
V2


================ old version  next.config.js=================

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features


module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  images: {
    domains: ['localhost', 'preprod.keralastudy.com','3.6.46.89','api.learntechww.com'],
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

  async redirects() {

    return [

      {
        source: '/home',
        destination: '/colleges',
        permanent: true,
      },
      {
        source: '/study-in-india',
        destination: '/colleges',
        permanent: true,
      },
      {
        source: '/study-mbbs-abroad',
        destination: 'mbbs-abroad',
        permanent: true,
      },
      {
        source: '/medical-admission',
        destination: '/meds',
        permanent: true,
      },
      {
        source: '/copyright',
        destination: '/terms-and-conditions',
        permanent: true,
      },
      {
        source: '/ayurvedic-course',
        destination: '/course/7/ayurveda',
        permanent: true,
      },
      {
        source: '/meds-college',
        destination: '/colleges',
        permanent: true,
      },

    ]
  },




  
}





















