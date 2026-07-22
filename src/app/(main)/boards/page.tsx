import { getBoards, getNewsList, getPageData } from 'src/lib/api/common'
import MainBoardPage from 'src/views/MainBoardPage'

const BASE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://learntechww.com'

export async function generateMetadata() {
  const pageData = await getPageData('boards')
  return {
    title: pageData?.meta_title || 'Education Boards in India | Learntech Edu Solutions',
    description: pageData?.meta_description || 'Explore top education boards in India — CBSE, ICSE, State Boards and more.',
    keywords: pageData?.meta_keyword,
    alternates: { canonical: `${BASE_URL}/boards` },
    openGraph: {
      title: pageData?.meta_title || 'Education Boards in India | Learntech Edu Solutions',
      description: pageData?.meta_description || 'Explore top education boards in India.',
      url: `${BASE_URL}/boards`,
    },
  }
}

export default async function Page() {
  const [boards, updates, pageData] = await Promise.all([
    getBoards({ size: 1000 }),
    getNewsList({ category_id: 8, size: 10, columnname: 'created_at' }),
    getPageData('boards'),
  ])

  return (
    <MainBoardPage
      boards={boards}
      updates={updates}
      pageData={pageData}
    />
  )
}
