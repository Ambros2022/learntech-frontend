'use client'

import React, { FC, useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import styles from './Banner.module.css'

interface Banner {
  image: string
  link?: string
  alt?: string
}

/*
// Sample reference slides (commented out for dynamic API data):
const defaultSlides: Banner[] = [
  {
    image: '/images/hero/bg-01.png',
    link: '#',
    alt: 'S-VYASA University campus building',
  },
  {
    image: '/images/hero/bg-02.png',
    link: '#',
    alt: 'Students on university campus grounds',
  },
]
*/

const BannerCarouselClient: FC<{ banners?: Banner[] }> = ({ banners = [] }) => {
  const slides = banners && banners.length > 0 ? banners : []
  const [selectedIndex, setSelectedIndex] = useState(0)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: slides.length > 1 },
    slides.length > 1 ? [Autoplay({ delay: 4000, stopOnInteraction: false })] : []
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  const getImageUrl = (src: string) => {
    if (!src) return ''
    if (src.startsWith('http') || src.startsWith('/')) return src
    return `${process.env.NEXT_PUBLIC_IMG_URL}/${src}`
  }

  if (!slides.length) return null

  return (
    <div className={styles.embla} ref={emblaRef}>
      <div className={styles.emblaContainer}>
        {slides.map((banner, index) => {
          const imgUrl = getImageUrl(banner.image)
          if (!imgUrl) return null

          const content = (
            <div className={styles.slideImg}>
              <Image
                src={imgUrl}
                alt={banner.alt || `Learntech hero banner ${index + 1}`}
                fill
                priority={index === 0}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                style={{ objectFit: 'cover' }}
              />
              <div className={styles.carouselFadeOverlay} />
            </div>
          )

          return (
            <div className={styles.emblaSlide} key={index}>
              {banner.link ? (
                <a href={banner.link} className={styles.slideLink}>
                  {content}
                </a>
              ) : (
                content
              )}
            </div>
          )
        })}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            className={`${styles.arrowBtn} ${styles.prevBtn}`}
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <i className="bi bi-chevron-left" />
          </button>

          <button
            type="button"
            className={`${styles.arrowBtn} ${styles.nextBtn}`}
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <i className="bi bi-chevron-right" />
          </button>

          <div className={styles.carouselIndicators}>
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.indicatorBtn} ${
                  i === selectedIndex ? styles.indicatorBtnActive : ''
                }`}
                onClick={() => scrollTo(i)}
                aria-label={`Slide ${i + 1}`}
                aria-current={i === selectedIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default BannerCarouselClient
