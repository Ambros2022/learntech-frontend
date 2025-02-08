import { NextResponse } from 'next/server'

export async function middleware(req) {
  const url = req.nextUrl.clone()
  let currentPath = url.pathname
  console.log("middleware1", currentPath)
  // Normalize the path by removing the trailing slash, except for the root path
  if (currentPath !== '/' && currentPath.endsWith('/')) {
    currentPath = currentPath.slice(0, -1)
  }

  try {
    // Fetch dynamic redirection mappings from the API
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URI}redirecturls` // Ensure the environment variable is correctly set
    const response = await fetch(apiUrl)

    if (response.ok) {
      const redirections = await response.json()

      // Find a match for the current path
      const redirect = redirections.find(item => item.old_url === currentPath)

      if (redirect) {
        // Redirect to the new URL
        url.pathname = redirect.new_url
        return NextResponse.redirect(url,301)
      }
    } else {
      console.error(`Failed to fetch redirect mappings: ${response.statusText}`)
    }
  } catch (error) {
    console.error('Error fetching redirect mappings:', error)
  }

  // Proceed to the next middleware or route if no redirects match
  return NextResponse.next()
}

// Specify which routes the middleware applies to
export const config = {
  matcher: '/:path*' // Apply to all paths
}
