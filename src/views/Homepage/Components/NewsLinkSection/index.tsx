import NewsCarouselClient from './NewsCarouselClient'
import styles from './NewsLinkSection.module.css'

interface NewsItem {
  id: number
  slug: string
  name: string
}

export default function NewsLinkSection({ items }: { items: NewsItem[] }) {
  if (!items?.length) return null

  return (
    <section className={`${styles.newsLinkSec} py-2`}>
      <div className="container text-center">
        <NewsCarouselClient items={items} />
      </div>
    </section>
  )
}
