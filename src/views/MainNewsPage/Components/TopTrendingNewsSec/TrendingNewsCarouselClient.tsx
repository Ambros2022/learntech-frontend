'use client'

import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import emblaStyles from 'src/components/ui/Embla/EmblaTabCarousal.module.css'
import styles from './TrendingNews.module.css'

interface TrendingNewsItem {
  id: number
  title: string
  slug: string
  description: string
  imageUrl: string
}

export default function TrendingNewsCarouselClient({ newsItems }: { newsItems: TrendingNewsItem[] }) {
  const [slidesToShow, setSlidesToShow] = useState(4)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 2000 })]
  )

  useEffect(() => {
    const updateSlides = () => {
      const w = window.innerWidth
      if (w < 768) setSlidesToShow(1)
      else if (w < 1024) setSlidesToShow(3)
      else setSlidesToShow(4)
    }
    updateSlides()
    window.addEventListener('resize', updateSlides)
    return () => window.removeEventListener('resize', updateSlides)
  }, [])

  useEffect(() => {
    emblaApi?.reInit()
  }, [emblaApi, slidesToShow])

  useEffect(() => {
    if (!emblaApi) return
    const update = () => {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }
    update()
    emblaApi.on('select', update)
    emblaApi.on('reInit', update)
    return () => {
      emblaApi.off('select', update)
      emblaApi.off('reInit', update)
    }
  }, [emblaApi])

  return (
    <div className={emblaStyles.embla}>

      {/* LEFT ARROW — boxed style */}
      {canScrollPrev && (
        <button
          className={`${styles.arrowBtn} ${styles.left}`}
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      <div className={emblaStyles.embla__viewport} ref={emblaRef}>
        <div className={emblaStyles.embla__container}>
          {newsItems.map((news, idx) => (
            <div
              key={idx}
              className={emblaStyles.embla__slide}
              style={{ flex: `0 0 ${100 / slidesToShow}%` }}
            >
              <Link className='text-blue' href={`/news/${news.id}/${news.slug}`}>
                <div className="col-10 col-md-10 mx-auto mb-1">
                  <div className="card h-100 topNewsImg d-flex flex-fill hover-card">
                    <img
                      src={news.imageUrl}
                      width={400}
                      height={300}
                      className="card-img-top"
                      alt={news.title}
                    />
                    <div className="card-body bg-skyBlue">
                      <h6 className="card-title text-blue fw-bold text-truncate">{news.title}</h6>
                      <p className="card-text">{news.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT ARROW — boxed style */}
      {canScrollNext && (
        <button
          className={`${styles.arrowBtn} ${styles.right}`}
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  )
}
