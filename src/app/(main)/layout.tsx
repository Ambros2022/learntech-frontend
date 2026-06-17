import Header from 'src/@core/layouts/components/Header'
import Footer from 'src/@core/layouts/components/Footer'
import { getNavData } from 'src/lib/api/common'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const navData = await getNavData()

  return (
    <>
      {/* <a href="#main-content" className="skip-to-content">Skip to main content</a> */}
      <Header {...navData} />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}
