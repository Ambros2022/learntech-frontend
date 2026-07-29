import { getPageData, getJobPositions, getJobLocations } from 'src/lib/api/common'
import CareerPage from 'src/views/CareerPage'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'

export async function generateMetadata() {
  const pageData = await getPageData('career')
  return {
    title: pageData?.meta_title || 'Career | Learntech Edu Solutions',
    description: pageData?.meta_description || 'Join one of the best educational service provider firms. Explore career opportunities at Learntech Edu Solutions.',
    keywords: pageData?.meta_keyword,
    robots: 'index, follow',
    alternates: { canonical: `${BASE_URL}/career` },
    openGraph: {
      title: pageData?.meta_title || 'Career | Learntech Edu Solutions',
      description: pageData?.meta_description || 'Explore career opportunities at Learntech Edu Solutions.',
      url: `${BASE_URL}/career`,
    },
  }
}

export default async function Page() {
  const [pageData, jobData, locations] = await Promise.all([
    getPageData('career'),
    getJobPositions(),
    getJobLocations(),
  ])

  return <CareerPage pageData={pageData} jobData={jobData} locations={locations} />
}
