/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {

  trailingSlash: false, // REMOVE
  skipTrailingSlashRedirect: true, // REMOVE

  images: {
    domains: ['api.learntechww.com', 'learntechww.com']
  },
  async redirects() {
    return [
      {
        source: '/:path((?!.*\\/).+)',
        has: [
          {
            type: 'header',
            key: 'x-vercel-id'
          }
        ],
        permanent: true, // 🔁 This forces a 301 instead of 308
        destination: '/:path/'
      }
    ]
  },
  swcMinify: true,
  experimental: {
    optimizeCss: true
  },
  async headers() {
    return [
      {
<<<<<<< HEAD
        source: "/api/:path*",
=======
        // matching all API routes
        source: '/api/:path*',
>>>>>>> 4c954bd3c5640d1b12db2f7425cabc07b461ffe2
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
          }
        ]
      }
<<<<<<< HEAD
    ];
  },
}
=======
    ]
  }
}
>>>>>>> 4c954bd3c5640d1b12db2f7425cabc07b461ffe2
