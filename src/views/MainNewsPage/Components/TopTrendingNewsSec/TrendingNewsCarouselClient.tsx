'use client'

import React, { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import styles from 'src/components/ui/Embla/EmblaTabCarousal.module.css'

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
    {
      loop: true,
      align: 'start',
    },
    [Autoplay({ delay: 2000 })]
  )

  useEffect(() => {
    const updateSlides = () => {
      const w = window.innerWidth
      if (w < 768) {
        setSlidesToShow(1)
      } else if (w < 1024) {
        setSlidesToShow(3)
      } else {
        setSlidesToShow(4)
      }
    }
    updateSlides()
    window.addEventListener('resize', updateSlides)
    return () => window.removeEventListener('resize', updateSlides)
  }, [])

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit()
    }
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

  const slides = newsItems.map(news => (
    <Link key={news.id} className='text-blue' href={`/news/${news.id}/${news.slug}`}>
      <div className="col-8 col-md-10 mx-auto mb-1">
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
  ))

  return (
    <div className={styles.embla}>
      {/* LEFT ARROW */}
      {canScrollPrev && (
        <button
          className={`${styles.sideArrow} ${styles.left}`}
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous"
        >
          ←
        </button>
      )}

      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={styles.embla__slide}
              style={{ flex: `0 0 ${100 / slidesToShow}%` }}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT ARROW */}
      {canScrollNext && (
        <button
          className={`${styles.sideArrow} ${styles.right}`}
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next"
        >
          →
        </button>
      )}
    </div>
  )
}
