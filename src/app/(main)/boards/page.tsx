import { getBoards, getNewsList, getPageData } from 'src/lib/api/common'
import MainBoardPage from 'src/views/MainBoardPage'
import JsonLd from 'src/app/components/JsonLd'

const BASE_URL = (process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com').replace(/\/+$/, '')
const DEFAULT_TITLE = 'Education Boards in India | Learntech Edu Solutions'
const DEFAULT_DESCRIPTION = 'Explore top education boards in India — CBSE, ICSE, State Boards and more.'

export async function generateMetadata() {
  const pageData = await getPageData('boards')
  const title = pageData?.meta_title || DEFAULT_TITLE
  const description = pageData?.meta_description || DEFAULT_DESCRIPTION
  const url = `${BASE_URL}/boards`
  return {
    title,
    description,
    keywords: pageData?.meta_keyword,
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Learntech Edu Solutions',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@learntechww',
    },
  }
}

export default async function Page() {
  const [boards, updates, pageData] = await Promise.all([
    // Reduced from 1000 → 20: eliminates the synchronous over-fetch that was
    // delaying initial server response. The UI renders a paginated card list.
    getBoards({ size: 20 }),
    getNewsList({ category_id: 8, size: 10, columnname: 'created_at' }),
    getPageData('boards'),
  ])

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Boards', item: `${BASE_URL}/boards` },
    ],
  }

  const itemListSchema = boards.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: DEFAULT_TITLE,
    url: `${BASE_URL}/boards`,
    numberOfItems: boards.length,
    itemListElement: boards.map((b: any, i: number) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name || b.short_name,
      url: `${BASE_URL}/board/${b.id}/${b.slug}`,
    })),
  } : null

  return (
    <>
      <JsonLd id="boards-breadcrumb-schema" schema={breadcrumbSchema} />
      {itemListSchema && <JsonLd id="boards-itemlist-schema" schema={itemListSchema} />}
      <MainBoardPage
        boards={boards}
        updates={updates}
        pageData={pageData}
      />
    </>
  )
}
