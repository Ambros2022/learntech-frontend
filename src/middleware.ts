import { NextRequest, NextResponse } from 'next/server'

function normalizePath(path: string) {
  return path.endsWith('/') ? path : path + '/'
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ✅ Skip internal/static/asset/data files
  const isInternalOrStatic =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') || // like .js, .json, .css, images etc.
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

  // ✅ Redirect from backend-defined old URLs
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URI}redirecturls`
    const response = await fetch(apiUrl)

    if (response.ok) {
      const redirections = await response.json()

      const normalizedPath = normalizePath(pathname)

      const redirect = redirections.find(
        (item: { old_url: string; new_url: string }) => normalizePath(item.old_url) === normalizedPath
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

export const config = {
  matcher: [
    '/((?!_next/static|_next/data|api|.*\\.(?:ico|jpg|jpeg|png|svg|webp|json|js|css|woff2?|ttf|eot|otf|txt|xml|pdf|map)$).*)'
  ]
}
