import { Poppins } from 'next/font/google'

// The site font (src/fonts.ts) stops at 700; the "How it works" step numbers use 800.
// Page-local so the extra weight is only fetched on this route, and only when rendered.
const poppinsHeavy = Poppins({
  subsets: ['latin'],
  weight: ['800'],
  variable: '--font-poppins-heavy',
  display: 'swap',
  preload: false,
})

export default poppinsHeavy
