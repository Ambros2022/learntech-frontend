import { NextRequest, NextResponse } from 'next/server'

let redirectMap: Map<string, string> | null = null
let lastCacheTime = 0
const CACHE_TTL = 1000 * 60 * 60 * 24 // 24 hours

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // ✅ Skip prefetch requests immediately
  if (request.headers.get('x-middleware-prefetch') === '1') {
    return NextResponse.next()
  }

  try {
    // ✅ Cache redirect rules for 24 hours (Map for O(1) lookups)
    const now = Date.now()
    if (!redirectMap || now - lastCacheTime > CACHE_TTL) {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URI}redirecturls`
      const res = await fetch(apiUrl)

      if (res.ok) {
        const rules: { old_url: string; new_url: string }[] = await res.json()
        redirectMap = new Map(rules.map(r => [r.old_url, r.new_url]))
        lastCacheTime = now
      } else {
        console.error('Redirect fetch failed:', res.statusText)
      }
    }

    // ✅ O(1) redirect lookup instead of O(n) .find()
    const newUrl = redirectMap?.get(pathname)
    if (newUrl) {
      return NextResponse.redirect(new URL(newUrl, request.url), 301)
    }

    // ✅ Trailing slash normalization (strip trailing slash)
    if (pathname !== '/' && pathname.endsWith('/')) {
      const cleanPath = pathname.slice(0, -1)

      return NextResponse.redirect(new URL(cleanPath, request.url), 301)
    }
  } catch (error) {
    console.error('Proxy error:', error)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/|api/|$|_next|thank-you|write-review|.*\\.(?:js|css|json|png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|eot|map)).*)',
  ],
}