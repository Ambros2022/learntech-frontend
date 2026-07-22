import { LazyTrendingNewsCarousel } from 'src/app/components/ClientWrappers'

const clipRect = { position: 'absolute' as const, width: 1, height: 1, overflow: 'hidden' as const, clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' as const }

interface NewsItem {
  id: number
  title: string
  slug: string
  description: string
  imageUrl: string
}

const TopTrendingNews = ({ newsItems }: { newsItems: NewsItem[] }) => {
  if (!newsItems?.length) return null

  return (
    <section className='topnewsSec bg-white py-5'>
      <div className="container">
        <h2 className='text-blue fw-bold text-center mb-5'>Trending News</h2>

        {/* Hidden links for SEO — Googlebot crawls all links */}
        <ul aria-hidden="true" style={clipRect}>
          {newsItems.map(news => (
            <li key={news.id}>
              <a href={`/news/${news.id}/${news.slug}`} tabIndex={-1}>{news.title}</a>
            </li>
          ))}
        </ul>

        <div className='newsCardCarousel position-relative'>
          <LazyTrendingNewsCarousel newsItems={newsItems} />
        </div>
      </div>
    </section>
  )
}

export default TopTrendingNews
