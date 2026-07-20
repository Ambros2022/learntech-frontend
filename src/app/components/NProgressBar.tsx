'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// Hide the spinner — we only want the thin bar at the top, not the rotating icon.
NProgress.configure({ showSpinner: false })

function NProgressInner() {
  const pathname     = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.done()

    // 1. Scroll immediately
    window.scrollTo(0, 0)

    // 2. Scroll on the next animation frame (after React DOM reconciliation)
    const rafId = requestAnimationFrame(() => {
      window.scrollTo(0, 0)
    })

    // 3. Scroll after a short delay (to handle any async content loading or layout shifts)
    const timerId = setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timerId)
    }
  }, [pathname, searchParams])

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (href && href.startsWith('/') && href !== window.location.pathname) {
        NProgress.start()
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}

export default function NProgressBar() {
  return (
    <Suspense fallback={null}>
      <NProgressInner />
    </Suspense>
  )
}
