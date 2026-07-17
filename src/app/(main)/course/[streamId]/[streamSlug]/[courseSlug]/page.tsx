import { notFound } from 'next/navigation'
import SubInnerCoursePage from 'src/views/SubInnerCoursePage'
import {
  getGeneralCourseBySlug,
  getColleges,
  getExams,
  getTestimonialsByGeneralCourse,
} from 'src/lib/api/common'

type Props = { params: Promise<{ streamId: string; streamSlug: string; courseSlug: string }> }

export async function generateMetadata({ params }: Props) {
  const { streamId, streamSlug, courseSlug } = await params
  const course = await getGeneralCourseBySlug(courseSlug, streamId)
  if (!course) return { title: 'Course Not Found', robots: 'noindex' }
  const url = `${process.env.NEXT_PUBLIC_WEB_URL}/course/${streamId}/${streamSlug}/${courseSlug}`
  return {
    title: course.meta_title,
    description: course.meta_description,
    keywords: course.meta_keyword,
    robots: 'index, follow',
    alternates: { canonical: url },
    openGraph: { title: course.meta_title, description: course.meta_description, url },
    twitter: { card: 'summary_large_image', title: course.meta_title, description: course.meta_description },
  }
}

export default async function Page({ params }: Props) {
  const { streamId, courseSlug } = await params
  const [pagedata, colleges, exams, testimonials] = await Promise.all([
    getGeneralCourseBySlug(courseSlug, streamId),
    getColleges({ size: 8, type: 'college', stream_id: streamId }),
    getExams({ size: 8, stream_id: streamId }),
    getTestimonialsByGeneralCourse(courseSlug),
  ])
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
