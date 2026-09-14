import { notFound, redirect } from 'next/navigation'
import InnerBlogPage from 'src/views/InnerBlogpage'
import { getBlogById, getNewsList, getBlogs } from 'src/lib/api/common'
import JsonLd from 'src/app/components/JsonLd'

type Props = { params: Promise<{ id: string; slug: string }> }

const WEB_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '')
const IMG_URL = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

export async function generateMetadata({ params }: Props) {
  const { id, slug } = await params
  const blog = await getBlogById(id)
  if (!blog) return { title: 'Blog Not Found', robots: { index: false, follow: false } }
  const url = `${WEB_URL}/blog/${blog.id}/${blog.slug || slug}`
  const image = blog.banner_image
    ? `${IMG_URL}/${blog.banner_image}`
    : `${WEB_URL}/images/icons/learntech-logo.png`
  const DEFAULT_TITLE = `${blog.name} | Learntech Edu Solutions`
  const title = blog.meta_title?.trim() || DEFAULT_TITLE
  const description = blog.meta_description?.trim() || blog.name
  return {
    title, description, keywords: blog.meta_keyword,
    robots: { index: true, follow: true }, alternates: { canonical: url },
    openGraph: {
      type: 'article', title, description, url,
      siteName: 'Learntech Edu Solutions', images: [{ url: image, width: 1200, height: 630, alt: blog.name }],
    },
    twitter: {
      card: 'summary_large_image', site: '@learntechww',
      title, description, images: [image],
    },
  }
}

export default async function Page({ params }: Props) {
  const { id, slug } = await params
  const imgUrl = IMG_URL
  // Reduced: news 30→8, blogs 20→8 — sidebar lists render ≤8 items each
  const [pagedata, newsRaw, blogsRaw] = await Promise.all([
    getBlogById(id),
    getNewsList({ size: 8 }),
    getBlogs({ size: 8 }),
  ])
  if (!pagedata) notFound()
  // Canonical slug guard — redirect mismatched slug to avoid duplicate URLs
  if (pagedata.slug && pagedata.slug !== slug) redirect(`/blog/${pagedata.id}/${pagedata.slug}`)

  const newsData = (newsRaw ?? []).map((item: any) => ({ imageSrc: `${imgUrl}/${item.banner_image}`, name: item.name || '', id: item.id, slug: item?.slug }))
  const blogsData = (blogsRaw.blogs ?? []).map((item: any) => ({ imageSrc: `${imgUrl}/${item.banner_image}`, name: item.name || '', id: item.id, slug: item?.slug }))

  const blogUrl = `${WEB_URL}/blog/${pagedata.id}/${pagedata.slug || slug}`
  const ogImage = pagedata.banner_image
    ? `${IMG_URL}/${pagedata.banner_image}`
    : `${WEB_URL}/images/icons/learntech-logo.png`

  // BlogPosting schema — more specific than Article; unlocks rich author/date snippets
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: pagedata.meta_title?.trim() || pagedata.name,
    description: pagedata.meta_description?.trim() || '',
    image: [ogImage],
    url: blogUrl,
    datePublished: pagedata.created_at,
    dateModified: pagedata.updated_at || pagedata.created_at,
    author: {
      '@type': 'Organization',
      name: 'Learntech Edu Solutions',
      url: WEB_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Learntech Edu Solutions',
      logo: { '@type': 'ImageObject', url: `${WEB_URL}/images/icons/learntech-logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': blogUrl },
  }

  return (
    <>
      <JsonLd id="blog-posting-schema" schema={blogPostingSchema} />
      <InnerBlogPage pagedata={pagedata} newsData={newsData} blogsData={blogsData} />
    </>
  )
}
