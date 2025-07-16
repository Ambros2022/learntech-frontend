import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const url = request.nextUrl.clone()

  // Skip middleware for static files and special Next.js paths
  const isFile = pathname.includes('.') || pathname.startsWith('/_next') || pathname.startsWith('/api')
  if (isFile) {
    return NextResponse.next()
  }

  // Normalize trailing slash
  if (!pathname.endsWith('/')) {
    url.pathname += '/'
    //return NextResponse.redirect(url)
  }

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URI}redirecturls`

    const response = await fetch(apiUrl)
    if (!response.ok) {
      console.error(`Failed to fetch redirect mappings: ${response.statusText}`)
      return NextResponse.next()
    }

    const redirections = await response.json()
    const redirect = redirections.find(
      (item: { old_url: string; new_url: string }) => item.old_url === pathname || item.old_url === pathname + '/'
    )

    if (redirect) {
      const newUrl = new URL(redirect.new_url, request.nextUrl.origin)
      return NextResponse.redirect(newUrl, 301)
    }
    const shouldRedirect = !url.href.endsWith('/')
    if (shouldRedirect) {
      //url.href = url.href + '/'
      const newUrlv2 = new URL(url.href + '/', request.nextUrl.origin)
      console.log('newUrlv2', newUrlv2)
      return NextResponse.redirect(newUrlv2, 301)
    }
  } catch (error) {
    console.error('Error fetching redirect mappings:', error)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/|api/|$|app/dashboard/|.*[^/]*\\.(?!html$)[^/]+$).*)']
}
