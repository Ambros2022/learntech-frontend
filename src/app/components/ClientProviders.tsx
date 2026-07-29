'use client'

import { ReactNode } from 'react'
import { AuthProvider } from 'src/context/AuthContext'
import EmotionRegistry from './EmotionRegistry'
import NProgressBar from './NProgressBar'
import BootstrapClient from './BootstrapClient'
import { SettingsProvider, SettingsConsumer } from 'src/@core/context/settingsContext'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// EmotionRegistry is required: MUI client components (BannerSection search/forms)
// use Emotion CSS-in-JS and need server-side style injection to prevent FOUC.
// NProgressBar handles its own Suspense boundary internally.

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <EmotionRegistry>
      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => (
            <ThemeComponent settings={settings}>
              <AuthProvider>
                <NProgressBar />
                <BootstrapClient />
                {children}
              </AuthProvider>
            </ThemeComponent>
          )}
        </SettingsConsumer>
      </SettingsProvider>
    </EmotionRegistry>
  )
}
