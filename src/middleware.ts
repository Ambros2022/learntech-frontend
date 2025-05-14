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
    } else {
      console.error(`Failed to fetch redirect mappings: ${response.statusText}`)
    }
  } catch (error) {
    console.error('Error fetching redirect mappings:', error)
  }


  return NextResponse.next()
}


export const config = {
  matcher: '/:path*' 
}
