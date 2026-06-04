import { notFound } from 'next/navigation'
import InnerCourseCollegePage from 'src/views/InnerCourseCollegePage'
import { getCollegeCourse } from 'src/lib/api/common'

type Props = { params: Promise<{ collegeId: string; collegeSlug: string; courseSlug: string }> }

export async function generateMetadata({ params }: Props) {
  const { collegeId, courseSlug } = await params
  const course = await getCollegeCourse(courseSlug, collegeId)
  if (!course) return { title: 'Course Not Found', robots: 'noindex' }
  const url = `${process.env.NEXT_PUBLIC_WEB_URL}/college/${collegeId}/${course.college?.slug}/${courseSlug}`
  return {
    title: course.meta_title, description: course.meta_description,
    robots: 'index, follow', alternates: { canonical: url },
    openGraph: { title: course.meta_title, description: course.meta_description, url },
    twitter: { card: 'summary_large_image', title: course.meta_title, description: course.meta_description },
  }
}

export default async function Page({ params }: Props) {
  const { collegeId, courseSlug } = await params
  const pagedata = await getCollegeCourse(courseSlug, collegeId)
  if (!pagedata) notFound()
  return <InnerCourseCollegePage pagedata={pagedata} Collegeid={collegeId} />
}
