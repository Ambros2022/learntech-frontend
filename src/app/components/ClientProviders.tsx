'use client'

import { ReactNode } from 'react'
import { AuthProvider } from 'src/context/AuthContext'
import EmotionRegistry from './EmotionRegistry'
import NProgressBar from './NProgressBar'
import BootstrapClient from './BootstrapClient'

// EmotionRegistry is required: MUI client components (BannerSection search/forms)
// use Emotion CSS-in-JS and need server-side style injection to prevent FOUC.
// NProgressBar handles its own Suspense boundary internally.

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <EmotionRegistry>
      <AuthProvider>
        <NProgressBar />
        <BootstrapClient />
        {children}
      </AuthProvider>
    </EmotionRegistry>
  )
}
