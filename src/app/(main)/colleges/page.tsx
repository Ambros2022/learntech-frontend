import { getPageData } from 'src/lib/api/common'
import MainCollegePage from 'src/views/MainCollegePage'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '') || 'https://www.learntech.com'

export async function generateMetadata() {
  const pagedata = await getPageData('colleges')
  const url = `${BASE_URL}/colleges`
  const title = pagedata?.meta_title || 'Best Colleges in India | Learntech Edu Solutions'
  const description = pagedata?.meta_description || 'Find the best colleges in India with expert admission guidance from Learntech Edu Solutions.'
  return {
    title,
    description,
    keywords: pagedata?.meta_keyword,
    robots: 'index, follow',
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function Page() {
  const pagedata = await getPageData('colleges')
  return <MainCollegePage pagedata={pagedata} />
}

