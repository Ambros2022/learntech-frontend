import { notFound } from 'next/navigation'
import InnerExamPage from 'src/views/InnerExamPage'
import { getExamById } from 'src/lib/api/common'

type Props = { params: Promise<{ id: string; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const exam = await getExamById(id)
  if (!exam) return { title: 'Exam Not Found', robots: 'noindex' }
  const url = `${process.env.NEXT_PUBLIC_WEB_URL}/exam/${exam.id}/${exam.slug}`
  return {
    title: exam.meta_title, description: exam.meta_description, keywords: exam.meta_keyword,
    robots: 'index, follow', alternates: { canonical: url },
    openGraph: { title: exam.meta_title, description: exam.meta_description, url },
    twitter: { card: 'summary_large_image', title: exam.meta_title, description: exam.meta_description },
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const pagedata = await getExamById(id)
  if (!pagedata) notFound()
  return <InnerExamPage pagedata={pagedata} />
}
