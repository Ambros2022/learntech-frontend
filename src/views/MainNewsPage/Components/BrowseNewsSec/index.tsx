import NewsList from '../newsList'
import BrowseNewsClient from './BrowseNewsClient'
import { LazyGlobalEnquiryForm } from 'src/app/components/ClientWrappers'
import type { TabItem } from 'src/components/ui/ScrollTabs'

interface NewsItem {
  id: number
  name: string
  slug: string
  banner_image: string
  meta_description: string
  category_id: string
}

interface BrowseNewsSecProps {
  categories: TabItem[]
  initialNews: NewsItem[]
  initialTotalPages: number
  collegeData: any[]
}

const BrowseNewsSec = ({ categories, initialNews, initialTotalPages, collegeData }: BrowseNewsSecProps) => {
  return (
    <BrowseNewsClient
      categories={categories}
      initialNews={initialNews}
      initialTotalPages={initialTotalPages}
    >
      {/* Sidebar — server-rendered via RSC Children Slot pattern */}
      <div className='bg-skyBlue p-5 d-flex justify-content-center rounded'>
        <div className='align-content-center get-news'>
          <h2 className='text-blue fw-bold text-center mb-3 getalert'><i className='bi bi-megaphone-fill me-2 '></i>Get Upcoming News Alerts</h2>
          <div className='d-flex gap-3 flex-lg-row flex-column justify-content-between'>
            <LazyGlobalEnquiryForm buttonText='Follow Us' className='btn viewMoreCollegeBtn' />
            <LazyGlobalEnquiryForm buttonText='Ask a Question' className='btn btn-success' />
          </div>
        </div>
      </div>
      <NewsList newsItems={collegeData} />
    </BrowseNewsClient>
  )
}

export default BrowseNewsSec
