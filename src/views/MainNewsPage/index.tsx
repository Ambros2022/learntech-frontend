import BannerSection from './Components/BannerSection'
import TopTrendingNews from './Components/TopTrendingNewsSec'
import BrowseNewsSec from './Components/BrowseNewsSec'
import NewsLetterSec from './Components/NewsLetterSec'
import type { TabItem } from 'src/components/ui/ScrollTabs'

interface NewsItem {
  id: number
  title: string
  slug: string
  description: string
  imageUrl: string
}

interface BrowseNewsItem {
  id: number
  name: string
  slug: string
  banner_image: string
  meta_description: string
  category_id: string
}

interface MainNewsPageProps {
  newsItems: NewsItem[]
  categories: TabItem[]
  initialNews: BrowseNewsItem[]
  initialTotalPages: number
  collegeData: any[]
}

const MainNewsPage = ({ newsItems, categories, initialNews, initialTotalPages, collegeData }: MainNewsPageProps) => {
  return (
    <>
      <BannerSection />
      <TopTrendingNews newsItems={newsItems} />
      <BrowseNewsSec
        categories={categories}
        initialNews={initialNews}
        initialTotalPages={initialTotalPages}
        collegeData={collegeData}
      />
      <NewsLetterSec />
    </>
  )
}

export default MainNewsPage