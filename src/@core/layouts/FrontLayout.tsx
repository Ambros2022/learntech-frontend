import type { BlankLayoutProps } from './types'
import Header from './components/Header'
import Footer from './components/Footer'
import { getNavData } from 'src/lib/api/common'

export default async function FrontLayout({ children }: BlankLayoutProps) {
  const navData = await getNavData()

  return (
    <>
      <Header {...navData} />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}
