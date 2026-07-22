'use client'

/**
 * App Router compatibility shim for next/router's useRouter.
 *
 * Intentionally omits useSearchParams to avoid requiring every caller
 * to be wrapped in a Suspense boundary. Components that need query params
 * should import useSearchParams from 'next/navigation' directly.
 */

import { useRouter as useNextRouter, usePathname } from 'next/navigation'

export type NextRouter = ReturnType<typeof useRouter>

export function useRouter() {
  const router = useNextRouter()
  const pathname = usePathname()

  return {
    push: router.push.bind(router),
    replace: router.replace.bind(router),
    back: router.back.bind(router),
    forward: router.forward.bind(router),
    refresh: router.refresh.bind(router),
    reload: router.refresh.bind(router),   // next/navigation equivalent
    prefetch: router.prefetch.bind(router),

    pathname,
    asPath: pathname,     // no query string — use useSearchParams() if needed
    query: {} as Record<string, string>,
    route: pathname,
    isReady: true,
  }
}
