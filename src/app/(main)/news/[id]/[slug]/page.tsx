import { notFound } from 'next/navigation'
import InnerNewsPage from 'src/views/InnerNewsPage'
import { getNewsById } from 'src/lib/api/common'

type Props = { params: Promise<{ id: string; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const news = await getNewsById(id)
  if (!news) return { title: 'News Not Found', robots: 'noindex' }
  const url = `${process.env.NEXT_PUBLIC_WEB_URL}/news/${news.id}/${news.slug}`
  return {
    title: news.meta_title, description: news.meta_description, keywords: news.meta_keyword,
    robots: 'index, follow', alternates: { canonical: url },
    openGraph: { type: 'article', title: news.meta_title, description: news.meta_description, url, images: [news.imageUrl] },
    twitter: { card: 'summary_large_image', title: news.meta_title, description: news.meta_description, images: [news.imageUrl] },
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const pagedata = await getNewsById(id)
  if (!pagedata) notFound()
  return <InnerNewsPage pagedata={pagedata} />
}
