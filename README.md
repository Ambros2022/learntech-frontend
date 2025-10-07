# learntech-frontend

checking
ok
Next Js + React + mui + vuxxy + bootstrap + formik
oks
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

================ old version next.config.js=================
import { NextResponse } from 'next/server'

export async function middleware(req) {
const url = req.nextUrl.clone()
let currentPath = url.pathname
console.log("middleware1", currentPath)

if (currentPath !== '/' && currentPath.endsWith('/')) {
currentPath = currentPath.slice(0, -1)
}

try {

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URI}redirecturls`
    const response = await fetch(apiUrl)

    if (response.ok) {
      const redirections = await response.json()


      const redirect = redirections.find(item => item.old_url === currentPath)

      if (redirect) {

        url.pathname = redirect.new_url
        return NextResponse.redirect(url,301)
      }
    ];

},
q
async redirects() {

return NextResponse.next()
}

export const config = {
matcher: '/:path\*'
}

===============================

import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
console.log("===========================================================================================================================")
const { pathname } = request.nextUrl
const url = request.nextUrl.clone()

console.log('mid1', pathname)
// Skip static files and API routes
// if (pathname.startsWith('/\_next') || pathname.startsWith('/api') || pathname.includes('.') ) {
// return NextResponse.next()
// }

// Remove trailing slash (e.g., /about/ → /about)
// let currentPath = pathname
// if (currentPath !== '/' && currentPath.endsWith('/')) {
// currentPath = currentPath.slice(0, -1)
// url.pathname = currentPath
// console.log('2', url.pathname)
// NextResponse.rewrite(url)
// // return NextResponse.rewrite(url)

// }
// console.log('mid2', pathname)
try {
const apiUrl = `${process.env.NEXT_PUBLIC_API_URI}redirecturls`
const response = await fetch(apiUrl)

    if (response.ok) {
      // console.log('4', url.pathname)
      const redirections = await response.json()
      const redirect = redirections.find((item: { old_url: string; new_url: string }) => item.old_url === url.pathname)

      if (redirect) {
        url.pathname = redirect.new_url
        return NextResponse.redirect(url, 301)
      }
    } else {
      console.error(`Failed to fetch redirect mappings: ${response.statusText}`)
    }

} catch (error) {
console.error('Error fetching redirect mappings:', error)
}

return NextResponse.next()
}

// export const config = {
// matcher: ['/((?!_next|.*\\..*|api).*)'] // Avoid static, api, etc.
// }

export const config = {
matcher: [
'/((?!\_next|api|._\\.(?!html$)[^.]+$)._)'
]
}

=========final version
trailingSlash: false, // ← IMPORTANT
skipTrailingSlashRedirect: true, // ← THIS DISABLES 308 REDIRECTS

import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
console.log("===========================================================================================================================")
const { pathname } = request.nextUrl
const url = request.nextUrl.clone()

console.log('mid1', pathname)
// Skip static files and API routes
// if (pathname.startsWith('/\_next') || pathname.startsWith('/api') || pathname.includes('.') ) {
// return NextResponse.next()
// }

// Remove trailing slash (e.g., /about/ → /about)
// let currentPath = pathname
// if (currentPath !== '/' && currentPath.endsWith('/')) {
// currentPath = currentPath.slice(0, -1)
// url.pathname = currentPath
// console.log('2', url.pathname)
// NextResponse.rewrite(url)
// // return NextResponse.rewrite(url)

// }
// console.log('mid2', pathname)
try {
const apiUrl = `${process.env.NEXT_PUBLIC_API_URI}redirecturls`
const response = await fetch(apiUrl)

    if (response.ok) {
      // console.log('4', url.pathname)
      const redirections = await response.json()
      const redirect = redirections.find((item: { old_url: string; new_url: string }) => item.old_url === url.pathname)

      if (redirect) {
        url.pathname = redirect.new_url
        return NextResponse.redirect(url, 301)
      }
    } else {
      console.error(`Failed to fetch redirect mappings: ${response.statusText}`)
    }

} catch (error) {
console.error('Error fetching redirect mappings:', error)
}

return NextResponse.next()
}

// export const config = {
// matcher: ['/((?!_next|.*\\..*|api).*)'] // Avoid static, api, etc.
// }

// export const config = {
// matcher: [
// '/((?!\_next|api|._\\.(?!html$)[^.]+$)._)'
// ]
// }

// export const config = {
// matcher: [
// '/((?!\_next|api|app/dashboard(?:/._)?$|._\\.(?!html$)[^.]+$).\*)'
// ]
// }

export const config = {
matcher: [
/_
Match all routes, but skip: - \_next/_ - api/_ - / - app/dashboard/_ - any file with an extension other than .html
_/
'/((?!\_next/|api/|$|app/dashboard/|._[^/]_\\.(?!html$)[^/]+$)._)',
]
}
=====end

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
middelware without '/' to / 301

import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
const { pathname } = request.nextUrl

console.log("=========== MIDDLEWARE ===========")
console.log("Requested URL:", request.url)
console.log("Original pathname:", pathname)

// const isFile = pathname.includes('.')
const shouldRedirect =
!pathname.endsWith('/')

if (shouldRedirect) {
console.log("=========== MIDDLEWARE2 ===========")
const redirectUrl = request.nextUrl.clone()
redirectUrl.href = `${redirectUrl.href}/`

    // console.log("✅ Redirecting to:", redirectUrl.href)
    return NextResponse.redirect(redirectUrl, 301)

}

return NextResponse.next()
}

export const config = {
matcher: [
'/((?!\_next/|api/|$|app/dashboard/|.*[^/]*\\.(?!html$)[^/]+$).\*)',
],
}

---

import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
const url = request.nextUrl.clone()
console.log('Request URL:', url.href)

const isPrefetch = request.headers.get('x-middleware-prefetch') === '1'
if (isPrefetch) {
console.log('Prefetch detected:', url.href)
return NextResponse.next()
}

try {
const apiUrl = `${process.env.NEXT_PUBLIC_API_URI}redirecturls`
const response = await fetch(apiUrl)

    if (response.ok) {
      const redirections = await response.json()
      const redirect = redirections.find(
        (item: { old_url: string; new_url: string }) => item.old_url === url.pathname
      )

      if (redirect) {
        url.pathname = redirect.new_url
        url.href = url.origin + redirect.new_url
        console.log('Redirecting from backend mapping to:', url.href)
        return NextResponse.redirect(url, 301)
      }

      // Redirect trailing slash to no slash (e.g., /colleges/ -> /colleges)
      if (url.pathname !== '/' && url.pathname.endsWith('/')) {
        const cleanPath = url.pathname.slice(0, -1)
        url.pathname = cleanPath
        url.href = url.origin + cleanPath
        console.log('Removing trailing slash, redirecting to:', url.href)
        return NextResponse.redirect(url, 301)
      }
    } else {
      console.error(`Failed to fetch redirect mappings: ${response.statusText}`)
    }

} catch (error) {
console.error('Error fetching redirect mappings:', error)
}

return NextResponse.next()
}

======================================
