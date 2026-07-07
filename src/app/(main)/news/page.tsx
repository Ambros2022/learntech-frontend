import { getPageData, getNewsList, getNewsCategories, getLandingPages } from 'src/lib/api/common'
import JsonLd from 'src/app/components/JsonLd'
import MainNewsPage from 'src/views/MainNewsPage'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'
const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL || ''
const PAGE_PATH = '/news'
const DEFAULT_TITLE = 'Latest Educational News | Learntech Edu Solutions'
const DEFAULT_DESCRIPTION =
  'Stay updated with the latest educational news, admission alerts, board news, entrance exam updates, and more at Learntech Edu Solutions.'

// Category name mapping
const categoryNameMapping: Record<string, string> = {
  entrance_exams_news: 'Entrance Exams News',
  general_news: 'General News',
  admission_alert_news: 'Admission Alert News',
  results_announcement: 'Result Announcement',
  board_news: 'Board News',
}

export async function generateMetadata() {
  const data = await getPageData('news')
  const title = data?.meta_title || DEFAULT_TITLE
  const description = data?.meta_description || DEFAULT_DESCRIPTION
  const canonicalUrl = `${BASE_URL}${PAGE_PATH}`

  return {
    title,
    description,
    keywords: data?.meta_keyword || '',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Learntech Edu Solutions',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/images/icons/learntech-logo.png`,
          width: 1200,
          height: 630,
          alt: 'Learntech Edu Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function Page() {
  const [pagedata, trendingNews, rawCategories, collegeData, initialNewsData] = await Promise.all([
    getPageData('news'),
    getNewsList({ is_trending: '1', orderby: 'Asc', columnname: 'listing_order', size: 10000 }),
    getNewsCategories(),
    getLandingPages(),
    // Fetch initial "All" news for first page SSR
    (async () => {
      const API_URL = (process.env.NEXT_PUBLIC_API_URI || '').replace(/\/+$/, '')
      try {
        const res = await fetch(
          `${API_URL}/api/website/news/get?page=1&size=8&columnname=created_at&orderby=desc`,
          { next: { tags: ['news'] } } as RequestInit,
        )
        if (!res.ok) return { data: [], totalPages: 1 }
        const json = await res.json()
        return { data: json?.data ?? [], totalPages: json?.totalPages ?? 1 }
      } catch {
        return { data: [], totalPages: 1 }
      }
    })(),
  ])

  // Map trending news to component shape
  const newsItems = (trendingNews ?? []).map((news: any) => ({
    id: news.id,
    title: news.name,
    slug: news.slug,
    description: news.meta_description,
    imageUrl: `${IMG_URL}/${news.banner_image}`,
  }))

  // Map categories — filter "default", add "All News" at front
  const categories = [
    { id: 'all', label: 'All News' },
    ...(rawCategories ?? [])
      .filter((cat: any) => cat.name !== 'default')
      .map((cat: any) => ({
        id: String(cat.id),
        label: categoryNameMapping[cat.name] || cat.name,
      })),
  ]

  // BreadcrumbList JSON-LD schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${BASE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'News',
        item: `${BASE_URL}${PAGE_PATH}`,
      },
    ],
  }

  return (
    <>
      <JsonLd id="news-breadcrumb-schema" schema={breadcrumbSchema} />
      <MainNewsPage
        newsItems={newsItems}
        categories={categories}
        initialNews={initialNewsData.data}
        initialTotalPages={initialNewsData.totalPages}
        collegeData={collegeData}
      />
    </>
  )
}
