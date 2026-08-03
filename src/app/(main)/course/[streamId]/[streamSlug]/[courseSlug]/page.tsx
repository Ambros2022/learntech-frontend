import { notFound } from 'next/navigation'
import SubInnerCoursePage from 'src/views/SubInnerCoursePage'
import {
  getGeneralCourseBySlug,
  getColleges,
  getExams,
  getTestimonialsByGeneralCourse,
} from 'src/lib/api/common'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '') || 'https://www.learntech.com'

type Props = { params: Promise<{ streamId: string; streamSlug: string; courseSlug: string }> }

export async function generateMetadata({ params }: Props) {
  const { streamId, streamSlug, courseSlug } = await params
  const course = await getGeneralCourseBySlug(courseSlug, streamId).catch(() => null)
  if (!course) return { title: 'Course Not Found', robots: 'noindex' }

  const url = `${BASE_URL}/course/${streamId}/${streamSlug}/${courseSlug}`
  const title = course.meta_title || `${course.name || course.short_name || 'Course'} - Course Details, Eligibility & Top Colleges | Learntech Edu Solutions`
  const description = course.meta_description || `Find detailed information about ${course.name || course.short_name || 'this course'}, including course overview, eligibility criteria, admission process, top colleges, and career scope.`
  const keywords = course.meta_keyword || `${course.name || ''}, ${course.short_name || ''}, course admission, top colleges, eligibility, fees`

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

export default async function Page({ params }: Props) {
  const { streamId, courseSlug } = await params

  let pagedata: any = null
  let colleges: any = null
  let exams: any = null
  let testimonials: any = null

  try {
    const results = await Promise.all([
      getGeneralCourseBySlug(courseSlug, streamId).catch(() => null),
      getColleges({ size: 8, type: 'college', stream_id: streamId }).catch(() => ({ data: [] })),
      getExams({ size: 10, stream_id: streamId }).catch(() => []),
      getTestimonialsByGeneralCourse(courseSlug).catch(() => []),
    ])
    pagedata = results[0]
    colleges = results[1]
    exams = results[2]
    testimonials = results[3]
  } catch (err: any) {
    console.error('Error fetching course page data:', err)
  }

  if (!pagedata) notFound()
  return (
    <SubInnerCoursePage
      pagedata={pagedata}
      colleges={colleges?.data ?? []}
      exams={exams ?? []}
      testimonials={testimonials ?? []}
    />
  )
}


