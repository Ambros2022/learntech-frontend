import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const url = request.nextUrl.clone()

  // Skip middleware for API, _next/static, and _next/data/*.json
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
      return NextResponse.redirect(newUrl, 301)
    }

    // Add trailing slash if missing, but skip .json requests
    const shouldRedirect = !url.pathname.endsWith('/') && !url.pathname.endsWith('.json')

    if (shouldRedirect) {
      const newUrl = request.nextUrl.clone()
      newUrl.pathname += '/'
      console.log('Redirecting to:', newUrl.href)
      return NextResponse.redirect(newUrl, 308) // or 308 if permanent
    }
  } catch (error) {
    console.error('Error fetching redirect mappings:', error)
  }

  return NextResponse.next()
}

// ✅ Final matcher: exclude _next/data, _next/static, api, assets, etc.
export const config = {
  matcher: [
    '/((?!_next/static|_next/data|api|app/dashboard|.*\\.(?:ico|jpg|jpeg|png|svg|webp|json|js|css|woff2?|ttf|eot|otf|txt|xml|pdf|map)$).*)'
  ]
}
