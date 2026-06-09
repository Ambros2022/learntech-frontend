import NewsCarouselClient from './NewsCarouselClient'

interface NewsItem {
  id: number
  slug: string
  name: string
}

export default function NewsLinkSection({ items }: { items: NewsItem[] }) {
  if (!items?.length) return null

  return (
    <section className="newsLinkSec py-2">
      <div className="container text-center">
        <NewsCarouselClient items={items} />
      </div>
    </section>
  )
}
