// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Hooks Import
import { useAuth } from 'src/hooks/useAuth'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    console.log("GuestGuard", 1);
    if (window.localStorage.getItem('userData')) {
      console.log("GuestGuard", 2);
      router.replace('/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])

  // if (auth.loading || (!auth.loading && auth.user !== null)) {
  //   console.log("GuestGuard", 3);
  //   return fallback
  // }
  console.log("GuestGuard", 4);
  return <>{children}</>
}

export default GuestGuard
