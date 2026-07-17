/** @type {import('next').NextConfig} */
module.exports = {
  output: process.env.VERCEL ? undefined : 'standalone',
  trailingSlash: false,
  skipTrailingSlashRedirect: true,

  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'api.learntechww.com' },
      { protocol: 'https', hostname: 'newapi.learntechww.com' },
      { protocol: 'https', hostname: 'learntechww.com' },
    ],
  },

  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
}
