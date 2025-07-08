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
  matcher: '/:path*' 
}



