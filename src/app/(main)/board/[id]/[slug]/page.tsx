import { notFound } from 'next/navigation'
import InnerBoardPage from 'src/views/InnerBoardPage'
import { getBoardById, getExams } from 'src/lib/api/common'

type Props = { params: Promise<{ id: string; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const board = await getBoardById(id)
  if (!board) return { title: 'Board Not Found', robots: 'noindex' }
  const url = `${process.env.NEXT_PUBLIC_WEB_URL}/board/${board.id}/${board.slug}`
  return {
    title: board.meta_title, description: board.meta_description,
    robots: 'index, follow', alternates: { canonical: url },
    openGraph: { title: board.meta_title, description: board.meta_description, url },
    twitter: { card: 'summary_large_image', title: board.meta_title, description: board.meta_description },
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const [pagedata, exams] = await Promise.all([getBoardById(id), getExams({ size: 1000 })])
  if (!pagedata) notFound()
  return <InnerBoardPage pagedata={pagedata} exams={exams} />
}
