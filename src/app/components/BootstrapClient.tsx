'use client'

import { useEffect } from 'react'

export default function BootstrapClient() {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')

    // react-multi-carousel accesses element.ref internally — deprecated in React 19.
    // Suppress until library ships a React 19 compatible release.
    if (process.env.NODE_ENV !== 'production') {
      const original = console.error.bind(console)
      console.error = (...args: any[]) => {
        if (typeof args[0] === 'string' && args[0].includes('Accessing element.ref was removed')) return
        original(...args)
      }
    }
  }, [])
  return null
}
