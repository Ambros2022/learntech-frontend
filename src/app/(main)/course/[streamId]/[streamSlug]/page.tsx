import { notFound } from 'next/navigation'
import InnerCoursePage from 'src/views/InnerCoursePage'
import { getStreamById, getColleges, getExams, getStreams, getTestimonialsByStream } from 'src/lib/api/common'

type Props = { params: Promise<{ streamId: string; streamSlug: string }> }

export async function generateMetadata({ params }: Props) {
  const { streamId } = await params
  const stream = await getStreamById(streamId)
  if (!stream) return { title: 'Course Not Found', robots: 'noindex' }
  const url = `${process.env.NEXT_PUBLIC_WEB_URL}/course/${stream.id}/${stream.slug}`
  return {
    title: stream.meta_title, description: stream.meta_description, keywords: stream.meta_keyword,
    robots: 'index, follow', alternates: { canonical: url },
    openGraph: { title: stream.meta_title, description: stream.meta_description, url },
    twitter: { card: 'summary_large_image', title: stream.meta_title, description: stream.meta_description },
  }
}

export default async function Page({ params }: Props) {
  const { streamId } = await params
  const [pagedata, colleges, exams, streams, testdata] = await Promise.all([
    getStreamById(streamId),
    getColleges({ type: 'college', stream_id: streamId }),
    getExams({ stream_id: streamId }),
    getStreams({ not_stream_id: streamId }),
    getTestimonialsByStream(streamId),
  ])
  if (!pagedata) notFound()
  return <InnerCoursePage pagedata={pagedata} colleges={colleges.data} exams={exams} streams={streams} testdata={testdata} />
}
