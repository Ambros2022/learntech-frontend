import { getPageData, getTrendingCourses, getStreamCourses, getCoursePageBanner } from 'src/lib/api/common'
import MainCoursePage from 'src/views/MainCoursePage'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '') || 'https://www.learntech.com'

export async function generateMetadata() {
  const data = await getPageData('courses').catch(() => null)
  const url = `${BASE_URL}/courses`
  const title = data?.meta_title || 'Top Courses & Streams in India | Learntech Edu Solutions'
  const description = data?.meta_description || 'Explore top undergraduate and postgraduate courses across engineering, management, medical, and other streams with Learntech Edu Solutions.'
  const keywords = data?.meta_keyword || 'courses, top degrees, engineering, management, medical, admission guidance'

  return {
    title,
    description,
    keywords,
    robots: 'index, follow',
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function Page() {
  const [trendingCourses, streamCoursesData, promoban] = await Promise.all([
    getTrendingCourses().catch(() => []),
    getStreamCourses(1, 12).catch(() => ({ courses: [], totalItems: 0 })),
    getCoursePageBanner().catch(() => null),
  ])

  return (
    <MainCoursePage
      trendingCourses={trendingCourses}
      initialCourses={streamCoursesData?.courses ?? []}
      totalItems={streamCoursesData?.totalItems ?? 0}
      promoban={promoban}
    />
  )
}

