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

export const config = {
  matcher: ['/((?!_next/|api/|$|app/dashboard/|.*[^/]*\\.(?!html$)[^/]+$).*)']
}
