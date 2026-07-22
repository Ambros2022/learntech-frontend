'use client'

import { ReactNode } from 'react'
import { AuthProvider } from 'src/context/AuthContext'
import NProgressBar from './NProgressBar'
import BootstrapClient from './BootstrapClient'

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <NProgressBar />
      <BootstrapClient />
      {children}
    </AuthProvider>
  )
}
