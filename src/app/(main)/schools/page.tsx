import { getPageData } from 'src/lib/api/common'
import MainSchoolPage from 'src/views/MainSchoolPage'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || ''

export async function generateMetadata() {
  const pagedata = await getPageData('schools')
  const url = `${BASE_URL}/schools`
  return {
    title: pagedata?.meta_title || 'Best Schools in India | Learntech Edu Solutions',
    description: pagedata?.meta_description || 'Find the best schools in India with expert guidance from Learntech Edu Solutions.',
    keywords: pagedata?.meta_keyword,
    robots: 'index, follow',
    alternates: { canonical: url },
    openGraph: { title: pagedata?.meta_title, description: pagedata?.meta_description, url },
    twitter: { card: 'summary_large_image', title: pagedata?.meta_title, description: pagedata?.meta_description },
  }
}

export default async function Page() {
  const pagedata = await getPageData('schools')
  return <MainSchoolPage pagedata={pagedata} />
}
