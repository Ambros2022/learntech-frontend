import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ✅ Skip static files and API routes
  const isIgnored =
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/_next/image') ||
    (pathname.startsWith('/_next/data') && pathname.endsWith('.json')) ||
    pathname.match(/\.(ico|jpg|jpeg|png|svg|webp|json|js|css|woff2?|ttf|eot|otf|txt|xml|pdf|map)$/)

  if (isIgnored) return NextResponse.next()

  // ✅ Manual 301 redirect to add trailing slash
  if (!pathname.endsWith('/') && !pathname.includes('.')) {
    const url = request.nextUrl.clone()
    url.pathname = `${pathname}/` // Avoid double slashes
    return NextResponse.redirect(url, 301)
  }

  try {
    // ✅ Your redirect mapping API
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URI}redirecturls`

    const response = await fetch(apiUrl)
    if (!response.ok) return NextResponse.next()

    const redirections = await response.json()

    const redirect = redirections.find(
      (item: { old_url: string; new_url: string }) => item.old_url === pathname || item.old_url === pathname + '/'
    )

    if (redirect) {
      const newUrl = new URL(redirect.new_url, request.nextUrl.origin)
      return NextResponse.redirect(newUrl, 301)
    }
  } catch (error) {
    console.error('Middleware error:', error)
  }

  return NextResponse.next()
}
