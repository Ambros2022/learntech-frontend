/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true, // ← IMPORTANT
  //skipTrailingSlashRedirect: true, // ← THIS DISABLES 308 REDIRECTS
  images: {
    domains: ['api.learntechww.com', 'learntechww.com']
  },
  redirects: async () => [
    {
      source: '/:path((?!_next|api).*)',
      has: [
        {
          type: 'header',
          key: 'x-vercel-id'
        }
      ],
      missing: [
        {
          type: 'query',
          key: '_nextDataReq'
        }
      ],
      permanent: true, // 👈 this ensures 301 instead of 308
      destination: '/:path/' // add trailing slash
    }
  ],
  swcMinify: true,
  experimental: {
    optimizeCss: true
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
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
    ]
  }
}
