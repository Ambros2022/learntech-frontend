'use client'

import React, { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import styles from './SymbiosisPage.module.css'

interface Props {
  logos: Array<{ src: string; alt: string }>
}

export default function SymPartnersCarouselClient({ logos }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  )

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback((api: any) => {
    setPrevBtnEnabled(api.canScrollPrev())
    setNextBtnEnabled(api.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className={styles.symPartnersEmbla}>
      <div className={styles.symPartnersViewport} ref={emblaRef}>
        <div className={styles.symPartnersContainer}>
          {logos.map((item, idx) => (
            <div className={styles.symPartnersSlide} key={idx}>
              <div className={styles.symPartnerLogo}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.alt} width={150} height={70} loading='lazy' />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CUSTOM ARROWS */}
      <button
        className={`${styles.symPartnersArrow} ${styles.symPartnersArrowPrev}`}
        onClick={scrollPrev}
        aria-label='Previous slide'
      >
        <i className='bi bi-chevron-left' />
      </button>
      <button
        className={`${styles.symPartnersArrow} ${styles.symPartnersArrowNext}`}
        onClick={scrollNext}
        aria-label='Next slide'
      >
        <i className='bi bi-chevron-right' />
      </button>
    </div>
  )
}
