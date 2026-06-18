import { getPageData, getTrendingCourses, getStreamCourses, getCoursePageBanner } from 'src/lib/api/common'
import MainCoursePage from 'src/views/MainCoursePage'

export async function generateMetadata() {
  const data = await getPageData('courses')
  const url = `${process.env.NEXT_PUBLIC_WEB_URL}/courses`
  return {
    title: data?.meta_title,
    description: data?.meta_description,
    robots: 'index, follow',
    alternates: { canonical: url },
    openGraph: { title: data?.meta_title, description: data?.meta_description, url },
    twitter: { card: 'summary_large_image', title: data?.meta_title, description: data?.meta_description },
  }
}

export default async function Page() {
  const [trendingCourses, { courses: initialCourses, totalItems }, promoban] = await Promise.all([
    getTrendingCourses(),
    getStreamCourses(1, 12),
    getCoursePageBanner(),
  ])
  return (
    <MainCoursePage
      trendingCourses={trendingCourses}
      initialCourses={initialCourses}
      totalItems={totalItems}
      promoban={promoban}
    />
  )
}
