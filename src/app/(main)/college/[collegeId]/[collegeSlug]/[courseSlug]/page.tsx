import { notFound } from 'next/navigation'
import InnerCourseCollegePage from 'src/views/InnerCourseCollegePage'
import { getCollegeCourse } from 'src/lib/api/common'

type Props = { params: Promise<{ collegeId: string; collegeSlug: string; courseSlug: string }> }

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '') || 'https://www.learntech.com'

export async function generateMetadata({ params }: Props) {
  const { collegeId, courseSlug } = await params
  const course = await getCollegeCourse(courseSlug, collegeId)
  if (!course) return { title: 'Course Not Found', robots: 'noindex' }
  const url = `${BASE_URL}/college/${collegeId}/${course.college?.slug}/${courseSlug}`

  const courseName = course.title || course.course_short_name || course.name || 'Course'
  const collegeName = course.college?.name || 'College'
  const title = course.meta_title || `${courseName} at ${collegeName} - Admission, Fees, Duration`
  const description = course.meta_description || `Find detailed information about ${courseName} at ${collegeName}, including eligibility criteria, fee structure, syllabus, and placement stats.`

  return {
    title,
    description,
    robots: 'index, follow',
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function Page({ params }: Props) {
  const { collegeId, courseSlug } = await params
  const pagedata = await getCollegeCourse(courseSlug, collegeId)
  if (!pagedata) notFound()
  // @ts-expect-error async server component
  return <InnerCourseCollegePage pagedata={pagedata} Collegeid={collegeId} />
}

