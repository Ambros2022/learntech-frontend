import { getPageData, getServicesBanners } from 'src/lib/api/common'
import ServicesPage from 'src/views/ServicesPage'

const URL = `${process.env.NEXT_PUBLIC_WEB_URL}/services`

export async function generateMetadata() {
  const page = await getPageData('services')
  return {
    title: page?.meta_title ?? 'Study in India | Study Abroad | Learntech Edu Solutions',
    description: page?.meta_description ?? 'Are you looking for Admission at Top College? Learntech Edu Solutions provides admission guidance to the students who look admission in India & Abroad.',
    keywords: page?.meta_keyword,
    robots: 'index, follow',
    alternates: { canonical: URL },
    openGraph: { title: page?.meta_title, description: page?.meta_description, url: URL },
    twitter: { card: 'summary_large_image', title: page?.meta_title, description: page?.meta_description },
  }
}

export default async function Page() {
  const banners = await getServicesBanners()
  return <ServicesPage banners={banners} />
}
