'use client'

import { ReactNode, Suspense } from 'react'
import 'src/iconify-bundle/icons-bundle-react'
import { AuthProvider } from 'src/context/AuthContext'
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import EmotionRegistry from './EmotionRegistry'
import NProgressBar from './NProgressBar'
import BootstrapClient from './BootstrapClient'

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <EmotionRegistry>
      <Suspense fallback={null}>
        <AuthProvider>
          <SettingsProvider>
            <SettingsConsumer>
              {({ settings }) => (
                <ThemeComponent settings={settings}>
                  <NProgressBar />
                  <BootstrapClient />
                  {children}
                </ThemeComponent>
              )}
            </SettingsConsumer>
          </SettingsProvider>
        </AuthProvider>
      </Suspense>
    </EmotionRegistry>
  )
}
