'use client'

import React, { FC, useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import styles from './Banner.module.css'

interface Banner {
  id?: number
  title?: string
  image: string
  link?: string
  alt?: string
  description?: string
}

const BannerCarouselClient: FC<{ banners?: Banner[] }> = ({ banners = [] }) => {
  const slides = banners && banners.length > 0 ? banners : []
  const [selectedIndex, setSelectedIndex] = useState(0)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: slides.length > 1 },
    slides.length > 1 ? [Autoplay({ delay: 4000, stopOnInteraction: false })] : []
  )

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
    <div className={styles.carouselContainer}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {slides.map((banner, index) => {
            const imgUrl = getImageUrl(banner.image)
            if (!imgUrl) return null

            const collegeName = banner.title || banner.description || banner.alt || 'View College'
            const hasLink = Boolean(banner.link && banner.link.trim() !== '#' && banner.link.trim() !== '')

            return (
              <div className={styles.emblaSlide} key={banner.id ?? index}>
                <div className={styles.slideCard}>
                  {hasLink ? (
                    <Link
                      href={banner.link!}
                      className={styles.slideImgLink}
                      title={collegeName}
                      tabIndex={-1}
                    >
                      <div className={styles.slideImg}>
                        <Image
                          src={imgUrl}
                          alt={banner.alt || collegeName || `Learntech hero banner ${index + 1}`}
                          fill
                          priority={index === 0}
                          fetchPriority={index === 0 ? 'high' : 'auto'}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </Link>
                  ) : (
                    <div className={styles.slideImg}>
                      <Image
                        src={imgUrl}
                        alt={banner.alt || collegeName || `Learntech hero banner ${index + 1}`}
                        fill
                        priority={index === 0}
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}

                  <div className={styles.slideFooter}>
                    {hasLink ? (
                      <Link
                        href={banner.link!}
                        className={styles.collegeLink}
                        title={collegeName}
                      >
                        <i className="bi bi-mortarboard-fill" aria-hidden="true" />
                        <span className={styles.collegeName}>{collegeName}</span>
                        <i className="bi bi-arrow-up-right" aria-hidden="true" />
                      </Link>
                    ) : (
                      <div className={styles.collegeInfo}>
                        <i className="bi bi-mortarboard-fill" aria-hidden="true" />
                        <span className={styles.collegeName}>{collegeName}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {slides.length > 1 && (
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
      )}
    </div>
  )
}

export default BannerCarouselClient

