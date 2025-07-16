import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ✅ Skip Next.js internals, static files, and .json data requests
  const isInternalOrStatic =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.json') ||
    pathname.includes('.') || // like .js, .css, .png, etc.
    pathname === '/favicon.ico'

  if (isInternalOrStatic) {
    return NextResponse.next()
  }

  // ✅ Add trailing slash if missing
  if (!pathname.endsWith('/')) {
    const newUrl = request.nextUrl.clone()
    newUrl.pathname += '/'
    return NextResponse.redirect(newUrl, 308)
  }

  // ✅ Only reach here if it's a valid content route
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URI}redirecturls`
    const response = await fetch(apiUrl)

    if (response.ok) {
      const redirections = await response.json()
      const redirect = redirections.find(
        (item: { old_url: string; new_url: string }) => item.old_url === pathname || item.old_url === pathname + '/'
      )

      if (redirect) {
        const newUrl = new URL(redirect.new_url, request.nextUrl.origin)
        return NextResponse.redirect(newUrl, 301)
      }
    } else {
      console.error('Redirect API fetch failed:', response.statusText)
    }
  } catch (err) {
    console.error('Redirect API fetch error:', err)
  }

  return NextResponse.next()
}

// ✅ Final matcher: exclude _next/data, _next/static, api, assets, etc.
export const config = {
  matcher: [
    '/((?!_next/static|_next/data|api|app/dashboard|.*\\.(?:ico|jpg|jpeg|png|svg|webp|json|js|css|woff2?|ttf|eot|otf|txt|xml|pdf|map)$).*)'
  ]
}
