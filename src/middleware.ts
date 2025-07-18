import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const url = request.nextUrl.clone()

  const isIgnored =
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next/static') ||
    (pathname.startsWith('/_next/data') && pathname.endsWith('.json'))

  if (isIgnored) {
    return NextResponse.next()
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

      // Prevent redirect loop
      if (newUrl.pathname !== pathname && newUrl.pathname !== pathname + '/') {
        return NextResponse.redirect(newUrl, 301)
      }
    }

    // Add trailing slash if needed (but avoid re-redirecting)
    const hasExtension = pathname.includes('.') // for .js, .json, etc.
    const hasTrailingSlash = pathname.endsWith('/')

    if (!hasTrailingSlash && !hasExtension) {
      url.pathname = pathname + '/'
      return NextResponse.redirect(url, 301)
    }
  } catch (error) {
    console.error('Error fetching redirect mappings:', error)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/data|api|.*\\.(?:ico|jpg|jpeg|png|svg|webp|json|js|css|woff2?|ttf|eot|otf|txt|xml|pdf|map)$).*)'
  ]
}
