import { notFound } from 'next/navigation'
import InnerNewsPage from 'src/views/InnerNewsPage'
import JsonLd from 'src/app/components/JsonLd'
import { getNewsById, getNewsList } from 'src/lib/api/common'

const IMG_URL = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')
const WEB_URL = (process.env.NEXT_PUBLIC_WEB_URL || '').replace(/\/+$/, '')

type Props = { params: Promise<{ id: string; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { id, slug } = await params
  const news = await getNewsById(id)
  if (!news) return { title: 'News Not Found', robots: { index: false, follow: false } }

  const url = `${WEB_URL}/news/${news.id}/${news.slug || slug}`
  const ogImage = news.banner_image
    ? `${IMG_URL}/${news.banner_image}`
    : `${WEB_URL}/images/icons/learntech-logo.png`
  const DEFAULT_TITLE = `${news.name} | Learntech Edu Solutions`
  const title = news.meta_title?.trim() || DEFAULT_TITLE
  const description = news.meta_description?.trim() || news.name

  return {
    title,
    description,
    keywords: news.meta_keyword,
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      siteName: 'Learntech Edu Solutions',
      images: [{ url: ogImage, width: 1200, height: 630, alt: news.name }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  }
}

export default async function Page({ params }: Props) {
  const { id, slug } = await params

  const [pagedata, allNews] = await Promise.all([
    getNewsById(id),
    getNewsList({ size: 20, columnname: 'created_at', orderby: 'desc' }),
  ])

  if (!pagedata) return notFound()

  const newsUrl = `${WEB_URL}/news/${pagedata.id}/${pagedata.slug || slug}`
  const ogImage = pagedata.banner_image
    ? `${IMG_URL}/${pagedata.banner_image}`
    : `${WEB_URL}/images/icons/learntech-logo.png`

  const relatedNews = (allNews ?? [])
    .filter((item: any) => item.id !== pagedata.id)
    .slice(0, 10)
    .map((item: any) => ({
      imageSrc: `${IMG_URL}/${item.banner_image}`,
      name: item.name || 'No description available',
      id: item.id,
      slug: item.slug,
    }))

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: pagedata.meta_title || pagedata.name,
    image: [ogImage],
    datePublished: pagedata.created_at,
    dateModified: pagedata.updated_at || pagedata.created_at,
    author: { '@type': 'Organization', name: 'Learntech Edu Solutions' },
    publisher: {
      '@type': 'Organization',
      name: 'Learntech Edu Solutions',
      logo: { '@type': 'ImageObject', url: `${WEB_URL}/images/icons/learntech-logo.png` },
    },
    description: pagedata.meta_description,
    url: newsUrl,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${WEB_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'News', item: `${WEB_URL}/news` },
      { '@type': 'ListItem', position: 3, name: pagedata.name, item: newsUrl },
    ],
  }

  return (
    <>
      <JsonLd id="news-article-schema" schema={articleSchema} />
      <JsonLd id="news-breadcrumb-schema" schema={breadcrumbSchema} />
      <InnerNewsPage pagedata={pagedata} relatedNews={relatedNews} newsUrl={newsUrl} />
    </>
  )
}
