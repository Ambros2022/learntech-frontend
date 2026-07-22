'use client'

import { Toaster } from 'sonner'

// Lightweight sonner Toaster — replaces the previous react-hot-toast + MUI wrapper.
export default function Toster() {
  return (
    <Toaster
      position='top-right'
      richColors
      closeButton
      toastOptions={{ duration: 4000 }}
    />
  )
}
