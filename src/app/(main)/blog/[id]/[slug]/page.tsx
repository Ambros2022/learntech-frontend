import { notFound } from 'next/navigation'
import InnerBlogPage from 'src/views/InnerBlogpage'
import { getBlogById, getNewsList, getBlogs } from 'src/lib/api/common'

type Props = { params: Promise<{ id: string; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const blog = await getBlogById(id)
  if (!blog) return { title: 'Blog Not Found', robots: 'noindex' }
  const url = `${process.env.NEXT_PUBLIC_WEB_URL}/blog/${blog.id}/${blog.slug}`
  return {
    title: blog.meta_title, description: blog.meta_description, keywords: blog.meta_keyword,
    robots: 'index, follow', alternates: { canonical: url },
    openGraph: { type: 'article', title: blog.meta_title, description: blog.meta_description, url },
    twitter: { card: 'summary_large_image', title: blog.meta_title, description: blog.meta_description },
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params
  const imgUrl = process.env.NEXT_PUBLIC_IMG_URL || ''
  const [pagedata, newsRaw, blogsRaw] = await Promise.all([getBlogById(id), getNewsList({ size: 30 }), getBlogs({ size: 30 })])
  if (!pagedata) notFound()
  const newsData = (newsRaw ?? []).map((item: any) => ({ imageSrc: `${imgUrl}/${item.banner_image}`, name: item.name || '', id: item.id, slug: item?.slug }))
  const blogsData = (blogsRaw.blogs ?? []).map((item: any) => ({ imageSrc: `${imgUrl}/${item.banner_image}`, name: item.name || '', id: item.id, slug: item?.slug }))
  return <InnerBlogPage pagedata={pagedata} newsData={newsData} blogsData={blogsData} />
}
