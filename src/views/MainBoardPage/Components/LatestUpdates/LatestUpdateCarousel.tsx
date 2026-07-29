'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import EmblaCarousel from 'src/components/ui/Embla/EmblaTabCarousel'
import styles from 'src/views/Homepage/Components/LatestNewsSection/LatestNewsSection.module.css'

export interface NewsItem {
  id: number
  slug: string
  name: string
  meta_description?: string
  created_at?: string
}

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  try { return format(new Date(dateStr), 'dd-MMM-yyyy') } catch { return '' }
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <div className={styles.slide}>
      <Link href={`/news/${item.id}/${item.slug}`} className={styles.cardLink}>
        <div className={styles.cardSlide}>
          <div className={styles.cardInner}>
            <div className={`card h-100 ${styles.card}`}>
              <div className={`card-body ${styles.cardBody}`}>
                <h5 className={`card-title ${styles.cardTitle}`}>{item.name}</h5>
                {item.created_at && (
                  <h6 className={`card-subtitle ${styles.cardDate}`}>{formatDate(item.created_at)}</h6>
                )}
                <div className={`row mb-3 ${styles.cardDescRow}`}>
                  <div className="col-xl-8">
                    <p className={`card-text ${styles.cardText}`}>{item.meta_description}</p>
                  </div>
                </div>
                <span className={styles.readMoreBtn}>Read More</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function LatestUpdateCarousel({ updates }: { updates: NewsItem[] }) {
  return (
    <EmblaCarousel
      showDots={false}
      showArrows
      slidesToShowDesktop={3}
      slidesToShowTablet={2}
      slidesToShowMobile={1}
      autoplay={false}
      loop={false}
    >
      {updates.map(item => <NewsCard key={item.id} item={item} />)}
    </EmblaCarousel>
  )
}
