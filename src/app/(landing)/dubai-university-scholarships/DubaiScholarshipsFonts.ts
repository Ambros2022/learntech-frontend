import { Bodoni_Moda } from 'next/font/google'

export const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni',
  display: 'swap',
  preload: false,
})
