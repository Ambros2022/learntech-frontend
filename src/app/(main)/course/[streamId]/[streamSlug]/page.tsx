import { notFound } from 'next/navigation'
import InnerCoursePage from 'src/views/InnerCoursePage'
import { getStreamById, getColleges, getExams, getStreams, getTestimonialsByStream } from 'src/lib/api/common'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '') || 'https://www.learntech.com'

type Props = { params: Promise<{ streamId: string; streamSlug: string }> }

export async function generateMetadata({ params }: Props) {
  const { streamId } = await params
  const stream = await getStreamById(streamId).catch(() => null)
  if (!stream) return { title: 'Course Not Found', robots: 'noindex' }

  const url = `${BASE_URL}/course/${stream.id || streamId}/${stream.slug || ''}`
  const title = stream.meta_title || `${stream.name || 'Courses'} - Admission, Eligibility, Colleges & Fees | Learntech Edu Solutions`
  const description = stream.meta_description || `Explore top colleges, eligibility criteria, admission process, fees, and entrance exams for ${stream.name || 'courses'} at Learntech Edu Solutions.`
  const keywords = stream.meta_keyword || `${stream.name || ''}, ${stream.short_name || ''}, courses, colleges, admission, entrance exams`

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
  const { streamId } = await params
  const [pagedata, colleges, exams, streams, testdata] = await Promise.all([
    getStreamById(streamId).catch(() => null),
    getColleges({ type: 'college', stream_id: streamId, size: 20 }).catch(() => ({ data: [] })),
    getExams({ stream_id: streamId }).catch(() => []),
    getStreams({ not_stream_id: streamId }).catch(() => []),
    getTestimonialsByStream(streamId).catch(() => []),
  ])

  if (!pagedata) notFound()
  return <InnerCoursePage pagedata={pagedata} colleges={colleges?.data ?? []} exams={exams ?? []} streams={streams ?? []} testdata={testdata ?? []} />
}
