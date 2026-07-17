'use client'

import React, { FC, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import styles from './Banner.module.css'

interface Banner {
  image: string
  link: string
  alt?: string
}

const BannerCarouselClient: FC<{ banners: Banner[] }> = ({ banners }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  return (
    <>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {banners.map((banner, index) => (
            <div className={styles.emblaSlide} key={index}>
              <a href={banner.link || '#'} className={styles.imgLink}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}/${banner.image}`}
                  alt={banner.alt || `Learntech education banner ${index + 1}`}
                  fill
                  loading="lazy"
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dots}>
        {banners.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === selectedIndex ? styles.dotActive : ''}`}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <button
        type="button"
        className="carousel-control-prev"
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="Previous slide"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        type="button"
        className="carousel-control-next"
        onClick={() => emblaApi?.scrollNext()}
        aria-label="Next slide"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </>
  )
}

export default BannerCarouselClient
