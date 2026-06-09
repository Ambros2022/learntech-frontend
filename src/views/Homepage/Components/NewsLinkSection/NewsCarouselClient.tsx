'use client'

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import styles from './NewsCarousel.module.css'

interface NewsItem {
  id: number
  slug: string
  name: string
}

export default function NewsCarouselClient({ items }: { items: NewsItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2500, stopOnInteraction: false }),
  ])

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (!items.length) return null

  return (
    <div className={styles.wrap}>
      <button className={styles.prevBtn} onClick={prev} aria-label="Previous news">
        <i className="bi bi-chevron-left fs-5" />
      </button>

      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {items.map(item => (
            <div key={item.id} className={styles.emblaSlide}>
              <Link href={`/news/${item.id}/${item.slug}`} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <h6 className="py-2 newsLinkClr text-white text-center">{item.name}</h6>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <button className={styles.nextBtn} onClick={next} aria-label="Next news">
        <i className="bi bi-chevron-right fs-5" />
      </button>
    </div>
  )
}
