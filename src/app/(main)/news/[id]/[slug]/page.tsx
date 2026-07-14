import { notFound } from 'next/navigation'
import InnerNewsPage from 'src/views/InnerNewsPage'
import JsonLd from 'src/app/components/JsonLd'
import { getNewsById, getNewsList } from 'src/lib/api/common'

const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL || ''
const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || ''

type Props = { params: Promise<{ id: string; slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const news = await getNewsById(id)
  if (!news) return { title: 'News Not Found', robots: 'noindex' }
  const url = `${WEB_URL}/news/${news.id}/${news.slug}`
  return {
    title: news.meta_title, description: news.meta_description, keywords: news.meta_keyword,
    robots: 'index, follow', alternates: { canonical: url },
    openGraph: { type: 'article', title: news.meta_title, description: news.meta_description, url, images: [news.imageUrl] },
    twitter: { card: 'summary_large_image', title: news.meta_title, description: news.meta_description, images: [news.imageUrl] },
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params

  const [pagedata, allNews] = await Promise.all([
    getNewsById(id),
    getNewsList({ size: 20, columnname: 'created_at', orderby: 'desc' }),
  ])

  if (!pagedata) return notFound()

  const newsUrl = `${WEB_URL}/news/${pagedata.id}/${pagedata.slug}`
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
