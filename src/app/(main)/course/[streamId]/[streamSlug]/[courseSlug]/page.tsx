import { notFound } from 'next/navigation'
import SubInnerCoursePage from 'src/views/SubInnerCoursePage'
import { getGeneralCourseBySlug, getColleges, getExams } from 'src/lib/api/common'

type Props = { params: Promise<{ streamId: string; streamSlug: string; courseSlug: string }> }

export async function generateMetadata({ params }: Props) {
  const { streamId, courseSlug } = await params
  const course = await getGeneralCourseBySlug(courseSlug, streamId)
  if (!course) return { title: 'Course Not Found', robots: 'noindex' }
  return {
    title: course.meta_title, description: course.meta_description,
    robots: 'index, follow',
    openGraph: { title: course.meta_title, description: course.meta_description },
    twitter: { card: 'summary_large_image', title: course.meta_title, description: course.meta_description },
  }
}

export default async function Page({ params }: Props) {
  const { streamId, courseSlug } = await params
  const [pagedata, colleges, exams] = await Promise.all([
    getGeneralCourseBySlug(courseSlug, streamId),
    getColleges({ size: 8, type: 'college', stream_id: streamId }),
    getExams({ size: 8, stream_id: streamId }),
  ])
  if (!pagedata) notFound()
  return <SubInnerCoursePage pagedata={pagedata} colleges={colleges.data} exams={exams} Streamid={streamId} />
}
