import { notFound, redirect } from 'next/navigation'
import InnerBlogPage from 'src/views/InnerBlogpage'
import { getBlogById, getNewsList, getBlogs } from 'src/lib/api/common'

type Props = { params: Promise<{ id: string; slug: string }> }

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || ''
const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL || ''

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const blog = await getBlogById(id)
  if (!blog) return { title: 'Blog Not Found', robots: { index: false, follow: false } }
  const url = `${WEB_URL}/blog/${blog.id}/${blog.slug}`
  const image = blog.banner_image
    ? `${IMG_URL}/${blog.banner_image}`
    : `${WEB_URL}/images/icons/learntech-logo.png`
  return {
    title: blog.meta_title, description: blog.meta_description, keywords: blog.meta_keyword,
    robots: { index: true, follow: true }, alternates: { canonical: url },
    openGraph: {
      type: 'article', title: blog.meta_title, description: blog.meta_description, url,
      siteName: 'Learntech Edu Solutions', images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image', site: '@learntechww',
      title: blog.meta_title, description: blog.meta_description, images: [image],
    },
  }
}

export default async function Page({ params }: Props) {
  const { id, slug } = await params
  const imgUrl = IMG_URL
  const [pagedata, newsRaw, blogsRaw] = await Promise.all([getBlogById(id), getNewsList({ size: 30 }), getBlogs({ size: 30 })])
  if (!pagedata) notFound()
  // Canonical slug guard — redirect mismatched slug to avoid duplicate URLs
  if (pagedata.slug && pagedata.slug !== slug) redirect(`/blog/${pagedata.id}/${pagedata.slug}`)
  const newsData = (newsRaw ?? []).map((item: any) => ({ imageSrc: `${imgUrl}/${item.banner_image}`, name: item.name || '', id: item.id, slug: item?.slug }))
  const blogsData = (blogsRaw.blogs ?? []).map((item: any) => ({ imageSrc: `${imgUrl}/${item.banner_image}`, name: item.name || '', id: item.id, slug: item?.slug }))
  return <InnerBlogPage pagedata={pagedata} newsData={newsData} blogsData={blogsData} />
}
